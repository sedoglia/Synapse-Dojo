// Builds the public version and publishes it on Cloudflare Pages by direct upload (no Git connection needed,
// so the repository can stay private).
//
//   npx wrangler login       # once, opens the browser to authorise this computer
//   npm run deploy:web
//
// Optional: CF_PAGES_PROJECT (default synapse-gym). The Cloudflare Web Analytics token is read at build time
// from VITE_CF_ANALYTICS_TOKEN, either in the environment or in a git-ignored `.env.web.local` file.
import { spawnSync } from 'node:child_process';

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

run('npm run build:web');
// --branch main makes it a production deployment; --commit-dirty silences the warning about uncommitted files.
run(`npx wrangler pages deploy dist --project-name ${project} --branch main --commit-dirty=true`);
console.log('Deployed.');
