// Vertical (9:16) reel engine: scenes, kinetic type, transitions, ambient motion.
const W = 1080, H = 1920;
const DUR = 124.5;
gsap.defaults({ lazy: false });
const tl = gsap.timeline({ paused: true });
const SCENES = [];

// tr: how this scene enters — 'swipe' | 'push' | 'zoom' | 'iris'
function scene(id, t0, t1, bg, tr, html, anim, fxCols) {
  SCENES.push({ id, t0, t1, bg, tr, html, anim, fxCols });
}

// ---------- animation helpers ----------
function popIn(sel, t, o = {}) {
  tl.fromTo(sel, { scale: o.from ?? 0, opacity: 0, transformOrigin: o.origin || '50% 50%' },
    { scale: 1, opacity: 1, duration: o.d || 0.55, ease: o.ease || 'back.out(1.8)' }, t);
  const sh = typeof sel === 'string' && document.querySelector(`${sel} .shine`);
  if (sh) shine(sh, t + 0.35);
}
function shine(el, t) {
  const w = +el.dataset.w;
  tl.fromTo(el, { x: -w / 2 - 160 }, { x: w / 2 + 160, duration: 0.75, ease: 'power2.inOut' }, t);
}
function riseIn(sel, t, o = {}) {
  tl.fromTo(sel, { y: o.y ?? 50, opacity: 0 }, { y: 0, opacity: 1, duration: o.d || 0.6, ease: o.ease || 'power3.out' }, t);
}
function fadeIn(sel, t, d = 0.5) { tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: d, ease: 'power1.out' }, t); }
function fadeOut(sel, t, d = 0.35) { tl.to(sel, { opacity: 0, duration: d, ease: 'power1.in' }, t); }
function slideIn(sel, t, o = {}) {
  tl.fromTo(sel, { x: o.x || 0, y: o.y || 0, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: o.d || 0.7, ease: o.ease || 'power3.out' }, t);
}
function dropIn(sel, t, h = 260) {
  tl.fromTo(sel, { y: -h, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'bounce.out' }, t);
}
function bob(sel, t0, t1, amp = 8, per = 1.0) {
  const n = Math.floor((t1 - t0) / per);
  if (n > 0) tl.to(sel, { y: -amp, duration: per / 2, ease: 'sine.inOut', yoyo: true, repeat: n * 2 - 1 }, t0);
}
function sway(sel, t0, t1, deg = 4, per = 1.6) {
  const n = Math.floor((t1 - t0) / per);
  if (n > 0) tl.fromTo(sel, { rotation: -deg, transformOrigin: '50% 100%' }, { rotation: deg, duration: per / 2, ease: 'sine.inOut', yoyo: true, repeat: n * 2 - 1 }, t0);
}
function spin(sel, t0, t1, deg = 360) {
  tl.to(sel, { rotation: `+=${deg}`, duration: t1 - t0, ease: 'none', transformOrigin: '50% 50%' }, t0);
}
function blink(sel, t0, t1, every = 2.3) {
  for (let t = t0 + 0.7; t < t1 - 0.2; t += every) tl.to(`${sel} .eyes`, { scaleY: 0.1, duration: 0.07, yoyo: true, repeat: 1, transformOrigin: '50% 50%' }, t);
}
function counter(elId, t, d, from, to, fmt) {
  const o = { v: from };
  tl.to(o, { v: to, duration: d, ease: 'power2.out', onUpdate: () => { document.getElementById(elId).textContent = fmt(o.v); } }, t);
}
const fmtK = v => Math.round(v).toLocaleString('en-IN');
// whole-scene impact beats
function punch(id, t, amt = 1.07) {
  tl.fromTo(`#${id} > .punch`, { scale: 1, svgOrigin: `${W / 2} ${H / 2}` }, { scale: amt, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
}
function shake(id, t, amp = 16) {
  tl.to(`#${id} > .punch`, { x: amp, duration: 0.05, yoyo: true, repeat: 7, ease: 'sine.inOut' }, t);
}
// expanding rings behind a beat
const rings = (id, x, y, col = '#fff', n = 3) =>
  `<g id="${id}">${Array.from({ length: n }, () => `<circle class="rg" cx="${x}" cy="${y}" r="60" fill="none" stroke="${col}" stroke-width="8" opacity="0"/>`).join('')}</g>`;
function ripple(id, t, r1 = 700, d = 1.1) {
  document.querySelectorAll(`#${id} .rg`).forEach((el, i) =>
    tl.fromTo(el, { attr: { r: 50 }, opacity: 0.9 }, { attr: { r: r1 }, opacity: 0, duration: d, ease: 'power2.out', immediateRender: false }, t + i * 0.18));
}
function confetti(id, cx, cy, n = 26, seed = 7, spread = 1) {
  const r = rng(seed), cols = [C.coral, C.saf, C.green, C.blue, C.purple, C.tealL];
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2, d = (180 + r() * 300) * spread;
    s += `<g class="cf" data-dx="${(Math.cos(a) * d).toFixed(0)}" data-dy="${(Math.sin(a) * d).toFixed(0)}">${R(-9, -5, 18, 10, cols[i % cols.length], 3, `transform="rotate(${(r() * 180).toFixed(0)})"`)}</g>`;
  }
  return `<g id="${id}" transform="translate(${cx},${cy})">${s}</g>`;
}
function burst(id, t) {
  document.querySelectorAll(`#${id} .cf`).forEach((el, i) => {
    tl.fromTo(el, { x: 0, y: 0, opacity: 0, rotation: 0 }, { x: +el.dataset.dx, y: +el.dataset.dy, opacity: 1, rotation: 220 + i * 23, duration: 1.0, ease: 'power3.out' }, t);
    tl.to(el, { y: `+=${80}`, opacity: 0, duration: 0.6, ease: 'power1.in' }, t + 0.9);
  });
}
const card = (w, h, col = '#fff', rx = 32) => R(-w / 2 + 8, -h / 2 + 14, w, h, '#0B2238', rx, 'opacity="0.08"') + R(-w / 2, -h / 2, w, h, col, rx);

// ---------- kinetic type ----------
// '|' breaks lines, *word* highlights. Laid out after fonts load.
function KT(id, x, y, str, o = {}) {
  const { size = 80, w = 800, fill = C.ink, hi = C.teal, lh = 1.12, plate = false, mark = C.saf, sticker = true, chars = false } = o;
  const stk = sticker ? `stroke="#fff" stroke-width="${(size * 0.15).toFixed(1)}" stroke-linejoin="round" paint-order="stroke"` : '';
  let words = '', inHi = false;
  str.split('|').forEach((line, li) => {
    line.trim().split(/\s+/).forEach(word => {
      if (word.startsWith('*')) inHi = true;
      const isHi = inHi, closes = /\*[.,…!?]*$/.test(word);
      if (closes) inHi = false;
      const txt = word.replace(/\*/g, '');
      words += `<g class="kw" data-line="${li}" data-join="${isHi && !closes ? 1 : 0}"><g class="wi">${isHi ? `<rect class="mk" x="-8" y="${-size * 0.36}" width="10" height="${size * 0.42}" rx="${size * 0.12}" fill="${mark}" opacity="0.45"/>` : ''}` +
        `<text class="d" x="0" y="0" font-size="${size}" font-weight="${w}" fill="${isHi ? hi : fill}" ${stk}>${txt}</text></g></g>`;
    });
  });
  return `<g id="${id}" class="kt" data-x="${x}" data-y="${y}" data-size="${size}" data-lh="${lh}" data-chars="${chars ? 1 : 0}" ${sticker ? 'filter="url(#ktShadow)"' : ''}>${plate ? `<rect class="plate" fill="#fff" rx="36"/>` : ''}${words}</g>`;
}
function layoutKT() {
  document.querySelectorAll('.kt').forEach(g => {
    const x = +g.dataset.x, y = +g.dataset.y, size = +g.dataset.size, lh = +g.dataset.lh, sp = size * 0.27;
    const lines = {};
    g.querySelectorAll('.kw').forEach(k => { (lines[k.dataset.line] ||= []).push(k); });
    let minX = 1e9, maxX = -1e9;
    const keys = Object.keys(lines);
    keys.forEach(li => {
      const ws = lines[li].map(k => k.querySelector('text').getComputedTextLength());
      const total = ws.reduce((a, b) => a + b, 0) + sp * (ws.length - 1);
      let cx = x - total / 2;
      minX = Math.min(minX, cx); maxX = Math.max(maxX, cx + total);
      lines[li].forEach((k, i) => {
        k.setAttribute('transform', `translate(${cx.toFixed(1)},${(y + li * size * lh).toFixed(1)})`);
        const mk = k.querySelector('.mk');
        if (mk) mk.setAttribute('width', ws[i] + 16 + (k.dataset.join === '1' && i < ws.length - 1 ? sp - 16 : 0));
        cx += ws[i] + sp;
      });
    });
    if (g.dataset.chars === '1') g.querySelectorAll('.wi > text').forEach(tx => {
      const s = tx.textContent, offs = [...s].map((_, i) => i ? tx.getSubStringLength(0, i) : 0);
      [...s].forEach((ch, i) => {
        const c = tx.cloneNode(); c.textContent = ch; c.setAttribute('x', offs[i].toFixed(1));
        const wrap = document.createElementNS('http://www.w3.org/2000/svg', 'g'); wrap.setAttribute('class', 'ch'); wrap.appendChild(c);
        tx.parentNode.insertBefore(wrap, tx);
      });
      tx.remove();
    });
    const pl = g.querySelector('.plate');
    if (pl) {
      const pad = size * 0.45;
      pl.setAttribute('x', minX - pad); pl.setAttribute('width', maxX - minX + pad * 2);
      pl.setAttribute('y', y - size * 0.9 - pad * 0.6); pl.setAttribute('height', (keys.length - 1) * size * lh + size * 1.2 + pad * 1.2);
    }
  });
}
function words(id, t, o = {}) {
  const st = o.st ?? 0.075, size = +document.getElementById(id).dataset.size;
  const n = document.querySelectorAll(`#${id} .wi`).length;
  if (document.querySelector(`#${id} .plate`)) popIn(`#${id} .plate`, t - 0.08, { from: 0.7, d: 0.4 });
  if (document.querySelector(`#${id} .ch`)) {
    tl.fromTo(`#${id} .ch`, { y: size * 0.9, opacity: 0, rotation: -14, scale: 0.2, transformOrigin: '50% 100%' },
      { y: 0, opacity: 1, rotation: 0, scale: 1, duration: 0.5, ease: 'back.out(2.6)', stagger: o.cst ?? 0.028 }, t);
  } else {
    tl.fromTo(`#${id} .wi`, { y: size * 0.7, opacity: 0, rotation: 8, scale: 0.6, transformOrigin: '0% 100%' },
      { y: 0, opacity: 1, rotation: 0, scale: 1, duration: 0.55, ease: 'back.out(2.2)', stagger: st }, t);
  }
  if (document.querySelector(`#${id} .mk`))
    tl.fromTo(`#${id} .mk`, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.45, ease: 'power2.out' }, t + 0.2 + n * st);
}
function wordsOut(id, t) {
  tl.to(`#${id} .wi`, { y: -50, opacity: 0, duration: 0.28, ease: 'power2.in', stagger: 0.025 }, t);
  if (document.querySelector(`#${id} .plate`)) fadeOut(`#${id} .plate`, t + 0.1, 0.25);
}

