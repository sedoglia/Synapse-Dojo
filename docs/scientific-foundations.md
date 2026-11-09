# Synapse Dojo · Scientific Foundations, Cognitive Paradigms and Architecture

*Official scientific documentation and neuropsychological rationale of the cognitive training and bilateral coordination program.*  
**Author:** Sergio Dogliani · **Project:** [synapsedojo.com](https://synapsedojo.com) · **License:** [PolyForm Noncommercial 1.0.0](../LICENSE)

> *Leggi in [italiano](basi-scientifiche.md).*

---

## 1. State of the Art in Cognitive Research

**Synapse Dojo** starts from a premise of **intellectual honesty and methodological rigor**: keeping its distance from the misleading promises and pseudoscientific marketing of the first generation of commercial "brain training" apps.

As the major review by the international scientific community showed (*Simons et al., 2016*, *Psychological Science in the Public Interest*), many commercial brain games improve only the trained task or very similar ones (*near transfer*), with weak or absent evidence of transfer to complex everyday activities (*far transfer*). Meta-analyses in healthy older adults confirm a **modest but real** picture: computerized cognitive training brings small average gains in cognitive performance (*g* ≈ 0.22), varying by domain and larger when practice is regular and supervised (*Lampit et al., 2014*); the Cochrane review, limited to programs of at least 12 weeks, still rates the overall quality of evidence as low (*Gates et al., 2020*).

For this reason Synapse Dojo does not use arbitrary tasks or pure-dexterity minigames: it draws on the **most studied experimental paradigms in the neuropsychological literature**, and states clearly what the evidence does and does not show.

### Summary of Key Evidence

| Approach & Paradigm | Main Study and Source | What the evidence says |
|---|---|---|
| **Processing speed / Useful Field of View (UFOV)** | ACTIVE trial: *Ball et al., 2002*; 10-year follow-up (*Edwards et al., 2017*); 20-year follow-up (*Coe et al., 2026*) | At 10 years, speed-of-processing training was associated with a **29% lower dementia risk** (HR 0.71; 95% CI 0.50–0.998), with a dose-response effect (about −10% per additional session). At 20 years, on Medicare claims, the benefit (about **−25%** diagnoses) appeared **only in the group that also received booster sessions**; memory and reasoning training showed no effect. This is a secondary analysis of administrative diagnoses: a promising result, not proof of prevention. |
| **Continuous visuomotor multitasking** | NeuroRacer, UCSF (*Anguera, Gazzaley et al., Nature 2013*) | In older adults (60–85), adaptive multitasking training reduced interference costs, with benefits kept at 6 months and transfer to sustained attention and working memory. The same approach underlies EndeavorRx, the first therapeutic video game authorized by the FDA (2020), for pediatric ADHD. |
| **Mental rotation and spatial cognition** | Meta-analysis of 217 studies (*Uttal et al., 2013*) | Average effect **g = 0.47**, robust and durable, with transfer to new spatial tasks. |
| **Fast arithmetic and reading aloud** | "Learning Therapy" (*Nouchi, Kawashima et al., 2016*) | In an RCT with 64 healthy older adults, 6 months of reading aloud and simple calculations improved inhibition, verbal episodic memory, attention and processing speed compared with a wait-list control group. |
| **Working memory (dual N-Back and Span)** | Meta-analyses (*Au et al., 2015*; *Melby-Lervåg & Hulme, 2013*) | Reliable gains on trained and similar working-memory tasks (*near transfer*); transfer to fluid intelligence is small and debated: Au et al. report a modest effect, Melby-Lervåg & Hulme no solid far transfer. |
| **Inhibition and interference control (Stroop, Flanker, Go/No-Go, MSIT)** | *Stroop (1935)*, *Eriksen & Eriksen (1974)*, *MacLeod (1991)*, *Bush & Shin (2006)* | Classic paradigms measuring the ability to suppress automatic responses and filter distractors, with documented involvement of the anterior cingulate and prefrontal cortex. Evidence that *training* them improves inhibition in general is scarce (*Enge et al., 2014*, a null result in young adults): in Synapse Dojo they serve mainly as exercise and measure of selective attention. |
| **Flexibility and Task Switching** | *Karbach & Kray (2009)*; *Toovey, Kattner & Schubert (2021)* | Rule-switching training reduces switch costs in older adults too, with transfer to untrained switching tasks; far transfer (inhibition, intelligence) remains limited. |
| **Bimanual coordination and midline crossing** | *Swinnen (2002)* | Bimanual movements, especially asymmetric ones, require integration between hemispheres via the corpus callosum and supplementary motor areas. Synapse Dojo's bilateral exercises are a coordination and attention activity: there is no evidence that an app of this kind "strengthens" the corpus callosum or global brain connectivity. |
| **Multidomain and lifestyle interventions** | FINGER trial (*Ngandu et al., Lancet 2015*); US POINTER (*Baker et al., JAMA 2025*); Lancet Commission (*Livingston et al., 2024*) | Interventions combining physical activity, diet, cognitive stimulation, social contact and vascular risk control improve global cognition in at-risk older adults. The Lancet Commission estimates that acting on 14 modifiable risk factors (including hearing loss, hypertension, physical inactivity, social isolation, vision loss and high LDL cholesterol) could prevent or delay up to 45% of dementia cases. Cognitive training is one piece, not a substitute. |

---

## 2. Synapse Dojo Design Principles

The evidence above leads to the platform's building blocks:

1. **Continuous Adaptive Difficulty (all 40 exercises):**
   An exercise that is too easy is boring; one that is too hard is frustrating and leads to dropping out. Synapse Dojo uses a weighted up-down staircase (Kaernbach 1991) that keeps each user near their own threshold: the accuracy target is **80%** in most exercises, 85% in Glance and 70–75% in memory and planning tasks, where each trial is longer and a mistake weighs more. Block-based exercises (Echo, Pairs, Word vault, Memory Match, Number trail, Speed reading) change level between blocks with equivalent thresholds. Since version 0.14 **Speed reading** is adaptive too: the level raises the reading-aloud pace to keep up with (90 → 180 words per minute), never the difficulty of the text, and comprehension comes first (a wrong answer lowers the level whatever the speed).
2. **Priority to Paradigms with the Highest Transfer Value:**  
   Central role for peripheral visual processing speed (UFOV), continuous multitasking, mental rotation and working memory.
3. **Separating Measurement from Training:**  
   - The daily **Neuro Score** always uses the same starting point and its own version of each exercise, often shorter, to follow trends over time (0–1000 across all 9 domains).
   - **Daily Training** and the **Gym** are fully adaptive, to drive improvement.
4. **Accessible to Everyone, Older Adults Included** (see §5).
5. **Honesty Toward the User:**  
   Synapse Dojo is a tool for active leisure and personal stimulation: it makes no medical diagnoses, does not promise a cure for or immunity from neurodegenerative diseases, and always reminds users that overall lifestyle (exercise, sleep, social life, looking after hearing and sight) is essential.
6. **Social Comparison That Doesn't Discourage (optional weekly leaderboard):**
   Comparing ourselves with others is a strong motivator (Festinger 1954), and gamification elements such as leaderboards mostly raise engagement, though the effect depends on context and on the person (Hamari et al. 2014). A ranking of raw ability, however, tells most players that they are losing: it undermines the sense of competence that keeps intrinsic motivation alive (Ryan & Deci 2000), and the anxiety it can cause takes up the attentional resources that working memory needs (Eysenck et al. 2007). It would also undo the adaptive design, which keeps each person at *their own* threshold. So the leaderboard is **off by default** and ranks **effort and improvement, not talent**: training days in the week, change of level against one's own starting point, and the week's best level per exercise, with optional self-declared age groups and relaxed-pace players ranked apart. Best level is the one ranking of ability, so it opens on the player's own age group. It **resets every Monday**, ties share a place, and each player sees the top 3 and the 5 people just above and below them, a race close enough to win, never a list of 100 names. **Consistency** gives 10 points per training day plus 1 per exercise or Neuro check, up to 12 a day: training more is rewarded, but spreading it over the week counts more, in line with the spacing effect (Cepeda et al. 2006). **Improvement** starts from the level reached before the week (or from the starting level of a new exercise), and the overall figure averages only exercises with an earlier level, so trying new ones is never penalised; after a break of more than 14 days the starting point drops one level together with the game, so coming back never starts with a loss. The home screen shows the rank only in the top half and otherwise how many points move the player up: feedback that informs rather than judges (Ryan & Deci 2000). Private **groups of friends**, joined with a link or a code, bring the comparison closer to people like us, the ones we most naturally compare ourselves with (Festinger's similarity hypothesis, 1954). The app suggests the leaderboard now and then, saying plainly that it is optional, and never again after "Don't ask again".
