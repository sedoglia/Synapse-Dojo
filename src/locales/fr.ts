import type { Locale, Passage } from '../i18n';

const ui: Locale['ui'] = {
  'app.tagline': 'Quelques minutes par jour pour entraîner ton esprit',
  'home.how': 'Entraîne-toi chaque jour et mesure-toi pour voir tes progrès',
  'onboard.title': 'Bienvenue !',
  'onboard.ask': 'Comment tu t’appelles ?',
  'onboard.placeholder': 'Ton prénom',
  'onboard.go': 'C’est parti',

  'landing.heroTitle': 'Entraînez votre esprit quelques minutes par jour',
  'landing.heroSub': '35 jeux cognitifs et bilatéraux inspirés de paradigmes de recherche, pour exercer la mémoire, l’attention, la coordination, la vitesse de traitement et les réflexes. 100 % gratuit, sans publicité, sans inscription ni mot de passe.',
  'landing.badgeFree': '100 % gratuit',
  'landing.badgePrivacy': 'Confidentialité totale · Données locales',
  'landing.badgeScience': 'Inspiré de la recherche',
  'landing.badgeOpenSource': 'Open Source',
  'landing.startCardTitle': 'Commencez l’entraînement maintenant',
  'landing.startCardDesc': 'Aucune inscription requise. Choisissez un pseudo pour personnaliser votre expérience et sauvegarder votre progression dans votre navigateur.',
  'landing.guestBtn': 'Ou jouer en tant qu’invité',
  'landing.guestName': 'Invité',
  'landing.guideBtn': '📖 Guide & Instructions',
  'landing.howItWorks': 'Comment fonctionne Synapse Dojo',
  'landing.pillar1Title': 'Entraînement quotidien',
  'landing.pillar1Desc': '4 exercices choisis chaque jour qui s’adaptent à votre niveau. Environ 10 à 15 minutes suffisent.',
  'landing.pillar2Title': 'Neuro Score quotidien',
  'landing.pillar2Desc': 'Un test d’environ 10 à 15 minutes sur les 9 domaines pour suivre ta tendance au fil des semaines. Ce n’est pas un test clinique.',
  'landing.pillar3Title': 'Salle libre (35 jeux)',
  'landing.pillar3Desc': 'Pratiquez librement sur l’ensemble des 9 domaines cognitifs quand vous le souhaitez pour battre vos records.',
  'landing.pillar4Title': 'Classement de la semaine (facultatif)',
  'landing.pillar4Desc': 'Si tu en as envie, compare ta régularité et tes progrès avec d’autres joueurs ou des amis, sous un pseudo aléatoire. Il reste désactivé tant que tu ne le rejoins pas, et tu peux le quitter quand tu veux.',
  'landing.domainsTitle': 'Les 9 domaines cognitifs entraînés',
  'landing.guideCtaTitle': 'Envie de découvrir le fonctionnement de chaque jeu ?',
  'landing.guideCtaDesc': 'Lis notre guide détaillé avec les études qui inspirent les exercices et les règles des 35 jeux.',
  'landing.guideCtaBtn': 'Lire le guide complet',
  'landing.footerTagline': 'Synapse Dojo · Entraînement cognitif gratuit',

  'guide.title': 'Guide & Instructions',
  'guide.subtitle': 'Fonctionnement de Synapse Dojo, découverte des sections et explications détaillées des 35 exercices cognitifs',
  'guide.navSections': 'Les sections de l’application',
  'guide.introH': 'Pourquoi entraîner son cerveau ?',
  'guide.introP': 'Le cerveau continue de s’adapter tout au long de la vie, et la pratique améliore les tâches pratiquées. Les études sur l’entraînement cognitif montrent de petits gains moyens, surtout sur les tâches entraînées ou très proches ; les preuves de bénéfices dans la vie quotidienne sont plus limitées. Synapse Dojo est un loisir actif : quelques minutes par jour avec des exercices qui s’adaptent à ton niveau. L’activité physique, le sommeil, la vie sociale et le soin de l’audition et de la vue restent essentiels.',
  'guide.planH': '🏋️ Entraînement quotidien (Plan)',
  'guide.planP': 'Chaque jour, Synapse Dojo compose une séquence de 4 exercices sur différents domaines (par exemple vitesse, mémoire, attention et contrôle exécutif). Les jeux s’adaptent automatiquement : si tu réussis, la difficulté augmente ; si tu te trompes, elle diminue, pour que ce ne soit ni trop facile ni trop difficile pour toi. Terminer l’entraînement prolonge ta série et te fait gagner des XP pour monter de niveau.',
  'guide.checkH': '📏 Mesurez votre Neuro Score (Daily Check)',
  'guide.checkP': 'Le Neuro Score est un court test quotidien sur les 9 domaines, avec un exercice par domaine choisi par rotation chaque jour. Le score (de 0 à 1000) t’aide à suivre ta tendance dans ces exercices : lis-le sur plusieurs semaines, pas jour après jour, car les exercices changent et chaque test est court. Il n’a pas encore été validé auprès de vrais joueurs, n’est pas un test clinique et n’a aucune valeur diagnostique.',
  'guide.trainingH': '🧩 Salle libre (35 exercices)',
  'guide.trainingP': 'Dans la section Salle de sport, accédez librement aux 35 exercices classés par domaine cognitif. Utilisez-la pour travailler des points précis, explorer de nouvelles mécaniques de jeu ou surpasser vos records personnels.',
  'guide.progressH': '📈 Progrès & Statistiques',
  'guide.progressP': 'Visualisez votre profil cognitivo-radar sur les 9 compétences, l’historique de vos Neuro Scores, les badges et récompenses débloqués (comme les séries de jours consécutifs) et votre calendrier mensuel d’entraînement.',
  'guide.boardH': '🏆 Classement de la Semaine et Groupes d’Amis',
  'guide.boardP': 'Facultatif et désactivé tant que tu ne le rejoins pas depuis les Réglages. Chaque semaine, tu peux comparer la régularité (10 points par jour d’entraînement plus 1 par exercice, jusqu’à 12 par jour), les progrès par rapport à ton propre point de départ et le meilleur niveau par exercice, avec une tranche d’âge facultative. Il repart de zéro chaque lundi et tu vois le top 3 et les joueurs proches de toi, sous un pseudo aléatoire. Tu peux aussi créer un groupe privé et inviter ta famille et tes amis avec un lien ou un code. Tu peux quitter quand tu veux et toutes tes données sont effacées.',
  'guide.settingsH': '⚙️ Réglages & Confidentialité',
  'guide.settingsP': 'Personnalise ton expérience : sons, vibrations, rythme détendu (plus de temps pour répondre), grand texte et rappel quotidien à ajouter à ton agenda ; le thème clair ou sombre suit celui de ton appareil. C’est aussi ici que tu rejoins ou quittes le classement et que tu gères tes groupes. Tes progrès sont enregistrés uniquement dans ton navigateur : tu peux les exporter dans un fichier JSON de sauvegarde ou les transférer sur un autre appareil à tout moment.',
  'guide.gamesH': 'Les 35 exercices cognitifs expliqués',
  'guide.gameWhy': 'Sur quoi ça repose :',
  'guide.gameHow': 'Comment jouer :',
  'guide.faqH': 'Conseils et Foire aux Questions (FAQ)',
  'guide.faq1Q': 'À quelle fréquence dois-je m’entraîner ?',
  'guide.faq1A': 'La régularité compte plus que l’intensité. 10 à 15 minutes par jour suffisent (l’entraînement quotidien ; le Neuro Score, si tu veux, prend environ 10 à 15 minutes de plus). Répartir la pratique sur 4 ou 5 jours par semaine fonctionne en général mieux qu’une longue séance occasionnelle (l’effet d’espacement), et c’est aussi pourquoi, au classement, un jour de plus vaut plus qu’un entraînement de plus le même jour.',
  'guide.faq2Q': 'Où sont stockées mes données personnelles et mes scores ?',
  'guide.faq2A': 'Tout reste sur ton appareil. Synapse Dojo ne demande ni compte ni mot de passe et n’utilise aucun cookie de suivi : tes scores et tes progrès sont enregistrés dans ton navigateur (localStorage). Ce n’est que si tu rejoins le classement hebdomadaire facultatif qu’un résumé de la semaine est envoyé, sous un pseudo aléatoire.',
  'guide.faq3Q': 'Les jeux proposent-ils des explications en cours de partie ?',
  'guide.faq3A': 'Oui ! Au lancement de chaque exercice, vous trouverez toujours des consignes claires et un essai pratique guidé pour vous familiariser avec les commandes sans stress avant le début du test chronométré.',

  'home.hello': 'Salut, {name} !',
  'home.streak': '{n} jours d’affilée',
  'home.streak1': '1 jour d’affilée',
  'home.streak0': 'Commence ta série aujourd’hui',
  'home.check': 'Mesure ton Neuro Score',
  'home.checkSub': 'Les 9 domaines · environ 10-15 min · suis ta tendance au fil des semaines',
  'home.checkDone': 'Fait aujourd’hui : {score}',
  'home.training': 'Salle de sport',
  'home.trainingSub': 'Tous les exercices, classés par compétence',
  'home.progress': 'Progrès',
  'home.progressSub': 'Profil par compétence, niveaux et calendrier',
  'home.settings': 'Réglages',

  'plan.title': 'Entraînement',
  'plan.titleN': 'Entraînement {n}',
  'plan.again': 'Un autre entraînement',
  'plan.againSub': 'Encore envie ? Touche pour 4 nouveaux exercices sur d’autres compétences',
  'plan.sub': '{n} exercices choisis pour toi · ils s’adaptent à ton niveau · environ 10-15 min',
  'plan.progress': '{done}/{n} terminés',
  'plan.step': 'Exercice {i} sur {n}',
  'plan.done': 'Entraînement terminé !',
  'plan.doneSub': 'Bravo ! Si tu as encore envie, lance tout de suite un autre entraînement, avec des exercices différents.',

  'common.back': 'Retour',
  'common.start': 'C’est parti !',
  'common.quit': 'Quitter',
  'common.retry': 'Réessayer',
  'common.menu': 'Menu',
  'common.next': 'Suivant',
  'common.continue': 'Continuer',
  'common.best': 'Record',
  'common.newBest': 'Nouveau record !',
  'common.level': 'Niveau',
  'common.levelChange': 'Niveau : {from} → {to}',
  'common.why': 'Sur quoi ça repose',
  'common.timeout': 'Temps écoulé',
  'common.step': 'Épreuve {i} sur {n}',
  'common.correct': '{ok}/{n} justes',

  'domain.speed': 'Vitesse',
  'domain.attention': 'Attention',
  'domain.wm': 'Mémoire de travail',
  'domain.memory': 'Mémoire',
  'domain.executive': 'Contrôle',
  'domain.spatial': 'Espace',
  'domain.reasoning': 'Raisonnement',
  'domain.language': 'Calcul et lecture',

  'ex.glance.name': 'Coup d’œil',
  'ex.glance.desc': 'Pendant un instant, un véhicule apparaît au centre et une étoile près du bord. Dis-moi quel véhicule c’était et où était l’étoile. Le temps d’affichage raccourcit à mesure que tu progresses.',
  'ex.glance.why': 'Exerce le « champ visuel utile » : saisir plus d’informations d’un seul coup d’œil. Il s’inspire de la tâche utilisée dans l’essai ACTIVE, où l’entraînement de la vitesse de traitement a été associé à un risque de démence plus faible à 10 ans : un résultat prometteur, pas une preuve de prévention, et ce jeu ne faisait pas partie de l’essai.',
  'ex.glance.which': 'Quel véhicule était au centre ?',
  'ex.glance.where': 'Où était l’étoile ?',
  'ex.glance.detail': 'Seuil : {ms} ms',

  'ex.reflex.name': 'Réflexe de choix',
  'ex.reflex.desc': 'Un des quatre panneaux s’allume. S’il est vert, touche-le tout de suite ; s’il est rouge, ne touche à rien !',
  'ex.reflex.why': 'Temps de réaction de choix avec des signaux à ignorer (go/no-go) : associe vitesse et contrôle des réponses automatiques.',
  'ex.reflex.hint': 'Vert : touche · Rouge : ne bouge pas',
  'ex.reflex.detail': 'Réaction moyenne : {ms} ms · {ok}/{n} justes',

  'ex.path.name': 'Chemin des nombres',
  'ex.path.desc': 'Touche les cercles dans l’ordre. Aux niveaux élevés, tu alternes chiffres et lettres : 1 → A → 2 → B → 3 …',
  'ex.path.why': 'Une version du Trail Making Test, utilisé en neuropsychologie pour mesurer la recherche visuelle rapide et, dans la forme alternée, la flexibilité mentale.',
  'ex.path.next': 'Suivant : {v}',
  'ex.path.detail': '{secs} s · {err} erreurs',

  'ex.pilot.name': 'Pilote',
  'ex.pilot.desc': 'Reste sur la route : fais glisser ton doigt ou, sur ordinateur, utilise les touches ← →. Quand un cercle vert apparaît, appuie sur SIGNAL (bouton à l’écran, clic ou barre d’espace) : tu peux le faire dès qu’il apparaît et jusqu’à ce que l’anneau autour du panneau soit vide. Ignore les autres panneaux.',
  'ex.pilot.why': 'Inspiré de NeuroRacer (Université de Californie, San Francisco) : dans une étude publiée dans Nature, un entraînement adaptatif au multitâche a réduit le coût de faire deux choses à la fois, et l’effet a duré 6 mois.',
  'ex.pilot.press': 'SIGNAL !',
  'ex.pilot.detail': 'Signaux justes : {ok}/{n} · sur la route {road} %',

  'ex.radar.name': 'Radar',
  'ex.radar.desc': 'Quelques boules s’allument : ce sont les cibles. Puis elles deviennent toutes pareilles et bougent. Suis-les des yeux et touche les cibles à la fin.',
  'ex.radar.why': 'Suivi d’objets multiples : suivre plusieurs objets en mouvement entraîne l’attention répartie dans l’espace, celle que tu utilises dans la circulation ou dans la foule.',
  'ex.radar.watch': 'Retiens les cibles',
  'ex.radar.track': 'Suis-les…',
  'ex.radar.pick': 'Touche les {n} cibles',
  'ex.radar.detail': 'Cibles : jusqu’à {n} · {ok}/{t} manches réussies',

  'ex.clash.name': 'Choc des couleurs',
  'ex.clash.desc': 'Regarde la règle en haut : touche la COULEUR de l’encre ou le SENS du mot. Le temps pour répondre diminue à mesure que tu progresses.',
  'ex.clash.why': 'Effet Stroop : bloquer la réponse automatique (lire) pour donner celle qui est demandée. Il exerce et mesure l’attention sélective ; peu de preuves montrent que l’entraîner améliore l’inhibition en général.',
  'ex.clash.ruleInk': '🎨 Couleur de l’encre',
  'ex.clash.ruleWord': '📖 Sens du mot',

  'ex.switch.name': 'Double règle',
  'ex.switch.desc': 'Un nombre apparaît. Si le cadre est BLEU, dis s’il est pair ou impair. S’il est ORANGE, s’il est plus petit ou plus grand que 5. La règle change sans prévenir !',
  'ex.switch.why': 'Alternance de tâches : passer vite d’une règle à l’autre. L’entraînement réduit le « coût du changement », même sur des tâches non entraînées ; les personnes âgées progressent souvent le plus.',
  'ex.switch.parity': 'PAIR ou IMPAIR ?',
  'ex.switch.size': 'PLUS PETIT ou PLUS GRAND que 5 ?',
  'ex.switch.even': 'PAIR',
  'ex.switch.odd': 'IMPAIR',
  'ex.switch.detail': '{ok}/{n} · coût du changement {cost} ms',

  'ex.echo.name': 'Écho',
  'ex.echo.desc': 'Un carré s’allume à la fois. Pour chacun, demande-toi : est-il au même endroit que celui d’il y a N étapes ? Si oui, appuie sur POSITION, sinon n’appuie sur rien. Tu commences avec N = 1, le carré juste avant ; ensuite une lettre s’ajoute, comparée de la même façon.',
  'ex.echo.why': 'n-back : comparer chaque élément avec celui d’il y a N étapes. C’est la tâche de mémoire de travail la plus étudiée ; les gains sont nets sur des tâches proches et moins sûrs sur les tâches éloignées.',
  'ex.echo.before': 'Avant',
  'ex.echo.now': 'Maintenant',
  'ex.echo.ago': '{n} en arrière',
  'ex.echo.demo1': 'Un carré s’allume : rien à comparer pour l’instant, attends.',
  'ex.echo.demo2': 'Différent du précédent → n’appuie sur rien.',
  'ex.echo.demo3': 'Pareil que le précédent → appuie sur POSITION !',
  'ex.echo.demo4': 'De nouveau différent → n’appuie pas. Et ainsi de suite.',
  'ex.echo.stripWait': 'Retiens-le : tu le compareras avec les suivants.',
  'ex.echo.stripCompare': 'Le carré allumé MAINTENANT est-il au même endroit que celui mis en évidence ? Si oui, appuie sur POSITION.',
  'ex.echo.stripCompareDual': 'Compare MAINTENANT avec celui mis en évidence : même carré → POSITION, même lettre → LETTRE.',
  'ex.echo.back1': 'celui juste avant',
  'ex.echo.backN': 'celui d’il y a {n} étapes',
  'ex.echo.dualTitle': 'À partir de maintenant, c’est double !',
  'ex.echo.dualText': 'En plus du carré, tu entendras une lettre, aussi écrite dans le carré. Appuie sur POSITION si le carré correspond à {back} et sur LETTRE si la lettre correspond à {back}. Les deux, un seul ou aucun peuvent correspondre.',
  'ex.echo.series': 'Série {i} sur {n}',
  'ex.echo.seriesStart1': 'Cette série compte {len} carrés. Le premier sert seulement à retenir : n’appuie pas. À partir du deuxième, compare chaque carré avec celui juste avant.',
  'ex.echo.seriesStartN': 'Cette série compte {len} carrés. Les {k} premiers servent seulement à retenir : n’appuie pas. Ensuite compare chaque carré avec celui d’il y a {k} étapes.',
  'ex.echo.turnWait': 'Carré {i} sur {len} · retiens-le, n’appuie pas',
  'ex.echo.turnAsk': 'Carré {i} sur {len} · pareil que {back} ?',
  'ex.echo.turnAskDual': 'Carré {i} sur {len} · même endroit ? même lettre ? (par rapport à {back})',
  'ex.echo.seriesEnd': 'Fin de la série {i} sur {n}',
  'ex.echo.seriesScore': 'Précision : {acc} % · correspondances trouvées {hit} sur {targets} · appuis erronés {fa}',
  'fb.echoNotSame': 'n’appuie pas (c’était différent)',
  'fb.echoNotSameLetter': 'n’appuie pas (la lettre était différente)',
  'fb.echoMissed': 'appuie sur {btn} (c’était pareil)',
  'ex.echo.pos': 'Position',
  'ex.echo.letter': 'Lettre',
  'ex.echo.rule1': '1-back · compare avec celui juste avant',
  'ex.echo.ruleDual': '{n}-back ×2 · compare carré et lettre avec {back}',
  'ex.echo.rule': '{n}-back · compare avec {n} étapes en arrière',
  'ex.echo.block': 'Bloc {i} : {acc} % de précision (réussites moins fausses alertes)',

  'ex.grid.name': 'Grille lumineuse',
  'ex.grid.desc': 'Regarde les cases s’allumer et répète la séquence. Attention : parfois il faut la répéter à l’envers !',
  'ex.grid.why': 'Le test de Corsi : retenir des séquences dans l’espace, à l’endroit et à l’envers. Il mesure et entraîne la mémoire de travail visuo-spatiale.',
  'ex.grid.watch': 'Regarde…',
  'ex.grid.yours': 'À toi ! ({n} cases)',
  'ex.grid.back': 'À L’ENVERS ! ({n} cases)',
  'ex.grid.span': 'Séquence la plus longue : {n}',
  'ex.grid.detail': 'Empan à l’endroit {f} · à l’envers {b}',

  'ex.digits.name': 'Derniers chiffres',
  'ex.digits.desc': 'Une suite de chiffres de longueur imprévisible défile. Quand elle s’arrête, tape les N derniers dans le bon ordre.',
  'ex.digits.why': 'Running span : garder en tête seulement les derniers chiffres d’une séquence qui se met sans cesse à jour. Il entraîne la mise à jour de la mémoire de travail.',
  'ex.digits.watch': 'Retiens les {n} derniers',
  'ex.digits.recall': 'Tape les {n} derniers chiffres',
  'ex.digits.detail': '{ok}/{n} justes · empan {span}',

  'ex.rotate.name': 'Rotations',
  'ex.rotate.desc': 'Les deux formes sont-elles la même forme tournée, ou l’une est-elle le reflet de l’autre dans un miroir ?',
  'ex.rotate.why': 'Rotation mentale. Une méta-analyse de 217 études montre que les capacités spatiales s’améliorent avec l’entraînement, durablement et aussi sur des tâches proches non entraînées.',
  'ex.rotate.same': 'Pareilles',
  'ex.rotate.mirror': 'Miroir',

  'ex.towers.name': 'Tours',
  'ex.towers.desc': 'Déplace les boules pour reproduire l’objectif sans dépasser le nombre maximal de coups. Touche une tige pour prendre sa boule du haut, puis touche où la poser. Réfléchis avant de jouer !',
  'ex.towers.why': 'La Tour de Londres : planifier une suite de coups avant d’agir. C’est un test classique de planification, une fonction exécutive.',
  'ex.towers.goal': 'Objectif',
  'ex.towers.moves': 'Coups : {m} · maximum : {min}',
  'ex.towers.too': 'Plus de coups',
  'ex.towers.detail': 'Résolus dans le maximum : {ok}/{n}',

  'ex.odd.name': 'L’intrus',
  'ex.odd.desc': 'Toutes les formes sauf une ont un point commun (forme, couleur, remplissage ou nombre). Trouve celle qui ne l’a pas.',
  'ex.odd.why': 'Raisonnement inductif : trouver la règle commune cachée parmi des différences sans importance. Des tâches semblables figurent dans les batteries de Cambridge Brain Sciences.',
  'ex.odd.ask': 'Quel est l’intrus ?',
  'ex.odd.because': 'la différence : {dim}',
  'ex.odd.dimFill': 'Remplissage',

  'ex.math.name': 'Sprint de calcul',
  'ex.math.desc': 'Résous les calculs le plus vite possible. La réponse est envoyée dès que tu as tapé tous ses chiffres.',
  'ex.math.why': 'Beaucoup de calculs simples faits vite : le principe de la « thérapie par l’apprentissage » étudiée par l’équipe de Kawashima, qui a montré des gains d’attention, d’inhibition et de vitesse chez les personnes âgées.',
  'ex.math.detail': '{ok}/{n} · {secs} s',

  'ex.reading.name': 'Lecture rapide',
  'ex.reading.desc': 'Lis le texte À VOIX HAUTE, le plus vite possible tout en articulant bien. Puis réponds à une question.',
  'ex.reading.why': 'Lire à voix haute : l’autre moitié de la « thérapie par l’apprentissage » de l’équipe de Kawashima. La question finale vérifie que tu as vraiment lu.',
  'ex.reading.aloud': '🗣️ Lis à voix haute',
  'ex.reading.done': 'J’ai fini',
  'ex.reading.detail': '{wpm} mots/min · compréhension {ok}/{n}',

  'ex.vault.name': 'Coffre à mots',
  'ex.vault.desc': 'Mémorise les mots. Ensuite je t’en montrerai d’autres : dis-moi pour chacun si tu l’as déjà vu ou s’il est nouveau.',
  'ex.vault.why': 'Mémoire de reconnaissance : distinguer ce que tu as vu de ce qui est nouveau. Elle entraîne la mémoire épisodique.',
  'ex.vault.study': 'Mémorise ces mots',
  'ex.vault.done': 'J’ai fini',
  'ex.vault.seen': 'Déjà vu',
  'ex.vault.new': 'Nouveau',
  'ex.vault.result': '{n}/{t} justes',

  'ex.pairs.name': 'Paires',
  'ex.pairs.desc': 'Tu verras quelques paires formées d’un symbole et d’un mot, par ex. 🍎 🔗 marteau. Mémorise-les. Ensuite seul le symbole apparaît et tu choisis le mot qui allait avec. Pas d’audio : tout est visuel.',
  'ex.pairs.why': 'Associations de paires : relier deux éléments est l’une des tâches de mémoire épisodique les plus sensibles.',
  'ex.pairs.study': 'Chaque symbole a son mot : retiens lequel va avec lequel',
  'ex.pairs.tip': 'Ensuite tu ne verras que le symbole et tu choisiras son mot. Astuce : imagine une scène qui les relie, par ex. {sym} + « {word} ».',
  'ex.pairs.timer': '⏱ {s} secondes',
  'ex.pairs.ask': 'Avec quel mot allait-il ?',
  'ex.pairs.detail': '{ok}/{n} paires retenues',

  'color.red': 'ROUGE',
  'color.blue': 'BLEU',
  'color.green': 'VERT',
  'color.yellow': 'JAUNE',

  'result.title': 'Résultat',
  'check.title': 'Ton Neuro Score',
  'check.delta': '{d} depuis la dernière fois',
  'check.first': 'Première mesure enregistrée. Reviens demain !',
  'check.rescaled': 'Le score a été recalibré : voici ton nouveau point de départ. Les résultats précédents restent enregistrés mais ne sont pas comparés.',
  'check.doneToday': 'Tu as déjà fait la mesure du jour. Reviens demain pour te mesurer à nouveau !',

  'rank.0': 'Étincelle',
  'rank.1': 'Courant',
  'rank.2': 'Circuit',
  'rank.3': 'Réseau neuronal',
  'rank.4': 'Maître des synapses',

  'training.title': 'Salle de sport',
  'training.today': 'Fait aujourd’hui',

  'progress.title': 'Progrès',
  'progress.chart': 'Neuro Score',
  'progress.empty': 'Fais ta première mesure du jour pour voir le graphique.',
  'progress.calendar': '4 dernières semaines',
  'progress.domains': 'Profil par compétence',
  'progress.domainsHint': 'Basé sur le niveau atteint dans chaque exercice.',
  'progress.exercises': 'Niveaux et records',
  'progress.none': '—',
  'progress.stats': 'Jours actifs : {days} · Séances : {runs}',
  'progress.week': 'Cette semaine : {n}/4 jours d’entraînement',

  'settings.title': 'Réglages',
  'settings.name': 'Prénom',
  'settings.lang': 'Langue',
  'settings.sound': 'Effets sonores',
  'settings.relaxed': 'Rythme détendu (plus de temps pour répondre)',
  'settings.bigText': 'Grand texte',
  'settings.reset': 'Effacer toutes les données',
  'settings.resetConfirm': 'Vraiment effacer tous tes progrès ? C’est irréversible.',
  'ex.glance.example': 'Exemple : 🚗 au centre et l’étoile en haut à droite → réponds 🚗, puis touche la case en haut à droite.',
  'ex.reflex.example': 'Exemple : un panneau vert s’allume → touche-le tout de suite. S’il est rouge → ne touche à rien et attends.',
  'ex.path.example': 'Exemple : touche 1, puis 2, puis 3… Dans la version alternée : 1 → A → 2 → B → 3 → C.',
  'ex.pilot.example': 'Exemple : un cercle vert apparaît avec l’anneau plein → appuie sur SIGNAL avant que l’anneau soit vide. Un triangle ou un carré → n’appuie pas.',
  'ex.radar.example': 'Exemple : 2 boules s’allument → suis-les des yeux pendant qu’elles se mêlent aux autres, puis touche exactement ces 2.',
  'ex.clash.example': 'Exemple : le mot ROUGE écrit en bleu → avec la règle 🎨 réponds BLEU, avec la règle 📖 réponds ROUGE.',
  'ex.switch.example': 'Exemple : 7 dans un cadre bleu → IMPAIR. Le même 7 dans un cadre orange → PLUS GRAND que 5.',
  'ex.echo.example': 'Exemple 1-back : le carré du haut s’allume, puis juste après le même encore → appuie sur POSITION. Si c’est un autre → n’appuie pas.',
  'ex.grid.example': 'Exemple : 1 → 2 → 3 s’allument. Touche 1, 2, 3. S’il est écrit À L’ENVERS, touche 3, 2, 1.',
  'ex.digits.example': 'Exemple : 4 8 1 7 2 9 défilent et tu dois retenir les 3 derniers → tape 7 2 9.',
  'ex.vault.example': 'Exemple : tu as étudié « arbre » et « bateau ». « arbre » apparaît → Déjà vu. « tasse » apparaît → Nouveau.',
  'ex.pairs.example': 'Exemple : tu as vu la paire 🍎 – marteau. Plus tard 🍎 apparaît → choisis « marteau ».',
  'ex.rotate.example': 'Exemple : si en tournant la forme de droite tu obtiens celle de gauche → Pareilles. S’il te faudrait un miroir → Miroir.',
  'ex.towers.example': 'Exemple : l’objectif a le rouge en haut mais le bleu le couvre maintenant → déplace d’abord le bleu, puis place le rouge.',
  'ex.odd.example': 'Exemple : trois cercles rouges pleins et un cercle bleu plein → l’intrus est le bleu (la seule couleur différente).',
  'ex.math.example': 'Exemple : 7 + 8 = → tape 15. La réponse est envoyée dès que tous ses chiffres sont tapés.',
  'ex.reading.example': 'Exemple : lis le texte à voix haute, appuie sur « J’ai fini » et réponds à la question.',
  'fb.pilotRoad': 'reste sur la route',
  'fb.pilotMissed': 'c’était le cercle vert : appuie sur SIGNAL',
  'fb.pilotNotTarget': 'appuie seulement pour le cercle vert',
  'fb.pilotStray': 'aucun signal en vue : attends le cercle vert',
  'fb.oddHere': 'celui mis en évidence en vert',
  'fb.gridOrder': 'l’ordre numéroté sur les cases',
  'fb.right': 'Juste !',
  'fb.wrong': 'Faux',
  'fb.was': 'Bonne réponse : {v}',
  'fb.noGo': 'c’était rouge, ne touche pas',
  'fb.tooSlow': 'trop lent, touche plus tôt',
  'fb.otherPad': 'le panneau allumé',
  'fb.starHere': 'l’étoile est là où elle brille maintenant',
  'fb.minMoves': 'c’était faisable en {n} coups',
  'intro.tip': 'Le jeu s’adapte à toi : tu te tromperas environ une fois sur cinq. C’est normal : cela garde la difficulté proche de ton niveau.',
  'intro.practice': 'Essai guidé',
  'intro.practiceFirst': 'Première fois ? Fais un essai guidé : il est court et ne compte pas.',
  'practice.tag': 'Essai',
  'practice.done': 'Essai terminé !',
  'practice.doneSub': 'Tu connais maintenant les règles. Prêt pour le vrai ?',
  'result.accuracy': 'Précision : {pct} %',
  'result.combo': 'Meilleure série : ×{n}',
  'result.msgUp': 'Tu progresses : à partir d’ici le jeu devient un peu plus difficile.',
  'result.msgDown': 'Le niveau a un peu baissé pour que tu t’entraînes au bon endroit. C’est normal !',
  'result.msgSame': 'Niveau stable : tu consolides. Continue comme ça.',
  'result.history': 'Ton niveau dans le temps',
  'result.sinceFirst': '{pct} depuis la première fois',
  'result.newBadge': 'Nouveau succès !',
  'level.player': 'Niveau {n}',
  'level.up': 'Tu as atteint le niveau {n} !',
  'home.next': 'Prochain succès',
  'home.week': 'Objectif de la semaine : {n}/4 jours',
  'badges.title': 'Succès',
  'badges.count': '{n}/{t} obtenus',
  'settings.vibration': 'Vibration (sur téléphone)',
  'settings.reminder': 'Rappel quotidien',
  'settings.reminderHint': 'Télécharge un événement récurrent à ajouter au calendrier de ton téléphone ou de ton ordinateur.',
  'settings.reminderTime': 'Heure',
  'settings.reminderBtn': 'Ajouter au calendrier',
  'reminder.desc': 'Quelques minutes pour entraîner ton esprit',
  'badge.first.name': 'Premier pas',
  'badge.first.desc': 'Termine ton premier exercice',
  'badge.check.name': 'Première mesure',
  'badge.check.desc': 'Mesure ton Neuro Score pour la première fois',
  'badge.plan.name': 'Entraînement complet',
  'badge.plan.desc': 'Termine un entraînement du jour',
  'badge.streak3.name': 'Trois d’affilée',
  'badge.streak3.desc': 'Entraîne-toi 3 jours d’affilée',
  'badge.week4.name': 'Semaine complète',
  'badge.week4.desc': 'Entraîne-toi 4 jours dans la même semaine',
  'badge.streak7.name': 'Semaine en feu',
  'badge.streak7.desc': 'Entraîne-toi 7 jours d’affilée',
  'badge.combo10.name': 'Éclair',
  'badge.combo10.desc': '10 bonnes réponses d’affilée',
  'badge.explorer.name': 'Explorateur',
  'badge.explorer.desc': 'Essaie les 35 exercices',
  'badge.balanced.name': 'Esprit complet',
  'badge.balanced.desc': 'Entraîne les 9 compétences en 7 jours',
  'badge.levelups25.name': 'Ascension',
  'badge.levelups25.desc': 'Monte de niveau 25 fois',
  'badge.plans10.name': 'Régularité',
  'badge.plans10.desc': 'Termine 10 entraînements du jour',
  'badge.combo25.name': 'Tempête',
  'badge.combo25.desc': '25 bonnes réponses d’affilée',
  'badge.nback3.name': 'Écho profond',
  'badge.nback3.desc': 'Atteins le 3-back dans Écho',
  'badge.span7.name': 'Mémoire d’acier',
  'badge.span7.desc': 'Atteins un empan de 7 dans la Grille lumineuse',
  'badge.glance50.name': 'Œil de faucon',
  'badge.glance50.desc': 'Descends à environ 100 ms dans Coup d’œil',
  'badge.neuro800.name': 'Réseau neuronal',
  'badge.neuro800.desc': 'Obtiens au moins 800 au Neuro Score',
  'badge.streak30.name': 'Un mois ensemble',
  'badge.streak30.desc': 'Entraîne-toi 30 jours d’affilée',
  'settings.about': 'Jeu open source d’entraînement cérébral. Pour le plaisir uniquement : ce n’est pas un outil médical. L’activité physique, le sommeil et la vie sociale font aussi du bien au cerveau.',
  'share.action': 'Partager',
  'share.never': 'Ne plus proposer',
  'share.title': 'Partage cette étape',
  'share.close': 'Fermer',
  'share.badgeLabel': 'Étape franchie',
  'share.weekLabel': 'Jours d’entraînement cette semaine',
  'share.weekLabel1': 'Jour d’entraînement cette semaine',
  'share.weekBtn': 'Partager la semaine',
  'share.textBadge': 'J’ai franchi l’étape « {name} » sur Synapse Dojo. Quelques minutes par jour, gratuit et sans compte : {url}',
  'share.textWeek': 'Jours d’entraînement cette semaine sur Synapse Dojo : {n}. Quelques minutes par jour, gratuit et sans compte : {url}',
  'share.free': 'Gratuit · sans compte · sans publicité',
  'share.foot': 'Un jeu pour le plaisir, pas un outil médical',
  'share.done.first': 'Premier exercice terminé',
  'share.done.plan': 'Entraînement du jour terminé',
  'share.done.plans10': '10 entraînements du jour terminés',
  'share.done.week4': '4 jours d’entraînement dans la même semaine',
  'share.done.streak3': '3 jours d’entraînement d’affilée',
  'share.done.streak7': '7 jours d’entraînement d’affilée',
  'share.done.streak30': '30 jours d’entraînement d’affilée',
  'share.done.explorer': 'Les 35 exercices essayés',
  'share.done.balanced': 'Les 9 compétences entraînées en 7 jours',
  'share.note': 'L’image montre seulement cette étape : ni nom, ni scores, ni âge. Rien n’est envoyé tant que tu ne choisis pas où la partager.',
  'share.save': 'Enregistrer l’image',
  'share.copy': 'Copier le texte',
  'share.copied': 'Texte copié',
  'share.copyFailed': 'Impossible de copier le texte : sélectionne-le et copie-le à la main.',
  'settings.shareOffer': 'Proposer de partager les étapes',
  'privacy.shareH': 'Partage d’une étape',
  'privacy.share': 'L’image est dessinée sur ton appareil et montre seulement l’étape : ni nom, ni scores, ni âge. Rien n’est envoyé tant que tu ne choisis pas de la partager ; ensuite, les règles de confidentialité de l’application ou du réseau social choisi s’appliquent.',
  'guide.faq4Q': 'Puis-je partager mes étapes ?',
  'guide.faq4A': 'Oui, si tu le souhaites : dans Progrès, tu peux partager tes jours d’entraînement de la semaine et tes badges de régularité et d’exploration. Les scores et le Neuro Score restent privés, car chacun s’entraîne à son niveau et le Neuro Score n’est pas une mesure validée. Tu peux désactiver les propositions dans les Réglages.',
  'settings.data': 'Tes progrès',
  'settings.dataHint': 'Enregistre tes progrès dans un fichier pour en garder une copie ou les transférer vers un autre appareil ou une autre adresse du jeu : chacun a sa propre sauvegarde.',
  'settings.export': 'Exporter les progrès',
  'settings.import': 'Importer les progrès',
  'settings.importBad': 'Ce fichier n’est pas une sauvegarde valide de Synapse Dojo.',
  'settings.importConfirm': 'Remplacer les données actuelles par celles du fichier ({name}, {runs} exercices joués, le dernier le {last}) ? Tes progrès actuels seront perdus.',
  'settings.importDone': 'Progrès importés.',
  'privacy.title': 'Confidentialité et mentions légales',
  'privacy.updated': 'Dernière mise à jour : 5 novembre 2026',
  'privacy.dataH': 'Tes données restent sur ton appareil',
  'privacy.data': 'Ton nom, tes progrès et tes réglages sont enregistrés uniquement dans le navigateur de cet appareil (localStorage). Ils ne sont jamais envoyés à un serveur (sauf le résumé hebdomadaire du classement facultatif, si tu le rejoins : voir plus bas) et personne, pas même la personne qui gère le jeu, ne peut les voir. Ils disparaissent si tu effaces les données du navigateur ou utilises « Effacer toutes les données » : tu peux en garder une copie avec « Exporter les progrès » dans les Réglages.',
  'privacy.cookiesH': 'Ni compte ni cookies',
  'privacy.cookies': 'Pas besoin de s’inscrire, et le jeu n’utilise ni cookies, ni publicité, ni outils de profilage. Les polices et les fichiers du jeu sont servis par le même site, sans services tiers.',
  'privacy.hostingH': 'Hébergement',
  'privacy.hosting': 'La version publique est hébergée par Cloudflare (Cloudflare Pages). Comme tout serveur web, pour délivrer les pages et les protéger des attaques, Cloudflare traite des données techniques comme ton adresse IP et le type de navigateur, selon sa propre politique de confidentialité.',
  'privacy.statsH': 'Statistiques de visite',
  'privacy.stats': 'Uniquement dans la version publique, les visites sont comptées avec Cloudflare Web Analytics, qui n’utilise pas de cookies, n’enregistre rien dans ton navigateur et ne suit pas les personnes d’un site à l’autre : il ne montre que des données agrégées comme les pages vues, le pays et le type d’appareil. Les prénoms et les résultats des exercices ne sont jamais envoyés.',
  'privacy.boardH': 'Classement hebdomadaire facultatif',
  'privacy.board': 'Uniquement si tu le rejoins depuis les Réglages, après chaque séance le jeu envoie à son serveur (Cloudflare Workers avec une base de données D1) un résumé de la semaine en cours : jours d’entraînement et activités de chaque jour, évolution du niveau et meilleur niveau par exercice, utilisation du rythme détendu et, si tu l’as indiquée, ta tranche d’âge. Il est lié à un identifiant aléatoire et à un pseudo généré, jamais à ton nom, à ton e-mail ni au reste de tes progrès. Si tu crées un groupe d’amis ou en rejoins un, le serveur conserve aussi le nom du groupe, ses membres (visibles uniquement par eux) et les personnes bannies par son créateur. Lors de l’inscription, Cloudflare Turnstile vérifie que tu n’es pas un robot, selon la politique de confidentialité de Cloudflare. Les résultats hebdomadaires sont effacés après 8 semaines et tout le reste après 90 jours sans utilisation ; « Quitter et effacer mes données » ou « Effacer toutes les données » les effacent immédiatement, et un groupe sans membres est supprimé. La base légale est ton consentement, que tu peux retirer à tout moment en quittant le classement.',
  'privacy.medicalH': 'Pas un dispositif médical',
  'privacy.medical': 'Synapse Dojo est un jeu pour le plaisir. Ce n’est pas un dispositif médical, il ne pose aucun diagnostic et ne promet pas de prévenir, ralentir ou soigner la démence, le déclin cognitif ou tout autre problème de santé. Les scores indiquent seulement comment tu te débrouilles dans les exercices. Pour toute question de santé, parle à un médecin.',
  'privacy.contactH': 'Contact',
  'privacy.contact': 'Questions sur le jeu ou tes données : {contact}',
  'privacy.open': 'Ouvrir le jeu',

  'license.title': 'Licence et Conditions',
  'license.subtitle': 'Licence logicielle, utilisations autorisées et droits d\'auteur',
  'license.authorH': 'Auteur et Propriété Intellectuelle',
  'license.authorP': 'Synapse Dojo est un projet original et indépendant créé par Sergio Dogliani. Tous droits commerciaux réservés.',
  'license.polyformH': 'Licence PolyForm Noncommercial 1.0.0',
  'license.polyformP': 'Le logiciel est distribué sous la licence PolyForm Noncommercial 1.0.0. Vous êtes libre de consulter le code source, de l\'exécuter et de l\'utiliser pour l\'étude personnelle, l\'éducation, la recherche et des fins non commerciales. Toute utilisation commerciale non autorisée, revente, monétisation ou redistribution est strictement interdite.',
  'license.permittedH': 'Utilisations Autorisées',
  'license.permittedP': 'Étude personnelle, entraînement cognitif, recherche non commerciale, tests et usage privé sans finalité commerciale.',
  'license.restrictedH': 'Restrictions Commerciales',
  'license.restrictedP': 'Vous ne pouvez pas utiliser, modifier ou distribuer ce logiciel contre une rémunération, pour un avantage commercial, de la publicité ou pour l\'intégrer à des produits payants sans licence commerciale écrite de l\'auteur.',
  'license.fontsH': 'Polices et Ressources',
  'license.fontsP': 'La police Nunito est distribuée sous licence SIL Open Font License 1.1. Les paradigmes des exercices cognitifs sont dans le domaine public.',
  'license.linksH': 'Documentation et Liens Officiels',
  'license.officialLink': 'Lire le texte officiel de PolyForm Noncommercial 1.0.0',
  'license.repoLink': 'Voir le fichier LICENSE sur GitHub',
  'license.open': 'Ouvrir le jeu',

  'domain.coordination': "Coordination",
  'shape.circle': "Cercle",
  'shape.square': "Carré",
  'shape.triangle': "Triangle",
  'shape.diamond': "Losange",
  'ex.span.name': "Empan de chiffres",
  'ex.span.desc': "Mémorisez la séquence de chiffres et tapez-la dans l’ordre demandé",
  'ex.span.why': "L’empan de chiffres mesure la capacité de mémoire à court terme et de mémoire de travail verbale.",
  'ex.span.example': "4 8 1 9   Tapez les chiffres dans l’ordre direct ou inverse",
  'ex.span.forward': "À l’endroit",
  'ex.span.backward': "À l’envers",
  'ex.span.watch': "Mémorisez {n} chiffres",
  'ex.span.recallFor': "Tapez les chiffres dans l’ordre",
  'ex.span.recallBack': "Tapez les chiffres à l’envers !",
  'ex.span.detail': "{ok}/{n} corrects · empan {span}",
  'ex.stories.name': "Mémoire d’histoires",
  'ex.stories.desc': 'Lis une ou plusieurs courtes scènes puis, après une pause avec une petite tâche, rappelle-toi les détails de chacune',
  'ex.stories.why': 'Inspiré des tâches de mémoire logique : se souvenir de ce qui s’est passé, où et quand, dans de courts récits exerce la mémoire épisodique.',
  'ex.stories.example': "Lisez attentivement l’histoire et répondez aux questions sur les détails",
  'ex.stories.title': "Scène {n}",
  'ex.stories.ready': "J’ai lu, je suis prêt !",
  'ex.stories.qItem': "Que portait {name} ?",
  'ex.stories.qPlace': "Où se trouvait {name} ?",
  'ex.stories.qTime': "Quand la scène s’est-elle déroulée ?",
  'ex.stories.qTimeOf': 'À quel moment {name} se trouvait là ?',
  'ex.stories.filler': 'Pause : pair ou impair ? Prends ton temps, cela ne compte pas dans le score.',
  'ex.stories.detail': "{ok}/{n} détails corrects",
  'ex.stories.text': '{name} portait {item}. Cette personne se trouvait {place} {time}, où elle a terminé sa mission.',
  'ex.anagrams.letters': 'lettres',
  'ex.resources.task8': 'Tournesols',
  'ex.resources.task7': 'Poisson',
  'ex.resources.task6': 'Œufs',
  'ex.resources.task5': 'Tomates',
  'ex.resources.task4': 'Pain',
  'ex.resources.task3': 'Miel',
  'ex.resources.task2': 'Fromage',
  'ex.resources.task1': 'Pommes',
  'ex.resources.confirm': 'Acheter',
  'ex.reaction.target': 'Objectif : < {ms} ms',
  'result.timeBonusPts': 'pts temps',
  'result.speedBonus': 'Bonus de vitesse (+10 XP)',
  'ex.flanker.name': "Test de Flanker",
  'ex.flanker.desc': "Concentrez-vous sur la flèche centrale et ignorez les flèches latérales",
  'ex.flanker.why': "La tâche d’Eriksen Flanker évalue l’attention visuelle sélective et l’inhibition des distracteurs adjacents.",
  'ex.flanker.example': "← ← → ← ←   La cible est la flèche du milieu (→)",
  'ex.flanker.instruction': "Touchez la direction de la flèche centrale",
  'ex.flanker.detail': "{ok}/{n} corrects · {ms} ms",
  'ex.gonogo.name': "Go / No-Go",
  'ex.gonogo.desc': "Touchez vite sur les cibles vertes ; retenez-vous sur les signaux rouges",
  'ex.gonogo.why': 'Retenir une réponse automatique quand un signal d’arrêt apparaît : une manière classique d’exercer et de mesurer l’inhibition de la réponse. Peu de preuves montrent que l’entraîner améliore la maîtrise de soi au quotidien.',
  'ex.gonogo.example': "● = Touchez vite !   ✕ = Ne touchez pas !",
  'ex.gonogo.hint': "Touchez sur ●, arrêtez-vous sur ✕",
  'ex.gonogo.detail': "{ok}/{n} corrects · {ms} ms",
  'ex.msit.name': "Interférence Multiple (MSIT)",
  'ex.msit.desc': "Trouvez le chiffre différent des autres quelle que soit sa position",
  'ex.msit.why': 'Inspiré du MSIT, une tâche de recherche : l’identité du nombre entre en conflit avec sa position, il faut donc filtrer l’interférence. Il exerce et mesure l’attention sélective.',
  'ex.msit.example': "1 2 1   Le chiffre différent est 2",
  'ex.msit.hint': "Quel chiffre est différent ?",
  'ex.msit.detail': "{ok}/{n} corrects · {ms} ms",
  'ex.binding.name': "Couleur & Forme",
  'ex.binding.desc': "Trouvez l’objet combinant la bonne forme et la bonne couleur avant la fin du temps",
  'ex.binding.why': 'Recherche visuelle par conjonction (Treisman et Gelade, 1980) : la cible partage sa couleur ou sa forme avec les autres éléments, il faut donc combiner les deux caractéristiques pour la trouver.',
  'ex.binding.example': "Trouvez le Cercle Bleu parmi des Carrés Bleus et des Cercles Rouges",
  'ex.binding.find': "Trouver",
  'ex.binding.detail': "{ok}/{n} corrects",// sorting
  'ex.sorting.name': 'Tri de Cartes',
  'ex.sorting.desc': 'Déduisez la règle secrète (Couleur, Forme ou Nombre) grâce aux retours et adaptez-vous lorsqu\'elle change',
  'ex.sorting.why': 'Inspiré du Wisconsin Card Sorting Test (WCST), développe la flexibilité cognitive, l\'induction de règles et l\'adaptation au changement.',
  'ex.sorting.example': 'Carte avec 3 triangles rouges : associez par forme (triangle), couleur (rouge) ou nombre (3). Trouvez la règle par essais !',
  'ex.sorting.hint': 'Associez par Couleur, Forme ou Nombre. La règle secrète change périodiquement !',
  'ex.sorting.detail': '{ok}/{n} corrects · {cats} règles',
  'ex.sorting.secretRule': 'Trouvez la règle secrète',
  'ex.sorting.dimColor': 'Couleur',
  'ex.sorting.dimShape': 'Forme',
  'ex.sorting.dimCount': 'Nombre',
  'ex.sorting.refLabel': 'Cartes de référence (touchez pour associer)',
  'ex.sorting.targetLabel': 'Carte à associer',
  'ex.sorting.feedbackStart': 'Faites une hypothèse : touchez une carte pour tester Couleur, Forme ou Nombre',
  'ex.sorting.correct': 'Correct ! Règle confirmée',
  'ex.sorting.wrong': 'Incorrect ! Ce n\'est pas la règle active',
  'ex.sorting.ruleShifted': 'La règle a changé ! Trouvez le nouveau critère',
  'ex.sorting.lostRule': 'Règle perdue ! Maintenez le critère découvert',
  'ex.sorting.perseveration': 'Attention : vous aviez déjà éliminé cette règle !',
  'ex.sorting.eliminated': 'Éliminé : {dim} n\'est pas la règle',

  
  'ex.resources.name': 'Étal du marché',
  'ex.resources.desc': 'Achète des marchandises à revendre : sans dépenser plus que ce que tu as, atteins le gain indiqué avant la fin de la barre',
  'ex.resources.why': 'C’est le « problème du sac à dos », étudié en sciences cognitives (Murawski et Bossaerts, 2016) : trouver la meilleure combinaison dans une limite demande de la planification, de la mémoire de travail et de comparer coûts et bénéfices.',
  'ex.resources.example': 'Exemple : tu as 50 pièces. Les pommes coûtent 20 et rapportent 25, le pain coûte 30 et rapporte 30, le miel coûte 40 et rapporte 35 → pommes et pain rapportent 55 pour 50 pièces : mieux que le miel seul.',
  'ex.resources.detail': "{ok}/{n} terminés",
  'ex.reaction.name': "Temps de réaction",
  'ex.reaction.desc': "Touchez au plus vite dès que l’écran devient vert",
  'ex.reaction.why': 'Temps de réaction simple : la rapidité avec laquelle tu réponds à un signal, après une attente variable qui demande de rester alerte.',
  'ex.reaction.example': "Attendez le vert, puis touchez immédiatement",
  'ex.reaction.ready': "Préparez-vous",
  'ex.reaction.wait': "Attendez le vert...",
  'ex.reaction.tapNow': "TOUCHEZ VITE !",
  'ex.reaction.early': "Faux départ !",
  'ex.reaction.penalty': "Attendez toujours le signal vert",
  'ex.reaction.detail': "Moyenne : {ms} ms · Record : {best} ms ({ok}/{n})",
  'ex.dots.name': "Estimation de points",
  'ex.dots.desc': "Estimez d’un coup d’œil quel côté contient le plus de points sans compter",
  'ex.dots.why': 'Exerce le système numérique approximatif (ANS) : estimer d’un coup d’œil quel groupe est le plus grand, sans compter.',
  'ex.dots.example': "Touchez vite le côté avec le plus de points",
  'ex.dots.hint': "Quel côté a le plus de points ?",
  'ex.dots.left': "Gauche",
  'ex.dots.right': "Droite",
  'ex.dots.detail': "{ok}/{n} corrects",
  'ex.anagrams.name': "Anagrammes",
  'ex.anagrams.desc': "Remettez les lettres dans l’ordre pour révéler le mot caché",
  'ex.anagrams.why': "Sollicite la mémoire de travail orthographique, l’accès lexical et la recombinaison phonologique.",
  'ex.anagrams.example': "Touchez les lettres dans le bon ordre pour écrire le mot",
  'ex.anagrams.hint': "Touchez les lettres pour reconstituer le mot",
  'ex.anagrams.detail': "{ok}/{n} résolus",
  'ex.fluency.name': "Sprint de mots",
  'ex.fluency.desc': "Validez au vol les mots qui commencent par la lettre cible",
  'ex.fluency.why': "Décisions orthographiques rapides : lire un mot et vérifier sa première lettre sous la pression du temps entraîne la reconnaissance rapide des mots et le choix de la réponse. (C’est une tâche de classification rapide, pas un test de fluence verbale, où l’on produit soi-même des mots.)",
  'ex.fluency.example': "Touchez si le mot commence par la lettre demandée",
  'ex.fluency.targetLetter': "Lettre cible :",
  'ex.fluency.detail': "{ok}/{n} corrects",// matrix
  'ex.matrix.name': 'Matrice Spatiale',
  'ex.matrix.desc': 'Mémorisez la position des blocs bleus et replacez-les après rotation mentale',
  'ex.matrix.why': 'Demande une rotation mentale et une transformation de coordonnées spatiales tout en gardant une disposition en mémoire.',
  'ex.matrix.example': 'Mémorisez le motif et replacez les blocs après rotation mentale',
  'ex.matrix.memorize': 'Mémorisez les blocs bleus',
  'ex.matrix.itemsToRemember': 'blocs à mémoriser',
  'ex.matrix.same': 'Touchez les cases qui étaient illuminées',
  'ex.matrix.noRot': 'Même position (sans rotation)',
  'ex.matrix.rot90': 'Tournez de 90° dans le sens horaire : touchez les nouvelles positions',
  'ex.matrix.rot90Badge': '90° sens horaire',
  'ex.matrix.rot180': 'Tournez de 180° : touchez les nouvelles positions',
  'ex.matrix.rot180Badge': '180° inversé',
  'ex.matrix.rot270': 'Tournez de 90° dans le sens antihoraire : touchez les nouvelles positions',
  'ex.matrix.rot270Badge': '90° sens antihoraire',
  'ex.matrix.detail': '{ok}/{n} corrects',
  'ex.matrix.confirm': 'Confirmer ({sel}/{n})',

  
  'ex.tapSeq.name': "Tap bilatéral",
  'ex.tapSeq.desc': "Coordonnez vos deux pouces pour reproduire des séquences alternées",
  'ex.tapSeq.why': 'Des séquences de tapes à gauche et à droite : un exercice de coordination bimanuelle et d’attention. Rien ne prouve qu’une application de ce type renforce le corps calleux.',
  'ex.tapSeq.example': "◀ ▶ ◀ ▶   Suivez le rythme avec les deux pouces",
  'ex.tapSeq.hint': "Touchez gauche et droite dans l’ordre indiqué avant la fin du temps",
  'ex.tapSeq.detail': "{ok}/{n} séquences réussies",
  'ex.swipePattern.name': "Swipe bilatéral",
  'ex.swipePattern.desc': 'Fais les deux gestes ensemble, avant la fin de la barre : deux pouces sur téléphone ; sur ordinateur W A S D pour la gauche et les flèches pour la droite (à la souris, l’un après l’autre).',
  'ex.swipePattern.why': "Les gestes bimanuals opposés stimulent le découplage spatial et la coordination asymétrique.",
  'ex.swipePattern.example': "Glissez pouce gauche vers le haut ↑ et pouce droit vers le bas ↓",
  'ex.swipePattern.hint': 'Fais les deux gestes ensemble, avant la fin de la barre : deux pouces sur téléphone ; sur ordinateur W A S D pour la gauche et les flèches pour la droite (à la souris, l’un après l’autre).',
  'ex.swipePattern.together': 'Les deux mains ensemble !',
  'ex.swipePattern.detail': "{ok}/{n} motifs corrects",
  'ex.rhythm.name': "Rythme bilatéral",
  'ex.rhythm.desc': "Synchronisez les frappes gauche et droite sur le tempo du métronome",
  'ex.rhythm.why': 'Synchronisation sensorimotrice : taper en rythme exerce la précision temporelle et la coordination entre les mains.',
  'ex.rhythm.example': "Frappez gauche et droite en alternance au rythme du tempo",
  'ex.rhythm.hint': 'Touche en rythme avec la main indiquée. Les 3 premiers battements servent à trouver le rythme ; ensuite le point doit tomber dans la zone verte.',
  'ex.rhythm.detail': "{ok}/{n} en rythme · écart {ms} ms",
  'ex.crossMove.name': "Mouvements croisés",
  'ex.crossMove.desc': "Traversez la ligne médiane du corps : répondez du côté opposé",
  'ex.crossMove.why': 'Compatibilité spatiale stimulus-réponse : répondre du même côté ou du côté opposé, selon la consigne, oblige à surmonter l’impulsion naturelle de répondre du même côté.',
  'ex.crossMove.example': "Cible à gauche + \"Croisez\" -> Touchez le bouton de DROITE",
  'ex.crossMove.same': "Même côté : Touchez le côté correspondant",
  'ex.crossMove.cross': "CROISEZ : Touchez le bouton OPPOSÉ !",
  'ex.crossMove.detail': "{ok}/{n} corrects · {ms} ms",
  'ex.dualTask.name': "Double tâche bilatérale",
  'ex.dualTask.desc': "Maintenez la touche à gauche tout en répondant avec la main droite",
  'ex.dualTask.why': 'Double tâche motrice et cognitive : une main continue d’appuyer pendant que l’autre décide pair ou impair, il faut donc partager ton attention entre les deux.',
  'ex.dualTask.example': "Maintenez enfoncé à gauche pendant que la main droite choisit Pair / Impair",
  'ex.dualTask.hint': 'Gardez la touche gauche enfoncée en choisissant Pair / Impair avant la fin de la barre',
  'ex.dualTask.hold': "Maintenir (GAUCHE)",
  'ex.dualTask.even': "Pair",
  'ex.dualTask.odd': "Impair",
  'ex.dualTask.notHolding': "La touche gauche n’était pas maintenue !",
  'ex.dualTask.detail': "{ok}/{n} corrects",

  'board.title': 'Classement de la semaine',
  'board.nick': '{animal} {adj} {n}',
  'board.tab.days': 'Régularité',
  'board.tab.improvement': 'Progrès',
  'board.tab.best': 'Meilleur niveau',
  'board.explain.days': '10 points par jour d’entraînement, plus 1 par exercice ou Neuro check, jusqu’à 12 par jour (trois entraînements). Ce qui compte le plus, c’est de répartir l’entraînement sur la semaine.',
  'board.explain.improvement': 'De combien ton niveau a monté depuis le début de la semaine : chacun se mesure à son propre point de départ. Un nouvel exercice part de son premier niveau.',
  'board.explain.best': 'Ton meilleur niveau de la semaine dans un exercice.',
  'board.explain.relaxed': 'Tu joues à rythme détendu : ton classement regroupe donc les joueurs à rythme détendu.',
  'board.value.improvement': '{v} pts',
  'board.allExercises': 'Tous les exercices',
  'board.exercise': 'Exercice',
  'board.ageBand': 'Tranche d’âge',
  'board.band.all': 'Tous âges',
  'board.band.u30': 'Moins de 30 ans',
  'board.band.30-49': '30–49',
  'board.band.50-64': '50–64',
  'board.band.65-74': '65–74',
  'board.band.75+': '75 ans et plus',
  'board.you': 'toi',
  'board.players': '{n} joueurs cette semaine',
  'board.reset': 'Une nouvelle semaine commence le lundi : tout le monde repart de zéro.',
  'board.empty': 'Personne pour l’instant cette semaine. Entraîne-toi et ouvre le classement !',
  'board.notYet': 'Tu n’es pas encore dans ce classement : entraîne-toi cette semaine pour y apparaître.',
  'board.loading': 'Chargement…',
  'board.err.offline': 'Pas de connexion. Réessaie une fois en ligne.',
  'board.err.human_check': 'La vérification anti-robot a échoué. Réessaie.',
  'board.err.server': 'Un problème est survenu. Réessaie plus tard.',
  'home.board': 'Classement de la semaine',
  'home.boardSub': 'Régularité et progrès, semaine après semaine',
  'home.boardRank': 'Régularité : n° {rank} sur {n} cette semaine',
  'settings.board': 'Classement de la semaine',
  'settings.boardHint': 'Facultatif. Chaque semaine, compare avec d’autres joueurs la fréquence de tes entraînements et tes progrès. Seul un résumé de la semaine est envoyé (jours d’entraînement, évolution du niveau, meilleur niveau par exercice) sous un pseudo aléatoire : ni nom, ni e-mail, ni compte. Tu peux quitter à tout moment et tout est effacé.',
  'settings.boardAge': 'Tranche d’âge (facultatif, pour te comparer aux personnes de ton âge)',
  'settings.boardNoAge': 'Je préfère ne pas le dire',
  'settings.boardJoin': 'Rejoindre le classement',
  'settings.boardJoining': 'Inscription…',
  'settings.boardMember': 'Tu es dans le classement sous le pseudo {name}.',
  'settings.boardOpen': 'Ouvrir le classement',
  'settings.boardRename': 'Nouveau pseudo',
  'settings.boardLeave': 'Quitter et effacer mes données',
  'settings.boardLeaveConfirm': 'Quitter le classement ? Tes résultats seront effacés du serveur.',

  'board.value.points': '{n} pts',
  'board.detail.days': '{days} j · {n} act.',
  'board.players1': '1 joueur cette semaine',
  'board.scope': 'Classement',
  'board.scope.all': 'Tout le monde',
  'board.groups': 'Groupes',
  'groups.title': 'Groupes d’amis',
  'groups.hint': 'Crée un groupe et envoie le lien ou le code à ta famille et à tes amis : seuls les membres voient le groupe et son classement.',
  'groups.empty': 'Tu ne fais encore partie d’aucun groupe.',
  'groups.members': '{n} membres',
  'groups.members1': '1 membre',
  'groups.code': 'Code {code}',
  'groups.open': 'Classement',
  'groups.invite': 'Inviter',
  'groups.copied': 'Invitation copiée : colle-la dans un message.',
  'groups.inviteText': 'Entraîne-toi avec moi sur Synapse Dojo ! Rejoins mon groupe « {name} » : {url}',
  'groups.leave': 'Quitter',
  'groups.leaveConfirm': 'Quitter le groupe « {name} » ?',
  'groups.create': 'Créer un groupe',
  'groups.namePlaceholder': 'Nom du groupe (ex. Famille)',
  'groups.createBtn': 'Créer',
  'groups.join': 'Rejoindre avec un code',
  'groups.codePlaceholder': 'Code d’invitation',
  'groups.joinBtn': 'Rejoindre',
  'groups.err.not_found': 'Aucun groupe ne correspond à ce code.',
  'groups.err.limit': 'Tu fais déjà partie du nombre maximal de groupes (10).',
  'groups.err.full': 'Ce groupe est complet (100 membres).',
  'groups.err.bad_name': 'Choisis un nom de 1 à 30 caractères.',
  'groups.err.not_member': 'Tu ne fais plus partie de ce groupe.',
  'invite.title': 'Invitation à « {name} »',
  'invite.text': 'Pour rejoindre le groupe, participe au classement de la semaine : c’est facultatif et tu peux le quitter quand tu veux.',
  'invite.textMember': 'Rejoins le groupe pour te comparer à eux chaque semaine.',
  'invite.join': 'Rejoindre le groupe',
  'invite.dismiss': 'Non merci',
  'prompt.title': 'Classement de la semaine',
  'prompt.text': 'Envie de comparer ta régularité et tes progrès avec d’autres joueurs, ou avec des amis dans un groupe privé ? C’est entièrement facultatif : participe seulement si tu en as envie, et quitte quand tu veux.',
  'prompt.join': 'En savoir plus',
  'prompt.later': 'Pas maintenant',
  'prompt.never': 'Ne plus me demander',
  'settings.boardGroups': 'Groupes d’amis',

  'board.bandHint': 'Indique ta tranche d’âge dans les Réglages pour te comparer aux personnes de ton âge.',
  'home.boardGap': 'Encore {n} points pour gagner une place',
  'home.boardGap1': 'Encore 1 point pour gagner une place',

  'ex.resources.money': '🪙 Dépensé {cost} sur {budget} · il reste {left}',
  'ex.resources.over': '🪙 Dépensé {cost} sur {budget} : trop, retire quelque chose',
  'ex.resources.total': '📈 Gain : {val} · objectif : au moins {target}',
  'ex.resources.cost': 'Coûte {n} 🪙',
  'ex.resources.gain': 'Rapporte {n} 🪙',
  'ex.resources.below': 'Tu as gagné {val} : en dessous du minimum de {target} (le maximum possible était {n})',

  'groups.creator': 'créateur',
  'groups.idle': 'Pas encore d’entraînement cette semaine',
  'groups.remove': 'Retirer du groupe',
  'groups.removeConfirm': 'Retirer {name} de « {group} » ? Le code d’invitation permettra de revenir.',

  'settings.saved': 'Enregistré',

  'groups.copyCode': 'Copier le code',
  'groups.codeCopied': 'Code copié',
  'groups.copyFailed': 'Copie impossible : sélectionne le code et copie-le à la main',
  'groups.ban': 'Bannir du groupe',
  'groups.banConfirm': 'Bannir {name} de « {group} » ? Cette personne sera retirée du groupe et ne pourra plus revenir, même avec le code d’invitation.',
  'groups.actionsHint': '✕ retire du groupe (retour possible avec le code) · 🚫 bannit (retour impossible)',
  'groups.bannedTitle': 'Bannis ({n})',
  'groups.unban': 'Réadmettre',
  'groups.err.banned': 'Tu ne peux pas rejoindre ce groupe : son créateur t’a banni.',

  'groups.newCode': 'Nouveau code',
  'groups.newCodeConfirm': 'Remplacer le code de « {group} » ? L’ancien code et les liens d’invitation ne fonctionneront plus. Les membres restent dans le groupe.',
  'groups.newCodeDone': 'Nouveau code créé : l’ancien ne fonctionne plus',
};

