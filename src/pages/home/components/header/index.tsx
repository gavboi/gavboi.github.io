import classes from './index.module.css';
import { useState, useEffect } from 'react';

export default function Header() {
  // show the current time in the header
  const [time, setTime] = useState("");
  const setCurrentTime = () => {
    setTime(new Date().toLocaleString('en-CA', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }));
  };

  useEffect(() => {
    const interval = setInterval(setCurrentTime, 1000);
    setCurrentTime();
    return () => clearInterval(interval);
  });

  return (
    <div className={classes.header}>

      <div className={classes.headerLeft}>
        <a
          href='https://github.com/gavboi'
          target='_blank'
          rel='noopener noreferrer'
          aria-label="Visit Gavin's GitHub profile"
        >
          <img
            className={classes.headerImage}
            src='https://avatars.githubusercontent.com/u/50150638?v=4'
            alt='Gavin'
          />
        </a>
      </div>

      <div className={classes.headerCenter}>
        <p>gavboi.github.io</p>
      </div>

      <div className={classes.headerRight}>
        <p>{time}</p>
      </div>
    </div>
  );
}