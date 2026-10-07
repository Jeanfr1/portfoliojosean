// Mirrors josean-portfolio-metal-editorial/07-integracao/scroll-timeline.json
// and the motion block of tokens.json. Change the kit first, then this file.
export const SCENES = {
  signature: [0, 0.2], // JA cut-outs and portrait stable, introduction readable
  depth: [0.2, 0.42], // planes part up to 24 px; portrait moves 18 px at most
  opening: [0.42, 0.62], // the counterform grows, the portrait keeps its geometry
  framing: [0.62, 0.82], // cut-outs leave through the edges, the window grows
  work: [0.82, 1], // portrait fades, the first project takes the same window
};

export const MOTION = {
  maxPlaneOffsetPx: 24,
  maxPortraitShiftPx: 18,
  windowScale: [0.78, 1],
  introSeconds: 1.4,
  desktopScrollVh: 140,
};
