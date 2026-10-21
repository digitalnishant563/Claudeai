// Renders every caption and every frame of the Bebas mask-rise blocks as
// transparent 1080x1920 PNGs, positioned to the baselines in the edit prompt.
// Usage: NODE_PATH=$(npm root -g) node render_text.mjs <timeline.json> <fonts dir> <out dir>
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const [timelinePath, fontsDir, outDir] = process.argv.slice(2);
const tl = JSON.parse(fs.readFileSync(timelinePath, 'utf8'));
const W = tl.width, H = tl.height, FPS = tl.fps;
const MAX_LINE = 820, TARGET_LINE = 760;
// Hurricane has a far smaller x-height than Amsterdam Four (which the 85/170 px spec was set for),
// so it is scaled up to keep the rule "script reads larger than the serif", and thickened slightly.
const SCRIPT_SCALE = 1.4, SCRIPT_STROKE = 0.9;

// Fonts are embedded as data URIs: a page built with setContent cannot load file:// fonts.
const fontUrl = (f) => 'data:font/ttf;base64,' + fs.readFileSync(path.resolve(fontsDir, f)).toString('base64');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: 'Serif'; src: url('${fontUrl('LibreBaskerville[wght].ttf')}'); font-weight: 100 900; }
@font-face { font-family: 'Script'; src: url('${fontUrl('Hurricane-Regular.ttf')}'); }
@font-face { font-family: 'Bebas'; src: url('${fontUrl('BebasNeue-Regular.ttf')}'); }
html, body { margin: 0; width: ${W}px; height: ${H}px; background: transparent; overflow: hidden; }
.line { position: absolute; left: 0; width: ${W}px; text-align: center; white-space: pre; line-height: 1; }
.serif { font-family: 'Serif'; font-weight: 400; color: #FFFFFF; }
.script { font-family: 'Script'; color: #EBD24A; padding: 0 0.1em 0 0.03em; } /* room for the slant overhang */
.cap { text-shadow: 0 2px 9px rgba(0,0,0,0.65); }
.probe { display: inline-block; width: 0; height: 0; vertical-align: baseline; }
.mask { position: absolute; left: 0; width: ${W}px; overflow: hidden; text-align: center; }
.mask span { display: inline-block; font-family: 'Bebas'; white-space: pre; line-height: 0.95;
             text-shadow: 0 3px 6px rgba(0,0,0,0.40); will-change: transform; }
</style></head><body></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.setContent(html);
await page.evaluate(async () => {
  for (const f of ['400 40px Serif', '40px Script', '40px Bebas']) await document.fonts.load(f, 'Aa');
  await document.fonts.ready;
});

fs.mkdirSync(path.join(outDir, 'captions'), { recursive: true });
fs.mkdirSync(path.join(outDir, 'blocks'), { recursive: true });
const manifest = { captions: [], blocks: [], warnings: [] };

// --- captions ---------------------------------------------------------------
for (const [id, tin, tout, kind, lines] of tl.captions) {
  const sizes = kind === 'hook' ? { serif: 64, script: 136 * SCRIPT_SCALE } : { serif: 56, script: 85 * SCRIPT_SCALE };
  const baselines = kind === 'hook' ? [1235, 1325] : lines.length === 1 ? [1240] : [1200, 1280];
  const result = await page.evaluate(({ lines, sizes, baselines, MAX_LINE, SCRIPT_STROKE }) => {
    const build = (scale) => {
      document.body.innerHTML = '';
      const widths = [];
      lines.forEach((text, i) => {
        const div = document.createElement('div');
        div.className = 'line cap';
        const wrap = document.createElement('span');
        // "[script] serif" -> runs; brackets mark the yellow script phrase
        for (const part of text.split(/(\[[^\]]+\])/).filter(Boolean)) {
          const s = document.createElement('span');
          const isScript = part.startsWith('[');
          s.className = isScript ? 'script' : 'serif';
          s.style.fontSize = (isScript ? sizes.script : sizes.serif) * scale + 'px';
          if (isScript) s.style.webkitTextStroke = `${SCRIPT_STROKE * sizes.script / 119} px #EBD24A`.replace(' px', 'px');
          s.textContent = isScript ? part.slice(1, -1) : part;
          wrap.appendChild(s);
        }
        const probe = document.createElement('span');
        probe.className = 'probe';
        wrap.appendChild(probe);
        div.appendChild(wrap);
        div.style.top = '0px';
        document.body.appendChild(div);
        const baseline = probe.getBoundingClientRect().bottom - div.getBoundingClientRect().top;
        div.style.top = (baselines[i] - baseline) + 'px';
        widths.push(wrap.getBoundingClientRect().width);
      });
      return widths;
    };
    let scale = 1;
    let widths = build(scale);
    const widest = Math.max(...widths);
    if (widest > MAX_LINE) {
      scale = Math.max(0.9, MAX_LINE / widest);
      widths = build(scale);
    }
    return { scale, widths };
  }, { lines, sizes, baselines, MAX_LINE, SCRIPT_STROKE });

  const file = path.join('captions', `${id}.png`);
  await page.screenshot({ path: path.join(outDir, file), omitBackground: true });
  const widest = Math.max(...result.widths);
  if (widest > MAX_LINE) manifest.warnings.push(`${id}: line ${widest.toFixed(0)}px > ${MAX_LINE}px even at 90%`);
  else if (widest > TARGET_LINE) manifest.warnings.push(`${id}: line ${widest.toFixed(0)}px (over 760 target, under 820 limit)`);
  manifest.captions.push({ id, in: tin, out: tout, file, scale: +result.scale.toFixed(3),
                           widths: result.widths.map((w) => +w.toFixed(0)) });
}

// --- mask-rise blocks (stat blocks + final title) ----------------------------
for (const block of tl.blocks) {
  // Fit each line to its target width (font size follows from width), then stack.
  const layout = await page.evaluate(({ block, W }) => {
    document.body.innerHTML = '';
    const out = [];
    for (const ln of block.lines) {
      const probe = document.createElement('span');
      probe.style.cssText = "font-family: Bebas; font-size: 100px; white-space: pre; position: absolute;";
      probe.textContent = ln.text;
      document.body.appendChild(probe);
      const w = probe.getBoundingClientRect().width;
      out.push({ size: 100 * (ln.width * W) / w });
    }
    return out;
  }, { block, W });
  const heights = layout.map((l) => l.size * 0.95);
  const gaps = block.lines.map((ln) => ln.gap_after || 0);
  const total = heights.reduce((a, b) => a + b, 0) + gaps.slice(0, -1).reduce((a, b) => a + b, 0);
  let y = block.anchor === 'top' ? block.y : block.y - total / 2;
  const tops = heights.map((h, i) => { const t = y; y += h + gaps[i]; return t; });

  const f0 = Math.round(Math.min(...block.lines.map((l) => l.start)) * FPS);
  const f1 = Math.round(Math.max(...block.lines.map((l) => l.start + l.dur)) * FPS);
  const frames = [];
  for (let f = f0; f <= f1; f++) {
    const t = f / FPS;
    const offsets = block.lines.map((ln) => {
      const p = Math.min(1, Math.max(0, (t - ln.start) / ln.dur));
      const ease = p >= 1 ? 1 : 1 - Math.pow(2, -10 * p); // easeOutExpo
      return 1 - ease; // fraction of line height still below its baseline
    });
    await page.evaluate(({ block, layout, heights, tops, offsets }) => {
      document.body.innerHTML = '';
      block.lines.forEach((ln, i) => {
        const mask = document.createElement('div');
        mask.className = 'mask';
        mask.style.top = tops[i] + 'px';
        mask.style.height = heights[i] + 'px';
        const s = document.createElement('span');
        s.textContent = ln.text;
        s.style.fontSize = layout[i].size + 'px';
        s.style.color = ln.color === 'yellow' ? '#F2D81E' : '#FFFFFF';
        s.style.transform = `translateY(${offsets[i] * heights[i]}px)`;
        mask.appendChild(s);
        document.body.appendChild(mask);
      });
    }, { block, layout, heights, tops, offsets });
    const file = path.join('blocks', `${block.id}_${String(f).padStart(4, '0')}.png`);
    await page.screenshot({ path: path.join(outDir, file), omitBackground: true });
    frames.push({ frame: f, file });
  }
  manifest.blocks.push({ id: block.id, first_frame: f0, settled_frame: f1, end: block.end, frames,
                         sizes: layout.map((l) => +l.size.toFixed(1)), tops: tops.map((t) => +t.toFixed(1)),
                         bottom: +(tops[tops.length - 1] + heights[heights.length - 1]).toFixed(1) });
}

fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 1));
await browser.close();
console.log(`captions: ${manifest.captions.length}, block frames: ${manifest.blocks.reduce((a, b) => a + b.frames.length, 0)}`);
for (const w of manifest.warnings) console.log('WARN', w);
