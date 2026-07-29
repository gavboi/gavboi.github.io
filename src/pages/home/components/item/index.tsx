import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFolder, faGlobe } from '@fortawesome/free-solid-svg-icons';
import classes from './index.module.css';

type ItemIcon = 'file' | 'folder' | 'globe';

interface ItemProps {
  icon: ItemIcon;
  text: string;
  onClick: () => void;
}

const iconMap = {
  file: faFile,
  folder: faFolder,
  globe: faGlobe
};

export default function Item({ icon, text, onClick }: ItemProps) {
  return (
    <div className={classes.container} onClick={onClick}>
      <FontAwesomeIcon icon={iconMap[icon]} className={classes.icon} />
      <p className={classes.text}>{text}</p>
    </div>
  );
}