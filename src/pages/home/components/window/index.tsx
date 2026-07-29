import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import classes from './index.module.css';
import { useWindowNav } from '../../WindowNavProvider';

export interface WindowProps {
  title: string;
  content: React.ReactNode;
}

export default function Window({ title, content }: WindowProps) {
  const { popWindow } = useWindowNav();

  return (
    <div className={classes.window}>
      <div className={classes.windowHeader}>
        <p className={classes.windowTitle}>{title}</p>
        <div className={classes.windowX} onClick={popWindow}>
          <FontAwesomeIcon icon={faX} className={classes.windowXIcon} />
        </div>
      </div>
      <div className={classes.container}>
        {content}
      </div>
    </div>
  );
}