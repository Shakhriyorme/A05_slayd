#!/bin/sh
# Chrome headless bilan slayd skrinshotlari va JS xato tekshiruvi.
# Ishlatish: sh qa/shoot.sh [W] [H] [prefiks] ["slayd raqamlari"] [qo'shimcha query]
cd "$(dirname "$0")/.."
CH="/c/Program Files/Google/Chrome/Application/chrome.exe"
ROOT="$(cygpath -m "$PWD")"
U="file:///$ROOT/index.html"
W=${1:-1920}; H=${2:-1080}; PRE=${3:-1920}; LIST=${4:-"$(seq 1 22)"}; EXTRA=${5:-}
for n in $LIST; do
  f=$(printf "%s-%02d.png" "$PRE" "$n")
  "$CH" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$TEMP/chq" --window-size="$W,$H" \
    --virtual-time-budget=4000 --screenshot="$ROOT/qa/$f" "$U?qa=1$EXTRA#/$((n-1))" >/dev/null 2>&1
  err=$("$CH" --headless=new --disable-gpu --user-data-dir="$TEMP/chq" --window-size="$W,$H" \
    --virtual-time-budget=4000 --dump-dom "$U?qa=1$EXTRA#/$((n-1))" 2>/dev/null | grep -o 'data-err="[^"]*"')
  [ -f "qa/$f" ] && echo "$f ${err:-ok}" || echo "$f MISSING"
done
