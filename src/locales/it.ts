import type { Locale, Passage } from '../i18n';

const ui: Locale['ui'] = {
  'app.tagline': 'Pochi minuti al giorno per una mente più agile',
  'home.how': 'Allenati ogni giorno e misurati per vedere i progressi',
  'onboard.title': 'Benvenuto!',
  'onboard.ask': 'Come ti chiami?',
  'onboard.placeholder': 'Il tuo nome',
  'onboard.go': 'Iniziamo',

  'landing.heroTitle': 'Allena la mente pochi minuti al giorno',
  'landing.heroSub': '35 esercizi cognitivi e bilaterali basati sulle neuroscienze per potenziare memoria, attenzione, coordinazione e riflessi. 100% gratuito, senza pubblicità, nessun account o password.',
  'landing.badgeFree': '100% Gratuito',
  'landing.badgePrivacy': 'Privacy totale · Dati locali',
  'landing.badgeScience': 'Basato su studi clinici',
  'landing.badgeOpenSource': 'Codice Disponibile',
  'landing.startCardTitle': 'Inizia subito l’allenamento',
  'landing.startCardDesc': 'Nessuna registrazione richiesta. Scegli un nome o nickname per salvare i progressi nel browser.',
  'landing.guestBtn': 'Oppure entra come Ospite',
  'landing.guestName': 'Ospite',
  'landing.guideBtn': '📖 Guida & Istruzioni ai Giochi',
  'landing.howItWorks': 'Come funziona Synapse Dojo',
  'landing.pillar1Title': 'Allenamento Giornaliero',
  'landing.pillar1Desc': '4 esercizi selezionati ogni giorno che si adattano al tuo livello. Bastano circa 10 minuti.',
  'landing.pillar2Title': 'Neuro Score Quotidiano',
  'landing.pillar2Desc': 'Un test rapido di circa 4 minuti su tutte le 9 aree per misurare oggettivamente i tuoi progressi nel tempo.',
  'landing.pillar3Title': 'Palestra Libera (35 Giochi)',
  'landing.pillar3Desc': 'Tutti i giochi disponibili liberamente per allenare le 9 aree cognitive e bilaterali quando vuoi.',
  'landing.pillar4Title': 'Classifica settimanale (facoltativa)',
  'landing.pillar4Desc': 'Se ti va, confronta costanza e miglioramento con altri giocatori o con gli amici, con un nickname casuale. È disattivata finché non aderisci e puoi uscire quando vuoi.',
  'landing.domainsTitle': 'Le 9 Aree Allenate',
  'landing.guideCtaTitle': 'Vuoi scoprire tutti i dettagli dei 35 giochi?',
  'landing.guideCtaDesc': 'Leggi la nostra guida dettagliata con la spiegazione scientifica, i benefici e le regole di tutti gli esercizi.',
  'landing.guideCtaBtn': 'Leggi la Guida Completa',
  'landing.footerTagline': 'Synapse Dojo · Allenamento Cognitivo Gratuito',

  'guide.title': 'Guida & Istruzioni',
  'guide.subtitle': 'Come funziona Synapse Dojo, le sezioni dell’app e la spiegazione dettagliata di tutti i giochi cognitivi e bilaterali',
  'guide.navSections': 'Le Sezioni dell’App',
  'guide.introH': 'Perché allenare la mente?',
  'guide.introP': 'Il cervello possiede una straordinaria capacità di riorganizzarsi e creare nuove connessioni sinaptiche lungo tutto l’arco della vita: questo fenomeno è noto come neuroplasticità. Così come l’esercizio fisico mantiene in forma il corpo, stimolare regolarmente le funzioni cognitive aiuta a preservare lucidità mentale, concentrazione, velocità e memoria. Synapse Dojo è una palestra mentale quotidiana rapida e stimolante: bastano pochi minuti al giorno con esercizi calibrati in tempo reale sulle tue abilità attuali.',
  'guide.planH': '🏋️ Allenamento Giornaliero (Daily Plan)',
  'guide.planP': 'Ogni giorno Synapse Dojo compone per te una sequenza di 4 esercizi su domini diversi (ad esempio velocità, memoria, controllo esecutivo e ragionamento). Gli esercizi sono adattivi: se rispondi correttamente la difficoltà sale, se commetti errori si calibra per mantenerti nella zona di stimolazione ideale. Completando l’allenamento aumenti la tua serie quotidiana (streak) e guadagni punti XP per salire di livello.',
  'guide.checkH': '📏 Misura il Neuro Score (Daily Check)',
  'guide.checkP': 'Il Neuro Score è una valutazione standardizzata di circa 15-20 minuti che testa tutte le 9 aree cognitive della mente (Velocità, Attenzione, Funzioni Esecutive, Memoria di Lavoro, Memoria a Lungo Termine, Abilità Spaziali, Logica, Linguaggio e Coordinazione Bilaterale), selezionando ogni giorno a rotazione un esercizio per ciascuna area. Poiché il test copre l’intero spettro cerebrale in condizioni calibrate, il punteggio complessivo ottenuto (da 0 a 1000) rappresenta un barometro oggettivo ed ecologico delle tue prestazioni per monitorare i miglioramenti nel tempo.',
  'guide.trainingH': '🧩 Palestra Libera (35 Esercizi)',
  'guide.trainingP': 'Nella sezione Palestra trovi l’intero catalogo dei 35 esercizi, suddivisi nelle 9 abilità cerebrali e di coordinazione bilaterale. Puoi allenarti liberamente su qualunque esercizio senza limiti di tempo, approfondire compiti specifici o superare i tuoi record personali.',
  'guide.progressH': '📈 Progressi e Statistiche',
  'guide.progressP': 'Consulta il tuo profilo cognitivo con i livelli raggiunti in ciascuna abilità, lo storico dei tuoi Neuro Score, i badge e traguardi sbloccati (come serie di giorni consecutivi o livelli avanzati) e il calendario mensile delle tue sessioni di allenamento.',
  'guide.boardH': '🏆 Classifica Settimanale e Gruppi di Amici',
  'guide.boardP': 'Facoltativa e disattivata finché non aderisci dalle Impostazioni. Ogni settimana puoi confrontare la costanza (10 punti per giorno di allenamento più 1 per esercizio, fino a 12 al giorno), il miglioramento rispetto al tuo punto di partenza e il livello migliore per esercizio, con una fascia d’età facoltativa. Si azzera ogni lunedì e vedi la top 3 e i giocatori vicini a te, con un nickname casuale. Puoi anche creare un gruppo privato e invitare familiari e amici con un link o un codice. Puoi uscire quando vuoi e tutti i tuoi dati vengono cancellati.',
  'guide.settingsH': '⚙️ Impostazioni e Privacy',
  'guide.settingsP': 'Personalizza la tua esperienza: suoni, vibrazione, ritmo rilassato (più tempo per rispondere), testo grande e promemoria quotidiano da aggiungere al calendario; il tema chiaro o scuro segue quello del dispositivo. Da qui aderisci o esci dalla classifica e gestisci i tuoi gruppi. I progressi sono salvati solo nel tuo browser: puoi esportarli in un file JSON di backup o trasferirli su un altro dispositivo in qualsiasi momento.',
  'guide.gamesH': 'Gli Esercizi nel Dettaglio',
  'guide.gameWhy': 'A cosa serve (Perché funziona):',
  'guide.gameHow': 'Come funziona:',
  'guide.faqH': 'Consigli e Domande Frequenti (FAQ)',
  'guide.faq1Q': 'Quanto tempo dovrei allenarmi ogni giorno?',
  'guide.faq1A': 'La costanza è più importante dell’intensità. Bastano 10-15 minuti al giorno (l’allenamento giornaliero; il Neuro Score, se vuoi, richiede altri 15-20 minuti). Allenarsi 4 o 5 giorni a settimana produce risultati molto superiori rispetto a una sessione lunga sporadica, ed è anche per questo che in classifica un giorno in più vale più di un allenamento in più nello stesso giorno.',
  'guide.faq2Q': 'I miei dati personali e punteggi dove sono salvati?',
  'guide.faq2A': 'Tutto resta sul tuo dispositivo. Synapse Dojo non richiede account o password e non usa cookie di tracciamento: punteggi e progressi sono salvati nel browser (localStorage). Solo se aderisci alla classifica settimanale facoltativa viene inviato un riepilogo della settimana, con un nickname casuale.',
  'guide.faq3Q': 'I giochi hanno delle istruzioni durante la partita?',
  'guide.faq3A': 'Sì! Quando avvii un esercizio troverai sempre istruzioni sintetiche e una prova pratica (trial) guidata per prendere confidenza con i comandi prima di iniziare la sessione ufficiale.',

  'home.hello': 'Ciao, {name}!',
  'home.streak': '{n} giorni di fila',
  'home.streak1': '1 giorno di fila',
  'home.streak0': 'Inizia la tua serie oggi',
  'home.check': 'Misura il Neuro Score',
  'home.checkSub': 'Testa tutte le 9 aree cognitive · circa 4 min · monitora la tua lucidità',
  'home.checkDone': 'Fatto oggi: {score}',
  'home.training': 'Palestra',
  'home.trainingSub': 'Tutti gli esercizi, divisi per abilità',
  'home.progress': 'Progressi',
  'home.progressSub': 'Profilo per abilità, livelli e calendario',
  'home.settings': 'Impostazioni',

  'plan.title': 'Allenamento',
  'plan.titleN': 'Allenamento {n}',
  'plan.again': 'Un altro allenamento',
  'plan.againSub': 'Hai ancora voglia? Tocca per 4 nuovi esercizi su altre abilità',
  'plan.sub': '{n} esercizi scelti per te · si adattano al tuo livello · circa {min} min',
  'plan.progress': '{done}/{n} completati',
  'plan.step': 'Esercizio {i} di {n}',
  'plan.done': 'Allenamento completato!',
  'plan.doneSub': 'Ottimo lavoro! Se hai ancora voglia puoi fare subito un altro allenamento, con esercizi diversi.',

  'common.back': 'Indietro',
  'common.start': 'Via!',
  'common.quit': 'Esci',
  'common.retry': 'Riprova',
  'common.menu': 'Menu',
  'common.next': 'Avanti',
  'common.continue': 'Continua',
  'common.best': 'Record',
  'common.newBest': 'Nuovo record!',
  'common.level': 'Livello',
  'common.levelChange': 'Livello: {from} → {to}',
  'common.why': 'Perché funziona',
  'common.timeout': 'Tempo scaduto',
  'common.step': 'Prova {i} di {n}',
  'common.correct': '{ok}/{n} corrette',

  'domain.speed': 'Velocità',
  'domain.attention': 'Attenzione',
  'domain.wm': 'Memoria di lavoro',
  'domain.memory': 'Memoria',
  'domain.executive': 'Controllo',
  'domain.spatial': 'Spaziale',
  'domain.reasoning': 'Ragionamento',
  'domain.language': 'Calcolo e lettura',

  'ex.glance.name': 'Colpo d’occhio',
  'ex.glance.desc': 'Per un istante appaiono un veicolo al centro e una stella ai bordi. Dimmi che veicolo era e dove stava la stella. Il tempo di esposizione si accorcia mentre migliori.',
  'ex.glance.why': 'Allena il «campo visivo utile»: cogliere più informazioni in un solo sguardo. È il tipo di esercizio usato nel trial ACTIVE, dove l’allenamento della velocità di elaborazione è stato associato a un rischio di demenza più basso a 10 anni.',
  'ex.glance.which': 'Che veicolo c’era al centro?',
  'ex.glance.where': 'Dov’era la stella?',
  'ex.glance.detail': 'Soglia: {ms} ms',

  'ex.reflex.name': 'Riflesso a scelta',
  'ex.reflex.desc': 'Si accende uno dei quattro pannelli. Se è verde toccalo subito; se è rosso, non toccare niente!',
  'ex.reflex.why': 'Tempo di reazione a scelta con segnali da ignorare (go/no-go): unisce velocità e controllo della risposta automatica.',
  'ex.reflex.hint': 'Verde: tocca · Rosso: fermo',
  'ex.reflex.detail': 'Reazione media: {ms} ms · {ok}/{n} corrette',

  'ex.path.name': 'Sentiero dei numeri',
  'ex.path.desc': 'Tocca i cerchi in ordine. Ai livelli alti alterni numeri e lettere: 1 → A → 2 → B → 3 …',
  'ex.path.why': 'Versione del Trail Making Test, usato in neuropsicologia per misurare la ricerca visiva veloce e, nella forma alternata, la flessibilità mentale.',
  'ex.path.next': 'Prossimo: {v}',
  'ex.path.detail': '{secs} s · {err} errori',

  'ex.pilot.name': 'Pilota',
  'ex.pilot.desc': 'Resta sulla strada: trascina col dito oppure, al computer, usa i tasti ← →. Quando appare un cerchio verde premi SEGNALE (pulsante sullo schermo, clic o barra spaziatrice): puoi farlo da quando compare finché l’anello attorno al cartello non si svuota. Ignora tutti gli altri cartelli.',
  'ex.pilot.why': 'Ispirato a NeuroRacer (Università della California, San Francisco): in uno studio su Nature l’allenamento adattivo al multitasking ha ridotto il costo del fare due cose insieme, con effetti ancora presenti dopo 6 mesi.',
  'ex.pilot.press': 'SEGNALE!',
  'ex.pilot.detail': 'Segnali corretti: {ok}/{n} · in strada {road}%',

  'ex.radar.name': 'Radar',
  'ex.radar.desc': 'Alcune palline si illuminano: sono i bersagli. Poi tutte si muovono uguali. Seguile con lo sguardo e alla fine tocca i bersagli.',
  'ex.radar.why': 'Multiple Object Tracking: seguire più oggetti in movimento allena l’attenzione distribuita nello spazio, la stessa che usi nel traffico o in mezzo alla folla.',
  'ex.radar.watch': 'Memorizza i bersagli',
  'ex.radar.track': 'Seguili…',
  'ex.radar.pick': 'Tocca i {n} bersagli',
  'ex.radar.detail': 'Bersagli: fino a {n} · {ok}/{t} prove riuscite',

  'ex.clash.name': 'Scontro di colori',
  'ex.clash.desc': 'Leggi la regola in alto: tocca il colore dell’INCHIOSTRO oppure il SIGNIFICATO della parola. Il tempo per rispondere si accorcia mentre migliori.',
  'ex.clash.why': 'Effetto Stroop: bloccare la risposta automatica (leggere) per dare quella richiesta. Allena l’inibizione, una delle funzioni esecutive principali.',
  'ex.clash.ruleInk': '🎨 Colore dell’inchiostro',
  'ex.clash.ruleWord': '📖 Significato della parola',

  'ex.switch.name': 'Doppia regola',
  'ex.switch.desc': 'Appare un numero. Se la cornice è BLU, dimmi se è pari o dispari. Se è ARANCIONE, se è minore o maggiore di 5. La regola cambia senza preavviso!',
  'ex.switch.why': 'Task switching: passare in fretta da una regola all’altra. L’allenamento riduce il «costo di cambio», anche in compiti non allenati; negli anziani il miglioramento è spesso maggiore.',
  'ex.switch.parity': 'PARI o DISPARI?',
  'ex.switch.size': 'MINORE o MAGGIORE di 5?',
  'ex.switch.even': 'PARI',
  'ex.switch.odd': 'DISPARI',
  'ex.switch.detail': '{ok}/{n} · costo di cambio {cost} ms',

  'ex.echo.name': 'Eco',
  'ex.echo.desc': 'Si accende una casella alla volta. Per ognuna chiediti: è nello stesso posto di quella di N passi fa? Se sì premi POSIZIONE, altrimenti non premere niente. Si parte con N = 1, cioè la casella appena prima; più avanti arriva anche una lettera da confrontare allo stesso modo.',
  'ex.echo.why': 'n-back: confrontare ogni stimolo con quello di N passi prima. È il compito più studiato per la memoria di lavoro; i progressi sono forti sui compiti simili, più incerti su quelli lontani.',
  'ex.echo.before': 'Prima',
  'ex.echo.now': 'Adesso',
  'ex.echo.ago': '{n} fa',
  'ex.echo.demo1': 'Si accende una casella: non c’è nulla con cui confrontarla, aspetta.',
  'ex.echo.demo2': 'Diversa da quella di prima → non premere niente.',
  'ex.echo.demo3': 'Uguale a quella di prima → premi POSIZIONE!',
  'ex.echo.demo4': 'Di nuovo diversa → non premere. E così via.',
  'ex.echo.stripWait': 'Ricordala: la confronterai con quelle che arrivano dopo.',
  'ex.echo.stripCompare': 'La casella di ADESSO è nello stesso posto di quella evidenziata? Se sì, premi POSIZIONE.',
  'ex.echo.stripCompareDual': 'Confronta ADESSO con quella evidenziata: stessa casella → POSIZIONE, stessa lettera → LETTERA.',
  'ex.echo.back1': 'quella appena prima',
  'ex.echo.backN': 'quella di {n} passi fa',
  'ex.echo.dualTitle': 'Da ora è doppio!',
  'ex.echo.dualText': 'Oltre alla casella senti una lettera, che vedi anche scritta nella casella. Premi POSIZIONE se la casella è uguale a {back} e LETTERA se la lettera è uguale a {back}. Possono essere uguali tutte e due, una sola o nessuna.',
  'ex.echo.series': 'Serie {i} di {n}',
  'ex.echo.seriesStart1': 'Questa serie ha {len} caselle. La prima serve solo da memorizzare: non premere. Dalla seconda in poi, confronta ogni casella con quella appena prima.',
  'ex.echo.seriesStartN': 'Questa serie ha {len} caselle. Le prime {k} servono solo da memorizzare: non premere. Poi confronta ogni casella con quella di {k} passi prima.',
  'ex.echo.turnWait': 'Casella {i} di {len} · memorizzala, non premere',
  'ex.echo.turnAsk': 'Casella {i} di {len} · è uguale a {back}?',
  'ex.echo.turnAskDual': 'Casella {i} di {len} · stesso posto? stessa lettera? (rispetto a {back})',
  'ex.echo.seriesEnd': 'Fine della serie {i} di {n}',
  'ex.echo.seriesScore': 'Precisione: {acc}% · uguaglianze colte {hit} su {targets} · pressioni sbagliate {fa}',
  'fb.echoNotSame': 'non premere (era diversa)',
  'fb.echoNotSameLetter': 'non premere (la lettera era diversa)',
  'fb.echoMissed': 'premi {btn} (era uguale)',
  'ex.echo.pos': 'Posizione',
  'ex.echo.letter': 'Lettera',
  'ex.echo.rule1': '1-back · confronta con la casella appena prima',
  'ex.echo.ruleDual': '{n}-back ×2 · confronta casella e lettera con {back}',
  'ex.echo.rule': '{n}-back · confronta con {n} passi fa',
  'ex.echo.block': 'Blocco {i}: precisione {acc}% (bersagli colti meno falsi allarmi)',

  'ex.grid.name': 'Griglia di luci',
  'ex.grid.desc': 'Osserva le caselle che si accendono e ripeti la sequenza. Attenzione: a volte va ripetuta al contrario!',
  'ex.grid.why': 'Test di Corsi: ricordare sequenze nello spazio, anche all’indietro. Misura e allena la memoria di lavoro visuo-spaziale.',
  'ex.grid.watch': 'Osserva…',
  'ex.grid.yours': 'Tocca a te! ({n} caselle)',
  'ex.grid.back': 'AL CONTRARIO! ({n} caselle)',
  'ex.grid.span': 'Sequenza massima: {n}',
  'ex.grid.detail': 'Span avanti {f} · indietro {b}',

  'ex.digits.name': 'Ultime cifre',
  'ex.digits.desc': 'Scorre una serie di cifre di lunghezza imprevedibile. Quando si ferma, scrivi le ultime N nell’ordine giusto.',
  'ex.digits.why': 'Running span: tenere a mente solo le ultime cifre di una sequenza che continua ad aggiornarsi. Allena l’aggiornamento della memoria di lavoro.',
  'ex.digits.watch': 'Ricorda le ultime {n}',
  'ex.digits.recall': 'Scrivi le ultime {n} cifre',
  'ex.digits.detail': '{ok}/{n} corrette · span {span}',

  'ex.rotate.name': 'Rotazioni',
  'ex.rotate.desc': 'Le due figure sono la stessa figura ruotata, o una è lo specchio dell’altra?',
  'ex.rotate.why': 'Rotazione mentale. Una meta-analisi di 217 studi mostra che le abilità spaziali migliorano con l’allenamento, in modo duraturo e anche su compiti simili non allenati.',
  'ex.rotate.same': 'Uguale',
  'ex.rotate.mirror': 'Speculare',

  'ex.towers.name': 'Torri',
  'ex.towers.desc': 'Sposta le palline per ottenere la disposizione dell’obiettivo senza superare il numero massimo di mosse. Tocca un paletto per prendere la pallina in cima, poi tocca dove metterla. Pensa prima di muovere!',
  'ex.towers.why': 'Torre di Londra: pianificare una sequenza di mosse prima di agire. È un test classico delle funzioni esecutive di pianificazione.',
  'ex.towers.goal': 'Obiettivo',
  'ex.towers.moves': 'Mosse: {m} · massimo: {min}',
  'ex.towers.too': 'Mosse finite',
  'ex.towers.detail': 'Risolte entro il massimo: {ok}/{n}',

  'ex.odd.name': 'L’intruso',
  'ex.odd.desc': 'Tutte le figure tranne una condividono una caratteristica (forma, colore, riempimento o numero). Trova quella diversa.',
  'ex.odd.why': 'Ragionamento induttivo: scoprire la regola comune nascosta tra le differenze irrilevanti. Compiti simili si trovano nelle batterie di Cambridge Brain Sciences.',
  'ex.odd.ask': 'Qual è l’intruso?',
  'ex.odd.because': 'la differenza è: {dim}',
  'ex.odd.dimFill': 'Riempimento',

  'ex.math.name': 'Sprint di calcolo',
  'ex.math.desc': 'Risolvi le operazioni il più in fretta possibile. La risposta viene confermata appena hai scritto tutte le cifre.',
  'ex.math.why': 'Tanti calcoli semplici fatti velocemente: è il principio della «learning therapy» studiata dal gruppo di Kawashima, che ha mostrato miglioramenti di attenzione, inibizione e velocità negli anziani.',
  'ex.math.detail': '{ok}/{n} · {secs} s',

  'ex.reading.name': 'Lettura veloce',
  'ex.reading.desc': 'Leggi il testo AD ALTA VOCE, il più velocemente possibile ma scandendo bene. Poi rispondi a una domanda.',
  'ex.reading.why': 'Lettura ad alta voce: l’altra metà della «learning therapy» del gruppo di Kawashima. La domanda finale serve a verificare che tu abbia letto davvero.',
  'ex.reading.aloud': '🗣️ Leggi ad alta voce',
  'ex.reading.done': 'Ho finito',
  'ex.reading.detail': '{wpm} parole/min · comprensione {ok}/{n}',

  'ex.vault.name': 'Cassaforte di parole',
  'ex.vault.desc': 'Memorizza le parole. Poi te ne mostrerò altre: dimmi se le avevi già viste o se sono nuove.',
  'ex.vault.why': 'Memoria di riconoscimento: distinguere ciò che hai visto da ciò che è nuovo. Allena la memoria episodica.',
  'ex.vault.study': 'Memorizza queste parole',
  'ex.vault.done': 'Ho finito',
  'ex.vault.seen': 'Vista',
  'ex.vault.new': 'Nuova',
  'ex.vault.result': '{n}/{t} risposte giuste',

  'ex.pairs.name': 'Coppie',
  'ex.pairs.desc': 'Vedrai alcune coppie formate da un simbolo e una parola, per esempio 🍎 🔗 martello. Memorizzale. Poi compare solo il simbolo e devi scegliere la parola che gli era abbinata. Non c’è audio: è tutto da guardare.',
  'ex.pairs.why': 'Associazioni di coppie (paired associates): legare due elementi tra loro è uno dei compiti più sensibili della memoria episodica.',
  'ex.pairs.study': 'Ogni simbolo ha la sua parola: ricorda chi va con chi',
  'ex.pairs.tip': 'Dopo vedrai solo il simbolo e dovrai scegliere la sua parola. Trucco: immagina una scena che li unisce, per esempio {sym} + «{word}».',
  'ex.pairs.timer': '⏱ {s} secondi',
  'ex.pairs.ask': 'Con quale parola era in coppia?',
  'ex.pairs.detail': '{ok}/{n} coppie ricordate',

  'color.red': 'ROSSO',
  'color.blue': 'BLU',
  'color.green': 'VERDE',
  'color.yellow': 'GIALLO',

  'result.title': 'Risultato',
  'check.title': 'Il tuo Neuro Score',
  'check.delta': '{d} rispetto all’ultima volta',
  'check.first': 'Primo check registrato. Torna domani!',
  'check.rescaled': 'Il punteggio è stato ricalibrato: questo è il tuo nuovo punto di partenza. I risultati precedenti restano salvati ma non vengono confrontati.',
  'check.doneToday': 'Hai già fatto il check oggi. Torna domani per misurarti di nuovo!',

  'rank.0': 'Scintilla',
  'rank.1': 'Corrente',
  'rank.2': 'Circuito',
  'rank.3': 'Rete neurale',
  'rank.4': 'Maestro delle sinapsi',

  'training.title': 'Palestra',
  'training.today': 'Fatto oggi',

  'progress.title': 'Progressi',
  'progress.chart': 'Neuro Score',
  'progress.empty': 'Fai il primo check quotidiano per vedere il grafico.',
  'progress.calendar': 'Ultime 4 settimane',
  'progress.domains': 'Profilo per abilità',
  'progress.domainsHint': 'Basato sul livello raggiunto in ogni esercizio.',
  'progress.exercises': 'Livelli e record',
  'progress.none': '—',
  'progress.stats': 'Giorni attivi: {days} · Sessioni: {runs}',
  'progress.week': 'Questa settimana: {n}/4 giorni di allenamento',

  'settings.title': 'Impostazioni',
  'settings.name': 'Nome',
  'settings.lang': 'Lingua',
  'settings.sound': 'Effetti sonori',
  'settings.relaxed': 'Ritmo rilassato (più tempo per rispondere)',
  'settings.bigText': 'Testo grande',
  'settings.reset': 'Cancella tutti i dati',
  'settings.resetConfirm': 'Vuoi davvero cancellare tutti i progressi? Non si può annullare.',
  'ex.glance.example': 'Esempio: al centro c’è 🚗 e la stella è in alto a destra → rispondi 🚗, poi tocca la casella in alto a destra.',
  'ex.reflex.example': 'Esempio: si accende un pannello verde → toccalo subito. Se è rosso → non toccare niente e aspetta.',
  'ex.path.example': 'Esempio: tocca 1, poi 2, poi 3… Nella versione alternata: 1 → A → 2 → B → 3 → C.',
  'ex.pilot.example': 'Esempio: compare un cerchio verde con l’anello pieno → premi SEGNALE prima che l’anello si svuoti. Un triangolo o un quadrato → non premere.',
  'ex.radar.example': 'Esempio: si illuminano 2 palline → seguile con lo sguardo mentre si mescolano alle altre, poi tocca proprio quelle 2.',
  'ex.clash.example': 'Esempio: la parola ROSSO scritta in blu → con la regola 🎨 rispondi BLU, con la regola 📖 rispondi ROSSO.',
  'ex.switch.example': 'Esempio: 7 in cornice blu → DISPARI. Lo stesso 7 in cornice arancione → MAGGIORE di 5.',
  'ex.echo.example': 'Esempio 1-back: si accende la casella in alto e subito dopo di nuovo la stessa → premi POSIZIONE. Se è un’altra → non premere.',
  'ex.grid.example': 'Esempio: si accendono 1 → 2 → 3. Tocca 1, 2, 3. Se la scritta dice AL CONTRARIO, tocca 3, 2, 1.',
  'ex.digits.example': 'Esempio: scorrono 4 8 1 7 2 9 e devi ricordare le ultime 3 → scrivi 7 2 9.',
  'ex.vault.example': 'Esempio: hai studiato «albero» e «barca». Appare «albero» → Vista. Appare «tazza» → Nuova.',
  'ex.pairs.example': 'Esempio: hai visto la coppia 🍎 – martello. Più tardi appare 🍎 → scegli «martello».',
  'ex.rotate.example': 'Esempio: se ruotando la figura di destra ottieni quella di sinistra → Uguale. Se serve uno specchio → Speculare.',
  'ex.towers.example': 'Esempio: nell’obiettivo la rossa è in cima ma ora è coperta dalla blu → sposta prima la blu, poi metti la rossa al suo posto.',
  'ex.odd.example': 'Esempio: tre cerchi rossi pieni e un cerchio blu pieno → l’intruso è il cerchio blu (è l’unico di un altro colore).',
  'ex.math.example': 'Esempio: 7 + 8 = → scrivi 15. La risposta parte da sola appena hai scritto tutte le cifre.',
  'ex.reading.example': 'Esempio: leggi il brano a voce alta, premi «Ho finito» e rispondi alla domanda sul testo.',
  'fb.pilotRoad': 'resta sulla strada',
  'fb.pilotMissed': 'era il cerchio verde: premi SEGNALE',
  'fb.pilotNotTarget': 'premi solo per il cerchio verde',
  'fb.pilotStray': 'nessun segnale in vista: aspetta il cerchio verde',
  'fb.oddHere': 'quella evidenziata in verde',
  'fb.gridOrder': 'l’ordine numerato sulle caselle',
  'fb.right': 'Giusto!',
  'fb.wrong': 'Sbagliato',
  'fb.was': 'Risposta giusta: {v}',
  'fb.noGo': 'era rosso, non dovevi toccare',
  'fb.tooSlow': 'troppo lento, tocca prima',
  'fb.otherPad': 'il pannello acceso',
  'fb.starHere': 'la stella è dove brilla ora',
  'fb.minMoves': 'si poteva in {n} mosse',
  'intro.tip': 'Il gioco si adatta a te: sbaglierai circa una volta su cinque, ed è proprio lì che il cervello impara di più.',
  'intro.practice': 'Prova guidata',
  'intro.practiceFirst': 'Prima volta? Fai una prova guidata: dura poco e non conta.',
  'practice.tag': 'Prova',
  'practice.done': 'Prova completata!',
  'practice.doneSub': 'Ora conosci le regole. Pronto per la partita vera?',
  'result.accuracy': 'Precisione: {pct}%',
  'result.combo': 'Serie migliore: ×{n}',
  'result.msgUp': 'Stai migliorando: da qui il gioco sarà un po’ più difficile.',
  'result.msgDown': 'Il livello si è abbassato un po’ per farti allenare nel punto giusto. È normale!',
  'result.msgSame': 'Livello stabile: stai consolidando. Continua così.',
  'result.history': 'Il tuo livello nel tempo',
  'result.sinceFirst': '{pct} rispetto alla prima volta',
  'result.newBadge': 'Nuovo traguardo!',
  'result.speedBonus': 'Bonus rapidità (+10 XP)',
  'result.timeBonusPts': 'pts tempo',
  'level.player': 'Livello {n}',
  'level.up': 'Sei salito al livello {n}!',
  'home.next': 'Prossimo traguardo',
  'home.week': 'Obiettivo della settimana: {n}/4 giorni',
  'badges.title': 'Traguardi',
  'badges.count': '{n}/{t} ottenuti',
  'settings.vibration': 'Vibrazione (sul telefono)',
  'settings.reminder': 'Promemoria giornaliero',
  'settings.reminderHint': 'Scarica un evento ricorrente da aggiungere al calendario del telefono o del PC.',
  'settings.reminderTime': 'Ora',
  'settings.reminderBtn': 'Aggiungi al calendario',
  'reminder.desc': 'Pochi minuti per allenare la mente',
  'badge.first.name': 'Primo passo',
  'badge.first.desc': 'Completa il tuo primo esercizio',
  'badge.check.name': 'Prima misura',
  'badge.check.desc': 'Misura il tuo Neuro Score per la prima volta',
  'badge.plan.name': 'Allenamento completo',
  'badge.plan.desc': 'Completa un allenamento del giorno',
  'badge.streak3.name': 'Tre di fila',
  'badge.streak3.desc': 'Allenati 3 giorni di fila',
  'badge.week4.name': 'Settimana piena',
  'badge.week4.desc': 'Allenati 4 giorni nella stessa settimana',
  'badge.streak7.name': 'Settimana di fuoco',
  'badge.streak7.desc': 'Allenati 7 giorni di fila',
  'badge.combo10.name': 'Lampo',
  'badge.combo10.desc': '10 risposte giuste di fila',
  'badge.explorer.name': 'Esploratore',
  'badge.explorer.desc': 'Prova tutti i 35 esercizi',
  'badge.balanced.name': 'Mente completa',
  'badge.balanced.desc': 'Allena tutte le 9 abilità in 7 giorni',
  'badge.levelups25.name': 'In salita',
  'badge.levelups25.desc': 'Sali di livello 25 volte',
  'badge.plans10.name': 'Costanza',
  'badge.plans10.desc': 'Completa 10 allenamenti del giorno',
  'badge.combo25.name': 'Tempesta',
  'badge.combo25.desc': '25 risposte giuste di fila',
  'badge.nback3.name': 'Eco profondo',
  'badge.nback3.desc': 'Raggiungi il 3-back in Eco',
  'badge.span7.name': 'Memoria d’acciaio',
  'badge.span7.desc': 'Raggiungi span 7 nella Griglia di luci',
  'badge.glance50.name': 'Occhio di falco',
  'badge.glance50.desc': 'Scendi a circa 100 ms in Colpo d’occhio',
  'badge.neuro800.name': 'Rete neurale',
  'badge.neuro800.desc': 'Ottieni almeno 800 di Neuro Score',
  'badge.streak30.name': 'Un mese insieme',
  'badge.streak30.desc': 'Allenati 30 giorni di fila',
  'settings.about': 'Gioco di allenamento cognitivo. Solo per svago: non è uno strumento medico. Anche attività fisica, sonno e vita sociale fanno bene al cervello.',
  'settings.data': 'I tuoi progressi',
  'settings.dataHint': 'Salva i progressi in un file per tenerne una copia o spostarli su un altro dispositivo o indirizzo del gioco: ognuno ha un salvataggio separato.',
  'settings.export': 'Esporta progressi',
  'settings.import': 'Importa progressi',
  'settings.importBad': 'Questo file non è un salvataggio valido di Synapse Dojo.',
  'settings.importConfirm': 'Sostituire i dati attuali con quelli del file ({name}, {runs} esercizi svolti, ultimo il {last})? I progressi attuali andranno persi.',
  'settings.importDone': 'Progressi importati.',
  'privacy.title': 'Privacy e note legali',
  'privacy.updated': 'Ultimo aggiornamento: 4 novembre 2026',
  'privacy.dataH': 'I tuoi dati restano sul dispositivo',
  'privacy.data': 'Nome, progressi e impostazioni sono salvati solo nel browser di questo dispositivo (localStorage). Non vengono inviati a nessun server (tranne il riepilogo settimanale della classifica facoltativa, se aderisci: vedi sotto) e nessuno, nemmeno chi gestisce il gioco, può vederli. Se cancelli i dati del browser o usi «Cancella tutti i dati» spariscono: puoi tenerne una copia con «Esporta progressi» nelle Impostazioni.',
  'privacy.cookiesH': 'Nessun account, nessun cookie',
  'privacy.cookies': 'Non serve registrarsi e il gioco non usa cookie, pubblicità né strumenti di profilazione. Font e file del gioco sono serviti dallo stesso sito, senza servizi di terze parti.',
  'privacy.hostingH': 'Hosting',
  'privacy.hosting': 'La versione pubblica è ospitata da Cloudflare (Cloudflare Pages). Come ogni server web, per consegnare le pagine e proteggerle dagli attacchi Cloudflare tratta dati tecnici come l’indirizzo IP e il tipo di browser, secondo la propria informativa sulla privacy.',
  'privacy.statsH': 'Statistiche di visita',
  'privacy.stats': 'Solo nella versione pubblica contiamo le visite con Cloudflare Web Analytics, che non usa cookie, non salva nulla nel browser e non segue le persone tra siti diversi: mostra solo dati aggregati come pagine viste, paese e tipo di dispositivo. I nomi e i risultati degli esercizi non vengono mai inviati.',
  'privacy.boardH': 'Classifica settimanale facoltativa',
  'privacy.board': 'Solo se aderisci dalle Impostazioni, dopo ogni sessione il gioco invia al proprio server (Cloudflare Workers con un database D1) un riepilogo della settimana in corso: giorni di allenamento e attività di ogni giorno, variazione di livello e livello migliore per esercizio, se usi il ritmo rilassato e, se l’hai indicata, la fascia d’età. È legato a un identificativo casuale e a un nickname generato, mai al tuo nome, alla tua email o al resto dei progressi. Se crei un gruppo di amici o ti unisci a uno, il server conserva anche il nome del gruppo, chi ne fa parte (visibili solo ai membri) e chi il creatore ha bannato. Al momento dell’adesione Cloudflare Turnstile verifica che tu non sia un robot, secondo l’informativa privacy di Cloudflare. I risultati settimanali vengono cancellati dopo 8 settimane e tutto il resto dopo 90 giorni di inutilizzo; «Esci e cancella i miei dati» o «Cancella tutti i dati» li cancellano subito, e un gruppo rimasto senza membri viene eliminato. La base giuridica è il tuo consenso, che puoi revocare in qualsiasi momento uscendo dalla classifica.',
  'privacy.medicalH': 'Non è un dispositivo medico',
  'privacy.medical': 'Synapse Dojo è un gioco per svago. Non è un dispositivo medico, non fa diagnosi e non promette di prevenire, rallentare o curare demenza, declino cognitivo o altri problemi di salute. I punteggi dicono solo come vai negli esercizi. Per dubbi sulla salute rivolgiti a un medico.',
  'privacy.contactH': 'Contatti',
  'privacy.contact': 'Per domande sul gioco o sui dati: {contact}',
  'privacy.open': 'Apri il gioco',

  'license.title': 'Licenza e Termini',
  'license.subtitle': 'Licenza software, usi consentiti e proprietà intellettuale',
  'license.authorH': 'Autore e Proprietà Intellettuale',
  'license.authorP': 'Synapse Dojo è un progetto originale e indipendente ideato e sviluppato da Sergio Dogliani. Tutti i diritti commerciali sono riservati.',
  'license.polyformH': 'Licenza PolyForm Noncommercial 1.0.0',
  'license.polyformP': 'Il software è distribuito con licenza PolyForm Noncommercial 1.0.0. Il codice è accessibile e utilizzabile gratuitamente per uso personale, didattico, studio e ricerca senza scopo di lucro. Qualsiasi utilizzo a fini di lucro, monetizzazione, inserimento di annunci pubblicitari o redistribuzione commerciale senza autorizzazione scritta dell’autore è severamente vietato.',
  'license.permittedH': 'Usi Consentiti',
  'license.permittedP': 'Allenamento personale, studio del codice, ricerca scientifica senza scopo di lucro, utilizzo didattico e svago privato senza finalità commerciali.',
  'license.restrictedH': 'Restrizioni Commerciali',
  'license.restrictedP': 'Non è consentito utilizzare, modificare o redistribuire questo software per ottenere compensi monetari, vantaggi commerciali, inserire pubblicità o integrarlo in prodotti a pagamento senza una licenza commerciale concessa dall’autore.',
  'license.fontsH': 'Font e Risorse di Terze Parti',
  'license.fontsP': 'Il font Nunito è distribuito con licenza SIL Open Font License 1.1. I paradigmi degli esercizi cognitivi appartengono alla letteratura psicologica di pubblico dominio.',
  'license.linksH': 'Documentazione e link ufficiali',
  'license.officialLink': 'Leggi il testo integrale ufficiale PolyForm Noncommercial 1.0.0',
  'license.repoLink': 'Visualizza il file LICENSE su GitHub',
  'license.open': 'Apri il gioco',

  'domain.coordination': 'Coordinazione',

  'shape.circle': 'Cerchio',
  'shape.square': 'Quadrato',
  'shape.triangle': 'Triangolo',
  'shape.diamond': 'Rombo',

  // span
  'ex.span.name': 'Span di Cifre',
  'ex.span.desc': 'Memorizza la sequenza di numeri e digitala nell’ordine richiesto',
  'ex.span.why': 'Lo span di cifre è la misura standard della capacità della memoria a breve termine e della memoria di lavoro verbale.',
  'ex.span.example': '4 8 1 9   Scrivi i numeri nell’ordine indicato (in avanti o all’indietro)',
  'ex.span.forward': 'In avanti',
  'ex.span.backward': 'All’indietro',
  'ex.span.watch': 'Memorizza {n} cifre',
  'ex.span.recallFor': 'Scrivi le cifre nell’ordine visto',
  'ex.span.recallBack': 'Scrivi le cifre all’indietro!',
  'ex.span.detail': '{ok}/{n} corretti · span {span}',

  // stories
  'ex.stories.name': 'Memoria delle Storie',
  'ex.stories.desc': 'Leggi una o più brevi scene e, dopo una pausa con un piccolo compito, ricorda i dettagli di ciascuna',
  'ex.stories.why': 'La memoria episodica collega personaggi, luoghi e tempi, stimolando il richiamo narrativo dipendente dall’ippocampo.',
  'ex.stories.example': 'Leggi attentamente la storia e rispondi alle domande sui dettagli',
  'ex.stories.title': 'Scena {n}',
  'ex.stories.ready': 'Ho letto, sono pronto!',
  'ex.stories.qItem': 'Cosa portava con sé {name}?',
  'ex.stories.qPlace': 'Dove si trovava {name}?',
  'ex.stories.qTime': 'In quale momento si è svolta la scena?',
  'ex.stories.qTimeOf': 'Quando si trovava lì {name}?',
  'ex.stories.filler': 'Pausa: pari o dispari? Rispondi con calma, non conta per il punteggio.',
  'ex.stories.detail': '{ok}/{n} dettagli corretti',
  'ex.stories.text': '{name} aveva con sé {item}. Si trovava {place} {time}, dove ha concluso la sua commissione.',
  'ex.anagrams.letters': 'lettere',
  'ex.resources.task8': 'Girasoli',
  'ex.resources.task7': 'Pesce',
  'ex.resources.task6': 'Uova',
  'ex.resources.task5': 'Pomodori',
  'ex.resources.task4': 'Pane',
  'ex.resources.task3': 'Miele',
  'ex.resources.task2': 'Formaggio',
  'ex.resources.task1': 'Mele',
  'ex.resources.confirm': 'Compra',
  'ex.reaction.target': 'Obiettivo: < {ms} ms',

  // flanker
  'ex.flanker.name': 'Test di Flanker',
  'ex.flanker.desc': 'Concentrati sulla freccia centrale e ignora le frecce ai lati',
  'ex.flanker.why': 'Il compito di Eriksen Flanker misura l’attenzione selettiva e la capacità di inibire i distrattori visivi laterali.',
  'ex.flanker.example': '← ← → ← ←   Il bersaglio è la freccia al centro (→)',
  'ex.flanker.instruction': 'Tocca la direzione della freccia centrale',
  'ex.flanker.detail': '{ok}/{n} corretti · {ms} ms',

  // gonogo
  'ex.gonogo.name': 'Go / No-Go',
  'ex.gonogo.desc': 'Tocca rapido sui segnali verdi, frenati quando compare lo stop rosso',
  'ex.gonogo.why': 'Allena il controllo inibitorio motorio e la soppressione prefrontale delle risposte automatiche e impulsive.',
  'ex.gonogo.example': '● = Tocca subito!   ✕ = Non toccare!',
  'ex.gonogo.hint': 'Tocca su ●, fermati su ✕',
  'ex.gonogo.detail': '{ok}/{n} corretti · {ms} ms',

  // msit
  'ex.msit.name': 'Interferenza Multipla (MSIT)',
  'ex.msit.desc': 'Indica quale numero è diverso dagli altri, ignorando dove si trova',
  'ex.msit.why': 'L’MSIT attiva la corteccia cingolata anteriore creando un conflitto tra identità del numero e la sua posizione spaziale.',
  'ex.msit.example': '1 2 1   Il numero diverso è 2',
  'ex.msit.hint': 'Quale numero è diverso?',
  'ex.msit.detail': '{ok}/{n} corretti · {ms} ms',

  // binding
  'ex.binding.name': 'Colore e Forma',
  'ex.binding.desc': 'Trova l’oggetto che abbina sia la forma che il colore corretto prima che scada il tempo',
  'ex.binding.why': 'L’integrazione di caratteristiche (feature binding) stimola l’elaborazione visiva combinata di colore e forma.',
  'ex.binding.example': 'Trova il Cerchio Blu tra Quadrati Blu e Cerchi Rossi',
  'ex.binding.find': 'Trova',
  'ex.binding.detail': '{ok}/{n} corretti',

  // sorting
  'ex.sorting.name': 'Ordinamento di Carte',
  'ex.sorting.desc': 'Deduci la regola segreta (Colore, Forma o Numero) dai feedback e adattati quando cambia',
  'ex.sorting.why': 'Ispirato al Wisconsin Card Sorting Test (WCST), allena la flessibilità cognitiva, l\'induzione di regole e il set-shifting.',
  'ex.sorting.example': 'Carta con 3 triangoli rossi: abbina per forma (triangolo), colore (rosso) o numero (3). Scopri la regola per tentativi!',
  'ex.sorting.hint': 'Abbina per Colore, Forma o Numero. La regola segreta cambia periodicamente!',
  'ex.sorting.detail': '{ok}/{n} corretti · {cats} regole',
  'ex.sorting.secretRule': 'Trova la regola segreta',
  'ex.sorting.dimColor': 'Colore',
  'ex.sorting.dimShape': 'Forma',
  'ex.sorting.dimCount': 'Numero',
  'ex.sorting.refLabel': 'Carte di riferimento (tocca per abbinare)',
  'ex.sorting.targetLabel': 'Carta da abbinare',
  'ex.sorting.feedbackStart': 'Fai un\'ipotesi: tocca una carta per testare Colore, Forma o Numero',
  'ex.sorting.correct': 'Corretto! Regola confermata',
  'ex.sorting.wrong': 'Errato! La regola attiva non è questa',
  'ex.sorting.ruleShifted': 'La regola è cambiata! Trova il nuovo criterio',
  'ex.sorting.lostRule': 'Regola persa! Mantieni il criterio scoperto',
  'ex.sorting.perseveration': 'Attenzione: avevi già escluso questa regola!',
  'ex.sorting.eliminated': 'Escluso: {dim} non è la regola',

  

  // resources
  'ex.resources.name': 'Banco del mercato',
  'ex.resources.desc': 'Compra la merce da rivendere: non spendere più di quello che hai e guadagna il più possibile',
  'ex.resources.why': 'È il «problema dello zaino», studiato nelle scienze cognitive (Murawski & Bossaerts, 2016): trovare la combinazione migliore entro un limite richiede pianificazione, memoria di lavoro e confronto tra costi e benefici.',
  'ex.resources.example': 'Esempio: hai 50 monete. Le mele costano 20 e fanno guadagnare 25, il pane costa 30 e fa guadagnare 30, il miele costa 40 e fa guadagnare 35 → mele e pane fanno guadagnare 55 con 50 monete: meglio del solo miele.',
  'ex.resources.detail': '{ok}/{n} completati',

  // reaction
  'ex.reaction.name': 'Tempo di Reazione',
  'ex.reaction.desc': 'Tocca il più velocemente possibile non appena lo schermo diventa verde',
  'ex.reaction.why': 'Misura la pura velocità di conduzione visuo-motoria e la prontezza riflessa senza ritardi decisionali.',
  'ex.reaction.example': 'Attendi il verde, poi tocca subito',
  'ex.reaction.ready': 'Preparati',
  'ex.reaction.wait': 'Attendi il verde...',
  'ex.reaction.tapNow': 'TOCCA ORA!',
  'ex.reaction.early': 'Falsa partenza!',
  'ex.reaction.penalty': 'Attendi sempre il segnale verde',
  'ex.reaction.detail': 'Media: {ms} ms · Record: {best} ms ({ok}/{n})',

  // dots
  'ex.dots.name': 'Calcolo con i Punti',
  'ex.dots.desc': 'Giudica all’istante quale lato contiene più punti senza contarli',
  'ex.dots.why': 'Allena il sistema numerico approssimato (ANS): stimare a colpo d’occhio quale gruppo è più numeroso, senza contare, grazie alla rappresentazione parietale delle quantità.',
  'ex.dots.example': 'Tocca rapido il riquadro con più punti',
  'ex.dots.hint': 'Quale lato ha più punti?',
  'ex.dots.left': 'Sinistra',
  'ex.dots.right': 'Destra',
  'ex.dots.detail': '{ok}/{n} corretti',

  // anagrams
  'ex.anagrams.name': 'Anagrammi',
  'ex.anagrams.desc': 'Ricomponi le lettere nell’ordine giusto per formare la parola',
  'ex.anagrams.why': 'Coinvolge la memoria di lavoro ortografica, l’accesso lessicale e la ricombinazione mentale di fonemi.',
  'ex.anagrams.example': 'Tocca le tessere nell’ordine corretto per comporre la parola',
  'ex.anagrams.hint': 'Tocca le lettere per ricostruire la parola',
  'ex.anagrams.detail': '{ok}/{n} risolti',

  // fluency
  'ex.fluency.name': 'Sprint di Parole',
  'ex.fluency.desc': 'Conferma al volo le parole che iniziano con la lettera bersaglio',
  'ex.fluency.why': 'Decisioni ortografiche rapide: leggere una parola e verificarne l’iniziale sotto pressione temporale allena il riconoscimento veloce delle parole e la selezione della risposta. (È un compito di classificazione veloce, non un test di fluenza verbale, in cui le parole si producono da sé.)',
  'ex.fluency.example': 'Tocca se la parola inizia con la lettera indicata',
  'ex.fluency.targetLetter': 'Lettera bersaglio:',
  'ex.fluency.detail': '{ok}/{n} corretti',

  // matrix
  'ex.matrix.name': 'Matrice Spaziale',
  'ex.matrix.desc': 'Memorizza la posizione dei blocchi blu e ricollocali dopo la rotazione mentale',
  'ex.matrix.why': 'Allena la rotazione mentale e la trasformazione di coordinate spaziali, stimolando i circuiti parieto-frontali.',
  'ex.matrix.example': 'Memorizza i blocchi blu e tocca dove si trovano dopo aver ruotato la griglia',
  'ex.matrix.memorize': 'Memorizza i blocchi blu',
  'ex.matrix.itemsToRemember': 'blocchi da memorizzare',
  'ex.matrix.same': 'Tocca le celle che erano illuminate',
  'ex.matrix.noRot': 'Stessa posizione (nessuna rotazione)',
  'ex.matrix.rot90': 'Ruota di 90° in senso orario: tocca dove si trovano ora i blocchi',
  'ex.matrix.rot90Badge': '90° orario',
  'ex.matrix.rot180': 'Ruota di 180°: tocca dove si trovano ora i blocchi',
  'ex.matrix.rot180Badge': '180° capovolta',
  'ex.matrix.rot270': 'Ruota di 90° in senso antiorario: tocca dove si trovano ora i blocchi',
  'ex.matrix.rot270Badge': '90° antiorario',
  'ex.matrix.detail': '{ok}/{n} corretti',
  'ex.matrix.confirm': 'Conferma ({sel}/{n})',

  

  // tapSeq
  'ex.tapSeq.name': 'Tap Bilaterale',
  'ex.tapSeq.desc': 'Coordina entrambi i pollici per riprodurre sequenze alternate',
  'ex.tapSeq.why': 'Il tocco bimanuale alternato stimola le cortecce motorie di entrambi gli emisferi e attiva il corpo calloso.',
  'ex.tapSeq.example': '◀ ▶ ◀ ▶   Segui il ritmo con entrambi i pollici',
  'ex.tapSeq.hint': 'Tocca sinistra e destra nella sequenza indicata prima che scada il tempo',
  'ex.tapSeq.detail': '{ok}/{n} sequenze completate',

  // swipePattern
  'ex.swipePattern.name': 'Swipe Bilaterale',
  'ex.swipePattern.desc': 'Fai i due gesti insieme, prima che la barra finisca: due pollici sul telefono; al computer W A S D per la sinistra e le frecce per la destra (col mouse, uno dopo l’altro).',
  'ex.swipePattern.why': 'I gesti bimanuali simultanei sfidano il disaccoppiamento spaziale e la coordinazione motoria asimmetrica.',
  'ex.swipePattern.example': 'Scorri col pollice sinistro in su ↑ e col destro in giù ↓',
  'ex.swipePattern.hint': 'Fai i due gesti insieme, prima che la barra finisca: due pollici sul telefono; al computer W A S D per la sinistra e le frecce per la destra (col mouse, uno dopo l’altro).',
  'ex.swipePattern.together': 'Entrambe le mani insieme!',
  'ex.swipePattern.detail': '{ok}/{n} schemi corretti',

  // rhythm
  'ex.rhythm.name': 'Ritmo Bilaterale',
  'ex.rhythm.desc': 'Sincronizza i tocchi sinistro e destro sul tempo del metronomo',
  'ex.rhythm.why': 'La sincronizzazione ritmica bilaterale coinvolge il cervelletto e l’area motoria supplementare per la precisione temporale.',
  'ex.rhythm.example': 'Tocca sinistra e destra a tempo con il battito visivo',
  'ex.rhythm.hint': 'Tocca a tempo con la mano indicata. I primi 3 battiti servono a prendere il ritmo, poi il punto deve cadere nella zona verde.',
  'ex.rhythm.detail': '{ok}/{n} a tempo · errore medio {ms} ms',

  // crossMove
  'ex.crossMove.name': 'Movimenti Incrociati',
  'ex.crossMove.desc': 'Attraversa la linea mediana del corpo: rispondi sul lato opposto',
  'ex.crossMove.why': 'L’attraversamento della linea mediana forza il trasferimento interemisferico e allena l’integrazione controlaterale.',
  'ex.crossMove.example': 'Bersaglio a sinistra + "Incrocia" -> Tocca il pulsante a DESTRA',
  'ex.crossMove.same': 'Stesso lato: Tocca il lato corrispondente',
  'ex.crossMove.cross': 'INCROCIA: Tocca il lato OPPOSTO!',
  'ex.crossMove.detail': '{ok}/{n} corretti · {ms} ms',

  // dualTask
  'ex.dualTask.name': 'Dual-Task Bilaterale',
  'ex.dualTask.desc': 'Tieni premuto a sinistra mentre rispondi con la mano destra',
  'ex.dualTask.why': 'Il paradigma a doppio compito allena l’attenzione emisferica divisa e la gestione di risorse motorio-cognitive asimmetriche.',
  'ex.dualTask.example': 'Tieni premuto a sinistra mentre col pollice destro decidi Pari / Dispari',
  'ex.dualTask.hint': 'Mantieni premuto il pulsante sinistro mentre scegli Pari / Dispari prima che finisca la barra',
  'ex.dualTask.hold': 'Tieni premuto (SX)',
  'ex.dualTask.even': 'Pari',
  'ex.dualTask.odd': 'Dispari',
  'ex.dualTask.notHolding': 'Non hai tenuto premuto a sinistra!',
  'ex.dualTask.detail': '{ok}/{n} corretti',

  'board.title': 'Classifica settimanale',
  'board.nick': '{animal} {adj} {n}',
  'board.tab.days': 'Costanza',
  'board.tab.improvement': 'Miglioramento',
  'board.tab.best': 'Livello migliore',
  'board.explain.days': '10 punti per ogni giorno di allenamento, più 1 per ogni esercizio o Neuro check, fino a 12 al giorno (tre allenamenti). Conta soprattutto distribuire l’allenamento nella settimana.',
  'board.explain.improvement': 'Quanto è salito il tuo livello dall’inizio della settimana: ognuno gareggia con il proprio punto di partenza. Un esercizio nuovo parte dal suo primo livello.',
  'board.explain.best': 'Il tuo livello migliore della settimana in un esercizio.',
  'board.explain.relaxed': 'Giochi a ritmo rilassato, quindi sei in classifica con gli altri giocatori a ritmo rilassato.',
  'board.value.improvement': '{v} punti',
  'board.allExercises': 'Tutti gli esercizi',
  'board.exercise': 'Esercizio',
  'board.ageBand': 'Fascia d’età',
  'board.band.all': 'Tutte le età',
  'board.band.u30': 'Meno di 30',
  'board.band.30-49': '30–49',
  'board.band.50-64': '50–64',
  'board.band.65-74': '65–74',
  'board.band.75+': '75 e oltre',
  'board.you': 'tu',
  'board.players': '{n} giocatori questa settimana',
  'board.reset': 'Il lunedì inizia una nuova settimana: tutti ripartono da zero.',
  'board.empty': 'Ancora nessuno questa settimana. Allenati e apri tu la classifica!',
  'board.notYet': 'Non sei ancora in questa classifica: allenati questa settimana per comparire.',
  'board.loading': 'Caricamento…',
  'board.err.offline': 'Nessuna connessione. Riprova quando sei online.',
  'board.err.human_check': 'Il controllo anti-robot non è andato a buon fine. Riprova.',
  'board.err.server': 'Qualcosa è andato storto. Riprova più tardi.',
  'home.board': 'Classifica settimanale',
  'home.boardSub': 'Costanza e miglioramento, settimana dopo settimana',
  'home.boardRank': 'Costanza: {rank}° su {n} questa settimana',
  'settings.board': 'Classifica settimanale',
  'settings.boardHint': 'Facoltativa. Ogni settimana confronta quanto spesso ti alleni e quanto migliori con gli altri giocatori. Viene inviato solo un riepilogo della settimana (giorni di allenamento, variazione di livello, livello migliore per esercizio) con un nickname casuale: niente nome, email o account. Puoi uscire quando vuoi e viene cancellato tutto.',
  'settings.boardAge': 'Fascia d’età (facoltativa, per confrontarti con chi ha la tua età)',
  'settings.boardNoAge': 'Preferisco non dirlo',
  'settings.boardJoin': 'Partecipa alla classifica',
  'settings.boardJoining': 'Adesione in corso…',
  'settings.boardMember': 'Sei in classifica come {name}.',
  'settings.boardOpen': 'Apri la classifica',
  'settings.boardRename': 'Nuovo nickname',
  'settings.boardLeave': 'Esci e cancella i miei dati',
  'settings.boardLeaveConfirm': 'Uscire dalla classifica? I tuoi risultati verranno cancellati dal server.',

  'board.value.points': '{n} pt',
  'board.detail.days': '{days} g · {n} att.',
  'board.players1': '1 giocatore questa settimana',
  'board.scope': 'Classifica',
  'board.scope.all': 'Tutti',
  'board.groups': 'Gruppi',
  'groups.title': 'Gruppi di amici',
  'groups.hint': 'Crea un gruppo e manda il link o il codice a familiari e amici: solo i membri vedono il gruppo e la sua classifica.',
  'groups.empty': 'Non fai ancora parte di nessun gruppo.',
  'groups.members': '{n} membri',
  'groups.members1': '1 membro',
  'groups.code': 'Codice {code}',
  'groups.open': 'Classifica',
  'groups.invite': 'Invita',
  'groups.copied': 'Invito copiato: incollalo in un messaggio.',
  'groups.inviteText': 'Allenati con me su Synapse Dojo! Entra nel mio gruppo «{name}»: {url}',
  'groups.leave': 'Esci',
  'groups.leaveConfirm': 'Uscire dal gruppo «{name}»?',
  'groups.create': 'Crea un gruppo',
  'groups.namePlaceholder': 'Nome del gruppo (es. Famiglia)',
  'groups.createBtn': 'Crea',
  'groups.join': 'Entra con un codice',
  'groups.codePlaceholder': 'Codice d’invito',
  'groups.joinBtn': 'Entra',
  'groups.err.not_found': 'Non esiste nessun gruppo con questo codice.',
  'groups.err.limit': 'Fai già parte del numero massimo di gruppi (10).',
  'groups.err.full': 'Questo gruppo è al completo (100 membri).',
  'groups.err.bad_name': 'Scegli un nome da 1 a 30 caratteri.',
  'groups.err.not_member': 'Non fai più parte di questo gruppo.',
  'invite.title': 'Invito al gruppo «{name}»',
  'invite.text': 'Per entrare nel gruppo partecipa alla classifica settimanale: è facoltativa e puoi uscire quando vuoi.',
  'invite.textMember': 'Entra nel gruppo per confrontarti con loro ogni settimana.',
  'invite.join': 'Entra nel gruppo',
  'invite.dismiss': 'No, grazie',
  'prompt.title': 'Classifica settimanale',
  'prompt.text': 'Ti va di confrontare costanza e miglioramento con gli altri giocatori, o con gli amici in un gruppo privato? È del tutto facoltativo: partecipa solo se ti va, ed esci quando vuoi.',
  'prompt.join': 'Scopri di più',
  'prompt.later': 'Non ora',
  'prompt.never': 'Non chiedermelo più',
  'settings.boardGroups': 'Gruppi di amici',

  'board.bandHint': 'Indica la tua fascia d’età nelle Impostazioni per confrontarti con chi ha la tua età.',
  'home.boardGap': 'Ti mancano {n} punti per salire di una posizione',
  'home.boardGap1': 'Ti manca 1 punto per salire di una posizione',

  'ex.resources.money': '🪙 Spesi {cost} su {budget} · ne restano {left}',
  'ex.resources.over': '🪙 Spesi {cost} su {budget}: troppo, togli qualcosa',
  'ex.resources.earned': '📈 Guadagno: {val}',
  'ex.resources.cost': 'Costa {n} 🪙',
  'ex.resources.gain': 'Guadagni {n} 🪙',
  'ex.resources.was': 'si potevano guadagnare {n}',

  'groups.creator': 'creatore',
  'groups.idle': 'Nessun allenamento questa settimana',
  'groups.remove': 'Togli dal gruppo',
  'groups.removeConfirm': 'Togliere {name} da «{group}»? Potrà rientrare con il codice d’invito.',

  'settings.saved': 'Salvato',

  'groups.copyCode': 'Copia codice',
  'groups.codeCopied': 'Codice copiato',
  'groups.copyFailed': 'Copia non riuscita: seleziona il codice e copialo a mano',
  'groups.ban': 'Banna dal gruppo',
  'groups.banConfirm': 'Bannare {name} da «{group}»? Verrà tolto dal gruppo e non potrà più rientrare, nemmeno con il codice d’invito.',
  'groups.actionsHint': '✕ toglie dal gruppo (può rientrare con il codice) · 🚫 banna (non può più rientrare)',
  'groups.bannedTitle': 'Bannati ({n})',
  'groups.unban': 'Riammetti',
  'groups.err.banned': 'Non puoi entrare in questo gruppo: il suo creatore ti ha bannato.',

  'groups.newCode': 'Nuovo codice',
  'groups.newCodeConfirm': 'Sostituire il codice di «{group}»? Il vecchio codice e i link d’invito smetteranno di funzionare. Chi è già nel gruppo resta dentro.',
  'groups.newCodeDone': 'Nuovo codice creato: quello vecchio non funziona più',
};

