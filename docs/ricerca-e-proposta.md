# Ricerca e proposta di riprogettazione

*Ottobre 2026. Obiettivo: passare da sei minigiochi a un programma di allenamento costruito sui paradigmi con le prove scientifiche più solide. Le sezioni 3 e 4 descrivono ciò che è stato implementato.*

## 1. Cosa dice la ricerca (in breve)

| Approccio | Prova principale | Cosa ci dice |
|---|---|---|
| **Velocità di elaborazione / campo visivo utile (UFOV)** | Trial ACTIVE, 10 anni di follow-up (Edwards et al., 2017) | Unico intervento cognitivo associato a un **rischio di demenza inferiore del 29–33%** rispetto a nessun allenamento. Più sessioni di richiamo, più beneficio (dato osservazionale). Nello stesso trial l'allenamento di memoria e ragionamento con strategie non ha dato effetti sulla demenza. |
| **Lettura ad alta voce + calcoli semplici e veloci** ("learning therapy" del gruppo di Kawashima) | RCT su 64 anziani, 6 mesi (Nouchi et al., 2016) | Miglioramenti di inibizione, memoria episodica verbale, attenzione e velocità. Studi piccoli, gruppo di controllo in lista d'attesa, condotti dagli stessi ideatori. |
| **Multitasking adattivo** (NeuroRacer, UCSF, Anguera & Gazzaley, *Nature* 2013) | RCT con controllo attivo, anziani 60–85 anni | Costo del multitasking ridotto, effetto mantenuto 6 mesi dopo, trasferimento ad attenzione sostenuta e memoria di lavoro. Ha dato origine a EndeavorRx, approvato dalla FDA per l'ADHD. |
| **Allenamento spaziale** (rotazione mentale ecc.) | Meta-analisi di 217 studi (Uttal et al., 2013) | Effetto medio **g = 0,47**, stabile nel tempo, con trasferimento ad altri compiti spaziali non allenati. È uno dei risultati più solidi del settore. |
| **Memoria di lavoro (n-back, Cogmed)** | Meta-analisi (Au et al., 2014; Melby-Lervåg & Hulme, 2013/2016) | Forte miglioramento nei compiti allenati e in quelli simili. Il trasferimento all'intelligenza fluida è piccolo e contestato. |
| **Inibizione (go/no-go, stop-signal)** | Enge et al., 2014; meta-analisi 2023 sugli anziani | Si migliora nel compito allenato, ma nessuna differenza rispetto a un controllo attivo. Da usare come componente, non come esercizio a sé. |
| **Flessibilità (task switching)** | Studi su giovani e anziani (Karbach, Toovey 2021) | Riduce il "costo di cambio", anche in modalità non allenate. Gli anziani migliorano di più. |
| **Programmi commerciali in generale** | Revisione su *Psychological Science in the Public Interest* (Simons et al., 2016) | Ottime prove di miglioramento nel compito allenato, meno nei compiti vicini, poche nella vita quotidiana. Molti studi hanno controlli deboli. |
| **Approccio multidominio** | Trial FINGER (Finlandia) | L'allenamento cognitivo (10–15 minuti, 3 volte a settimana, su funzioni esecutive, memoria di lavoro, memoria episodica e velocità) dà benefici modesti se combinato con attività fisica, dieta e socialità. |

### Principi di progettazione che ne derivano

1. **Difficoltà adattiva per ogni esercizio.** È ciò che manca di più alla versione attuale ed è il motivo per cui sembra "banale". Tutti i programmi con risultati positivi (ACTIVE/UFOV, NeuroRacer, n-back, Cogmed) tengono il giocatore al limite delle sue capacità con una *staircase*: si sale dopo le risposte giuste e si scende dopo gli errori. Il livello va salvato tra una sessione e l'altra.
2. **Dare priorità a ciò che ha le prove migliori:** velocità di elaborazione e campo visivo (UFOV), multitasking, abilità spaziali, calcolo veloce con lettura ad alta voce (in linea con il metodo Kawashima).
3. **Distinguere misurazione e allenamento.** Il check quotidiano resta a difficoltà fissa, così i punteggi sono confrontabili nel tempo. La Palestra diventa adattiva.
4. **Varietà e programma.** Sessioni di 10–15 minuti, 3–5 giorni a settimana, con esercizi a rotazione su più domini e più spazio a quelli più deboli. Le sessioni di "richiamo" contano.
5. **Onestà.** Nessuna promessa medica. Spiegare cosa si allena e ricordare che attività fisica, sonno e vita sociale contano almeno quanto l'allenamento (FINGER).

