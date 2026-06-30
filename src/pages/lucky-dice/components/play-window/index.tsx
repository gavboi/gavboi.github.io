import Die from '../die';
import classes from './index.module.css';
import { useState, type Dispatch, type SetStateAction } from 'react';
import type { AchievementName, DieStyle, Notice } from '../../types';
import { useLuckyDiceTheme } from '../../theme';

interface PlayProps {
  notices: Notice[];
  setNotices: Dispatch<SetStateAction<Notice[]>>;
  numberOfDice: number;
  rollTimeMs: number;
  numberOfFaces: number;
  dieDesign: DieStyle;
  usesPips: boolean;
  handleRollResult: (roll: number) => void;
  unlockAchievement: (name: AchievementName) => void;
}

function NoticeText({ notice, setNotices }: { notice: Notice; setNotices: Dispatch<SetStateAction<Notice[]>> }) {
  const finishAnimation = () => {
    setNotices((prev) => prev.map((item) => (
      item.id === notice.id ? { ...item, animate: false } : item
    )));
  };

  return (
    <p
      className={`${classes.noticeText} ${notice.animate ? classes.noticeTextAnimated : ''}`}
      onAnimationEnd={finishAnimation}
    >
      {notice.text}
    </p>
  );
}

export default function PlayWindow(
  { notices, setNotices, numberOfDice, rollTimeMs, numberOfFaces, dieDesign, usesPips, handleRollResult, unlockAchievement }: PlayProps
) {
  const { themeStyle } = useLuckyDiceTheme();
  const faces: number[] = Array.from({ length: numberOfFaces }, (_, i) => i + 1);
  const [rollTimes, setRollTimes] = useState<number[]>(Array.from({ length: numberOfDice }, () => 0));

  const handleBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      unlockAchievement('click-background');
    }
  }

  const handleDieClick = (i: number) => {
    setRollTimes((prev) => {
      const newRollTimes = [...prev];
      newRollTimes[i] = Date.now();
      // Achievement check
      const rollingNowCount = newRollTimes.filter(time => time >= Date.now() - rollTimeMs).length;
      if (rollingNowCount >= 3) {
        unlockAchievement('3-rolling');
      }

      return newRollTimes;
    });
  };

  return (
    <div className={classes.root} style={themeStyle}>
      <div className={classes.diceContainer} onClick={(e) => handleBgClick(e)}>
        {Array.from({ length: numberOfDice }).map((_, i) => (
          <Die
            key={i}
            handleResult={handleRollResult}
            onClick={() => handleDieClick(i)}
            rollTimeMs={rollTimeMs}
            faces={faces}
            design={dieDesign}
            usesPips={usesPips}
            unlockAchievement={unlockAchievement}
          />
        ))}
      </div>
      <div className={classes.noticesContainer}>
        {notices.map((notice) => (
          <NoticeText
            key={notice.id}
            notice={notice}
            setNotices={setNotices}
          />
        ))}
      </div>
    </div>
  );
}