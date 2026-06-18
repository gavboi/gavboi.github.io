export type UpgradeName = 
  'more-dice' | 
  'faster-rolling' | 
  'less-numbers' | 
  'higher-payout' | 
  'streak-multiplier' | 
  'your-lucky-number' | 
  'stats' | 
  'hard-mode' | 
  'winner';

export type Upgrade = {
  name: string;
  description: string;
  costs: number[];
  countDisplayConversion: (count: number) => string;
  unlockAchievement?: AchievementName;
}

export type AchievementName = 
  '10-rolls' |
  'roll-on-roll' |
  '10-fail-consecutive' |
  '15-lucky' |
  '2-lucky-consecutive' |
  'each-once' |
  '100-rolls' |
  'rich' |
  'have-hard-mode' |
  'only-lucky' |
  'no-lucky' |
  'wait-2-mins' |
  'upgrades-once' |
  '500-roll' |
  '3-rolling' |
  'view-info' |
  'click-background' |
  'use-pips' |
  '3-sequence' |
  'have-winner' |
  'clickable';

export type Achievement = {
  name: string;
  description: string;
}

export type Notice = {
  id: string;
  text: string;
  animate: boolean;
}