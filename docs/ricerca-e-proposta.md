# Synapse Dojo · Basi Scientifiche, Paradigmi Cognitivi e Architettura

*Documentazione scientifica ufficiale e razionale neuropsicologico del programma di allenamento cognitivo e coordinazione bilaterale.*  
**Autore:** Sergio Dogliani · **Progetto:** [synapsedojo.com](https://synapsedojo.com) · **Licenza:** [PolyForm Noncommercial 1.0.0](../LICENSE)

---

## 1. Lo Stato dell'Arte della Ricerca Cognitiva

La progettazione di **Synapse Dojo** nasce da una premessa di **onestà intellettuale e rigore metodologico**: distanziarsi dalle promesse ingannevoli e dal marketing pseudoscientifico che hanno caratterizzato la prima generazione di app commerciali di "brain training". 

Come evidenziato dall'autorevole revisione della comunità scientifica internazionale (*Simons et al., 2016*, *Psychological Science in the Public Interest*), molti giochi cerebrali commerciali producono miglioramenti circoscritti esclusivamente al minigioco allenato (*near transfer* debole), senza trasferibilità tangibile alle attività complesse della vita quotidiana (*far transfer*).

Per questa ragione, Synapse Dojo non adotta compiti arbitrari o minigiochi di pura destrezza casuale, ma si fonda esclusivamente sui **paradigmi sperimentali con le evidenze cliniche ed empiriche più solide della letteratura neuropsicologica**.

### Sintesi delle Evidenze Cliniche Chiave

| Approccio & Paradigma | Studio e Fonte Principale | Evidenza Neuroscientifica |
|---|---|---|
| **Velocità di elaborazione / Campo visivo utile (UFOV)** | Trial clinico ACTIVE, follow-up a 10 anni (*Edwards et al., 2017*) | L'unico intervento cognitivo computerizzato dimostratosi associato a una **riduzione del rischio di demenza del 29–33%** a 10 anni rispetto al gruppo di controllo. Più sessioni di mantenimento hanno mostrato un beneficio dose-risposta. |
| **Multitasking visuo-motorio continuo** | NeuroRacer, UCSF (*Anguera & Gazzaley et al., Nature 2013*) | L'allenamento adattivo al multitasking negli anziani (60–85 anni) ha invertito il declino legato all'età nel costo di interferenza, con benefici mantenuti a 6 mesi e trasferimento ad attenzione sostenuta e memoria di lavoro non allenata. Ha ispirato il primo software terapeutico approvato da FDA per l'ADHD (EndeavorRx). |
| **Rotazione mentale e cognizione spaziale** | Meta-analisi di 217 studi (*Uttal et al., 2013*) | Effetto medio **g = 0,47**, statisticamente robusto e duraturo nel tempo, con dimostrato trasferimento a compiti spaziali nuovi e compiti STEM. |
| **Aritmetica veloce e lettura ad alta voce** | "Learning Therapy" (*Nouchi, Kawashima et al., 2016*) | L'esecuzione rapida di compiti aritmetici semplici abbinata alla lettura vocale attiva massivamente e bilateralmente i lobi frontali e parietali, con miglioramenti significativi di velocità di elaborazione ed espressione verbale. |
| **Memoria di lavoro (N-Back duale e Span)** | Meta-analisi (*Au et al., 2014*; *Melby-Lervåg & Hulme, 2013/2016*) | Incremento significativo e solido della capacità di aggiornamento (*updating*) della memoria di lavoro e della resistenza alle interferenze visuo-acustiche. |
| **Inibizione e Controllo Esecutivo (Stroop, Flanker, Go/No-Go)** | *Eriksen & Eriksen (1974)*, *MacLeod (1991)*, *Enge et al. (2014)* | Reclutamento della corteccia prefrontale dorsolaterale (DLPFC) e della corteccia cingolata anteriore (ACC) per sopprimere risposte automatiche e filtrare distrattori visivi incongruenti. |
| **Flessibilità e Task Switching** | Meta-analisi (*Karbach & Kray, 2009*; *Toovey et al., 2021*) | L'alternanza sistematica di regole decisionali riduce il tempo perso nella transizione (*switch cost*), stimolando la plasticità delle funzioni esecutive negli adulti e negli anziani. |
| **Coordinazione Bilaterale e Attraversamento Mediano** | *Swinnen et al. (2002)*; *Gazzaniga (2000)* | I compiti bimanuali asimmetrici e l'attraversamento della linea mediana corporea (*midline crossing*) impongono un continuo scambio di informazioni interemisferiche attraverso il **corpo calloso**, contrastando la frammentazione motoria e potenziando la connettività sinaptica globale. |
| **Intervento Multidominio & Stile di Vita** | Trial FINGER, Finlandia (*Ngandu et al., Lancet 2015*) | L'allenamento cognitivo multidominio produce la massima efficacia preventiva quando combinato con esercizio fisico aerobico, sonno di qualità, corretta alimentazione e interazioni sociali. |

---

## 2. Principi di Progettazione di Synapse Dojo

Dalle evidenze sopra descritte derivano i pilastri costruttivi della piattaforma:

1. **Difficoltà Adattiva Continua per Ogni Esercizio:**  
   Un esercizio troppo facile genera noia e non induce neuroplasticità; uno troppo difficile genera frustrazione e abbandono. Synapse Dojo impiega un motore matematico a scalino pesato (*weighted up-down staircase*) che mantiene l'utente costantemente nella propria **zona di sviluppo prossimale** (soglia di successo mirata all'80%).