// Auto-width pill label (rect sized after fonts load).
function chipV(id, x, y, s, o = {}) {
  const { size = 50, bg = C.teal, fg = '#fff', w = 700, pad = size * 0.8, stroke = '' } = o;
  const h = o.h || size * 1.75;
  return G(id, x, y, `<rect class="chip-bg" data-pad="${pad}" x="-100" y="${-h / 2}" width="200" height="${h}" rx="${h / 2}" fill="${bg}" ${stroke}/>` +
    T(0, size * 0.36, s, { size, fill: fg, w: Math.max(w, 800) }) +
    `<clipPath id="cp-${id}"><rect class="chip-clip" x="-100" y="${-h / 2}" width="200" height="${h}" rx="${h / 2}"/></clipPath>` +
    `<g clip-path="url(#cp-${id})"><g class="shine" data-w="200">${R(-45, -h / 2 - 10, 90, h + 20, 'url(#shineG)', 0, 'transform="skewX(-22)"')}</g></g>`);
}

// floating background shapes, drift for the whole scene
function fxLayer(seed, cols) {
  const r = rng(seed);
  let s = '';
  for (let i = 0; i < 12; i++) {
    const x = r() * W, y = 200 + r() * (H - 300), k = 0.5 + r() * 0.9, col = cols[i % cols.length];
    const shape = i % 3 === 0
      ? R(-6 * k * 2, -20 * k, 12 * k * 2, 40 * k, col, 6) + R(-20 * k, -6 * k * 2, 40 * k, 12 * k * 2, col, 6)
      : Ci(0, 0, 14 * k + 6, col);
    s += `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)})"><g class="pt" data-dy="${(-140 - r() * 220).toFixed(0)}" data-dx="${((r() - 0.5) * 90).toFixed(0)}" data-rot="${((r() - 0.5) * 180).toFixed(0)}"><g opacity="${(0.18 + r() * 0.22).toFixed(2)}">${shape}</g></g></g>`;
  }
  return `<g class="fxp">${s}</g>`;
}

