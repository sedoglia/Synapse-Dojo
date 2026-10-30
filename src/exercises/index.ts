import { math } from './math';
import { clash } from './clash';
import { path } from './path';
import { grid } from './grid';
import { vault } from './vault';
import { reflex } from './reflex';
import type { Exercise } from './types';

export const EXERCISES: Exercise[] = [math, clash, path, grid, vault, reflex];

/** The three short tests that make up the daily Neuro Score. */
export const DAILY_CHECK: Exercise[] = [math, clash, path];

export const byId = (id: string) => EXERCISES.find((e) => e.id === id);
export type { Exercise, ExerciseResult } from './types';
