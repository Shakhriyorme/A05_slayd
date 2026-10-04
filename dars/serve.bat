@echo off
rem A5 dars sahifasini lokal serverda ochadi (YouTube video file:// da ishlamasligi mumkin)
cd /d "%~dp0"
echo Dars: http://localhost:8000/index.html  (to'xtatish: Ctrl+C)
start "" http://localhost:8000/index.html
python -m http.server 8000
