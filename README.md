# Synapse Dojo

[![Live](https://img.shields.io/badge/Live-synapsedojo.com-5b5bf0)](https://synapsedojo.com/)
[![License](https://img.shields.io/badge/License-PolyForm%20Noncommercial%201.0.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-blue)](https://www.typescriptlang.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline%20Ready-success)](https://synapsedojo.com/)
[![Languages](https://img.shields.io/badge/Languages-12-orange)](https://synapsedojo.com/)

> *Read this in [Italiano](README.it.md).*

Free cognitive training and bilateral coordination web application (source-available for noncommercial use): a few minutes a day, directly in your browser on phone, tablet, or desktop.

> **Note:** For personal enjoyment, curiosity, and mental wellness only: this is not a medical device or diagnostic tool.

---

## 🧠 What's Inside

- **🏋️ Daily Workout**: About 10–15 minutes with 4 daily exercises selected across your least recently trained skills. Once finished, you can immediately start another workout with different exercises and domains.
- **📏 Measure Neuro Score**: Daily battery covering all **9 cognitive and motor domains** (selecting one rotating exercise per domain daily) to calculate a **Neuro Score** from 0 to 1000, for following your own trend in these exercises. Read it as a trend over several weeks: it has not yet been validated on real players, is not a clinical test, and cannot be compared with clinical norms.
- **🥋 Free Gym**: Full catalog of **40 exercises** categorized into **9 cognitive and bilateral coordination domains**. Every exercise, Speed reading included, features a **continuous adaptive difficulty engine** that calibrates in real-time to stay near your own threshold, neither too easy nor too hard, saving your progress across sessions.
- **🏆 Weekly Leaderboard & Friend Groups** (optional, off by default): each week compare **consistency** (10 points per training day plus 1 per exercise, up to 12 a day), **improvement** against your own starting point and **best level** per exercise, with optional age groups and a separate board for relaxed-pace players. It resets every Monday, shows the top 3 and the players near you, and works for everyone or in **private groups** joined with a link or a code. It uses a random nickname, and leaving at any time deletes all data.

### The 9 Domains and 40 Exercises

| Domain | Exercises & Core Scientific Paradigms |
|---|---|
| **⚡ Speed** | 👁️ **Glance** (Useful Field of View / UFOV, ACTIVE clinical trial), ⚡ **Choice Reflex** (Choice reaction time + Go/No-Go), 🔢 **Number Path** (Trail Making Test A/B), ⏱️ **Reaction Time** (Simple visual reaction time) |
| **🎯 Attention** | 🏎️ **Pilot** (Continuous visuo-motor multitasking, inspired by NeuroRacer), 📡 **Radar** (Multiple Object Tracking / MOT), 🎯 **Flanker Test** (Selective attention & flanker distractor inhibition), 🚦 **Go / No-Go** (Motor response inhibition), 🔠 **Multi-Source Interference** (Inspired by the MSIT: conflict between several sources of interference), 💠 **Color and Shape** (Visual feature binding) |
| **🎛️ Executive Control** | 🎨 **Color Clash** (Stroop effect & cognitive interference), 🔀 **Dual Rule** (Task switching & switch cost reduction), 🃏 **Card Sorting** (Wisconsin Card Sorting Test - inductive rule deduction & set-shifting) |
| **🧠 Working Memory** | 🔁 **Echo** (Single and dual auditory-visual N-Back with speech synthesis), 💡 **Light Grid** (Corsi block-tapping forward and backward), 🔟 **Last Digits** (Running memory span & continuous updating), 🧮 **Digit Span** (Verbal forward & backward digit span) |
| **🔐 Episodic Memory** | 🔐 **Word Vault** (Old/new recognition memory), 🔗 **Pairs** (Symbol-word paired associates learning), 🎴 **Memory Match** (Pelmanism / Visuospatial What-Where binding & combo cascades), 📜 **Story Memory** (Inspired by logical memory for short stories) |
| **🧊 Spatial Cognition** | 🧊 **Rotations** (Mental rotation of 2D chiral figures), 📐 **Spatial Matrix** (Mental rotation of matrix coordinates at 90°, 180°, and 270°), 🖼️ **Nonogram** (Visuospatial deduction, 2D constraint satisfaction & Gestalt pixel-art closure), 🧩 **Tangram** (Part-whole decomposition, mental rotation & geometric assembly) |
| **🧩 Reasoning & Planning** | 🗼 **Towers** (Tower of London - advance strategic lookahead), 🔍 **Odd One Out** (Inductive reasoning & feature matching), 🧺 **Market Stall** (Knapsack problem: costs and earnings within a budget), 🧱 **2048** (Sequential planning, merge cascades & prefrontal inhibitory control), 🔓 **Crack the Code** (Deductive reasoning, constraint satisfaction & dopaminergic insight) |
| **➗ Math & Reading** | ➗ **Math Sprint** (Rapid mental arithmetic - Kawashima learning therapy), 📖 **Speed Reading** (reading aloud with an adaptive target pace & comprehension check), 🔴 **Dot Calculation** (Approximate Number System: comparing quantities without counting), 🔤 **Anagrams** (Orthographic working memory & lexical retrieval), 💬 **Word Sprint** (fast orthographic classification by initial letter) |
| **👐 Bilateral Coordination** | 👆 **Bilateral Tap** (left/right bimanual tap sequences), 👋 **Bilateral Swipe** (Asymmetric bimanual spatial decoupling), 🎵 **Bilateral Rhythm** (Sensorimotor synchronization to an audio-visual metronome), 🔄 **Cross Moves** (Stimulus-response compatibility: same side or opposite side), 🤹 **Bilateral Dual-Task** (Asymmetric divided attention: motor holding + cognitive decision) |

---

## ✨ Key Features & Design Principles

- **Adaptive Difficulty**: Uses the *weighted up-down* psychophysical staircase (Kaernbach, 1991) and targets 70–85% accuracy depending on the exercise, a range consistent with *The Eighty Five Percent Rule* (Wilson et al., *Nature Communications* 2019), a theoretical result about learning algorithms. Includes warm-up buffers and frustration brakes.
- **Scientific Transparency**: Every exercise includes a card (labelled "What it’s based on" in the app) naming the paradigm that inspired it and the reference study. The exercises are short, playful versions, not clinical tests, and improvements mostly concern the trained tasks or very similar ones. What the evidence does and does not show, with the full bibliography, is in [docs/scientific-foundations.md](docs/scientific-foundations.md) (Italian: [docs/basi-scientifiche.md](docs/basi-scientifiche.md)).
- **Clear Instructions, Guided Trials & Illustrated Examples**: Every exercise has a "How to play" box with 3–4 numbered steps (what appears, what to do, what counts as a mistake, how difficulty changes) in all 12 languages, an illustrated example and a preliminary practice trial that does not affect your score or level.
- **Rewards That Bring You Back**: XP, levels, 50+ badges and combos, plus a **streak multiplier** (+10% XP per day in a row, up to +50%), a **welcome-back bonus** for the first exercise of the day, the **Golden synapse** (a 15–50 XP surprise bonus about one time in five: unpredicted rewards are the ones dopamine responds to most), a "points from your record" nudge and an invitation to come back tomorrow to grow the streak. Rewards honor effort, never talent (rationale in [`docs/scientific-foundations.md`](docs/scientific-foundations.md)).
- **Radical Privacy & Zero Cookies**: No accounts, no passwords, no email sign-ups, no cookies and no trackers. All progress stays in your browser's local storage (`localStorage`). You can export/import full JSON backups (saving all games, levels, badges, nicknames, and group memberships) or migrate across devices with a temporary 8-character cloud transfer code (valid for 24 hours, automatically deleted immediately upon import or by nightly cleanup for radical privacy). The only exception is the **opt-in weekly leaderboard**: players who join send only a weekly summary under a random nickname, and only then is the Cloudflare Turnstile anti-bot check loaded. Visits are counted with cookie-free Cloudflare Web Analytics.
- **A Leaderboard Designed Not to Discourage**: it rewards effort and improvement rather than talent, shows players in the lower half how many points move them up instead of their rank, never penalises coming back after a break, and never appears during exercises (scientific rationale in [docs/scientific-foundations.md](docs/scientific-foundations.md), §2.6).
- **Optional Milestone Sharing**: an image drawn on the device for sharing your training days this week and your consistency and exploration badges. It holds no name, scores or age, and the Neuro Score stays private (rationale in [docs/scientific-foundations.md](docs/scientific-foundations.md), §2.7).
- **Native Localization (12 Languages)**: English, Spanish, Chinese (Simplified), Hindi, Arabic (with native RTL mirroring), Portuguese, French, Russian, German, Japanese, Indonesian, and Italian. Language files are split and loaded asynchronously on-demand.
- **Accessibility & Wellbeing**: Relaxed pace mode (adds 40% more time), large text option, automatic light and dark theme, and offline **Progressive Web App (PWA)** installation.
- **Standalone Static Pages**:
  - [`index.html`](index.html): The complete interactive PWA game.
  - [`guide.html`](guide.html): Comprehensive illustrated guide to all 40 games, paradigms, and FAQs.
  - [`privacy.html`](privacy.html): Privacy policy, local data terms, and zero-cookie statement.
  - [`license.html`](license.html): Official PolyForm Noncommercial 1.0.0 license terms and copyright notices.

---

## 🛠️ Technical Architecture

Built purely with **TypeScript** and **Vite**, with **zero UI framework dependencies** (no React, Vue, or Angular bloat). This guarantees instant startup times, native DOM rendering performance, and a tiny gzipped bundle size (~34 KB for the core UI runtime, ~110 KB total for the entire app including all 40 games).

```
synapse-dojo/
├── public/                 PWA manifest, SVG icons, Nunito font (OFL), robots.txt, sitemap.xml, _headers, service worker
├── functions/api/          Leaderboard & transfer API (Cloudflare Pages Functions): join, submit, board, me, groups, transfer
├── server/board.ts         Code shared by the API: authentication, validation, ISO weeks, points, groups
├── migrations/             Leaderboard D1 database schema (applied automatically on deploy)
├── cleanup/                Cron Worker that applies the leaderboard retention rules every night
├── scripts/                Build & deploy (deploy-web.mjs), dictionary checks (check-anagrams.mjs) & i18n verify (verify-i18n.mjs)
├── src/
│   ├── exercises/          40 exercise implementations, index.ts (catalog & battery), types.ts, puzzle datasets
│   ├── screens/            App views: home, onboarding, training, play, progress, settings, board, boardJoin, groups, guide, privacy, license
│   ├── locales/            12 standalone locale bundles (en.ts is the type-safe blueprint)
│   ├── adaptive.ts         Continuous adaptive difficulty staircase engine (weighted up-down)
│   ├── audio.ts            Procedural Web Audio API sound synthesis & native SpeechSynthesis
│   ├── board.ts            Leaderboard client: weekly summary, background upload, groups and invites
│   ├── config.ts           Global application constants, site URLs, versioning and repository metadata
│   ├── ctx.ts              Exercise runtime context (timed inputs, feedback loops, cleanup)
│   ├── dom.ts              Lightweight virtual-less DOM builder (h()), math and random utilities, flash animations
│   ├── examples.ts         Procedural visual scene generation for illustrated instructions
│   ├── guide.ts            Standalone guide page entrypoint
│   ├── i18n.ts             Asynchronous localization loader with type-safe fallbacks
│   ├── license.ts          Standalone license page entrypoint
│   ├── main.ts             Main application entrypoint
│   ├── privacy.ts          Standalone privacy page entrypoint
│   ├── rewards.ts          XP calculation, player levels, and streak/achievement badges
│   ├── share.ts            Shareable milestone card, drawn on the device
│   ├── stats.ts            Domain capacity computation & daily workout selector
│   ├── storage.ts          Local storage persistence, schema validation, and full profile export/import
│   ├── style.css           Master stylesheet (responsive layout, themes, RTL support, game styling)
│   ├── transfer.ts         Temporary cloud progress transfer across devices, codes, copy/share, and import dialogs
│   ├── ui.ts               UI page layouts, navigation bars, modals, toasts and settings sync
│   ├── update.ts           Automatic update detection across deploys and graceful reload
│   └── widgets.ts          Shared components (HTML5 canvas, numeric keypads, sparklines)
│   ├── ui.ts               UI page layouts, navigation bars, modals, toasts and settings sync
│   ├── update.ts           Automatic update detection across deploys and graceful reload
│   └── widgets.ts          Shared components (HTML5 canvas, numeric keypads, sparklines)
├── index.html              Primary single-page application (PWA)
├── guide.html              Standalone guide view
├── privacy.html            Standalone privacy view
├── license.html            Standalone license view
├── vite.config.ts          Multi-page build configuration, /api proxy in development & Cloudflare Web Analytics hook
├── wrangler.toml           Cloudflare Pages project and D1 database binding
├── tsconfig.json           Client application TypeScript configuration (src/)
├── tsconfig.api.json       Server, functions/ and cleanup cron Worker TypeScript configuration
└── package.json
```

---

## 💻 Local Development

Requirements: **Node.js 22.12+** and **npm** (needed by Vite 8 and Wrangler 4).

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:5173)
npm run dev

# TypeScript type-check (app and API) and production build into dist/
npm run build
```

To try the leaderboard locally, use two terminals: `npm run dev:api` starts the API with a local D1 database on `http://127.0.0.1:8788` (it serves the build in `dist/`, so run it after `npm run build`), and `npm run dev` reaches it through the `/api` proxy. The anti-bot check is skipped locally. `npm run check:api` only type-checks the server code.

### Adding a new exercise

1. Create `src/exercises/myExercise.ts` exporting an `Exercise` object with its cognitive domain, levels, and `run(ctx)` implementation.
2. Leverage the runtime context: `ctx.stage` for layout/canvas rendering, `ctx.input()` / `ctx.timed()` for user interactions, and `ctx.wait()` for cancellable pauses.
3. Add the title, description, step-by-step instructions (`ex.<id>.how`, one step per line), example sentence, and "why it works" explanation in `src/locales/en.ts` and language files, create the visual example scene in `src/examples.ts`, and register the exercise in `src/exercises/index.ts`.

---

## 🚀 Production Deployment

The project is hosted live on **[https://synapsedojo.com](https://synapsedojo.com)** via Cloudflare Pages edge network.

To build and deploy updates to production:

```bash
npm run deploy
```

The script `scripts/deploy-web.mjs` executes an optimized production build (`npm run build:web`), applies pending migrations to the remote D1 database and deploys `dist/` together with the `functions/` API and the `cleanup/` cron Worker via [Wrangler](https://developers.cloudflare.com/workers/wrangler/). The `public/_headers` file enforces strict HTTP security headers (CSP, Permissions-Policy, HSTS) and immutable caching on hashed static assets.

One-time setup for the leaderboard:

1. `npx wrangler d1 create synapse-board`, then copy the id it prints into `wrangler.toml`.
2. Create a **Turnstile** widget (Managed mode) for the site's domains in the Cloudflare dashboard.
3. Add the site key to `.env.web.local` (git-ignored) as `VITE_TURNSTILE_SITE_KEY=…`.
4. Set the secret key with `npx wrangler pages secret put TURNSTILE_SECRET --project-name synapse-gym`.

Everything fits in Cloudflare's free plan (Pages, Functions, Workers cron, D1 and Turnstile).

---

## ⚖️ License

Copyright (c) 2026 **Sergio Dogliani**.  
Distributed under the **[PolyForm Noncommercial License 1.0.0](LICENSE)**.

- **Permitted Use**: You are free to view, run, study, and modify the source code for personal, educational, research, and noncommercial purposes.
- **Commercial Restrictions**: Any unauthorized commercial use, monetization, advertising, resale, or distribution of this software for commercial advantage is strictly prohibited without a written commercial license from the author.
- The psychological exercise paradigms and cognitive models used are in the public domain.
- The Nunito font in `public/fonts/` is licensed under the [SIL Open Font License 1.1](public/fonts/OFL.txt).
