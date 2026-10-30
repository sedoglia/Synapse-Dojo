import { clamp } from './dom';

/** Maps a level to 0–100 within its range; the lowest level still earns a little credit. */
export const levelScore = (level: number, min: number, max: number) =>
  clamp((level - min + 1) / (max - min + 1), 0, 1) * 100;

/**
 * Up/down staircase: `up` correct answers in a row make it harder, one error makes it easier.
 * With up = 2 it converges near 71% correct, which keeps the player at the edge of their ability.
 */
export class Staircase {
  level: number;
  private streak = 0;
  private trace: number[] = [];

  constructor(
    start: number,
    readonly min: number,
    readonly max: number,
    readonly up = 2,
  ) {
    this.level = clamp(Math.round(start), min, max);
  }

  record(ok: boolean): boolean {
    this.trace.push(this.level);
    if (ok) {
      if (++this.streak >= this.up) {
        this.level = Math.min(this.max, this.level + 1);
        this.streak = 0;
      }
    } else {
      this.streak = 0;
      this.level = Math.max(this.min, this.level - 1);
    }
    return ok;
  }

  /** Average level over the second half of the session: a stable estimate of the threshold. */
  threshold(): number {
    const tail = this.trace.slice(Math.floor(this.trace.length / 2));
    if (!tail.length) return this.level;
    return tail.reduce((a, b) => a + b, 0) / tail.length;
  }

  /** Where the next session should start. */
  next(): number {
    return clamp(Math.round(this.threshold()), this.min, this.max);
  }

  score(): number {
    return levelScore(this.threshold(), this.min, this.max);
  }
}
