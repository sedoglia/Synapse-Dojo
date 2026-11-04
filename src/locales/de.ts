import type { Locale, Passage } from '../i18n';

const ui: Locale['ui'] = {
  'app.tagline': 'Ein paar Minuten am Tag für einen wacheren Geist',
  'home.how': 'Trainiere jeden Tag und miss dich, um deine Fortschritte zu sehen',
  'onboard.title': 'Willkommen!',
  'onboard.ask': 'Wie heißt du?',
  'onboard.placeholder': 'Dein Name',
  'onboard.go': 'Los geht’s',

  'landing.heroTitle': 'Trainiere deinen Geist wenige Minuten am Tag',
  'landing.heroSub': '35 neurowissenschaftlich fundierte kognitive Übungen zur Steigerung von Gedächtnis, Aufmerksamkeit, Rechengeschwindigkeit und Reflexen. 100 % kostenlos, werbefrei, ohne Konto und Passwort.',
  'landing.badgeFree': '100 % kostenlos',
  'landing.badgePrivacy': 'Voller Datenschutz · Lokale Daten',
  'landing.badgeScience': 'Wissenschaftlich fundiert',
  'landing.badgeOpenSource': 'Open Source',
  'landing.startCardTitle': 'Jetzt mit dem Training beginnen',
  'landing.startCardDesc': 'Keine Registrierung erforderlich. Wähle einen Spitznamen, um deinen Fortschritt im Browser zu speichern.',
  'landing.guestBtn': 'Oder als Gast spielen',
  'landing.guestName': 'Gast',
  'landing.guideBtn': '📖 Anleitung & Übersicht',
  'landing.howItWorks': 'So funktioniert Synapse Dojo',
  'landing.pillar1Title': 'Tägliches Training',
  'landing.pillar1Desc': '4 täglich ausgewählte Übungen, die sich an dein Niveau anpassen. Dauer: ca. 10 Minuten.',
  'landing.pillar2Title': 'Täglicher Neuro Score',
  'landing.pillar2Desc': 'Ein schneller Test von etwa 4 Minuten in allen 9 Bereichen, um deine Fortschritte objektiv zu messen.',
  'landing.pillar3Title': 'Freies Training (35 Spiele)',
  'landing.pillar3Desc': 'Trainiere jederzeit frei in allen 9 kognitiven Bereichen, um deine Bestleistungen zu schlagen.',
  'landing.pillar4Title': 'Wochenrangliste (freiwillig)',
  'landing.pillar4Desc': 'Wenn du möchtest, vergleiche deine Beständigkeit und deinen Fortschritt mit anderen Spielern oder Freunden, unter einem zufälligen Spitznamen. Sie bleibt aus, bis du beitrittst, und du kannst jederzeit austreten.',
  'landing.domainsTitle': 'Die 9 trainierten kognitiven Bereiche',
  'landing.guideCtaTitle': 'Möchtest du wissen, wie jedes Spiel funktioniert?',
  'landing.guideCtaDesc': 'Lies unseren ausführlichen Leitfaden mit wissenschaftlichen Grundlagen, Vorteilen und Spielregeln aller 35 Übungen.',
  'landing.guideCtaBtn': 'Vollständige Anleitung lesen',
  'landing.footerTagline': 'Synapse Dojo · Kostenloses Gehirntraining',

  'guide.title': 'Anleitung & Übersicht',
  'guide.subtitle': 'Funktionsweise von Synapse Dojo, Bereiche der App und detaillierte Erklärungen aller 35 kognitiven Übungen',
  'guide.navSections': 'Bereiche der App',
  'guide.introH': 'Warum das Gehirn trainieren?',
  'guide.introP': 'Das menschliche Gehirn besitzt die bemerkenswerte Fähigkeit, sich zeitlebens neu zu organisieren und synaptische Verbindungen aufzubauen: dies nennt man Neuroplastizität. Genauso wie Sport den Körper fit hält, stärkt regelmäßige geistige Stimulation Konzentration, Denkgeschwindigkeit und Gedächtnis. Synapse Dojo bietet ein schnelles, alltagstaugliches Workout: wenige Minuten am Tag mit Aufgaben, die sich stufenlos an deine Fähigkeiten anpassen.',
  'guide.planH': '🏋️ Tägliches Training (Plan)',
  'guide.planP': 'Jeden Tag stellt Synapse Dojo eine ausgewogene Reihe von 4 Übungen aus verschiedenen Bereichen (wie Schnelligkeit, Gedächtnis, Kontrolle und logisches Denken) zusammen. Die Übungen sind adaptiv: Richtige Antworten steigern den Schwierigkeitsgrad, Fehler senken ihn, damit du immer im idealen Lernbereich bleibst. Mit dem Training baust du deine Serie aus und sammelst XP für Levelaufstiege.',
  'guide.checkH': '📏 Miss deinen Neuro Score (Daily Check)',
  'guide.checkP': 'Der Neuro Score ist ein standardisierter täglicher Benchmark-Test von etwa 15–20 Minuten, der alle 9 kognitiven Bereiche des Gehirns prüft (Verarbeitungsgeschwindigkeit, Aufmerksamkeit, Exekutivfunktionen, Arbeitsgedächtnis, Langzeitgedächtnis, Raumkognition, Logik, Sprache & Rechnen sowie bilaterale Koordination) mit jeweils einer täglich rotierenden Aufgabe pro Bereich. Dein Gesamtwert (0–1000) liefert ein umfassendes und objektives Barometer deiner geistigen Fitness im Zeitverlauf.',
  'guide.trainingH': '🧩 Freies Training (35 Übungen)',
  'guide.trainingP': 'Im Bereich Fitnessstudio hast du unbegrenzten Zugriff auf alle 35 Übungen, gegliedert nach Fähigkeiten. Perfekt, um gezielt Schwächen zu trainieren oder neue Highscores aufzustellen.',
  'guide.progressH': '📈 Fortschritt & Statistiken',
  'guide.progressP': 'Überblicke dein kognitives Stärkenprofil im Netzdiagramm, den Verlauf deines Neuro Scores, freigeschaltete Abzeichen (z. B. für mehrtägige Serien) und deinen monatlichen Trainingskalender.',
  'guide.boardH': '🏆 Wochenrangliste und Freundesgruppen',
  'guide.boardP': 'Freiwillig und ausgeschaltet, bis du in den Einstellungen beitrittst. Jede Woche kannst du die Beständigkeit (10 Punkte pro Trainingstag plus 1 pro Übung, bis zu 12 am Tag), den Fortschritt gegenüber deinem eigenen Ausgangspunkt und das beste Level pro Übung vergleichen, mit einer freiwilligen Altersgruppe. Sie beginnt jeden Montag neu, und du siehst die Top 3 und die Spieler in deiner Nähe, unter einem zufälligen Spitznamen. Du kannst auch eine private Gruppe gründen und Familie und Freunde per Link oder Code einladen. Du kannst jederzeit austreten, dann werden alle deine Daten gelöscht.',
  'guide.settingsH': '⚙️ Einstellungen & Datenschutz',
  'guide.settingsP': 'Passe das Spiel an: Töne, Vibration, entspanntes Tempo (mehr Zeit zum Antworten), große Schrift und eine tägliche Erinnerung für deinen Kalender; das helle oder dunkle Design folgt deinem Gerät. Hier trittst du auch der Rangliste bei oder aus und verwaltest deine Gruppen. Dein Fortschritt wird nur in deinem Browser gespeichert: Du kannst ihn jederzeit als JSON-Sicherung exportieren oder auf ein anderes Gerät übertragen.',
  'guide.gamesH': 'Die 35 kognitiven Übungen im Detail',
  'guide.gameWhy': 'Wozu es dient (Wissenschaftlicher Hintergrund):',
  'guide.gameHow': 'So funktioniert es:',
  'guide.faqH': 'Tipps und Häufig gestellte Fragen (FAQ)',
  'guide.faq1Q': 'Wie oft sollte ich trainieren?',
  'guide.faq1A': 'Beständigkeit ist wichtiger als Intensität. 10–15 Minuten am Tag reichen (das Tagestraining; der Neuro Score dauert auf Wunsch weitere 15–20 Minuten). An 4 oder 5 Tagen pro Woche zu trainieren bringt viel mehr als eine lange, seltene Sitzung, und deshalb zählt in der Rangliste ein zusätzlicher Tag mehr als ein zusätzliches Training am selben Tag.',
  'guide.faq2Q': 'Wo werden meine Daten und Ergebnisse gespeichert?',
  'guide.faq2A': 'Alles bleibt auf deinem Gerät. Synapse Dojo braucht weder Konto noch Passwort und verwendet keine Tracking-Cookies: Deine Punkte und Fortschritte werden in deinem Browser gespeichert (localStorage). Nur wenn du der freiwilligen Wochenrangliste beitrittst, wird eine Wochenzusammenfassung unter einem zufälligen Spitznamen gesendet.',
  'guide.faq3Q': 'Gibt es Anleitungen vor Spielbeginn?',
  'guide.faq3A': 'Ja! Vor jeder Übung erhältst du eine kurze Erklärung und kannst einen geführten Übungsdurchlauf (Trial) absolvieren, um die Steuerung stressfrei kennenzulernen.',

  'home.hello': 'Hallo, {name}!',
  'home.streak': '{n} Tage in Folge',
  'home.streak1': '1 Tag in Folge',
  'home.streak0': 'Starte heute deine Serie',
  'home.check': 'Miss deinen Neuro Score',
  'home.checkSub': 'Testet alle 9 kognitiven Bereiche · ca. 4 Min. · verfolge deine geistige Fitness',
  'home.checkDone': 'Heute erledigt: {score}',
  'home.training': 'Fitnessstudio',
  'home.trainingSub': 'Alle Übungen, nach Fähigkeit sortiert',
  'home.progress': 'Fortschritt',
  'home.progressSub': 'Fähigkeitsprofil, Level und Kalender',
  'home.settings': 'Einstellungen',

  'plan.title': 'Training',
  'plan.titleN': 'Training {n}',
  'plan.again': 'Noch ein Training',
  'plan.againSub': 'Lust auf mehr? Tippe für 4 neue Übungen zu anderen Fähigkeiten',
  'plan.sub': '{n} Übungen für dich ausgewählt · sie passen sich deinem Level an · etwa {min} Min.',
  'plan.progress': '{done}/{n} erledigt',
  'plan.step': 'Übung {i} von {n}',
  'plan.done': 'Training geschafft!',
  'plan.doneSub': 'Gut gemacht! Wenn du noch Lust hast, starte gleich ein weiteres Training mit anderen Übungen.',

  'common.back': 'Zurück',
  'common.start': 'Los!',
  'common.quit': 'Beenden',
  'common.retry': 'Nochmal',
  'common.menu': 'Menü',
  'common.next': 'Weiter',
  'common.continue': 'Weiter',
  'common.best': 'Rekord',
  'common.newBest': 'Neuer Rekord!',
  'common.level': 'Level',
  'common.levelChange': 'Level: {from} → {to}',
  'common.why': 'Warum es wirkt',
  'common.timeout': 'Zeit abgelaufen',
  'common.step': 'Test {i} von {n}',
  'common.correct': '{ok}/{n} richtig',

  'domain.speed': 'Tempo',
  'domain.attention': 'Aufmerksamkeit',
  'domain.wm': 'Arbeitsgedächtnis',
  'domain.memory': 'Gedächtnis',
  'domain.executive': 'Kontrolle',
  'domain.spatial': 'Räumliches Denken',
  'domain.reasoning': 'Logik',
  'domain.language': 'Rechnen und Lesen',

  'ex.glance.name': 'Augenblick',
  'ex.glance.desc': 'Für einen Moment erscheint ein Fahrzeug in der Mitte und ein Stern nahe am Rand. Sag mir, welches Fahrzeug es war und wo der Stern war. Die Anzeigezeit wird kürzer, je besser du wirst.',
  'ex.glance.why': 'Trainiert das „nutzbare Sehfeld“: mit einem einzigen Blick mehr erfassen. Diese Art von Übung wurde in der ACTIVE-Studie eingesetzt, in der Training der Verarbeitungsgeschwindigkeit nach 10 Jahren mit einem geringeren Demenzrisiko verbunden war.',
  'ex.glance.which': 'Welches Fahrzeug war in der Mitte?',
  'ex.glance.where': 'Wo war der Stern?',
  'ex.glance.detail': 'Schwelle: {ms} ms',

  'ex.reflex.name': 'Wahlreaktion',
  'ex.reflex.desc': 'Eines von vier Feldern leuchtet auf. Ist es grün, tippe sofort darauf; ist es rot, berühre nichts!',
  'ex.reflex.why': 'Wahlreaktionszeit mit Signalen, die du ignorieren musst (Go/No-Go): verbindet Tempo mit der Kontrolle automatischer Reaktionen.',
  'ex.reflex.hint': 'Grün: tippen · Rot: stillhalten',
  'ex.reflex.detail': 'Mittlere Reaktion: {ms} ms · {ok}/{n} richtig',

  'ex.path.name': 'Zahlenpfad',
  'ex.path.desc': 'Tippe die Kreise der Reihe nach an. Auf höheren Leveln wechselst du zwischen Zahlen und Buchstaben: 1 → A → 2 → B → 3 …',
  'ex.path.why': 'Eine Version des Trail Making Test, mit dem die Neuropsychologie schnelle visuelle Suche und, in der Wechselform, geistige Flexibilität misst.',
  'ex.path.next': 'Nächstes: {v}',
  'ex.path.detail': '{secs} s · {err} Fehler',

  'ex.pilot.name': 'Pilot',
  'ex.pilot.desc': 'Bleib auf der Straße: Zieh mit dem Finger oder nutze am Computer die Tasten ← →. Erscheint ein grüner Kreis, drück SIGNAL (Schaltfläche, Klick oder Leertaste): Das geht, sobald er erscheint, bis der Ring um das Schild leer ist. Ignoriere alle anderen Schilder.',
  'ex.pilot.why': 'Inspiriert von NeuroRacer (University of California, San Francisco): In einer in Nature veröffentlichten Studie senkte adaptives Multitasking-Training die Kosten, zwei Dinge gleichzeitig zu tun, und der Effekt hielt 6 Monate an.',
  'ex.pilot.press': 'SIGNAL!',
  'ex.pilot.detail': 'Richtige Signale: {ok}/{n} · auf der Straße {road} %',

  'ex.radar.name': 'Radar',
  'ex.radar.desc': 'Einige Kugeln leuchten auf: Das sind die Ziele. Dann sehen alle gleich aus und bewegen sich. Folge ihnen mit den Augen und tippe am Ende die Ziele an.',
  'ex.radar.why': 'Multiple Object Tracking: Mehrere bewegte Objekte zu verfolgen trainiert die räumlich verteilte Aufmerksamkeit, die du auch im Verkehr oder in einer Menschenmenge brauchst.',
  'ex.radar.watch': 'Merk dir die Ziele',
  'ex.radar.track': 'Folge ihnen…',
  'ex.radar.pick': 'Tippe die {n} Ziele an',
  'ex.radar.detail': 'Ziele: bis zu {n} · {ok}/{t} Runden richtig',

  'ex.clash.name': 'Farbchaos',
  'ex.clash.desc': 'Achte auf die Regel oben: Tippe die TINTENFARBE oder die BEDEUTUNG des Wortes. Die Zeit zum Antworten wird kürzer, je besser du wirst.',
  'ex.clash.why': 'Der Stroop-Effekt: die automatische Reaktion (Lesen) zurückhalten, um die verlangte zu geben. Er trainiert die Hemmung, eine der wichtigsten exekutiven Funktionen.',
  'ex.clash.ruleInk': '🎨 Tintenfarbe',
  'ex.clash.ruleWord': '📖 Wortbedeutung',

  'ex.switch.name': 'Regelwechsel',
  'ex.switch.desc': 'Eine Zahl erscheint. Ist der Rahmen BLAU, sag, ob sie gerade oder ungerade ist. Ist er ORANGE, ob sie kleiner oder größer als 5 ist. Die Regel wechselt ohne Vorwarnung!',
  'ex.switch.why': 'Aufgabenwechsel: schnell zwischen Regeln springen. Training senkt die „Wechselkosten“, auch bei nicht trainierten Aufgaben; ältere Menschen verbessern sich oft am meisten.',
  'ex.switch.parity': 'GERADE oder UNGERADE?',
  'ex.switch.size': 'KLEINER oder GRÖSSER als 5?',
  'ex.switch.even': 'GERADE',
  'ex.switch.odd': 'UNGERADE',
  'ex.switch.detail': '{ok}/{n} · Wechselkosten {cost} ms',

  'ex.echo.name': 'Echo',
  'ex.echo.desc': 'Es leuchtet immer ein Quadrat auf. Frag dich bei jedem: Ist es an derselben Stelle wie das von vor N Schritten? Wenn ja, drücke POSITION, sonst nichts. Du beginnst mit N = 1, also dem Quadrat direkt davor; später kommt ein Buchstabe dazu, der genauso verglichen wird.',
  'ex.echo.why': 'n-back: jedes Element mit dem von vor N Schritten vergleichen. Es ist die am besten untersuchte Arbeitsgedächtnis-Aufgabe; die Verbesserungen sind bei ähnlichen Aufgaben deutlich und bei entfernten weniger sicher.',
  'ex.echo.before': 'Vorher',
  'ex.echo.now': 'Jetzt',
  'ex.echo.ago': '{n} zurück',
  'ex.echo.demo1': 'Ein Quadrat leuchtet auf: Noch gibt es nichts zu vergleichen, einfach warten.',
  'ex.echo.demo2': 'Anders als das vorige → nichts drücken.',
  'ex.echo.demo3': 'Gleich wie das vorige → POSITION drücken!',
  'ex.echo.demo4': 'Wieder anders → nicht drücken. Und so weiter.',
  'ex.echo.stripWait': 'Merk es dir: Du vergleichst es mit den nächsten.',
  'ex.echo.stripCompare': 'Ist das JETZT leuchtende Quadrat an derselben Stelle wie das markierte? Wenn ja, drücke POSITION.',
  'ex.echo.stripCompareDual': 'Vergleiche JETZT mit dem markierten: gleiches Quadrat → POSITION, gleicher Buchstabe → BUCHSTABE.',
  'ex.echo.back1': 'dem direkt davor',
  'ex.echo.backN': 'dem von vor {n} Schritten',
  'ex.echo.dualTitle': 'Ab jetzt doppelt!',
  'ex.echo.dualText': 'Zusätzlich zum Quadrat hörst du einen Buchstaben, der auch im Quadrat steht. Drücke POSITION, wenn das Quadrat mit {back} übereinstimmt, und BUCHSTABE, wenn der Buchstabe mit {back} übereinstimmt. Beide, eines oder keines können übereinstimmen.',
  'ex.echo.series': 'Serie {i} von {n}',
  'ex.echo.seriesStart1': 'Diese Serie hat {len} Quadrate. Das erste ist nur zum Merken: nicht drücken. Ab dem zweiten vergleichst du jedes Quadrat mit dem direkt davor.',
  'ex.echo.seriesStartN': 'Diese Serie hat {len} Quadrate. Die ersten {k} sind nur zum Merken: nicht drücken. Dann vergleichst du jedes Quadrat mit dem von vor {k} Schritten.',
  'ex.echo.turnWait': 'Quadrat {i} von {len} · merken, nicht drücken',
  'ex.echo.turnAsk': 'Quadrat {i} von {len} · gleich wie {back}?',
  'ex.echo.turnAskDual': 'Quadrat {i} von {len} · gleiche Stelle? gleicher Buchstabe? (im Vergleich zu {back})',
  'ex.echo.seriesEnd': 'Ende der Serie {i} von {n}',
  'ex.echo.seriesScore': 'Genauigkeit: {acc} % · Treffer {hit} von {targets} · Fehldrücke {fa}',
  'fb.echoNotSame': 'nicht drücken (es war anders)',
  'fb.echoNotSameLetter': 'nicht drücken (der Buchstabe war anders)',
  'fb.echoMissed': '{btn} drücken (es war gleich)',
  'ex.echo.pos': 'Position',
  'ex.echo.letter': 'Buchstabe',
  'ex.echo.rule1': '1-back · vergleiche mit dem direkt davor',
  'ex.echo.ruleDual': '{n}-back ×2 · vergleiche Quadrat und Buchstabe mit {back}',
  'ex.echo.rule': '{n}-back · vergleiche mit {n} Schritten zurück',
  'ex.echo.block': 'Block {i}: {acc} % Genauigkeit (Treffer minus Fehlalarme)',

  'ex.grid.name': 'Lichtgitter',
  'ex.grid.desc': 'Sieh zu, wie die Felder aufleuchten, und wiederhole die Reihenfolge. Achtung: Manchmal musst du sie rückwärts wiederholen!',
  'ex.grid.why': 'Der Corsi-Test: Reihenfolgen im Raum merken, vorwärts und rückwärts. Er misst und trainiert das visuell-räumliche Arbeitsgedächtnis.',
  'ex.grid.watch': 'Schau hin…',
  'ex.grid.yours': 'Du bist dran! ({n} Felder)',
  'ex.grid.back': 'RÜCKWÄRTS! ({n} Felder)',
  'ex.grid.span': 'Längste Folge: {n}',
  'ex.grid.detail': 'Spanne vorwärts {f} · rückwärts {b}',

  'ex.digits.name': 'Letzte Ziffern',
  'ex.digits.desc': 'Eine Ziffernfolge unvorhersehbarer Länge läuft vorbei. Wenn sie stoppt, tippe die letzten N in der richtigen Reihenfolge ein.',
  'ex.digits.why': 'Running Span: nur die letzten Ziffern einer ständig fortlaufenden Folge im Kopf behalten. Es trainiert das Aktualisieren des Arbeitsgedächtnisses.',
  'ex.digits.watch': 'Merk dir die letzten {n}',
  'ex.digits.recall': 'Tippe die letzten {n} Ziffern',
  'ex.digits.detail': '{ok}/{n} richtig · Spanne {span}',

  'ex.rotate.name': 'Drehungen',
  'ex.rotate.desc': 'Sind die beiden Formen dieselbe Form, nur gedreht, oder ist eine das Spiegelbild der anderen?',
  'ex.rotate.why': 'Mentale Rotation. Eine Metaanalyse von 217 Studien zeigt, dass sich räumliche Fähigkeiten durch Training verbessern, dauerhaft und auch bei ähnlichen, nicht trainierten Aufgaben.',
  'ex.rotate.same': 'Gleich',
  'ex.rotate.mirror': 'Spiegel',

  'ex.towers.name': 'Türme',
  'ex.towers.desc': 'Verschiebe die Kugeln so, dass sie dem Ziel entsprechen, ohne die Höchstzahl an Zügen zu überschreiten. Tippe auf einen Stab, um seine oberste Kugel zu nehmen, dann dorthin, wo sie hin soll. Erst denken, dann ziehen!',
  'ex.towers.why': 'Der Turm von London: eine Folge von Zügen planen, bevor man handelt. Ein klassischer Test für Planung, eine exekutive Funktion.',
  'ex.towers.goal': 'Ziel',
  'ex.towers.moves': 'Züge: {m} · Maximum: {min}',
  'ex.towers.too': 'Keine Züge mehr',
  'ex.towers.detail': 'Innerhalb des Maximums gelöst: {ok}/{n}',

  'ex.odd.name': 'Der Außenseiter',
  'ex.odd.desc': 'Alle Formen außer einer haben ein Merkmal gemeinsam (Form, Farbe, Füllung oder Anzahl). Finde die, die es nicht hat.',
  'ex.odd.why': 'Induktives Denken: die verborgene gemeinsame Regel zwischen unwichtigen Unterschieden finden. Ähnliche Aufgaben gibt es in den Testbatterien von Cambridge Brain Sciences.',
  'ex.odd.ask': 'Welche passt nicht dazu?',

  'ex.math.name': 'Rechensprint',
  'ex.math.desc': 'Löse die Aufgaben so schnell du kannst. Die Antwort wird gesendet, sobald du alle Ziffern getippt hast.',
  'ex.math.why': 'Viele einfache Rechnungen schnell lösen: das Prinzip der von Kawashimas Gruppe untersuchten „Lerntherapie“, die bei älteren Menschen Verbesserungen bei Aufmerksamkeit, Hemmung und Tempo zeigte.',
  'ex.math.detail': '{ok}/{n} · {secs} s',

  'ex.reading.name': 'Schnelllesen',
  'ex.reading.desc': 'Lies den Text LAUT vor, so schnell du kannst und dabei deutlich. Beantworte dann eine Frage.',
  'ex.reading.why': 'Lautes Lesen: die andere Hälfte der „Lerntherapie“ von Kawashimas Gruppe. Die Frage am Ende prüft, ob du wirklich gelesen hast.',
  'ex.reading.aloud': '🗣️ Laut vorlesen',
  'ex.reading.done': 'Fertig',
  'ex.reading.detail': '{wpm} Wörter/Min. · Verständnis {ok}/{n}',

  'ex.vault.name': 'Wortsafe',
  'ex.vault.desc': 'Merk dir die Wörter. Dann zeige ich dir weitere: Sag bei jedem, ob du es schon gesehen hast oder ob es neu ist.',
  'ex.vault.why': 'Wiedererkennungsgedächtnis: Gesehenes von Neuem unterscheiden. Es trainiert das episodische Gedächtnis.',
  'ex.vault.study': 'Merk dir diese Wörter',
  'ex.vault.done': 'Fertig',
  'ex.vault.seen': 'Gesehen',
  'ex.vault.new': 'Neu',
  'ex.vault.result': '{n}/{t} richtig',

  'ex.pairs.name': 'Paare',
  'ex.pairs.desc': 'Du siehst einige Paare aus einem Symbol und einem Wort, z. B. 🍎 🔗 Hammer. Merk sie dir. Danach erscheint nur das Symbol und du wählst das Wort, das dazugehörte. Es gibt keinen Ton: alles ist visuell.',
  'ex.pairs.why': 'Paarassoziationen: Zwei Dinge miteinander zu verknüpfen ist eine der empfindlichsten Aufgaben für das episodische Gedächtnis.',
  'ex.pairs.study': 'Jedes Symbol hat sein Wort: Merk dir, was zusammengehört',
  'ex.pairs.tip': 'Später siehst du nur das Symbol und wählst sein Wort. Tipp: Stell dir eine Szene vor, die beide verbindet, z. B. {sym} + „{word}“.',
  'ex.pairs.timer': '⏱ {s} Sekunden',
  'ex.pairs.ask': 'Mit welchem Wort war es gepaart?',
  'ex.pairs.detail': '{ok}/{n} Paare gemerkt',

  'color.red': 'ROT',
  'color.blue': 'BLAU',
  'color.green': 'GRÜN',
  'color.yellow': 'GELB',

  'result.title': 'Ergebnis',
  'check.title': 'Dein Neuro Score',
  'check.delta': '{d} seit dem letzten Mal',
  'check.first': 'Erste Messung gespeichert. Komm morgen wieder!',
  'check.rescaled': 'Die Punktzahl wurde neu kalibriert: Das ist dein neuer Ausgangspunkt. Frühere Ergebnisse bleiben gespeichert, werden aber nicht verglichen.',
  'check.doneToday': 'Du hast die heutige Messung schon gemacht. Komm morgen wieder, um dich erneut zu messen!',

  'rank.0': 'Funke',
  'rank.1': 'Strom',
  'rank.2': 'Schaltkreis',
  'rank.3': 'Neuronales Netz',
  'rank.4': 'Synapsenmeister',

  'training.title': 'Fitnessstudio',
  'training.today': 'Heute erledigt',

  'progress.title': 'Fortschritt',
  'progress.chart': 'Neuro Score',
  'progress.empty': 'Mach deine erste tägliche Messung, um das Diagramm zu sehen.',
  'progress.calendar': 'Letzte 4 Wochen',
  'progress.domains': 'Fähigkeitsprofil',
  'progress.domainsHint': 'Basierend auf dem in jeder Übung erreichten Level.',
  'progress.exercises': 'Level und Rekorde',
  'progress.none': '—',
  'progress.stats': 'Aktive Tage: {days} · Einheiten: {runs}',
  'progress.week': 'Diese Woche: {n}/4 Trainingstage',

  'settings.title': 'Einstellungen',
  'settings.name': 'Name',
  'settings.lang': 'Sprache',
  'settings.sound': 'Soundeffekte',
  'settings.relaxed': 'Entspanntes Tempo (mehr Zeit zum Antworten)',
  'settings.bigText': 'Große Schrift',
  'settings.reset': 'Alle Daten löschen',
  'settings.resetConfirm': 'Wirklich den gesamten Fortschritt löschen? Das lässt sich nicht rückgängig machen.',
  'ex.glance.example': 'Beispiel: 🚗 in der Mitte und der Stern oben rechts → antworte 🚗 und tippe dann das Feld oben rechts an.',
  'ex.reflex.example': 'Beispiel: Ein grünes Feld leuchtet auf → tippe sofort darauf. Ist es rot → nichts berühren und warten.',
  'ex.path.example': 'Beispiel: Tippe 1, dann 2, dann 3… In der Wechselversion: 1 → A → 2 → B → 3 → C.',
  'ex.pilot.example': 'Beispiel: Ein grüner Kreis mit vollem Ring erscheint → drück SIGNAL, bevor der Ring leer ist. Ein Dreieck oder Quadrat → nicht drücken.',
  'ex.radar.example': 'Beispiel: 2 Kugeln leuchten auf → folge ihnen mit den Augen, während sie sich unter die anderen mischen, und tippe dann genau diese 2 an.',
  'ex.clash.example': 'Beispiel: Das Wort ROT in blauer Farbe → bei der Regel 🎨 antworte BLAU, bei der Regel 📖 antworte ROT.',
  'ex.switch.example': 'Beispiel: 7 in einem blauen Rahmen → UNGERADE. Dieselbe 7 in einem orangen Rahmen → GRÖSSER als 5.',
  'ex.echo.example': 'Beispiel 1-back: Das obere Quadrat leuchtet auf und gleich danach wieder dasselbe → drücke POSITION. Ist es ein anderes → nicht drücken.',
  'ex.grid.example': 'Beispiel: 1 → 2 → 3 leuchten auf. Tippe 1, 2, 3. Steht da RÜCKWÄRTS, tippe 3, 2, 1.',
  'ex.digits.example': 'Beispiel: 4 8 1 7 2 9 laufen vorbei und du sollst dir die letzten 3 merken → tippe 7 2 9.',
  'ex.vault.example': 'Beispiel: Du hast dir „Baum“ und „Boot“ gemerkt. „Baum“ erscheint → Gesehen. „Tasse“ erscheint → Neu.',
  'ex.pairs.example': 'Beispiel: Du hast das Paar 🍎 – Hammer gesehen. Später erscheint 🍎 → wähle „Hammer“.',
  'ex.rotate.example': 'Beispiel: Wenn du durch Drehen der rechten Form die linke erhältst → Gleich. Wenn du einen Spiegel bräuchtest → Spiegel.',
  'ex.towers.example': 'Beispiel: Im Ziel ist Rot oben, aber gerade liegt Blau darauf → bewege zuerst Blau und setze dann Rot an seinen Platz.',
  'ex.odd.example': 'Beispiel: drei volle rote Kreise und ein voller blauer Kreis → der Außenseiter ist der blaue (die einzige andere Farbe).',
  'ex.math.example': 'Beispiel: 7 + 8 = → tippe 15. Die Antwort wird gesendet, sobald alle Ziffern getippt sind.',
  'ex.reading.example': 'Beispiel: Lies den Text laut vor, drücke „Fertig“ und beantworte die Frage dazu.',
  'fb.pilotRoad': 'bleib auf der Straße',
  'fb.pilotMissed': 'das war der grüne Kreis: drücke SIGNAL',
  'fb.pilotNotTarget': 'drücke nur beim grünen Kreis',
  'fb.pilotStray': 'kein Zeichen in Sicht: warte auf den grünen Kreis',
  'fb.oddHere': 'der grün markierte',
  'fb.gridOrder': 'die Reihenfolge, die auf den Feldern nummeriert ist',
  'fb.right': 'Richtig!',
  'fb.wrong': 'Falsch',
  'fb.was': 'Richtige Antwort: {v}',
  'fb.noGo': 'es war rot, nicht tippen',
  'fb.tooSlow': 'zu langsam, tippe früher',
  'fb.otherPad': 'das leuchtende Feld',
  'fb.starHere': 'der Stern ist dort, wo er jetzt leuchtet',
  'fb.minMoves': 'es ging in {n} Zügen',
  'intro.tip': 'Das Spiel passt sich dir an: Du liegst etwa bei jeder fünften Antwort daneben – und genau dort lernt das Gehirn am meisten.',
  'intro.practice': 'Geführte Übung',
  'intro.practiceFirst': 'Zum ersten Mal hier? Probier eine geführte Übung: Sie ist kurz und zählt nicht.',
  'practice.tag': 'Übung',
  'practice.done': 'Übung geschafft!',
  'practice.doneSub': 'Jetzt kennst du die Regeln. Bereit für den Ernstfall?',
  'result.accuracy': 'Genauigkeit: {pct} %',
  'result.combo': 'Beste Serie: ×{n}',
  'result.msgUp': 'Du wirst besser: Ab hier wird das Spiel etwas schwieriger.',
  'result.msgDown': 'Das Level ist etwas gesunken, damit du im richtigen Bereich trainierst. Das ist normal!',
  'result.msgSame': 'Level stabil: Du festigst dein Können. Weiter so.',
  'result.history': 'Dein Level im Zeitverlauf',
  'result.sinceFirst': '{pct} seit dem ersten Mal',
  'result.newBadge': 'Neuer Erfolg!',
  'level.player': 'Level {n}',
  'level.up': 'Du hast Level {n} erreicht!',
  'home.next': 'Nächster Erfolg',
  'home.week': 'Wochenziel: {n}/4 Tage',
  'badges.title': 'Erfolge',
  'badges.count': '{n}/{t} erreicht',
  'settings.vibration': 'Vibration (auf dem Handy)',
  'settings.reminder': 'Tägliche Erinnerung',
  'settings.reminderHint': 'Lade einen wiederkehrenden Termin herunter und füge ihn dem Kalender auf Handy oder Computer hinzu.',
  'settings.reminderTime': 'Uhrzeit',
  'settings.reminderBtn': 'Zum Kalender hinzufügen',
  'reminder.desc': 'Ein paar Minuten, um deinen Geist zu trainieren',
  'badge.first.name': 'Erster Schritt',
  'badge.first.desc': 'Schließe deine erste Übung ab',
  'badge.check.name': 'Erste Messung',
  'badge.check.desc': 'Miss deinen Neuro Score zum ersten Mal',
  'badge.plan.name': 'Volles Training',
  'badge.plan.desc': 'Schließe ein tägliches Training ab',
  'badge.streak3.name': 'Drei in Folge',
  'badge.streak3.desc': 'Trainiere 3 Tage in Folge',
  'badge.week4.name': 'Volle Woche',
  'badge.week4.desc': 'Trainiere an 4 Tagen derselben Woche',
  'badge.streak7.name': 'Woche in Flammen',
  'badge.streak7.desc': 'Trainiere 7 Tage in Folge',
  'badge.combo10.name': 'Blitz',
  'badge.combo10.desc': '10 richtige Antworten in Folge',
  'badge.explorer.name': 'Entdecker',
  'badge.explorer.desc': 'Probiere alle 35 Übungen aus',
  'badge.balanced.name': 'Ganzer Kopf',
  'badge.balanced.desc': 'Trainiere alle 9 Fähigkeiten innerhalb von 7 Tagen',
  'badge.levelups25.name': 'Aufstieg',
  'badge.levelups25.desc': 'Steige 25-mal ein Level auf',
  'badge.plans10.name': 'Ausdauer',
  'badge.plans10.desc': 'Schließe 10 tägliche Trainings ab',
  'badge.combo25.name': 'Sturm',
  'badge.combo25.desc': '25 richtige Antworten in Folge',
  'badge.nback3.name': 'Tiefes Echo',
  'badge.nback3.desc': 'Erreiche 3-back in Echo',
  'badge.span7.name': 'Stahlgedächtnis',
  'badge.span7.desc': 'Erreiche Spanne 7 im Lichtgitter',
  'badge.glance50.name': 'Falkenauge',
  'badge.glance50.desc': 'Komm in Augenblick auf etwa 100 ms herunter',
  'badge.neuro800.name': 'Neuronales Netz',
  'badge.neuro800.desc': 'Erreiche mindestens 800 im Neuro Score',
  'badge.streak30.name': 'Ein Monat zusammen',
  'badge.streak30.desc': 'Trainiere 30 Tage in Folge',
  'settings.about': 'Open-Source-Spiel für Gehirntraining. Nur zum Spaß: kein medizinisches Hilfsmittel. Bewegung, Schlaf und soziale Kontakte tun dem Gehirn auch gut.',
  'settings.data': 'Dein Fortschritt',
  'settings.dataHint': 'Speichere deinen Fortschritt in einer Datei, um eine Kopie zu behalten oder ihn auf ein anderes Gerät oder eine andere Adresse des Spiels zu übertragen: Jede hat ihren eigenen Spielstand.',
  'settings.export': 'Fortschritt exportieren',
  'settings.import': 'Fortschritt importieren',
  'settings.importBad': 'Diese Datei ist kein gültiger Spielstand von Synapse Dojo.',
  'settings.importConfirm': 'Die aktuellen Daten durch die aus der Datei ersetzen ({name}, {runs} gespielte Übungen, zuletzt am {last})? Dein aktueller Fortschritt geht verloren.',
  'settings.importDone': 'Fortschritt importiert.',
  'privacy.title': 'Datenschutz und Rechtliches',
  'privacy.updated': 'Zuletzt aktualisiert: 4. November 2026',
  'privacy.dataH': 'Deine Daten bleiben auf deinem Gerät',
  'privacy.data': 'Dein Name, deine Fortschritte und Einstellungen werden nur im Browser dieses Geräts gespeichert (localStorage). Sie werden nie an einen Server gesendet (außer der Wochenzusammenfassung der freiwilligen Rangliste, wenn du ihr beitrittst: siehe unten), und niemand, auch nicht der Betreiber des Spiels, kann sie sehen. Sie verschwinden, wenn du die Browserdaten löschst oder „Alle Daten löschen“ verwendest: Mit „Fortschritt exportieren“ in den Einstellungen kannst du eine Kopie behalten.',
  'privacy.cookiesH': 'Keine Konten, keine Cookies',
  'privacy.cookies': 'Du musst dich nicht anmelden, und das Spiel verwendet keine Cookies, keine Werbung und keine Profiling-Werkzeuge. Schriften und Spieldateien kommen von derselben Website, ohne Dienste Dritter.',
  'privacy.hostingH': 'Hosting',
  'privacy.hosting': 'Die öffentliche Version wird von Cloudflare gehostet (Cloudflare Pages). Wie jeder Webserver verarbeitet Cloudflare technische Daten wie deine IP-Adresse und den Browsertyp, um die Seiten auszuliefern und vor Angriffen zu schützen – gemäß seiner eigenen Datenschutzerklärung.',
  'privacy.statsH': 'Besuchsstatistik',
  'privacy.stats': 'Nur in der öffentlichen Version werden Besuche mit Cloudflare Web Analytics gezählt. Es verwendet keine Cookies, speichert nichts in deinem Browser und verfolgt niemanden über Websites hinweg: Es zeigt nur zusammengefasste Daten wie Seitenaufrufe, Land und Gerätetyp. Namen und Übungsergebnisse werden nie gesendet.',
  'privacy.boardH': 'Freiwillige Wochenrangliste',
  'privacy.board': 'Nur wenn du in den Einstellungen beitrittst, sendet das Spiel nach jeder Sitzung eine Zusammenfassung der laufenden Woche an seinen Server (Cloudflare Workers mit einer D1-Datenbank): Trainingstage und Aktivitäten pro Tag, Veränderung des Levels und bestes Level pro Übung, ob du das entspannte Tempo nutzt und, falls angegeben, deine Altersgruppe. Sie ist mit einer zufälligen Kennung und einem erzeugten Spitznamen verknüpft, nie mit deinem Namen, deiner E-Mail oder deinen übrigen Fortschritten. Wenn du eine Freundesgruppe gründest oder einer beitrittst, speichert der Server auch den Namen der Gruppe, ihre Mitglieder (sichtbar nur für sie) und wen der Gründer gesperrt hat. Beim Beitritt prüft Cloudflare Turnstile, dass du kein Roboter bist, gemäß der Datenschutzerklärung von Cloudflare. Wochenergebnisse werden nach 8 Wochen gelöscht, alles andere nach 90 Tagen ohne Nutzung; „Austreten und meine Daten löschen“ oder „Alle Daten löschen“ löscht sie sofort, und eine Gruppe ohne Mitglieder wird gelöscht. Rechtsgrundlage ist deine Einwilligung, die du jederzeit durch Austreten widerrufen kannst.',
  'privacy.medicalH': 'Kein Medizinprodukt',
  'privacy.medical': 'Synapse Dojo ist ein Spiel zum Spaß. Es ist kein Medizinprodukt, stellt keine Diagnosen und verspricht nicht, Demenz, kognitiven Abbau oder andere Gesundheitsprobleme zu verhindern, zu verlangsamen oder zu behandeln. Die Punktzahlen zeigen nur, wie du in den Übungen abschneidest. Bei gesundheitlichen Fragen wende dich an eine Ärztin oder einen Arzt.',
  'privacy.contactH': 'Kontakt',
  'privacy.contact': 'Fragen zum Spiel oder zu deinen Daten: {contact}',
  'privacy.open': 'Spiel öffnen',

  'license.title': 'Lizenz & Bedingungen',
  'license.subtitle': 'Softwarelizenz, zulässige Nutzung und Urheberrechtsbestimmungen',
  'license.authorH': 'Autor & Geistiges Eigentum',
  'license.authorP': 'Synapse Dojo ist ein originäres, unabhängiges Projekt von Sergio Dogliani. Alle kommerziellen Rechte vorbehalten.',
  'license.polyformH': 'PolyForm Noncommercial License 1.0.0',
  'license.polyformP': 'Die Software wird unter der PolyForm Noncommercial License 1.0.0 veröffentlicht. Sie können den Quellcode frei einsehen, ausführen und für persönliches Lernen, Bildung, Forschung und nicht-kommerzielle Zwecke nutzen. Jede unbefugte kommerzielle Nutzung, Weiterverkauf, Monetarisierung oder Weiterverbreitung ist strengstens untersagt.',
  'license.permittedH': 'Zulässige Nutzung',
  'license.permittedP': 'Persönliches Lernen, kognitives Training, nicht-kommerzielle Forschung, Tests und private Nutzung ohne kommerzielle Absicht.',
  'license.restrictedH': 'Kommerzielle Einschränkungen',
  'license.restrictedP': 'Es ist nicht gestattet, diese Software gegen Vergütung, für kommerzielle Vorteile, Werbung oder zur Einbindung in kostenpflichtige Produkte zu nutzen, zu verändern oder zu verbreiten, es sei denn, es liegt eine schriftliche Lizenz des Autors vor.',
  'license.fontsH': 'Schriftarten & Ressourcen',
  'license.fontsP': 'Die Schriftart Nunito steht unter der SIL Open Font License 1.1. Die neuropsychologischen Übungsparadigmen sind gemeinfrei.',
  'license.linksH': 'Offizielle Links & Dokumentation',
  'license.officialLink': 'Offiziellen Text der PolyForm Noncommercial 1.0.0 lesen',
  'license.repoLink': 'LICENSE-Datei auf GitHub ansehen',
  'license.open': 'Spiel öffnen',

  'domain.coordination': "Koordination",
  'shape.circle': "Kreis",
  'shape.square': "Quadrat",
  'shape.triangle': "Dreieck",
  'shape.diamond': "Raute",
  'ex.span.name': "Zahlenspanne",
  'ex.span.desc': "Merke dir die Zahlenfolge und tippe sie in der geforderten Reihenfolge ein",
  'ex.span.why': "Die Zahlenspanne ist das Standardmaß für das verbale Arbeitsgedächtnis und die Kurzzeitkapazität in der Kognitionsforschung.",
  'ex.span.example': "4 8 1 9   Tippe die Ziffern vorwärts oder rückwärts ein",
  'ex.span.forward': "Vorwärts",
  'ex.span.backward': "Rückwärts",
  'ex.span.watch': "Merke dir {n} Ziffern",
  'ex.span.recallFor': "Ziffern vorwärts eingeben",
  'ex.span.recallBack': "Ziffern rückwärts eingeben!",
  'ex.span.detail': "{ok}/{n} richtig · Spanne {span}",
  'ex.stories.name': "Geschichten-Gedächtnis",
  'ex.stories.desc': 'Lies eine oder mehrere kurze Szenen und erinnere dich nach einer Pause mit einer kleinen Aufgabe an die Details jeder Szene',
  'ex.stories.why': "Das episodische Gedächtnis verknüpft Personen, Handlungen und Orte und stärkt den narrativen Abruf des Hippocampus.",
  'ex.stories.example': "Lies die Geschichte aufmerksam und beantworte Detailfragen",
  'ex.stories.title': "Szene {n}",
  'ex.stories.ready': "Gelesen, ich bin bereit!",
  'ex.stories.qItem': "Was hatte {name} dabei?",
  'ex.stories.qPlace': "Wo befand sich {name}?",
  'ex.stories.qTime': "Wann fand die Szene statt?",
  'ex.stories.qTimeOf': 'Wann war {name} dort?',
  'ex.stories.filler': 'Pause: gerade oder ungerade? Lass dir Zeit, das zählt nicht für die Punktzahl.',
  'ex.stories.detail': "{ok}/{n} Details richtig",
  'ex.stories.text': '{name} hatte {item} dabei. Die Person befand sich {place} {time}, wo sie die Erledigung abschloss.',
  'ex.anagrams.letters': 'Buchstaben',
  'ex.resources.task8': 'Sonnenblumen',
  'ex.resources.task7': 'Fisch',
  'ex.resources.task6': 'Eier',
  'ex.resources.task5': 'Tomaten',
  'ex.resources.task4': 'Brot',
  'ex.resources.task3': 'Honig',
  'ex.resources.task2': 'Käse',
  'ex.resources.task1': 'Äpfel',
  'ex.resources.confirm': 'Kaufen',
  'ex.reaction.target': 'Ziel: < {ms} ms',
  'result.timeBonusPts': 'Zeit-Punkte',
  'result.speedBonus': 'Geschwindigkeitsbonus (+10 XP)',
  'ex.flanker.name': "Flanker-Test",
  'ex.flanker.desc': "Konzentriere dich auf den mittleren Pfeil und ignoriere störende Pfeile am Rand",
  'ex.flanker.why': "Die Eriksen-Flanker-Aufgabe misst selektive visuelle Aufmerksamkeit und die Unterdrückung von Ablenkungen.",
  'ex.flanker.example': "← ← → ← ←   Ziel ist der mittlere Pfeil (→)",
  'ex.flanker.instruction': "Tippe die Richtung des mittleren Pfeils an",
  'ex.flanker.detail': "{ok}/{n} richtig · {ms} ms",
  'ex.gonogo.name': "Go / No-Go",
  'ex.gonogo.desc': "Tippe schnell bei grünen Zielen; halte bei roten Stoppsignalen inne",
  'ex.gonogo.why': "Trainiert motorische Reaktionshemmung und die präfrontale Unterdrückung impulsiver Reflexe.",
  'ex.gonogo.example': "● = Schnell tippen!   ✕ = Nicht tippen!",
  'ex.gonogo.hint': "Bei ● tippen, bei ✕ innehalten",
  'ex.gonogo.detail': "{ok}/{n} richtig · {ms} ms",
  'ex.msit.name': "Mehrfach-Interferenz (MSIT)",
  'ex.msit.desc': "Finde die Zahl, die sich von den anderen unterscheidet",
  'ex.msit.why': "Der MSIT aktiviert den vorderen cingulären Kortex durch Konflikte zwischen Ziffernwert und räumlicher Position.",
  'ex.msit.example': "1 2 1   Die abweichende Ziffer ist 2",
  'ex.msit.hint': "Welche Zahl ist anders?",
  'ex.msit.detail': "{ok}/{n} richtig · {ms} ms",
  'ex.binding.name': "Farbe & Form",
  'ex.binding.desc': "Finde das Objekt, das sowohl die richtige Form als auch Farbe vereint, bevor die Zeit abläuft",
  'ex.binding.why': "Merkmalsbindung (Feature Binding) fordert das visuelle System zur Integration getrennter Kanäle heraus.",
  'ex.binding.example': "Finde den blauen Kreis zwischen blauen Quadraten und roten Kreisen",
  'ex.binding.find': "Finde",
  'ex.binding.detail': "{ok}/{n} richtig",// sorting
  'ex.sorting.name': 'Kartensortieren',
  'ex.sorting.desc': 'Ermittle die geheime Sortierregel (Farbe, Form oder Anzahl) anhand des Feedbacks und passe dich an, wenn sie wechselt',
  'ex.sorting.why': 'Inspiriert vom Wisconsin Card Sorting Test (WCST), trainiert kognitive Flexibilität, Regelinduktion und Set-Shifting.',
  'ex.sorting.example': 'Karte mit 3 roten Dreiecken: nach Form (Dreieck), Farbe (rot) oder Anzahl (3) zuordnen. Finde die Regel durch Ausprobieren!',
  'ex.sorting.hint': 'Nach Farbe, Form oder Anzahl zuordnen. Die geheime Regel wechselt regelmäßig!',
  'ex.sorting.detail': '{ok}/{n} richtig · {cats} Kategorien',
  'ex.sorting.secretRule': 'Finde die geheime Regel',
  'ex.sorting.dimColor': 'Farbe',
  'ex.sorting.dimShape': 'Form',
  'ex.sorting.dimCount': 'Anzahl',
  'ex.sorting.refLabel': 'Referenzkarten (zum Zuordnen tippen)',
  'ex.sorting.targetLabel': 'Zuzuordnende Karte',
  'ex.sorting.feedbackStart': 'Stelle eine Vermutung auf: tippe auf eine Karte, um Farbe, Form oder Anzahl zu testen',
  'ex.sorting.correct': 'Richtig! Regel bestätigt',
  'ex.sorting.wrong': 'Falsch! Das ist nicht die aktive Regel',
  'ex.sorting.ruleShifted': 'Die Regel hat sich geändert! Finde das neue Kriterium',
  'ex.sorting.lostRule': 'Regel verloren! Behalte das gefundene Kriterium bei',
  'ex.sorting.perseveration': 'Achtung: diese Regel hattest du bereits ausgeschlossen!',
  'ex.sorting.eliminated': 'Ausgeschlossen: {dim} ist nicht die Regel',

  
  'ex.resources.name': 'Marktstand',
  'ex.resources.desc': 'Kaufe Waren zum Weiterverkauf: Gib nicht mehr aus, als du hast, und verdiene so viel wie möglich',
  'ex.resources.why': 'Das ist das „Rucksackproblem“, das die Kognitionswissenschaft untersucht (Murawski & Bossaerts, 2016): Die beste Kombination innerhalb einer Grenze zu finden, erfordert Planung, Arbeitsgedächtnis und das Abwägen von Kosten und Nutzen.',
  'ex.resources.example': 'Beispiel: Du hast 50 Münzen. Äpfel kosten 20 und bringen 25, Brot kostet 30 und bringt 30, Honig kostet 40 und bringt 35 → Äpfel und Brot bringen 55 für 50 Münzen: besser als nur Honig.',
  'ex.resources.detail': "{ok}/{n} abgeschlossen",
  'ex.reaction.name': "Einfache Reaktion",
  'ex.reaction.desc': "Tippe blitzschnell, sobald der Bildschirm grün aufleuchtet",
  'ex.reaction.why': "Misst die reine visuell-motorische Leitungsgeschwindigkeit und Wachheit ohne kognitive Verzögerung.",
  'ex.reaction.example': "Warte auf Grün und tippe sofort an",
  'ex.reaction.ready': "Bereit machen",
  'ex.reaction.wait': "Warte auf Grün...",
  'ex.reaction.tapNow': "JETZT TIPPEN!",
  'ex.reaction.early': "Frühstart!",
  'ex.reaction.penalty': "Warte immer auf das grüne Signal",
  'ex.reaction.detail': "Mittel: {ms} ms · Bestzeit: {best} ms ({ok}/{n})",
  'ex.dots.name': "Punkte schätzen",
  'ex.dots.desc': "Erkenne sofort, welche Seite mehr Punkte hat, ohne zu zählen",
  'ex.dots.why': "Trainiert das approximative Zahlensystem (ANS): auf einen Blick erkennen, welche Gruppe größer ist, ohne zu zählen – dank der Mengenrepräsentation im Scheitellappen.",
  'ex.dots.example': "Tippe schnell auf das Feld mit mehr Punkten",
  'ex.dots.hint': "Welche Seite hat mehr Punkte?",
  'ex.dots.left': "Links",
  'ex.dots.right': "Rechts",
  'ex.dots.detail': "{ok}/{n} richtig",
  'ex.anagrams.name': "Wort-Anagramme",
  'ex.anagrams.desc': "Bringe die Buchstaben in die richtige Reihenfolge, um das Wort zu bilden",
  'ex.anagrams.why': "Fördert das orthografische Arbeitsgedächtnis, den lexikalischen Zugriff und Lautkombinationen.",
  'ex.anagrams.example': "Tippe Buchstaben in der richtigen Reihenfolge an",
  'ex.anagrams.hint': "Ordne die Buchstaben zum Wort",
  'ex.anagrams.detail': "{ok}/{n} gelöst",
  'ex.fluency.name': "Wort-Sprint",
  'ex.fluency.desc': "Bestätige blitzschnell Wörter, die mit dem Zielbuchstaben beginnen",
  'ex.fluency.why': "Schnelle orthografische Entscheidungen: Ein Wort lesen und unter Zeitdruck seinen Anfangsbuchstaben prüfen trainiert schnelles Worterkennen und die Wahl der richtigen Antwort. (Es ist eine schnelle Klassifikationsaufgabe, kein Wortflüssigkeitstest, bei dem man selbst Wörter bildet.)",
  'ex.fluency.example': "Tippe an, wenn das Wort mit dem gesuchten Buchstaben beginnt",
  'ex.fluency.targetLetter': "Zielbuchstabe:",
  'ex.fluency.detail': "{ok}/{n} richtig",// matrix
  'ex.matrix.name': 'Raum-Matrix',
  'ex.matrix.desc': 'Merke dir die Position der blauen Blöcke und platziere sie nach der mentalen Drehung',
  'ex.matrix.why': 'Fördert mentale Rotation und räumliche Koordinatentransformation in parieto-frontalen Netzwerken.',
  'ex.matrix.example': 'Muster einprägen und nach mentaler Drehung korrekt platzieren',
  'ex.matrix.memorize': 'Merke dir die blauen Blöcke',
  'ex.matrix.itemsToRemember': 'Blöcke zu merken',
  'ex.matrix.same': 'Tippe die Felder an, die beleuchtet waren',
  'ex.matrix.noRot': 'Gleiche Position (keine Drehung)',
  'ex.matrix.rot90': 'Um 90° im Uhrzeigersinn drehen: tippe die neuen Positionen an',
  'ex.matrix.rot90Badge': '90° im Uhrzeigersinn',
  'ex.matrix.rot180': 'Um 180° drehen: tippe die neuen Positionen an',
  'ex.matrix.rot180Badge': '180° Drehung',
  'ex.matrix.rot270': 'Um 90° gegen den Uhrzeigersinn drehen: tippe die neuen Positionen an',
  'ex.matrix.rot270Badge': '90° gegen Uhrzeigersinn',
  'ex.matrix.detail': '{ok}/{n} richtig',
  'ex.matrix.confirm': 'Bestätigen ({sel}/{n})',

  
  'ex.tapSeq.name': "Bilaterales Tippen",
  'ex.tapSeq.desc': "Koordiniere beide Daumen, um abwechselnde Rhythmen nachzuspielen",
  'ex.tapSeq.why': "Abwechselndes beidhändiges Tippen aktiviert die motorischen Areale beider Hemisphären über das Corpus Callosum.",
  'ex.tapSeq.example': "◀ ▶ ◀ ▶   Folge dem Rhythmus mit beiden Daumen",
  'ex.tapSeq.hint': "Tippe links und rechts in der vorgegebenen Folge, bevor die Zeit abläuft",
  'ex.tapSeq.detail': "{ok}/{n} Folgen geschafft",
  'ex.swipePattern.name': "Bilaterales Wischen",
  'ex.swipePattern.desc': 'Mach beide Gesten zusammen, bevor der Balken leer ist: zwei Daumen am Handy; am Computer W A S D für links und die Pfeiltasten für rechts (mit der Maus nacheinander).',
  'ex.swipePattern.why': "Beidhändige Richtungsgesten fordern räumliche Entkopplung und asymmetrische Bewegungskoordination.",
  'ex.swipePattern.example': "Linker Daumen nach oben ↑, rechter Daumen nach unten ↓",
  'ex.swipePattern.hint': 'Mach beide Gesten zusammen, bevor der Balken leer ist: zwei Daumen am Handy; am Computer W A S D für links und die Pfeiltasten für rechts (mit der Maus nacheinander).',
  'ex.swipePattern.together': 'Beide Hände zusammen!',
  'ex.swipePattern.detail': "{ok}/{n} Muster richtig",
  'ex.rhythm.name': "Bilateraler Rhythmus",
  'ex.rhythm.desc': "Synchronisiere linke und rechte Schläge präzise zum Takt",
  'ex.rhythm.why': "Rhythmische bilaterale Koordination bindet Kleinhirn und prämotorische Areale für exaktes Timing ein.",
  'ex.rhythm.example': "Tippe abwechselnd links und rechts im Takt des Metronoms",
  'ex.rhythm.hint': 'Tippe im Takt mit der angezeigten Hand. Die ersten 3 Schläge dienen dazu, den Rhythmus zu finden; danach muss der Punkt in der grünen Zone landen.',
  'ex.rhythm.detail': "{ok}/{n} im Takt · Abweichung {ms} ms",
  'ex.crossMove.name': "Kreuzbewegungen",
  'ex.crossMove.desc': "Überquere die Körpermitte: reagiere auf der Gegenseite",
  'ex.crossMove.why': "Das Kreuzen der Mittellinie erzwingt interhemisphärischen Informationstransfer im Gehirn.",
  'ex.crossMove.example': "Ziel links + \"Kreuzen\" -> Tippe RECHTE Taste an",
  'ex.crossMove.same': "Gleiche Seite: Passende Taste tippen",
  'ex.crossMove.cross': "KREUZEN: GEGENÜBERLIEGENDE Taste tippen!",
  'ex.crossMove.detail': "{ok}/{n} richtig · {ms} ms",
  'ex.dualTask.name': "Bilateraler Dual-Task",
  'ex.dualTask.desc': "Halte links gedrückt, während du rechts Denksportaufgaben löst",
  'ex.dualTask.why': "Das Doppelaufgaben-Paradigma trainiert geteilte Aufmerksamkeit und asymmetrische Hemisphärenkontrolle.",
  'ex.dualTask.example': "Halte links fest, während der rechte Daumen Gerade / Ungerade entscheidet",
  'ex.dualTask.hint': 'Halte die linke Taste durchgehend gedrückt, bevor der Balken leer ist',
  'ex.dualTask.hold': "Gedrückt halten (LI)",
  'ex.dualTask.even': "Gerade",
  'ex.dualTask.odd': "Ungerade",
  'ex.dualTask.notHolding': "Linke Taste wurde nicht gehalten!",
  'ex.dualTask.detail': "{ok}/{n} richtig",

  'board.title': 'Wochenrangliste',
  'board.nick': '{adj} {animal} {n}',
  'board.tab.days': 'Beständigkeit',
  'board.tab.improvement': 'Fortschritt',
  'board.tab.best': 'Bestes Level',
  'board.explain.days': '10 Punkte für jeden Trainingstag, dazu 1 Punkt für jede Übung oder jeden Neuro-Check, bis zu 12 am Tag (drei Trainings). Am meisten zählt, das Training über die Woche zu verteilen.',
  'board.explain.improvement': 'Wie stark dein Level seit Wochenbeginn gestiegen ist: Jeder tritt gegen seinen eigenen Ausgangspunkt an. Eine neue Übung startet bei ihrem ersten Level.',
  'board.explain.best': 'Dein bestes Level dieser Woche in einer Übung.',
  'board.explain.relaxed': 'Du spielst im entspannten Tempo und wirst deshalb mit anderen Spielern im entspannten Tempo verglichen.',
  'board.value.improvement': '{v} Pkt.',
  'board.allExercises': 'Alle Übungen',
  'board.exercise': 'Übung',
  'board.ageBand': 'Altersgruppe',
  'board.band.all': 'Alle Altersgruppen',
  'board.band.u30': 'Unter 30',
  'board.band.30-49': '30–49',
  'board.band.50-64': '50–64',
  'board.band.65-74': '65–74',
  'board.band.75+': '75 und älter',
  'board.you': 'du',
  'board.players': '{n} Spieler diese Woche',
  'board.reset': 'Am Montag beginnt eine neue Woche: Alle fangen wieder bei null an.',
  'board.empty': 'Diese Woche ist noch niemand dabei. Trainiere und eröffne die Rangliste!',
  'board.notYet': 'Du bist noch nicht in dieser Rangliste: Trainiere diese Woche, um zu erscheinen.',
  'board.loading': 'Wird geladen…',
  'board.err.offline': 'Keine Verbindung. Versuch es noch einmal, wenn du online bist.',
  'board.err.human_check': 'Die Roboter-Prüfung hat nicht geklappt. Bitte versuch es noch einmal.',
  'board.err.server': 'Etwas ist schiefgelaufen. Bitte versuch es später noch einmal.',
  'home.board': 'Wochenrangliste',
  'home.boardSub': 'Beständigkeit und Fortschritt, Woche für Woche',
  'home.boardRank': 'Beständigkeit: Platz {rank} von {n} diese Woche',
  'settings.board': 'Wochenrangliste',
  'settings.boardHint': 'Freiwillig. Vergleiche jede Woche mit anderen Spielern, wie oft du trainierst und wie sehr du dich verbesserst. Gesendet wird nur eine Wochenzusammenfassung (Trainingstage, Veränderung des Levels, bestes Level pro Übung) unter einem zufälligen Spitznamen: kein Name, keine E-Mail, kein Konto. Du kannst jederzeit austreten, dann wird alles gelöscht.',
  'settings.boardAge': 'Altersgruppe (freiwillig, um dich mit Gleichaltrigen zu vergleichen)',
  'settings.boardNoAge': 'Keine Angabe',
  'settings.boardJoin': 'Der Rangliste beitreten',
  'settings.boardJoining': 'Beitritt läuft…',
  'settings.boardMember': 'Du bist in der Rangliste als {name}.',
  'settings.boardOpen': 'Rangliste öffnen',
  'settings.boardRename': 'Neuer Spitzname',
  'settings.boardLeave': 'Austreten und meine Daten löschen',
  'settings.boardLeaveConfirm': 'Die Rangliste verlassen? Deine Ergebnisse werden vom Server gelöscht.',

  'board.value.points': '{n} Pkt.',
  'board.detail.days': '{days} T. · {n} Akt.',
  'board.players1': '1 Spieler diese Woche',
  'board.scope': 'Rangliste',
  'board.scope.all': 'Alle',
  'board.groups': 'Gruppen',
  'groups.title': 'Freundesgruppen',
  'groups.hint': 'Gründe eine Gruppe und schick den Link oder Code an Familie und Freunde: Nur Mitglieder sehen die Gruppe und ihre Rangliste.',
  'groups.empty': 'Du bist noch in keiner Gruppe.',
  'groups.members': '{n} Mitglieder',
  'groups.members1': '1 Mitglied',
  'groups.code': 'Code {code}',
  'groups.open': 'Rangliste',
  'groups.invite': 'Einladen',
  'groups.copied': 'Einladung kopiert: Füge sie in eine Nachricht ein.',
  'groups.inviteText': 'Trainiere mit mir bei Synapse Dojo! Tritt meiner Gruppe „{name}“ bei: {url}',
  'groups.leave': 'Verlassen',
  'groups.leaveConfirm': 'Die Gruppe „{name}“ verlassen?',
  'groups.create': 'Gruppe gründen',
  'groups.namePlaceholder': 'Name der Gruppe (z. B. Familie)',
  'groups.createBtn': 'Gründen',
  'groups.join': 'Mit einem Code beitreten',
  'groups.codePlaceholder': 'Einladungscode',
  'groups.joinBtn': 'Beitreten',
  'groups.err.not_found': 'Zu diesem Code gibt es keine Gruppe.',
  'groups.err.limit': 'Du bist schon in der Höchstzahl an Gruppen (10).',
  'groups.err.full': 'Diese Gruppe ist voll (100 Mitglieder).',
  'groups.err.bad_name': 'Wähle einen Namen mit 1 bis 30 Zeichen.',
  'groups.err.not_member': 'Du bist nicht mehr in dieser Gruppe.',
  'invite.title': 'Einladung zu „{name}“',
  'invite.text': 'Um der Gruppe beizutreten, nimm an der Wochenrangliste teil: Sie ist freiwillig und du kannst jederzeit austreten.',
  'invite.textMember': 'Tritt der Gruppe bei, um dich jede Woche mit ihnen zu vergleichen.',
  'invite.join': 'Der Gruppe beitreten',
  'invite.dismiss': 'Nein, danke',
  'prompt.title': 'Wochenrangliste',
  'prompt.text': 'Möchtest du deine Beständigkeit und deinen Fortschritt mit anderen Spielern vergleichen, oder mit Freunden in einer privaten Gruppe? Es ist völlig freiwillig: Mach nur mit, wenn du Lust hast, und tritt aus, wann du willst.',
  'prompt.join': 'Mehr erfahren',
  'prompt.later': 'Nicht jetzt',
  'prompt.never': 'Nicht mehr fragen',
  'settings.boardGroups': 'Freundesgruppen',

  'board.bandHint': 'Gib in den Einstellungen deine Altersgruppe an, um dich mit Gleichaltrigen zu vergleichen.',
  'home.boardGap': 'Noch {n} Punkte bis zum nächsten Platz',
  'home.boardGap1': 'Noch 1 Punkt bis zum nächsten Platz',

  'ex.resources.money': '🪙 {cost} von {budget} ausgegeben · {left} übrig',
  'ex.resources.over': '🪙 {cost} von {budget} ausgegeben: zu viel, nimm etwas weg',
  'ex.resources.earned': '📈 Gewinn: {val}',
  'ex.resources.cost': 'Kostet {n} 🪙',
  'ex.resources.gain': 'Bringt {n} 🪙',
  'ex.resources.was': 'möglich waren {n}',

  'groups.creator': 'Gründer',
  'groups.idle': 'Diese Woche noch kein Training',
  'groups.remove': 'Aus der Gruppe entfernen',
  'groups.removeConfirm': '{name} aus „{group}“ entfernen? Mit dem Einladungscode ist eine Rückkehr möglich.',

  'settings.saved': 'Gespeichert',

  'groups.copyCode': 'Code kopieren',
  'groups.codeCopied': 'Code kopiert',
  'groups.copyFailed': 'Kopieren nicht möglich: Markiere den Code und kopiere ihn von Hand',
  'groups.ban': 'Aus der Gruppe sperren',
  'groups.banConfirm': '{name} aus „{group}“ sperren? Die Person wird entfernt und kann nicht zurückkehren, auch nicht mit dem Einladungscode.',
  'groups.actionsHint': '✕ entfernt aus der Gruppe (Rückkehr mit dem Code möglich) · 🚫 sperrt (keine Rückkehr)',
  'groups.bannedTitle': 'Gesperrt ({n})',
  'groups.unban': 'Wieder zulassen',
  'groups.err.banned': 'Du kannst dieser Gruppe nicht beitreten: Der Gründer hat dich gesperrt.',

  'groups.newCode': 'Neuer Code',
  'groups.newCodeConfirm': 'Den Code von „{group}“ ersetzen? Der alte Code und die Einladungslinks funktionieren dann nicht mehr. Mitglieder bleiben in der Gruppe.',
  'groups.newCodeDone': 'Neuer Code erstellt: Der alte funktioniert nicht mehr',
};

