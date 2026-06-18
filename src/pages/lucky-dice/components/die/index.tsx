import { useEffect, useRef, useState } from 'react';
import classes from './index.module.css';
import { randomFromArray } from '../../../../helpers';
import { AchievementName } from '../../types';

interface DieProps {
  rollTimeMs?: number;
  faces?: number[];
  handleResult: (arg0: number) => void; 
  unlockAchievement: (name: AchievementName) => void;
}

export default function Die(
  { rollTimeMs = 2000, faces = [1, 2, 3, 4, 5, 6], handleResult, unlockAchievement }: DieProps
) {
  const [rollModifierClass, setRollModifierClass] = useState<string | null>(null);
  const [value, setValue] = useState<number | '?'>('?');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        className={`${classes.box} ${rollModifierClass 
          ? rollModifierClass 
          : classes.pointer}`} 
        onClick={handleStartRoll}
      >
        <p className={classes.number}>{value}</p>
      </div>
    </div>
    </div>
  )
}