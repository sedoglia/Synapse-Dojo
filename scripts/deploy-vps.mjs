// Builds the game and publishes it on a Linux host through SSH, served over HTTPS by `tailscale serve`.
//
//   VPS_USER=me npm run deploy:vps            # update the files
//   VPS_USER=me npm run deploy:vps -- --setup # first time: also start `tailscale serve`
//
// Optional: VPS_HOST (default vps-f2a5538a), VPS_DIR (default synapse-gym, relative to the remote home),
// VPS_PORT (default 8443). A dedicated HTTPS port leaves other sites served on 443 untouched and gives
// the game its own origin, so storage and service workers never mix with them.
import { spawnSync } from 'node:child_process';

const host = process.env.VPS_HOST || 'vps-f2a5538a';
const user = process.env.VPS_USER;
const dir = process.env.VPS_DIR || 'synapse-gym';
const port = process.env.VPS_PORT || '8443';
const setup = process.argv.includes('--setup');

if (!user) {
  console.error('Set VPS_USER to the Linux user you log in with (e.g. VPS_USER=sergio npm run deploy:vps).');
  process.exit(1);
}
if (!/^[\w.-]+$/.test(dir)) {
  console.error('VPS_DIR must be a simple folder name inside the remote home directory.');
  process.exit(1);
}
if (!/^\d+$/.test(port) || port === '443') {
  console.error('VPS_PORT must be a number other than 443 (keep 443 for whatever is already served there).');
  process.exit(1);
}

const target = `${user}@${host}`;
const check = (r) => {
  if (r.status !== 0) process.exit(r.status ?? 1);
};
const run = (cmd, args) => {
  console.log(`> ${cmd} ${args.join(' ')}`);
  check(spawnSync(cmd, args, { stdio: 'inherit' }));
};
const ssh = (script) => run('ssh', [target, script]);

// npm is a .cmd shim on Windows, which needs a shell; a fixed string avoids passing unescaped args.
console.log('> npm run build');
check(spawnSync('npm run build', { stdio: 'inherit', shell: true }));

// Upload to a fresh folder, then swap it in so visitors never see a half-copied site.
ssh(`rm -rf ~/${dir}.new`);
run('scp', ['-r', '-q', 'dist', `${target}:${dir}.new`]);
ssh(`rm -rf ~/${dir}.old && { [ ! -d ~/${dir} ] || mv ~/${dir} ~/${dir}.old; } && mv ~/${dir}.new ~/${dir} && rm -rf ~/${dir}.old`);

if (setup) {
  // Serves the folder at https://<host>.<tailnet>.ts.net:<port>, reachable only inside the tailnet.
  // Only this port's handler is added; existing handlers on other ports are left as they are.
  ssh(`sudo tailscale serve --bg --https=${port} "$HOME/${dir}" && tailscale serve status`);
}
console.log('Deployed.');