const words: string[] = [
  "Baum", "Boot", "Kerze", "Delfin", "Elefant", "Schmetterling", "Eis", "Insel", "Lampe", "Berg",
  "Wolke", "Regenschirm", "Klavier", "Heft", "Rakete", "Stuhl", "Trommel", "Ei", "Vulkan", "Rucksack",
  "Ring", "Fahrrad", "Kissen", "Drache", "Schere", "Giraffe", "Schlüssel", "Zitrone", "Hammer", "Schiff",
  "Uhr", "Pinguin", "Spinne", "Spiegel", "Tasse", "Geige", "Burg", "Erdbeere", "Möwe", "Wolf",
  "Medaille", "Nest", "Topf", "Schuh", "Zug", "Koffer", "Komet", "Leuchtturm", "Eichel", "Brot",
  "Ziegel", "Pferd", "Zelt", "Schwamm", "Birne", "Flasche", "Krone", "Kastanie", "Fluss", "Stern",
  "Mond", "Wald", "Feld", "Sand", "Wind", "Gras", "Holz", "Gold", "Dorf", "Dach",
  "Wand", "Turm", "Park", "Pfad", "Seen", "Bach", "Bild", "Lied", "Ball", "Seil",
  "Zahn", "Kopf", "Hand", "Fuß", "Haar", "Nase", "Auge", "Hund", "Ente", "Maus",
  "Blume", "Sonne", "Vogel", "Katze", "Tiger", "Löwen", "Bären", "Fisch", "Adler", "Falke",
  "Kranz", "Pfeil", "Bogen", "Speer", "Schild", "Helme", "Weste", "Jacke", "Hosen", "Kleid",
  "Küche", "Regal", "Kamin", "Öfens", "Besen", "Decke", "Kanne", "Gabel", "Löffel", "Teller",
  "Feuer", "Rauch", "Dampf", "Regen", "Hagel", "Nacht", "Nebel", "Frost", "Hitze", "Sturm",
  "Garten", "Quelle", "Höhlen", "Felsen", "Wiesen", "Brücke", "Gassen", "Plätze", "Kirche", "Tunnel",
  "Schloss", "Tempel", "Palast", "Balkon", "Treppe", "Zimmer", "Fenster", "Kästen", "Truhen", "Silber",
  "Bronze", "Kupfer", "Eisen", "Stähle", "Papier", "Briefe", "Siegel", "Münzen", "Gürtel", "Sattel",
  "Wagens", "Kutsche", "Motore", "Segeln", "Rudern", "Ankers", "Häfens", "Strand", "Gitarre", "Trompete",
  "Laterne", "Fackeln", "Kompass", "Klingen", "Schwert", "Rüstung", "Gewitter", "Planete", "Galaxie", "Brunnen",
  "Eisberg", "Klippen", "Flöten", "Harfens", "Glocken", "Teppich", "Vorhang", "Schrank", "Schmuck", "Katalog",
  "Pyramide", "Horizont", "Zauberer", "Schlucht", "Festung", "Wasserfall", "Schneeball", "Windmühle", "Gasthaus", "Rathaus",
  "Speicher", "Werkstatt", "Bergwerk", "Bibliothek", "Teleskop", "Mikroskop", "Riesenrad", "Karussell", "Handschuh", "Regenbogen",
];

