# Synapse Dojo · Basi Scientifiche, Paradigmi Cognitivi e Architettura

*Documentazione scientifica ufficiale e razionale neuropsicologico del programma di allenamento cognitivo e coordinazione bilaterale.*  
**Autore:** Sergio Dogliani · **Progetto:** [synapsedojo.com](https://synapsedojo.com) · **Licenza:** [PolyForm Noncommercial 1.0.0](../LICENSE)

> *Read this in [English](scientific-foundations.md).*

---

## 1. Lo Stato dell'Arte della Ricerca Cognitiva

La progettazione di **Synapse Dojo** nasce da una premessa di **onestà intellettuale e rigore metodologico**: distanziarsi dalle promesse ingannevoli e dal marketing pseudoscientifico che hanno caratterizzato la prima generazione di app commerciali di "brain training".

Come evidenziato dall'autorevole revisione della comunità scientifica internazionale (*Simons et al., 2016*, *Psychological Science in the Public Interest*), molti giochi cerebrali commerciali producono miglioramenti circoscritti al compito allenato o a compiti molto simili (*near transfer*), con evidenze deboli o assenti di trasferimento alle attività complesse della vita quotidiana (*far transfer*). Le meta-analisi sugli anziani sani confermano un quadro **modesto ma reale**: l'allenamento cognitivo computerizzato produce piccoli miglioramenti medi della prestazione cognitiva (*g* ≈ 0,22), diversi da dominio a dominio e maggiori quando la pratica è regolare e supervisionata (*Lampit et al., 2014*); la revisione Cochrane, limitata agli interventi di almeno 12 settimane, giudica la qualità complessiva delle prove ancora bassa (*Gates et al., 2020*).

Per questa ragione, Synapse Dojo non adotta compiti arbitrari o minigiochi di pura destrezza casuale, ma si ispira ai **paradigmi sperimentali più studiati della letteratura neuropsicologica**, dichiarando con chiarezza cosa le prove dimostrano e cosa no.

### Sintesi delle Evidenze Chiave

| Approccio & Paradigma | Studio e Fonte Principale | Cosa dicono le prove |
|---|---|---|
| **Velocità di elaborazione / Campo visivo utile (UFOV)** | Trial clinico ACTIVE: *Ball et al., 2002*; follow-up a 10 anni (*Edwards et al., 2017*); follow-up a 20 anni (*Coe et al., 2026*) | A 10 anni l'allenamento della velocità di elaborazione è stato associato a un **rischio di demenza inferiore del 29%** (HR 0,71; IC 95% 0,50–0,998), con un effetto dose-risposta (circa −10% per ogni sessione in più). A 20 anni, sui dati Medicare, il beneficio (circa **−25%** di diagnosi) è emerso **solo nel gruppo che aveva fatto anche le sessioni di richiamo (booster)**; gli allenamenti di memoria e ragionamento non hanno mostrato effetti. Si tratta di un'analisi secondaria su diagnosi amministrative: un risultato promettente, non una prova di prevenzione. |
| **Multitasking visuo-motorio continuo** | NeuroRacer, UCSF (*Anguera, Gazzaley et al., Nature 2013*) | Negli anziani (60–85 anni) l'allenamento adattivo al multitasking ha ridotto il costo di interferenza, con benefici mantenuti a 6 mesi e un trasferimento ad attenzione sostenuta e memoria di lavoro. Lo stesso approccio è alla base di EndeavorRx, il primo videogioco terapeutico autorizzato da FDA (2020) per l'ADHD pediatrico. |
| **Rotazione mentale e cognizione spaziale** | Meta-analisi di 217 studi (*Uttal et al., 2013*) | Effetto medio **g = 0,47**, robusto e duraturo, con trasferimento a compiti spaziali nuovi. |
| **Aritmetica veloce e lettura ad alta voce** | "Learning Therapy" (*Nouchi, Kawashima et al., 2016*) | In un RCT su 64 anziani sani, 6 mesi di lettura ad alta voce e calcoli semplici hanno migliorato inibizione, memoria episodica verbale, attenzione e velocità di elaborazione rispetto a un gruppo di controllo in lista d'attesa. |
| **Memoria di lavoro (N-Back duale e Span)** | Meta-analisi (*Au et al., 2015*; *Melby-Lervåg & Hulme, 2013*) | Miglioramenti affidabili sui compiti di memoria di lavoro allenati e simili (*near transfer*); il trasferimento all'intelligenza fluida è piccolo e controverso: Au et al. riportano un effetto modesto, Melby-Lervåg & Hulme nessun trasferimento lontano solido. |
| **Inibizione e controllo dell'interferenza (Stroop, Flanker, Go/No-Go, MSIT)** | *Stroop (1935)*, *Eriksen & Eriksen (1974)*, *MacLeod (1991)*, *Bush & Shin (2006)* | Paradigmi classici che misurano la capacità di sopprimere risposte automatiche e filtrare distrattori, con il coinvolgimento documentato della corteccia cingolata anteriore e prefrontale. Le prove che *allenarli* migliori l'inibizione in generale sono però scarse (*Enge et al., 2014*, risultato nullo nei giovani adulti): in Synapse Dojo servono soprattutto come esercizio e misura dell'attenzione selettiva. |
| **Flessibilità e Task Switching** | *Karbach & Kray (2009)*; *Toovey, Kattner & Schubert (2021)* | L'allenamento all'alternanza di regole riduce il costo di cambio anche negli anziani, con trasferimento a compiti di switching non allenati; il trasferimento lontano (inibizione, intelligenza) resta limitato. |
| **Coordinazione bimanuale e attraversamento mediano** | *Swinnen (2002)* | I movimenti bimanuali, soprattutto asimmetrici, richiedono l'integrazione tra emisferi tramite il corpo calloso e le aree motorie supplementari. Gli esercizi bilaterali di Synapse Dojo sono un'attività di coordinazione e attenzione: non esistono prove che un'app di questo tipo "rinforzi" il corpo calloso o la connettività cerebrale globale. |
| **Intervento multidominio e stile di vita** | Trial FINGER (*Ngandu et al., Lancet 2015*); US POINTER (*Baker et al., JAMA 2025*); Commissione Lancet (*Livingston et al., 2024*) | Gli interventi che combinano attività fisica, alimentazione, stimolazione cognitiva, socialità e controllo dei fattori di rischio vascolare migliorano la cognizione globale negli anziani a rischio. La Commissione Lancet stima che agire su 14 fattori di rischio modificabili (tra cui ipoacusia, ipertensione, inattività fisica, isolamento sociale, perdita della vista e colesterolo LDL alto) potrebbe prevenire o ritardare fino al 45% dei casi di demenza. L'allenamento cognitivo è un tassello, non un sostituto. |

---

## 2. Principi di Progettazione di Synapse Dojo

Dalle evidenze sopra descritte derivano i pilastri costruttivi della piattaforma:

1. **Difficoltà Adattiva Continua (tutti gli esercizi tranne Lettura veloce):**  
   Un esercizio troppo facile genera noia; uno troppo difficile genera frustrazione e abbandono. Synapse Dojo impiega uno *staircase* pesato (*weighted up-down*, Kaernbach 1991) che mantiene ogni utente vicino alla propria soglia: l'obiettivo di accuratezza è **80%** nella maggior parte degli esercizi, 85% in Colpo d'occhio e 70–75% nei compiti di memoria e pianificazione, dove ogni prova è più lunga e un errore pesa di più.
2. **Priorità ai Paradigmi a Più Alto Valore Trasferibile:**  
   Spazio centrale a velocità di elaborazione visiva periferica (UFOV), multitasking continuo, abilità spaziali di rotazione e memoria di lavoro.
3. **Separazione tra Misurazione e Allenamento:**  
   - Il **Neuro Score** quotidiano usa sempre lo stesso punto di partenza e una versione propria degli esercizi, spesso più breve, per seguire l'andamento nel tempo (punteggio 0–1000 su tutte le 9 aree).
   - L'**Allenamento Giornaliero** e la **Palestra** operano invece in modalità interamente adattiva per stimolare il potenziamento.
4. **Accessibile a Tutti, Anziani Compresi** (vedi §5).
5. **Onestà verso l'Utente:**  
   Synapse Dojo è uno strumento di svago attivo e stimolazione personale: non formula diagnosi mediche, non promette la cura o l'immunità da patologie neurodegenerative e ricorda sempre che lo stile di vita globale (movimento, sonno, socialità, udito e vista curati) è imprescindibile.
6. **Confronto Sociale che Non Scoraggia (classifica settimanale facoltativa):**
   Confrontarsi con gli altri è un motore potente (Festinger 1954) e gli elementi di gamification come le classifiche aumentano per lo più il coinvolgimento, con effetti che dipendono dal contesto e dalla persona (Hamari et al. 2014). Una classifica di abilità assoluta però dice alla maggior parte dei giocatori che stanno perdendo: mina il senso di competenza che tiene viva la motivazione intrinseca (Ryan & Deci 2000), e l'ansia che può generare sottrae le risorse attentive di cui la memoria di lavoro ha bisogno (Eysenck et al. 2007). Annullerebbe inoltre il design adattivo, che tiene ognuno alla *propria* soglia. Per questo la classifica è **disattivata di default** e premia **impegno e miglioramento, non il talento**: giorni di allenamento nella settimana, variazione di livello rispetto al proprio punto di partenza e livello migliore della settimana per esercizio, con fasce d'età facoltative e autodichiarate e una classifica separata per chi usa il ritmo rilassato. Il livello migliore è l'unica classifica di abilità, perciò si apre sulla fascia d'età del giocatore. **Si azzera ogni lunedì**, i pari merito condividono la posizione e ognuno vede la top 3 e le 5 persone subito sopra e sotto di sé: una gara abbastanza vicina da poterla vincere, mai un elenco di 100 nomi. La **costanza** dà 10 punti per ogni giorno di allenamento più 1 per ogni esercizio o Neuro check, fino a 12 al giorno: allenarsi di più conviene, ma distribuire l'allenamento nella settimana conta di più, in linea con l'effetto di spaziatura (Cepeda et al. 2006). Il **miglioramento** parte dal livello raggiunto prima della settimana (o dal livello iniziale per un esercizio nuovo), e il dato generale fa la media solo degli esercizi che hanno un livello precedente, così provarne di nuovi non penalizza mai; dopo una pausa di oltre 14 giorni il punto di partenza scende di un livello insieme al gioco, così chi torna non parte mai in perdita. La Home mostra la posizione solo nella metà alta della classifica e altrimenti quanti punti servono per salire: un riscontro che informa invece di giudicare (Ryan & Deci 2000). I **gruppi di amici** privati, a cui si entra con un link o un codice, avvicinano il confronto a persone simili a noi, quelle con cui ci si confronta più spontaneamente (ipotesi di similarità di Festinger, 1954). L'app ricorda ogni tanto che la classifica esiste, dicendo chiaramente che è facoltativa, e non lo ripropone più dopo «Non chiedermelo più».
7. **Condivisione che Non Diventa una Gara (schede facoltative):**
   Non conosciamo studi che misurino direttamente la condivisione dei risultati di un allenamento cognitivo, quindi questa scelta estrapola da altri campi. L'uso visibile diffonde prodotti (Aral & Walker 2011) e abitudini di esercizio (Aral & Nicolaides 2017), ma anche pubblicare segue l'apprendimento per ricompensa: si pubblica di più dopo molti like e di meno dopo pochi (Lindström et al. 2021), e questo potrebbe legare la motivazione al pubblico invece che all'attività. Inoltre gli stereotipi negativi sull'età peggiorano la prestazione cognitiva degli anziani (Lamont et al. 2015), quindi punteggi pubblici potrebbero danneggiare proprio chi il gioco vuole accogliere. Per questo si possono condividere **solo i giorni di allenamento della settimana e i badge di costanza ed esplorazione**, alla portata di tutti al proprio livello. Neuro Score, livelli, badge di prestazione e posizioni in classifica **restano privati**: il Neuro Score non è validato (§4) e una vetrina di punteggi alti riporterebbe il confronto assoluto che il punto 6 evita. L'app propone di condividere una volta per ogni badge ottenuto, solo nella schermata dei risultati e mai durante un esercizio, si può dirle di non proporlo più e condividere non dà XP. La scheda è disegnata sul dispositivo, non contiene nome, data, punteggi o età e dice che il gioco è per svago e non è uno strumento medico. Non è ancora stato misurato se porti davvero nuovi giocatori o quale effetto abbia su chi condivide.

---

## 3. Il Catalogo Completo dei 35 Esercizi (9 Domini)

L'applicazione organizza 35 compiti originali distribuiti su 9 domini cognitivi e motori:

```
                                  ┌─── ⚡ Velocità (4)
                                  ├─── 🎯 Attenzione (6)
                                  ├─── 🎛️ Controllo Esecutivo (3)
                                  ├─── 🧠 Memoria di Lavoro (4)
       Synapse Dojo (35 Esercizi) ├─── 🔐 Memoria Episodica (3)
                                  ├─── 🧊 Spaziale (2)
                                  ├─── 🧩 Ragionamento (3)
                                  ├─── ➗ Calcolo e Lettura (5)
                                  └─── 👐 Coordinazione Bilaterale (5)
```

Gli esercizi sono **ispirati** ai paradigmi indicati: si tratta di versioni brevi e ludiche, non dei test clinici standardizzati, e i loro punteggi non sono confrontabili con le norme cliniche.

### Tabella dei Paradigmi Sperimentali

| Dominio | Esercizio | Paradigma di riferimento | Parametri adattivi |
|---|---|---|---|
| **⚡ Velocità** | **Colpo d'occhio** | *Useful Field of View (UFOV)* / Double Decision (*Ball et al., 2002*) | Tempo di esposizione (700 ms → circa 48 ms, seguito da maschera), distrattori periferici che arrivano gradualmente (0, poi da 3 a 15). |
| **⚡ Velocità** | **Riflesso a scelta** | Tempo di reazione a scelta a 4 alternative + Go/No-Go | Finestra di risposta (1100 → 420 ms), stimoli da non toccare dal livello 3. |
| **⚡ Velocità** | **Sentiero dei numeri** | *Trail Making Test (TMT-A e TMT-B)* | Numero di bersagli (10–24), sequenza alternata 1 → A → 2 → B dal livello 4, con un tempo richiesto per elemento circa doppio rispetto ai soli numeri, come tra TMT-B e TMT-A. |
| **⚡ Velocità** | **Tempo di reazione** | Tempo di reazione semplice (SRT) con intervallo d'attesa variabile e rilevazione delle partenze anticipate | Soglia da battere (600 → 280 ms). |
| **🎯 Attenzione** | **Pilota** | Multitasking continuo alla *NeuroRacer* (*Anguera et al., 2013*) | Due livelli indipendenti, come in NeuroRacer. Guida: velocità e curvatura della strada, che anche al livello 1 piega oltre la corsia. Segnali: frequenza, tempo per rispondere (3,5 → 0,8 s), mostrato da un anello che si svuota attorno a ogni cartello e distrattori simili dal livello 5. Contano solo centri, omissioni e falsi allarmi. |
| **🎯 Attenzione** | **Radar** | *Multiple Object Tracking* (*Pylyshyn & Storm, 1988*) | Velocità e bersagli da seguire (2–6): quasi tutti i livelli alti restano a 4 bersagli, la capacità tipica, e alzano la velocità. |
| **🎯 Attenzione** | **Test di Flanker** | *Eriksen Flanker Task* | Tempo limite (1400 → 480 ms); metà delle prove sempre incongruenti, perché aumentarle riduce l'effetto di conflitto (*Bugg & Crump, 2012*). |
| **🎯 Attenzione** | **Go / No-Go** | Go/No-Go ispirato al *SART* (*Robertson et al., 1997*) | Tempo limite (850 → 330 ms); 20% di prove "stop" a ritmo veloce, le condizioni che attivano davvero l'impulso a rispondere (*Wessel, 2018*). |
| **🎯 Attenzione** | **Interferenza multipla** | *Multi-Source Interference Task* (*Bush & Shin, 2006*) | Prove di controllo ("1 0 0") e di interferenza ("2 1 1") in parti uguali; tempo limite (1800 → 560 ms). |
| **🎯 Attenzione** | **Colore e forma** | Ricerca visiva per congiunzione (*Treisman & Gelade, 1980*) | Numero di elementi (6–16) che condividono colore o forma col bersaglio e tempo per trovarlo (6 → 1,2 s). |
| **🎛️ Controllo** | **Scontro di colori** | *Stroop* (*Stroop, 1935*; *MacLeod, 1991*) | Tempo limite (3000 → circa 760 ms), regola alternativa "leggi la parola" che cresce gradualmente dal livello 3. |
| **🎛️ Controllo** | **Doppia regola** | *Task Switching* (*Monsell, 2003*) | Alternanza tra grandezza (< 5 / > 5) e parità; frequenza dei cambi (20 → 50%) e tempo limite; misura il costo di cambio. |
| **🎛️ Controllo** | **Ordinamento carte** | Ispirato al *Wisconsin Card Sorting Test* (*Grant & Berg, 1948*) | Scoperta del criterio (colore, forma, numero); il criterio cambia dopo 4 risposte corrette consecutive e non resta evidenziato a schermo; il cambio è segnalato fino al livello 5, poi va notato da soli, come nel test originale; tempo per carta (5,5 → 1,6 s). |
| **🧠 Memoria di lavoro** | **Eco** | *N-Back* singolo e duale (*Kirchner, 1958*; *Jaeggi et al., 2008*) | Da 1-back (sola posizione) a 6-back duale (posizione + lettera parlata e scritta), con rinforzo dopaminergico e micro-feedback zen sulle non-azioni corrette (*Correct Rejections* - *Green & Swets, 1966*; *Guitart-Masip et al., 2012*). |
| **🧠 Memoria di lavoro** | **Griglia di luci** | *Corsi Block-Tapping* (*Corsi, 1972*; *Kessels et al., 2000*) | Lunghezza della sequenza (2–9); dal livello 6 si alterna l'ordine inverso, alla stessa lunghezza, perché nel Corsi non è più difficile del diretto (*Kessels et al., 2008*); nel Neuro Score due tentativi per lunghezza, come nella procedura standard. |
| **🧠 Memoria di lavoro** | **Ultime cifre** | *Running Memory Span* (*Pollack et al., 1959*) | Cifre finali da ricordare (2–9) da un flusso di lunghezza imprevedibile. |
| **🧠 Memoria di lavoro** | **Span di cifre** | *Digit Span* diretto e inverso | Lunghezza della serie (3–9), ordine inverso (due cifre in meno) dal livello 7. |
| **🔐 Memoria** | **Cassaforte parole** | Riconoscimento vecchio/nuovo | Parole da studiare (6–20); il punteggio sottrae i falsi allarmi dalle risposte corrette. |
| **🔐 Memoria** | **Coppie** | Apprendimento di coppie associate (*paired associates*) simbolo–parola | Numero di coppie (3–12). Nel Neuro Score una lista fissa di 8 coppie, con punteggio corretto per le risposte date a caso. |
| **🔐 Memoria** | **Memoria delle storie** | Ispirato alla memoria logica di brevi racconti | Scene da tenere distinte (1–3), domande su cosa, dove e quando (2 o 3), pausa riempita da un compito distraente senza punteggio e al proprio ritmo (3–15 s); da due scene in su le risposte sbagliate includono dettagli di un'altra scena. |
| **🧊 Spaziale** | **Rotazioni** | Rotazione mentale (*Shepard & Metzler, 1971*), versione bidimensionale con polimini chirali | Numero di quadrati (4–9), rotazioni a passi di 30°, tempo limite (7,5 → 1,8 s). |
| **🧊 Spaziale** | **Matrice spaziale** | Memoria spaziale con trasformazione di coordinate | Blocchi da ricordare (2–6), griglia 3×3 e poi 4×4 agli ultimi livelli, rotazione (0°, 90°, 180°, poi casuale), tempo di studio (4,8 → 3,2 s). |
| **🧩 Ragionamento** | **Torri** | *Tower of London* (*Shallice, 1982*) | Mosse della soluzione più breve (2–8), che sono anche il massimo consentito. |
| **🧩 Ragionamento** | **L'intruso** | Odd-one-out per regole multidimensionali | Numero di figure (4–9) e caratteristiche irrilevanti che variano (1–3), in cui ogni valore compare su almeno due figure, così la soluzione è una sola. Dopo un errore il gioco indica la caratteristica che distingue la figura giusta. |
| **🧩 Ragionamento** | **Banco del mercato** | Problema dello zaino (*knapsack*; Murawski & Bossaerts, 2016) in un contesto quotidiano di costi e guadagni | Numero di prodotti (4–8) con budget pari a circa metà del costo totale; guadagno minimo da raggiungere, mostrato a schermo (90% → 100% dell'ottimo); dal livello 3 la scorciatoia di comprare per miglior guadagno a moneta non basta. L'incasso reale viene calcolato e svelato alla vendita con un'animazione e riscontro sonoro, premiando la stima euristica e impedendo di indovinare per tentativi casuali. Dopo un errore la scelta migliore resta evidenziata finché il giocatore non prosegue. |
| **➗ Calcolo e lettura** | **Sprint di calcolo** | Aritmetica mentale rapida (*Learning Therapy*, Kawashima) | Operazioni (+ − → × → ÷) e grandezza dei numeri, tabelline comprese. |
| **➗ Calcolo e lettura** | **Lettura veloce** | Lettura ad alta voce con domanda di comprensione | Non adattivo: parole al minuto e comprensione (la comprensione pesa più della velocità). Nel *Learning Therapy* lo scopo è leggere con regolarità, non affrontare testi sempre più difficili. |
| **➗ Calcolo e lettura** | **Calcolo con i punti** | *Approximate Number System* (*Halberda et al., 2008*) | Rapporto tra le due quantità (40 → 88%) e tempo di esposizione (1,5 → 0,8 s). |
| **➗ Calcolo e lettura** | **Anagrammi** | Accesso lessicale e memoria ortografica | Lunghezza della parola: da 4 a 8 lettere nella maggior parte delle lingue; dove le parole sono più corte ogni lingua usa la propria gamma (arabo 3–6, giapponese 2–5, cinese e hindi 2–4), e alcuni livelli condividono la stessa lunghezza. |
| **➗ Calcolo e lettura** | **Sprint di parole** | Classificazione ortografica rapida (la parola inizia con la lettera indicata?) | Tempo limite (2200 → 800 ms); solo iniziali con abbastanza parole, perché non si ripetano. Non è un test di fluenza verbale, che richiederebbe di produrre parole. |
| **👐 Coordinazione** | **Tap bilaterale** | Sequenze bimanuali guidate visivamente | Lunghezza della sequenza sinistra/destra (4–13) e tempo per tocco (1 → 0,39 s). |
| **👐 Coordinazione** | **Swipe bilaterale** | Coordinazione bimanuale simmetrica e asimmetrica (*Swinnen, 2002*) | Movimenti speculari, poi paralleli, poi indipendenti su assi diversi, dal più stabile al meno stabile; i due gesti devono avvenire insieme (scarto massimo 700 → 180 ms) entro un tempo limite (3 → 1,2 s) mostrato da una barra; col mouse, che fa un gesto alla volta, conta solo il tempo limite. |
| **👐 Coordinazione** | **Ritmo bilaterale** | *Sensorimotor Synchronization* (*Repp & Su, 2013*) | Precisione richiesta (±220 → ±50 ms) rispetto alla media personale degli ultimi tocchi, così contano la regolarità e non la latenza del dispositivo. Il tempo (67–130 BPM) resta fisso nella sessione. |
| **👐 Coordinazione** | **Movimenti incrociati** | Compatibilità stimolo-risposta spaziale (risposte ipsilaterali e controlaterali) | Tempo limite (1500 → 520 ms); prove "incrocia" e "stesso lato" in parti uguali. |
| **👐 Coordinazione** | **Dual-Task bilaterale** | Paradigma di doppio compito motorio-cognitivo | Tenere premuto con una mano per tutta la prova mentre l'altra giudica pari/dispari; tempo limite (4 → 0,8 s). |

---

## 4. Algoritmo Adattivo e Psicometria

### La Regola dell'85% (The Eighty Five Percent Rule)
*Wilson, Shenhav, Straccia & Cohen (Nature Communications, 2019)* hanno mostrato che, per molti algoritmi di apprendimento basati sul gradiente, la velocità di apprendimento è massima quando il tasso d'errore è circa **15,87%** (circa l'85% di accuratezza). È un risultato teorico, coerente con la pratica psicofisica di mantenere i compiti né troppo facili né troppo difficili. Synapse Dojo si colloca in questa zona (70–85% secondo l'esercizio), privilegiando accuratezze leggermente più alte nei compiti lunghi per proteggere la motivazione.

### Il Modello Matematico *Weighted Up-Down*
Synapse Dojo implementa una variante continua del metodo psicofisico di **Kaernbach (1991)**:

$$\Delta_{\text{up}} = \Delta_{\text{down}} \cdot \left(\frac{1 - p_{\text{target}}}{p_{\text{target}}}\right)$$

Per un obiettivo $p_{\text{target}} = 0,80$:
* In caso di **errore**: la difficoltà scende di $1,0$ livello.
* In caso di **risposta corretta**: la difficoltà sale di $0,25$ livelli.

#### Meccanismi di Controllo Implementati (`src/adaptive.ts`):
1. **Partenza Rapida (Fast Track)**: solo nella prima sessione di un esercizio e nel Neuro Score. Finché l'utente non sbaglia, ogni risposta corretta fa salire rapidamente; al primo errore si torna all'ultimo livello superato. Ripeterla a ogni sessione farebbe superare la soglia e terrebbe l'accuratezza sotto l'obiettivo.
2. **Freno alla Frustrazione**: tre errori consecutivi applicano una riduzione addizionale di un livello.
3. **Riscaldamento Iniziale (Warm-Up)**: ogni sessione parte un quarto di livello sotto la soglia stimata nella sessione precedente.
4. **Decadimento per Inattività**: se un esercizio non viene praticato per oltre 14 giorni, il livello di partenza scende di uno.
5. **Punteggio di sessione**: livello medio raggiunto nella seconda metà della sessione, ridotto se l'accuratezza è sotto l'obiettivo (conta la migliore tra quella della seconda metà e quella dell'intera sessione, così le risposte giuste seguite da errori sui livelli più alti non valgono zero). Chi sbaglia molto al livello più facile ottiene un punteggio basso invece del credito minimo.

### Il Neuro Score: Calcolo
Il **Neuro Score** (da 0 a 1000) è la **media dei punteggi 0–100** di 9 esercizi brevi, uno per area, **moltiplicata per 10**. Ogni esercizio parte sempre dallo stesso livello iniziale e converte la prestazione (soglia raggiunta, tempi di risposta o accuratezza) in 0–100 con scale lineari fissate per esercizio. In ogni esercizio una prestazione perfetta vale 100, qualunque sia il giorno: la salita rapida è dimensionata per coprire tutta la gamma nelle prove disponibili, e il bonus di velocità non si applica. Eco misura da 1-back a 3-back in due serie, Coppie usa una lista fissa.

La batteria **ruota ogni giorno** tra gli esercizi di ciascuna area, per varietà e per non allenare un unico compito. Di conseguenza due giorni consecutivi possono usare esercizi diversi. Le singole prove sono brevi: in simulazione la correlazione tra due prove dello stesso esercizio va da circa 0,2 a 0,85, quindi il Neuro Score va letto come **tendenza su più settimane**, non come misura esatta da confrontare giorno per giorno. Non è stato ancora validato su giocatori reali, non è un test clinico e non ha valore diagnostico.

La scala è stata ricalibrata nella versione 0.10: i risultati precedenti restano salvati, ma non vengono confrontati con quelli nuovi.

---

## 5. Calibrazione per Anziani e Persone con Difficoltà

Il programma deve essere fruibile anche da chi ha tempi di reazione più lenti, vista o udito ridotti o poca familiarità con il touch screen. Le scelte adottate:

* **Partenza facile e adattamento rapido**: gli esercizi a tempo partono dal livello più semplice e salgono solo se l'utente risponde bene; dopo tre errori di fila la difficoltà scende di due livelli.
* **Tempi di partenza generosi**: per esempio 600 ms di soglia nel Tempo di reazione (il tempo di reazione semplice di un anziano su touch screen, latenza dello schermo inclusa, è spesso 400–550 ms), 3 s nello Stroop, 4 s per il doppio compito, 7,6 s per una rotazione mentale, 5,5 s per carta nell'ordinamento.
* **Ritmo rilassato**: l'opzione nelle Impostazioni moltiplica per 1,4 le finestre di risposta e i tempi di presentazione, ed è considerata anche nel calcolo del Neuro Score. Fa eccezione l'esposizione di Colpo d'occhio, che è la grandezza misurata.
* **Scale del Neuro Score tarate sull'età avanzata**: il punteggio zero corrisponde a prestazioni lente ma plausibili (per esempio 4 s per numero nel Sentiero dei numeri, 8 s per calcolo, 3 s per risposta nello Stroop), così un anziano non ottiene zero solo perché è più lento di un giovane.
* **Compiti senza tempo** dove la velocità non è lo scopo (memoria, ragionamento, anagrammi): si risponde con calma. Il Neuro Score toglie anche il limite di tempo da Stroop, Doppia regola e Ordinamento carte, e misura la velocità di risposta.
* **Prova guidata** obbligatoria la prima volta, con suggerimenti dopo ogni errore e senza punteggio.
* **Feedback multisensoriale**: ✓/✗ grandi al centro, colori e suono; il nome dei colori è sempre scritto, per chi distingue male rosso e verde.
* **Testo grande** attivabile nelle Impostazioni e pulsanti ampi.
* **Lettere dell'N-Back** sia pronunciate sia scritte, per chi sente poco.

Chi ha disturbi cognitivi diagnosticati dovrebbe usare l'app solo come attività piacevole e confrontarsi con il proprio medico; i punteggi non sostituiscono una valutazione clinica.

---

## 6. Architettura Software, Privacy e Resilienza

Per garantire che la piattaforma rimanga uno strumento al servizio dell'utente e non delle logiche di profilazione pubblicitaria, l'architettura tecnica adotta requisiti stringenti:

1. **Client-Side First & Zero Cookie:**  
   L'intera applicazione viene eseguita localmente nel browser. Nessun dato personale, identificativo o statistica di prestazione viene trasmesso a server centrali. I dati sono conservati unicamente nel `localStorage` e possono essere esportati/importati dall'utente in qualsiasi momento in formato JSON aperto; i file importati vengono validati prima dell'uso. L'unica eccezione è la classifica settimanale facoltativa (punto 6).
2. **Framework-Free (Vanilla TypeScript):**  
   Nessuna dipendenza da framework UI. Il DOM è costruito tramite primitive dirette in TypeScript (nessun HTML generato da stringhe), con avvio istantaneo anche su dispositivi economici.
3. **Web Audio API e Sintesi Vocale:**  
   Gli effetti acustici sono generati in tempo reale con gli oscillatori della Web Audio API; la sintesi vocale multilingua usa l'API standard `window.speechSynthesis`, senza scaricare file audio.
4. **Supporto Offline e PWA:**  
   Un Service Worker leggero e un Web App Manifest rendono Synapse Dojo installabile e utilizzabile anche senza connessione.
5. **Sicurezza:**  
   Content Security Policy restrittiva, nessuno script di terze parti a parte il beacon opzionale e anonimo di Cloudflare Web Analytics e Cloudflare Turnstile, caricato solo quando qualcuno aderisce alla classifica.
6. **Classifica Facoltativa (Cloudflare Pages Functions + D1):**
   Chi aderisce riceve un identificativo casuale e un segreto (sul server se ne conserva solo l'hash SHA-256) e un nickname generato; nessun nome, email o account. Dopo ogni sessione l'app invia solo il riepilogo della settimana in corso. Il server conta da sé i giorni di allenamento in base alla data di arrivo dei risultati, così non si possono aggiungere giorni passati, verifica la plausibilità di ogni valore e accetta un invio ogni 30 secondi. Un Worker con cron notturno cancella le settimane più vecchie di 2, i giocatori inattivi da 30 giorni e chi non ha mai inviato risultati dopo 7 giorni; uscire cancella tutto subito. Il Service Worker non mette mai in cache l'API. La costanza conta le attività di ogni giorno: l'app comunica quante ne ha completate oggi e il server lascia crescere il conteggio di al massimo una al minuto dall'invio precedente. A parità di valore vince chi l'ha raggiunto per primo, perché ogni valore conserva l'ora in cui è cambiato l'ultima volta. I gruppi hanno un codice d'invito casuale di 10 caratteri (circa 50 bit); solo i membri possono leggere la classifica di un gruppo, il creatore può togliere o bannare i membri (il ban è legato all'identità anonima del giocatore, perciò il creatore può anche sostituire il codice d'invito), e un gruppo rimasto senza membri viene cancellato.

---

## 7. Bibliografia e Fonti Accademiche

**Evidenze generali sull'allenamento cognitivo**

1. Simons, D. J., et al. (2016). *Do "Brain-Training" Programs Work?* Psychological Science in the Public Interest, 17(3), 103-186. [DOI: 10.1177/1529100616661983](https://journals.sagepub.com/doi/10.1177/1529100616661983)
2. Lampit, A., Hallock, H., & Valenzuela, M. (2014). *Computerized cognitive training in cognitively healthy older adults: a systematic review and meta-analysis of effect modifiers.* PLOS Medicine, 11(11), e1001756. [DOI: 10.1371/journal.pmed.1001756](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1001756)
3. Gates, N. J., et al. (2020). *Computerised cognitive training for 12 or more weeks for maintaining cognitive function in cognitively healthy people in late life.* Cochrane Database of Systematic Reviews, CD012277. [PubMed: 32104914](https://pubmed.ncbi.nlm.nih.gov/32104914/)
4. Lumsden, J., et al. (2016). *Gamification of Cognitive Assessment and Cognitive Training: A Systematic Review of Applications and Efficacy.* JMIR Serious Games, 4(2), e11. [PMC4967181](https://pmc.ncbi.nlm.nih.gov/articles/PMC4967181/)

**Velocità di elaborazione e trial ACTIVE**

5. Ball, K., et al. (2002). *Effects of cognitive training interventions with older adults: a randomized controlled trial.* JAMA, 288(18), 2271-2281. [PubMed: 12425704](https://pubmed.ncbi.nlm.nih.gov/12425704/)
6. Edwards, J. D., et al. (2017). *Speed of processing training results in lower risk of dementia.* Alzheimer's & Dementia: Translational Research & Clinical Interventions, 3(4), 603-611. [PMC5700828](https://pmc.ncbi.nlm.nih.gov/articles/PMC5700828/)
7. Coe, N. B., et al. (2026). *Impact of cognitive training on claims-based diagnosed dementia over 20 years: evidence from the ACTIVE study.* Alzheimer's & Dementia: Translational Research & Clinical Interventions, 12, e70197. [DOI: 10.1002/trc2.70197](https://doi.org/10.1002/trc2.70197)

**Attenzione, multitasking e controllo**

8. Anguera, J. A., et al. (2013). *Video game training enhances cognitive control in older adults.* Nature, 501(7465), 97-101. [PubMed: 24005416](https://pubmed.ncbi.nlm.nih.gov/24005416/)
9. Pylyshyn, Z. W., & Storm, R. W. (1988). *Tracking multiple independent targets: evidence for a parallel tracking mechanism.* Spatial Vision, 3(3), 179-197. [PubMed: 3153671](https://pubmed.ncbi.nlm.nih.gov/3153671/)
10. Eriksen, B. A., & Eriksen, C. W. (1974). *Effects of noise letters upon the identification of a target letter in a nonsearch task.* Perception & Psychophysics, 16(1), 143-149. [DOI: 10.3758/BF03203267](https://link.springer.com/article/10.3758/BF03203267)
11. Stroop, J. R. (1935). *Studies of interference in serial verbal reactions.* Journal of Experimental Psychology, 18(6), 643-662. [DOI: 10.1037/h0054651](https://doi.org/10.1037/h0054651)
12. MacLeod, C. M. (1991). *Half a century of research on the Stroop effect: an integrative review.* Psychological Bulletin, 109(2), 163-203. [PubMed: 2034749](https://pubmed.ncbi.nlm.nih.gov/2034749/)
13. Bush, G., & Shin, L. M. (2006). *The Multi-Source Interference Task: an fMRI task that reliably activates the cingulo-frontal-parietal cognitive/attention network.* Nature Protocols, 1(1), 308-313. [PubMed: 17406250](https://pubmed.ncbi.nlm.nih.gov/17406250/)
14. Robertson, I. H., et al. (1997). *'Oops!': performance correlates of everyday attentional failures in traumatic brain injured and normal subjects.* Neuropsychologia, 35(6), 747-758. [PubMed: 9204482](https://pubmed.ncbi.nlm.nih.gov/9204482/)
15. Treisman, A. M., & Gelade, G. (1980). *A feature-integration theory of attention.* Cognitive Psychology, 12(1), 97-136. [PubMed: 7351125](https://pubmed.ncbi.nlm.nih.gov/7351125/)
16. Enge, S., et al. (2014). *No evidence for true training and transfer effects after inhibitory control training in young healthy adults.* Journal of Experimental Psychology: Learning, Memory, and Cognition, 40(4), 987-1001. [PubMed: 24707778](https://pubmed.ncbi.nlm.nih.gov/24707778/)
17. Monsell, S. (2003). *Task switching.* Trends in Cognitive Sciences, 7(3), 134-140. [PubMed: 12639695](https://pubmed.ncbi.nlm.nih.gov/12639695/)
18. Karbach, J., & Kray, J. (2009). *How useful is executive control training? Age differences in near and far transfer of task-switching training.* Developmental Science, 12(6), 978-990. [PubMed: 19840052](https://pubmed.ncbi.nlm.nih.gov/19840052/)
19. Toovey, B. R. W., Kattner, F., & Schubert, T. (2021). *Cross-modal transfer following auditory task-switching training in old adults.* Frontiers in Psychology, 12, 615518. [DOI: 10.3389/fpsyg.2021.615518](https://www.frontiersin.org/articles/10.3389/fpsyg.2021.615518/full)
20. Grant, D. A., & Berg, E. A. (1948). *A behavioral analysis of degree of reinforcement and ease of shifting to new responses in a Weigl-type card-sorting problem.* Journal of Experimental Psychology, 38(4), 404-411. [DOI: 10.1037/h0059831](https://doi.org/10.1037/h0059831)

**Memoria**

21. Kirchner, W. K. (1958). *Age differences in short-term retention of rapidly changing information.* Journal of Experimental Psychology, 55(4), 352-358. [PubMed: 13539317](https://pubmed.ncbi.nlm.nih.gov/13539317/)
22. Jaeggi, S. M., et al. (2008). *Improving fluid intelligence with training on working memory.* PNAS, 105(19), 6829-6833. [PubMed: 18443283](https://pubmed.ncbi.nlm.nih.gov/18443283/)
23. Au, J., et al. (2015). *Improving fluid intelligence with training on working memory: a meta-analysis.* Psychonomic Bulletin & Review, 22(2), 366-377. [PubMed: 25102926](https://pubmed.ncbi.nlm.nih.gov/25102926/)
24. Melby-Lervåg, M., & Hulme, C. (2013). *Is working memory training effective? A meta-analytic review.* Developmental Psychology, 49(2), 270-291. [PubMed: 22612437](https://pubmed.ncbi.nlm.nih.gov/22612437/)
25. Kessels, R. P. C., et al. (2000). *The Corsi Block-Tapping Task: standardization and normative data.* Applied Neuropsychology, 7(4), 252-258. [PubMed: 11296689](https://pubmed.ncbi.nlm.nih.gov/11296689/)
26. Pollack, I., Johnson, L. B., & Knaff, P. R. (1959). *Running memory span.* Journal of Experimental Psychology, 57(3), 137-146. [PubMed: 13641585](https://pubmed.ncbi.nlm.nih.gov/13641585/)

**Spazio, ragionamento, calcolo e lettura**

27. Shepard, R. N., & Metzler, J. (1971). *Mental rotation of three-dimensional objects.* Science, 171(3972), 701-703. [PubMed: 5540314](https://pubmed.ncbi.nlm.nih.gov/5540314/)
28. Uttal, D. H., et al. (2013). *The malleability of spatial skills: a meta-analysis of training studies.* Psychological Bulletin, 139(2), 352-402. [PubMed: 22663761](https://pubmed.ncbi.nlm.nih.gov/22663761/)
29. Shallice, T. (1982). *Specific impairments of planning.* Philosophical Transactions of the Royal Society of London B, 298(1089), 199-209. [PubMed: 6125971](https://pubmed.ncbi.nlm.nih.gov/6125971/)
30. Nouchi, R., et al. (2016). *Reading Aloud and Solving Simple Arithmetic Calculation Intervention (Learning Therapy) Improves Inhibition, Verbal Episodic Memory, Focus Attention and Processing Speed in Healthy Elderly People: Evidence from a Randomized Controlled Trial.* Frontiers in Human Neuroscience, 10, 217. [PMC4868921](https://pmc.ncbi.nlm.nih.gov/articles/PMC4868921/)
31. Halberda, J., Mazzocco, M. M. M., & Feigenson, L. (2008). *Individual differences in non-verbal number acuity correlate with maths achievement.* Nature, 455(7213), 665-668. [PubMed: 18776888](https://pubmed.ncbi.nlm.nih.gov/18776888/)

**Coordinazione e ritmo**

32. Swinnen, S. P. (2002). *Intermanual coordination: from behavioural principles to neural-network interactions.* Nature Reviews Neuroscience, 3(5), 348-359. [PubMed: 11988774](https://pubmed.ncbi.nlm.nih.gov/11988774/)
33. Repp, B. H., & Su, Y.-H. (2013). *Sensorimotor synchronization: a review of recent research (2006–2012).* Psychonomic Bulletin & Review, 20(3), 403-452. [PubMed: 23397235](https://pubmed.ncbi.nlm.nih.gov/23397235/)

**Psicometria adattiva**

34. Kaernbach, C. (1991). *Simple adaptive testing with the weighted up-down method.* Perception & Psychophysics, 49(3), 227-229. [DOI: 10.3758/BF03214307](https://link.springer.com/article/10.3758/BF03214307)
35. Wilson, R. C., Shenhav, A., Straccia, M., & Cohen, J. D. (2019). *The Eighty Five Percent Rule for optimal learning.* Nature Communications, 10, 4646. [PMC6831579](https://pmc.ncbi.nlm.nih.gov/articles/PMC6831579/)

**Stile di vita e prevenzione**

36. Ngandu, T., et al. (2015). *A 2 year multidomain intervention of diet, exercise, cognitive training, and vascular risk monitoring versus control to prevent cognitive decline in at-risk elderly people (FINGER): a randomised controlled trial.* The Lancet, 385(9984), 2255-2263. [PubMed: 25771249](https://pubmed.ncbi.nlm.nih.gov/25771249/)
37. Baker, L. D., et al. (2025). *Structured vs Self-Guided Multidomain Lifestyle Interventions for Global Cognitive Function: The US POINTER Randomized Clinical Trial.* JAMA. [DOI: 10.1001/jama.2025.12923](https://doi.org/10.1001/jama.2025.12923)
38. Livingston, G., et al. (2024). *Dementia prevention, intervention, and care: 2024 report of the Lancet standing Commission.* The Lancet, 404(10452), 572-628. [DOI: 10.1016/S0140-6736(24)01296-0](https://doi.org/10.1016/S0140-6736(24)01296-0)

**Motivazione e confronto sociale**

39. Festinger, L. (1954). *A theory of social comparison processes.* Human Relations, 7(2), 117-140. [DOI: 10.1177/001872675400700202](https://doi.org/10.1177/001872675400700202)
40. Ryan, R. M., & Deci, E. L. (2000). *Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being.* American Psychologist, 55(1), 68-78. [DOI: 10.1037/0003-066X.55.1.68](https://doi.org/10.1037/0003-066X.55.1.68)
41. Hamari, J., Koivisto, J., & Sarsa, H. (2014). *Does gamification work? A literature review of empirical studies on gamification.* 47th Hawaii International Conference on System Sciences, 3025-3034. [DOI: 10.1109/HICSS.2014.377](https://doi.org/10.1109/HICSS.2014.377)
42. Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). *Distributed practice in verbal recall tasks: A review and quantitative synthesis.* Psychological Bulletin, 132(3), 354-380. [DOI: 10.1037/0033-2909.132.3.354](https://doi.org/10.1037/0033-2909.132.3.354)
43. Eysenck, M. W., Derakshan, N., Santos, R., & Calvo, M. G. (2007). *Anxiety and cognitive performance: Attentional control theory.* Emotion, 7(2), 336-353. [DOI: 10.1037/1528-3542.7.2.336](https://doi.org/10.1037/1528-3542.7.2.336)
44. Murawski, C., & Bossaerts, P. (2016). *How humans solve complex problems: The case of the knapsack problem.* Scientific Reports, 6, 34851. [DOI: 10.1038/srep34851](https://doi.org/10.1038/srep34851)

**Taratura della difficoltà**

45. Kessels, R. P. C., van den Berg, E., Ruis, C., & Brands, A. M. A. (2008). *The backward span of the Corsi Block-Tapping Task and its association with the WAIS-III Digit Span.* Assessment, 15(4), 426-434. [DOI: 10.1177/1073191108315611](https://doi.org/10.1177/1073191108315611)
46. Wessel, J. R. (2018). *Prepotent motor activity and inhibitory control demands in different variants of the go/no-go paradigm.* Psychophysiology, 55(3), e12871. [DOI: 10.1111/psyp.12871](https://doi.org/10.1111/psyp.12871)
47. Bugg, J. M., & Crump, M. J. C. (2012). *In support of a distinction between voluntary and stimulus-driven control: a review of the literature on proportion congruent effects.* Frontiers in Psychology, 3, 367. [DOI: 10.3389/fpsyg.2012.00367](https://doi.org/10.3389/fpsyg.2012.00367)
48. Trick, L. M., Perl, T., & Sethi, N. (2005). *Age-related differences in multiple-object tracking.* The Journals of Gerontology: Series B, 60(2), P102-P105. [Abstract](https://psychsoc.gerontologyjournals.org/cgi/content/abstract/60/2/P102)
49. Franco, J. P., Yadav, N., Bossaerts, P., & Murawski, C. (2021). *Generic properties of a computational task predict human effort and performance.* Journal of Mathematical Psychology, 104, 102592. [DOI: 10.1016/j.jmp.2021.102592](https://doi.org/10.1016/j.jmp.2021.102592)
50. Repp, B. H. (2006). *Rate limits of sensorimotor synchronization.* Advances in Cognitive Psychology, 2(2-3). [DOAJ](https://doaj.org/article/dc3f29b3977e4adf8dfe9aa998eb40de)

**Condivisione e influenza sociale**

51. Aral, S., & Walker, D. (2011). *Creating social contagion through viral product design: a randomized trial of peer influence in networks.* Management Science, 57(9), 1623-1639. [DOI: 10.1287/mnsc.1110.1421](https://doi.org/10.1287/mnsc.1110.1421)
52. Aral, S., & Nicolaides, C. (2017). *Exercise contagion in a global social network.* Nature Communications, 8, 14753. [DOI: 10.1038/ncomms14753](https://doi.org/10.1038/ncomms14753)
53. Lindström, B., Bellander, M., Schultner, D. T., Chang, A., Tobler, P. N., & Amodio, D. M. (2021). *A computational reward learning account of social media engagement.* Nature Communications, 12, 1311. [DOI: 10.1038/s41467-020-19607-x](https://doi.org/10.1038/s41467-020-19607-x)
54. Lamont, R. A., Swift, H. J., & Abrams, D. (2015). *A review and meta-analysis of age-based stereotype threat: negative stereotypes, not facts, do the damage.* Psychology and Aging, 30(1), 180-193, corretto nel 2018. [DOI: 10.1037/a0038586](https://doi.org/10.1037/a0038586)
