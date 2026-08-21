import { ACHIEVEMENTS } from "../../constants";
import { useLuckyDiceTheme } from "../../theme";
import { AchievementName } from "../../types";
import AchievementTile from "../achievement-tile";
import classes from "./index.module.css";

type Props = {
  achievements: Record<AchievementName, boolean>;
  unlockAchievement: (name: AchievementName) => void;
};

export default function AchievementWindow({
  achievements,
  unlockAchievement,
}: Props) {
  const { themeStyle } = useLuckyDiceTheme();

  return (
    <div className={classes.root} style={themeStyle}>
      <p className={classes.titleText}>
        Achievements {Object.values(achievements).filter(Boolean).length} /{" "}
        {Object.values(ACHIEVEMENTS).filter(Boolean).length}
      </p>
      <div className={classes.achievementContainer}>
        {Object.entries(ACHIEVEMENTS).map(([key, _]) => {
          const typedKey = key as AchievementName;
          const isUnlocked = achievements[typedKey];
          const isClickable = typedKey === "clickable";
          return (
            <AchievementTile
              key={key}
              achievementKey={typedKey}
              unlocked={isUnlocked}
              unlockHiddenAchievement={
                isClickable ? () => unlockAchievement(typedKey) : () => {}
              }
            />
          );
        })}
      </div>
    </div>
  );
}
