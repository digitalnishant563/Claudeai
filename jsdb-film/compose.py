"""Composites the JSDB film: picture -> light leak/white flash -> captions/stat/title -> end card.

Picture source:
  --proof            labelled slot per shot (used until the footage is available)
  --footage FILE     the cut + graded 1080x1920 25p program (shots 1-56 back to back)

Usage:
  python3 -I compose.py --timeline timeline.json --gfx GFX_DIR --audio MIX.wav --out OUT.mp4
                        (--proof | --footage PROGRAM.mov) [--logo LOGO.png] [--frames A:B]
"""
import argparse
import json
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H, FPS = 1080, 1920, 25
MONO = "/usr/share/fonts/truetype/jetbrains-mono/JetBrainsMono-Regular.ttf"


# --- light leak (section 8 of the prompt) -------------------------------------
LEAK_AMBER = np.array([1.00, 0.71, 0.28], np.float32)   # #FFB547
LEAK_CORAL = np.array([1.00, 0.54, 0.40], np.float32)   # #FF8A65
LEAK_HINT = np.array([0.66, 0.90, 0.81], np.float32)    # #A8E6CF (brand colour unknown -> pale mint)
WASH = np.array([1.00, 0.80, 0.62], np.float32)         # warm peach-gold wash over the whole frame


def ramp(t, a, b):
    """0 before a, 1 after b, smoothstep in between."""
    x = np.clip((t - a) / (b - a), 0.0, 1.0)
    return x * x * (3 - 2 * x)


def flash_params(dt):
    """dt = time relative to the cut C. Returns leak intensity, radius scale, wash, white alpha."""
    intensity = 0.45 * ramp(dt, -0.44, -0.28) + 0.55 * ramp(dt, -0.28, -0.04)
    intensity *= 1.0 - ramp(dt, 0.36, 0.64)
    radius = 0.35 + 0.65 * ramp(dt, -0.44, -0.04) - 0.55 * ramp(dt, 0.36, 0.64)
    wash = 0.5 * ramp(dt, -0.28, -0.04) * (1.0 - ramp(dt, 0.30, 0.50))
    white = 0.0
    if 0.08 <= dt < 0.16:
        white = 0.97 * (dt - 0.08) / 0.08            # 0 -> 97 % over 2 frames
    elif 0.16 <= dt < 0.36:
        white = 0.97                                  # 5-frame near-white hold
    elif 0.36 <= dt < 0.64:
        white = 0.97 * (1.0 - ramp(dt, 0.36, 0.64))   # ease-in-out recede
    return float(intensity), float(radius), float(wash), float(white)


_grid = None


def leak_layer(dt):
    """Screen-blend layer (float RGB 0-1, full res) and white-solid alpha for this frame."""
    global _grid
    sw, sh = W // 4, H // 4
    if _grid is None:
        ys, xs = np.mgrid[0:sh, 0:sw].astype(np.float32)
        _grid = (xs * 4, ys * 4)
    xs, ys = _grid
    intensity, radius, wash, white = flash_params(dt)
    drift = 60.0 * max(0.0, dt + 0.44)  # blobs drift slowly inward from the left edge
    layer = np.zeros((sh, sw, 3), np.float32)
    for (cx, cy, r, weight, colour) in (
        (-120 + drift, 1150, 1100, 1.00, LEAK_AMBER),
        (-60 + drift, 1950, 950, 0.95, LEAK_CORAL),
        (-100 + drift, -80, 600, 0.35, LEAK_HINT),
    ):
        d2 = ((xs - cx) ** 2 + (ys - cy) ** 2) / (r * radius) ** 2
        g = (np.exp(-2.2 * d2) * weight * intensity)[..., None] * colour
        layer = 1 - (1 - layer) * (1 - g)            # screen-combine the blobs
    layer = 1 - (1 - layer) * (1 - WASH * wash)
    img = Image.fromarray((np.clip(layer, 0, 1) * 255).astype(np.uint8)).resize((W, H), Image.BILINEAR)
    return np.asarray(img, np.float32) / 255.0, intensity, white


