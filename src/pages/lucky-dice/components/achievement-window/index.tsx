import { ACHIEVEMENTS } from '../../constants';
import { AchievementName } from '../../types';
import AchievementTile from '../achievement-tile';
import classes from './index.module.css';

type Props = {
  achievements: Record<AchievementName, boolean>;
  unlockAchievement: (name: AchievementName) => void;
}

export default function AchievementWindow({ achievements, unlockAchievement }: Props) {
  return (
    <div className={classes.root}>
      <p className={classes.titleText}>
        Achievements {Object.values(achievements).filter(Boolean).length} / {Object.values(ACHIEVEMENTS).filter(Boolean).length}
      </p>
      <div className={classes.achievementContainer}>
        {Object.entries(ACHIEVEMENTS)
          .map(([key, _]) => {
            const typedKey = key as AchievementName;
            const isUnlocked = achievements[typedKey];
            const isClickable = typedKey === 'clickable';
            return (
              <AchievementTile
                key={key}
                achievementKey={typedKey}
                unlocked={isUnlocked}
                unlockHiddenAchievement={isClickable 
                  ? () => unlockAchievement(typedKey)
                  : () => {}}
              />
            );
        })}
      </div>
    </div>
  );
}