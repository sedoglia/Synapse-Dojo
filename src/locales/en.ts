import type { Passage } from '../i18n';

export const ui = {
  'app.tagline': 'A few minutes a day for a sharper mind',
  'home.how': 'Train every day and measure yourself to see your progress',
  'onboard.title': 'Welcome!',
  'onboard.ask': 'What’s your name?',
  'onboard.placeholder': 'Your name',
  'onboard.go': 'Let’s go',

  'landing.heroTitle': 'Train your mind a few minutes a day',
  'landing.heroSub': '35 neuroscience-backed cognitive and bilateral games to sharpen memory, attention, coordination, processing speed, and reflexes. 100% free, no ads, no sign-up or passwords required.',
  'landing.badgeFree': '100% Free',
  'landing.badgePrivacy': 'Total Privacy · Local Data',
  'landing.badgeScience': 'Evidence-Based',
  'landing.badgeOpenSource': 'Source Available',
  'landing.startCardTitle': 'Start training now',
  'landing.startCardDesc': 'No registration needed. Pick a nickname to personalize your experience and track your progress in your browser.',
  'landing.guestBtn': 'Play as Guest',
  'landing.guestName': 'Guest',
  'landing.guideBtn': '📖 Game Guide & Instructions',
  'landing.howItWorks': 'How Synapse Dojo Works',
  'landing.pillar1Title': 'Daily Workout',
  'landing.pillar1Desc': '4 personalized exercises picked daily that adapt in real time to your performance. Takes ~10 minutes.',
  'landing.pillar2Title': 'Daily Neuro Score',
  'landing.pillar2Desc': 'A standardized 3-minute benchmark across 4 core areas to objectively measure your progress over time.',
  'landing.pillar3Title': 'Free Gym (35 Games)',
  'landing.pillar3Desc': 'Practice freely across all 9 cognitive and bilateral domains whenever you want to beat your personal bests.',
  'landing.domainsTitle': 'The 9 Trained Skill Domains',
  'landing.guideCtaTitle': 'Want to learn how every exercise works?',
  'landing.guideCtaDesc': 'Explore our detailed guide with scientific references, cognitive mechanisms, and rules for all 35 games.',
  'landing.guideCtaBtn': 'Read the Full Guide',
  'landing.footerTagline': 'Synapse Dojo · Free Cognitive Training',

  'guide.title': 'Guide & Instructions',
  'guide.subtitle': 'How Synapse Dojo works, the app sections, and detailed explanations of all cognitive and bilateral exercises',
  'guide.navSections': 'The App Sections',
  'guide.introH': 'Why Train Your Brain?',
  'guide.introP': 'The brain has an extraordinary capacity to adapt, reorganize, and build new synaptic connections throughout your life: this is known as neuroplasticity. Just as physical exercise strengthens muscles and stamina, regular cognitive stimulation helps maintain mental sharpness, working memory, and focus. Synapse Dojo offers a daily, science-backed workout: just a few minutes a day with exercises that continuously adapt to your current skill level.',
  'guide.planH': '🏋️ Daily Workout (Plan)',
  'guide.planP': 'Every day, Synapse Dojo composes a balanced 4-exercise routine across different cognitive domains (e.g., speed, memory, attention, and executive control). The games adapt automatically: succeed and the difficulty increases; make mistakes and it scales down to keep you in the optimal zone of mental stimulation. Finishing your daily workout builds your streak and awards XP towards leveling up.',
  'guide.checkH': '📏 Measure your Neuro Score (Daily Check)',
  'guide.checkP': 'The Neuro Score is a standardized daily cognitive benchmark taking ~4–5 minutes that tests all 9 cognitive domains of the brain (Processing Speed, Attention, Executive Function, Working Memory, Long-Term Memory, Spatial Skills, Reasoning, Language & Calculation, and Bilateral Coordination), selecting a daily rotating exercise for each domain. Because it comprehensively evaluates the entire cerebral spectrum, your daily score (0–1000) provides an objective barometer of your cognitive sharpness over time.',
  'guide.trainingH': '🧩 Free Gym (35 Exercises)',
  'guide.trainingP': 'In the Gym section, you have unlimited access to all 35 exercises, categorized by domain. Use it to focus on specific skills you want to strengthen, explore different exercise mechanics, or challenge your personal high scores.',
  'guide.progressH': '📈 Progress & Statistics',
  'guide.progressP': 'Track your cognitive evolution over time. View your radar profile across all 9 skill domains, review your historical Neuro Score curve, unlock achievement badges (such as consecutive day streaks and master levels), and inspect your monthly training calendar.',
  'guide.settingsH': '⚙️ Settings & Privacy',
  'guide.settingsP': 'Customize your experience: choose between Dark, Light, and High Contrast themes, enable or disable sound effects and vibration, adjust text size, and manage your data. Synapse Dojo stores all data strictly in your local browser storage—you can export a full JSON backup or import it onto another device anytime.',
  'guide.gamesH': 'The Exercises Explained',
  'guide.gameWhy': 'Scientific purpose:',
  'guide.gameHow': 'How to play:',
  'guide.faqH': 'Tips & Frequently Asked Questions',
  'guide.faq1Q': 'How often should I train?',
  'guide.faq1A': 'Consistency is key. 10 to 15 minutes a day (your daily workout plus the Neuro Score check) yields far better results than one long session per week. Aim for at least 4 to 5 days a week.',
  'guide.faq2Q': 'Where are my data and scores stored?',
  'guide.faq2A': 'Everything remains 100% on your device. Synapse Dojo does not use servers, accounts, passwords, or tracking cookies. Your scores and progress are saved in your browser localStorage.',
  'guide.faq3Q': 'Are there practice tutorials in each game?',
  'guide.faq3A': 'Yes! Each game includes concise instructions and a guided interactive trial before the timed test starts, so you can practice the mechanics without any stress.',

  'home.hello': 'Hi, {name}!',
  'home.streak': '{n}-day streak',
  'home.streak1': '1-day streak',
  'home.streak0': 'Start your streak today',
  'home.check': 'Measure your Neuro Score',
  'home.checkSub': 'Tests all 9 cognitive domains · about 4 min · monitor your brain sharpness',
  'home.checkDone': 'Done today: {score}',
  'home.training': 'Gym',
  'home.trainingSub': 'Every exercise, grouped by skill',
  'home.progress': 'Progress',
  'home.progressSub': 'Skill profile, levels and calendar',
  'home.settings': 'Settings',

  'plan.title': 'Workout',
  'plan.titleN': 'Workout {n}',
  'plan.again': 'Another workout',
  'plan.againSub': 'Up for more? Tap for 4 new exercises on other skills',
  'plan.sub': '{n} exercises picked for you · they adapt to your level · about {min} min',
  'plan.progress': '{done}/{n} done',
  'plan.step': 'Exercise {i} of {n}',
  'plan.done': 'Workout complete!',
  'plan.doneSub': 'Great job! If you’re up for more, start another workout right away, with different exercises.',

  'common.back': 'Back',
  'common.start': 'Start!',
  'common.quit': 'Quit',
  'common.retry': 'Retry',
  'common.menu': 'Menu',
  'common.next': 'Next',
  'common.continue': 'Continue',
  'common.best': 'Best',
  'common.newBest': 'New record!',
  'common.level': 'Level',
  'common.levelChange': 'Level: {from} → {to}',
  'common.why': 'Why it works',
  'common.timeout': 'Time’s up',
  'common.step': 'Test {i} of {n}',
  'common.correct': '{ok}/{n} correct',

  'domain.speed': 'Speed',
  'domain.attention': 'Attention',
  'domain.wm': 'Working memory',
  'domain.memory': 'Memory',
  'domain.executive': 'Control',
  'domain.spatial': 'Spatial',
  'domain.reasoning': 'Reasoning',
  'domain.language': 'Math & reading',

  'ex.glance.name': 'Glance',
  'ex.glance.desc': 'For an instant a vehicle appears in the center and a star near the edge. Tell me which vehicle it was and where the star was. The display time gets shorter as you improve.',
  'ex.glance.why': 'Trains your “useful field of view”: taking in more at a single glance. This is the kind of exercise used in the ACTIVE trial, where speed-of-processing training was linked to a lower dementia risk after 10 years.',
  'ex.glance.which': 'Which vehicle was in the center?',
  'ex.glance.where': 'Where was the star?',
  'ex.glance.detail': 'Threshold: {ms} ms',

  'ex.reflex.name': 'Choice reflex',
  'ex.reflex.desc': 'One of four panels lights up. If it’s green, tap it right away; if it’s red, don’t touch anything!',
  'ex.reflex.why': 'Choice reaction time with signals to ignore (go/no-go): combines speed with control over automatic responses.',
  'ex.reflex.hint': 'Green: tap · Red: hold still',
  'ex.reflex.detail': 'Average reaction: {ms} ms · {ok}/{n} correct',

  'ex.path.name': 'Number trail',
  'ex.path.desc': 'Tap the circles in order. At higher levels you alternate numbers and letters: 1 → A → 2 → B → 3 …',
  'ex.path.why': 'A version of the Trail Making Test, used in neuropsychology to measure fast visual search and, in the alternating form, mental flexibility.',
  'ex.path.next': 'Next: {v}',
  'ex.path.detail': '{secs} s · {err} errors',

  'ex.pilot.name': 'Pilot',
  'ex.pilot.desc': 'Steer by dragging (or with the arrow keys) to stay on the road. Meanwhile, press SIGNAL only when a green circle goes by.',
  'ex.pilot.why': 'Inspired by NeuroRacer (University of California, San Francisco): in a study published in Nature, adaptive multitasking training reduced the cost of doing two things at once, and the effect lasted 6 months.',
  'ex.pilot.press': 'SIGNAL!',
  'ex.pilot.detail': 'Correct signals: {ok}/{n} · on road {road}%',

  'ex.radar.name': 'Radar',
  'ex.radar.desc': 'Some balls light up: those are the targets. Then they all look the same and move around. Follow them with your eyes and tap the targets at the end.',
  'ex.radar.why': 'Multiple Object Tracking: following several moving objects trains attention spread across space, the same kind you use in traffic or a crowd.',
  'ex.radar.watch': 'Remember the targets',
  'ex.radar.track': 'Follow them…',
  'ex.radar.pick': 'Tap the {n} targets',
  'ex.radar.detail': 'Targets: up to {n} · {ok}/{t} rounds right',

  'ex.clash.name': 'Color clash',
  'ex.clash.desc': 'Check the rule on top: tap the INK color or the word’s MEANING. Your time to answer shrinks as you improve.',
  'ex.clash.why': 'The Stroop effect: holding back the automatic response (reading) to give the one asked for. It trains inhibition, one of the core executive functions.',
  'ex.clash.ruleInk': '🎨 Ink color',
  'ex.clash.ruleWord': '📖 Word meaning',

  'ex.switch.name': 'Rule switch',
  'ex.switch.desc': 'A number appears. If the frame is BLUE, say whether it’s even or odd. If it’s ORANGE, whether it’s lower or higher than 5. The rule changes without warning!',
  'ex.switch.why': 'Task switching: jumping quickly between rules. Training reduces the “switch cost”, even on untrained tasks; older adults often improve the most.',
  'ex.switch.parity': 'EVEN or ODD?',
  'ex.switch.size': 'LOWER or HIGHER than 5?',
  'ex.switch.even': 'EVEN',
  'ex.switch.odd': 'ODD',
  'ex.switch.detail': '{ok}/{n} · switch cost {cost} ms',

  'ex.echo.name': 'Echo',
  'ex.echo.desc': 'One square lights up at a time. For each one ask yourself: is it in the same place as the one N steps back? If so press POSITION, otherwise press nothing. You start with N = 1, the square right before; later a letter joins in, compared the same way.',
  'ex.echo.why': 'n-back: comparing each item with the one N steps earlier. It’s the most studied working-memory task; gains are strong on similar tasks and less certain on distant ones.',
  'ex.echo.before': 'Before',
  'ex.echo.now': 'Now',
  'ex.echo.ago': '{n} back',
  'ex.echo.demo1': 'A square lights up: nothing to compare it with yet, just wait.',
  'ex.echo.demo2': 'Different from the previous one → don’t press anything.',
  'ex.echo.demo3': 'Same as the previous one → press POSITION!',
  'ex.echo.demo4': 'Different again → don’t press. And so on.',
  'ex.echo.stripWait': 'Remember it: you’ll compare it with the ones that come next.',
  'ex.echo.stripCompare': 'Is the square lit NOW in the same place as the highlighted one? If so, press POSITION.',
  'ex.echo.stripCompareDual': 'Compare NOW with the highlighted one: same square → POSITION, same letter → LETTER.',
  'ex.echo.back1': 'the one right before',
  'ex.echo.backN': 'the one {n} steps back',
  'ex.echo.dualTitle': 'It’s dual from now on!',
  'ex.echo.dualText': 'Besides the square you’ll hear a letter, also written inside the square. Press POSITION if the square matches {back} and LETTER if the letter matches {back}. Both, one or neither can match.',
  'ex.echo.series': 'Series {i} of {n}',
  'ex.echo.seriesStart1': 'This series has {len} squares. The first one is just to remember: don’t press. From the second on, compare each square with the one right before.',
  'ex.echo.seriesStartN': 'This series has {len} squares. The first {k} are just to remember: don’t press. Then compare each square with the one {k} steps back.',
  'ex.echo.turnWait': 'Square {i} of {len} · remember it, don’t press',
  'ex.echo.turnAsk': 'Square {i} of {len} · same as {back}?',
  'ex.echo.turnAskDual': 'Square {i} of {len} · same place? same letter? (vs {back})',
  'ex.echo.seriesEnd': 'End of series {i} of {n}',
  'ex.echo.seriesScore': 'Accuracy: {acc}% · matches caught {hit} of {targets} · wrong presses {fa}',
  'fb.echoNotSame': 'don’t press (it was different)',
  'fb.echoNotSameLetter': 'don’t press (the letter was different)',
  'fb.echoMissed': 'press {btn} (it was the same)',
  'ex.echo.pos': 'Position',
  'ex.echo.letter': 'Letter',
  'ex.echo.rule1': '1-back · compare with the one right before',
  'ex.echo.ruleDual': '{n}-back ×2 · compare square and letter with {back}',
  'ex.echo.rule': '{n}-back · compare with {n} steps back',
  'ex.echo.block': 'Block {i}: {acc}% accuracy (hits minus false alarms)',

  'ex.grid.name': 'Light grid',
  'ex.grid.desc': 'Watch the tiles light up and repeat the sequence. Careful: sometimes you must repeat it backwards!',
  'ex.grid.why': 'The Corsi test: remembering sequences in space, forwards and backwards. It measures and trains visuo-spatial working memory.',
  'ex.grid.watch': 'Watch…',
  'ex.grid.yours': 'Your turn! ({n} tiles)',
  'ex.grid.back': 'BACKWARDS! ({n} tiles)',
  'ex.grid.span': 'Longest sequence: {n}',
  'ex.grid.detail': 'Span forward {f} · backward {b}',

  'ex.digits.name': 'Last digits',
  'ex.digits.desc': 'A stream of digits of unpredictable length runs by. When it stops, type the last N in the right order.',
  'ex.digits.why': 'Running span: keeping in mind only the latest digits of a sequence that keeps updating. It trains working-memory updating.',
  'ex.digits.watch': 'Remember the last {n}',
  'ex.digits.recall': 'Type the last {n} digits',
  'ex.digits.detail': '{ok}/{n} correct · span {span}',

  'ex.rotate.name': 'Rotations',
  'ex.rotate.desc': 'Are the two shapes the same shape rotated, or is one the mirror image of the other?',
  'ex.rotate.why': 'Mental rotation. A meta-analysis of 217 studies shows spatial skills improve with training, durably, and also on similar untrained tasks.',
  'ex.rotate.same': 'Same',
  'ex.rotate.mirror': 'Mirror',

  'ex.towers.name': 'Towers',
  'ex.towers.desc': 'Move the balls to match the goal in as few moves as possible. Tap a peg to pick up its top ball, then tap where to put it. Think before you move!',
  'ex.towers.why': 'The Tower of London: planning a sequence of moves before acting. It’s a classic test of planning, an executive function.',
  'ex.towers.goal': 'Goal',
  'ex.towers.moves': 'Moves: {m} · minimum: {min}',
  'ex.towers.too': 'Too many moves',
  'ex.towers.detail': 'Solved in minimum moves: {ok}/{n}',

  'ex.odd.name': 'Odd one out',
  'ex.odd.desc': 'All shapes but one share a feature (shape, color, fill or count). Find the one that doesn’t.',
  'ex.odd.why': 'Inductive reasoning: finding the hidden common rule among irrelevant differences. Similar tasks appear in the Cambridge Brain Sciences batteries.',
  'ex.odd.ask': 'Which one is the odd one out?',

  'ex.math.name': 'Math sprint',
  'ex.math.desc': 'Solve the problems as fast as you can. Your answer is submitted as soon as you type all its digits.',
  'ex.math.why': 'Lots of simple calculations done fast: the principle behind the “learning therapy” studied by Kawashima’s group, which showed gains in attention, inhibition and speed in older adults.',
  'ex.math.detail': '{ok}/{n} · {secs} s',

  'ex.reading.name': 'Speed reading',
  'ex.reading.desc': 'Read the text ALOUD, as fast as you can while pronouncing clearly. Then answer a question.',
  'ex.reading.why': 'Reading aloud: the other half of the “learning therapy” from Kawashima’s group. The final question checks that you really read it.',
  'ex.reading.aloud': '🗣️ Read aloud',
  'ex.reading.done': 'I’m done',
  'ex.reading.detail': '{wpm} words/min · comprehension {ok}/{n}',

  'ex.vault.name': 'Word vault',
  'ex.vault.desc': 'Memorize the words. Then I’ll show you more: tell me whether you saw each one before or it’s new.',
  'ex.vault.why': 'Recognition memory: telling apart what you saw from what’s new. It trains episodic memory.',
  'ex.vault.study': 'Memorize these words',
  'ex.vault.done': 'I’m done',
  'ex.vault.seen': 'Seen',
  'ex.vault.new': 'New',
  'ex.vault.result': '{n}/{t} correct',

  'ex.pairs.name': 'Pairs',
  'ex.pairs.desc': 'You’ll see a few pairs made of a symbol and a word, e.g. 🍎 🔗 hammer. Memorize them. Then only the symbol appears and you pick the word it was paired with. There’s no audio: it’s all visual.',
  'ex.pairs.why': 'Paired associates: binding two items together is one of the most sensitive episodic-memory tasks.',
  'ex.pairs.study': 'Each symbol has its own word: remember which goes with which',
  'ex.pairs.tip': 'Later you’ll only see the symbol and pick its word. Tip: picture a scene that joins them, e.g. {sym} + “{word}”.',
  'ex.pairs.timer': '⏱ {s} seconds',
  'ex.pairs.ask': 'Which word was it paired with?',
  'ex.pairs.detail': '{ok}/{n} pairs remembered',

  'color.red': 'RED',
  'color.blue': 'BLUE',
  'color.green': 'GREEN',
  'color.yellow': 'YELLOW',

  'result.title': 'Result',
  'check.title': 'Your Neuro Score',
  'check.delta': '{d} since last time',
  'check.first': 'First check recorded. Come back tomorrow!',
  'check.doneToday': 'You already did today’s check. Come back tomorrow to measure again!',

  'rank.0': 'Spark',
  'rank.1': 'Current',
  'rank.2': 'Circuit',
  'rank.3': 'Neural net',
  'rank.4': 'Synapse master',

  'training.title': 'Gym',
  'training.today': 'Done today',

  'progress.title': 'Progress',
  'progress.chart': 'Neuro Score',
  'progress.empty': 'Do your first daily check to see the chart.',
  'progress.calendar': 'Last 4 weeks',
  'progress.domains': 'Skill profile',
  'progress.domainsHint': 'Based on the level reached in each exercise.',
  'progress.exercises': 'Levels and records',
  'progress.none': '—',
  'progress.stats': 'Active days: {days} · Sessions: {runs}',
  'progress.week': 'This week: {n}/4 training days',

  'settings.title': 'Settings',
  'settings.name': 'Name',
  'settings.lang': 'Language',
  'settings.sound': 'Sound effects',
  'settings.relaxed': 'Relaxed pace (more time to answer)',
  'settings.bigText': 'Large text',
  'settings.reset': 'Delete all data',
  'settings.resetConfirm': 'Really delete all progress? This cannot be undone.',
  'ex.glance.example': 'Example: 🚗 in the center and the star at top right → answer 🚗, then tap the top-right slot.',
  'ex.reflex.example': 'Example: a green panel lights up → tap it right away. If it’s red → don’t touch anything and wait.',
  'ex.path.example': 'Example: tap 1, then 2, then 3… In the alternating version: 1 → A → 2 → B → 3 → C.',
  'ex.pilot.example': 'Example: drag to follow the road. A green circle goes by → press SIGNAL. A triangle or square → ignore it.',
  'ex.radar.example': 'Example: 2 balls light up → follow them with your eyes as they mix with the others, then tap exactly those 2.',
  'ex.clash.example': 'Example: the word RED written in blue → with the 🎨 rule answer BLUE, with the 📖 rule answer RED.',
  'ex.switch.example': 'Example: 7 in a blue frame → ODD. The same 7 in an orange frame → HIGHER than 5.',
  'ex.echo.example': 'Example 1-back: the top square lights up and right after the same one again → press POSITION. If it’s a different one → don’t press.',
  'ex.grid.example': 'Example: 1 → 2 → 3 light up. Tap 1, 2, 3. If it says BACKWARDS, tap 3, 2, 1.',
  'ex.digits.example': 'Example: 4 8 1 7 2 9 run by and you must remember the last 3 → type 7 2 9.',
  'ex.vault.example': 'Example: you studied “tree” and “boat”. “tree” appears → Seen. “cup” appears → New.',
  'ex.pairs.example': 'Example: you saw the pair 🍎 – hammer. Later 🍎 appears → pick “hammer”.',
  'ex.rotate.example': 'Example: if rotating the right shape gives the left one → Same. If you’d need a mirror → Mirror.',
  'ex.towers.example': 'Example: the goal has red on top but blue is covering it now → move blue first, then put red in place.',
  'ex.odd.example': 'Example: three solid red circles and one solid blue circle → the odd one out is the blue one (the only different color).',
  'ex.math.example': 'Example: 7 + 8 = → type 15. The answer is submitted as soon as all its digits are typed.',
  'ex.reading.example': 'Example: read the passage aloud, press “I’m done” and answer the question about it.',
  'fb.pilotRoad': 'stay on the road while the sign is coming',
  'fb.pilotMissed': 'it was the green circle: press SIGNAL',
  'fb.pilotNotTarget': 'press only for the green circle',
  'fb.pilotStray': 'no sign in view: wait for the green circle',
  'fb.oddHere': 'the one highlighted in green',
  'fb.gridOrder': 'the order numbered on the tiles',
  'fb.right': 'Right!',
  'fb.wrong': 'Wrong',
  'fb.was': 'Right answer: {v}',
  'fb.noGo': 'it was red, don’t tap',
  'fb.tooSlow': 'too slow, tap sooner',
  'fb.otherPad': 'the lit panel',
  'fb.starHere': 'the star is where it shines now',
  'fb.minMoves': 'it could be done in {n} moves',
  'intro.tip': 'The game adapts to you: you’ll miss about one in five, and that’s exactly where the brain learns most.',
  'intro.practice': 'Guided practice',
  'intro.practiceFirst': 'First time? Try a guided practice: it’s short and doesn’t count.',
  'practice.tag': 'Practice',
  'practice.done': 'Practice complete!',
  'practice.doneSub': 'Now you know the rules. Ready for the real thing?',
  'result.accuracy': 'Accuracy: {pct}%',
  'result.combo': 'Best streak: ×{n}',
  'result.msgUp': 'You’re improving: from here the game gets a bit harder.',
  'result.msgDown': 'The level went down a little so you train at the right spot. That’s normal!',
  'result.msgSame': 'Steady level: you’re consolidating. Keep it up.',
  'result.history': 'Your level over time',
  'result.sinceFirst': '{pct} since your first time',
  'result.newBadge': 'New achievement!',
  'result.speedBonus': 'Speed bonus (+10 XP)',
  'result.timeBonusPts': 'time pts',
  'level.player': 'Level {n}',
  'level.up': 'You reached level {n}!',
  'home.next': 'Next achievement',
  'home.week': 'Weekly goal: {n}/4 days',
  'badges.title': 'Achievements',
  'badges.count': '{n}/{t} earned',
  'settings.vibration': 'Vibration (on phones)',
  'settings.reminder': 'Daily reminder',
  'settings.reminderHint': 'Download a recurring event to add to your phone or computer calendar.',
  'settings.reminderTime': 'Time',
  'settings.reminderBtn': 'Add to calendar',
  'reminder.desc': 'A few minutes to train your mind',
  'badge.first.name': 'First step',
  'badge.first.desc': 'Complete your first exercise',
  'badge.check.name': 'First measure',
  'badge.check.desc': 'Measure your Neuro Score for the first time',
  'badge.plan.name': 'Full workout',
  'badge.plan.desc': 'Complete a daily workout',
  'badge.streak3.name': 'Three in a row',
  'badge.streak3.desc': 'Train 3 days in a row',
  'badge.week4.name': 'Full week',
  'badge.week4.desc': 'Train 4 days in the same week',
  'badge.streak7.name': 'Week on fire',
  'badge.streak7.desc': 'Train 7 days in a row',
  'badge.combo10.name': 'Lightning',
  'badge.combo10.desc': '10 correct answers in a row',
  'badge.explorer.name': 'Explorer',
  'badge.explorer.desc': 'Try all 35 exercises',
  'badge.balanced.name': 'Whole mind',
  'badge.balanced.desc': 'Train all 9 skills within 7 days',
  'badge.levelups25.name': 'Climbing',
  'badge.levelups25.desc': 'Level up 25 times',
  'badge.plans10.name': 'Consistency',
  'badge.plans10.desc': 'Complete 10 daily workouts',
  'badge.combo25.name': 'Storm',
  'badge.combo25.desc': '25 correct answers in a row',
  'badge.nback3.name': 'Deep echo',
  'badge.nback3.desc': 'Reach 3-back in Echo',
  'badge.span7.name': 'Steel memory',
  'badge.span7.desc': 'Reach span 7 in Light grid',
  'badge.glance50.name': 'Hawk eye',
  'badge.glance50.desc': 'Get down to about 100 ms in Glance',
  'badge.neuro800.name': 'Neural net',
  'badge.neuro800.desc': 'Score at least 800 on the Neuro Score',
  'badge.streak30.name': 'A month together',
  'badge.streak30.desc': 'Train 30 days in a row',
  'settings.about': 'Cognitive brain-training game. For fun only: not a medical tool. Exercise, sleep and social life are good for your brain too.',
  'settings.data': 'Your progress',
  'settings.dataHint': 'Save your progress to a file to keep a copy or move it to another device or address of the game: each one has its own save.',
  'settings.export': 'Export progress',
  'settings.import': 'Import progress',
  'settings.importBad': 'This file is not a valid Synapse Dojo save.',
  'settings.importConfirm': 'Replace the current data with the file’s ({name}, {runs} exercises played, last on {last})? Your current progress will be lost.',
  'settings.importDone': 'Progress imported.',
  'privacy.title': 'Privacy and legal notes',
  'privacy.updated': 'Last updated: 31 October 2026',
  'privacy.dataH': 'Your data stays on your device',
  'privacy.data': 'Your name, progress and settings are saved only in this device’s browser (localStorage). They are never sent to a server and nobody, including whoever runs the game, can see them. They are gone if you clear your browser data or use “Delete all data”: you can keep a copy with “Export progress” in Settings.',
  'privacy.cookiesH': 'No accounts, no cookies',
  'privacy.cookies': 'There is nothing to sign up for, and the game uses no cookies, ads or profiling tools. Fonts and game files are served by the same site, with no third-party services.',
  'privacy.hostingH': 'Hosting',
  'privacy.hosting': 'The public version is hosted by Cloudflare (Cloudflare Pages). Like any web server, to deliver the pages and protect them from attacks Cloudflare processes technical data such as your IP address and browser type, under its own privacy policy.',
  'privacy.statsH': 'Visit statistics',
  'privacy.stats': 'Only in the public version, visits are counted with Cloudflare Web Analytics, which uses no cookies, stores nothing in your browser and does not follow people across sites: it only shows aggregate data such as page views, country and device type. Names and exercise results are never sent.',
  'privacy.medicalH': 'Not a medical device',
  'privacy.medical': 'Synapse Dojo is a game for fun. It is not a medical device, does not diagnose anything and makes no promise to prevent, slow down or treat dementia, cognitive decline or any other health condition. Scores only tell you how you do in the exercises. For health concerns, talk to a doctor.',
  'privacy.contactH': 'Contact',
  'privacy.contact': 'Questions about the game or your data: {contact}',
  'privacy.open': 'Open the game',

  'license.title': 'License & Terms',
  'license.subtitle': 'Software license, permitted uses, and copyright terms',
  'license.authorH': 'Author & Intellectual Property',
  'license.authorP': 'Synapse Dojo is an original, independent project created by Sergio Dogliani. All commercial rights reserved.',
  'license.polyformH': 'PolyForm Noncommercial License 1.0.0',
  'license.polyformP': 'The software is released under the PolyForm Noncommercial License 1.0.0. You are free to view the source code, run it, and use it for personal study, education, research, and noncommercial purposes. Any unauthorized commercial use, resale, monetization, or redistribution is strictly prohibited.',
  'license.permittedH': 'Permitted Uses',
  'license.permittedP': 'Personal study, cognitive training, noncommercial research, testing, and private enjoyment with no commercial intent.',
  'license.restrictedH': 'Commercial Restrictions',
  'license.restrictedP': 'You may not use, modify, or distribute this software for monetary compensation, commercial advantage, advertising, or integration into paid commercial products without a written commercial license from the author.',
  'license.fontsH': 'Fonts and Assets',
  'license.fontsP': 'The Nunito font is distributed under the SIL Open Font License 1.1. Psychological exercise paradigms are in the public domain.',
  'license.linksH': 'Official Links & Documentation',
  'license.officialLink': 'Read official PolyForm Noncommercial 1.0.0 text',
  'license.repoLink': 'View LICENSE file on GitHub repository',
  'license.open': 'Open the game',

  'domain.coordination': 'Coordination',

  'shape.circle': 'Circle',
  'shape.square': 'Square',
  'shape.triangle': 'Triangle',
  'shape.diamond': 'Diamond',

  // span
  'ex.span.name': 'Digit Span',
  'ex.span.desc': 'Memorize the number sequence and type it back',
  'ex.span.why': 'Digit span is the benchmark task for short-term capacity and verbal working memory in cognitive neuropsychology.',
  'ex.span.example': '4 8 1 9   Type the numbers in the requested order',
  'ex.span.forward': 'Forward',
  'ex.span.backward': 'Backward',
  'ex.span.watch': 'Memorize {n} digits',
  'ex.span.recallFor': 'Type digits in normal order',
  'ex.span.recallBack': 'Type digits in reverse order!',
  'ex.span.detail': '{ok}/{n} correct · span {span}',

  // stories
  'ex.stories.name': 'Story Memory',
  'ex.stories.desc': 'Read a scenario and recall episodic details',
  'ex.stories.why': 'Episodic memory binds characters, actions, and locations together, exercising hippocampus-mediated narrative recall.',
  'ex.stories.example': 'Read the brief story carefully, then answer specific detail questions',
  'ex.stories.title': 'Scenario {n}',
  'ex.stories.ready': 'I’m ready!',
  'ex.stories.qItem': 'What was {name} carrying?',
  'ex.stories.qPlace': 'Where was {name} located?',
  'ex.stories.qTime': 'When did the event take place?',
  'ex.stories.detail': '{ok}/{n} details correct',
  'ex.stories.text': '{name} had {item} with them. They were {place} {time}, where they completed their task.',
  'ex.anagrams.letters': 'letters',
  'ex.resources.task8': 'Backup',
  'ex.resources.task7': 'Analytics',
  'ex.resources.task6': 'Interface',
  'ex.resources.task5': 'Network',
  'ex.resources.task4': 'AI Core',
  'ex.resources.task3': 'Security',
  'ex.resources.task2': 'Database',
  'ex.resources.task1': 'Server',
  'ex.resources.confirm': 'Confirm selection',
  'ex.resources.value': '⭐ Value: {val} (Target: {target})',
  'ex.resources.budget': '⚡ Budget: {cost}/{budget}',
  'ex.reaction.target': 'Target: < {ms} ms',

  // flanker
  'ex.flanker.name': 'Flanker Test',
  'ex.flanker.desc': 'Focus on the center arrow and ignore flanking arrows',
  'ex.flanker.why': 'Eriksen flanker task measures selective visual attention and resistance to surrounding distractor interference.',
  'ex.flanker.example': '← ← → ← ←   Target is the center arrow (→)',
  'ex.flanker.instruction': 'Tap the direction of the center arrow',
  'ex.flanker.detail': '{ok}/{n} correct · {ms} ms',

  // gonogo
  'ex.gonogo.name': 'Go / No-Go',
  'ex.gonogo.desc': 'Tap quickly on green targets; restrain on red stops',
  'ex.gonogo.why': 'Inhibitory motor control trains prefrontal response suppression, essential for resisting impulsivity and staying focused.',
  'ex.gonogo.example': '● = Tap quickly!   ✕ = Do not tap!',
  'ex.gonogo.hint': 'Tap on ●, do not tap on ✕',
  'ex.gonogo.detail': '{ok}/{n} correct · {ms} ms',

  // msit
  'ex.msit.name': 'Multi-Source Interference',
  'ex.msit.desc': 'Identify the unique number regardless of its position',
  'ex.msit.why': 'The MSIT paradigm activates the anterior cingulate cortex by triggering spatial-identity cognitive interference.',
  'ex.msit.example': '1 2 1   The unique digit is 2',
  'ex.msit.hint': 'Which number is different?',
  'ex.msit.detail': '{ok}/{n} correct · {ms} ms',

  // binding
  'ex.binding.name': 'Color & Shape',
  'ex.binding.desc': 'Find the exact target binding both color and shape',
  'ex.binding.why': 'Feature binding forces visual cortex networks to integrate separate color and shape streams into a single object.',
  'ex.binding.example': 'Find the Blue Circle among Blue Squares and Red Circles',
  'ex.binding.find': 'Find',
  'ex.binding.detail': '{ok}/{n} correct',

  // sorting
  'ex.sorting.name': 'Card Sorting',
  'ex.sorting.desc': 'Deduce the secret sorting rule (Color, Shape, or Count) from feedback and adapt when it changes',
  'ex.sorting.why': 'Inspired by the Wisconsin Card Sorting Test (WCST), trains cognitive flexibility, rule induction, and set-shifting.',
  'ex.sorting.example': 'Card with 3 red triangles: match by shape (triangle), color (red), or count (3). Discover the rule by trial and error!',
  'ex.sorting.hint': 'Match by Color, Shape, or Count. The secret rule shifts periodically!',
  'ex.sorting.detail': '{ok}/{n} correct · {cats} categories',
  'ex.sorting.secretRule': 'Find the secret rule',
  'ex.sorting.dimColor': 'Color',
  'ex.sorting.dimShape': 'Shape',
  'ex.sorting.dimCount': 'Count',
  'ex.sorting.refLabel': 'Reference cards (tap to match)',
  'ex.sorting.targetLabel': 'Card to match',
  'ex.sorting.feedbackStart': 'Make a guess: tap a card to test Color, Shape, or Count',
  'ex.sorting.correct': 'Correct! Rule confirmed',
  'ex.sorting.wrong': 'Wrong! That is not the active rule',
  'ex.sorting.ruleShifted': 'The rule has changed! Find the new rule',
  'ex.sorting.lostRule': 'Rule lost! Maintain the discovered criterion',
  'ex.sorting.perseveration': 'Watch out: you had already ruled this out!',
  'ex.sorting.eliminated': 'Ruled out: {dim} is not the rule',

  

  // resources
  'ex.resources.name': 'Resource Planning',
  'ex.resources.desc': 'Allocate energy budget to maximize total project score',
  'ex.resources.why': 'Knapsack-style planning stimulates prefrontal optimization, trade-off evaluation, and strategic foresight.',
  'ex.resources.example': 'Select projects to maximize score without exceeding energy budget',
  'ex.resources.detail': '{ok}/{n} completed',

  // reaction
  'ex.reaction.name': 'Simple Reaction',
  'ex.reaction.desc': 'Tap immediately the instant the screen turns green',
  'ex.reaction.why': 'Measures pure visual-motor conduction velocity and alertness with minimal cognitive processing delay.',
  'ex.reaction.example': 'Wait for green, then tap immediately',
  'ex.reaction.ready': 'Get ready',
  'ex.reaction.wait': 'Wait for green...',
  'ex.reaction.tapNow': 'TAP NOW!',
  'ex.reaction.early': 'Too early!',
  'ex.reaction.penalty': 'Wait for the green signal',
  'ex.reaction.detail': 'Avg: {ms} ms · Best: {best} ms ({ok}/{n})',

  // dots
  'ex.dots.name': 'Dot Estimation',
  'ex.dots.desc': 'Instantly judge which cloud has more dots without counting',
  'ex.dots.why': 'Trains the approximate number system (ANS) and non-symbolic parietal magnitude representation.',
  'ex.dots.example': 'Quickly tap the side with more dots',
  'ex.dots.hint': 'Which side has more dots?',
  'ex.dots.left': 'Left',
  'ex.dots.right': 'Right',
  'ex.dots.detail': '{ok}/{n} correct',

  // anagrams
  'ex.anagrams.name': 'Word Anagrams',
  'ex.anagrams.desc': 'Unscramble the letters to reconstruct the hidden word',
  'ex.anagrams.why': 'Engages orthographic working memory, lexical search, and mental manipulation of phonological units.',
  'ex.anagrams.example': 'Tap letters in the right order to spell the word',
  'ex.anagrams.hint': 'Tap letters to reconstruct the word',
  'ex.anagrams.detail': '{ok}/{n} solved',

  // fluency
  'ex.fluency.name': 'Word Sprint',
  'ex.fluency.desc': 'Quickly identify words starting with the target letter',
  'ex.fluency.why': 'Verbal fluency tests rapid lexical retrieval from semantic memory under phonetic constraints.',
  'ex.fluency.example': 'Tap if the word starts with the target letter',
  'ex.fluency.targetLetter': 'Target Letter:',
  'ex.fluency.detail': '{ok}/{n} correct',

  // matrix
  'ex.matrix.name': 'Spatial Matrix',
  'ex.matrix.desc': 'Memorize the blue blocks\' layout and place them after mental rotation',
  'ex.matrix.why': 'Demands mental rotation and spatial coordinate transformation, strengthening parieto-frontal circuits.',
  'ex.matrix.example': 'Memorize the pattern and place elements after mental rotation',
  'ex.matrix.memorize': 'Memorize the blue blocks',
  'ex.matrix.itemsToRemember': 'blocks to remember',
  'ex.matrix.same': 'Tap the cells that were illuminated',
  'ex.matrix.noRot': 'Same position (no rotation)',
  'ex.matrix.rot90': 'Rotate 90° clockwise: tap where the blocks are now',
  'ex.matrix.rot90Badge': '90° clockwise',
  'ex.matrix.rot180': 'Rotate 180°: tap where the blocks are now',
  'ex.matrix.rot180Badge': '180° flip',
  'ex.matrix.rot270': 'Rotate 90° counter-clockwise: tap where the blocks are now',
  'ex.matrix.rot270Badge': '90° counter-clockwise',
  'ex.matrix.detail': '{ok}/{n} correct',
  'ex.matrix.confirm': 'Confirm ({sel}/{n})',

  

  // tapSeq
  'ex.tapSeq.name': 'Bilateral Tap',
  'ex.tapSeq.desc': 'Coordinate left and right thumbs to reproduce alternating sequences',
  'ex.tapSeq.why': 'Alternating bimanual tapping activates motor cortices across both hemispheres and stimulates the corpus callosum.',
  'ex.tapSeq.example': 'L - R - L - R   Follow the rhythm with both thumbs',
  'ex.tapSeq.hint': 'Tap left and right in the exact sequence',
  'ex.tapSeq.detail': '{ok}/{n} sequences completed',

  // swipePattern
  'ex.swipePattern.name': 'Bilateral Swipe',
  'ex.swipePattern.desc': 'Execute directional swipes simultaneously with both hands',
  'ex.swipePattern.why': 'Bimanual directional gestures challenge spatial decoupling and symmetric/asymmetric motor coordination.',
  'ex.swipePattern.example': 'Swipe left thumb ↑ and right thumb ↓',
  'ex.swipePattern.hint': 'Perform both directional gestures simultaneously',
  'ex.swipePattern.detail': '{ok}/{n} patterns correct',

  // rhythm
  'ex.rhythm.name': 'Bilateral Rhythm',
  'ex.rhythm.desc': 'Synchronize left and right taps to an alternating beat',
  'ex.rhythm.why': 'Rhythmic bilateral coordination engages the cerebellum and supplementary motor area for precise temporal synchronization.',
  'ex.rhythm.example': 'Tap left and right alternately in time with the beat',
  'ex.rhythm.hint': 'Tap on the beat with the indicated hand',
  'ex.rhythm.detail': '{ok}/{n} hits · avg error {ms} ms',

  // crossMove
  'ex.crossMove.name': 'Cross Movements',
  'ex.crossMove.desc': 'Cross the body midline: respond on the opposite side',
  'ex.crossMove.why': 'Crossing the midline forces information transmission across the corpus callosum, training contralateral integration.',
  'ex.crossMove.example': 'Target on left + "Cross" -> Tap RIGHT button',
  'ex.crossMove.same': 'Same side: Tap matching side',
  'ex.crossMove.cross': 'CROSS: Tap OPPOSITE side!',
  'ex.crossMove.detail': '{ok}/{n} correct · {ms} ms',

  // dualTask
  'ex.dualTask.name': 'Bilateral Dual-Task',
  'ex.dualTask.desc': 'Hold stabilizer with left hand while answering with right hand',
  'ex.dualTask.why': 'Dual-task paradigms isolate divided hemispheric attention and asymmetric motor-cognitive resource sharing.',
  'ex.dualTask.example': 'Hold left button while right thumb answers Even/Odd',
  'ex.dualTask.hint': 'Keep holding left button while choosing Even / Odd',
  'ex.dualTask.hold': 'Hold down (SX)',
  'ex.dualTask.even': 'Even',
  'ex.dualTask.odd': 'Odd',
  'ex.dualTask.notHolding': 'Left button was not held!',
  'ex.dualTask.detail': '{ok}/{n} correct',
};

