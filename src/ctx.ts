/** Thrown into a running exercise when the player quits. */
export class Aborted extends Error {}

/** Runtime handed to each exercise: a stage to draw in, cancellable waits, and a progress HUD. */
export class Ctx {
  private ctrl = new AbortController();

  constructor(
    public stage: HTMLElement,
    /** Short, fixed-difficulty version used by the daily check. */
    public quick: boolean,
    /** Starting difficulty for adaptive exercises. */
    public level: number,
    /** Time multiplier (> 1 in relaxed mode) applied to response windows and stimulus pacing. */
    public pace: number,
    private onProgress: (fraction: number, label: string) => void,
  ) {}

  get aborted() {
    return this.ctrl.signal.aborted;
  }

  progress(fraction: number, label = '') {
    this.onProgress(fraction, label);
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
