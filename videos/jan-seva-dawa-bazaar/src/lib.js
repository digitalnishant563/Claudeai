// Shared palette, SVG helpers and illustration generators (flat 2D style).
const C = {
  ink: '#12324A', ink2: '#2E4D66', ink3: '#5B7489',
  teal: '#0E8C7A', tealD: '#0A6B5D', tealL: '#3FB8A3',
  mint: '#CFF3E8', mintL: '#ECFBF6',
  green: '#2BB673', greenD: '#1E8F58',
  saf: '#FFB627', safD: '#E89A0C', orange: '#FF8A3D',
  coral: '#FF5F5F', coralD: '#E04848', pink: '#FF9BB0',
  sky: '#CDEBFF', skyL: '#EAF6FF', blue: '#3D8BFD', blueD: '#2A6BD1',
  cream: '#FFF6E9', creamD: '#F6E6CC',
  purple: '#7B6CF6', white: '#FFFFFF',
  grey: '#9AA9B6', greyL: '#E4EBF0', greyLL: '#F3F6F8', greyD: '#5E6E7C',
  box: '#D9A066', boxD: '#B97E45', boxL: '#EBC08E',
  skin1: '#F2C29B', skin2: '#D9A07A', skin3: '#B9805C',
};

let _uid = 0;
const uid = (p = 'e') => `${p}${++_uid}`;

