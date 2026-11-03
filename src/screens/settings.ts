import { h, todayKey } from '../dom';
import { store, parseSave, type Settings } from '../storage';
import { t, dateText } from '../i18n';
import { APP_NAME, VERSION, GITHUB_REPO } from '../config';
import { render, page, applySettings, langSelect, setLang } from '../ui';
import { showHome } from './home';
import { showOnboarding } from './onboarding';
import { showPrivacy } from './privacy';
import { showGuide } from './guide';
import { showLicense } from './license';
import { AGE_BANDS, boardAvailable, boardErrorText, joinBoard, leaveBoard, nickname, updateBoardProfile, type AgeBand } from '../board';
import { showBoard } from './board';

/** Escapes a text value for an iCalendar property (RFC 5545 §3.3.11). */
const icsText = (s: string) => s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\r?\n/g, '\\n');

/** A daily recurring calendar event: a reminder that works on any phone, with no server or push service. */
function downloadReminder(time: string) {
  const [hh = '18', mm = '00'] = /^\d{2}:\d{2}$/.test(time) ? time.split(':') : [];
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
  const url = location.href.split('#')[0];
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${APP_NAME}//Reminder//EN`,
    'BEGIN:VEVENT',
    `UID:daily-training@${location.host || 'synapse-dojo'}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${ymd}T${hh}${mm}00`,
    'DURATION:PT15M',
    'RRULE:FREQ=DAILY',
    `SUMMARY:🧠 ${icsText(APP_NAME)}`,
    `DESCRIPTION:${icsText(`${t('reminder.desc')} — ${url}`)}`,
    `URL:${url}`,
    'BEGIN:VALARM',
    'TRIGGER:PT0M',
    'ACTION:DISPLAY',
    `DESCRIPTION:${icsText(APP_NAME)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  download(ics, 'text/calendar', 'synapse-dojo-reminder.ics');
}

function download(text: string, type: string, name: string) {
  const a = h('a', { href: URL.createObjectURL(new Blob([text], { type })), download: name });
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/** Replaces the current save with an exported file, after checking it and asking for confirmation. */
async function importSave(file: File) {
  let data = null;
  try {
    data = parseSave(JSON.parse(await file.text()));
  } catch {
    /* not JSON */
  }
  if (!data) return alert(t('settings.importBad'));
  const last = [...data.runs.map((r) => r.date), ...data.checks.map((c) => c.date)].sort().pop() ?? data.created;
  if (!confirm(t('settings.importConfirm', { name: data.name || '—', runs: data.runs.length, last: dateText(last) }))) return;
  store.replace(data);
  await setLang(store.data.settings.lang);
  alert(t('settings.importDone'));
  if (store.data.name) showSettings();
  else showOnboarding();
}

function toggle(key: 'sound' | 'vibration' | 'relaxed' | 'bigText', label: string): HTMLElement {
  const box = h('input', {
    type: 'checkbox',
    checked: store.data.settings[key],
    onChange: (e: Event) => {
      (store.data.settings as Settings)[key] = (e.target as HTMLInputElement).checked;
      store.save();
      applySettings();
    },
  });
  return h('label', { class: 'inline' }, box, label);
}

function ageSelect(value: string | null, onChange: (band: AgeBand | null) => void): HTMLSelectElement {
  const select = h(
    'select',
    { class: 'input', onChange: () => onChange((select.value || null) as AgeBand | null) },
    h('option', { value: '', selected: value === null }, t('settings.boardNoAge')),
    ...AGE_BANDS.map((b) => h('option', { value: b, selected: b === value }, t(`board.band.${b}`))),
  );
  return select;
}

/** Opt-in leaderboard: a clear explanation and a join button, or the player's nickname and how to leave. */
function boardSection(): HTMLElement | null {
  if (!boardAvailable()) return null;
  const acc = store.data.board;
  const error = h('p', { class: 'small board-error', role: 'alert' });
  /** Runs a server action with the buttons disabled; shows the error if it fails. */
  const act = async (buttons: HTMLButtonElement[], work: () => Promise<void>) => {
    buttons.forEach((b) => (b.disabled = true));
    error.textContent = '';
    try {
      await work();
      showSettings();
    } catch (e) {
      error.textContent = boardErrorText(e);
      buttons.forEach((b) => (b.disabled = false));
    }
  };

  if (!acc) {
    let band: AgeBand | null = null;
    const check = h('div', { class: 'turnstile-box' });
    const join = h('button', { class: 'btn primary' }, `🏆 ${t('settings.boardJoin')}`);
    join.addEventListener('click', () => {
      join.textContent = t('settings.boardJoining');
      void act([join], () => joinBoard(band, check)).finally(() => (join.textContent = `🏆 ${t('settings.boardJoin')}`));
    });
    return h(
      'section',
      { class: 'card form' },
      h('h3', {}, `🏆 ${t('settings.board')}`),
      h('p', { class: 'muted small' }, t('settings.boardHint')),
      h('label', {}, t('settings.boardAge'), ageSelect(null, (b) => (band = b))),
      h('div', { class: 'row left' }, join),
      check,
      error,
    );
  }

  const open = h('button', { class: 'btn primary', onClick: () => showBoard(showSettings) }, `🏆 ${t('settings.boardOpen')}`);
  const rename = h('button', { class: 'btn' }, `🎲 ${t('settings.boardRename')}`);
  rename.addEventListener('click', () => void act([rename], () => updateBoardProfile({ rename: true })));
  const leave = h('button', { class: 'btn ghost' }, t('settings.boardLeave'));
  leave.addEventListener('click', () => {
    if (confirm(t('settings.boardLeaveConfirm'))) void act([leave], leaveBoard);
  });
  return h(
    'section',
    { class: 'card form' },
    h('h3', {}, `🏆 ${t('settings.board')}`),
    h('p', {}, t('settings.boardMember', { name: nickname(acc.nameCode) })),
    h('label', {}, t('settings.boardAge'), ageSelect(acc.ageBand, (ageBand) => void act([], () => updateBoardProfile({ ageBand })))),
    h('div', { class: 'row left' }, open, rename),
    h('div', { class: 'row left' }, leave),
    error,
  );
}

export function showSettings() {
  const nameInput = h('input', { class: 'input', value: store.data.name, maxlength: 24 });
  nameInput.addEventListener('change', () => {
    store.data.name = nameInput.value.trim() || store.data.name;
    store.save();
  });

  render(
    page(
      t('settings.title'),
      showHome,
      h(
        'section',
        { class: 'card form' },
        h('label', {}, t('settings.name'), nameInput),
        h('label', {}, t('settings.lang'), langSelect(showSettings)),
        toggle('sound', t('settings.sound')),
        toggle('relaxed', t('settings.relaxed')),
        toggle('vibration', t('settings.vibration')),
        toggle('bigText', t('settings.bigText')),
      ),
      (() => {
        const time = h('input', { class: 'input time', type: 'time', value: '18:00' });
        return h(
          'section',
          { class: 'card form' },
          h('h3', {}, `⏰ ${t('settings.reminder')}`),
          h('p', { class: 'muted small' }, t('settings.reminderHint')),
          h(
            'div',
            { class: 'row left' },
            h('label', { class: 'inline' }, t('settings.reminderTime'), time),
            h('button', { class: 'btn', onClick: () => downloadReminder(time.value || '18:00') }, `📅 ${t('settings.reminderBtn')}`),
          ),
        );
      })(),
      boardSection(),
      (() => {
        const file = h('input', { type: 'file', accept: '.json,application/json', hidden: true });
        file.addEventListener('change', () => {
          const f = file.files?.[0];
          file.value = '';
          if (f) void importSave(f);
        });
        return h(
          'section',
          { class: 'card form' },
          h('h3', {}, `💾 ${t('settings.data')}`),
          h('p', { class: 'muted small' }, t('settings.dataHint')),
          h(
            'div',
            { class: 'row left' },
            h('button', { class: 'btn', onClick: () => download(store.exportJson(), 'application/json', `synapse-dojo-${todayKey()}.json`) }, `⬇️ ${t('settings.export')}`),
            h('button', { class: 'btn', onClick: () => file.click() }, `⬆️ ${t('settings.import')}`),
            file,
          ),
        );
      })(),
      h(
        'section',
        { class: 'card' },
        h(
          'button',
          {
            class: 'btn danger',
            onClick: () => {
              if (confirm(t('settings.resetConfirm'))) {
                // Starting over also takes this player off the leaderboard (if offline, the server forgets them after 90 days).
                leaveBoard().catch(() => {});
                store.reset();
                applySettings();
                showOnboarding();
              }
            },
          },
          t('settings.reset'),
        ),
      ),
      h(
        'p',
        { class: 'center small' },
        h('button', { class: 'link-btn', onClick: () => showGuide(showSettings) }, `📖 ${t('guide.title')}`),
        h('span', {}, ' · '),
        h('button', { class: 'link-btn', onClick: () => showPrivacy(showSettings) }, t('privacy.title')),
        h('span', {}, ' · '),
        h('button', { class: 'link-btn', onClick: () => showLicense(showSettings) }, t('license.title')),
        h('span', {}, ' · '),
        h('a', { class: 'link-btn', href: GITHUB_REPO, target: '_blank', rel: 'noopener noreferrer' }, 'GitHub'),
      ),
      h(
        'p',
        { class: 'muted small center' },
        `${APP_NAME} v${VERSION} · `,
        h('a', { href: GITHUB_REPO, target: '_blank', rel: 'noopener noreferrer', style: 'text-decoration: underline;' }, 'GitHub (sedoglia/Synapse-Dojo)'),
        ` · ${t('settings.about')}`,
      ),
    ),
  );
}