const words: string[] = [
  // 4 letters
  'boat', 'drum', 'ring', 'ship', 'wolf', 'nest', 'shoe', 'kite', 'star', 'pear',
  'tree', 'lamp', 'moon', 'gold', 'fish', 'coin', 'leaf', 'gate', 'wind', 'bell',
  'cave', 'wave', 'rock', 'deer', 'duck', 'frog', 'hawk', 'lion', 'seal', 'swan',
  'bear', 'beak', 'harp', 'mask', 'sail', 'snow', 'tent', 'rose', 'corn', 'seed',
  // 5 letters
  'cloud', 'piano', 'chair', 'acorn', 'bread', 'brick', 'horse', 'crown', 'river', 'flute',
  'sword', 'tiger', 'apple', 'beach', 'bench', 'brush', 'clock', 'crane', 'drain', 'flame',
  'frost', 'glass', 'grape', 'grass', 'heart', 'house', 'knife', 'lemon', 'melon', 'mouse',
  'onion', 'paint', 'pearl', 'plant', 'plate', 'queen', 'radio', 'scale', 'shark', 'sheep',
  'spoon', 'stone', 'storm', 'table', 'torch', 'train', 'tower', 'whale', 'wheat', 'chest',
  // 6 letters
  'candle', 'island', 'rocket', 'dragon', 'hammer', 'spider', 'mirror', 'violin', 'castle', 'seagull',
  'medal', 'comet', 'sponge', 'bottle', 'bridge', 'camera', 'carpet', 'donkey', 'falcon', 'feather',
  'forest', 'guitar', 'helmet', 'jacket', 'jungle', 'kettle', 'lizard', 'monkey', 'needle', 'palace',
  'parrot', 'pencil', 'pigeon', 'planet', 'rabbit', 'sailor', 'shadow', 'shield', 'shovel', 'silver',
  'stream', 'temple', 'throat', 'ticket', 'tunnel', 'valley', 'walnut', 'willow', 'wizard', 'window',
  // 7 letters
  'dolphin', 'volcano', 'bicycle', 'giraffe', 'penguin', 'blanket', 'captain', 'chimney', 'compass', 'crystal',
  'cushion', 'diamond', 'glacier', 'harvest', 'horizon', 'journey', 'lantern', 'leopard', 'mailbox', 'monster',
  'morning', 'network', 'octopus', 'package', 'painter', 'panther', 'peacock', 'picture', 'pyramid', 'rainbow',
  'rooster', 'sandbox', 'scooter', 'soldier', 'stadium', 'tractor', 'village', 'warrior', 'whistle', 'monster',
  // 8 letters
  'elephant', 'mountain', 'notebook', 'backpack', 'sandwich', 'airplane', 'alligator', 'aquarium', 'baseball', 'building',
  'campfire', 'corridor', 'dinosaur', 'firework', 'flamingo', 'fountain', 'hedgehog', 'hospital', 'kangaroo', 'marathon',
  'necklace', 'painting', 'password', 'platform', 'postcard', 'railroad', 'sailboat', 'skeleton', 'treasure', 'umbrella',
];

