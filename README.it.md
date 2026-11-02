# Synapse Dojo

[![Live](https://img.shields.io/badge/Live-synapsedojo.com-5b5bf0)](https://synapsedojo.com/)
[![License](https://img.shields.io/badge/License-PolyForm%20Noncommercial%201.0.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-blue)](https://www.typescriptlang.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline%20Ready-success)](https://synapsedojo.com/)
[![Languages](https://img.shields.io/badge/Languages-12-orange)](https://synapsedojo.com/)

> *Read this in [English](README.md).*

Gioco gratuito di allenamento cognitivo e coordinazione bilaterale (source-available per uso personale): pochi minuti al giorno, direttamente nel browser, su smartphone o PC.  
*Free brain-training and bilateral coordination game (source-available for noncommercial use) — a few minutes a day, in any browser.*

> **Nota:** Solo per svago e benessere personale: non è uno strumento medico né diagnostico.

---

## 🧠 Cosa c'è dentro

- **🏋️ Allenamento Giornaliero**: circa 10–12 minuti con 4 esercizi selezionati ogni giorno tra le abilità meno allenate di recente. Completato un allenamento, è possibile avviarne subito un altro con abilità ed esercizi differenti.
- **📏 Misura il Neuro Score**: test quotidiano di benchmarking che valuta tutte le **9 abilità cerebrali e bilaterali** (selezionando ogni giorno a rotazione un esercizio per area) e calcola un **Neuro Score** normalizzato da 0 a 1000 per monitorare obiettivamente la propria lucidità nel tempo.
- **🧩 Palestra Libera**: catalogo completo di **35 esercizi** suddivisi in **9 aree cognitive e motorie**. Ciascun esercizio dispone di un **motore adattivo continuo** che calibra la difficoltà in tempo reale per mantenere la stimolazione ideale, salvando il livello raggiunto tra una sessione e l'altra.

### Le 9 Aree e i 35 Esercizi

| Abilità | Esercizi e Paradigmi di Riferimento |
|---|---|
| **⚡ Velocità** | 👁️ **Colpo d'occhio** (campo visivo utile UFOV, trial ACTIVE), ⚡ **Riflesso a scelta** (tempo di reazione a scelta + go/no-go), 🔢 **Sentiero dei numeri** (Trail Making Test A/B), ⏱️ **Tempo di reazione** (velocità visuo-motoria semplice) |
| **🎯 Attenzione** | 🏎️ **Pilota** (multitasking visuo-motorio, ispirato a NeuroRacer), 🎯 **Radar** (Multiple Object Tracking), 🎯 **Test di Flanker** (attenzione selettiva e inibizione distrattori laterali), 🚦 **Go / No-Go** (controllo inibitorio motorio), 🔠 **Interferenza multipla** (MSIT - conflitto cingolato anteriore), 💠 **Colore e forma** (feature binding visivo) |
| **🎛️ Controllo** | 🎨 **Scontro di colori** (effetto Stroop), 🔀 **Doppia regola** (task switching e costo di cambio), 🃏 **Ordinamento di carte** (Wisconsin Card Sorting Test - set-shifting) |
| **🧠 Memoria di lavoro** | 🔁 **Eco** (test N-Back visivo e duale con audio sintetizzato), 💡 **Griglia di luci** (test dei blocchi di Corsi avanti e indietro), 🔟 **Ultime cifre** (running span e aggiornamento continuo), 🔢 **Span di cifre** (digit span verbale e inverso) |
| **🔐 Memoria** | 🔐 **Cassaforte di parole** (memoria di riconoscimento ed episodica), 🔗 **Coppie** (paired associates simbolo-parola), 📜 **Memoria delle storie** (richiamo episodico narrativo ippocampale) |
| **🧊 Spaziale** | 🧊 **Rotazioni** (rotazione mentale di figure 2D e 3D), 📐 **Matrice spaziale** (rotazione mentale di coordinate a 90°, 180° e 270°) |
| **🧩 Ragionamento** | 🗼 **Torri** (Torre di Londra - pianificazione strategica anticipata), 🧩 **L'intruso** (odd-one-out e ragionamento induttivo), ⚖️ **Gestione risorse** (ottimizzazione con vincoli e budget energetico) |
| **➗ Calcolo e lettura** | ➗ **Sprint di calcolo** (aritmetica rapida - metodo Kawashima), 📖 **Lettura veloce** (lettura ad alta voce con cronometro e verifica), 🔴 **Calcolo con i punti** (sistema numerico approssimato: confrontare quantità senza contare), 🔤 **Anagrammi** (memoria ortografica e ricombinazione lessicale), 💡 **Sprint di parole** (classificazione ortografica rapida per lettera iniziale) |
| **👐 Coordinazione bilaterale** | 👆 **Tap bilaterale** (sequenze bimanuali sinistra/destra), 👋 **Swipe bilaterale** (disaccoppiamento motorio asimmetrico), 🎵 **Ritmo bilaterale** (sincronizzazione ritmica su metronomo audio-visivo), 🔄 **Movimenti incrociati** (attraversamento della linea mediana), 🤹 **Dual-task bilaterale** (attenzione emisferica divisa asimmetrica) |

---

## ✨ Funzionalità e Principi Guida

- **Difficoltà Adattiva Scientifica**: basata sulla *regola dell'85%* (Wilson et al., *Nature Communications* 2019) e sull'algoritmo *weighted up-down* (Kaernbach): la difficoltà si adatta costantemente mirando a circa l'80% di accuratezza, la soglia ottimale di apprendimento e neuroplasticità. Include riscaldamento e freno alla frustrazione.
- **Trasparenza Scientifica**: ogni esercizio include la scheda **"Perché funziona"** con la spiegazione del paradigma clinico e lo studio di riferimento (la documentazione scientifica ufficiale con bibliografia completa è consultabile in [docs/basi-scientifiche.md](docs/basi-scientifiche.md) — English: [docs/scientific-foundations.md](docs/scientific-foundations.md)).
- **Esempi e Prova Guidata**: ogni esercizio offre una spiegazione illustrata e una prova pratica (trial) preliminare per familiarizzare con i comandi senza impattare record o livelli.
- **Privacy Radicale & Zero Cookie**: nessun account, nessuna password, nessuna richiesta di rete a tracker o servizi di terze parti. Tutti i progressi risiedono esclusivamente nel `localStorage` del browser, con opzioni di esportazione e importazione in formato JSON da *Impostazioni*.
- **Multilingua Nativo (12 Lingue)**: localizzato in inglese, italiano, spagnolo, francese, tedesco, portoghese, russo, cinese, giapponese, arabo (con layout RTL), hindi e indonesiano. I file linguistici sono separati e caricati dinamicamente on-demand.
- **Accessibilità & Benessere**: modalità a ritmo rilassato (tempi maggiorati del 40%), supporto per testo grande, tema chiaro, tema scuro e installabilità come **PWA offline**.
- **Pagine Dedicate del Progetto**:
  - [`index.html`](index.html): l'applicazione completa PWA.
  - [`guide.html`](guide.html): guida approfondita e illustrata alle sezioni, a tutti i 35 giochi e alle FAQ.
  - [`privacy.html`](privacy.html): informativa su privacy, zero tracciamento e assenza di cookie.
  - [`license.html`](license.html): dettagli ufficiali della licenza PolyForm Noncommercial 1.0.0.

---

## 🛠️ Architettura Tecnica

Il progetto è costruito con **TypeScript** e **Vite**, senza l'impiego di framework pesanti (React, Vue o Angular), garantendo un caricamento istantaneo, rendering DOM nativo ultra-performante e un bundle gzippato di appena ~30 KB.

```
synapse-dojo/
├── public/                 manifest PWA, icone, font Nunito (OFL), robots.txt, sitemap.xml, _headers
├── src/
│   ├── exercises/          i 35 esercizi (uno per file) + index.ts (batteria e selezione giornaliera)
│   ├── screens/            schermate dell'app: home, training, check, play, progress, settings, guide, privacy, license
│   ├── locales/            moduli di traduzione per le 12 lingue (en.ts è la base di tipizzazione)
│   ├── adaptive.ts         motore adattivo continuo (weighted up-down staircase)
│   ├── audio.ts            effetti sonori sintetizzati via Web Audio API e sintesi vocale
│   ├── rewards.ts          calcolo XP, livelli del giocatore e sblocco traguardi
│   ├── examples.ts         generazione procedurale delle anteprime illustrate
│   ├── stats.ts            analisi delle capacità per dominio e selezione allenamento
│   ├── ctx.ts              runtime di esecuzione degli esercizi (input, timer, feedback, cancellazione)
│   ├── widgets.ts          componenti riutilizzabili (canvas, tastierini numerici, sparkline)
│   ├── i18n.ts             motore di internazionalizzazione asincrono con fallback a tipi sicuri
│   ├── storage.ts          gestione del salvataggio locale, convalida schema e backup JSON
│   ├── ui.ts               utility di layout e gestione del rendering DOM
│   ├── main.ts             entrypoint dell'applicazione principale
│   ├── guide.ts            entrypoint della pagina guida autonoma
│   ├── privacy.ts          entrypoint della pagina privacy autonoma
│   └── license.ts          entrypoint della pagina licenza autonoma
├── index.html              pagina principale (PWA)
├── guide.html              pagina indipendente per la guida
├── privacy.html            pagina indipendente per la privacy
├── license.html            pagina indipendente per la licenza
├── vite.config.ts          configurazione build multi-pagina e script Cloudflare Web Analytics
└── package.json
```

---

## 💻 Sviluppo Locale

Requisiti: **Node.js 22.12+** e **npm** (richiesti da Vite 8 e Wrangler 4).

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo locale (http://localhost:5173)
npm run dev

# Esegue il type-check TypeScript e compila la build in dist/
npm run build
```

### Aggiungere un nuovo esercizio

1. Crea `src/exercises/nuovo.ts` esportando un oggetto `Exercise` conforme all'interfaccia, specificando dominio cognitivo, livelli e funzione `run(ctx)`.
2. Utilizza le primitive del runtime: `ctx.stage` per il disegno, `ctx.input()` / `ctx.timed()` per gestire l'input dell'utente e `ctx.wait()` per le pause (gestione automatica delle uscite anticipate).
3. Aggiungi i testi (nome, descrizione, esempio e "perché funziona") in `src/locales/en.ts` e nei file linguistici, la scena visiva in `src/examples.ts` e registra l'esercizio in `src/exercises/index.ts`.

---

## 🚀 Deploy in Produzione

L'applicazione è attiva in produzione all'indirizzo **[https://synapsedojo.com](https://synapsedojo.com)**, ospitata sulla rete globale edge di Cloudflare Pages.

Per compilare e pubblicare un aggiornamento:

```bash
npm run deploy
```

Lo script `scripts/deploy-web.mjs` esegue automaticamente la build ottimizzata (`npm run build:web`) e carica i file compilati di `dist/` tramite [Wrangler](https://developers.cloudflare.com/workers/wrangler/). Il file `public/_headers` garantisce header di sicurezza HTTP rigidi (CSP, Permissions-Policy, HSTS) e cache immutabile sugli asset con hash.

---

## ⚖️ Licenza

Copyright (c) 2026 **Sergio Dogliani**.  
Distribuito con licenza **[PolyForm Noncommercial 1.0.0](LICENSE)**.

- **Uso consentito**: il codice sorgente è liberamente consultabile ed eseguibile per uso personale, didattico, studio e ricerca scientifica senza fini di lucro.
- **Restrizioni commerciali**: è vietato qualsiasi utilizzo, redistribuzione commerciale, monetizzazione, inserimento di pubblicità o integrazione in prodotti commerciali a pagamento senza autorizzazione scritta dell'autore.
- I paradigmi neuropsicologici utilizzati appartengono alla letteratura scientifica di pubblico dominio.
- Il font Nunito in `public/fonts/` è distribuito con la [SIL Open Font License 1.1](public/fonts/OFL.txt).
