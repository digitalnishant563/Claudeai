// 9:16 reel — scenes timed to the voiceover (seconds). English on-screen text.
const FX_W = ['#ffffff'], FX_T = [C.tealL, C.mint], FX_S = [C.saf, '#FFD9A0'], FX_C = [C.coral, C.pink], FX_P = [C.purple, '#C9C0FF'], FX_B = [C.blue, C.sky];

function fridgeArt() {
  return `${shadow(240, 22, 4)}
    ${R(-220, -660, 440, 660, '#E9EEF2', 30)}${R(-220, -660, 440, 660, 'none', 30, `stroke="#D3DCE3" stroke-width="6"`)}
    ${R(-130, -640, 260, 50, C.ink, 12)}<g class="disp">${T(0, -603, '2°C – 8°C', { size: 32, fill: '#5BF2B4', w: 700 })}</g>
    ${R(-190, -570, 380, 540, '#DFF4FF', 16)}
    ${[-430, -300, -170].map(y => R(-190, y, 380, 8, '#B9D7E8', 4)).join('')}
    <g class="vials">${[[-100, -436], [0, -436], [100, -436], [-60, -306], [60, -306]].map(([x, y], i) => G(`r9-v${i}`, x, y, S(0, -44, 0.6, icon.bottle(1, i % 2 ? C.blue : C.tealL)))).join('')}</g>
    <g class="door" opacity="0">${R(-196, -576, 392, 552, '#BFE6F2', 18, 'opacity="0.55"')}${P('M-150,-560 L-90,-560 L-170,-60 L-190,-60 L-190,-480Z', '#fff', 'opacity="0.35"')}${R(160, -380, 14, 140, C.greyD, 7)}</g>
    ${G('r9-snow', -210, -620, Ci(0, 0, 44, C.blue) + icon.snow(0.75))}`;
}

// =====================================================================
// R1 — Delhi NCR (0 – 4.55)
// =====================================================================
scene('r1', 0, 4.55, 'url(#skyV)', 'none', () => {
  const r = rng(3);
  let back = '';
  for (let x = -40; x < W + 40;) {
    const w = 80 + r() * 80, h = 260 + r() * 300;
    back += R(x, 1480 - h, w, h + 10, '#A9DCCF', 6);
    for (let wy = 1480 - h + 24; wy < 1460; wy += 40) back += R(x + 14, wy, w - 28, 10, '#C6E9DF', 3);
    x += w + 8;
  }
  const col = '#2E8E7E';
  const indiaGate = P('M-95,0 L-95,-235 L95,-235 L95,0 L45,0 L45,-120 A45,45 0 0 0 -45,-120 L-45,0Z', col) + R(-110, -268, 220, 36, col, 4) + R(-72, -294, 144, 30, col, 4) + E(0, -296, 42, 14, col);
  const qutub = P('M-36,0 L36,0 L18,-440 L-18,-440Z', col) + [[-120, 40], [-230, 34], [-320, 30], [-400, 26]].map(([y, w]) => R(-w, y, w * 2, 14, col, 4)).join('') + R(-15, -476, 30, 40, col, 8) + E(0, -478, 18, 10, col);
  const lotus = R(-170, -34, 340, 34, col, 6) + [[-70, 0.7], [-38, 0.88], [0, 1], [38, 0.88], [70, 0.7]].map(([a, s]) =>
    `<g transform="translate(0,-30) rotate(${a}) scale(${s})">${P('M0,0 Q-44,-96 0,-180 Q44,-96 0,0Z', a === 0 ? '#3FA595' : col)}</g>`).join('');
  const tower = (x, w, h, slant) => P(`M${x},0 L${x},${-h} L${x + w},${-h - slant} L${x + w},0Z`, '#3B8FB0') + Array.from({ length: Math.floor(h / 34) }, (_, i) => R(x + 10, -h + 20 + i * 34, w - 20, 6, '#7CC3DD', 2)).join('');
  const towers = tower(0, 110, 420, 40) + tower(120, 90, 330, -30) + tower(220, 120, 480, 50) + tower(350, 80, 300, 0);
  const tree = (x, k) => S(x, 1500, k, R(-8, -70, 16, 74, '#7A5534', 4) + Ci(0, -100, 52, '#3FA26B') + Ci(-30, -78, 34, '#4DB57A') + Ci(28, -80, 36, '#4DB57A'));
  return `
    ${G('r1-sun', 830, 860, Ci(0, 0, 190, '#FFE29A', 'opacity="0.4"') + Ci(0, 0, 120, '#FFD36E'))}
    ${G('r1-c1', 180, 700, cloud(0.9, 0.95))}${G('r1-c2', 880, 600, cloud(0.7, 0.9))}
    ${rings('r1-rg', 540, 1480, '#ffffff', 4)}
    ${G('r1-back', 0, 0, back)}
    ${G('r1-ig', 150, 1480, indiaGate)}
    ${G('r1-qm', 410, 1480, S(0, 0, 1.2, qutub))}
    ${G('r1-lt', 660, 1480, S(0, 0, 0.9, lotus))}
    ${G('r1-tw', 800, 1480, S(0, 0, 0.66, towers))}
    ${R(-60, 1472, W + 120, 520, '#86CFA6')}${R(-60, 1472, W + 120, 14, '#6DBE90')}
    ${G('r1-trees', 0, 0, [[60, 1], [300, 0.8], [560, 0.9], [790, 0.75], [1010, 0.95]].map(([x, k]) => tree(x, k)).join(''))}
    ${R(-60, 1660, W + 120, 150, '#65737F')}${Array.from({ length: 6 }, (_, i) => R(i * 200 + 20, 1728, 110, 12, '#fff', 6, 'opacity="0.8"')).join('')}
    ${KT('r1-k1', 540, 330, 'Delhi and|its sprawling', { size: 92 })}
    ${chipV('r1-ncr', 540, 640, 'NCR', { size: 150, bg: C.saf, fg: C.ink, w: 800, pad: 90 })}
  `;
}, t => {
  tl.fromTo(I('r1-sun'), { y: 300 }, { y: 0, duration: 3.6, ease: 'power2.out' }, 0);
  tl.to(I('r1-c1'), { x: 110, duration: 4.6, ease: 'none' }, 0);
  tl.to(I('r1-c2'), { x: -90, duration: 4.6, ease: 'none' }, 0);
  riseIn(I('r1-back'), 0.05, { y: 420, d: 1.1 });
  ['r1-ig', 'r1-qm', 'r1-lt', 'r1-tw'].forEach((id, i) => riseIn(I(id), 0.35 + i * 0.2, { y: 700, d: 1.0, ease: 'back.out(1.3)' }));
  riseIn(I('r1-trees'), 0.6, { y: 200, d: 0.8 });
  words('r1-k1', 1.3);
  ripple('r1-rg', 2.2, 1300, 1.8);
  popIn(I('r1-ncr'), 3.5, { ease: 'back.out(2.5)' });
  punch('r1', 3.55);
});

