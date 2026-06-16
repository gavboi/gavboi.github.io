import { useState } from 'react';
import { ACHIEVEMENTS } from '../../constants';
import { AchievementName } from '../../types';
import classes from './index.module.css';

interface TileProps {
  achievementKey: AchievementName;
  unlocked: boolean;
  unlockHiddenAchievement: () => void;
}

export default function AchievementTile(
  { achievementKey, unlocked, unlockHiddenAchievement }: TileProps
) {
  const isClickable = achievementKey === 'clickable';
  const [clickCount, setClickCount] = useState<number>(0);

  const handleClick = () => {
    if (!isClickable) return;
    const newClickCount = clickCount + 1;
    if (newClickCount === 2) {
      unlockHiddenAchievement();
    }
    setClickCount(newClickCount);
  }

  return (
    <div 
      className={
        `${classes.container} ${unlocked ? '' : classes.notUnlocked} ` +
        `${isClickable ? classes.clickableAchievement : ''}`
      }
      onClick={isClickable ? handleClick : undefined}
    >
      <div className={classes.tile}>
        <h3 className={classes.titleText}>{ACHIEVEMENTS[achievementKey].name}</h3>
        <p className={classes.descriptionText}>{unlocked ? ACHIEVEMENTS[achievementKey].description : '?'}</p>
      </div>
    </div>
  );
}