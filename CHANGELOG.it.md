# Registro delle modifiche

> *Read this in [English](CHANGELOG.md).*

Qui sono elencate tutte le modifiche rilevanti a Synapse Dojo (chiamato Synapse Gym fino alla 0.6.0), dalla più recente. Il formato segue [Keep a Changelog](https://keepachangelog.com/it-IT/1.0.0/).

I numeri di versione vengono da `package.json` e ogni data è il giorno del commit che ha impostato quella versione. Un commit fatto dopo un cambio di versione è elencato sotto la versione successiva, la prima a includerlo. Il codice breve tra parentesi è il commit Git.

## [0.12.19] - 2026-11-07

### Modificato

- Decifra il Codice (`ex.crackTheCode`):
  - Sessione concentrata su un singolo enigma: ridotto il numero di schemi da 2 a 1 in modalità palestra (`ctx.count(1, 1, 1)`), rendendo ogni partita una sfida concisa e appagante da ~30–45 secondi che offre un gratificante rilascio di dopamina allo sblocco senza affaticamento cognitivo.
  - Curva d'ingresso graduale dal Livello 1 (`start: 1`): corretta la partenza impostata al livello 1 (invece di livello 2) e introdotta una progressione dolce con combinazioni a 2 cifre per i livelli 1–2, a 3 cifre per i livelli 3–5 e a 4 cifre per i livelli 6–8.
  - Deduzione guidata e accessibile: i livelli 1 e 3 includono 2 indizi di esclusione ("Nessuna cifra corretta", che eliminano subito candidati sulla striscia appunti) affiancati da indizi di posizione diretti, rendendo la deduzione intuitiva e gratificante fin dal primo approccio.
  - Istruzioni per gli appunti cifre: aggiunto un sottotitolo esplicativo (`· Tocca una cifra per eliminarla o segnarla`) visibile direttamente nell'intestazione degli appunti.

## [0.12.18] - 2026-11-07

### Modificato

- Decifra il Codice (`ex.crackTheCode`):
  - Calibrazione della durata della sessione: ridotto il numero di schemi da 3 a 2 in modalità palestra (`ctx.count(2, 1, 1)`), portando la durata complessiva a circa 60–80 secondi per evitare l'affaticamento cognitivo e allinearsi con gli altri giochi di ragionamento (come Nonogram e 2048).
  - Budget tentativi adattivo: numero di tentativi di sblocco calibrato sulla difficoltà del livello (`attemptsFor(level)`), con 6 tentativi al livello 1, 5 ai livelli 2–3 e 4 ai livelli superiori. Questo previene la frustrazione iniziale, favorisce l'esplorazione logica senza stress nei primi livelli e stringe gradualmente la sfida all'aumentare dell'abilità.
  - Banner esplicativo della regola di deduzione: aggiunto un banner ben visibile in cima al gioco (`💡 Ogni riga indica l’esatto numero di cifre presenti nel codice. Le altre sono escluse.`) che chiarisce senza equivoci l'esclusione delle cifre non menzionate.
  - Frasi degli indizi rese inequivocabili: riformulato il testo degli indizi in tutte le 12 lingue supportate (es. "Solo 1 cifra corretta...", "1 correct digit...", "Nur 1 richtige Ziffer...", ecc.) per rendere evidente il vincolo esatto ed eliminare qualsiasi percezione di dover andare a tentativi casuali.

## [0.12.17] - 2026-11-07

### Aggiunto

- Decifra il Codice (`ex.crackTheCode`):
  - Nuovo gioco di ragionamento deduttivo nell'area **Ragionamento**, ispirato ai classici enigmi a combinazione per lucchetti (Cognitive Train, Mastermind, Bulls & Cows).
  - Basi neuroscientifiche: allena la rete fronto-parietale sinistra e i gangli della base nella risoluzione di vincoli logici multipli e nel test di ipotesi (Prado et al., 2011; Goel, 2007), aggiorna attivamente la memoria di lavoro (Baddeley, 2000; Miyake et al., 2000) e rilascia una gratificazione dopaminergica nel nucleus accumbens al momento della scoperta ("esperienza Eureka"; Tik et al., 2018; Kounios & Beeman, 2014).
  - Soluzione unica garantita al 100%: generatore dinamico con risolutore esatto a soddisfazione di vincoli che assicura che ogni combinazione abbia una sola e unica soluzione valida, eliminando ogni frustrazione o ambiguità.
  - Lucchetto interattivo e taccuino appunti: cilindri combinatori (con supporto tastiera 0-9 e frecce direzionali), animazione dello sblocco del grillo con coriandoli e suoni meccanici, e striscia appunti interattiva (0-9) per barrare le cifre escluse ed evidenziare quelle confermate negli indizi.
  - Difficoltà adattiva continua: 8 livelli calibrati dall'algoritmo Kaernbach (1991) verso la soglia ottimale dell'80% di accuratezza (Wilson et al., 2019). Da combinazioni a 3 cifre con 5 indizi generosi fino a codici a 4 cifre con indizi stretti.
  - Durata bilanciata: 3 puzzle in modalità palestra (~60–90 secondi complessivi) e 1 prova rapida nel Neuro Score giornaliero.
  - Localizzazione nativa completa in tutte le 12 lingue supportate.
  - Sicurezza: sostituito Math.random con la Web Crypto API (`crypto.getRandomValues`) e rinominati gli identificatori della combinazione in Decifra il Codice (CWE-338), risolvendo l'avviso CodeQL #2 (`js/insecure-randomness`).

## [0.12.16] - 2026-11-07

### Modificato

- Nonogram (`ex.nonogram`):
  - Durata ottimizzata: sessione ridotta da 4 a 2 schemi (1 nel check giornaliero e in prova) per una durata ideale di ~60–90 secondi, eliminando il rischio di affaticamento e allineando l'esercizio al ritmo rapido e coinvolgente dell'app.
  - Correzione della validazione: rimossa la penalizzazione in `ctx.track` che contrassegnava come errati gli schemi risolti utilizzando gli aiuti; la vittoria viene ora riconosciuta sia per corrispondenza esatta sia per pieno soddisfacimento dei vincoli di riga e colonna.
  - Verifica non punitiva: il pulsante «Verifica» distingue gli schemi incompleti ma privi di errori (fornendo incoraggiamento positivo anziché feedback negativo) da quelli con celle effettivamente errate.
  - Tracciamento e trascinamento continui: pittura a pennello fluida su mouse e touch screen senza ripristini involontari o deviazioni spurie.
  - Correzione schema e anteprima: regolarizzato lo schema 4×4 `l1_window` in una finestra perfettamente simmetrica e corretto l'esempio visivo nella schermata guida.

## [0.12.15] - 2026-11-07

### Modificato

- 2048 (`ex.game2048`):
  - Architettura a schemi indipendenti e scala adattiva: ogni traguardo costituisce ora un puzzle a sé stante con generazione dinamica e scalata della difficoltà conforme alla staircase up-down di Kaernbach (1991).
  - Ricalibrazione della curva di difficoltà: avvio dolce dal livello 1 (obiettivo 16 anziché 64) per favorire l'apprendimento e il successo immediato, budget mosse ampliato a 35–60 mosse (rispetto alle 22 precedenti) e 3 annullamenti per puzzle.
  - Varietà organica dei puzzle: orientamento casuale nei 4 angoli della scacchiera e tessere secondarie dinamiche, azzerando la ripetizione statica del medesimo schema in caso di sconfitta.
  - Controllo rigoroso del tempo: partita strutturata su 3 schemi da circa 20–25 secondi ciascuno per una durata complessiva di ~60–80 secondi, allineata agli altri esercizi di ragionamento (Torri, Nonogram).

## [0.12.14] - 2026-11-07

### Modificato

- 2048 (`ex.game2048`):
  - Durata di gioco ribilanciata: ridotti i traguardi da 5 a 3 nella palestra/allenamento libero (2 nella batteria giornaliera, 1 in prova), portando la durata complessiva a ~60–90 secondi, perfettamente in linea con gli altri giochi del catalogo.
  - Motore di swipe iper-reattivo: i movimenti scorrono all'istante su `pointermove` non appena superata una soglia di soli 16px, senza attendere il sollevamento del dito (`pointerup`) ed eliminando ogni ritardo percepito.
  - Area di rilevamento estesa: il gesto di scorrimento viene intercettato su tutta l'area del tabellone di gioco, evitando scorrimenti persi ai bordi.
  - D-Pad a risposta istantanea: i pulsanti direzionali eseguono la mossa al primo tocco (`pointerdown`) con blocco della propagazione e animazione immediata.
  - Ottimizzazione del rendering DOM: le 16 celle 4×4 sono ora persistenti in memoria, evitando il reflow e la ricreazione dell'intero albero DOM a ogni mossa.
  - Gestione pulita degli ascoltatori da tastiera evitando accumuli tra un traguardo e l'altro.

## [0.12.13] - 2026-11-07

### Aggiunto

- Nonogram (`ex.nonogram`):
  - Introdotto il 37° esercizio di ginnastica cognitiva sotto il dominio *Abilità Spaziali* (`spatial`), portando a 3 gli esercizi dell'area spaziale per completare la rotazione quotidiana del Neuro Score.
  - Generati e matematicamente verificati 40 puzzle originali a soluzione deterministica unica, distribuiti su 8 livelli di difficoltà progressiva (da 4×4 a 7×7) e 100% risolvibili per linea pura senza ricorrere a tentativi ciechi (*Batenburg & Kosters, 2009*).
  - Pennellata continua touch/mouse (`pointerdown` e `pointerenter`) per tracciare rapidamente righe e blocchi di celle annerite senza clic ripetuti.
  - Doppia modalità operativa *Riempi* ed *Escludi* con scorciatoia immediata tramite tasto destro del mouse su desktop per posizionare crocette.
  - Indicatore visivo dinamico dei vincoli: numeri di riga e colonna soddisfatti evidenziati in verde tenue; pulsante *Verifica* non punitivo e sistema di *Aiuto* (💡) con animazione pulsante.
  - Funzione *Annulla* (↩) con stack completo delle azioni per consentire la sperimentazione logica e la pianificazione visuo-spaziale.
  - Chiusura gestaltica gratificante: all'ultimo tocco la griglia unifica i blocchi rivelando la pixel art con animazione pop elastica, fanfara audio armonica Web Audio API, coriandoli a schermo e badge col nome del soggetto.
  - Fondamenti neuroscientifici (tomografia discreta NP-completa, memoria di lavoro visuo-spaziale fronto-parietale e gratificazione dopaminergica "Aha!") documentati in `docs/basi-scientifiche.md`.
  - Localizzazione completa con 13 chiavi dedicate tradotte in tutte le 12 lingue supportate.

### Risolto

- 2048 (`ex.game2048`):
  - Integrati gli stili CSS completi per la scacchiera a griglia 4×4, slot delle celle vuote, tasselli colorati ad alto contrasto, animazioni di comparsa e pulsazione di fusione.
  - Riorganizzato l'HUD superiore con badge pill distinti per Obiettivo, Mosse (con avviso pulsante sotto le 5 mosse), Punteggio e pulsante Annulla.
  - Rifinito il D-Pad direzionale con pulsanti tattili ampi, feedback visivo alla pressione e perfetta compatibilità touch e desktop.

## [0.12.12] - 2026-11-07

### Aggiunto

- 2048 (`ex.game2048`):
  - Introdotto il 36° esercizio nel catalogo della palestra cognitiva sotto il dominio *Ragionamento e Pianificazione* (`reasoning`).
  - Struttura a traguardi progressivi (*milestone trials*) da 32 a 4096 ottimizzata per sessioni rapide da 60–120 secondi.
  - Difficoltà adattiva continua (*weighted up-down staircase*) con introduzione di blocchi ostacolo (`🪨`) ai livelli 8 e 10 per stimolare percorsi di scorrimento complessi.
  - Controlli accessibili per tutte le età: swipe/trascinamento, tastiera (frecce, WASD) e D-Pad tattile a schermo progettato per touchscreen e anziani, con funzione Annulla (↩).
  - Feedback sensoriale gratificante: scala musicale progressiva per le fusioni, animazioni di pulsazione, aptica e palette pastello ad alto contrasto.
  - Razionale neuroscientifico documentato in `docs/basi-scientifiche.md` e traduzione nativa completa in tutte le 12 lingue supportate.

## [0.12.11] - 2026-11-07

### Modificato

- Ordinamento di Carte (`ex.sorting`):
  - Riformulata la terminologia in tutte le 12 lingue supportate, eliminando la metafora astrusa del "cifrario/protocollo" («Cifrario segreto», «protocollo», «decodifica») a favore del linguaggio chiaro e naturale dell'ordinamento di carte («Regola segreta», «Carte di riferimento», «Carta da abbinare», «Progresso serie»).
  - Sostituita l'icona del lucchetto nel titolo con l'icona naturale della carta da gioco (`🃏`).

## [0.12.10] - 2026-11-07

### Modificato

- Torri di Londra (`ex.towers`):
  - Risolto lo scatto visivo e lo slittamento dei pulsanti dei paletti: struttura DOM persistente con alone di selezione `box-shadow` a zero reflow e solida base d'appoggio fisica (`.tower-base`).
  - Fisica fluida di volo e levitazione: risalita elastica della pallina con fluttuazione viva durante la presa, seguita da traiettoria di volo ad arco parabolico tra i paletti e assestamento al piazzamento.
  - Feedback d'errore localizzato: tentare di inserire una pallina su un paletto pieno attiva una vibrazione mirata unicamente su quel paletto, eliminando lo scuotimento violento dell'intero tabellone.
  - Rafforzamento multisensoriale: fruscio arioso alla presa, snap ligneo caldo al rilascio, cifre numeriche tabulari sul contatore e scintillio gratificante al completamento del puzzle.

## [0.12.9] - 2026-11-07

### Risolto

- Internazionalizzazione (i18n): verifica approfondita e copertura del 100% delle traduzioni in tutte le 12 lingue supportate (en, it, es, zh, hi, ar, pt, fr, ru, de, ja, id):
  - Banco del mercato (`ex.resources`): tradotte e integrate le 7 chiavi mancanti (`sell`, `targetGoal`, `tally`, `success`, `perfect`, `itemsCount`, `selectPrompt`) in tutte le 10 lingue che ne erano sprovviste.
  - Anagrammi e Torri di Hanoi: rimossi i tooltip hardcoded in italiano (`'Rimescola lettere'` e `'Annulla mossa'`), ora internazionalizzati tramite le nuove chiavi `ex.anagrams.scramble` e `ex.towers.undo` in tutte le 12 lingue.
  - Introdotto lo script di verifica automatica `npm run check:i18n` per garantire l'integrità strutturale continua, la parità delle chiavi e la coerenza dei parametri in tutte le lingue.

## [0.12.8] - 2026-11-07

### Modificato

- Colpo d'occhio (UFOV / Double Decision) e Radar (MOT):
  - Risoluzione del disallineamento al clic sul pulsante della stella: isolamento della centratura con `translate: -50% -50%` e animazione elastica dedicata `glance-pop`, eliminando qualsiasi salto spaziale durante il tocco.
  - Estetica radar avanzata: reticolo a cerchi concentrici radiali corrispondenti alla geometria effettiva degli anelli (24%, 42%, 50%) e assi mirino di precisione.
  - Stella luminescente dorata con bagliore bloom, feedback aptico e tattile istantaneo su pressione (`:active`) e alone verde smeraldo sulle scelte corrette.
  - MOT Radar: orbi tridimensionali con illuminazione sferica a gradiente radiale, aura luminosa per i bersagli in fase di memorizzazione, griglia sonar in background e segnalazione tratteggiata chiara dei bersagli mancati.
  - Sincronizzazione multisensoriale audio-visiva-aptica per stimolare il reward dopaminergico ed esaltare il *flow state*.

## [0.12.7] - 2026-11-07

### Modificato

- Eco (N-Back): ottimizzazione ergonomica della durata e del pacing per allineare l'esercizio alla media dell'applicazione (durata ridotta da ~3:00 min a ~1:30 min):
  - Calibrazione delle serie: lunghezza di ciascun blocco ridotta da 20+N a 14+N caselle (e 10+N nel Neuro Score rapido), preservando la sensibilità psicometrica e l'adattatività intra-sessione.
  - Pacing dinamico: finestra di risposta ridotta da 2200 ms a 1600 ms e tempo stimolo a 500 ms, eliminando i tempi morti e rendendo il ritmo stimolante e fluido come un rhythm game.
  - Range dichiarato aggiornato da `[2, 4]` a `[1, 2]` minuti.

## [0.12.6] - 2026-11-07

### Modificato

- Eco (N-Back): attivazione del banner di verdetto esplicito «✓ Corretto! (Nessun bersaglio)» e del bagliore verde a tutto schermo sulle non-azioni corrette (*Correct Rejections*). Rimosso l'occultamento della modalità *subtle* per garantire che l'utente riceva sempre una conferma chiara, inequivocabile e visibile del successo dell'inibizione motoria, accompagnata dal suono di successo e dall'incremento del combo.

## [0.12.5] - 2026-11-07

### Aggiunto

- Internazionalizzazione: traduzione nativa completa dell'esercizio riprogettato Ordinamento di Carte («Cifrario Segreto») in tutte le 12 lingue supportate (Italiano, Inglese, Spagnolo, Francese, Tedesco, Portoghese, Russo, Giapponese, Cinese, Arabo, Hindi e Indonesiano). Indicatori dell'HUD, indizi di deduzione logica, notifiche Eureka, stati dei protocolli e messaggi di combo sono ora localizzati al 100%.

## [0.12.4] - 2026-11-07

### Aggiunto

- Eco (N-Back): introdotto il sistema di micro-feedback visuo-acustico Zen per le non-azioni corrette (*Correct Rejections* - Signal Detection Theory, Green & Swets 1966), risolvendo l'asimmetria di feedback sul 70% dei turni non-bersaglio:
  - Convalida visiva con pulsazione verde smeraldo sul timer, bagliore morbido sulla griglia e sui pulsanti non premuti, e dicitura esplicativa di conferma (`✓ Nessun bersaglio: corretto non premere`).
  - Nuovo rintocco armonico rilassante `sfx.zen` su onda sinusoidale morbida intonata sulla scala pentatonica progressiva.
  - Progressione continua del moltiplicatore combo (`🔥 ×3`, `🔥 ×5`...) anche per l'autocontrollo e l'inibizione motoria, stimolando il circuito dopaminergico della ricompensa (Guitart-Masip et al., 2012) e proteggendo lo stato di flow.
  - Guida visiva aggiornata con chip zen `✓ ✋` nella schermata dimostrativa e localizzazione completa in tutte le 12 lingue.

## [0.12.3] - 2026-11-07

### Aggiunto

- Ordinamento di Carte: riprogettazione completa in chiave neuro-gaming («Cifrario Segreto») per eliminare la freddezza clinica e massimizzare motivazione intrinseca, rilascio dopaminergico e stato di flow:
  - Carte visivamente strutturate e tangibili con layout a pip simmetrici (1, 2, 3 o griglia 2x2) e animazioni fisiche d'ingresso.
  - Ricco comparto audio e feedback aptico (`sfx.whoosh` alla pescata, `sfx.clack` alla selezione, scala pentatonica armonica ascendente sulle combo, `sfx.sparkle` per la violazione del codice e `sfx.coins` per le deduzioni Eureka).
  - HUD deduttivo con 3 indicatori di frequenza (Colore, Forma, Quantità) per un testing di ipotesi non punitivo, con indizi informativi alla scoperta delle regole errate.
  - Evidenziazione automatica Eureka: non appena 2 dimensioni vengono escluse, il sistema mette in risalto il criterio dedotto con un bagliore dorato.
  - Indicatore di sequenza a 4 gemme (`[ ● ● ● ○ ]`) per una visualizzazione chiara e gratificante dell'avanzamento verso il completamento del codice.
  - Transizione emozionante al cambio di regola («Protocollo riallineato!») che celebra il codice risolto invece di punire il giocatore con errori inevitabili.
  - Curva temporale umana e bilanciata (da 5,5 s a 2,2 s) abbinata a bonus efficienza di velocità.

## [0.12.2] - 2026-11-07

### Risolto

- Audio: risolto il problema di saturazione della scala pentatonica per cui, eseguendo serie corrette lunghe, veniva ripetuto all'infinito il tono più acuto (`3135 Hz`). Sostituito con un sistema ciclico armonico a scaglioni (nel range confortevole 523 Hz – 1760 Hz per prevenire affaticamento uditivo) che arricchisce il suono con armoniche a più livelli, accordi di quinta ogni 5 risposte corrette e accordi maggiori trionfali ogni 10 traguardi consecutivi.

## [0.12.1] - 2026-11-07

### Risolto

- Sicurezza: eliminato il modulo bias nella generazione dei codici di invito dei gruppi (`newCode`), garantendo una distribuzione perfettamente uniforme tramite rejection sampling e risolvendo l'avviso CodeQL #1 (`js/biased-cryptographic-random`).

## [0.12.0] - 2026-11-06

### Aggiunto

- Grande aggiornamento al game-feel, reattività sensoriale e audio design su tutti gli esercizi per massimizzare il coinvolgimento e lo stato di flow:
  - Sentiero dei numeri: aggiunte linee laser dinamiche di collegamento progressivo fra i nodi (SVG glowing trails) e micro-pop animato ad ogni tocco corretto.
  - Torri di Londra: aggiunto il pulsante «Annulla» (Undo ↩) per ripristinare l'ultima mossa ed evitare fallimenti da tocco involontario prima del limite di mosse; nuovo effetto sonoro ligneo naturale per il movimento delle palline.
  - Anagrammi: aggiunto il pulsante «Rimescola» (Scramble 🔀) per riordinare visivamente le lettere disponibili; digitazione delle lettere con note musicali marimba ascendenti.
  - Sprint di parole: introdotta la possibilità di rispondere tramite swipe touch (verso destra per «Sì», verso sinistra per «No») con animazione tridimensionale di inclinazione della carta.
  - Griglia di luci: la sequenza di blocchi riproduce ora una melodia armoniosa pentatonica durante la memorizzazione e la digitazione.
  - Scontro di colori: effetto «Color Splash» con alone radiale luminoso del colore target ad ogni risposta esatta.
  - Rotazioni mentali: animazione «Snap Rotation» che fa ruotare e allineare visivamente la figura di test con la figura di riferimento al reveal della risposta.
  - Ritmo bilaterale e Tap bilaterale: integrazione di campionamenti percussivi armonici stile bongo/conga differenziati per lato sinistro (grave) e destro (acuto) e beat acustico per il metronomo.
  - Dual-Task bilaterale: animazione a reattore energetico pulsante per evidenziare la tenuta motoria isometrica continua.
  - Esplosione di coriandoli celebrativi nella schermata dei risultati quando si batte un record personale, si sblocca un badge o si ottiene un punteggio d'eccellenza (≥85).
  - Motore audio potenziato: risposte corrette con progressione pentatonica armonica ed errore sostituito da un morbido rintocco ligneo anziché un dente di sega gracchiante.

## [0.11.9] - 2026-11-06

### Modificato

- Banco del mercato: riprogettato per stimolare la stima euristica e il piacere di gioco. Rimosso completamente il timer e la barra del conto alla rovescia, allineandolo agli altri esercizi di ragionamento (Torri, L'intruso) dove si risponde con calma; costi e guadagni usano valori amichevoli (multipli di 5) per evitare calcoli noiosi a mente; la barra del guadagno viene svelata solo alla vendita con animazione progressiva e riscontro sonoro di monete (eliminando i tentativi casuali a raffica); aggiunto il riconoscimento speciale «Combinazione perfetta» per la soluzione ottima assoluta e time bonus positivo opzionale per risposte veloci.
- La conservazione dei risultati della classifica settimanale passa da 8 a 2 settimane: l'API e l'interfaccia non consentivano di consultare settimane precedenti e i miglioramenti sono calcolati localmente, quindi le settimane precedenti erano inutilizzate.
- La conservazione dei giocatori inattivi passa da 90 a 30 giorni. Chi attiva la classifica ma non invia mai risultati e non entra in gruppi viene cancellato dopo 7 giorni.
- Aggiornata l'informativa sulla privacy in tutte le lingue e la documentazione scientifica con i nuovi tempi di conservazione.

### Corretto

- L'eliminazione di un gruppo vuoto non rimuoveva i ban associati dal database D1: ora i ban orfani vengono rimossi automaticamente sia durante la pulizia notturna che all'uscita dell'ultimo membro o all'eliminazione dell'account.

## [0.11.8] - 2026-11-05

### Corretto

- Go/No-Go, Riflesso a scelta, Colore e Forma, Tap Bilaterale, Swipe Bilaterale, Dual-Task Bilaterale, Pilota e Torri mostravano «Risposta giusta:» davanti a frasi che non sono risposte, come «troppo lento» o «Tempo scaduto». Ora questi casi mostrano solo il motivo dell'errore. Le risposte vere restano come prima (`190e5dd`).

## [0.11.7] - 2026-11-05

### Modificato

- Nel Banco del mercato la barra del guadagno è viola finché non si raggiunge l'obiettivo, poi diventa verde e più spessa, con un segno di spunta e un bordo verde. Non si accende se il budget è sforato (`ae6e790`).
- Nel Tempo di reazione conta tutta l'area di gioco, non solo il riquadro (`ae6e790`).
- Il Neuro Score ha una nuova scala per la correzione qui sotto: i risultati precedenti restano salvati ma non vengono più confrontati (`ae6e790`).

### Corretto

- Il Tempo di reazione poteva giudicare lento un tocco fatto al momento giusto: il verde compariva con una dissolvenza di 150 ms e il cronometro partiva prima che fosse sullo schermo. Ora il verde appare di colpo e si misura dal verde visibile al tocco (`ae6e790`).
- Il Tempo di reazione e il Banco del mercato mostravano «Risposta giusta:» davanti al tempo del giocatore o al motivo dell'errore. Ora mostrano solo il motivo, per esempio il tempo e l'obiettivo mancato (`ae6e790`).
- Un esercizio poteva valere 0 pur con diverse risposte giuste, perché la precisione contava solo sulla seconda metà delle prove, le più difficili nel Neuro Score. Ora conta la migliore tra seconda metà e sessione intera. Vale per quasi tutti gli esercizi (`ae6e790`).

## [0.11.6] - 2026-11-05

### Rimosso

- La vibrazione e la relativa opzione nelle impostazioni. Dipendeva dal browser e dalle impostazioni del telefono: Firefox per Android non la supporta e Chrome per Android la scarta in silenzioso, quindi l'opzione poteva restare attiva senza effetto e l'app non poteva accorgersene. Allungare gli impulsi nella 0.11.5 non ha risolto il problema sul telefono dove era stato segnalato, e la causa indicata lì non era mai stata misurata. I salvataggi esistenti si caricano ancora (`f15dc31`).

## [0.11.5] - 2026-11-05

### Corretto

- La vibrazione si avvertiva appena, o per niente, su molti telefoni Android, perché gli impulsi duravano solo 12-30 ms. Ora partono da 40 ms, e attivando l'opzione nelle impostazioni il telefono vibra una volta come prova. Chrome per Android scarta comunque la vibrazione quando il telefono è in silenzioso, e l'app non può rilevarlo (`910df95`).

## [0.11.4] - 2026-11-05

### Modificato

- La guida ora mostra la durata di ogni esercizio come intervallo, per esempio ~1-2 min o ~3-5 min per il Banco del mercato, invece di valori come ~2.5 min. Gli intervalli sono stimati da prove e tempi degli esercizi, non cronometrati (`69fd9b3`).

## [0.11.3] - 2026-11-05

### Modificato

- L'allenamento giornaliero ora indica circa 10-15 minuti in home, nella pagina di benvenuto e nel README, nelle 12 lingue, invece di un valore calcolato come «circa 11 min», che sembrava un dato cronometrato (`504dcff`).

## [0.11.2] - 2026-11-05

### Corretto

- Home, pagina di benvenuto e FAQ dicevano che il Neuro Score dura circa 4 minuti, un valore che la 0.10.10 aveva riportato per errore anche in guida e FAQ. Ora dicono circa 10-15 minuti nelle 12 lingue: è una stima basata su prove e tempi degli esercizi, non un cronometraggio (`20c796a`).

## [0.11.1] - 2026-11-05

### Modificato

- Le schede condivise ora dicono cosa è stato fatto («Primo esercizio completato») invece di ripetere l'obiettivo del badge, e il pulsante della proposta nomina il badge, nelle 12 lingue (`e5cb5d4`).

### Corretto

- La scheda della settimana usava il plurale con un solo giorno di allenamento (`e5cb5d4`).
- Il dialogo di condivisione resta utilizzabile su browser vecchi, con un font lento o quando l'immagine non si crea: restano la condivisione del testo e la copia (`e5cb5d4`).

## [0.11.0] - 2026-11-05

### Aggiunto

- Condivisione facoltativa dei traguardi: un'immagine disegnata sul dispositivo per condividere i giorni di allenamento della settimana e i badge di costanza ed esplorazione, da Progressi o da una proposta dopo un nuovo badge, nelle 12 lingue. La scheda non contiene nome, data, punteggi o età. Neuro Score, livelli, badge di prestazione e posizioni in classifica restano privati, condividere non dà XP e le proposte si possono disattivare (`fac964f`).
- La documentazione scientifica spiega la scelta al §2.7; l'informativa sulla privacy e le FAQ della guida descrivono la funzione (`fac964f`).

## [0.10.10] - 2026-11-05

### Modificato

- I testi di app, guida, metadati delle pagine e README ora corrispondono alla documentazione scientifica, nelle 12 lingue. Il Neuro Score è descritto come tendenza su più settimane, non validata e non clinica; spariscono le affermazioni sulla neuroplasticità e sugli effetti su aree cerebrali; il badge «Basato su studi clinici» diventa «Ispirato alla ricerca». La scheda degli esercizi «Perché funziona» diventa «Su cosa si basa» (`3690f66`).

### Corretto

- Guida e FAQ davano al Neuro Score 15-20 minuti mentre la home ne indicava circa 4: ora dicono circa 4 (`3690f66`).
- Il README e la pagina senza JavaScript descrivevano Rotazioni come 3D, la pagina senza JavaScript usava ancora il vecchio nome di un gioco e il manifest diceva «open-source» anche se la licenza è source-available (`3690f66`).

## [0.10.9] - 2026-11-05

### Corretto

- Il Banco del mercato ora indica il vero motivo di ogni errore: riporta guadagno ottenuto, minimo e massimo possibile, e dice quando il tempo è scaduto o il budget è stato superato, nelle 12 lingue (`10103d4`).

## [0.10.8] - 2026-11-04

### Modificato

- Il Banco del mercato mostra il guadagno minimo da raggiungere, con un limite di tempo ampio e visibile perché non si possano provare tutte le combinazioni. Dopo un errore, soluzione e messaggio restano sullo schermo finché il giocatore non preme Continua (`c98966c`).

### Corretto

- La versione in Impostazioni era scritta a mano e ferma alla 0.9.6: ora viene letta da `package.json` (`c98966c`).

## [0.10.7] - 2026-11-04

### Corretto

- L'intruso non ha più più di una soluzione. Secondo il livello, dal 56% al 91% dei rompicapo aveva un'altra figura unica per qualche caratteristica, che però contava come errore. Ora ogni valore di una caratteristica che varia compare su almeno due figure (`9fc7818`).

### Modificato

- Dopo un errore, L'intruso indica la caratteristica che distingue la figura giusta, nelle 12 lingue (`9fc7818`).

## [0.10.6] - 2026-11-04

### Modificato

- Colore e Forma, Tap Bilaterale, Swipe Bilaterale e Dual-Task Bilaterale mostrano il limite di tempo con una barra e dicono quando è scaduto (`6b8329c`).
- Ritmo Bilaterale ha un indicatore con la zona valida e il punto dell'ultimo tocco, e spiega i battiti iniziali (`6b8329c`).
- Tap Bilaterale chiude il turno al primo tocco sbagliato (`6b8329c`).
- Swipe Bilaterale si può giocare col mouse, dove conta solo il limite di tempo, e spiega i comandi (`6b8329c`).
- Dopo un errore, il Banco del mercato evidenzia la scelta migliore (`6b8329c`).

## [0.10.5] - 2026-11-04

### Modificato

- La pausa di Memoria delle Storie ora segue il ritmo del giocatore: ogni numero resta finché non si risponde, una barra mostra il tempo rimasto e i pulsanti danno un riscontro. Prima i numeri cambiavano da soli ogni 1,2 secondi e l'ultimo poteva lampeggiare per una frazione di secondo (`863f6cd`).
- Il testo della pausa spiega, nelle 12 lingue, che non conta per il punteggio. La pausa rispetta il ritmo rilassato e accetta i tasti freccia (`863f6cd`).

## [0.10.4] - 2026-11-04

### Corretto

- La griglia di Eco non cambia più dimensione con la lettera: le tre righe hanno ora la stessa altezza (`41c276c`).

## [0.10.3] - 2026-11-04

### Modificato

- I cartelli di Pilota hanno un anello che si svuota e indica il tempo per rispondere, e diventa verde o rosso secondo l'esito. Il tempo va da 3,5 s a circa 0,8 s e scade mentre il cartello è ancora visibile. Un disco bianco stacca il cartello dal prato (`3bd7c20`).
- Le istruzioni di Pilota spiegano l'intervallo e i comandi nelle 12 lingue (`3bd7c20`).

### Corretto

- In Pilota un clic in ritardo non finisce più su un cartello appena comparso, e un doppio clic o la barra spaziatrice tenuta premuta contano come una sola pressione (`3bd7c20`).
- Con le frecce l'auto si ferma al rilascio del tasto. Una volta usate le frecce, il movimento del mouse non sterza più (`3bd7c20`).

## [0.10.2] - 2026-11-04

### Corretto

- Pilota non segnala più falsi errori sul segnale. Il controllo della strada scatta ogni 2 secondi, ma il messaggio parlava di un segnale in arrivo anche quando non ce n'era nessuno. Ora dice solo di restare sulla strada, in tutte le lingue, con una piccola nota invece della grande ✗ (`7db4702`).
- I segnali compaiono dal lato della strada in cui c'è spazio, così non finiscono fuori schermo (`7db4702`).
- Un tocco appena in ritardo su un segnale scaduto non conta più come errore, e il segnale scaduto sbiadisce (`7db4702`).

### Modificato

- In Pilota il segno ✓/✗ sparisce dopo 1,2 secondi. Il tempo per rispondere va da 2,6 s a 0,7 s e parte quando il segnale è visibile (`7db4702`).

## [0.10.1] - 2026-11-04

### Modificato

- Anagrammi passa a 5 livelli, così le lingue con 5 lunghezze disponibili non ne ripetono nessuna (`6c46139`).

### Corretto

- Le etichette di livello di Pilota, Colore e Forma e Tap Bilaterale usano il separatore decimale della lingua (`6c46139`).
- Nelle 12 lingue, la guida indica 15-20 minuti per il Neuro Score invece di 4-5, e le descrizioni di Memoria delle Storie, Colore e Forma e Tap Bilaterale spiegano scene, pausa e limite di tempo (`6c46139`).
- In russo e arabo, la domanda sul momento non presuppone più il genere del personaggio (`6c46139`).
- La documentazione scientifica riporta le lunghezze reali di Anagrammi (`6c46139`).

### Rimosso

- Il testo non più usato dell'obiettivo del Banco del mercato (`6c46139`).

## [0.10.0] - 2026-11-04

### Modificato

- **Motore adattivo:** la partenza rapida vale solo per la prima sessione e per il Neuro Score. Il primo errore riporta all'ultimo livello superato e il riscaldamento è di un quarto di livello (`b99a913`).
- **Neuro Score:** una prestazione perfetta vale 100 in ogni esercizio, senza bonus tempo. Eco misura da 1-back a 3-back e Coppie usa una lista fissa (`b99a913`).
- **Esercizi ridisegnati:** Ritmo Bilaterale, Pilota, Memoria delle Storie, Banco del mercato, Colore e Forma, Tap Bilaterale, Swipe Bilaterale, Dual-Task Bilaterale e Ordinamento di Carte (`b99a913`).
- Limiti di tempo e parametri degli altri esercizi ricalibrati sulla base della letteratura citata (`b99a913`).
- **Salvataggi:** i livelli a tempo vengono convertiti, gli esercizi ridisegnati si ricalibrano e i vecchi Neuro Score non vengono più confrontati (`b99a913`).
- Documentazione scientifica e README allineati al codice (`b99a913`).

## [0.9.6] - 2026-11-04

### Aggiunto

- Le finestre aperte e l'app installata si aggiornano da sole quando esce una nuova versione. Tornando in primo piano o in Home, l'app controlla al massimo ogni 10 minuti se il file principale online è cambiato. Si ricarica solo con la Home a schermo, mai durante un esercizio né mentre si scrive in un'altra schermata (`4e01d15`).

## [0.9.5] - 2026-11-04

### Aggiunto

- Il creatore di un gruppo può bannare un membro, che viene tolto e non può rientrare con il codice. Un elenco visibile solo al creatore permette di riammetterlo (`4532d62`).
- Il creatore può sostituire il codice d'invito: il vecchio codice e i link smettono di funzionare, i membri restano (`4532d62`).
- Pulsante per copiare il solo codice del gruppo (`4532d62`).
- Migrazione 0003. I ban si cancellano con i dati del giocatore e con la pulizia notturna, e l'informativa privacy è aggiornata (`4532d62`).
- `npm run check:anagrams` verifica le regole di Anagrammi sulle 12 lingue (`2fcf96e`).

### Corretto

- Anagrammi accetta tutti gli anagrammi validi in ogni lingua, grazie a una tabella per lingua con le altre parole valide formate dalle stesse lettere. Prima valeva solo la parola in lista: con O C U B la risposta CUBO era sbagliata perché in lista c'era BUCO (`2fcf96e`).
- In Anagrammi l'ordine iniziale delle tessere non è più una risposta valida. Non vengono più proposte parole con spazi o trattini, con lettere tutte uguali o di due lettere valide anche al contrario (`2fcf96e`).

## [0.9.4] - 2026-11-04

### Aggiunto

- Conferma "Salvato" dopo il cambio di fascia d'età nelle Impostazioni, in 12 lingue (`a7b9c45`).

### Modificato

- La pulizia della classifica passa a un nuovo Worker, `cleanup/` (`synapse-cleanup`), che gira ogni notte alle 03:00 UTC senza indirizzo pubblico e con un log delle righe cancellate. `npm run deploy` pubblica anche il Worker (`4b3407f`).

### Corretto

- La pulizia partiva a caso durante gli invii dei risultati, quindi senza invii non partiva mai e le scadenze dell'informativa privacy non erano garantite. La pulizia casuale è stata tolta da `submit` (`4b3407f`).
- Se il salvataggio della fascia d'età fallisce, il menu torna al valore precedente e mostra l'errore (`a7b9c45`).
- La pagina non torna più in cima dopo le azioni sulla classifica: fascia d'età, nuovo nickname, uscita (`a7b9c45`).

## [0.9.3] - 2026-11-04

### Aggiunto

- Ogni gruppo elenca i membri con nickname, creatore e costanza della settimana, compresi quelli che non si sono ancora allenati. L'elenco è visibile solo ai membri e usa una chiave per gruppo al posto dell'identificativo (`e286156`).
- Il creatore può togliere un membro, che può rientrare con il codice (`e286156`).

### Modificato

- Se il creatore esce o cancella i dati, il ruolo passa al membro più anziano (`e286156`).

### Corretto

- La pagina d'apertura indicava per il Neuro Score 3 minuti su 4 aree. Ora indica circa 4 minuti su tutte le 9 aree, come già la Home, in 12 lingue. In francese è stato corretto anche un "vos" rimasto (`289c682`).

## [0.9.2] - 2026-11-04

### Aggiunto

- Scheda sulla classifica settimanale facoltativa nella pagina d'apertura (`03cf5e9`).
- README (italiano e inglese): classifica e gruppi, privacy precisata (Turnstile solo all'adesione, Web Analytics senza cookie), struttura del progetto con API, migrazioni e `wrangler.toml`, comandi `dev:api` e `check:api`, configurazione una tantum per il deploy della classifica (`284f9f6`).
- Guida (12 lingue): scheda sulla classifica e sui gruppi. La FAQ sul tempo di allenamento rimanda ora alla formula della costanza (`284f9f6`).

### Modificato

- Il promemoria per aderire compare dal primo accesso, in cima alla Home. "Non ora" e "Non chiedermelo più" restano invariati (`03cf5e9`).
- Torri: il contatore indica le mosse massime e la prova finisce quando sono esaurite. Punteggio e livelli non cambiano (`03cf5e9`).
- "Gestione risorse" diventa "Banco del mercato": prodotti familiari, costi e guadagni in monete scritti per esteso, due barre di avanzamento ed esempio concreto. Logica, id e livelli salvati restano gli stessi (`03cf5e9`).
- Testi nelle 12 lingue, README e documentazione scientifica aggiornati (`03cf5e9`).

### Corretto

- Il Banco del mercato esclude i casi in cui tutti i prodotti stanno nel budget, e la carta selezionata è leggibile nel tema scuro (`03cf5e9`).
- La scheda Impostazioni della guida non cita più un tema ad alto contrasto, che non esiste (`284f9f6`).

## [0.9.1] - 2026-11-03

### Modificato

- Dopo una pausa di oltre 14 giorni, il punto di partenza del miglioramento scende di un livello insieme al gioco, così chi torna non parte in perdita. La soglia è condivisa in `adaptive.ts` (`a273820`).
- "Livello migliore", l'unica classifica di abilità, si apre sulla fascia d'età del giocatore. Senza fascia, invita a indicarla (`a273820`).
- Il riquadro in Home mostra la posizione solo nella metà alta, altrimenti i punti che mancano per salire: un riscontro informativo, non un giudizio (`a273820`).

### Corretto

- Documentazione scientifica: citazioni di Festinger e Hamari corrette e aggiunta una fonte su ansia e memoria di lavoro (Eysenck et al. 2007) (`a273820`).

## [0.9.0] - 2026-11-03

### Aggiunto

- Gruppi di amici: creazione, invito con link o codice, classifiche visibili solo ai membri ed eliminazione dei gruppi vuoti (`eba172f`).
- Promemoria in Home per chi non ha aderito, con "Non ora" e "Non chiedermelo più". L'invito al gruppo funziona anche per chi non ha ancora aderito (`eba172f`).
- Migrazione 0002, testi nelle 12 lingue, informativa privacy, documentazione scientifica e README aggiornati (`eba172f`).

### Modificato

- La costanza si conta a punti: 10 per giorno di allenamento più 1 per ogni esercizio o Neuro check, fino a 12 al giorno. Il server conta le attività del giorno e le lascia crescere al massimo di una al minuto (`eba172f`).
- Miglioramento: un esercizio nuovo parte dal livello iniziale, la media generale usa solo gli esercizi con un livello precedente e l'unico esercizio senza livelli usa le mediane (`eba172f`).
- I pareggi vanno a chi ha raggiunto il valore per primo, con un orario salvato per ogni metrica (`eba172f`).
- L'app chiede la classifica della settimana locale (`eba172f`).

## [0.8.0] - 2026-11-03

### Aggiunto

- Classifica settimanale facoltativa che premia costanza e miglioramento invece dell'abilità assoluta, per non scoraggiare chi parte da più indietro (`a78bc0f`):
  - **API** su Cloudflare Pages Functions con database D1 (`join`, `submit`, `board`, `me`): ID casuale e hash del segreto, nickname generato, giorni contati dal server, controlli di plausibilità, un invio ogni 30 secondi, pulizia dopo 8 settimane o 90 giorni di inattività e stessa posizione per i pari merito.
  - **Client:** il riepilogo della settimana viene inviato dopo ogni sessione e ritentato se si è offline. Il segreto non viene esportato né sovrascritto dalle importazioni, e il reset esce anche dalla classifica.
  - **Interfaccia:** sezione nelle Impostazioni con Turnstile caricato solo all'adesione, schermata con tre classifiche (costanza, miglioramento, livello migliore) e filtri per esercizio e fascia d'età, riquadro in Home.
  - **Strumenti:** il service worker non mette in cache `/api/`, la CSP ammette Turnstile, `/api` passa da un proxy in sviluppo, e sono stati aggiunti `check:api` e `dev:api`.
  - Testi e nickname nelle 12 lingue, informativa privacy, FAQ, documentazione scientifica e README aggiornati.
- `public/404.html`, così i file mancanti ricevono un vero 404 e una pagina leggibile (`be484fb`).

### Modificato

- `wrangler.toml` punta al database D1 `synapse-board`. Lo script di deploy applica le migrazioni in sospeso prima di pubblicare e avvisa se manca `VITE_TURNSTILE_SITE_KEY`, senza la quale nessuno potrebbe aderire (`875aafd`).

### Corretto

- Le pagine aperte prima di un deploy non riuscivano a caricare una lingua e tornavano in silenzio all'inglese. Se una traduzione non si carica ed è online, l'app ora salva la scelta e ricarica una volta, con una protezione contro i cicli di ricarica (`be484fb`).
- Il service worker non salva più in cache pagine HTML al posto di script o stili. La cache v2 scarta le copie sbagliate salvate dalle versioni precedenti (`be484fb`).
- In sei lingue (arabo, tedesco, hindi, indonesiano, giapponese, russo) la pagina d'accoglienza e la guida indicavano ancora 17 esercizi e 8 aree invece di 35 e 9. Corrette 30 frasi e un commento in `progress.ts` (`b5ef2e5`).
- Corretti i conteggi rimasti nei traguardi: "Esploratore" da 17 a 35 esercizi (arabo, giapponese), "Equilibrato" da 8 a 9 abilità (arabo, hindi, indonesiano, giapponese, cinese). Nella pagina d'accoglienza araba, "otto" scritto in lettere è diventato "nove" in due frasi (`7cc6d81`).

## [0.7.0] - 2026-11-03

Questa versione raccoglie tutto il lavoro successivo alla 0.6.0, compresi il cambio di nome in Synapse Dojo e il passaggio da 17 a 35 esercizi.

### Aggiunto

- 18 nuovi esercizi cognitivi e bilaterali, localizzati in 12 lingue (`b52de91`).
- Intestazione adatta ai dispositivi mobili, pagina d'accoglienza più coinvolgente, guida ai giochi, SEO (`robots.txt`, `sitemap.xml`) e traduzioni dei nuovi contenuti (`addc108`).
- Ordinamento di Carte: timer adattivo per carta e bonus per la velocità di elaborazione (`e151cd2`).
- Esercizi bilaterali: pieno supporto per computer e dispositivi mobili con clic del mouse, scorciatoie da tastiera e gesti touch (`ac6921d`).
- Neuro Score: controllo giornaliero completo su 9 domini, con esercizi che ruotano ogni giorno (`a8e0370`).
- Bonus velocità per i punti esperienza e bonus del tempo di risposta per il punteggio negli esercizi (`7527e14`).
- Più storie, brani di lettura e vocaboli (`cfaf408`).
- Dati nativi con 24 scenari di Memoria delle Storie per le lingue rimanenti (`f950521`).
- Pagina dedicata alla licenza con link nella navigazione (`95cbe77`) e testo della licenza localizzato in 12 lingue (`a15b133`).
- Riferimenti e link al repository GitHub in tutto il sito (`8348371`).
- Versioni inglesi del README e della documentazione scientifica (`db162f3`).
- Configurazione di avvio `preview` per provare la build di produzione (`fb04396`).

### Modificato

- **Progetto rinominato in Synapse Dojo** in tutte le lingue (`941b87b`), con URL canonici e sitemap spostati su synapsedojo.com (`e6230ff`).
- **Licenza cambiata in PolyForm Noncommercial 1.0.0** per protezione dall'uso commerciale (`ce8f59b`).
- **Serve Node 22.12.0 o superiore.** Vite 5.4.21 → 8.3.5 e TypeScript 5.6.3 → 7.0.2, che risolvono due avvisi di sicurezza sul dev server di Vite 5 e portano a 0 vulnerabilità npm. In `vite.config.ts`, `rollupOptions` è diventato `rolldownOptions` (`fb04396`).
- Calibrazione per anziani: soglia iniziale del tempo di reazione a 600 ms, scale del Neuro Score più tolleranti e rispettose del ritmo rilassato, Movimenti Incrociati e Sprint di Parole che partono dal livello più facile (`e64b8b6`).
- Difficoltà della memoria di lavoro ricalibrata: le sequenze all'indietro passano ai livelli avanzati (`c09d22f`).
- Gli allenamenti giornalieri ruotano domini ed esercizi in ordine cronologico, così quelli ripetuti coprono tutte le 9 aree (`616eafe`).
- Metatag, SEO e catalogo aggiornati a 35 giochi in `index.html` e `guide.html` (`61d07f3`).
- README riscritto con l'architettura completa e il Neuro Score a 9 domini, sezione deploy riordinata (`25b0b4f`).
- Documentazione scientifica rinnovata per 35 esercizi e 9 domini, con bibliografia completa (`e8b60ce`), e spostata da `docs/ricerca-e-proposta.md` a `docs/basi-scientifiche.md` (`74ed7ee`).
- Documentazione scientifica allineata al codice e alla letteratura. Corrette citazioni errate (Enge 2014, Au 2015, Lumsden 2016, Nouchi 2016) e affermazioni eccessive. Aggiunti ACTIVE a 20 anni, Lampit 2014, Cochrane 2020, US POINTER, la Commissione Lancet 2024, i paradigmi originali e una sezione sulla calibrazione per anziani (`e64b8b6`).
- Versione portata a 0.7.0 (`c7af6ae`).

### Rimosso

- Configurazioni di deploy per VPS/Tailscale e GitHub Pages (`13d49f2`).
- Link al repository GitHub dalle schermate per gli utenti (`30f9115`). I link sono tornati più avanti nella stessa versione (`8348371`).

### Corretto

- Ordinamento di Carte: regole più chiare, generazione degli stimoli, riscontri dinamici e layout (`6ea6ae4`). Eliminata la componente di fortuna con il tracciamento razionale delle ipotesi e la loro eliminazione visiva, con penalità solo per la perseverazione (`32244e7`).
- Ritmo e difficoltà di Calcolo con i Punti e Matrice Spaziale regolati, controlli di Sprint di Parole centrati e rimosso il messaggio di aiuto doppio durante la pratica (`4a87b10`).
- Matrice Spaziale: celle quadrate rigide 1:1, senza distorsioni alla selezione (`9d2bb0e`).
- Dual-Task Bilaterale: difficoltà bilanciata, tempi più lunghi, migliore tenuta multi-touch e comandi da tastiera su PC (`eb3b6ab`).
- Ritmo Bilaterale: battito con tick e impulso visivo, tocchi valutati sul battito più vicino (`e64b8b6`).
- MSIT: prove di controllo ("1 0 0") e di interferenza come nel paradigma originale (`e64b8b6`).
- Tempo di Reazione: niente più promesse rifiutate non gestite durante l'attesa (`e64b8b6`).
- Listener da tastiera rimossi anche quando si esce (Flanker, Go/No-Go, MSIT, Dual-Task Bilaterale) (`e64b8b6`).
- Dual-Task Bilaterale: la presa deve durare tutta la prova, e il testo italiano fisso è stato rimosso (`e64b8b6`).
- Le pause non sovrascrivono più il tempo di risposta usato per il bonus velocità (`e64b8b6`).
- Radar non si blocca più su schermi piccoli. Griglia di luci non ha ripetizioni e offre due tentativi per lunghezza (`e64b8b6`).
- Etichette di livello coerenti e localizzabili, e Lettura veloce non premia più chi salta il testo (`e64b8b6`).
- Localizzazione completata nelle 12 lingue, con piena parità di contenuti (`0b6d720`, `18567d9`, `bd836b9`):
  - Le scene d'esempio delle schede introduttive non contengono più testo italiano fisso.
  - Gli esercizi bilaterali usano le frecce ◀ ▶ al posto delle lettere inglesi L/R.
  - In arabo (da destra a sinistra), i controlli con un lato fisico (mano, tasti freccia) restano a sinistra o a destra.
  - Anagrammi tratta le lettere come grafemi con `Intl.Segmenter`, così l'hindi non separa le vocali, e le lingue a parole brevi come il cinese usano la lunghezza più vicina disponibile.
  - Decimali e date seguono la lingua, sempre con cifre latine.
  - In arabo è stato aggiunto `{best}` nel risultato del Tempo di Reazione, in hindi è stato tolto "(Even)/(Odd)" e nella lista inglese una parola duplicata.
  - Spiegazioni di Sprint di Parole e Calcolo con i Punti corrette in tutte le lingue.
  - `tsconfig` usa i tipi ES2022 per `Intl.Segmenter`, mentre il target resta ES2020.
- Nome dell'autore corretto in Sergio Dogliani (`39dec0c`).

### Sicurezza

- Nessun `innerHTML` e validazione più stretta dei salvataggi importati (`e64b8b6`).
- Escape RFC 5545 nel promemoria `.ics` e no-cache per `/license` (`e64b8b6`).
- Patch di sicurezza con Vite 5.4.21 e Wrangler 4.156.2, seguite dall'aggiornamento a Vite 8 indicato sopra (`e64b8b6`, `fb04396`).

## [0.6.0] - 2026-10-31

### Aggiunto

- 12 lingue: inglese, spagnolo, cinese, hindi, arabo, portoghese, francese, russo, tedesco, giapponese, indonesiano e italiano. C'è un file per lingua in `src/locales`, caricato su richiesta, con l'inglese incluso come riserva (`7a05fbc`).
- Menu della lingua in cima alle schermate di benvenuto e Home, nella pagina della privacy e nelle Impostazioni (`7a05fbc`).
- Lettere e voce di Eco per ogni lingua, e Lettura veloce conta i caratteri in cinese e giapponese (`7a05fbc`).
- Layout da destra a sinistra per l'arabo, con gli esercizi che mantengono la disposizione spaziale (`7a05fbc`).
- Sottoinsieme cirillico di Nunito ospitato in proprio (`7a05fbc`).

### Modificato

- La prima visita è in inglese. La scelta viene salvata e ripristinata alla visita successiva (`7a05fbc`).
- Impostato il contatto mostrato nella pagina della privacy (`2e3f72b`).

## [0.5.0] - 2026-10-31

### Aggiunto

- Pubblicazione su Cloudflare Pages: `deploy:web` carica direttamente `dist/` (`150bbcc`).
- Schermata di privacy e note legali (Impostazioni, primo accesso) e `privacy.html` statica, in italiano e inglese (`150bbcc`).
- Cloudflare Web Analytics solo nella build web (`150bbcc`).
- Esportazione e importazione dei progressi in JSON, con validazione e conferma prima di sostituirli (`150bbcc`).
- `public/_headers` con CSP e intestazioni di sicurezza e cache (`150bbcc`).
- Eco: esempio animato di 1-back sulla scheda introduttiva, striscia di memoria nella pratica guidata che evidenzia l'elemento da confrontare e scheda che spiega la modalità doppia la prima volta che compaiono le lettere (`5920667`).
- Eco: schede di apertura e chiusura per ogni serie, contatore dei turni e barra del tempo per ogni quadrato (`8456eb8`).

### Modificato

- Nunito ospitato in proprio (latin e latin-ext), senza più richieste a Google Fonts (`150bbcc`).
- Il service worker mette in cache solo le richieste della stessa origine, con un nuovo nome di cache (`150bbcc`).
- Schermata di studio di Coppie: ogni coppia è una carta collegata in una sola colonna, titolo e suggerimento spiegano che dopo si vedrà solo il simbolo, e il conto alla rovescia è in secondi e si riflette nella barra di avanzamento (`da615dd`).
- Eco: descrizione più semplice e singolare corretto per 1-back (`5920667`).
- Eco: una pressione viene valutata subito e un abbinamento mancato viene segnalato alla fine dello stesso turno. Ogni serie ha almeno il 20% di abbinamenti, con un minimo di 2 (`8456eb8`).
- Eco doppio: la pratica guidata segue il livello del giocatore, così si può provare anche la modalità doppia (`ad68b5e`).

### Corretto

- Eco doppio: lettere scelte perché i nomi pronunciati non si somiglino, con insiemi separati per lingua. La lettera è scritta anche nel quadrato, il parlato non viene più perso dopo `cancel()` e il riscontro su una pressione sbagliata indica il pulsante (`ad68b5e`).
- Controllo di tutti i giochi con un bot che segue le regole (`d353ed7`):
  - **Pilota:** le pressioni andavano al segnale più vicino anche quando si reagiva al cerchio verde, i segnali sul bordo alto non contavano ancora, il riscontro arrivava solo quando il segnale superava l'auto e una pressione a vuoto faceva fallire anche il segnale successivo. Ora le pressioni vanno al cerchio verde a schermo, sono valutate subito e ogni errore spiega il motivo.
  - **Griglia:** il ✓/✗ arrivava dopo gli 1,8 s di visualizzazione della risposta e ora compare subito dopo l'ultimo tocco.
  - L'intruso, Sprint di calcolo e Griglia mostrano la risposta giusta nel banner ✗.
  - Il contesto audio riparte se un browser mobile lo avvia sospeso.

## [0.4.0] - 2026-10-31

### Aggiunto

- Più allenamenti al giorno: finito uno, se ne può iniziare un altro che sceglie le abilità e gli esercizi meno allenati quel giorno (`4fe0729`).
- Ogni risposta mostra un grande banner giusto/sbagliato con un bagliore sullo schermo e, in caso di errore, la risposta giusta. Pulsanti e tessere corretti sono evidenziati (`4fe0729`).

### Modificato

- Colpo d'occhio è più lento: partenza a 700 ms, passi dell'11%, obiettivo 85% e partenza rapida solo alla prima sessione, con pause più lunghe e la soluzione visibile dopo ogni prova (`4fe0729`).

### Corretto

- Eco conta i successi meno i falsi allarmi, così il silenzio non vale più il 70%. I punteggi a staircase dipendono dalla precisione nella seconda metà, e il controllo di calcolo cronometra solo le risposte (`4fe0729`).

## [0.3.0] - 2026-10-31

### Aggiunto

- Script `deploy:vps` che serve il gioco tramite Tailscale sulla porta HTTPS dedicata 8443, con il manifest rinominato in `.json` per ricevere il tipo di contenuto JSON (`c422c4e`).
- Esempio illustrato ed esempio svolto in una riga su ogni scheda introduttiva (`bd9936f`).
- Round di pratica guidata senza punteggio, proposto in automatico la prima volta (`bd9936f`).
- Combo di serie durante il gioco con tono crescente, avvisi di cambio livello e vibrazione (`bd9936f`).
- Risultati con messaggio sul livello, grafico dello storico dei livelli, punti esperienza e livello del giocatore (`bd9936f`).
- 17 traguardi, obiettivo settimanale, serie tollerante, prossimo obiettivo in Home e promemoria giornaliero come evento di calendario scaricabile (`bd9936f`).

### Modificato

- Motore adattivo v2: staircase up-down pesato (Kaernbach) su livelli continui con obiettivo di circa l'80% di precisione, partenza rapida, protezione dalla frustrazione, partenza con riscaldamento e calo dopo le pause (`bd9936f`).
- Azioni della Home chiarite: Allenamento e Misura il tuo Neuro Score (`9b7f400`).
- Note di ricerca di questo ciclo aggiunte a `docs/ricerca-e-proposta.md` (`bd9936f`).

## [0.2.0] - 2026-10-30

### Aggiunto

- Riprogettazione basata sulle evidenze con 17 esercizi adattivi su 8 abilità, su un motore a staircase condiviso con livelli per esercizio salvati tra le sessioni (`a5b424e`).
- Nuovi esercizi: Colpo d'occhio (UFOV), Eco (dual n-back), Doppia regola, Rotazioni, Radar (MOT), Pilota (multitasking), Torri (Torre di Londra), L'intruso, Ultime cifre (running span), Coppie e Lettura veloce (`a5b424e`).
- Allenamento giornaliero scelto tra le abilità meno allenate, nuovo controllo giornaliero a 4 prove, radar delle abilità, obiettivo settimanale, schede "perché funziona", ritmo rilassato e testo grande (`a5b424e`).
- Note di ricerca e motivazioni del progetto in `docs/ricerca-e-proposta.md` (`a5b424e`).

### Modificato

- Gli esercizi esistenti sono diventati adattivi: Corsi anche all'indietro, Riflesso a scelta con go/no-go e Stroop a tempo con cambio di regola (`a5b424e`).
- Il deploy su GitHub Pages è diventato manuale finché il repository resta privato (`3facaac`).

## [0.1.0] - 2026-10-30

### Aggiunto

- Repository creato con licenza MIT (`17beffd`), poi unito al progetto locale (`73cee99`).
- Prima versione, chiamata Synapse Gym: sei esercizi originali, Neuro Score giornaliero, monitoraggio dei progressi, localizzazione in italiano e inglese, supporto offline come PWA e deploy su GitHub Pages (`a89780b`).