## 2. Confronto con altri programmi

- **Brain Age (Nintendo):** calcoli a raffica, lettura ad alta voce, Stroop, conteggio sillabe, ordinamento di numeri, conteggio di persone che entrano ed escono da una casa (aggiornamento della memoria di lavoro), sottrazioni a catena. Riconoscimento della voce e della scrittura a mano. *Non lo copiamo:* ci prendiamo solo il principio scientifico, cioè compiti semplici eseguiti molto velocemente ogni giorno.
- **BrainHQ (Posit Science, il programma di ACTIVE):** Double Decision (UFOV con tempo di esposizione adattivo in millisecondi), Hawk Eye (bersaglio tra distrattori sempre più simili), Target Tracker (inseguimento di più oggetti), Freeze Frame (inibizione).
- **Creyos / Cambridge Brain Sciences (Owen e Hampshire):** 12 compiti in 4 domini: memoria a breve termine (Spatial Span, Token Search, Paired Associates, Number Ladder), ragionamento (Odd One Out, Spatial Planning, Rotations, Polygons), concentrazione (Double Trouble, Feature Match) e abilità verbale (Digit Span, Grammatical Reasoning). Sono pensati più per misurare che per allenare.
- **Lumosity, Peak, Elevate:** 25–40 giochi su memoria, attenzione, velocità, flessibilità, problem solving, linguaggio e calcolo. Sono forti su varietà e progressione, con prove scientifiche deboli.

## 3. Esercizi implementati (v0.2)

Otto domini, diciassette esercizi. Tutti tranne *Lettura veloce* hanno difficoltà adattiva e il livello si salva tra una sessione e l'altra.

| Dominio | Esercizio | Paradigma | Cosa si adatta |
|---|---|---|---|
| Velocità | **Colpo d'occhio** | UFOV, sul modello di Double Decision | Esposizione da 400 a 17 ms; distrattori periferici (0, 7, 15) |
| Velocità | **Riflesso a scelta** | Reazione a scelta su 4 pannelli + go/no-go | Finestra di risposta (1100 → 250 ms); segnali da ignorare dal livello 3 |
| Velocità | **Sentiero dei numeri** | Trail Making A/B | Numero di cerchi (10–24); forma alternata 1-A-2-B dal livello 4 |
| Attenzione | **Pilota** | Multitasking alla NeuroRacer: restare in strada + go/no-go sui segnali | Velocità, curve, frequenza e somiglianza dei segnali |
| Attenzione | **Radar** | Multiple Object Tracking | Bersagli (2–6) e velocità |
| Controllo | **Scontro di colori** | Stroop con regola che si inverte | Tempo limite (3000 → ~600 ms); seconda regola dal livello 3 |
| Controllo | **Doppia regola** | Task switching (pari/dispari ↔ minore/maggiore di 5) | Tempo limite, frequenza dei cambi; misura il costo di cambio |
| Memoria di lavoro | **Eco** | n-back singolo e duale (posizione + lettera con sintesi vocale) | N e modalità (1-back → 6-back ×2), regola 85% / 65% per blocco |
| Memoria di lavoro | **Griglia di luci** | Corsi in avanti e all'indietro | Lunghezza della sequenza (2–9) |
| Memoria di lavoro | **Ultime cifre** | Running span (aggiornamento) | Quante cifre finali ricordare (2–9) |
| Memoria | **Cassaforte di parole** | Riconoscimento vecchio/nuovo | Numero di parole (6–20) |
| Memoria | **Coppie** | Paired associates simbolo–parola | Numero di coppie (3–12) |
| Spaziale | **Rotazioni** | Rotazione mentale con figure chirali | Complessità (4–9 quadrati), tempo limite |
| Ragionamento | **Torri** | Torre di Londra | Mosse minime (2–8) |
| Ragionamento | **L'intruso** | Odd-one-out per forma, colore, riempimento e numero | Numero di figure e di caratteristiche che variano |
| Calcolo e lettura | **Sprint di calcolo** | Calcoli semplici a raffica (learning therapy) | Operazioni e grandezza dei numeri |
| Calcolo e lettura | **Lettura veloce** | Lettura ad alta voce + domanda di comprensione | — (parole al minuto) |

