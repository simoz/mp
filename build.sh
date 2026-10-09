#!/bin/bash
# Unisce src/ in un'unica pagina:
#  - missioni-nonna-emma.html  (per l'Artifact di Claude)
#  - index.html                (pagina completa per GitHub Pages)
set -e
cd "$(dirname "$0")"
python3 - <<'PY'
js="".join(open(f"src/{f}.js").read()+"\n" for f in ["engine","livello1","livello2","livello3","livello4","livello5","livello6","livello7","livello8","intro","boot"])
page=open("src/page.html").read().replace("/*SCRIPTS*/","(()=>{\n"+js+"})();")
open("missioni-nonna-emma.html","w").write(page)
head=('<!doctype html>\n<html lang="it">\n<head>\n<meta charset="utf-8">\n'
 '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
 '<meta name="description" content="Maci, Piumi e nonna Emma: un gioco con tre gatti.">\n</head>\n<body>\n')
open("index.html","w").write(head+page+"\n</body>\n</html>\n")
PY
echo "Creati missioni-nonna-emma.html e index.html"
