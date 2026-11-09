# Changelog

> *Read this in [Italiano](CHANGELOG.it.md).*

All notable changes to Synapse Dojo (called Synapse Gym until 0.6.0) are listed here, newest first. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

Version numbers come from `package.json`, and each date is the day of the commit that set that version. A commit made after a version bump is listed under the next version, which is the first one to include it. The short code in parentheses is the Git commit.

## [0.14.0] - 2026-11-09

### Fixed

- **Adaptive engine, short sessions** (`src/adaptive.ts`): in games with few trials per session the next level was computed without the last answer and then lowered by a quarter-level warm-up, which cancelled the small step up. **Crack the Code** (one trial per session) therefore dropped 0.25 levels every session even when solved, and in simulation (300 players × 60 sessions) stayed stuck at level 1 with 99.9% success. The threshold now includes the level after the last answer, and sessions with fewer than 8 answers resume exactly where they stopped: Crack the Code converges on 77% success (target 80%).
- **Nonogram and Tangram** forced the fast start every session, contrary to the documentation, and in simulation kept players at 59% success instead of the intended 75% (too hard). The fast start now applies only to the first session, as in every other game, and success converges on 75%.
- **Memory Match**: efficiency was measured against one turn per pair, impossible without luck: even perfect memory scored about 60% and the level could never rise. Efficiency is now measured against the turns a perfect memory needs (about 1.61 per pair, Velleman & Warrington 2013); the level rises below 1.25 times that and drops beyond 1.8 times. Turning up new cards no longer counts as a mistake (it counted towards the speed-bonus accuracy gate, which almost never opened): a mistake is only forgetting a card already seen. Removed the double sounds on every pair and the wrong response time used for the bonus.
- **Speed reading**: the speed bonus was also added in the Neuro Score, which must stay comparable across exercises.
- **Choice reflex and Go/No-Go**: correctly withheld "don't tap" trials recorded the whole waiting window as a response time, skewing the speed bonus.
- **Tangram**: quitting mid-puzzle left the stopwatch running in the background.
- **Badges**: removed a rough estimate of speed bonuses guessed from result texts, which could make progress rise and then fall; badge icons are now all different (⚡, 🥋 and 🌌 were repeated).
- **Timed Word Anagrams with progress bar**: introduced a dynamic trial time limit (16–30 s based on word length, expanded to 26–42 s at a relaxed pace) shown by a smooth time bar with urgency alert; prevents cognitive deadlock (*Einstellung effect* / impasse) at higher levels, supports direct physical keyboard input, and allows active hypothesis testing without prematurely forfeiting the trial on an invalid attempt.
- **Documentation**: 2048 goes up to the 2048 tile (not 4096) and has the stone block at levels 9 and 10 (not 8 and 10).
- **Tangram in 10 languages**: description, rationale, example, in-game messages, buttons, 49 figure names and the "Tangram Master" badge were still in English in Spanish, Portuguese, French, German, Russian, Chinese, Japanese, Hindi, Arabic and Indonesian; they are now translated (the "Flip ⇄" button included). Italian "pts tempo" is now "punti tempo".

### Added

- **Step-by-step instructions for all 40 games**: a "How to play" box with 3–4 numbered steps (what appears, what to do, what counts as a mistake, how difficulty changes) on the intro card and in the guide, in all 12 languages (segmenting principle, Mayer 2009).
- **Adaptive Speed reading**: it was the only game without levels. The level now sets a reading-aloud pace to keep up with (90 → 180 words per minute), shown by a "hare" bar that empties at the target pace. The level rises when the text was understood and the bar beaten and drops after a wrong answer: comprehension always comes first. In the Neuro Score players read at their own pace.
- **Rewards that bring players back**:
  - **Streak multiplier**: +10% XP for every day in a row, up to +50% (loss aversion, Kahneman & Tversky 1979; spaced practice, Cepeda et al. 2006).
  - **Welcome-back bonus**: +15 XP for the first exercise of the day.
  - **Golden synapse**: about one exercise in five gives a 15–50 XP surprise with an animated golden card (variable reward: Schultz 1998; Fiorillo, Tobler & Schultz 2003), plus the new *Golden synapse* badge (3 bonuses found).
  - **Near record**: "Only N points from your record!" when a score is within 5 points of the best.
  - **A hook for tomorrow**: at the end of a workout, how many days the streak will reach by coming back tomorrow.
- Scientific documentation: added Tangram (missing from the catalog), the short-session rule, the new rewards and 5 new references; the English version also gains 6 references that were only in the Italian one.

## [0.13.4] - 2026-11-09

### Added

- **New "Memory Match" Exercise (`memoria`)**:
  - Full implementation of the classic card matching game (*Pelmanism / Concentration*), expanding the Synapse Dojo suite to **40 official exercises** (4 in the Episodic Memory domain).
  - **Rigorous Neuroscientific Foundations**: grounded in the *What-Where binding* paradigm (Ungerleider & Mishkin, 1982; Pertzov et al., 2012) connecting the ventral visual stream (item identity) with the dorsal stream (spatial grid locations) via hippocampal relational memory (Eichenbaum, 2004) and prefrontal proactive interference resolution (Postle et al., 2004; Jonides & Nee, 2006).
  - **Dopamine-rich Gamification**: realistic 3D perspective card flips, golden particle/confetti bursts on matches, floating combo praise toasts (*DOUBLE MATCH!*, *UNSTOPPABLE!*), ascending pentatonic scale chimes (`sfx.ok`), and victory fanfare on board clearance.
  - **10-level Adaptive Progression**: from 3 pairs (6 cards, 3×2) for beginners up to 18 pairs (36 cards, 6×6) for masters, calibrated under the 85% rule (Wilson et al., 2019; Kaernbach, 1991).
  - **6 High-contrast Thematic Decks**: wildlife, space, sweets/food, adventure, music, and abstract geometric symbols (the latter maximizing visual interference to train fine discrimination).
  - **Full Progression Integration**: 0–100 score based on move efficiency, non-punitive additive speed bonus (up to +10 score and +10 XP for quick solves), guided tutorial practice mode, and daily Neuro Score check battery integration.
  - **Complete 12-Language Localization**: all interface strings and descriptions translated and verified across English, Italian, Spanish, German, French, Portuguese, Russian, Arabic, Hindi, Indonesian, Japanese, and Chinese.

## [0.13.3] - 2026-11-08

### Security

- **Resolution for CodeQL alert #3 (`js/insecure-randomness` / CWE-338)**:
  - Implemented Web Crypto API (`crypto.getRandomValues`) in global randomness utilities (`secureRandom`, `rand`, `pick`, `shuffle`) in `src/dom.ts` and in `wordNear` (`src/i18n.ts`), eliminating `Math.random` for element selection and sequence shuffling.
  - Replaced `Math.random` in `check-anagrams.mjs` with `node:crypto` (`randomInt`), and in `tangram` (piece rotation & distractor ID), `path`, `sorting`, and `dualTask` exercises.
  - Strengthened profile token validation (`board.secret`) in `src/storage.ts` with strict regex matching server specifications (`/^[A-Za-z0-9_-]{30,60}$/`).

## [0.13.2] - 2026-11-08

### Added

- Cognitive difficulty overhaul and neuroscientific pacing for **Tangram**:
  - **Dynamic Tier Stopwatch & Timer Bar (Gold / Silver / Bronze / Standard)**: Introduced active visual timer bar tracking processing speed in real-time; finishing within the Gold tier awards maximum score bonus and triggers the +10 XP Speed Bonus according to processing speed theory (Salthouse, 1996; WAIS-IV Block Design).
  - **Monolithic Blind Silhouette**: Disabled magnetic target highlighting (`.target-ready`) during drag and eliminated internal seam hints; solvers must engage authentic part-whole mental decomposition (Shepard & Metzler, 1971) by analyzing the dark silhouette unassisted.
  - **Decoy Distractor Pieces (Levels 5–8)**: Added extra geometric shapes to the tray that do not belong to the target silhouette, challenging dorsolateral prefrontal cortex (DLPFC) feature selection and inhibition.
  - **Anti-Bruteforce Accuracy Tracking**: Logs misplace attempts and suppresses angle reveals, penalizing blind trial-and-error to reward deliberative mental simulation.

## [0.13.1] - 2026-11-08

### Changed

- Resolved icon collisions across catalog games to ensure every game and interface section has a unique, characteristic icon:
  - **Radar** (`radar`): icon updated to `📡` (radar dish for multiple object tracking), removing collision with **Flanker Test** which retains `🎯` (selective attention and flanker inhibition).
  - **Digit Span** (`span`): icon updated to `🧮` (abacus for forward and backward digit working memory), removing collision with **Number Path** (`🔢`).
  - **Word Sprint** (`fluency`): icon updated to `💬` (verbal fluency and lexical classification), removing collision with **Light Grid** (`💡`).
  - Updated reference tables in `README.md` and `README.it.md` with the 39 unique icons.

## [0.13.0] - 2026-11-08

### Added

- Comprehensive profile transfer and temporary cloud sync across devices:
  - Added temporary cloud transfer via D1 database (`temp_transfers` table) generating unique, unambiguous 8-character codes (`XXXX-XXXX`, e.g. `K9XP-4M2J`).
  - Added copy code, copy link (`?transfer=CODE`), and native share buttons for seamless migration between devices without user accounts.
  - Added import by transfer code dialog with real-time profile preview (name, leaderboard nickname, exercise runs, levels, and last activity) before replacement.
  - Automatic privacy deletion: temporary database records are purged immediately upon successful import, and expired transfers (>24 hours) are cleaned up by the nightly cron Worker.
  - Added direct import shortcut on the Onboarding screen for new devices.
  - Localized all transfer dialogs and error notifications in all 12 supported languages.

### Fixed

