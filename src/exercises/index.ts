import { glance } from './glance';
import { reflex } from './reflex';
import { path } from './path';
import { pilot } from './pilot';
import { radar } from './radar';
import { clash } from './clash';
import { ruleSwitch } from './switch';
import { echo } from './echo';
import { grid } from './grid';
import { digits } from './digits';
import { vault } from './vault';
import { pairs } from './pairs';
import { rotate } from './rotate';
import { towers } from './towers';
import { odd } from './odd';
import { math } from './math';
import { reading } from './reading';
import type { Exercise } from './types';

export const EXERCISES: Exercise[] = [
  glance, reflex, path,
  pilot, radar,
  clash, ruleSwitch,
  echo, grid, digits,
  vault, pairs,
  rotate,
  towers, odd,
  math, reading,
];

/**
 * The four short, fixed-difficulty tests behind the daily Neuro Score:
 * processing speed, executive control, working memory and calculation.
 */
export const DAILY_CHECK: Exercise[] = [glance, ruleSwitch, grid, math];

export const byId = (id: string) => EXERCISES.find((e) => e.id === id);
export { DOMAINS } from './types';
export type { Exercise, ExerciseResult, Domain } from './types';
