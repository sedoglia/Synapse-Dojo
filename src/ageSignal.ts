/**
 * Age signal from the Android app (docs/android.md §12.6). Before opening the site the app asks Google Play for the
 * user's age range and passes only whether the user is a minor or an adult, as #sd-age=minor or #sd-age=adult in the
 * address. It is read and removed here, before anything else runs (the visit statistics included), and only that
 * one word is kept on this device: it never goes to a server and is not part of a save or a transfer.
 *
 * For a minor the features where players meet others (the leaderboard and its groups) are not offered, and an
 * existing membership is left with its data deleted. Everything else stays the same. An empty answer (most users
 * outside California and Brazil, phones without Google Play, the website) keeps what was known before.
 */
const KEY = 'synapse-dojo/age-signal';
let minorThisVisit = false;

function take(): void {
  const match = /^#sd-age=(minor|adult)$/.exec(location.hash);
  if (!match) return;
  history.replaceState(history.state, '', location.pathname + location.search);
  try {
    if (match[1] === 'minor') localStorage.setItem(KEY, 'minor');
    else localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable: the signal applies to this visit only */
    minorThisVisit = match[1] === 'minor';
  }
}

take();

/** True when Google Play told the Android app that the user is under 18. */
export function isMinor(): boolean {
  if (minorThisVisit) return true;
  try {
    return localStorage.getItem(KEY) === 'minor';
  } catch {
    return false;
  }
}