const passages: Passage[] = [
  {
    text: "Der Leuchtturm auf der Insel Weißenstein wurde in einer nebligen Nacht im Jahr 1891 zum ersten Mal entzündet. Der Wärter, ein ehemaliger Fischer namens Arthur, stieg zweimal am Tag die hundertdreißig Stufen des Turms hinauf, um die Linse zu putzen und das Uhrwerk aufzuziehen, das das Licht drehen ließ. In Sturmnächten schlief er nicht: Er blieb oben und beobachtete das Meer, mit einer Thermoskanne Kaffee und einem alten Radio. In vierzig Dienstjahren erlitt kein Schiff in der Nähe der Insel Schiffbruch.",
    question: "Wie viele Stufen hatte der Turm?",
    answers: [
      "Hundertdreißig",
      "Dreihundert",
      "Einundneunzig",
    ],
  },
  {
    text: "Bienen, die ein gutes Blumenfeld finden, kehren zum Stock zurück und führen einen besonderen Tanz auf. Der Winkel des Tanzes zur Senkrechten zeigt die Richtung des Futters im Verhältnis zur Sonne, die Dauer des Tanzes dagegen die Entfernung. Die anderen Bienen folgen den Bewegungen mit ihren Fühlern und fliegen dann direkt zum angezeigten Ort. So kann eine einzige Kundschafterin Hunderte von Gefährtinnen führen.",
    question: "Was zeigt die Dauer des Tanzes an?",
    answers: [
      "Die Entfernung des Futters",
      "Die Art der Blume",
      "Die Tageszeit",
    ],
  },
  {
    text: "Martha hatte beschlossen, Brot backen zu lernen. Das erste kam hart wie ein Stein aus dem Ofen, das zweite war in der Mitte roh. Beim dritten Versuch verstand sie das Problem: Die Küche war zu kalt, und der Teig ging nicht richtig auf. Seitdem lässt sie den Teig mit einem Tuch bedeckt neben der Heizung ruhen, und jeden Sonntag klopfen die Nachbarn an die Tür, angelockt vom Duft.",
    question: "Warum gelang Marthas Brot nicht?",
    answers: [
      "Die Küche war zu kalt",
      "Sie nahm zu viel Salz",
      "Der Ofen war kaputt",
    ],
  },
  {
    text: "In den Bergen sinkt die Temperatur im Durchschnitt um etwa sechseinhalb Grad pro tausend Meter Höhe. Deshalb liegt selbst im Hochsommer auf den höchsten Gipfeln Schnee. Erfahrene Wanderer haben immer einen Pullover im Rucksack, auch wenn es im Tal warm ist. Auch der Wind kann die Kälte viel stärker spüren lassen, als das Thermometer anzeigt.",
    question: "Um wie viel sinkt die Temperatur pro tausend Meter?",
    answers: [
      "Um etwa sechseinhalb Grad",
      "Um etwa zwei Grad",
      "Um etwa fünfzehn Grad",
    ],
  },
  {
    text: "Im kleinen Dorf Talbrunn findet der Markt jeden Donnerstag auf dem Platz statt. Der beliebteste Stand ist weder der mit dem Obst noch der mit dem Käse, sondern der von Elias, der seit vierzig Jahren Uhren und Radios repariert. Die Leute bringen ihm Geräte, die sonst niemand mehr reparieren kann, und mit Lupe und Pinzette bringt er sie fast immer wieder zum Laufen.",
    question: "Was macht Elias beruflich?",
    answers: [
      "Er repariert Uhren und Radios",
      "Er verkauft Käse",
      "Er baut Obst an",
    ],
  },
  {
    text: "Der Krake hat drei Herzen und blaues Blut. Zwei Herzen pumpen das Blut zu den Kiemen, das dritte durch den restlichen Körper. Außerdem ist er ein Meister der Verkleidung: Dank besonderer Zellen in seiner Haut kann er in Sekundenbruchteilen die Farbe wechseln, um sich zu tarnen oder zu verständigen. Manche Kraken tragen sogar Kokosnussschalen als tragbaren Unterschlupf mit sich.",
    question: "Wie viele Herzen hat der Krake?",
    answers: [
      "Drei",
      "Eines",
      "Acht",
    ],
  },
  {
    text: "Londoner Taxifahrer müssen über fünfundzwanzigtausend Straßen und Tausende Sehenswürdigkeiten auswendig lernen, um die berüchtigte Prüfung \"The Knowledge\" zu bestehen. MRT-Untersuchungen zeigten, dass diese enorme räumliche Gedächtnisleistung den hinteren Hippocampus vergrößert – das Hirnareal, das für Navigation und räumliche Orientierung zuständig ist.",
    question: "Welches Hirnareal wächst bei Londoner Taxifahrern messbar an?",
    answers: [
      "Der hintere Hippocampus",
      "Der primäre Motorkortex",
      "Der linke Frontallappen",
    ],
  },
  {
    text: "Geckos können mühelos an spiegelglatten Glaswänden emporklettern und kopfüber an Decken hängen. Möglich machen dies weder klebrige Sekrete noch Saugnäpfe, sondern Millionen mikroskopisch feiner Härchen an ihren Zehen, sogenannte Spatulae. Diese treten mit Oberflächen über schwache міжmolekulare Kräfte in Wechselwirkung, die Van-der-Waals-Kräfte genannt werden.",
    question: "Welche physikalische Kraft verleiht Geckos ihre Haftfähigkeit an Glas?",
    answers: [
      "Mikroskopische Van-der-Waals-Kräfte",
      "Sogwirkung winziger Saugnäpfe",
      "Ein körpereigener Klebstoff",
    ],
  },
  {
    text: "Im Jahr 1901 entdeckten Schwammtaucher in einem antiken Schiffswrack vor der griechischen Insel Antikythera einen verkrusteten Bronzemechanismus. Das auf das 2. Jahrhundert vor Christus datierte Artefakt besaß Dutzende präziser Zahnräder und gilt als ältester astronomischer Computer, mit dem Mondphasen und Finsternisse exakt berechnet wurden.",
    question: "Welchem Zweck diente der Mechanismus von Antikythera?",
    answers: [
      "Der Berechnung astronomischer Zyklen und Finsternisse",
      "Der Tiefenmessung im Ozean",
      "Der Geschwindigkeitsmessung des Windes",
    ],
  },
  {
    text: "Während des Zweiten Weltkriegs entschlüsselten Kryptoanalytiker in Bletchley Park unter der Leitung von Alan Turing die Funksprüche der deutschen Chiffriermaschine Enigma. Sie konstruierten raumgroße elektromechanische Rechenmaschinen namens \"Bombes\", die täglich Millionen Buchstabenkombinationen testeten, um den jeweiligen Tagesschlüssel zu knacken.",
    question: "Wie wurden die elektromechanischen Entschlüsselungsmaschinen von Turing genannt?",
    answers: [
      "Bombes",
      "Colossus",
      "Enigma-Brecher",
    ],
  },
  {
    text: "Das James-Webb-Weltraumteleskop kreist anderthalb Millionen Kilometer von der Erde entfernt um die Sonne, am Gravitationsgleichgewichtspunkt Lagrange L2. Geschützt von einem sonnenschirmgroßen Hitzeschild sammeln seine sechseckigen, goldbeschichteten Berylliumspiegel infrarotes Licht von den allerersten Galaxien, die kurz nach dem Urknall entstanden sind.",
    question: "In welcher Entfernung von der Erde befindet sich das James-Webb-Teleskop?",
    answers: [
      "Anderthalb Millionen Kilometer",
      "Dreihundertachtzigtausend Kilometer",
      "Einhunderttausend Kilometer",
    ],
  },
  {
    text: "Im Marianengraben, fast achttausend Meter unter dem Meeresspiegel, lebt der Marianen-Schneckenfisch in völliger Finsternis. Sein durchscheinender Körper besitzt keine Schwimmblase, und seine Zellproteine werden durch ein spezielles Molekül namens TMAO stabilisiert, wodurch er dem gewaltigen hydrostatischen Druck standhält.",
    question: "Welches Molekül schützt die Zellen des Tiefsee-Schneckenfischs vor dem Druck?",
    answers: [
      "Das Schutzmolekül TMAO",
      "Eine dicke Fettschicht",
      "Ein mit Titan verstärktes Zellskelett",
    ],
  },
  {
    text: "In den tiefen Schluchten der Anden bauten die Inka Hängebrücken über reißende Flüsse ganz ohne Holzbalken oder Eisenketten. Ganze Dorfgemeinschaften flochten das raue Bergras Ichu zu dicken Seilen zusammen, die zu tragenden Tauen gebündelt wurden. Jedes Jahr wurde die Brücke in einem dreitägigen Fest erneuert und neu über die Schlucht gespannt.",
    question: "Welches Naturmaterial verwendeten die Inka für ihre Hängebrücken?",
    answers: [
      "Geflochtenes wildes Bergras",
      "Lederstreifen von Lamas",
      "Zweige gebunden mit Hanf",
    ],
  },
  {
    text: "Im Jahr 1610 richtete Galileo Galilei sein handgefertigtes Fernrohr auf Jupiter und entdeckte vier Lichtpunkte, die wie an einer Perlenschnur neben dem Planeten aufgereiht waren. In den folgenden Nächten beobachtete er, wie sie Jupiter umkreisten. Diese Monde lieferten den ersten direkten Beweis dafür, dass sich nicht alle Himmelskörper um die Erde drehen.",
    question: "Wie viele Jupitermonde entdeckte Galileo Galilei im Jahr 1610?",
    answers: [
      "Vier",
      "Zwei",
      "Sieben",
    ],
  },
  {
    text: "Im mittelamerikanischen Regenwald verehrten die Maya Kakaobohnen als heiliges Geschenk der Götter und nutzten sie als Zahlungsmittel. Sie zermahlten die fermentierten Bohnen und brauten daraus ein bitteres, schaumiges Ritualgetränk. Durch wiederholtes Gießen aus großer Höhe erzeugten sie dichten Schaum und würzten das Gebräu mit gemahlenen Chilischoten.",
    question: "Welches scharfe Gewürz gaben die Maya traditionell in ihr Kakaogetränk?",
    answers: [
      "Gemahlene Chilischoten",
      "Wilden Ingwer",
      "Getrocknete Nelken",
    ],
  },
  {
    text: "In tropischen Meeresbuchten erstrahlt das Wasser nachts in leuchtend elektrischem Blau, sobald es durch Wellenschlag oder Ruderbewegungen aufgewühlt wird. Verursacht wird dies durch Abermilliarden mikroskopischer Einzeller, die Dinoflagellaten. Bei mechanischer Reizung erzeugen sie einen Lichtblitz, um Fressfeinde abzuschrecken.",
    question: "In welcher Farbe leuchten biolumineszente Dinoflagellaten im Meer?",
    answers: [
      "Leuchtend elektrisches Blau",
      "Smaragdgrün",
      "Goldgelbes Bernsteinfarben",
    ],
  },
  {
    text: "Chamäleons wechseln ihre Farbe nicht durch das Mischen von Pigmentflüssigkeiten. In ihrer Haut liegt eine Schicht aus Iridophoren-Zellen mit einem Gitter aus Guanin-Nanokristallen. Durch Anspannen oder Entspannen der Haut verändern sie den Abstand zwischen diesen Kristallen, wodurch bestimmte Wellenlängen des Lichts wie von Spiegeln reflektiert werden.",
    question: "Wie vollziehen Chamäleons ihren Farbwechsel?",
    answers: [
      "Indem sie den Abstand zwischen Nanokristallen in ihrer Haut verändern",
      "Indem sie Farbbeutel unter ihren Schuppen leeren",
      "Durch eine Änderung ihrer Körpertemperatur",
    ],
  },
  {
    text: "Einer jahrhundertealten Legende aus dem Hochland von Äthiopien zufolge wurde der Kaffee von einem Ziegenhirten namens Kaldi entdeckt. Er bemerkte, dass seine Ziegen voller Energie herumsprangen, nachdem sie die roten Beeren eines wilden Strauches gefressen hatten. Kaldi pflückte die Früchte und brachte sie zu Mönchen eines nahen Klosters.",
    question: "Wer entdeckte der Überlieferung nach die belebende Wirkung von Kaffeekirschen?",
    answers: [
      "Ein aufmerksamer Ziegenhirte namens Kaldi",
      "Ein Gewürzhändler vom Roten Meer",
      "Ein wandernder Mönch",
    ],
  },
  {
    text: "Unter dem antarktischen Eisschild wurde der Schnee der vergangenen Jahrtausende zu dichtem Blaueis komprimiert. Im Eiskristallgitter sind Millionen winziger Luftbläschen aus prähistorischer Zeit eingeschlossen. Durch Bohrungen von Eisbohrkernen in über drei Kilometern Tiefe analysieren Klimaforscher Originalproben der Atmosphäre vor Hunderttausenden von Jahren.",
    question: "Was untersuchen Klimaforscher in antarktischen Eisbohrkernen?",
    answers: [
      "Uralte Luftbläschen, die seit Jahrtausenden im Eis eingeschlossen sind",
      "Fossile Wassertropfen",
      "Konservierten Blütenstaub urzeitlicher Bäume",
    ],
  },
  {
    text: "In verschiedenen Wüsten der Erde stoßen Reisende auf das akustische Phänomen der singenden Sanddünen. Wenn trockener Sand an steilen Dünenhängen lawinenartig herabgleitet, reiben Millionen gleich großer Quarzkörner mit identischer Frequenz aneinander. Durch diese koordinierte Reibung entsteht ein tiefer, bassartiger Brummton wie von einem Cello.",
    question: "Wodurch entsteht das charakteristische Summen singender Sanddünen?",
    answers: [
      "Durch die koordinierte Reibung herabrutschender Quarzkörner",
      "Durch Wind, der an scharfkantigen Felsen bricht",
      "Durch Hohlräume im Erdboden",
    ],
  },
];

