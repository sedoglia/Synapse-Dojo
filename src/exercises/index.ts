import { glance } from './glance';
import { reflex } from './reflex';
import { path } from './path';
import { reaction } from './reaction';

import { pilot } from './pilot';
import { radar } from './radar';
import { flanker } from './flanker';
import { gonogo } from './gonogo';
import { msit } from './msit';
import { binding } from './binding';

import { clash } from './clash';
import { ruleSwitch } from './switch';
import { sorting } from './sorting';

import { echo } from './echo';
import { grid } from './grid';
import { digits } from './digits';
import { span } from './span';

import { vault } from './vault';
import { pairs } from './pairs';
import { stories } from './stories';

import { rotate } from './rotate';
import { matrix } from './matrix';

import { towers } from './towers';
import { odd } from './odd';
import { resources } from './resources';

import { math } from './math';
import { reading } from './reading';
import { dots } from './dots';
import { anagrams } from './anagrams';
import { fluency } from './fluency';

import { tapSeq } from './tapSeq';
import { swipePattern } from './swipePattern';
import { rhythm } from './rhythm';
import { crossMove } from './crossMove';
import { dualTask } from './dualTask';

import type { Exercise } from './types';

export const EXERCISES: Exercise[] = [
  // Speed
  glance, reflex, path, reaction,
  // Attention
  pilot, radar, flanker, gonogo, msit, binding,
  // Executive
  clash, ruleSwitch, sorting,
  // Working Memory
  echo, grid, digits, span,
  // Memory
  vault, pairs, stories,
  // Spatial
  rotate, matrix,
  // Reasoning
  towers, odd, resources,
  // Language & Calculation
  math, reading, dots, anagrams, fluency,
  // Coordination (Bilateral)
  tapSeq, swipePattern, rhythm, crossMove, dualTask,
];

/**
 * The four short, fixed-difficulty tests behind the daily Neuro Score:
 * processing speed, executive control, working memory and calculation.
 */
export const DAILY_CHECK: Exercise[] = [glance, ruleSwitch, grid, math];

export const byId = (id: string) => EXERCISES.find((e) => e.id === id);
export { DOMAINS } from './types';
export type { Exercise, ExerciseResult, Domain } from './types';
