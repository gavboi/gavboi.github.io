import ShopItem from './components/shop-item';
import { faGear, faTrophy, faCircleInfo, faChartBar } from '@fortawesome/free-solid-svg-icons';
import classes from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useRef, useState } from 'react';
import PlayWindow from './components/play-window';
import InfoWindow from './components/info-window';
import { UpgradeName, Upgrade, AchievementName, Notice } from './types';
import { ACHIEVEMENTS, DEFAULT_ROLL_TIME_MS, EASY_MODE_FACE_COUNT, HARD_MODE_FACE_COUNT, MAX_NOTICES, ROLL_TIME_REDUCTION_PER_UPGRADE_MS, UPGRADES } from './constants';
import AchievementWindow from './components/achievement-window';
import StatsWindow from './components/stats-window';
import SettingsWindow from './components/settings-window';
import { LuckyDiceThemeProvider, useLuckyDiceTheme } from './theme';
import useLuckyDiceStore from './components/store';
import sfx_cmaj from './assets/sound/Cmaj.mp3';
import sfx_cg from './assets/sound/cg.mp3';
import sfx_c4 from './assets/sound/c4.mp3';
import sfx_d from './assets/sound/d.mp3';
import sfx_e from './assets/sound/e.mp3';
import sfx_f from './assets/sound/f.mp3';
import sfx_g from './assets/sound/g.mp3';
import sfx_a from './assets/sound/a.mp3';
import sfx_b from './assets/sound/b.mp3';
import sfx_c5 from './assets/sound/c5.mp3';

type AltScreen = 'achievements' | 'settings' | 'stats' | 'info';