const words: string[] = [
  "arbre", "bateau", "bougie", "dauphin", "éléphant", "papillon", "glace", "île", "lampe", "montagne",
  "nuage", "parapluie", "piano", "cahier", "fusée", "chaise", "tambour", "œuf", "volcan", "sac à dos",
  "bague", "vélo", "coussin", "dragon", "ciseaux", "girafe", "clé", "citron", "marteau", "navire",
  "horloge", "pingouin", "araignée", "miroir", "tasse", "violon", "château", "fraise", "mouette", "loup",
  "médaille", "nid", "casserole", "chaussure", "train", "valise", "comète", "phare", "gland", "pain",
  "brique", "cheval", "tente", "éponge", "poire", "bouteille", "couronne", "cerf-volant", "rivière", "étoile",
  "rose", "pont", "vent", "bois", "cour", "murs", "pied", "main", "lune", "ciel",
  "lion", "ours", "tour", "dent", "noix", "sang", "voix", "robe", "jupe", "chat",
  "soif", "bord", "port", "baie", "dune", "parc", "coin", "bras", "peau", "boue",
  "plage", "forêt", "sable", "terre", "herbe", "fleur", "livre", "route", "canal", "ombre",
  "fumée", "verre", "acier", "cuivre", "argent", "repas", "sucre", "table", "boîte", "corde",
  "bâton", "plume", "flèche", "canot", "avion", "wagon", "métro", "trace", "champ", "vigne",
  "ferme", "poche", "savon", "brosse", "tissu", "rideau", "valse", "chant", "geste", "bruit",
  "soleil", "jardin", "source", "fleuve", "falaise", "caverne", "vallon", "colline", "sentier", "village",
  "maison", "palais", "hangar", "moulin", "grenier", "clocher", "balcon", "rampes", "cuisine", "meuble",
  "tiroir", "buffet", "nappes", "assiette", "carafe", "poêles", "panier", "canard", "faucon", "renard",
  "blaireau", "castor", "cygnes", "pigeon", "faisan", "saumon", "truite", "flotte", "fenêtre", "musique",
  "concert", "théâtre", "peinture", "tableau", "gravure", "journal", "carnets", "pendule", "cloches", "guitare",
  "trompette", "clarine", "flûtes", "balance", "compas", "lunette", "jumelle", "boussole", "lanterne", "bouclier",
  "fontaine", "pyramide", "tempête", "tonnerre", "éclairs", "tourbillon", "blizzard", "glaciers", "banquise", "brouillard",
  "clairière", "chapelle", "forteresse", "citadelle", "bâtiment", "cathédrale", "télescope", "microscope", "navettes", "armoiriel",
];

