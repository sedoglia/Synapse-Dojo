# Synapse Dojo su Android (Google Play)

Questa guida spiega, passo per passo e senza dare per scontata alcuna esperienza Android, come trasformare il sito
[synapsedojo.com](https://synapsedojo.com) in un'app pubblicata su Google Play.

> Guida verificata sulle fonti ufficiali a novembre 2026. I punti che non è stato possibile verificare sono segnati con
> **⚠ Da verificare**: controllali al momento di farli, perché Google cambia spesso menu e regole.

## Indice

1. [Come funziona](#1-come-funziona)
2. [Cosa c'è già nel repository](#2-cosa-cè-già-nel-repository)
3. [Prerequisiti](#3-prerequisiti)
4. [Pubblica prima il sito](#4-pubblica-prima-il-sito)
5. [Genera il progetto Android e la chiave di firma](#5-genera-il-progetto-android-e-la-chiave-di-firma)
6. [Custodisci la chiave di firma](#6-custodisci-la-chiave-di-firma)
7. [Compila l'app](#7-compila-lapp)
8. [Impronta SHA-256 e assetlinks.json](#8-impronta-sha-256-e-assetlinksjson)
9. [Prova sul telefono](#9-prova-sul-telefono)
10. [Pubblicazione su Google Play](#10-pubblicazione-su-google-play)
11. [Aggiornare l'app in seguito](#11-aggiornare-lapp-in-seguito)
12. [Telefoni senza Chrome e altri store](#12-telefoni-senza-chrome-e-altri-store)
13. [Problemi comuni](#13-problemi-comuni)
14. [Fonti](#14-fonti)

---

## 1. Come funziona

L'app Android è una **Trusted Web Activity** (TWA): un piccolo «guscio» Android che apre il sito a schermo intero
usando Chrome (o un altro browser compatibile) installato sul telefono, senza barra degli indirizzi.

- **Il codice resta uno solo.** Giochi, testi, classifica e service worker sono quelli del sito. Non c'è un secondo
  progetto da mantenere.
- **Ogni deploy del sito aggiorna anche l'app.** All'apertura l'app carica il sito pubblicato, quindi `npm run deploy`
  basta per portare le novità anche su Android.
- **Il guscio va ricompilato solo di rado**: quando cambiano nome, icona, colori, indirizzo iniziale, pacchetto o
  quando Google alza il livello minimo di API richiesto (vedi [§11](#11-aggiornare-lapp-in-seguito)).
- **Il dominio deve «riconoscere» l'app.** Il file `https://synapsedojo.com/.well-known/assetlinks.json` contiene
  l'impronta della chiave con cui l'app è firmata. Se l'impronta manca o è sbagliata, l'app si apre lo stesso ma con
  una barra del browser in alto: è il segnale che la verifica non è riuscita.

- **Senza Chrome l'app usa una propria schermata WebView.** Sui telefoni che non hanno un browser capace di aprire
  una TWA (per esempio i Huawei senza servizi Google) il guscio mostra il sito a schermo intero con il componente
  WebView di Android, con lo stesso aspetto (vedi [§12](#12-telefoni-senza-chrome-e-altri-store)).

Lo strumento usato per generare il guscio è [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap), un programma
a riga di comando di Google per Node.js.

## 2. Cosa c'è già nel repository

| File | A cosa serve |
| --- | --- |
| `public/manifest.json` | Manifest della PWA, da cui Bubblewrap legge nome, colori e icone. |
| `public/icon-192.png`, `public/icon-512.png` | Icone «any» (l'icona così com'è, angoli arrotondati). |
| `public/icon-maskable-512.png` | Icona «maskable»: a tutto campo, con il disegno nella zona sicura centrale. Android la ritaglia a cerchio, goccia o quadrato senza tagliare il disegno. |
| `scripts/make-icons.mjs` | Rigenera i tre PNG da `public/icon.svg` (`node scripts/make-icons.mjs`). Serve solo se cambi l'icona SVG. |
| `public/.well-known/assetlinks.json` | Collega il dominio all'app. Contiene le impronte della chiave di caricamento e della chiave di firma di Google Play (vedi [§8](#8-impronta-sha-256-e-assetlinksjson)). |
| `public/_headers` | Fa servire `assetlinks.json` come `application/json` e senza cache. |
| `android/twa-manifest.json` | Configurazione di Bubblewrap: pacchetto, nome, colori, icone, versione, percorso della chiave. |
| `scripts/android-webview/` | Sorgenti della schermata WebView per i telefoni senza Chrome ([§12](#12-telefoni-senza-chrome-e-altri-store)). |
| `scripts/patch-android.mjs` | Aggiunge la schermata WebView al progetto generato da Bubblewrap (`npm run android:patch`). Va rieseguito dopo ogni `bubblewrap update`. |
| `.gitignore` | Esclude da git la chiave di firma (`*.keystore`, `*.jks`), i pacchetti `.aab`/`.apk` e tutto il progetto Android generato in `android/` tranne `twa-manifest.json`. |

Valori scelti in `android/twa-manifest.json`:

| Campo | Valore | Note |
| --- | --- | --- |
| `packageId` | `com.synapsedojo.app` | Identificativo dell'app su Google Play. **Non si può più cambiare dopo la prima pubblicazione**: se ne vuoi un altro, cambialo ora qui e in `assetlinks.json`. |
| `host` | `synapsedojo.com` | Dominio di produzione (da `sitemap.xml`, `robots.txt` e README). |
| `name` / `launcherName` | `Synapse Dojo` | Il nome sotto l'icona può avere al massimo 12 caratteri: «Synapse Dojo» li ha esattamente. |
| `themeColor`, `navigationColor` | `#f4f5fb` (scuro: `#11121a`) | Barra di stato e barra di navigazione hanno lo stesso colore dello sfondo del sito (`--bg` in `src/style.css`), così si confondono con la pagina. Android sceglie la variante scura quando il telefono è in tema scuro, come fa il sito. |
| `backgroundColor` | `#f4f5fb` | Colore della schermata di avvio. |
| `enableNotifications` | `false` | Il sito non usa notifiche, così l'app non chiede il permesso relativo. |
| `fallbackType` | `webview` | Cosa fare quando nessun browser può aprire la TWA: mostrare il sito in un WebView invece che in una scheda del browser. Fa anche aggiungere a Bubblewrap il permesso `INTERNET`. |
| `appVersion` / `appVersionCode` | `0.21.1` / `5` | Il nome di versione è quello di `package.json` al momento dell'ultimo pacchetto compilato; il codice è un numero intero che deve crescere a ogni pacchetto caricato su Play. Le release solo del sito non cambiano questi valori: per esempio la 0.22.0 è online, mentre l'app negli store resta 0.21.1 (codice 5) e apre comunque il sito aggiornato. |
| `signingKey` | `./android.keystore`, alias `android` | La chiave di firma, che creerai tu (vedi §5). Il file è ignorato da git. |

## 3. Prerequisiti

- **Un computer Windows** con questo repository e **Node.js 22.12 o più recente** (lo stesso già richiesto dal
  progetto; Bubblewrap chiede almeno Node 18).
- **Circa 2–3 GB liberi** per Java e gli strumenti Android che Bubblewrap scarica.
- **Un telefono Android** con Chrome aggiornato e un **cavo USB** (o il debug via Wi‑Fi di Android 11+).
- **Un account Google** per la Play Console e **25 USD** per la registrazione una tantum.

Installa Bubblewrap una volta sola, da PowerShell:

```powershell
npm install -g @bubblewrap/cli
bubblewrap --version
```

**Java e Android SDK:** al primo comando Bubblewrap chiede se scaricare e installare da sé le dipendenze esterne.
Rispondi **sì**: è la strada consigliata da Google, e Bubblewrap le mette nella sua cartella
`%USERPROFILE%\.bubblewrap\` senza toccare il resto del sistema. Al primo `build` ti chiederà anche di accettare le
licenze degli Android Build Tools.

- Bubblewrap richiede **JDK 17** esattamente: versioni precedenti non compilano il progetto e quelle successive non
  sono compatibili con gli strumenti a riga di comando di Android. Se hai già un altro Java installato, lascia comunque
  che Bubblewrap usi il suo.
- Se preferisci installarli a mano: JDK 17 da [Adoptium](https://adoptium.net/) e i «command line tools» da
  [developer.android.com](https://developer.android.com/studio#command-tools), poi indica i percorsi a Bubblewrap
  (vengono salvati in `%USERPROFILE%\.bubblewrap\config.json`). Evita percorsi con spazi per l'SDK.

Per controllare che tutto sia a posto:

```powershell
bubblewrap doctor
```

## 4. Pubblica prima il sito

Bubblewrap legge manifest e icone **dal sito online**, quindi le modifiche di questo repository devono essere già
pubblicate:

```powershell
npm run deploy
```

Poi apri nel browser e controlla che rispondano tutti:

- <https://synapsedojo.com/manifest.json> (deve contenere le icone PNG)
- <https://synapsedojo.com/icon-512.png>
- <https://synapsedojo.com/icon-maskable-512.png>
- <https://synapsedojo.com/.well-known/assetlinks.json>

Facoltativo: `bubblewrap validate --url=https://synapsedojo.com/` controlla che il sito rispetti i criteri di qualità
richiesti a una TWA.

## 5. Genera il progetto Android e la chiave di firma

Tutti i comandi si danno dalla cartella del repository (`C:\Progetti\Synapse-Dojo`).

### 5.1 Crea progetto e chiave con `init`

```powershell
bubblewrap init --manifest=https://synapsedojo.com/manifest.json --directory=android
```

Bubblewrap legge il manifest online e fa una serie di domande. Rispondi con i valori della tabella del
[§2](#2-cosa-cè-già-nel-repository), che corrispondono a `android/twa-manifest.json`:

| Domanda | Risposta |
| --- | --- |
| Domain / URL path | `synapsedojo.com` / `/` |
| Application name | `Synapse Dojo` |
| Short name (launcher) | `Synapse Dojo` |
| Application ID (package) | `com.synapsedojo.app` |
| Starting version code | `1` |
| Display mode | `standalone` |
| Orientation | `default` |
| Status bar color | `#F4F5FB` (i colori del tema scuro li riporta il §5.2) |
| Splash screen color | `#F4F5FB` |
| Icon URL | `https://synapsedojo.com/icon-512.png` |
| Maskable icon URL | `https://synapsedojo.com/icon-maskable-512.png` |
| Monochrome icon URL | lascia vuoto |
| Play Billing | **No** |
| Geolocation (location delegation) | **No** |
| Key store location | `./android.keystore` (proposta predefinita) |
| Key name (alias) | `android` (proposta predefinita) |

Prima delle domande Bubblewrap mostra un avviso sulla «Families Policy» di Google Play: riguarda le app rivolte ai
bambini (vedi [§10.4](#104-scheda-dello-store-e-questionari)).

Siccome la chiave non esiste ancora, Bubblewrap chiede se crearla: rispondi **sì** e inserisci:

- nome e cognome, unità organizzativa, organizzazione (puoi mettere il tuo nome anche lì) e il codice paese a due
  lettere (`IT`);
- **la password del keystore e quella della chiave** (almeno 6 caratteri ciascuna). Sceglile tu, robuste, e salvale
  subito in un gestore di password (vedi §6). Nessuno potrà recuperarle per te.

Alla fine in `android/` trovi il progetto Android generato e il file `android.keystore`. Git li ignora:
`git status` deve mostrare al massimo `android/twa-manifest.json` come modificato.

> ⚠ **Da verificare:** non è documentato se `init` chieda conferma prima di sovrascrivere un `twa-manifest.json` già
> presente. In ogni caso il file è in git, quindi non si perde nulla.

### 5.2 Riporta la configurazione del repository

`init` riscrive `android/twa-manifest.json` con le tue risposte e con alcuni valori predefiniti (per esempio le notifiche
attive e la barra di navigazione nera). Per usare la configurazione del repository:

```powershell
git diff android/twa-manifest.json      # guarda cosa è cambiato
git checkout -- android/twa-manifest.json
cd android
bubblewrap update --skipVersionUpgrade
cd ..
npm run android:patch
```

`bubblewrap update` rigenera il progetto Android a partire da `twa-manifest.json`; `--skipVersionUpgrade` evita che
aumenti il numero di versione. `npm run android:patch` aggiunge al progetto appena rigenerato la schermata WebView
([§12](#12-telefoni-senza-chrome-e-altri-store)): va eseguito **dopo ogni `bubblewrap update`**. Se il diff mostra differenze che vuoi tenere (per esempio un pacchetto diverso), invece
di `git checkout` modifica il file e ricordati di aggiornare anche `package_name` in
`public/.well-known/assetlinks.json`.

### 5.3 In alternativa: chiave creata a mano

Se preferisci non usare `init`, puoi creare la chiave con `keytool` (incluso nel JDK scaricato da Bubblewrap, nella
cartella `bin` dentro `%USERPROFILE%\.bubblewrap\jdk\`) e poi generare il progetto con `bubblewrap update`:

```powershell
cd android
keytool -genkeypair -v -keystore android.keystore -alias android -keyalg RSA -keysize 2048 -validity 10000
bubblewrap update --skipVersionUpgrade
cd ..
npm run android:patch
```

`keytool` chiede le stesse informazioni e le password. ⚠ **Da verificare:** il nome esatto della sottocartella del JDK
dipende dalla versione scaricata.

## 6. Custodisci la chiave di firma

Il file `android/android.keystore` con le sue due password è la **chiave di caricamento** (upload key): Google Play
accetta i nuovi pacchetti solo se firmati con questa chiave.

- **Non metterla mai in git, in chat, in e-mail o in un servizio pubblico.** Il `.gitignore` la esclude già, ma non
  forzarne l'aggiunta (`git add -f`).
- **Fanne almeno due copie di sicurezza** fuori dal computer (per esempio una chiavetta USB cifrata e un archivio cloud
  cifrato), insieme alle password salvate in un gestore di password.
- Con **Play App Signing** (attivo in automatico per le app nuove) la chiave che firma l'app installata dagli utenti la
  custodisce Google; la tua è solo la chiave di caricamento. Se la perdi o viene compromessa, puoi chiedere a Google di
  reimpostarla dalla Play Console, ma richiede tempo: meglio non perderla.
- Per compilare senza digitare le password ogni volta puoi impostarle nelle variabili d'ambiente
  `BUBBLEWRAP_KEYSTORE_PASSWORD` e `BUBBLEWRAP_KEY_PASSWORD` della sessione di PowerShell. Non scriverle in file del
  repository.

## 7. Compila l'app

```powershell
cd android
bubblewrap build
```

Bubblewrap chiede le due password e produce, sempre in `android/`:

- `app-release-bundle.aab`: il pacchetto da **caricare su Google Play**;
- `app-release-signed.apk`: il pacchetto da **installare direttamente sul telefono** per le prove.

Entrambi sono ignorati da git. Se vuoi saltare il controllo di qualità del sito (per esempio senza rete), aggiungi
`--skipPwaValidation`.

## 8. Impronta SHA-256 e assetlinks.json

`public/.well-known/assetlinks.json` deve elencare le impronte SHA-256 dei certificati con cui l'app è firmata. Le
impronte sono **due**, perché l'app installata da Play è firmata da Google, mentre quella che installi tu per le prove
è firmata con la tua chiave:

| Impronta | Dove trovarla | Stato nel repository |
| --- | --- | --- |
| La tua chiave di caricamento (`android.keystore`) | Con `keytool`, subito (§8.1) | Già inserita |
| La chiave di firma di Google Play | Nella Play Console, dopo aver creato l'app e caricato il primo `.aab` (§8.2) | Già inserita |

Un'impronta ha questa forma: 32 coppie di cifre esadecimali separate da due punti, per esempio
`AB:CD:12:…:EF` (95 caratteri).

### 8.1 Impronta della tua chiave

```powershell
cd android
keytool -list -v -keystore android.keystore -alias android
```

Inserisci la password del keystore e copia il valore della riga `SHA256:`. Oppure, dopo il build, dal pacchetto:

```powershell
keytool -printcert -jarfile app-release-signed.apk
```

### 8.2 Impronta di Play App Signing

Dopo aver creato l'app e caricato il primo `.aab` (vedi §10), nella Play Console apri l'app e vai su
**Protezione con Play › Protezione del Play Store › Gestisci la firma dell'app di Play** (in inglese *Protected with
Play › Play Store protection › Manage Play app signing*). Nella sezione **Certificato della chiave di firma dell'app**
copia l'impronta **SHA-256**.

> ⚠ **Da verificare:** Google ha spostato questa pagina più volte (in passato era in *Release › Setup › App integrity*
> o *Test e rilascio › Integrità dell'app*). Se non la trovi, cerca «firma dell'app» nella barra di ricerca della
> Play Console. Nella stessa pagina la Play Console può anche mostrarti un `assetlinks.json` già pronto.

### 8.3 Compila e pubblica il file

Aggiungi le impronte in `public/.well-known/assetlinks.json` tra virgolette, una per riga, per esempio:

```json
"sha256_cert_fingerprints": [
  "AB:CD:…:EF",
  "12:34:…:90"
]
```

Attenzione alla sintassi: Chrome è severo, **niente virgola dopo l'ultimo elemento**. Poi:

```powershell
npm run deploy
```

e controlla che <https://synapsedojo.com/.well-known/assetlinks.json> mostri le impronte nuove. Puoi verificarlo anche
con lo strumento di Google:
`https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://synapsedojo.com&relation=delegate_permission/common.handle_all_urls`.

In alternativa Bubblewrap può scrivere il file per te: `bubblewrap fingerprint add <SHA-256>` (una volta per impronta,
dalla cartella `android`) e poi `bubblewrap fingerprint generateAssetLinks --output=..\public\.well-known\assetlinks.json`.

## 9. Prova sul telefono

1. Sul telefono attiva le **Opzioni sviluppatore**: *Impostazioni › Informazioni sul telefono*, tocca 7 volte
   **Numero build**.
2. In *Impostazioni › Sistema › Opzioni sviluppatore* attiva **Debug USB** (il percorso cambia un po' da marca a marca).
3. Collega il telefono con il cavo e accetta la richiesta «Consentire il debug USB?».
4. Installa l'app:

   ```powershell
   cd android
   bubblewrap install
   ```

   (installa `app-release-signed.apk` con `adb`, incluso nell'SDK scaricato da Bubblewrap).
5. Apri **Synapse Dojo** dal telefono e controlla:
   - **niente barra degli indirizzi in alto**: la verifica del dominio è riuscita. Se la barra c'è, l'impronta della
     tua chiave non è (ancora) in `assetlinks.json` o il sito non è stato ripubblicato (vedi §13);
   - icona, nome e colori corretti;
   - un esercizio, la classifica (con la verifica Turnstile) e il funzionamento offline in modalità aereo.

## 10. Pubblicazione su Google Play

### 10.1 Account sviluppatore

- Registrati su [play.google.com/console](https://play.google.com/console): serve avere almeno 18 anni, un account
  Google e pagare **25 USD una tantum** (non si accettano carte prepagate).
- Scegli **account personale** (a tuo nome) o **organizzazione** (per un'azienda o associazione: richiede più
  documenti). Per un progetto personale va bene l'account personale.
- Google verifica l'identità (documento e carta a tuo nome). Gli account personali devono anche **verificare l'accesso a
  un dispositivo Android** tramite l'app Play Console per dispositivi mobili.

> ⚠ **Da verificare:** Google sta introducendo una verifica degli sviluppatori anche per le app distribuite fuori da
> Play. Per chi pubblica su Play di norma basta la verifica della Play Console, ma controlla eventuali nuove richieste
> al momento della registrazione.

### 10.2 Crea l'app e carica il primo pacchetto

1. **Crea app**: nome «Synapse Dojo», lingua predefinita, tipo **App** (o **Gioco**: vedi la scelta della categoria al
   §10.4), **Gratuita**. Accetta le dichiarazioni richieste.
2. **Play App Signing** è attivo in automatico per le app nuove: lascialo così.
3. Vai su **Test › Test chiuso**, crea una traccia (o usa quella *Alpha*), carica `android/app-release-bundle.aab` e
   compila le note di rilascio.
4. Dopo il caricamento recupera l'impronta di Play App Signing e completa `assetlinks.json` (§8.2–8.3).

### 10.3 Test chiuso obbligatorio (account personali nuovi)

Gli **account personali creati dopo il 13 novembre 2023** non possono pubblicare subito in produzione:

- serve un **test chiuso con almeno 12 tester** iscritti;
- i tester devono restare iscritti **per almeno 14 giorni consecutivi** (chi si disiscrive e si reiscrive ricomincia
  il conteggio);
- poi, dalla **Dashboard** della Play Console, scegli **Richiedi l'accesso alla produzione** e rispondi alle domande sul
  test, sull'app e sulla preparazione al lancio. Google risponde di solito entro 7 giorni.

Consigli pratici: aggiungi i tester tramite un elenco di indirizzi e-mail o un Google Group, mandagli il link di
iscrizione del test e chiedi di usare davvero l'app e di lasciare un commento: nella richiesta di produzione Google
chiede come è andato il test.

### 10.4 Scheda dello store e questionari

Nella sezione **Crescita › Presenza sullo store › Scheda principale dello store** (e in *Monitora e migliora › Norme e
programmi › Contenuti dell'app* per i questionari) servono:

- **Nome dell'app** (massimo 30 caratteri), **descrizione breve** (massimo 80) e **descrizione completa** (massimo
  4000). Puoi partire dai testi del README, mantenendo le stesse avvertenze: è un gioco a scopo di svago, **non un
  dispositivo medico**, e i benefici riguardano soprattutto gli esercizi allenati.
- **Icona** 512×512 PNG: usa `public/icon-maskable-512.png` (quadrata e a tutto campo; Google arrotonda gli angoli da
  sé).
- **Immagine in evidenza** 1024×500 e **almeno 2 screenshot** del telefono (puoi farli dall'app installata).
- **Categoria**: per esempio *Giochi › Rompicapo* o *App › Istruzione*.
- **Norme sulla privacy**: <https://synapsedojo.com/privacy>.
- **Classificazione dei contenuti** (questionario IARC).
- **Pubblico di destinazione**: se includi fasce sotto i 13 anni, l'app ricade nelle norme «Famiglie» di Google Play,
  con requisiti aggiuntivi. Scegli con attenzione.
- **Annunci**: l'app **non contiene annunci**.
- **Accesso all'app**: tutte le funzioni sono accessibili senza credenziali.
- **Sicurezza dei dati** (Data safety): obbligatorio anche per i test chiusi e anche se l'app non raccoglie dati.
  Dichiara cosa raccoglie o condivide l'app, incluso ciò che lasciano i servizi di terze parti, seguendo l'informativa
  in <https://synapsedojo.com/privacy>. Le risposte date (verificate con la release 0.21.1, codice 5):

  | Domanda | Risposta |
  | --- | --- |
  | L'app raccoglie o condivide dati utente richiesti? | **Sì** |
  | Dati cifrati in transito? | **Sì** (HTTPS) |
  | Metodi di creazione dell'account | **La mia app non consente agli utenti di creare un account**; account creati fuori dall'app: **No** |
  | Modo per chiedere l'eliminazione dei dati | **Sì**, URL `https://synapsedojo.com/privacy` |
  | *Attività nelle app › Interazioni con l'app* | **Raccolti**, non condivisi, non trattati in modo temporaneo; **gli utenti possono scegliere** se attivarne la raccolta; scopi **Funzionalità dell'app** (classifica) e **Analisi** (statistiche di visita e conteggio anonimo di chi si allena negli ultimi 7 giorni) |

  Le altre voci di *Tipi di dati* restano quelle della prima compilazione. Va aggiornato solo se dal dispositivo esce
  un tipo di dato nuovo: il conteggio anonimo della 0.21 rientrava già in *Interazioni con l'app › Analisi*.
- **Eliminazione dell'account**: per Google l'app non ha account (la classifica usa un identificativo anonimo), ma il
  link `https://synapsedojo.com/privacy` spiega comunque come uscire dalla classifica e cancellarne i dati.

> ⚠ **Da verificare:** i nomi esatti dei menu della Play Console cambiano spesso; se non trovi una voce, usa la barra di
> ricerca della Play Console. Le norme di Google Play chiedono anche che un'app non sia «solo un sito web» con poche
> funzioni: Synapse Dojo funziona offline e ha contenuti propri, ma è bene metterlo in evidenza nella scheda.

### 10.5 Pubblicare un aggiornamento su Google Play

L'app è nel **test chiuso (Alpha)**: prima versione pubblicata il 15 novembre 2026 (codice 4), aggiornamento 0.21.1
(codice 5) inviato il 21 novembre 2026. Per ogni nuovo pacchetto ([§11](#11-aggiornare-lapp-in-seguito)):

1. **Testa e rilascia › Test › Test chiuso › Alpha › Crea nuova release**, poi *Carica*
   `android/app-release-bundle.aab`. Controlla che la riga del bundle mostri il nuovo codice e versione (per esempio
   `5 (0.21.1)`), API 24 e successive e l'SDK target atteso.
2. **Release precedente**: **non** includere la versione precedente, così i tester ricevono l'aggiornamento.
3. **Nome della release**: va bene quello proposto, `codice (versione)`.
4. **Note di rilascio**: un blocco per lingua tra tag, al massimo **500 caratteri** per lingua (lo stesso testo va bene
   per AppGallery e Uptodown):

   ```text
   <en-US>
   What's new in …
   </en-US>
   <it-IT>
   Novità della versione …
   </it-IT>
   ```

5. **Avanti**: nell'anteprima controlla che nessun dispositivo perda la compatibilità e che gli avvisi siano solo gialli
   (quelli rossi bloccano). Implementazione **100%**, poi **Salva**.
6. Se è uscito dal dispositivo un tipo di dato nuovo, aggiorna la **Sicurezza dei dati**: *Monitora e migliora › Norme e
   programmi › Contenuti app*, scheda **Azione completata** (in *Attenzione richiesta* compare solo ciò che Google
   chiede di nuovo), *Sicurezza dei dati › Gestisci*. Se *Salva* resta grigio non c'è nulla di cambiato.
7. **Panoramica della pubblicazione** (icona del foglio con il pallino blu): invia le modifiche in revisione. Con la
   **pubblicazione gestita disattivata** la release parte da sola appena Google la approva; l'esito arriva per email.

## 11. Aggiornare l'app in seguito

**Per quasi tutto basta il deploy del sito.** Nuovi giochi, traduzioni, correzioni e grafica arrivano a tutti con:

```powershell
npm run deploy
```

L'app carica sempre il sito pubblicato, e `src/update.ts` ricarica la pagina quando trova una nuova versione, proprio
come per la PWA.

**Serve un nuovo `.aab` solo quando cambia il guscio Android**, cioè:

- nome, icona (`public/icon.svg` → `node scripts/make-icons.mjs` → deploy), colori o schermata di avvio;
- indirizzo iniziale, dominio o pacchetto (il pacchetto in realtà non si può cambiare dopo la pubblicazione);
- quando Google Play richiede un **livello API di destinazione** più recente (succede circa una volta l'anno: la Play
  Console lo segnala con un avviso). In quel caso aggiorna prima Bubblewrap con `npm install -g @bubblewrap/cli`.

Procedura per un nuovo pacchetto:

```powershell
npm install -g @bubblewrap/cli          # Bubblewrap aggiornato
cd android
bubblewrap update --appVersionName=0.22.0   # la versione attuale di package.json
cd ..
npm run android:patch
cd android
bubblewrap build
```

`bubblewrap update` aumenta di 1 `appVersionCode` (Play rifiuta un pacchetto con un codice già usato), imposta il nome
di versione indicato (usa quello di `package.json`) e rigenera il progetto; `npm run android:patch` vi rimette la
schermata WebView; poi committa `android/twa-manifest.json` aggiornato. Carica il nuovo `app-release-bundle.aab`
sulla traccia di Play che usi (test o produzione, vedi [§10.5](#105-pubblicare-un-aggiornamento-su-google-play)) e il
nuovo `app-release-signed.apk` sugli altri store ([§12.3](#123-altri-store-appgallery-uptodown)).

Le modifiche manuali al progetto Android generato vengono cancellate da `bubblewrap update`: cambia sempre
`android/twa-manifest.json` o i file in `scripts/android-webview/`, mai i file generati.

## 12. Telefoni senza Chrome e altri store

### 12.1 Cosa succede senza Chrome

Una TWA ha bisogno di un browser che la sappia aprire (Chrome e pochi altri). Dove non c'è, per esempio sui telefoni
Huawei senza servizi Google, il guscio generato da Bubblewrap aprirebbe una normale scheda del browser, con la barra
dell'indirizzo. Per questo l'app contiene anche una **schermata WebView** (`WebViewActivity`): mostra lo stesso sito a
schermo intero usando il componente WebView di Android, presente su ogni telefono.

- **La scelta è automatica** e si ripete a ogni avvio: se c'è un browser che supporta le TWA l'app usa la TWA, come
  prima; solo altrimenti usa il WebView. Chi installa da Google Play ha Chrome, quindi per lui non cambia nulla.
- **Il sito è lo stesso** e si aggiorna allo stesso modo con `npm run deploy`. I dati però non sono condivisi: il
  WebView ha il suo salvataggio, separato da quello di Chrome sullo stesso telefono.
- **Non serve `assetlinks.json`**: la verifica del dominio riguarda solo la TWA.

La schermata aggiunge ciò che un browser fa da sé e un WebView no:

| Funzione | Come è resa nel WebView |
| --- | --- |
| Importare un salvataggio (`<input type="file">`) | Si apre il selettore di file del telefono. |
| Esportare i progressi, promemoria del calendario, salvare la cartolina (`<a download>`) | Si apre la schermata «Salva» di sistema, dove scegli la cartella. Non serve alcun permesso di archiviazione. |
| Condividi (`navigator.share`) | Pannello di condivisione di Android, anche con l'immagine. |
| Vibrazione | Permesso `VIBRATE` (non chiede nulla all'utente). |
| Tema chiaro/scuro | Segue il telefono, come nel browser. |
| Barre di sistema | Dello stesso colore della pagina; da Android 15 la pagina resta dentro i margini di sistema. |
| Link verso altri siti, WhatsApp, Telegram | Si aprono fuori dall'app. |
| Tasto Indietro | Torna alla pagina precedente, poi chiude l'app. |

### 12.2 Dove sta il codice

Bubblewrap riscrive tutto il progetto Android a ogni `bubblewrap update`, quindi le aggiunte stanno in
`scripts/android-webview/` e lo script `scripts/patch-android.mjs` le rimette al loro posto:

| File | A cosa serve |
| --- | --- |
| `WebViewActivity.java` | La schermata. |
| `webview-bridge.js` | Piccolo script eseguito nella pagina: passa all'app i file da salvare e le richieste di condivisione. Il sito non va modificato. |
| `res/values*/synapse_webview.xml` | Tema chiaro e scuro della schermata, con i colori di `twa-manifest.json`. |
| `proguard-webview.pro` | Dice al compressore di codice di non rinominare i metodi chiamati dalla pagina. |
| `AgeSignal.java` | Chiede a Google Play la fascia d'età prima di aprire il sito ([§12.6](#126-età-comunicata-da-google-play)). |

Lo script inoltre dichiara la schermata e i permessi `INTERNET` e `VIBRATE` nel manifest, la collega a
`LauncherActivity`, aggiunge la cartella dei file condivisi a `filepaths.xml` e la libreria `androidx.webkit` a
`app/build.gradle` (serve perché su Android 10–12 la pagina usi il proprio tema scuro, invece di essere scurita in
automatico dal WebView). Aggiunge anche la libreria `com.google.android.play:age-signals` e, in `LauncherActivity`,
la chiamata ad `AgeSignal` prima dell'apertura del sito. Si può eseguire più volte; se dopo un
aggiornamento di Bubblewrap non trova più le righe che si aspetta, si ferma con un errore invece di produrre un'app
incompleta.

### 12.3 Altri store (AppGallery, Uptodown)

- **Google Play** vuole il pacchetto `app-release-bundle.aab`. **Gli altri store** vogliono l'APK:
  `app-release-signed.apk`, firmato con la tua chiave di caricamento. Sono lo stesso codice e la stessa versione.
- **Stesso pacchetto, firma diversa.** L'app scaricata da Play è firmata da Google, quella degli altri store dalla tua
  chiave: Android non permette di aggiornare l'una con l'altra. Chi ha l'app di uno store e vuole passare a un altro
  deve prima disinstallarla (perdendo i dati locali: prima conviene esportarli).
- **Entrambe le impronte restano in `assetlinks.json`**: così anche l'APK degli altri store, su un telefono con
  Chrome, si apre come TWA senza barra dell'indirizzo.
- **Huawei AppGallery**: carica l'APK da AppGallery Connect, nella bozza della versione. L'app non usa servizi Google
  (GMS), quindi non servono gli HMS. La procedura completa è in [§12.4](#124-huawei-appgallery).
- **Uptodown**: nella console sviluppatori, scheda *Files*, carica il nuovo APK e reinvia la scheda in revisione.
  Versione 0.21.1 (codice 5) caricata il 21 novembre 2026. Per ogni versione:
  - **Manage file licensing**:

    | Campo | Valore |
    | --- | --- |
    | Distribution Model | Free |
    | IAP, Subscription, Ads | No |
    | License Type | **Source available** o **Other** (`PolyForm Noncommercial 1.0.0`) se il menu li offre, altrimenti **Proprietary**: la licenza non è open source, perché vieta l'uso commerciale |
    | License Text URL | `https://synapsedojo.com/license` |
    | Source Code URL | `https://github.com/sedoglia/Synapse-Dojo` |
    | Notice URL | `https://github.com/sedoglia/Synapse-Dojo/blob/main/LICENSE` (contiene la riga «Required Notice» chiesta dalla licenza; facoltativo) |

  - **New features for each language version**: il testo delle novità in *Italian* e in *English*, lo stesso di Google
    Play e AppGallery.

### 12.4 Huawei AppGallery

Prima versione inviata il 20 novembre 2026 (0.17.2, codice 4) e pubblicata il 21 novembre; seconda versione 0.21.1, codice 5. In AppGallery Connect, scheda *Distribute*, ci sono
due pagine da compilare.

**App information** (scheda dello store, vale per tutte le versioni):

- **Lingue**: inglese (US) come lingua predefinita; l'italiano si aggiunge con *Manage languages*, ripetendo testi e
  screenshot.
- **App name** `Synapse Dojo`; **Brief introduction** al massimo 80 caratteri; **Full introduction** al massimo 8000.
  Valgono le stesse avvertenze di Google Play (svago, non è un dispositivo medico) e conviene dire che l'app funziona
  offline, perché Huawei può rifiutare le app che sembrano «solo un sito web». Non nominare altri store o browser.
- **Icon**: `public/icon-maskable-512.png`, quadrata con gli angoli squadrati (Huawei li arrotonda da sé).
- **Screenshots**: da 3 a 8. Vanno bene gli 8 file 1080×1920 di `android/store-assets/screenshots/` (`en-light` per
  l'inglese, `it-light` per l'italiano), gli stessi di Google Play.
- **Category**: l'app è registrata come gioco, quindi il menu offre solo *Games*: **Games › Puzzle & casual ›
  Puzzle**, tipo **Casual game**. Il tipo (app o gioco) si sceglie alla creazione e non si cambia da qui.
- **New features**: il testo delle novità di ogni aggiornamento (al massimo 1000 caratteri) si scrive **qui**, per
  ogni lingua, sotto *Brief introduction*, e non nella bozza della versione. Viene pubblicato insieme alla versione
  successiva. Lo stesso testo va bene per Google Play, che però accetta al massimo 500 caratteri.

**Version information › Draft** (per ogni versione):

| Sezione | Valore |
| --- | --- |
| Country/Region for release | *Selected countries/regions*: tutto tranne **Chinese mainland**, dove i giochi richiedono una licenza (ISBN). Gli Stati Uniti non compaiono: AppGallery non vi distribuisce. Gli elenchi «(partial)» dipendono da Huawei. |
| Open testing | No |
| App version | *Manage packages › Upload*: `android/app-release-signed.apk` (non l'`.aab`, che richiederebbe *App Signing* e la consegna della chiave a Huawei). Poi selezionarlo. |
| Payment / In-app purchases | Free; nessuna casella spuntata. |
| Content rating | Questionario (*Set*): vedi sotto. Risultato **3+** ovunque (Brasile «AL»). |
| Privacy statement | Privacy policy URL e Data subject right URL: `https://synapsedojo.com/privacy`. |
| Privacy tags | *Collect personal data*: **Yes**; scenari **App functionality** e, dalla 0.21.1, **Analytics** per *App usage information* (il conteggio anonimo di chi si allena negli ultimi 7 giorni); voci: *Identifiers › User identifiers*, *Basic information › Age* e *Account information*, *App information › App settings* e *App usage information*. Le descrizioni le compila Huawei. |
| AI function declaration | Not involved |
| Copyright information | Vuoto (facoltativo). |
| For reviewer | *Sign-in required* non spuntato; nelle note (al massimo 300 caratteri): nessun account, progressi solo sul dispositivo, classifica facoltativa e spenta di default, conteggio anonimo (al massimo ogni 7 giorni) (solo la data) disattivabile nelle Impostazioni, niente pubblicità né acquisti. |
| Release time | Immediately once approved |

Nel questionario dell'età le risposte sono tutte **No** (violenza, linguaggio, droghe, azzardo, acquisti, chat,
posizione, accesso libero a internet) tranne due, che devono restare coerenti con i *Privacy tags* perché Huawei
confronta le sezioni:

- *I giocatori possono generare contenuti o socializzare?* **Yes**: il nome dei gruppi privati è scritto a mano ed è
  visto dagli altri membri, e la classifica mette a confronto i giocatori. Alla domanda successiva su voce o testo:
  **No**, non c'è chat.
- *Il gioco richiede un account o raccoglie dati personali con altri mezzi?* **Yes**: la fascia d'età facoltativa e
  l'identificativo anonimo della classifica.

Poi *Save Draft* e *Submit*. L'esito arriva per email e compare in *Review comments*. Per le versioni successive:
*Version/Update*, nuovo APK e le stesse risposte; nella scheda *App information* si aggiornano *New features* in ogni
lingua e, se cambia qualcosa, gli altri testi.

**Aggiornare solo la scheda, senza un nuovo APK.** Testi in ogni lingua, icona, screenshot, video, categoria e sito di
un'app già pubblicata si cambiano senza sostituire il pacchetto, ma passano comunque da una versione inviata in
revisione che riusa l'APK pubblicato ([guida di Huawei](https://developer.huawei.com/consumer/en/doc/app/agc-help-maintain-update-0000002271413697)):

1. **App information**: modifica i testi (lingua predefinita inglese, poi le altre da *Manage languages*) e premi
   **Save**. I testi pronti, in tutte le 25 lingue, sono in [scheda-store.md](scheda-store.md).
   Controlla anche *New features* in ogni lingua: viene pubblicato insieme alla revisione, quindi va svuotato o
   aggiornato se contiene ancora le novità della versione precedente.
2. Apri la pagina **New version – Draft** che AppGallery crea per l'aggiornamento.
3. **Non caricare un nuovo APK**: resta quello pubblicato (0.21.1, codice 5). Le altre sezioni restano compilate con
   le risposte della tabella qui sopra.
4. **Submit** in alto a destra. L'avviso che il codice di versione del pacchetto è uguale a quello già pubblicato è
   previsto: conferma e prosegui.
5. L'esito arriva per email e in *Review comments*; con *Release time* su *Immediately once approved* la scheda nuova
   esce appena approvata.

Non serve ricompilare con Bubblewrap né cambiare `appVersionCode`. Su Google Play invece le modifiche alla scheda vanno
in revisione da sole con **Salva**, senza alcuna versione ([§10.4](#104-scheda-dello-store-e-questionari)).

### 12.5 Provare il WebView

Su un telefono con Chrome l'app usa sempre la TWA. Per vedere il WebView serve un dispositivo senza browser che
supporti le TWA: un Huawei senza servizi Google, oppure un emulatore con un'immagine «Default Android System Image»
(AOSP, senza Chrome), per esempio:

```powershell
sdkmanager "emulator" "system-images;android-34;default;x86_64"
avdmanager create avd -n webview-test -k "system-images;android-34;default;x86_64"
emulator -avd webview-test
adb install app-release-signed.apk
```

Con `adb shell dumpsys activity activities` la schermata in primo piano risulta `com.synapsedojo.app/.WebViewActivity`.

### 12.6 Età comunicata da Google Play

Alcune leggi sulla verifica dell'età negli store (California AB 1043 e Brasile ECA Digital da gennaio 2027, Texas,
Alabama e altre) fanno sì che Google Play comunichi alle app la fascia d'età dell'utente tramite l'API
[Play Age Signals](https://developer.android.com/google/play/age-signals/overview). La legge californiana, per quanto
risulta, chiede anche allo sviluppatore di richiederla quando l'app viene scaricata e avviata. Google Play non obbliga
a usarla: la scelta e la valutazione legale restano dello sviluppatore.

**Come funziona.**

1. All'avvio `LauncherActivity` non apre subito il sito (`shouldLaunchImmediately()` restituisce `false`) e
   `AgeSignal.fetch()` chiama `checkAgeSignals()`. Appena arriva la risposta, dopo un errore o al massimo dopo
   1 secondo, apre il sito con `launchTwa()`.
2. Della risposta tiene solo se l'utente ha meno di 18 anni (`ageUpper` < 18) o almeno 18 (`ageLower` ≥ 18) e lo
   aggiunge all'indirizzo di avvio come `#sd-age=minor` o `#sd-age=adult`. Fascia esatta, `installId` e il resto non
   escono dalla classe. Se l'età non è nota l'indirizzo resta com'è.
3. Il sito (`src/ageSignal.ts`, il primo modulo caricato) legge il frammento, lo toglie subito dall'indirizzo e
   conserva solo `minor` in `localStorage` (chiave `synapse-dojo/age-signal`, fuori dal salvataggio e dai
   trasferimenti). Il frammento non arriva mai a un server, nemmeno alle statistiche di visita. Se l'app viene
   riaperta mentre la pagina è ancora aperta, Chrome può cambiare solo il frammento senza ricaricare: il sito lo legge
   anche da `hashchange` e, se il segnale è cambiato, ricarica la pagina.
4. Per un minore non vengono offerti classifica e gruppi (`socialAvailable()` in `src/board.ts`): niente proposta in
   home, niente inviti, al posto dell'iscrizione nelle Impostazioni un avviso. Se era già iscritto, all'avvio esce
   dalla classifica con la cancellazione dei dati sul server (ritentata all'avvio successivo se offline). Esercizi,
   progressi e conteggio anonimo restano invariati. Con `adult` il blocco si toglie; una risposta vuota lascia quello
   che si sapeva.

L'app non mostra mai il riquadro di Play che chiede all'utente di condividere l'età (`requestAgeSignalsAccess()`).
Fuori dai luoghi in cui la condivisione è obbligatoria la risposta è quasi sempre vuota. Sui telefoni senza Google
Play (AppGallery, Uptodown) la chiamata fallisce subito e l'app si apre come prima.

**Dichiarazioni.** Le norme di Google consentono di usare il segnale solo per offrire esperienze adatte all'età, mai
per pubblicità, marketing, profilazione o statistiche, ed è l'unico uso che ne fa l'app. La libreria non raccoglie
dati e l'informazione resta sul dispositivo, quindi la *Sicurezza dei dati* non cambia. L'informativa privacy ha la
sezione «Età comunicata da Google Play (app per Android)».

**Provare.** Per il sito basta aprire `http://localhost:5173/#sd-age=minor` (e poi `#sd-age=adult` per tornare
indietro); il sito accetta anche la forma codificata `#sd-age%3Dminor`. Su un telefono reale la risposta arriva
solo dove la condivisione è obbligatoria o se l'utente ha scelto di condividere l'età nelle impostazioni di Google
Play. Per simulare una risposta con l'età nell'app si usa `FakeAgeSignalsManager` della libreria, solo in una build
di prova e mai nel pacchetto pubblicato: in `android/app/.../AgeSignal.java` (il file generato, non quello in
`scripts/android-webview/`) si sostituisce il manager con un `FakeAgeSignalsManager` a cui
`setNextAgeSignalsResult()` dà per esempio `ageLower` 13 e `ageUpper` 15, si compila con
`gradlew :app:assembleRelease` e si firma l'APK con una chiave temporanea. L'indirizzo aperto da Chrome si legge con
`adb forward tcp:9222 localabstract:chrome_devtools_remote` e `http://127.0.0.1:9222/json`; nella schermata WebView
il socket è `webview_devtools_remote_<pid>` (visibile sulle immagini AOSP). Alla fine `npm run android:patch`
rimette il file originale.

**Aggiornare la libreria.** La versione è in `scripts/patch-android.mjs` (passo 7); le versioni pubblicate sono in
[Google Maven](https://dl.google.com/android/maven2/com/google/android/play/age-signals/maven-metadata.xml).

## 13. Problemi comuni

| Sintomo | Causa probabile | Cosa fare |
| --- | --- | --- |
| In alto compare la barra con l'indirizzo | La verifica di `assetlinks.json` non riesce | Controlla che il file online contenga l'impronta giusta (quella della tua chiave per l'APK installato a mano, quella di Play App Signing per l'app scaricata da Play), che il pacchetto sia `com.synapsedojo.app` e che il JSON sia valido. Dopo un deploy, disinstalla e reinstalla l'app. |
| Come leggere l'errore esatto | – | Con il telefono collegato: `adb logcat -v brief \| Select-String "OriginVerifier","digital_asset_links"`. «Statement failure matching fingerprint» vuol dire impronta sbagliata o mancante. |
| `bubblewrap build` dice che il JDK non è valido | Java diverso dalla versione 17 | Lascia che Bubblewrap usi il suo JDK 17, o correggi `jdkPath` in `%USERPROFILE%\.bubblewrap\config.json`. |
| Bubblewrap chiede a ogni avvio se installare il JDK o l'Android SDK | Il download automatico non viene estratto per intero (visto con Node 26), quindi `%USERPROFILE%\.bubblewrap\config.json` resta con i percorsi vuoti | Installa a mano il JDK 17 (`winget install EclipseAdoptium.Temurin.17.JDK`), rispondi **No** alla domanda sul JDK e indica la cartella in `C:\Program Files\Eclipse Adoptium`. Per l'SDK estrai a mano lo zip rimasto in `%USERPROFILE%\.bubblewrap\android_sdk` e imposta il percorso con `bubblewrap updateConfig --androidSdkPath <cartella>`. `bubblewrap doctor` deve rispondere che i due percorsi sono validi. |
| `winget` non è riconosciuto | La cartella `WindowsApps` non è nel `PATH` | Usa il percorso completo: `& "$env:LOCALAPPDATA\Microsoft\WindowsApps\winget.exe" install …`. |
| `minSdkVersion 21 cannot be smaller than version 24` | La libreria usata da Bubblewrap richiede Android 7.0 (API 24) | In `android/twa-manifest.json` `minSdkVersion` deve essere almeno `24` (valore già impostato nel repository); poi `bubblewrap update --skipVersionUpgrade`. |
| Play rifiuta il pacchetto per il codice di versione | `appVersionCode` già usato | `bubblewrap update` (senza `--skipVersionUpgrade`) e di nuovo `bubblewrap build`. |
| Senza Chrome l'app apre una scheda del browser con la barra dell'indirizzo | Il pacchetto è stato compilato senza la schermata WebView | Esegui `npm run android:patch` dopo `bubblewrap update` e ricompila ([§12](#12-telefoni-senza-chrome-e-altri-store)). |
| `patch-android` si ferma con «Bubblewrap's template has changed» | Una versione nuova di Bubblewrap genera file diversi | Aggiorna i punti di inserimento in `scripts/patch-android.mjs` confrontandoli con i file generati in `android/app`. |
| Password del keystore dimenticata | – | Senza password la chiave non è utilizzabile: chiedi la reimpostazione della chiave di caricamento dalla Play Console (pagina della firma dell'app). |

## 14. Fonti

Consultate a novembre 2026:

- Bubblewrap CLI: <https://github.com/GoogleChromeLabs/bubblewrap/tree/main/packages/cli> (comandi, requisiti JDK 17,
  variabili d'ambiente delle password) e il codice di `TwaManifest.ts` (campi di `twa-manifest.json`).
- Trusted Web Activity per sviluppatori web: <https://developer.chrome.com/docs/android/trusted-web-activity/android-for-web-devs>
  (assetlinks.json, impronte, verifica con `adb logcat`).
- Requisiti di test per i nuovi account personali: <https://support.google.com/googleplay/android-developer/answer/14151465>.
- Play App Signing: <https://support.google.com/googleplay/android-developer/answer/9842756>.
- Sicurezza dei dati: <https://support.google.com/googleplay/android-developer/answer/10787469>.
- Registrazione dell'account sviluppatore: <https://support.google.com/googleplay/android-developer/answer/6112435>.
- Huawei AppGallery (§12.4): i campi e i limiti come apparivano in AppGallery Connect durante il primo invio, il 20
  novembre 2026.