7. **Sharing with Friends and Family as Social Reinforcement (optional cards):**
   We know of no study that directly tests sharing results from cognitive training, so this design extrapolates from the literature on habit formation and social networks. Visible healthy practices spread through social networks (Aral & Nicolaides 2017; Christakis & Fowler 2007), and sharing milestones with family and friends activates the social brain network (medial prefrontal cortex, temporoparietal junction) and mesolimbic dopamine pathways through social validation and belonging (*Relatedness*, Ryan & Deci 2000). At the same time, public posting follows reward learning: people post more after many likes and less after few (Lindström et al. 2021), and negative age stereotypes harm older adults' cognitive performance (Lamont et al. 2015). For this reason, Synapse Dojo protects players by strictly separating what can be shared: **players can share milestones of consistency, dedication, volume, flow, exploration, and positive daily habits (over 50 shareable badges)**, which anyone can earn at their own pace and level. The diagnostic Neuro Score and raw scores **stay private**: the Neuro Score isn't a validated clinical measure (§4), and a feed of raw scores would reintroduce the toxic competition that point 6 avoids. When players unlock a milestone, the app presents a **celebratory reminder** highlighting the achievement and encouraging them to share it with family and friends (via an on-device canvas card, native system share, WhatsApp, or Telegram), with zero pressure, zero XP rewarded for sharing (sharing remains genuinely intrinsically motivated), and the option to dismiss offers forever.
8. **Dopaminergic Circuits, Reward Prediction Error (RPE), Milestone Architecture, and Non-Punitive Speed Bonus:**  
   Dopamine release in the ventral striatum (nucleus accumbens) does not simply signal the completion of an action, but encodes the discrepancy between actual and expected reward (*Reward Prediction Error*, $\text{RPE} = \text{Actual Reward} - \text{Expected Reward}$; Schultz 1998, 2015). Synapse Dojo leverages this neurobiological mechanism through a multi-tier motivational architecture:
   - **Goal-Gradient Effect (*Hull 1932; Kivetz et al. 2006*)**: motivation accelerates as one nears a goal. A granular catalog of 50+ milestones distributed across progressive distances (immediate micro-wins like 5 combo, 10 exercises, or morning training; intermediate habit-consolidation milestones at 14 and 21 days as modeled by Lally et al. 2010; up to mastery milestones at 60 and 100 days) prevents reward extinction and maintains a strong dopaminergic anticipation signal (*wanting*, Berridge & Robinson 1998).
   - **No penalty for reflective deliberation**: unlike hard countdown timers that induce performance anxiety and drain prefrontal working memory resources (Eysenck et al. 2007), the speed efficiency bonus (`timeBonus` up to +10 points on score and +10 XP with the `⚡ Speed bonus` badge and pleasant multi-harmonic audio-haptic feedback `sfx.coins`) is purely additive. Players answering carefully receive full credit for their accuracy; players demonstrating cognitive agility receive an unexpected boost (positive RPE).
   - **Anti-impulsivity accuracy gate**: under the Drift Diffusion Model (DDM, Ratcliff & McKoon 2008), rewarding unconstrained speed lowers the decision threshold and triggers random guessing. Synapse Dojo enforces an accuracy gate ($\ge 65\%$), ensuring the bonus rewards true neural processing efficiency rather than impulsive clicking.
   - **Streak multiplier and loss aversion**: each exercise's XP grows by 10% for every day of the current streak, up to +50% from day five. A chain that is worth more is something to protect (loss aversion, Kahneman & Tversky 1979), and it rewards the daily, spaced practice that helps learning most (Cepeda et al. 2006). The cap and the weekly rest day the streak already allows keep a missed day from feeling like a disaster.
   - **Welcome-back bonus**: the first exercise of the day is worth +15 XP, a small incentive to come back every day, even for a few minutes.
   - **Golden synapse: variable reward**: about one exercise in five, at random, earns a surprise bonus of 15–50 XP with a golden card and its own sound. Dopamine neurons respond most to rewards that were not predicted (Schultz 1998) and keep a sustained response to uncertain ones (Fiorillo, Tobler & Schultz 2003): an unpredictable prize makes the end of every exercise interesting. It never depends on the score (it rewards effort, not talent) and counts towards the *Golden synapse* badge (3 bonuses found).
   - **Near record**: when a score falls 5 points or fewer short of the personal best, the result screen says so ("Only 3 points from your record!"): a close, concrete goal invites one more try (goal gradient).
   - **A hook for tomorrow**: at the end of a workout the game says how many days the streak will reach by coming back tomorrow, closing the session with an open goal (Zeigarnik effect, 1927).
   - **Amplifying the Eureka / Insight moment**: in deductive and spatial puzzle games (*Crack the Code*, *2048*, *Nonogram*, *Tower of Hanoi*, *Matrices*), sudden insight activates the ventral tegmental area and nucleus accumbens (Tik et al. 2018; Danek et al. 2014; Jung-Beeman et al. 2004), triggering a dopamine surge and flow state (Csikszentmihalyi 1990) that sustains deep intrinsic motivation to keep playing.
9. **Modular Progress Architecture: Cognitive Chunking, Extraneous Load Reduction, and Actionable Dopaminergic Loops (Sweller 1988; Cowan 2001; Schultz 1998; Kivetz 2006; Zeigarnik 1927):**  
   Presenting 40 exercises, over 50 achievements, calendars, and trend graphs in a single infinite scroll induces severe extraneous cognitive load (Sweller 1988) and working memory saturation (Cowan 2001; Miller 1956). Simultaneous visual exposure to dozens of disparate data points blunts salience, causing habituation and extinguishing anticipatory dopamine firing (*wanting*, Berridge & Robinson 1998; Schultz 2015). Synapse Dojo organizes player progress into 4 focused sub-views accessible via a sticky segmented tab bar:
   - **Overview (Executive Synthesis & Goal Gradient)**: A dopamine-dense executive dashboard highlighting player level, XP bar, active streak, and today's Neuro Check status. Crucially, it surfaces *Next Milestones* (the 3 badges closest to completion), directly recruiting the Goal-Gradient Effect (Hull 1932; Kivetz et al. 2006): seeing tangible progress near 80% accelerates behavioral motivation to jump into a new training session. It also pairs the 9-domain radar chart with immediate highlights for strongest skill and growth opportunity, complete with a quick *Boost* button.
   - **Exercises & Skills (Domain Chunking & Direct Play)**: Replaces the 40-item endless list with categorical domain filtering (Speed, Attention, Memory, Coordination, etc.) and completion status filters. Each card features historical sparklines, levels, personal records, and a direct *▶ Play* button—transforming passive stats review into an active launchpad for cognitive flow (Csikszentmihalyi 1990).
   - **Consistency & Habits (Spacing Effect & Neuroplasticity)**: Centered on habit formation science. Displays a 28-day visual calendar, weekly targets, streak milestones, and educational insights on distributed practice (Cepeda et al. 2006; Hebb 1949; Lally et al. 2010).
   - **Achievements & Trophies (Trophy Room & Zeigarnik Effect)**: A structured showcase of 50+ badges with filtering for *All*, *In Progress*, *Earned*, and *Locked*. Prioritizing nearly completed goals leverages the Zeigarnik effect (1927) and the endowed progress effect (Nunes & Drèze 2006), creating positive psychological tension that drives players to complete their open loops.

