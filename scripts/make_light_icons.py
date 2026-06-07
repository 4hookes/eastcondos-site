#!/usr/bin/env python3
"""
Make light (cream-stroke) variants of every charcoal icon, for use on dark/charcoal
surfaces (carousel slides, dark bands). FREE — pure recolor, no API calls.

charcoal strokes -> cream (#F2EBDB); amber accent kept; alpha preserved.
Writes <name>-light.png next to each <name>.png. Skips files already ending in -light.

Usage: python3 scripts/make_light_icons.py [iconsdir]   (default public/icons)
"""
import glob, os, sys
import numpy as np
from PIL import Image

CREAM = (242, 235, 219)  # #F2EBDB


def to_light(src, dst, cream=CREAM):
    im = Image.open(src).convert("RGBA")
    arr = np.array(im)
    r, g, b = arr[..., 0].astype(int), arr[..., 1].astype(int), arr[..., 2].astype(int)
    # Amber accent (~#D4A843): warm + saturated. Keep these pixels untouched.
    is_amber = (r > 120) & (g > 80) & (b < 150) & ((r - b) > 45) & (r >= g)
    recolor = ~is_amber  # everything else visible = charcoal stroke -> cream
    out = arr.copy()
    for i, c in enumerate(cream):
        out[..., i] = np.where(recolor, c, arr[..., i])
    # alpha (out[...,3]) unchanged
    Image.fromarray(out, "RGBA").save(dst)


if __name__ == "__main__":
    d = sys.argv[1] if len(sys.argv) > 1 else "public/icons"
    srcs = [p for p in sorted(glob.glob(os.path.join(d, "*.png")))
            if not os.path.basename(p).endswith("-light.png")
            and not os.path.basename(p).startswith("_")]
    n = 0
    for p in srcs:
        name = os.path.basename(p)[:-4]
        to_light(p, os.path.join(d, f"{name}-light.png"))
        n += 1
    print(f"Wrote {n} light variants in {d}/")
