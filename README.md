# Synapse Gym

Gioco open source di allenamento cognitivo: pochi minuti al giorno, nel browser, su telefono o PC.
*Open-source brain-training game — a few minutes a day, in any browser.*

> Solo per svago: non è uno strumento medico né diagnostico.

## Cosa c'è dentro

- **Allenamento**: circa 10–12 minuti, con 4 esercizi scelti ogni giorno tra le abilità allenate meno di recente.
- **Misura il Neuro Score**: 4 prove rapide a difficoltà fissa (velocità, controllo, memoria di lavoro, calcolo) che producono un **Neuro Score** da 0 a 1000.
- **Palestra**: 17 esercizi su 8 abilità. Ognuno ha **difficoltà adattiva**: diventa più difficile mentre migliori e il livello resta salvato.

| Abilità | Esercizi |
|---|---|
| Velocità | 👁️ Colpo d'occhio (campo visivo utile), ⚡ Riflesso a scelta, 🔢 Sentiero dei numeri |
| Attenzione | 🏎️ Pilota (multitasking), 🎯 Radar (inseguimento di più oggetti) |
| Controllo | 🎨 Scontro di colori (Stroop), 🔀 Doppia regola (task switching) |
| Memoria di lavoro | 🔁 Eco (n-back duale), 💡 Griglia di luci (Corsi), 🔟 Ultime cifre |
| Memoria | 🔐 Cassaforte di parole, 🔗 Coppie |
| Spaziale | 🧊 Rotazioni |
| Ragionamento | 🗼 Torri (Torre di Londra), 🧩 L'intruso |
| Calcolo e lettura | ➗ Sprint di calcolo, 📖 Lettura veloce |

- **Progressi**: profilo radar per abilità, grafico del Neuro Score, calendario e obiettivo settimanale.
- **Esempi e prova guidata**: ogni esercizio mostra un esempio illustrato e, la prima volta, propone una prova che non conta.
- **Difficoltà su misura**: punta a circa l'80% di risposte giuste, il punto in cui si impara più in fretta secondo la ricerca.
- **Motivazione**: combo durante il gioco, punti XP e livello del giocatore, 17 traguardi, obiettivo settimanale, serie che perdona un giorno di riposo, promemoria per il calendario.
- Ogni esercizio ha una scheda **"Perché funziona"** con il paradigma scientifico e lo studio di riferimento. La ricerca completa è in [docs/ricerca-e-proposta.md](docs/ricerca-e-proposta.md).
- Italiano e inglese, tema chiaro e scuro, ritmo rilassato e testo grande, installabile come app (PWA) e giocabile offline.
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
  adaptive.ts  motore adattivo (weighted up-down, obiettivo 80%)
  rewards.ts   XP, livello del giocatore e traguardi
  examples.ts  esempi illustrati delle schede
  stats.ts     capacità per abilità e scelta dell'allenamento di oggi
  ctx.ts       runtime degli esercizi (attese annullabili, input, livello, ritmo)
  widgets.ts   tastierino, canvas e altri componenti condivisi
  i18n.ts      testi IT/EN, liste di parole e brani di lettura
  storage.ts   salvataggi locali, livelli, record, serie
```

### Aggiungere un esercizio

1. Crea `src/exercises/mio.ts` che esporta un oggetto `Exercise`, con dominio, `levels` e `run(ctx)`. `run` restituisce `{ score: 0–100, detail, level }`.
2. Usa `ctx.stage` per disegnare, `ctx.input()` / `ctx.timed()` per attendere l'input e `ctx.wait()` per le pause: così l'uscita a metà partita è gestita automaticamente.
3. Per la difficoltà parti da `ctx.level`, registra ogni prova con `ctx.track(st, ok)` (aggiorna livello, combo e avvisi) e restituisci `level: st.next()`. Usa `ctx.count(allenamento, check, prova)` per il numero di tentativi. Moltiplica i tempi limite per `ctx.pace` (modalità rilassata).
4. Aggiungi nome, descrizione, esempio e "perché funziona" in `src/i18n.ts`, e una scena in `src/examples.ts`, e registra l'esercizio in `src/exercises/index.ts`.

### Rinominare il gioco

Il nome è definito in `src/config.ts`, `index.html` e `public/manifest.json`.

## Pubblicazione

Il workflow `.github/workflows/deploy.yml` pubblica su GitHub Pages. Per ora si avvia solo a mano
(*Actions → Deploy to GitHub Pages → Run workflow*), perché GitHub Pages richiede un repository pubblico
sul piano gratuito. Quando il repository sarà pubblico:

1. in *Settings → Pages* scegli **Source: GitHub Actions**;
2. se vuoi il deploy automatico a ogni push, aggiungi `push: { branches: [main] }` sotto `on:` nel workflow.

### Su un server privato con Tailscale

`npm run deploy:vps` compila il gioco e lo copia via SSH su un server Linux del tuo tailnet, dove
`tailscale serve` lo pubblica in HTTPS sulla porta 8443 (`https://<host>.<tailnet>.ts.net:8443`), visibile solo
ai tuoi dispositivi. Eventuali altri siti già serviti sulla porta 443 non vengono toccati.
Servono MagicDNS e i certificati HTTPS attivi nella console di Tailscale.

```bash
VPS_USER=<utente> npm run deploy:vps -- --setup   # la prima volta
VPS_USER=<utente> npm run deploy:vps              # aggiornamenti
```

Variabili opzionali: `VPS_HOST` (predefinito `vps-f2a5538a`), `VPS_DIR` (cartella nella home, predefinita `synapse-gym`)
e `VPS_PORT` (predefinita `8443`).

## Licenza

[MIT](LICENSE). Progetto originale e indipendente; gli esercizi si basano su paradigmi classici
della psicologia cognitiva di dominio pubblico. Non è affiliato ad alcun prodotto commerciale.
