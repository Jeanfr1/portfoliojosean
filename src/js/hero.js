// Author window: the JA plates part, open, leave through the edges and hand the
// same frame to the first project (02-roteiro-de-movimento.md). Desktop only;
// mobile and reduced motion keep the static composition.
import { MOTION, SCENES } from '../data/motion.js';

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const smooth = ([a, b], p) => {
  const t = clamp((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};

// Plate travel as a share of the art width, per scene. At rest after
// "framing" the J and A still show at the edges, as in storyboard panel 04.
const OPEN_TRAVEL = 0.16;
const FRAME_TRAVEL = 0.16;
const PORTRAIT_OPEN_SHIFT = 0.04;
const BG = { width: 1672, height: 941 }; // 02-hero/fundo-prata.png

export function initHero() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  const stage = hero.querySelector('[data-stage]');
  const art = hero.querySelector('[data-art]');
  const portrait = art.querySelector('[data-portrait]');
  const plates = [...art.querySelectorAll('[data-plate]')];
  const shades = [...art.querySelectorAll('[data-shade]')];
  const win = art.querySelector('[data-window]');
  const winMask = art.querySelector('[data-window-mask]');
  const winImage = art.querySelector('[data-window-image]');
  const winLabel = art.querySelector('[data-window-label]');

  const desktop = matchMedia('(min-width: 1024px)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  let enabled = false;
  let inView = true;
  let queued = false;
  let introOver = false;
  let width = art.clientWidth;

  // The plates carry the same silver plate as the page, aligned to the stage,
  // so at rest the cut-outs read as one continuous sheet.
  function alignSurface() {
    const s = stage.getBoundingClientRect();
    const a = art.getBoundingClientRect();
    const scale = Math.max(s.width / BG.width, s.height / BG.height);
    const w = BG.width * scale;
    const h = BG.height * scale;
    art.style.setProperty('--bg-w', `${w}px`);
    art.style.setProperty('--bg-h', `${h}px`);
    art.style.setProperty('--bg-x', `${(s.width - w) / 2 - (a.left - s.left)}px`);
    art.style.setProperty('--bg-y', `${(s.height - h) / 2 - (a.top - s.top)}px`);
    width = art.clientWidth;
  }

  function progress() {
    const track = hero.offsetHeight - stage.offsetHeight;
    if (track <= 0) return 0;
    return clamp(-hero.getBoundingClientRect().top / track);
  }

  function paint(p) {
    const depth = smooth(SCENES.depth, p);
    const opening = smooth(SCENES.opening, p);
    const framing = smooth(SCENES.framing, p);
    const work = smooth(SCENES.work, p);

    const part = (MOTION.maxPlaneOffsetPx / 2) * depth;
    const travel = width * (OPEN_TRAVEL * opening + FRAME_TRAVEL * framing);

    for (const plate of plates) {
      const dir = plate.dataset.plate === 'j' ? -1 : 1;
      plate.style.transform = `translate3d(${dir * (part + travel)}px, 0, 0)`;
    }

    // Each shadow plane sets back by its depth: up to 12 / 24 px with the intro offset.
    for (const shade of shades) {
      const dir = shade.dataset.shade === 'j' ? -1 : 1;
      const extra = (MOTION.maxPlaneOffsetPx / 4) * Number(shade.dataset.depth) * depth;
      shade.style.transform = `translate3d(${dir * (part + travel) + extra}px, ${extra * 0.4}px, 0)`;
    }

    const shift = MOTION.maxPortraitShiftPx * depth + width * PORTRAIT_OPEN_SHIFT * opening;
    portrait.style.transform = `translate3d(${shift}px, 0, 0)`;
    portrait.style.opacity = String(1 - work);

    // The rectangular window appears by mask, anchored to the same area.
    const [from, to] = MOTION.windowScale;
    win.style.opacity = framing > 0 ? '1' : '0';
    win.style.transform = `scale(${from + (to - from) * (0.6 * framing + 0.4 * work)})`;
    winMask.style.clipPath = `inset(${50 * (1 - framing)}%)`;
    winImage.style.opacity = String(work);
    winLabel.style.opacity = String(work);

    const live = work > 0.6;
    if (live !== win.classList.contains('is-live')) {
      win.classList.toggle('is-live', live);
      win.inert = !live;
    }
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

  function onResize() {
    alignSurface();
    if (enabled) frame();
  }

  function reset() {
    for (const el of [...plates, ...shades, portrait, win, winMask, winImage, winLabel]) {
      el.style.removeProperty('transform');
      el.style.removeProperty('opacity');
      el.style.removeProperty('clip-path');
    }
    win.classList.remove('is-live');
    win.inert = true;
  }

  function update() {
    const next = desktop.matches && !reduce.matches;
    if (next === enabled) return;
    enabled = next;
    if (enabled) {
      frame();
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
  desktop.addEventListener('change', () => {
    update();
    onResize();
  });
  reduce.addEventListener('change', update);

  alignSurface();
  update();
  if (document.fonts) document.fonts.ready.then(alignSurface);
}
