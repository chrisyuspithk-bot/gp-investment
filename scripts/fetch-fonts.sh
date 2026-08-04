#!/usr/bin/env bash
# Download the SIL OFL variable fonts needed by make-images.py (OG image / favicon generation).
# These fonts are NOT loaded by the website itself — pages use Google Fonts at runtime.
set -u
cd "$(dirname "$0")/fonts" || exit 1
base="https://raw.githubusercontent.com/google/fonts/main/ofl"
curl -sL -o Sora.ttf "$base/sora/Sora%5Bwght%5D.ttf"
curl -sL -o Inter.ttf "$base/inter/Inter%5Bopsz%2Cwght%5D.ttf"
curl -sL -o JetBrainsMono.ttf "$base/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf"
curl -sL -o NotoSansTC.ttf "$base/notosanstc/NotoSansTC%5Bwght%5D.ttf"
curl -sL -o NotoSansSC.ttf "$base/notosanssc/NotoSansSC%5Bwght%5D.ttf"
echo "Fonts downloaded to scripts/fonts/"