// NCR map pins, avoiding the region labels
function addPins(sel, keys, n, seed, scale, col) {
  const host = document.querySelector(sel);
  const prefix = host.closest('[id$="-map"]').querySelector('.regions g').id.split('-')[0];
  const r = rng(seed), pts = [];
  let guard = 0;
  while (pts.length < n && guard++ < 30000) {
    const k = keys[pts.length % keys.length];
    const path = document.querySelector(`#${prefix}-${k} path`);
    const b = path.getBBox();
    const x = b.x + 20 + r() * (b.width - 40), y = b.y + 30 + r() * (b.height - 40);
    if (!path.isPointInFill(new DOMPoint(x, y))) continue;
    if (MAP.regions.some(rg => { const hw = rg.name.length * (rg.key === 'delhi' ? 11 : 8.5) + 6;
      return x + 22 * scale > rg.lx - hw && x - 22 * scale < rg.lx + hw && y > rg.ly - 40 && y - 62 * scale < rg.ly + 10; })) continue;
    if (pts.some(p => Math.hypot(p[0] - x, p[1] - y) < (scale > 0.7 ? 38 : 22))) continue;
    pts.push([x, y]);
  }
  pts.sort((a, b) => a[1] - b[1]);
  host.insertAdjacentHTML('beforeend', pts.map(([x, y]) => `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)})"><g opacity="0">${icon.pin(scale, col)}</g></g>`).join(''));
  return pts;
}

