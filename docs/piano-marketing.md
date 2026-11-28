# Piano marketing di Synapse Dojo

Piano di lancio e crescita per synapsedojo.com e l'app Android, scritto il 28 novembre 2026. È pronto da eseguire
il giorno in cui Google Play approva l'accesso alla produzione (chiamato **G0** in tutto il documento).

Stato di partenza: sito 0.25.1 online, app pubblicata su Huawei AppGallery, Google Play con l'accesso alla produzione in
valutazione, Uptodown in *pending review*.

**Aggiornamento del 28 novembre 2026 (sito 0.27.0).** Sono già online i primi due motori:

- **Motore 1:** pagine dei 40 giochi in 25 lingue, in `/games/<slug>` e `/<lingua>/games/<slug>` (PR #135). Sitemap inviata a
  Google (1054 URL) e a Bing, con Crawler Hints/IndexNow attivo su Cloudflare.
- **Motore 2:** sfida del giorno con il lucchetto di Crack the Code, uguale per tutti e condivisibile come riga di quadratini,
  con la pagina `/daily` (PR #137). Per ora resta solo il lucchetto, senza rotazione di giochi.

---

## 1. Cosa dicono i dati

Ricerche fatte con treg il 28/11/2026: volumi Google Ads con DataForSEO per USA, Italia e Brasile, ricerca su Google Play
con SerpApi, video TikTok più apprezzati con TikHub, post Reddit con ScrapeCreators e la SERP di Google. Spesa totale:
circa 0,31 $.

### 1.1 La gente non cerca «brain training», cerca il singolo gioco o il singolo test

| Keyword (USA, ricerche al mese) | Volume | Concorrenza | Cosa c'è già in Synapse Dojo |
| --- | ---: | --- | --- |
| sudoku | 2.740.000 | bassa | — (niente sudoku) |
| 2048 | 823.000 | bassa | 🧱 2048 |
| **reaction time test** | **135.000** | bassa, CPC 3,86 $ | ⏱️ Tempo di reazione |
| **tangram** | **110.000** | bassa | 🧩 Tangram |
| **nonogram** | **74.000** | bassa | 🖼️ Nonogram |
| logic games | 74.000 (picchi) | bassa | Ragionamento e pianificazione |
| **memory games** | **49.500** | bassa | Memoria episodica |
| brain games | 40.500 | bassa | tutto |
| lumosity | 33.100 | bassa | concorrente |
| brain teasers | 27.100 | bassa | — |
| **stroop test** | **14.800** | bassa, CPC 3,12 $ | 🎨 Scontro di colori |
| memory test | 9.900 | bassa | — |
| **dual n back** | **5.400** | bassa | 🔁 Eco |
| brain training / brain training app | 5.400 | bassa | tutto |
| brain games for adults / memory games for adults | 5.400 ciascuna | media | tutto |
| working memory test | 1.300 | bassa | Memoria di lavoro |
| neuronation / cognifit / elevate app | 590 / 1.600 / 3.600 | bassa | concorrenti |

Italia: «giochi di logica» 4.400, «giochi per la mente» 2.900, «giochi di memoria» 1.900, «esercizi per la memoria»
1.300, «test di memoria» 1.000, «test riflessi» 1.000, «giochi per anziani» 880, **«giochi senza pubblicità» 880**,
«test di Stroop» 720. Tangram 18.100 e nonogram 9.900. «Allenamento cerebrale» ha appena 30 ricerche: è un termine da
scheda dello store, non da motore di ricerca.

Brasile: «jogos de memória» 14.800, «jogos de lógica» 5.400, «jogos para idosos» 4.400, «teste de reflexo» 3.600,
«teste de memória» 2.400.

**Conseguenza:** il sito oggi ha 4 URL nella sitemap (home, guida, privacy, licenza). Il traffico organico vero sta in
**una pagina giocabile per ogni test noto**, in più lingue. È la leva SEO più grande e quasi a costo zero (§4).

### 1.2 Concorrenti su Google Play

Ricerca «brain training» (USA): Lumosity, Elevate, NeuroNation, Peak, Impulse (tutti 10 M+), CogniFit (1 M+), Brain Test
(100 M+, ma sono indovinelli), Matiks, MindPal, Brainwell. In Italia ci sono gli stessi più Senior Games («Allena il tuo
cervello», 1-5 M+) e Neurobics.

I grandi hanno tutti lo stesso modello: prova gratuita, poi abbonamento da decine di euro l'anno, con funzioni bloccate. È il
punto debole che Synapse Dojo può colpire.

### 1.3 Cosa cercano le persone (Reddit e Google)

- Su **r/BuyFromEU** escono di continuo post come «European alternative to brain training apps like Lumosity/CogniFit»
  e «Free European alternative to Lumosity/Elevate» (47, 39 e 25 upvote quest'anno). **Synapse Dojo è esattamente la
  risposta**: italiano, gratuito, senza account né cookie, dati sul dispositivo.
- Per «free lumosity alternative no subscription» Google mostra un thread di r/AndroidGaming, poi una manciata di piccoli
  indie (senwitt.com, moadly.app, habz.app, playblanked.com), ognuno con una pagina «Lumosity alternative». Le domande
  correlate: «Is there a completely free brain training app?», «Apps like Elevate but free». La nicchia è aperta.
- Altri indie si promuovono su r/SideProject, r/WebGames, r/alphaandbetausers e r/TestMyApp: sono i canali giusti per
  un progetto solo.

### 1.4 Cosa diventa virale su TikTok

I video più visti su «reaction time test», «memory test challenge» e «brain test» seguono tutti lo stesso schema:

- **Lo spettatore gioca**: «Can you beat 0.27?» (57 M di visualizzazioni), «Test yourself. Don't blink. How far did you
  get?» (12 M), «Memory test» (16 M), «Comment your answer before looking at the comments!».
- **Chiedono un numero nei commenti**: «what's your time?», «quante ne hai indovinate?». I commenti spingono l'algoritmo.
- **Durata**: i test di reazione stanno sui 7-17 secondi; i test di memoria funzionano bene anche a 60-130 secondi.
- **Hashtag ricorrenti**: #reactiontime #braintest #brainteaser #braingames #memorytest #memorytraining #iqtest
  #challenge #fyp. Spagnolo e portoghese: #testdememoria #jogodamemoria #memoria #quiz.
- In spagnolo e portoghese i «test de memoria» fanno milioni di visualizzazioni: le 25 lingue dell'app sono un vantaggio
  enorme sui contenuti.

**Conseguenza:** non serve fare pubblicità all'app. Serve **pubblicare gli esercizi come sfide**: lo spettatore gioca
nel video, commenta il risultato e poi vuole riprovarci sul serio → link in bio.

---

## 2. Posizionamento

**Una frase:** *Il brain training gratuito per davvero. 40 giochi ispirati alla ricerca, senza abbonamento, senza
pubblicità, senza account. Fatto in Italia.*

In inglese: *Brain training that's actually free. 40 science-inspired games. No subscription, no ads, no sign-up.
Made in Italy.*

| Messaggio | Perché funziona | Dove usarlo |
| --- | --- | --- |
| **Gratis per davvero**, niente paywall | il punto debole di Lumosity, Elevate, Peak | ovunque, prima di tutto |
| **Privacy radicale**: niente account, niente cookie, i dati restano sul telefono | r/BuyFromEU, r/privacy, Hacker News, stampa tech | comunità tech e privacy |
| **Trasparenza scientifica**: ogni esercizio dice da quale studio nasce, e cosa la scienza *non* dimostra | onestà contro le promesse esagerate dei concorrenti (Lumosity fu multata dalla FTC nel 2016) | Hacker News, r/cogsci, stampa |
| **Pochi minuti al giorno**, 2-3 volte a settimana bastano | contro l'ansia da streak | genitori, over 50 |
| **25 lingue**, anche indiane e RTL | quasi nessun concorrente le ha | India, Brasile, mondo arabo, Indonesia |
| **Classifica che premia l'impegno, non il talento** | si allena anche chi non è un campione | famiglie, gruppi di amici |

### Cose da non dire mai (le stesse regole della scheda dello store)

- Niente «migliora la memoria», «previene la demenza», «aumenta il QI», «allena la coordinazione».
- Niente «nessun dato esce dal dispositivo» (c'è il conteggio anonimo settimanale).
- Niente «open source»: la licenza è PolyForm Noncommercial, quindi si dice **source-available**. Su Hacker News e Reddit
  qualcuno lo farà notare: meglio dirlo per primi.
- Nei video, «test» vuol dire gioco: niente «test del QI» o «solo l'1% ce la fa» se poi non è vero.

Sono regole che proteggono anche la scheda di Google Play: le affermazioni sulla salute sono una causa frequente di
rifiuto.

---

## 3. Pubblico, in ordine di priorità

1. **Chi è stanco degli abbonamenti** (25-55 anni, ha già provato Lumosity o Elevate). Canali: Google, r/BuyFromEU,
   r/androidapps, AlternativeTo.
2. **Chi ama sfide e puzzle** (16-35 anni). Canali: TikTok, YouTube Shorts, Instagram Reels, r/WebGames, r/puzzles,
   r/nonograms.
3. **Over 55 e figli che cercano qualcosa per i genitori.** Canali: Facebook (gruppi e pagine), YouTube, passaparola
   nei gruppi famiglia (la classifica con gruppo privato e link è perfetta: «la sfida di famiglia»).
4. **Tech, privacy, indie dev.** Canali: Hacker News, Product Hunt, r/SideProject, r/webdev, r/privacy, Mastodon.
   Portano pochi utenti, ma creano backlink, articoli e credibilità.
5. **Mercati linguistici trascurati**: Brasile, India (hindi, marathi, telugu, tamil, bengali), Indonesia, Turchia,
   Vietnam. Concorrenza quasi nulla nelle loro lingue.

---

## 4. I sette motori di crescita

### Motore 1 — SEO: una pagina giocabile per ogni test (la leva più grande)

*Fatto con la 0.26.0: gli indirizzi reali sono `/games/<slug>` (per esempio `/games/reaction-time-test`) e
`/<lingua>/games/<slug>`; l'elenco degli slug è in `src/seoPages.ts`. La tabella resta come riferimento delle priorità.*

Prima un esercizio non aveva un URL proprio. Serviva un URL per esercizio, indicizzabile, con il gioco subito giocabile e un
testo breve: cos'è, come si gioca, su quale studio si basa (il testo esiste già nella guida e nelle 25 lingue).

Priorità, in base ai volumi misurati:

| URL suggerito | Keyword principale | Volume |
| --- | --- | ---: |
| `/reaction-time-test` | reaction time test (USA) · test riflessi (IT) · teste de reflexo (BR) | 135k · 1k · 3,6k |
| `/tangram` | tangram | 110k · 18k IT |
| `/nonogram` | nonogram | 74k · 9,9k IT |
| `/memory-games` | memory games · giochi di memoria · jogos de memória | 49,5k · 1,9k · 14,8k |
| `/stroop-test` | stroop test · test di Stroop | 14,8k · 720 |
| `/dual-n-back` | dual n back · n back | 5,4k + 590 |
| `/working-memory-test` | working memory test | 1,3k |
| `/2048` | 2048 (difficile, ma porta coda lunga) | 823k |
| `/lumosity-alternative` · `/elevate-alternative` | free lumosity alternative, apps like elevate but free | nicchia ad alta intenzione |
| `/brain-games-for-seniors` · `/giochi-per-anziani` | brain games for seniors · giochi per anziani | 1,9k · 880 |

Regole:

- Versione per lingua (`?lang=` già esiste per la guida; meglio `hreflang` e URL per lingua), sitemap aggiornata.
- Titolo onesto: «Reaction Time Test – Free, No Sign-up | Synapse Dojo».
- In fondo: «Questo è 1 dei 40 esercizi. Allenamento giornaliero gratuito →» e il badge di Google Play.
- Le pagine «alternative» devono essere confronti onesti (cosa è gratis in Lumosity, cosa no), come fanno habz.app e
  senwitt.com, che oggi sono in prima pagina.
- Collegare il sito a Google Search Console e controllare le posizioni ogni mese (si può fare anche via treg, §7).

È lavoro di sviluppo: va fatto **prima di G0**, perché ogni articolo e ogni post del lancio crea backlink che spingono
proprio queste pagine.

### Motore 2 — Un meccanismo virale nel prodotto: la «sfida del giorno» condivisibile

*Fatto con la 0.27.0: un lucchetto di Crack the Code al giorno, dal lunedì facile al sabato difficile, risultato
condiviso come `🟥🟩⬜⬜ 2/4 · ⏱️ 0:13` con il link a `/<lingua>/daily`. La rotazione tra più giochi è rimandata.*

Wordle è diventato virale grazie a un riquadro di emoji: niente dati personali, solo il risultato del puzzle del giorno,
uguale per tutti. Synapse Dojo può fare lo stesso **senza toccare la privacy**:

- Un esercizio del giorno uguale per tutti (per esempio Nonogram, Crack the Code o Torri a rotazione), generato da un
  seme legato alla data, nessun server necessario.
- A fine partita, un pulsante «Condividi» con testo tipo:

  ```text
  Synapse Dojo #42 🔓 Crack the Code
  🟩🟩🟨⬜
  🟩🟩🟩🟩  4/6
  synapsedojo.com/daily
  ```

- È coerente con le scelte di [basi-scientifiche §2.7](basi-scientifiche.md): niente nome, niente età, niente Neuro
  Score; si condivide il risultato di un puzzle, non una misura di sé.

Un secondo meccanismo, più semplice: **«Sfida un amico»** sul test di reazione o sul test di Stroop, con un link che apre
direttamente quell'esercizio (`/reaction-time-test?sfida=287`). È ciò che fanno i video da 57 M di visualizzazioni, ma
nel prodotto. Va valutato rispetto alla regola «la condivisione non mostra punteggi»: si può limitare ai soli esercizi
di velocità, in cui il numero è un gioco e non un giudizio.

Il terzo meccanismo c'è già: i **gruppi privati della classifica con link o codice**. Va solo raccontato meglio
(«Crea il gruppo di famiglia e sfida i nonni»).

### Motore 3 — Video brevi: «gioca con me» su TikTok, Reels e Shorts

Un solo formato, ripetuto con costanza: **lo spettatore gioca nel video**.

Regole di produzione:

- Registrazione dello schermo dell'app in verticale (9:16), con l'esercizio a tutto schermo e il tema scuro.
- Primi 1,5 secondi: la sfida scritta grande («Riesci a battere 0,30 s?», «Quanti puntini hai visto?»).
- Durata 10-25 s per i test di velocità, 45-90 s per quelli di memoria.
- Chiusura sempre con una domanda: «Scrivi il tuo tempo nei commenti».
- Niente volto obbligatorio: il formato funziona anche solo con lo schermo e la voce o la musica.
- Link in bio verso la pagina dell'esercizio (Motore 1), non verso la home.
- Ritmo: **1 video al giorno** per le prime 4 settimane, sugli stessi contenuti in tre piattaforme. Poi si tiene quello
  che funziona.
- Lingue: inglese all'inizio; dal mese 2 spagnolo e portoghese (gli stessi video con il testo tradotto: l'app è già in
  quelle lingue).

Le prime 15 idee, ognuna su un esercizio vero:

| # | Esercizio | Gancio scritto | Domanda finale |
| --- | --- | --- | --- |
| 1 | Tempo di reazione | «Tocca appena diventa verde. Sotto 0,25 s sei un pilota.» | «Il tuo tempo?» |
| 2 | Scontro di colori (Stroop) | «Di' il COLORE, non la parola. Pronto?» | «Dove hai sbagliato?» |
| 3 | Colpo d'occhio (UFOV) | «Lo vedi per 0,1 secondi. Dov'era l'auto?» | «Quante giuste su 5?» |
| 4 | Radar (MOT) | «Segui le 3 palline blu. Non perderle.» | «Le hai trovate tutte?» |
| 5 | Eco (Dual N-Back) | «Il test che fa impazzire Reddit. Livello 2.» | «A che punto ti sei perso?» |
| 6 | Griglia di luci (Corsi) | «Ripeti la sequenza. Poi al contrario.» | «Quanto è lunga la tua?» |
| 7 | Rotazioni | «Sono uguali o speculari? 3 secondi.» | «Risposta nei commenti» |
| 8 | Nonogram | «Un disegno nascosto in 30 secondi.» | «Cos'è?» |
| 9 | Tangram | «7 pezzi. Una sola forma. Ce la fai?» | «Quanto ci hai messo?» |
| 10 | Torri (Torre di Londra) | «Risolvi in 4 mosse. Non 5.» | «Hai trovato la soluzione?» |
| 11 | Crack the Code | «Indovina il codice in 4 tentativi.» | «Il codice era…?» |
| 12 | Conto dei puntini | «Quale lato ne ha di più? Non contare.» | «Sinistra o destra?» |
| 13 | Ultime cifre | «Ricorda solo le ultime 3 cifre.» | «Quali erano?» |
| 14 | Tap bilaterale | «Mano sinistra e destra insieme. Prova a tempo.» | «Ci riesci?» |
| 15 | Mercato | «Hai 10 €. Massimo guadagno?» | «Quanto hai fatto?» |

Serie ricorrenti da tenere: «Nonni contro nipoti» (due generazioni giocano allo stesso esercizio), «Ogni giorno un test
in 15 secondi», «Il paradigma dietro il gioco» (30 s su uno studio classico, per il pubblico curioso).

### Motore 4 — Comunità: Reddit, Hacker News, Product Hunt, AlternativeTo

Ordine e regole:

- **r/BuyFromEU** — la comunità che chiede proprio questa app. Post del tipo «I built a free European alternative to
  Lumosity» (testo pronto in §6.2). Poi rispondere, con link, ai thread già esistenti che chiedono un'alternativa.
- **Show HN** su Hacker News — l'angolo giusto è tecnico e onesto: TypeScript senza framework, PWA offline, 25 lingue
  con grafemi corretti, staircase adattivo, nessun cookie, e cosa la scienza non dimostra (testo pronto in §6.1).
- **Product Hunt** — lancio in un giorno feriale, da martedì a giovedì.
- **AlternativeTo** — schede come alternativa a Lumosity, Elevate, Peak, NeuroNation e CogniFit. Ogni scheda resta per
  anni e intercetta chi cerca «alternative to…».
- **Altre comunità** (un post ciascuna, distanziati, rispettando le regole di ognuna): r/SideProject, r/WebGames,
  r/androidapps, r/dualnback, r/cogsci (solo l'angolo scientifico), r/nonograms, r/puzzles, r/privacy,
  r/degoogle, r/productivity, r/italy e r/ItalyInformatica per l'Italia.
- **Regola d'oro di Reddit:** presentarsi come sviluppatore, chiedere feedback e rispondere a tutti. Niente
  cross-post lo stesso giorno. Su r/ADHD e simili non andare a promuovere: il rischio di sembrare una promessa medica è
  alto.

### Motore 5 — ASO: la scheda dello store

- Dopo G0 usare gli **esperimenti della scheda dello store** di Play Console (disponibili in produzione): titolo A
  «Synapse Dojo: Brain Training» contro titolo B «Synapse Dojo: Brain & Memory Games» (30 caratteri), con «memory games»
  che ha 10 volte le ricerche di «brain training».
- Nella descrizione breve: **«Free · no ads · no subscription»** in alto. «Giochi senza pubblicità» ha 880 ricerche al
  mese solo in Italia.
- Screenshot: il primo deve dire il beneficio in 4 parole («40 giochi. Gratis. Davvero.»), non mostrare il menu.
- Video della scheda (YouTube): 30 s con 6 esercizi in sequenza, preso dagli stessi spezzoni di TikTok.
- **Recensioni:** nelle prime 2 settimane chiedere a tester, amici e gruppi di lasciare una recensione onesta. La sezione
  Valuta dell'app c'è già: va resa visibile dopo il 5° allenamento completato, mai durante un esercizio.
- Link con UTM di Play per sapere da dove arrivano le installazioni:
  `https://play.google.com/store/apps/details?id=com.synapsedojo.app&referrer=utm_source%3Dtiktok%26utm_campaign%3Dlancio`
  (uno per canale: tiktok, reddit, hn, producthunt, stampa).

### Motore 6 — Stampa e blog

- **Italia:** HDblog, AndroidWorld, Tom's Hardware, Wired Italia, Il Post (rubrica tech), DDay, SmartWorld, Navigaweb,
  Salvatore Aranzulla (sezione app), blog di giochi e di terza età. Angolo: «Uno sviluppatore italiano lancia
  l'alternativa gratuita e senza abbonamento a Lumosity, in 25 lingue».
- **Internazionale:** Android Police, Android Authority (rubriche sulle app nuove), Lifehacker, MakeUseOf,
  AlternativeTo News, blog privacy (Privacy Guides forum, It's FOSS → solo se accettano source-available).
- **Blog che fanno classifiche** («best free brain training apps 2026»): chi è in prima pagina oggi (plasticitycenters.com,
  habz.app) può aggiornare l'elenco. Una mail breve, con un link e cosa rende l'app diversa.
- I contatti delle redazioni si trovano con le ricerche di treg (§7), ma vanno **verificati prima di scrivere** e
  ogni mail va mandata da te, personalizzata, mai in massa.

### Motore 7 — Pubblicità (facoltativa, solo dopo che l'organico funziona)

Da attivare solo quando la scheda ha almeno 30-50 recensioni e una valutazione sopra 4,3:

- **TikTok Spark Ads** sui 2-3 video organici andati meglio (si promuove un post che già funziona): 5-10 € al giorno
  per 7 giorni, in Brasile e India il costo per visualizzazione è molto basso.
- **Google Ads, campagna per app** in Italia e Brasile: 5 € al giorno di prova. Il CPC di «brain training app» negli USA
  è 4,94 $: troppo caro, meglio mercati e lingue meno contese.
- Tetto consigliato per il primo mese: 150-300 €. Senza un modello di guadagno la pubblicità serve solo ad accendere
  l'algoritmo dello store, non a crescere da sola.

---

## 5. Calendario

### Fase 0 — Da oggi a G0 (preparazione, mentre Google valuta)

| Settimana | Cosa | Chi |
| --- | --- | --- |
| 1 | Pagine SEO dei primi 5 esercizi (reazione, Stroop, tangram, nonogram, dual n-back) con link diretto al gioco, in EN e IT | sviluppo |
| 1 | Account TikTok, Instagram, YouTube con lo stesso nome (@synapsedojo); bio con link alla pagina del test | tu |
| 1-2 | Registrare **20 video** pronti (i 15 dello schema + 5 di riserva), non pubblicarli ancora tutti | tu |
| 1-2 | Iniziare a pubblicare 1 video ogni 2 giorni, per scaldare gli account (link al sito) | tu |
| 2 | Schede AlternativeTo (Lumosity, Elevate, Peak, NeuroNation, CogniFit) | tu |
| 2 | Pagina Product Hunt in bozza («coming soon»), con galleria e video | tu |
| 2 | Kit stampa: 6 screenshot, icona, 3 righe di presentazione, una tua foto, link → una pagina `/press` | sviluppo + tu |
| 2 | Lista di 30 contatti stampa e blog, verificati | treg + tu |
| 2-3 | «Sfida del giorno» condivisibile (Motore 2) | sviluppo |
| sempre | Commenti utili nei thread Reddit esistenti (senza link finché non è utile), per costruire il profilo | tu |

### Fase 1 — Settimana di lancio (G0 → G0+7)

Appena Google approva: controlla che la scheda sia visibile da un telefono non collegato al tuo account, poi scegli il
primo **martedì o mercoledì utile** come **giorno L**.

| Quando (ora italiana) | Cosa |
| --- | --- |
| L-1 | Avvisa tester, amici e i gruppi privati: «domani si parte, una recensione onesta aiuta tantissimo» |
| L, 09:01 | Product Hunt live (mezzanotte e un minuto a San Francisco). Primo commento del maker pronto (§6.3) |
| L, 10:00 | Post r/BuyFromEU (§6.2) |
| L, 11:00 | Video TikTok/Reels/Shorts n. 1 (tempo di reazione) |
| L, 15:00 | **Show HN** (§6.1). Resta davanti al computer 3 ore e rispondi a ogni commento |
| L, 18:00 | Video n. 2 (Stroop) |
| L+1 | r/SideProject e r/androidapps; mail ai 10 contatti stampa italiani |
| L+2 | r/WebGames e r/dualnback; mail ai contatti stampa internazionali |
| L+3 | r/nonograms o r/puzzles; post LinkedIn personale con la storia del progetto |
| L+4 | Video «com'è andato il lancio» (numeri veri) → contenuto che funziona su r/SideProject e LinkedIn |
| L+1…L+7 | 1-2 video al giorno; rispondere a ogni recensione su Play entro 24 ore |

### Fase 2 — Settimane 2-6 (spinta)

- 1 video al giorno; ogni lunedì guardi i numeri e raddoppi sul formato migliore.
- Altre 10 pagine SEO (memory games, working memory test, alternative a Lumosity ed Elevate, giochi per anziani, Torri,
  Rotazioni, Crack the Code…) e le versioni ES e PT delle prime 5.
- Video in spagnolo e portoghese.
- Contattare 10-20 piccoli creator (5k-100k follower) di puzzle, studio e terza età: proposta semplice, «provalo e se ti
  piace fai un video», niente pagamento. Ricerca creator con treg (§7).
- Primo esperimento della scheda di Play (titolo).
- Spark Ads se un video organico ha superato le 50.000 visualizzazioni.

### Fase 3 — Dal mese 2 in poi (ritmo stabile)

- 3-4 video a settimana, una serie ricorrente.
- Ogni mese: nuove pagine SEO e controllo delle posizioni.
- Ogni nuovo esercizio o versione importante è una notizia: changelog pubblico, post nelle stesse comunità (una volta al
  trimestre, non di più).
- Mercati: India (hindi e tamil hanno pubblici enormi su YouTube Shorts), Indonesia, Turchia.

---

## 6. Testi pronti

### 6.1 Show HN

**Titolo**

```text
Show HN: Synapse Dojo – 40 free brain-training games, no account, no cookies, 25 languages
```

**Testo**

```text
Hi HN, I'm the developer of Synapse Dojo (https://synapsedojo.com), a free set of 40 short exercises based on classic
cognitive-science paradigms: Stroop, dual N-back, Corsi blocks, Tower of London, UFOV from the ACTIVE trial, mental
rotation, task switching, plus a few bimanual coordination games I haven't seen elsewhere.

Some choices that might interest you:

- Plain TypeScript and Vite, no UI framework. It's an offline PWA; the Android app is a thin TWA wrapper.
- Difficulty follows a weighted up-down staircase (Kaernbach 1991) targeting 70–85% accuracy per exercise.
- No accounts, no cookies, no ads, nothing to buy. Progress lives in localStorage; you can export it or move it with a
  one-time 24-hour code. The weekly leaderboard is opt-in and uses a random nickname.
- 25 languages, including RTL (Arabic, Persian, Urdu) and Indic scripts. The word games work on grapheme clusters, so
  anagrams in Hindi or Thai don't split a syllable.
- Every exercise names the study it's based on, and the docs say what the evidence does NOT show: gains are mostly on
  the trained tasks, and it is not a medical device.

The source is available under PolyForm Noncommercial (not OSI open source, to be clear).

I'd love feedback on the exercises, the adaptive difficulty and anything that feels off.
```

### 6.2 r/BuyFromEU

**Titolo**

```text
I built a free European alternative to Lumosity/Elevate: no subscription, no account, no ads
```

**Testo**

```text
Hi all, I've seen several posts here asking for a European alternative to brain-training apps, so here's mine.

Synapse Dojo is made in Italy and is free: there's no premium tier and nothing to buy.

- 40 short exercises (memory, attention, speed, reasoning, spatial, maths and reading, two-handed coordination), with
  difficulty that adapts as you play
- No account, no email, no cookies. Your progress stays on your device
- Available in 25 languages
- Browser: https://synapsedojo.com
- Android: Google Play and Huawei AppGallery

It's a game, not medical software, and each exercise says which study inspired it.

I'm the developer, so happy to take criticism or ideas.
```

### 6.3 Product Hunt

- **Nome:** Synapse Dojo
- **Tagline (60):** `Brain training that's actually free — no ads, no sign-up`
- **Descrizione (260):**

  ```text
  40 short games inspired by classic cognitive science: Stroop, dual N-back, Tower of London, mental rotation and more.
  Adaptive difficulty, a daily workout, an opt-in weekly leaderboard. No account, no cookies, no subscription. 25 languages.
  ```

- **Primo commento del maker:**

  ```text
  Hi Product Hunt! I started Synapse Dojo because every brain-training app I tried locked the good parts behind a
  yearly subscription and wanted my email before letting me play.

  So this one has no account, no ads and nothing to buy. You open it and play. Progress stays on your device.

  A few things I'm proud of: 40 exercises across 9 domains, difficulty that adapts in real time, two-handed rhythm games,
  and a card on every exercise that names the study behind it, including what the research does NOT prove.

  It works in the browser, offline as a PWA, and on Android. Tell me which exercise you found hardest!
  ```

### 6.4 Mail alla stampa italiana

**Oggetto:** `Un'alternativa italiana e gratuita a Lumosity, senza abbonamento e in 25 lingue`

```text
Buongiorno [nome],

sono [nome e cognome], sviluppatore di Synapse Dojo, un'app gratuita di giochi per la mente appena arrivata su Google
Play.

In breve:
- 40 esercizi brevi ispirati a prove classiche delle scienze cognitive (test di Stroop, N-Back, Torre di Londra…);
- niente abbonamento, niente pubblicità, niente registrazione: i progressi restano sul telefono;
- 25 lingue, comprese arabo e hindi;
- su ogni esercizio, una scheda dice da quale studio nasce e cosa la ricerca non dimostra.

È fatta in Italia, da solo. Si prova senza installare nulla su https://synapsedojo.com, e su Android:
[link Google Play con utm_source=stampa].

Il kit stampa con immagini e icona è su https://synapsedojo.com/press. Se le interessa, rispondo volentieri a ogni domanda.

Grazie,
[nome]
```

### 6.5 Descrizione per AlternativeTo

```text
Free brain-training web app and Android app with 40 short exercises based on classic cognitive-science paradigms
(Stroop, dual N-back, Corsi blocks, Tower of London, mental rotation, UFOV). Adaptive difficulty, daily workout and an
opt-in weekly leaderboard. No account, no cookies, no ads, no subscription; progress is stored on the device. 25
languages, offline PWA. Source-available (PolyForm Noncommercial).
```

Tag: brain-training, memory-games, cognitive-training, privacy-focused, no-registration, ad-free, offline, pwa.

---

## 7. Come usare treg in ogni fase

Credito attuale: circa 0,69 $ (1 $ di partenza meno le ricerche di questo piano). I prezzi sono quelli del catalogo il
28/11/2026.

| Lavoro | Strumento treg | Costo | Quando |
| --- | --- | --- | --- |
| Volumi delle keyword in altre lingue (ES, PT, HI, DE, FR…) prima di scrivere le pagine SEO | `dataforseo.google.keywords.volume` (fino a 1000 keyword per chiamata) | 0,09 $ per lingua | Fase 0 |
| Idee di keyword correlate | `treg.google.keywords.ideas` | pochi centesimi | Fase 0 |
| Posizioni su Google per le pagine nuove | `treg.google.serp.organic` | ~0,0004 $ per ricerca | ogni mese |
| Trend dei video: cosa funziona questa settimana su #braintest, #reactiontime, #memorytest | `tikhub.tiktok.search.videos`, `anyapi.tiktok.trending_hashtags` | 0,001 $ per ricerca | ogni lunedì |
| Thread Reddit dove qualcuno chiede un'alternativa a Lumosity (per rispondere) | `scrapecreators.reddit.search.posts` (sort=new, timeframe=week) | 0,002 $ | 2 volte a settimana |
| Cosa dice il web del lancio (TikTok, Reddit, HN, Product Hunt) | skill `doomscroll` | pochi centesimi | da L a L+7, ogni giorno |
| Concorrenti su Google Play, chart della categoria | `serpapi.google-play.search.apps` | 0,015 $ | ogni mese |
| Pubblicità dei concorrenti (cosa promettono Lumosity ed Elevate) | `treg.meta-ads.library.advertiser` | ~0,002 $ | Fase 0, una volta |
| Creator di puzzle, studio e terza età da contattare | `influencersclub.creators.search` (per nicchia e dimensione), skill `follower-analysis` per capire il pubblico di un creator | 0,03 $ per ricerca | Fase 2 |
| Contatti delle redazioni | `treg.people.email.find` con la verifica attiva (`X-Treg-Route-Verify: true`) | qualche centesimo a contatto | Fase 0 |
| Spezzoni video generati (sfondi, transizioni, un presentatore) | modelli video del catalogo (Hailuo ~0,56 $, Veo 3.1 Fast ~1,20 $ a clip); skill `make-ugc` per video stile creator | 0,5-1,2 $ a clip | solo se servono |
| Copertine e immagini per i post | modelli immagine (Gemini Image, GPT Image, Seedream) | pochi centesimi | quando servono |
| Dati di Search Console e Google Analytics | account Google collegati a treg | gratis | dal giorno L |

**Budget treg consigliato:** 5-10 $ per il primo mese bastano per tutto il monitoraggio e le ricerche. Solo i video
generati possono costare di più: meglio usare le registrazioni vere dell'app, che sono più credibili e gratuite.

Avvertenze:

- I video generati con l'IA vanno dichiarati come tali su TikTok e Instagram (c'è un'etichetta apposita) e non devono
  mai sembrare recensioni di persone vere.
- Le mail trovate dagli strumenti sono ipotesi: si verificano e si scrivono a mano, una per una.

---

## 8. Numeri da seguire

| Cosa | Dove | Obiettivo a 30 giorni da L | A 90 giorni |
| --- | --- | ---: | ---: |
| Installazioni Google Play | Play Console | 1.000 | 10.000 |
| Valutazione media e numero di recensioni | Play Console | ≥ 4,4 · 50 | ≥ 4,5 · 300 |
| Visitatori unici del sito | Cloudflare Web Analytics | 15.000 | 60.000 |
| Persone che si sono allenate negli ultimi 7 giorni | contatore anonimo in home | 1.500 | 8.000 |
| Iscritti alla classifica | database D1 | 300 | 2.000 |
| Visualizzazioni video (somma delle tre piattaforme) | TikTok, Instagram, YouTube | 200.000 | 2.000.000 |
| Pagine SEO tra i primi 20 risultati | Search Console | 3 | 10 |
| Backlink da siti nuovi | Search Console | 15 | 50 |

Sono obiettivi realistici per un progetto indie senza budget. «Virale» vuol dire che un singolo video o post esplode,
e non si può prevedere: il piano aumenta i tentativi (un video al giorno, molte comunità) e prepara il prodotto
(pagine SEO, sfida condivisibile) perché, quando succede, il traffico si trasformi in utenti.

**Ogni lunedì, 20 minuti:** quali 3 video sono andati meglio e perché, da dove sono arrivate le installazioni (link UTM),
quali pagine SEO salgono. Poi si fa di più di ciò che funziona e si smette con il resto.

---

## 9. Prima di G0: le dieci cose da avere pronte

1. [x] Pagine giocabili per reazione, Stroop, tangram, nonogram e dual n-back (EN e IT), nella sitemap — fatto per tutti i 40 giochi in 25 lingue
2. [x] Sfida del giorno condivisibile (o almeno il link «sfida un amico» sul test di reazione) — fatta, `/daily`
3. [ ] Account @synapsedojo su TikTok, Instagram e YouTube con almeno 8-10 video già pubblicati
4. [ ] Altri 10 video pronti in archivio
5. [ ] Bozza su Product Hunt con galleria e video
6. [ ] Schede su AlternativeTo
7. [ ] Pagina `/press` con il kit stampa
8. [ ] 30 contatti stampa verificati, con le mail personalizzate in bozza
9. [ ] Link Play con UTM per ogni canale
10. [ ] Elenco di tester e amici da avvisare il giorno prima per le recensioni
