import { useRef, useState } from 'react';
import classes from './index.module.css';
import { randomFromArray } from '../../../../helpers';

interface DieProps {
  rollTimeMs?: number;
  faces?: number[];
  handleResult: (arg0: number) => void; 
}

export default function Die(
  { rollTimeMs = 2000, faces = [1, 2, 3, 4, 5, 6], handleResult }: DieProps
) {
  const [rollModifierClass, setRollModifierClass] = useState<string | null>(null);
  const [value, setValue] = useState<number | '?'>('?');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const processRoll = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    const result = randomFromArray(faces);
    setValue(result);
    handleResult(result);
    setRollModifierClass(null);
  }

  const handleStartRoll = () => {
    if (rollModifierClass === null) {
      setRollModifierClass(classes.slowRoll);
      setTimeout(processRoll, rollTimeMs);
      intervalRef.current = setInterval(() => {
        setValue(randomFromArray(faces));
      }, 100);
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