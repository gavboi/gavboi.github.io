import { useEffect, useState } from "react";
import { AchievementsUnlockedType, UpgradesCountType } from "../../types";
import { SaveObjV1, LUCKY_DICE_SAVE_KEY, MAX_SAVE_FREQUENCY } from "./saveObj";

export default function useLuckyDiceStore() {

  // Core
  const [points, setPoints] = useState<number>(0);
  const [isHardMode, setIsHardMode] = useState<boolean>(false);
  const [usesPips, setUsesPips] = useState<boolean>(false);

  // Bonus Stats
  const [rollCounts, setRollCounts] = useState<number[]>(Array<number>(20).fill(0));
  const [luckyRollCount, setLuckyRollCount] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [minStreak, setMinStreak] = useState<number>(0);

  // Progress
  const [achievementsUnlocked, setAchievementsUnlocked] = useState<AchievementsUnlockedType>({
    '10-rolls': false, // checked on roll
    'roll-on-roll': false, // unique; click handler
    '10-fail-consecutive': false, // checked on roll
    '15-lucky': false, // checked on roll
    '2-lucky-consecutive': false, // checked on roll
    'each-once': false, // checked on roll
    '100-rolls': false, // checked on roll
    'rich': false, // checked on roll
    'have-hard-mode': false, // checked on buy
    'only-lucky': false, // checked on buy, update lucky
    'no-lucky': false, // checked on buy, update lucky
    'wait-2-mins': false, // unique; timeout
    'upgrades-once': false, // checked on buy
    '500-roll': false, // checked on roll
    '3-rolling': false, // ?
    'view-info': false, // checked on handler
    'click-background': false, // unique; click handler
    'use-pips': false, // unique; click handler
    '3-sequence': false, // checked on roll
    'have-winner': false, // checked on buy
    'clickable': false // unique; click handler
  });

  const [upgradeCount, setUpgradeCount] = useState<UpgradesCountType>({
    'more-dice': 0,
    'faster-rolling': 0,
    'less-numbers': 0,
    'higher-payout': 0,
    'streak-multiplier': 0,
    'your-lucky-number': 0,
    'stats': 0,
    'hard-mode': 0,
    'winner': 0
  });

  // State
  const [lastSave, setLastSave] = useState<number>(Date.now());

  /**
   * Save the current state to localStorage.
   */
  const saveState = () => {
    const saveObj: SaveObjV1 = {
      version: 1,
      points,
      isHardMode,
      rollCounts,
      luckyRollCount,
      currentStreak,
      maxStreak,
      minStreak,
      achievements: achievementsUnlocked,
      upgrades: upgradeCount,
      usesPips
    };

    localStorage.setItem(LUCKY_DICE_SAVE_KEY, JSON.stringify(saveObj));
    setLastSave(Date.now());
    console.debug("Game progress saved to localStorage");
  }

  /**
   * Load the state from localStorage, if it exists, 
   * and update the store accordingly. In case of any error,
   * will fail silently and result in no updates.
   */
  const loadState = () => {
    const raw = localStorage.getItem(LUCKY_DICE_SAVE_KEY);
    if (!raw) return;

    try {
      const saveObj: SaveObjV1 = JSON.parse(raw) as SaveObjV1;
      // Core
      setPoints(saveObj.points);
      setIsHardMode(saveObj.isHardMode);
      // Stats
      setRollCounts(saveObj.rollCounts);
      setLuckyRollCount(saveObj.luckyRollCount);
      setCurrentStreak(saveObj.currentStreak);
      setMaxStreak(saveObj.maxStreak);
      setMinStreak(saveObj.minStreak);
      // Progress
      setAchievementsUnlocked(saveObj.achievements);
      setUpgradeCount(saveObj.upgrades);
      setUsesPips(saveObj.usesPips);
      console.debug("Game progress loaded from localStorage");
    } catch {
      // ignore
    }
  }

  /**
   * Reset the state to its initial values and clears localStorage.
   */
  const resetStateHelper = (all: boolean, hardMode: boolean) => {
    // Core
    setPoints(0);
    setIsHardMode(hardMode);
    // Stats
    setRollCounts(Array<number>(20).fill(0));
    setLuckyRollCount(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setMinStreak(0);
    // Progress
    if (all) {
      setAchievementsUnlocked(
        Object.fromEntries(Object.keys(achievementsUnlocked).map(
          key => [key, false])
        ) as AchievementsUnlockedType);
    }
    setUpgradeCount(Object.fromEntries(Object.keys(upgradeCount).map(
      key => [key, key === 'hard-mode' && hardMode ? 1 : 0])
    ) as UpgradesCountType);
    // State
    setLastSave(Date.now());
    localStorage.removeItem(LUCKY_DICE_SAVE_KEY);
    console.debug(
      `Game progress reset, achievements ${all ? 'reset' : 'preserved'}, ` +
      `${hardMode ? 'started' : 'did not start'} hard mode`);
  };

  const wipeSave = () => {
    resetStateHelper(true, false);
  }

  const restartGame = () => {
    resetStateHelper(false, false);
  }

  const restartGameHardMode = () => {
    resetStateHelper(false, true);
  }

  useEffect(() => {
    loadState()
  }, []);

  useEffect(() => {
    if (Date.now() < lastSave + MAX_SAVE_FREQUENCY) return;
    saveState()
  }, [rollCounts, achievementsUnlocked, upgradeCount]);

  return {
    points, setPoints,
    isHardMode, setIsHardMode,
    rollCounts, setRollCounts,
    luckyRollCount, setLuckyRollCount,
    currentStreak, setCurrentStreak,
    maxStreak, setMaxStreak,
    minStreak, setMinStreak,
    achievementsUnlocked, setAchievementsUnlocked,
    upgradeCount, setUpgradeCount,
    lastSave, saveState,
    wipeSave, restartGame, restartGameHardMode,
    usesPips, setUsesPips
  }
}