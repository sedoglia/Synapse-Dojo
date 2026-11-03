import { cleanUp } from '../server/board';

/** Nightly cron: applies the leaderboard's retention rules. A failure shows up in the Worker's cron events and logs. */
export default {
  async scheduled(_controller, env) {
    console.log('Leaderboard cleanup, rows deleted:', JSON.stringify(await cleanUp(env.DB)));
  },
} satisfies ExportedHandler<{ DB: D1Database }>;