def apply_flash(frame, dt):
    layer, intensity, white = leak_layer(dt)
    base = np.asarray(frame.convert("RGB"), np.float32) / 255.0
    if intensity > 0.05:  # highlights bloom while the leak is up
        lum = base.mean(axis=2, keepdims=True)
        bright = np.clip((lum - 0.8) / 0.2, 0, 1) * base
        small = Image.fromarray((bright * 255).astype(np.uint8)).resize((W // 4, H // 4), Image.BILINEAR)
        glow = np.asarray(small.filter(ImageFilter.GaussianBlur(10)).resize((W, H), Image.BILINEAR), np.float32) / 255.0
        base = 1 - (1 - base) * (1 - glow * 0.35 * intensity)
    out = 1 - (1 - base) * (1 - layer)
    out = out * (1 - white) + white
    return Image.fromarray((np.clip(out, 0, 1) * 255 + 0.5).astype(np.uint8)).convert("RGBA")


# --- picture sources -----------------------------------------------------------
def proof_slot(shot, font_big, font_small):
    num, tin, tout, bucket, note = shot
    top, bottom = ((92, 84, 76), (52, 47, 43)) if num % 2 else ((78, 74, 70), (42, 39, 37))
    grad = np.linspace(0, 1, H, dtype=np.float32)[:, None, None]
    arr = (np.array(top, np.float32) * (1 - grad) + np.array(bottom, np.float32) * grad)
    img = Image.fromarray(np.repeat(arr, W, axis=1).astype(np.uint8)).convert("RGBA")
    d = ImageDraw.Draw(img)
    d.text((70, 96), "GRAPHICS PROOF · FOOTAGE NOT LOADED", font=font_small, fill=(205, 196, 184, 255))
    d.text((70, 140), f"SHOT {num:02d}  {tin:6.2f}–{tout:6.2f}  [{bucket}]", font=font_big, fill=(240, 234, 224, 255))
    d.text((70, 196), note, font=font_small, fill=(205, 196, 184, 255))
    return img


class FootageReader:
    def __init__(self, path):
        self.proc = subprocess.Popen(
            ["ffmpeg", "-v", "error", "-i", path, "-vf", f"scale={W}:{H},fps={FPS}",
             "-pix_fmt", "rgb24", "-f", "rawvideo", "-"], stdout=subprocess.PIPE)

    def next(self):
        buf = self.proc.stdout.read(W * H * 3)
        if len(buf) < W * H * 3:
            raise SystemExit("footage program is shorter than shot 56")
        return Image.frombuffer("RGB", (W, H), buf).convert("RGBA")


def end_card(logo_path, font_small):
    img = Image.new("RGBA", (W, H), (255, 255, 255, 255))
    if logo_path:
        logo = Image.open(logo_path).convert("RGBA")
        bbox = logo.getbbox()
        logo = logo.crop(bbox) if bbox else logo
        wide = logo.width / logo.height >= 2.0
        target_w = int(W * (0.84 if wide else 0.60))
        logo = logo.resize((target_w, round(logo.height * target_w / logo.width)), Image.LANCZOS)
        img.alpha_composite(logo, ((W - logo.width) // 2, round(H * 0.52 - logo.height / 2)))
    else:  # proof annotation only, never a substitute logo
        d = ImageDraw.Draw(img)
        msg = "JSDB logo file needed"
        tw = d.textlength(msg, font=font_small)
        d.text(((W - tw) / 2, H * 0.52 - 12), msg, font=font_small, fill=(170, 170, 170, 255))
    return img


# --- main ------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--timeline", required=True)
    ap.add_argument("--gfx", required=True)
    ap.add_argument("--audio", required=True)
    ap.add_argument("--out", required=True)
    src = ap.add_mutually_exclusive_group(required=True)
    src.add_argument("--proof", action="store_true")
    src.add_argument("--footage")
    ap.add_argument("--logo")
    ap.add_argument("--frames", help="render only frames A:B (for checks)")
    ap.add_argument("--crf", default="16")
    ap.add_argument("--preset", default="slow")
    args = ap.parse_args()

    tl = json.load(open(args.timeline))
    gfx = Path(args.gfx)
    man = json.load(open(gfx / "manifest.json"))
    total = tl["video_frames"]
    f_a, f_b = (map(int, args.frames.split(":")) if args.frames else (0, total))

    font_big = ImageFont.truetype(MONO, 40)
    font_small = ImageFont.truetype(MONO, 26)

    def fr(t):
        return round(t * FPS)

    shots = [s for s in tl["shots"] if s[3] != "END"]
    shot_at = {}
    for s in shots:
        for f in range(fr(s[1]), fr(s[2])):
            shot_at[f] = s
    captions = [(fr(c["in"]), fr(c["out"]), gfx / c["file"]) for c in man["captions"]]
    blocks = []
    for b in man["blocks"]:
        frames = {x["frame"]: gfx / x["file"] for x in b["frames"]}
        blocks.append((b["first_frame"], b["settled_frame"], fr(b["end"]), frames))
    flashes = [fr(c) for c in tl["flashes"]]
    end_in = fr(tl["end_card"][0])

    png_cache = {}

    def png(path):
        if path not in png_cache:
            png_cache[path] = Image.open(path).convert("RGBA")
        return png_cache[path]

    slot_cache = {}
    footage = FootageReader(args.footage) if args.footage else None
    card = end_card(args.logo, font_small)

    start_s = f_a / FPS
    dur_s = (f_b - f_a) / FPS + (0.15 if f_b == total else 0)
    enc = subprocess.Popen(
        ["ffmpeg", "-v", "error", "-y",
         "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
         "-ss", f"{start_s:.3f}", "-t", f"{dur_s:.3f}", "-i", args.audio,
         "-map", "0:v", "-map", "1:a",
         "-c:v", "libx264", "-preset", args.preset, "-crf", args.crf, "-profile:v", "high",
         "-pix_fmt", "yuv420p", "-r", str(FPS),
         "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
         "-c:a", "aac", "-b:a", "320k", "-ar", "48000", "-movflags", "+faststart", args.out],
        stdin=subprocess.PIPE)

    last_key, last_bytes = None, None
    for f in range(0, f_b):
        base = footage.next() if footage and f < end_in else None
        if f < f_a:
            continue
        if f >= end_in:
            key = ("end",)
        else:
            cap = next((c[2] for c in captions if c[0] <= f < c[1]), None)
            blk = None
            for (b0, b1, bend, frames) in blocks:
                if b0 <= f < bend:
                    blk = frames[min(f, b1)]
            flash = next((f - c for c in flashes if -11 <= f - c <= 16), None)
            shot = shot_at[f]
            key = None if (footage or flash is not None) else (shot[0], cap, blk)
        if key is not None and key == last_key:
            enc.stdin.write(last_bytes)
            continue
        if f >= end_in:
            frame = card
        else:
            if footage:
                frame = base
            else:
                if shot[0] not in slot_cache:
                    slot_cache[shot[0]] = proof_slot(shot, font_big, font_small)
                frame = slot_cache[shot[0]]
            if flash is not None:
                frame = apply_flash(frame, flash / FPS)
            else:
                frame = frame.copy()
            if cap:
                frame.alpha_composite(png(cap))
            if blk:
                frame.alpha_composite(png(blk))
        last_key, last_bytes = key, frame.convert("RGB").tobytes()
        enc.stdin.write(last_bytes)
    enc.stdin.close()
    enc.wait()
    print("wrote", args.out)


if __name__ == "__main__":
    main()
