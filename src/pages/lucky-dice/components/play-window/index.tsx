import Die from '../die';
import classes from './index.module.css';
import type { Dispatch, SetStateAction } from 'react';
import type { AchievementName, DieStyle, Notice } from '../../types';
import { useLuckyDiceTheme } from '../../theme';

interface PlayProps {
  notices: Notice[];
  setNotices: Dispatch<SetStateAction<Notice[]>>;
  numberOfDice: number;
  rollTimeMs: number;
  numberOfFaces: number;
  dieDesign: DieStyle;
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
  { notices, setNotices, numberOfDice, rollTimeMs, numberOfFaces, dieDesign, handleRollResult, unlockAchievement }: PlayProps
) {
  const { themeStyle } = useLuckyDiceTheme();
  const faces = Array.from({ length: numberOfFaces }, (_, i) => i + 1);

  return (
    <div className={classes.root} style={themeStyle}>
      <div className={classes.diceContainer}>
        {Array.from({ length: numberOfDice }).map((_, i) => (
          <Die
            key={i}
            handleResult={handleRollResult}
            rollTimeMs={rollTimeMs}
            faces={faces}
            design={dieDesign}
            usesPips={false}
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