const words: string[] = [
  // 4 lettere
  'pane', 'faro', 'molo', 'lupo', 'nido', 'pera', 'nave', 'mela', 'sole', 'luna',
  'rosa', 'topo', 'cono', 'onda', 'vaso', 'spia', 'arco', 'dado', 'lama', 'tana',
  'pino', 'rana', 'seta', 'tubo', 'volo', 'remo', 'duna', 'fune', 'telo', 'cura',
  'orlo', 'lago', 'voto', 'fata', 'rete', 'capo', 'buco', 'muro', 'filo', 'uovo',
  // 5 lettere
  'barca', 'treno', 'tazza', 'drago', 'gatto', 'zaino', 'fiume', 'ponte', 'pesce', 'porta',
  'cuore', 'prato', 'piuma', 'bosco', 'spada', 'ruota', 'sasso', 'corda', 'tenda', 'volpe',
  'pasta', 'fuoco', 'perla', 'ragno', 'corvo', 'scala', 'notte', 'tasto', 'torre', 'fiore',
  'posto', 'museo', 'sogno', 'cassa', 'banco', 'tempo', 'vetro', 'vento', 'campo', 'corno',
  'clima', 'salto', 'legno', 'fango', 'isola', 'foglia', 'sabbia', 'tigre', 'libro', 'disco',
  // 6 lettere
  'albero', 'anello', 'limone', 'scarpa', 'corona', 'fabbro', 'scudo', 'quadro', 'stella', 'pietra',
  'chiave', 'mulino', 'farina', 'motore', 'strada', 'tesoro', 'frutto', 'matita', 'catena', 'balena',
  'piazza', 'moneta', 'cometa', 'ghianda', 'spugna', 'candela', 'valigia', 'mattone', 'cavallo', 'camera',
  'foglio', 'parola', 'musica', 'sapone', 'scoglio', 'tavolo', 'natura', 'figura', 'favola', 'casale',
  'grotta', 'teatro', 'pianta', 'viaggio', 'boschi', 'cerchio', 'pittore', 'falco', 'medico', 'regina',
  // 7 lettere
  'delfino', 'farfalla', 'lampada', 'fragola', 'aquilone', 'castello', 'martello', 'formica', 'tamburo', 'pianura',
  'finestra', 'campana', 'sciarpa', 'giardino', 'orologio', 'pettine', 'bottiglia', 'lanterna', 'forbici', 'giraffa',
  'pinguino', 'specchio', 'violino', 'gabbiano', 'sentiero', 'palazzo', 'foresta', 'miniera', 'disegno', 'balcone',
  'fontana', 'profumo', 'pianeta', 'argento', 'veliero', 'tramonto', 'carrello', 'cavaliere', 'cristallo', 'chitarra',
  // 8 lettere
  'elefante', 'montagna', 'quaderno', 'vulcano', 'cuscino', 'cappello', 'bottone', 'carrozza', 'trombetta', 'diamante',
  'scultore', 'tempesta', 'giostra', 'smeraldo', 'formaggio', 'pescatore', 'castagna', 'orizzonte', 'torrente', 'elicottero',
  'labirinto', 'mappamondo', 'tartaruga', 'barattolo', 'conchiglia', 'ghiacciaio', 'lampadario', 'passerotto', 'scoiattolo', 'tamburino',
];

