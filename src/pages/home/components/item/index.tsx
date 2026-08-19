import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFolder, faGlobe, IconDefinition, faQuestion } from '@fortawesome/free-solid-svg-icons';
import classes from './index.module.css';

type ItemTags = "game" | "cli" | "C" | "AutoHotKey" | "Python" | "tool" | "game script" | "no AI"
  | "Desmos" | "React" | "JS/TS" | "Java";

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
  status: "idea" |"started" | "in progress" | "nearly finished" | "complete";
  created?: Date[];
  tags: ItemTags[];
  repoName?: string;
  repoUrl?: string;
}

export function NoteAppInfo({
  status, created, tags, repoName, repoUrl
}: NoteAppInfoProps) {
  const displayStatus = status === "idea" ? "Not Started"
    : status === "started" ? "Outlined" 
    : status === "in progress" ? "WIP" 
    : status === "nearly finished" ? "Needs Polishing" 
    : "Complete";
  const displayDate = created && created.length > 0 ? 
    created.map(date => date.toLocaleDateString(
        undefined,
        { year: 'numeric', month: 'long' }
      )).join(", ") 
    : undefined;

  return (
    <div>
      <p>
        {repoName && repoUrl && <><b>Repo:</b> <a href={repoUrl} target="_blank" rel="noopener noreferrer">{repoName}</a><br /></>}
        <b>Tags:</b> {tags.join(", ")}<br />
        {displayDate && <><b>Created:</b> {displayDate}<br /></>}
        <b>Status:</b> {displayStatus}
      </p>
    </div>
  );
}