// =====================================================================
// R2 — every neighbourhood, every day: medicine (4.55 – 9.75)
// =====================================================================
const R2_PEOPLE = [
  { id: 'r2-p1', x: 190, o: { style: 'long', shirt: C.coral, pants: C.ink2, skin: C.skin1 } },
  { id: 'r2-p2', x: 540, o: { style: 'short', shirt: C.teal, pants: '#3D3D52', skin: C.skin2 } },
  { id: 'r2-p3', x: 890, o: { style: 'grey', shirt: C.purple, pants: C.ink2, skin: C.skin3, glasses: true } },
];
scene('r2', 4.55, 9.75, '#FFF3E0', 'swipe', () => {
  const hs = [
    { x: -30, w: 300, h: 520, col: '#F7C873', trim: '#E0A94A', tank: true },
    { x: 262, w: 262, h: 430, col: '#F59E9E', trim: '#D97878', plant: true },
    { x: 516, w: 300, h: 580, col: '#9FD3C7', trim: '#6FB3A5', tank: true },
    { x: 808, w: 290, h: 470, col: '#C7B8F5', trim: '#9F8FD9', plant: true },
  ];
  const houses = hs.map((h, i) => G(`r2-h${i}`, h.x, 1340, house(h))).join('');
  const people = R2_PEOPLE.map(p => G(p.id, p.x, 1430, S(0, 0, 0.82, `<g class="bodyBob">${person(p.o)}</g>`))).join('');
  const bubbles = R2_PEOPLE.map((p, i) => G(`r2-b${i}`, p.x + 60, 1000,
    Ci(-66, 84, 10, '#fff') + Ci(-40, 56, 15, '#fff') + Ci(10, 0, 74, '#fff') +
    `<g class="q">${T(10, 28, '?', { size: 80, fill: C.ink3, w: 800 })}</g><g class="pill" opacity="0">${S(10, 0, 0.72, icon.pill())}</g>`)).join('');
  return `
    ${G('r2-sun', 170, 700, Ci(0, 0, 80, '#FFD36E'))}
    ${G('r2-c1', 760, 640, cloud(0.75, 0.9))}
    ${houses}
    ${L('M-10,920 Q260,980 520,880 Q800,960 1090,890', '#33333D', 3)}
    ${R(512, 870, 10, 480, '#6B7782', 3)}
    ${R(-60, 1338, W + 120, 64, '#E8DCC8')}${R(-60, 1400, W + 120, 600, '#65737F')}
    ${Array.from({ length: 6 }, (_, i) => R(i * 200 + 20, 1640, 110, 14, '#fff', 7, 'opacity="0.8"')).join('')}
    ${people}${bubbles}
    ${KT('r2-k1', 540, 300, 'In every|*neighbourhood*', { size: 88 })}
    ${KT('r2-k2', 540, 540, 'every single *day*', { size: 64, w: 700, fill: C.ink2, hi: C.coral })}
    ${KT('r2-k3', 540, 330, 'one need is|*common…*', { size: 92, hi: C.coral })}
    ${rings('r2-rg', 540, 690, C.coral, 3)}
    ${G('r2-med', 540, 690, R(-400, -120, 800, 240, '#fff', 120, `stroke="${C.coral}" stroke-width="10"`) + S(-255, 0, 0.95, icon.pill()) + T(70, 36, 'MEDICINE', { size: 100, fill: C.coral, w: 800 }))}
    ${confetti('r2-cf', 540, 690, 30, 5)}
  `;
}, t => {
  tl.to(I('r2-c1'), { x: -120, duration: 5.4, ease: 'none' }, 4.4);
  tl.fromTo(I('r2-sun'), { x: 0, y: 60 }, { x: 160, y: -40, duration: 5.4, ease: 'none' }, 4.4);
  for (let i = 0; i < 4; i++) riseIn(I(`r2-h${i}`), 4.7 + i * 0.07, { y: 200, d: 0.7 });
  R2_PEOPLE.forEach((p, i) => {
    slideIn(I(p.id), 4.9 + i * 0.15, { x: -80, d: 0.8 });
    tl.to(I(p.id), { x: 50, duration: 4, ease: 'none' }, 5.7);
    bob(`#${p.id} .bodyBob`, 5.0, 9.8, 12, 0.55);
    tl.fromTo(`#${p.id} .legL`, { rotation: 0, transformOrigin: '50% 0%' }, { rotation: 12, duration: 0.275, yoyo: true, repeat: 17, ease: 'sine.inOut' }, 5.0);
    tl.fromTo(`#${p.id} .legR`, { rotation: 0, transformOrigin: '50% 0%' }, { rotation: -12, duration: 0.275, yoyo: true, repeat: 17, ease: 'sine.inOut' }, 5.0);
    blink(`#${p.id}`, 5.0 + i * 0.4, 9.7);
  });
  words('r2-k1', 4.9);
  words('r2-k2', 6.37);
  wordsOut('r2-k1', 7.05); wordsOut('r2-k2', 7.05);
  words('r2-k3', 7.3);
  R2_PEOPLE.forEach((p, i) => popIn(I(`r2-b${i}`), 7.5 + i * 0.12, { origin: '0% 100%' }));
  R2_PEOPLE.forEach((p, i) => {
    tl.to(`#r2-b${i} .q`, { opacity: 0, duration: 0.15 }, 8.95);
    tl.fromTo(`#r2-b${i} .pill`, { opacity: 0, scale: 0.3, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.5)' }, 9.0 + i * 0.05);
  });
  wordsOut('r2-k3', 8.8);
  popIn(I('r2-med'), 8.99, { d: 0.55, ease: 'back.out(2.6)' });
  ripple('r2-rg', 9.0, 700, 0.9);
  burst('r2-cf', 9.05);
  punch('r2', 9.0, 1.08);
});

// =====================================================================
// R3 — genuine + prescribed + affordable = hard (9.75 – 17.35)
// =====================================================================
const R3_CARDS = [
  { ic: icon.shield(1.05), t: 'Genuine', s: '100% authentic', at: 10.95, col: C.green },
  { ic: icon.rx(0.95), t: 'Prescribed', s: 'as your doctor advised', at: 12.05, col: C.teal },
  { ic: icon.tag(1.1, '%'), t: 'Affordable', s: 'at a good discount', at: 14.25, col: C.saf },
];
scene('r3', 9.75, 17.35, C.mintL, 'push', () => `
  ${Ci(980, 260, 200, C.mint)}${Ci(80, 1760, 260, C.mint)}
  ${KT('r3-k1', 540, 300, 'But medicine|that is…', { size: 92, fill: C.ink2 })}
  ${R3_CARDS.map((c, i) => G(`r3-c${i}`, 540, 690 + i * 310, `<g class="cardBody">${card(900, 250)}${R(-450, -125, 26, 250, c.col, 13)}${S(-300, 0, 1, c.ic)}
      ${T(-160, -8, c.t, { size: 64, w: 800, fill: C.ink, a: 'start' })}${T(-160, 52, c.s, { size: 36, w: 500, fill: C.ink3, a: 'start' })}</g>
      <g class="qm" opacity="0">${Ci(400, -110, 40, C.coral)}${T(400, -92, '?', { size: 54, fill: '#fff', w: 800 })}</g>
      <g class="ok" opacity="0">${S(380, 0, 0.9, icon.check(1, c.col))}</g>`)).join('')}
  ${chipV('r3-hard', 470, 1560, '…that’s hard to find!', { size: 60, bg: C.coral })}
  ${G('r3-p', 940, 1905, S(0, 0, 0.8, person({ style: 'bun', shirt: C.saf, pants: C.ink2, mouth: 'worry', skin: C.skin2 })))}
`, t => {
  words('r3-k1', 10.09);
  R3_CARDS.forEach((c, i) => {
    tl.fromTo(I(`r3-c${i}`), { x: i % 2 ? 700 : -700, opacity: 0, rotation: i % 2 ? 6 : -6 }, { x: 0, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.4)', transformOrigin: '50% 50%' }, c.at);
    popIn(`#r3-c${i} .ok`, c.at + 0.45, { ease: 'back.out(3)' });
  });
  R3_CARDS.forEach((c, i) => {
    tl.to(`#r3-c${i} .ok`, { opacity: 0, duration: 0.2 }, 15.9);
    tl.to(`#r3-c${i} .cardBody`, { opacity: 0.5, duration: 0.3 }, 15.98);
    tl.fromTo(`#r3-c${i} .qm`, { opacity: 0, scale: 0, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2.5)' }, 16.05 + i * 0.1);
  });
  shake('r3', 15.98, 18);
  popIn(I('r3-hard'), 16.0, { ease: 'back.out(2.4)' });
  slideIn(I('r3-p'), 15.9, { y: 300, d: 0.6 });
  tl.fromTo('#r3-p .armR .arm', { rotation: 0, transformOrigin: '50% 5%' }, { rotation: 150, duration: 0.4, ease: 'back.out(1.5)' }, 16.3);
  tl.to('#r3-p .head', { rotation: -6, duration: 0.3, yoyo: true, repeat: 3, transformOrigin: '50% 100%' }, 16.4);
  blink('#r3-p', 16.0, 17.4, 0.9);
});

// =====================================================================
// R4 — born from this need: the real JSDB store comes to life → a chain (17.35 – 24.75)
// =====================================================================
const SIGN = { x: 590, y: 362 };   // logo on the store's wall sign, in photo coordinates
scene('r4', 17.35, 24.75, C.cream, 'iris', () => `
  <defs><linearGradient id="topFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF6E9" stop-opacity="0.96"/><stop offset="0.6" stop-color="#FFF6E9" stop-opacity="0.55"/><stop offset="1" stop-color="#FFF6E9" stop-opacity="0"/></linearGradient></defs>
  ${Ci(540, 1050, 560, '#FFEFD6')}
  ${KT('r4-k0', 540, 330, 'Born from|this need…', { size: 96, fill: C.ink2, chars: true })}
  ${G('r4-bulb', 540, 980, S(0, 0, 2.3, icon.bulb()))}
  <g id="r4-chainset">
    ${rings('r4-rg2', 540, 820, C.lime, 3)}
    ${G('r4-link', 0, 0, L('M540,1185 L300,1360', C.tealL, 9, 'stroke-dasharray="4 24"') + L('M540,1185 L780,1360', C.tealL, 9, 'stroke-dasharray="4 24"') + L('M420,1500 L660,1500', C.tealL, 9, 'stroke-dasharray="4 24"'))}
    ${G('r4-stL', 280, 1590, S(0, 0, 0.5, storeArt()))}
    ${G('r4-stR', 800, 1590, S(0, 0, 0.5, storeArt()))}
    ${G('r4-stC', 540, 1175, S(0, 0, 0.5, storeArt()))}
    ${G('r4-badge', 540, 815, Ci(0, 0, 150, '#fff', 'opacity="0.55"') + logoMark(118))}
    ${chipV('r4-chain', 540, 600, 'A Retail Pharmacy Chain', { size: 52, bg: C.saf, fg: C.ink })}
  </g>
  <g id="r4-photo" opacity="0">
    <g class="ph">
      <image href="assets/store_cel.jpg" x="0" y="0" width="1080" height="1920"/>
      ${G('r4-signlogo', SIGN.x, SIGN.y, `<g class="glow">${Ci(0, 0, 120, 'url(#glowG)')}</g>` + logoMark(54))}
    </g>
    ${R(0, 0, 1080, 820, 'url(#topFade)')}
    ${confetti('r4-cf', 540, 700, 34, 11, 1.3)}
  </g>
  ${KT('r4-name', 540, 300, 'Jan Seva|*Dawa Bazaar*', { size: 112, fill: C.tealD, hi: C.green, chars: true })}
  ${KT('r4-sub', 540, 560, 'came to life', { size: 62, w: 700, fill: C.ink2 })}
`, t => {
  words('r4-k0', 17.65, { cst: 0.025 });
  popIn(I('r4-bulb'), 17.7, { d: 0.6, ease: 'back.out(2.2)' });
  spin('#r4-bulb .rays', 17.7, 19.2, 90);
  tl.to(I('r4-bulb'), { scale: 1.08, duration: 0.25, yoyo: true, repeat: 3, transformOrigin: '50% 50%' }, 18.0);
  wordsOut('r4-k0', 18.55);
  tl.to(I('r4-bulb'), { scale: 4, opacity: 0, duration: 0.35, ease: 'power2.in' }, 18.6);
  // dive out of the sign: start tight on the logo, pull back to reveal the store
  fadeIn('#r4-photo', 18.75, 0.25);
  tl.fromTo('#r4-photo .ph', { scale: 3.6, x: 540 - SIGN.x, y: 960 - SIGN.y, svgOrigin: `${SIGN.x} ${SIGN.y}` },
    { scale: 1.12, x: 0, y: 0, duration: 1.7, ease: 'power3.inOut' }, 18.75);
  tl.to('#r4-photo .ph', { scale: 1.2, duration: 1.4, ease: 'none' }, 20.45);
  tl.fromTo('#r4-signlogo .glow', { scale: 0.6, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1.6, opacity: 1, duration: 0.5, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 19.1);
  words('r4-name', 19.0, { cst: 0.035 });
  burst('r4-cf', 19.45);
  punch('r4', 19.5);
  words('r4-sub', 19.75);
  wordsOut('r4-sub', 21.35);
  tl.to('#r4-photo', { scale: 0.55, opacity: 0, duration: 0.55, ease: 'power3.in', svgOrigin: '540 960' }, 21.3);
  popIn(I('r4-badge'), 21.66, { ease: 'back.out(2.4)' });
  ripple('r4-rg2', 21.75, 600, 1.0);
  spin(I('r4-badge'), 21.66, 24.8, 12);
  tl.fromTo(I('r4-stC'), { y: 400, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.4)' }, 22.0);
  slideIn(I('r4-stL'), 22.2, { x: -500, d: 0.7, ease: 'back.out(1.3)' });
  slideIn(I('r4-stR'), 22.35, { x: 500, d: 0.7, ease: 'back.out(1.3)' });
  fadeIn(I('r4-link'), 22.7, 0.4);
  tl.to('#r4-link path', { attr: { 'stroke-dashoffset': -112 }, duration: 2, ease: 'none' }, 22.7);
  popIn(I('r4-chain'), 23.0, { ease: 'back.out(2.4)' });
});

// =====================================================================
// R5 — prescription medicines + healthcare products → retail distribution (24.75 – 29.55)
// =====================================================================
scene('r5', 24.75, 29.55, C.skyL, 'push', () => `
  ${Ci(80, 300, 220, C.sky)}${Ci(1000, 1700, 260, C.sky)}
  ${chipV('r5-kick', 540, 300, 'WHAT WE DO', { size: 44, bg: C.ink, w: 800 })}
  ${G('r5-l', 540, 690, card(920, 440) + R(-460, -220, 920, 100, C.coral, 32) + R(-460, -150, 920, 30, C.coral) +
    T(0, -152, 'Prescription Medicines', { size: 48, fill: '#fff', w: 800 }) +
    `<g class="ic">${G('', -270, 80, icon.bottle(1.25, C.orange))}${G('', 0, 90, icon.strip(1.2))}${G('', 270, 80, icon.pill(1.05))}</g>`)}
  ${G('r5-r', 540, 1200, card(920, 440) + R(-460, -220, 920, 100, C.blue, 32) + R(-460, -150, 920, 30, C.blue) +
    T(0, -152, 'Healthcare Products', { size: 48, fill: '#fff', w: 800 }) +
    `<g class="ic">${G('', -320, 90, icon.thermo(1.05))}${G('', -110, 80, icon.bp(1.0))}${G('', 100, 80, icon.sanitizer(1.0))}${G('', 300, 100, icon.bandage(0.85))}</g>`)}
  ${G('r5-arr', 0, 0, L('M540,1430 L540,1500', C.ink3, 10) + L('M510,1478 L540,1508 L570,1478', C.ink3, 10))}
  ${chipV('r5-dist', 540, 1590, 'Retail Distribution', { size: 62, bg: C.teal, w: 800 })}
`, t => {
  popIn(I('r5-kick'), 24.99);
  tl.fromTo(I('r5-l'), { x: -1000, rotation: -8 }, { x: 0, rotation: 0, duration: 0.7, ease: 'back.out(1.3)', transformOrigin: '50% 50%' }, 25.1);
  document.querySelectorAll('#r5-l .ic > g').forEach((el, i) => popIn(el.firstElementChild, 25.55 + i * 0.16, { ease: 'back.out(2.6)' }));
  tl.fromTo(I('r5-r'), { x: 1000, rotation: 8 }, { x: 0, rotation: 0, duration: 0.7, ease: 'back.out(1.3)', transformOrigin: '50% 50%' }, 26.55);
  document.querySelectorAll('#r5-r .ic > g').forEach((el, i) => popIn(el.firstElementChild, 27.0 + i * 0.14, { ease: 'back.out(2.6)' }));
  document.querySelectorAll('#r5-l .ic > g > g, #r5-r .ic > g > g').forEach((el, i) => bob(el, 27.8 + (i % 3) * 0.1, 29.6, 10, 0.8));
  riseIn(I('r5-arr'), 27.9, { y: -30, d: 0.4 });
  popIn(I('r5-dist'), 28.1, { ease: 'back.out(2.4)' });
  punch('r5', 28.15, 1.04);
});

// =====================================================================
// R6 — Delhi NCR & Gurugram branch network (29.55 – 33.55)
// =====================================================================
scene('r6', 29.55, 33.55, '#F4FBF8', 'zoom', () => `
  ${G('r6-map', -181, 450, S(0, 0, 1.4, `<g class="regions">${mapArt('r6m')}</g><g class="net"></g><g class="pins"></g>`))}
  ${KT('r6-k', 540, 300, 'Across *Delhi NCR*|& *Gurugram*', { size: 84 })}
  ${chipV('r6-chip', 540, 1560, 'Our Branch Network', { size: 54, bg: C.teal })}
`, t => {
  words('r6-k', 29.8);
  MAP.regions.forEach((r, i) => popIn(`#r6m-${r.key}`, 29.7 + i * 0.1, { from: 0.6, d: 0.6, ease: 'back.out(1.6)' }));
  [...document.querySelectorAll('#r6-map .pins > g')].forEach((p, i) => dropIn(p.firstElementChild, 30.4 + i * 0.12, 160));
  fadeIn('#r6-map .net', 32.0, 0.6);
  tl.fromTo('#r6-map .net path', { attr: { 'stroke-dashoffset': 0 } }, { attr: { 'stroke-dashoffset': -60 }, duration: 1.5, ease: 'none' }, 32.0);
  popIn(I('r6-chip'), 32.05, { ease: 'back.out(2.4)' });
});

// =====================================================================
// R7 — journey: stock room → direct procurement → bulk (33.55 – 42.2), camera pans
// =====================================================================
scene('r7', 33.55, 42.2, 'url(#skyV2)', 'swipe', () => `
  <g class="cam">
    ${G('r7-c1', 300, 560, cloud(0.9, 0.9))}${G('r7-c2', 1250, 480, cloud(0.7, 0.85))}${G('r7-c3', 2000, 620, cloud(0.8, 0.9))}
    ${R(-800, 1280, 4000, 900, '#9AD7AE')}${R(-800, 1360, 4000, 150, '#6F7D89')}
    ${Array.from({ length: 22 }, (_, i) => R(i * 190 - 700, 1428, 100, 12, '#fff', 6, 'opacity="0.8"')).join('')}
    ${G('r7-fac', 330, 1300, factoryArt())}
    ${G('r7-dis', 770, 1300, distributorArt())}
    ${G('r7-wh', 1900, 1300, warehouseArt('r7clip'))}
    ${G('r7-truck', 560, 1475, S(0, 0, 0.9, truckArt()))}
    <g id="r7-boxes">${[[1810, 1500, 0], [1900, 1500, 1], [1990, 1500, 2], [1855, 1422, 3], [1945, 1422, 4], [1900, 1344, 5]].map(([x, y, i]) => G(`r7-bx${i}`, x, y, boxArt(86, 78))).join('')}</g>
    ${chipV('r7-m', 330, 1590, 'Manufacturers', { size: 38, bg: C.blue })}
    ${chipV('r7-d', 790, 1590, 'Authorized Distributors', { size: 38, bg: C.purple })}
    ${chipV('r7-bulk', 1900, 1205, 'Bulk Quantity', { size: 48, bg: C.saf, fg: C.ink, w: 800 })}
  </g>
  ${KT('r7-k1', 540, 300, 'Every medicine’s|*journey*', { size: 88 })}
  ${chipV('r7-sr', 540, 560, 'starts at the Stock Room', { size: 46, bg: C.teal })}
  ${KT('r7-k2', 540, 330, '*Direct* Procurement', { size: 80 })}
`, t => {
  const cam = '#r7 .cam';
  tl.set(cam, { x: 540 - 1900 * 1.7, y: 1040 - 1110 * 1.7, scale: 1.7, svgOrigin: '0 0' }, 33.4);
  words('r7-k1', 33.83);
  popIn(I('r7-sr'), 35.0);
  tl.fromTo('#r7-wh .shutter', { y: 0 }, { y: -232, duration: 1.0, ease: 'power2.inOut' }, 35.1);
  wordsOut('r7-k1', 36.55); fadeOut(I('r7-sr'), 36.55, 0.3);
  tl.to(cam, { x: 540 - 550 * 1.25, y: 1350 - 1300 * 1.25, scale: 1.25, duration: 1.1, ease: 'power3.inOut' }, 36.7);
  words('r7-k2', 37.0);
  riseIn(I('r7-fac'), 37.2, { y: 160 }); popIn(I('r7-m'), 37.6);
  riseIn(I('r7-dis'), 38.3, { y: 160 }); popIn(I('r7-d'), 38.7);
  tl.to('#r7-fac .smoke', { y: -30, opacity: 0.4, duration: 1.2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 37.6);
  tl.fromTo(I('r7-truck'), { x: -900 }, { x: 0, duration: 1.3, ease: 'power2.out' }, 36.9);
  tl.to(I('r7-truck'), { x: 900, duration: 2.0, ease: 'power2.inOut' }, 38.85);
  tl.to(cam, { x: 540 - 1700 * 1.25, duration: 2.0, ease: 'power2.inOut' }, 38.85);
  spin('#r7-truck .wheel', 36.9, 40.9, 1800);
  bob('#r7-truck .truck', 37.0, 40.9, 4, 0.3);
  for (let i = 0; i < 6; i++) dropIn(I(`r7-bx${i}`), 40.95 + i * 0.12, 400);
  popIn(I('r7-bulk'), 41.0, { ease: 'back.out(2.4)' });
  punch('r7', 41.65, 1.04);
});

// =====================================================================
// R8 — batch / mfg / expiry recorded at entry (42.2 – 48.75)
// =====================================================================
const R8_ROWS = [
  { k: 'Batch No.', v: 'JSD-B2417', at: 43.6 },
  { k: 'Mfg. Date', v: '04 / 2026', at: 44.85 },
  { k: 'Expiry', v: '03 / 2028', at: 46.15 },
];
scene('r8', 42.2, 48.75, C.greyLL, 'push', () => `
  ${Ci(1000, 300, 220, '#E6EEF4')}
  ${KT('r8-k', 540, 300, 'Every incoming|*consignment*', { size: 88 })}
  ${R(20, 820, 1040, 40, '#3C4A57', 20)}${Array.from({ length: 13 }, (_, i) => Ci(50 + i * 82, 840, 12, '#8796A3')).join('')}
  ${R(110, 860, 16, 120, '#3C4A57')}${R(950, 860, 16, 120, '#3C4A57')}
  ${G('r8-box', 540, 820, boxArt(190, 160, { tag: R(22, -70, 56, 36, '#fff', 3) + Array.from({ length: 8 }, (_, i) => R(27 + i * 6, -64, i % 3 ? 2 : 3.5, 24, C.ink)).join('') }))}
  ${G('r8-scan', 540, 820, P('M-160,0 L-160,-320 Q-160,-350 -130,-350 L130,-350 Q160,-350 160,-320 L160,0 L130,0 L130,-320 L-130,-320 L-130,0Z', C.ink2) + R(-70, -346, 140, 18, C.green, 8) +
    `<g class="beam" opacity="0">${R(-128, -316, 256, 7, C.coral, 3)}${R(-128, -316, 256, 44, C.coral, 3, 'opacity="0.18"')}</g>`)}
  ${G('r8-panel', 540, 1300, card(920, 560) + R(-460, -280, 920, 110, C.teal, 32) + R(-460, -200, 920, 30, C.teal) +
    T(-410, -208, 'Incoming Consignment', { size: 42, fill: '#fff', w: 800, a: 'start' }) + S(390, -225, 0.55, logoMark(40)) +
    R8_ROWS.map((r, i) => `<g class="row r${i}" opacity="0">${R(-410, -140 + i * 125, 820, 100, '#F3F8F7', 20)}
      ${T(-380, -77 + i * 125, r.k, { size: 36, fill: C.ink3, w: 600, a: 'start' })}${T(160, -75 + i * 125, r.v, { size: 44, fill: C.ink, w: 800 })}
      ${S(356, -90 + i * 125, 0.78, icon.check())}</g>`).join(''))}
  ${G('r8-stamp', 560, 1610, `<g transform="rotate(-8)">${R(-330, -58, 660, 116, 'rgba(255,255,255,0.92)', 18, `stroke="${C.green}" stroke-width="9"`)}${T(0, 18, 'RECORDED AT ENTRY ✓', { size: 46, fill: C.green, w: 800, ls: 1 })}</g>`)}
`, t => {
  words('r8-k', 42.4);
  tl.fromTo(I('r8-panel'), { y: 900 }, { y: 0, duration: 0.7, ease: 'back.out(1.2)' }, 42.5);
  tl.fromTo(I('r8-box'), { x: -760 }, { x: 0, duration: 1.1, ease: 'power2.out' }, 42.4);
  tl.fromTo('#r8-scan .beam', { opacity: 0, y: 0 }, { opacity: 1, duration: 0.1 }, 43.4);
  tl.to('#r8-scan .beam', { y: 270, duration: 0.6, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 43.45);
  tl.to('#r8-scan .beam', { opacity: 0, duration: 0.2 }, 45.9);
  R8_ROWS.forEach((r, i) => {
    tl.fromTo(`#r8-panel .r${i}`, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.45, ease: 'back.out(1.6)' }, r.at);
  });
  popIn(I('r8-stamp'), 47.3, { from: 2.4, ease: 'power4.out', d: 0.35 });
  punch('r8', 47.6, 1.05);
  tl.to(I('r8-box'), { x: 800, duration: 0.9, ease: 'power2.in' }, 47.5);
});

// =====================================================================
// R9 — storage rules; temperature-sensitive → controlled storage (48.75 – 55.25)
// =====================================================================
scene('r9', 48.75, 55.25, C.mintL, 'zoom', () => `
  ${Ci(100, 1700, 280, C.mint)}
  ${KT('r9-k1', 540, 330, 'Strict *storage* rules', { size: 84 })}
  ${KT('r9-k2', 540, 300, 'Temperature-|*sensitive* products', { size: 82, hi: C.blueD })}
  ${G('r9-book', 540, 1020, S(0, 0, 3.1, icon.book()) +
    [0, 1, 2].map(i => `<g class="tick t${i}" opacity="0">${S(-80, -72 + i * 118, 0.93, icon.check())}${R(-24, -90 + i * 118, 194, 26, C.greyL, 13)}</g>`).join(''))}
  ${G('r9-fr', 540, 1480, S(0, 0, 1.15, fridgeArt()))}
  ${chipV('r9-cs', 540, 1580, 'Kept in Controlled Storage', { size: 50, bg: C.blue })}
`, t => {
  words('r9-k1', 48.99);
  tl.fromTo(I('r9-book'), { scale: 0.3, opacity: 0, rotation: -15, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.8)' }, 49.1);
  [0, 1, 2].forEach(i => tl.fromTo(`#r9-book .t${i}`, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.35, ease: 'back.out(2)' }, 49.6 + i * 0.4));
  wordsOut('r9-k1', 50.95);
  tl.to(I('r9-book'), { x: -380, y: -560, scale: 0.35, opacity: 0, duration: 0.6, ease: 'power3.in' }, 51.05);
  words('r9-k2', 51.23);
  tl.fromTo(I('r9-fr'), { y: 1300 }, { y: 0, duration: 0.8, ease: 'back.out(1.2)' }, 51.3);
  popIn('#r9-fr #r9-snow > .in', 51.95, { ease: 'back.out(3)' });
  spin('#r9-snow > .in', 52.3, 55.3, 120);
  for (let i = 0; i < 5; i++) tl.fromTo(I(`r9-v${i}`), { x: -900, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 52.1 + i * 0.16);
  tl.fromTo('#r9-fr .door', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 53.5);
  tl.to('#r9-fr .disp', { opacity: 0.4, duration: 0.25, yoyo: true, repeat: 5 }, 53.5);
  popIn(I('r9-cs'), 53.4, { ease: 'back.out(2.4)' });
});

// =====================================================================
// R10 — near-expiry stock removed before the shelf (55.25 – 59.65)
// =====================================================================
const R10_X = [538, 258, -22, -302, -582];
scene('r10', 55.25, 59.65, C.cream, 'push', () => `
  ${KT('r10-k1', 540, 300, '*Near-expiry* stock', { size: 88, hi: C.coralD, mark: '#FFC2C2' })}
  ${KT('r10-k2', 540, 440, 'pulled out before|it hits the shelf', { size: 60, w: 700, fill: C.ink2 })}
  ${R(-40, 980, 960, 40, '#3C4A57', 20)}${Array.from({ length: 12 }, (_, i) => Ci(-10 + i * 80, 1000, 12, '#8796A3')).join('')}
  ${R(160, 1020, 16, 120, '#3C4A57')}${R(720, 1020, 16, 120, '#3C4A57')}
  ${R10_X.map((x, i) => G(`r10-b${i}`, x, 980, (i === 3 ? `<g class="warn" opacity="0">${Ci(0, -70, 120, C.coral, 'opacity="0.2"')}</g>` : '') +
    boxArt(150, 132, i === 3 ? { label: false, tag: R(-60, -84, 120, 50, C.coral, 8) + T(0, -50, 'EXP SOON', { size: 22, fill: '#fff', w: 800 }) } : {}) +
    (i === 3 ? `<g class="bang" opacity="0">${Ci(62, -160, 34, C.coral)}${T(62, -144, '!', { size: 46, fill: '#fff', w: 800 })}</g>` : ''))).join('')}
  ${G('r10-shelf', 880, 1320, R(0, -640, 300, 640, C.boxD, 12) + [0, 1, 2, 3].map(i => R(18, -620 + i * 155, 264, 135, '#FBEBD3', 6) +
    [0, 1, 2].map(k => R(36 + k * 78, -620 + i * 155 + 135 - 62 - (k % 2) * 16, 58, 62 + (k % 2) * 16, [C.coral, C.blue, C.green, C.saf][(i + k) % 4], 5)).join('')).join(''))}
  ${G('r10-bin', 480, 1720, P('M-180,-280 L180,-280 L148,0 L-148,0Z', C.coral) + R(-200, -304, 400, 38, C.coralD, 12) + T(0, -110, 'REMOVED', { size: 52, fill: '#fff', w: 800 }))}
`, t => {
  words('r10-k1', 55.47);
  R10_X.forEach((x, i) => {
    if (i === 3) {
      tl.fromTo(I('r10-b3'), { x: 0 }, { x: 782, duration: 3.09, ease: 'none' }, 55.3);
      tl.to(I('r10-b3'), { y: -200, duration: 0.35, ease: 'power2.out' }, 58.39);
      tl.to(I('r10-b3'), { x: 782, y: 560, rotation: 16, duration: 0.6, ease: 'power2.in' }, 58.74);
    } else {
      tl.fromTo(I(`r10-b${i}`), { x: 0 }, { x: 1100, duration: 4.35, ease: 'none' }, 55.3);
    }
  });
  tl.fromTo('#r10-b3 .warn', { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1.15, duration: 0.4, yoyo: true, repeat: 3 }, 56.9);
  popIn('#r10-b3 .bang', 57.0, { ease: 'back.out(3)' });
  slideIn(I('r10-bin'), 56.6, { y: 400, d: 0.6, ease: 'back.out(1.4)' });
  words('r10-k2', 56.85, { st: 0.06 });
  shake('r10', 59.3, 10);
});

// =====================================================================
// R11 — category-wise shelves; 15,000+ SKUs (59.65 – 72.0)
// =====================================================================
const RCATS = [
  { n: 'Cardiac', ic: icon.heart(0.5, '#fff'), col: C.coral, at: 62.6 },
  { n: 'Diabetes', ic: icon.drop(0.48, '#fff'), col: C.blue, at: 63.35 },
  { n: 'Thyroid', ic: icon.butterfly(0.42, '#fff'), col: C.purple, at: 64.3 },
  { n: 'Dermatology', ic: icon.leaf(0.5, '#fff'), col: C.green, at: 65.16 },
  { n: 'Orthopedic', ic: icon.bone(0.42, '#fff'), col: C.safD, at: 66.12 },
  { n: 'Pediatric', ic: icon.baby(0.5), col: C.pink, at: 67.0 },
];
scene('r11', 59.65, 72.0, C.cream, 'swipe', () => {
  let comps = '';
  RCATS.forEach((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 94 + col * 456, y = 584 + row * 324;
    let goods = '';
    for (let k = 0; k < 6; k++) {
      const h = 80 + ((k * 5 + i) % 3) * 26;
      goods += R(x + 26 + k * 66, y + 290 - h, 54, h, c.col, 6, `opacity="${0.55 + (k % 3) * 0.2}"`) + R(x + 34 + k * 66, y + 302 - h, 38, 10, '#fff', 3, 'opacity="0.7"');
    }
    comps += R(x, y, 436, 304, '#FBEBD3', 10) + `<g id="r11-g${i}"><g class="in">${goods}</g></g><g id="r11-k${i}"><g class="in">${R(x + 16, y + 14, 404, 72, c.col, 36)}
      ${Ci(x + 54, y + 50, 29, 'rgba(255,255,255,0.25)')}${S(x + 54, y + 50, 1, c.ic)}
      ${T(x + 98, y + 63, c.n, { size: 36, fill: '#fff', w: 800, a: 'start' })}</g></g>`;
  });
  return `
    ${KT('r11-k', 540, 300, 'Every shelf,|*category-wise*', { size: 88 })}
    <g id="r11-shelf"><g class="in">${E(540, 1600, 520, 30, '#0B2238', 'opacity="0.1"')}${R(70, 560, 940, 1000, C.boxD, 18)}${R(70, 560, 940, 24, '#9C6A3A', 12)}${comps}</g></g>
    ${G('r11-over', 540, 470, T(0, 0, 'Over', { size: 64, w: 700, fill: C.ink2 }))}
    ${G('r11-num', 540, 690, T(0, 0, '0', { size: 210, w: 800, fill: C.teal, id: 'r11-count' }))}
    ${G('r11-sku', 540, 810, T(0, 0, 'SKUs', { size: 76, w: 800, fill: C.ink }))}
    ${chipV('r11-br', 540, 950, 'at every branch', { size: 50, bg: C.saf, fg: C.ink })}
    ${rings('r11-rg', 540, 630, C.tealL, 3)}
  `;
}, t => {
  words('r11-k', 59.87);
  popIn(I('r11-shelf'), 60.0, { from: 0.6, d: 0.7, ease: 'back.out(1.4)' });
  RCATS.forEach((c, i) => riseIn(I(`r11-g${i}`), 60.85 + i * 0.16, { y: 60, d: 0.5, ease: 'back.out(1.6)' }));
  RCATS.forEach((c, i) => {
    tl.fromTo(I(`r11-k${i}`), { scale: 0.2, opacity: 0, transformOrigin: '0% 50%' }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.2)' }, c.at - 0.05);
    tl.to(I(`r11-g${i}`), { y: -16, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, c.at);
  });
  wordsOut('r11-k', 67.75);
  tl.to(I('r11-shelf'), { scale: 0.55, y: 300, duration: 0.9, ease: 'power3.inOut', svgOrigin: '540 1060' }, 67.9);
  riseIn(I('r11-over'), 68.1);
  popIn(I('r11-num'), 68.3, { from: 0.5, ease: 'back.out(2)' });
  counter('r11-count', 68.56, 1.7, 0, 15000, v => v >= 15000 ? '15,000+' : fmtK(v));
  ripple('r11-rg', 70.2, 700, 1.0);
  punch('r11', 70.25, 1.05);
  riseIn(I('r11-sku'), 69.2);
  popIn(I('r11-br'), 70.97, { ease: 'back.out(2.4)' });
});

// =====================================================================
// R12 — registered pharmacist verifies (72.0 – 76.05) — the real JSDB counter, drawn
// =====================================================================
scene('r12', 72.0, 76.05, '#EAF6F2', 'iris', () => `
  <defs><linearGradient id="botFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B4A42" stop-opacity="0"/><stop offset="1" stop-color="#0B4A42" stop-opacity="0.85"/></linearGradient></defs>
  <g id="r12-cam">
    <image href="assets/store_bg.jpg" x="0" y="0" width="1080" height="1920"/>
    ${G('r12-signlogo', SIGN.x, SIGN.y, `<g class="glow">${Ci(0, 0, 110, 'url(#glowG)')}</g>` + logoMark(54))}
    <g id="r12-person"><image href="assets/store_person.png" x="338" y="680" width="372" height="623"/></g>
  </g>
  ${R(0, 1300, 1080, 620, 'url(#botFade)')}
  ${G('r12-rx', 330, 1420, S(0, 0, 1.35, icon.rx()))}
  ${G('r12-mag', 330, 1380, icon.magnifier(1.2))}
  ${G('r12-ok', 350, 1450, `<g transform="rotate(-12)">${R(-180, -50, 360, 100, 'rgba(255,255,255,0.96)', 16, `stroke="${C.green}" stroke-width="8"`)}${T(0, 18, 'VERIFIED ✓', { size: 50, fill: C.greenD, w: 800 })}</g>`)}
  ${G('r12-ptr', 640, 790, P('M-22,0 L22,0 L0,34Z', C.green))}
  ${chipV('r12-badge', 640, 745, 'Registered Pharmacist', { size: 42, bg: C.green, stroke: 'stroke="#fff" stroke-width="6"' })}
  ${G('r12-lower', 540, 1745, `<g filter="url(#softShadow)">${R(-480, -84, 960, 168, '#fff', 40)}</g>` + R(-480, -84, 18, 168, C.lime, 9) + S(-380, 0, 1, logoMark(62)) +
    T(-292, -8, 'Jan Seva Dawa Bazaar', { size: 46, w: 800, fill: C.tealD, a: 'start' }) + T(-292, 44, 'Pharmacist-verified, every time', { size: 31, w: 600, fill: C.ink3, a: 'start' }))}
  ${KT('r12-k', 540, 270, 'Every prescription *verified*', { size: 64, plate: true })}
`, t => {
  tl.fromTo('#r12-cam', { scale: 1.3, y: 260, svgOrigin: '540 1000' }, { scale: 1.4, y: 240, duration: 4.6, ease: 'none' }, 71.7);
  tl.fromTo('#r12-person', { scale: 1, transformOrigin: '50% 100%' }, { scale: 1.035, duration: 4.4, ease: 'sine.inOut' }, 71.8);
  bob('#r12-person > image', 72.2, 76.0, 3, 1.3);
  tl.fromTo('#r12-signlogo .glow', { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1.4, duration: 0.6, yoyo: true, repeat: 3 }, 72.4);
  words('r12-k', 72.2);
  tl.fromTo(I('r12-lower'), { x: -1100 }, { x: 0, duration: 0.6, ease: 'power3.out' }, 72.5);
  tl.fromTo(I('r12-rx'), { x: -330, y: 420, rotation: -40, opacity: 0, scale: 0.5 }, { x: 0, y: 0, rotation: -6, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' }, 72.7);
  tl.fromTo(I('r12-mag'), { opacity: 0, x: -80 }, { opacity: 1, x: -60, duration: 0.3 }, 73.3);
  tl.to(I('r12-mag'), { x: 70, y: 50, duration: 0.45, yoyo: true, repeat: 2, ease: 'sine.inOut' }, 73.6);
  fadeOut(I('r12-mag'), 74.85, 0.2);
  popIn(I('r12-badge'), 73.5, { ease: 'back.out(2.4)' });
  popIn(I('r12-ptr'), 73.7);
  bob(I('r12-ptr'), 74.2, 76.0, 8, 0.6);
  popIn(I('r12-ok'), 74.95, { from: 2.3, ease: 'power4.out', d: 0.35 });
  punch('r12', 75.1, 1.05);
});

// =====================================================================
// R13 — scheduled medicines only on valid prescription (76.05 – 79.7)
// =====================================================================
scene('r13', 76.05, 79.7, '#F4F1FF', 'push', () => `
  ${Ci(980, 1700, 280, '#E8E3FF')}${Ci(80, 320, 200, '#E8E3FF')}
  ${KT('r13-k1', 540, 300, '*Scheduled* medicines', { size: 82, hi: C.purple, mark: '#D9D2FF' })}
  ${KT('r13-k2', 540, 440, 'only on a valid|prescription', { size: 60, w: 700, fill: C.ink2 })}
  ${G('r13-box', 540, 930, `<g class="glow" opacity="0">${Ci(0, 0, 360, C.green, 'opacity="0.15"')}</g>` + S(0, 0, 1.3, R(-200, -170, 400, 340, '#fff', 20) + R(-200, -170, 400, 340, 'none', 20, `stroke="#DCD6FF" stroke-width="6"`) +
    R(-200, -110, 400, 70, C.purple) + T(0, -62, 'SCHEDULE H', { size: 34, fill: '#fff', w: 800, ls: 3 }) + T(-110, 40, 'Rx', { size: 64, fill: C.purple, w: 800 }) + R(-30, 0, 190, 14, C.greyL, 7) + R(-30, 30, 150, 14, C.greyL, 7)))}
  ${G('r13-lock', 760, 1130, S(0, 0, 1.2, `<g class="shackle">${L('M-40,-30 L-40,-74 A40,40 0 0 1 40,-74 L40,-30', C.greyD, 16)}</g>` + `<g class="lb">${R(-66, -38, 132, 116, C.saf, 18)}</g>` + Ci(0, 12, 14, C.ink) + R(-6, 16, 12, 30, C.ink, 4)))}
  ${G('r13-rx', 300, 1450, S(0, 0, 1.6, icon.rx()) + `<g class="valid" opacity="0">${S(80, 110, 1.2, icon.check())}</g>`)}
  ${G('r13-arrow', 540, 1310, L('M-60,60 L50,-50 M8,-54 L54,-54 L54,-8', C.green, 14))}
  ${confetti('r13-cf', 760, 1110, 24, 17, 0.8)}
`, t => {
  words('r13-k1', 76.26);
  popIn(I('r13-box'), 76.4, { from: 0.5, ease: 'back.out(1.8)' });
  popIn(I('r13-lock'), 76.7, { ease: 'back.out(2.5)' });
  tl.to(I('r13-lock'), { rotation: 10, duration: 0.08, yoyo: true, repeat: 5, transformOrigin: '50% 0%' }, 77.0);
  words('r13-k2', 77.35, { st: 0.06 });
  tl.fromTo(I('r13-rx'), { x: -600, rotation: -20, opacity: 0 }, { x: 0, rotation: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' }, 77.4);
  popIn('#r13-rx .valid', 77.95, { ease: 'back.out(3)' });
  tl.fromTo(I('r13-arrow'), { opacity: 0, x: -40, y: 40 }, { opacity: 1, x: 0, y: 0, duration: 0.35 }, 78.1);
  tl.to('#r13-lock .shackle', { y: -30, duration: 0.3, ease: 'back.out(3)' }, 78.4);
  tl.to('#r13-lock .lb rect', { attr: { fill: C.green }, duration: 0.25 }, 78.4);
  burst('r13-cf', 78.45);
  tl.fromTo('#r13-box .glow', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 78.5);
  punch('r13', 78.45, 1.05);
  tl.to(I('r13-lock'), { y: 80, opacity: 0, duration: 0.5, ease: 'power2.in' }, 78.95);
});

// =====================================================================
// R14 — billing: batch & expiry re-checked (79.7 – 84.2)
// =====================================================================
scene('r14', 79.7, 84.2, '#EEF7FF', 'zoom', () => `
  ${KT('r14-k1', 540, 300, 'At *billing*', { size: 92 })}
  ${KT('r14-k2', 540, 430, 'batch & expiry|checked again', { size: 60, w: 700, fill: C.ink2 })}
  ${R(-60, 1250, W + 120, 800, '#CFE3F2')}${R(-60, 1240, W + 120, 20, '#B5D0E4')}
  ${G('r14-pos', 540, 880, R(-30, 220, 60, 120, C.ink2) + R(-150, 330, 300, 24, C.ink2, 10) + R(-380, -250, 760, 480, C.ink, 28) + R(-356, -226, 712, 420, '#fff', 12) +
    R(-356, -226, 712, 72, C.teal, 12) + R(-356, -178, 712, 24, C.teal) + T(-320, -176, 'BILL', { size: 36, fill: '#fff', w: 800, a: 'start', ls: 3 }) + S(310, -190, 0.45, logoMark(40)) +
    `<g class="item" opacity="0">${R(-326, -118, 652, 76, C.greyLL, 12)}${T(-300, -68, 'Tablet Strip × 2', { size: 34, fill: C.ink, w: 600, a: 'start' })}${T(300, -68, '₹160', { size: 34, fill: C.ink, w: 700, a: 'end' })}</g>` +
    [['Batch', 'JSD-B2417'], ['Expiry', '03 / 2028']].map(([k, v], i) => `<g class="ck c${i}" opacity="0">${R(-326, -26 + i * 92, 652, 76, '#EAF8F2', 12)}
      ${T(-300, 24 + i * 92, k, { size: 34, fill: C.ink3, w: 600, a: 'start' })}${T(50, 24 + i * 92, v, { size: 36, fill: C.ink, w: 800 })}${S(270, 12 + i * 92, 0.66, icon.check())}</g>`).join(''))}
  ${G('r14-item', 690, 1430, boxArt(170, 136, { label: false, tag: R(-56, -96, 112, 56, '#fff', 4) + Array.from({ length: 12 }, (_, i) => R(-46 + i * 8, -90, i % 3 ? 3 : 5, 42, C.ink)).join('') }))}
  ${G('r14-gun', 230, 1330, `<g class="beam" opacity="0">${P('M150,-10 L380,-40 L380,110 L150,10Z', C.coral, 'opacity="0.25"')}${L('M160,0 L380,40', C.coral, 5)}</g>` +
    R(-120, -44, 280, 88, C.ink2, 32) + P('M-66,34 L0,34 L34,200 L-36,200Z', C.ink2) + R(130, -26, 32, 52, C.coral, 6) + R(-44, 44, 28, 56, C.saf, 8))}
  ${chipV('r14-dc', 540, 1680, 'Double-checked ✓', { size: 56, bg: C.green })}
`, t => {
  words('r14-k1', 79.9);
  tl.fromTo(I('r14-pos'), { y: -900 }, { y: 0, duration: 0.7, ease: 'back.out(1.2)' }, 80.0);
  slideIn(I('r14-gun'), 80.0, { x: -400 });
  slideIn(I('r14-item'), 80.1, { x: 400 });
  tl.fromTo('#r14-gun .beam', { opacity: 0 }, { opacity: 1, duration: 0.08, yoyo: true, repeat: 5 }, 80.6);
  tl.fromTo('#r14-pos .item', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.35 }, 80.95);
  words('r14-k2', 81.0, { st: 0.06 });
  tl.fromTo('#r14-pos .c0', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.4, ease: 'back.out(1.6)' }, 81.6);
  tl.fromTo('#r14-pos .c1', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.4, ease: 'back.out(1.6)' }, 82.5);
  popIn(I('r14-dc'), 83.1, { ease: 'back.out(2.4)' });
  punch('r14', 83.15, 1.04);
});

// =====================================================================
// R15 — fewer layers; savings passed on (84.2 – 92.25)
// =====================================================================
const RNODES = [
  { n: 'Manufacturer', col: C.blue, art: S(0, 46, 0.32, factoryArt()) },
  { n: 'Super Stockist', col: C.purple, art: S(0, 34, 0.66, boxArt(80, 70) + S(0, -70, 1, boxArt(64, 56))) },
  { n: 'Distributor', col: C.safD, art: S(0, 32, 0.26, truckArt()) },
  { n: 'Wholesaler', col: C.orange, art: S(0, 44, 0.21, warehouseArt()) },
  { n: 'Retailer', col: C.coral, art: S(0, 42, 0.18, storeArt()) },
  { n: 'You', col: C.green, art: icon.family(0.44) },
];
scene('r15', 84.2, 92.25, '#FFF9F0', 'swipe', () => {
  const ys = [600, 790, 980, 1170, 1360, 1550];
  const node = (i, y, n, col, art) => G(`r15-n${i}`, 260, y, Ci(0, 0, 80, col, 'opacity="0.18"') + Ci(0, 0, 70, '#fff') + Ci(0, 0, 70, 'none', `stroke="${col}" stroke-width="8"`) +
    `<g clip-path="url(#r15clip)">${art}</g>` + T(110, 14, n, { size: 44, w: 800, fill: C.ink, a: 'start' }) + `<g class="x" opacity="0">${S(54, -54, 0.9, icon.cross())}</g>`);
  return `
    <defs><clipPath id="r15clip"><circle r="64"/></clipPath></defs>
    ${KT('r15-k1', 540, 300, '*Direct* procurement', { size: 82 })}
    ${KT('r15-k2', 540, 420, 'fewer middle layers', { size: 60, w: 700, fill: C.ink2 })}
    ${KT('r15-k3', 540, 420, 'savings *passed on* to you', { size: 60, w: 700, fill: C.ink2, hi: C.greenD })}
    <g id="r15-arrows">${ys.slice(0, 5).map(y => G('', 260, y + 95, L('M0,-24 L0,22 M-16,6 L0,24 L16,6', C.ink3, 7))).join('')}</g>
    ${RNODES.map((nd, i) => node(i, ys[i], nd.n, nd.col, nd.art)).join('')}
    ${G('r15-j', 540, 1040, Ci(0, 0, 124, C.teal, 'opacity="0.18"') + Ci(0, 0, 110, '#fff') + Ci(0, 0, 110, 'none', `stroke="${C.teal}" stroke-width="10"`) + logoMark(72) +
      T(0, 180, 'Jan Seva Dawa Bazaar', { size: 46, w: 800, fill: C.teal }))}
    ${G('r15-a6', 540, 815, L('M0,-30 L0,30 M-20,10 L0,32 L20,10', C.teal, 10))}
    ${G('r15-a7', 540, 1300, L('M0,-30 L0,30 M-20,10 L0,32 L20,10', C.teal, 10))}
    <g id="r15-coins">${Array.from({ length: 9 }, (_, i) => G(`r15-co${i}`, 820 + (i % 3) * 80, 1150 + Math.floor(i / 3) * 80, icon.coin(0.9))).join('')}</g>
    ${chipV('r15-save', 240, 1440, 'You save ₹', { size: 46, bg: C.green })}
    ${rings('r15-rg', 540, 1440, C.green, 3)}
  `;
}, t => {
  words('r15-k1', 84.42);
  for (let i = 0; i < 6; i++) tl.fromTo(I(`r15-n${i}`), { x: -500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }, 84.6 + i * 0.15);
  document.querySelectorAll('#r15-arrows > g > g').forEach((a, i) => tl.fromTo(a, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 }, 84.8 + i * 0.15));
  words('r15-k2', 85.81);
  [1, 2, 3, 4].forEach((n, k) => popIn(`#r15-n${n} .x`, 86.3 + k * 0.15, { ease: 'back.out(3)' }));
  [1, 2, 3, 4].forEach((n, k) => tl.to(I(`r15-n${n}`), { x: 1100, rotation: k % 2 ? 25 : -25, opacity: 0, duration: 0.6, ease: 'power2.in' }, 87.85 + k * 0.07));
  fadeOut('#r15-arrows', 87.85, 0.3);
  tl.to(I('r15-n0'), { x: 280, y: 30, duration: 0.7, ease: 'power3.inOut' }, 88.3);
  tl.to(I('r15-n5'), { x: 280, y: -110, duration: 0.7, ease: 'power3.inOut' }, 88.3);
  popIn(I('r15-j'), 88.5, { from: 0.3, ease: 'back.out(2)' });
  punch('r15', 88.6, 1.05);
  popIn(I('r15-a6'), 88.9); popIn(I('r15-a7'), 89.0);
  wordsOut('r15-k2', 88.95);
  words('r15-k3', 89.2);
  for (let i = 0; i < 9; i++) {
    const el = I(`r15-co${i}`), sx = 820 + (i % 3) * 80, sy = 1150 + Math.floor(i / 3) * 80;
    tl.fromTo(el, { opacity: 0, scale: 0.4, x: 0, y: 0 }, { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2)', transformOrigin: '50% 50%' }, 89.4 + i * 0.12);
    tl.to(el, { x: 540 - sx, y: 1440 - sy, scale: 0.4, opacity: 0, duration: 0.55, ease: 'power2.in' }, 89.75 + i * 0.12);
  }
  ripple('r15-rg', 90.4, 400, 0.8);
  popIn(I('r15-save'), 90.6, { ease: 'back.out(2.4)' });
  tl.to(I('r15-n5'), { scale: 1.12, duration: 0.18, yoyo: true, repeat: 5, transformOrigin: '50% 50%' }, 90.4);
});

// =====================================================================
// R16 — flat 20% off printed MRP (92.25 – 95.2)
// =====================================================================
scene('r16', 92.25, 95.2, '#FFF1D6', 'iris', () => {
  let star = '';
  const n = 16, ro = 230, ri = 190;
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI * i) / n, r = i % 2 ? ri : ro;
    star += `${i ? 'L' : 'M'}${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`;
  }
  return `
    ${Ci(540, 960, 560, '#FFE6B8')}
    ${G('r16-star', 540, 600, S(0, 0, 1.3, P(star + 'Z', C.coral) + T(0, -40, 'FLAT', { size: 52, fill: '#fff', w: 800, ls: 4 }) + T(0, 50, '20%', { size: 110, fill: '#fff', w: 800 }) + T(0, 104, 'OFF', { size: 44, fill: '#fff', w: 800, ls: 6 })))}
    ${G('r16-tag', 520, 1270, `<g transform="rotate(-6) scale(1.1)">${R(-370, -230, 760, 460, '#0B2238', 40, 'opacity="0.08" transform="translate(10,14)"')}
      ${P('M-330,-230 L300,-230 L400,0 L300,230 L-330,230 Q-370,230 -370,190 L-370,-190 Q-370,-230 -330,-230Z', '#fff')}
      ${Ci(320, 0, 22, '#FFF1D6')}
      ${T(-30, -120, 'Printed MRP', { size: 44, fill: C.ink3, w: 600 })}
      ${T(-30, 30, '₹100', { size: 150, fill: C.ink, w: 800 })}
      <g class="strike">${R(-220, -18, 380, 16, C.coral, 8)}</g>
      <g class="pay" opacity="0">${T(-30, 150, 'You pay ₹80', { size: 64, fill: C.greenD, w: 800 })}</g></g>`)}
    ${confetti('r16-cf', 540, 600, 40, 21, 1.4)}
    ${rings('r16-rg', 540, 600, '#ffffff', 3)}
  `;
}, t => {
  tl.fromTo(I('r16-tag'), { y: 900, rotation: 10 }, { y: 0, rotation: 0, duration: 0.6, ease: 'back.out(1.3)', transformOrigin: '50% 50%' }, 92.45);
  tl.fromTo('#r16-tag .strike', { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.35, ease: 'power2.out' }, 93.1);
  tl.fromTo(I('r16-star'), { scale: 0, rotation: -160, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.9)' }, 93.75);
  burst('r16-cf', 93.9);
  ripple('r16-rg', 93.85, 800, 1.0);
  punch('r16', 93.9, 1.08);
  spin(I('r16-star'), 94.4, 95.4, 25);
  tl.fromTo('#r16-tag .pay', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' }, 94.0);
});

// =====================================================================
// R17 — today 40+ branches (95.2 – 98.6)
// =====================================================================
const mapBlock = (id, pfx, extra = '') => G(id, -130, 770, S(0, 0, 1.3, `<g class="regions">${mapArt(pfx)}</g><g class="pins"></g>${extra}`));
scene('r17', 95.2, 98.6, '#F4FBF8', 'push', () => `
  ${chipV('r17-aaj', 540, 300, 'TODAY', { size: 48, bg: C.saf, fg: C.ink, w: 800 })}
  ${G('r17-num', 540, 590, T(0, 0, '0', { size: 240, w: 800, fill: C.teal, id: 'r17-count' }))}
  ${G('r17-lbl', 540, 700, T(0, 0, 'Branches', { size: 72, w: 800, fill: C.ink }))}
  ${mapBlock('r17-map', 'r17m')}
`, t => {
  popIn(I('r17-aaj'), 95.45);
  tl.fromTo(I('r17-map'), { y: 400, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 95.3);
  [...document.querySelectorAll('#r17-map .pins > g')].forEach((p, i) => dropIn(p.firstElementChild, 96.3 + i * 0.035, 120));
  popIn(I('r17-num'), 96.3, { from: 0.5, ease: 'back.out(2)' });
  counter('r17-count', 96.36, 1.5, 0, 40, v => v >= 40 ? '40+' : Math.round(v));
  punch('r17', 97.85, 1.05);
  riseIn(I('r17-lbl'), 96.6);
});

// =====================================================================
// R18 — home delivery (98.6 – 103.85)
// =====================================================================
scene('r18', 98.6, 103.85, 'url(#skyV)', 'swipe', () => `
  ${G('r18-c1', 260, 820, cloud(0.8, 0.9))}${G('r18-c2', 860, 700, cloud(0.6, 0.85))}
  ${R(-60, 1330, W + 120, 700, '#9AD7AE')}${R(-60, 1420, W + 120, 150, '#6F7D89')}${Array.from({ length: 6 }, (_, i) => R(i * 200 + 20, 1488, 110, 12, '#fff', 6, 'opacity="0.8"')).join('')}
  ${G('r18-store', 170, 1420, S(0, 0, 0.45, storeArt()))}
  ${G('r18-house', 560, 1420, house({ w: 460, h: 560, col: '#F7C873', trim: '#E0A94A', tank: true, plant: true }))}
  ${G('r18-old', 800, 1450, S(0, 0, 0.95, person({ style: 'grey', glasses: true, stick: true, shirt: '#8E7CC3', pants: C.ink2, skin: C.skin2, mouth: 'smile' })))}
  ${G('r18-phone', 210, 850, icon.phone(1.0) + `<g class="ok" opacity="0">${S(52, -90, 0.85, icon.check())}</g>`)}
  ${G('r18-sc', 260, 1570, scooterArt())}
  ${G('r18-pkg', 700, 1300, boxArt(80, 68))}
  ${G('r18-heart', 820, 1060, icon.heart(1.1))}
  ${KT('r18-k', 540, 300, 'Can’t make it|to the store?', { size: 88 })}
  ${chipV('r18-hd', 540, 560, 'We deliver home!', { size: 62, bg: C.green, w: 800 })}
  ${rings('r18-rg', 820, 1060, C.coral, 3)}
`, t => {
  tl.to(I('r18-c1'), { x: 100, duration: 5.3, ease: 'none' }, 98.6);
  words('r18-k', 98.82);
  slideIn(I('r18-old'), 98.9, { x: 150 });
  blink('#r18-old', 99.0, 103.9, 1.7);
  tl.fromTo('#r18-old .head', { rotation: 0, transformOrigin: '50% 100%' }, { rotation: 6, duration: 0.5, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 99.4);
  popIn(I('r18-phone'), 101.3, { ease: 'back.out(2.4)' });
  popIn('#r18-phone .ok', 101.8, { ease: 'back.out(3)' });
  popIn(I('r18-hd'), 102.2, { ease: 'back.out(2.4)' });
  tl.fromTo(I('r18-sc'), { x: -500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 }, 101.4);
  tl.to(I('r18-sc'), { x: 380, duration: 1.5, ease: 'power2.inOut' }, 101.8);
  spin('#r18-sc .wheel', 101.4, 103.4, 1080);
  bob('#r18-sc .riderBob', 101.5, 103.4, 4, 0.3);
  tl.fromTo(I('r18-pkg'), { opacity: 0, x: -120, y: 150 }, { opacity: 1, x: 0, y: 0, duration: 0.45, ease: 'power2.out' }, 103.3);
  tl.fromTo('#r18-old .armL .arm', { rotation: 0, transformOrigin: '50% 5%' }, { rotation: 60, duration: 0.3 }, 103.25);
  popIn(I('r18-heart'), 103.5, { ease: 'back.out(3)' });
  ripple('r18-rg', 103.5, 300, 0.7);
});

// =====================================================================
// R19 — 40 → 100+ branches, spreading across India; service at every doorstep (103.85 – 110.45)
// =====================================================================
const IN_W = { up: 9, mh: 8, rj: 6, gj: 5, mp: 6, hr: 4, pb: 3, br: 4, wb: 4, ka: 4, tn: 4, tg: 3, ap: 3, or: 2, jh: 2, ct: 2, ut: 2, hp: 1, jk: 1, kl: 2, as: 2, ga: 1 };
const IN_CITIES = ['mh', 'ka', 'tn', 'wb', 'gj', 'tg', 'rj', 'br', 'mp', 'or'];
scene('r19', 103.85, 110.45, '#F2FAF5', 'zoom', () => `
  ${Ci(540, 1220, 640, '#E3F4EA')}
  ${G('r19-india', 44, 640, S(0, 0, 1.62, `<g class="states">${INDIA.locations.map(l => `<path id="in-${l.id}" d="${l.path}" fill="#CFEBD9" stroke="#fff" stroke-width="1.3"/>`).join('')}</g>
    <g class="arcs"></g><g class="pins"></g><g class="ncr"></g><g class="homes"></g><g class="dl"></g>`))}
  ${chipV('r19-soon', 540, 250, 'COMING SOON', { size: 46, bg: C.coral, w: 800 })}
  ${G('r19-num', 540, 470, T(0, 0, '40+', { size: 210, w: 800, fill: C.teal, id: 'r19-count', cls: 'd' }))}
  ${G('r19-lbl', 540, 560, T(0, 0, 'Branches', { size: 60, w: 800, fill: C.ink }))}
  ${chipV('r19-ind', 540, 650, 'Expanding across India', { size: 40, bg: C.teal })}
  ${KT('r19-k', 540, 300, 'Easy service at|*every doorstep*', { size: 84 })}
`, t => {
  popIn(I('r19-soon'), 104.04, { ease: 'back.out(2.4)' });
  popIn(I('r19-num'), 103.9, { from: 0.6 });
  riseIn(I('r19-lbl'), 104.2);
  popIn(I('r19-ind'), 104.95, { ease: 'back.out(2.4)' });
  const ncr = [...document.querySelectorAll('#r19-india .ncr > g > g')];
  ncr.forEach((p, i) => popIn(p, 104.0 + i * 0.05, { d: 0.35 }));
  popIn('#r19-india .dl > g > g', 104.1, { ease: 'back.out(2.4)' });
  document.querySelectorAll('#r19-india .dl .rg').forEach((el, i) => {
    for (let k = 0; k < 4; k++) tl.fromTo(el, { attr: { r: 8 }, opacity: 0.9 }, { attr: { r: 70 }, opacity: 0, duration: 1.2, ease: 'power2.out', immediateRender: false }, 104.3 + k * 1.4 + i * 0.4);
  });
  // expansion wave: pins in order of distance from Delhi, states light up as they get their first branch
  const pins = [...document.querySelectorAll('#r19-india .pins > g')];
  const seen = new Set();
  pins.forEach((p, i) => {
    const at = 104.9 + (i / pins.length) * 2.3;
    popIn(p.firstElementChild, at, { d: 0.35, ease: 'back.out(3)' });
    if (!seen.has(p.dataset.st)) {
      seen.add(p.dataset.st);
      tl.to(`#in-${p.dataset.st}`, { attr: { fill: '#9ED9B1' }, duration: 0.35 }, at);
    }
  });
  tl.to(I('r19-num'), { scale: 1.12, duration: 0.2, yoyo: true, repeat: 1, transformOrigin: '50% 50%' }, 105.9);
  counter('r19-count', 105.9, 1.2, 40, 100, v => v >= 100 ? '100+' : Math.round(v) + '+');
  punch('r19', 107.05, 1.06);
  fadeOut(I('r19-soon'), 107.3, 0.25); fadeOut(I('r19-num'), 107.3, 0.25); fadeOut(I('r19-lbl'), 107.3, 0.25); fadeOut(I('r19-ind'), 107.3, 0.25);
  words('r19-k', 107.51);
  document.querySelectorAll('#r19-india .arcs path').forEach((a, i) => {
    const len = a.getTotalLength();
    tl.fromTo(a, { attr: { 'stroke-dasharray': `${len} ${len}`, 'stroke-dashoffset': len }, opacity: 1 }, { attr: { 'stroke-dashoffset': 0 }, duration: 0.7, ease: 'power2.out' }, 107.65 + i * 0.12);
  });
  document.querySelectorAll('#r19-india .homes > g > g').forEach((h, i) => popIn(h, 108.25 + i * 0.12, { ease: 'back.out(3)' }));
});

// =====================================================================
// R20 — vision: fly down the road as new stores stream past (110.45 – 114.5)
// =====================================================================
const VP = { x: 540, y: 990 };
scene('r20', 110.45, 114.5, 'url(#sunV)', 'iris', () => `
  ${G('r20-rays', VP.x, VP.y, Array.from({ length: 18 }, (_, i) => `<path d="M0,0 L${(Math.cos((i * 20 - 4) * Math.PI / 180) * 1400).toFixed(0)},${(Math.sin((i * 20 - 4) * Math.PI / 180) * 1400).toFixed(0)} L${(Math.cos((i * 20 + 4) * Math.PI / 180) * 1400).toFixed(0)},${(Math.sin((i * 20 + 4) * Math.PI / 180) * 1400).toFixed(0)}Z" fill="#fff" opacity="0.13"/>`).join(''))}
  ${G('r20-sun', VP.x, VP.y, Ci(0, 0, 290, '#FFE29A', 'opacity="0.55"') + Ci(0, 0, 180, '#FFC857'))}
  ${R(-60, VP.y, W + 120, 1000, '#9AD7AE')}${R(-60, VP.y, W + 120, 10, '#86C99B')}
  ${P(`M${VP.x - 24},${VP.y} L${VP.x + 24},${VP.y} L1000,1990 L80,1990Z`, '#6F7D89')}
  ${P(`M${VP.x - 24},${VP.y} L${VP.x - 18},${VP.y} L150,1990 L80,1990Z`, '#fff', 'opacity="0.7"')}${P(`M${VP.x + 18},${VP.y} L${VP.x + 24},${VP.y} L1000,1990 L930,1990Z`, '#fff', 'opacity="0.7"')}
  <g id="r20-dashes">${Array.from({ length: 9 }, (_, i) => G(`r20-d${i}`, VP.x, VP.y, R(-8, -26, 16, 52, '#fff', 6))).join('')}</g>
  <g id="r20-flow">${Array.from({ length: 22 }, (_, k) => 21 - k).map(i => G(`r20-f${i}`, VP.x, VP.y, S(0, 0, 1, storeArt()))).join('')}</g>
  <g id="r20-birds">${[[160, 610, 1], [250, 660, 0.7], [880, 560, 0.85]].map(([x, y, k], i) => G(`r20-b${i}`, x, y, S(0, 0, k, `<g class="wing">${L('M-30,0 Q-15,-16 0,0 Q15,-16 30,0', C.ink2, 5)}</g>`))).join('')}</g>
  ${chipV('r20-v', 540, 290, 'OUR VISION', { size: 50, bg: C.saf, fg: C.ink, w: 800 })}
  ${KT('r20-k', 540, 455, 'Grow the network,|*step by step*', { size: 84, chars: true })}
  ${G('r20-logo', 540, 700, Ci(0, 0, 76, '#fff', 'opacity="0.5"') + logoMark(62))}
`, t => {
  spin(I('r20-rays'), 110.2, 114.6, 24);
  tl.fromTo(I('r20-sun'), { y: 140 }, { y: 0, duration: 4, ease: 'power1.out' }, 110.3);
  for (let i = 0; i < 22; i++) {
    const t0 = 108.6 + i * 0.27, left = i % 2 === 0;
    tl.fromTo(I(`r20-f${i}`), { scale: 0.02, opacity: 0, transformOrigin: '50% 100%' }, { scale: 1.6, opacity: 1, duration: 2.0, ease: 'power2.in' }, t0);
    tl.fromTo(`#r20-f${i}`, { x: VP.x, y: VP.y }, { x: left ? -330 : 1410, y: 2150, duration: 2.0, ease: 'power2.in' }, t0);
  }
  for (let i = 0; i < 9; i++) {
    const t0 = 109.2 + i * 0.6;
    tl.fromTo(`#r20-d${i}`, { x: VP.x, y: VP.y }, { y: 2000, duration: 1.3, ease: 'power2.in' }, t0);
    tl.fromTo(I(`r20-d${i}`), { scale: 0.05 }, { scale: 2.2, duration: 1.3, ease: 'power2.in' }, t0);
  }
  [0, 1, 2].forEach(i => {
    tl.fromTo(I(`r20-b${i}`), { x: -300 - i * 80 }, { x: 900 + i * 60, duration: 4.4, ease: 'none' }, 110.2);
    tl.fromTo(`#r20-b${i} .wing`, { scaleY: 1, transformOrigin: '50% 100%' }, { scaleY: -0.6, duration: 0.22, yoyo: true, repeat: 19, ease: 'sine.inOut' }, 110.2);
  });
  popIn(I('r20-v'), 110.69, { ease: 'back.out(2.4)' });
  popIn(I('r20-logo'), 110.9, { ease: 'back.out(2.4)' });
  words('r20-k', 111.75, { cst: 0.03 });
});

// =====================================================================
// R21 — right medicine, lower cost, more families (114.5 – 119.1)
// =====================================================================
const RVALS = [
  { ic: icon.shield(1.0), h: 'Right medicine', e: 'genuine & pharmacist-checked', at: 114.74, col: C.green },
  { ic: icon.rupee(0.95), h: 'Lower cost', e: 'flat 20% off on MRP', at: 116.02, col: C.saf },
  { ic: icon.family(0.8), h: 'More families', e: 'across Delhi NCR & beyond', at: 117.16, col: C.coral },
];
scene('r21', 114.5, 119.1, C.mintL, 'push', () => `
  ${Ci(1000, 300, 220, C.mint)}${Ci(80, 1750, 260, C.mint)}
  ${KT('r21-k', 540, 330, 'So that…', { size: 104, fill: C.ink2, chars: true })}
  ${RVALS.map((v, i) => G(`r21-c${i}`, 540, 690 + i * 330, `<g filter="url(#softShadow)">${R(-450, -135, 900, 270, '#fff', 32)}</g>` + R(-450, -135, 28, 270, v.col, 14) +
    `<g class="ic">${S(-290, 0, 1, v.ic)}</g>` +
    T(-150, -2, v.h, { size: 66, w: 800, fill: C.ink, a: 'start', cls: 'd' }) + T(-150, 58, v.e, { size: 34, w: 600, fill: C.ink3, a: 'start' }) +
    `<clipPath id="r21cp${i}"><rect x="-450" y="-135" width="900" height="270" rx="32"/></clipPath><g clip-path="url(#r21cp${i})"><g class="shine" data-w="900">${R(-60, -160, 120, 320, 'url(#shineG)', 0, 'transform="skewX(-22)"')}</g></g>` +
    `<g class="ok" opacity="0">${S(380, -90, 0.8, icon.check(1, v.col))}</g>`) + confetti(`r21-cf${i}`, 250, 690 + i * 330, 14, 40 + i, 0.6)).join('')}
`, t => {
  words('r21-k', 114.6, { cst: 0.04 });
  RVALS.forEach((v, i) => {
    tl.fromTo(I(`r21-c${i}`), { scaleY: 0, opacity: 0, transformOrigin: '50% 50%' }, { scaleY: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, v.at);
    tl.fromTo(`#r21-c${i} .ic`, { rotation: -25, scale: 0.4, transformOrigin: '50% 50%' }, { rotation: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' }, v.at + 0.1);
    shine(document.querySelector(`#r21-c${i} .shine`), v.at + 0.35);
    popIn(`#r21-c${i} .ok`, v.at + 0.4, { ease: 'back.out(3)' });
    burst(`r21-cf${i}`, v.at + 0.15);
    punch('r21', v.at + 0.1, 1.03);
  });
});

// =====================================================================
// R22 — outro (119.1 – end)
// =====================================================================
scene('r22', 119.1, DUR, 'url(#endR)', 'swipe', () => {
  const r = rng(77);
  let leaves = '';
  for (let i = 0; i < 16; i++) {
    const x = r() * W, y = 700 + r() * 1300, k = 0.25 + r() * 0.35;
    leaves += `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)})"><g class="lf" data-dy="${(-500 - r() * 600).toFixed(0)}" data-rot="${((r() - 0.5) * 360).toFixed(0)}"><g opacity="${(0.25 + r() * 0.35).toFixed(2)}">${icon.leaf(k, i % 2 ? C.lime : '#7FD49B')}</g></g></g>`;
  }
  let burstLeaves = '';
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2, d = 330 + r() * 160;
    burstLeaves += `<g class="bl" data-dx="${(Math.cos(a) * d).toFixed(0)}" data-dy="${(Math.sin(a) * d).toFixed(0)}">${icon.leaf(0.45, i % 3 ? C.lime : '#fff')}</g>`;
  }
  return `
    ${G('r22-rays', 540, 820, Array.from({ length: 20 }, (_, i) => `<path d="M0,0 L${(Math.cos((i * 18 - 4) * Math.PI / 180) * 1500).toFixed(0)},${(Math.sin((i * 18 - 4) * Math.PI / 180) * 1500).toFixed(0)} L${(Math.cos((i * 18 + 4) * Math.PI / 180) * 1500).toFixed(0)},${(Math.sin((i * 18 + 4) * Math.PI / 180) * 1500).toFixed(0)}Z" fill="#fff" opacity="0.05"/>`).join(''))}
    <g id="r22-leaves">${leaves}</g>
    ${G('r22-glow', 540, 820, Ci(0, 0, 360, 'url(#glowG)'))}
    ${G('r22-ringB', 540, 820, `<circle r="300" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="5" stroke-dasharray="4 18" stroke-linecap="round"/>`)}
    ${G('r22-ringA', 540, 820, `<circle class="ra" r="262" fill="none" stroke="${C.lime}" stroke-width="12" stroke-linecap="round" transform="rotate(-90)"/>`)}
    <g id="r22-burst" transform="translate(540,820)">${burstLeaves}</g>
    ${G('r22-logo', 540, 820, `<clipPath id="r22clip"><circle r="210"/></clipPath>` + logoMark(210) +
      `<g clip-path="url(#r22clip)"><g class="shine" data-w="420">${R(-70, -260, 140, 520, 'url(#shineG)', 0, 'transform="skewX(-22)"')}</g></g>`)}
    ${KT('r22-name', 540, 1190, 'Jan Seva|Dawa Bazaar', { size: 108, fill: '#fff', sticker: false, chars: true })}
    ${chipV('r22-t0', 225, 1440, 'Right medicine', { size: 31, bg: 'rgba(255,255,255,0.14)', fg: '#fff' })}
    ${chipV('r22-t1', 540, 1440, 'Lower cost', { size: 31, bg: 'rgba(255,255,255,0.14)', fg: '#fff' })}
    ${chipV('r22-t2', 855, 1440, 'Every home', { size: 31, bg: 'rgba(255,255,255,0.14)', fg: '#fff' })}
    ${G('r22-loc', 540, 1550, T(0, 0, 'Delhi NCR  •  Gurugram  •  Growing across India', { size: 30, w: 600, fill: C.mint }))}
    ${chipV('r22-cta', 540, 1680, 'Visit your nearest JSDB store', { size: 42, bg: C.lime, fg: C.tealD, w: 800 })}
  `;
}, t => {
  spin(I('r22-rays'), 119.1, DUR, 40);
  document.querySelectorAll('#r22-leaves .lf').forEach(l => tl.fromTo(l, { y: 0, rotation: 0 }, { y: +l.dataset.dy, rotation: +l.dataset.rot, duration: DUR - 119.0, ease: 'none', transformOrigin: '50% 50%' }, 119.0));
  const ra = document.querySelector('#r22-ringA .ra'), len = 2 * Math.PI * 262;
  tl.fromTo(ra, { attr: { 'stroke-dasharray': `${len} ${len}`, 'stroke-dashoffset': len } }, { attr: { 'stroke-dashoffset': 0 }, duration: 1.0, ease: 'power2.inOut' }, 119.25);
  popIn(I('r22-ringB'), 119.3, { from: 0.6 });
  spin(I('r22-ringB'), 119.3, DUR, 90);
  tl.fromTo(I('r22-glow'), { scale: 0.3, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }, 119.4);
  tl.to(I('r22-glow'), { scale: 1.12, duration: 0.9, yoyo: true, repeat: 3, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 120.2);
  tl.fromTo(I('r22-logo'), { scale: 0, rotation: -220, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, opacity: 1, duration: 1.1, ease: 'elastic.out(1, 0.6)' }, 119.35);
  document.querySelectorAll('#r22-burst .bl').forEach((el, i) => {
    tl.fromTo(el, { x: 0, y: 0, scale: 0.2, opacity: 0, rotation: 0 }, { x: +el.dataset.dx, y: +el.dataset.dy, scale: 1, opacity: 1, rotation: 160 + i * 20, duration: 0.9, ease: 'power3.out' }, 119.6);
    tl.to(el, { opacity: 0, scale: 0.6, duration: 0.5 }, 120.3);
  });
  punch('r22', 119.65, 1.06);
  shine(document.querySelector('#r22-logo .shine'), 120.3);
  shine(document.querySelector('#r22-logo .shine'), 122.6);
  bob(I('r22-logo'), 120.6, DUR, 8, 1.6);
  words('r22-name', 120.0, { cst: 0.035 });
  ['r22-t0', 'r22-t1', 'r22-t2'].forEach((id, i) => popIn(I(id), 121.0 + i * 0.22, { ease: 'back.out(2.4)' }));
  riseIn(I('r22-loc'), 121.8);
  popIn(I('r22-cta'), 122.3, { ease: 'back.out(2.2)' });
  tl.to(I('r22-cta'), { scale: 1.05, duration: 0.45, yoyo: true, repeat: 3, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 123.0);
}, ['#ffffff']);

// pins + network, after the DOM exists
window.afterBuild = () => {
  const p6 = addPins('#r6-map .pins', ['delhi', 'delhi', 'gurugram'], 14, 5, 0.9, C.coral);
  document.querySelector('#r6-map .net').innerHTML = p6.slice(1).map((p, i) => {
    const q = p6.slice(0, i + 1).reduce((b, c) => Math.hypot(c[0] - p[0], c[1] - p[1]) < Math.hypot(b[0] - p[0], b[1] - p[1]) ? c : b);
    return L(`M${q[0].toFixed(0)},${(q[1] - 34).toFixed(0)} L${p[0].toFixed(0)},${(p[1] - 34).toFixed(0)}`, C.teal, 4, 'stroke-dasharray="8 12" opacity="0.7"');
  }).join('');
  addPins('#r17-map .pins', ['delhi', 'gurugram', 'noida', 'ghaziabad', 'faridabad', 'delhi', 'gurugram'], 42, 9, 0.75, C.coral);

  // India: Delhi hub, NCR cluster, expansion pins ordered by distance from Delhi
  const host = document.querySelector('#r19-india');
  const dl = document.getElementById('in-dl').getBBox(), D = [dl.x + dl.width / 2, dl.y + dl.height / 2];
  const r = rng(101), pin = (x, y, s, col) => `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)})"><g opacity="0">${icon.pin(s, col)}</g></g>`;
  const inside = (id, x, y) => document.getElementById('in-' + id).isPointInFill(new DOMPoint(x, y));
  let ncr = '';
  for (let i = 0, g = 0; i < 9 && g < 5000; g++) {
    const x = D[0] + (r() - 0.5) * 30, y = D[1] + (r() - 0.5) * 24;
    if (['dl', 'hr', 'up'].some(s => inside(s, x, y))) { ncr += pin(x, y, 0.22, C.coral); i++; }
  }
  host.querySelector('.ncr').innerHTML = ncr;
  host.querySelector('.dl').innerHTML = `<g transform="translate(${D[0]},${D[1]})">${[0, 1].map(() => `<circle class="rg" r="8" fill="none" stroke="${C.coral}" stroke-width="2.5" opacity="0"/>`).join('')}<g opacity="0">${Ci(0, 0, 7, C.coral)}${Ci(0, 0, 3, '#fff')}</g></g>`;
  const pts = [];
  Object.entries(IN_W).forEach(([st, n]) => {
    const b = document.getElementById('in-' + st).getBBox();
    for (let k = 0, g = 0; k < n && g < 4000; g++) {
      const x = b.x + r() * b.width, y = b.y + r() * b.height;
      if (!inside(st, x, y) || pts.some(p => Math.hypot(p.x - x, p.y - y) < 13)) continue;
      pts.push({ x, y, st, d: Math.hypot(x - D[0], y - D[1]) }); k++;
    }
  });
  pts.sort((a, b) => a.d - b.d);
  host.querySelector('.pins').innerHTML = pts.map(p => pin(p.x, p.y, 0.26, C.green).replace('<g transform', `<g data-st="${p.st}" transform`)).join('');
  const cities = IN_CITIES.map(st => {
    const b = document.getElementById('in-' + st).getBBox(), c = [b.x + b.width / 2, b.y + b.height / 2];
    return pts.filter(p => p.st === st).reduce((best, p) => Math.hypot(p.x - c[0], p.y - c[1]) < Math.hypot(best.x - c[0], best.y - c[1]) ? p : best);
  });
  host.querySelector('.arcs').innerHTML = cities.map(c => {
    const mx = (D[0] + c.x) / 2, my = (D[1] + c.y) / 2 - Math.hypot(c.x - D[0], c.y - D[1]) * 0.25;
    return `<path d="M${D[0].toFixed(1)},${D[1].toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${c.x.toFixed(1)},${c.y.toFixed(1)}" fill="none" stroke="${C.tealL}" stroke-width="2.4" stroke-linecap="round" opacity="0"/>`;
  }).join('');
  host.querySelector('.homes').innerHTML = cities.map(c => `<g transform="translate(${c.x.toFixed(1)},${(c.y - 16).toFixed(1)})"><g opacity="0">${S(0, 0, 0.11, house({ w: 160, h: 150, col: '#FFFFFF', trim: C.lime, door: true }))}${S(14, -16, 0.2, icon.check())}</g></g>`).join('');
};

// per-scene ambient particle colours
const FX = { r1: FX_W, r2: FX_S, r3: FX_T, r4: FX_S, r5: FX_B, r6: FX_T, r7: FX_W, r8: FX_B, r9: FX_B, r10: FX_C, r11: FX_S, r12: FX_W, r13: FX_P, r14: FX_B, r15: FX_S, r16: FX_C, r17: FX_T, r18: FX_W, r19: FX_T, r20: FX_S, r21: FX_T };
SCENES.forEach(s => { if (FX[s.id]) s.fxCols = FX[s.id]; });
window.WARM = [19.5, 74.0];
init();
