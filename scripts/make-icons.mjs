// Renders the PNG icons in public/ from public/icon.svg, for the web app manifest and the Android app (TWA).
// Run it again only when icon.svg changes:
//
//   node scripts/make-icons.mjs
//
// It uses sharp, which is already installed as a dependency of wrangler; the PNG files are committed, so the build
// never runs this script.
//   icon-192.png, icon-512.png   "any": the icon as it is, rounded corners on a transparent background
//   icon-maskable-512.png        "maskable": square, full-bleed background, with the drawing shrunk into the
//                                central safe zone so launchers can crop it to a circle, squircle or square
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const svg = readFileSync('public/icon.svg', 'utf8');

// Maskable: no rounded corners, and the drawing (its bounding box is centred on 262,264) scaled to 80% around the
// centre, so its farthest point stays about 140 px from the centre, inside the circle of radius 0.4 × 512 = 205 px
// that the manifest spec keeps safe, and inside Android's adaptive icon safe zone (66/108 of the size, 156 px).
const maskable = svg
  .replace(/ rx="\d+"/, '')
  .replace(/(<g stroke=[\s\S]*<\/g>)\s*<\/svg>/, '<g transform="translate(256 256) scale(0.8) translate(-262 -264)">$1</g>\n</svg>');
if (maskable === svg || !maskable.includes('scale(0.8)')) throw new Error('icon.svg changed shape: update this script.');

const render = (source, size, file) =>
  sharp(Buffer.from(source), { density: (72 * size) / 512 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(`public/${file}`)
    .then(() => console.log(`public/${file}`));

await render(svg, 192, 'icon-192.png');
await render(svg, 512, 'icon-512.png');
await render(maskable, 512, 'icon-maskable-512.png');