// ---------- transitions ----------
function transition(type, prev, cur, t) {
  const P = '#' + prev, N = '#' + cur, O = `${W / 2} ${H / 2}`;
  if (type === 'push') {
    tl.set(N, { opacity: 1 }, t - 0.3);
    tl.fromTo(N, { y: H }, { y: 0, duration: 0.6, ease: 'power3.inOut' }, t - 0.3);
    tl.to(P, { y: -H * 0.45, duration: 0.6, ease: 'power3.inOut' }, t - 0.3);
  } else if (type === 'zoom') {
    tl.fromTo(N, { opacity: 0, scale: 1.45, svgOrigin: O }, { opacity: 1, scale: 1, duration: 0.55, ease: 'power3.out' }, t - 0.2);
    tl.to(P, { scale: 0.75, duration: 0.5, ease: 'power2.in', svgOrigin: O }, t - 0.2);
  } else if (type === 'iris') {
    tl.set(N, { opacity: 1 }, t - 0.25);
    tl.fromTo(`#cl-${cur} circle`, { attr: { r: 0 } }, { attr: { r: 1150 }, duration: 0.75, ease: 'power2.inOut' }, t - 0.25);
    tl.fromTo('#fx-ring', { attr: { r: 0 }, opacity: 1 }, { attr: { r: 1150 }, duration: 0.75, ease: 'power2.inOut' }, t - 0.25);
    tl.set('#fx-ring', { opacity: 0 }, t + 0.5);
  } else {
    ['#fx-b0', '#fx-b1', '#fx-b2'].forEach((b, k) =>
      tl.fromTo(b, { y: 2900 }, { y: -2900, duration: 0.8, ease: 'power1.inOut' }, t - 0.4 + k * 0.06));
    tl.set(N, { opacity: 1 }, t + 0.12);
  }
}

