"""Shared text-to-outline helpers for the Open Graph cards.

Both build-og.py (the site card) and build-post-og.py (one card per guide) draw
their type with these, so the rasteriser needs no fonts installed and the cards
are set in the same Poppins the site uses.
"""
import pathlib
import re

from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Identity

BRAND = pathlib.Path("assets/brand")


class Face:
    def __init__(self, path):
        self.font = TTFont(path)
        self.upem = self.font["head"].unitsPerEm
        self.cmap = self.font.getBestCmap()
        self.gs = self.font.getGlyphSet()
        self.hmtx = self.font["hmtx"]

    def run(self, text, size, x, y, tracking=0.0):
        """Outlines for `text` set at `size`, with the pen's total advance."""
        scale = size / self.upem
        d, pen_x = [], x
        for ch in text:
            name = self.cmap[ord(ch)]
            pen = SVGPathPen(self.gs, ntos=lambda v: f"{v:.1f}".rstrip("0").rstrip("."))
            self.gs[name].draw(TransformPen(pen, Identity.translate(pen_x, y).scale(scale, -scale)))
            if seg := pen.getCommands():
                d.append(seg)
            pen_x += self.hmtx[name][0] * scale + tracking * size
        return " ".join(d), pen_x - x

    def width(self, text, size, tracking=0.0):
        """Advance width only. Used to wrap a headline before drawing it."""
        scale = size / self.upem
        return sum(self.hmtx[self.cmap[ord(c)]][0] * scale + tracking * size for c in text)

    def wrap(self, text, size, max_width, tracking=0.0):
        """Greedy word wrap to `max_width`."""
        lines, line = [], ""
        for word in text.split():
            trial = f"{line} {word}".strip()
            if line and self.width(trial, size, tracking) > max_width:
                lines.append(line)
                line = word
            else:
                line = trial
        if line:
            lines.append(line)
        return lines


def inner(path):
    """The children of an SVG root, plus its viewBox, ready to be nested."""
    svg = (BRAND / path).read_text()
    vb = re.search(r'viewBox="([^"]+)"', svg).group(1)
    body = re.sub(r"^.*?<svg[^>]*>", "", svg, flags=re.S)
    body = re.sub(r"</svg>\s*$", "", body, flags=re.S)
    return vb, body.strip()