const passages: Passage[] = [
  {
    text: 'Il faro dell’isola di Pietrabianca fu acceso per la prima volta in una notte di nebbia del 1891. Il guardiano, un ex pescatore di nome Ottavio, saliva i centotrenta gradini della torre due volte al giorno per pulire la grande lente e controllare l’olio della lampada. Quando arrivò l’elettricità, molti anni dopo, il faro diventò automatico e Ottavio fu l’ultimo guardiano a vivere sull’isola.',
    question: 'Quanti gradini aveva la torre?',
    answers: ['Centotrenta', 'Trecento', 'Novantuno'],
  },
  {
    text: 'Le api che trovano un buon campo di fiori tornano all’alveare e compiono una danza particolare. L’angolo della danza rispetto alla verticale indica la direzione del cibo rispetto al sole, mentre la durata della parte centrale comunica quanto è lontano. Le compagne osservano, imparano il percorso e partono a loro volta, senza che nessuna abbia bisogno di una mappa.',
    question: 'Che cosa indica la durata della danza?',
    answers: ['La distanza del cibo', 'Il tipo di fiore', 'L’ora del giorno'],
  },
  {
    text: 'Marta aveva deciso di imparare a fare il pane. Il primo tentativo uscì dal forno duro come un sasso, il secondo era crudo al centro. Al terzo tentativo capì il problema: la cucina era troppo fredda e l’impasto non lievitava. Da quel giorno lascia la ciotola vicino al termosifone, coperta da un panno, e la domenica mattina tutta la casa profuma di pane caldo.',
    question: 'Perché il pane di Marta non veniva bene?',
    answers: ['La cucina era troppo fredda', 'Usava troppo sale', 'Il forno era rotto'],
  },
  {
    text: 'In montagna la temperatura scende in media di circa sei gradi e mezzo ogni mille metri di altitudine. Per questo, anche in piena estate, sulle cime più alte si trova la neve. Gli escursionisti esperti portano sempre con sé una giacca pesante, perché una bella giornata a valle può diventare fredda e ventosa poche ore dopo, una volta arrivati in quota.',
    question: 'Di quanto scende la temperatura ogni mille metri?',
    answers: ['Circa sei gradi e mezzo', 'Circa due gradi', 'Circa quindici gradi'],
  },
  {
    text: 'Nel piccolo paese di Valfonda il mercato si narrative ogni giovedì in piazza. Il banco più frequentato non è quello della frutta né quello dei formaggi, ma quello di Elio, che ripara orologi e radio da più di quarant’anni. La gente si ferma anche solo per chiacchierare: Elio conosce la storia di ogni famiglia e ricorda il nome di tutti.',
    question: 'Che lavoro fa Elio?',
    answers: ['Ripara orologi e radio', 'Vende formaggi', 'Coltiva frutta'],
  },
  {
    text: 'Il polpo ha tre cuori e il sangue blu. Due cuori pompano il sangue verso le branchie, il terzo lo spinge nel resto del corpo. È anche un abilissimo trasformista: grazie a cellule speciali nella pelle può cambiare colore in una frazione di secondo per mimetizzarsi o per comunicare. Alcuni polpi usano persino gusci di noce di cocco come rifugi portatili.',
    question: 'Quanti cuori ha il polpo?',
    answers: ['Tre', 'Uno', 'Otto'],
  },
  {
    text: 'Le sequoie giganti della California sono tra gli alberi più longevi al mondo, potendo superare i tremila anni. Uno dei loro segreti di sopravvivenza è la corteccia: spessa fino a trenta centimetri e priva di resina infiammabile, protegge l’albero dal calore dei frequenti incendi boschivi, che al contrario bruciano i cespugli e concimano il terreno circostante.',
    question: 'Cosa protegge le sequoie dagli incendi boschivi?',
    answers: ['La corteccia spessa fino a trenta centimetri', 'Le radici profonde nella roccia', 'La produzione di linfa acquosa'],
  },
  {
    text: 'Il geco è celebre per la capacità di correre sui soffitti e sui vetri più lisci senza scivolare. Non usa ventose né sostanze appiccicose, bensì milioni di setole microscopiche presenti sotto le dita. Queste setole interagiscono con le molecole della superficie attraverso le forze di Van der Waals, creando un’adesione fortissima che si stacca all’istante sollevando il dito con la giusta inclinazione.',
    question: 'Cosa permette al geco di camminare sui vetri?',
    answers: ['Milioni di setole microscopiche', 'Una secrezione adesiva naturale', 'Piccole ventose sotto i polpastrelli'],
  },
  {
    text: 'A bordo delle antiche navi a vela, la velocità veniva misurata con il solcometro a barchetta. Uno zatterino di legno legato a una corda con nodi equidistanti veniva gettato a poppa, mentre un marinaio capovolgeva una clessidra da trenta secondi. Il numero di nodi che scorrevano tra le mani prima che la sabbia finisse indicava la velocità in miglia orarie, da cui nacque il termine nodo.',
    question: 'Quanto durava la clessidra usata per misurare la velocità delle navi?',
    answers: ['Trenta secondi', 'Tre minuti', 'Un quarto d’ora'],
  },
  {
    text: 'I piccioni viaggiatori possiedono uno straordinario sistema di navigazione a lungo raggio. Oltre a orientarsi con la posizione del sole e la mappa olfattiva dei venti, hanno nel becco microscopici cristalli di magnetite collegati al sistema nervoso. Questi cristalli funzionano come una bussola biologica che permette loro di leggere l’inclinazione del campo magnetico terrestre anche in giorni nuvolosi.',
    question: 'Cosa contengono i piccioni nel becco per orientarsi col campo magnetico?',
    answers: ['Minuscoli cristalli di magnetite', 'Ghiandole sensibili alla pressione', 'Recettori di calore solare'],
  },
  {
    text: 'Nel settembre del 1783, i fratelli Montgolfier organizzarono a Versailles la prima dimostrazione pubblica di volo con passeggeri viventi. Per verificare che l’aria in quota fosse respirabile, caricarono nel cesto di vimini una pecora di nome Montauciel, un’anatra e un gallo. Dopo un volo di otto minuti a circa cinquecento metri di altezza, gli animali atterrarono illesi in un bosco.',
    question: 'Quali animali volarono sulla prima mongolfiera a Versailles?',
    answers: ['Una pecora, un’anatra e un gallo', 'Due cani da caccia e un gatto', 'Un falco e una colomba'],
  },
  {
    text: 'Il bambù gigante detiene il record di pianta terrestre a crescita più rapida. In condizioni climatiche favorevoli, durante la stagione delle piogge, i suoi germogli possono allungarsi di quasi un metro nell’arco di appena ventiquattro ore. Questa velocità impressionante è dovuta al fatto che tutte le cellule del fusto sono già formate all’inizio e si distendono assorbendo acqua come spugne.',
    question: 'Di quanto può allungarsi il bambù gigante in un solo giorno?',
    answers: ['Quasi un metro', 'Dieci centimetri', 'Tre metri'],
  },
  {
    text: 'Nelle gole più profonde delle Ande, gli Inca costruivano ponti sospesi capaci di superare fiumi impetuosi senza usare piloni o metallo. Intere comunità intrecciavano erba secca delle alture in corde sottili, che poi venivano unite in fasci spessi come tronchi d’albero. Ogni anno il ponte vecchio veniva tagliato e ricostruito da capo in tre giorni di festa collettiva.',
    question: 'Con che materiale venivano costruiti i ponti sospesi inca?',
    answers: ['Erba secca intrecciata in grandi fasci', 'Strisce di cuoio di lama', 'Tavole di cedro legate con canapa'],
  },
  {
    text: 'Nel 1610 Galileo Galilei puntò il suo cannocchiale autocostruito verso Giove e notò quattro piccoli astri disposti in fila retta vicino al pianeta. Nei giorni successivi vide che cambiavano posizione girandogli attorno: erano le quattro lune maggiori, oggi chiamate galileiane. Fu la prima prova visiva inconfutabile che non tutti i corpi celesti orbitavano attorno alla Terra.',
    question: 'Quanti satelliti di Giove osservò Galileo per la prima volta?',
    answers: ['Quattro', 'Due', 'Sette'],
  },
  {
    text: 'Nelle foreste dell’America Centrale, i Maya consideravano i semi dell’albero del cacao un dono divino e un bene prezioso. Non solo venivano usati come moneta corrente per scambi commerciali, ma servivano a preparare una bevanda cerimoniale densa e amara, montata a lungo per produrre una spessa schiuma e aromatizzata con peperoncino e vaniglia.',
    question: 'Con quale spezia piccante i Maya insaporivano la bevanda al cacao?',
    answers: ['Peperoncino', 'Zenzero selvatico', 'Chiodi di garofano'],
  },
  {
    text: 'In alcune lagune tropicali dell’Oceano Pacifico, l’acqua si illumina di una luce azzurra scintillante ogni volta che viene agitata dalle onde o dal passaggio di una barca. Questo fenomeno è causato da minuscole alghe unicellulari chiamate dinoflagellati: quando avvertono una pressione meccanica, attivano una reazione chimica protettiva che produce un lampo di luce bioluminescente.',
    question: 'Di che colore è la luce emessa dal plancton bioluminescente?',
    answers: ['Azzurra scintillante', 'Verde smeraldo', 'Giallo dorato'],
  },
  {
    text: 'Il camaleonte non cambia colore della pelle mescolando pigmenti come su una tavolozza. Sotto l’epidermide possiede uno strato di cellule contenenti nanocristalli di guanina disposti a griglia. Quando il rettile si emoziona o si rilassa, modifica la distanza tra questi cristalli: avvicinandoli o allontanandoli seleziona quale lunghezza d’onda della luce viene riflessa verso l’esterno.',
    question: 'In che modo il camaleonte cambia colore?',
    answers: ['Modificando la distanza tra nanocristalli nella pelle', 'Rilasciando inchiostri da ghiandole interne', 'Aumentando la temperatura superficiale'],
  },
  {
    text: 'Secondo un’antica leggenda diffusa sugli altopiani dell’Etiopia, la pianta del caffè fu scoperta da un giovane pastore di nome Kaldi. Un giorno Kaldi notò che il suo gregge di capre, dopo aver brucato le bacche rosse di un cespuglio sconosciuto, correva e saltava con un’energia inconsueta per tutta la notte. Incuriosito, colse le bacche e le portò ai saggi del vicino monastero.',
    question: 'Chi fu il primo a notare l’effetto energizzante delle bacche di caffè?',
    answers: ['Un giovane pastore di capre di nome Kaldi', 'Un mercante di spezie del Mar Rosso', 'Un medico viaggiatore'],
  },
  {
    text: 'Nell’inlandsis dell’Antartide la neve accumulata nei millenni si è compressa trasformandosi in ghiaccio compatto. Intrappolate tra i cristalli di ghiaccio si trovano minuscole bollicine d’aria sigillate da centinaia di migliaia di anni. Estraendo carote di ghiaccio profonde oltre tremila metri, i paleoclimatologi possono campionare direttamente l’atmosfera del passato.',
    question: 'Cosa trovano i ricercatori intrappolato nel ghiaccio dell’Antartide?',
    answers: ['Bollicine d’aria sigillate da centinaia di migliaia di anni', 'Gocce d’acqua marina fossilizzata', 'Spore di piante equatoriali'],
  },
  {
    text: 'In una dozzina di deserti in tutto il mondo accade il raro fenomeno delle dune cantanti. Quando grandi valanghe di sabbia asciutta scivolano spontaneamente lungo i pendii ripidi, i granelli di quarzo della stessa dimensione sfregano tra loro alla medesima frequenza, generando un rombo profondo e armonico che può durare diversi minuti e sentirsi a chilometri di distanza.',
    question: 'Da cosa è prodotto il suono cupo delle dune cantanti?',
    answers: ['Dallo sfregamento uniforme dei granelli di sabbia in movimento', 'Dalle correnti di vento che penetrano nelle fenditure rocciose', 'Dall’eco dei fiumi sotterranei sotto la sabbia'],
  },
];

