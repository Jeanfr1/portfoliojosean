<div align="center">

<img src=".github/assets/banner.jpg" alt="Josean Araujo: Clear ideas. Memorable experiences. The monumental letters J and A cut from a satin silver plate reveal Josean's portrait." width="100%" />

<h3>An editorial portfolio where the JA monogram becomes an author's window: layered satin silver letters that open on scroll to reveal the author.</h3>

<p>
  <a href="#hero-animation"><strong>🎬 How the hero works</strong></a>
  &nbsp;·&nbsp;
  <a href="#case-studies"><strong>🧭 Case studies</strong></a>
  &nbsp;·&nbsp;
  <a href="#getting-started"><strong>🛠️ Run it locally</strong></a>
</p>

<p>
  <img src="https://img.shields.io/badge/Vercel-Ready-18191B?style=for-the-badge&logo=vercel&logoColor=white" alt="Ready for Vercel" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 6" />
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JavaScript" />
  <img src="https://img.shields.io/badge/Works_without-JavaScript-B9BBBE?style=for-the-badge" alt="Works without JavaScript" />
  <img src="https://img.shields.io/badge/%E2%99%BF_Accessibility-first-57595D?style=for-the-badge" alt="Accessibility first" />
</p>

</div>

<br />

## 🚀 Overview

**Josean Araujo** connects visual intent, development and the real use of technology. This portfolio is built from the **Metal Editorial** kit (`josean-portfolio-metal-editorial/`): natural photography, author typography and precise motion, in graphite, satin silver and light grey.

The first screen is a signature. Monumental **J** and **A** letters, cut in layers of satin silver, reveal fragments of a single portrait. As you scroll, the planes set back in depth, then the J and the A slide apart until the author stands between them. That is the whole effect: the hero belongs to the person, and the work follows in the next section.

- **One signature, one opening**: a pinned 140 vh sequence on desktop, built from the approved art plane by plane
- **Content first**: every word, link and case is HTML, readable without JavaScript and without the animation
- **Honest cases**: six concept studies, each labelled *Concept study*, with context, proposal, decisions, screens and motion; no invented results, clients or metrics
- **One contact**: LinkedIn, the only channel supplied

<br />

<a name="hero-animation"></a>

## 🎬 The hero animation

<div align="center">
  <img src=".github/assets/hero-scroll.gif" alt="Scrolling through the hero: the layered J and A planes set back, then slide apart to reveal Josean's portrait between them" width="100%" />
  <sub>Scroll-scrubbed · captured at 1440 × 900 from the production build</sub>
</div>

<br />

The entrance takes 1.4 s (`02-roteiro-de-movimento.md`): the portrait fades in under the openings (0–0.4 s), the graphite planes set back 6–12 px (0.2–0.9 s) and one light change runs along the edge of the J and stops (0.7–1.4 s). Scrolling during the entrance takes over immediately. After that the hero follows the storyboard's first three scenes (`01-direcao/storyboard-janela-de-autor.png`). It ends on the author: no project enters the hero, the work section comes right after.

| Scroll   | Scene         | What happens                                                                                  |
| :------- | :------------ | :-------------------------------------------------------------------------------------------- |
| 0–12%    | **Signature** | JA planes and portrait at rest, as in the approved art; name, proposal and actions readable   |
| 12–36%   | **Depth**     | The front plate parts along a seam; the planes behind set back up to 24 px; the portrait moves 18 px at most |
| 36–88%   | **Opening**   | The J and the A slide apart with parallax between layers and reveal the portrait              |
| 88–100%  | **Author**    | Head and shoulders framed by what remains of the J and the A                                  |

**Under the hood**

