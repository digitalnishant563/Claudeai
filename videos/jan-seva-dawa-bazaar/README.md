# Jan Seva Dawa Bazaar — 2D animated explainer

A 2-minute, 1920×1080, 30 fps flat 2D animation synced to the Hindi voiceover (ElevenLabs "Sia").

- `output/Jan_Seva_Dawa_Bazaar_2D_Animation.mp4`: the final video with voiceover.
- `output/Jan_Seva_Dawa_Bazaar_Hindi.srt`: timed Hindi/Hinglish subtitles. Upload it to YouTube or Meta as captions.
- `src/`: the animation source. It is SVG + GSAP in `index.html`, `lib.js` (illustrations) and `scenes.js` (22 scenes and the timeline, timed to the voiceover in seconds).

## Re-rendering

```bash
cd src
npm install                      # gsap, fonts (Poppins + Hind)
node render.mjs snap 12.5,61.6   # preview frames into snaps/
node render.mjs video x 4        # render frames with 4 workers into parts/
ffmpeg -f concat -safe 0 -i parts/list.txt -c copy video_only.mp4
ffmpeg -i video_only.mp4 -i voiceover.mp3 -filter_complex "[1:a]apad=whole_dur=121.5[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -t 121.5 -movflags +faststart final.mp4
```

`render.mjs` imports Playwright from `/opt/node22/lib/node_modules/playwright`. If Playwright is installed somewhere else, change that import.

The logo mark (a green circle with a white cross) and the example values (batch number, dates, ₹100 → ₹80) are placeholders. Swap them for the real brand assets and numbers if needed.
