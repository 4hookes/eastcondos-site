#!/usr/bin/env python3
"""
EastCondos icon generator — the reusable pipeline.

Gemini 3 Pro Image -> generate on solid white -> key white to transparent (PIL/numpy)
-> resize to 512px -> save transparent PNG. One fixed STYLE prompt keeps the whole set
consistent (Modern Luxe hairline: charcoal strokes + one amber accent).

Usage:
    python3 gen_icons.py [outdir] [name1 name2 ...]
        outdir        staging dir for PNGs (default: /tmp/ec_icons_wave2)
        name1 name2   optional subset to (re)generate; omit to do the whole ICONS dict

Why white-then-key: gemini-3-pro-image cannot emit true alpha — ask for "transparent"
and it literally draws a checkerboard. So we force a pure-white bg and key it out.
"""
import base64, json, os, sys, time, urllib.request, concurrent.futures
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
import numpy as np
from _creds import gemini_key

API_KEY = gemini_key()  # env GEMINI_API_KEY or the gitignored reference_credentials.md
MODEL = "gemini-3-pro-image"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"

STYLE = (
    "A single minimalist line-art icon, perfectly centered, on a SOLID PURE WHITE (#FFFFFF) background. "
    "Style: fine hairline line-art, uniform thin charcoal (#1A1A2E) strokes, rounded line caps, NO fill. "
    "Exactly ONE small accent detail in amber (#D4A843); everything else is charcoal line only. "
    "Generous even margin around the icon. Flat 2D, front view, editorial and premium, calm. "
    "Absolutely NO text, NO letters, NO labels, NO numbers, NO shadow, NO gradient, NO background texture, "
    "NO checkerboard, NO transparency pattern. Only charcoal lines and one amber accent on plain white."
)

# 34 icons to take the set from 16 -> 50. name -> subject description (no text in art).
ICONS = {
    # --- Property types (5) ---
    "hdb-block":      "a tall public-housing apartment block, a wide rectangular residential tower with a grid of windows and a flat roof",
    "condo-tower":    "a sleek modern private condominium tower, tall and slender with balcony lines and large windows",
    "landed-house":   "a two-storey landed terrace house with a pitched roof, a door and a small front gate",
    "show-gallery":   "a small architectural model house displayed on a podium stand, a property showcase",
    "skyline":        "a row of several condominium towers of different heights side by side, a city skyline",
    # --- Money (8) ---
    "stamp-duty":     "an official document page with a round pressed rubber-stamp seal on it",
    "balance-scale":  "a classic two-pan balance weighing scale, evenly balanced on a central pillar",
    "coins-stack":    "three small stacks of round coins of increasing height, side by side",
    "piggy-bank":     "a piggy bank in side profile with a coin slot on its back",
    "home-loan":      "a small house outline with a single plain round coin overlapping its lower-right corner; the coin is blank and smooth with no symbol, plus or letter inside it",
    "bridging-loan":  "a simple arched bridge spanning across a gap between two banks",
    "wallet":         "an open bifold wallet with the top edge of a card and a banknote showing",
    "bank":           "a classical bank building facade with columns and a triangular roof pediment",
    # --- Process (6) ---
    "consultation":   "two overlapping rounded speech bubbles, a friendly conversation",
    "checklist":      "a clipboard holding a list with three checkmark ticks down the side",
    "calendar":       "a wall calendar page with a small grid and one date circled",
    "otp-document":   "a single contract document page with horizontal text lines and a signature line at the bottom",
    "signing-pen":    "a fountain pen nib drawing a flowing signature line",
    "handover":       "an open hand offering out a single house key",
    # --- Place & lifestyle (8) ---
    "mrt":            "a modern metro commuter train carriage seen from the front, two windows and a headlight",
    "school":         "a graduation mortarboard cap with a hanging tassel",
    "swimming-pool":  "a swimming pool with a poolside ladder and gentle water ripple lines",
    "gym":            "a single horizontal dumbbell with weighted ends",
    "park":           "a single leafy rounded tree with a trunk, a park tree",
    "expressway":     "a curving multi-lane highway road with dashed lane markings receding to the horizon",
    "sea-coast":      "three gentle layered ocean waves, a calm coastline",
    "shopping-mall":  "a shopping bag with two curved handles",
    # --- Advisory & brand (7) ---
    "target":         "a bullseye target of concentric rings with an arrow striking the centre",
    "compass":        "a round navigational compass with a pointing needle and cardinal marks",
    "lightbulb":      "a glowing light bulb with a filament, an idea",
    "shield-check":   "a shield with a checkmark tick inside it, a symbol of safety, protection and trust",
    "growth-staircase":"an ascending flight of steps with an upward arrow rising above the steps",
    "portfolio":      "a closed professional briefcase with a handle and a clasp",
    "clock":          "a round analog wall clock face with hour and minute hands",
}