- ✍️ **Traced from the approved art.** Every plane of `02-hero/hero-desktop.png` was traced on gridded 2× crops into `src/data/hero-scene.js`: the front plate with its two openings, six silver planes that draw the strokes, six graphite strips that give the letters their thickness, each with the tone sampled from the art.
- 🧱 **Layers, not video.** Dark recess → portrait → graphite and silver planes (inline SVG, grain, lit edges, short shadows) → front plate halves (masked) → edge light → HTML text, the order in `04-producao.md`. `scripts/build-hero.mjs` writes the scene into `index.html`, so the resting composition shows without JavaScript.
- 👤 **One portrait, every scene.** The kit's transparent portrait is placed so the left eye sits in the J opening and the ear in the slit, as in the art, and is never resized or deformed.
- 🪨 **One satin sheet.** The page and the front plate share the same tone, light and grain, so at rest the letters read as cuts in a single plate. The plate splits along a seam inside the solid strip between the J and the A, invisible until it opens.
- 🔏 **The signature stays put.** The J's travel is measured against the JA mark in the header on every resize, so its opening never passes under the logo.
- 🎚️ **Scroll-scrubbed, never forced.** Native scroll with a sticky stage: no wheel hijacking, no smoothing layer, no locked navigation. Effects pause when the hero leaves the screen.
- 🐢 **Graceful by default.** Below 1024 px there is no pin and no camera: art above, text below. With `prefers-reduced-motion` the composition is static.

<br />

## 🖥️ Sections

<div align="center">
  <img src=".github/assets/desktop-sections.jpg" alt="Desktop screenshots: selected work, applied experience, how I think, and about" width="100%" />
</div>

<br />

| #   | Section                                               | Anchor        | Role                                                                                 |
| :-- | :---------------------------------------------------- | :------------ | :----------------------------------------------------------------------------------- |
| 01  | **Clear ideas. Memorable experiences.**               | `#top`        | Signature, proposal, *View projects* and *Let's talk*                                |
| 02  | **Work that deserves attention.**                     | `#projects`   | Three wide cases (Automotives STA, Isola, Orhan Barber), then an index of the others |
| 03  | **From idea to real use.**                            | `#experience` | Short bio from LinkedIn, three areas, and DevConnect / MamaCare kept as text rows    |
| 04  | **Clarity before effect.**                            | `#process`    | Context → Direction → Build → Refinement; a short stroke follows the step in focus   |
| 05  | **Precision in digital. Attention to people.**        | `#about`      | Static portrait and an authored paragraph                                             |
| 06  | **Your next project starts with a conversation.**     | `#contact`    | One action: *Let's talk on LinkedIn*                                                 |

<br />

<a name="case-studies"></a>

## 🧭 Case studies

<div align="center">
  <img src=".github/assets/case-page.jpg" alt="The Orhan Barber case page: concept study label, title, context and proposal" width="100%" />
</div>

<br />

Each concept has its own static page at `/work/<slug>/`, in the order the kit asks for: **context / proposal / decisions / screens / motion**, plus *implementation* once a public link exists. Pages are generated from one data file, so the home cards and the case pages never drift apart.

| #   | Concept             | Theme          | What the case explains                               |
| :-- | :------------------ | :------------- | :--------------------------------------------------- |
| 01  | **Automotives STA** | Car maintenance | How the exterior, the parts and the services build one narrative |
| 02  | **Isola**           | Ice cream shop | Switching flavours, texture and discovery            |
| 03  | **Orhan Barber**    | Barbershop     | Visual precision, ritual and access to booking       |
| 04  | **Legend Nails**    | Manicure       | Editorial reference and finish                       |
| 05  | **Bayro Cut**       | Barbershop     | Attitude, opening and service hierarchy              |
| 06  | **M&M Cleaning**    | Cleaning       | Reorganising the space, in layers                    |

<br />

## 📱 Mobile first, motion optional

<div align="center">
  <img src=".github/assets/mobile-screens.jpg" alt="Mobile screenshots: hero art above the name, the introduction and actions, the work list and the Isola case" width="100%" />
</div>

<br />