Differenze rispetto alla proposta iniziale:

- *Chi c'è?* è stato sostituito da **Ultime cifre** (running span): allena la stessa funzione (aggiornamento della memoria di lavoro) senza assomigliare a un minigioco esistente.
- **Lettura veloce** non usa il riconoscimento vocale del browser, perché in Chrome invia l'audio a server esterni. Usa invece il cronometro e una domanda di comprensione.
- **Sentiero dei numeri** resta in Palestra, in versione adattiva. Il check quotidiano ora usa Colpo d'occhio, Doppia regola, Griglia e Calcolo.

## 4. Struttura del gioco

- **Motore adattivo** (`src/adaptive.ts`): livello salvato per esercizio; dalla v0.3 è continuo e punta all'80% di successo (vedi sezione 5). Il punteggio della sessione dipende dal livello medio nella seconda metà della sessione.
- **Allenamento** (`src/stats.ts`): 4 esercizi presi dai 4 domini allenati meno di recente (a parità, quelli più deboli), fissi per tutta la giornata.
- **Misura il Neuro Score**: 4 prove a difficoltà fissa (velocità, controllo, memoria di lavoro, calcolo), Neuro Score 0–1000 confrontabile nel tempo.
- **Progressi**: grafico a radar degli 8 domini basato sui livelli raggiunti, andamento del Neuro Score, calendario, obiettivo di 4 giorni a settimana, livello e record per esercizio.
- **Perché funziona**: una scheda per ogni esercizio con il paradigma e lo studio di riferimento.
- **Accessibilità**: ritmo rilassato (tempi ×1,4), testo grande, tema scuro automatico, riduzione delle animazioni.

### Ancora da fare

- Modalità per daltonici (lo Stroop si basa sui colori: servirebbe una variante con forme o simboli).
- Più testi per *Lettura veloce* (oggi 6 per lingua).
- Calibrazione dei livelli con giocatori reali: le soglie sono stimate dalla letteratura e da prove interne.

## 5. Adattamento, istruzioni e motivazione (v0.3)

### Cosa dice la ricerca

| Tema | Prova | Conseguenza per il gioco |
|---|---|---|
| **Difficoltà ottimale** | *The Eighty Five Percent Rule for optimal learning* (Wilson, Shenhav, Straccia e Cohen, *Nature Communications* 2019): per compiti a scelta binaria si impara più in fretta con circa l'85% di risposte giuste. Gli autori sottolineano che conta l'esistenza di un "punto giusto" più del numero preciso. | Il motore punta all'80% sugli esercizi rapidi (prima era il 71%) e al 70% su quelli con poche prove lunghe. |
| **Algoritmo adattivo** | Metodo *weighted up-down* (Kaernbach, 1991): pesando diversamente il passo in salita e in discesa si può puntare a qualsiasi percentuale di successo, e ogni risposta sposta la difficoltà. | Livelli continui: dopo un errore si scende di 1, dopo una risposta giusta si sale di 1·(1−p)/p. |
| **Gamification** | Revisione sistematica (Lumsden et al., *JMIR Serious Games* 2016) e meta-analisi (Vermeir et al., 2020): gli elementi di gioco aumentano molto la motivazione (g = 0,72) ma non cambiano l'efficacia dell'allenamento. | XP, traguardi, serie e combo si aggiungono intorno agli esercizi senza modificarne il nucleo scientifico. |
| **Abbandono** | Negli allenamenti cognitivi a casa, dopo 12 settimane continua circa la metà delle persone; il successo nel gioco è uno dei predittori più forti di chi continua (studi su adesione con machine learning, PMC8680657). | Partenza facilitata, freno alla frustrazione, serie che perdona un giorno di riposo e promemoria nel calendario. |
| **Istruzioni** | Le prove d'esercizio non conteggiate sono la prassi nei protocolli cognitivi; capire bene il compito è necessario perché i dati (e l'allenamento) abbiano senso. | Esempio illustrato in ogni scheda e prova guidata di 2–6 tentativi, proposta automaticamente la prima volta. |