const passages: Passage[] = [
  {
    text: "Le phare de l’île de Pierreblanche fut allumé pour la première fois par une nuit de brouillard de 1891. Le gardien, un ancien pêcheur nommé Arthur, montait les cent trente marches de la tour deux fois par jour pour nettoyer la lentille et remonter le mécanisme qui faisait tourner la lumière. Les nuits de tempête, il ne dormait pas : il restait en haut à surveiller la mer, avec un thermos de café et une vieille radio. En quarante ans de service, aucun bateau ne fit naufrage près de l’île.",
    question: "Combien de marches avait la tour ?",
    answers: [
      "Cent trente",
      "Trois cents",
      "Quatre-vingt-onze",
    ],
  },
  {
    text: "Les abeilles qui trouvent un bon champ de fleurs retournent à la ruche et exécutent une danse particulière. L’angle de la danse par rapport à la verticale indique la direction de la nourriture par rapport au soleil, tandis que la durée de la danse indique la distance. Les autres abeilles suivent les mouvements avec leurs antennes, puis s’envolent tout droit vers l’endroit indiqué. Ainsi, une seule éclaireuse peut guider des centaines de compagnes.",
    question: "Qu’indique la durée de la danse ?",
    answers: [
      "La distance de la nourriture",
      "Le type de fleur",
      "L’heure de la journée",
    ],
  },
  {
    text: "Marthe avait décidé d’apprendre à faire du pain. Le premier sortit du four dur comme une pierre, le deuxième était cru au milieu. À la troisième tentative, elle comprit le problème : la cuisine était trop froide et la pâte ne levait pas bien. Depuis, elle laisse reposer la pâte près du radiateur, couverte d’un torchon, et chaque dimanche ses voisins frappent à la porte, attirés par l’odeur.",
    question: "Pourquoi le pain de Marthe ne réussissait-il pas ?",
    answers: [
      "La cuisine était trop froide",
      "Elle mettait trop de sel",
      "Le four était cassé",
    ],
  },
  {
    text: "En montagne, la température baisse en moyenne d’environ six degrés et demi tous les mille mètres d’altitude. C’est pourquoi, même en plein été, on trouve de la neige sur les plus hauts sommets. Les randonneurs expérimentés emportent toujours un pull dans leur sac, même s’il fait chaud dans la vallée. Le vent aussi peut rendre le froid bien plus sensible que ce qu’indique le thermomètre.",
    question: "De combien baisse la température tous les mille mètres ?",
    answers: [
      "D’environ six degrés et demi",
      "D’environ deux degrés",
      "D’environ quinze degrés",
    ],
  },
  {
    text: "Dans le petit village de Valfonde, le marché a lieu chaque jeudi sur la place. L’étal le plus fréquenté n’est ni celui des fruits ni celui des fromages, mais celui d’Élie, qui répare des horloges et des radios depuis quarante ans. Les gens lui apportent des appareils que plus personne ne sait réparer, et lui, avec une loupe et une pince, réussit presque toujours à les faire repartir.",
    question: "Quel est le métier d’Élie ?",
    answers: [
      "Il répare des horloges et des radios",
      "Il vend des fromages",
      "Il cultive des fruits",
    ],
  },
  {
    text: "La pieuvre a trois cœurs et le sang bleu. Deux cœurs pompent le sang vers les branchies, le troisième le pousse dans le reste du corps. C’est aussi une reine du déguisement : grâce à des cellules spéciales de sa peau, elle peut changer de couleur en une fraction de seconde pour se camoufler ou communiquer. Certaines pieuvres transportent même des coquilles de noix de coco comme abri portable.",
    question: "Combien de cœurs a la pieuvre ?",
    answers: [
      "Trois",
      "Un",
      "Huit",
    ],
  },
  {
    text: "Les chauffeurs de taxi londoniens doivent mémoriser plus de vingt-cinq mille rues et des milliers de monuments pour réussir le redoutable examen du \"Knowledge\". Des examens d’imagerie cérébrale ont révélé que cet apprentissage spatial intensif augmente physiquement le volume de leur hippocampe postérieur, la région du cerveau dédiée à la navigation et à la mémoire des lieux.",
    question: "Quelle zone cérébrale se développe chez les chauffeurs de taxi londoniens ?",
    answers: [
      "L’hippocampe postérieur",
      "Le cortex moteur primaire",
      "Le lobe frontal gauche",
    ],
  },
  {
    text: "Les geckos peuvent grimper le long de parois de verre verticales et courir au plafond la tête en bas. Cet exploit n’est dû ni à de la colle ni à des ventouses, mais à des millions de soies microscopiques ramifiées sur leurs doigts, appelées spatules. Ces poils interagissent avec la surface par de faibles forces électrostatiques moléculaires nommées forces de van der Waals.",
    question: "Quelle force physique permet aux geckos d’adhérer à une vitre lisse ?",
    answers: [
      "Les forces microscopiques de van der Waals",
      "Une succion par ventouses",
      "Une colle organique sécrétée par la peau",
    ],
  },
  {
    text: "En 1901, des pêcheurs d’éponges découvrirent dans une épave antique près de l’île d’Anticythère un mécanisme en bronze corrodé. Daté du IIe siècle avant notre ère, cet appareil comptait des dizaines d’engrenages différentiels miniatures d’une extrême précision, conçus pour calculer les phases de la Lune et prédire les éclipses avec une justesse astronomique.",
    question: "À quoi servait le mécanisme d’Anticythère découvert dans l’épave ?",
    answers: [
      "À calculer les cycles astronomiques et les éclipses",
      "À sonder la profondeur de la mer",
      "À mesurer la vitesse du vent marin",
    ],
  },
  {
    text: "Pendant la Seconde Guerre mondiale, au centre secret de Bletchley Park, des cryptanalystes menés par Alan Turing travaillèrent jour et nuit pour percer le code militaire allemand Enigma. Ils conçurent d’imposantes machines électromécaniques appelées Bombes, capables d’examiner des millions de combinaisons pour identifier la clé de chiffrement quotidienne.",
    question: "Quel nom portaient les machines électromécaniques conçues par Turing ?",
    answers: [
      "Les Bombes",
      "Les Colosses",
      "Les Décodeurs Enigma",
    ],
  },
  {
    text: "Le télescope spatial James Webb tourne autour du Soleil à un million et demi de kilomètres de la Terre, au point d’équilibre gravitationnel Lagrange L2. Protégé par un bouclier thermique grand comme un court de tennis, ses miroirs hexagonaux en béryllium plaqué or captent la lumière infrarouge émise par les toutes premières galaxies apparues après le Big Bang.",
    question: "À quelle distance approximative de la Terre se trouve le télescope James Webb ?",
    answers: [
      "Un million et demi de kilomètres",
      "Trois cent quatre-vingt mille kilomètres",
      "Cent mille kilomètres",
    ],
  },
  {
    text: "Dans la fosse des Mariannes, à près de huit mille mètres sous la surface de l’océan, vit le poisson-limace des Mariannes dans une obscurité totale. Son corps translucide et sans écailles est dépourvu de vessie natatoire, et ses protéines cellulaires sont protégées par une molécule stabilisatrice appelée TMAO, lui permettant de survivre à des pressions écrasantes.",
    question: "Quelle molécule protège les cellules du poisson-limace des grandes profondeurs ?",
    answers: [
      "La molécule protectrice TMAO",
      "Une couche épaisse de cire organique",
      "Un fluide cellulaire enrichi en titane",
    ],
  },
  {
    text: "Dans les canyons escarpés des Andes, les bâtisseurs incas franchissaient des fleuves tumultueux grâce à des ponts suspendus sans pile de bois ni câble métallique. Les villages tressaient l’ichu, une herbe sauvage des hauteurs, en fines cordelettes réunies en câbles épais comme des troncs d’arbres. Chaque année, le pont était coupé et reconstruit en trois jours de fête.",
    question: "Quel matériau végétal les Incas utilisaient-ils pour tisser leurs ponts suspendus ?",
    answers: [
      "De l’herbe sauvage de montagne tressée",
      "Des lanières de cuir de lama séché",
      "Des tiges de roseau enduites de résine",
    ],
  },
  {
    text: "En 1610, Galilée pointa sa lunette astronomique vers Jupiter et découvrit quatre points lumineux disposés en ligne droite à côté de la planète. Au fil des nuits, il constata qu’ils changeaient de position en tournant autour de Jupiter. Ces lunes galiléennes constituèrent la toute première preuve visuelle directe que tous les astres ne tournent pas autour de la Terre.",
    question: "Combien de lunes en orbite autour de Jupiter Galilée a-t-il observées en 1610 ?",
    answers: [
      "Quatre",
      "Deux",
      "Sept",
    ],
  },
  {
    text: "Dans les forêts tropicales d’Amérique centrale, les anciens Mayas vénéraient le cacao comme une monnaie sacrée et un don des divinités. Ils écrasaient les fèves fermentées pour préparer une boisson cérémonielle amère et dense. En versant le breuvage d’un récipient à l’autre depuis une grande hauteur, ils créaient une mousse épaisse qu’ils parfumaient avec du piment moulu.",
    question: "Quelle épice relevait traditionnellement la boisson sacrée de cacao chez les Mayas ?",
    answers: [
      "Du piment moulu",
      "Du gingembre sauvage",
      "Des clous de girofle",
    ],
  },
  {
    text: "Dans certaines baies tropicales des Caraïbes et du Pacifique, l’eau s’illumine d’un bleu électrique éclatant au moindre battement de rame ou déferlement de vague. Cet éclat féerique provient de milliards d’algues microscopiques appelées dinoflagellés. Sous l’effet d’une contrainte mécanique sur leur membrane, elles déclenchent une réaction chimique lumineuse pour effrayer les prédateurs.",
    question: "De quelle couleur brille l’eau chargée de dinoflagellés bioluminescents ?",
    answers: [
      "Bleu électrique éclatant",
      "Vert émeraude profond",
      "Ambre étincelant",
    ],
  },
  {
    text: "Les caméléons ne changent pas de couleur en mélangeant des pigments colorés dans leur peau. Leurs cellules cutanées renferment une couche d’iridophores tapissée d’un réseau de nanocristaux de guanine. En tendant ou relâchant leur derme, ils ajustent l’espacement entre ces cristaux, ce qui réfléchit sélectivement certaines longueurs d’onde de la lumière ambiante.",
    question: "Comment les caméléons modifient-ils la coloration de leur peau ?",
    answers: [
      "En modifiant l’espacement entre des nanocristaux cutanés",
      "En pressant des poches d’encre sous leurs écailles",
      "En faisant varier leur température cutanée",
    ],
  },
  {
    text: "Selon une légende éthiopienne séculaire, le café aurait été découvert par un jeune chevrier nommé Kaldi. Ayant remarqué que ses chèvres gambadaient avec une vigueur inhabituelle toute la nuit après avoir brouté les baies rouges d’un arbuste inconnu, il en cueillit une poignée et les apporta aux moines d’un monastère voisin pour élucider ce mystère.",
    question: "Qui remarqua pour la première fois les vertus stimulantes du café selon la légende ?",
    answers: [
      "Un chevrier attentif nommé Kaldi",
      "Un marchand d’épices de la mer Rouge",
      "Un moine voyageur",
    ],
  },
  {
    text: "Sous l’inlandsis de l’Antarctique, les couches de neige accumulées pendant des centaines de millénaires se sont tassées en une glace bleue très dense. Dans son réseau cristallin dorment d’infimes bulles d’air scellées depuis des centaines de milliers d’années. En forant des carottes de glace de plus de trois kilomètres, les paléoclimatologues analysent directement l’atmosphère ancienne.",
    question: "Que renferment les carottes de glace extraites des profondeurs de l’Antarctique ?",
    answers: [
      "Des bulles d’air ancien piégées depuis des millénaires",
      "Des gouttes d’eau de mer fossilisées",
      "Des grains de pollen préhistoriques intacts",
    ],
  },
  {
    text: "Dans plusieurs déserts côtiers et terrestres à travers le monde, les voyageurs peuvent entendre d’étranges dunes chantantes. Lorsque des masses de sable sec glissent le long des pentes raides, des millions de grains de quartz de taille régulière s’entrechoquent à l’unisson. Cette friction synchronisée crée un bourdonnement sourd, semblable à celui d’un violoncelle, qui résonne au loin.",
    question: "Quelle est la cause du bourdonnement mélodieux des dunes de sable ?",
    answers: [
      "La friction synchronisée de grains de quartz en glissant",
      "Le sifflement du vent dans les failles rocheuses",
      "Des échos dans des grottes souterraines",
    ],
  },
];

