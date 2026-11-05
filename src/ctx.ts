import { Staircase, type StairOptions } from './adaptive';

/** Below this accuracy no speed bonus is given. Under the lowest staircase target (70%), so a converged player can earn it. */
const BONUS_MIN_ACCURACY = 0.65;

/** Thrown into a running exercise when the player quits. */
export class Aborted extends Error {}

/** `train` = adaptive gym session, `check` = fixed daily measurement, `practice` = short unscored tutorial. */
export type Mode = 'train' | 'check' | 'practice';

export interface FeedbackOptions {
  /** Sound and streak only, no big ✓/✗ (for rapid, repeated taps such as Number trail). */
  subtle?: boolean;
  /** The right answer, shown next to ✗ after a mistake. */
  was?: string;
  /** Why it counts as a mistake, shown next to ✗ as is: for mistakes with no right answer to show (too slow, too early). */
  note?: string;
  /** Response time in ms (if measured independently by the exercise). */
  rt?: number;
}

/** Visual feedback the play view provides to exercises. */
export interface Effects {
  progress(fraction: number, label: string): void;
  combo(streak: number): void;
  toast(text: string, kind: 'up' | 'down' | 'hint'): void;
  answer(ok: boolean, streak: number, opts: FeedbackOptions): void;
}

/** Runtime handed to each exercise: a stage to draw in, cancellable waits, feedback and difficulty. */
export class Ctx {
  private ctrl = new AbortController();
  private streak = 0;
  bestStreak = 0;
  levelUps = 0;
  lastInputDuration = 0;
  correctRts: number[] = [];
  totalAnswers = 0;
  correctAnswers = 0;
  /** First session of this exercise: no saved level yet, so the staircase may climb fast to find it. */
  fresh = false;

  constructor(
    public stage: HTMLElement,
    public mode: Mode,
    /** Starting difficulty for adaptive exercises. */
    public level: number,
    /** Time multiplier (> 1 in relaxed mode) applied to response windows and stimulus pacing. */
    public pace: number,
    private fx: Effects,
  ) {}

  /** Short, fixed-difficulty version used by the daily check. */
  get quick() {
    return this.mode === 'check';
  }

  get practice() {
    return this.mode === 'practice';
  }

  /** The session's staircase: fast start only to find a level (first session) or to span the range (daily check). */
  stair(trials: number, min: number, max: number, opts: StairOptions & { start?: number } = {}): Staircase {
    return new Staircase(opts.start ?? this.level, min, max, {
      fastStart: this.quick || this.fresh,
      reachIn: this.quick ? Math.floor(trials / 2) : undefined,
      ...opts,
    });
  }

  /** Picks the number of trials for the current mode. */
  count(train: number, check = train, practice = 3): number {
    return this.mode === 'practice' ? practice : this.mode === 'check' ? check : train;
  }

  get aborted() {
    return this.ctrl.signal.aborted;
  }

  progress(fraction: number, label = '') {
    this.fx.progress(fraction, label);
  }

  /** Reports an answer: big ✓/✗, streak counter and sound. Returns `ok`. */
  feedback(ok: boolean, opts: FeedbackOptions = {}): boolean {
    this.totalAnswers++;
    if (ok) {
      this.correctAnswers++;
      const rt = opts.rt ?? this.lastInputDuration;
      if (rt > 0) this.correctRts.push(rt);
    }
    this.streak = ok ? this.streak + 1 : 0;
    this.bestStreak = Math.max(this.bestStreak, this.streak);
    this.fx.answer(ok, this.streak, opts);
    this.fx.combo(this.streak);
    return ok;
  }

  /** Average response time in ms for correct answers during this session. */
  get avgCorrectRt(): number {
    return this.correctRts.length
      ? this.correctRts.reduce((a, b) => a + b, 0) / this.correctRts.length
      : 0;
  }

  /** Accuracy across evaluated trials (0 to 1). */
  get accuracy(): number {
    return this.totalAnswers ? this.correctAnswers / this.totalAnswers : 0;
  }

