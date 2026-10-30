import type { Ctx } from '../ctx';
import type { I18nKey } from '../i18n';

export type Skill = 'calc' | 'attention' | 'speed' | 'memory';

export interface ExerciseResult {
  score: number; // 0–100
  detail: string; // human-readable raw result
}

export interface Exercise {
  id: string;
  icon: string;
  skill: Skill;
  name: I18nKey;
  desc: I18nKey;
  run(ctx: Ctx): Promise<ExerciseResult>;
}