import type { StoryScenario } from '../i18n';

export const stories: StoryScenario[] = [
  {
    "name": "Elena",
    "item": "una borsa blu",
    "itemDistractors": [
      "uno zaino rosso",
      "una valigia verde"
    ],
    "place": "sotto la panchina del parco",
    "placeDistractors": [
      "davanti al bar",
      "sul treno"
    ],
    "time": "alle 15:30",
    "timeDistractors": [
      "alle 18:00",
      "alle 12:15"
    ]
  },
  {
    "name": "Marco",
    "item": "un taccuino di cuoio",
    "itemDistractors": [
      "un libro illustrato",
      "un tablet nero"
    ],
    "place": "sul tavolo della biblioteca",
    "placeDistractors": [
      "in terrazza",
      "nella sala d’attesa"
    ],
    "time": "giovedì mattina",
    "timeDistractors": [
      "venerdì pomeriggio",
      "martedì sera"
    ]
  },
  {
    "name": "Sara",
    "item": "una bicicletta gialla",
    "itemDistractors": [
      "un monopattino argento",
      "una vespa bianca"
    ],
    "place": "accanto alla fontana centrale",
    "placeDistractors": [
      "davanti al comune",
      "dietro al chiosco"
    ],
    "time": "alle 9:00",
    "timeDistractors": [
      "alle 11:30",
      "alle 14:00"
    ]
  },
  {
    "name": "Davide",
    "item": "una sciarpa di lana rossa",
    "itemDistractors": [
      "un berretto blu",
      "una giacca marrone"
    ],
    "place": "sulla sedia del caffè",
    "placeDistractors": [
      "sul muretto del porto",
      "nel corridoio dell’ufficio"
    ],
    "time": "sabato sera",
    "timeDistractors": [
      "domenica mattina",
      "mercoledì alle 16:00"
    ]
  },
  {
    "name": "Giulia",
    "item": "un vaso di ceramica bianca",
    "itemDistractors": [
      "una lampada dorata",
      "un quadro di legno"
    ],
    "place": "sul davanzale della cucina",
    "placeDistractors": [
      "sul bancone dell’ingresso",
      "sulla mensola della sala"
    ],
    "time": "alle 17:45",
    "timeDistractors": [
      "alle 20:00",
      "alle 10:15"
    ]
  },
  {
    "name": "Luca",
    "item": "un binocolo da marinaio",
    "itemDistractors": [
      "una bussola d’ottone",
      "una mappa antica"
    ],
    "place": "sopra la roccia del faro",
    "placeDistractors": [
      "sulla prua della barca",
      "nella cabina del molo"
    ],
    "time": "alle prime luci dell’alba",
    "timeDistractors": [
      "al tramonto",
      "a mezzogiorno in punto"
    ]
  },
  {
    "name": "Chiara",
    "item": "una macchina fotografica vintage",
    "itemDistractors": [
      "una custodia di lenti",
      "un treppiede d’alluminio"
    ],
    "place": "sulla terrazza panoramica",
    "placeDistractors": [
      "lungo il viale dei tigli",
      "sul ponte dei sospiri"
    ],
    "time": "venerdì al tramonto",
    "timeDistractors": [
      "sabato all’alba",
      "giovedì pomeriggio"
    ]
  },
  {
    "name": "Matteo",
    "item": "un orologio da tasca dorato",
    "itemDistractors": [
      "un bracciale d’argento",
      "un anello antico"
    ],
    "place": "sul banco dell’antiquario",
    "placeDistractors": [
      "nella cassaforte dell’hotel",
      "nella vetrina centrale"
    ],
    "time": "lunedì alle 11:00",
    "timeDistractors": [
      "mercoledì alle 15:30",
      "venerdì alle 9:15"
    ]
  },
  {
    "name": "Valentina",
    "item": "un ombrello a pois gialli",
    "itemDistractors": [
      "un impermeabile verde",
      "uno scialle di seta"
    ],
    "place": "alla fermata del tram",
    "placeDistractors": [
      "all’ingresso della metro",
      "sotto il porticato della piazza"
    ],
    "time": "mercoledì sotto la pioggia",
    "timeDistractors": [
      "martedì all’uscita dal lavoro",
      "giovedì sera"
    ]
  },
  {
    "name": "Simone",
    "item": "una scatola di latta dipinta",
    "itemDistractors": [
      "un cofanetto di legno",
      "un barattolo di vetro"
    ],
    "place": "sul gradino del teatro",
    "placeDistractors": [
      "nella corsia del cinema",
      "accanto alla biglietteria"
    ],
    "time": "domenica alle 14:30",
    "timeDistractors": [
      "sabato alle 21:00",
      "lunedì alle 18:00"
    ]
  },
  {
    "name": "Federica",
    "item": "una mappa stellare arrotolata",
    "itemDistractors": [
      "un globo terrestre",
      "un astrolabio di bronzo"
    ],
    "place": "all’osservatorio della collina",
    "placeDistractors": [
      "nella torretta del castello",
      "sul prato del planetario"
    ],
    "time": "a mezzanotte serena",
    "timeDistractors": [
      "alle dieci di sera",
      "alle due del mattino"
    ]
  },
  {
    "name": "Andrea",
    "item": "una chiave di ferro intarsiata",
    "itemDistractors": [
      "un lucchetto pesante",
      "un medaglione inciso"
    ],
    "place": "nella cassapanca della soffitta",
    "placeDistractors": [
      "dietro il quadro in salotto",
      "nel cassetto dello scrittoio"
    ],
    "time": "martedì alle 16:15",
    "timeDistractors": [
      "giovedì alle 10:30",
      "domenica pomeriggio"
    ]
  },
  {
    "name": "Silvia",
    "item": "una teiera di ghisa smaltata",
    "itemDistractors": [
      "una caraffa di cristallo",
      "una tazza di porcellana"
    ],
    "place": "sul tavolino della serra",
    "placeDistractors": [
      "nel gazebo in giardino",
      "sul bancone del laboratorio"
    ],
    "time": "sabato alle 10:00",
    "timeDistractors": [
      "domenica alle 17:00",
      "venerdì a colazione"
    ]
  },
  {
    "name": "Lorenzo",
    "item": "un flauto di legno di noce",
    "itemDistractors": [
      "un mandolino antico",
      "un archetto d’ebano"
    ],
    "place": "sul ponte di pietra ad arco",
    "placeDistractors": [
      "lungo la riva del torrente",
      "all’ombra della quercia secolare"
    ],
    "time": "mercoledì mattina presto",
    "timeDistractors": [
      "giovedì all’imbrunire",
      "sabato pomeriggio"
    ]
  },
  {
    "name": "Alice",
    "item": "una scatola di pastelli a cera",
    "itemDistractors": [
      "un album da disegno",
      "una tavolozza di colori a olio"
    ],
    "place": "sulla scalinata del museo",
    "placeDistractors": [
      "nel chiostro medievale",
      "all’entrata della galleria d’arte"
    ],
    "time": "domenica alle 16:45",
    "timeDistractors": [
      "sabato a mezzogiorno",
      "martedì alle 14:00"
    ]
  },
  {
    "name": "Fabio",
    "item": "un cappello di paglia intrecciata",
    "itemDistractors": [
      "un paio di occhiali da sole",
      "una bandana a quadri"
    ],
    "place": "sul molo dei pescatori",
    "placeDistractors": [
      "sulla spiaggia delle conchiglie",
      "all’ancoraggio delle barche a vela"
    ],
    "time": "venerdì a mezzogiorno",
    "timeDistractors": [
      "domenica alle 11:00",
      "mercoledì alle 15:00"
    ]
  },
  {
    "name": "Beatrice",
    "item": "una lanterna d’ottone lucido",
    "itemDistractors": [
      "un candelabro a tre bracci",
      "una torcia tascabile"
    ],
    "place": "nel portico dell’antico cortile",
    "placeDistractors": [
      "lungo il corridoio affrescato",
      "davanti al portone monumentale"
    ],
    "time": "giovedì sera alle 20:30",
    "timeDistractors": [
      "venerdì all’imbrunire",
      "sabato a tarda notte"
    ]
  },
  {
    "name": "Roberto",
    "item": "una radiolina portatile a pile",
    "itemDistractors": [
      "un giradischi compatto",
      "un altoparlante tascabile"
    ],
    "place": "sul banco della falegnameria",
    "placeDistractors": [
      "nella casetta degli attrezzi",
      "all’officina meccanica"
    ],
    "time": "lunedì alle 8:30",
    "timeDistractors": [
      "mercoledì alle 13:00",
      "venerdì alle 17:15"
    ]
  },
  {
    "name": "Camilla",
    "item": "un ventaglio di seta ricamata",
    "itemDistractors": [
      "uno scialle di pizzo nero",
      "una cuffia di velluto"
    ],
    "place": "nel loggiato del castello",
    "placeDistractors": [
      "sul balcone della torre",
      "nella sala degli specchi"
    ],
    "time": "martedì al tramonto",
    "timeDistractors": [
      "giovedì pomeriggio",
      "domenica a sera"
    ]
  },
  {
    "name": "Gabriele",
    "item": "un diario di bordo ingiallito",
    "itemDistractors": [
      "un atlante nautico rilegato",
      "una pergamena con sigillo"
    ],
    "place": "nella cantina del vecchio torchio",
    "placeDistractors": [
      "nella stiva del veliero",
      "nella rimessa delle carrozze"
    ],
    "time": "sabato pomeriggio alle 15:00",
    "timeDistractors": [
      "lunedì alle 11:30",
      "mercoledì sera"
    ]
  },
  {
    "name": "Martina",
    "item": "una scatola di cioccolatini fondenti",
    "itemDistractors": [
      "un cestino di biscotti speziati",
      "una torta alle mandorle"
    ],
    "place": "nella vetrina della pasticceria",
    "placeDistractors": [
      "sul tavolino della sala da tè",
      "all’ingresso della drogheria"
    ],
    "time": "giovedì alle 17:00",
    "timeDistractors": [
      "sabato alle 10:30",
      "domenica alle 16:15"
    ]
  },
  {
    "name": "Giorgio",
    "item": "una lente d’ingrandimento rotonda",
    "itemDistractors": [
      "un microscopio portatile",
      "un paio di pinzette di precisione"
    ],
    "place": "sulla scrivania dello studio",
    "placeDistractors": [
      "sull’archivio di famiglia",
      "sul tavolo da disegno tecnico"
    ],
    "time": "mercoledì alle 19:30",
    "timeDistractors": [
      "martedì alle 12:00",
      "venerdì alle 18:45"
    ]
  },
  {
    "name": "Serena",
    "item": "una borsa di tela ecologica",
    "itemDistractors": [
      "un cesto di vimini chiaro",
      "uno zaino da trekking"
    ],
    "place": "alla bancarella dei libri usati",
    "placeDistractors": [
      "al mercato dei fiori",
      "davanti al negozio bio"
    ],
    "time": "domenica mattina alle 10:15",
    "timeDistractors": [
      "sabato alle 16:00",
      "giovedì alle 11:45"
    ]
  },
  {
    "name": "Pietro",
    "item": "una custodia per violoncello",
    "itemDistractors": [
      "una borsa porta-spartiti",
      "una custodia di chitarra classica"
    ],
    "place": "sul palco del giardino d’inverno",
    "placeDistractors": [
      "nel foyer dell’auditorium",
      "all’ingresso della sala concerti"
    ],
    "time": "venerdì sera alle 21:15",
    "timeDistractors": [
      "sabato pomeriggio",
      "domenica alle 18:30"
    ]
  }
];

