import { h, shuffle, clamp, flash } from '../dom';
import { sfx } from '../audio';
import { store } from '../storage';
import { t, WORDS } from '../i18n';
import type { Exercise } from './types';

export const vault: Exercise = {
  id: 'vault',
  icon: '🔐',
  skill: 'memory',
  name: 'ex.vault.name',
  desc: 'ex.vault.desc',

  async run(ctx) {
    const studyCount = ctx.quick ? 8 : 12;
    const studySecs = ctx.quick ? 20 : 30;
    const pool = shuffle(WORDS[store.data.settings.lang]);
    const studied = pool.slice(0, studyCount);
    const lures = pool.slice(studyCount, studyCount * 2);

    // Phase 1: study, with a visible countdown and an early-exit button.
    const timer = h('div', { class: 'vault-timer' });
    const list = h('div', { class: 'vault-list' }, ...studied.map((w) => h('div', { class: 'vault-word' }, w)));
    const doneBtn = h('button', { class: 'btn primary' }, t('ex.vault.done'));
    ctx.stage.append(h('div', { class: 'vault-title' }, t('ex.vault.study')), timer, list, doneBtn);

    await ctx.input<void>((done) => {
      let left = studySecs;
      timer.textContent = `${left}`;
      ctx.progress(0, `${left}s`);
      const id = setInterval(() => {
        left--;
        timer.textContent = `${left}`;
        ctx.progress((studySecs - left) / studySecs, `${left}s`);
        if (left <= 0) done();
      }, 1000);
      doneBtn.onclick = () => done();
      return () => clearInterval(id);
    });

    // Phase 2: recognition, one word at a time.
    ctx.stage.replaceChildren();
    const probes = shuffle([...studied.map((w) => ({ w, old: true })), ...lures.map((w) => ({ w, old: false }))]);
    const card = h('div', { class: 'vault-probe' });
    let onAnswer: ((old: boolean) => void) | null = null;
    const seenBtn = h('button', { class: 'btn big good-btn', onClick: () => onAnswer?.(true) }, `✓ ${t('ex.vault.seen')}`);
    const newBtn = h('button', { class: 'btn big', onClick: () => onAnswer?.(false) }, `✗ ${t('ex.vault.new')}`);
    ctx.stage.append(card, h('div', { class: 'vault-actions' }, newBtn, seenBtn));

    let hits = 0;
    let falseAlarms = 0;
    let correct = 0;
    for (let i = 0; i < probes.length; i++) {
      ctx.progress(i / probes.length, `${i + 1}/${probes.length}`);
      const p = probes[i];
      card.textContent = p.w;
      flash(card, 'pop', 200);
      const saidOld = await ctx.input<boolean>((done) => {
        onAnswer = done;
        const kb = (e: KeyboardEvent) => {
          if (e.key === 'ArrowRight') done(true);
          if (e.key === 'ArrowLeft') done(false);
        };
        window.addEventListener('keydown', kb);
        return () => {
          onAnswer = null;
          window.removeEventListener('keydown', kb);
        };
      });
      if (saidOld && p.old) hits++;
      if (saidOld && !p.old) falseAlarms++;
      if (saidOld === p.old) {
        correct++;
        sfx.ok();
        flash(card, 'good');
      } else {
        sfx.bad();
        flash(card, 'bad');
      }
      await ctx.wait(250);
    }
    ctx.progress(1);

    const score = clamp((hits - falseAlarms) / studyCount, 0, 1) * 100;
    return { score, detail: t('ex.vault.result', { n: correct, t: probes.length }) };
  },
};
