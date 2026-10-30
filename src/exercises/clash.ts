import { h, pick, scale, flash } from '../dom';
import { sfx } from '../audio';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

const COLORS = [
  { id: 'red', css: 'var(--c-red)' },
  { id: 'blue', css: 'var(--c-blue)' },
  { id: 'green', css: 'var(--c-green)' },
  { id: 'yellow', css: 'var(--c-yellow)' },
] as const;

type ColorId = (typeof COLORS)[number]['id'];
const label = (id: ColorId) => t(`color.${id}`);
const limitFor = (level: number) => Math.round(3000 * Math.pow(0.88, level - 1));

export const clash: Exercise = {
  id: 'clash',
  icon: '🎨',
  domain: 'executive',
  name: 'ex.clash.name',
  desc: 'ex.clash.desc',
  why: 'ex.clash.why',
  minutes: 2,
  levels: { min: 1, max: 14, start: 1 },
  levelLabel: (l) => `${limitFor(l)} ms${l >= 3 ? ' · 🎨/📖' : ''}`,

  async run(ctx) {
    const total = ctx.quick ? 14 : 30;
    const st = new Staircase(ctx.level, 1, 14, 2);
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
      // From level 3 a second rule appears that flips which feature counts.
      const byWord = !ctx.quick && st.level >= 3 && Math.random() < 0.35;
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
      const limit = ctx.quick ? 60_000 : limitFor(st.level) * ctx.pace;
      const choice = await ctx.timed<ColorId | null>(limit, null, (done) => {
        onPick = done;
        return () => (onPick = null);
      });
      rtSum += performance.now() - shown;

      const ok = choice === target;
      st.record(ok);
      if (ok) {
        correct++;
        sfx.ok();
      } else sfx.bad();
      if (choice) flash(buttons[COLORS.findIndex((c) => c.id === choice)], ok ? 'good' : 'bad');
      word.textContent = choice ? '' : `⏱ ${t('common.timeout')}`;
      word.style.color = '';
      await ctx.wait(choice ? 220 : 600);
    }
    ctx.progress(1);

    const avg = rtSum / total;
    const detail = `${correct}/${total} · ${Math.round(avg)} ms`;
    if (ctx.quick) return { score: (correct / total) * scale(avg, 650, 2200), detail };
    return { score: st.score(), detail, level: st.next() };
  },
};
