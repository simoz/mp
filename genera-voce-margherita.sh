#!/bin/bash
# Genera le frasi di Margherita con la voce Microsoft "Elsa" (gratis, tramite edge-tts).
# Uso: ./genera-voce-margherita.sh m08 "Frase nuova!"
# Serve edge-tts:  python3 -m pip install edge-tts
set -e
cd "$(dirname "$0")"
edge-tts -v it-IT-ElsaNeural --pitch=+35Hz --rate=+5% -t "$2" --write-media "audio/voce/$1.mp3"
echo "Creato audio/voce/$1.mp3"