function LuckyDicePageContent() {
  const { themeStyle } = useLuckyDiceTheme();
  const {
    points, setPoints,
    isHardMode,
    rollCounts, setRollCounts,
    luckyRollCount, setLuckyRollCount,
    currentStreak, setCurrentStreak,
    maxStreak, setMaxStreak,
    minStreak, setMinStreak,
    achievementsUnlocked, setAchievementsUnlocked,
    upgradeCount, setUpgradeCount,
    wipeSave, restartGame, restartGameHardMode,
    usesPips, setUsesPips
  } = useLuckyDiceStore();

  // Game State Management
  const [altScreen, setAltScreen] = useState<AltScreen | null>(null);
  const noticeId = useRef(0);
  const [notices, setNotices] = useState<Notice[]>([
    { id: `${noticeId.current++}`, text: 'Welcome!', animate: false }
  ]);
  const previousAltScreen = useRef<AltScreen | null>(null);
  const achievementsUnlockedRef = useRef(achievementsUnlocked);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [luckyNumber, setLuckyNumber] = useState<number>(1);
  const [lastThree, setLastThree] = useState<number[]>([]);
  const [pendingRolls, setPendingRolls] = useState<number[]>([]);

  // sfx
  const [hasInteracted, setHasInteracted] = useState(false);
  const sfx_achievementRef = useRef<HTMLAudioElement | null>(null);
  const sfx_buyRef = useRef<HTMLAudioElement | null>(null);
  const sfx_streak1Ref = useRef<HTMLAudioElement | null>(null);
  const sfx_streak2Ref = useRef<HTMLAudioElement | null>(null);
  const sfx_streak3Ref = useRef<HTMLAudioElement | null>(null);
  const sfx_streak4Ref = useRef<HTMLAudioElement | null>(null);
  const sfx_streak5Ref = useRef<HTMLAudioElement | null>(null);
  const sfx_streak6Ref = useRef<HTMLAudioElement | null>(null);
  const sfx_streak7Ref = useRef<HTMLAudioElement | null>(null);
  const sfx_streak8Ref = useRef<HTMLAudioElement | null>(null);

  /**
   * Load sound files once on mount.
   */
  useEffect(() => {
    sfx_achievementRef.current = new Audio(sfx_cmaj);
    sfx_buyRef.current = new Audio(sfx_cg);
    sfx_streak1Ref.current = new Audio(sfx_c4);
    sfx_streak2Ref.current = new Audio(sfx_d);
    sfx_streak3Ref.current = new Audio(sfx_e);
    sfx_streak4Ref.current = new Audio(sfx_f);
    sfx_streak5Ref.current = new Audio(sfx_g);
    sfx_streak6Ref.current = new Audio(sfx_a);
    sfx_streak7Ref.current = new Audio(sfx_b);
    sfx_streak8Ref.current = new Audio(sfx_c5);
  }, []);

  /**
   * Plays a sound effect based on the current streak count.
   * 
   * @param streakCount Current streak count
   */
  const playStreakSound = useCallback((streakCount: number) => {
    if (!hasInteracted) return;
    if (streakCount <= 0) return;

    const soundMap: { [key: number]: HTMLAudioElement | null } = {
      1: sfx_streak1Ref.current,
      2: sfx_streak2Ref.current,
      3: sfx_streak3Ref.current,
      4: sfx_streak4Ref.current,
      5: sfx_streak5Ref.current,
      6: sfx_streak6Ref.current,
      7: sfx_streak7Ref.current,
      8: sfx_streak8Ref.current,
    };

    const soundToPlay = soundMap[streakCount] || sfx_streak8Ref.current;
    soundToPlay?.play().catch(() => {});
  }, [hasInteracted]);

  /**
   * Play sound effects as soon as it's allowed (user interacts with the page).
   */
  useEffect(() => {
    if (!hasInteracted) return;
    // music TODO
  }, [hasInteracted]);
  
  const addNotice = useCallback((notice: string) => {
    console.log(`Notice: ${notice}`);
    setNotices((prev) => [
      { id: `${Date.now()}-${noticeId.current++}`, text: notice, animate: true },
      ...prev,
    ].slice(0, MAX_NOTICES));
  }, []);

  /**
   * Unlocks the specified achievement and adds a notice about it. 
   * Does nothing if achievement is already unlocked.
   */
  const setAchievementUnlocked = useCallback((achievement: AchievementName) => {
    if (!achievementsUnlockedRef.current[achievement]) {
      setAchievementsUnlocked((prev) => ({
        ...prev,
        [achievement]: true,
      }));
      addNotice(`Achievement Unlocked: ${ACHIEVEMENTS[achievement].name}`);
      sfx_achievementRef.current?.play().catch(() => {});
    }
  }, [addNotice, setAchievementsUnlocked]);

  useEffect(() => {
    achievementsUnlockedRef.current = achievementsUnlocked;
  }, [achievementsUnlocked]);

  useEffect(() => {
    if (previousAltScreen.current === null && altScreen !== null) {
      setNotices((prev) => prev.map((item) => ({ ...item, animate: false })));
    }

    previousAltScreen.current = altScreen;
  }, [altScreen]);

  /**
   * Processes any pending rolls, updating the relevant state and checking for achievements.
   * 
   * Handled via queue in useEffect to avoid issues with stale state and duplicate calls
   * in development mode due to React.StrictMode.
   */
  useEffect(() => {
    if (pendingRolls.length === 0) {
      return;
    }

    // Fetch current state
    let nextRollCounts = [...rollCounts];
    let nextLastThree = [...lastThree];
    let nextLuckyRollCount = luckyRollCount;
    let nextCurrentStreak = currentStreak;
    let nextMaxStreak = maxStreak;
    let nextMinStreak = minStreak;
    let nextPoints = points;
    const noticesToAdd: string[] = [];
    const achievementsToAdd: AchievementName[] = [];

    // Process each roll by adding to the relevant state and checking for achievements
    for (const roll of pendingRolls) {
      nextRollCounts[roll - 1]++;
      nextLastThree = [roll, ...nextLastThree].slice(0, 3);

      if (roll === 20 && luckyNumber === 20) {
        achievementsToAdd.push('lucky-20');
      }

      if (roll === luckyNumber) {
        const nextStreak = Math.max(nextCurrentStreak, 0) + 1;
        const pointsGained = (1 + upgradeCount['higher-payout']) * ((upgradeCount['streak-multiplier'] + 1) ** (nextStreak - 1));

        nextLuckyRollCount += 1;
        nextCurrentStreak = nextStreak;
        nextPoints += pointsGained;
        nextMaxStreak = Math.max(nextMaxStreak, nextStreak);
        noticesToAdd.push(`You rolled a ${roll}! (+${pointsGained})`);
        playStreakSound(nextStreak);
      } else {
        const nextStreak = Math.min(nextCurrentStreak, 0) - 1;

        nextCurrentStreak = nextStreak;
        nextMinStreak = Math.min(nextMinStreak, nextStreak);
        noticesToAdd.push(`You rolled a ${roll}`);
      }
    }

    // Check for general achievements based on new values
    const nextTotalRolls = nextRollCounts.reduce((a, b) => a + b, 0);
    if (nextTotalRolls >= 10) {
      achievementsToAdd.push('10-rolls');
    }
    if (nextTotalRolls >= 100) {
      achievementsToAdd.push('100-rolls');
    }
    if (nextTotalRolls >= 500) {
      achievementsToAdd.push('500-roll');
    }
    if (
      nextLastThree.length === 3 && 
      nextLastThree[0] - 1 === nextLastThree[1] && 
      nextLastThree[1] - 1 === nextLastThree[2]
    ) {
      achievementsToAdd.push('3-sequence');
    }
    if (
      nextLastThree.length === 3 && 
      nextLastThree.every((v) => v === 6)
    ) {
      achievementsToAdd.push('666');
    }
    if (
      nextLastThree.length >= 2 && 
      nextLastThree[0] === 20 && 
      nextLastThree[1] === 4
    ) {
      achievementsToAdd.push('420');
    }
    if (nextRollCounts.slice(0, isHardMode ? HARD_MODE_FACE_COUNT : EASY_MODE_FACE_COUNT).every((v) => v > 0)) {
      achievementsToAdd.push('each-once');
    }
    if (nextLuckyRollCount >= 10) {
      achievementsToAdd.push('10-lucky');
    }
    if (nextCurrentStreak >= 2) {
      achievementsToAdd.push('2-lucky-consecutive');
    }
    if (nextCurrentStreak <= -10) {
      achievementsToAdd.push('10-fail-consecutive');
    }
    if (nextPoints >= 100) {
      achievementsToAdd.push('rich');
    }
    if (nextPoints >= 1_000_000_000_000_000) {
      achievementsToAdd.push('very-rich');
    }

    // Update state with new values
    setRollCounts(nextRollCounts);
    setLastThree(nextLastThree);
    setLuckyRollCount(nextLuckyRollCount);
    setCurrentStreak(nextCurrentStreak);
    setMaxStreak(nextMaxStreak);
    setMinStreak(nextMinStreak);
    setPoints(nextPoints);

    // Apply notices
    noticesToAdd.forEach((notice) => addNotice(notice));
    achievementsToAdd.forEach((achievement) => setAchievementUnlocked(achievement));

    // Clear queue
    setPendingRolls([]);
  }, [addNotice, playStreakSound, currentStreak, lastThree, luckyRollCount, maxStreak, minStreak, pendingRolls, points, rollCounts, luckyNumber, upgradeCount, setAchievementUnlocked]);

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
    setPendingRolls((prev) => [...prev, value]);
  }

  /**
   * Subtracts points and increases count for specified upgrade.
   * Checks if any achievements should be unlocked as a result of the purchase.
   * 
   * @param index Number indicating which upgrade was bought
   */
  const handleBuyUpgrade = (key: UpgradeName) => {
    const cost = UPGRADES[key].costs[upgradeCount[key]];
    if (points >= cost) {
      setPoints((prevPoints) => prevPoints - cost);
      sfx_buyRef.current?.play().catch(() => {});
      const newUpgradeCount = { ...upgradeCount };
      newUpgradeCount[key] = upgradeCount[key] + 1;
      // Check achievements
      if (key == 'hard-mode') {
        setAchievementUnlocked('have-hard-mode');
      }
      if (key == 'winner') {
        setAchievementUnlocked('have-winner');
      }
      const sides = (isHardMode ? HARD_MODE_FACE_COUNT : EASY_MODE_FACE_COUNT) - upgradeCount['less-numbers'];
      if (luckyNumber > sides) {
        setAchievementUnlocked('no-lucky');
      }
      if (luckyNumber === 1 && sides === 1) {
        setAchievementUnlocked('only-lucky');
      }
      const allUpgradesBought = { 
        ...newUpgradeCount,
        'stats': 99, // manually set purchaseables ignored for achievement
        'hard-mode': 99,
        'winner': 99
      };
      if (Object.values(allUpgradesBought).every((count) => count > 0)) {
        setAchievementUnlocked('upgrades-once');
      }
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
    setAchievementUnlocked('view-info');
  }

  /**
   * Increases the lucky number, wraps if it exceeds the max face count for the current mode. 
   * Does nothing if the "your-lucky-number" upgrade is not purchased.
   */
  const cycleLuckyNumber = () => {
    if (!upgradeCount['your-lucky-number']) return null;
    const maxFaceCount = isHardMode ? HARD_MODE_FACE_COUNT : EASY_MODE_FACE_COUNT;
    const newLuckyNumber = luckyNumber >= maxFaceCount ? 1 : luckyNumber + 1;
    // Check achievements
    const sides = maxFaceCount - upgradeCount['less-numbers'];
    if (newLuckyNumber > sides) {
      setAchievementUnlocked('no-lucky');
    }
    if (newLuckyNumber === 1 && sides === 1) {
      setAchievementUnlocked('only-lucky');
    }
    setLuckyNumber(newLuckyNumber);
  }

  /**
   * Toggles the use of pips on the dice. Unlocks the "use-pips" achievement 
   * if pips are enabled.
   */
  const togglePips = () => {
    const newPipsState = !usesPips;
    if (newPipsState) {
      setAchievementUnlocked('use-pips');
    }
    setUsesPips(newPipsState);
  }

  /**
   * Resets the idle timer whenever the user clicks anywhere on the page. 
   * If the user does not click for 2 minutes, unlocks the "wait-2-mins" achievement.
   */
  const handleClickAnywhere = () => {
    setHasInteracted(true);
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(() => {
      setAchievementUnlocked('wait-2-mins');
    }, 120000);
  }

  /**
   * Wrapper function for restarting the game that also adjusts the screen
   * and clears the notices.
   * 
   * @param clearFunc Function to handle save data editing
   */
  const handleRestartGame = (clearFunc: () => void) => {
    clearFunc();
    setNotices([{ id: `${noticeId.current++}`, text: 'Restarted Game!', animate: true }]);
    setAltScreen(null);
  }

  return (
    <div className={classes.root} style={themeStyle} onClick={handleClickAnywhere}>

      {altScreen === null ? (<>
        <div className={classes.playWindow}>
          <PlayWindow
            notices={notices}
            setNotices={setNotices}
            numberOfDice={1 + upgradeCount['more-dice']}
            rollTimeMs={DEFAULT_ROLL_TIME_MS - (upgradeCount['faster-rolling'] * ROLL_TIME_REDUCTION_PER_UPGRADE_MS)}
            numberOfFaces={(isHardMode ? HARD_MODE_FACE_COUNT : EASY_MODE_FACE_COUNT) - upgradeCount['less-numbers']}
            dieDesign={achievementsUnlocked['have-winner']
              ? 'gold'
              : achievementsUnlocked['have-hard-mode']
                ? 'silver'
                : 'white'
            }
            usesPips={usesPips}
            handleRollResult={handleRollResult}
            unlockAchievement={setAchievementUnlocked}
          />
        </div>

        <div className={classes.buyWindow}>
          <div className={classes.infoContainer}>
            <p className={classes.infoText}>Points: {points}</p>
            <p 
              className={`${classes.infoText} ${upgradeCount['your-lucky-number'] ? classes.pointer : ''}`} 
              onClick={cycleLuckyNumber}
            >
              Lucky Number: {luckyNumber}
            </p>
          </div>
          {Object.entries(upgradeCount).map(([key, count]) => {
            const typedKey = key as UpgradeName;
            const winnerInEasy = typedKey === 'winner' && !isHardMode;
            return (
              <div key={key} className={classes.upgradeList}>
                {isUpgradeUnlocked(UPGRADES[typedKey]) && !winnerInEasy &&
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
          <AchievementWindow
            achievements={achievementsUnlocked}
            unlockAchievement={setAchievementUnlocked}
          />
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
          <SettingsWindow 
            wipeSave={() => handleRestartGame(wipeSave)}
            restartGame={() => handleRestartGame(restartGame)}
            restartGameHardMode={(upgradeCount['hard-mode'] || achievementsUnlocked['have-hard-mode'])
              ? () => handleRestartGame(restartGameHardMode)
              : null
            }
            togglePips={togglePips}
          />
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