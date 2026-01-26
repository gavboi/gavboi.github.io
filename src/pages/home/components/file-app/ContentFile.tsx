import { IconDefinition, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      className="content-container" 
      onClick={handleClick}
      title={detail}
    >
      <FontAwesomeIcon
        icon={image || faQuestion} 
        className="icon" 
      />
      <p 
        className="text"
      >{title}</p>
    </div>
  );
}