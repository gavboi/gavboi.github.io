import { IconDefinition, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from './index.module.css';

export interface FileProps {
  title: string;
  detail: string;
  image?: IconDefinition;
  handleClick: () => {};
}

export default function ContentFile(
  { title, image, detail, handleClick }: FileProps
) {
  
  return (
    <div 
      className={classes.contentContainer} 
      onClick={handleClick}
      title={detail}
    >
      <FontAwesomeIcon
        icon={image || faQuestion} 
        className={classes.icon} 
      />
      <p 
        className={classes.text}
      >{title}</p>
    </div>
  );
}