const passages: Passage[] = [
  {
    text: 'The lighthouse on Whitestone Island was first lit on a foggy night in 1891. Its keeper, a former fisherman named Arthur, climbed the tower’s one hundred and thirty steps twice a day to clean the great lens and check the oil in the lamp. When electricity finally arrived many years later, the light became automatic, and Arthur was the last keeper ever to live on the island.',
    question: 'How many steps did the tower have?',
    answers: ['One hundred and thirty', 'Three hundred', 'Ninety-one'],
  },
  {
    text: 'Bees that find a good patch of flowers return to the hive and perform a special dance. The angle of the dance compared to vertical shows the direction of the food relative to the sun, while the length of the middle part tells how far away it is. The other bees watch, learn the route and set off themselves, without any of them needing a map.',
    question: 'What does the length of the dance tell?',
    answers: ['How far away the food is', 'The type of flower', 'The time of day'],
  },
  {
    text: 'Martha had decided to learn how to bake bread. Her first loaf came out of the oven as hard as a rock, and the second was raw in the middle. On the third try she understood the problem: the kitchen was too cold and the dough wasn’t rising. Since that day she leaves the bowl near the radiator, covered with a cloth, and on Sunday mornings the whole house smells of warm bread.',
    question: 'Why wasn’t Martha’s bread turning out well?',
    answers: ['The kitchen was too cold', 'She used too much salt', 'The oven was broken'],
  },
  {
    text: 'In the mountains, the temperature drops on average by about six and a half degrees Celsius for every thousand meters of altitude. That is why, even in midsummer, there is snow on the highest peaks. Experienced hikers always carry a warm jacket, because a sunny day in the valley can turn cold and windy a few hours later, once they reach the heights.',
    question: 'How much does the temperature drop every thousand meters?',
    answers: ['About six and a half degrees', 'About two degrees', 'About fifteen degrees'],
  },
  {
    text: 'In the small village of Millbrook, the market is held every Thursday in the square. The busiest stall is not the fruit stand or the cheese stand, but the one run by Eli, who has been repairing clocks and radios for more than forty years. People stop by just to chat: Eli knows the story of every family and remembers everyone’s name.',
    question: 'What does Eli do for a living?',
    answers: ['He repairs clocks and radios', 'He sells cheese', 'He grows fruit'],
  },
  {
    text: 'The octopus has three hearts and blue blood. Two hearts pump blood to the gills, while the third pushes it through the rest of the body. It is also a master of disguise: thanks to special cells in its skin, it can change color in a fraction of a second to blend in or to communicate. Some octopuses even carry coconut shells around as portable shelters.',
    question: 'How many hearts does an octopus have?',
    answers: ['Three', 'One', 'Eight'],
  },
  {
    text: 'The giant sequoia trees of California are among the oldest living beings on Earth, with some individuals exceeding three thousand years of age. A vital secret of their longevity lies in their bark: up to thirty centimeters thick and completely free of flammable resin, it shields the trunk from the intense heat of periodic forest wildfires.',
    question: 'What protects giant sequoia trees from wildfires?',
    answers: ['Thick bark up to thirty centimeters wide', 'Deep roots burrowing into bedrock', 'Constant release of watery sap'],
  },
  {
    text: 'Geckos are famous for their ability to sprint across ceilings and glass panes without slipping. They do not rely on suction cups or glue, but on millions of microscopic bristles on their footpads. These bristles interact with surface molecules through Van der Waals forces, creating powerful adhesion that instantly detaches when peeled at a slight angle.',
    question: 'What enables geckos to climb smooth glass?',
    answers: ['Millions of microscopic bristles', 'A sticky natural secretion', 'Tiny suction pads on their toes'],
  },
  {
    text: 'Aboard traditional wooden sailing ships, crew members measured speed using a chip log. A small wooden board attached to a knotted line was cast off the stern while a sailor turned a thirty-second sandglass. Counting how many knots slipped through his hands before the sand ran out gave the ship’s speed in nautical miles per hour, giving birth to the knot.',
    question: 'How long was the sandglass used on sailing ships to measure speed?',
    answers: ['Thirty seconds', 'Three minutes', 'Fifteen minutes'],
  },
  {
    text: 'Homing pigeons possess a remarkable dual navigation system. Besides tracking the sun’s angle across the sky and mapping wind-borne scents, their beaks contain microscopic magnetite crystals linked directly to the trigeminal nerve. These crystals act as a biological compass that detects the inclination of Earth’s magnetic field even on overcast days.',
    question: 'What do homing pigeons carry in their beaks to sense magnetic fields?',
    answers: ['Microscopic magnetite crystals', 'Pressure-sensitive air sacs', 'Thermal heat sensors'],
  },
  {
    text: 'In September 1783, the Montgolfier brothers conducted the world’s first passenger flight in front of King Louis XVI at Versailles. To confirm that high-altitude air remained breathable, they placed a sheep named Montauciel, a duck, and a rooster into the wicker basket. After an eight-minute flight reaching five hundred meters, the animals landed safely in nearby woods.',
    question: 'Which animals flew on the first passenger hot-air balloon?',
    answers: ['A sheep, a duck, and a rooster', 'Two hunting dogs and a cat', 'A falcon and a white dove'],
  },
  {
    text: 'Giant bamboo holds the record as the fastest-growing land plant on Earth. Under ideal tropical conditions during the monsoon season, its shoots can elongate by nearly a full meter within twenty-four hours. This astonishing rate occurs because all cells in the culm are pre-formed and simply inflate rapidly by absorbing ground moisture like sponges.',
    question: 'How much can giant bamboo grow in a single day?',
    answers: ['Nearly a meter', 'Ten centimeters', 'Three meters'],
  },
  {
    text: 'Deep in the Andean canyons, Inca engineers constructed suspension bridges spanning raging rivers without timber piers or iron cables. Entire communities harvested wild mountain grass, twisting the fibers into slender ropes that were braided into cables as thick as tree trunks. Every year, the worn bridge was cut down and rebuilt in a three-day festival.',
    question: 'What primary material did the Inca use for their suspension bridges?',
    answers: ['Braided wild mountain grass', 'Llama leather strips', 'Cedar boards bound with hemp'],
  },
  {
    text: 'In 1610, Galileo Galilei trained his handcrafted telescope on Jupiter and discovered four bright points of light arranged in a straight line beside the planet. Over successive nights, he observed them shifting positions as they orbited Jupiter. These Galilean moons provided humanity’s first direct visual proof that not all celestial bodies circle Earth.',
    question: 'How many moons of Jupiter did Galileo first discover in 1610?',
    answers: ['Four', 'Two', 'Seven'],
  },
  {
    text: 'Throughout the rainforests of Central America, the ancient Maya regarded cacao seeds as sacred currency and gifts of the gods. Besides using the beans to buy food and goods, they crushed them to brew a bitter, foamy ceremonial drink. They poured the beverage back and forth between vessels to produce a thick froth and spiced it with ground chili peppers and vanilla.',
    question: 'What pungent spice did the Maya add to their foamy cacao beverage?',
    answers: ['Chili peppers', 'Wild ginger', 'Dried cloves'],
  },
  {
    text: 'In selected tropical bays across the Caribbean and Pacific, night waters sparkle with brilliant electric blue light whenever stirred by breaking waves or swimming oars. This phenomenon is generated by billions of single-celled plankton called dinoflagellates. When mechanical stress bends their cell membranes, a chemical flash is triggered to scare away marine predators.',
    question: 'What color is the light emitted by bioluminescent dinoflagellates?',
    answers: ['Brilliant electric blue', 'Emerald green', 'Golden amber'],
  },
  {
    text: 'Chameleons do not change their skin color by mixing liquid pigments in their cells. Beneath their outer skin lies a layer of iridophore cells containing a lattice of guanine nanocrystals. By tensing or relaxing their dermal tissue, chameleons adjust the spacing between these crystals, selectively reflecting specific wavelengths of ambient light like photonic mirrors.',
    question: 'How do chameleons shift their skin coloration?',
    answers: ['By altering the spacing between nanocrystals in their skin', 'By squeezing ink sacs under their scales', 'By changing their surface body temperature'],
  },
  {
    text: 'According to a centuries-old legend from the Ethiopian highlands, coffee was first discovered by an observant young goat herder named Kaldi. He noticed that after his flock grazed on the bright red berries of an unfamiliar shrub, the goats skipped and danced with unusual vitality all through the night. Kaldi gathered a handful of berries and brought them to a nearby monastery.',
    question: 'Who first discovered the energizing effect of coffee berries according to legend?',
    answers: ['An observant goat herder named Kaldi', 'A spice trader from the Red Sea', 'A wandering monk'],
  },
  {
    text: 'Beneath the vast Antarctic ice sheet, snowfall accumulated over millennia has been compressed into pristine blue ice. Trapped within the solid crystal lattice are millions of microscopic air bubbles sealed for hundreds of thousands of years. By drilling ice cores exceeding three kilometers in depth, paleoclimatologists directly extract and test ancient atmospheric samples.',
    question: 'What do climate scientists sample from deep Antarctic ice cores?',
    answers: ['Pristine air bubbles sealed for hundreds of thousands of years', 'Fossilized droplets of seawater', 'Preserved pollen from extinct trees'],
  },
  {
    text: 'Across a dozen coastal and inland deserts worldwide, travelers encounter the acoustic wonder of singing sand dunes. When dry sand avalanches slide down steep leeward slopes, millions of uniformly sized quartz grains collide at identical frequencies. This synchronized friction generates a deep, cello-like drone that can resonate across the desert for several minutes.',
    question: 'What creates the deep acoustic hum of singing sand dunes?',
    answers: ['The synchronized friction of sliding quartz grains', 'High-altitude winds whistling through rock clefts', 'Echoes from subterranean caverns'],
  },
];

