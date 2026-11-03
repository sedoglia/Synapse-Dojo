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

- **🏋️ Daily Workout**: ~10–12 minutes with 4 daily exercises selected across your least recently trained skills. Once finished, you can immediately start another workout with different exercises and domains.
- **📏 Measure Neuro Score**: Daily benchmarking battery assessing all **9 cognitive and motor abilities** (selecting one rotating exercise per domain daily) to calculate a normalized **Neuro Score** from 0 to 1000, objectively tracking your mental acuity over time.
- **🧩 Free Gym**: Full catalog of **35 exercises** categorized into **9 cognitive and bilateral coordination domains**. Each exercise features a **continuous adaptive difficulty engine** that calibrates in real-time to keep you in the optimal learning zone, saving your progress across sessions.
- **🏆 Weekly Leaderboard & Friend Groups** (optional, off by default): each week compare **consistency** (10 points per training day plus 1 per exercise, up to 12 a day), **improvement** against your own starting point and **best level** per exercise, with optional age groups and a separate board for relaxed-pace players. It resets every Monday, shows the top 3 and the players near you, and works for everyone or in **private groups** joined with a link or a code. It uses a random nickname, and leaving at any time deletes all data.

### The 9 Domains and 35 Exercises

| Domain | Exercises & Core Scientific Paradigms |
|---|---|
| **⚡ Speed** | 👁️ **Glance** (Useful Field of View / UFOV, ACTIVE clinical trial), ⚡ **Choice Reflex** (Choice reaction time + Go/No-Go), 🔢 **Number Path** (Trail Making Test A/B), ⏱️ **Reaction Time** (Simple visual reaction time) |
| **🎯 Attention** | 🏎️ **Pilot** (Continuous visuo-motor multitasking, inspired by NeuroRacer), 🎯 **Radar** (Multiple Object Tracking / MOT), 🎯 **Flanker Test** (Selective attention & flanker distractor inhibition), 🚦 **Go / No-Go** (Motor response inhibition), 🔠 **Multi-Source Interference** (MSIT - anterior cingulate conflict), 💠 **Color and Shape** (Visual feature binding) |
| **🎛️ Executive Control** | 🎨 **Color Clash** (Stroop effect & cognitive interference), 🔀 **Dual Rule** (Task switching & switch cost reduction), 🃏 **Card Sorting** (Wisconsin Card Sorting Test - inductive rule deduction & set-shifting) |
| **🧠 Working Memory** | 🔁 **Echo** (Single and dual auditory-visual N-Back with speech synthesis), 💡 **Light Grid** (Corsi block-tapping forward and backward), 🔟 **Last Digits** (Running memory span & continuous updating), 🔢 **Digit Span** (WAIS verbal forward & backward digit span) |
| **🔐 Episodic Memory** | 🔐 **Word Vault** (Old/new recognition memory), 🔗 **Pairs** (Symbol-word paired associates learning), 📜 **Story Memory** (Logical memory & hippocampal episodic narrative recall) |
| **🧊 Spatial Cognition** | 🧊 **Rotations** (Mental rotation of 2D & 3D chiral figures), 📐 **Spatial Matrix** (Mental rotation of matrix coordinates at 90°, 180°, and 270°) |
| **🧩 Reasoning & Planning** | 🗼 **Towers** (Tower of London - advance strategic lookahead), 🧩 **Odd One Out** (Inductive reasoning & feature matching), ⚖️ **Resource Management** (Constrained knapsack optimization) |
| **➗ Math & Reading** | ➗ **Math Sprint** (Rapid mental arithmetic - Kawashima learning therapy), 📖 **Speed Reading** (Rapid vocal reading with timer & comprehension check), 🔴 **Dot Calculation** (Approximate Number System: comparing quantities without counting), 🔤 **Anagrams** (Orthographic working memory & lexical retrieval), 💡 **Word Sprint** (fast orthographic classification by initial letter) |
| **👐 Bilateral Coordination** | 👆 **Bilateral Tap** (left/right bimanual tap sequences), 👋 **Bilateral Swipe** (Asymmetric bimanual spatial decoupling), 🎵 **Bilateral Rhythm** (Sensorimotor synchronization to an audio-visual metronome), 🔄 **Cross Moves** (Midline crossing & contralateral motor integration), 🤹 **Bilateral Dual-Task** (Asymmetric divided attention: motor holding + cognitive decision) |

---

## ✨ Key Features & Design Principles

- **Evidence-Based Adaptive Engine**: Guided by *The Eighty Five Percent Rule for optimal learning* (Wilson et al., *Nature Communications* 2019) and the *weighted up-down* staircase method (Kaernbach, 1991): difficulty continuously adapts targeting ~80% accuracy—the sweet spot for neural plasticity. Includes warm-up buffers and frustration brakes.
- **Scientific Transparency**: Every exercise includes a **"Why It Works"** card explaining the underlying clinical paradigm and study citations. The complete literature review is documented in [docs/scientific-foundations.md](docs/scientific-foundations.md) (Italian: [docs/basi-scientifiche.md](docs/basi-scientifiche.md)).
- **Guided Trials & Illustrated Examples**: Every exercise provides visual step-by-step examples and a preliminary practice trial that does not affect your score or level.
- **Radical Privacy & Zero Cookies**: No accounts, no passwords, no email sign-ups, no cookies and no trackers. All progress stays in your browser's local storage (`localStorage`), with one-click JSON backup export/import in Settings. The only exception is the **opt-in weekly leaderboard**: players who join send only a weekly summary under a random nickname, and only then is the Cloudflare Turnstile anti-bot check loaded. Visits are counted with cookie-free Cloudflare Web Analytics.
- **A Leaderboard Designed Not to Discourage**: it rewards effort and improvement rather than talent, shows players in the lower half how many points move them up instead of their rank, never penalises coming back after a break, and never appears during exercises (scientific rationale in [docs/scientific-foundations.md](docs/scientific-foundations.md), §2.6).
- **Native Localization (12 Languages)**: English, Spanish, Chinese (Simplified), Hindi, Arabic (with native RTL mirroring), Portuguese, French, Russian, German, Japanese, Indonesian, and Italian. Language files are split and loaded asynchronously on-demand.
- **Accessibility & Wellbeing**: Relaxed pace mode (adds 40% more time), large text option, automatic light and dark theme, and offline **Progressive Web App (PWA)** installation.
- **Standalone Static Pages**:
  - [`index.html`](index.html): The complete interactive PWA game.
  - [`guide.html`](guide.html): Comprehensive illustrated guide to all 35 games, paradigms, and FAQs.
  - [`privacy.html`](privacy.html): Privacy policy, local data terms, and zero-cookie statement.
  - [`license.html`](license.html): Official PolyForm Noncommercial 1.0.0 license terms and copyright notices.

