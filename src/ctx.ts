import type { Staircase } from './adaptive';

/** Thrown into a running exercise when the player quits. */
export class Aborted extends Error {}

/** `train` = adaptive gym session, `check` = fixed daily measurement, `practice` = short unscored tutorial. */
export type Mode = 'train' | 'check' | 'practice';

/** Visual/haptic feedback the play view provides to exercises. */
export interface Effects {
  progress(fraction: number, label: string): void;
  combo(streak: number): void;
  toast(text: string, kind: 'up' | 'down' | 'hint'): void;
  answer(ok: boolean, streak: number): void;
}

/** Runtime handed to each exercise: a stage to draw in, cancellable waits, feedback and difficulty. */
export class Ctx {
  private ctrl = new AbortController();
  private streak = 0;
  bestStreak = 0;
  levelUps = 0;

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

  /** Reports an answer: updates the streak counter, sound and vibration. Returns `ok`. */
  feedback(ok: boolean): boolean {
    this.streak = ok ? this.streak + 1 : 0;
    this.bestStreak = Math.max(this.bestStreak, this.streak);
    this.fx.answer(ok, this.streak);
    this.fx.combo(this.streak);
    return ok;
  }

  /**
   * Records an answer on a staircase and announces level changes. `heard` is what the player is told
   * (e.g. a correct but too slow answer counts as a miss for difficulty, yet still sounds right). Returns `heard`.
   */
  track(st: Staircase, ok: boolean, heard = ok): boolean {
    const before = st.int;
    st.record(ok);
    this.feedback(heard);
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
    });
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
    });
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

  /** Wraps a user interaction; `setup` returns a cleanup that runs on completion or abort. */
  input<T>(setup: (done: (value: T) => void) => void | (() => void)): Promise<T> {
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
