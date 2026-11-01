import { defineConfig, loadEnv } from 'vite';

// Relative base so the build works on any host or sub-path.
// Cloudflare Web Analytics is added only when a token is set: reads it from
// `.env.web.local` (or the environment).
export default defineConfig(({ mode }) => {
  const token = loadEnv(mode, process.cwd(), 'VITE_').VITE_CF_ANALYTICS_TOKEN?.trim();
  if (token && !/^[\w-]+$/.test(token)) throw new Error('VITE_CF_ANALYTICS_TOKEN looks malformed.');
  return {
    base: './',
    build: { rollupOptions: { input: { main: 'index.html', privacy: 'privacy.html', guide: 'guide.html' } } },
    plugins: [
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
