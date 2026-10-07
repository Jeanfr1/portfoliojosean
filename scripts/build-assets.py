#!/usr/bin/env python3
"""Build light web derivatives from the Metal Editorial kit.

The kit PNGs stay untouched (04-producao.md: "Criar derivados leves para web;
preservar os PNGs originais do kit"). Everything lands in public/img/.

Usage: python3 scripts/build-assets.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
KIT = ROOT / "josean-portfolio-metal-editorial"
OUT = ROOT / "public" / "img"

PAPER = (230, 229, 225)  # tokens.json colors.paper #E6E5E1


def save_webp(img: Image.Image, name: str, quality: int = 82) -> None:
    path = OUT / name
    img.save(path, "WEBP", quality=quality, method=6)
    print(f"  {name:<34} {img.width}x{img.height}  {path.stat().st_size // 1024} KB")


def fit_width(img: Image.Image, width: int) -> Image.Image:
    if img.width <= width:
        return img
    height = round(img.height * width / img.width)
    return img.resize((width, height), Image.LANCZOS)


def portrait() -> None:
    src = Image.open(KIT / "04-camadas/retrato-josean-transparente.png").convert("RGBA")
    save_webp(src, "portrait-1199.webp", 86)
    save_webp(fit_width(src, 720), "portrait-720.webp", 84)


def background() -> None:
    src = Image.open(KIT / "02-hero/fundo-prata.png").convert("RGB")
    save_webp(src, "silver-1672.webp", 80)
    save_webp(fit_width(src, 900), "silver-900.webp", 80)


def marks() -> None:
    for tone in ("preto", "branco"):
        src = Image.open(KIT / f"03-identidade/ja-{tone}-transparente.png").convert("RGBA")
        box = src.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
        mark = src.crop(box)
        # Clear space of one stem width on every side (01-direcao-e-identidade.md).
        stem = round(mark.width * 0.092)
        padded = Image.new("RGBA", (mark.width + 2 * stem, mark.height + 2 * stem))
        padded.paste(mark, (stem, stem))
        small = padded.resize((round(padded.width * 240 / padded.height), 240), Image.LANCZOS)
        name = "ja-black" if tone == "preto" else "ja-white"
        save_webp(small, f"{name}.webp", 92)
        small.save(OUT / f"{name}.png", optimize=True)
        if tone == "preto":
            favicons(mark)


def favicons(mark: Image.Image) -> None:
    # Black master mark on paper: dark on light, as the identity rules require.
    for size, name in ((32, "favicon-32.png"), (180, "apple-touch-icon.png")):
        tile = Image.new("RGBA", (size, size), PAPER + (255,))
        inner = round(size * 0.78)
        scale = inner / max(mark.width, mark.height)
        glyph = mark.resize((round(mark.width * scale), round(mark.height * scale)), Image.LANCZOS)
        tile.alpha_composite(glyph, ((size - glyph.width) // 2, (size - glyph.height) // 2))
        tile.save(ROOT / "public" / name, optimize=True)
        print(f"  {name:<34} {size}x{size}")


# Hero crops follow each concept's own first screen ("prévia de hero no card").
PROJECTS = {
    "automotives-sta": ("01-automotives-sta.png", 590),
    "isola": ("02-isola.png", 700),
    "legend-nails": ("03-legend-nails.png", 552),
    "orhan-barber": ("04-orhan-barber.png", 540),
    "bayro-cut": ("05-bayro-cut.png", 640),
    "mm-cleaning": ("06-mm-cleaning.png", None),
}


def projects() -> None:
    for slug, (file, hero_h) in PROJECTS.items():
        src = Image.open(KIT / "05-projetos" / file)
        src = src.convert("RGBA" if src.mode == "RGBA" else "RGB")
        save_webp(fit_width(src, 1024), f"{slug}-full.webp", 84)
        hero = src if hero_h is None else src.crop((0, 0, src.width, hero_h))
        save_webp(fit_width(hero, 1024), f"{slug}-hero.webp", 82)
        save_webp(fit_width(hero, 480), f"{slug}-thumb.webp", 80)
    # The hero window holds the STA concept at the art's 84% frame (~1.08:1).
    sta = Image.open(KIT / "05-projetos/01-automotives-sta.png").convert("RGB")
    save_webp(sta.crop((0, 0, 1024, 945)), "automotives-sta-window.webp", 84)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    portrait()
    background()
    marks()
    projects()