import type { StoryScenario } from '../i18n';

export const stories: StoryScenario[] = [
  {
    "name": "Elena",
    "item": "un sac bleu",
    "itemDistractors": [
      "un sac à dos rouge",
      "une valise verte"
    ],
    "place": "sous le banc du parc",
    "placeDistractors": [
      "devant le café",
      "dans le train"
    ],
    "time": "à 15h30",
    "timeDistractors": [
      "à 18h00",
      "à 12h15"
    ]
  },
  {
    "name": "Marc",
    "item": "un carnet en cuir",
    "itemDistractors": [
      "un livre illustré",
      "une tablette noire"
    ],
    "place": "sur la table de la bibliothèque",
    "placeDistractors": [
      "sur la terrasse",
      "dans la salle d’attente"
    ],
    "time": "jeudi matin",
    "timeDistractors": [
      "vendredi après-midi",
      "mardi soir"
    ]
  },
  {
    "name": "Sarah",
    "item": "un vélo jaune",
    "itemDistractors": [
      "une trottinette argentée",
      "un scooter blanc"
    ],
    "place": "à côté de la fontaine centrale",
    "placeDistractors": [
      "devant la mairie",
      "derrière le kiosque"
    ],
    "time": "à 9h00",
    "timeDistractors": [
      "à 11h30",
      "à 14h00"
    ]
  },
  {
    "name": "David",
    "item": "une écharpe en laine rouge",
    "itemDistractors": [
      "un bonnet bleu",
      "une veste marron"
    ],
    "place": "sur la chaise du café",
    "placeDistractors": [
      "sur le muret du port",
      "dans le couloir du bureau"
    ],
    "time": "samedi soir",
    "timeDistractors": [
      "dimanche matin",
      "mercredi à 16h00"
    ]
  },
  {
    "name": "Julie",
    "item": "un vase en céramique blanche",
    "itemDistractors": [
      "une lampe dorée",
      "un tableau en bois"
    ],
    "place": "sur le rebord de la cuisine",
    "placeDistractors": [
      "sur le comptoir de l’entrée",
      "sur l’étagère du salon"
    ],
    "time": "à 17h45",
    "timeDistractors": [
      "à 20h00",
      "à 10h15"
    ]
  },
  {
    "name": "Lucas",
    "item": "des jumelles de marin",
    "itemDistractors": [
      "une boussole en laiton",
      "une carte ancienne"
    ],
    "place": "sur le rocher du phare",
    "placeDistractors": [
      "sur la proue du bateau",
      "dans la cabane du quai"
    ],
    "time": "aux premières lueurs de l’aube",
    "timeDistractors": [
      "au coucher du soleil",
      "à midi pile"
    ]
  },
  {
    "name": "Claire",
    "item": "un appareil photo vintage",
    "itemDistractors": [
      "un étui à objectifs",
      "un trépied en aluminium"
    ],
    "place": "sur la terrasse panoramique",
    "placeDistractors": [
      "le long de l’allée des tilleuls",
      "sur la passerelle"
    ],
    "time": "vendredi au coucher du soleil",
    "timeDistractors": [
      "samedi à l’aube",
      "jeudi après-midi"
    ]
  },
  {
    "name": "Mathieu",
    "item": "une montre à gousset dorée",
    "itemDistractors": [
      "un bracelet en argent",
      "une bague ancienne"
    ],
    "place": "sur le bureau de l’antiquaire",
    "placeDistractors": [
      "dans le coffre de l’hôtel",
      "dans la vitrine centrale"
    ],
    "time": "lundi à 11h00",
    "timeDistractors": [
      "mercredi à 15h30",
      "vendredi à 9h15"
    ]
  },
  {
    "name": "Valérie",
    "item": "un parapluie jaune à pois",
    "itemDistractors": [
      "un imperméable vert",
      "un châle en soie"
    ],
    "place": "à l’arrêt du tramway",
    "placeDistractors": [
      "à l’entrée du métro",
      "sous les arcades de la place"
    ],
    "time": "mercredi sous la pluie",
    "timeDistractors": [
      "mardi à la sortie du travail",
      "jeudi soir"
    ]
  },
  {
    "name": "Simon",
    "item": "une boîte en fer peinte",
    "itemDistractors": [
      "un coffret en bois",
      "un bocal en verre"
    ],
    "place": "sur les marches du théâtre",
    "placeDistractors": [
      "dans l’allée du cinéma",
      "à côté de la billetterie"
    ],
    "time": "dimanche à 14h30",
    "timeDistractors": [
      "samedi à 21h00",
      "lundi à 18h00"
    ]
  },
  {
    "name": "Fiona",
    "item": "une carte céleste roulée",
    "itemDistractors": [
      "un globe terrestre",
      "un astrolabe en bronze"
    ],
    "place": "à l’observatoire sur la colline",
    "placeDistractors": [
      "dans la tourelle du château",
      "sur la pelouse du planétarium"
    ],
    "time": "à minuit sous ciel clair",
    "timeDistractors": [
      "à dix heures du soir",
      "à deux heures du matin"
    ]
  },
  {
    "name": "André",
    "item": "une clé en fer ciselée",
    "itemDistractors": [
      "un lourd cadenas",
      "un médaillon gravé"
    ],
    "place": "dans le coffre du grenier",
    "placeDistractors": [
      "derrière le tableau du salon",
      "dans le tiroir du secrétaire"
    ],
    "time": "mardi à 16h15",
    "timeDistractors": [
      "jeudi à 10h30",
      "dimanche après-midi"
    ]
  },
  {
    "name": "Sylvie",
    "item": "une théière en fonte émaillée",
    "itemDistractors": [
      "une carafe en cristal",
      "une tasse en porcelaine"
    ],
    "place": "sur la table de la serre",
    "placeDistractors": [
      "dans le kiosque du jardin",
      "sur le comptoir du labo"
    ],
    "time": "samedi à 10h00",
    "timeDistractors": [
      "dimanche à 17h00",
      "vendredi au petit-déjeuner"
    ]
  },
  {
    "name": "Laurent",
    "item": "une flûte en bois de noyer",
    "itemDistractors": [
      "une mandoline ancienne",
      "un archet en ébène"
    ],
    "place": "sur le pont de pierre en arc",
    "placeDistractors": [
      "sur la berge du ruisseau",
      "sous le chêne centenaire"
    ],
    "time": "mercredi tôt le matin",
    "timeDistractors": [
      "jeudi au crépuscule",
      "samedi après-midi"
    ]
  },
  {
    "name": "Alice",
    "item": "une boîte de pastels à la cire",
    "itemDistractors": [
      "un carnet de croquis",
      "une palette d’huile"
    ],
    "place": "sur le grand escalier du musée",
    "placeDistractors": [
      "dans le cloître médiéval",
      "à l’entrée de la galerie d’art"
    ],
    "time": "dimanche à 16h45",
    "timeDistractors": [
      "samedi à midi",
      "mardi à 14h00"
    ]
  },
  {
    "name": "Fabien",
    "item": "un chapeau de paille tressée",
    "itemDistractors": [
      "des lunettes de soleil",
      "un bandana à carreaux"
    ],
    "place": "sur le ponton des pêcheurs",
    "placeDistractors": [
      "sur la plage aux coquillages",
      "au mouillage des voiliers"
    ],
    "time": "vendredi à midi",
    "timeDistractors": [
      "dimanche à 11h00",
      "mercredi à 15h00"
    ]
  },
  {
    "name": "Béatrice",
    "item": "une lanterne en laiton poli",
    "itemDistractors": [
      "un candélabre à trois branches",
      "une lampe torche"
    ],
    "place": "sous le porche de la cour ancienne",
    "placeDistractors": [
      "le long du couloir à fresques",
      "devant le portail monumental"
    ],
    "time": "jeudi soir à 20h30",
    "timeDistractors": [
      "vendredi à la tombée du jour",
      "samedi tard dans la nuit"
    ]
  },
  {
    "name": "Robert",
    "item": "un poste de radio portable à piles",
    "itemDistractors": [
      "un tourne-disque compact",
      "une enceinte de poche"
    ],
    "place": "sur l’établi de menuiserie",
    "placeDistractors": [
      "dans l’abri de jardin",
      "à l’atelier de mécanique"
    ],
    "time": "lundi à 8h30",
    "timeDistractors": [
      "mercredi à 13h00",
      "vendredi à 17h15"
    ]
  },
  {
    "name": "Camille",
    "item": "un éventail en soie brodée",
    "itemDistractors": [
      "un châle en dentelle noire",
      "une coiffe en velours"
    ],
    "place": "dans la loggia du château",
    "placeDistractors": [
      "sur le balcon de la tour",
      "dans la galerie des glaces"
    ],
    "time": "mardi au coucher du soleil",
    "timeDistractors": [
      "jeudi après-midi",
      "dimanche au crépuscule"
    ]
  },
  {
    "name": "Gabriel",
    "item": "un journal de bord jauni",
    "itemDistractors": [
      "un atlas nautique relié",
      "un parchemin scellé"
    ],
    "place": "dans la cave du vieux pressoir",
    "placeDistractors": [
      "dans la cale du voilier",
      "dans la remise à calèches"
    ],
    "time": "samedi après-midi à 15h00",
    "timeDistractors": [
      "lundi à 11h30",
      "mercredi soir"
    ]
  },
  {
    "name": "Martine",
    "item": "une boîte de chocolats noirs",
    "itemDistractors": [
      "un panier de biscuits épicés",
      "un gâteau aux amandes"
    ],
    "place": "dans la vitrine de la pâtisserie",
    "placeDistractors": [
      "sur la table du salon de thé",
      "à l’entrée de l’épicerie"
    ],
    "time": "jeudi à 17h00",
    "timeDistractors": [
      "samedi à 10h30",
      "dimanche à 16h15"
    ]
  },
  {
    "name": "Georges",
    "item": "une loupe ronde",
    "itemDistractors": [
      "un microscope portable",
      "des pinces de précision"
    ],
    "place": "sur le bureau du cabinet d’étude",
    "placeDistractors": [
      "dans les archives de famille",
      "sur la table à dessin"
    ],
    "time": "mercredi à 19h30",
    "timeDistractors": [
      "mardi à midi",
      "vendredi à 18h45"
    ]
  },
  {
    "name": "Serena",
    "item": "un cabas en toile écologique",
    "itemDistractors": [
      "un panier en osier clair",
      "un sac à dos de randonnée"
    ],
    "place": "au stand des livres d’occasion",
    "placeDistractors": [
      "au marché aux fleurs",
      "devant l’épicerie bio"
    ],
    "time": "dimanche matin à 10h15",
    "timeDistractors": [
      "samedi à 16h00",
      "jeudi à 11h45"
    ]
  },
  {
    "name": "Pierre",
    "item": "un étui rigide pour violoncelle",
    "itemDistractors": [
      "un porte-partitions",
      "un étui de guitare classique"
    ],
    "place": "sur la scène du jardin d’hiver",
    "placeDistractors": [
      "dans le foyer de l’auditorium",
      "à l’entrée de la salle de concert"
    ],
    "time": "vendredi soir à 21h15",
    "timeDistractors": [
      "samedi après-midi",
      "dimanche à 18h30"
    ]
  }
];

