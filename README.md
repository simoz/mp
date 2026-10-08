# Maci e Piumi

Un piccolo gioco per bambini con tre gatti: Maci, Piumi e nonna Emma.

1. **Il giardino di nonna Emma**: Maci e Piumi trovano tre margherite e un nastro e preparano una coroncina per Margherita.
2. **A casa dei nonni**: Piumi aiuta nonna Luisa e nonno Gian a ritrovare occhiali e telecomando, gioca con il gomitolo e arriva la merenda.
3. **In montagna dai nonni**: Maci raccoglie i mirtilli per la torta di nonna Lucy e riprende il cappello di nonno Gianco portato via dal vento.
4. **In campagna dagli zii**: Maci raccoglie le carote nell'orto di zio Giulio, riporta nel pollaio le galline scappate a zia Mile e porta le uova per la frittata.
5. **A casa degli zii**: Maci rimette a posto i libri di zia Silvia, acchiappa i tre robottini scappati dal mega computer di zio Simone e tutti ascoltano una storia sul divano.
6. **Surf al mare**: Maci segue Margherita e mamma Cecilia sulle onde raccogliendo le stelline, poi papà Andrea aspetta tutti sotto l'ombrellone con il gelato.

**Gioca:** https://simoz.github.io/mp/

## Come si gioca
- Tocca il prato per far camminare il gatto. Sul computer si usano le frecce o WASD.
- Nel surf il gatto va avanti da solo: si tocca più in alto o più in basso (o frecce su e giù) per seguire Margherita.
- In alto a destra si sceglie se giocare con Maci o con Piumi, in tutti i livelli.
- La freccia gialla indica dove andare.

## File
- `src/`: il codice (`engine.js` è il motore comune, `livello1.js`, `livello2.js`…`livello6.js` i livelli, `page.html` grafica e testi dell'interfaccia)
- `build.sh`: unisce `src/` in `index.html` (GitHub Pages) e `missioni-nonna-emma.html`
- `audio/`: musica e frasi dei personaggi
- `copione-voci.md`: tutte le frasi, per registrare le voci
- `genera-voce-margherita.sh`: genera frasi nuove con una voce sintetica simile, se manca una registrazione

## Crediti
- Musiche "Sunny Adventure", "Sunny Afternoon Tea", "Sonniger Bergwiesen", "Farmyard Games", "Cozy Computer Corner" e "Sunny Surf Party" create con [Suno](https://suno.com)
- Voce di nonna Emma creata con [ElevenLabs](https://elevenlabs.io)
- Voce di Margherita: registrata da Margherita
- Voci di nonna Luisa e nonno Gian: Microsoft Isabella e Diego (sintesi neurale), generate con edge-tts
- Voci di nonna Lucy e nonno Gianco: Microsoft Elsa (tono più basso) e Diego, generate con edge-tts
- Voci di zio Giulio e zia Mile: Microsoft Giuseppe e Isabella, generate con edge-tts
- Voci di zio Simone e zia Silvia: Microsoft Diego ed Elsa, generate con edge-tts
- Voci di mamma Cecilia e papà Andrea: Microsoft Isabella (tono più alto) e Giuseppe, generate con edge-tts
- Font: [Fredoka](https://fonts.google.com/specimen/Fredoka) (Google Fonts)
