// Scene markup + GSAP master timeline, timed to the voiceover (seconds).
const DUR = 121.5;
const tl = gsap.timeline({ paused: true });
const SCENES = [];

function scene(id, t0, t1, bg, html, anim, overlay = '') {
  SCENES.push({ id, t0, t1, bg, html, anim, overlay });
}

// ---------- animation helpers ----------
function popIn(sel, t, o = {}) {
  tl.fromTo(sel, { scale: o.from ?? 0, opacity: 0, transformOrigin: o.origin || '50% 50%' },
    { scale: 1, opacity: 1, duration: o.d || 0.55, ease: o.ease || 'back.out(1.8)' }, t);
}
function riseIn(sel, t, o = {}) {
  tl.fromTo(sel, { y: o.y ?? 40, opacity: 0 }, { y: 0, opacity: 1, duration: o.d || 0.6, ease: o.ease || 'power3.out' }, t);
}
function fadeIn(sel, t, d = 0.5) { tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: d, ease: 'power1.out' }, t); }
function fadeOut(sel, t, d = 0.35) { tl.to(sel, { opacity: 0, duration: d, ease: 'power1.in' }, t); }
function slideIn(sel, t, o = {}) {
  tl.fromTo(sel, { x: o.x || 0, y: o.y || 0, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: o.d || 0.7, ease: o.ease || 'power3.out' }, t);
}
function dropIn(sel, t, h = 260) {
  tl.fromTo(sel, { y: -h, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'bounce.out' }, t);
}
// gentle repeating float on a child selector (kept separate from entrance tweens)
function bob(sel, t0, t1, amp = 8, per = 1.0) {
  const n = Math.floor((t1 - t0) / per);
  if (n > 0) tl.to(sel, { y: -amp, duration: per / 2, ease: 'sine.inOut', yoyo: true, repeat: n * 2 - 1 }, t0);
}
function spin(sel, t0, t1, deg = 360) {
  tl.to(sel, { rotation: `+=${deg}`, duration: t1 - t0, ease: 'none', transformOrigin: '50% 50%' }, t0);
}
function counter(elId, t, d, from, to, fmt) {
  const o = { v: from };
  tl.to(o, { v: to, duration: d, ease: 'power2.out', onUpdate: () => { document.getElementById(elId).textContent = fmt(o.v); } }, t);
}
const fmtK = v => Math.round(v).toLocaleString('en-IN');
// headline text block: wrapper g with id, animate via I(id)
const H = (id, s, y = 130, o = {}) => G(id, 960, y, T(0, 0, s, { size: o.size || 58, w: o.w || 700, fill: o.fill || C.ink }));
function confetti(id, cx, cy, n = 22, seed = 7) {
  const r = rng(seed), cols = [C.coral, C.saf, C.green, C.blue, C.purple, C.tealL];
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2, d = 160 + r() * 260;
    s += `<g class="cf" data-dx="${(Math.cos(a) * d).toFixed(0)}" data-dy="${(Math.sin(a) * d * 0.8).toFixed(0)}">${R(-7, -4, 14, 8, cols[i % cols.length], 2, `transform="rotate(${(r() * 180).toFixed(0)})"`)}</g>`;
  }
  return `<g id="${id}" transform="translate(${cx},${cy})">${s}</g>`;
}
function burst(id, t) {
  document.querySelectorAll(`#${id} .cf`).forEach((el, i) => {
    tl.fromTo(el, { x: 0, y: 0, opacity: 0, rotation: 0 }, { x: +el.dataset.dx, y: +el.dataset.dy, opacity: 1, rotation: 200 + i * 23, duration: 0.9, ease: 'power3.out' }, t);
    tl.to(el, { opacity: 0, duration: 0.5 }, t + 0.8);
  });
}
const card = (w, h, col = '#fff') => R(-w / 2 + 6, -h / 2 + 12, w, h, '#0B2238', 28, 'opacity="0.08"') + R(-w / 2, -h / 2, w, h, col, 28);

// =====================================================================
// S1 — Delhi NCR skyline (0 – 4.55)
// =====================================================================
scene('s1', 0, 4.55, 'url(#skyG)', () => {
  const r = rng(3);
  let back = '';
  for (let x = -40; x < 1960;) {
    const w = 80 + r() * 90, h = 150 + r() * 230;
    back += R(x, 880 - h, w, h + 10, '#A9DCCF', 6);
    for (let wy = 880 - h + 24; wy < 860; wy += 40) back += R(x + 14, wy, w - 28, 10, '#C6E9DF', 3);
    x += w + 8;
  }
  const col = '#2E8E7E';
  const indiaGate = P('M-95,0 L-95,-235 L95,-235 L95,0 L45,0 L45,-120 A45,45 0 0 0 -45,-120 L-45,0Z', col) + R(-110, -268, 220, 36, col, 4) + R(-72, -294, 144, 30, col, 4) + E(0, -296, 42, 14, col);
  const qutub = P('M-36,0 L36,0 L18,-440 L-18,-440Z', col) + [[-120, 40], [-230, 34], [-320, 30], [-400, 26]].map(([y, w]) => R(-w, y, w * 2, 14, col, 4)).join('') + R(-15, -476, 30, 40, col, 8) + E(0, -478, 18, 10, col);
  const lotus = R(-170, -34, 340, 34, col, 6) + [[-70, 0.7], [-38, 0.88], [0, 1], [38, 0.88], [70, 0.7]].map(([a, s]) =>
    `<g transform="translate(0,-30) rotate(${a}) scale(${s})">${P('M0,0 Q-44,-96 0,-180 Q44,-96 0,0Z', a === 0 ? '#3FA595' : col)}</g>`).join('');
  const tower = (x, w, h, slant) => P(`M${x},0 L${x},${-h} L${x + w},${-h - slant} L${x + w},0Z`, '#3B8FB0') + Array.from({ length: Math.floor(h / 34) }, (_, i) => R(x + 10, -h + 20 + i * 34, w - 20, 6, '#7CC3DD', 2)).join('');
  const towers = tower(0, 110, 420, 40) + tower(120, 90, 330, -30) + tower(220, 120, 480, 50) + tower(350, 80, 300, 0);
  let rings = '';
  for (let i = 0; i < 4; i++) rings += `<circle class="ring" cx="960" cy="900" r="120" fill="none" stroke="#fff" stroke-width="6" opacity="0"/>`;
  return `
    ${G('s1-sun', 1500, 300, Ci(0, 0, 150, '#FFE29A', 'opacity="0.35"') + Ci(0, 0, 92, '#FFD36E'))}
    ${G('s1-c1', 260, 210, cloud(1, 0.95))}${G('s1-c2', 1150, 150, cloud(0.75, 0.9))}${G('s1-c3', 1750, 280, cloud(0.6, 0.85))}
    <g id="s1-rings">${rings}</g>
    ${G('s1-back', 0, 0, back)}
    ${G('s1-ig', 470, 880, indiaGate)}
    ${G('s1-qm', 820, 880, qutub)}
    ${G('s1-lt', 1160, 880, lotus)}
    ${G('s1-tw', 1420, 880, towers)}
    ${R(0, 872, 1920, 208, '#86CFA6')}${R(0, 872, 1920, 14, '#6DBE90')}
    ${G('s1-trees', 0, 0, [[110, 1], [300, 0.8], [680, 0.9], [1010, 0.75], [1330, 0.95], [1830, 0.85]].map(([x, k]) =>
      S(x, 900, k, R(-8, -70, 16, 74, '#7A5534', 4) + Ci(0, -100, 52, '#3FA26B') + Ci(-30, -78, 34, '#4DB57A') + Ci(28, -80, 36, '#4DB57A'))).join(''))}
    ${G('s1-h1', 960, 210, T(0, 0, 'दिल्ली और उसके आसपास फैलता हुआ', { size: 60, w: 700 }))}
    ${chip('s1-ncr', 960, 320, 'Delhi NCR', { size: 64, bg: C.saf, fg: C.ink, w: 800 })}
  `;
}, t => {
  tl.fromTo(I('s1-sun'), { y: 260 }, { y: 0, duration: 3.5, ease: 'power2.out' }, 0);
  tl.to(I('s1-c1'), { x: 90, duration: 4.6, ease: 'none' }, 0);
  tl.to(I('s1-c2'), { x: 70, duration: 4.6, ease: 'none' }, 0);
  tl.to(I('s1-c3'), { x: -60, duration: 4.6, ease: 'none' }, 0);
  riseIn(I('s1-back'), 0.1, { y: 300, d: 1.2 });
  riseIn(I('s1-trees'), 0.5, { y: 160, d: 0.9 });
  ['s1-ig', 's1-qm', 's1-lt', 's1-tw'].forEach((id, i) => riseIn(I(id), 0.4 + i * 0.22, { y: 520, d: 1.0, ease: 'back.out(1.2)' }));
  riseIn(I('s1-h1'), 1.3);
  document.querySelectorAll('#s1-rings .ring').forEach((el, i) => {
    tl.fromTo(el, { attr: { r: 100 }, opacity: 0.8 }, { attr: { r: 1100 }, opacity: 0, duration: 2.2, ease: 'power1.out' }, 2.1 + i * 0.5);
  });
  popIn(I('s1-ncr'), 3.5);
});

