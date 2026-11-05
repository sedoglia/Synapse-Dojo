import { version } from '../package.json';

// Single place to rename the game.
export const APP_NAME = 'Synapse Dojo';
export const STORAGE_KEY = 'synapse-dojo/v1';
/** Public address, printed on shared cards whichever host the game runs on. */
export const SITE_URL = 'https://synapsedojo.com';
/** Read from package.json, so it can't fall behind the published version. */
export const VERSION = version;
/** Official GitHub repository URL. */
export const GITHUB_REPO = 'https://github.com/sedoglia/Synapse-Dojo';
/** Shown on the privacy page: who to write to about the game or its data. */
export const CONTACT = 'Sergio Dogliani, sedoglia@gmail.com';