- Preserved complete user profile data during export, import, and device migration:
  - Fixed `exportJson()`, `parseSave()`, and `store.replace()` to retain leaderboard accounts (`board.id`, `board.secret`, `board.nameCode`, `board.ageBand`) and group memberships.
  - Restoring a save file on another device now completely restores the player's nickname, weekly leaderboard rankings, and group owner/member privileges without data loss.

## [0.12.34] - 2026-11-08

### Changed

- Recalibrated match length and adaptive staircase progression for **Tangram**:
  - Increased puzzle count from 2 to 3 schemes per match in training mode (`ctx.count(3, 2, 1)`: 3 in training, 2 in daily check, 1 in practice/tutorial) matching player feedback following fluid piece controls and instant snapping.
  - Updated duration estimate to `minutes: [1.5, 2.5]`.
  - Re-aligned adaptive staircase to target accuracy `0.75` (consistent with `nonogram`, `stories`, and `game2048`), ensuring natural progression across 3 trials: 3 unassisted solves step up, 2 maintain mastery without punitive drops.
  - Verified speed bonus benchmarks measuring average solving time per puzzle, ensuring consistent dopamine rewards (+10 XP and score bonuses) across 3-puzzle matches.

## [0.12.33] - 2026-11-08

### Changed

- Resolved visual icon collision between the **Gym** and the **Tangram** game:
  - Assigned the dedicated `🥋` icon (Dojo uniform / mental training gi) to the **Gym** menu card and the **Exercises** tab in Progress, reinforcing the Synapse Dojo brand identity alongside Daily Workout (`🏋️`), Onboarding, and Guide.
  - Preserved `🧩` exclusively for **Tangram** and the *Tangram Master* badge.
  - Updated `README.md`, `README.it.md`, `onboarding.ts`, and all 12 localization files with the `🥋` icon and the 39-exercise catalog count.

## [0.12.32] - 2026-11-08

### Changed

- Addressed all 7 feedback points in **Tangram** with comprehensive geometric overhaul, ergonomic controls, and dopaminergic pacing:
  - **1:1 Piece Scale & Tray Visibility**: Tray items enlarged from 54px to 72px with tight viewBox (`-52 -52 104 104`) eliminating the jarring size disparity with the silhouette; dragging clones now scale 1:1 with board units (96px, 1 SVG unit = 1 CSS px) providing seamless visual fit.
  - **Zero Layout Jitter & Rock-solid Stability**: Eliminated bouncing animations and `translateY` shifts that caused vertical layout jumps on interaction; rotating a piece now directly modifies the SVG polygon transform in place without tearing down the board DOM; `.stage-tangram` is top-anchored and the flip button preserves layout geometry via `visibility: hidden`.
  - **Certified Geometry & Clear Snap Feedback**: Fully regenerated puzzles eliminating 72 legacy geometric distortions (e.g. non-orthogonal triangle legs in boat and complex shapes); fixed canonical centered coordinates for the parallelogram `PR`; implemented SVG coordinate snapping with generous proximity tolerance (58 units) and visual orientation pulsing (`.tangram-slot-hint-glow`), clearly demonstrating the required alignment on angle mismatch and eliminating blind trial-and-error.
  - **Optimized Session Length (2 Puzzles)**: Calibrated match length to 2 puzzles per session (1 in practice/check), aligning total duration to ~1.5 minutes like all other dojo exercises.
  - **Speed Bonuses & Dopaminergic Calibration**: Rebalanced adaptive time benchmarks per level (`18s + 6s per piece`) connected to `ctx.withTimeBonus` and `ctx.isSpeedBonus` to reward swift spatial insights with +10 XP bonus and score multipliers.
  - **80 Mathematically Certified Schemes**: Authored 80 zero-distortion puzzles across all 8 levels (10 unique puzzles per level, 3 to 7 tans), localized in all 12 supported languages.
  - **Intuitive Multi-modal Controls**: Added mouse wheel scrolling (WheelUp/WheelDown) for instant rotation, right-click quick spin, live magnetic highlight during drag (`.tangram-slot.target-ready`), and keyboard shortcuts (1-4, A/D, arrows, Space).

## [0.12.31] - 2026-11-08

### Changed

