/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Cloudflare Turnstile site key for joining the leaderboard (public; set in `.env.web.local`). */
  readonly VITE_TURNSTILE_SITE_KEY?: string;
}
