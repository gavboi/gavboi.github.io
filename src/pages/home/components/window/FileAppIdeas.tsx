import FileApp from "./FileApp";
import { faScissors, faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import Item from "../item";
import { useWindowNav } from "../../WindowNavProvider";
import Window from "."
import NoteAppIdeasRpsCamera from "./NoteAppIdeasRpsCamera";
import NoteAppIdeasMlTag from "./NoteAppIdeasMlTag";

/**
 * TEMP
 */
function BlankWindow() {
  return (
    <Window title="?" content={null}/>
  )
}

export default function FileAppIdeas() {
  const { pushWindow } = useWindowNav();

  return (
    <FileApp
      title="Project Ideas"
      files={[
        <Item
          text="RPS Camera"
          detail="Play RPS against a computer by using a webcam to detect your hand gestures"
          icon={faScissors}
          onClick={() => pushWindow(<NoteAppIdeasRpsCamera />)}
        />,
        <Item
          text="ML Freeze Tag"
          detail="Train a machine learning model to play freeze tag"
          icon={faPersonRunning}
          onClick={() => pushWindow(<NoteAppIdeasMlTag />)}
        />,
      ]}
    />
  )
}