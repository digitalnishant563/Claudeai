"""Exports the graphics as an editor-ready pack: caption/block PNGs, a timing sheet,
and the three light-leak flashes as Screen-blend clips on black.

Screen over black is transparent, and screen(screen(base, leak), white) equals
the leak + white blow-out recipe in the prompt, so one Screen clip per flash is exact
(the highlight bloom is footage-dependent and is added in compose.py).

Usage: python3 -I export_pack.py <timeline.json> <gfx dir> <out dir>
"""
import csv
import json
import shutil
import subprocess
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))  # works under python3 -I too
from compose import FPS, H, W, leak_layer  # noqa: E402


def tc(frame):
    s, f = divmod(frame, FPS)
    return f"00:{s // 60:02d}:{s % 60:02d}:{f:02d}"


def main():
    tl_path, gfx, out = sys.argv[1], Path(sys.argv[2]), Path(sys.argv[3])
    tl = json.load(open(tl_path))
    man = json.load(open(gfx / "manifest.json"))
    out.mkdir(parents=True, exist_ok=True)
    for sub in ("captions", "blocks"):
        shutil.copytree(gfx / sub, out / sub, dirs_exist_ok=True)

    rows = []
    for c in man["captions"]:
        fi, fo = round(c["in"] * FPS), round(c["out"] * FPS)
        rows.append(["caption", c["id"], c["file"], fi, fo - 1, tc(fi), tc(fo), "normal"])
    for b in man["blocks"]:
        end = round(b["end"] * FPS)
        for i, fr in enumerate(b["frames"]):
            last = end - 1 if i == len(b["frames"]) - 1 else fr["frame"]
            rows.append(["block", b["id"], fr["file"], fr["frame"], last, tc(fr["frame"]), tc(last + 1), "normal"])

    (out / "flashes").mkdir(exist_ok=True)
    for n, cut in enumerate(tl["flashes"], 1):
        c = round(cut * FPS)
        first, last = c - 11, c + 16
        name = f"flashes/FLASH{n}_screen.mov"
        enc = subprocess.Popen(
            ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
             "-r", str(FPS), "-i", "-", "-c:v", "prores_ks", "-profile:v", "3", "-pix_fmt", "yuv422p10le",
             str(out / name)], stdin=subprocess.PIPE)
        for f in range(first, last + 1):
            layer, _, white = leak_layer((f - c) / FPS)
            combined = 1 - (1 - layer) * (1 - white)
            enc.stdin.write((np.clip(combined, 0, 1) * 255 + 0.5).astype(np.uint8).tobytes())
        enc.stdin.close()
        enc.wait()
        rows.append(["flash", f"FLASH{n}", name, first, last, tc(first), tc(last + 1), "SCREEN"])

    rows.sort(key=lambda r: (r[3], r[0]))
    with open(out / "timing.csv", "w", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["type", "id", "file", "first_frame", "last_frame", "tc_in", "tc_out", "blend"])
        w.writerows(rows)
    (out / "README.txt").write_text(
        "JSDB film graphics pack - 1080x1920, 25 fps, timeline starts at 00:00:00:00 with the VO.\n"
        "Place each file on its own track from first_frame to last_frame (inclusive), per timing.csv.\n"
        "Captions and blocks: transparent PNG, normal blend, above the graded footage.\n"
        "Flashes: ProRes 422 HQ clips, set blend mode to SCREEN, between footage and captions.\n"
        "End card (frames 3040-3051): pure white with the JSDB logo at ~52% down - logo file still needed.\n")
    print(f"{len(rows)} timed elements -> {out}")


if __name__ == "__main__":
    main()