import type { StoryScenario } from '../i18n';

export const stories: StoryScenario[] = [
  {
    "name": "Elena",
    "item": "a blue bag",
    "itemDistractors": [
      "a red backpack",
      "a green suitcase"
    ],
    "place": "under the park bench",
    "placeDistractors": [
      "in front of the café",
      "on the train"
    ],
    "time": "at 3:30 PM",
    "timeDistractors": [
      "at 6:00 PM",
      "at 12:15 PM"
    ]
  },
  {
    "name": "Marco",
    "item": "a leather notebook",
    "itemDistractors": [
      "an illustrated book",
      "a black tablet"
    ],
    "place": "on the library table",
    "placeDistractors": [
      "on the terrace",
      "in the waiting room"
    ],
    "time": "Thursday morning",
    "timeDistractors": [
      "Friday afternoon",
      "Tuesday evening"
    ]
  },
  {
    "name": "Sara",
    "item": "a yellow bicycle",
    "itemDistractors": [
      "a silver scooter",
      "a white moped"
    ],
    "place": "beside the central fountain",
    "placeDistractors": [
      "in front of city hall",
      "behind the newsstand"
    ],
    "time": "at 9:00 AM",
    "timeDistractors": [
      "at 11:30 AM",
      "at 2:00 PM"
    ]
  },
  {
    "name": "David",
    "item": "a red wool scarf",
    "itemDistractors": [
      "a blue beanie",
      "a brown jacket"
    ],
    "place": "on the café chair",
    "placeDistractors": [
      "on the harbor wall",
      "in the office hallway"
    ],
    "time": "Saturday evening",
    "timeDistractors": [
      "Sunday morning",
      "Wednesday at 4:00 PM"
    ]
  },
  {
    "name": "Julia",
    "item": "a white ceramic vase",
    "itemDistractors": [
      "a golden lamp",
      "a wooden painting"
    ],
    "place": "on the kitchen windowsill",
    "placeDistractors": [
      "on the entrance counter",
      "on the living room shelf"
    ],
    "time": "at 5:45 PM",
    "timeDistractors": [
      "at 8:00 PM",
      "at 10:15 AM"
    ]
  },
  {
    "name": "Lucas",
    "item": "a pair of sailor binoculars",
    "itemDistractors": [
      "a brass compass",
      "an ancient map"
    ],
    "place": "on the lighthouse rock",
    "placeDistractors": [
      "on the boat’s bow",
      "in the harbor cabin"
    ],
    "time": "at the first light of dawn",
    "timeDistractors": [
      "at sunset",
      "at noon sharp"
    ]
  },
  {
    "name": "Claire",
    "item": "a vintage camera",
    "itemDistractors": [
      "a lens case",
      "an aluminum tripod"
    ],
    "place": "on the panoramic terrace",
    "placeDistractors": [
      "along the linden avenue",
      "on the footbridge"
    ],
    "time": "Friday at sunset",
    "timeDistractors": [
      "Saturday at dawn",
      "Thursday afternoon"
    ]
  },
  {
    "name": "Matthew",
    "item": "a golden pocket watch",
    "itemDistractors": [
      "a silver bracelet",
      "an antique ring"
    ],
    "place": "on the antique dealer’s desk",
    "placeDistractors": [
      "in the hotel safe",
      "in the center display"
    ],
    "time": "Monday at 11:00 AM",
    "timeDistractors": [
      "Wednesday at 3:30 PM",
      "Friday at 9:15 AM"
    ]
  },
  {
    "name": "Valerie",
    "item": "a yellow polka-dot umbrella",
    "itemDistractors": [
      "a green raincoat",
      "a silk shawl"
    ],
    "place": "at the tram stop",
    "placeDistractors": [
      "at the subway entrance",
      "under the square arcade"
    ],
    "time": "Wednesday in the rain",
    "timeDistractors": [
      "Tuesday leaving work",
      "Thursday evening"
    ]
  },
  {
    "name": "Simon",
    "item": "a painted tin box",
    "itemDistractors": [
      "a wooden chest",
      "a glass jar"
    ],
    "place": "on the theater steps",
    "placeDistractors": [
      "in the cinema aisle",
      "beside the ticket office"
    ],
    "time": "Sunday at 2:30 PM",
    "timeDistractors": [
      "Saturday at 9:00 PM",
      "Monday at 6:00 PM"
    ]
  },
  {
    "name": "Fiona",
    "item": "a rolled star map",
    "itemDistractors": [
      "a desk globe",
      "a bronze astrolabe"
    ],
    "place": "at the hilltop observatory",
    "placeDistractors": [
      "in the castle turret",
      "on the planetarium lawn"
    ],
    "time": "at clear midnight",
    "timeDistractors": [
      "at ten in the evening",
      "at two in the morning"
    ]
  },
  {
    "name": "Andrew",
    "item": "an ornate iron key",
    "itemDistractors": [
      "a heavy padlock",
      "an engraved medallion"
    ],
    "place": "in the attic chest",
    "placeDistractors": [
      "behind the living room painting",
      "in the desk drawer"
    ],
    "time": "Tuesday at 4:15 PM",
    "timeDistractors": [
      "Thursday at 10:30 AM",
      "Sunday afternoon"
    ]
  },
  {
    "name": "Sylvia",
    "item": "an enameled cast-iron teapot",
    "itemDistractors": [
      "a crystal pitcher",
      "a porcelain teacup"
    ],
    "place": "on the greenhouse table",
    "placeDistractors": [
      "in the garden gazebo",
      "on the lab counter"
    ],
    "time": "Saturday at 10:00 AM",
    "timeDistractors": [
      "Sunday at 5:00 PM",
      "Friday at breakfast"
    ]
  },
  {
    "name": "Lawrence",
    "item": "a walnut wood flute",
    "itemDistractors": [
      "an antique mandolin",
      "an ebony bow"
    ],
    "place": "on the stone arched bridge",
    "placeDistractors": [
      "along the creek bank",
      "under the old oak tree"
    ],
    "time": "early Wednesday morning",
    "timeDistractors": [
      "Thursday at dusk",
      "Saturday afternoon"
    ]
  },
  {
    "name": "Alice",
    "item": "a box of wax crayons",
    "itemDistractors": [
      "a sketchpad",
      "an oil paint palette"
    ],
    "place": "on the museum staircase",
    "placeDistractors": [
      "in the medieval cloister",
      "at the gallery entrance"
    ],
    "time": "Sunday at 4:45 PM",
    "timeDistractors": [
      "Saturday at noon",
      "Tuesday at 2:00 PM"
    ]
  },
  {
    "name": "Fabian",
    "item": "a woven straw hat",
    "itemDistractors": [
      "a pair of sunglasses",
      "a checkered bandana"
    ],
    "place": "on the fishermen’s dock",
    "placeDistractors": [
      "on the seashell beach",
      "at the sailboat mooring"
    ],
    "time": "Friday at noon",
    "timeDistractors": [
      "Sunday at 11:00 AM",
      "Wednesday at 3:00 PM"
    ]
  },
  {
    "name": "Beatrice",
    "item": "a polished brass lantern",
    "itemDistractors": [
      "a three-branch candelabra",
      "a pocket flashlight"
    ],
    "place": "in the ancient courtyard portico",
    "placeDistractors": [
      "along the frescoed corridor",
      "before the monument gate"
    ],
    "time": "Thursday night at 8:30 PM",
    "timeDistractors": [
      "Friday at dusk",
      "Saturday late at night"
    ]
  },
  {
    "name": "Robert",
    "item": "a battery portable radio",
    "itemDistractors": [
      "a compact turntable",
      "a pocket speaker"
    ],
    "place": "on the carpentry workbench",
    "placeDistractors": [
      "in the garden tool shed",
      "at the mechanic workshop"
    ],
    "time": "Monday at 8:30 AM",
    "timeDistractors": [
      "Wednesday at 1:00 PM",
      "Friday at 5:15 PM"
    ]
  },
  {
    "name": "Camilla",
    "item": "an embroidered silk fan",
    "itemDistractors": [
      "a black lace shawl",
      "a velvet bonnet"
    ],
    "place": "in the castle loggia",
    "placeDistractors": [
      "on the tower balcony",
      "in the hall of mirrors"
    ],
    "time": "Tuesday at sunset",
    "timeDistractors": [
      "Thursday afternoon",
      "Sunday evening"
    ]
  },
  {
    "name": "Gabriel",
    "item": "a yellowed ship logbook",
    "itemDistractors": [
      "a bound nautical atlas",
      "a sealed parchment"
    ],
    "place": "in the old wine press cellar",
    "placeDistractors": [
      "in the sailing ship hold",
      "in the carriage shed"
    ],
    "time": "Saturday afternoon at 3:00 PM",
    "timeDistractors": [
      "Monday at 11:30 AM",
      "Wednesday evening"
    ]
  },
  {
    "name": "Martina",
    "item": "a box of dark chocolates",
    "itemDistractors": [
      "a basket of spiced cookies",
      "an almond cake"
    ],
    "place": "in the pastry shop window",
    "placeDistractors": [
      "on the tea room table",
      "at the grocery entrance"
    ],
    "time": "Thursday at 5:00 PM",
    "timeDistractors": [
      "Saturday at 10:30 AM",
      "Sunday at 4:15 PM"
    ]
  },
  {
    "name": "George",
    "item": "a round magnifying glass",
    "itemDistractors": [
      "a portable microscope",
      "precision tweezers"
    ],
    "place": "on the study desk",
    "placeDistractors": [
      "in the family archive",
      "on the drafting table"
    ],
    "time": "Wednesday at 7:30 PM",
    "timeDistractors": [
      "Tuesday at noon",
      "Friday at 6:45 PM"
    ]
  },
  {
    "name": "Serena",
    "item": "an eco-friendly canvas tote",
    "itemDistractors": [
      "a light wicker basket",
      "a hiking backpack"
    ],
    "place": "at the used book stall",
    "placeDistractors": [
      "at the flower market",
      "outside the organic store"
    ],
    "time": "Sunday morning at 10:15 AM",
    "timeDistractors": [
      "Saturday at 4:00 PM",
      "Thursday at 11:45 AM"
    ]
  },
  {
    "name": "Peter",
    "item": "a cello hard case",
    "itemDistractors": [
      "a sheet music bag",
      "a classical guitar case"
    ],
    "place": "on the winter garden stage",
    "placeDistractors": [
      "in the auditorium foyer",
      "at the concert hall entrance"
    ],
    "time": "Friday evening at 9:15 PM",
    "timeDistractors": [
      "Saturday afternoon",
      "Sunday at 6:30 PM"
    ]
  }
];

export default { ui, words, passages, stories };
