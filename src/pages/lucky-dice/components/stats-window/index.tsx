import { useLuckyDiceTheme } from '../../theme';
import Histogram from '../histogram';
import classes from './index.module.css';

interface StatsWindowProps {
  rollCounts: number[];
  luckyRollCount: number;
  currentStreak: number;
  maxStreak: number;
  minStreak: number;
  isHardMode: boolean;
}

export default function StatsWindow({
  rollCounts,
  luckyRollCount,
  currentStreak,
  maxStreak,
  minStreak,
  isHardMode
}: StatsWindowProps) {
  const { themeStyle } = useLuckyDiceTheme();
  
  return (
    <div className={classes.root} style={themeStyle}>
      <p className={classes.text}>
        Times a lucky number was rolled: {luckyRollCount}
      </p>
      <p className={classes.text}>
        Current streak: {currentStreak}
      </p>
      <p className={classes.text}>
        Most lucky numbers in a row: {maxStreak}
      </p>
      <p className={classes.text}>
        Most non-lucky numbers in a row: {-minStreak}
      </p>
      <div className={classes.histogramContainer}>
        <Histogram 
          rollCounts={rollCounts.slice(0, isHardMode ? 20 : 6)}
        />
      </div>
    </div>
  );
}