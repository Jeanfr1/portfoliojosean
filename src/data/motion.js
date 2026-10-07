// Scroll scenes for the hero, from 07-integracao/scroll-timeline.json and the
// storyboard (01 signature, 02 depth, 03 opening). The hero ends on the
// portrait between the J and A: no project enters it, the work section
// follows right after.
export const SCENES = {
  signature: [0, 0.12], // JA planes and portrait at rest, introduction readable
  depth: [0.12, 0.36], // planes part up to 24 px; the portrait moves 18 px at most
  opening: [0.36, 0.88], // the J and A halves slide apart and reveal the portrait
  hold: [0.88, 1], // portrait framed by the J and A remnants
};

export const MOTION = {
  maxPlaneOffsetPx: 24,
  maxPortraitShiftPx: 18,
  introSeconds: 1.4,
  desktopScrollVh: 140,
};
