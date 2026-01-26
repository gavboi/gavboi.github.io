import './index.css';
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
    <div className="header">

      <div className="header-left">
        <a
          href='https://github.com/gavboi'
          target='_blank'
          rel='noopener noreferrer'
          aria-label="Visit Gavin's GitHub profile"
        >
          <img
            className='header-image'
            src='https://avatars.githubusercontent.com/u/50150638?v=4'
            alt='Gavin'
          />
        </a>
      </div>

      <div className="header-center">
        <p>gavboi.github.io</p>
      </div>

      <div className="header-right">
        <p>{time}</p>
      </div>
    </div>
  );
}