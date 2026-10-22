# Jan Seva Dawa Bazaar — 2D animated explainer

Flat 2D animation synced to the Hindi voiceover (ElevenLabs "Sia"), 2:01, 30 fps, in two versions.

- `output/Jan_Seva_Dawa_Bazaar_Reel_9x16.mp4`: the vertical 1080×1920 reel for Instagram Reels, YouTube Shorts and Meta ads. All on-screen text is in English. It uses word-by-word kinetic text, swipe/push/zoom/iris transitions, camera pans, particles and impact beats.
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