2. **Priorità ai Paradigmi a Più Alto Valore Trasferibile:**  
   Spazio centrale a velocità di elaborazione visiva periferica (UFOV), multitasking continuo, abilità spaziali di rotazione, memoria di lavoro duale e coordinazione bimanuale.
3. **Separazione tra Misurazione Oggettiva e Allenamento Libero:**  
   - Il **Neuro Score** quotidiano opera come batteria di test a difficoltà standardizzata e fissa, permettendo un confronto longitudinale affidabile nel tempo (punteggio 0–1000 su tutte le 9 aree).
   - L'**Allenamento Giornaliero** e la **Palestra** operano invece in modalità interamente adattiva per stimolare il potenziamento.
4. **Onestà verso l'Utente:**  
   Synapse Dojo è uno strumento di svago attivo e stimolazione personale: non formula diagnosi mediche, non promette la cura o l'immunità da patologie neurodegenerative e ricorda sempre che lo stile di vita globale (movimento, sonno, socialità) è imprescindibile.

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

### Tabella dei Paradigmi Sperimentali

| Dominio | Esercizio | Paradigma Clinico/Sperimentale | Parametri Adattivi Dinamici |
|---|---|---|---|
| **⚡ Velocità** | **Colpo d'occhio** | *Useful Field of View (UFOV)* / Double Decision | Tempo di esposizione visiva (400 → 16 ms), numero e densità di distrattori periferici (0, 7, 15). |
| **⚡ Velocità** | **Riflesso a scelta** | Tempo di reazione a scelta a 4 vie + Go/No-Go | Finestra temporale di risposta (1100 → 220 ms), introduzione di stimoli esca da inibire. |
| **⚡ Velocità** | **Sentiero dei numeri** | *Trail Making Test (TMT-A e TMT-B)* | Numero di bersagli (10–24), passaggio alla sequenza alternata flessibile (1 → A → 2 → B). |
| **⚡ Velocità** | **Tempo di reazione** | Simple Visual Reaction Time (SRT) | Latenza visuo-motoria semplice (misurazione in millisecondi della conduzione neurale pura). |
| **🎯 Attenzione** | **Pilota** | Multitasking continuo alla *NeuroRacer* | Velocità e curvatura del tracciato, frequenza e somiglianza visiva dei segnali da discriminare. |
| **🎯 Attenzione** | **Radar** | *Multiple Object Tracking (MOT)* | Numero di elementi bersaglio da inseguire simultaneamente (2–6), velocità e traiettorie casuali. |
| **🎯 Attenzione** | **Test di Flanker** | *Eriksen Flanker Task* | Tempo limite di discriminazione, congruenza/incongruenza delle frecce laterali di disturbo. |
| **🎯 Attenzione** | **Go / No-Go** | *Sustained Attention to Response Task (SART)* | Ritmo di presentazione, probabilità e inganno visivo dello stimolo di stop inibitorio. |
| **🎯 Attenzione** | **Interferenza multipla** | *Multi-Source Interference Task (MSIT)* | Conflitto spaziale tra posizione dello stimolo e valore numerico (attivazione cingolata). |
| **🎯 Attenzione** | **Colore e forma** | *Visual Feature Binding Task* | Congiunzione visiva di attributi multipli tra distrattori con caratteristiche sovrapposte. |
| **🎛️ Controllo** | **Scontro di colori** | *Stroop Color and Word Task* | Finestra di latenza (3000 → 500 ms), inversione dinamica della regola (Inchiostro ↔ Parola). |
| **🎛️ Controllo** | **Doppia regola** | *Task Switching Paradigm* (Jersild/Rogers/Monsell) | Alternanza repentina tra giudizio di grandezza (>5/<5) e parità (Pari/Dispari); misura il costo di cambio. |
| **🎛️ Controllo** | **Ordinamento carte** | *Wisconsin Card Sorting Test (WCST)* | Scoperta induttiva del criterio segreto (Colore, Forma, Numero) e set-shifting dopo shift non annunciato. |
| **🧠 Memoria di lavoro** | **Eco** | *N-Back Task* (Singolo e Duale uditivo-visivo) | Ampiezza N (1-back fino a 5-back) in modalità singola o duale contemporanea (posizione + lettera parlata). |
| **🧠 Memoria di lavoro** | **Griglia di luci** | *Corsi Block-Tapping Test* | Lunghezza della sequenza spaziale (2–9 celle), riproduzione sia in ordine diretto che inverso. |
| **🧠 Memoria di lavoro** | **Ultime cifre** | *Running Memory Span* (Pollack et al.) | Numero di cifre finali da trattenere (2–8) da un flusso continuo a lunghezza imprevedibile. |
| **🧠 Memoria di lavoro** | **Span di cifre** | *Digit Span Forward & Backward* (WAIS) | Lunghezza della serie numerica e inversione dell'ordine mentale per la memoria di lavoro fonologica. |
| **🔐 Memoria** | **Cassaforte parole** | Riconoscimento Vecchio/Nuovo (*Old/New Recognition*) | Ampiezza del set di studio lessicale (6–25 parole) e intervallo di ritenzione. |
| **🔐 Memoria** | **Coppie** | *Paired Associates Learning (PAL)* | Numero di associazioni binarie arbitrarie simbolo–parola da memorizzare e richiamare. |
| **🔐 Memoria** | **Memoria delle storie** | *Logical Memory Test* / Prosa episodica | Richiamo di coordinate episodiche ippocampali (chi, cosa portava, dove si trovava, a che ora). |
| **🧊 Spaziale** | **Rotazioni** | *Mental Rotation Task* (Shepard & Metzler, 1971) | Complessità poligonale e angoli di rotazione (45°–315°) di figure tridimensionali chirali o speculari. |
| **🧊 Spaziale** | **Matrice spaziale** | Trasformazione di Coordinate Spaziali | Numero di blocchi attivi e rotazione mentale dell'intera griglia a 90°, 180° e 270°. |
| **🧩 Ragionamento** | **Torri** | *Tower of London Test* (Shallice, 1982) | Numero minimo di mosse ottimali (2–8), vincoli di impilamento e pianificazione sequenziale. |
| **🧩 Ragionamento** | **L'intruso** | *Odd-One-Out Task* (Cambridge Brain Sciences) | Conflitto multidimensionale per identificare la violazione della regola (forma, colore, numero, riempimento). |
| **🧩 Ragionamento** | **Gestione risorse** | *Knapsack Problem* / Pianificazione con vincoli | Bilanciamento strategico tra costo energetico e massimizzazione del valore complessivo. |
| **➗ Calcolo e lettura** | **Sprint di calcolo** | Aritmetica mentale rapida (Kawashima) | Complessità delle operazioni (+, −, ×, ÷) e grandezza dei termini sotto pressione temporale. |
| **➗ Calcolo e lettura** | **Lettura veloce** | *Rapid Serial Processing* con verifica di comprensione | Conteggio oggettivo delle parole al minuto (WPM) accoppiato a domanda a risposta multipla vincolante. |
| **➗ Calcolo e lettura** | **Calcolo con i punti** | *Approximate Number System (ANS)* / Subitizing | Rapporto di numerosità (Weber fraction) tra gruppi di punti presentati per frazioni di secondo. |
| **➗ Calcolo e lettura** | **Anagrammi** | Accesso Lessicale e Memoria Ortografica | Ricombinazione fonetica di anagrammi da 4 a 8 lettere. |
| **➗ Calcolo e lettura** | **Sprint di parole** | *Phonemic Verbal Fluency* (COWAT) | Velocità di accesso semantico-lessicale vincolato a lettere alfabetiche specifiche. |
| **👐 Coordinazione** | **Tap bilaterale** | *Bimanual Alternating Tapping Task* | Frequenza e complessità di sequenze bimanuali alternate per stimolare il corpo calloso. |
| **👐 Coordinazione** | **Swipe bilaterale** | *Bimanual Spatial Decoupling* | Esecuzione contemporanea di gesti direzionali asimmetrici (es. pollice sinistro in su, destro in giù). |
| **👐 Coordinazione** | **Ritmo bilaterale** | *Sensorimotor Synchronization (SMS)* | Precisione millisecondica di sincronizzazione su battito metronomico visivo bimanuale. |
| **👐 Coordinazione** | **Movimenti incrociati** | *Midline Crossing Inhibition Task* | Risposta rapida controlaterale (attraversamento dell'asse corporeo sagittale mediano). |
| **👐 Coordinazione** | **Dual-Task bilaterale** | Asymmetric Dual-Task Paradigm | Divisione asimmetrica dell'attenzione: mantenimento motorio continuo su un emisfero e decisione cognitiva sull'altro. |

---

## 4. Algoritmo Adattivo e Psicometria

### La Regola dell'85% (The 85% Rule for Optimal Learning)
Un principio cardine derivato dallo studio di *Wilson, Shenhav, Straccia & Cohen (Nature Communications, 2019)* dimostra che negli algoritmi di apprendimento e nelle reti biologiche il tasso ottimale di acquisizione delle competenze si colloca attorno a un tasso di errore del **15% (circa l'85% di accuratezza)**. A questo livello:
* Il gradiente di informazione fornito dall'errore è massimizzato senza saturare i circuiti attentivi.
* Si previene sia il disimpegno da eccessiva facilità sia la rinuncia (*learned helplessness*) causata da fallimenti ripetuti.

### Il Modello Matematico *Weighted Up-Down*
Synapse Dojo implementa una variante continua del metodo psicofisico di **Kaernbach (1991)**:

$$\Delta_{\text{up}} = \Delta_{\text{down}} \cdot \left(\frac{1 - p_{\text{target}}}{p_{\text{target}}}\right)$$

Per un obiettivo $p_{\text{target}} = 0,80$:
* In caso di **errore**: la difficoltà scende di $1,0$ livello.
* In caso di **risposta corretta**: la difficoltà sale di $0,25$ livelli.

#### Meccanismi di Controllo Empirico Implementati (`src/adaptive.ts`):
1. **Partenza Rapida (Fast Track)**: finché l'utente risponde correttamente nelle prime prove, la difficoltà sale di livelli interi ($+1,0$), raggiungendo rapidamente la zona limite personale.
2. **Freno alla Frustrazione**: tre errori consecutivi applicano una riduzione addizionale della difficoltà, impedendo lo stallo punitivo.
3. **Riscaldamento Iniziale (Warm-Up)**: ogni sessione parte mezzo livello al di sotto della soglia storica registrata, permettendo all'utente di entrare nello stato di flusso (*flow*) con risposte positive prima di affrontare compiti al limite.
4. **Decadimento per Inattività**: se un esercizio non viene praticato per oltre 14 giorni, il livello di partenza si ricalibra cautelativamente verso il basso di un livello per compensare la perdita di familiarità.

### Il Neuro Score: Normalizzazione e Calcolo
Il **Neuro Score** (da 0 a 1000 punti) è calcolato mediante una batteria standardizzata che seleziona quotidianamente un esercizio per ciascuna delle 9 aree. Il punteggio di ciascuna prova viene normalizzato attraverso una funzione sigmoide sui parametri psicometrici della letteratura scientifica (latenza di risposta, soglia di esposizione o accuratezza), pesando proporzionalmente tutti i 9 domini per restituire un indice bilanciato e confrontabile nel tempo.

---

## 5. Architettura Software, Privacy e Resilienza

Per garantire che la piattaforma rimanga uno strumento al servizio dell'utente e non delle logiche di profilazione pubblicitaria, l'architettura tecnica adotta requisiti stringenti:

1. **Client-Side First & Zero Cookie:**  
   L'intera applicazione viene eseguita localmente nel browser del client. Nessun dato personale, identificativo o statistica di prestazione viene trasmesso a server centrali. I dati sono conservati unicamente nel `localStorage` e possono essere esportati/importati dall'utente in qualsiasi momento in formato JSON aperto.
2. **Framework-Free (Vanilla TypeScript):**  
   Nessuna dipendenza da framework UI pesanti (React, Vue, Angular). Il rendering del DOM è gestito tramite primitive dirette in TypeScript, consentendo un avvio istantaneo anche su dispositivi a basso costo e un consumo energetico minimale.
3. **Web Audio API e Sintesi Vocale Procedurale:**  
   Gli effetti acustici (frequenze crescenti per le combo, metronomo ritmico, feedback sonori) sono generati proceduralmente in tempo reale tramite oscillatori nativi della Web Audio API; la sintesi vocale multilingua sfrutta l'API standard `window.speechSynthesis`, eliminando la necessità di scaricare pesanti file audio campionati.
4. **Supporto Offline e PWA:**  
   Grazie a un Service Worker leggero e a un Web App Manifest, Synapse Dojo è installabile su schermata home come app nativa e funziona perfettamente anche in assenza di connessione internet.

---

## 6. Bibliografia e Fonti Accademiche

1. **ACTIVE Trial (Velocità visiva UFOV e prevenzione demenza):**  
   Edwards, J. D., et al. (2017). *Speed of processing training results in lower risk of dementia.* Alzheimer's & Dementia: Translational Research & Clinical Interventions, 3(4), 603-611. [PMC5700828](https://pmc.ncbi.nlm.nih.gov/articles/PMC5700828/)
2. **Revisione Critica sui Programmi Commerciali:**  
   Simons, D. J., et al. (2016). *Do “Brain-Training” Programs Work?* Psychological Science in the Public Interest, 17(3), 103-186. [DOI: 10.1177/1529100616661983](https://journals.sagepub.com/doi/10.1177/1529100616661983)
3. **Multitasking Adattivo e Plasticità Neurale:**  
   Anguera, J. A., Gazzaley, A., et al. (2013). *Video game training enhances cognitive control in older adults.* Nature, 501(7465), 97-101. [PubMed: 24005416](https://pubmed.ncbi.nlm.nih.gov/24005416/)
4. **La Regola dell'85% per l'Apprendimento Ottimale:**  
   Wilson, R. C., Shenhav, A., Straccia, M., & Cohen, J. D. (2019). *The Eighty Five Percent Rule for optimal learning.* Nature Communications, 10, 4646. [PMC6831579](https://pmc.ncbi.nlm.nih.gov/articles/PMC6831579/)
5. **Algoritmi Adattivi Staircase:**  
   Kaernbach, C. (1991). *Simple adaptive testing with the weighted up-down method.* Perception & Psychophysics, 49(3), 227-229. [DOI: 10.3758/BF03214307](https://link.springer.com/article/10.3758/BF03214307)
6. **Allenamento Spaziale e Trasferimento:**  
   Uttal, D. H., et al. (2013). *The malleability of spatial skills: a meta-analysis of training studies.* Psychological Bulletin, 139(2), 352-402. [PubMed: 22663761](https://pubmed.ncbi.nlm.nih.gov/22663761/)
7. **Learning Therapy e Aritmetica Mentale Rapida:**  
   Nouchi, R., Kawashima, R., et al. (2016). *Reading and Solving Arithmetic Problems Improve Cognitive Functions of Normal Compact with Wait-List Control: A Randomized Controlled Trial.* Frontiers in Human Neuroscience, 10, 217. [PMC4868921](https://pmc.ncbi.nlm.nih.gov/articles/PMC4868921/)
8. **Intervento Multidominio e Stile di Vita (Trial FINGER):**  
   Ngandu, T., Kivipelto, M., et al. (2015). *A 2 year multidomain intervention of diet, exercise, cognitive training, and vascular risk monitoring versus control to prevent cognitive decline in at-risk elderly people (FINGER): a randomised controlled trial.* The Lancet, 385(9984), 2255-2263. [PubMed: 25771249](https://pubmed.ncbi.nlm.nih.gov/25771249/)
9. **Memoria di Lavoro e N-Back:**  
   Au, J., et al. (2015). *Improving fluid intelligence with training on working memory: a meta-analysis.* Psychonomic Bulletin & Review, 22(2), 366-377. [PubMed: 25100447](https://pubmed.ncbi.nlm.nih.gov/25100447/)
10. **Inibizione e Flanker Task:**  
    Eriksen, B. A., & Eriksen, C. W. (1974). *Effects of noise letters upon the identification of a target letter in a nonsearch task.* Perception & Psychophysics, 16(1), 143-149. [DOI: 10.3758/BF03203267](https://link.springer.com/article/10.3758/BF03203267)
11. **Pianificazione Esecutiva e Torre di Londra:**  
    Shallice, T. (1982). *Specific impairments of planning.* Philosophical Transactions of the Royal Society of London. B, Biological Sciences, 298(1089), 199-209. [PubMed: 6125971](https://pubmed.ncbi.nlm.nih.gov/6125971/)
12. **Coordinazione Bimanuale e Corpo Calloso:**  
    Swinnen, S. P. (2002). *Intermanual coordination: from behavioural principles to neural-network interactions.* Nature Reviews Neuroscience, 3(5), 348-359. [PubMed: 11988774](https://pubmed.ncbi.nlm.nih.gov/11988774/)
13. **Flessibilità Cognitiva e Task Switching:**  
    Karbach, J., & Kray, J. (2009). *How useful is executive control training? Age differences in near and far transfer of task-switching training.* Developmental Science, 12(6), 978-990. [PubMed: 19840052](https://pubmed.ncbi.nlm.nih.gov/19840052/)
14. **Gamification ed Efficacia nei Compiti Cognitivi:**  
    Lumsden, J., et al. (2016). *Gamification of Cognitive Assessment and Training Systems: A Systematic Review of Applied Educational Technologies.* JMIR Serious Games, 4(2), e11. [PMC4971358](https://pmc.ncbi.nlm.nih.gov/articles/PMC4971358/)