### Cosa è stato implementato

- **Motore adattivo v2** (`src/adaptive.ts`):
  - livelli continui con il metodo di Kaernbach e obiettivo all'80% o al 70%;
  - **partenza rapida**: finché non si sbaglia, ogni risposta giusta sale di un livello intero;
  - **freno alla frustrazione**: tre errori di fila fanno scendere di un livello in più;
  - **riscaldamento**: la sessione successiva parte mezzo livello sotto la soglia raggiunta, così si inizia con qualche successo;
  - **pausa lunga**: dopo più di 14 giorni senza giocare un esercizio si riparte un livello più in basso.
  Una simulazione con giocatori virtuali conferma una precisione media dell'81% (obiettivo 80%) e del 74% (obiettivo 70%).
- **Istruzioni con esempi**: ogni scheda mostra una piccola scena illustrata con la risposta giusta segnata e una frase d'esempio. La **prova guidata** non conta per livelli e record; in caso di errore ripropone l'esempio come suggerimento.
- **Durante il gioco**: contatore delle risposte giuste di fila (combo) con un suono che sale di tono, avvisi quando cambia il livello, vibrazione sul telefono.
- **Dopo il gioco**: messaggio che spiega il cambio di livello, grafico del livello nel tempo, punti XP con livello del giocatore, traguardi sbloccati.
- **Per tornare**: obiettivo settimanale (4 giorni), prossimo traguardo in home, 17 traguardi in totale, serie che perdona un giorno di riposo a settimana, promemoria giornaliero scaricabile per il calendario (file .ics, senza server e senza notifiche push).

## 6. Versione pubblica e privacy (v0.5)

- **Hosting**: la versione pubblica, gratuita e senza pubblicità, è su Cloudflare Pages con caricamento diretto (`npm run deploy:web`), così il repository resta privato. La copia privata sulla VPS (Tailscale) resta com'è.
- **Nessun dato personale sul server**: niente account né cookie; i progressi restano nel `localStorage`. *Esporta / Importa progressi* nelle Impostazioni permette di spostarli tra le due versioni, che hanno salvataggi separati perché sono su indirizzi diversi.
- **Font ospitati sul sito**: Nunito (licenza OFL) è servito da `public/fonts/`, per non inviare l'IP dei visitatori a Google (GDPR).
- **Statistiche**: solo nella build pubblica, Cloudflare Web Analytics, senza cookie e con soli dati aggregati.
- **Note legali**: schermata *Privacy e note legali* (da Impostazioni e dalla schermata di benvenuto) e pagina `privacy.html`, in italiano e inglese. Ribadiscono che il gioco non è un dispositivo medico e non promette effetti su salute o demenza, coerentemente con la sezione 1.
- **Sicurezza**: `public/_headers` imposta una Content Security Policy che consente solo il sito stesso e lo script delle statistiche; il service worker mette in cache solo i file del sito.

## 7. Lingue (v0.6)

