import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import classes from './index.module.css';

export interface NoteAppProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

export default function NoteApp({ title, content, onClose }: NoteAppProps) {
  return (
    <div className={classes.window}>
      <div className={classes.windowHeader}>
        <p className={classes.windowTitle}>{title}</p>
        <div className={classes.windowX} onClick={onClose}>
          <FontAwesomeIcon icon={faX} className={classes.windowXIcon} />
        </div>
      </div>
      <div className={classes.textContent}>{content}</div>
    </div>
  );
}