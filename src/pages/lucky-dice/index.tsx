import ShopItem from './components/shop-item';
import { faGear, faTrophy, faCircleInfo, faChartBar } from '@fortawesome/free-solid-svg-icons';
import classes from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import PlayWindow from './components/play-window';
import InfoWindow from './components/info-window';
import { UpgradeName, Achievement, Upgrade, AchievementName, Notice } from './types';
import { ACHIEVEMENTS, DEFAULT_ROLL_TIME_MS, MAX_NOTICES, ROLL_TIME_REDUCTION_PER_UPGRADE_MS, UPGRADES } from './constants';
import AchievementWindow from './components/achievement-window';
import StatsWindow from './components/stats-window';
import SettingsWindow from './components/settings-window';
import { LuckyDiceThemeProvider, useLuckyDiceTheme } from './theme';

type AltScreen = 'achievements' | 'settings' | 'stats' | 'info';

function LuckyDicePageContent() {
  const { themeStyle } = useLuckyDiceTheme();

  // Game State Management
  const [altScreen, setAltScreen] = useState<AltScreen | null>(null);
  const noticeId = useRef(0);
  const [notices, setNotices] = useState<Notice[]>([
    { id: `${noticeId.current++}`, text: 'Welcome!', animate: false }
  ]);
  const previousAltScreen = useRef<AltScreen | null>(null);
  const [luckyNumber, setLuckyNumber] = useState<number>(1);
  const [points, setPoints] = useState<number>(0);
  const [isHardMode, setIsHardMode] = useState<boolean>(false);

  useEffect(() => {
    if (previousAltScreen.current === null && altScreen !== null) {
      setNotices((prev) => prev.map((item) => ({ ...item, animate: false })));
    }

    previousAltScreen.current = altScreen;
  }, [altScreen]);

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
    'stats': 1,
    'hard-mode': 0,
    'winner': 0
  });

  // Check for achievement unlocks on relevant state changes
  useEffect(() => {
    const totalRolls = rollCounts.reduce((a, b) => a + b, 0);

    if (totalRolls >= 10) {
      setAchievementUnlocked('10-rolls');
    }
    if (totalRolls >= 100) {
      setAchievementUnlocked('100-rolls');
    }
    if (totalRolls >= 500) {
      setAchievementUnlocked('500-roll');
    }
    if (
      lastThree.length === 3 && 
      lastThree[0] - 1 === lastThree[1] && 
      lastThree[1] - 1 === lastThree[2]
    ) {
      setAchievementUnlocked('3-sequence');
    }
    if (rollCounts.slice(0, isHardMode ? 20 : 6).every((v) => v > 0)) {
      setAchievementUnlocked('each-once');
    }
  }, [isHardMode, lastThree, rollCounts]);

  useEffect(() => {
    if (luckyRollCount >= 15) {
      setAchievementUnlocked('15-lucky');
    }
    if (currentStreak >= 2) {
      setAchievementUnlocked('2-lucky-consecutive');
    }
    if (currentStreak <= -10) {
      setAchievementUnlocked('10-fail-consecutive');
    }
    if (points >= 100) {
      setAchievementUnlocked('rich');
    }
  }, [currentStreak, luckyRollCount, points]);

  /**
   * Unlocks the specified achievement and adds a notice about it. 
   * Does nothing if achievement is already unlocked.
   */
  const setAchievementUnlocked = (achievement: AchievementName) => {
    if (!achievementsUnlocked[achievement]) {
      setAchievementsUnlocked((prev) => ({
        ...prev,
        [achievement]: true,
      }));
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
    setNotices((prev) => [
      { id: `${Date.now()}-${noticeId.current++}`, text: notice, animate: true },
      ...prev,
    ].slice(0, MAX_NOTICES));
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
    setRollCounts((prev) => {
      const next = [...prev];
      next[value - 1]++;
      return next;
    });
    setLastThree((prev) => [value, ...prev].slice(0, 3));
    
    const isLuckyRoll = value === luckyNumber;
    if (isLuckyRoll) {
      // Lucky roll stats
      setLuckyRollCount((prev) => prev + 1);
      setCurrentStreak((prev) => {
        const next = Math.max(prev, 0) + 1;
        const pointsGained = (1 + upgradeCount['higher-payout']) * ((upgradeCount['streak-multiplier'] + 1) ** (next - 1));
        setPoints((prevPoints) => prevPoints + pointsGained);
        setMaxStreak((prevMax) => Math.max(prevMax, next));
        return next;
      });
    } else {
      // Unlucky roll stats
      setCurrentStreak((prev) => {
        const next = Math.min(prev, 0) - 1;
        setMinStreak((prevMin) => Math.min(prevMin, next));
        return next;
      });
    }
    addNotice(`You rolled a ${value}${isLuckyRoll ? '!' : ''}`);
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
   * Toggles the stats screen.
   */
  const handleStatsClick = () => {
    setAltScreen(altScreen === 'stats' ? null : 'stats')
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
    <div className={classes.root} style={themeStyle}>

      {altScreen === null ? (<>
        <div className={classes.playWindow}>
          <PlayWindow
            notices={notices}
            setNotices={setNotices}
            numberOfDice={1 + upgradeCount['more-dice']}
            rollTimeMs={DEFAULT_ROLL_TIME_MS - (upgradeCount['faster-rolling'] * ROLL_TIME_REDUCTION_PER_UPGRADE_MS)}
            numberOfFaces={(isHardMode ? 20 : 6) - upgradeCount['less-numbers']}
            handleRollResult={handleRollResult}
            unlockAchievement={setAchievementUnlocked}
          />
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
      ): altScreen === 'stats' ? (
        <div className={classes.altWindow}>
          <StatsWindow 
            rollCounts={rollCounts}
            luckyRollCount={luckyRollCount}
            currentStreak={currentStreak}
            maxStreak={maxStreak}
            minStreak={minStreak}
            isHardMode={isHardMode}
          />
        </div>
      ) : altScreen === 'settings' ? (
        <div className={classes.altWindow}>
          <SettingsWindow />
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
        {upgradeCount['stats'] > 0 && (
          <div onClick={handleStatsClick} className={classes.clickable}>
            <FontAwesomeIcon icon={faChartBar} className={
              `${classes.menuIcon} ${altScreen === 'stats' ? classes.menuIconSelected : ''}`
            } />
          </div>
        )}
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

export default function LuckyDicePage() {
  return (
    <LuckyDiceThemeProvider>
      <LuckyDicePageContent />
    </LuckyDiceThemeProvider>
  )
}