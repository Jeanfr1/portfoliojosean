// One-time entrances: the experience divider draws, its text rises 12 px,
// and on mobile the hero's project window fades in after the introduction.
export function initReveal() {
  const targets = document.querySelectorAll('[data-reveal], [data-divider], .hero__case');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px' },
  );
  targets.forEach((el) => io.observe(el));
}
