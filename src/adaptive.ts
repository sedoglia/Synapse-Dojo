import { clamp } from './dom';

/** After this many days without practice an exercise restarts one level lower (skills fade without practice). */
export const DETRAIN_DAYS = 14;

/** Maps a level to 0–100 within its range; the lowest level still earns a little credit. */
export const levelScore = (level: number, min: number, max: number) =>
  clamp((level - min + 1) / (max - min + 1), 0, 1) * 100;

export interface StairOptions {
  /** Accuracy the staircase settles on. ~0.8 follows the "85% rule" for fast learning (Wilson et al., 2019). */
  target?: number;
  /** Size of the step down after an error (in levels). */
  step?: number;
  /** Climb a full step per correct answer until the first error (default true). */
  fastStart?: boolean;
  /**
   * Fast start that reaches the top level within this many correct answers. The daily check uses it, so a short
   * test from a fixed start can still measure the whole range instead of capping everyone below the top.
   */
  reachIn?: number;
}

/**
 * Weighted up-down staircase (Kaernbach, 1991) on a continuous level.
 *
 * - Every answer moves the level: down by `step` after an error, up by step·(1−p)/p after a correct one,
 *   so it converges where the player is right a fraction `p` of the time.
 * - Fast start (first session and daily check only): until the first error each correct answer climbs a full
 *   step, to find the player's level. Restarting it every session would overshoot and keep accuracy below target.
 * - Frustration guard: three errors in a row drop an extra step.
 */
export class Staircase {
  level: number;
  readonly target: number;
  private readonly down: number;
  private readonly up: number;
  private readonly fastStep: number;
  private fast: boolean;
  private trace: number[] = [];
  private results: boolean[] = [];

  constructor(
    start: number,
    readonly min: number,
    readonly max: number,
    opts: StairOptions = {},
  ) {
    this.target = opts.target ?? 0.8;
    this.down = opts.step ?? 1;
    this.up = (this.down * (1 - this.target)) / this.target;
    this.fast = opts.fastStart ?? true;
    this.level = clamp(start, min, max);
    this.fastStep = opts.reachIn ? Math.max(this.down, (max - this.level) / opts.reachIn) : this.down;
  }

  /** Level rounded for difficulty settings that need whole numbers. */
  get int(): number {
    return Math.round(this.level);
  }

  record(ok: boolean): boolean {
    this.trace.push(this.level);
    this.results.push(ok);
    if (ok) {
      this.level += this.fast ? this.fastStep : this.up;
    } else {
      // The first error ends a fast climb: back to the last level passed, however long the stride was.
      this.level -= this.fast ? this.fastStep : this.down;
      this.fast = false;
      const last3 = this.results.slice(-3);
      if (last3.length === 3 && last3.every((r) => !r)) this.level -= this.down;
    }
    this.level = clamp(this.level, this.min, this.max);
    return ok;
  }

  get accuracy(): number {
    return this.results.length ? this.results.filter(Boolean).length / this.results.length : 0;
  }

  /** Average level over the second half of the session: a stable estimate of the threshold. */
  threshold(): number {
    const tail = this.trace.slice(Math.floor(this.trace.length / 2));
    if (!tail.length) return this.level;
    return tail.reduce((a, b) => a + b, 0) / tail.length;
  }

  /** Next session starts a quarter of a step below the threshold: a warm-up small enough not to lower the level over time. */
  next(): number {
    return Math.round(clamp(this.threshold() - this.down / 4, this.min, this.max) * 10) / 10;
  }

  /**
   * Session score: the level reached, scaled down when accuracy falls short of the target.
   * A converged staircase sits at the target, so normally only the level counts; a player who keeps
   * failing at the easiest level scores near 0 instead of getting the bottom level's credit.
   */
  score(): number {
    // Accuracy over the same window as the threshold, so early errors while the level settles don't count.
    const tail = this.results.slice(Math.floor(this.results.length / 2));
    const acc = tail.length ? tail.filter(Boolean).length / tail.length : 0;
    return levelScore(this.threshold(), this.min, this.max) * clamp(acc / this.target, 0, 1);
  }
}
