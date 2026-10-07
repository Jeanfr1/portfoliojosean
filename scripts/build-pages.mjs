// Renders the work section of index.html and one static page per case
// (work/<slug>/index.html) from src/data/projects.js, so cases stay
// readable without JavaScript (04-producao.md checklist).
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LINKEDIN, projects } from '../src/data/projects.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const arrow = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
const external = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';

// Text colour follows the project's own tone, so each identity keeps its colour.
function isDark(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.5;
}

const metaLine = (p) => esc([p.theme, p.place].filter(Boolean).join(' · '));

function card(p, variant) {
  return `
          <article class="card card--${variant}" style="--tone: ${p.tone}" data-tone="${isDark(p.tone) ? 'dark' : 'light'}">
            <div class="card__media">
              <img src="/img/${p.slug}-hero.webp" width="${p.hero.width}" height="${p.hero.height}" alt="${esc(p.alt)}" loading="lazy" decoding="async">
            </div>
            <div class="card__body">
              <p class="card__tag">Concept study / ${p.number}</p>
              <h3 class="card__title"><a href="/work/${p.slug}/">${esc(p.name)}</a></h3>
              <p class="card__meta">${metaLine(p)}</p>
              <p class="card__summary">${esc(p.summary)}</p>
              <span class="card__cta" aria-hidden="true">View case ${arrow}</span>
            </div>
          </article>`;
}

function indexItem(p) {
  return `
            <li class="index__item">
              <a href="/work/${p.slug}/">
                <span class="index__text">
                  <span class="index__name">${esc(p.name)}</span>
                  <span class="index__meta">${esc(p.theme)}</span>
                  <span class="index__tag">Concept study</span>
                </span>
                <span class="index__thumb" style="--tone: ${p.tone}"><img src="/img/${p.slug}-thumb.webp" width="480" height="${Math.round((480 * p.hero.height) / p.hero.width)}" alt="" loading="lazy" decoding="async"></span>
                ${arrow}
              </a>
            </li>`;
}

function workSection() {
  const [first, ...rest] = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  return `<!-- work:start -->
        <div class="features">${card(first, 'wide')}
          <div class="features__pair">${rest.map((p) => card(p, 'half')).join('')}
          </div>
        </div>
        <div class="index" aria-labelledby="index-title">
          <div class="index__head">
            <h3 class="label" id="index-title">Other projects</h3>
            <span class="index__rule" aria-hidden="true"></span>
          </div>
          <ul class="index__list">${others.map(indexItem).join('')}
          </ul>
        </div>
        <!-- work:end -->`;
}

function masthead() {
  return `<header class="masthead masthead--page">
    <a class="masthead__mark" href="/" aria-label="Josean Araujo, home">
      <img src="/img/ja-black.webp" width="296" height="240" alt="">
    </a>
    <span class="masthead__rule" aria-hidden="true"></span>
    <nav class="masthead__nav" aria-label="Main">
      <a href="/#projects">Projects</a>
      <a href="/#about">About</a>
      <a href="/#contact">Contact</a>
    </nav>
  </header>`;
}

function footer() {
  return `<footer class="footer">
    <div class="wrap footer__row">
      <a class="footer__mark" href="/" aria-label="Josean Araujo, home">
        <img src="/img/ja-black.webp" width="296" height="240" alt="" loading="lazy">
      </a>
      <span class="footer__rule" aria-hidden="true"></span>
      <nav class="footer__nav" aria-label="Footer">
        <a href="/#projects">Projects</a>
        <a href="/#about">About</a>
        <a href="/#contact">Contact</a>
      </nav>
      <p class="footer__sign">Josean Araujo / Design and technology</p>
    </div>
  </footer>`;
}

function casePage(p, next) {
  const dark = isDark(p.tone);
  const sections = [
    ['Context', `<p>${esc(p.context)}</p>`],
    ['Proposal', `<p>${esc(p.proposal)}</p>`],
  ];
  const motion = p.motion
    ? `
      <section class="case__block wrap" aria-labelledby="motion-title">
        <h2 class="label" id="motion-title">Motion</h2>
        <p class="case__text">${esc(p.motion)}</p>
      </section>`
    : '';
  const implementation = p.prototype
    ? `
      <section class="case__block wrap" aria-labelledby="implementation-title">
        <h2 class="label" id="implementation-title">Implementation</h2>
        <p class="case__text"><a class="textlink" href="${esc(p.prototype)}" target="_blank" rel="noopener">Open the prototype<span class="visually-hidden"> (opens in a new tab)</span></a></p>
      </section>`
    : '';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(p.name)} / Concept study / Josean Araujo</title>
  <meta name="description" content="${esc(`${p.name}, a concept study by Josean Araujo. ${p.summary}`)}">
  <meta name="theme-color" content="#E6E5E1">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${esc(p.name)} / Concept study">
  <meta property="og:description" content="${esc(p.summary)}">
  <meta property="og:image" content="/img/${p.slug}-hero.webp">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <script>document.documentElement.classList.add('js')</script>
  <script type="module" src="/src/js/main.js"></script>
