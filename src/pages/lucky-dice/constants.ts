import { Achievement, AchievementName, Upgrade, UpgradeName } from "./types";

// Configuration
export const MAX_NOTICES = 15;

// Upgrades
export const DEFAULT_ROLL_TIME_MS = 3000;
export const ROLL_TIME_REDUCTION_PER_UPGRADE_MS = 500;

export const UPGRADES: Record<UpgradeName, Upgrade> = {
  'more-dice': {
    name: 'More Dice',
    description: 'Get one more die',
    costs: [10, 20, 40, 80],
    countDisplayConversion: (count) => `${count + 1} ${count === 0 ? 'die' : 'dice'}`,
    unlockAchievement: '10-rolls',
  },
  'faster-rolling': {
    name: 'Faster Rolling',
    description: `Roll dice ${ROLL_TIME_REDUCTION_PER_UPGRADE_MS / 1000}s faster`,
    costs: [5, 10, 20, 40, 80],
    countDisplayConversion: (count) => `${(DEFAULT_ROLL_TIME_MS - count * ROLL_TIME_REDUCTION_PER_UPGRADE_MS) / 1000}s / roll`,
    unlockAchievement: 'roll-on-roll',
  },
  'less-numbers': {
    name: 'Smaller Dice',
    description: 'All dice have 1 fewer side',
    costs: [15, 30, 60, 120, 240],
    countDisplayConversion: (count) => `${6 - count} sides`,
    unlockAchievement: '10-fail-consecutive',
  },
  'higher-payout': {
    name: 'Higher Payout',
    description: '+1 point for a lucky roll',
    costs: [20, 40, 80, 160],
    countDisplayConversion: (count) => `${count + 1} point${count !== 0 ? 's' : ''}`,
    unlockAchievement: '15-lucky',
  },
  'streak-multiplier': {
    name: 'Streak Multiplier',
    description: 'Multiplied points for sequential lucky rolls',
    costs: [25, 50, 100, 200],
    countDisplayConversion: (count) => `${count + 1}x multiplier`,
    unlockAchievement: '2-lucky-consecutive',
  },
  'your-lucky-number': {
    name: 'Pick Lucky Number',
    description: 'Allow freely choosing a lucky number',
    costs: [20],
    countDisplayConversion: (count) => `${count === 0 ? 'Buyable' : 'Bought'}`,
    unlockAchievement: 'each-once',
  },
  'stats': {
    name: 'Stats Page',
    description: 'Unlock stats page',
    costs: [10],
    countDisplayConversion: (count) => `${count === 0 ? 'Buyable' : 'Bought'}`,
    unlockAchievement: '100-rolls',
  },
  'hard-mode': {
    name: 'Hard Mode',
    description: 'Restart game in hard mode',
    costs: [100],
    countDisplayConversion: (count) => `${count === 0 ? 'Buyable' : 'Bought'}`,
    unlockAchievement: 'rich',
  },
  'winner': {
    name: 'Winner',
    description: "It's finally over...",
    costs: [500],
    countDisplayConversion: (count) => `${count === 0 ? 'Buyable' : 'Bought'}`,
    unlockAchievement: 'have-hard-mode',
  }
};
  
export const ACHIEVEMENTS: Record<AchievementName, Achievement> = {
  '10-rolls': {
    name: 'Curiosity',
    description: 'Roll dice 10 times'
  },
  'roll-on-roll': {
    name: 'Impatient',
    description: 'Try to roll a die that is already rolling'
  },
  '10-fail-consecutive': {
    name: 'Unlucky',
    description: 'Roll a failure 10 times in a row'
  },
  '15-lucky': {
    name: 'Locked In',
    description: 'Roll lucky number 15 times'
  },
  '2-lucky-consecutive': {
    name: 'Better Than Lightning',
    description: 'Roll lucky number twice in a row'
  },
  'each-once': {
    name: 'Space Explorer',
    description: 'Roll each number once'
  },
  '100-rolls': {
    name: 'Interest',
    description: 'Roll dice 100 times'
  },
  'rich': {
    name: 'Rich',
    description: 'Save up 100 points'
  },
  'have-hard-mode': {
    name: 'Good luck, you need it',
    description: 'Unlock hard mode'
  },
  'only-lucky': {
    name: 'D1',
    description: 'Only the lucky number is available to roll'
  },
  'no-lucky': {
    name: 'Rigged',
    description: 'Make the lucky number unavailable to roll'
  },
  'wait-2-mins': {
    name: 'Forgetful',
    description: 'No rolling for two minutes'
  },
  'upgrades-once': {
    name: 'Hoarder',
    description: 'Buy all 7 upgrades at least once (no hard mode)'
  },
  '500-roll': {
    name: 'Addiction',
    description: 'Roll dice 500 times'
  },
  '3-rolling': {
    name: 'Dizzy',
    description: 'Have 3 dice rolling at the same time'
  },
  'view-info': {
    name: 'Quizzical',
    description: 'View the info tab'
  },
  'click-background': {
    name: "Spray n' Pray",
    description: 'Miss a die roll'
  },
  'use-pips': {
    name: 'Classic',
    description: 'Change to pips'
  },
  '3-sequence': {
    name: 'On a Roll',
    description: 'Roll 3 sequential numbers in order'
  },
  'have-winner': {
    name: 'Dice Master',
    description: 'Buy the "winner" upgrade'
  },
  'clickable': {
    name: 'Knock knock',
    description: 'Click this achievement twice'
   }
};