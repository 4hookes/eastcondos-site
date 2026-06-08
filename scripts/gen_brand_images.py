#!/usr/bin/env python3
"""Generate the EastCondos OG (social-share) image + favicon set.

- public/og-image.png  (1200x630)        — share preview for WhatsApp / iMessage / FB / Twitter
- public/og-square.png (1200x1200)       — square preview (some platforms)
- app/icon.png         (512x512)         — Next 13+ App Router auto-resizes for the favicon
- app/apple-icon.png   (180x180)         — iOS home-screen

Pure composition: PIL + the spot-eastcoast skyline + DM Serif Display & Inter. No AI text.
Re-run any time the design or wording changes.
"""
from __future__ import annotations
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
APP = ROOT / "app"

# Modern Luxe palette
CHARCOAL = (26, 26, 46)
CHARCOAL_DEEP = (14, 14, 31)
CREAM = (242, 235, 219)
PAPER = (239, 231, 210)
AMBER = (212, 168, 67)
AMBER_DEEP = (184, 144, 47)
MUTED = (107, 107, 107)

# Fonts — vendored in scripts/assets/ so this is reproducible on any machine.
FONTS = ROOT / "scripts" / "assets"
DM_SERIF = str(FONTS / "DMSerifDisplay-Regular.ttf")
DM_SERIF_ITALIC = str(FONTS / "DMSerifDisplay-Italic.ttf")
INTER = str(FONTS / "Inter-Medium.otf")

SPOT_EASTCOAST = PUBLIC / "spots" / "spot-eastcoast.png"