</head>
<body class="page-case">
  <!-- Generated by scripts/build-pages.mjs from src/data/projects.js. Edit the data, not this file. -->
  <a class="skip" href="#main">Skip to content</a>
  <div class="wrap">
  ${masthead()}
  </div>

  <main id="main">
    <article class="case" style="--tone: ${p.tone}" data-tone="${dark ? 'dark' : 'light'}">
      <div class="wrap case__head">
        <a class="textlink textlink--back" href="/#projects"><svg class="icon icon--back" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5m6-6-6 6 6 6"/></svg> All projects</a>
        <p class="label">Concept study / ${p.number}</p>
        <h1 class="display case__title">${esc(p.name)}</h1>
        <p class="case__meta">${metaLine(p)}</p>
        <p class="case__lead">${esc(p.summary)}</p>
      </div>

      <div class="wrap case__facts">${sections
        .map(
          ([title, body]) => `
        <section class="case__fact">
          <h2 class="label">${title}</h2>
          ${body}
        </section>`,
        )
        .join('')}
      </div>

      <section class="case__block wrap" aria-labelledby="decisions-title">
        <h2 class="label" id="decisions-title">Decisions</h2>
        <ol class="case__decisions">${p.decisions.map((d) => `
          <li>${esc(d)}</li>`).join('')}
        </ol>
      </section>

      <section class="case__screens" aria-labelledby="screens-title">
        <div class="wrap">
          <h2 class="label" id="screens-title">Screens</h2>
        </div>
        <figure class="case__art">
          <div class="case__art-frame">
            <img src="/img/${p.slug}-full.webp" width="${p.full.width}" height="${p.full.height}" alt="${esc(p.fullAlt)}" decoding="async">
          </div>
          <figcaption class="wrap">Complete concept art. <a class="textlink textlink--small" href="/img/${p.slug}-full.webp" target="_blank" rel="noopener">Open full size<span class="visually-hidden"> (opens in a new tab)</span></a></figcaption>
        </figure>
      </section>
${motion}${implementation}
    </article>

    <nav class="case-next wrap" aria-label="Next case">
      <a class="case-next__link" href="/work/${next.slug}/">
        <span class="case-next__text">
          <span class="label">Next case / ${next.number}</span>
          <span class="display case-next__name">${esc(next.name)}</span>
          <span class="case-next__meta">${esc(next.theme)} · Concept study</span>
        </span>
        <span class="case-next__thumb" style="--tone: ${next.tone}"><img src="/img/${next.slug}-thumb.webp" width="480" height="${Math.round((480 * next.hero.height) / next.hero.width)}" alt="" loading="lazy" decoding="async"></span>
        ${arrow}
      </a>
    </nav>

    <section class="section contact contact--compact" aria-labelledby="contact-title">
      <div class="wrap contact__grid">
        <h2 class="display" id="contact-title">Your next project starts with a conversation.</h2>
        <div class="contact__aside">
          <p>Let's understand your idea and find a direction for it.</p>
          <a class="button" href="${LINKEDIN}" target="_blank" rel="noopener">Let's talk on LinkedIn<span class="visually-hidden"> (opens in a new tab)</span> ${external}</a>
        </div>
      </div>
    </section>
  </main>

  ${footer()}
</body>
</html>
`;
}

// Home: replace the generated block between the markers.
const indexPath = join(root, 'index.html');
const html = readFileSync(indexPath, 'utf8');
const marked = /<!-- work:start -->[\s\S]*?<!-- work:end -->/;
if (!marked.test(html)) throw new Error('index.html is missing the work:start / work:end markers');
writeFileSync(indexPath, html.replace(marked, workSection()));

// Cases: rebuild the folder so a removed project leaves no orphan page.
rmSync(join(root, 'work'), { recursive: true, force: true });
projects.forEach((p, i) => {
  const dir = join(root, 'work', p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), casePage(p, projects[(i + 1) % projects.length]));
});

console.log(`pages: index.html work section + ${projects.length} case pages`);
