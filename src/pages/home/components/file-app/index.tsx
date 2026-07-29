import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import classes from './index.module.css';
import ContentFile, { FileProps } from './ContentFile';

export interface FileAppProps {
  title: string;
  content: FileProps[];
  onClose: () => void;
}

export default function FileApp({ title, content, onClose }: FileAppProps) {

  const files = content.map(file =>
    <ContentFile
      title={file.title}
      image={file.image}
      detail={file.detail}
      handleClick={file.handleClick}
    />
  )

  return (
    <div className={classes.window}>
      <div className={classes.windowHeader}>
        <p className={classes.windowTitle}>{title}</p>
        <div className={classes.windowX} onClick={onClose}>
          <FontAwesomeIcon icon={faX} className={classes.windowXIcon} />
        </div>
      </div>
      <div className={classes.fileList}>
        {files}
      </div>
    </div>
  );
}