# Changelog

> *Read this in [Italiano](CHANGELOG.it.md).*

All notable changes to Synapse Dojo (called Synapse Gym until 0.6.0) are listed here, newest first. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

Version numbers come from `package.json`, and each date is the day of the commit that set that version. A commit made after a version bump is listed under the next version, which is the first one to include it. The short code in parentheses is the Git commit.

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