def f(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def text_width(d: ImageDraw.ImageDraw, s: str, font: ImageFont.FreeTypeFont) -> int:
    bbox = d.textbbox((0, 0), s, font=font)
    return bbox[2] - bbox[0]


def draw_kicker(d: ImageDraw.ImageDraw, x: int, y: int, text: str, font, color, gap=22):
    """Hairline-and-kicker: short amber rule + uppercase tracked label."""
    # Left rule
    d.line([(x, y + 14), (x + 36, y + 14)], fill=color, width=2)
    d.text((x + 36 + gap, y), text, font=font, fill=color)
    # Width — and the right rule if it's a centered title (caller decides)


def make_og_landscape(out: Path):
    """1200x630 — the standard social share image (WhatsApp, FB, iMessage, Twitter)."""
    W, H = 1200, 630
    im = Image.new("RGB", (W, H), CREAM)
    d = ImageDraw.Draw(im)

    # Top + bottom hairline borders (editorial signature)
    d.rectangle([(0, 0), (W, 4)], fill=CHARCOAL)
    d.rectangle([(0, H - 4), (W, H)], fill=CHARCOAL)
    # Amber accent line just below the top border
    d.line([(0, 12), (W, 12)], fill=AMBER, width=1)

    # ---- Bottom skyline backdrop ----
    skyline = Image.open(SPOT_EASTCOAST).convert("RGBA")
    # Spot is 1920x1080 16:9, we want it to anchor the bottom band
    SKY_W = W
    SKY_H = int(skyline.height * (SKY_W / skyline.width))
    skyline = skyline.resize((SKY_W, SKY_H), Image.LANCZOS)
    # Crop to the bottom band (keep the buildings, drop most of the sky)
    crop_top = int(SKY_H * 0.35)
    skyline = skyline.crop((0, crop_top, SKY_W, SKY_H))
    sky_h = skyline.height
    # Soften so the wordmark above stays the hero
    alpha = skyline.split()[3]
    alpha = alpha.point(lambda v: int(v * 0.55))
    skyline.putalpha(alpha)
    im.paste(skyline, (0, H - sky_h), skyline)

    # ---- Top kicker ----
    kicker_f = f(INTER, 22)
    kicker_text = "EASTCONDOS  ·  PROPERTY BY DESIGN"
    kw = text_width(d, kicker_text, kicker_f)
    # Centered kicker with two amber side rules
    cx = W // 2
    rule_w = 60
    gap = 24
    rule_y = 80
    d.line([(cx - kw // 2 - gap - rule_w, rule_y + 12), (cx - kw // 2 - gap, rule_y + 12)], fill=AMBER_DEEP, width=2)
    d.line([(cx + kw // 2 + gap, rule_y + 12), (cx + kw // 2 + gap + rule_w, rule_y + 12)], fill=AMBER_DEEP, width=2)
    d.text((cx - kw // 2, rule_y), kicker_text, font=kicker_f, fill=AMBER_DEEP)

    # ---- Wordmark ----
    serif_big = f(DM_SERIF, 124)
    headline = "EastCondos"
    hw = text_width(d, headline, serif_big)
    d.text((cx - hw // 2, 140), headline, font=serif_big, fill=CHARCOAL)

    # ---- Standfirst (italic serif) ----
    serif_italic = f(DM_SERIF_ITALIC, 36)
    sub = "Singapore's data-first condo investment advisory."
    sw = text_width(d, sub, serif_italic)
    d.text((cx - sw // 2, 290), sub, font=serif_italic, fill=CHARCOAL)

    # ---- Bottom strip: D14-18 line ----
    inter_small = f(INTER, 22)
    bottom_text = "DISTRICTS 14 — 18  ·  THE ELFI DIVISION  ·  EASTCONDOS.SG"
    bw = text_width(d, bottom_text, inter_small)
    d.text((cx - bw // 2, H - 56), bottom_text, font=inter_small, fill=CHARCOAL)

    im.save(out, "PNG", optimize=True)
    print(f"wrote {out.relative_to(ROOT)} ({out.stat().st_size // 1024} KB)")


def make_og_square(out: Path):
    """1200x1200 — for platforms that prefer square crops."""
    W = H = 1200
    im = Image.new("RGB", (W, H), CREAM)
    d = ImageDraw.Draw(im)

    d.rectangle([(0, 0), (W, 5)], fill=CHARCOAL)
    d.rectangle([(0, H - 5), (W, H)], fill=CHARCOAL)
    d.line([(0, 15), (W, 15)], fill=AMBER, width=2)

    # Bottom skyline
    skyline = Image.open(SPOT_EASTCOAST).convert("RGBA")
    SKY_W = W
    SKY_H = int(skyline.height * (SKY_W / skyline.width))
    skyline = skyline.resize((SKY_W, SKY_H), Image.LANCZOS)
    crop_top = int(SKY_H * 0.30)
    skyline = skyline.crop((0, crop_top, SKY_W, SKY_H))
    alpha = skyline.split()[3]
    alpha = alpha.point(lambda v: int(v * 0.55))
    skyline.putalpha(alpha)
    im.paste(skyline, (0, H - skyline.height), skyline)

    cx = W // 2

    # Kicker
    kicker_f = f(INTER, 26)
    kicker_text = "EASTCONDOS  ·  PROPERTY BY DESIGN"
    kw = text_width(d, kicker_text, kicker_f)
    d.text((cx - kw // 2, 140), kicker_text, font=kicker_f, fill=AMBER_DEEP)

    # Wordmark — bigger on square
    serif_big = f(DM_SERIF, 184)
    headline = "EastCondos"
    hw = text_width(d, headline, serif_big)
    d.text((cx - hw // 2, 230), headline, font=serif_big, fill=CHARCOAL)

    # Italic standfirst
    serif_italic = f(DM_SERIF_ITALIC, 48)
    sub_lines = ["Singapore's data-first", "condo investment advisory."]
    y = 460
    for ln in sub_lines:
        sw = text_width(d, ln, serif_italic)
        d.text((cx - sw // 2, y), ln, font=serif_italic, fill=CHARCOAL)
        y += 60

    # Bottom line
    inter_small = f(INTER, 24)
    bottom_text = "DISTRICTS 14 — 18  ·  EASTCONDOS.SG"
    bw = text_width(d, bottom_text, inter_small)
    d.text((cx - bw // 2, H - 70), bottom_text, font=inter_small, fill=CHARCOAL)

    im.save(out, "PNG", optimize=True)
    print(f"wrote {out.relative_to(ROOT)} ({out.stat().st_size // 1024} KB)")


def make_favicon_source(out: Path, size: int = 512, *, ios: bool = False):
    """Charcoal square with a cream "E" wordmark + tiny amber dot accent.

    Looks like a tiny EastCondos magazine cover — recognizable down to 16px.
    Next 13+ App Router uses app/icon.png + app/apple-icon.png and auto-generates
    every favicon size from these.
    """
    im = Image.new("RGB", (size, size), CHARCOAL_DEEP)
    d = ImageDraw.Draw(im)

    # Hairline amber border just inside the edge (premium feel even at 32px)
    inset = max(4, size // 32)
    d.rectangle(
        [(inset, inset), (size - inset, size - inset)],
        outline=AMBER,
        width=max(1, size // 128),
    )

    # Big serif "E"
    letter_size = int(size * 0.72)
    font = f(DM_SERIF, letter_size)
    letter = "E"
    bbox = d.textbbox((0, 0), letter, font=font)
    lw = bbox[2] - bbox[0]
    lh = bbox[3] - bbox[1]
    # Center optically — DM Serif Display has a generous descent baseline.
    x = (size - lw) // 2 - bbox[0]
    y = (size - lh) // 2 - bbox[1] - int(size * 0.02)
    d.text((x, y), letter, font=font, fill=CREAM)

    # Tiny amber dot above the E (the "Property by Design" dot) — skip on small iOS variants
    # for readability.
    if not ios or size >= 180:
        dot_r = max(3, size // 60)
        dot_cx = size // 2
        dot_cy = inset + int(size * 0.08)
        d.ellipse(
            [(dot_cx - dot_r, dot_cy - dot_r), (dot_cx + dot_r, dot_cy + dot_r)],
            fill=AMBER,
        )

    im.save(out, "PNG", optimize=True)
    print(f"wrote {out.relative_to(ROOT)} ({out.stat().st_size // 1024} KB · {size}x{size})")


def make_favicon_ico(out: Path):
    """Multi-resolution .ico for legacy clients that hard-request /favicon.ico
    (old WhatsApp link previews, IE, some RSS readers). Generated from the same
    design as icon.png at 16/32/48 sizes — Pillow packs them into one .ico."""
    sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
    base = Image.new("RGB", (256, 256), CHARCOAL_DEEP)
    d = ImageDraw.Draw(base)
    # Hairline amber border
    d.rectangle([(6, 6), (250, 250)], outline=AMBER, width=2)
    font = f(DM_SERIF, int(256 * 0.72))
    letter = "E"
    bbox = d.textbbox((0, 0), letter, font=font)
    lw, lh = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text(((256 - lw) // 2 - bbox[0], (256 - lh) // 2 - bbox[1] - 5), letter, font=font, fill=CREAM)
    # Tiny amber dot
    d.ellipse([(125, 18), (131, 24)], fill=AMBER)
    base.save(out, format="ICO", sizes=sizes)
    print(f"wrote {out.relative_to(ROOT)} (multi-res {sizes}, {out.stat().st_size // 1024} KB)")


def main():
    PUBLIC.mkdir(parents=True, exist_ok=True)
    make_og_landscape(PUBLIC / "og-image.png")
    make_og_square(PUBLIC / "og-square.png")
    make_favicon_source(APP / "icon.png", size=512)
    make_favicon_source(APP / "apple-icon.png", size=180, ios=True)
    make_favicon_ico(APP / "favicon.ico")


if __name__ == "__main__":
    main()