- Art above, name, proposal and actions below; the head is never cropped to keep the giant letters
- One column for content and the project list, 24 px margins
- Every touch target is at least 44 px; no horizontal scroll at 360, 390, 768, 1024 or 1440 px
- Nothing depends on hover: cards and index rows respond to tap and keyboard focus; the process stroke is decorative and never hides content

<br />

## ✨ Highlights

- **🪟 Author window**: layered planes traced from the approved art, opened by scroll with the same smoothstep as the kit's motion study
- **🧾 Works without JavaScript**: name, proposal, calls to action and all six cases are plain HTML; JS only adds the motion
- **🎯 Focus you can see**: a 2 px graphite ring (white on dark) and a skip link
- **🖼️ Image pipeline**: the kit's PNGs stay untouched; light WebP derivatives (hero crops, thumbnails, portrait, monogram, favicons) and the paper grain tile come from `npm run assets`
- **🔤 Type that holds up**: Bodoni Moda at a fixed optical size, so hairlines survive on small screens; Inter for reading and interface
- **🧰 One source of truth**: `src/data/projects.js` feeds the home cards and the six case pages through `npm run pages`

<br />

## 💻 Tech stack

| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="40" height="40" /><br />Vite 6 | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40" height="40" /><br />JavaScript | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="40" height="40" /><br />HTML5 | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40" height="40" /><br />CSS3 | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="40" height="40" /><br />Python (Pillow) | <img src="https://cdn.simpleicons.org/vercel/000000/ffffff" width="40" height="40" /><br />Vercel |
| :---: | :---: | :---: | :---: | :---: | :---: |

### Why this stack?

- **Vite + plain JavaScript**: a portfolio is static HTML; the whole motion layer is about 4 KB of script
- **No animation library**: the sequence is a handful of transforms driven by scroll position, so it stays exact, seek-safe and easy to read
- **Self-hosted Bodoni Moda and Inter**: no third-party font requests; only the Latin subsets in use are downloaded
- **Pillow for derivatives**: crops and WebP files are reproducible from the kit with one command
- **Vercel**: static output, ready to connect to this repository

<br />

## 🎨 Design system

From `07-integracao/tokens.json`:

| Token                      | Value                                                                        | Use                                         |
| :------------------------- | :--------------------------------------------------------------------------- | :------------------------------------------ |
| Graphite                   | ![#18191B](https://img.shields.io/badge/%2318191B-18191B?style=flat-square) | Text, buttons, experience band              |
| Cool paper                 | ![#E6E5E1](https://img.shields.io/badge/%23E6E5E1-E6E5E1?style=flat-square) | Page and plates                             |
| Satin silver               | ![#B9BBBE](https://img.shields.io/badge/%23B9BBBE-B9BBBE?style=flat-square) | Material, only in large art                 |
| Light surface              | ![#F4F3EF](https://img.shields.io/badge/%23F4F3EF-F4F3EF?style=flat-square) | Text on dark                                |
| Secondary text on light    | ![#57595D](https://img.shields.io/badge/%2357595D-57595D?style=flat-square) | Labels, paragraphs (5.6:1 on paper)         |
| Secondary text on dark     | ![#BFC1C4](https://img.shields.io/badge/%23BFC1C4-BFC1C4?style=flat-square) | Paragraphs on graphite (9.7:1)              |
| Dividers                   | ![#C7C8CA](https://img.shields.io/badge/%23C7C8CA-C7C8CA?style=flat-square) | Rules                                        |

- **Type**: Bodoni Moda 400 for name and titles; Inter 400/500/600 for body, navigation and metadata; body 16–18 px
- **Grid**: 1440 px reference, 12 columns, 64 px margins (24 px on mobile); art on 8 columns, presentation on 4
- **Identity**: the flat JA master mark (black on light, white on dark) in the header and footer; the metallic treatment only in large art
- **Motion**: project images recede 3% on hover or focus; the experience divider draws once and its text rises 12 px in 450 ms; no counters, no carousels

<br />

<a name="getting-started"></a>

## 🛠️ Getting started

```bash
# Clone the repository
git clone https://github.com/Jeanfr1/portfoliojosean.git
cd portfoliojosean

# Install dependencies (Node 20+)
npm install

# Start the dev server  →  http://localhost:5173
npm run dev

# Production build  →  dist/
npm run build

# Preview the production build
npm run preview

# Regenerate the hero scene, the home work section and the six case pages
npm run pages

# Regenerate the WebP derivatives from the kit (needs Python 3 + Pillow)
npm run assets
```

<br />

## 📁 Project structure

```
portfoliojosean/
├── index.html                      # Hero → work → experience → process → about → contact (hero scene and work cards generated)
├── work/<slug>/index.html          # Six case pages (generated, do not edit by hand)
├── src/
│   ├── data/
│   │   ├── hero-scene.js           # Planes traced from the approved hero art: paths, order, tones
│   │   ├── motion.js               # Scene ranges and offsets of the hero
│   │   └── projects.js             # The six concept studies: copy, crops, tones
│   ├── js/
│   │   ├── main.js                 # Entry: fonts, styles, modules
│   │   ├── hero.js                 # Author window: depth, opening, logo-safe travel
│   │   ├── reveal.js               # One-time entrances (experience)
│   │   └── process.js              # The stroke that follows the step in focus
│   └── styles/main.css             # Tokens, grid, hero layers, sections, case pages
├── public/
│   ├── img/                        # WebP derivatives, grain tile, hero/ plate masks (generated)
│   ├── og.jpg                      # Open Graph image (a capture of the real hero)
│   └── favicon-32.png, apple-touch-icon.png
├── scripts/
│   ├── build-hero.mjs              # Hero data → scene markup + plate masks
│   ├── build-pages.mjs             # Data → work section + case pages
│   └── build-assets.py             # Kit PNGs → web derivatives
└── josean-portfolio-metal-editorial/  # The kit: direction, identity, layers, scripts, study (untouched)
```

<br />

## 🚀 Deployment

Configured for **Vercel** (`vercel.json`); the kit is excluded from uploads by `.vercelignore`. It has **not been published yet**: the kit asks to validate the portrait, copy, links and case labels first (see the checklist below). Once approved, import this repository in Vercel and every push to `main` ships to production.

| Setting          | Value           |
| :--------------- | :-------------- |
| Framework        | Vite            |
| Build command    | `npm run build` |
| Output directory | `dist`          |

<br />

## 📌 Content checklist

Items to validate before publishing (`04-producao.md`, `03-arquitetura-e-copy.md`). Open items are marked `TODO(josean)` in the code.

- [ ] Review the portrait's likeness
- [ ] Validate the authored **About** paragraph
- [ ] Confirm availability, the scope offered and any contact channel beyond LinkedIn
- [ ] Public links for the six concept studies (the `prototype` field in `src/data/projects.js` switches on *Implementation*)
- [ ] Real screens and links for **DevConnect** and **MamaCare**, to give them their own cases
- [ ] Check the LinkedIn link and every *Concept study* label
- [ ] Custom domain (then make `og:image` absolute and add `canonical`)
- [ ] For print: redraw the approved JA monogram as vector curves (the PNGs are not vectors)

<br />

## 🙏 Acknowledgments

- **Metal Editorial kit**: visual direction, JA identity, layers and motion script
- **[Bodoni Moda](https://fonts.google.com/specimen/Bodoni+Moda)** by Owen Earl (OFL), self-hosted via Fontsource
- **[Inter](https://rsms.me/inter/)** by Rasmus Andersson (OFL), self-hosted via Fontsource
- **[Vite](https://vite.dev)** and **[Vercel](https://vercel.com)**

<br />

---

<div align="center">
  <img src="public/apple-touch-icon.png" width="44" height="44" alt="" />
  <p><strong>Josean Araujo / Design and technology</strong></p>
  <p>Built with ❤️ by <a href="https://github.com/Jeanfr1">Jean</a></p>
</div>
