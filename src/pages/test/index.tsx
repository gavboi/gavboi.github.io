import { useState } from 'react';
import classes from './index.module.css';

interface BoxProps {
  target: number;
}

function Box({ target }: BoxProps) {
  const [on, setOn] = useState<boolean[]>(Array(25).fill(false));
  const totalOn = on.filter((value) => value).length;

  const handleBoxClick = (index: number) => {
    setOn((prev) => {
      const newOn = [...prev];
      newOn[index] = !newOn[index];
      return newOn;
    });
  };

  return (
    <div className={classes.boxContainer}>
      <h3 className={`${totalOn === target ? classes.success : ''}`}>{target}</h3>
      {Array(5).fill(null).map((_, index) => (
        <div
          key={index}
          className={classes.cellRow}
        >
          {Array(5).fill(null).map((_, innerIndex) => (
            <div
              key={innerIndex}
              className={`${classes.cell} ${on[index * 5 + innerIndex] ? classes.cellOn : classes.cellOff}`}
              onClick={() => {
                const relevantIndex = index * 5 + innerIndex;
                handleBoxClick(relevantIndex);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default function TestPage() {

  return (
    <div>
      <h1>Test Page</h1>
      <div className={classes.container}>
        {Array(2).fill(null).map((_, index) => (
          <div className={classes.rowContainer}>
            {Array(10).fill(null).map((_, innerIndex) => (
              <Box
                key={innerIndex}
                target={index * 10 + innerIndex + 1}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}