- Resolved visual icon collision in the Gym catalog between **Tangram** and **Odd One Out** (L'intruso):
  - Assigned **Odd One Out** (`odd`) its own dedicated icon `🔍` (magnifying glass / inspection), intuitive for spotting the outlier figure that breaks the common inductive rule, and eliminating duplicate usage of the general Reasoning domain icon (`🧩`).
  - Preserved `🧩` (jigsaw puzzle piece) exclusively for **Tangram**, perfectly matching the classic 7-piece dissection puzzle and the *Tangram Master* achievement badge.
  - Updated `README.md` and `README.it.md` reflecting the 39 exercises and cataloging Tangram in the Visuospatial domain.

## [0.12.30] - 2026-11-08

### Optimized

- Anti-repetition recency memory enhancements for **Tangram**:
  - Verified persistence of proposed puzzle IDs in `localStorage` (`synapse_tangram_recent_puzzles`) with a 30-item sliding window to prevent repeating recent puzzles, matching `nonogram`, `towers`, `stories`, and `reading`.
  - Added deterministic LRU (*Least Recently Used*) fallback recycling: when all puzzles of a staircase level have been completed in recent sessions, the system prioritizes the puzzles played furthest in the past rather than picking randomly.
  - Excluded tutorial practice mode (`ctx.practice`) from recency storage to preserve the memory window exclusively for real training sessions.

## [0.12.29] - 2026-11-08

### Changed

- Radical cognitive challenge overhaul of **Tangram**:
  - Transformed the target board into an authentic **solid mystery silhouette ("sagoma pura")**: removed all internal dashed piece division outlines and hover/drag magnetic highlights that gave away piece placements in live play.
  - Restored genuine neuroscience-backed part-whole spatial decomposition and mental rotation complexity (*Wagemans et al., 2012; Shepard & Metzler, 1971*): players must mentally unpack the solid figure, deduce orientations, and place pieces through pure spatial reasoning.
  - Smart, non-intrusive feedback: tapping or dropping a piece onto the silhouette informs the player whether the piece shape itself is unsuitable or whether the shape is correct but requires rotation.
  - Preserved tutorial onboarding: dashed internal guidelines remain active exclusively during the initial interactive practice mode to facilitate onboarding.
  - Updated exercise description and worked example, with full localization of all new guidance keys across all 12 supported languages.

## [0.12.28] - 2026-11-08

### Added

- New cognitive game **Tangram** (#39) in the Visuospatial domain:
  - Grounded in neuroscience of mental rotation (*Shepard & Metzler, 1971*), part-whole decomposition (*Wagemans et al., 2012*), and frontoparietal networks (posterior parietal cortex PPC, intraparietal sulcus IPS, and dlPFC, *Baddeley 1986; Prado et al. 2011*).
  - High-dopamine "Game Feel" (*Juice*, Swink 2008): magnetic snapping with satisfying tactile woody clacks (`sfx.clack`) and haptic pulse, ascending pentatonic pitch scale on each placed tan (*Goal-Gradient Effect*, Hull 1932; Kivetz et al. 2006), victory fanfare with confetti explosion (`burstConfetti`) and thematic silhouette reveal to drive Eureka insight and positive reward prediction errors (*RPE*, Schultz 1998; Tik et al. 2018).
  - Dual frictionless interaction: tap to select, rotate (↺ -45° / ↻ +45°) and tap target slot, or smooth pointer drag-and-drop with magnetic auto-snap; full keyboard accessibility (arrows, A/D, R, Space, Enter, H, Z).
  - Continuous staircase adaptive difficulty (*Kaernbach 1991; Wilson et al. 2019 "85% rule"*): 8 difficulty tiers ranging from 3 to 7 tans across a rich catalog of 48 mathematically verified puzzle figures (animals, objects, characters, architecture, and classic tangram forms).
  - Seamless ecosystem integration: calibrated session length (~1.5–2 minutes), speed efficiency bonus (+XP & score bonus), recent puzzle anti-repetition memory (`synapse_tangram_recent_puzzles`), dedicated *Tangram Master* achievement badge (level 6), and complete localization across all 12 languages.

## [0.12.27] - 2026-11-08

### Added

- Modular, neuroscience-driven overhaul of the Progress dashboard:
  - Divided the progress experience into 4 distinct, quickly accessible views (`Overview`, `Exercises`, `Consistency`, `Badges`) using a sticky segmented tab bar, eliminating endless scrolling and reducing extraneous cognitive load (*Sweller 1988; Cowan 2001; Miller 1956*).
  - High-dopamine *Overview* tab: executive dashboard featuring key visual indicators (active streak flame, total sessions, badges earned), XP progress bar, daily Neuro Check action banner, a *Next Milestones* card highlighting the 3 closest badges to trigger the Goal-Gradient Effect (*Hull 1932; Kivetz et al. 2006; Berridge & Robinson 1998*), and an interactive 9-domain radar chart identifying top strengths and growth areas with a 1-tap Boost button.
  - *Exercises & Skills* tab: chunked catalog of all 38 exercises filterable by cognitive domain and play status, featuring 20-point historical sparklines, levels, personal bests, and an interactive *▶ Play* button launching immediate practice with automatic return to Progress.
  - *Consistency & Habits* tab: 28-day activity calendar, weekly goal progress bar, consistency metrics, and neuroscientific educational pill explaining distributed practice (*Spacing Effect*, Cepeda et al. 2006; habit automaticity, Lally et al. 2010).
  - *Achievements & Trophies* tab: full Trophy Room with 50+ badges, master completion bar, and dedicated filters (*All*, *In Progress*, *Earned*, *Locked*) leveraging the Zeigarnik Effect (1927) and the endowed progress effect (Nunes & Drèze 2006).
  - Comprehensive localization across all 12 supported languages (`en`, `it`, `es`, `fr`, `de`, `pt`, `ru`, `zh`, `ja`, `ar`, `hi`, `id`).

### Fixed

- Fixed DOM event forwarding from Home to Progress, ensuring the Overview tab always opens and renders immediately by default with all its data and metrics.

## [0.12.26] - 2026-11-08

### Added

- Neuroscience-backed milestone expansion from 17 to 53 badges (36 new achievements):
  - Goal-gradient architecture (*Hull 1932; Kivetz et al. 2006*) sustaining continuous dopaminergic anticipation (*wanting*, Berridge & Robinson 1998) through granular micro-wins, progressive habit markers, and mastery milestones.
  - Neural habit consolidation milestones (*Lally et al. 2010; Hebb 1949*): added badges for 14-day streak (*Two golden weeks*), 21-day streak (*Iron habit*), 60-day streak (*Neural highway*), and 100-day streak (*Centenary mind*), alongside *Perfect week* (7/7 days), *Active weekend*, and *Morning mind* (session completed before 9:00 AM).
  - Training volume and dedication: milestones for 5, 25, 50, and 100 completed daily workouts; 10, 50, 100, 250, and 500 total exercises; 7 and 30 Neuro Score assessments.
  - Multidomain cognitive reserve and bilateral coordination (*Stern 2002; Swinnen 2002; Livingston et al., Lancet 2024*): milestones for 10 and 20 exercises explored, *Versatile mind* (5 different cognitive skills in one day), and *Corpus callosum* (all 5 bilateral coordination tasks explored).
  - Flow, precision, and speed (*Csikszentmihalyi 1990; Schultz 1998, 2015*): *Spark* (5 combo), *Flow State* (50 combo), total level-ups at 50 and 100, speed bonuses collected at 10 and 50 times.
  - XP progression, player levels, and task mastery: milestones for 1,000, 5,000, 10,000, and 25,000 XP, player levels 5 and 10, and level 6 mastery in Towers of Hanoi and Speed math.
- Celebration and social sharing reminder component (*Social Habit Loop*, Christakis & Fowler 2007; Aral & Nicolaides 2017; Ryan & Deci 2000):
  - Upon earning one or more milestones at the end of a session, a festive golden celebration box appears with confetti burst and fanfare, reminding players to share their achievements with family and friends for social reinforcement and mutual inspiration.
  - Direct 1-tap actions: private canvas social card (1080×1080 px, completely client-side without private metrics or names), instant WhatsApp share (`💬 Send on WhatsApp`), Telegram share (`✈️ Send on Telegram`), text copying, and image saving.
  - Extended shareability to 49 out of 53 badges, keeping unvalidated raw diagnostic scores private.
  - Full localization of all 118 new keys across all 12 languages (`en`, `it`, `es`, `fr`, `de`, `pt`, `ru`, `zh`, `ja`, `ar`, `hi`, `id`), verified with `scripts/verify-i18n.mjs`.

## [0.12.25] - 2026-11-08

### Changed

- Extension, unblocking, and recalibration of time and XP bonuses grounded in neuroscience:
  - Systematic audit across all 38 exercises to ensure the availability of the additive temporal efficiency bonus (`withTimeBonus`, awarding up to +10 score points and +10 XP with the `⚡ Speed bonus` badge).
  - Unblocked bonus in Crack the Code (`ex.crackTheCode`): fixed the check in `src/ctx.ts` that required at least 2 correct trials and excluded single-puzzle sessions; introduced dynamic threshold `minCorrect = Math.min(2, Math.max(1, totalAnswers))` and scaled benchmark based on deductive combination length and clues count (`14 + codeLength * 6 + cluesCount * 2`).
  - Fixed and recalibrated 2048 (`ex.game2048`): resolved milestone-level RT mismatch where full milestone durations (20–40s) were tested against the 1.4s benchmark; now tracks the mean decision time per slide move (`milestoneAvgRt`), rewarding fluidity and flow state.
  - Nonogram (`ex.nonogram`): ensured compatibility with single clean solves and verified visuospatial puzzle benchmarks.
  - Integration across missing non-strictly timed games: added score bonus and XP speed bonus logic to Mental Rotation (`ex.rotate`), Speed Reading (`ex.reading`, rewarding high WPM with 100% comprehension), Shape & Color conjunction search (`ex.binding`), and bilateral coordination tasks (`ex.crossMove`, `ex.tapSeq`, `ex.swipePattern`, `ex.dualTask`).
  - Multisensory dopaminergic reinforcement: in `src/screens/play.ts`, earning the speed bonus triggers the crystalline `sfx.coins()` audio-haptic feedback even when not breaking an all-time personal best, maximizing the *Reward Prediction Error* (RPE) and intrinsic drive to keep playing.
  - Academic documentation updated: expanded section 8 in `docs/basi-scientifiche.md` and `docs/scientific-foundations.md` detailing striatal dopaminergic reward loops, drift diffusion modeling (DDM), and insight-driven "Aha!" moment activation.

## [0.12.24] - 2026-11-08

### Changed

- Persistent anti-repetition memory across all fixed-puzzle and fixed-content exercises:
  - Extended the persistent anti-repetition shuffle-bag architecture originally introduced in Nonogram to all games with fixed puzzles, boards, or scenarios, preventing boredom and avoiding answer recall from prior sessions.
  - Shared storage utilities in `src/storage.ts`: added `getRecentHistory` and `saveRecentHistory` with robust FIFO sliding windows in `localStorage` safe against private browsing restrictions.
  - Speed Reading (`ex.reading`): added `synapse_reading_recent_passages` (up to 20 passages) prioritizing unread texts and falling back to least-recently-used (LRU), ensuring comprehension questions measure authentic processing instead of remembered answers.
  - Stories (`ex.stories`): added `synapse_stories_recent_scenarios` (up to 20 scenarios) preventing repeat characters/scenarios across sessions and within the same session.
  - Anagrams (`ex.anagrams`): added `synapse_anagrams_recent_words` (up to 40 words) prioritizing unplayed words at each target length and eliminating in-session duplicate words.
  - Tower of London (`ex.towers`): added `synapse_towers_recent_puzzles` (up to 30 puzzles) tracking `${start}->${goal}` configurations to continuously cycle unique planning challenges.
  - Nonogram (`ex.nonogram`): harmonized to use the shared storage helpers.

## [0.12.23] - 2026-11-07

### Changed

- Nonogram (`ex.nonogram`):
  - Massive puzzle library expansion to 124 unique pixel-art nonograms:
    - Multiplied puzzle variety across all tiers, particularly high levels: Level 1 (8 puzzles, 4×4), Level 2 (10 puzzles, 5×5), Level 3 (16 puzzles, 5×5), Level 4 (16 puzzles, 6×6), Level 5 (16 puzzles, 6×6), Level 6 (18 puzzles, 7×7), Level 7 (18 puzzles, 7×7), and Level 8 (22 master puzzles, 7×7).
    - High tiers (Levels 6, 7, and 8) now feature an extensive collection of 58 distinct 7×7 puzzles (up from 15), providing weeks of daily gym training with zero puzzle repetition.
    - Every single one of the 124 puzzles was exhaustively verified with a backtracking solver to guarantee exactly 1 unique solution solvable with pure deductive reasoning.
  - Cross-session persistent anti-repetition memory (Shuffle-bag):
    - Added a persistent history cache via `localStorage` (`synapse_nonogram_recent_puzzles`) tracking recently solved puzzles across sessions (sliding window of up to 30 puzzles).
    - The puzzle picker filters out recently played puzzles, ensuring high-level players cycle through all puzzles in their difficulty tier before any puzzle is reused.

## [0.12.22] - 2026-11-07

### Changed

- 2048 (`ex.game2048`):
  - Recalibrated adaptive difficulty and cognitive challenge:
    - Replaced pre-stacked adjacent domino chains with an orthogonal corner-and-far-edge layout (`CORNER_LAYOUTS` across all 4 orientations), requiring genuine spatial navigation, tile alignment, and active planning instead of trivial 2-swipe auto-merges.
    - Re-tuned target progression from level 1 to 10: starts at Target 32 (🎯 32) instead of trivial 16, advancing through 64, 128, 256, 512, 1024, to 2048 (with stone obstacles at levels 9–10).
    - Scientifically calibrated move budgets (28 to 55 moves) mathematically verified across 2,000 algorithmic simulation runs to maintain the Kaernbach (1991) 75–85% target accuracy and an engaging 10–18 moves per puzzle.
    - Preserves snappy session pacing (~50–70 seconds total for 3 puzzles), perfectly matching the duration of other gym exercises.

## [0.12.21] - 2026-11-07

### Changed

- Nonogram (`ex.nonogram`):
  - Recalibrated adaptive difficulty (DDA) with dynamic, responsive progression:
    - Enabled responsive fast-climb staircase (`fastStart: true`) with unit step (+1.0 level per clean independent solve), allowing skilled players to level up across rounds within a single session instead of being trapped on the same grid size.
    - Adjusted starting level to Level 3 (`start: 3`): players start directly on deductive 5×5 puzzles featuring multi-run constraints and cross-eliminations (eliminating trivial full-row giveaways).
    - Refined grid scaling curve: Level 1 (4×4), Levels 2–3 (5×5), Levels 4–5 (6×6, 36 cells), Levels 6–8 (7×7, 49 cells with master-tier constraints).
    - Balanced 3-puzzle workout sessions (`ctx.count(3, 2, 1)`): provides an engaging 75–90 second session with a 3-stage challenge arc.
  - Assistance caps & clean solve tracking:
    - Capped "Check" button at 2 uses per puzzle (`checksLeft = 2`), preventing blind trial-and-error and encouraging prospective deduction.
    - Capped hints at 2 on levels 1–3 and 1 on levels 4–8 (`maxHints`), displayed directly on the button badge (`💡`).
    - Clean solve tracking in Kaernbach staircase: using hints or incurring check errors prevents premature overpromotion to larger boards while still rewarding picture completion.
  - Expanded puzzle library to 45 mathematically verified nonograms: added 5 new 7×7 master-tier puzzles (Dragon 🐉, Phoenix 🦅, Samurai ⚔️, Temple ⛩️, Scorpion 🦂), each exhaustively proven to possess exactly 1 unique solution solvable with pure deductive logic.

## [0.12.20] - 2026-11-07

### Changed

- Crack the Code (`ex.crackTheCode`):
  - Calibrated minimum 3-digit combination: restored combination length to a minimum of 3 digits across levels 1–5, scaling to 4 digits for levels 6–8 (`codeLengthFor`), ensuring the exercise retains its authentic padlock identity and intellectual depth.
  - Fine-tuned Dynamic Difficulty Adjustment (DDA):
    - Level 1: 3 digits with 2 elimination ("none") clues (crossing off 6 impossible digits immediately, leaving only 4 candidate digits for 3 dial positions) with 6 attempts for friendly, confident onboarding.
    - Levels 2–3: 3 digits with 1 elimination clue and 5 total clues (5 attempts).
    - Levels 4–5: 3 digits with 4 tight clues (4 attempts) requiring advanced cross-referencing and proof-by-contradiction.
    - Levels 6–8: 4 digits ramping from 5 clues down to 4 minimalist clues (5 to 4 attempts).

## [0.12.19] - 2026-11-07

### Changed

- Crack the Code (`ex.crackTheCode`):
  - Single-puzzle focused session: reduced trials from 2 to 1 in workout/gym mode (`ctx.count(1, 1, 1)`), making each session a concise, self-contained ~30–45s challenge that delivers a high-impact dopamine reward upon unlock without cognitive overload.
  - Gentle learning curve starting at Level 1 (`start: 1`): corrected initial level from 2 to 1 and introduced an approachable 2-digit padlock for levels 1–2, 3 digits for levels 3–5, and 4 digits for levels 6–8.
  - Guided deductive progression: Level 1 and 3 puzzles now supply 2 elimination ("none") clues (crossing out candidate digits immediately) alongside direct placement clues, ensuring intuitive, stress-free solving for beginners.
  - Interactive scratchpad guidance: added an explicit subtitle hint (`· Tap a digit to eliminate or mark it`) directly beneath the scratchpad header for clear discovery.

## [0.12.18] - 2026-11-07

### Changed

- Crack the Code (`ex.crackTheCode`):
  - Calibrated session pacing: reduced trials from 3 to 2 in gym mode (`ctx.count(2, 1, 1)`), keeping session time at an engaging ~60–80 seconds that prevents cognitive fatigue and matches other reasoning games (like Nonogram and 2048).
  - Adaptive attempt budget: dynamically allocates deduction attempts based on level (`attemptsFor(level)`), giving 6 attempts at level 1, 5 at levels 2–3, and 4 at higher levels. This prevents early frustration, enables stress-free hypothesis testing for beginners, and smoothly tightens constraints as mastery increases.
  - In-game deduction rule banner: added a prominent explanatory banner (`💡 Each row shows the exact count of digits in the code. Other digits are excluded.`) that explicitly clarifies all unmentioned digits are excluded.
  - Disambiguated clue phrasings: refined clue copy across all 12 supported languages to make it crystal clear that clues specify the *exact* count of matching digits, completely eliminating ambiguity and guessing.

## [0.12.17] - 2026-11-07

### Added

- Crack the Code (`ex.crackTheCode`):
  - New deductive reasoning game under the **Reasoning & Planning** domain, inspired by classic padlock deduction puzzles (Cognitive Train, Mastermind, Bulls & Cows).
  - Grounded in neuroscience: engages the left frontoparietal network and basal ganglia in multi-constraint satisfaction and hypothesis testing (Prado et al., 2011; Goel, 2007), updates working memory sets (Baddeley, 2000; Miyake et al., 2000), and delivers a burst of dopaminergic reward upon discovering the solution ("Aha!" moment; Tik et al., 2018; Kounios & Beeman, 2014).
  - 100% mathematically proven unique solvability: dynamic puzzle generator with an exact constraint-satisfaction solver guarantees every combination has one and only one unique solution.
  - Interactive Padlock & Scratchpad: physical dial wheels (keyboard 0-9 and arrow key navigation supported), spring-open shackle animation, and a tactile digit scratchpad (0-9) to cross out impossible digits and highlight confirmed ones across clues.
  - Dynamic Difficulty Adjustment: 8 adaptive levels calibrated by Kaernbach's (1991) staircase algorithm towards the optimal 80% accuracy zone (Wilson et al., 2019). Scales from 3-digit combinations with 5 redundant clues down to 4-digit master codes with tight clues.
  - Balanced session duration: 3 trials in gym mode (~60–90 seconds total) and 1 quick trial in daily check mode.
  - Full native localization in all 12 languages.
  - Security: replaced Math.random with Web Crypto API (`crypto.getRandomValues`) and renamed puzzle solution identifiers in Crack the Code (CWE-338), resolving CodeQL alert #2 (`js/insecure-randomness`).

## [0.12.16] - 2026-11-07

### Changed

- Nonogram (`ex.nonogram`):
  - Balanced session duration: reduced trials from 4 to 2 puzzles (1 in daily check and practice) for a concise, engaging ~60–90s session that prevents fatigue and matches the rhythm of the app.
  - Accurate solution validation: removed the staircase penalty that falsely marked puzzles completed with hints as errors; victory is now recognized both by exact solution and by full row/column constraint satisfaction.
  - Constructive checking feedback: the "Check" button differentiates between genuinely incorrect filled cells and incomplete boards, encouraging players when all current deductions are correct.
  - Continuous drag painting: smooth brush-style drag interaction across mouse and touch without unintentional reverts or axis-locking issues.
  - Puzzle refinement: polished the 4×4 `l1_window` grid into a clean symmetric window frame and corrected the guide illustration's column clues.

## [0.12.15] - 2026-11-07

### Changed

- 2048 (`ex.game2048`):
  - Standardized adaptive trial architecture: each milestone now generates a distinct, self-contained puzzle with dynamic corner seeding, fully integrated with the Kaernbach (1991) staircase algorithm.
  - Re-tuned difficulty curve: starts smoothly at level 1 (target 16 instead of 64), ramping up through progressive powers of 2 with generous move budgets (35–60 moves instead of 22) and 3 undos per puzzle.
  - Organic puzzle variety: randomized corner anchoring (bottom-right, bottom-left, top-right, top-left) and secondary placements ensure no two boards are identical, completely eliminating repetitive groundhog-day loops upon defeat.
  - Controlled game duration: session takes 60–80 seconds across 3 puzzles (approx. 20–25s per puzzle), perfectly aligned with other reasoning exercises like Towers and Nonogram.

## [0.12.14] - 2026-11-07

### Changed

- 2048 (`ex.game2048`):
  - Balanced session duration: reduced milestone challenges from 5 to 3 in workout/gym mode (2 in daily check battery, 1 in practice), bringing total game time to a snappy ~60–90 seconds consistent with all other exercises.
  - Hyper-responsive swipe engine: swipe gestures now trigger immediately on `pointermove` as soon as a 16px threshold is crossed without waiting for finger release (`pointerup`), eliminating touch lag.
  - Broad swipe capture: swipe detection now covers the entire game board wrapper area, preventing dropped swipes started near the edges.
  - Zero-delay tactile D-Pad: D-Pad buttons now execute moves instantly on `pointerdown` with event propagation isolation and snappy press animations.
  - DOM diffing optimization: pre-allocated persistent 4×4 cell elements to eliminate grid layout reflows and DOM destruction on each move.
  - Cleaned keyboard listeners preventing duplicate listener accumulation across trials.

## [0.12.13] - 2026-11-07

### Added

- Nonogram (`ex.nonogram`):
  - Introduced the 37th exercise in the cognitive gym under the *Spatial Skills* domain (`spatial`), bringing the spatial area to 3 exercises to balance the daily Neuro Score battery rotation.
  - Authored and mathematically verified 40 original single-solution puzzles across 8 progressive difficulty levels (4×4 to 7×7), guaranteed 100% line-solvable with zero blind guessing required (*Batenburg & Kosters, 2009*).
  - Continuous drag-and-swipe painting (`pointerdown` and `pointerenter`) for swift cell marking across mobile touch and desktop mouse.
  - Dual input toggle (*Fill* and *Cross*) plus desktop right-click shortcut to place crosses instantly.
  - Real-time constraint satisfaction indicators: satisfied row and column clues highlight in green; non-punitive *Check* button and subtle *Hint* (💡) system with pulse animation.
  - Full *Undo* stack (↩) allowing risk-free hypothesis testing and mental spatial planning.
  - Rewarding Gestalt closure celebration: grid borders dissolve upon completion to reveal pixel art with an elastic pop animation, Web Audio API harmonic fanfare, celebratory confetti, and reveal banner naming the illustration.
  - Neuroscientific grounding (NP-complete discrete tomography, frontoparietal visuospatial working memory, and dopaminergic "Aha!" reward surge) documented in `docs/scientific-foundations.md`.
  - Full localization with 13 dedicated strings translated across all 12 supported languages.

### Fixed

- 2048 (`ex.game2048`):
  - Added full visual and layout CSS styling for the 4×4 grid board, empty cell slots, high-contrast pastel tile backgrounds, pop-in and merge animations.
  - Refined the HUD dashboard with structured pill badges for Target, Moves (with warning pulse under 5 moves), Score, and Undo.
  - Styled the tactile accessibility D-Pad with generous touch targets and tactile feedback states.

## [0.12.12] - 2026-11-07

### Added

- 2048 (`ex.game2048`):
  - Added the 36th exercise in the cognitive gym under the *Reasoning & Planning* domain (`reasoning`).
  - Structured around adaptive milestone challenges (target tiles from 32 up to 4096) tailored for quick 60–120s training sessions.
  - Continuous adaptive difficulty via the weighted up-down staircase algorithm with stone obstacles (`🪨`) introduced at levels 8 and 10 to stimulate complex spatial rerouting.
  - Multi-input accessible controls: touch/mouse swipe, keyboard (Arrow keys, WASD), and an on-screen tactile D-Pad designed for older adults and touch accessibility, plus an Undo action (↩).
  - Rich multimodal feedback: harmonic musical pitch scale for merges, merge pulses, haptics, and high-contrast pastel tile palettes.
  - Neuroscientific grounding documented in `docs/scientific-foundations.md` and complete localization across all 12 supported languages.

## [0.12.11] - 2026-11-07

### Changed

- Card Sorting (`ex.sorting`):
  - Streamlined and unified terminology across all 12 supported languages, eliminating artificial "cipher/protocol" metaphors in favor of natural, crystal-clear card sorting language ("Regola segreta", "Carte di riferimento", "Carta da abbinare", "Progresso serie").
  - Replaced title lock icon with clean card icon (`🃏`).

## [0.12.10] - 2026-11-07

### Changed

- Towers of London (`ex.towers`):
  - Fixed peg button shifting and layout jumps: converted pegs into persistent DOM elements with zero-reflow `box-shadow` selection halo and physical grounded baseplate (`.tower-base`).
  - Fluid flight and levitation physics: top ball smoothly elevates with gentle breathing hover on pickup, followed by a parabolic arc flight trajectory across pegs with landing squash-and-stretch.
  - Localized error feedback: attempting to drop a ball onto a full peg now triggers a targeted, tactile shake on that specific peg without jarring the rest of the board.
  - Enhanced sensory feedback: airy lift swoosh on ball pickup, warm mechanical woody clack on drop, tabular numerals on move counter, and celebratory sparkles on completion.

## [0.12.9] - 2026-11-07

### Fixed

- Internationalization (i18n): comprehensive audit and 100% translation coverage across all 12 supported languages (en, it, es, zh, hi, ar, pt, fr, ru, de, ja, id):
  - Market Stall (`ex.resources`): translated and integrated all 7 missing keys (`sell`, `targetGoal`, `tally`, `success`, `perfect`, `itemsCount`, `selectPrompt`) across the 10 languages that were previously lacking them.
  - Anagrams & Towers of Hanoi: eliminated hardcoded Italian tooltips (`'Rimescola lettere'` and `'Annulla mossa'`), now fully localized via new `ex.anagrams.scramble` and `ex.towers.undo` keys across all 12 languages.
  - Added automated audit script `npm run check:i18n` ensuring complete key parity, placeholder consistency, and structural integrity across all locales.

## [0.12.8] - 2026-11-07

### Changed

- Glance (UFOV / Double Decision) & Radar (MOT):
  - Fixed star button displacement on click: decoupled spatial centering via `translate: -50% -50%` and introduced dedicated elastic `glance-pop` animation, eliminating unwanted spatial shifts during interaction.
  - High-fidelity radar aesthetics: concentric radial ring reticle matching the exact ring geometry (24%, 42%, 50%) with precision crosshairs.
  - Luminous golden star with bloom effect, instant tactile pressed states (`:active`), and emerald halo reveals on correct choices.
  - MOT Radar: 3D spherical rendering with radial lighting gradients, glowing target auras during cue phase, subtle sonar background grid, and clear dashed indicators for missed targets.
  - Synchronized multisensory audio-visual-haptic feedback to boost dopaminergic reward loops and flow state engagement.

## [0.12.7] - 2026-11-07

### Changed

- Echo (N-Back): ergonomic duration and pacing optimization, aligning exercise length with app averages (reduced from ~3:00 min down to ~1:30 min):
  - Calibrated series: block length reduced from 20+N to 14+N items (and 10+N in quick Neuro Score check), maintaining psychometric sensitivity and intra-session level adaptation.
  - Dynamic pacing: response window streamlined from 2200 ms to 1600 ms and stimulus duration to 500 ms, eliminating idle dead-time and creating a brisk, rhythm-like flow state.
  - Declared duration updated from `[2, 4]` to `[1, 2]` minutes.

## [0.12.6] - 2026-11-07

### Changed

- Echo (N-Back): enabled explicit "✓ Right! (No match)" verdict banner and full-screen green glow on correct response withholdings (*Correct Rejections*). Removed subtle suppression so users receive unmistakable visual confirmation of successful motor inhibition alongside success chimes and combo progression.

## [0.12.5] - 2026-11-07

### Added

- Internationalization: full native translation of the redesigned Card Sorting ("Secret Cipher") exercise across all 12 supported languages (English, Italian, Spanish, French, German, Portuguese, Russian, Japanese, Chinese, Arabic, Hindi, and Indonesian). All HUD indicators, deduction clues, Eureka prompts, protocol states, and combo feedback are fully localized.

## [0.12.4] - 2026-11-07

### Added

- Echo (N-Back): introduced Zen sensory micro-feedback for successful response withholding (*Correct Rejections* - Signal Detection Theory, Green & Swets 1966), eliminating the feedback void on 70% of non-target trials:
  - Visual validation featuring an emerald pulse on the timer, a gentle aura on the board and unpressed action buttons, and clear affirmative text (`✓ No match: correctly withheld`).
  - Dedicated harmonic `sfx.zen` soft sine chime evolving along the pentatonic scale for calming non-action reinforcement.
  - Continuous combo streak advancement (`🔥 ×3`, `🔥 ×5`...) for successful motor inhibition and attentional filtering, reinforcing dopamine reward pathways (Guitart-Masip et al., 2012) and sustaining flow state.
  - Updated animated walkthrough with `✓ ✋` zen chip and full native localization across all 12 languages.

## [0.12.3] - 2026-11-07

### Added

- Card Sorting: comprehensive neuro-gaming redesign ("Secret Cipher" / Cifrario Segreto) to eliminate clinical dryness and maximize intrinsic motivation, dopamine feedback, and flow state:
  - Structured, tactile cards with symmetrical pip layouts (1, 2, 3, or 2x2 grid) and smooth entrance animations.
  - Rich audio design and haptic feedback (`sfx.whoosh` on deal, `sfx.clack` on selection, ascending pentatonic scale chords on combos, `sfx.sparkle` on cracked codes, and `sfx.coins` on Eureka discoveries).
  - Visual deduction HUD with 3 protocol frequency pills (Color, Shape, Count) providing non-punitive hypothesis testing and eliminating false rules with informative clues.
  - Automated deduction highlight: when 2 dimensions are ruled out, the system automatically spotlights the deduced target rule with a golden glow.
  - 4-combo progress dots (`[ ● ● ● ○ ]`) providing clear, rewarding visual feedback on sequence completion.
  - Seamless, exciting rule shift transitions ("Protocol Shifted!") celebrating cracked codes rather than penalizing players with unpredictable errors.
  - Humane timing curve (scaling from 5.5s down to 2.2s) coupled with additive speed efficiency bonus.

## [0.12.2] - 2026-11-07

### Fixed

- Audio: resolved pentatonic streak ceiling issue where long correct streaks repeated the highest pitch indefinitely (`3135 Hz`). Replaced with a cyclical multi-tier harmonic system (spanning 523 Hz – 1760 Hz to prevent ear fatigue) that seamlessly evolves with tiered harmonic overtones, fifth-interval chords every 5th consecutive hit, and grand major chords every 10th milestone hit.

## [0.12.1] - 2026-11-07

### Fixed

- Security: eliminated modulo bias in group invite code generation (`newCode`), ensuring completely uniform distribution across characters via rejection sampling and resolving CodeQL alert #1 (`js/biased-cryptographic-random`).

## [0.12.0] - 2026-11-06

### Added

- Comprehensive game-feel, sensory responsiveness, and audio overhaul across exercises to maximize engagement and flow:
  - Number Trail: added dynamic glowing laser connecting lines between tapped nodes (SVG trails) and node pop animation on successful taps.
  - Tower of London: added an Undo (↩) button to revert accidental moves before reaching the minimum move threshold; added a natural woody clack sound effect on ball drops.
  - Anagrams: added a Scramble (🔀) button to shuffle available letter tiles; added ascending marimba musical notes when typing letters.
  - Word Sprint: added mobile touch swipe gestures (swipe right for match, swipe left for mismatch) with card tilt feedback.
  - Light Grid: sequence blocks now play a harmonious pentatonic melody during both memorization and user reproduction.
  - Color Clash: added a radial glowing "Color Splash" matching the target color on correct answers.
  - Mental Rotation: added smooth snap rotation animation aligning the test shape with the reference shape on reveal.
  - Bilateral Rhythm & Bilateral Tap: added percussive acoustic drum samples differentiated for left (low tom/bongo) and right (high conga) and natural metronome groove.
  - Bilateral Dual-Task: pulsing energy reactor glow and audio feedback for continuous isometric motor hold.
  - Celebratory confetti particle burst on result screen when beating a personal best, earning a badge, or scoring ≥85.
  - Global audio engine upgrade: ascending warm pentatonic chord progression on streaks and replaced harsh 180Hz sawtooth with gentle wooden thud on errors.

## [0.11.9] - 2026-11-06

### Changed

- Market Stall: redesigned to train heuristic estimation and gameplay engagement. Completely removed the timer and countdown bar, aligning it with other untimed reasoning exercises (Towers, Odd one out); costs and earnings now use friendly numbers (multiples of 5) to eliminate tedious mental arithmetic; earnings are revealed only upon selling via a dynamic count-up animation and coin chime sound effects (preventing blind trial-and-error clicking); added a "Perfect combination" highlight for finding the exact knapsack optimum and an optional speed efficiency bonus.
- Weekly leaderboard results retention is reduced from 8 to 2 weeks: earlier weeks cannot be viewed in the UI or API and improvement is computed locally, so older entries were unused.
- Inactive player retention is reduced from 90 to 30 days. Players who enable the leaderboard but never submit results and join no groups are removed after 7 days.
- Updated the privacy policy across all languages and the scientific documentation to reflect the updated retention rules.

### Fixed

- Deleting an empty group did not clean up its associated bans from the D1 database: orphan bans are now purged automatically during nightly cleanup, when the last member leaves, or when an account is deleted.

## [0.11.8] - 2026-11-05

### Fixed

- Go/No-Go, Choice reflex, Color & Shape, Bilateral Tap, Bilateral Swipe, Bilateral Dual-Task, Pilot and Towers showed "Right answer:" before phrases that are not answers, such as "too slow" or "Time’s up". These cases now show only the reason for the mistake. Real answers stay as they were (`190e5dd`).

## [0.11.7] - 2026-11-05

### Changed

- In Market Stall the earnings bar is purple until the goal is reached, then turns green and thicker, with a check mark and a green border. It does not light up when over budget (`ae6e790`).
- In Simple Reaction the whole play area now counts, not just the pad (`ae6e790`).
- The Neuro Score has a new scale because of the fix below: earlier results stay saved but are no longer compared (`ae6e790`).

### Fixed

- Simple Reaction could call a well-timed tap slow: the green faded in over 150 ms and the clock started before it was on screen. The green now appears at once, and the time runs from the visible green to the touch (`ae6e790`).
- Simple Reaction and Market Stall showed "Right answer:" before the player's own time or the reason for the mistake. They now show only the reason, such as the time and the target missed (`ae6e790`).
- An exercise could score 0 despite several right answers, because accuracy counted only the second half of the trials, the hardest ones in the Neuro Score. It now uses the better of the second half and the whole session. This applies to almost all exercises (`ae6e790`).

## [0.11.6] - 2026-11-05

### Removed

- Vibration and its option in the settings. It depended on the browser and the phone's settings: Firefox for Android does not support it and Chrome on Android drops it in silent mode, so the option could stay on with no effect and the app could not tell. Lengthening the pulses in 0.11.5 did not fix this on the phone where the problem was reported, and the cause given there was never measured. Existing saves still load (`f15dc31`).

## [0.11.5] - 2026-11-05

### Fixed

- Vibration was hard to feel, or absent, on many Android phones because its pulses lasted only 12-30 ms. They now start at 40 ms, and turning the option on in the settings buzzes once as a test. Chrome on Android still drops vibration while the phone is in silent mode, which the app cannot detect (`910df95`).

## [0.11.4] - 2026-11-05

### Changed

- The guide now shows each exercise's duration as a range, such as ~1-2 min or ~3-5 min for Market Stall, instead of figures such as ~2.5 min. The ranges are estimated from the exercises' trials and timings, not timed (`69fd9b3`).

## [0.11.3] - 2026-11-05

### Changed

- The daily workout now says about 10–15 minutes on the home screen, the welcome page and in the README, in all 12 languages, instead of a calculated figure such as "about 11 min", which looked like a timed measurement (`504dcff`).

## [0.11.2] - 2026-11-05

### Fixed

- The home screen, welcome page and FAQ said the Neuro Score takes about 4 minutes, a figure that 0.10.10 had also wrongly restored in the guide and FAQ. They now say about 10–15 minutes in all 12 languages, an estimate from the exercises' trials and timings, not a timed measurement (`20c796a`).

## [0.11.1] - 2026-11-05

### Changed

- Shared cards now say what was done ("First exercise completed") instead of repeating the badge's goal, and the offer button names the badge, in all 12 languages (`e5cb5d4`).

### Fixed

- The week card used the plural with a single training day (`e5cb5d4`).
- The share dialog stays usable on older browsers, with a slow font or when the image can't be created: sharing the text and copying it still work (`e5cb5d4`).

## [0.11.0] - 2026-11-05

### Added

- Optional milestone sharing: an image drawn on the device for sharing your training days this week and your consistency and exploration badges, from Progress or from an offer after earning a badge, in all 12 languages. The card holds no name, date, scores or age. The Neuro Score, levels, skill badges and leaderboard positions stay private, sharing gives no XP, and the offers can be turned off (`fac964f`).
- The scientific documentation explains the choice in §2.7, and the privacy page and the guide's FAQ describe the feature (`fac964f`).

## [0.10.10] - 2026-11-05

### Changed

- App, guide, page metadata and README texts now match the scientific documentation, in all 12 languages. The Neuro Score is described as a trend over several weeks, not validated and not clinical; claims about neuroplasticity and about effects on brain areas are gone; the "Evidence-Based" badge is now "Research-Inspired". The exercise card "Why it works" is now "What it's based on" (`3690f66`).

### Fixed

- Guide and FAQ gave the Neuro Score 15–20 minutes while the home screen said about 4; they now say about 4 (`3690f66`).
- The README and the no-JavaScript page described Rotations as 3D, the no-JavaScript page still used an old game name, and the manifest said "open-source" although the license is source-available (`3690f66`).

## [0.10.9] - 2026-11-05

### Fixed

- Market Stall now gives the real reason for each mistake. It reports what you earned, the minimum and the maximum possible, and says when time ran out or the budget was exceeded, in all 12 languages (`10103d4`).

## [0.10.8] - 2026-11-04

### Changed

- Market Stall shows the minimum earnings to reach, with a generous visible time limit so that players cannot try every combination. After a mistake, the solution and message stay on screen until the player presses Continue (`c98966c`).

### Fixed

- The version in Settings was written by hand and stuck at 0.9.6. It is now read from `package.json` (`c98966c`).

## [0.10.7] - 2026-11-04

### Fixed

- Odd One Out no longer has more than one solution. Depending on the level, 56% to 91% of puzzles had another figure that was unique in some feature but counted as a mistake. Every value of a varying feature now appears on at least two figures (`9fc7818`).

### Changed

- After a mistake, Odd One Out names the feature that sets the right figure apart, in all 12 languages (`9fc7818`).

## [0.10.6] - 2026-11-04

### Changed

- Color and Shape, Bilateral Tap, Bilateral Swipe and Bilateral Dual-Task show the time limit with a bar and say when it has expired (`6b8329c`).
- Bilateral Rhythm has an indicator with the valid zone and the position of the last tap, and explains the opening beats (`6b8329c`).
- Bilateral Tap ends the turn at the first wrong tap (`6b8329c`).
- Bilateral Swipe can be played with a mouse, where only the time limit counts, and explains its controls (`6b8329c`).
- Market Stall highlights the best choice after a mistake (`6b8329c`).

## [0.10.5] - 2026-11-04

### Changed

- The Story Memory break now follows the player's pace. Each number stays until answered, a bar shows the time left and the buttons give feedback. Before, numbers changed by themselves every 1.2 seconds and the last one could flash by for a fraction of a second (`863f6cd`).
- The break text explains, in all 12 languages, that it does not count towards the score. The break respects the relaxed pace and accepts the arrow keys (`863f6cd`).

## [0.10.4] - 2026-11-04

### Fixed

- The Echo grid no longer changes size with the letter: all three rows now have the same height (`41c276c`).

## [0.10.3] - 2026-11-04

### Changed

- Pilot signs have a draining ring showing the time left to answer, which turns green or red with the outcome. The time runs from 3.5 s down to about 0.8 s and expires while the sign is still visible. A white disc separates the sign from the grass (`3bd7c20`).
- Pilot instructions explain the time window and the controls in all 12 languages (`3bd7c20`).

### Fixed

- In Pilot, a late click no longer lands on a sign that has just appeared, and a double click or a held space bar counts as one press (`3bd7c20`).
- With the arrow keys, the car stops when the key is released. Once the keys have been used, mouse movement no longer steers (`3bd7c20`).

## [0.10.2] - 2026-11-04

### Fixed

- Pilot no longer reports false errors about the sign. The road check runs every 2 seconds but its message mentioned an incoming sign even when there was none. It now only says to stay on the road, in all languages, as a small note instead of the large ✗ (`7db4702`).
- Signs appear on the side of the road that has room, so they no longer end up off screen (`7db4702`).
- A slightly late tap on an expired sign no longer counts as a mistake, and the expired sign fades (`7db4702`).

### Changed

- In Pilot, the ✓/✗ mark disappears after 1.2 seconds. The answer time runs from 2.6 s to 0.7 s and starts when the sign is visible (`7db4702`).

## [0.10.1] - 2026-11-04

### Changed

- Anagrams now has 5 levels, so languages with 5 available lengths do not repeat any (`6c46139`).

### Fixed

- Pilot, Color and Shape and Bilateral Tap level labels use the language's decimal separator (`6c46139`).
- In all 12 languages, the guide gives 15-20 minutes for the Neuro Score instead of 4-5, and the descriptions of Story Memory, Color and Shape and Bilateral Tap explain scenes, the break and the time limit (`6c46139`).
- In Russian and Arabic, the question about the moment no longer assumes the character's gender (`6c46139`).
- The scientific documentation reports the real Anagrams lengths (`6c46139`).

### Removed

- The unused text for the Market Stall goal (`6c46139`).

## [0.10.0] - 2026-11-04

### Changed

- **Adaptive engine:** the fast start applies only to the first session and the Neuro Score. The first mistake returns to the last level passed, and the warm-up is a quarter of a level (`b99a913`).
- **Neuro Score:** a perfect performance is worth 100 in every exercise, with no time bonus. Echo measures from 1-back to 3-back, and Pairs uses a fixed list (`b99a913`).
- **Redesigned exercises:** Bilateral Rhythm, Pilot, Story Memory, Market Stall, Color and Shape, Bilateral Tap, Bilateral Swipe, Bilateral Dual-Task and Card Sorting (`b99a913`).
- Time limits and parameters of the other exercises were recalibrated using the cited literature (`b99a913`).
- **Saved data:** timed levels are converted, redesigned exercises recalibrate, and old Neuro Scores are no longer compared (`b99a913`).
- Scientific documentation and README brought in line with the code (`b99a913`).

## [0.9.6] - 2026-11-04

### Added

- Open windows and the installed app update themselves when a new version comes out. When the app returns to the foreground or to Home, it checks at most every 10 minutes whether the main file online has changed. It reloads only with Home on screen, never during an exercise or while typing on another screen (`4e01d15`).

## [0.9.5] - 2026-11-04

### Added

- Group creators can ban a member, who is removed and cannot rejoin with the code. A list visible only to the creator allows readmission (`4532d62`).
- Group creators can replace the invite code. The old code and links stop working and members stay (`4532d62`).
- A button that copies just the group code (`4532d62`).
- Migration 0003. Bans are deleted with the player's data and by the nightly cleanup, and the privacy notice was updated (`4532d62`).
- `npm run check:anagrams` verifies the Anagrams rules across the 12 languages (`2fcf96e`).

### Fixed

- Anagrams accepts every valid anagram in every language, using a per-language table of other valid words with the same letters. Before, only the word on its own list was accepted, so in Italian O C U B rejected CUBO because the list had BUCO (`2fcf96e`).
- In Anagrams, the initial tile order is no longer a valid answer. Words with spaces or hyphens, with all identical letters, or two-letter words also valid backwards are no longer offered (`2fcf96e`).

## [0.9.4] - 2026-11-04

### Added

- "Saved" confirmation after changing the age group in Settings, in 12 languages (`a7b9c45`).

### Changed

- Leaderboard cleanup moved to a new Worker, `cleanup/` (`synapse-cleanup`), running every night at 03:00 UTC with no public address and a log of deleted rows. `npm run deploy` also publishes the Worker (`4b3407f`).

### Fixed

- Cleanup ran at random during score submissions, so without submissions it never ran and the privacy notice's deadlines were not guaranteed. The random cleanup was removed from `submit` (`4b3407f`).
- If saving the age group fails, the menu returns to the previous value and shows the error (`a7b9c45`).
- The page no longer jumps to the top after leaderboard actions: age group, new nickname, leaving (`a7b9c45`).

## [0.9.3] - 2026-11-04

### Added

- Each group lists its members with nickname, creator and weekly consistency, including those who have not trained yet. The list is visible only to members and uses a per-group key instead of the identifier (`e286156`).
- Group creators can remove a member, who can rejoin with the code (`e286156`).

### Changed

- If the creator leaves or deletes their data, the role passes to the longest-standing member (`e286156`).

### Fixed

- The welcome page said the Neuro Score takes 3 minutes over 4 areas. It now says about 4 minutes over all 9 areas, as Home already did, in 12 languages. A leftover formal "vos" in French was also corrected (`289c682`).

## [0.9.2] - 2026-11-04

### Added

- A welcome page card about the optional weekly leaderboard (`03cf5e9`).
- README (Italian and English): leaderboard and groups, more precise privacy details (Turnstile only on joining, cookie-free Web Analytics), project structure with API, migrations and `wrangler.toml`, the `dev:api` and `check:api` commands, and one-time setup for deploying the leaderboard (`284f9f6`).
- Guide (12 languages): a card about the leaderboard and groups. The training time FAQ now links to the consistency formula (`284f9f6`).

### Changed

- The reminder to join appears from the first visit, at the top of Home. "Not now" and "Don't ask again" are unchanged (`03cf5e9`).
- Towers: the counter shows the maximum moves and the trial ends when they run out. Scoring and levels are unchanged (`03cf5e9`).
- "Resource Management" becomes "Market Stall": familiar products, costs and earnings written out in coins, two progress bars and a concrete example. The logic, id and saved levels stay the same (`03cf5e9`).
- Text in 12 languages, README and scientific documentation updated (`03cf5e9`).

### Fixed

- Market Stall excludes cases where every product fits in the budget, and the selected card is readable in the dark theme (`03cf5e9`).
- The guide's Settings card no longer mentions a high-contrast theme, which does not exist (`284f9f6`).

## [0.9.1] - 2026-11-03

### Changed

- After a break of more than 14 days, the improvement starting point drops one level along with the game, so returning players do not start at a loss. The threshold is shared in `adaptive.ts` (`a273820`).
- "Best level", the only skill-based board, opens on the player's age group. Without one, it invites the player to set it (`a273820`).
- The Home box shows the position only in the top half, otherwise the points needed to climb: informative feedback rather than a judgement (`a273820`).

### Fixed

- Scientific documentation: Festinger and Hamari citations corrected, and a source on anxiety and working memory added (Eysenck et al. 2007) (`a273820`).

## [0.9.0] - 2026-11-03

### Added

- Friend groups: create, invite by link or code, boards visible only to members, and deletion of empty groups (`eba172f`).
- Home reminder for those who have not joined, with "Not now" and "Don't ask again". Group invitations also work for players who have not joined yet (`eba172f`).
- Migration 0002, text in 12 languages, privacy notice, scientific documentation and README updated (`eba172f`).

### Changed

- Consistency is now scored in points: 10 per training day plus 1 per exercise or Neuro check, up to 12 a day. The server counts the day's activities and lets them grow by at most one a minute (`eba172f`).
- Improvement: a new exercise starts from the initial level, the overall average uses only exercises with a previous level, and the one exercise without levels uses medians (`eba172f`).
- Ties go to whoever reached the value first, with a time stored per metric (`eba172f`).
- The app requests the leaderboard for the local week (`eba172f`).

## [0.8.0] - 2026-11-03

### Added

- Optional weekly leaderboard that rewards consistency and improvement rather than absolute skill, so that those starting further behind are not discouraged (`a78bc0f`):
  - **API** on Cloudflare Pages Functions with a D1 database (`join`, `submit`, `board`, `me`): random ID and secret hash, generated nickname, days counted by the server, plausibility checks, one submission every 30 seconds, cleanup after 8 weeks or 90 days of inactivity, and equal rank for ties.
  - **Client:** the week's summary is sent after each session and retried if offline. The secret is not exported or overwritten by imports, and a reset also leaves the leaderboard.
  - **Interface:** a Settings section with Turnstile loaded only on joining, a screen with three boards (consistency, improvement, best level) and filters by exercise and age group, and a box on Home.
  - **Tooling:** the service worker does not cache `/api/`, the CSP allows Turnstile, `/api` is proxied in development, and `check:api` and `dev:api` were added.
  - Text and nicknames in 12 languages, privacy notice, FAQ, scientific documentation and README updated.
- `public/404.html`, so missing files get a real 404 and a readable page (`be484fb`).

### Changed

- `wrangler.toml` points to the `synapse-board` D1 database. The deploy script applies pending migrations before publishing and warns if `VITE_TURNSTILE_SITE_KEY` is missing, since nobody could join without it (`875aafd`).

### Fixed

- Pages opened before a deploy failed to load a language and silently fell back to English. If a translation cannot load while online, the app now saves the choice and reloads once, with protection against reload loops (`be484fb`).
- The service worker no longer caches HTML pages in place of scripts or styles. Cache v2 discards wrong copies saved by earlier versions (`be484fb`).
- In six languages (Arabic, German, Hindi, Indonesian, Japanese, Russian), the welcome page and guide still said 17 exercises and 8 areas instead of 35 and 9. 30 sentences were corrected, along with a comment in `progress.ts` (`b5ef2e5`).
- Remaining counts corrected in the achievements: "Explorer" from 17 to 35 exercises (Arabic, Japanese), "Balanced" from 8 to 9 skills (Arabic, Hindi, Indonesian, Japanese, Chinese). In the Arabic welcome page, "eight" spelled out became "nine" in two sentences (`7cc6d81`).

## [0.7.0] - 2026-11-03

This version collects everything done after 0.6.0, including the rename to Synapse Dojo and the growth from 17 to 35 exercises.

### Added

- 18 new cognitive and bilateral exercises with 12-language localization (`b52de91`).
- Responsive mobile header, engaging landing page, game guide, SEO (`robots.txt`, `sitemap.xml`) and translations for the new content (`addc108`).
- Card Sorting: adaptive card timer and processing speed bonus (`e151cd2`).
- Bilateral exercises: full desktop and mobile support with mouse clicks, keyboard shortcuts and touch gestures (`ac6921d`).
- Neuro Score: comprehensive daily check across 9 domains, with exercises rotating daily (`a8e0370`).
- Speed bonus for XP and response time bonus for score across exercises (`7527e14`).
- More stories, reading passages and vocabulary (`cfaf408`).
- Native 24-scenario Story Memory datasets for the remaining languages (`f950521`).
- Dedicated license page with a link in the navigation (`95cbe77`), with the license text localized in 12 languages (`a15b133`).
- References and links to the GitHub repository across the site (`8348371`).
- English versions of the README and scientific documentation (`db162f3`).
- `preview` launch configuration for trying the production build (`fb04396`).

### Changed

- **Renamed the project to Synapse Dojo** in all languages (`941b87b`), with canonical URLs and the sitemap moved to synapsedojo.com (`e6230ff`).
- **License changed to PolyForm Noncommercial 1.0.0** to protect against commercial use (`ce8f59b`).
- **Requires Node 22.12.0 or later.** Vite 5.4.21 → 8.3.5 and TypeScript 5.6.3 → 7.0.2, which resolves two Vite 5 dev server security advisories and leaves 0 npm vulnerabilities. In `vite.config.ts`, `rollupOptions` became `rolldownOptions` (`fb04396`).
- Older adult calibration: initial reaction time threshold of 600 ms, more tolerant Neuro Score scales that respect the relaxed pace, and Cross Movements and Word Sprint starting from the easiest level (`e64b8b6`).
- Working memory difficulty recalibrated: backward sequences moved to advanced levels (`c09d22f`).
- Daily workouts rotate domains and exercises chronologically, so that repeated workouts cover all 9 areas (`616eafe`).
- Meta tags, SEO and catalog updated to 35 games in `index.html` and `guide.html` (`61d07f3`).
- README rewritten with the full architecture and the 9-domain Neuro Score, and the deploy section tidied (`25b0b4f`).
- Scientific documentation renewed for 35 exercises and 9 domains with a full bibliography (`e8b60ce`), and moved from `docs/ricerca-e-proposta.md` to `docs/basi-scientifiche.md` (`74ed7ee`).
- Scientific documentation aligned with the code and the literature. Wrong citations corrected (Enge 2014, Au 2015, Lumsden 2016, Nouchi 2016) along with overstated claims. Added: ACTIVE at 20 years, Lampit 2014, Cochrane 2020, US POINTER, the 2024 Lancet Commission, the original paradigms and a section on older adult calibration (`e64b8b6`).
- Version raised to 0.7.0 (`c7af6ae`).

### Removed

- VPS/Tailscale and GitHub Pages deployment configurations (`13d49f2`).
- GitHub repository links from user-facing screens (`30f9115`). Links came back later in this same version (`8348371`).

### Fixed

- Card Sorting: clearer rules, stimulus generation, dynamic feedback and layout (`6ea6ae4`). Luck bias removed with rational hypothesis tracking and visual elimination of hypotheses, with a penalty only for perseveration (`32244e7`).
- Dot Calculation and Spatial Matrix pacing and difficulty adjusted, Word Sprint controls centered, and the duplicate practice hint toast removed (`4a87b10`).
- Spatial Matrix: rigid 1:1 square cells, with no distortion on selection (`9d2bb0e`).
- Bilateral Dual-Task: balanced difficulty, longer timing, better multi-touch holding and PC keyboard controls (`eb3b6ab`).
- Bilateral Rhythm: beat with tick and visual pulse, and taps judged against the nearest beat (`e64b8b6`).
- MSIT: control ("1 0 0") and interference trials as in the original paradigm (`e64b8b6`).
- Reaction Time: no more unhandled rejected promises during the wait (`e64b8b6`).
- Keyboard listeners are also removed on exit (Flanker, Go/No-Go, MSIT, Bilateral Dual-Task) (`e64b8b6`).
- Bilateral Dual-Task: the hold must last the whole trial, and fixed Italian text was removed (`e64b8b6`).
- Pauses no longer overwrite the response time used for the speed bonus (`e64b8b6`).
- Radar no longer freezes on small screens. Light Grid has no repeats and two attempts per length (`e64b8b6`).
- Level labels are consistent and localizable, and Speed Reading no longer rewards skipping the text (`e64b8b6`).
- Localization completed across the 12 languages with full content parity (`0b6d720`, `18567d9`, `bd836b9`):
  - Intro card example scenes no longer contain fixed Italian text.
  - Bilateral exercises use ◀ ▶ arrows instead of the English letters L/R.
  - In Arabic (right-to-left), controls with a physical side (hand, arrow keys) stay on the left or right.
  - Anagrams handles letters as graphemes with `Intl.Segmenter`, so Hindi does not split vowels, and short-word languages such as Chinese use the nearest available length.
  - Decimals and dates follow the language, always with Latin digits.
  - Arabic gained `{best}` in the Reaction Time result, Hindi lost "(Even)/(Odd)", and a duplicate word was removed from the English list.
  - Word Sprint and Dot Calculation explanations corrected in all languages.
  - `tsconfig` uses ES2022 types for `Intl.Segmenter`, while the target stays ES2020.
- Author name corrected to Sergio Dogliani (`39dec0c`).

### Security

- No more `innerHTML`, and stricter validation of imported saves (`e64b8b6`).
- RFC 5545 escaping in the `.ics` reminder, and no-cache for `/license` (`e64b8b6`).
- Vite 5.4.21 and Wrangler 4.156.2 security patches, followed by the Vite 8 upgrade listed above (`e64b8b6`, `fb04396`).

## [0.6.0] - 2026-10-31

### Added

- 12 languages: English, Spanish, Chinese, Hindi, Arabic, Portuguese, French, Russian, German, Japanese, Indonesian and Italian. There is one locale file per language in `src/locales`, loaded on demand, with English bundled as the fallback (`7a05fbc`).
- Language menu at the top of the welcome and home screens, on the privacy page and in Settings (`7a05fbc`).
- Echo letters and voice per language, and Speed Reading counts characters in Chinese and Japanese (`7a05fbc`).
- Right-to-left layout for Arabic, with exercises keeping their spatial layout (`7a05fbc`).
- Self-hosted Cyrillic subset of Nunito (`7a05fbc`).

### Changed

- The first visit is in English. The choice is saved and restored on the next visit (`7a05fbc`).
- Contact shown on the privacy page set (`2e3f72b`).

## [0.5.0] - 2026-10-31

### Added

- Public release on Cloudflare Pages: `deploy:web` publishes `dist/` by direct upload (`150bbcc`).
- Privacy and legal notes screen (Settings, onboarding) and a static `privacy.html`, in Italian and English (`150bbcc`).
- Cloudflare Web Analytics in the web build only (`150bbcc`).
- Export and import of progress as JSON, validated and confirmed before replacing (`150bbcc`).
- `public/_headers` with CSP, security and cache headers (`150bbcc`).
- Echo: looping 1-back walkthrough on the intro card, a memory strip in guided practice highlighting the item to compare, and a card explaining dual mode the first time letters appear (`5920667`).
- Echo: opening and closing cards for each series, a turn counter and a time bar for every square (`8456eb8`).

### Changed

- Self-hosted Nunito (latin and latin-ext), with no more Google Fonts requests (`150bbcc`).
- The service worker caches same-origin requests only, with a new cache name (`150bbcc`).
- Pairs study screen: each pair is one linked card in a single column, the title and tip explain that only the symbol will be shown later, and the countdown is labelled in seconds and reflected in the progress bar (`da615dd`).
- Echo: simpler description and correct singular wording for 1-back (`5920667`).
- Echo: a press is judged at once and a missed match is reported at the end of the same turn. Every series has at least 20% matches, with a minimum of 2 (`8456eb8`).
- Echo dual mode: guided practice runs at the player's level, so dual can be practised (`ad68b5e`).

### Fixed

- Echo dual mode: letters chosen so their spoken names do not sound alike, with separate sets per language. The letter is also written in the square, speech is no longer dropped after `cancel()`, and wrong-press feedback names the button (`ad68b5e`).
- All games audited with a rule-following bot (`d353ed7`):
  - **Pilot:** presses went to the nearest sign even when reacting to the green circle, signs at the top edge did not count yet, feedback came only when the sign passed the car, and a stray press also failed the next sign. Presses now go to the green circle on screen, are judged at once, and each error says why.
  - **Grid:** ✓/✗ arrived after the 1.8 s answer display and now comes right after the last tap.
  - Odd One Out, Math Sprint and Grid show the right answer in the ✗ banner.
  - The audio context resumes if a mobile browser starts it suspended.

## [0.4.0] - 2026-10-31

### Added

- Multiple workouts per day: after finishing one, you can start another that picks the skills and exercises trained least that day (`4fe0729`).
- Every answer shows a big right/wrong banner with a screen glow and, on mistakes, the right answer. Correct buttons and tiles are highlighted (`4fe0729`).

### Changed

- Glance is slower: 700 ms start, 11% steps, 85% target and fast start only in the first session, with longer pauses and a visible solution after each trial (`4fe0729`).

### Fixed

- Echo scores hits minus false alarms, so silence no longer scores 70%. Staircase scores scale with accuracy in the second half, and the Math check times answers only (`4fe0729`).

## [0.3.0] - 2026-10-31

### Added

- `deploy:vps` script serving the game over Tailscale on dedicated HTTPS port 8443, with the manifest renamed to `.json` so it gets a JSON content type (`c422c4e`).
- Illustrated example and one-line worked example on every intro card (`bd9936f`).
- Guided, unscored practice round, offered automatically the first time (`bd9936f`).
- In-game streak combo with rising pitch, level-change toasts and vibration (`bd9936f`).
- Results with a level message, level history sparkline, XP and player level (`bd9936f`).
- 17 achievements, weekly goal, forgiving streak, next goal on Home and a daily reminder as a downloadable calendar event (`bd9936f`).

### Changed

- Adaptive engine v2: weighted up-down staircase (Kaernbach) on continuous levels targeting about 80% accuracy, with fast start, frustration guard, warm-up start and detraining (`bd9936f`).
- Home actions clarified: Workout versus Measure your Neuro Score (`9b7f400`).
- Research notes for this round added to `docs/ricerca-e-proposta.md` (`bd9936f`).

## [0.2.0] - 2026-10-30

### Added

- Evidence-based redesign with 17 adaptive exercises across 8 skills, on a shared staircase engine with per-exercise levels saved between sessions (`a5b424e`).
- New exercises: Glance (UFOV), Echo (dual n-back), Rule Switch, Rotations, Radar (MOT), Pilot (multitasking), Towers (Tower of London), Odd One Out, Last Digits (running span), Pairs and Speed Reading (`a5b424e`).
- Daily workout picked from the least-trained skills, a new 4-test daily check, skill radar, weekly goal, "why it works" cards, relaxed pace and large text (`a5b424e`).
- Research notes and design rationale in `docs/ricerca-e-proposta.md` (`a5b424e`).

### Changed

- Existing exercises became adaptive: Corsi also runs backwards, Choice Reflex has go/no-go, and Stroop is timed with rule switching (`a5b424e`).
- The GitHub Pages deploy became manual while the repository is private (`3facaac`).

## [0.1.0] - 2026-10-30

### Added

- Repository created with an MIT license (`17beffd`), then merged with the local project (`73cee99`).
- First version, named Synapse Gym: six original exercises, daily Neuro Score check, progress tracking, Italian and English localization, offline PWA support and GitHub Pages deployment (`a89780b`).
