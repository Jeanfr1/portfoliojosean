// "How I think": a short stroke follows the step in focus. Pointer hover on
// the four-column row; reading position on the stacked mobile list. It never
// runs on its own, so it cannot read as the progress of real work.
export function initProcess() {
  const steps = [...document.querySelectorAll('[data-step]')];
  if (!steps.length) return;

  const stacked = matchMedia('(max-width: 767px)');
  const setActive = (index) => steps.forEach((step, i) => step.classList.toggle('is-active', i === index));

  steps.forEach((step, i) => step.addEventListener('pointerenter', () => setActive(i)));

  const io = new IntersectionObserver(
    (entries) => {
      if (!stacked.matches) return;
      const hit = entries.find((entry) => entry.isIntersecting);
      if (hit) setActive(steps.indexOf(hit.target));
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );
  steps.forEach((step) => io.observe(step));
}