import type { StoryScenario } from '../i18n';

export const stories: StoryScenario[] = [
  {
    "name": "Elena",
    "item": "eine blaue Tasche",
    "itemDistractors": [
      "einen roten Rucksack",
      "einen grünen Koffer"
    ],
    "place": "unter der Parkbank",
    "placeDistractors": [
      "vor dem Café",
      "im Zug"
    ],
    "time": "um 15:30 Uhr",
    "timeDistractors": [
      "um 18:00 Uhr",
      "um 12:15 Uhr"
    ]
  },
  {
    "name": "Markus",
    "item": "ein ledernes Notizbuch",
    "itemDistractors": [
      "ein Bildband",
      "ein schwarzes Tablet"
    ],
    "place": "auf dem Bibliothekstisch",
    "placeDistractors": [
      "auf der Terrasse",
      "im Warteraum"
    ],
    "time": "Donnerstagmorgen",
    "timeDistractors": [
      "Freitagnachmittag",
      "Dienstagabend"
    ]
  },
  {
    "name": "Sarah",
    "item": "ein gelbes Fahrrad",
    "itemDistractors": [
      "ein silberner Tretroller",
      "ein weißer Motorroller"
    ],
    "place": "neben dem zentralen Brunnen",
    "placeDistractors": [
      "vor dem Rathaus",
      "hinter dem Kiosk"
    ],
    "time": "um 9:00 Uhr",
    "timeDistractors": [
      "um 11:30 Uhr",
      "um 14:00 Uhr"
    ]
  },
  {
    "name": "David",
    "item": "einen roten Wollschal",
    "itemDistractors": [
      "eine blaue Mütze",
      "eine braune Jacke"
    ],
    "place": "auf dem Stuhl im Café",
    "placeDistractors": [
      "auf der Hafenmauer",
      "im Büroflur"
    ],
    "time": "Samstagabend",
    "timeDistractors": [
      "Sonntagmorgen",
      "Mittwoch um 16:00 Uhr"
    ]
  },
  {
    "name": "Julia",
    "item": "eine weiße Keramikvase",
    "itemDistractors": [
      "eine goldene Lampe",
      "ein Holzgemälde"
    ],
    "place": "auf der Fensterbank der Küche",
    "placeDistractors": [
      "auf der Eingangstheke",
      "auf dem Wohnzimmerregal"
    ],
    "time": "um 17:45 Uhr",
    "timeDistractors": [
      "um 20:00 Uhr",
      "um 10:15 Uhr"
    ]
  },
  {
    "name": "Lukas",
    "item": "ein Seemannsfernglas",
    "itemDistractors": [
      "einen Messingkompass",
      "eine antike Seekarte"
    ],
    "place": "auf dem Leuchtturmfelsen",
    "placeDistractors": [
      "am Schiffsbug",
      "in der Hafenhütte"
    ],
    "time": "im ersten Morgengrauen",
    "timeDistractors": [
      "bei Sonnenuntergang",
      "punkt zwölf Uhr mittags"
    ]
  },
  {
    "name": "Klara",
    "item": "eine Vintage-Kamera",
    "itemDistractors": [
      "eine Objektivtasche",
      "ein Aluminiumstativ"
    ],
    "place": "auf der Aussichtsterrasse",
    "placeDistractors": [
      "entlang der Lindenallee",
      "auf der Fußgängerbrücke"
    ],
    "time": "Freitag bei Sonnenuntergang",
    "timeDistractors": [
      "Samstag im Morgengrauen",
      "Donnerstagnachmittag"
    ]
  },
  {
    "name": "Matthias",
    "item": "eine goldene Taschenuhr",
    "itemDistractors": [
      "ein Silberarmband",
      "einen antiken Ring"
    ],
    "place": "auf dem Tisch des Antiquars",
    "placeDistractors": [
      "im Hotelsafe",
      "in der zentralen Vitrine"
    ],
    "time": "Montag um 11:00 Uhr",
    "timeDistractors": [
      "Mittwoch um 15:30 Uhr",
      "Freitag um 9:15 Uhr"
    ]
  },
  {
    "name": "Valerie",
    "item": "einen gelben Punkteregenschirm",
    "itemDistractors": [
      "einen grünen Regenmantel",
      "ein Seidentuch"
    ],
    "place": "an der Straßenbahnhaltestelle",
    "placeDistractors": [
      "am U-Bahn-Eingang",
      "unter den Arkaden des Platzes"
    ],
    "time": "Mittwoch im Regen",
    "timeDistractors": [
      "Dienstag nach Feierabend",
      "Donnerstagabend"
    ]
  },
  {
    "name": "Simon",
    "item": "eine bemalte Blechdose",
    "itemDistractors": [
      "eine Holztruhe",
      "ein Glasgefäß"
    ],
    "place": "auf den Theaterstufen",
    "placeDistractors": [
      "im Kinogang",
      "neben der Kasse"
    ],
    "time": "Sonntag um 14:30 Uhr",
    "timeDistractors": [
      "Samstag um 21:00 Uhr",
      "Montag um 18:00 Uhr"
    ]
  },
  {
    "name": "Fiona",
    "item": "eine gerollte Sternenkarte",
    "itemDistractors": [
      "einen Tischglobus",
      "ein Bronze-Astrolabium"
    ],
    "place": "im Hügelobservatorium",
    "placeDistractors": [
      "im Schlossturm",
      "auf der Planetariumswiese"
    ],
    "time": "um Mitternacht bei klarem Himmel",
    "timeDistractors": [
      "um 22 Uhr abends",
      "um 2 Uhr nachts"
    ]
  },
  {
    "name": "Andreas",
    "item": "einen verzierten Eisenschlüssel",
    "itemDistractors": [
      "ein schweres Vorhängeschloss",
      "ein graviertes Medaillon"
    ],
    "place": "in der Dachbodentruhe",
    "placeDistractors": [
      "hinter dem Wohnzimmerbild",
      "in der Schreibtischschublade"
    ],
    "time": "Dienstag um 16:15 Uhr",
    "timeDistractors": [
      "Donnerstag um 10:30 Uhr",
      "Sonntagnachmittag"
    ]
  },
  {
    "name": "Silvia",
    "item": "eine emaillierte Gusseisenteekanne",
    "itemDistractors": [
      "eine Kristallkaraffe",
      "eine Porzellantasse"
    ],
    "place": "auf dem Tisch im Gewächshaus",
    "placeDistractors": [
      "im Gartenpavillon",
      "auf dem Labortisch"
    ],
    "time": "Samstag um 10:00 Uhr",
    "timeDistractors": [
      "Sonntag um 17:00 Uhr",
      "Freitag beim Frühstück"
    ]
  },
  {
    "name": "Lorenz",
    "item": "eine Walnussholzflöte",
    "itemDistractors": [
      "eine antike Mandoline",
      "einen Ebenholzbogen"
    ],
    "place": "auf der steinernen Bogenbrücke",
    "placeDistractors": [
      "am Ufer des Bachs",
      "unter der uralten Eiche"
    ],
    "time": "Mittwoch früh am Morgen",
    "timeDistractors": [
      "Donnerstag in der Dämmerung",
      "Samstagnachmittag"
    ]
  },
  {
    "name": "Alice",
    "item": "eine Schachtel Wachsmalstifte",
    "itemDistractors": [
      "einen Skizzenblock",
      "eine Ölfarbenpalette"
    ],
    "place": "auf der Museumstreppe",
    "placeDistractors": [
      "im mittelalterlichen Kreuzgang",
      "am Eingang der Kunstgalerie"
    ],
    "time": "Sonntag um 16:45 Uhr",
    "timeDistractors": [
      "Samstagmittag",
      "Dienstag um 14:00 Uhr"
    ]
  },
  {
    "name": "Fabian",
    "item": "einen geflochtenen Strohhut",
    "itemDistractors": [
      "eine Sonnenbrille",
      "ein kariertes Bandana"
    ],
    "place": "auf dem Fischersteg",
    "placeDistractors": [
      "am Muschelstrand",
      "am Segelbootanleger"
    ],
    "time": "Freitagmittag",
    "timeDistractors": [
      "Sonntag um 11:00 Uhr",
      "Mittwoch um 15:00 Uhr"
    ]
  },
  {
    "name": "Beatrice",
    "item": "eine glänzende Messinglaterne",
    "itemDistractors": [
      "einen dreiflammigen Kerzenleuchter",
      "eine Taschenlampe"
    ],
    "place": "unter den Torbögen des Innenhofs",
    "placeDistractors": [
      "im freskierten Korridor",
      "vor dem Prachtportal"
    ],
    "time": "Donnerstagabend um 20:30 Uhr",
    "timeDistractors": [
      "Freitag in der Abenddämmerung",
      "Samstagnacht zu später Stunde"
    ]
  },
  {
    "name": "Robert",
    "item": "ein tragbares Batterieradio",
    "itemDistractors": [
      "einen Kompaktplattenspieler",
      "einen Taschenlautsprecher"
    ],
    "place": "auf der Werkbank der Tischlerei",
    "placeDistractors": [
      "im Geräteschuppen",
      "in der Autowerkstatt"
    ],
    "time": "Montag um 8:30 Uhr",
    "timeDistractors": [
      "Mittwoch um 13:00 Uhr",
      "Freitag um 17:15 Uhr"
    ]
  },
  {
    "name": "Camilla",
    "item": "einen bestickten Seidenfächer",
    "itemDistractors": [
      "ein schwarzes Spitzentuch",
      "eine Samthaube"
    ],
    "place": "in der Schlossloggia",
    "placeDistractors": [
      "auf dem Turmbalkon",
      "im Spiegelsaal"
    ],
    "time": "Dienstag bei Sonnenuntergang",
    "timeDistractors": [
      "Donnerstagnachmittag",
      "Sonntagabend"
    ]
  },
  {
    "name": "Gabriel",
    "item": "ein vergilbtes Schiffstagebuch",
    "itemDistractors": [
      "einen gebundenen Seeatlas",
      "eine versiegelte Pergamentrolle"
    ],
    "place": "im Keller der alten Kelter",
    "placeDistractors": [
      "im Laderaum des Segelschiffs",
      "im Kutschenschuppen"
    ],
    "time": "Samstagnachmittag um 15:00 Uhr",
    "timeDistractors": [
      "Montag um 11:30 Uhr",
      "Mittwochabend"
    ]
  },
  {
    "name": "Martina",
    "item": "eine Pralinenschachtel mit Zartbitter",
    "itemDistractors": [
      "einen Korb Gewürzkekse",
      "eine Mandeltorte"
    ],
    "place": "im Schaufenster der Konditorei",
    "placeDistractors": [
      "auf dem Teestubentisch",
      "am Eingang des Feinkostladens"
    ],
    "time": "Donnerstag um 17:00 Uhr",
    "timeDistractors": [
      "Samstag um 10:30 Uhr",
      "Sonntag um 16:15 Uhr"
    ]
  },
  {
    "name": "Georg",
    "item": "eine runde Lupe",
    "itemDistractors": [
      "ein Reisemikroskop",
      "eine Präzisionspinzette"
    ],
    "place": "auf dem Arbeitstisch im Arbeitszimmer",
    "placeDistractors": [
      "im Familienarchiv",
      "auf dem Zeichentisch"
    ],
    "time": "Mittwoch um 19:30 Uhr",
    "timeDistractors": [
      "Dienstagmittag",
      "Freitag um 18:45 Uhr"
    ]
  },
  {
    "name": "Serena",
    "item": "eine Stofftasche aus Bio-Baumwolle",
    "itemDistractors": [
      "einen hellen Weidenkorb",
      "einen Wanderrucksack"
    ],
    "place": "am Stand für gebrauchte Bücher",
    "placeDistractors": [
      "auf dem Blumenmarkt",
      "vor dem Bioladen"
    ],
    "time": "Sonntagmorgen um 10:15 Uhr",
    "timeDistractors": [
      "Samstag um 16:00 Uhr",
      "Donnerstag um 11:45 Uhr"
    ]
  },
  {
    "name": "Peter",
    "item": "einen festen Cellokoffer",
    "itemDistractors": [
      "eine Notentasche",
      "einen Gitarrenkoffer"
    ],
    "place": "auf der Bühne im Wintergarten",
    "placeDistractors": [
      "im Foyer des Konzertsaals",
      "am Eingang der Musikschule"
    ],
    "time": "Freitagabend um 21:15 Uhr",
    "timeDistractors": [
      "Samstagnachmittag",
      "Sonntag um 18:30 Uhr"
    ]
  }
];

