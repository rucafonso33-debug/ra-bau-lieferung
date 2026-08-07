#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
source_root="${SOURCE_ROOT:-$(cd "$repo_root/.." && pwd)}"
output_dir="${1:-$repo_root/public-live/images/catalog-2026}"
work_dir="$(mktemp -d)"
mkdir -p "$output_dir"
trap 'rm -rf "$work_dir"' EXIT

rubicer="$source_root/upload/RA_Bau_Dossier_Rubicer_2026.pdf"
moov_bad="$source_root/output/pdf/Katalog_Moovlux_Bad_2026_ohne_Preise.pdf"
moov_furniture="$source_root/output/pdf/Katalog_Moovlux_Badmoebel_2024_ohne_Preise.pdf"
recer="${RECER_CATALOGUE:-$source_root/output/pdf/Katalog_Recer_2026_ohne_Preise.pdf}"
roca="$source_root/output/pdf/Katalog_Roca_2025_2026_ohne_Preise.pdf"

render_page() {
  local pdf="$1" page="$2" key="$3"
  local target="$work_dir/$key"
  pdftoppm -f "$page" -l "$page" -jpeg -r 240 -singlefile "$pdf" "$target" >/dev/null 2>&1
  printf '%s.jpg' "$target"
}

crop_box() {
  local source="$1" xf="$2" yf="$3" wf="$4" hf="$5"
  local width height x y w h
  read -r width height < <(identify -format '%w %h' "$source")
  read -r x y w h < <(awk -v W="$width" -v H="$height" -v X="$xf" -v Y="$yf" -v CW="$wf" -v CH="$hf" 'BEGIN { printf "%d %d %d %d\n", W*X, H*Y, W*CW, H*CH }')
  printf '%sx%s+%s+%s' "$w" "$h" "$x" "$y"
}

scene_card() {
  local pdf="$1" page="$2" name="$3" xf="$4" yf="$5" wf="$6" hf="$7"
  local source geometry
  source="$(render_page "$pdf" "$page" "${name}-page")"
  geometry="$(crop_box "$source" "$xf" "$yf" "$wf" "$hf")"
  local target="$work_dir/${name}-card.webp"
  for _attempt in 1 2 3; do
    convert "$source" -crop "$geometry" +repage -filter Lanczos -resize '1200x900^' -gravity center -extent 1200x900 -unsharp 0x0.45 -quality 90 "$target"
    test -s "$target" && break
  done
  test -s "$target"
  mv "$target" "$output_dir/$name.webp"
}

product_card() {
  local pdf="$1" page="$2" name="$3" xf="$4" yf="$5" wf="$6" hf="$7"
  local source geometry
  source="$(render_page "$pdf" "$page" "${name}-page")"
  geometry="$(crop_box "$source" "$xf" "$yf" "$wf" "$hf")"
  local target="$work_dir/${name}-card.webp"
  for _attempt in 1 2 3; do
    convert "$source" -crop "$geometry" +repage -fuzz 7% -trim +repage -filter Lanczos -resize '1030x760' -unsharp 0x0.55 -gravity center -background '#f2f2ef' -extent 1200x900 -quality 90 "$target"
    test -s "$target" && break
  done
  test -s "$target"
  mv "$target" "$output_dir/$name.webp"
}

# Grossformat: full-bleed room scenes instead of catalogue-page screenshots.
scene_card "$rubicer" 115 slab-brescia .045 .045 .91 .445
scene_card "$rubicer" 117 slab-onyx-opal .045 .045 .91 .445
scene_card "$rubicer" 119 slab-iconic .045 .045 .91 .445
scene_card "$rubicer" 121 slab-marmolux-polido .045 .045 .91 .445
scene_card "$rubicer" 121 slab-calcutta-cooper .045 .505 .91 .445
scene_card "$rubicer" 123 slab-signature-marfil .045 .045 .91 .445
scene_card "$rubicer" 123 slab-signature-gold .045 .505 .91 .445
scene_card "$rubicer" 125 slab-calacatta-supremo .045 .045 .91 .445
scene_card "$rubicer" 125 slab-statuario-norwell .045 .505 .91 .445
scene_card "$rubicer" 127 slab-afyon .045 .045 .91 .445
scene_card "$rubicer" 127 slab-rockford-grey .045 .505 .91 .445
scene_card "$rubicer" 129 slab-emporium-beige .045 .045 .91 .445

# Mosaics: crop the relevant installed scene or, where none exists, the product panel.
scene_card "$recer" 10 mosaic-vetra-ebony .49 .04 .39 .91
scene_card "$recer" 14 mosaic-ritmo-pearl .51 .04 .37 .91
scene_card "$recer" 18 mosaic-twist-blue .02 .04 .48 .91
scene_card "$recer" 20 mosaic-porto-green .02 .04 .49 .91
scene_card "$recer" 22 mosaic-naprec-modul .02 .04 .49 .91
scene_card "$recer" 25 mosaic-naprec-on .50 .04 .38 .91
scene_card "$recer" 26 mosaic-magnes-green .02 .04 .49 .91
scene_card "$recer" 28 mosaic-triplex-fronteira .02 .04 .49 .91
scene_card "$recer" 31 mosaic-true .50 .04 .38 .91
scene_card "$recer" 32 mosaic-dot .02 .04 .49 .91
scene_card "$recer" 34 mosaic-twenties-diamond .50 .63 .38 .30
product_card "$recer" 36 mosaic-revival-tulip .03 .05 .42 .82