async function init() {
  await Promise.all(['400', '500', '600', '700', '800'].map(w => document.fonts.load(`${w} 40px Poppins`)));
  await Promise.all(['500', '600', '700', '800'].map(w => document.fonts.load(`${w} 40px "Plus Jakarta Sans"`)));
  await Promise.all(['600', '700', '800'].map(w => document.fonts.load(`${w} 40px "Bricolage Grotesque"`)));
  await Promise.all(['600', '700'].map(w => document.fonts.load(`${w} 40px Hind`, '₹')));
  await document.fonts.ready;

  const svg = document.getElementById('stage');
  const defs = svg.querySelector('defs');
  SCENES.forEach(s => { if (s.tr === 'iris') defs.insertAdjacentHTML('beforeend', `<clipPath id="cl-${s.id}"><circle cx="${W / 2}" cy="${H / 2}" r="1150"/></clipPath>`); });
  svg.insertAdjacentHTML('beforeend', SCENES.map((s, i) =>
    `<g id="${s.id}" class="scene" opacity="0" ${s.tr === 'iris' ? `clip-path="url(#cl-${s.id})"` : ''}><g class="punch"><g class="drift">${R(-60, -60, W + 120, H + 120, s.bg)}${fxLayer(31 + i * 7, s.fxCols || ['#ffffff'])}${s.html()}</g></g></g>`).join(''));
  // transition overlays (above all scenes)
  const bar = (id, col, extra = '') => `<g id="${id}" transform="translate(0,2900)"><g transform="rotate(-10 ${W / 2} ${H / 2})">${R(-700, H / 2 - 1700, W + 1400, 3400, col)}${extra}</g></g>`;
  svg.insertAdjacentHTML('beforeend', `<g id="fx-top">${bar('fx-b0', C.saf)}${bar('fx-b1', C.coral)}${bar('fx-b2', C.teal, S(W / 2, H / 2, 1, Ci(0, 0, 120, '#fff', 'opacity="0.12"') + logoMark(80)))}
    <circle id="fx-ring" cx="${W / 2}" cy="${H / 2}" r="0" fill="none" stroke="${C.saf}" stroke-width="26" opacity="0"/></g>`);

  document.querySelectorAll('.chip-bg').forEach(r => {
    const t = r.nextElementSibling, w = t.getComputedTextLength(), pad = +r.dataset.pad;
    r.setAttribute('x', -w / 2 - pad); r.setAttribute('width', w + pad * 2);
    const g = r.parentNode, cc = g.querySelector('.chip-clip'), sh = g.querySelector('.shine');
    if (cc) { cc.setAttribute('x', -w / 2 - pad); cc.setAttribute('width', w + pad * 2); }
    if (sh) { sh.dataset.w = w + pad * 2; sh.setAttribute('transform', `translate(${-(w / 2 + pad) - 160},0)`); }
  });
  layoutKT();
  if (window.afterBuild) window.afterBuild();
  const srcs = [...new Set([...document.querySelectorAll('image')].map(i => i.getAttribute('href')))];
  await Promise.all(srcs.map(src => { const im = new Image(); im.src = src; return im.decode(); }));

  SCENES.forEach((s, i) => {
    if (i === 0) tl.set('#' + s.id, { opacity: 1 }, 0);
    else transition(s.tr, SCENES[i - 1].id, s.id, s.t0);
    if (i < SCENES.length - 1) tl.set('#' + s.id, { opacity: 0 }, SCENES[i + 1].t0 + 0.7);
    const st = Math.max(0, s.t0 - 0.3), span = s.t1 - st + 0.7;
    tl.fromTo(`#${s.id} .drift`, { scale: 1, svgOrigin: `${W / 2} ${H / 2}` }, { scale: 1.07, duration: span, ease: 'none' }, st);
    document.querySelectorAll(`#${s.id} .fxp .pt`).forEach(p =>
      tl.fromTo(p, { x: 0, y: 0, rotation: 0 }, { y: +p.dataset.dy, x: +p.dataset.dx, rotation: +p.dataset.rot, duration: span, ease: 'none', transformOrigin: '50% 50%' }, st));
    s.anim(s.t0);
  });
  tl.set({}, {}, DUR);
  if (Math.abs(tl.duration() - DUR) > 0.01) console.error('timeline shifted: duration ' + tl.duration());

  window.DUR = DUR;
  window.seek = t => { tl.seek(t, false); };
  window.ready = true;
  const q = new URLSearchParams(location.search);
  if (q.has('t')) window.seek(+q.get('t'));
  if (q.has('play')) tl.play(+q.get('play') || 0);
}
