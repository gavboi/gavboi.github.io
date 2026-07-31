import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFolder, faGlobe, IconDefinition, faQuestion } from '@fortawesome/free-solid-svg-icons';
import classes from './index.module.css';

type ItemTags = "game" | "cli" | "C" | "AutoHotKey" | "Python" | "tool" | "game script" | "no AI"
  | "Desmos" | "React" | "JS/TS";

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

interface NoteAppInfoProps {
  status: "started" | "in progress" | "nearly finished" | "complete";
  created: string;
  tags: ItemTags[];
  repoName: string;
  repoUrl: string;
}

export function NoteAppInfo({
  status, created, tags, repoName, repoUrl
}: NoteAppInfoProps) {
  const displayStatus = status === "started" ? "Outlined" 
    : status === "in progress" ? "WIP" 
    : status === "nearly finished" ? "Needs Polishing" 
    : "Complete";

  return (
    <div>
      <p>
        <b>Repo:</b> <a href={repoUrl} target="_blank" rel="noopener noreferrer">{repoName}</a><br />
        <b>Tags:</b> {tags.join(", ")}<br />
        <b>Created:</b> {created}<br />
        <b>Status:</b> {status}
      </p>
    </div>
  );
}