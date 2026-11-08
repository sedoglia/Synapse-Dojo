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
import { tangram } from './tangram';

import { towers } from './towers';
import { odd } from './odd';
import { resources } from './resources';
import { game2048 } from './game2048';
import { crackTheCode } from './crackTheCode';
import { nonogram } from './nonogram';

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

import { todayKey } from '../dom';
import { DOMAINS, type Exercise } from './types';

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
  rotate, matrix, nonogram, tangram,
  // Reasoning
  towers, odd, resources, game2048, crackTheCode,
  // Language & Calculation
  math, reading, dots, anagrams, fluency,
  // Coordination (Bilateral)
  tapSeq, swipePattern, rhythm, crossMove, dualTask,
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/**
 * Returns the daily 9-exercise battery for the Neuro Score test,
 * selecting one rotating exercise for each of the 9 cognitive domains.
 */
export function dailyCheckBattery(date = todayKey()): Exercise[] {
  const hash = hashString(date);
  return DOMAINS.map((domain, i) => {
    const list = EXERCISES.filter((e) => e.domain === domain);
    const idx = (hash + i * 17) % list.length;
    return list[idx];
  });
}

/** Default daily battery for the current day. */
export const DAILY_CHECK: Exercise[] = dailyCheckBattery();

export const byId = (id: string) => EXERCISES.find((e) => e.id === id);
export { DOMAINS } from './types';
export type { Exercise, ExerciseResult, Domain } from './types';
