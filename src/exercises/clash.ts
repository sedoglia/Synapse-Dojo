import { h, pick, scale, flash } from '../dom';
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
  example: 'ex.clash.example',
  minutes: 2,
  levels: { min: 1, max: 14, start: 1 },
  levelLabel: (l) => `${limitFor(l)} ms${l >= 3 ? ' · 🎨/📖' : ''}`,

  async run(ctx) {
    const total = ctx.count(30, 14, 4);
    const st = new Staircase(ctx.level, 1, 14);
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
      const byWord = !ctx.quick && st.int >= 3 && Math.random() < 0.35;
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
      const limit = ctx.mode !== 'train' ? 60_000 : limitFor(st.level) * ctx.pace;
      const choice = await ctx.timed<ColorId | null>(limit, null, (done) => {
        onPick = done;
        return () => (onPick = null);
      });
      rtSum += performance.now() - shown;

      const targetBtn = buttons[COLORS.findIndex((c) => c.id === target)];
      const rt = choice !== null ? performance.now() - shown : undefined;
      const ok = ctx.track(st, choice === target, { rt, was: label(target) });
      if (ok) correct++;
      else targetBtn.classList.add('correct-hint');
      if (choice) flash(buttons[COLORS.findIndex((c) => c.id === choice)], ok ? 'good' : 'bad');
      word.textContent = choice ? '' : `⏱ ${t('common.timeout')}`;
      word.style.color = '';
      await ctx.wait(ok ? 300 : 1100);
      targetBtn.classList.remove('correct-hint');
    }
    ctx.progress(1);

    const avg = rtSum / total;
    const detail = `${correct}/${total} · ${Math.round(avg)} ms`;
    if (ctx.quick) return { score: (correct / total) * scale(avg, 650, 2200), detail };
    return { score: st.score(), detail, level: st.next() };
  },
};