const R = (x, y, w, h, f, rx = 0, ex = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${ex}/>`;
const Ci = (cx, cy, r, f, ex = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${ex}/>`;
const E = (cx, cy, rx, ry, f, ex = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${ex}/>`;
const P = (d, f, ex = '') => `<path d="${d}" fill="${f}" ${ex}/>`;
const L = (d, s, w = 4, ex = '') => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
// Positioned wrapper + animatable inner group. Animate with I(id).
const G = (id, x, y, inner, ex = '') => `<g ${id ? `id="${id}"` : ''} transform="translate(${x},${y})" ${ex}><g class="in">${inner}</g></g>`;
const S = (x, y, s, inner, ex = '') => `<g transform="translate(${x},${y}) scale(${s})" ${ex}>${inner}</g>`;
const I = id => `#${id} > .in`;
const shadow = (rx, ry = rx * 0.16, y = 0) => E(0, y, rx, ry, '#0B2238', 'opacity="0.10"');

function T(x, y, s, o = {}) {
  const { size = 56, w = 700, fill = C.ink, a = 'middle', id = '', ls = 0, op = null, cls = '' } = o;
  return `<text ${id ? `id="${id}"` : ''} class="t ${cls}" x="${x}" y="${y}" font-size="${size}" font-weight="${w}" fill="${fill}" text-anchor="${a}" ${ls ? `letter-spacing="${ls}"` : ''} ${op != null ? `opacity="${op}"` : ''}>${s}</text>`;
}

// Auto-width pill label (rect is resized to the text after fonts load).
function chip(id, x, y, s, o = {}) {
  const { size = 40, bg = C.teal, fg = '#fff', w = 600, pad = size * 0.8, stroke = '' } = o;
  const h = o.h || size * 1.75;
  return G(id, x, y, `<rect class="chip-bg" data-pad="${pad}" x="-100" y="${-h / 2}" width="200" height="${h}" rx="${h / 2}" fill="${bg}" ${stroke}/>` +
    T(0, size * 0.36, s, { size, fill: fg, w }));
}

// ---------- Brand ----------
function logoMark(r = 40) {
  const a = r * 0.22, b = r * 0.62;
  return Ci(0, 0, r, C.green) + Ci(0, 0, r * 0.86, 'none', `stroke="#fff" stroke-width="${r * 0.06}" opacity="0.5"`) +
    R(-a, -b, a * 2, b * 2, '#fff', a * 0.5) + R(-b, -a, b * 2, a * 2, '#fff', a * 0.5) +
    P(`M${r * 0.18},${r * 0.18} C${r * 0.5},${r * 0.1} ${r * 0.62},${r * 0.4} ${r * 0.55},${r * 0.6} C${r * 0.3},${r * 0.62} ${r * 0.16},${r * 0.45} ${r * 0.18},${r * 0.18}Z`, C.saf);
}

// ---------- People ----------
// Feet at (0,0); about 330px tall. Parts carry classes for animation.
function person(o = {}) {
  const {
    skin = C.skin1, hair = '#2B2B33', shirt = C.coral, pants = C.ink2, style = 'short',
    coat = false, mouth = 'smile', glasses = false, stick = false, helmet = false, sleeve = null, shoes = '#22303D', sit = false, armA = 0,
  } = o;
  const sl = sleeve || (coat ? '#FFFFFF' : shirt);
  let back = '', front = '';
  if (style === 'long') {
    back = R(-50, -322, 100, 118, hair, 44);
    front = P('M-44,-284 Q-46,-334 2,-334 Q46,-332 44,-284 Q28,-312 6,-312 Q-6,-300 -44,-284Z', hair);
  } else if (style === 'bun') {
    back = Ci(0, -338, 18, hair);
    front = P('M-44,-284 Q-46,-332 0,-332 Q46,-332 44,-284 Q30,-308 0,-310 Q-30,-308 -44,-284Z', hair);
  } else if (style === 'grey') {
    front = P('M-44,-280 Q-46,-326 0,-328 Q46,-326 44,-280 Q38,-300 30,-302 Q20,-292 0,-300 Q-20,-292 -32,-302 Q-40,-300 -44,-280Z', '#D9DDE2');
  } else if (style === 'bald') {
    front = '';
  } else {
    front = P('M-44,-284 Q-46,-334 0,-334 Q46,-334 44,-284 Q34,-306 6,-308 Q-24,-312 -44,-284Z', hair);
  }
  const mouths = {
    smile: L('M-12,-266 Q0,-255 12,-266', C.ink, 3.5),
    open: P('M-11,-268 Q0,-250 11,-268Z', C.ink),
    worry: L('M-10,-260 Q0,-268 10,-260', C.ink, 3.5),
    flat: L('M-9,-263 L9,-263', C.ink, 3.5),
  };
  const brows = mouth === 'worry' ? L('M-22,-300 L-8,-296', C.ink, 3.5) + L('M22,-300 L8,-296', C.ink, 3.5) : '';
  const glass = glasses ? `<g fill="none" stroke="${C.ink}" stroke-width="3">` + Ci(-14, -284, 11, 'none') + Ci(14, -284, 11, 'none') + L('M-3,-285 L3,-285', C.ink, 3) + `</g>` : '';
  const mustache = style === 'grey' ? P('M-14,-271 Q0,-280 14,-271 Q0,-266 -14,-271Z', '#C9CED4') : '';
  const helm = helmet ? P('M-48,-282 Q-50,-340 0,-342 Q50,-340 48,-282 L30,-284 Q0,-292 -30,-284Z', C.coral) + R(-50, -292, 100, 10, C.coralD, 5) : '';
  const coatSvg = coat
    ? R(-48, -232, 96, 142, '#FFFFFF', 34) + P('M-14,-232 L0,-200 L14,-232Z', C.tealL) + L('M-14,-232 L-4,-150', '#DDE5EA', 3) + L('M14,-232 L4,-150', '#DDE5EA', 3) +
      R(16, -190, 22, 18, '#EEF3F6', 4) + R(24, -188, 6, 14, C.green, 1) + R(20, -184, 14, 6, C.green, 1)
    : '';
  const stickSvg = stick ? L('M72,-130 L84,0', C.brown || '#8B5A2B', 7) + L('M60,-132 Q66,-142 74,-132', '#8B5A2B', 7) : '';
  return `<g class="person">
    ${back}
    ${sit ? R(-36, -132, 96, 34, pants, 16) + R(30, -122, 30, 80, pants, 14) + E(52, -44, 24, 10, shoes)
      : `<g class="legL" >${R(-36, -128, 30, 124, pants, 14)}${E(-22, -6, 22, 10, shoes)}</g>
    <g class="legR" >${R(6, -128, 30, 124, pants, 14)}${E(22, -6, 22, 10, shoes)}</g>`}
    ${R(-46, -232, 92, 128, shirt, 36)}
    ${coatSvg}
    ${R(-10, -248, 20, 22, skin, 6)}
    <g class="armL" transform="translate(-42,-218)"><g class="arm">${R(-12, -6, 24, 100, sl, 12)}${Ci(0, 98, 13, skin)}</g></g>
    <g class="armR" transform="translate(42,-218) rotate(${armA})"><g class="arm">${R(-12, -6, 24, 100, sl, 12)}${Ci(0, 98, 13, skin)}</g></g>
    ${stickSvg}
    <g class="head">
      ${Ci(-41, -280, 9, skin)}${Ci(41, -280, 9, skin)}
      ${Ci(0, -282, 42, skin)}
      ${front}${helm}
      <g class="eyes">${Ci(-14, -284, 4.5, C.ink)}${Ci(14, -284, 4.5, C.ink)}</g>
      ${Ci(-25, -269, 6, C.coral, 'opacity="0.3"')}${Ci(25, -269, 6, C.coral, 'opacity="0.3"')}
      ${brows}${glass}${mustache}${mouths[mouth] || mouths.smile}
    </g>
  </g>`;
}

// ---------- Buildings ----------
function storeArt(o = {}) {
  const W = o.w || 560, H = 440, hw = W / 2;
  let awn = '';
  const n = 14, sw = W / n;
  for (let i = 0; i < n; i++) {
    const x = -hw + i * sw, col = i % 2 ? '#FFFFFF' : C.green;
    awn += R(x, -318, sw + 0.5, 46, col) + P(`M${x},-272 A${sw / 2},${sw / 2.2} 0 0 0 ${x + sw},-272Z`, col);
  }
  let goods = '';
  const cols = [C.coral, C.saf, C.blue, C.green, C.purple, C.orange, C.tealL];
  [-196, -132, -68].forEach((sy, r) => {
    goods += R(-252, sy, 304, 7, '#C8D6DF', 3);
    for (let k = 0; k < 7; k++) {
      const h = 26 + ((k * 7 + r * 3) % 4) * 6, wd = 30;
      goods += R(-240 + k * 42, sy - h, wd, h, cols[(k + r * 2) % cols.length], 4) + R(-240 + k * 42 + 6, sy - h + 8, wd - 12, 6, '#fff', 2, 'opacity="0.7"');
    }
  });
  return `<g class="store">
    ${shadow(hw + 40, 22, 4)}
    ${R(-hw, -H, W, H, '#F7F3EA', 10)}
    ${R(-hw - 16, -H - 20, W + 32, 32, C.tealD, 10)}
    <g class="sign">${R(-hw + 18, -H + 14, W - 36, 98, C.teal, 16)}
      ${S(-hw + 80, -H + 63, 1, logoMark(34))}
      ${T(o.name ? 36 : 48, -H + (o.name ? 80 : 76), o.name || 'Jan Seva Dawa Bazaar', { size: o.signSize || (o.name ? 46 : 34), fill: '#fff', w: 700 })}
    </g>
    ${awn}
    <g class="window">${R(-262, -250, 324, 236, '#DFF1FA', 8)}${R(-262, -250, 324, 236, 'none', 8, `stroke="${C.tealD}" stroke-width="10"`)}${goods}
      ${P('M-240,-240 L-170,-240 L-250,-30 L-255,-30Z', '#fff', 'opacity="0.35"')}</g>
    <g class="door">${R(86, -250, 168, 250, C.tealD, 8)}${R(100, -236, 140, 236, '#BFE6F2', 4)}${R(214, -130, 10, 40, C.saf, 4)}
      ${T(170, -170, 'OPEN', { size: 26, fill: C.teal, w: 700 })}</g>
    ${R(-hw - 10, -10, W + 20, 14, '#D6D0C4', 4)}
    <g class="crossSign" transform="translate(${hw - 6},-372)">${R(0, -4, 34, 8, C.ink2, 3)}<g class="glow">${Ci(64, 0, 40, C.green, 'opacity="0.25"')}</g>${R(46, -36, 36, 72, C.green, 8)}${R(28, -18, 72, 36, C.green, 8)}${R(52, -30, 24, 60, '#fff', 4, 'opacity="0.25"')}</g>
  </g>`;
}

function house(o = {}) {
  const { w = 240, h = 330, col = '#F7C873', trim = '#E0A94A', tank = false, door = true, plant = false } = o;
  let s = R(0, -h, w, h, col, 4) + R(-8, -h - 14, w + 16, 22, trim, 4);
  const floors = Math.max(1, Math.round((h - 40) / 140));
  const fh = (h - 20) / floors;
  for (let f = 0; f < floors; f++) {
    const y0 = -h + 30 + f * fh;
    const isGround = f === floors - 1 && door;
    const wins = isGround ? [0.12] : [0.12, 0.56];
    wins.forEach(px => {
      const wx = w * px, ww = w * 0.32, wh = fh * 0.46;
      s += R(wx - 6, y0 - 12, ww + 12, 12, trim, 3);
      s += R(wx, y0, ww, wh, '#2F5470', 4) + R(wx + 4, y0 + 4, ww - 8, wh - 8, '#7FB6D6', 3);
      for (let g = 1; g < 4; g++) s += R(wx + (ww / 4) * g - 1.5, y0, 3, wh, '#2F5470');
    });
    if (isGround) {
      s += R(w * 0.58, -fh * 0.72 - 4, w * 0.3, fh * 0.72 + 4, '#7A4E2D', 4) + Ci(w * 0.64, -fh * 0.36, 4, C.saf);
    }
    if (f < floors - 1) s += R(-4, y0 + fh - 30, w + 8, 10, trim, 3);
  }
  if (tank) s += R(w * 0.62, -h - 70, 54, 58, '#2B2B33', 10) + R(w * 0.62 + 6, -h - 78, 42, 12, '#3A3A44', 6);
  if (plant) s += R(8, -26, 34, 26, C.coral, 4) + Ci(25, -36, 18, C.green) + Ci(14, -44, 12, C.greenD);
  return `<g class="house">${s}</g>`;
}

function factoryArt() {
  return `<g class="factory">${shadow(170, 18, 2)}
    ${R(-160, -200, 320, 200, '#E7ECF0', 6)}
    ${P('M-160,-200 L-160,-262 L-80,-200 L-80,-262 L0,-200 L0,-262 L80,-200 L80,-262 L160,-200Z', C.blue)}
    ${R(96, -330, 34, 140, C.ink2, 4)}${R(92, -336, 42, 14, C.ink, 4)}
    <g class="smoke">${Ci(114, -360, 18, '#DCE3E8')}${Ci(132, -392, 24, '#E6ECEF')}${Ci(110, -428, 30, '#EEF2F4')}</g>
    ${[-130, -70, -10].map(x => R(x, -160, 44, 40, '#7FB6D6', 4)).join('')}
    ${R(60, -110, 70, 110, C.ink2, 4)}
    ${R(-130, -96, 160, 50, C.blue, 6)}${T(-50, -62, 'PHARMA', { size: 28, fill: '#fff', w: 700, ls: 2 })}
  </g>`;
}

function distributorArt() {
  return `<g class="dist">${shadow(150, 16, 2)}
    ${R(-140, -190, 280, 190, '#FFF1D6', 6)}
    ${P('M-160,-186 L0,-270 L160,-186Z', C.safD)}
    ${R(-110, -150, 220, 46, C.purple, 8)}${T(0, -119, 'DISTRIBUTOR', { size: 24, fill: '#fff', w: 700, ls: 2 })}
    ${R(-50, -90, 100, 90, '#7A4E2D', 4)}
    ${R(-120, -86, 50, 44, '#7FB6D6', 4)}${R(70, -86, 50, 44, '#7FB6D6', 4)}
    ${S(96, -184, 0.5, P('M0,-30 L26,-20 V2 C26,18 12,28 0,32 C-12,28 -26,18 -26,2 V-20Z', C.green) + L('M-10,0 L-2,8 L12,-8', '#fff', 6))}
  </g>`;
}

function warehouseArt(clip = '') {
  let shutter = '';
  for (let i = 0; i < 9; i++) shutter += R(-110, -230 + i * 26, 220, 4, '#9FB1BF');
  return `<g class="warehouse">${shadow(240, 22, 2)}
    ${R(-230, -280, 460, 280, '#EEF2F5', 8)}
    ${P('M-250,-276 Q0,-400 250,-276Z', C.teal)}
    ${R(-150, -330, 300, 50, C.tealD, 10)}${T(0, -294, 'STOCK ROOM', { size: 32, fill: '#fff', w: 700, ls: 3 })}
    ${clip ? `<clipPath id="${clip}"><rect x="-112" y="-232" width="224" height="232"/></clipPath>` : ''}<g class="shutterBox" ${clip ? `clip-path="url(#${clip})"` : ''}>${R(-120, -240, 240, 240, '#4A5F70', 4)}
      <g class="inside">${R(-110, -230, 220, 230, '#F6E3C4')}${[[-96, -60], [-40, -60], [16, -60], [-70, -116], [-14, -116]].map(([x, y]) => S(x + 26, y + 60, 1, boxArt(52, 56))).join('')}</g>
      <g class="shutter">${R(-112, -232, 224, 232, '#C7D3DC')}${shutter}${R(-30, -16, 60, 10, '#7B8C99', 4)}</g></g>
    ${R(-205, -220, 64, 54, '#7FB6D6', 4)}${R(141, -220, 64, 54, '#7FB6D6', 4)}
  </g>`;
}

// Cardboard box with origin at bottom-center.
function boxArt(w = 90, h = 80, o = {}) {
  const { label = true, tag = '' } = o;
  return `<g class="box">${R(-w / 2, -h, w, h, C.box, 6)}${R(-w / 2, -h, w, h * 0.2, C.boxD, 6)}${R(-6, -h, 12, h * 0.55, C.boxL, 2)}
    ${label ? R(-w * 0.32, -h * 0.5, w * 0.64, h * 0.32, '#fff', 4) + R(-3, -h * 0.47, 6, h * 0.26, C.green, 1) + R(-h * 0.13, -h * 0.37, h * 0.26, 6, C.green, 1) : ''}${tag}</g>`;
}

function truckArt() {
  return `<g class="truck">${shadow(200, 16, 2)}
    ${R(-220, -230, 300, 190, '#FFFFFF', 12)}${R(-220, -230, 300, 190, 'none', 12, `stroke="${C.greyL}" stroke-width="4"`)}
    ${S(-150, -136, 1, logoMark(36))}${T(-30, -150, 'MEDICINES', { size: 26, fill: C.teal, w: 800, a: 'middle' })}${T(-30, -118, 'Direct Supply', { size: 20, fill: C.ink3, w: 500 })}
    ${R(-220, -60, 300, 18, C.greyD, 6)}
    ${P('M90,-180 L170,-180 Q196,-180 206,-150 L226,-96 L226,-42 L90,-42Z', C.teal)}
    ${P('M108,-166 L164,-166 Q178,-166 184,-150 L198,-110 L108,-110Z', '#BFE6F2')}
    ${R(206, -72, 26, 14, C.saf, 4)}
    <g class="wheel w1" transform="translate(-140,-34)">${Ci(0, 0, 32, '#26323D')}${Ci(0, 0, 14, '#B7C3CC')}${R(-3, -14, 6, 28, '#26323D')}</g>
    <g class="wheel w2" transform="translate(30,-34)">${Ci(0, 0, 32, '#26323D')}${Ci(0, 0, 14, '#B7C3CC')}${R(-3, -14, 6, 28, '#26323D')}</g>
    <g class="wheel w3" transform="translate(170,-34)">${Ci(0, 0, 32, '#26323D')}${Ci(0, 0, 14, '#B7C3CC')}${R(-3, -14, 6, 28, '#26323D')}</g>
  </g>`;
}

function scooterArt() {
  const rider = S(-34, -6, 0.62, person({ shirt: C.green, pants: C.ink2, helmet: true, skin: C.skin2, sit: true, armA: -70 }));
  return `<g class="scooter">${shadow(130, 12, 2)}
    <g class="riderBob">${rider}</g>
    ${R(-150, -150, 92, 82, C.green, 10)}${S(-104, -110, 0.6, logoMark(34))}
    ${P('M-120,-60 L60,-60 Q80,-60 84,-80 L100,-160 L118,-160 L104,-70 Q100,-36 70,-36 L-120,-36Z', C.saf)}
    ${R(-110, -82, 120, 18, '#2B2B33', 8)}
    ${L('M104,-160 L96,-200 L70,-204', C.ink, 7)}
    <g class="wheel" transform="translate(-90,-30)">${Ci(0, 0, 30, '#26323D')}${Ci(0, 0, 12, '#B7C3CC')}</g>
    <g class="wheel" transform="translate(96,-30)">${Ci(0, 0, 30, '#26323D')}${Ci(0, 0, 12, '#B7C3CC')}</g>
  </g>`;
}

// ---------- Objects & icons (centered at 0,0 unless noted) ----------
const icon = {
  pill: (s = 1) => S(0, 0, s, `<g transform="rotate(-35)">${R(-62, -25, 124, 50, '#FFF1F1', 25, `stroke="${C.coral}" stroke-width="6"`)}${P('M0,-25 H37 A25,25 0 0 1 37,25 H0Z', C.coral)}${R(-46, -15, 36, 8, '#fff', 4, 'opacity="0.0"')}${R(10, -15, 34, 8, '#fff', 4, 'opacity="0.45"')}</g>`),
  shield: (s = 1, col = C.green) => S(0, 0, s, P('M0,-72 L58,-50 V-2 C58,40 30,62 0,76 C-30,62 -58,40 -58,-2 V-50Z', col) + L('M-24,0 L-6,18 L26,-16', '#fff', 11)),
  rx: (s = 1) => S(0, 0, s, `${R(-56, -72, 112, 144, '#fff', 10, `stroke="${C.greyL}" stroke-width="4"`)}${T(-26, -18, 'Rx', { size: 44, fill: C.teal, w: 800 })}${R(-36, 8, 72, 7, C.greyL, 3)}${R(-36, 26, 56, 7, C.greyL, 3)}${R(-36, 44, 64, 7, C.greyL, 3)}${L('M20,58 Q30,46 38,58 T52,56', C.blue, 3)}`),
  tag: (s = 1, txt = '%', col = C.saf) => S(0, 0, s, `<g transform="rotate(-12)">${P('M-60,-40 L30,-40 L66,0 L30,40 L-60,40 Q-68,40 -68,32 L-68,-32 Q-68,-40 -60,-40Z', col)}${Ci(36, 0, 8, '#fff')}${T(-14, 18, txt, { size: 50, fill: '#fff', w: 800 })}</g>`),
  bulb: (s = 1) => S(0, 0, s, `<g class="rays">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<g transform="rotate(${a})">${R(-5, -130, 10, 30, C.saf, 5)}</g>`).join('')}</g>${Ci(0, -14, 70, C.saf)}${Ci(-20, -36, 18, '#fff', 'opacity="0.5"')}${R(-34, 50, 68, 18, C.greyD, 6)}${R(-30, 70, 60, 14, C.grey, 6)}${R(-20, 86, 40, 12, C.greyD, 6)}${L('M-16,10 L0,-14 L16,10', '#fff', 6, 'opacity="0.8"')}`),
  bottle: (s = 1, col = C.orange) => S(0, 0, s, `${R(-36, -72, 72, 26, '#FFFFFF', 6)}${R(-42, -50, 84, 120, col, 14)}${R(-34, -18, 68, 54, '#fff', 6)}${R(-4, -10, 8, 36, C.green)}${R(-18, 4, 36, 8, C.green)}${R(-34, -44, 10, 100, '#fff', 5, 'opacity="0.25"')}`),
  strip: (s = 1) => S(0, 0, s, `<g transform="rotate(10)">${R(-70, -44, 140, 88, '#D7DEE4', 10)}${[-46, -16, 14, 44].map(x => Ci(x, -16, 12, '#fff') + Ci(x, 16, 12, '#fff')).join('')}</g>`),
  thermo: (s = 1) => S(0, 0, s, `<g transform="rotate(25)">${R(-16, -80, 32, 150, '#fff', 16)}${R(-16, -80, 32, 150, 'none', 16, `stroke="${C.greyL}" stroke-width="4"`)}${R(-10, -54, 20, 34, '#BFE6F2', 4)}${R(-16, 30, 32, 40, C.blue, 14)}</g>`),
  bp: (s = 1) => S(0, 0, s, `${R(-60, -46, 120, 92, '#fff', 14)}${R(-60, -46, 120, 92, 'none', 14, `stroke="${C.greyL}" stroke-width="4"`)}${R(-42, -30, 84, 40, '#D8F3E8', 6)}${T(0, 0, '120/80', { size: 22, fill: C.tealD, w: 700 })}${Ci(-20, 28, 7, C.coral)}${Ci(20, 28, 7, C.teal)}${L('M60,10 Q100,10 96,60', C.ink2, 6)}`),
  sanitizer: (s = 1) => S(0, 0, s, `${R(-8, -86, 16, 22, C.ink2, 4)}${R(-8, -88, 40, 10, C.ink2, 4)}${R(-36, -64, 72, 130, '#9FD9F2', 18)}${R(-26, -20, 52, 50, '#fff', 6)}${T(0, 12, '+', { size: 40, fill: C.blue, w: 800 })}`),
  bandage: (s = 1) => S(0, 0, s, `<g transform="rotate(-30)">${R(-72, -24, 144, 48, '#F2C29B', 24)}${R(-24, -24, 48, 48, '#E6B087')}${[-12, 0, 12].map(x => Ci(x, -8, 3, '#C98F66') + Ci(x, 8, 3, '#C98F66')).join('')}</g>`),
  heart: (s = 1, col = C.coral) => S(0, 0, s, P('M0,30 C-50,-6 -46,-46 -20,-50 C-8,-52 0,-42 0,-34 C0,-42 8,-52 20,-50 C46,-46 50,-6 0,30Z', col)),
  drop: (s = 1, col = C.blue) => S(0, 0, s, P('M0,-52 C22,-20 38,-2 38,18 A38,38 0 0 1 -38,18 C-38,-2 -22,-20 0,-52Z', col) + Ci(-12, 14, 8, '#fff', 'opacity="0.5"')),
  butterfly: (s = 1, col = C.purple) => S(0, 0, s, P('M0,-10 C-20,-50 -64,-46 -56,-8 C-50,16 -20,18 0,8 C20,18 50,16 56,-8 C64,-46 20,-50 0,-10Z', col) + P('M0,8 C-14,20 -40,34 -30,48 C-18,58 -4,40 0,22 C4,40 18,58 30,48 C40,34 14,20 0,8Z', col, 'opacity="0.75"') + R(-4, -18, 8, 50, C.ink2, 4)),
  leaf: (s = 1, col = C.green) => S(0, 0, s, P('M-40,40 C-50,-20 0,-56 46,-50 C50,0 20,44 -40,40Z', col) + L('M-34,34 Q4,-6 34,-38', '#fff', 4, 'opacity="0.7"')),
  bone: (s = 1, col = '#F3EBDD') => S(0, 0, s, `<g transform="rotate(-30)">${R(-50, -12, 100, 24, col, 6)}${Ci(-52, -14, 16, col)}${Ci(-52, 14, 16, col)}${Ci(52, -14, 16, col)}${Ci(52, 14, 16, col)}</g>`),
  baby: (s = 1) => S(0, 0, s, `${Ci(-30, -34, 16, C.boxD)}${Ci(30, -34, 16, C.boxD)}${Ci(0, 0, 44, C.box)}${E(0, 16, 20, 15, C.boxL)}${Ci(-14, -6, 5, C.ink)}${Ci(14, -6, 5, C.ink)}${E(0, 10, 7, 5, C.ink)}`),
  coin: (s = 1) => S(0, 0, s, `${Ci(0, 4, 34, C.safD)}${Ci(0, 0, 34, C.saf)}${Ci(0, 0, 26, 'none', `stroke="#FFD36E" stroke-width="4"`)}${T(0, 14, '₹', { size: 38, fill: '#8A5A00', w: 800 })}`),
  check: (s = 1, col = C.green) => S(0, 0, s, Ci(0, 0, 34, col) + L('M-14,0 L-4,11 L16,-10', '#fff', 8)),
  cross: (s = 1, col = C.coral) => S(0, 0, s, Ci(0, 0, 34, col) + L('M-12,-12 L12,12 M12,-12 L-12,12', '#fff', 8)),
  rupee: (s = 1) => S(0, 0, s, Ci(0, 0, 60, C.saf) + T(0, 24, '₹', { size: 70, fill: '#fff', w: 800 })),
  family: (s = 1) => S(0, 0, s, `
    <g transform="translate(-70,0)">${R(-34, -40, 68, 90, C.teal, 30)}${Ci(0, -70, 30, C.skin2)}${P('M-30,-74 Q-30,-104 0,-104 Q30,-104 30,-74 Q16,-90 0,-90 Q-16,-90 -30,-74Z', '#2B2B33')}</g>
    <g transform="translate(70,0)">${R(-34, -40, 68, 90, C.coral, 30)}${R(-34, -100, 68, 60, '#2B2B33', 28)}${Ci(0, -70, 30, C.skin1)}${P('M-30,-74 Q-30,-104 0,-104 Q30,-104 30,-74 Q16,-90 0,-90 Q-16,-90 -30,-74Z', '#2B2B33')}</g>
    <g transform="translate(0,20)">${R(-26, -30, 52, 64, C.saf, 24)}${Ci(0, -52, 24, C.skin1)}${P('M-24,-56 Q-24,-80 0,-80 Q24,-80 24,-56 Q12,-68 0,-68 Q-12,-68 -24,-56Z', '#4A3428')}</g>`),
  phone: (s = 1) => S(0, 0, s, `${R(-60, -110, 120, 220, C.ink, 20)}${R(-50, -94, 100, 180, '#fff', 8)}${S(0, -40, 0.6, logoMark(40))}${R(-36, 2, 72, 12, C.greyL, 6)}${R(-36, 24, 72, 30, C.green, 10)}${T(0, 45, 'Order', { size: 18, fill: '#fff', w: 700 })}`),
  lockClosed: (s = 1) => S(0, 0, s, `<g class="shackle">${L('M-26,-20 L-26,-46 A26,26 0 0 1 26,-46 L26,-20', C.greyD, 12)}</g><g class="lockBody">${R(-44, -24, 88, 76, C.saf, 12)}</g>${Ci(0, 8, 9, C.ink)}${R(-4, 10, 8, 20, C.ink, 3)}`),
  magnifier: (s = 1) => S(0, 0, s, `${Ci(0, 0, 46, '#DFF4FF', 'opacity="0.6"')}${Ci(0, 0, 46, 'none', `stroke="${C.ink2}" stroke-width="12"`)}<g transform="rotate(45)">${R(52, -10, 70, 20, C.ink2, 8)}</g>${P('M-26,-12 A28,28 0 0 1 -6,-28', 'none', `stroke="#fff" stroke-width="6" stroke-linecap="round"`)}`),
  pin: (s = 1, col = C.coral) => S(0, 0, s, P('M0,0 C-6,-14 -22,-24 -22,-40 A22,22 0 1 1 22,-40 C22,-24 6,-14 0,0Z', col) + Ci(0, -40, 8.5, '#fff')),
  snow: (s = 1, col = '#fff') => S(0, 0, s, `<g stroke="${col}" stroke-width="6" stroke-linecap="round">${[0, 60, 120].map(a => `<g transform="rotate(${a})"><path d="M0,-30 L0,30 M-8,-22 L0,-14 L8,-22 M-8,22 L0,14 L8,22" fill="none"/></g>`).join('')}</g>`),
  book: (s = 1) => S(0, 0, s, `${R(-70, -90, 140, 180, C.teal, 12)}${R(-58, -80, 118, 160, '#fff', 6)}${R(-70, -90, 22, 180, C.tealD, 8)}${T(8, -40, 'RULES', { size: 22, fill: C.teal, w: 800, ls: 2 })}`),
};

// Wavy cloud
const cloud = (s = 1, op = 1) => S(0, 0, s, `<g opacity="${op}">${E(0, 0, 90, 34, '#fff')}${Ci(-36, -20, 34, '#fff')}${Ci(14, -34, 44, '#fff')}${Ci(56, -12, 30, '#fff')}</g>`);

// Simple deterministic RNG
function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

// ---------- NCR map (in a ~1000x700 local box) ----------
const MAP = {
  regions: [
    { key: 'delhi', name: 'Delhi', d: 'M380,200 C420,120 570,110 630,180 C700,250 680,360 640,415 C590,485 470,485 410,430 C345,375 335,265 380,200Z', fill: '#BFEBDD', lx: 515, ly: 300 },
    { key: 'gurugram', name: 'Gurugram', d: 'M190,450 C220,385 345,395 385,450 C425,515 380,610 295,615 C215,618 160,525 190,450Z', fill: '#FFE3B0', lx: 287, ly: 520 },
    { key: 'noida', name: 'Noida', d: 'M660,435 C705,400 795,412 812,472 C832,540 772,592 712,582 C650,572 628,475 660,435Z', fill: '#E3DEFF', lx: 735, ly: 505 },
    { key: 'ghaziabad', name: 'Ghaziabad', d: 'M700,182 C742,140 832,150 852,212 C872,272 822,322 762,312 C700,302 668,232 700,182Z', fill: '#FFD6D6', lx: 775, ly: 240 },
    { key: 'faridabad', name: 'Faridabad', d: 'M470,520 C512,488 600,500 612,560 C622,620 562,662 510,652 C458,642 440,562 470,520Z', fill: '#D6ECFF', lx: 540, ly: 585 },
  ],
  river: 'M598,70 C590,130 660,170 650,250 C640,340 690,400 640,480 C600,545 650,620 630,720',
};
function mapArt(prefix) {
  let s = '';
  MAP.regions.forEach(r => {
    s += `<g id="${prefix}-${r.key}">${P(r.d, r.fill, `stroke="#fff" stroke-width="8"`)}</g>`;
  });
  s += L(MAP.river, '#9FD3F5', 16, 'opacity="0.9"');
  MAP.regions.forEach(r => {
    s += T(r.lx, r.ly, r.name, { size: r.key === 'delhi' ? 34 : 26, fill: C.ink2, w: 700, op: 0.85 });
  });
  return s;
}
