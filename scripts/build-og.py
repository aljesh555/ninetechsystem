#!/usr/bin/env python3
"""Compose the 1200x630 Open Graph card from the supplied brand files.

Uses assets/brand/logo-wordmark-white.svg for the company name and
assets/brand/logo-symbol-white.svg as the graphic on the right. Only the tagline and
the strapline are drawn here, and they are converted to outlines with fontTools
so the rasteriser needs no fonts installed.

Run: python3 scripts/build-og.py   (then `npm run build` rasterises it)
"""
import pathlib
import re
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import font_sources

from og_text import BRAND, Face, inner

font_sources.ensure(["poppins600.woff2", "poppins700.woff2"])

NAVY, AMBER, WHITE, MUTED = "#123566", "#FF9500", "#FFFFFF", "#9FB0C4"
W, H, M = 1200.0, 630.0, 88.0



bold = Face("tmp-fonts/poppins700.woff2")
semi = Face("tmp-fonts/poppins600.woff2")

# The supplied wordmark, nested at a fixed width.
wm_vb, wm_body = inner("logo-wordmark-white.svg")
wm_w = 260.0
wm_h = wm_w * (float(wm_vb.split()[3]) / float(wm_vb.split()[2]))
wordmark = f'<svg x="{M:.0f}" y="{M:.0f}" width="{wm_w:.1f}" height="{wm_h:.1f}" viewBox="{wm_vb}" overflow="visible">{wm_body}</svg>'

# The supplied 9, sitting on the right as the card's graphic.
sym_vb, sym_body = inner("logo-symbol-white.svg")
sym_h = 300.0
sym_w = sym_h * (float(sym_vb.split()[2]) / float(sym_vb.split()[3]))
symbol = (f'<g opacity="0.16">'
          f'<svg x="{W - M - sym_w:.1f}" y="{(H - sym_h) / 2:.1f}" width="{sym_w:.1f}" height="{sym_h:.1f}" '
          f'viewBox="{sym_vb}" overflow="visible">{sym_body}</svg></g>')

# Tagline, the card's centrepiece, with the amber square full stop.
T = 72.0
l1, _ = bold.run("Your ambition,", T, M, 366)
l2, l2w = bold.run("our engineering", T, M, 366 + T * 1.12)
sq = T * 0.125
stop = (f'<rect x="{M + l2w + T * 0.055:.1f}" y="{366 + T * 1.12 - sq:.1f}" '
        f'width="{sq:.1f}" height="{sq:.1f}" fill="{AMBER}"/>')

foot, _ = semi.run("Websites, software and AI automation — Lazimpat, Kathmandu", 25.0, M, H - M)

(BRAND / "og.svg").write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" width="{W:.0f}" height="{H:.0f}">'
    f'<rect width="{W:.0f}" height="{H:.0f}" fill="{NAVY}"/>{symbol}{wordmark}'
    f'<path d="{l1}" fill="{WHITE}"/><path d="{l2}" fill="{WHITE}"/>{stop}'
    f'<path d="{foot}" fill="{MUTED}"/></svg>\n')
print(f"  og.svg  {(BRAND / 'og.svg').stat().st_size} bytes")
