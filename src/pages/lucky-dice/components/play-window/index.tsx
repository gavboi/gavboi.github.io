import Die from '../die';
import classes from './index.module.css';
import type { Dispatch, SetStateAction } from 'react';
import type { AchievementName, Notice } from '../../types';

interface PlayProps {
  notices: Notice[];
  setNotices: Dispatch<SetStateAction<Notice[]>>;
  numberOfDice: number;
  rollTimeMs: number;
  numberOfFaces: number;
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
  { notices, setNotices, numberOfDice, rollTimeMs, numberOfFaces, handleRollResult, unlockAchievement }: PlayProps
) {
  const faces = Array.from({ length: numberOfFaces }, (_, i) => i + 1);
  return (
    <div className={classes.root}>
      <div className={classes.diceContainer}>
        {Array.from({ length: numberOfDice }).map((_, i) => (
          <Die
            key={i}
            handleResult={handleRollResult}
            rollTimeMs={rollTimeMs}
            faces={faces}
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