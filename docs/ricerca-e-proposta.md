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

- **Motore adattivo** (`src/adaptive.ts`): staircase con livello salvato per esercizio. In genere si sale dopo 2 risposte giuste di fila (circa 71% di successo); gli esercizi a prove lunghe salgono dopo 1. Il punteggio della sessione dipende dal livello medio nella seconda metà della sessione.
- **Allenamento di oggi** (`src/stats.ts`): 4 esercizi presi dai 4 domini allenati meno di recente (a parità, quelli più deboli), fissi per tutta la giornata.
- **Check quotidiano**: 4 prove a difficoltà fissa (velocità, controllo, memoria di lavoro, calcolo), Neuro Score 0–1000 confrontabile nel tempo.
- **Progressi**: grafico a radar degli 8 domini basato sui livelli raggiunti, andamento del Neuro Score, calendario, obiettivo di 4 giorni a settimana, livello e record per esercizio.
- **Perché funziona**: una scheda per ogni esercizio con il paradigma e lo studio di riferimento.
- **Accessibilità**: ritmo rilassato (tempi ×1,4), testo grande, tema scuro automatico, riduzione delle animazioni.

### Ancora da fare

- Modalità per daltonici (lo Stroop si basa sui colori: servirebbe una variante con forme o simboli).
- Più testi per *Lettura veloce* (oggi 6 per lingua).
- Calibrazione dei livelli con giocatori reali: le soglie sono stimate dalla letteratura e da prove interne.

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
