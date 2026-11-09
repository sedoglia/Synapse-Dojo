import { defineConfig, loadEnv, type Connect } from 'vite';

const CLEAN_PAGE = /^\/(guide|privacy|license)\/?(?=$|[?#])/;
const cleanUrls: Connect.NextHandleFunction = (req, _res, next) => {
  if (req.url) req.url = req.url.replace(CLEAN_PAGE, '/$1.html');
  next();
};

// Relative base so the build works on any host or sub-path.
// Cloudflare Web Analytics is added only when a token is set: reads it from
// `.env.web.local` (or the environment).
export default defineConfig(({ mode }) => {
  const token = loadEnv(mode, process.cwd(), 'VITE_').VITE_CF_ANALYTICS_TOKEN?.trim();
  if (token && !/^[\w-]+$/.test(token)) throw new Error('VITE_CF_ANALYTICS_TOKEN looks malformed.');
  return {
    base: './',
    // Leaderboard API during `npm run dev`: run `npm run dev:api` (wrangler on port 8788) alongside.
    server: { proxy: { '/api': 'http://127.0.0.1:8788' } },
    build: { rolldownOptions: { input: { main: 'index.html', privacy: 'privacy.html', guide: 'guide.html', license: 'license.html' } } },
    plugins: [
      {
        // Cloudflare Pages serves /guide for guide.html (and redirects the .html form), so links use clean URLs;
        // map them back to the files in `npm run dev` and `npm run preview`.
        name: 'clean-urls',
        configureServer: (server) => void server.middlewares.use(cleanUrls),
        configurePreviewServer: (server) => void server.middlewares.use(cleanUrls),
      },
      {
        name: 'cf-web-analytics',
        apply: 'build',
        // Cloudflare's own snippet; single quotes keep the JSON attribute intact.
        transformIndexHtml: (html) =>
          token
            ? html.replace(
                '</body>',
                `  <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "${token}"}'></script>\n  </body>`,
              )
            : html,
      },
    ],
  };
});
