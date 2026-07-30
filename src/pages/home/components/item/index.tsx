import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFolder, faGlobe, IconDefinition, faQuestion } from '@fortawesome/free-solid-svg-icons';
import classes from './index.module.css';

interface ItemProps {
  text: string;
  onClick: () => void;
  detail?: string;
  iconShortcut?: 'file' | 'folder' | 'globe';
  icon?: IconDefinition;
}

const iconMap = {
  file: faFile,
  folder: faFolder,
  globe: faGlobe
};

export default function Item({
  text, onClick, detail, iconShortcut, icon = faQuestion
}: ItemProps) {
  return (
    <div 
      className={classes.container} 
      onClick={onClick}
      title={detail}
    >
      <FontAwesomeIcon 
        icon={iconShortcut ? iconMap[iconShortcut] : icon} 
        className={classes.icon} 
      />
      <p 
        className={classes.text}
      >{text}</p>
    </div>
  );
}