# Furniture: use the catalogue photography as a landscape card, without page furniture.
for item in \
  '44 furniture-curvatto' '50 furniture-luxury' '58 furniture-round' \
  '66 furniture-classic' '80 furniture-discovery' '90 furniture-laka' \
  '98 furniture-candy' '108 furniture-modular' '114 furniture-tulip' \
  '116 furniture-helios' '120 furniture-bahia' '126 furniture-sleep-one'; do
  page="${item%% *}"; name="${item#* }"
  scene_card "$moov_furniture" "$page" "$name" .0 .21 1.0 .58
done

# Faucets: exact product render only; remove barcodes, copy and technical drawings.
for item in \
  '6 faucet-tube-chrome' '11 faucet-tube-black' '15 faucet-tube-gold' \
  '19 faucet-tube-black-rose' '23 faucet-tube-gunmetal' '27 faucet-tube-rose' \
  '33 faucet-quadra-chrome' '37 faucet-quadra-black' '41 faucet-quadra-gold' \
  '45 faucet-quadra-gunmetal' '49 faucet-quadra-rose' '54 faucet-stick-chrome' \
  '56 faucet-stick-black' '59 faucet-tess-chrome' '60 faucet-tess-black' \
  '61 faucet-tess-nickel' '63 faucet-sensor-chrome'; do
  page="${item%% *}"; name="${item#* }"
  product_card "$moov_bad" "$page" "$name" .045 .045 .255 .235
done
product_card "$moov_bad" 63 faucet-sensor-black .045 .285 .255 .235

# Shower systems: exact left-hand product render for each row.
for group in \
  '8 shower-tube-rd1015 shower-tube-rd1003 shower-stick-ep1011 shower-stick-ep1021' \
  '13 shower-tube-rd1016 shower-tube-rd1004 shower-stick-ep1012 shower-stick-ep1022' \
  '17 shower-tube-rd1018 shower-tube-rd1006 shower-stick-ep1015 shower-stick-ep1023' \
  '21 shower-tube-rd1020 shower-tube-rd1008 shower-stick-ep1017 shower-stick-ep1025' \
  '25 shower-tube-rd1019 shower-tube-rd1007 shower-stick-ep1016 shower-stick-ep1024'; do
  set -- $group
  page="$1"; shift
  row=0
  for name in "$@"; do
    y="$(awk -v r="$row" 'BEGIN { printf "%.3f", .045 + r*.238 }')"
    product_card "$moov_bad" "$page" "$name" .035 "$y" .285 .215
    row=$((row + 1))
  done
done

# Sanitary ceramics: prioritise installed scenes, then clean product crops.
scene_card "$rubicer" 248 sanitary-fly-btw-cappuccino .03 .67 .45 .21
product_card "$rubicer" 250 sanitary-fly-btw-compact .08 .18 .34 .27
scene_card "$rubicer" 252 sanitary-elegant-btw-cappuccino .02 .02 .46 .25
scene_card "$rubicer" 252 sanitary-elegant-btw-dark-grey .02 .51 .46 .25
scene_card "$rubicer" 256 sanitary-glamic-btw-grey .03 .65 .45 .26
product_card "$rubicer" 258 sanitary-glamic-btw-compact .03 .52 .43 .28
product_card "$rubicer" 260 sanitary-bohemic-black .02 .43 .36 .20
product_card "$rubicer" 262 sanitary-new-retro .18 .16 .42 .70
scene_card "$rubicer" 263 sanitary-mega-btw .03 .02 .78 .72
scene_card "$rubicer" 264 sanitary-max-btw .03 .02 .78 .68
scene_card "$rubicer" 265 sanitary-ultra-rimless .14 .02 .70 .66
scene_card "$rubicer" 268 sanitary-moon-wall .03 .02 .88 .56
product_card "$rubicer" 270 sanitary-fly-wall-cappuccino .03 .30 .31 .21
product_card "$rubicer" 270 sanitary-fly-wall-black .03 .67 .31 .21
product_card "$rubicer" 272 sanitary-glamic-wall-grey .03 .31 .31 .21
scene_card "$rubicer" 274 sanitary-elegant-wall-black .03 .02 .79 .58

# Moovlux trays: isolate the large product or the available installed scene.
product_card "$moov_bad" 137 tray-revo .08 .14 .38 .51
product_card "$moov_bad" 141 tray-candor .08 .14 .38 .58
product_card "$moov_bad" 145 tray-quore .08 .14 .38 .58
product_card "$moov_bad" 149 tray-silky .08 .14 .40 .58
scene_card "$moov_bad" 152 tray-silky-frame .07 .23 .39 .66
product_card "$moov_bad" 155 tray-concept .04 .13 .58 .48
product_card "$moov_bad" 157 tray-aurea .05 .12 .46 .62

# Roca trays: use lifestyle imagery where available and clean product crops elsewhere.
scene_card "$roca" 124 tray-pyros .03 .08 .88 .35
product_card "$roca" 124 tray-aquos .03 .63 .45 .30
product_card "$roca" 124 tray-terran .49 .63 .43 .30
scene_card "$roca" 125 tray-modo .03 .03 .45 .55
scene_card "$roca" 125 tray-cratos .50 .03 .43 .55
scene_card "$roca" 126 tray-neo-daiquiri .03 .03 .45 .50
product_card "$roca" 126 tray-easy .03 .50 .45 .25
product_card "$roca" 126 tray-granada-flat .03 .72 .45 .22
product_card "$roca" 126 tray-granada-compact .25 .72 .24 .22
scene_card "$roca" 126 tray-malta .50 .03 .42 .50
product_card "$roca" 126 tray-italia .50 .50 .42 .42

count="$(find "$output_dir" -maxdepth 1 -type f -name '*.webp' | wc -l | tr -d ' ')"
test "$count" = 108
echo "Generated $count corrected catalogue images in $output_dir"

