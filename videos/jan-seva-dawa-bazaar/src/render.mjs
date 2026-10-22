// Usage: node render.mjs snap t1,t2,...  |  node render.mjs video out.mp4 [workers]
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const types = { '.html': 'text/html', '.js': 'text/javascript', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  fs.readFile(p, (e, d) => { if (e) { res.writeHead(404); res.end(); return; } res.writeHead(200, { 'Content-Type': types[path.extname(p)] || 'application/octet-stream' }); res.end(d); });
}).listen(0);
const port = server.address().port;
const FPS = 30;
const PAGE = process.env.PAGE || 'index.html';
const [VW, VH] = (process.env.SIZE || '1920x1080').split('x').map(Number);

const browser = await chromium.launch();
async function openPage() {
  const page = await browser.newPage({ viewport: { width: VW, height: VH } });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await page.goto(`http://127.0.0.1:${port}/${PAGE}`);
  try { await page.waitForFunction(() => window.ready === true, null, { timeout: 60000 }); }
  catch (e) { console.error('page not ready', errs); throw e; }
  if (errs.length) console.error('page errors:', errs);
  // decode every image layer once so no frame catches an image mid-decode
  for (const t of await page.evaluate(() => window.WARM || [])) { await page.evaluate(t => window.seek(t), t); await page.screenshot({ type: 'jpeg', quality: 50 }); }
  return page;
}

const [mode, arg, wArg] = process.argv.slice(2);
if (mode === 'snap') {
  const page = await openPage();
  fs.mkdirSync('snaps', { recursive: true });
  for (const t of arg.split(',').map(Number)) {
    await page.evaluate(t => window.seek(t), t);
    await page.screenshot({ path: `snaps/t${t.toFixed(2).padStart(6, '0')}.png` });
  }
} else {
  const total = Math.ceil((await (await openPage()).evaluate(() => window.DUR)) * FPS);
  const W = +(wArg || 4), per = Math.ceil(total / W);
  fs.mkdirSync('parts', { recursive: true });
  const t0 = Date.now();
  await Promise.all(Array.from({ length: W }, async (_, w) => {
    const page = await openPage();
    const a = w * per, b = Math.min(total, a + per);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(FPS), `parts/p${w}.mp4`], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let f = a; f < b; f++) {
      await page.evaluate(t => window.seek(t), f / FPS);
      const buf = await page.screenshot({ type: 'jpeg', quality: 94 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (w === 0 && f % 150 === 0) console.log(`worker0 frame ${f - a}/${b - a}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    }
    ff.stdin.end();
    await new Promise(r => ff.on('close', r));
  }));
  fs.writeFileSync('parts/list.txt', Array.from({ length: W }, (_, w) => `file 'p${w}.mp4'`).join('\n'));
  console.log('frames', total, 'time', ((Date.now() - t0) / 1000).toFixed(0) + 's');
}
await browser.close();
server.close();
