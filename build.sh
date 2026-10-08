#!/bin/bash
# Crea index.html (pagina web completa per GitHub Pages) da missioni-nonna-emma.html
set -e
cd "$(dirname "$0")"
{
  printf '<!doctype html>\n<html lang="it">\n<head>\n<meta charset="utf-8">\n'
  printf '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
  printf '<meta name="description" content="Livello 1: Maci e Piumi aiutano nonna Emma a preparare una coroncina di margherite.">\n'
  printf '</head>\n<body>\n'
  cat missioni-nonna-emma.html
  printf '\n</body>\n</html>\n'
} > index.html
echo "Creato index.html"
