import { h, pick, scale, flash } from '../dom';
import { sfx } from '../audio';
import { t } from '../i18n';
import type { Exercise } from './types';

const COLORS = [
  { id: 'red', css: 'var(--c-red)' },
  { id: 'blue', css: 'var(--c-blue)' },
  { id: 'green', css: 'var(--c-green)' },
  { id: 'yellow', css: 'var(--c-yellow)' },
] as const;

type ColorId = (typeof COLORS)[number]['id'];
const label = (id: ColorId) => t(`color.${id}`);

export const clash: Exercise = {
  id: 'clash',
  icon: '🎨',
  skill: 'attention',
  name: 'ex.clash.name',
  desc: 'ex.clash.desc',

  async run(ctx) {
    const total = ctx.quick ? 14 : 24;
    const rule = h('div', { class: 'clash-rule' });
    const word = h('div', { class: 'clash-word' });
    let onPick: ((id: ColorId) => void) | null = null;
    const buttons = COLORS.map((c) =>
      h('button', { class: 'btn clash-btn', onPointerdown: () => onPick?.(c.id) }, label(c.id)),
    );
    ctx.stage.append(rule, word, h('div', { class: 'clash-grid' }, ...buttons));

    let correct = 0;
    let rtSum = 0;
    for (let i = 0; i < total; i++) {
      ctx.progress(i / total, `${i + 1}/${total}`);
      // The gym version mixes in a second rule that flips which feature counts.
      const byWord = !ctx.quick && Math.random() < 0.4;
      const meaning = pick(COLORS);
      const congruent = Math.random() < 0.25;
      const ink = congruent ? meaning : pick(COLORS.filter((c) => c.id !== meaning.id));
      const target = byWord ? meaning.id : ink.id;

      rule.textContent = byWord ? t('ex.clash.ruleWord') : t('ex.clash.ruleInk');
      rule.classList.toggle('alt', byWord);
      word.textContent = label(meaning.id);
      word.style.color = ink.css;
      flash(word, 'pop', 200);

      const shown = performance.now();
      const choice = await ctx.input<ColorId>((done) => {
        onPick = done;
        return () => (onPick = null);
      });
      rtSum += performance.now() - shown;

      const btn = buttons[COLORS.findIndex((c) => c.id === choice)];
      if (choice === target) {
        correct++;
        sfx.ok();
        flash(btn, 'good');
      } else {
        sfx.bad();
        flash(btn, 'bad');
      }
      word.textContent = '';
      await ctx.wait(220);
    }
    ctx.progress(1);

    const avg = rtSum / total;
    const score = (correct / total) * scale(avg, 650, 2200);
    return { score, detail: `${correct}/${total} · ${Math.round(avg)} ms` };
  },
};
