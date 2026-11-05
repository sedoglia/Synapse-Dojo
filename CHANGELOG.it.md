# Registro delle modifiche

> *Read this in [English](CHANGELOG.md).*

Qui sono elencate tutte le modifiche rilevanti a Synapse Dojo (chiamato Synapse Gym fino alla 0.6.0), dalla più recente. Il formato segue [Keep a Changelog](https://keepachangelog.com/it-IT/1.0.0/).

I numeri di versione vengono da `package.json` e ogni data è il giorno del commit che ha impostato quella versione. Un commit fatto dopo un cambio di versione è elencato sotto la versione successiva, la prima a includerlo. Il codice breve tra parentesi è il commit Git.

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
