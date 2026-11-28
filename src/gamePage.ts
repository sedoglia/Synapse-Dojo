// Entry of the standalone game pages (/games/<slug>, /<lang>/games/<slug>): their text is already in the HTML,
// written at build time by scripts/build-seo-pages.mjs, so this only applies the player's display settings.
import './style.css';
import { store } from './storage';
import { inApp } from './nav';

document.documentElement.classList.toggle('big-text', store.data.settings.bigText);
// Inside the Android app (or the installed PWA) the store link would offer what is already installed.
if (inApp()) for (const el of document.querySelectorAll<HTMLElement>('[data-store-link]')) el.hidden = true;