10. **Step-by-step instructions for every game:**
   Every exercise has a "How to play" box with 3–4 numbered steps (what appears, what to do, what counts as a mistake, how difficulty changes), shown on the intro card and in the guide, in all 12 languages. Breaking instructions into short steps lowers cognitive load and helps most when learning a new task (segmenting principle, Mayer 2009), while the illustrated example and the guided practice remain available for the first game.

---

## 3. The Complete Catalog of 40 Exercises (9 Domains)

The app organizes 40 original tasks across 9 cognitive and motor domains:

```
                                  ┌─── ⚡ Speed (4)
                                  ├─── 🎯 Attention (6)
                                  ├─── 🎛️ Executive Control (3)
                                  ├─── 🧠 Working Memory (4)
     Synapse Dojo (40 Exercises)  ├─── 🔐 Episodic Memory (4)
                                  ├─── 🧊 Spatial (4)
                                  ├─── 🧩 Reasoning (5)
                                  ├─── ➗ Calculation & Reading (5)
                                  └─── 👐 Bilateral Coordination (5)
```

The exercises are **inspired by** the paradigms listed: they are short, game-like versions, not the standardized clinical tests, and their scores cannot be compared with clinical norms.

### Table of Experimental Paradigms

| Domain | Exercise | Reference paradigm | Adaptive parameters |
|---|---|---|---|
| **⚡ Speed** | **Glance** | *Useful Field of View (UFOV)* / Double Decision (*Ball et al., 2002*) | Exposure time (700 ms → about 48 ms, followed by a mask), peripheral distractors arriving gradually (0, then 3 to 15). |
| **⚡ Speed** | **Choice reflex** | 4-choice reaction time + Go/No-Go | Response window (1100 → 420 ms), no-go stimuli from level 3. |
| **⚡ Speed** | **Number trail** | *Trail Making Test (TMT-A and TMT-B)* | Number of targets (10–24), alternating 1 → A → 2 → B sequence from level 4, with about twice the time per item of numbers alone, as between TMT-B and TMT-A. |
| **⚡ Speed** | **Simple Reaction** | Simple reaction time (SRT) with a variable foreperiod and false-start detection | Threshold to beat (600 → 280 ms). |
| **🎯 Attention** | **Pilot** | *NeuroRacer*-style continuous multitasking (*Anguera et al., 2013*) | Two independent levels, as in NeuroRacer. Driving: road speed and curvature, which bends beyond the lane even at level 1. Signs: frequency, time to answer (3.5 → 0.8 s), shown by a ring running out around each sign and similar distractors from level 5. Only hits, misses and false alarms count. |
| **🎯 Attention** | **Radar** | *Multiple Object Tracking* (*Pylyshyn & Storm, 1988*) | Speed and targets to track (2–6): most high levels stay at 4 targets, the usual capacity, and raise speed. |
| **🎯 Attention** | **Flanker Test** | *Eriksen Flanker Task* | Time limit (1400 → 480 ms); half the trials are always incongruent, because more of them shrink the conflict effect (*Bugg & Crump, 2012*). |
| **🎯 Attention** | **Go / No-Go** | Go/No-Go inspired by the *SART* (*Robertson et al., 1997*) | Time limit (850 → 330 ms); 20% "stop" trials at a quick pace, the conditions that really build up the urge to respond (*Wessel, 2018*). |
| **🎯 Attention** | **Multi-Source Interference** | *Multi-Source Interference Task* (*Bush & Shin, 2006*) | Control ("1 0 0") and interference ("2 1 1") trials in equal parts; time limit (1800 → 560 ms). |
| **🎯 Attention** | **Color & Shape** | Conjunction visual search (*Treisman & Gelade, 1980*) | Number of items (6–16) sharing color or shape with the target, and time to find it (6 → 1.2 s). |
| **🎛️ Control** | **Color clash** | *Stroop* (*Stroop, 1935*; *MacLeod, 1991*) | Time limit (3000 → about 760 ms), alternative "read the word" rule growing gradually from level 3. |
| **🎛️ Control** | **Rule switch** | *Task Switching* (*Monsell, 2003*) | Alternating magnitude (< 5 / > 5) and parity; switch rate (20 → 50%) and time limit; measures the switch cost. |
| **🎛️ Control** | **Card Sorting** | Inspired by the *Wisconsin Card Sorting Test* (*Grant & Berg, 1948*) | Discovering the rule (color, shape, number); the rule changes after 4 correct answers in a row and isn't highlighted on screen; the change is announced up to level 5, then must be noticed unaided, as in the original test; time per card (5.5 → 1.6 s). |
| **🧠 Working memory** | **Echo** | Single and dual *N-Back* (*Kirchner, 1958*; *Jaeggi et al., 2008*) | From 1-back (position only) to dual 6-back (position + spoken and written letter), with dopaminergic reinforcement and zen sensory feedback on correct rejections (*Green & Swets, 1966*; *Guitart-Masip et al., 2012*). |
| **🧠 Working memory** | **Light grid** | *Corsi Block-Tapping* (*Corsi, 1972*; *Kessels et al., 2000*) | Sequence length (2–9); from level 6 backward order alternates, at the same length, because in the Corsi it is no harder than forward (*Kessels et al., 2008*); in the Neuro Score two attempts per length, as in the standard procedure. |
| **🧠 Working memory** | **Last digits** | *Running Memory Span* (*Pollack et al., 1959*) | Final digits to recall (2–9) from a stream of unpredictable length. |
| **🧠 Working memory** | **Digit Span** | Forward and backward *Digit Span* | Series length (3–9), backward order (two digits fewer) from level 7. |
| **🔐 Memory** | **Word vault** | Old/new recognition | Words to study (6–20); the score subtracts false alarms from hits. |
| **🔐 Memory** | **Pairs** | Symbol–word *paired associates* learning | Number of pairs (3–12). In the Neuro Score a fixed list of 8 pairs, with the score corrected for chance answers. |
| **🔐 Memory** | **Memory Match** | *Pelmanism / Concentration* (*What-Where Binding*, *Ungerleider & Mishkin, 1982*; *Pertzov et al., 2012*), hippocampal relational binding (*Eichenbaum, 2004*), prefrontal proactive interference resolution (*Postle et al., 2004*; *Jonides & Nee, 2006*), and dopaminergic RPE streak cascades (*Schultz, 1998, 2015*; *Berridge & Robinson, 1998*) | Number of pairs (3–18 pairs, 2×3 to 6×6 grid); 6 high-contrast thematic visual decks (wildlife, cosmos, treats, adventure, high-interference geometric symbols, and arts); efficiency measured against the turns a perfect memory needs (about 1.61 per pair; *Velleman & Warrington, 2013*): the level rises below 1.25 times that number and drops beyond 1.8 times. Turning up new cards is not a mistake: only missing a card already seen counts as one. Non-punitive additive speed bonus. |
| **🔐 Memory** | **Story Memory** | Inspired by logical memory for short stories | Scenes to keep apart (1–3), questions on what, where and when (2 or 3), a pause filled by an unscored distracting task at the player's own pace (3–15 s); from two scenes up the wrong answers include details from another scene. |
| **🧊 Spatial** | **Rotations** | Mental rotation (*Shepard & Metzler, 1971*), two-dimensional version with chiral polyominoes | Number of squares (4–9), rotations in 30° steps, time limit (7.5 → 1.8 s). |
| **🧊 Spatial** | **Spatial Matrix** | Spatial memory with coordinate transformation | Blocks to remember (2–6), a 3×3 and then a 4×4 grid at the top levels, rotation (0°, 90°, 180°, then random), study time (4.8 → 3.2 s). |
| **🧊 Spatial** | **Nonogram** | 2D Constraint Satisfaction Problem (Discrete Tomography; *Ueda & Nagao, 1996*; *Batenburg & Kosters, 2009, 2012*) and Gestalt closure (*Wertheimer, 1923*; *Wagemans et al., 2012*) driven by dopaminergic "Aha!" insight (*Jung-Beeman et al., 2004*; *Danek et al., 2014*) and frontoparietal visuospatial planning (*Baddeley, 2000*; *Franco et al., 2021*) | Grid dimensions (4×4 at level 1, 5×5 at levels 2–3, 6×6 at levels 4–5, 7×7 at levels 6–8); 124 handcrafted pixel-art puzzles strictly verified for 100% pure line-solvability with unique solutions (0 blind guessing required), with cross-session anti-repetition memory. Real-time satisfaction checkmarks, continuous drag-painting, and cross-out exclusion mode. |
| **🧊 Spatial** | **Tangram** | Part-whole decomposition and visuospatial construction (as in the WAIS-IV *Block Design*, *Wechsler, 2008*), mental rotation (*Shepard & Metzler, 1971*) | Pieces to place (3 at level 1 → 7 from level 6), 80 solid silhouettes with no inner lines across 8 levels, decoy pieces in the tray at levels 5–8, rotation in 45° steps and flipping; Gold/Silver/Bronze stopwatch bands; a solve is "clean" with no hints and few wrong placements. |
| **🧩 Reasoning** | **Towers** | *Tower of London* (*Shallice, 1982*) | Moves of the shortest solution (2–8), which are also the maximum allowed. |
| **🧩 Reasoning** | **Odd one out** | Odd-one-out with multidimensional rules | Number of figures (4–9) and irrelevant features that vary (1–3), with every value on at least two figures, so there is only one solution. After a mistake the game names the feature that sets the right figure apart. |
| **🧩 Reasoning** | **Market Stall** | Knapsack problem (Murawski & Bossaerts, 2016) in an everyday setting of costs and earnings | Number of products (4–8) with a budget of about half the total cost; minimum earnings to reach, shown on screen (90% → 100% of the best); from level 3 the shortcut of buying by best earnings per coin isn't enough. Actual earnings are revealed upon selling with animation and coin audio feedback, rewarding heuristic estimation and preventing blind trial and error. After a mistake the best choice stays highlighted until the player moves on. |
| **🧩 Reasoning** | **2048** | Sliding block puzzle and sequential strategic planning (*Cirulli, 2014*; *Shallice, 1982*; *Diamond, 2013*) engaging prefrontal inhibitory control (*Aron et al., 2004*), visuospatial working memory simulation of merge cascades, and reward prediction error reinforcement (*Schultz, 1998*; *Csikszentmihalyi, 1990*; *Wilson et al., 2019*) | Milestone target tile (32 → 2048), calibrated move budget to preserve brief, engaging session length, and a stone obstacle block at levels 9 and 10 restricting grid space to require deeper prospective planning. |
| **🧩 Reasoning** | **Crack the Code** | Deductive reasoning and constraint satisfaction (*Prado et al., 2011*; *Goel, 2007*) with working memory set updating (*Baddeley, 2000*; *Miyake et al., 2000*) and dopaminergic Eureka insight in the nucleus accumbens (*Tik et al., 2018*; *Kounios & Beeman, 2014*) | Code length (3 digits at levels 1–5, 4 digits at levels 6–8), clue quantity and tightness (5 → 4 clues), and elimination scratchpad for tactile hypothesis testing. Every puzzle is mathematically validated for 100% unique solvability. |
| **➗ Calculation & reading** | **Math sprint** | Fast mental arithmetic (*Learning Therapy*, Kawashima) | Operations (+ − → × → ÷) and number size, multiplication tables included. |
| **➗ Calculation & reading** | **Speed reading** | Reading aloud with a comprehension question | Reading-aloud pace to keep up with (90 → 180 words per minute), shown by a "hare" bar that empties at the target pace; the level rises when the text was understood and the bar beaten, and drops after a wrong answer. Above 400 words per minute the text can't have been read aloud and speed doesn't count. In *Learning Therapy* the point is reading regularly and fluently, not tackling ever harder texts, so the level changes the pace, never the text. In the Neuro Score players read at their own pace, with no target. |
| **➗ Calculation & reading** | **Dot Estimation** | *Approximate Number System* (*Halberda et al., 2008*) | Ratio between the two quantities (40 → 88%) and exposure time (1.5 → 0.8 s). |
| **➗ Calculation & reading** | **Word Anagrams** | Lexical access and orthographic memory | Word length: 4 to 8 letters in most languages; where words are shorter each language uses its own range (Arabic 3–6, Japanese 2–5, Chinese and Hindi 2–4), and some levels share a length. |
| **➗ Calculation & reading** | **Word Sprint** | Fast orthographic classification (does the word start with the given letter?) | Time limit (2200 → 800 ms); only initials with enough words, so they don't repeat. It is not a verbal-fluency test, which would require producing words. |
| **👐 Coordination** | **Bilateral Tap** | Visually guided bimanual sequences | Length of the left/right sequence (4–13) and time per tap (1 → 0.39 s). |
| **👐 Coordination** | **Bilateral Swipe** | Symmetric and asymmetric bimanual coordination (*Swinnen, 2002*) | Mirror, then parallel, then independent movements on different axes, from most to least stable; the two gestures must happen together (largest gap 700 → 180 ms) within a time limit (3 → 1.2 s) shown by a bar; with a mouse, which makes one gesture at a time, only the time limit counts. |
| **👐 Coordination** | **Bilateral Rhythm** | *Sensorimotor Synchronization* (*Repp & Su, 2013*) | Precision required (±220 → ±50 ms) around the player's own recent average, so steadiness counts rather than device latency. The tempo (67–130 BPM) stays fixed within a session. |
| **👐 Coordination** | **Cross Movements** | Spatial stimulus-response compatibility (ipsilateral and contralateral responses) | Time limit (1500 → 520 ms); "cross" and "same side" trials in equal parts. |
| **👐 Coordination** | **Bilateral Dual-Task** | Motor-cognitive dual-task paradigm | Keep holding with one hand for the whole trial while the other judges even/odd; time limit (4 → 0.8 s). |