  /**
   * Calculates an additive speed efficiency bonus (0 to 10 points) on score for correct, swift responses.
   * Prerequisite: enough accuracy and at least 2 correct trials (avoids rewarding impulsive guessing).
   * Never in the daily check, whose scores must stay comparable between exercises.
   */
  timeBonus(benchmarkSecs = 2.5): number {
    if (this.quick || this.accuracy < BONUS_MIN_ACCURACY || this.correctRts.length < 2) return 0;
    const avgSecs = (this.avgCorrectRt / 1000) / this.pace;
    const maxSecs = benchmarkSecs * 2;
    if (avgSecs >= maxSecs) return 0;
    const factor = Math.min(1, Math.max(0, (maxSecs - avgSecs) / (maxSecs - benchmarkSecs)));
    return Math.round(factor * 10);
  }

  /**
   * Returns a score incorporating the additive time bonus clamped between 0 and 100.
   */
  withTimeBonus(baseScore: number, benchmarkSecs = 2.5): { score: number; timeBonus: number } {
    const timeBonus = this.timeBonus(benchmarkSecs);
    return {
      score: Math.min(100, Math.max(0, Math.round(baseScore + timeBonus))),
      timeBonus,
    };
  }

  /** Whether the session qualified for the XP speed bonus (+10 XP). */
  get isSpeedBonus(): boolean {
    if (this.correctRts.length >= 2 && this.accuracy >= BONUS_MIN_ACCURACY) {
      return this.timeBonus(3.0) >= 3;
    }
    return false;
  }

  /**
   * Records an answer on a staircase and announces level changes. `opts.heard` is what the player is told
   * (e.g. a correct but too slow answer counts as a miss for difficulty, yet still sounds right). Returns it.
   */
  track(st: Staircase, ok: boolean, opts: FeedbackOptions & { heard?: boolean } = {}): boolean {
    const heard = opts.heard ?? ok;
    const before = st.int;
    st.record(ok);
    this.feedback(heard, opts);
    if (this.mode === 'train' && st.int > before) {
      this.levelUps++;
      this.fx.toast('⬆', 'up');
    } else if (this.mode === 'train' && st.int < before) {
      this.fx.toast('⬇', 'down');
    }
    return heard;
  }

  hint(text: string) {
    this.fx.toast(text, 'hint');
  }

  wait(ms: number): Promise<void> {
    return this.input<void>((done) => {
      const id = setTimeout(() => done(), ms);
      return () => clearTimeout(id);
    }, false);
  }

  /** Resolves after the next paint plus at least `ms`: tighter than setTimeout for brief stimuli. */
  frames(ms: number): Promise<void> {
    return this.input<void>((done) => {
      let start = 0;
      let id = 0;
      const tick = (now: number) => {
        if (!start) start = now;
        if (now - start >= ms - 4) return done();
        id = requestAnimationFrame(tick);
      };
      id = requestAnimationFrame(tick);
      const fallback = setTimeout(() => done(), ms + 250); // rAF is paused in background tabs
      return () => {
        cancelAnimationFrame(id);
        clearTimeout(fallback);
      };
    }, false);
  }

  /** Waits for `setup` to call `done`, or for `ms` to pass (resolving with `onTimeout`). */
  timed<T>(ms: number, onTimeout: T, setup: (done: (value: T) => void) => void | (() => void)): Promise<T> {
    return this.input<T>((done) => {
      const id = setTimeout(() => done(onTimeout), ms);
      const cleanup = setup(done);
      return () => {
        clearTimeout(id);
        cleanup?.();
      };
    });
  }

  /**
   * Wraps a user interaction; `setup` returns a cleanup that runs on completion or abort.
   * `measure` records how long it took as the response time (off for plain pauses, so a wait never
   * overwrites the duration of the answer that preceded it).
   */
  input<T>(setup: (done: (value: T) => void) => void | (() => void), measure = true): Promise<T> {
    const start = performance.now();
    return new Promise<T>((resolve, reject) => {
      const signal = this.ctrl.signal;
      if (signal.aborted) return reject(new Aborted());
      let cleanup: void | (() => void);
      let settled = false;
      const onAbort = () => {
        if (settled) return;
        settled = true;
        cleanup?.();
        reject(new Aborted());
      };
      signal.addEventListener('abort', onAbort, { once: true });
      cleanup = setup((value) => {
        if (settled) return;
        settled = true;
        if (measure) this.lastInputDuration = performance.now() - start;
        signal.removeEventListener('abort', onAbort);
        cleanup?.();
        resolve(value);
      });
      if (settled) cleanup?.();
    });
  }

  abort() {
    this.ctrl.abort();
  }
}
