#!/usr/bin/env python3
"""One 1200x630 Open Graph card per guide, written to public/og/<slug>.svg.

A shared card makes every guide look identical when it is pasted into LinkedIn,
Facebook or WhatsApp. Each card here carries the guide's own title and its own
isometric artwork, drawn from the same src/lib/icons.js the pages use, so the
preview matches what the reader lands on.

Type is converted to outlines, so the rasteriser needs no fonts installed.

Run: python3 scripts/build-post-og.py   (npm prebuild does this, then sharp
rasterises the results in scripts/generate-brand-assets.mjs)
"""
import json
import pathlib
import re
import subprocess
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import font_sources
from og_text import Face, inner

font_sources.ensure(["poppins600.woff2", "poppins700.woff2"])

NAVY, AMBER, WHITE, MUTED = "#123566", "#FF9500", "#FFFFFF", "#9FB0C4"
W, H, M = 1200.0, 630.0, 72.0
POSTS = pathlib.Path("src/content/blog")
OUT = pathlib.Path("public/og")


def frontmatter(md):
    """The simple quoted scalars this card needs. Not a general YAML parser."""
    block = md.split("---", 2)[1]
    get = lambda key: (m.group(1) if (m := re.search(rf'^{key}:\s*"(.*)"\s*$', block, re.M)) else "")
    return {"title": get("title"), "category": get("category"), "art": get("art"),
            "draft": bool(re.search(r"^draft:\s*true", block, re.M))}


posts = []
for path in sorted(POSTS.glob("*.md")):
    data = frontmatter(path.read_text())
    if not data["draft"]:
        posts.append((path.stem, data))

# The artwork is generated in JS, so ask node for the scenes these guides use.
arts = sorted({d["art"] for _, d in posts})
scenes = json.loads(subprocess.run(
    ["node", "--input-type=module", "-e",
     "import{sceneOnNavy}from'./src/lib/icons.js';"
     f"const a={json.dumps(arts)};"
     "process.stdout.write(JSON.stringify(Object.fromEntries(a.map(n=>[n,sceneOnNavy(n)]))))"],
    capture_output=True, text=True, check=True).stdout)

bold = Face("tmp-fonts/poppins700.woff2")
semi = Face("tmp-fonts/poppins600.woff2")

wm_vb, wm_body = inner("logo-wordmark-white.svg")
wm_w = 210.0
wm_h = wm_w * (float(wm_vb.split()[3]) / float(wm_vb.split()[2]))
wordmark = (f'<svg x="{M:.0f}" y="{M:.0f}" width="{wm_w:.1f}" height="{wm_h:.1f}" '
            f'viewBox="{wm_vb}" overflow="visible">{wm_body}</svg>')

ART = 330.0           # the isometric scene, on the right
COL = W - M - ART - 56  # headline column, clear of it

# The headline lives in a fixed band: below the kicker, clear of the footer.
# Baselines are pinned, so a long title can never ride up into the wordmark.
KICKER_Y, BAND_TOP, BAND_BOTTOM = 208.0, 286.0, 520.0

OUT.mkdir(parents=True, exist_ok=True)
for slug, data in posts:
    # As large as it can be set while the wrapped block still fits the band.
    for size in (56.0, 50.0, 44.0, 39.0, 34.0):
        lines = bold.wrap(data["title"], size, COL - M)
        if (len(lines) - 1) * size * 1.16 <= BAND_BOTTOM - BAND_TOP:
            break

    lead = size * 1.16
    block = (len(lines) - 1) * lead
    top = BAND_TOP + max(0.0, (BAND_BOTTOM - BAND_TOP - block) / 2)
    head = "".join(f'<path d="{bold.run(l, size, M, top + i * lead)[0]}" fill="{WHITE}"/>'
                   for i, l in enumerate(lines))

    kicker, kw = semi.run(data["category"], 24.0, M, KICKER_Y)
    rule = f'<rect x="{M:.0f}" y="{KICKER_Y + 12:.0f}" width="{kw:.1f}" height="3" fill="{AMBER}"/>'

    scene_vb = re.search(r'viewBox="([^"]+)"', scenes[data["art"]]).group(1)
    scene_body = re.sub(r"</?svg[^>]*>", "", scenes[data["art"]], flags=re.S).strip()
    vw, vh = float(scene_vb.split()[2]), float(scene_vb.split()[3])
    art_h = ART * (vh / vw)
    art = (f'<svg x="{W - M - ART:.1f}" y="{(H - art_h) / 2:.1f}" width="{ART:.1f}" '
           f'height="{art_h:.1f}" viewBox="{scene_vb}" overflow="visible">{scene_body}</svg>')

    foot, _ = semi.run("ninetechsystem.com", 22.0, M, H - M)

    (OUT / f"{slug}.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" '
        f'width="{W:.0f}" height="{H:.0f}">'
        f'<rect width="{W:.0f}" height="{H:.0f}" fill="{NAVY}"/>{art}{wordmark}'
        f'<path d="{kicker}" fill="{AMBER}"/>{rule}{head}'
        f'<path d="{foot}" fill="{MUTED}"/></svg>\n')
    print(f"  og/{slug}.svg  {len(lines)} line(s) at {size:.0f}px")
