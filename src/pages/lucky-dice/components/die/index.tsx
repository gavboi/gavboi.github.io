import { useEffect, useRef, useState } from 'react';
import classes from './index.module.css';
import { randomFromArray } from '../../../../helpers';
import { AchievementName, DieStyle } from '../../types';
import Pips from './pips';

interface DieProps {
  rollTimeMs?: number;
  faces?: number[];
  design: DieStyle;
  usesPips: boolean;
  handleResult: (arg0: number) => void; 
  unlockAchievement: (name: AchievementName) => void;
}

export default function Die({
  rollTimeMs = 2000, 
  faces = [1, 2, 3, 4, 5, 6], 
  design, 
  usesPips, 
  handleResult, 
  unlockAchievement
}: DieProps) {
  const [rollModifierClass, setRollModifierClass] = useState<string | null>(null);
  const [value, setValue] = useState<number | '?'>('?');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const designClass = design === 'white' ? classes.whiteDie 
    : design === 'silver' ? classes.silverDie 
    : classes.goldDie;
  const pipStyle = design === 'white' 
    ? 'solid'
    : 'shadow';

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const processRoll = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const result = randomFromArray(faces);
    setValue(result);
    handleResult(result);
    setRollModifierClass(null);
  }

  const handleStartRoll = () => {
    if (rollModifierClass === null) {
      setRollModifierClass(classes.slowRoll);
      timeoutRef.current = setTimeout(processRoll, rollTimeMs);
      intervalRef.current = setInterval(() => {
        setValue(randomFromArray(faces));
      }, 100);
    } else {
      unlockAchievement('roll-on-roll');
    }
  }

  return (
    <div className={`${rollModifierClass ? classes.shakeHorizontal : ''}`}>
    <div className={`${rollModifierClass ? classes.shakeVertical : ''}`}>
      <div 
        className={
          `${classes.box} ` + 
          `${rollModifierClass 
            ? rollModifierClass 
            : classes.pointer} ` +
          `${designClass}`
        } 
        onClick={handleStartRoll}
      >
        {usesPips
          ? <Pips value={value === '?' ? 0 : value} isExtended={faces.length > 9} pipStyle={pipStyle}/>
          : <p className={classes.number}>{value}</p>
        }
      </div>
    </div>
    </div>
  )
}