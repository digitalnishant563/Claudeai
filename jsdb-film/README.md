# JSDB brand film — edit pipeline

Builds the 2:02 vertical JSDB film described in `../prompts/jsdb-brand-film-edit-prompt.md`.
`timeline.json` is the single source of truth: shots, captions, stat/title blocks, flashes, end card.

| Step | Script | Output |
| --- | --- | --- |
| Fonts | download from `github.com/google/fonts` (`ofl/librebaskerville`, `ofl/bebasneue`, `ofl/hurricane`) | `fonts/` |
| Voiceover | `build_audio.sh <vo.mp3> <mix.wav>` | 48 kHz stereo, -14 LUFS, -1 dBTP, 122.23 s |
| Captions + blocks | `NODE_PATH=$(npm root -g) node render_text.mjs timeline.json <fonts> <gfx>` | transparent PNGs + `manifest.json` |
| Composite | `python3 -I compose.py --timeline timeline.json --gfx <gfx> --audio <mix.wav> --out film.mp4 (--proof \| --footage program.mov) [--logo logo.png]` | 1080x1920 25p H.264 |
| Editor pack | `python3 -I export_pack.py timeline.json <gfx> <pack>` | PNGs, Screen-blend flash clips, `timing.csv` |

## Status

Done:
- VO processed and normalised.
- All 52 captions, 3 stat blocks and the final title rendered to the prompt's positions and timings.
- 3 light-leak flashes built.
- Graphics proof rendered over labelled shot slots.

Still needs:
- **Footage.** The two Drive folders can't be downloaded from the build environment.
- **JSDB logo file**, for the end card.
- **Music track** (optional). Without one the mix is VO-only.

Once the footage is reachable: log it (prompt section 4), cut and grade shots 1–56 into one 1080x1920 25p program, then run `compose.py --footage program.mov --logo logo.png`.

## Deviations from the prompt

- **Script font:** Hurricane, the first free option in the prompt's list (Amsterdam Four and Brittany Signature are paid fonts). Hurricane has a much smaller x-height, so it's set 1.4x larger (119 px; 190 px on the hook) with a 0.9 px stroke. That keeps the prompt's rule that the script reads larger than the serif.
- **Shrunk captions:** C10, C11, C13, C15, C16, C18, C20, C21, C25 and C41 are scaled to 90–99.8 % to stay within the 820 px line limit, as the prompt allows.
- **Leak hint colour:** pale mint, because the brand colour isn't known without the logo.
