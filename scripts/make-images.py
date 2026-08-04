#!/usr/bin/env python3
"""Generate OG images (1200x630, per locale) and PNG favicons for the GP Investment site.
Fonts: SIL OFL variable fonts downloaded into scripts/fonts/ (see README).
"""
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT = os.path.join(ROOT, 'assets', 'img')
FONTS = os.path.join(HERE, 'fonts')

INK_950 = (7, 17, 38)
INK_900 = (11, 30, 58)
INK_800 = (18, 41, 78)
BLUE = (29, 91, 255)
CYAN = (34, 211, 238)
GOLD = (240, 180, 41)
WHITE = (255, 255, 255)


def load(name, size, weight='Bold'):
    f = ImageFont.truetype(os.path.join(FONTS, name + '.ttf'), size)
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f


def diagonal_gradient(w, h, tl, tr, bl, br):
    small = Image.new('RGB', (2, 2))
    small.putpixel((0, 0), tl)
    small.putpixel((1, 0), tr)
    small.putpixel((0, 1), bl)
    small.putpixel((1, 1), br)
    return small.resize((w, h), Image.BICUBIC)


def radial_glow(w, h, cx, cy, radius, color, max_alpha=36):
    glow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(glow)
    steps = 40
    for i in range(steps, 0, -1):
        r = radius * i / steps
        a = int(max_alpha * (1 - i / steps) ** 1.5)
        d.ellipse([cx - r, cy - r * 0.68, cx + r, cy + r * 0.68], fill=color + (a,))
    return glow.filter(ImageFilter.GaussianBlur(40))


def grid_overlay(w, h, step=56, alpha=10):
    layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for x in range(0, w + 1, step):
        d.line([(x, 0), (x, h)], fill=(255, 255, 255, alpha))
    for y in range(0, h + 1, step):
        d.line([(0, y), (w, y)], fill=(255, 255, 255, alpha))
    return layer


def monogram(size, radius_ratio=0.25, text_ratio=0.42):
    """Rounded-square blue->cyan gradient tile with white GP."""
    tile = diagonal_gradient(size, size, BLUE, CYAN, BLUE, CYAN).convert('RGBA')
    mask = Image.new('L', (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, size - 1, size - 1], radius=int(size * radius_ratio), fill=255)
    out = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    out.paste(tile, (0, 0), mask)
    d = ImageDraw.Draw(out)
    f = load('Sora', int(size * text_ratio), 'ExtraBold')
    bbox = d.textbbox((0, 0), 'GP', font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text(((size - tw) / 2 - bbox[0], (size - th) / 2 - bbox[1]), 'GP', font=f, fill=WHITE)
    return out


def chip(draw, xy, text, font, fg, border, bg):
    x, y = xy
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    px, py = 18, 9
    draw.rounded_rectangle([x, y, x + tw + px * 2, y + th + py * 2], radius=(th + py * 2) // 2, fill=bg, outline=border, width=1)
    draw.text((x + px - bbox[0], y + py - bbox[1]), text, font=font, fill=fg)
    return tw + px * 2


def make_og(locale, cjk_font, tagline, locale_label, patent_label, filename):
    w, h = 1200, 630
    img = diagonal_gradient(w, h, INK_950, INK_900, INK_900, INK_800).convert('RGBA')
    img.alpha_composite(radial_glow(w, h, int(w * 0.86), int(h * 0.18), 420, CYAN))
    img.alpha_composite(radial_glow(w, h, int(w * 0.08), int(h * 0.95), 380, BLUE, max_alpha=28))
    img.alpha_composite(grid_overlay(w, h))
    d = ImageDraw.Draw(img)

    # brand row
    m = monogram(92)
    img.alpha_composite(m, (72, 64))
    f_brand = load('Sora', 34, 'Bold')
    f_sub = load('Inter', 17, 'SemiBold')
    d.text((186, 76), 'GP INVESTMENT', font=f_brand, fill=WHITE)
    d.text((188, 122), 'G R O U P   L I M I T E D', font=f_sub, fill=(150, 168, 200))

    # tagline
    f_tag = load(cjk_font, 64 if cjk_font != 'Sora' else 54, 'Bold')
    # wrap tagline to max 2 lines
    words = tagline.split(' · ')
    line1, line2 = (words[0] + ' · ' + words[1], words[2]) if len(words) == 3 else (tagline, '')
    y = 268
    d.text((72, y), line1, font=f_tag, fill=WHITE)
    if line2:
        bb = d.textbbox((72, y), line1, font=f_tag)
        d.text((72, bb[3] + 18), line2, font=f_tag, fill=CYAN)

    # chips
    f_chip = load('JetBrainsMono', 21, 'Bold')
    f_chip_cjk = load(cjk_font, 21, 'Bold')
    chip_font = f_chip if locale == 'en' else f_chip_cjk
    x = chip(d, (72, 500), patent_label, chip_font, (255, 224, 138), GOLD + (160,), (GOLD[0], GOLD[1], GOLD[2], 26))
    chip(d, (72 + x + 16, 500), locale_label, chip_font, (167, 243, 250), CYAN + (160,), (CYAN[0], CYAN[1], CYAN[2], 22))

    # bottom hairline + domain
    d.line([(72, 578), (1128, 578)], fill=(255, 255, 255, 26), width=1)
    f_dom = load('JetBrainsMono', 18, 'Medium')
    d.text((72, 592), 'gpinvestment.com', font=f_dom, fill=(110, 130, 165))

    img.convert('RGB').save(os.path.join(OUT, filename), 'PNG', optimize=True)
    print('wrote', filename)


def main():
    os.makedirs(OUT, exist_ok=True)
    make_og('zh-Hant', 'NotoSansTC', 'AI研發驅動 · 教育及中小企業 · 數碼化賦能', '繁體中文', '12項核心技術專利', 'og-zh-hant.png')
    make_og('zh-Hans', 'NotoSansSC', 'AI研发驱动 · 教育及中小企业 · 数字化赋能', '简体中文', '12项核心技术专利', 'og-zh-hans.png')
    make_og('en', 'Sora', 'AI-Driven R&D · Digital Empowerment · for Education & SMEs', 'English', '12 Core Technology Patents', 'og-en.png')

    for size, name in [(32, 'favicon-32x32.png'), (180, 'apple-touch-icon.png')]:
        monogram(size).save(os.path.join(OUT, name), 'PNG', optimize=True)
        print('wrote', name)


if __name__ == '__main__':
    main()
