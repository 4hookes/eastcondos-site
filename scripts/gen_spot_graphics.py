#!/usr/bin/env python3
"""
EastCondos website spot-illustration generator — wide editorial hairline line-art.
Same pipeline as gen_icons.py (Gemini 3 Pro Image -> white-key -> transparent PNG) but
16:9 and kept large; also writes a -light (cream-stroke) variant for charcoal heroes.

Usage: python3 scripts/gen_spot_graphics.py [outdir] [name1 ...]
  outdir default /tmp/spot_stage ; omit names to do all SPOTS.
"""
import base64, json, os, sys, time, urllib.request, concurrent.futures
from io import BytesIO
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from _creds import gemini_key

API_KEY = gemini_key()
MODEL = "gemini-3-pro-image"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"
CREAM = (242, 235, 219)

STYLE = (
    "An elegant editorial line illustration, wide horizontal composition, on a SOLID PURE WHITE (#FFFFFF) background. "
    "Fine hairline line-art, uniform thin charcoal (#1A1A2E) strokes, NO fill, NO shading. "
    "A few small accents in amber (#D4A843) only — everything else charcoal line. "
    "Generous margins, balanced, calm, premium — a line drawing in a luxury quarterly magazine. "
    "Absolutely NO text, NO letters, NO numbers, NO watermark, NO shadow, NO gradient, NO background texture, "
    "NO checkerboard, NO transparency pattern. Only charcoal lines and minimal amber accents on plain white."
)

SPOTS = {
    "spot-journey": "A left-to-right upgrade journey: a low public HDB housing block on the far left, a gently winding dotted path passing a few small round milestone markers, leading to a tall sleek modern private condominium tower on the right; the destination tower has one small amber accent.",
    "spot-eastcoast": "A wide serene panorama of an East-coast condominium skyline: several elegant residential towers of varying heights set behind a calm coastline with a few gentle sea-wave lines in the foreground; one single tower subtly accented in amber.",
    "spot-safety": "A calm assessment scene: a shield with a checkmark at the centre, paired with a wide semicircular meter gauge whose needle points toward the right safe zone; the gauge's safe end and the needle tip in amber.",
    "spot-consultation": "A wide horizontal scene of a calm advisory consultation: on the left, two simple chairs at an angle facing each other across a small low table; above and between them, two large rounded speech bubbles overlapping with a small house outline inside one bubble; on the right, an open notebook with subtle line marks and a fountain pen; the composition fills the wide frame edge-to-edge; one small amber accent on a speech-bubble outline.",
    "spot-nl-resale": "Two condominium buildings of slightly different heights balanced on the two pans of a large central balance scale, the beam roughly level on a single fulcrum; one small amber accent on the fulcrum.",
    "spot-numbers": "A tidy desk scene viewed slightly from above: a calculator, a neat stack of documents with a small line chart, a round magnifier resting over the chart, and a pen; the magnifier ring accented in amber.",
}


def gen(subject, attempts=4):
    body = {"contents": [{"parts": [{"text": f"{STYLE}\n\nScene: {subject}"}]}],
            "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "16:9"}}}
    data = json.dumps(body).encode()
    last = None
    for a in range(attempts):
        try:
            req = urllib.request.Request(URL, data=data,
                headers={"Content-Type": "application/json", "x-goog-api-key": API_KEY})
            with urllib.request.urlopen(req, timeout=180) as r:
                d = json.load(r)
            for p in d["candidates"][0]["content"]["parts"]:
                if "inlineData" in p:
                    return base64.b64decode(p["inlineData"]["data"])
            raise RuntimeError("no image part")
        except Exception as e:
            last = e
            if a < attempts - 1:
                time.sleep(2.5 * (a + 1))
    raise last


def key_white(raw, maxw=1600):
    img = Image.open(BytesIO(raw)).convert("RGB")
    arr = np.asarray(img).astype(np.int16)
    mn = arr.min(axis=2)
    a = np.clip((255 - mn) * 1.4, 0, 255).astype(np.uint8)
    a[mn > 244] = 0
    out = Image.fromarray(np.dstack([arr.astype(np.uint8), a]), "RGBA")
    if out.width > maxw:
        out = out.resize((maxw, round(out.height * maxw / out.width)), Image.LANCZOS)
    return out


def to_light(im, cream=CREAM):
    arr = np.array(im)
    r, g, b = arr[..., 0].astype(int), arr[..., 1].astype(int), arr[..., 2].astype(int)
    amber = (r > 120) & (g > 80) & (b < 150) & ((r - b) > 45) & (r >= g)
    rec = ~amber
    for i, c in enumerate(cream):
        arr[..., i] = np.where(rec, c, arr[..., i])
    return Image.fromarray(arr, "RGBA")


def one(name, subject, outdir):
    try:
        im = key_white(gen(subject))
        im.save(os.path.join(outdir, f"{name}.png"))
        to_light(im).save(os.path.join(outdir, f"{name}-light.png"))
        return (name, True, "")
    except Exception as e:
        return (name, False, str(e)[:160])


if __name__ == "__main__":
    outdir = sys.argv[1] if len(sys.argv) > 1 else "/tmp/spot_stage"
    subset = sys.argv[2:]
    os.makedirs(outdir, exist_ok=True)
    todo = {k: SPOTS[k] for k in subset} if subset else SPOTS
    print(f"Generating {len(todo)} spot graphics -> {outdir}")
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:
        for name, ok, err in ex.map(lambda kv: one(kv[0], kv[1], outdir), todo.items()):
            print(f"  {'OK ' if ok else 'FAIL'} {name}{('  ' + err) if err else ''}")
    print("Done.")
