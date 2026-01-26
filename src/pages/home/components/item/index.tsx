import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFolder, faGlobe } from '@fortawesome/free-solid-svg-icons';
import './index.css';

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
    <div className="container" onClick={onClick}>
      <FontAwesomeIcon icon={iconMap[icon]} className="icon" />
      <p className="text">{text}</p>
    </div>
  );
}