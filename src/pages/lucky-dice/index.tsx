import ShopItem from './components/shop-item';
import { faGear, faTrophy, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import classes from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import PlayWindow from './components/play-window';
import InfoWindow from './components/info-window';
import { UpgradeName, Achievement, Upgrade, AchievementName } from './types';
import { ACHIEVEMENTS, MAX_NOTICES, UPGRADES } from './constants';
import { randomInt } from '../../helpers/index';
import AchievementWindow from './components/achievement-window';

type AltScreen = 'achievements' | 'settings' | 'info';

export default function LuckyDicePage() {
  // Game State Management
  const [altScreen, setAltScreen] = useState<AltScreen | null>(null);
  const [notices, setNotices] = useState<string[]>(['Welcome!']);
  const [luckyNumber, setLuckyNumber] = useState<number>(1);
  const [points, setPoints] = useState<number>(0);
  const [isHardMode, setIsHardMode] = useState<boolean>(false);

  // Stats State
  const [rollCounts, setRollCounts] = useState<number[]>(Array<number>(20).fill(0));
  const [luckyRollCount, setLuckyRollCount] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [minStreak, setMinStreak] = useState<number>(0);
  const [lastThree, setLastThree] = useState<number[]>([]);

  // Achievements and Upgrades State
  const [achievementsUnlocked, setAchievementsUnlocked] = useState<Record<AchievementName, boolean>>({
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
  const [upgradeCount, setUpgradeCount] = useState<Record<UpgradeName, number>>({
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

  /**
   * Unlocks the specified achievement and adds a notice about it. 
   * Does nothing if achievement is already unlocked.
   */
  const setAchievementUnlocked = (achievement: AchievementName) => {
    if (!achievementsUnlocked[achievement]) {
      setAchievementsUnlocked({
        ...achievementsUnlocked,
        [achievement]: true,
      });
      addNotice(`Achievement Unlocked: ${ACHIEVEMENTS[achievement].name}`);
    }
  }

  /**
   * Checks if the specified upgrade is unlocked based on achievements and returns a boolean.
   * If the upgrade does not have an achievement requirement, it is considered unlocked by default.
   * 
   * @param upgrade Upgrade to check for unlock status
   * @returns boolean indicating if the upgrade is unlocked
   */
  const isUpgradeUnlocked = (upgrade: Upgrade) => {
    if (!upgrade.unlockAchievement) {
      return true;
    }

    return achievementsUnlocked[upgrade.unlockAchievement];
  }

  const addNotice = (notice: string) => {
    setNotices([notice, ...notices].slice(0, MAX_NOTICES));
  }

  /**
   * Does the following:
   * - Checks if lucky number was rolled and adds points accordingly
   * - Checks for achievement unlocks triggered by results of rolls
   * - Adds to stats state
   * - Adds notice about the roll result
   * 
   * @param value Number that was rolled
   */
  const handleRollResult = (value: number) => {
    // Roll stats
    const newRollCounts = [...rollCounts];
    newRollCounts[value - 1]++;
    const totalRolls = newRollCounts.reduce((a, b) => a + b, 0);
    setRollCounts(newRollCounts);
    const newLastThree = [value, ...lastThree].slice(0, 3);
    setLastThree(newLastThree);
    // Roll achievements
    if (totalRolls >= 10) {
      setAchievementUnlocked('10-rolls');
    }
    if (totalRolls >= 100) {
      setAchievementUnlocked('100-rolls');
    }
    if (totalRolls >= 500) {
      setAchievementUnlocked('500-roll');
    }
    if (newLastThree.length === 3 && newLastThree.every((v) => v === newLastThree[0])) {
      setAchievementUnlocked('3-sequence');
    }
    if (newRollCounts.slice(0, isHardMode ? 20 : 6).every((v) => v > 0)) {
      setAchievementUnlocked('each-once');
    }

    if (value === luckyNumber) {
      // Lucky roll stats
      const newLuckyRollCount = luckyRollCount + 1;
      setLuckyRollCount(newLuckyRollCount);
      const newCurrentStreak = Math.max(currentStreak, 0) + 1;
      setCurrentStreak(newCurrentStreak);
      const pointsGained = (1 + upgradeCount['higher-payout']) * ((upgradeCount['streak-multiplier'] + 1) ** (newCurrentStreak - 1));
      const newPoints = points + pointsGained;
      setPoints(newPoints);
      // Lucky roll achievements
      if (newLuckyRollCount >= 15) {
        setAchievementUnlocked('15-lucky');
      }
      if (currentStreak >= 2) {
        setAchievementUnlocked('2-lucky-consecutive');
      }
      if (newPoints >= 100) {
        setAchievementUnlocked('rich');
      }
    } else {
      // Unlucky roll stats
      const newCurrentStreak = Math.min(currentStreak, 0) - 1;
      setCurrentStreak(newCurrentStreak);
      // Unlucky roll achievements
      if (currentStreak <= -10) {
        setAchievementUnlocked('10-fail-consecutive');
      }
    }
    addNotice(`You rolled a ${value}`);
  }

  /**
   * Subtracts points and increases count for specified upgrade.
   * 
   * @param index Number indicating which upgrade was bought
   */
  const handleBuyUpgrade = (key: UpgradeName) => {
    const cost = UPGRADES[key].costs[upgradeCount[key]];
    if (points >= cost) {
      setPoints(points - cost);
      const newUpgradeCount = { ...upgradeCount };
      newUpgradeCount[key] = upgradeCount[key] + 1;
      setUpgradeCount(newUpgradeCount);
    }
  }

  /**
   * Toggles the achievements screen.
   */
  const handleTrophyClick = () => {
    setAltScreen(altScreen === 'achievements' ? null : 'achievements')
  }

  /**
   * Toggles the settings screen.
   */
  const handleGearClick = () => {
    setAltScreen(altScreen === 'settings' ? null : 'settings')
  }

  /**
   * Toggles the info screen.
   */
  const handleInfoClick = () => {
    setAltScreen(altScreen === 'info' ? null : 'info')
  }

  return (
    <div className={classes.root}>

      {altScreen === null ? (<>
        <div className={classes.playWindow}>
          <PlayWindow notices={notices} handleRollResult={handleRollResult}/>
        </div>

        <div className={classes.buyWindow}>
          <div className={classes.infoContainer}>
            <p className={classes.infoText}>Points: {points}</p>
            <p className={classes.infoText}>Lucky Number: {luckyNumber}</p>
          </div>
          {Object.entries(upgradeCount).map(([key, count]) => {
            const typedKey = key as UpgradeName;
            return (
              <div key={key} className={classes.upgradeList}>
                {isUpgradeUnlocked(UPGRADES[typedKey]) &&
                  <ShopItem
                    key={key}
                    name={UPGRADES[typedKey].name}
                    details={UPGRADES[typedKey].description}
                    cost={UPGRADES[typedKey].costs[upgradeCount[typedKey]]}
                    counter={UPGRADES[typedKey].countDisplayConversion(upgradeCount[typedKey])}
                    currentPoints={points}
                    onBuy={() => handleBuyUpgrade(typedKey)}
                  />
                }
              </div>
            );
          })}
        </div>
      </>) : altScreen === 'achievements' ? (
        <div className={classes.altWindow}>
          <AchievementWindow achievements={achievementsUnlocked} unlockAchievement={setAchievementUnlocked} />
        </div>
      ) : altScreen === 'settings' ? (
        <div className={classes.altWindow}>

        </div>
      ) : altScreen === 'info' ? (
        <div className={classes.altWindow}>
          <InfoWindow />
        </div>
      ) : null}

      <div className={classes.menuBar}>
        <div onClick={handleTrophyClick} className={classes.clickable}>
          <FontAwesomeIcon icon={faTrophy} className={
            `${classes.menuIcon} ${altScreen === 'achievements' ? classes.menuIconSelected : ''}`
          } />
        </div>
        <div onClick={handleGearClick} className={classes.clickable}>
          <FontAwesomeIcon icon={faGear} className={
            `${classes.menuIcon} ${altScreen === 'settings' ? classes.menuIconSelected : ''}`
          } />
        </div>
        <div onClick={handleInfoClick} className={classes.clickable}>
          <FontAwesomeIcon icon={faCircleInfo} className={
            `${classes.menuIcon} ${altScreen === 'info' ? classes.menuIconSelected : ''}`
          } />
        </div>
      </div>

    </div>
  );
}