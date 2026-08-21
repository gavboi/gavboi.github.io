export type UpgradeName =
  | "more-dice"
  | "faster-rolling"
  | "less-numbers"
  | "higher-payout"
  | "streak-multiplier"
  | "your-lucky-number"
  | "stats"
  | "hard-mode"
  | "winner";

export type Upgrade = {
  name: string;
  description: string;
  costs: number[];
  countDisplayConversion: (count: number) => string;
  unlockAchievement?: AchievementName;
};

export type AchievementName =
  | "10-rolls"
  | "roll-on-roll"
  | "10-fail-consecutive"
  | "10-lucky"
  | "2-lucky-consecutive"
  | "each-once"
  | "100-rolls"
  | "rich"
  | "have-hard-mode"
  | "only-lucky"
  | "no-lucky"
  | "wait-2-mins"
  | "upgrades-once"
  | "500-roll"
  | "3-rolling"
  | "view-info"
  | "click-background"
  | "use-pips"
  | "3-sequence"
  | "have-winner"
  | "clickable"
  | "666"
  | "420"
  | "lucky-20"
  | "very-rich";

export type Achievement = {
  name: string;
  description: string;
};

export type AchievementsUnlockedType = Record<AchievementName, boolean>;
export type UpgradesCountType = Record<UpgradeName, number>;
export type DieStyle = "white" | "silver" | "gold";

export type Notice = {
  id: string;
  text: string;
  animate: boolean;
};

export type ThemeName = "blue" | "dark";

export type Theme = {
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
};
