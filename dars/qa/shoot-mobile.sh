#!/bin/sh
# 390×844 skrinshotlar (headless Chrome oyna kengligi >= 500 px bo'lgani uchun iframe orqali, keyin kesiladi)
cd "$(dirname "$0")/.."
CH="/c/Program Files/Google/Chrome/Application/chrome.exe"
ROOT="$(cygpath -m "$PWD")"
for n in ${1:-$(seq 1 22)}; do
  f=$(printf "390-%02d.png" "$n")
  "$CH" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$TEMP/chq" --window-size=600,900 \
    --virtual-time-budget=4000 --screenshot="$ROOT/qa/$f" "file:///$ROOT/qa/mobile.html#$n" >/dev/null 2>&1
done
~/miniconda3/envs/aime312/python.exe -c "
import glob
from PIL import Image
for f in sorted(glob.glob('qa/390-[0-9][0-9].png')):
    im = Image.open(f)
    if im.size != (390, 844): im.crop((0, 0, 390, 844)).save(f)
print('cropped')"
