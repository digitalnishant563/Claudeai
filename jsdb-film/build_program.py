"""Cuts, reframes and grades shots 1-56 from the EDL into one 1080x1920 25p program.

Each shot is rendered to its exact frame count (timeline.json in/out), so the program
lines up frame for frame with the captions, flashes and title in compose.py.

Usage: python3 -I build_program.py <timeline.json> <edl.json> <clips dir> <work dir> [shots to redo, e.g. 13,32]
"""
import json
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

FPS, W, H = 25, 1080, 1920


def probe(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                          "stream=width,height:stream_side_data=rotation:format=duration",
                          "-of", "json", str(path)], capture_output=True, text=True, check=True).stdout
    j = json.loads(out)
    st = j["streams"][0]
    w, h = st["width"], st["height"]
    rot = next((abs(int(sd.get("rotation", 0))) for sd in st.get("side_data_list", []) if "rotation" in sd), 0)
    if rot in (90, 270):
        w, h = h, w
    return w, h, float(j["format"]["duration"])


def grade_chain(mid):
    """HLG (BT.2020) -> Rec.709 with hable tonemap, then the prompt's look:
    bright, soft contrast, lifted shadows, warm-neutral whites, gentle bloom, -5 % saturation."""
    q1 = round(0.27 + (mid - 0.55) * 0.6, 3)
    q3 = round(0.80 + (mid - 0.55) * 0.4, 3)
    return (
        "zscale=tin=arib-std-b67:min=bt2020nc:pin=bt2020:rin=tv:t=linear:npl=203,format=gbrpf32le,"
        "zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=pc,format=gbrp16le,"
        f"curves=master='0/0.035 0.25/{q1} 0.5/{mid} 0.75/{q3} 1/0.95',"
        "colorbalance=rs=0.005:bs=-0.005:rm=0.025:gm=-0.018:bm=-0.012:rh=0.012:gh=-0.008:bh=-0.012,"
        # bloom runs at 8 bit: ffmpeg's 16-bit screen blend posterises flat walls
        "format=gbrp,split[b][g];[g]curves=master='0/0 0.82/0 1/1',gblur=sigma=18[gl];"
        "[b][gl]blend=all_mode=screen:all_opacity=0.13,"
        "scale=out_color_matrix=bt709:out_range=tv,format=yuv444p,eq=saturation=0.95,format=yuv420p"
    )


def render_shot(job):
    n, src, a, z, cx, cy, flip, frames, mid, out = job
    sw, sh, dur = probe(src)
    if a + frames / FPS > dur - 0.02:
        raise SystemExit(f"shot {n}: {src.name} too short for {frames} frames from {a}s")
    cw, ch = round(sw / z / 2) * 2, round(sh / z / 2) * 2
    x = min(max(0, round(cx * sw - cw / 2)), sw - cw) // 2 * 2
    y = min(max(0, round(cy * sh - ch / 2)), sh - ch) // 2 * 2
    vf = f"fps={FPS},crop={cw}:{ch}:{x}:{y},{'hflip,' if flip else ''}scale={W}:{H}:flags=lanczos,{grade_chain(mid)}"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{a:.3f}", "-i", str(src), "-an",
                    "-filter_complex", f"[0:v]{vf}", "-frames:v", str(frames), "-r", str(FPS),
                    "-c:v", "libx264", "-preset", "fast", "-crf", "12", "-pix_fmt", "yuv420p",
                    "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
                    str(out)], check=True)
    got = int(subprocess.run(["ffprobe", "-v", "error", "-count_frames", "-select_streams", "v:0",
                              "-show_entries", "stream=nb_read_frames", "-of", "csv=p=0", str(out)],
                             capture_output=True, text=True).stdout.strip())
    if got != frames:
        raise SystemExit(f"shot {n}: rendered {got} frames, expected {frames}")
    return n


def main():
    tl_path, edl_path, clips, work = sys.argv[1], sys.argv[2], Path(sys.argv[3]), Path(sys.argv[4])
    only = {int(x) for x in sys.argv[5].split(",")} if len(sys.argv) > 5 else None
    tl, edl = json.load(open(tl_path)), json.load(open(edl_path))
    work.mkdir(parents=True, exist_ok=True)
    jobs = []
    for num, tin, tout, *_ in tl["shots"]:
        if str(num) not in edl["shots"]:
            continue
        clip, a, z, cx, cy, flip, _note = edl["shots"][str(num)]
        frames = round(tout * FPS) - round(tin * FPS)
        mid = edl["grade_mid"].get(clip, edl["grade_mid"]["default"])
        jobs.append((num, clips / f"{clip}.mov", a, z, cx, cy, flip, frames, mid, work / f"shot{num:02d}.mp4"))
    todo = [j for j in jobs if only is None or j[0] in only]
    with ThreadPoolExecutor(max_workers=3) as pool:
        for n in pool.map(render_shot, todo):
            print(f"shot {n:02d} ok", flush=True)
    listing = work / "concat.txt"
    listing.write_text("".join(f"file '{j[-1].name}'\n" for j in jobs))
    program = work / "program.mp4"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(listing),
                    "-c", "copy", str(program)], check=True)
    total = sum(j[7] for j in jobs)
    print(f"program: {program} ({total} frames)")


if __name__ == "__main__":
    main()
