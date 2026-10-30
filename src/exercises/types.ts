import type { Ctx } from '../ctx';
import type { I18nKey } from '../i18n';

export type Domain = 'speed' | 'attention' | 'wm' | 'memory' | 'executive' | 'spatial' | 'reasoning' | 'language';

export const DOMAINS: Domain[] = ['speed', 'attention', 'executive', 'wm', 'memory', 'spatial', 'reasoning', 'language'];

export interface ExerciseResult {
  score: number; // 0–100
  detail: string; // human-readable raw result
  level?: number; // starting level for the next session (adaptive exercises)
}

export interface Exercise {
  id: string;
  icon: string;
  domain: Domain;
  name: I18nKey;
  desc: I18nKey;
  why: I18nKey;
  /** Typical duration in minutes, used to size the daily plan. */
  minutes: number;
  /** Difficulty range for adaptive exercises; `start` is the level for new players. */
  levels?: { min: number; max: number; start: number };
  /** Human-readable meaning of a level ("83 ms", "2-back"). */
  levelLabel?(level: number): string;
  run(ctx: Ctx): Promise<ExerciseResult>;
}