const nicknames = {
  adjectives: [
    'Veloce', 'Brillante', 'Sereno', 'Coraggioso', 'Astuto', 'Gentile', 'Felice', 'Audace',
    'Tranquillo', 'Fortunato', 'Radioso', 'Saggio', 'Costante', 'Curioso', 'Allegro', 'Agile',
    'Paziente', 'Attento', 'Generoso', 'Vivace', 'Fiero', 'Sorridente', 'Rapido', 'Nobile',
    'Acuto', 'Instancabile', 'Arguto', 'Intrepido', 'Dorato', 'Argentato', 'Azzurro', 'Verde',
  ],
  animals: [
    'Lupo', 'Gufo', 'Delfino', 'Panda', 'Koala', 'Falco', 'Cigno', 'Castoro',
    'Pinguino', 'Leone', 'Orso', 'Cervo', 'Riccio', 'Tasso', 'Airone', 'Pettirosso',
    'Fenicottero', 'Gabbiano', 'Pellicano', 'Camaleonte', 'Geco', 'Pappagallo', 'Canguro', 'Bisonte',
    'Ghepardo', 'Leopardo', 'Lemure', 'Procione', 'Scoiattolo', 'Coniglio', 'Elefante', 'Colibrì',
  ],
};

/** Valid words made of the same letters as a word in `words`, which Anagrams also accepts as answers. */
const anagramWords: string[] = [
  'PENA', 'FORA', 'OLMO', 'NODI', 'DONI', 'PARE', 'APRE', 'RAPE', 'ARPE', 'VENA',
  'VANE', 'MALE', 'LAME', 'ALME', 'LESO', 'LOSE', 'RASO', 'ORSA', 'ARSO', 'ULNA',
  'DONA', 'CARO', 'ROCA', 'OCRA', 'ORCA', 'ALMA', 'MALA', 'NATA', 'ANTA', 'PONI',
  'TESA', 'ASTE', 'ORME', 'MERO', 'MORE', 'NUDA', 'LETO', 'LORO', 'GOLA', 'GOAL',
  'ERTE', 'POCA', 'COPA', 'CUBO', 'ENTRO', 'TERNO', 'TONER', 'GRADO', 'DROGA', 'GOTTA',
  'PENTO', 'PARTO', 'CARDO', 'GRANO', 'RANGO', 'ROGNA', 'ARGON', 'NETTO', 'TENTO', 'STATO',
  'TOSTA', 'TOAST', 'RETRO', 'FIERO', 'RONCO', 'CALMI', 'STOLA', 'FOGNA', 'ASILO', 'SOLAI',
  'ALLENO', 'MONILE', 'MELONI', 'CANORO', 'STALLE', 'REMOTO', 'ROSETO', 'ESORTO', 'TATAMI', 'BANALE',
  'PAZZIA', 'METANO', 'MENATO', 'AMENTO', 'METTANO', 'MONTATE', 'PESANO', 'PENOSA', 'VOLATO', 'ATTORE',
  'ORETTA', 'ETTARO', 'PATINA', 'TAPINA', 'APERTI', 'PARETI', 'APRITE', 'RAPITE', 'RIPETA', 'PATIRE',
  'PATRIE', 'PIRATE', 'PERITA', 'ORECCHI', 'POTERTI', 'DECIMO', 'ARGINE', 'GERANI', 'IGNARE', 'DIRIGANO',
  'GRAFFIA', 'ORTENSIE', 'TORINESE', 'INTESERO', 'MANIERI', 'REGNATO', 'ROGANTE', 'CROLLARE', 'COLEOTTERI', 'LUMINO',
  'FARNIA', 'LASCA', 'AFTA', 'GRETI', 'TERGI', 'ALBORE', 'MACERA', 'SALACE', 'SCIOLGO', 'GRATTO',
  'SCOLLATE', 'COSTELLA', 'SFRENATI', 'RAPISCA', 'PENTITE', 'DESIGNO', 'VOLIERE', 'VOLEREI', 'MANDIATE', 'RIBALTONI',
];

export default { ui, words, anagramWords, passages, stories, nicknames };
