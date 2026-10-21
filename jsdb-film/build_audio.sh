#!/usr/bin/env bash
# Voiceover chain from section 11 of the edit prompt, mixed to the delivery spec.
# Usage: build_audio.sh <vo.mp3> <out.wav> [music.wav]
# Without a music file this produces the VO-only mix (the prompt's preview path).
set -euo pipefail
vo="$1"; out="$2"; music="${3:-}"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT

# HPF 80 Hz -> gentle de-ess -> 2:1 compression at -20 dBFS; 48 kHz; dual-mono stereo;
# padded so the audio runs 0.15 s past the last video frame (122.23 s).
chain="highpass=f=80,deesser=i=0.35:m=0.5:f=0.5,acompressor=threshold=-20dB:ratio=2:attack=10:release=200,aresample=48000,pan=stereo|c0=c0|c1=c0,apad=whole_dur=122.23,atrim=0:122.23"

if [[ -n "$music" ]]; then
  echo "music mixing is not wired up yet: supply the track and it gets ducked under the VO here" >&2
  exit 2
fi

ffmpeg -v error -y -i "$vo" -af "$chain" -c:a pcm_s24le "$tmp/vo.wav"

# Two-pass loudness normalisation to -14 LUFS integrated, -1 dBTP.
stats=$(ffmpeg -hide_banner -nostats -i "$tmp/vo.wav" -af loudnorm=I=-14:TP=-1.0:LRA=7:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
get() { echo "$stats" | python3 -c "import sys,json; print(json.load(sys.stdin)['$1'])"; }
ffmpeg -v error -y -i "$tmp/vo.wav" -af "loudnorm=I=-14:TP=-1.0:LRA=7:linear=true:measured_I=$(get input_i):measured_TP=$(get input_tp):measured_LRA=$(get input_lra):measured_thresh=$(get input_thresh):offset=$(get target_offset),aresample=48000" -c:a pcm_s24le "$out"
ffmpeg -hide_banner -nostats -i "$out" -af ebur128=peak=true -f null - 2>&1 | grep -A12 "Summary:" | grep -E "I:|Peak:"
