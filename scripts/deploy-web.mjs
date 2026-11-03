// Builds the public version and publishes it on Cloudflare Pages by direct upload (no Git connection needed,
// so the repository can stay private).
//
//   npx wrangler login       # once, opens the browser to authorise this computer
//   npm run deploy
//
// Optional: CF_PAGES_PROJECT (default synapse-gym). The Cloudflare Web Analytics token and the Turnstile site key
// for the leaderboard are read at build time from VITE_CF_ANALYTICS_TOKEN and VITE_TURNSTILE_SITE_KEY, either in
// the environment or in a git-ignored `.env.web.local` file. Pending leaderboard database migrations are applied
// before each deploy.
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const project = process.env.CF_PAGES_PROJECT || 'synapse-gym';

if (!/^[a-z0-9][a-z0-9-]*$/.test(project)) {
  console.error('CF_PAGES_PROJECT must be a Cloudflare Pages project name (lowercase letters, digits and dashes).');
  process.exit(1);
}

const check = (r) => {
  if (r.status !== 0) process.exit(r.status ?? 1);
};
// npm and npx are .cmd shims on Windows, which need a shell; the only variable part is validated above.
const run = (cmd) => {
  console.log(`> ${cmd}`);
  check(spawnSync(cmd, { stdio: 'inherit', shell: true }));
};

// Without a site key nobody can join the leaderboard (the server rejects joins without a Turnstile token).
const envFile = existsSync('.env.web.local') ? readFileSync('.env.web.local', 'utf8') : '';
if (!process.env.VITE_TURNSTILE_SITE_KEY?.trim() && !/^\s*VITE_TURNSTILE_SITE_KEY\s*=\s*\S/m.test(envFile)) {
  console.warn('Warning: VITE_TURNSTILE_SITE_KEY is not set, so joining the leaderboard will fail on the public site.');
}

run('npm run build:web');
run('npx wrangler d1 migrations apply synapse-board --remote');
// --branch main makes it a production deployment; --commit-dirty silences the warning about uncommitted files.
run(`npx wrangler pages deploy dist --project-name ${project} --branch main --commit-dirty=true`);
// The nightly cleanup is a separate Worker sharing server/board.ts, so it ships with the site.
run('npx wrangler deploy --config cleanup/wrangler.toml');
console.log('Deployed.');