const nicknames = {
  adjectives: [
    'Flinker', 'Heller', 'Ruhiger', 'Mutiger', 'Kluger', 'Sanfter', 'Fröhlicher', 'Kühner',
    'Stiller', 'Glücklicher', 'Sonniger', 'Weiser', 'Standhafter', 'Neugieriger', 'Heiterer', 'Wendiger',
    'Geduldiger', 'Wacher', 'Freundlicher', 'Munterer', 'Stolzer', 'Lustiger', 'Schneller', 'Edler',
    'Scharfer', 'Unermüdlicher', 'Witziger', 'Wagemutiger', 'Goldener', 'Silberner', 'Blauer', 'Grüner',
  ],
  animals: [
    'Fuchs', 'Wolf', 'Delfin', 'Panda', 'Tiger', 'Koala', 'Luchs', 'Falke',
    'Schwan', 'Biber', 'Pinguin', 'Löwe', 'Bär', 'Hirsch', 'Igel', 'Dachs',
    'Adler', 'Flamingo', 'Pelikan', 'Gecko', 'Papagei', 'Elefant', 'Leopard', 'Gepard',
    'Kranich', 'Otter', 'Uhu', 'Hase', 'Waschbär', 'Seehund', 'Wal', 'Kolibri',
  ],
};

