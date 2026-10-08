# Le missioni di nonna Emma

Un piccolo gioco per bambini con tre gatti: Maci, Piumi e nonna Emma.

1. **Il giardino di nonna Emma**: Maci e Piumi trovano tre margherite e un nastro e preparano una coroncina per Margherita.
2. **A casa dei nonni**: Piumi aiuta nonna Luisa e nonno Gian a ritrovare occhiali e telecomando, gioca con il gomitolo e arriva la merenda.
3. **In montagna dai nonni**: Maci raccoglie i mirtilli per la torta di nonna Lucy e riprende il cappello di nonno Gianco portato via dal vento.

**Gioca:** https://simoz.github.io/mp/

## Come si gioca
- Tocca il prato per far camminare il gatto. Sul computer si usano le frecce o WASD.
- In alto a destra si sceglie se giocare con Maci o con Piumi, in tutti i livelli.
- La freccia gialla indica dove andare.

## File
- `src/`: il codice (`engine.js` è il motore comune, `livello1.js`, `livello2.js` e `livello3.js` i livelli, `page.html` grafica e testi dell'interfaccia)
- `build.sh`: unisce `src/` in `index.html` (GitHub Pages) e `missioni-nonna-emma.html`
- `audio/`: musica e frasi dei personaggi
- `copione-voci.md`: tutte le frasi, per registrare le voci
- `genera-voce-margherita.sh`: genera nuove frasi con la voce di Margherita

## Crediti
- Musiche "Sunny Adventure", "Sunny Afternoon Tea" e "Sonniger Bergwiesen" create con [Suno](https://suno.com)
- Voce di nonna Emma creata con [ElevenLabs](https://elevenlabs.io)
- Voci di Margherita, nonna Luisa e nonno Gian: Microsoft Elsa, Isabella e Diego (sintesi neurale), generate con edge-tts
- Voci di nonna Lucy e nonno Gianco: Microsoft Elsa (tono più basso) e Diego, generate con edge-tts
- Font: [Fredoka](https://fonts.google.com/specimen/Fredoka) (Google Fonts)
