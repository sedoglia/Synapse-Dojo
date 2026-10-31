import { h, rand, pick, shuffle, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

const CENTER = ['🚗', '🚚'] as const;
const MAX_LEVEL = 20;
const RINGS = 8; // slots per ring

/** Exposure in ms: 400 at level 1, shrinking ~15% per level, never below one 60 Hz frame. */
const msFor = (level: number) => Math.max(17, Math.round(400 * Math.pow(0.85, level - 1)));
/** Peripheral clutter grows in steps; together with exposure it forms one difficulty axis. */
const distractorsFor = (level: number) => (level >= 12 ? 15 : level >= 6 ? 7 : 0);

/** Slot position in % of the field: ring 0 = inner, ring 1 = outer (targets only appear there). */
function slotPos(ring: number, k: number) {
  const r = ring === 0 ? 24 : 42;
  const a = ((k + (ring === 0 ? 0.5 : 0)) / RINGS) * Math.PI * 2 - Math.PI / 2;
  return { left: `${50 + r * Math.cos(a)}%`, top: `${50 + r * Math.sin(a)}%` };
}

export const glance: Exercise = {
  id: 'glance',
  icon: '👁️',
  domain: 'speed',
  name: 'ex.glance.name',
  desc: 'ex.glance.desc',
  why: 'ex.glance.why',
  example: 'ex.glance.example',
  minutes: 2,
  levels: { min: 1, max: MAX_LEVEL, start: 3 },
  levelLabel: (l) => `${msFor(l)} ms`,

  async run(ctx) {
    // The daily check always starts from the same level so results stay comparable.
    const trials = ctx.count(24, 14, 4);
    const st = ctx.quick ? new Staircase(4, 1, MAX_LEVEL, { target: 0.5 }) : new Staircase(ctx.level, 1, MAX_LEVEL);

    const center = h('div', { class: 'glance-center' });
    let onSlot: ((k: number) => void) | null = null;
    const slots = [0, 1].flatMap((ring) =>
      Array.from({ length: RINGS }, (_, k) =>
        h('button', {
          class: `glance-slot ring${ring}`,
          style: slotPos(ring, k),
          onPointerdown: () => ring === 1 && onSlot?.(k),
        }),
      ),
    );
    const outer = slots.slice(RINGS);
    const field = h('div', { class: 'glance-field' }, center, ...slots);
    const prompt = h('div', { class: 'glance-prompt' });
    let onCenter: ((i: number) => void) | null = null;
    const choices = h(
      'div',
      { class: 'glance-choices' },
      ...CENTER.map((v, i) => h('button', { class: 'btn big glance-choice', onPointerdown: () => onCenter?.(i) }, v)),
    );
    ctx.stage.append(prompt, field, choices);

    const clear = () => {
      center.textContent = '';
      slots.forEach((s) => {
        s.textContent = '';
        s.className = s.className.replace(/ (target|distractor|mask|pickable)/g, '');
      });
    };

    let correct = 0;
    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      clear();
      choices.classList.add('hidden');
      prompt.textContent = '';
      center.textContent = '+';
      await ctx.wait(600);

      // Stimulus: vehicle in the center, star on the outer ring, optional distractors.
      const vehicle = rand(0, 1);
      const where = rand(0, RINGS - 1);
      center.textContent = CENTER[vehicle];
      outer[where].textContent = '★';
      outer[where].classList.add('target');
      const free = slots.filter((s) => s !== outer[where]);
      for (const s of shuffle(free).slice(0, distractorsFor(st.level))) {
        s.textContent = '▲';
        s.classList.add('distractor');
      }
      await ctx.frames(msFor(st.level));

      // Mask wipes the retinal afterimage so exposure time really is the limit.
      clear();
      center.textContent = '▩';
      center.classList.add('mask');
      slots.forEach((s) => {
        s.textContent = pick(['▩', '▦', '▧']);
        s.classList.add('mask');
      });
      await ctx.wait(250);
      clear();
      center.classList.remove('mask');

      // Two questions: what was in the center, then where the star was.
      prompt.textContent = t('ex.glance.which');
      choices.classList.remove('hidden');
      const saidVehicle = await ctx.input<number>((done) => {
        onCenter = done;
        return () => (onCenter = null);
      });
      choices.classList.add('hidden');

      prompt.textContent = t('ex.glance.where');
      outer.forEach((s) => s.classList.add('pickable'));
      const saidWhere = await ctx.input<number>((done) => {
        onSlot = done;
        return () => (onSlot = null);
      });

      const ok = ctx.track(st, saidVehicle === vehicle && saidWhere === where);
      outer[where].textContent = '★';
      outer[where].classList.add('target');
      if (ok) correct++;
      else flash(outer[saidWhere], 'bad');
      await ctx.wait(ok ? 350 : 800);
    }
    ctx.progress(1);

    const detail = `${t('ex.glance.detail', { ms: msFor(Math.round(st.threshold())) })} · ${t('common.correct', { ok: correct, n: trials })}`;
    return { score: st.score(), detail, level: ctx.mode === 'train' ? st.next() : undefined };
  },
};
