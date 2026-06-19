import { useLuckyDiceTheme } from '../../theme';
import classes from './index.module.css';

interface HistogramProps {
  rollCounts: number[];
}

export default function Histogram(
  { rollCounts }: HistogramProps
) {
  const { themeStyle } = useLuckyDiceTheme();
  const maxCount = Math.max(...rollCounts);

  return (
    <div className={classes.root} style={themeStyle}>
      {rollCounts.map((count, index) => (
        <>
          <div
            key={index}
            className={classes.bar}
            style={{ 
              height: `${(count / maxCount) * 100}%`, 
              gridTemplateColumns: `repeat(${rollCounts.length}, 1fr)`,
              gridColumn: index + 1
            } as React.CSSProperties}
          >
            <p className={classes.barLabel}>{count}</p>
          </div>
          <p className={classes.label}>{index + 1}</p>
        </>
      ))}
    </div>
  )
}