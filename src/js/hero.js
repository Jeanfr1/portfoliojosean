// Author window: the JA planes set back, then the J and A halves open
// sideways in depth until the portrait stands between them (storyboard
// panels 01-03). Desktop only; mobile and reduced motion keep the resting
// composition, which is plain HTML and shows without JavaScript.
import { MOTION, SCENES } from '../data/motion.js';
import { SCENE } from '../data/hero-scene.js';

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const smooth = ([a, b], p) => {
  const t = clamp((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};

// Travel of each half at full opening, in scene units (1112 wide): the J
// moves left, the A slides under the presentation column, leaving the head
// and shoulders clear in between (storyboard panel 03).
const OPEN = { j: -360, a: 300 };
// The J's top opening starts here; it must stop short of the JA signature in
// the masthead, which always sits on the solid plate (identity rule).
const J_OPENING_LEFT = 398;
const MARK_CLEARANCE_PX = 20;
// Planes behind the front plate travel a little less: parallax between layers.
const INNER_RATIO = 0.94;
// The portrait drifts toward the centre of the opening, never resized.
const PORTRAIT_DRIFT = 45;

export function initHero() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  const stage = hero.querySelector('[data-stage]');
  const scene = hero.querySelector('[data-scene]');
  const portrait = scene.querySelector('[data-portrait]');
  const mark = hero.querySelector('.masthead__mark');
  // A front half is two elements (its shadow and its plate) moving together.
  const layers = {
    frontJ: [...scene.querySelectorAll('[data-layer="front-j"]')],
    frontA: [...scene.querySelectorAll('[data-layer="front-a"]')],
    innerJ: [...scene.querySelectorAll('[data-layer="inner-j"]')],
    innerA: [...scene.querySelectorAll('[data-layer="inner-a"]')],
  };

  const desktop = matchMedia('(min-width: 1024px)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  let enabled = false;
  let inView = true;
  let queued = false;
  let introOver = false;
  let unit = scene.clientWidth / SCENE.width;
  let openJ = OPEN.j;

  function progress() {
    const track = hero.offsetHeight - stage.offsetHeight;
    if (track <= 0) return 0;
    return clamp(-hero.getBoundingClientRect().top / track);
  }

  const move = (els, x) => {
    const value = `translate3d(${x.toFixed(2)}px, 0, 0)`;
    for (const el of [els].flat()) el.style.transform = value;
  };

  function paint(p) {
    const depth = smooth(SCENES.depth, p);
    const opening = smooth(SCENES.opening, p);

    // Depth: the front halves part slightly while the planes behind them slide
    // further, so more of the face appears (offsets up to 24 px).
    const part = (MOTION.maxPlaneOffsetPx / 2) * depth;
    const recess = MOTION.maxPlaneOffsetPx * depth;

    move(layers.frontJ, -part + openJ * unit * opening);
    move(layers.frontA, part + OPEN.a * unit * opening);
    move(layers.innerJ, -recess + openJ * unit * opening * INNER_RATIO);
    move(layers.innerA, recess + OPEN.a * unit * opening * INNER_RATIO);
    move(portrait, MOTION.maxPortraitShiftPx * depth + PORTRAIT_DRIFT * unit * opening);
    scene.style.setProperty('--seam', Math.min(1, depth * 3).toFixed(3));
  }

  function endIntro() {
    if (introOver) return;
    introOver = true;
    hero.classList.add('intro-done');
  }

  function frame() {
    queued = false;
    const p = progress();
    // Scrolling during the entrance takes over immediately.
    if (p > 0) endIntro();
    paint(p);
  }

  function onScroll() {
    if (!enabled || !inView || queued) return;
    queued = true;
    requestAnimationFrame(frame);
  }

  // Furthest the J can travel before its opening reaches the signature.
  function measure() {
    unit = scene.clientWidth / SCENE.width;
    const markRight = mark.getBoundingClientRect().right - scene.getBoundingClientRect().left;
    const limitPx = markRight + MARK_CLEARANCE_PX + MOTION.maxPlaneOffsetPx / 2 - J_OPENING_LEFT * unit;
    openJ = Math.max(OPEN.j, limitPx / unit);
  }

  function onResize() {
    measure();
    if (enabled) frame();
  }

  function reset() {
    for (const el of [...Object.values(layers).flat(), portrait]) el.style.removeProperty('transform');
    scene.style.removeProperty('--seam');
  }

  function update() {
    const next = desktop.matches && !reduce.matches;
    if (next === enabled) return;
    enabled = next;
    if (enabled) {
      onResize();
    } else {
      reset();
    }
  }

  // Effects pause when the hero is off screen.
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    onScroll();
  }).observe(hero);

  window.setTimeout(endIntro, MOTION.introSeconds * 1000 + 100);
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onResize);
  desktop.addEventListener('change', update);
  reduce.addEventListener('change', update);

  update();
}