def gen(subject, attempts=4):
    body = {
        "contents": [{"parts": [{"text": f"{STYLE}\n\nSubject: {subject}"}]}],
        "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "1:1"}},
    }
    data = json.dumps(body).encode()
    last = None
    for a in range(attempts):
        try:
            req = urllib.request.Request(
                URL, data=data,
                headers={"Content-Type": "application/json", "x-goog-api-key": API_KEY},
            )
            with urllib.request.urlopen(req, timeout=180) as r:
                d = json.load(r)
            for p in d["candidates"][0]["content"]["parts"]:
                if "inlineData" in p:
                    return base64.b64decode(p["inlineData"]["data"])
            raise RuntimeError("no image part in response")
        except Exception as e:
            last = e
            if a < attempts - 1:
                time.sleep(2.5 * (a + 1))  # backoff for 429 / transient
    raise last


def key_white(raw):
    img = Image.open(BytesIO(raw)).convert("RGB")
    arr = np.asarray(img).astype(np.int16)
    mn = arr.min(axis=2)
    alpha = np.clip((255 - mn) * 1.4, 0, 255).astype(np.uint8)
    alpha[mn > 244] = 0
    rgba = np.dstack([arr.astype(np.uint8), alpha])
    return Image.fromarray(rgba, "RGBA").resize((512, 512), Image.LANCZOS)


def one(name, subject, outdir):
    try:
        raw = gen(subject)
        key_white(raw).save(os.path.join(outdir, f"{name}.png"))
        return (name, True, "")
    except Exception as e:
        return (name, False, str(e)[:160])


def contact_sheet(outdir, names, cols=6, cell=300, icon=200):
    CREAM = (242, 235, 219)
    CHAR = (26, 26, 46)
    have = [n for n in names if os.path.exists(os.path.join(outdir, f"{n}.png"))]
    rows = (len(have) + cols - 1) // cols
    W, H = cols * cell, rows * cell
    canvas = Image.new("RGB", (W, H), CREAM)
    d = ImageDraw.Draw(canvas)
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 18)
    except Exception:
        font = ImageFont.load_default()
    for i, n in enumerate(have):
        r, c = divmod(i, cols)
        im = Image.open(os.path.join(outdir, f"{n}.png")).convert("RGBA").resize((icon, icon), Image.LANCZOS)
        x = c * cell + (cell - icon) // 2
        y = r * cell + 18
        canvas.paste(im, (x, y), im)
        tb = d.textbbox((0, 0), n, font=font)
        d.text((c * cell + (cell - (tb[2] - tb[0])) // 2, y + icon + 8), n, fill=CHAR, font=font)
    out = os.path.join(outdir, "_contact_sheet.png")
    canvas.save(out)
    return out


if __name__ == "__main__":
    outdir = sys.argv[1] if len(sys.argv) > 1 else "/tmp/ec_icons_wave2"
    subset = sys.argv[2:]
    os.makedirs(outdir, exist_ok=True)
    todo = {k: ICONS[k] for k in subset} if subset else ICONS
    print(f"Generating {len(todo)} icons -> {outdir}")
    t0 = time.time()
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:
        futs = {ex.submit(one, n, s, outdir): n for n, s in todo.items()}
        for f in concurrent.futures.as_completed(futs):
            name, ok, err = f.result()
            results.append((name, ok, err))
            print(f"  {'OK ' if ok else 'FAIL'} {name}{('  -> ' + err) if err else ''}")
    ok = [n for n, o, _ in results if o]
    bad = [n for n, o, _ in results if not o]
    sheet = contact_sheet(outdir, list(todo.keys()))
    print(f"\nDone in {time.time()-t0:.0f}s — {len(ok)} ok, {len(bad)} failed.")
    if bad:
        print("Failed:", " ".join(bad))
    print("Contact sheet:", sheet)