---

## 4. Adaptive Algorithm and Psychometrics

### The Eighty Five Percent Rule
*Wilson, Shenhav, Straccia & Cohen (Nature Communications, 2019)* showed that, for many gradient-based learning algorithms, learning is fastest when the error rate is about **15.87%** (about 85% accuracy). It is a theoretical result, consistent with the psychophysical practice of keeping tasks neither too easy nor too hard. Synapse Dojo sits in this zone (70–85% depending on the exercise), favoring slightly higher accuracy in long tasks to protect motivation.

### The *Weighted Up-Down* Mathematical Model
Synapse Dojo implements a continuous variant of the **Kaernbach (1991)** psychophysical method:

$$\Delta_{\text{up}} = \Delta_{\text{down}} \cdot \left(\frac{1 - p_{\text{target}}}{p_{\text{target}}}\right)$$

For a target $p_{\text{target}} = 0.80$:
* After an **error**: difficulty drops by $1.0$ level.
* After a **correct answer**: difficulty rises by $0.25$ levels.

#### Implemented Control Mechanisms (`src/adaptive.ts`):
1. **Fast Track**: only in an exercise's first session and in the Neuro Score. Until the first error, each correct answer climbs quickly; the first error goes back to the last level passed. Repeating it every session would overshoot the threshold and keep accuracy below target.
2. **Frustration Brake**: three errors in a row drop one extra level.
3. **Warm-Up**: each session starts a quarter of a level below the threshold estimated in the previous session.
4. **Short sessions**: in exercises with few, long trials per session (fewer than 8, such as Crack the Code, Nonogram, Tangram and 2048) the next session starts exactly from the level reached, with no averaging and no warm-up. In simulation (300 players over 60 sessions), averaging plus warm-up left a one-trial-per-session game stuck at level 1 with 99.9% success, while repeating the fast start every session put Nonogram and Tangram at 59% success instead of the 75% intended; with this rule both converge on target (77% and 75%).
5. **Detraining**: if an exercise has not been played for more than 14 days, the starting level drops by one.
6. **Session score**: average level reached in the second half of the session, reduced if accuracy is below target (the better of the second half's and the whole session's accuracy, so right answers followed by misses on the highest levels don't score zero). Someone who keeps failing at the easiest level gets a low score instead of the minimum credit.

### The Neuro Score: Calculation
The **Neuro Score** (0 to 1000) is the **mean of the 0–100 scores** of 9 short exercises, one per domain, **multiplied by 10**. Each exercise always starts from the same initial level and converts performance (threshold reached, response times or accuracy) to 0–100 with fixed linear scales per exercise. In every exercise a perfect performance is worth 100, whatever the day: the fast climb is sized to cover the whole range in the trials available, and the speed bonus doesn't apply. Echo measures 1-back to 3-back in two series, Pairs uses a fixed list.

The battery **rotates daily** among the exercises of each domain, for variety and to avoid training a single task. As a result two consecutive days may use different exercises. Each test is short: in simulation the correlation between two tests of the same exercise ranges from about 0.2 to 0.85, so the Neuro Score should be read as a **trend over several weeks**, not an exact measure to compare day by day. It has not yet been validated on real players, is not a clinical test and has no diagnostic value.

The scale was recalibrated in version 0.10: earlier results stay saved but are not compared with new ones.

---

## 5. Calibration for Older Adults and People with Difficulties

The program must be usable by people with slower reaction times, reduced sight or hearing, or little familiarity with touch screens. The choices made:

* **Easy start and fast adaptation**: timed exercises start from the simplest level and only climb if the user answers well; after three errors in a row difficulty drops by two levels.
* **Generous starting times**: e.g. a 600 ms threshold in Simple Reaction (an older adult's simple reaction time on a touch screen, screen latency included, is often 400–550 ms), 3 s in the Stroop, 4 s for the dual task, 7.6 s for a mental rotation, 5.5 s per card in card sorting.
* **Relaxed pace**: the option in Settings multiplies response windows and presentation times by 1.4, and is also taken into account in the Neuro Score. The exception is Glance's exposure time, which is what it measures.
* **Neuro Score scales calibrated for older age**: zero corresponds to slow but plausible performance (e.g. 4 s per number in Number trail, 8 s per calculation, 3 s per answer in the Stroop), so an older adult doesn't score zero just for being slower than a young person.
* **Untimed tasks** where speed is not the point (memory, reasoning, anagrams): answer calmly. The Neuro Score also removes the time limit from the Stroop, Rule switch and Card Sorting, and measures response speed instead.
* **Guided practice** the first time, with hints after each mistake and no score.
* **Multisensory feedback**: big ✓/✗ in the center, colors and sound; color names are always written, for people who confuse red and green.
* **Large text** option in Settings and large buttons.
* **N-Back letters** both spoken and written, for people who are hard of hearing.

People with diagnosed cognitive disorders should use the app only as an enjoyable activity and talk to their doctor; scores are no substitute for a clinical assessment.

---

## 6. Software Architecture, Privacy and Resilience

To make sure the platform stays a tool serving the user rather than advertising profiling, the technical architecture follows strict requirements:

1. **Client-Side First & Zero Cookies:**  
   The whole app runs locally in the browser. No personal data, identifiers or performance statistics are sent to central servers. Data is stored only in `localStorage` and can be exported/imported by the user at any time as open JSON; imported files are validated before use. The only exception is the opt-in weekly leaderboard (point 6).
2. **Framework-Free (Vanilla TypeScript):**  
   No UI framework dependencies. The DOM is built with direct TypeScript primitives (no HTML generated from strings), for instant start-up even on low-cost devices.
3. **Web Audio API and Speech Synthesis:**  
   Sound effects are generated in real time with Web Audio API oscillators; multilingual speech uses the standard `window.speechSynthesis` API, with no audio files to download.
4. **Offline Support and PWA:**  
   A lightweight Service Worker and a Web App Manifest make Synapse Dojo installable and usable offline.
5. **Security:**  
   A strict Content Security Policy, and no third-party scripts apart from the optional, anonymous Cloudflare Web Analytics beacon and Cloudflare Turnstile, which is loaded only when someone joins the leaderboard.
6. **Opt-in Leaderboard (Cloudflare Pages Functions + D1):**
   Players who join get a random identifier and secret (only its SHA-256 hash is stored) and a generated nickname; no name, email or account. After each session the app sends only the current week's summary. The server counts training days itself from the date results arrive, so days can't be backdated, checks every value for plausibility and limits uploads to one every 30 seconds. A nightly cron Worker deletes weeks older than 2, players idle for 30 days, and players who never submitted results after 7 days; leaving deletes everything at once. The service worker never caches the API. Consistency counts activities per day: the app reports how many it finished today and the server lets the count grow by at most one per minute since the previous upload. Ties go to whoever reached the value first, since each value keeps the time it last changed. Groups have a random 10-character invite code (about 50 bits); only members can read a group's board, its creator can remove or ban members (a ban is tied to the player's anonymous identity, so the creator can also replace the invite code), and a group left without members is deleted.

---

## 7. Bibliography and Academic Sources

**General evidence on cognitive training**

1. Simons, D. J., et al. (2016). *Do "Brain-Training" Programs Work?* Psychological Science in the Public Interest, 17(3), 103-186. [DOI: 10.1177/1529100616661983](https://journals.sagepub.com/doi/10.1177/1529100616661983)
2. Lampit, A., Hallock, H., & Valenzuela, M. (2014). *Computerized cognitive training in cognitively healthy older adults: a systematic review and meta-analysis of effect modifiers.* PLOS Medicine, 11(11), e1001756. [DOI: 10.1371/journal.pmed.1001756](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1001756)
3. Gates, N. J., et al. (2020). *Computerised cognitive training for 12 or more weeks for maintaining cognitive function in cognitively healthy people in late life.* Cochrane Database of Systematic Reviews, CD012277. [PubMed: 32104914](https://pubmed.ncbi.nlm.nih.gov/32104914/)
4. Lumsden, J., et al. (2016). *Gamification of Cognitive Assessment and Cognitive Training: A Systematic Review of Applications and Efficacy.* JMIR Serious Games, 4(2), e11. [PMC4967181](https://pmc.ncbi.nlm.nih.gov/articles/PMC4967181/)

**Processing speed and the ACTIVE trial**

5. Ball, K., et al. (2002). *Effects of cognitive training interventions with older adults: a randomized controlled trial.* JAMA, 288(18), 2271-2281. [PubMed: 12425704](https://pubmed.ncbi.nlm.nih.gov/12425704/)
6. Edwards, J. D., et al. (2017). *Speed of processing training results in lower risk of dementia.* Alzheimer's & Dementia: Translational Research & Clinical Interventions, 3(4), 603-611. [PMC5700828](https://pmc.ncbi.nlm.nih.gov/articles/PMC5700828/)
7. Coe, N. B., et al. (2026). *Impact of cognitive training on claims-based diagnosed dementia over 20 years: evidence from the ACTIVE study.* Alzheimer's & Dementia: Translational Research & Clinical Interventions, 12, e70197. [DOI: 10.1002/trc2.70197](https://doi.org/10.1002/trc2.70197)

**Attention, multitasking and control**

8. Anguera, J. A., et al. (2013). *Video game training enhances cognitive control in older adults.* Nature, 501(7465), 97-101. [PubMed: 24005416](https://pubmed.ncbi.nlm.nih.gov/24005416/)
9. Pylyshyn, Z. W., & Storm, R. W. (1988). *Tracking multiple independent targets: evidence for a parallel tracking mechanism.* Spatial Vision, 3(3), 179-197. [PubMed: 3153671](https://pubmed.ncbi.nlm.nih.gov/3153671/)
10. Eriksen, B. A., & Eriksen, C. W. (1974). *Effects of noise letters upon the identification of a target letter in a nonsearch task.* Perception & Psychophysics, 16(1), 143-149. [DOI: 10.3758/BF03203267](https://link.springer.com/article/10.3758/BF03203267)
11. Stroop, J. R. (1935). *Studies of interference in serial verbal reactions.* Journal of Experimental Psychology, 18(6), 643-662. [DOI: 10.1037/h0054651](https://doi.org/10.1037/h0054651)
12. MacLeod, C. M. (1991). *Half a century of research on the Stroop effect: an integrative review.* Psychological Bulletin, 109(2), 163-203. [PubMed: 2034749](https://pubmed.ncbi.nlm.nih.gov/2034749/)
13. Bush, G., & Shin, L. M. (2006). *The Multi-Source Interference Task: an fMRI task that reliably activates the cingulo-frontal-parietal cognitive/attention network.* Nature Protocols, 1(1), 308-313. [PubMed: 17406250](https://pubmed.ncbi.nlm.nih.gov/17406250/)
14. Robertson, I. H., et al. (1997). *'Oops!': performance correlates of everyday attentional failures in traumatic brain injured and normal subjects.* Neuropsychologia, 35(6), 747-758. [PubMed: 9204482](https://pubmed.ncbi.nlm.nih.gov/9204482/)
15. Treisman, A. M., & Gelade, G. (1980). *A feature-integration theory of attention.* Cognitive Psychology, 12(1), 97-136. [PubMed: 7351125](https://pubmed.ncbi.nlm.nih.gov/7351125/)
16. Enge, S., et al. (2014). *No evidence for true training and transfer effects after inhibitory control training in young healthy adults.* Journal of Experimental Psychology: Learning, Memory, and Cognition, 40(4), 987-1001. [PubMed: 24707778](https://pubmed.ncbi.nlm.nih.gov/24707778/)
17. Monsell, S. (2003). *Task switching.* Trends in Cognitive Sciences, 7(3), 134-140. [PubMed: 12639695](https://pubmed.ncbi.nlm.nih.gov/12639695/)
18. Karbach, J., & Kray, J. (2009). *How useful is executive control training? Age differences in near and far transfer of task-switching training.* Developmental Science, 12(6), 978-990. [PubMed: 19840052](https://pubmed.ncbi.nlm.nih.gov/19840052/)
19. Toovey, B. R. W., Kattner, F., & Schubert, T. (2021). *Cross-modal transfer following auditory task-switching training in old adults.* Frontiers in Psychology, 12, 615518. [DOI: 10.3389/fpsyg.2021.615518](https://www.frontiersin.org/articles/10.3389/fpsyg.2021.615518/full)
20. Grant, D. A., & Berg, E. A. (1948). *A behavioral analysis of degree of reinforcement and ease of shifting to new responses in a Weigl-type card-sorting problem.* Journal of Experimental Psychology, 38(4), 404-411. [DOI: 10.1037/h0059831](https://doi.org/10.1037/h0059831)

**Memory**

21. Kirchner, W. K. (1958). *Age differences in short-term retention of rapidly changing information.* Journal of Experimental Psychology, 55(4), 352-358. [PubMed: 13539317](https://pubmed.ncbi.nlm.nih.gov/13539317/)
22. Jaeggi, S. M., et al. (2008). *Improving fluid intelligence with training on working memory.* PNAS, 105(19), 6829-6833. [PubMed: 18443283](https://pubmed.ncbi.nlm.nih.gov/18443283/)
23. Au, J., et al. (2015). *Improving fluid intelligence with training on working memory: a meta-analysis.* Psychonomic Bulletin & Review, 22(2), 366-377. [PubMed: 25102926](https://pubmed.ncbi.nlm.nih.gov/25102926/)
24. Melby-Lervåg, M., & Hulme, C. (2013). *Is working memory training effective? A meta-analytic review.* Developmental Psychology, 49(2), 270-291. [PubMed: 22612437](https://pubmed.ncbi.nlm.nih.gov/22612437/)
25. Kessels, R. P. C., et al. (2000). *The Corsi Block-Tapping Task: standardization and normative data.* Applied Neuropsychology, 7(4), 252-258. [PubMed: 11296689](https://pubmed.ncbi.nlm.nih.gov/11296689/)
26. Pollack, I., Johnson, L. B., & Knaff, P. R. (1959). *Running memory span.* Journal of Experimental Psychology, 57(3), 137-146. [PubMed: 13641585](https://pubmed.ncbi.nlm.nih.gov/13641585/)

**Spatial skills, reasoning, calculation and reading**

27. Shepard, R. N., & Metzler, J. (1971). *Mental rotation of three-dimensional objects.* Science, 171(3972), 701-703. [PubMed: 5540314](https://pubmed.ncbi.nlm.nih.gov/5540314/)
28. Uttal, D. H., et al. (2013). *The malleability of spatial skills: a meta-analysis of training studies.* Psychological Bulletin, 139(2), 352-402. [PubMed: 22663761](https://pubmed.ncbi.nlm.nih.gov/22663761/)
29. Shallice, T. (1982). *Specific impairments of planning.* Philosophical Transactions of the Royal Society of London B, 298(1089), 199-209. [PubMed: 6125971](https://pubmed.ncbi.nlm.nih.gov/6125971/)
30. Nouchi, R., et al. (2016). *Reading Aloud and Solving Simple Arithmetic Calculation Intervention (Learning Therapy) Improves Inhibition, Verbal Episodic Memory, Focus Attention and Processing Speed in Healthy Elderly People: Evidence from a Randomized Controlled Trial.* Frontiers in Human Neuroscience, 10, 217. [PMC4868921](https://pmc.ncbi.nlm.nih.gov/articles/PMC4868921/)
31. Halberda, J., Mazzocco, M. M. M., & Feigenson, L. (2008). *Individual differences in non-verbal number acuity correlate with maths achievement.* Nature, 455(7213), 665-668. [PubMed: 18776888](https://pubmed.ncbi.nlm.nih.gov/18776888/)

**Coordination and rhythm**

32. Swinnen, S. P. (2002). *Intermanual coordination: from behavioural principles to neural-network interactions.* Nature Reviews Neuroscience, 3(5), 348-359. [PubMed: 11988774](https://pubmed.ncbi.nlm.nih.gov/11988774/)
33. Repp, B. H., & Su, Y.-H. (2013). *Sensorimotor synchronization: a review of recent research (2006–2012).* Psychonomic Bulletin & Review, 20(3), 403-452. [PubMed: 23397235](https://pubmed.ncbi.nlm.nih.gov/23397235/)

**Adaptive psychometrics**

34. Kaernbach, C. (1991). *Simple adaptive testing with the weighted up-down method.* Perception & Psychophysics, 49(3), 227-229. [DOI: 10.3758/BF03214307](https://link.springer.com/article/10.3758/BF03214307)
35. Wilson, R. C., Shenhav, A., Straccia, M., & Cohen, J. D. (2019). *The Eighty Five Percent Rule for optimal learning.* Nature Communications, 10, 4646. [PMC6831579](https://pmc.ncbi.nlm.nih.gov/articles/PMC6831579/)

**Lifestyle and prevention**

36. Ngandu, T., et al. (2015). *A 2 year multidomain intervention of diet, exercise, cognitive training, and vascular risk monitoring versus control to prevent cognitive decline in at-risk elderly people (FINGER): a randomised controlled trial.* The Lancet, 385(9984), 2255-2263. [PubMed: 25771249](https://pubmed.ncbi.nlm.nih.gov/25771249/)
37. Baker, L. D., et al. (2025). *Structured vs Self-Guided Multidomain Lifestyle Interventions for Global Cognitive Function: The US POINTER Randomized Clinical Trial.* JAMA. [DOI: 10.1001/jama.2025.12923](https://doi.org/10.1001/jama.2025.12923)
38. Livingston, G., et al. (2024). *Dementia prevention, intervention, and care: 2024 report of the Lancet standing Commission.* The Lancet, 404(10452), 572-628. [DOI: 10.1016/S0140-6736(24)01296-0](https://doi.org/10.1016/S0140-6736(24)01296-0)

**Motivation and social comparison**

39. Festinger, L. (1954). *A theory of social comparison processes.* Human Relations, 7(2), 117-140. [DOI: 10.1177/001872675400700202](https://doi.org/10.1177/001872675400700202)
40. Ryan, R. M., & Deci, E. L. (2000). *Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being.* American Psychologist, 55(1), 68-78. [DOI: 10.1037/0003-066X.55.1.68](https://doi.org/10.1037/0003-066X.55.1.68)
41. Hamari, J., Koivisto, J., & Sarsa, H. (2014). *Does gamification work? A literature review of empirical studies on gamification.* 47th Hawaii International Conference on System Sciences, 3025-3034. [DOI: 10.1109/HICSS.2014.377](https://doi.org/10.1109/HICSS.2014.377)
42. Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). *Distributed practice in verbal recall tasks: A review and quantitative synthesis.* Psychological Bulletin, 132(3), 354-380. [DOI: 10.1037/0033-2909.132.3.354](https://doi.org/10.1037/0033-2909.132.3.354)
43. Eysenck, M. W., Derakshan, N., Santos, R., & Calvo, M. G. (2007). *Anxiety and cognitive performance: Attentional control theory.* Emotion, 7(2), 336-353. [DOI: 10.1037/1528-3542.7.2.336](https://doi.org/10.1037/1528-3542.7.2.336)
44. Murawski, C., & Bossaerts, P. (2016). *How humans solve complex problems: The case of the knapsack problem.* Scientific Reports, 6, 34851. [DOI: 10.1038/srep34851](https://doi.org/10.1038/srep34851)

**Difficulty calibration**

45. Kessels, R. P. C., van den Berg, E., Ruis, C., & Brands, A. M. A. (2008). *The backward span of the Corsi Block-Tapping Task and its association with the WAIS-III Digit Span.* Assessment, 15(4), 426-434. [DOI: 10.1177/1073191108315611](https://doi.org/10.1177/1073191108315611)
46. Wessel, J. R. (2018). *Prepotent motor activity and inhibitory control demands in different variants of the go/no-go paradigm.* Psychophysiology, 55(3), e12871. [DOI: 10.1111/psyp.12871](https://doi.org/10.1111/psyp.12871)
47. Bugg, J. M., & Crump, M. J. C. (2012). *In support of a distinction between voluntary and stimulus-driven control: a review of the literature on proportion congruent effects.* Frontiers in Psychology, 3, 367. [DOI: 10.3389/fpsyg.2012.00367](https://doi.org/10.3389/fpsyg.2012.00367)
48. Trick, L. M., Perl, T., & Sethi, N. (2005). *Age-related differences in multiple-object tracking.* The Journals of Gerontology: Series B, 60(2), P102-P105. [Abstract](https://psychsoc.gerontologyjournals.org/cgi/content/abstract/60/2/P102)
49. Franco, J. P., Yadav, N., Bossaerts, P., & Murawski, C. (2021). *Generic properties of a computational task predict human effort and performance.* Journal of Mathematical Psychology, 104, 102592. [DOI: 10.1016/j.jmp.2021.102592](https://doi.org/10.1016/j.jmp.2021.102592)
50. Repp, B. H. (2006). *Rate limits of sensorimotor synchronization.* Advances in Cognitive Psychology, 2(2-3). [DOAJ](https://doaj.org/article/dc3f29b3977e4adf8dfe9aa998eb40de)

**Sharing and social influence**

51. Aral, S., & Walker, D. (2011). *Creating social contagion through viral product design: a randomized trial of peer influence in networks.* Management Science, 57(9), 1623-1639. [DOI: 10.1287/mnsc.1110.1421](https://doi.org/10.1287/mnsc.1110.1421)
52. Aral, S., & Nicolaides, C. (2017). *Exercise contagion in a global social network.* Nature Communications, 8, 14753. [DOI: 10.1038/ncomms14753](https://doi.org/10.1038/ncomms14753)
53. Lindström, B., Bellander, M., Schultner, D. T., Chang, A., Tobler, P. N., & Amodio, D. M. (2021). *A computational reward learning account of social media engagement.* Nature Communications, 12, 1311. [DOI: 10.1038/s41467-020-19607-x](https://doi.org/10.1038/s41467-020-19607-x)
54. Lamont, R. A., Swift, H. J., & Abrams, D. (2015). *A review and meta-analysis of age-based stereotype threat: negative stereotypes, not facts, do the damage.* Psychology and Aging, 30(1), 180-193, corrected in 2018. [DOI: 10.1037/a0038586](https://doi.org/10.1037/a0038586)

**Visuospatial deduction, constraint satisfaction, and Gestalt closure (Nonogram)**

55. Ueda, N., & Nagao, T. (1996). *NP-completeness results for NONOGRAM via parsimonious reductions.* Technical Report TR96-0008, Department of Computer Science, Tokyo Institute of Technology.
56. Batenburg, K. J., & Kosters, W. A. (2009). *Solving Nonograms by combining relaxations.* Pattern Recognition, 42(8), 1672-1683. [DOI: 10.1016/j.patcog.2009.01.026](https://doi.org/10.1016/j.patcog.2009.01.026)
57. Batenburg, K. J., & Kosters, W. A. (2012). *On the ease of solving Nonograms.* Discrete Applied Mathematics, 160(16-17), 2350-2371. [DOI: 10.1016/j.dam.2012.06.002](https://doi.org/10.1016/j.dam.2012.06.002)
58. Wertheimer, M. (1923). *Untersuchungen zur Lehre von der Gestalt. II.* Psychologische Forschung, 4(1), 301-350. (Law of closure and visuospatial perceptual grouping; reviewed in Wagemans et al., 2012, *Psychological Bulletin*, 138(6), 1172-1217).
59. Jung-Beeman, M., Bowden, E. M., Haberman, J., Frymiare, J. L., Arambel-Liu, S., Greenblatt, R., Reber, P. J., & Kounios, J. (2004). *Neural activity when people solve verbal and spatial problems with insight.* PLoS Biology, 2(4), e97. [DOI: 10.1371/journal.pbio.0020097](https://doi.org/10.1371/journal.pbio.0020097)
60. Danek, A. H., Fraps, T., von Müller, A., Grothe, B., & Öllinger, M. (2014). *It's a pleasure: The cognitive and affective components of the Eureka! experience.* Cognition, 131(3), 398-418. [DOI: 10.1016/j.cognition.2014.02.008](https://doi.org/10.1016/j.cognition.2014.02.008)

**Deductive reasoning, constraint satisfaction, and dopaminergic insight (Crack the Code)**

61. Prado, J., Chadha, A., & Booth, J. R. (2011). *The brain network for deductive reasoning: A quantitative meta-analysis of 28 neuroimaging studies.* Journal of Cognitive Neuroscience, 23(11), 3483-3497. [DOI: 10.1162/jocn_a_00063](https://doi.org/10.1162/jocn_a_00063)
62. Tik, M., Sladky, R., Luft, C. D. B., Willinger, D., Hoffmann, A., Banissy, M. J., Bhattacharya, J., & Windischberger, C. (2018). *Ultra-high-field fMRI insights on insight: Neural correlates of the Aha!-moment.* Human Brain Mapping, 39(8), 3241-3252. [DOI: 10.1002/hbm.24073](https://doi.org/10.1002/hbm.24073)
63. Goel, V. (2007). *Anatomy of deductive reasoning.* Trends in Cognitive Sciences, 11(10), 435-441. [DOI: 10.1016/j.tics.2007.09.003](https://doi.org/10.1016/j.tics.2007.09.003)

**Dopamine, Reward Prediction Error, and SAT Modeling**

64. Schultz, W. (2015). *Neuronal reward and approach mechanisms.* In: *Neuroscience in the 21st Century*, Springer, 1-28.
65. Berridge, K. C., & Robinson, T. E. (1998). *What is the role of dopamine in reward: hedonic impact, reward learning, or incentive salience?* Brain Research Reviews, 28(3), 309-369. [DOI: 10.1016/S0165-0173(98)00019-8](https://doi.org/10.1016/S0165-0173(98)00019-8)
66. Ratcliff, R., & McKoon, G. (2008). *The diffusion decision model: Theory and data for two-choice decision tasks.* Neural Computation, 20(4), 873-922. [PMC2474742](https://pmc.ncbi.nlm.nih.gov/articles/PMC2474742/)
67. Zatorre, R. J., & Salimpoor, V. N. (2013). *From perception to pleasure: Music and its neural substrates.* PNAS, 110(Suppl 2), 10430-10437. [DOI: 10.1073/pnas.1301228110](https://doi.org/10.1073/pnas.1301228110)
68. Lally, P., van Jaarsveld, C. H., Potts, H. W., & Wardle, J. (2010). *How are habits formed: Modelling habit formation in the real world.* European Journal of Social Psychology, 40(6), 998-1009. [DOI: 10.1002/ejsp.674](https://doi.org/10.1002/ejsp.674)
69. Kivetz, R., Urminsky, O., & Zheng, Y. (2006). *The Goal-Gradient Hypothesis Resurrected: Purchase Acceleration, Illusionary Goal Progress, and Customer Retention.* Journal of Marketing Research, 43(1), 39-58. [DOI: 10.1509/jmkr.43.1.39](https://doi.org/10.1509/jmkr.43.1.39)
70. Hull, C. L. (1932). *The goal-gradient hypothesis and maze learning.* Psychological Review, 39(1), 25-43. [DOI: 10.1037/h0072640](https://doi.org/10.1037/h0072640)
71. Christakis, N. A., & Fowler, J. H. (2007). *The spread of obesity in a large social network over 32 years.* New England Journal of Medicine, 357(4), 370-379. [DOI: 10.1056/NEJMsa066082](https://doi.org/10.1056/NEJMsa066082)

**Cognitive Load, Working Memory, and Motivation in Dashboards**

72. Sweller, J. (1988). *Cognitive load during problem solving: Effects on learning.* Cognitive Science, 12(2), 257-285. [DOI: 10.1207/s15516709cog1202_4](https://doi.org/10.1207/s15516709cog1202_4)
73. Cowan, N. (2001). *The magical number 4 in short-term memory: A reconsideration of mental storage capacity.* Behavioral and Brain Sciences, 24(1), 87-114. [PubMed: 11515286](https://pubmed.ncbi.nlm.nih.gov/11515286/)
74. Miller, G. A. (1956). *The magical number seven, plus or minus two: Some limits on our capacity for processing information.* Psychological Review, 63(2), 81-97. [PubMed: 13310704](https://pubmed.ncbi.nlm.nih.gov/13310704/)
75. Zeigarnik, B. (1927). *Das Behalten erledigter und unerledigter Handlungen.* Psychologische Forschung, 9, 1-85.
76. Nunes, J. C., & Drèze, X. (2006). *The Endowed Progress Effect: How Artificial Advancement Increases Effort.* Journal of Consumer Research, 32(4), 504-512. [DOI: 10.1086/500480](https://doi.org/10.1086/500480)

**Conjunctive "What-Where" Binding and Relational Visuospatial Memory (Pelmanism / Memory Match)**

77. Ungerleider, L. G., & Mishkin, M. (1982). *Two cortical visual systems.* In: D. J. Ingle, M. A. Goodale, & R. J. W. Mansfield (Eds.), *Analysis of Visual Behavior*, MIT Press, 549-586.
78. Pertzov, Y., Dong, M. Y., Peich, M. C., & Husain, M. (2012). *Binding what and where in visuospatial working memory in normal aging and Alzheimer's disease.* Brain, 135(8), 2469-2481. [DOI: 10.1093/brain/aws175](https://doi.org/10.1093/brain/aws175)
79. Eichenbaum, H. (2004). *Hippocampus: cognitive processes and neural representations that underlie declarative memory.* Neuron, 44(1), 109-120. [DOI: 10.1016/j.neuron.2004.08.028](https://doi.org/10.1016/j.neuron.2004.08.028)
80. Postle, B. R., Brush, L. N., & Nick, A. M. (2004). *Prefrontal cortex and the mediation of proactive interference in working memory.* Cognitive, Affective, & Behavioral Neuroscience, 4(4), 600-608. [DOI: 10.3758/CABN.4.4.600](https://doi.org/10.3758/CABN.4.4.600)
81. Jonides, J., & Nee, D. E. (2006). *Brain mechanisms of proactive interference in working memory.* Neuroscience, 139(1), 181-193. [DOI: 10.1016/j.neuroscience.2005.06.042](https://doi.org/10.1016/j.neuroscience.2005.06.042)

**Planning, reward, calibration and instructions (version 0.14)**

82. Cirulli, G. (2014). *2048.* Sliding-tile puzzle video game with exponential merging.
83. Diamond, A. (2013). *Executive functions.* Annual Review of Psychology, 64, 135-168. [DOI: 10.1146/annurev-psych-113011-143750](https://doi.org/10.1146/annurev-psych-113011-143750)
84. Aron, A. R., Robbins, T. W., & Poldrack, R. A. (2004). *Inhibition and the right inferior frontal cortex.* Trends in Cognitive Sciences, 8(4), 170-177. [DOI: 10.1016/j.tics.2004.02.010](https://doi.org/10.1016/j.tics.2004.02.010)
85. Baddeley, A. (2003). *Working memory: looking back and looking forward.* Nature Reviews Neuroscience, 4(10), 829-839. [DOI: 10.1038/nrn1201](https://doi.org/10.1038/nrn1201)
86. Schultz, W. (1998). *Predictive reward signal of dopamine neurons.* Journal of Neurophysiology, 80(1), 1-27. [DOI: 10.1152/jn.1998.80.1.1](https://doi.org/10.1152/jn.1998.80.1.1)
87. Csikszentmihalyi, M. (1990). *Flow: The Psychology of Optimal Experience.* Harper & Row, New York.
88. Velleman, D. J., & Warrington, G. S. (2013). *What to expect in a game of memory.* The American Mathematical Monthly, 120(9), 787-805. [DOI: 10.4169/amer.math.monthly.120.09.787](https://doi.org/10.4169/amer.math.monthly.120.09.787)
89. Fiorillo, C. D., Tobler, P. N., & Schultz, W. (2003). *Discrete coding of reward probability and uncertainty by dopamine neurons.* Science, 299(5614), 1898-1902. [DOI: 10.1126/science.1077349](https://doi.org/10.1126/science.1077349)
90. Kahneman, D., & Tversky, A. (1979). *Prospect theory: An analysis of decision under risk.* Econometrica, 47(2), 263-291. [DOI: 10.2307/1914185](https://doi.org/10.2307/1914185)
91. Mayer, R. E. (2009). *Multimedia Learning* (2nd ed.). Cambridge University Press. [DOI: 10.1017/CBO9780511811678](https://doi.org/10.1017/CBO9780511811678)
92. Wechsler, D. (2008). *Wechsler Adult Intelligence Scale – Fourth Edition (WAIS-IV).* Pearson.