- **12 lingue**, scelte tra le più parlate al mondo: inglese, spagnolo, cinese semplificato, hindi, arabo, portoghese, francese, russo, tedesco, giapponese, indonesiano e italiano. La prima visita è in inglese; il selettore in alto (benvenuto e home, oltre che nelle Impostazioni) salva la scelta nel `localStorage`.
- **Un file per lingua** (`src/locales/`), caricato solo quando serve: il gioco scarica circa 10 KB compressi per lingua invece di tutte insieme.
- **Esercizi adattati alla lingua**: parole di *Cassaforte* e *Coppie*, brani di *Lettura veloce*, colori di *Scontro di colori*. In *Eco* le 7 lettere sono scelte per essere ben distinguibili quando la sintesi vocale le pronuncia in quella lingua (in cinese numeri come 一 三 五, in giapponese katakana).
- **Lettura veloce in cinese e giapponese**: senza spazi tra le parole, la velocità si calcola dai caratteri (1,5 per parola in cinese, 2 in giapponese), così il punteggio resta confrontabile con le altre lingue.
- **Arabo da destra a sinistra**: l'interfaccia si specchia, ma gli esercizi spaziali mantengono la stessa disposizione, perché ne fa parte.
- Le traduzioni sono state scritte senza revisione madrelingua: conviene farle rileggere prima di promuovere il gioco in quei paesi.

## Fonti

- Edwards et al. (2017), ACTIVE 10 anni e demenza: <https://pmc.ncbi.nlm.nih.gov/articles/PMC5700828>; sintesi: <https://hscweb3.hsc.usf.edu/blog/2017/11/13/intervention-becomes-first-to-successfully-reduce-risk-of-dementia/>, <https://www.alzdiscovery.org/cognitive-vitality/blog/brain-training-can-reduce-dementia-risk>
- Simons et al. (2016), *Do "brain-training" programs work?*: <https://www.psychologicalscience.org/news/releases/brain-training-claims-not-backed-by-science-report-shows.html>, <https://news.illinois.edu/review-finds-little-evidence-that-brain-training-games-yield-real-world-benefits/>
- Nouchi et al. (2016), learning therapy (gruppo di Kawashima): <https://pmc.ncbi.nlm.nih.gov/articles/PMC4868921/>, <https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2016.00217/epub>
- Anguera et al. (2013), NeuroRacer: <https://pubmed.ncbi.nlm.nih.gov/24005416/>, <https://www.scientificamerican.com/article/computer-game-playing-shown-improve-multitasking-skills/>
- Au et al. (2014), n-back e intelligenza fluida, con le critiche: <https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2014.01589/pdf>, <https://gwern.net/DNB%20meta-analysis>
- Uttal et al. (2013), abilità spaziali: <https://pubmed.ncbi.nlm.nih.gov/22663761/>
- Cogmed e inibizione: <https://www.gbhi.org/news-publications/cogmed-cognitive-training-working-memory-systematic-review-and-meta-analysis>, <https://www.psychologie.uzh.ch/dam/jcr:67773a20-1148-44d5-a7e0-569a4504494c/Enge.JEPLMC.40.2014.pdf>, <https://frontiersin.org/articles/10.3389/fnins.2022.813975/full>
- Task switching e flessibilità: <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5701641/>, <https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2021.615518/pdf>
- Difficoltà adattiva: <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3990041/>
- FINGER: <https://mdedge.com/content/multidomain-intervention-may-improve-cognitive-function-people-risk-dementia>
- BrainHQ: <https://support.brainhq.com/hc/en-us/categories/360002071091-Exercises>, <https://www.bostonglobe.com/2022/07/10/metro/flex-your-brain-see-if-you-can-keep-up-with-these-interactive-exercises>
- Creyos (Cambridge Brain Sciences): <https://creyos.com/why-creyos/foundations>
- Brain Age, elenco dei minigiochi: <https://www.nintendolife.com/reviews/ds/dr_kawashimas_brain_training_how_old_is_your_brain>
- Wilson et al. (2019), *The Eighty Five Percent Rule for optimal learning*: <https://pmc.ncbi.nlm.nih.gov/articles/PMC6831579>
- Kaernbach (1991), weighted up-down: <https://auditory.org/postings/2009/409.html>
- Lumsden et al. (2016), gamification nei compiti cognitivi: <https://games.jmir.org/2016/2/e11/XML>; Vermeir et al. (2020), meta-analisi: <https://cris.maastrichtuniversity.nl/en/publications/the-effects-of-gamification-on-computerized-cognitive-training-sy/>
- Adesione all'allenamento cognitivo a casa: <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8680657/>, <https://pure.psu.edu/en/publications/comparing-the-effectiveness-of-two-theory-based-strategies-to-pro/>
