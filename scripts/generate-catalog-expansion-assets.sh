#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
source_root="$(cd "$repo_root/.." && pwd)"
output_dir="$repo_root/public-live/images/catalog-2026"
work_dir="$(mktemp -d)"
mkdir -p "$output_dir"
trap 'rm -rf "$work_dir"' EXIT

render_page() {
  local pdf="$1" page="$2" key="$3"
  local target="$work_dir/$key"
  pdftoppm -f "$page" -l "$page" -jpeg -r 110 -singlefile "$pdf" "$target" >/dev/null 2>&1
  printf '%s.jpg' "$target"
}

card_from_page() {
  local pdf="$1" page="$2" name="$3"
  local source
  source="$(render_page "$pdf" "$page" "${name}-page")"
  convert "$source" -trim +repage -resize '1140x840>' -gravity center -background '#f2f2ef' -extent 1200x900 -quality 86 "$output_dir/$name.webp"
}

card_from_crop() {
  local pdf="$1" page="$2" name="$3" geometry="$4"
  local source
  source="$(render_page "$pdf" "$page" "${name}-page")"
  convert "$source" -crop "$geometry" +repage -fuzz 3% -trim +repage -resize '1140x840>' -gravity center -background '#f2f2ef' -extent 1200x900 -quality 86 "$output_dir/$name.webp"
}

rubicer="$source_root/upload/RA_Bau_Dossier_Rubicer_2026.pdf"
moov_bad="$source_root/output/pdf/Katalog_Moovlux_Bad_2026_ohne_Preise.pdf"
moov_furniture="$source_root/output/pdf/Katalog_Moovlux_Badmoebel_2024_ohne_Preise.pdf"
recer="$source_root/output/pdf/Katalog_Recer_2026_ohne_Preise.pdf"
roca="$source_root/output/pdf/Katalog_Roca_2025_2026_ohne_Preise.pdf"

# Grossformat: paired lifestyle pages, split into their upper/lower material scenes.
card_from_crop "$rubicer" 115 slab-brescia '850x570+42+60'
card_from_crop "$rubicer" 117 slab-onyx-opal '850x570+42+60'
card_from_crop "$rubicer" 119 slab-iconic '850x570+42+60'
card_from_crop "$rubicer" 121 slab-marmolux-polido '850x570+42+60'
card_from_crop "$rubicer" 121 slab-calcutta-cooper '850x570+42+650'
card_from_crop "$rubicer" 123 slab-signature-marfil '850x570+42+60'
card_from_crop "$rubicer" 123 slab-signature-gold '850x570+42+650'
card_from_crop "$rubicer" 125 slab-calacatta-supremo '850x570+42+60'
card_from_crop "$rubicer" 125 slab-statuario-norwell '850x570+42+650'
card_from_crop "$rubicer" 127 slab-afyon '850x570+42+60'
card_from_crop "$rubicer" 127 slab-rockford-grey '850x570+42+650'
card_from_crop "$rubicer" 129 slab-emporium-beige '850x570+42+60'

# Mosaik and decorative small formats from the Recer no-price catalogue.
card_from_page "$recer" 10 mosaic-vetra-ebony
card_from_page "$recer" 14 mosaic-ritmo-pearl
card_from_page "$recer" 18 mosaic-twist-blue
card_from_page "$recer" 20 mosaic-porto-green
card_from_page "$recer" 22 mosaic-naprec-modul
card_from_page "$recer" 25 mosaic-naprec-on
card_from_page "$recer" 26 mosaic-magnes-green
card_from_page "$recer" 28 mosaic-triplex-fronteira
card_from_page "$recer" 31 mosaic-true
card_from_page "$recer" 32 mosaic-dot
card_from_page "$recer" 34 mosaic-twenties-diamond
card_from_page "$recer" 36 mosaic-revival-tulip

# Bathroom furniture lifestyle pages from the Moovlux no-price catalogue.
card_from_page "$moov_furniture" 44 furniture-curvatto
card_from_page "$moov_furniture" 50 furniture-luxury
card_from_page "$moov_furniture" 58 furniture-round
card_from_page "$moov_furniture" 66 furniture-classic
card_from_page "$moov_furniture" 80 furniture-discovery
card_from_page "$moov_furniture" 90 furniture-laka
card_from_page "$moov_furniture" 98 furniture-candy
card_from_page "$moov_furniture" 108 furniture-modular
card_from_page "$moov_furniture" 114 furniture-tulip
card_from_page "$moov_furniture" 116 furniture-helios
card_from_page "$moov_furniture" 120 furniture-bahia
card_from_page "$moov_furniture" 126 furniture-sleep-one

