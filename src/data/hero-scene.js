// The author window, traced plane by plane from the approved art
// (josean-portfolio-metal-editorial/02-hero/hero-desktop.png).
// Units are that artboard's pixels: the scene is its left part, 1112 x 941,
// up to the vertical rule. Tones were sampled from the art; every plane is a
// separate layer so the letters can open in depth.

export const SCENE = { width: 1112, height: 941, ruleY: 42 };

// One portrait for the whole sequence (02-roteiro-de-movimento.md).
// 04-camadas/retrato-josean-transparente.png at 0.79: the left eye lands in
// the J stem opening and the ear in the slit, exactly as in the art.
export const PORTRAIT = { x: 24, y: 36, width: 947, height: 1036 };

// Openings cut in the front plate.
const J_OPENING =
  'M398 42H572V700C572 800 500 890 330 890H230C120 890 60 820 60 700V527H227V197H398Z';
const A_OPENING = 'M660 42H857L1110 886H552L660 535Z';

// The front plate splits along this line, inside the solid strip between J and A.
const SEAM = [
  [616, 0],
  [616, 535],
  [590, 700],
  [556, 800],
  [500, 886],
  [496, 941],
];
// Below the artboard (taller screens) the halves part along a vertical line.
export const SEAM_FOOT = 496;
const seamDown = SEAM.map(([x, y]) => `L${x} ${y}`).join('');
// The J half runs 3 units under the A half, so the two meet without a hairline.
const seamUnder = SEAM.map(([x, y]) => `L${x + 3} ${y}`).join('');
// Lit seam edges, shown only once the halves part; they run on below the
// artboard, where the plates extend to the bottom of the screen.
const seamLine = (dx) => `M${SEAM.map(([x, y]) => `${x + dx} ${y}`).join('L')}L${SEAM_FOOT + dx} 2400`;

export const FRONT = {
  j: {
    // Plate area left of the seam, minus the J opening (even-odd).
    plate: `M0 0${seamUnder}L0 941Z${J_OPENING}`,
    edges: [J_OPENING],
    seam: seamLine(3),
    sweep: J_OPENING,
  },
  a: {
    plate: `M1112 0L616 0${seamDown.replace('L616 0', '')}L1112 941Z${A_OPENING}`,
    edges: [A_OPENING],
    seam: seamLine(0),
  },
};

// Planes behind the front plate. `tone` = gradient stops top -> bottom.
// Silver planes carry grain and a lit edge; graphite planes are the depth.
const L1 = (y) => 777 + 0.282 * (y - 42); // inner edge of the A's right leg
const L2 = (y) => 857 + 0.2998 * (y - 42); // the A opening's right edge

export const INNER = {
  j: [
    { id: 'gj2', kind: 'graphite', d: 'M157 500H172V900H157Z', tone: ['#26272a', '#1a1b1c'] },
    { id: 'gj1b', kind: 'graphite', d: 'M332 160H347V770H332Z', tone: ['#3a3a39', '#2a2a29', '#323231'] },
    { id: 'gj1a', kind: 'graphite', d: 'M318 160H332V770H318Z', tone: ['#1e1e1e', '#151515'] },
    { id: 's3', kind: 'silver', d: 'M20 500H157V900H20Z', tone: ['#9d9d9a', '#a7a7a5', '#c6c6c4'] },
    { id: 's2', kind: 'silver', d: 'M227 160H318V717H227Z', tone: ['#b0b0ad', '#b3b3b0', '#a8a8a5'] },
    {
      id: 'jletter',
      kind: 'silver',
      d: 'M400 20H440V900H292V765H320C362 765 400 727 400 665Z',
      tone: ['#bdbdbb', '#bebebc', '#a4a5a4'],
    },
  ],
  a: [
    { id: 'ga1', kind: 'graphite', d: 'M652 20H712V560H652Z', tone: ['#2b2c2d', '#3c3e3f', '#4b4e4f'] },
    {
      id: 'ga2',
      kind: 'graphite',
      d: `M712 20H${L1(20).toFixed(1)}L${L1(510).toFixed(1)} 510H712Z`,
      tone: ['#060606', '#1d1e1e', '#3d3e3e'],
    },
    // Left edge parallel to the A's left leg, kept right of the seam.
    { id: 'ga4', kind: 'graphite', d: 'M646 537H658V900H532Z', tone: ['#565756', '#363736', '#2a2b2a'] },
    {
      id: 'ga3',
      kind: 'graphite',
      d: `M852 ${308}L852 545L${L1(545).toFixed(1)} 545Z`,
      tone: ['#7b7d7e', '#6d6f70'],
    },
    {
      id: 'sa1',
      kind: 'silver',
      d: `M${L1(20).toFixed(1)} 20L${L1(900).toFixed(1)} 900L${(L2(900) + 20).toFixed(1)} 900L${(L2(20) + 20).toFixed(1)} 20Z`,
      tone: ['#c3c3c1', '#c1c1bf', '#a6a6a4'],
    },
    { id: 'sa2', kind: 'silver', d: 'M710 365L752 537H655Z', tone: ['#d0d0cf', '#c6c6c5'] },
    { id: 'sa3', kind: 'silver', d: 'M658 647H785L842 900H658Z', tone: ['#c8c8c7', '#bebfbf', '#b4b5b5'] },
  ],
};
