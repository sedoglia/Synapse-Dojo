import { h } from '../dom';
import { store, type Settings } from '../storage';
import { t, type Lang } from '../i18n';
import { APP_NAME } from '../config';
import { render, page, applySettings } from '../ui';
import { showHome } from './home';
import { showOnboarding } from './onboarding';

/** A daily recurring calendar event: a reminder that works on any phone, with no server or push service. */
function downloadReminder(time: string) {
  const [hh, mm] = time.split(':');
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
  const url = location.href.split('#')[0];
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${APP_NAME}//Reminder//EN`,
    'BEGIN:VEVENT',
    `UID:daily-training@${location.host || 'synapse-gym'}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${ymd}T${hh}${mm}00`,
    'DURATION:PT15M',
    'RRULE:FREQ=DAILY',
    `SUMMARY:🧠 ${APP_NAME}`,
    `DESCRIPTION:${t('reminder.desc')} — ${url}`,
    `URL:${url}`,
    'BEGIN:VALARM',
    'TRIGGER:PT0M',
    'ACTION:DISPLAY',
    `DESCRIPTION:${APP_NAME}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const a = h('a', { href: URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })), download: 'synapse-gym-reminder.ics' });
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
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

export function showSettings() {
  const nameInput = h('input', { class: 'input', value: store.data.name, maxlength: 24 });
  nameInput.addEventListener('change', () => {
    store.data.name = nameInput.value.trim() || store.data.name;
    store.save();
  });

  const langSelect = h(
    'select',
    {
      class: 'input',
      onChange: (e: Event) => {
        store.data.settings.lang = (e.target as HTMLSelectElement).value as Lang;
        store.save();
        applySettings();
        showSettings();
      },
    },
    h('option', { value: 'it', selected: store.data.settings.lang === 'it' }, 'Italiano'),
    h('option', { value: 'en', selected: store.data.settings.lang === 'en' }, 'English'),
  );

  render(
    page(
      t('settings.title'),
      showHome,
      h(
        'section',
        { class: 'card form' },
        h('label', {}, t('settings.name'), nameInput),
        h('label', {}, t('settings.lang'), langSelect),
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
      h(
        'section',
        { class: 'card' },
        h(
          'button',
          {
            class: 'btn danger',
            onClick: () => {
              if (confirm(t('settings.resetConfirm'))) {
                store.reset();
                applySettings();
                showOnboarding();
              }
            },
          },
          t('settings.reset'),
        ),
      ),
      h('p', { class: 'muted small center' }, `${APP_NAME} v0.3.0 · ${t('settings.about')}`),
    ),
  );
}
