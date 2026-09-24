#!/usr/bin/env python3
"""Subset the self-hosted webfonts. Run once; output is committed to src/fonts/.

Sources are the Google Fonts `latin` / `devanagari` slices of Poppins and Inter,
both under the SIL Open Font License 1.1 (commercial use permitted, see
src/fonts/OFL.txt). Nothing is fetched at build time or at runtime.
"""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import font_sources


font_sources.ensure()
import subprocess, sys, pathlib

OUT = pathlib.Path("public/fonts"); OUT.mkdir(parents=True, exist_ok=True)
SRC = pathlib.Path("tmp-fonts")

# Basic Latin plus exactly the punctuation and accents the copy uses.
LATIN = ",".join([
    "U+0020-007E",  # basic latin
    "U+00A0",       # nbsp
    "U+00A9",       # (c)
    "U+00E9",       # e-acute  -> "cafes"
    "U+2013-2014",  # en/em dash
    "U+2018-2019",  # curly single quotes
    "U+201C-201D",  # curly double quotes
    "U+2026",       # ellipsis
])

# The only Devanagari on the site, character for character.
NEPALI = (
    "नाईन टेक्नोलोजी प्रा.लि."
    "नेपालीमा कुरा गर्न चाहनुहुन्छ? फोन गर्नुहोस् वा WhatsApp गर्नुहोस्।"
)

def run(args):
    r = subprocess.run(args, capture_output=True, text=True)
    if r.returncode:
        sys.exit(f"failed: {' '.join(args)}\n{r.stderr}")

def instance(src, dest, axes):
    """Pin a variable font's axes to a range so unused weights stop shipping."""
    run(["fonttools", "varLib.instancer", "-o", str(SRC / dest),
         str(SRC / src), *axes])

def subset(src, dest, *extra):
    run(["pyftsubset", str(SRC / src), f"--output-file={OUT / dest}",
         "--flavor=woff2", "--layout-features=kern,liga,ccmp,mark,mkmk,locl",
         "--no-hinting", "--desubroutinize", *extra])
    print(f"  {dest:24} {(OUT / dest).stat().st_size / 1024:6.1f} KB")

print("Subsetting fonts ->", OUT)

# Inter: variable (wght 100-900). Pin the axis to the two weights actually used
# so one file serves both body text (400) and labels/buttons (500).
instance("inter-var.woff2", "inter-pinned.ttf", ["wght=400:500"])
subset("inter-pinned.ttf", "inter-400-500.woff2", f"--unicodes={LATIN}")

# Poppins: static. 600 for headings, 700 for the two display lines.
subset("poppins600.woff2", "poppins-600.woff2", f"--unicodes={LATIN}")
subset("poppins700.woff2", "poppins-700.woff2", f"--unicodes={LATIN}")

# Poppins Devanagari, cut to the exact two Nepali strings. Conjuncts need the
# Devanagari shaping features kept, so this one asks for all layout features.
subset("poppins500dev.woff2", "poppins-500-devanagari.woff2",
       f"--text={NEPALI}", "--layout-features=*")

total = sum(p.stat().st_size for p in OUT.glob("*.woff2"))
print(f"  {'TOTAL':24} {total / 1024:6.1f} KB  ({len(list(OUT.glob('*.woff2')))} files)")
