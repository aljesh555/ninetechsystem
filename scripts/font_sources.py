"""Fetches the upstream font slices that build-fonts.py and build-og.py need.

The sources are Google Fonts' own `latin` and `devanagari` slices of Poppins and
Inter, both SIL Open Font License 1.1. They land in tmp-fonts/, which is not
committed, so anything that needs them fetches them on demand.
"""
import pathlib
import urllib.request

SRC = pathlib.Path("tmp-fonts")

# Pinned to the versions this design was set with (Poppins v24, Inter v20), so a
# rebuild years from now produces the same metrics rather than silently shifting.
SOURCES = {
    "poppins600.woff2": "https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2",
    "poppins700.woff2": "https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2",
    "poppins500dev.woff2": "https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLGT9Z11lFc-K.woff2",
    "inter-var.woff2": "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2",
}

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"


def ensure(names=None):
    """Download any missing source files. Returns the directory holding them."""
    SRC.mkdir(exist_ok=True)
    for name in names or SOURCES:
        dest = SRC / name
        if dest.exists():
            continue
        print(f"  fetching {name}")
        req = urllib.request.Request(SOURCES[name], headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=30) as r:
            dest.write_bytes(r.read())
    return SRC