const nicknames = {
  adjectives: [
    'Rapide', 'Brillant', 'Calme', 'Courageux', 'Malin', 'Gentil', 'Joyeux', 'Audacieux',
    'Tranquille', 'Chanceux', 'Radieux', 'Sage', 'Constant', 'Curieux', 'Enjoué', 'Agile',
    'Patient', 'Attentif', 'Bienveillant', 'Vif', 'Fier', 'Rieur', 'Prompt', 'Noble',
    'Perspicace', 'Infatigable', 'Ingénieux', 'Hardi', 'Doré', 'Argenté', 'Bleu', 'Vert',
  ],
  animals: [
    'Loup', 'Hibou', 'Dauphin', 'Panda', 'Tigre', 'Koala', 'Lynx', 'Faucon',
    'Cygne', 'Castor', 'Pingouin', 'Lion', 'Ours', 'Cerf', 'Hérisson', 'Blaireau',
    'Rouge-gorge', 'Flamant', 'Pélican', 'Caméléon', 'Gecko', 'Perroquet', 'Kangourou', 'Bison',
    'Guépard', 'Léopard', 'Lémurien', 'Raton laveur', 'Lapin', 'Éléphant', 'Renard', 'Colibri',
  ],
};

/** Valid words made of the same letters as a word in `words`, which Anagrams also accepts as answers. */
const anagramWords: string[] = [
  'BARRE', 'PALME', 'AMPLE', 'CHAIRE', 'CHARIE', 'VOLÉ', 'LOVÉ', 'COUSINS', 'CUISSON', 'COSINUS',
  'GARDON', 'GRONDA', 'AMATEUR', 'AVENIR', 'RAVINE', 'STASE', 'FERAIS', 'REFAIS', 'FERIAS', 'DIN',
  'RIANT', 'SALIVE', 'LEVAIS', 'HARPE', 'NETTE', 'PROIE', 'OSER', 'ORES', 'BIOS', 'MINA',
  'LICE', 'LOIN', 'LINO', 'TROU', 'ROUT', 'TEND', 'INOX', 'ORBE', 'BORE', 'FOIS',
  'TROP', 'NUDE', 'BARS', 'OUTRE', 'TROUE', 'ROUET', 'BROME', 'CRAIE', 'CARIE', 'GRENAT',
  'GARENT', 'RAGENT', 'SAPER', 'PARES', 'SUCER', 'CRUES', 'CURES', 'CREDO', 'CODER', 'CANTO',
  'CONTA', 'CARTE', 'CARET', 'CHOPE', 'AVONS', 'NOVAS', 'BOSSER', 'SOBRES', 'SLAVE', 'SALVE',
  'LAVES', 'VALES', 'TRIBU', 'COURSE', 'COEURS', 'ENTIERS', 'RETIENS', 'INERTES', 'TERNIES', 'AIMONS',
  'CADRAN', 'CARDAN', 'RENDRA', 'POIGNE', 'CONCRET', 'GRAVEUR', 'BANCALE', 'RAPINE', 'REIGNER', 'ARGUTIE',
  'GRACILES', 'ENCARTS', 'NECTARS', 'SACRENT', 'LANCIER', 'BAUGE', 'ÉTIOLE', 'BLASE', 'HARANG', 'OPINA',
  'TENET',
];

export default { ui, words, anagramWords, passages, stories, nicknames };