# Washbasin taps: one exact catalogue row per reference/finish.
for item in \
  '6 faucet-tube-chrome' '11 faucet-tube-black' '15 faucet-tube-gold' \
  '19 faucet-tube-black-rose' '23 faucet-tube-gunmetal' '27 faucet-tube-rose' \
  '33 faucet-quadra-chrome' '37 faucet-quadra-black' '41 faucet-quadra-gold' \
  '45 faucet-quadra-gunmetal' '49 faucet-quadra-rose' '54 faucet-stick-chrome' \
  '56 faucet-stick-black' '59 faucet-tess-chrome' '60 faucet-tess-black' \
  '61 faucet-tess-nickel' '63 faucet-sensor-chrome' '63 faucet-sensor-black'; do
  page="${item%% *}"; name="${item#* }"
  card_from_crop "$moov_bad" "$page" "$name" '850x300+42+75'
done

# Complete shower systems: four precisely separated products per catalogue page.
for group in \
  '8 shower-tube-rd1015 shower-tube-rd1003 shower-stick-ep1011 shower-stick-ep1021' \
  '13 shower-tube-rd1016 shower-tube-rd1004 shower-stick-ep1012 shower-stick-ep1022' \
  '17 shower-tube-rd1018 shower-tube-rd1006 shower-stick-ep1015 shower-stick-ep1023' \
  '21 shower-tube-rd1020 shower-tube-rd1008 shower-stick-ep1017 shower-stick-ep1025' \
  '25 shower-tube-rd1019 shower-tube-rd1007 shower-stick-ep1016 shower-stick-ep1024'; do
  set -- $group
  page="$1"; shift
  y=70
  for name in "$@"; do
    card_from_crop "$moov_bad" "$page" "$name" "850x250+42+$y"
    y=$((y + 285))
  done
done

# Sanitary ceramics: catalogue scenes/technical presentations, including distinct finishes.
card_from_page "$rubicer" 248 sanitary-fly-btw-cappuccino
card_from_page "$rubicer" 250 sanitary-fly-btw-compact
card_from_crop "$rubicer" 252 sanitary-elegant-btw-cappuccino '850x570+42+60'
card_from_crop "$rubicer" 252 sanitary-elegant-btw-dark-grey '850x570+42+650'
card_from_page "$rubicer" 256 sanitary-glamic-btw-grey
card_from_page "$rubicer" 258 sanitary-glamic-btw-compact
card_from_page "$rubicer" 260 sanitary-bohemic-black
card_from_page "$rubicer" 262 sanitary-new-retro
card_from_page "$rubicer" 263 sanitary-mega-btw
card_from_page "$rubicer" 264 sanitary-max-btw
card_from_page "$rubicer" 265 sanitary-ultra-rimless
card_from_page "$rubicer" 268 sanitary-moon-wall
card_from_crop "$rubicer" 270 sanitary-fly-wall-cappuccino '850x570+42+60'
card_from_crop "$rubicer" 270 sanitary-fly-wall-black '850x570+42+650'
card_from_page "$rubicer" 272 sanitary-glamic-wall-grey
card_from_page "$rubicer" 274 sanitary-elegant-wall-black

# Shower trays: seven Moovlux series plus eleven distinct Roca tray models.
for item in \
  '137 tray-revo' '141 tray-candor' '145 tray-quore' '149 tray-silky' \
  '152 tray-silky-frame' '155 tray-concept' '157 tray-aurea'; do
  page="${item%% *}"; name="${item#* }"
  card_from_page "$moov_bad" "$page" "$name"
done
card_from_crop "$roca" 124 tray-pyros '390x470+35+650'
card_from_crop "$roca" 124 tray-aquos '420x380+35+900'
card_from_crop "$roca" 124 tray-terran '420x380+455+900'
card_from_crop "$roca" 125 tray-modo '430x1040+35+85'
card_from_crop "$roca" 125 tray-cratos '430x1040+465+85'
card_from_crop "$roca" 126 tray-neo-daiquiri '420x660+35+80'
card_from_crop "$roca" 126 tray-easy '420x390+35+640'
card_from_crop "$roca" 126 tray-granada-flat '420x300+35+930'
card_from_crop "$roca" 126 tray-granada-compact '260x300+230+930'
card_from_crop "$roca" 126 tray-malta '420x660+465+80'
card_from_crop "$roca" 126 tray-italia '420x550+465+650'

echo "Generated $(find "$output_dir" -maxdepth 1 -type f -name '*.webp' | wc -l | tr -d ' ') catalogue images in $output_dir"
