# Jan Seva Dawa Bazaar — 2D animated explainer

Flat 2D animation synced to the Hindi voiceover (ElevenLabs "Sia"), 2:01, 30 fps, in two versions.

- `output/Jan_Seva_Dawa_Bazaar_Reel_9x16_v2.mp4`: **latest** vertical reel (2:04). Adds the real JSDB logo, brand colours, new fonts (Bricolage Grotesque + Plus Jakarta Sans), the real JSDB counter redrawn in a cel-shaded 2D style, an India expansion map, a fly-through vision scene and a new outro.
- `output/Jan_Seva_Dawa_Bazaar_Reel_9x16.mp4`: first version of the vertical 1080×1920 reel for Instagram Reels, YouTube Shorts and Meta ads. All on-screen text is in English. It uses word-by-word kinetic text, swipe/push/zoom/iris transitions, camera pans, particles and impact beats.
- `output/Jan_Seva_Dawa_Bazaar_2D_Animation.mp4`: the landscape 1920×1080 version with Hindi on-screen text.
- `output/Jan_Seva_Dawa_Bazaar_English.srt` and `output/Jan_Seva_Dawa_Bazaar_Hindi.srt`: timed captions for the voiceover.
- `src/`: the animation source (SVG + GSAP).
  - `lib.js`: shared illustrations.
  - `reel.html`, `engine.js`, `reel.js`: the 9:16 reel.
  - `index.html`, `scenes.js`: the 16:9 version.

## Re-rendering

```bash
cd src
npm install                      # gsap, fonts (Poppins + Hind)
node render.mjs snap 12.5,61.6   # preview frames into snaps/ (16:9)
node render.mjs video x 4        # render frames with 4 workers into parts/ (16:9)
# reel: PAGE=reel.html SIZE=1080x1920 node render.mjs video x 4
ffmpeg -f concat -safe 0 -i parts/list.txt -c copy video_only.mp4
ffmpeg -i video_only.mp4 -i voiceover.mp3 -filter_complex "[1:a]apad=whole_dur=121.5[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -t 121.5 -movflags +faststart final.mp4
```

`render.mjs` imports Playwright from `/opt/node22/lib/node_modules/playwright`. If Playwright is installed somewhere else, change that import.

The logo mark (a green circle with a white cross) and the example values (batch number, dates, ₹100 → ₹80) are placeholders. Swap them for the real brand assets and numbers if needed.

## Real footage → 2D

`tools/cel.py` converts a photo or video frame into the cel-shaded look used for the store scenes. It runs AnimeGANv3 (Shinkai) paint, then flattens colours, then draws ink outlines. `tools/toon.py --seg` also cuts out the person with U²-Net, so the person can move separately from the background.

Models (not committed):
- `AnimeGANv3_Shinkai_37.onnx` from github.com/TachibanaYoshino/AnimeGANv3 releases (v1.1.0)
- `u2net_human_seg.onnx` from github.com/danielgatis/rembg releases (v0.0.0)

Place both in `../models/` relative to `tools/`.

The India map uses `@svg-maps/india` (CC BY 4.0).
