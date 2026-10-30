# Synapse Gym

Gioco open source di allenamento cognitivo: pochi minuti al giorno, nel browser, su telefono o PC.
*Open-source brain-training game — a few minutes a day, in any browser.*

> Solo per svago: non è uno strumento medico né diagnostico.

## Cosa c'è dentro

- **Check quotidiano** – 3 prove rapide che producono un **Neuro Score** (0–1000) con 5 livelli, da *Scintilla* a *Maestro delle sinapsi*.
- **Palestra** – 6 esercizi da allenare liberamente, con record personali e timbro giornaliero:

| Esercizio | Abilità | Ispirato a |
|---|---|---|
| ➗ Sprint di calcolo | Calcolo | aritmetica mentale a tempo |
| 🎨 Scontro di colori | Attenzione | effetto Stroop, con regola che si inverte |
| 🔢 Sentiero dei numeri | Velocità | Trail Making Test (A e B) |
| 💡 Griglia di luci | Memoria | test di Corsi (span visuo-spaziale) |
| 🔐 Cassaforte di parole | Memoria | riconoscimento di parole (vecchie/nuove) |
| ⚡ Riflesso lampo | Velocità | tempo di reazione semplice |

- **Progressi** – grafico del Neuro Score, calendario delle ultime 4 settimane, record per esercizio, serie di giorni consecutivi.
- Italiano e inglese, tema chiaro/scuro automatico, installabile come app (PWA) e giocabile offline.
- Nessun server e nessun tracciamento: i dati restano nel `localStorage` del browser.

## Sviluppo

Requisiti: Node.js 18+.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
```

Stack: TypeScript + Vite, nessun framework UI. Struttura:

```
src/
  exercises/   un file per esercizio + index.ts (elenco e composizione del check)
  screens/     home, palestra, sessione di gioco, progressi, impostazioni
  ctx.ts       runtime degli esercizi (attese annullabili, input, progresso)
  i18n.ts      testi IT/EN e liste di parole
  storage.ts   salvataggi locali, record, serie
```

### Aggiungere un esercizio

1. Crea `src/exercises/mio.ts` che esporta un oggetto `Exercise` con `run(ctx)` che restituisce `{ score: 0–100, detail }`.
2. Usa `ctx.stage` per disegnare, `ctx.input()` per attendere l'input e `ctx.wait()` per le pause: così l'uscita a metà partita è gestita automaticamente.
3. Aggiungi nome e descrizione in `src/i18n.ts` e registra l'esercizio in `src/exercises/index.ts`.

### Rinominare il gioco

Il nome è definito in `src/config.ts`, `index.html` e `public/manifest.webmanifest`.

## Pubblicazione

Il workflow `.github/workflows/deploy.yml` pubblica su GitHub Pages a ogni push su `main`
(in *Settings → Pages* scegli **Source: GitHub Actions**).

## Licenza

[MIT](LICENSE). Progetto originale e indipendente; gli esercizi si basano su paradigmi classici
della psicologia cognitiva di dominio pubblico. Non è affiliato ad alcun prodotto commerciale.