---

## 🛠️ Technical Architecture

Built purely with **TypeScript** and **Vite**, with **zero UI framework dependencies** (no React, Vue, or Angular bloat). This guarantees instant startup times, native DOM rendering performance, and a tiny gzipped bundle size (~30 KB).

```
synapse-dojo/
├── public/                 PWA manifest, SVG icons, Nunito font (OFL), robots.txt, sitemap.xml, _headers, service worker
├── functions/api/          Leaderboard API (Cloudflare Pages Functions): join, submit, board, me, groups/
├── server/board.ts         Code shared by the API: authentication, validation, ISO weeks, points, groups
├── migrations/             Leaderboard D1 database schema (applied automatically on deploy)
├── scripts/deploy-web.mjs  Build, migrations and publishing to Cloudflare Pages
├── src/
│   ├── exercises/          35 exercise implementations (1 file each) + index.ts (daily rotation & battery)
│   ├── screens/            App views: home, onboarding, training, play, progress, settings, board, boardJoin, groups, guide, privacy, license
│   ├── locales/            12 standalone locale bundles (en.ts is the type-safe blueprint)
│   ├── board.ts            Leaderboard client: weekly summary, background upload, groups and invites
│   ├── adaptive.ts         Continuous adaptive difficulty staircase engine (weighted up-down)
│   ├── audio.ts            Procedural Web Audio API sound synthesis & native SpeechSynthesis
│   ├── rewards.ts          XP calculation, player levels, and streak/achievement badges
│   ├── examples.ts         Procedural visual scene generation for illustrated instructions
│   ├── stats.ts            Domain capacity computation & daily workout selector
│   ├── ctx.ts              Exercise runtime context (timed inputs, feedback loops, cleanup)
│   ├── widgets.ts          Shared components (HTML5 canvas, numeric keypads, sparklines)
│   ├── i18n.ts             Asynchronous localization loader with type-safe fallbacks
│   ├── storage.ts          Local storage persistence, schema validation, and JSON backup export/import
│   ├── ui.ts               DOM rendering utilities and layout containers
│   ├── main.ts             Main application entrypoint
│   ├── guide.ts            Standalone guide page entrypoint
│   ├── privacy.ts          Standalone privacy page entrypoint
│   └── license.ts          Standalone license page entrypoint
├── index.html              Primary single-page application (PWA)
├── guide.html              Standalone guide view
├── privacy.html            Standalone privacy view
├── license.html            Standalone license view
├── vite.config.ts          Multi-page build configuration, /api proxy in development & Cloudflare Web Analytics hook
├── wrangler.toml           Cloudflare Pages project and D1 database binding
├── tsconfig.api.json       Type-check of the server code (functions/ and server/)
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
3. Add the title, description, example sentence, and "why it works" explanation in `src/locales/en.ts` and language files, create the visual example scene in `src/examples.ts`, and register the exercise in `src/exercises/index.ts`.

---

## 🚀 Production Deployment

The project is hosted live on **[https://synapsedojo.com](https://synapsedojo.com)** via Cloudflare Pages edge network.

To build and deploy updates to production:

```bash
npm run deploy
```

The script `scripts/deploy-web.mjs` executes an optimized production build (`npm run build:web`), applies pending migrations to the remote D1 database and deploys `dist/` together with the `functions/` API via [Wrangler](https://developers.cloudflare.com/workers/wrangler/). The `public/_headers` file enforces strict HTTP security headers (CSP, Permissions-Policy, HSTS) and immutable caching on hashed static assets.

One-time setup for the leaderboard:

1. `npx wrangler d1 create synapse-board`, then copy the id it prints into `wrangler.toml`.
2. Create a **Turnstile** widget (Managed mode) for the site's domains in the Cloudflare dashboard.
3. Add the site key to `.env.web.local` (git-ignored) as `VITE_TURNSTILE_SITE_KEY=…`.
4. Set the secret key with `npx wrangler pages secret put TURNSTILE_SECRET --project-name synapse-gym`.

Everything fits in Cloudflare's free plan (Pages, Functions, D1 and Turnstile).

---

## ⚖️ License

Copyright (c) 2026 **Sergio Dogliani**.  
Distributed under the **[PolyForm Noncommercial License 1.0.0](LICENSE)**.

- **Permitted Use**: You are free to view, run, study, and modify the source code for personal, educational, research, and noncommercial purposes.
- **Commercial Restrictions**: Any unauthorized commercial use, monetization, advertising, resale, or distribution of this software for commercial advantage is strictly prohibited without a written commercial license from the author.
- The psychological exercise paradigms and cognitive models used are in the public domain.
- The Nunito font in `public/fonts/` is licensed under the [SIL Open Font License 1.1](public/fonts/OFL.txt).
