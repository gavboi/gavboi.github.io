import { AchievementsUnlockedType, UpgradesCountType } from "../../types";

export const LUCKY_DICE_SAVE_KEY = 'lucky-dice-save';
export const LUCKY_DICE_THEME_SAVE_KEY = 'lucky-dice-theme';
export const MAX_SAVE_FREQUENCY = 1000 * 10; // 10 seconds

type SaveObj = {
  version: number;
}

export type SaveObjV1 = SaveObj & {
  // Version
  version: 1;
  // Core
  points: number;
  isHardMode: boolean;
  // Stats
  rollCounts: number[];
  luckyRollCount: number;
  currentStreak: number;
  maxStreak: number;
  minStreak: number;
  // Progress
  achievements: AchievementsUnlockedType;
  upgrades: UpgradesCountType;
}