/** Valid words made of the same letters as a word in `words`, which Anagrams also accepts as answers. */
const anagramWords: string[] = [
  'SIE', 'SEI', 'LINSE', 'SENIL', 'AMPEL', 'PALME', 'GRIN', 'RUH', 'GRUB', 'HUSCH',
  'LEICHE', 'ERBIN', 'FALSCHE', 'SCHLAFE', 'FLACHES', 'ERNST', 'SARG', 'LEID', 'LIES', 'TEEN',
  'SAUM', 'GIERT', 'LAGER', 'BELAG', 'FREUE', 'LEBEN', 'ELBEN', 'GERNE', 'ENGER', 'GENRE',
  'FORST', 'ZIEHT', 'HEIZT', 'ZEIHT', 'TURMS', 'TRAGEN', 'ANREGT', 'RAGTEN', 'GRATEN', 'WEISEN',
  'WEINES', 'BLANKO', 'RUHTEN', 'SEINE', 'EINES', 'SEIEN', 'NIESE', 'FIEBER', 'BERIEF', 'GEISEL',
  'GEILES', 'GLEISE', 'SELIGE', 'LASTET', 'ENGELS', 'RUNDER', 'FAHRENS', 'HAUSRAT', 'EPISCHER', 'ALTEREN',
  'KICHER', 'KRIECH', 'LUNTEN', 'FERNSTE', 'SUHLT', 'TROMMLE', 'ARTIGER', 'BESCHALLEN', 'RADREISEN', 'GEBORGENEN',
  'SPIEGLE', 'KNÄSTE', 'KRANES',
];

export default { ui, words, anagramWords, passages, stories, nicknames };
