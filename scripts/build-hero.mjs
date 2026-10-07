// Renders the hero scene (src/data/hero-scene.js) into index.html between the
// hero:start / hero:end markers, plus the two front-plate masks. The scene is
// plain HTML + inline SVG, so the resting composition shows without JavaScript.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FRONT, INNER, PORTRAIT, SCENE, SEAM_FOOT } from '../src/data/hero-scene.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { width: W, height: H } = SCENE;
const pct = (v, of) => `${((v / of) * 100).toFixed(3)}%`;

// Front-plate masks: plate area minus the opening (even-odd).
mkdirSync(join(root, 'public/img/hero'), { recursive: true });
for (const side of ['j', 'a']) {
  writeFileSync(
    join(root, `public/img/hero/front-${side}.svg`),
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><path fill="#000" fill-rule="evenodd" d="${FRONT[side].plate}"/></svg>\n`,
  );
}

function gradient(id, tone) {
  const stops = tone
    .map((c, i) => `<stop offset="${tone.length === 1 ? 0 : (i / (tone.length - 1)).toFixed(2)}" stop-color="${c}"/>`)
    .join('');
  return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops}</linearGradient>`;
}

function inner(side) {
  const planes = INNER[side];
  const p = `h${side}-`;
  const defs = [
    ...planes.map((pl) => gradient(`${p}${pl.id}`, pl.tone)),
    `<pattern id="${p}grain" patternUnits="userSpaceOnUse" width="160" height="160"><image href="/img/grain.png" width="160" height="160"/></pattern>`,
    // Planes cast short, soft shadows on what lies behind them (light from above right).
    `<filter id="${p}shadow" x="-20%" y="-20%" width="140%" height="150%" color-interpolation-filters="sRGB"><feDropShadow dx="-3" dy="7" stdDeviation="6" flood-color="#000" flood-opacity="0.5"/></filter>`,
  ].join('');
  const fills = planes
    .map((pl) => `<path class="plane plane--${pl.kind}" data-plane="${pl.id}" d="${pl.d}" fill="url(#${p}${pl.id})" filter="url(#${p}shadow)"/>`)
    .join('');
  const silver = planes.filter((pl) => pl.kind === 'silver');
  const grain = planes.map((pl) => `<path d="${pl.d}"/>`).join('');
  const bevel = silver.map((pl) => `<path d="${pl.d}"/>`).join('');
  return `<svg class="scene__inner" data-layer="inner-${side}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <defs>${defs}</defs>
            <g class="scene__planes">${fills}</g>
            <g class="scene__grain" fill="url(#${p}grain)">${grain}</g>
            <g class="scene__bevel">${bevel}</g>
          </svg>`;
}

// Shadows of both halves sit under both plates, so at rest the seam casts
// nothing and the two halves read as one sheet; shadows only fall inside the
// openings. Shadow and plate share data-layer and move together.
function shadow(side) {
  return `<div class="scene__shadow scene__shadow--${side}" data-layer="front-${side}" aria-hidden="true"><div class="scene__plate"></div></div>`;
}

function front(side) {
  const f = FRONT[side];
  const edges = f.edges.map((d) => `<path class="scene__edge" d="${d}"/>`).join('');
  const seam = `<path class="scene__seam" d="${f.seam}"/>`;
  const sweep = f.sweep ? `<path class="scene__sweep" pathLength="1000" d="${f.sweep}"/>` : '';
  return `<div class="scene__front scene__front--${side}" data-layer="front-${side}">
            <div class="scene__plate"></div>
            <svg class="scene__edges" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true" focusable="false">${edges}${seam}${sweep}</svg>
          </div>`;
}

const scene = `<!-- hero:start -->
        <div class="scene" data-scene role="img" aria-label="Josean Araujo's portrait seen through monumental J and A letters cut in layered satin silver planes." style="--seam-j: ${pct(SEAM_FOOT + 3, W)}; --seam-a: ${pct(SEAM_FOOT, W)};">
          <div class="scene__backdrop"></div>
          <div class="scene__board">
            <img class="scene__portrait" data-portrait src="/img/portrait-1199.webp" srcset="/img/portrait-720.webp 720w, /img/portrait-1199.webp 1199w" sizes="(min-width: 1024px) 60vw, 100vw" width="1199" height="1312" alt="" fetchpriority="high" decoding="async" style="left: ${pct(PORTRAIT.x, W)}; top: ${pct(PORTRAIT.y, H)}; width: ${pct(PORTRAIT.width, W)};">
            ${inner('j')}
            ${inner('a')}
          </div>
          ${shadow('j')}
          ${shadow('a')}
          ${front('j')}
          ${front('a')}
        </div>
        <!-- hero:end -->`;

const indexPath = join(root, 'index.html');
const html = readFileSync(indexPath, 'utf8');
const marked = /<!-- hero:start -->[\s\S]*?<!-- hero:end -->/;
if (!marked.test(html)) throw new Error('index.html is missing the hero:start / hero:end markers');
writeFileSync(indexPath, html.replace(marked, scene));
console.log('hero: scene rendered into index.html + 2 front-plate masks');