// =====================================================================
// S2 — every mohalla, every day: a common need — medicine (4.55 – 9.75)
// =====================================================================
const S2_PEOPLE = [
  { id: 's2-p1', x: 360, o: { style: 'long', shirt: C.coral, pants: C.ink2, skin: C.skin1 } },
  { id: 's2-p2', x: 960, o: { style: 'short', shirt: C.teal, pants: '#3D3D52', skin: C.skin2 } },
  { id: 's2-p3', x: 1540, o: { style: 'grey', shirt: C.purple, pants: C.ink2, skin: C.skin3, glasses: true } },
];
scene('s2', 4.55, 9.75, '#FFF3E0', () => {
  const hs = [
    { x: -20, w: 250, h: 360, col: '#F7C873', trim: '#E0A94A', tank: true },
    { x: 238, w: 220, h: 300, col: '#F59E9E', trim: '#D97878', plant: true },
    { x: 466, w: 270, h: 420, col: '#9FD3C7', trim: '#6FB3A5', tank: true },
    { x: 744, w: 230, h: 330, col: '#C7B8F5', trim: '#9F8FD9' },
    { x: 982, w: 260, h: 390, col: '#FFD59E', trim: '#E8B068', tank: true, plant: true },
    { x: 1250, w: 222, h: 310, col: '#A8D8F0', trim: '#78B5D6' },
    { x: 1480, w: 250, h: 400, col: '#F7B7A3', trim: '#D98F7A', tank: true },
    { x: 1738, w: 210, h: 330, col: '#B9E3A8', trim: '#8CC47A', plant: true },
  ];
  const houses = hs.map((h, i) => G(`s2-h${i}`, h.x, 820, house(h))).join('');
  const people = S2_PEOPLE.map(p => G(p.id, p.x, 868, S(0, 0, 0.56, `<g class="bodyBob">${person(p.o)}</g>`))).join('');
  const bubbles = S2_PEOPLE.map((p, i) => G(`s2-b${i}`, p.x + 70, 590,
    Ci(-58, 66, 8, '#fff') + Ci(-36, 44, 12, '#fff') + Ci(10, 0, 58, '#fff') +
    `<g class="q">${T(10, 22, '?', { size: 64, fill: C.ink3, w: 800 })}</g><g class="pill" opacity="0">${S(10, 0, 0.55, icon.pill())}</g>`)).join('');
  return `
    ${G('s2-sun', 160, 170, Ci(0, 0, 70, '#FFD36E'))}
    ${G('s2-c1', 620, 150, cloud(0.7, 0.9))}${G('s2-c2', 1500, 110, cloud(0.55, 0.85))}
    ${houses}
    ${L('M-10,470 Q360,520 740,430 Q1110,510 1480,425 Q1720,480 1930,450', '#33333D', 3)}
    ${R(735, 420, 10, 410, '#6B7782', 3)}${R(1475, 415, 10, 415, '#6B7782', 3)}
    ${R(0, 818, 1920, 52, '#E8DCC8')}${R(0, 868, 1920, 212, '#65737F')}
    ${Array.from({ length: 12 }, (_, i) => R(i * 170 + 20, 968, 90, 12, '#fff', 6, 'opacity="0.8"')).join('')}
    ${people}${bubbles}
    ${chip('s2-t1', 760, 140, 'हर मोहल्ले में', { size: 52, bg: C.teal })}
    ${chip('s2-t2', 1180, 140, 'हर दिन', { size: 52, bg: C.saf, fg: C.ink })}
    ${H('s2-t3', 'एक ज़रूरत common है…', 160, { size: 60 })}
    ${G('s2-dawai', 960, 330, R(-230, -80, 460, 160, '#fff', 80, `stroke="${C.coral}" stroke-width="8"`) + S(-120, 0, 0.62, icon.pill()) + T(60, 30, 'दवाई', { size: 84, fill: C.coral, w: 700 }))}
  `;
}, t => {
  tl.to(I('s2-c1'), { x: 120, duration: 5.2, ease: 'none' }, 4.55);
  tl.to(I('s2-c2'), { x: -80, duration: 5.2, ease: 'none' }, 4.55);
  tl.fromTo(I('s2-sun'), { x: 0, y: 40 }, { x: 260, y: -30, duration: 5.2, ease: 'none' }, 4.55);
  for (let i = 0; i < 8; i++) riseIn(I(`s2-h${i}`), 4.6 + i * 0.06, { y: 120, d: 0.7 });
  S2_PEOPLE.forEach((p, i) => {
    slideIn(I(p.id), 4.9 + i * 0.15, { x: -60, d: 0.8 });
    tl.to(I(p.id), { x: 70, duration: 4, ease: 'none' }, 5.7);
    bob(`#${p.id} .bodyBob`, 5.0, 9.8, 10, 0.55);
    tl.fromTo(`#${p.id} .legL`, { rotation: 0, transformOrigin: '50% 0%' }, { rotation: 12, duration: 0.275, yoyo: true, repeat: 17, ease: 'sine.inOut' }, 5.0);
    tl.fromTo(`#${p.id} .legR`, { rotation: 0, transformOrigin: '50% 0%' }, { rotation: -12, duration: 0.275, yoyo: true, repeat: 17, ease: 'sine.inOut' }, 5.0);
  });
  popIn(I('s2-t1'), 4.9);
  popIn(I('s2-t2'), 6.37);
  fadeOut(I('s2-t1'), 7.1); fadeOut(I('s2-t2'), 7.1);
  riseIn(I('s2-t3'), 7.3);
  S2_PEOPLE.forEach((p, i) => popIn(I(`s2-b${i}`), 7.4 + i * 0.12, { origin: '0% 100%' }));
  S2_PEOPLE.forEach((p, i) => {
    tl.to(`#s2-b${i} .q`, { opacity: 0, duration: 0.2 }, 8.95);
    tl.fromTo(`#s2-b${i} .pill`, { opacity: 0, scale: 0.3, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)' }, 9.0 + i * 0.05);
  });
  fadeOut(I('s2-t3'), 8.85, 0.2);
  popIn(I('s2-dawai'), 8.99, { d: 0.6 });
});

// =====================================================================
// S3 — genuine + prescribed + discount = mushkil (9.75 – 17.35)
// =====================================================================
const S3_CARDS = [
  { x: 480, ic: icon.shield(1.15), t: 'Genuine', h: 'असली दवाई', at: 10.95 },
  { x: 960, ic: icon.rx(0.95), t: 'Prescribed', h: 'डॉक्टर की लिखी', at: 12.05 },
  { x: 1440, ic: icon.tag(1.2, '%'), t: 'Discount', h: 'अच्छी बचत', at: 14.25 },
];
scene('s3', 9.75, 17.35, C.mintL, () => `
  ${Ci(1700, 140, 180, C.mint)}${Ci(160, 960, 220, C.mint)}
  ${H('s3-h', 'लेकिन दवाई जो…', 150, { size: 58, fill: C.ink2 })}
  ${S3_CARDS.map((c, i) => G(`s3-c${i}`, c.x, 520, `<g class="cardBody">${card(380, 420)}${S(0, -70, 1, c.ic)}
      ${T(0, 92, c.t, { size: 44, w: 700, fill: C.ink })}${T(0, 146, c.h, { size: 36, w: 600, fill: C.ink3 })}</g>
      <g class="qm" opacity="0">${Ci(150, -190, 36, C.coral)}${T(150, -174, '?', { size: 48, fill: '#fff', w: 800 })}</g>`)).join('')}
  ${G('s3-plus1', 720, 520, Ci(0, 0, 34, C.teal) + T(0, 17, '+', { size: 54, fill: '#fff', w: 700 }))}
  ${G('s3-plus2', 1200, 520, Ci(0, 0, 34, C.teal) + T(0, 17, '+', { size: 54, fill: '#fff', w: 700 }))}
  ${chip('s3-hard', 1000, 880, 'ये थोड़ा मुश्किल है…', { size: 54, bg: C.coral })}
  ${G('s3-p', 230, 1080, S(0, 0, 0.72, person({ style: 'bun', shirt: C.saf, pants: C.ink2, mouth: 'worry', skin: C.skin2 })))}
`, t => {
  riseIn(I('s3-h'), 10.09);
  S3_CARDS.forEach((c, i) => popIn(I(`s3-c${i}`), c.at, { from: 0.4 }));
  popIn(I('s3-plus1'), 11.8); popIn(I('s3-plus2'), 14.0);
  // difficulty beat
  S3_CARDS.forEach((c, i) => {
    tl.to(`#s3-c${i} .cardBody`, { opacity: 0.55, duration: 0.3 }, 15.98);
    tl.fromTo(`#s3-c${i} .qm`, { opacity: 0, scale: 0, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2.5)' }, 16.05 + i * 0.1);
    tl.to(I(`s3-c${i}`), { rotation: i === 1 ? 3 : (i ? 4 : -4), duration: 0.12, yoyo: true, repeat: 5, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 16.0);
  });
  popIn(I('s3-hard'), 16.0);
  slideIn(I('s3-p'), 15.9, { y: 260, d: 0.6 });
  tl.fromTo('#s3-p .armR .arm', { rotation: 0, transformOrigin: '50% 5%' }, { rotation: 150, duration: 0.4, ease: 'back.out(1.5)' }, 16.3);
  tl.to('#s3-p .head', { rotation: -6, duration: 0.3, yoyo: true, repeat: 3, transformOrigin: '50% 100%' }, 16.4);
});

// =====================================================================
// S4 — the idea → Jan Seva Dawa Bazaar → a chain (17.35 – 24.75)
// =====================================================================
scene('s4', 17.35, 24.75, C.cream, () => `
  ${Ci(960, 600, 520, '#FFEFD6')}
  ${H('s4-h0', 'इसी ज़रूरत से…', 150, { size: 58, fill: C.ink2 })}
  ${G('s4-bulb', 960, 520, S(0, 0, 1.5, icon.bulb()))}
  ${G('s4-name', 960, 150, T(0, 0, 'जन सेवा दवा बाज़ार', { size: 84, w: 700, fill: C.teal }))}
  ${H('s4-sub', 'की शुरुआत हुई', 232, { size: 46, w: 600, fill: C.ink2 })}
  ${chip('s4-chain', 960, 262, 'एक Retail Pharmacy Chain', { size: 46, bg: C.saf, fg: C.ink, w: 700 })}
  ${G('s4-link', 0, 0, L('M610,880 L790,880', C.teal, 8, 'stroke-dasharray="4 22"') + L('M1130,880 L1310,880', C.teal, 8, 'stroke-dasharray="4 22"'))}
  ${G('s4-stL', 430, 960, S(0, 0, 0.62, storeArt({ name: 'जन सेवा दवा बाज़ार' })))}
  ${G('s4-stR', 1490, 960, S(0, 0, 0.62, storeArt({ name: 'जन सेवा दवा बाज़ार' })))}
  ${G('s4-store', 960, 960, storeArt({ name: 'जन सेवा दवा बाज़ार' }))}
  ${confetti('s4-cf', 960, 600, 26, 11)}
`, t => {
  riseIn(I('s4-h0'), 17.65);
  popIn(I('s4-bulb'), 17.7, { d: 0.6 });
  spin('#s4-bulb .rays', 17.7, 19.2, 60);
  fadeOut(I('s4-h0'), 18.7, 0.25);
  tl.to(I('s4-bulb'), { scale: 0.2, y: -80, opacity: 0, duration: 0.45, ease: 'power2.in' }, 18.75);
  tl.fromTo(I('s4-store'), { y: 520, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.3)' }, 18.84);
  popIn(I('s4-name'), 19.0, { from: 0.6 });
  riseIn(I('s4-sub'), 19.5);
  burst('s4-cf', 19.4);
  tl.to('#s4-store .glow', { scale: 1.5, opacity: 0.2, duration: 0.6, yoyo: true, repeat: 7, transformOrigin: '50% 50%' }, 19.6);
  fadeOut(I('s4-sub'), 21.5, 0.25);
  tl.to(I('s4-store'), { scale: 0.62, duration: 0.9, ease: 'power3.inOut', transformOrigin: '50% 100%' }, 21.66);
  slideIn(I('s4-stL'), 22.1, { x: -200, d: 0.7 });
  slideIn(I('s4-stR'), 22.25, { x: 200, d: 0.7 });
  tl.fromTo(I('s4-link'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, 22.7);
  tl.to('#s4-link path', { attr: { 'stroke-dashoffset': -104 }, duration: 2, ease: 'none' }, 22.7);
  popIn(I('s4-chain'), 23.0);
});

// =====================================================================
// S5 — Rx medicines + healthcare products → retail distribution (24.75 – 29.55)
// =====================================================================
scene('s5', 24.75, 29.55, C.skyL, () => `
  ${Ci(120, 120, 200, C.sky)}${Ci(1820, 980, 240, C.sky)}
  ${G('s5-l', 540, 430, card(640, 420) + R(-320, -210, 640, 92, C.coral, 28) + R(-320, -150, 640, 32, C.coral) +
    T(0, -150, 'Prescription Medicines', { size: 40, fill: '#fff', w: 700 }) +
    `<g class="ic">${G('', -190, 60, icon.bottle(1.0, C.orange))}${G('', 0, 70, icon.strip(1.0))}${G('', 190, 60, icon.pill(0.85))}</g>`)}
  ${G('s5-r', 1380, 430, card(640, 420) + R(-320, -210, 640, 92, C.blue, 28) + R(-320, -150, 640, 32, C.blue) +
    T(0, -150, 'Healthcare Products', { size: 40, fill: '#fff', w: 700 }) +
    `<g class="ic">${G('', -210, 70, icon.thermo(0.9))}${G('', -60, 60, icon.bp(0.85))}${G('', 100, 60, icon.sanitizer(0.85))}${G('', 225, 80, icon.bandage(0.7))}</g>`)}
  ${G('s5-arr', 0, 0, L('M540,660 C540,780 760,800 840,850', C.ink3, 7, 'stroke-dasharray="14 14"') + L('M1380,660 C1380,780 1160,800 1080,850', C.ink3, 7, 'stroke-dasharray="14 14"'))}
  ${chip('s5-dist', 960, 900, 'Retail Distribution', { size: 52, bg: C.teal, w: 700 })}
`, t => {
  popIn(I('s5-l'), 25.1, { from: 0.5 });
  document.querySelectorAll('#s5-l .ic > g').forEach((el, i) => popIn(el.firstElementChild, 25.45 + i * 0.18));
  popIn(I('s5-r'), 26.6, { from: 0.5 });
  document.querySelectorAll('#s5-r .ic > g').forEach((el, i) => popIn(el.firstElementChild, 26.95 + i * 0.15));
  fadeIn(I('s5-arr'), 27.9, 0.4);
  tl.fromTo('#s5-arr path', { attr: { 'stroke-dashoffset': 0 } }, { attr: { 'stroke-dashoffset': -112 }, duration: 1.7, ease: 'none' }, 27.9);
  popIn(I('s5-dist'), 28.1);
});

// =====================================================================
// S6 — Delhi NCR & Gurugram branch network (29.55 – 33.55)
// =====================================================================
scene('s6', 29.55, 33.55, '#F4FBF8', () => `
  ${G('s6-map', 370, 150, S(0, 0, 1.15, `<g class="regions">${mapArt('s6m')}</g><g class="net"></g><g class="pins"></g>`))}
  ${H('s6-h', 'दिल्ली NCR और गुड़गांव में', 120, { size: 58 })}
  ${chip('s6-chip', 960, 200, 'Branch Network', { size: 40, bg: C.teal })}
`, t => {
  riseIn(I('s6-h'), 29.8);
  MAP.regions.forEach((r, i) => popIn(`#s6m-${r.key}`, 29.7 + i * 0.1, { from: 0.7, d: 0.6, ease: 'back.out(1.4)' }));
  const pins = [...document.querySelectorAll('#s6-map .pins > g')];
  pins.forEach((p, i) => dropIn(p.firstElementChild, 30.4 + i * 0.13, 120));
  fadeIn('#s6-map .net', 32.0, 0.6);
  tl.fromTo('#s6-map .net path', { attr: { 'stroke-dashoffset': 0 } }, { attr: { 'stroke-dashoffset': -60 }, duration: 1.5, ease: 'none' }, 32.0);
  popIn(I('s6-chip'), 32.05);
});

// =====================================================================
// S7 — journey starts at the stock room; direct procurement; bulk (33.55 – 42.2)
// =====================================================================
scene('s7', 33.55, 42.2, 'url(#skyG2)', () => `
  <g class="cam">
    ${R(0, 0, 1920, 1080, 'none')}
    ${G('s7-c1', 300, 180, cloud(0.8, 0.9))}${G('s7-c2', 1100, 130, cloud(0.6, 0.8))}
    ${R(-600, 760, 3200, 400, '#9AD7AE')}${R(-600, 840, 3200, 110, '#6F7D89')}
    ${Array.from({ length: 16 }, (_, i) => R(i * 190 - 540, 890, 100, 10, '#fff', 5, 'opacity="0.8"')).join('')}
    ${G('s7-fac', 250, 780, factoryArt())}
    ${G('s7-dis', 640, 780, distributorArt())}
    ${G('s7-wh', 1560, 780, warehouseArt('s7clip'))}
    ${G('s7-truck', 520, 930, S(0, 0, 0.85, truckArt()))}
    <g id="s7-boxes">${[[1500, 950, 0], [1590, 950, 1], [1680, 950, 2], [1545, 872, 3], [1635, 872, 4], [1590, 794, 5]].map(([x, y, i]) => G(`s7-bx${i}`, x, y, boxArt(86, 78))).join('')}</g>
  </g>
  ${H('s7-h', 'हर दवाई का सफ़र', 130, { size: 60 })}
  ${chip('s7-sr', 960, 215, 'Stock Room से शुरू', { size: 42, bg: C.teal })}
  ${chip('s7-dp', 960, 130, 'Direct Procurement', { size: 52, bg: C.teal, w: 700 })}
  ${chip('s7-m', 250, 1000, 'Manufacturers', { size: 32, bg: C.blue })}
  ${chip('s7-d', 650, 1000, 'Authorized Distributors', { size: 32, bg: C.purple })}
  ${chip('s7-bulk', 1590, 655, 'Bulk Quantity', { size: 40, bg: C.saf, fg: C.ink, w: 700 })}
`, t => {
  tl.set('#s7 .cam', { scale: 1.55, x: -600, y: -40, svgOrigin: '1560 600' }, 33.5);
  riseIn(I('s7-h'), 33.83);
  popIn(I('s7-sr'), 35.0);
  tl.fromTo('#s7-wh .shutter', { y: 0 }, { y: -232, duration: 1.0, ease: 'power2.inOut' }, 35.1);
  tl.to('#s7 .cam', { scale: 1, x: 0, y: 0, duration: 1.3, ease: 'power3.inOut' }, 36.7);
  fadeOut(I('s7-h'), 36.6, 0.3); fadeOut(I('s7-sr'), 36.6, 0.3);
  popIn(I('s7-dp'), 37.0);
  riseIn(I('s7-fac'), 37.2, { y: 120 }); popIn(I('s7-m'), 37.6);
  riseIn(I('s7-dis'), 38.4, { y: 120 }); popIn(I('s7-d'), 38.8);
  tl.to('#s7-fac .smoke', { y: -30, opacity: 0.4, duration: 1.2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 37.6);
  tl.fromTo(I('s7-truck'), { x: -700, opacity: 1 }, { x: 0, duration: 1.4, ease: 'power2.out' }, 36.9);
  tl.to(I('s7-truck'), { x: 560, duration: 2.0, ease: 'power2.inOut' }, 38.6);
  spin('#s7-truck .wheel', 36.9, 40.6, 1440);
  bob('#s7-truck .truck', 37.0, 40.6, 3, 0.3);
  for (let i = 0; i < 6; i++) dropIn(I(`s7-bx${i}`), 40.95 + i * 0.12, 300);
  popIn(I('s7-bulk'), 41.0);
});

// =====================================================================
// S8 — batch / mfg / expiry recorded at entry (42.2 – 48.75)
// =====================================================================
const S8_ROWS = [
  { k: 'Batch No.', v: 'JSD-B2417', at: 43.6 },
  { k: 'Mfg. Date', v: '04 / 2026', at: 44.85 },
  { k: 'Expiry', v: '03 / 2028', at: 46.15 },
];
scene('s8', 42.2, 48.75, C.greyLL, () => `
  ${Ci(1800, 120, 200, '#E6EEF4')}
  ${H('s8-h', 'हर Incoming Consignment', 120, { size: 56 })}
  ${R(60, 780, 940, 40, '#3C4A57', 20)}${Array.from({ length: 12 }, (_, i) => Ci(90 + i * 80, 800, 12, '#8796A3')).join('')}
  ${R(120, 820, 16, 140, '#3C4A57')}${R(920, 820, 16, 140, '#3C4A57')}
  ${G('s8-box', 200, 780, boxArt(170, 150, { tag: R(20, -64, 52, 34, '#fff', 3) + Array.from({ length: 8 }, (_, i) => R(25 + i * 5.5, -58, i % 3 ? 2 : 3.5, 22, C.ink)).join('') }))}
  ${G('s8-scan', 640, 780, P('M-140,0 L-140,-300 Q-140,-330 -110,-330 L110,-330 Q140,-330 140,-300 L140,0 L110,0 L110,-300 L-110,-300 L-110,0Z', C.ink2) + R(-60, -326, 120, 18, C.green, 8) +
    `<g class="beam" opacity="0">${R(-108, -296, 216, 6, C.coral, 3)}${R(-108, -296, 216, 40, C.coral, 3, 'opacity="0.18"')}</g>`)}
  ${G('s8-panel', 1420, 560, card(760, 600) + R(-380, -300, 760, 110, C.teal, 28) + R(-380, -230, 760, 40, C.teal) +
    T(-330, -228, 'Incoming Consignment', { size: 38, fill: '#fff', w: 700, a: 'start' }) + S(310, -245, 0.5, logoMark(40)) +
    S8_ROWS.map((r, i) => `<g class="row r${i}" opacity="0">${R(-330, -150 + i * 120, 660, 96, '#F3F8F7', 18)}
      ${T(-300, -88 + i * 120, r.k, { size: 32, fill: C.ink3, w: 600, a: 'start' })}${T(150, -88 + i * 120, r.v, { size: 38, fill: C.ink, w: 700, a: 'middle' })}
      ${S(286, -102 + i * 120, 0.7, icon.check())}</g>`).join(''))}
  ${G('s8-stamp', 1500, 835, `<g transform="rotate(-10)">${R(-200, -54, 400, 108, 'none', 16, `stroke="${C.green}" stroke-width="8"`)}${T(0, 18, 'RECORDED ✓', { size: 50, fill: C.green, w: 800, ls: 2 })}</g>`)}
`, t => {
  riseIn(I('s8-h'), 42.4);
  popIn(I('s8-panel'), 42.5, { from: 0.6 });
  tl.fromTo(I('s8-box'), { x: -320, opacity: 1 }, { x: 440, duration: 1.1, ease: 'power2.out' }, 42.4);
  tl.fromTo('#s8-scan .beam', { opacity: 0, y: 0 }, { opacity: 1, duration: 0.1 }, 43.4);
  tl.to('#s8-scan .beam', { y: 250, duration: 0.6, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 43.45);
  tl.to('#s8-scan .beam', { opacity: 0, duration: 0.2 }, 45.9);
  S8_ROWS.forEach((r, i) => tl.fromTo(`#s8-panel .r${i}`, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' }, r.at));
  popIn(I('s8-stamp'), 47.3, { from: 2.2, ease: 'power4.out', d: 0.35 });
  tl.to(I('s8-box'), { x: 1100, opacity: 0, duration: 0.9, ease: 'power2.in' }, 47.5);
});

// =====================================================================
// S9 — storage rules; temperature-sensitive → controlled storage (48.75 – 55.25)
// =====================================================================
scene('s9', 48.75, 55.25, C.mintL, () => `
  ${Ci(140, 980, 260, C.mint)}
  ${H('s9-h', 'Stock रखने के अपने नियम', 130, { size: 58 })}
  ${H('s9-h2', 'Temperature Sensitive Products', 130, { size: 56, fill: C.blueD })}
  ${G('s9-book', 960, 580, S(0, 0, 2.0, icon.book()) +
    [0, 1, 2].map(i => `<g class="tick t${i}" opacity="0">${S(-50, -46 + i * 76, 0.6, icon.check())}${R(-14, -58 + i * 76, 120, 16, C.greyL, 8)}</g>`).join(''))}
  ${G('s9-fr', 1330, 920, `
    ${shadow(240, 22, 4)}
    ${R(-220, -660, 440, 660, '#E9EEF2', 30)}${R(-220, -660, 440, 660, 'none', 30, `stroke="#D3DCE3" stroke-width="6"`)}
    ${R(-130, -640, 260, 50, C.ink, 12)}<g class="disp">${T(0, -603, '2°C – 8°C', { size: 32, fill: '#5BF2B4', w: 700 })}</g>
    ${R(-190, -570, 380, 540, '#DFF4FF', 16)}
    ${[-430, -300, -170].map(y => R(-190, y, 380, 8, '#B9D7E8', 4)).join('')}
    <g class="vials">${[[-100, -436], [0, -436], [100, -436], [-60, -306], [60, -306]].map(([x, y], i) => G(`s9-v${i}`, x, y, S(0, -44, 0.6, icon.bottle(1, i % 2 ? C.blue : C.tealL)))).join('')}</g>
    <g class="door" opacity="0">${R(-196, -576, 392, 552, '#BFE6F2', 18, 'opacity="0.55"')}${P('M-150,-560 L-90,-560 L-170,-60 L-190,-60 L-190,-480Z', '#fff', 'opacity="0.35"')}${R(160, -380, 14, 140, C.greyD, 7)}</g>
    ${G('s9-snow', 0, -620, S(-210, 0, 1, Ci(0, 0, 44, C.blue) + icon.snow(0.75)))}
  `)}
  ${chip('s9-cs', 1330, 1000, 'Controlled Storage', { size: 40, bg: C.blue, w: 700 })}
`, t => {
  riseIn(I('s9-h'), 48.99);
  popIn(I('s9-book'), 49.1, { from: 0.5 });
  [0, 1, 2].forEach(i => tl.fromTo(`#s9-book .t${i}`, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.35, ease: 'back.out(2)' }, 49.6 + i * 0.4));
  fadeOut(I('s9-h'), 51.0, 0.25);
  riseIn(I('s9-h2'), 51.23);
  tl.to(I('s9-book'), { x: -490, opacity: 0.4, scale: 0.85, duration: 0.7, ease: 'power3.inOut', transformOrigin: '50% 50%' }, 51.15);
  slideIn(I('s9-fr'), 51.25, { x: 300, d: 0.8 });
  popIn(I('s9-snow'), 51.9);
  for (let i = 0; i < 5; i++) tl.fromTo(I(`s9-v${i}`), { x: -700, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 52.1 + i * 0.16);
  tl.fromTo('#s9-fr .door', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 53.5);
  tl.to('#s9-fr .disp', { opacity: 0.4, duration: 0.25, yoyo: true, repeat: 5 }, 53.5);
  popIn(I('s9-cs'), 53.4);
});

// =====================================================================
// S10 — near-expiry stock removed before reaching the shelf (55.25 – 59.65)
// =====================================================================
const S10_X = [1180, 900, 620, 340, 60, -220];
scene('s10', 55.25, 59.65, C.cream, () => `
  ${H('s10-h', 'Near Expiry Stock', 130, { size: 62, fill: C.coralD })}
  ${H('s10-sub', 'Shelf तक पहुँचने से पहले ही अलग', 210, { size: 46, w: 600, fill: C.ink2 })}
  ${R(0, 680, 1600, 40, '#3C4A57', 20)}${Array.from({ length: 20 }, (_, i) => Ci(30 + i * 80, 700, 12, '#8796A3')).join('')}
  ${R(200, 720, 16, 120, '#3C4A57')}${R(1300, 720, 16, 120, '#3C4A57')}
  ${S10_X.map((x, i) => G(`s10-b${i}`, x, 680, (i === 4 ? `<g class="warn" opacity="0">${Ci(0, -70, 110, C.coral, 'opacity="0.18"')}</g>` : '') +
    boxArt(140, 124, i === 4 ? { label: false, tag: R(-56, -78, 112, 46, C.coral, 8) + T(0, -46, 'EXP SOON', { size: 20, fill: '#fff', w: 800 }) } : {}) +
    (i === 4 ? `<g class="bang" opacity="0">${Ci(56, -150, 30, C.coral)}${T(56, -136, '!', { size: 40, fill: '#fff', w: 800 })}</g>` : ''))).join('')}
  ${G('s10-shelf', 1600, 960, R(0, -620, 340, 620, C.boxD, 12) + [0, 1, 2, 3].map(i => R(18, -600 + i * 150, 304, 130, '#FBEBD3', 6) +
    [0, 1, 2, 3].map(k => R(36 + k * 72, -600 + i * 150 + 130 - 60 - (k % 2) * 16, 54, 60 + (k % 2) * 16, [C.coral, C.blue, C.green, C.saf][(i + k) % 4], 5)).join('')).join(''))}
  ${G('s10-bin', 880, 1080, P('M-150,-210 L150,-210 L124,0 L-124,0Z', C.coral) + R(-170, -232, 340, 34, C.coralD, 10) + T(0, -90, 'अलग', { size: 46, fill: '#fff', w: 700 }))}
`, t => {
  riseIn(I('s10-h'), 55.47);
  S10_X.forEach((x, i) => {
    if (i === 4) {
      tl.fromTo(I('s10-b4'), { x: 0 }, { x: 782, duration: 3.09, ease: 'none' }, 55.3);
      tl.to(I('s10-b4'), { y: -170, duration: 0.35, ease: 'power2.out' }, 58.39);
      tl.to(I('s10-b4'), { x: 820, y: 260, rotation: 14, duration: 0.6, ease: 'power2.in' }, 58.74);
    } else {
      tl.fromTo(I(`s10-b${i}`), { x: 0 }, { x: 1100, duration: 4.35, ease: 'none' }, 55.3);
    }
  });
  tl.fromTo('#s10-b4 .warn', { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1.1, duration: 0.4, yoyo: true, repeat: 3 }, 56.9);
  popIn('#s10-b4 .bang', 57.0);
  slideIn(I('s10-bin'), 56.6, { y: 260, d: 0.6 });
  riseIn(I('s10-sub'), 56.85);
});

// =====================================================================
// S11 — category-wise shelves; 15,000+ SKUs per branch (59.65 – 72.0)
// =====================================================================
const CATS = [
  { n: 'Cardiac', ic: icon.heart(0.5, '#fff'), col: C.coral, at: 62.6 },
  { n: 'Diabetes', ic: icon.drop(0.48, '#fff'), col: C.blue, at: 63.35 },
  { n: 'Thyroid', ic: icon.butterfly(0.42, '#fff'), col: C.purple, at: 64.3 },
  { n: 'Dermatology', ic: icon.leaf(0.5, '#fff'), col: C.green, at: 65.16 },
  { n: 'Orthopedic', ic: icon.bone(0.42, '#fff'), col: C.safD, at: 66.12 },
  { n: 'Pediatric', ic: icon.baby(0.5), col: C.pink, at: 67.0 },
];
scene('s11', 59.65, 72.0, C.cream, () => {
  let comps = '';
  CATS.forEach((c, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 334 + col * 424, y = 304 + row * 306;
    let goods = '';
    for (let k = 0; k < 6; k++) {
      const h = 70 + ((k * 5 + i) % 3) * 22;
      goods += R(x + 26 + k * 62, y + 270 - h, 50, h, c.col, 6, `opacity="${0.55 + (k % 3) * 0.2}"`) + R(x + 34 + k * 62, y + 282 - h, 34, 10, '#fff', 3, 'opacity="0.7"');
    }
    comps += R(x, y, 404, 286, '#FBEBD3', 10) + `<g id="s11-g${i}"><g class="in">${goods}</g></g><g id="s11-k${i}"><g class="in">${R(x + 16, y + 14, 372, 70, c.col, 35)}
      ${Ci(x + 52, y + 49, 28, 'rgba(255,255,255,0.25)')}${S(x + 52, y + 49, 1, c.ic)}
      ${T(x + 96, y + 62, c.n, { size: 34, fill: '#fff', w: 700, a: 'start' })}</g></g>`;
  });
  return `
    ${H('s11-h', 'हर Shelf — Category-wise', 130, { size: 58 })}
    <g id="s11-shelf"><g class="in">${shadow(680, 30, 940).replace('cx="0"', 'cx="960"')}${R(310, 280, 1300, 640, C.boxD, 18)}${R(310, 280, 1300, 24, '#9C6A3A', 12)}${comps}</g></g>
    ${G('s11-num', 1430, 560, T(0, 0, '0', { size: 150, w: 800, fill: C.teal, id: 's11-count' }))}
    ${G('s11-sku', 1430, 650, T(0, 0, 'से ज़्यादा SKUs', { size: 52, w: 700, fill: C.ink }))}
    ${chip('s11-br', 1430, 780, 'हर Branch पर', { size: 44, bg: C.saf, fg: C.ink, w: 700 })}
  `;
}, t => {
  riseIn(I('s11-h'), 59.87);
  popIn(I('s11-shelf'), 60.0, { from: 0.7, d: 0.7, ease: 'back.out(1.3)' });
  CATS.forEach((c, i) => riseIn(I(`s11-g${i}`), 60.85 + i * 0.16, { y: 50, d: 0.5 }));
  CATS.forEach((c, i) => popIn(I(`s11-k${i}`), c.at - 0.05, { from: 0.3, d: 0.5 }));
  fadeOut(I('s11-h'), 67.8, 0.3);
  tl.to(I('s11-shelf'), { scale: 0.58, x: -420, duration: 0.9, ease: 'power3.inOut', svgOrigin: '960 600' }, 67.9);
  popIn(I('s11-num'), 68.3, { from: 0.5 });
  counter('s11-count', 68.56, 1.7, 0, 15000, v => v >= 15000 ? '15,000+' : fmtK(v));
  riseIn(I('s11-sku'), 69.2);
  popIn(I('s11-br'), 70.97);
});

// =====================================================================
// S12 — registered pharmacist verifies every prescription (72.0 – 76.05)
// =====================================================================
scene('s12', 72.0, 76.05, '#EAF6F2', () => {
  let wall = '';
  const cols = [C.coral, C.blue, C.green, C.saf, C.purple, C.tealL, C.orange];
  [300, 430, 560].forEach((y, r) => {
    wall += R(60, y, 1800, 14, C.boxD, 6);
    for (let k = 0; k < 34; k++) {
      const h = 50 + ((k * 7 + r * 5) % 4) * 14;
      wall += R(80 + k * 52, y - h, 40, h, cols[(k + r) % cols.length], 5, 'opacity="0.85"');
    }
  });
  return `
    ${wall}
    ${G('s12-ph', 1220, 880, S(0, 0, 1.25, `<g class="bodyBob">${person({ coat: true, style: 'short', shirt: C.tealL, skin: C.skin2, hair: '#1E1E26' })}</g>`))}
    ${R(0, 740, 1920, 340, C.teal)}${R(0, 724, 1920, 30, C.tealD, 8)}${R(80, 800, 1760, 8, '#fff', 4, 'opacity="0.15"')}
    ${chip('s12-badge', 1220, 400, 'Registered Pharmacist', { size: 36, bg: C.green, w: 700, stroke: 'stroke="#fff" stroke-width="6"' })}
    ${G('s12-cu', 470, 1090, S(0, 0, 1.15, person({ style: 'long', shirt: C.saf, pants: C.ink2, skin: C.skin1, hair: '#3A2A20' })))}
    ${G('s12-rx', 860, 700, S(0, 0, 1.25, icon.rx()))}
    ${G('s12-mag', 860, 660, icon.magnifier(1.1))}
    ${G('s12-ok', 870, 730, `<g transform="rotate(-12)">${R(-150, -44, 300, 88, 'rgba(255,255,255,0.9)', 14, `stroke="${C.green}" stroke-width="7"`)}${T(0, 16, 'VERIFIED ✓', { size: 42, fill: C.green, w: 800 })}</g>`)}
    ${H('s12-h', 'हर Prescription — Pharmacist Verified', 130, { size: 54 })}
  `;
}, t => {
  riseIn(I('s12-h'), 72.2);
  slideIn(I('s12-ph'), 72.05, { y: 120, d: 0.6 });
  slideIn(I('s12-cu'), 72.1, { x: -260, d: 0.6 });
  bob('#s12-ph .bodyBob', 72.7, 76.0, 5, 1.1);
  tl.fromTo(I('s12-rx'), { x: -330, y: 120, rotation: -30, opacity: 0, scale: 0.6 }, { x: 0, y: 0, rotation: -6, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' }, 72.6);
  tl.fromTo(I('s12-mag'), { opacity: 0, x: -80 }, { opacity: 1, x: -60, duration: 0.3 }, 73.3);
  tl.to(I('s12-mag'), { x: 60, y: 40, duration: 0.45, yoyo: true, repeat: 2, ease: 'sine.inOut' }, 73.6);
  fadeOut(I('s12-mag'), 74.85, 0.2);
  popIn(I('s12-badge'), 73.5);
  popIn(I('s12-ok'), 74.95, { from: 2, ease: 'power4.out', d: 0.35 });
  tl.fromTo('#s12-ph .armL .arm', { rotation: 0, transformOrigin: '50% 5%' }, { rotation: 35, duration: 0.4, yoyo: true, repeat: 1 }, 73.4);
});

// =====================================================================
// S13 — scheduled medicines only on valid prescription (76.05 – 79.7)
// =====================================================================
scene('s13', 76.05, 79.7, '#F4F1FF', () => `
  ${Ci(1750, 900, 260, '#E8E3FF')}${Ci(180, 160, 180, '#E8E3FF')}
  ${H('s13-h', 'Scheduled Medicines', 130, { size: 62, fill: C.purple })}
  ${H('s13-sub', 'सिर्फ Valid Prescription पर', 210, { size: 48, w: 600, fill: C.ink2 })}
  ${G('s13-box', 1200, 600, `<g class="glow" opacity="0">${Ci(0, 0, 300, C.green, 'opacity="0.15"')}</g>` + R(-200, -170, 400, 340, '#fff', 20) + R(-200, -170, 400, 340, 'none', 20, `stroke="#DCD6FF" stroke-width="6"`) +
    R(-200, -110, 400, 70, C.purple) + T(0, -62, 'SCHEDULE H', { size: 34, fill: '#fff', w: 800, ls: 3 }) + T(-110, 40, 'Rx', { size: 64, fill: C.purple, w: 800 }) + R(-30, 0, 190, 14, C.greyL, 7) + R(-30, 30, 150, 14, C.greyL, 7))}
  ${G('s13-lock', 1370, 760, `<g class="shackle">${L('M-40,-30 L-40,-74 A40,40 0 0 1 40,-74 L40,-30', C.greyD, 16)}</g>` + `<g class="lb">${R(-66, -38, 132, 116, C.saf, 18)}</g>` + Ci(0, 12, 14, C.ink) + R(-6, 16, 12, 30, C.ink, 4))}
  ${G('s13-rx', 640, 600, S(0, 0, 1.6, icon.rx()) + `<g class="valid" opacity="0">${S(70, 100, 1.1, icon.check())}</g>`)}
  ${G('s13-arrow', 900, 600, L('M-70,0 L60,0 M30,-30 L62,0 L30,30', C.green, 12))}
`, t => {
  riseIn(I('s13-h'), 76.26);
  popIn(I('s13-box'), 76.4, { from: 0.6 });
  popIn(I('s13-lock'), 76.7);
  tl.to(I('s13-lock'), { rotation: 8, duration: 0.08, yoyo: true, repeat: 5, transformOrigin: '50% 0%' }, 77.0);
  riseIn(I('s13-sub'), 77.35);
  slideIn(I('s13-rx'), 77.4, { x: -400, d: 0.6 });
  popIn('#s13-rx .valid', 77.95);
  tl.fromTo(I('s13-arrow'), { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.35 }, 78.1);
  tl.to('#s13-lock .shackle', { y: -26, duration: 0.3, ease: 'back.out(3)' }, 78.4);
  tl.to('#s13-lock .lb rect', { attr: { fill: C.green }, duration: 0.25 }, 78.4);
  tl.fromTo('#s13-box .glow', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 78.5);
  tl.to(I('s13-lock'), { y: 60, opacity: 0, duration: 0.5, ease: 'power2.in' }, 78.9);
});

// =====================================================================
// S14 — billing: batch & expiry checked again (79.7 – 84.2)
// =====================================================================
scene('s14', 79.7, 84.2, '#EEF7FF', () => `
  ${H('s14-h', 'Billing के समय', 130, { size: 60 })}
  ${H('s14-sub', 'Batch और Expiry — दोबारा Check', 210, { size: 46, w: 600, fill: C.ink2 })}
  ${R(0, 860, 1920, 220, '#CFE3F2')}${R(0, 850, 1920, 20, '#B5D0E4')}
  ${G('s14-pos', 1300, 560, R(-30, 200, 60, 110, C.ink2) + R(-150, 290, 300, 24, C.ink2, 10) + R(-360, -250, 720, 470, C.ink, 26) + R(-336, -226, 672, 410, '#fff', 12) +
    R(-336, -226, 672, 70, C.teal, 12) + R(-336, -180, 672, 24, C.teal) + T(-300, -176, 'BILL', { size: 34, fill: '#fff', w: 800, a: 'start', ls: 3 }) + S(290, -190, 0.42, logoMark(40)) +
    `<g class="item" opacity="0">${R(-306, -120, 612, 70, C.greyLL, 12)}${T(-280, -73, 'Tablet Strip × 2', { size: 30, fill: C.ink, w: 600, a: 'start' })}${T(280, -73, '₹160', { size: 30, fill: C.ink, w: 700, a: 'end' })}</g>` +
    [['Batch', 'JSD-B2417'], ['Expiry', '03 / 2028']].map(([k, v], i) => `<g class="ck c${i}" opacity="0">${R(-306, -30 + i * 86, 612, 70, '#EAF8F2', 12)}
      ${T(-280, 17 + i * 86, k, { size: 30, fill: C.ink3, w: 600, a: 'start' })}${T(40, 17 + i * 86, v, { size: 32, fill: C.ink, w: 700 })}${S(250, 5 + i * 86, 0.62, icon.check())}</g>`).join(''))}
  ${chip('s14-dc', 1300, 950, 'Double Checked ✓', { size: 42, bg: C.green, w: 700 })}
  ${G('s14-item', 760, 700, boxArt(150, 120, { label: false, tag: R(-50, -86, 100, 50, '#fff', 4) + Array.from({ length: 12 }, (_, i) => R(-42 + i * 7, -80, i % 3 ? 3 : 5, 36, C.ink)).join('') }))}
  ${G('s14-gun', 400, 640, `<g class="beam" opacity="0">${P('M140,-10 L360,-50 L360,70 L140,10Z', C.coral, 'opacity="0.25"')}${L('M150,0 L360,10', C.coral, 4)}</g>` +
    R(-110, -40, 260, 80, C.ink2, 30) + P('M-60,30 L0,30 L30,180 L-34,180Z', C.ink2) + R(120, -24, 30, 48, C.coral, 6) + R(-40, 40, 26, 50, C.saf, 8))}
`, t => {
  riseIn(I('s14-h'), 79.9);
  popIn(I('s14-pos'), 80.0, { from: 0.6 });
  slideIn(I('s14-gun'), 80.0, { x: -300 });
  slideIn(I('s14-item'), 80.1, { y: 200 });
  tl.fromTo('#s14-gun .beam', { opacity: 0 }, { opacity: 1, duration: 0.08, yoyo: true, repeat: 5 }, 80.6);
  tl.fromTo('#s14-pos .item', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.35 }, 80.95);
  riseIn(I('s14-sub'), 81.0);
  tl.fromTo('#s14-pos .c0', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.4 }, 81.6);
  tl.fromTo('#s14-pos .c1', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.4 }, 82.5);
  popIn(I('s14-dc'), 83.1);
});

// =====================================================================
// S15 — fewer layers in the chain; savings passed on (84.2 – 92.25)
// =====================================================================
const NODES = [
  { n: 'Manufacturer', col: C.blue, art: S(0, 52, 0.36, factoryArt()) },
  { n: 'Super Stockist', col: C.purple, art: S(0, 40, 0.75, boxArt(80, 70) + S(0, -70, 1, boxArt(64, 56))) },
  { n: 'Distributor', col: C.safD, art: S(0, 38, 0.3, truckArt()) },
  { n: 'Wholesaler', col: C.orange, art: S(0, 50, 0.24, warehouseArt()) },
  { n: 'Retailer', col: C.coral, art: S(0, 48, 0.2, storeArt({ name: 'जन सेवा दवा बाज़ार' })) },
  { n: 'You', col: C.green, art: icon.family(0.5) },
];
scene('s15', 84.2, 92.25, '#FFF9F0', () => {
  const xs = [210, 510, 810, 1110, 1410, 1710];
  const node = (i, x, n, col, art) => G(`s15-n${i}`, x, 520, Ci(0, 0, 92, col, 'opacity="0.18"') + Ci(0, 0, 80, '#fff') + Ci(0, 0, 80, 'none', `stroke="${col}" stroke-width="8"`) +
    `<g clip-path="url(#s15clip)">${art}</g>` + T(0, 140, n, { size: 30, w: 700, fill: C.ink }) + `<g class="x" opacity="0">${S(56, -60, 0.9, icon.cross())}</g>`);
  return `
    <defs><clipPath id="s15clip"><circle r="74"/></clipPath></defs>
    ${H('s15-h', 'Direct Procurement', 120, { size: 60, fill: C.teal })}
    ${H('s15-sub', 'बीच की layers कम', 200, { size: 48, w: 600, fill: C.ink2 })}
    ${H('s15-sub2', 'Saving → Pricing में Pass', 200, { size: 48, w: 700, fill: C.greenD })}
    <g id="s15-arrows">${xs.slice(0, 5).map((x, i) => G(`s15-a${i}`, x + 150, 520, L('M-34,0 L30,0 M12,-18 L32,0 L12,18', C.ink3, 8))).join('')}</g>
    ${NODES.map((nd, i) => node(i, xs[i], nd.n, nd.col, nd.art)).join('')}
    ${G('s15-j', 960, 520, Ci(0, 0, 108, C.teal, 'opacity="0.18"') + Ci(0, 0, 96, '#fff') + Ci(0, 0, 96, 'none', `stroke="${C.teal}" stroke-width="10"`) + logoMark(62) +
      T(0, 160, 'Jan Seva Dawa Bazaar', { size: 32, w: 800, fill: C.teal }))}
    ${G('s15-a6', 760, 520, L('M-40,0 L36,0 M14,-20 L38,0 L14,20', C.teal, 10))}
    ${G('s15-a7', 1160, 520, L('M-40,0 L36,0 M14,-20 L38,0 L14,20', C.teal, 10))}
    <g id="s15-coins">${Array.from({ length: 9 }, (_, i) => G(`s15-co${i}`, 640 + (i % 3) * 120, 900 + Math.floor(i / 3) * 40, icon.coin(0.9))).join('')}</g>
    ${G('s15-save', 1360, 300, R(-130, -40, 260, 80, C.green, 40) + T(0, 14, 'बचत ₹', { size: 40, fill: '#fff', w: 700 }))}
  `;
}, t => {
  riseIn(I('s15-h'), 84.42);
  for (let i = 0; i < 6; i++) popIn(I(`s15-n${i}`), 84.6 + i * 0.18, { from: 0.4 });
  for (let i = 0; i < 5; i++) tl.fromTo(I(`s15-a${i}`), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 }, 84.75 + i * 0.18);
  riseIn(I('s15-sub'), 85.81);
  [1, 2, 3, 4].forEach((n, k) => popIn(`#s15-n${n} .x`, 86.3 + k * 0.15));
  [1, 2, 3, 4].forEach((n, k) => tl.to(I(`s15-n${n}`), { y: 640, rotation: k % 2 ? 25 : -25, opacity: 0, duration: 0.7, ease: 'power2.in' }, 87.85 + k * 0.06));
  fadeOut('#s15-arrows', 87.85, 0.3);
  tl.to(I('s15-n0'), { x: 350, duration: 0.7, ease: 'power3.inOut' }, 88.3);
  tl.to(I('s15-n5'), { x: -350, duration: 0.7, ease: 'power3.inOut' }, 88.3);
  popIn(I('s15-j'), 88.5, { from: 0.3 });
  popIn(I('s15-a6'), 88.9); popIn(I('s15-a7'), 89.0);
  fadeOut(I('s15-sub'), 89.0, 0.25);
  riseIn(I('s15-sub2'), 89.2);
  for (let i = 0; i < 9; i++) {
    const el = I(`s15-co${i}`);
    tl.fromTo(el, { opacity: 0, scale: 0.4, x: 0, y: 0 }, { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2)', transformOrigin: '50% 50%' }, 89.4 + i * 0.12);
    tl.to(el, { x: 1360 - (640 + (i % 3) * 120), y: 520 - (900 + Math.floor(i / 3) * 40), scale: 0.4, opacity: 0, duration: 0.6, ease: 'power2.in' }, 89.75 + i * 0.12);
  }
  popIn(I('s15-save'), 90.6);
  tl.to(I('s15-n5'), { scale: 1.12, duration: 0.18, yoyo: true, repeat: 5, transformOrigin: '50% 50%' }, 90.4);
});

// =====================================================================
// S16 — flat 20% off printed MRP (92.25 – 95.2)
// =====================================================================
scene('s16', 92.25, 95.2, '#FFF1D6', () => {
  let star = '';
  const n = 16, ro = 230, ri = 190;
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI * i) / n, r = i % 2 ? ri : ro;
    star += `${i ? 'L' : 'M'}${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`;
  }
  return `
    ${Ci(960, 560, 520, '#FFE6B8')}
    ${G('s16-tag', 760, 560, `<g transform="rotate(-6)">${R(-370, -230, 760, 460, '#0B2238', 40, 'opacity="0.08" transform="translate(10,14)"')}
      ${P('M-330,-230 L300,-230 L400,0 L300,230 L-330,230 Q-370,230 -370,190 L-370,-190 Q-370,-230 -330,-230Z', '#fff')}
      ${Ci(320, 0, 22, '#FFF1D6')}${L('M342,0 Q420,-60 470,-160', C.ink3, 5)}
      ${T(-30, -120, 'Printed MRP', { size: 44, fill: C.ink3, w: 600 })}
      ${T(-30, 30, '₹100', { size: 150, fill: C.ink, w: 800 })}
      <g class="strike">${R(-220, -18, 380, 16, C.coral, 8)}</g>
      <g class="pay" opacity="0">${T(-30, 150, 'आप देते हैं ₹80', { size: 58, fill: C.greenD, w: 700 })}</g></g>`)}
    ${G('s16-star', 1420, 420, P(star + 'Z', C.coral) + T(0, -40, 'FLAT', { size: 52, fill: '#fff', w: 800, ls: 4 }) + T(0, 50, '20%', { size: 110, fill: '#fff', w: 800 }) + T(0, 104, 'OFF', { size: 44, fill: '#fff', w: 800, ls: 6 }))}
    ${confetti('s16-cf', 1420, 420, 26, 21)}
  `;
}, t => {
  popIn(I('s16-tag'), 92.45, { from: 0.5, d: 0.6 });
  tl.fromTo('#s16-tag .strike', { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.4, ease: 'power2.out' }, 93.1);
  tl.fromTo(I('s16-star'), { scale: 0, rotation: -120, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.8)' }, 93.75);
  burst('s16-cf', 93.9);
  tl.to(I('s16-star'), { rotation: 8, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 94.35);
  tl.fromTo('#s16-tag .pay', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, 94.0);
});

// =====================================================================
// S17 — today 40+ branches (95.2 – 98.6)
// =====================================================================
scene('s17', 95.2, 98.6, '#F4FBF8', () => `
  ${G('s17-map', 110, 100, S(0, 0, 1.15, `<g class="regions">${mapArt('s17m')}</g><g class="pins"></g>`))}
  ${chip('s17-aaj', 1540, 350, 'आज', { size: 48, bg: C.saf, fg: C.ink, w: 700 })}
  ${G('s17-num', 1540, 560, T(0, 0, '0', { size: 190, w: 800, fill: C.teal, id: 's17-count' }))}
  ${G('s17-lbl', 1540, 660, T(0, 0, 'Branches', { size: 60, w: 700, fill: C.ink }))}
`, t => {
  popIn(I('s17-map'), 95.3, { from: 0.85, d: 0.6, ease: 'power3.out' });
  popIn(I('s17-aaj'), 95.45);
  const pins = [...document.querySelectorAll('#s17-map .pins > g')];
  pins.forEach((p, i) => dropIn(p.firstElementChild, 96.3 + i * 0.035, 90));
  popIn(I('s17-num'), 96.3, { from: 0.6 });
  counter('s17-count', 96.36, 1.5, 0, 40, v => v >= 40 ? '40+' : Math.round(v));
  riseIn(I('s17-lbl'), 96.6);
});

// =====================================================================
// S18 — home delivery for those who can't come (98.6 – 103.85)
// =====================================================================
scene('s18', 98.6, 103.85, 'url(#skyG)', () => `
  ${G('s18-c1', 520, 200, cloud(0.7, 0.9))}${G('s18-c2', 1300, 150, cloud(0.55, 0.85))}
  ${R(0, 820, 1920, 260, '#9AD7AE')}${R(0, 880, 1920, 110, '#6F7D89')}${Array.from({ length: 11 }, (_, i) => R(i * 190 + 30, 930, 100, 10, '#fff', 5, 'opacity="0.8"')).join('')}
  ${G('s18-store', 300, 880, S(0, 0, 0.6, storeArt({ name: 'जन सेवा दवा बाज़ार' })))}
  ${G('s18-house', 1380, 880, house({ w: 420, h: 440, col: '#F7C873', trim: '#E0A94A', tank: true, plant: true }))}
  ${G('s18-old', 1690, 910, S(0, 0, 0.78, person({ style: 'grey', glasses: true, stick: true, shirt: '#8E7CC3', pants: C.ink2, skin: C.skin2, mouth: 'smile' })))}
  ${G('s18-phone', 1810, 420, icon.phone(0.95) + `<g class="ok" opacity="0">${S(48, -86, 0.8, icon.check())}</g>`)}
  ${G('s18-sc', 520, 1000, S(0, 0, 1, scooterArt()))}
  ${G('s18-pkg', 1600, 760, boxArt(70, 60))}
  ${G('s18-heart', 1700, 560, icon.heart(1.0))}
  ${H('s18-h', 'जो Store तक नहीं आ सकते…', 130, { size: 58 })}
  ${chip('s18-hd', 960, 220, 'Home Delivery', { size: 50, bg: C.green, w: 700 })}
`, t => {
  tl.to(I('s18-c1'), { x: 100, duration: 5.3, ease: 'none' }, 98.6);
  riseIn(I('s18-h'), 98.82);
  slideIn(I('s18-old'), 98.9, { x: 80 });
  tl.fromTo('#s18-old .head', { rotation: 0, transformOrigin: '50% 100%' }, { rotation: 6, duration: 0.5, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 99.4);
  popIn(I('s18-phone'), 101.3);
  popIn('#s18-phone .ok', 101.8);
  popIn(I('s18-hd'), 102.2);
  tl.fromTo(I('s18-sc'), { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 }, 101.5);
  tl.to(I('s18-sc'), { x: 820, duration: 1.6, ease: 'power2.inOut' }, 101.8);
  spin('#s18-sc .wheel', 101.5, 103.4, 1080);
  bob('#s18-sc .riderBob', 101.6, 103.4, 4, 0.3);
  tl.fromTo(I('s18-pkg'), { opacity: 0, x: -260, y: 60 }, { opacity: 1, x: 0, y: 0, duration: 0.45, ease: 'power2.out' }, 103.3);
  popIn(I('s18-heart'), 103.5);
  tl.fromTo('#s18-old .armL .arm', { rotation: 0, transformOrigin: '50% 5%' }, { rotation: 60, duration: 0.3 }, 103.25);
});

// =====================================================================
// S19 — soon 100+ branches; easy service to every home (103.85 – 110.45)
// =====================================================================
const S19_HOUSES = [[230, 560], [470, 420], [760, 360], [1160, 360], [1450, 420], [1690, 560], [260, 930], [1660, 930]];
scene('s19', 103.85, 110.45, '#F4FBF8', () => `
  <g id="s19-a">
    ${G('s19-map', 110, 100, S(0, 0, 1.15, `<g class="regions">${mapArt('s19m')}</g><g class="pins"></g><g class="pins2"></g>`))}
    ${chip('s19-soon', 1540, 350, 'बहुत जल्द', { size: 46, bg: C.coral, w: 700 })}
    ${G('s19-num', 1540, 560, T(0, 0, '40+', { size: 190, w: 800, fill: C.teal, id: 's19-count' }))}
    ${G('s19-lbl', 1540, 660, T(0, 0, 'Branches', { size: 60, w: 700, fill: C.ink }))}
  </g>
  <g id="s19-b" opacity="0">
    ${R(0, 0, 1920, 1080, '#F4FBF8')}
    ${Ci(960, 700, 420, '#E1F5EC')}
    <g class="lines">${S19_HOUSES.map(([x, y]) => L(`M960,700 L${x},${y - 60}`, C.tealL, 6, 'stroke-dasharray="10 14"')).join('')}</g>
    ${S19_HOUSES.map(([x, y], i) => G(`s19-h${i}`, x - 100, y, S(0, 0, 0.5, house({ w: 400, h: 330, col: ['#F7C873', '#F59E9E', '#9FD3C7', '#C7B8F5', '#FFD59E', '#A8D8F0', '#F7B7A3', '#B9E3A8'][i], trim: '#D9C3A0', tank: i % 2 === 0 })) +
      `<g class="ok" opacity="0">${S(100, -200, 0.75, icon.check())}</g>`)).join('')}
    ${G('s19-st', 960, 860, S(0, 0, 0.52, storeArt({ name: 'जन सेवा दवा बाज़ार' })))}
    ${H('s19-h', 'Service — हर घर तक आसान', 130, { size: 60 })}
  </g>
`, t => {
  const p1 = [...document.querySelectorAll('#s19-map .pins > g')];
  p1.forEach(p => tl.set(p.firstElementChild, { opacity: 1 }, 103.85));
  popIn(I('s19-soon'), 104.1);
  const p2 = [...document.querySelectorAll('#s19-map .pins2 > g')];
  p2.forEach((p, i) => popIn(p.firstElementChild, 104.9 + i * 0.03, { d: 0.35 }));
  tl.to(I('s19-num'), { scale: 1.15, duration: 0.2, yoyo: true, repeat: 1, transformOrigin: '50% 50%' }, 105.9);
  counter('s19-count', 105.9, 1.2, 40, 100, v => v >= 100 ? '100+' : Math.round(v) + '+');
  tl.fromTo('#s19-b', { opacity: 0 }, { opacity: 1, duration: 0.45 }, 107.35);
  popIn(I('s19-st'), 107.45, { from: 0.5 });
  riseIn(I('s19-h'), 107.51);
  fadeIn('#s19-b .lines', 107.8, 0.5);
  tl.fromTo('#s19-b .lines path', { attr: { 'stroke-dashoffset': 0 } }, { attr: { 'stroke-dashoffset': -96 }, duration: 2.6, ease: 'none' }, 107.8);
  S19_HOUSES.forEach((h, i) => {
    popIn(I(`s19-h${i}`), 107.6 + i * 0.08, { from: 0.5 });
    popIn(`#s19-h${i} .ok`, 108.3 + i * 0.18);
  });
});

// =====================================================================
// S20 — vision: grow the network step by step (110.45 – 114.5)
// =====================================================================
const S20_ST = [[470, 930, 0.44], [1450, 930, 0.44], [690, 760, 0.26], [1230, 760, 0.26], [820, 655, 0.15], [1100, 655, 0.15], [890, 598, 0.08], [1030, 598, 0.08]];
scene('s20', 110.45, 114.5, 'url(#sunG)', () => `
  ${G('s20-sun', 960, 560, Ci(0, 0, 230, '#FFE29A', 'opacity="0.5"') + Ci(0, 0, 150, '#FFC857'))}
  ${R(0, 560, 1920, 520, '#9AD7AE')}
  ${P('M930,560 L990,560 L1440,1080 L480,1080Z', '#6F7D89')}
  <g id="s20-dash">${Array.from({ length: 9 }, (_, i) => { const f = i / 9, y = 570 + Math.pow(f, 1.6) * 520, h = 8 + f * 50, w = 4 + f * 18; return R(960 - w / 2, y, w, h, '#fff', 3, 'opacity="0.9"'); }).join('')}</g>
  ${S20_ST.slice().reverse().map(([x, y, s], i) => G(`s20-s${S20_ST.length - 1 - i}`, x, y, S(0, 0, s, storeArt({ name: 'जन सेवा दवा बाज़ार' })))).join('')}
  ${chip('s20-v', 960, 120, 'Vision', { size: 50, bg: C.saf, fg: C.ink, w: 800 })}
  ${H('s20-h', 'Network को धीरे-धीरे आगे बढ़ाना', 225, { size: 56 })}
`, t => {
  tl.fromTo(I('s20-sun'), { y: 120 }, { y: 0, duration: 4, ease: 'power1.out' }, 110.45);
  popIn(I('s20-v'), 110.69);
  tl.fromTo('#s20-dash', { y: 0 }, { y: 30, duration: 0.5, repeat: 7, ease: 'none' }, 110.5);
  riseIn(I('s20-h'), 111.8);
  S20_ST.forEach((s, i) => popIn(I(`s20-s${i}`), 111.6 + i * 0.28, { from: 0.2, origin: '50% 100%' }));
});

// =====================================================================
// S21 — right medicine, lower cost, more families (114.5 – 119.1)
// =====================================================================
const VALS = [
  { x: 430, ic: icon.shield(1.1), h: 'सही दवाई', e: 'Right Medicine', at: 114.74, col: C.green },
  { x: 960, ic: icon.rupee(1.05), h: 'कम खर्च', e: 'Lower Cost', at: 116.02, col: C.saf },
  { x: 1490, ic: icon.family(0.95), h: 'ज़्यादा परिवारों तक', e: 'More Families', at: 117.16, col: C.coral },
];
scene('s21', 114.5, 119.1, C.mintL, () => `
  ${Ci(1780, 140, 220, C.mint)}${Ci(140, 980, 240, C.mint)}
  ${H('s21-h', 'ताकि…', 140, { size: 60, fill: C.ink2 })}
  ${VALS.map((v, i) => G(`s21-c${i}`, v.x, 580, card(440, 470) + R(-220, -235, 440, 18, v.col, 9) + S(0, -70, 1, v.ic) +
    T(0, 110, v.h, { size: v.h.length > 10 ? 50 : 62, w: 700, fill: C.ink }) + T(0, 168, v.e, { size: 32, w: 600, fill: C.ink3 }))).join('')}
`, t => {
  riseIn(I('s21-h'), 114.6);
  VALS.forEach((v, i) => popIn(I(`s21-c${i}`), v.at, { from: 0.4 }));
});

// =====================================================================
// S22 — end card (119.1 – end)
// =====================================================================
scene('s22', 119.1, DUR, 'url(#endG)', () => `
  ${Ci(260, 200, 240, '#ffffff', 'opacity="0.05"')}${Ci(1700, 900, 300, '#ffffff', 'opacity="0.05"')}
  ${G('s22-logo', 960, 360, Ci(0, 0, 150, '#fff', 'opacity="0.12"') + logoMark(110))}
  ${G('s22-name', 960, 620, T(0, 0, 'जन सेवा दवा बाज़ार', { size: 96, w: 700, fill: '#fff' }))}
  ${G('s22-en', 960, 690, T(0, 0, 'JAN SEVA DAWA BAZAAR', { size: 34, w: 600, fill: C.mint, ls: 10 }))}
  ${G('s22-tag', 960, 800, R(-430, -44, 860, 88, '#ffffff', 44, 'opacity="0.12"') + T(0, 16, 'सही दवाई  •  कम खर्च  •  हर घर तक', { size: 46, w: 700, fill: C.saf }))}
  ${G('s22-loc', 960, 900, T(0, 0, 'Delhi NCR  •  Gurugram', { size: 30, w: 500, fill: C.mint }))}
`, t => {
  popIn(I('s22-logo'), 119.25, { d: 0.7 });
  riseIn(I('s22-name'), 119.55);
  riseIn(I('s22-en'), 119.8);
  popIn(I('s22-tag'), 120.1, { from: 0.6 });
  riseIn(I('s22-loc'), 120.4);
});

// ---------------------------------------------------------------------
async function init() {
  await Promise.all(['400', '500', '600', '700', '800'].map(w => document.fonts.load(`${w} 40px Poppins`)));
  await Promise.all(['400', '500', '600', '700'].map(w => document.fonts.load(`${w} 40px Hind`, 'दवाई')));
  await document.fonts.ready;

  const svg = document.getElementById('stage');
  svg.insertAdjacentHTML('beforeend', SCENES.map(s =>
    `<g id="${s.id}" class="scene" opacity="0"><g class="zoom">${R(0, 0, 1920, 1080, s.bg)}${s.html()}</g></g>`).join(''));

  // size chips to their text
  document.querySelectorAll('.chip-bg').forEach(r => {
    const t = r.nextElementSibling, w = t.getComputedTextLength(), pad = +r.dataset.pad;
    r.setAttribute('x', -w / 2 - pad); r.setAttribute('width', w + pad * 2);
  });

  // NCR map pins
  function addPins(sel, keys, n, seed, scale, col) {
    const host = document.querySelector(sel);
    const prefix = host.closest('[id$="-map"]').querySelector('.regions g').id.split('-')[0];
    const r = rng(seed), pts = [];
    let guard = 0;
    while (pts.length < n && guard++ < 20000) {
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
    host.insertAdjacentHTML('beforeend', pts.map(([x, y]) => `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)})"><g>${icon.pin(scale, col)}</g></g>`).join(''));
    return pts;
  }
  const p6 = addPins('#s6-map .pins', ['delhi', 'delhi', 'gurugram'], 14, 5, 0.9, C.coral);
  document.querySelector('#s6-map .net').innerHTML = p6.slice(1).map((p, i) => {
    const q = p6.slice(0, i + 1).reduce((b, c) => Math.hypot(c[0] - p[0], c[1] - p[1]) < Math.hypot(b[0] - p[0], b[1] - p[1]) ? c : b);
    return L(`M${q[0].toFixed(0)},${(q[1] - 34).toFixed(0)} L${p[0].toFixed(0)},${(p[1] - 34).toFixed(0)}`, C.teal, 4, 'stroke-dasharray="8 12" opacity="0.7"');
  }).join('');
  const all = ['delhi', 'gurugram', 'noida', 'ghaziabad', 'faridabad', 'delhi', 'gurugram'];
  addPins('#s17-map .pins', all, 42, 9, 0.75, C.coral);
  addPins('#s19-map .pins', all, 42, 9, 0.75, C.coral);
  addPins('#s19-map .pins2', all, 60, 13, 0.55, C.green);
  document.querySelectorAll('#s19-map .pins > g > g, #s17-map .pins > g > g, #s6-map .pins > g > g, #s19-map .pins2 > g > g').forEach(g => g.setAttribute('opacity', '0'));

  // scene in/out + entrance zoom
  SCENES.forEach((s, i) => {
    tl.fromTo('#' + s.id, { opacity: 0 }, { opacity: 1, duration: i === 0 ? 0.01 : 0.45, ease: 'power1.out' }, s.t0);
    tl.fromTo(`#${s.id} > .zoom`, { scale: 1.05, svgOrigin: '960 540' }, { scale: 1, duration: 1.0, ease: 'power2.out' }, s.t0);
    if (i < SCENES.length - 1) tl.set('#' + s.id, { opacity: 0 }, s.t1 + 0.5);
    s.anim(s.t0);
  });
  tl.set({}, {}, DUR);

  window.DUR = DUR;
  window.seek = t => { tl.seek(t, false); };
  window.ready = true;
  const q = new URLSearchParams(location.search);
  if (q.has('t')) window.seek(+q.get('t'));
  if (q.has('play')) { tl.play(+q.get('play') || 0); }
}
init();
