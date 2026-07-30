import FileApp from "./FileApp";
import { 
  faMoneyCheckDollar, faTableCells, faGridVertical,
  faBullhorn, faCommentNodes, faWindowRestore, faChartLine,
  faCube, faSquareBinary, faComment, faEnvelopeOpenText,
  faGifts, faCartPlus
} from '@fortawesome/free-solid-svg-icons';
import Item from "../item";
import { useWindowNav } from "../../WindowNavProvider";
import Window from "."
import NoteAppGitReadMe from "./NoteAppGitReadMe";
import classes from './index.module.css';

/**
 * TEMP
 */
function BlankWindow(title: string) {
  return (
    <Window title={title} content={<p className={classes.text} >Details coming soon!</p>}/>
  )
}

export default function FileAppGitProj() {
  const { pushWindow } = useWindowNav();

  return (
    <FileApp
      title="GitHub Projects"
      files={[
        <Item
          text="README"
          detail=""
          iconShortcut="file"
          onClick={() => pushWindow(<NoteAppGitReadMe />)}
        />,
        <Item
          text="BTD6 Script"
          detail=""
          icon={faMoneyCheckDollar}
          onClick={() => pushWindow(BlankWindow("BTD6 Script"))}
        />,
        <Item
          text="Sudoku Solver"
          detail=""
          icon={faTableCells}
          onClick={() => pushWindow(BlankWindow("Sudoku Solver"))}
        />,
        <Item
          text="Wordle Solver"
          detail=""
          icon={faGridVertical}
          onClick={() => pushWindow(BlankWindow("Wordle Solver"))}
        />,
        <Item
          text="Voice Command"
          detail=""
          icon={faBullhorn}
          onClick={() => pushWindow(BlankWindow("Voice Command"))}
        />,
        <Item
          text="Connections Together"
          detail=""
          icon={faCommentNodes}
          onClick={() => pushWindow(BlankWindow("Connections Together"))}
        />,
        <Item
          text="Window Tweaks"
          detail=""
          icon={faWindowRestore}
          onClick={() => pushWindow(BlankWindow("Window Tweaks"))}
        />,
        <Item
          text="Desmos Plotter"
          detail=""
          icon={faChartLine}
          onClick={() => pushWindow(BlankWindow("Desmos Plotter"))}
        />,
        <Item
          text="Minecraft Autofish"
          detail=""
          icon={faCube}
          onClick={() => pushWindow(BlankWindow("Minecraft Autofish"))}
        />,
        <Item
          text="Pic To RGB"
          detail=""
          icon={faSquareBinary}
          onClick={() => pushWindow(BlankWindow("Pic To RGB"))}
        />,
        <Item
          text="Discord Mod Bot"
          detail=""
          icon={faComment}
          onClick={() => pushWindow(BlankWindow("Discord Mod Bot"))}
        />,
        <Item
          text="Cover Letter Assembler (WIP)"
          detail=""
          icon={faEnvelopeOpenText}
          onClick={() => pushWindow(BlankWindow("(WIP) Cover Letter Assembler"))}
        />,
        <Item
          text="Secret Santa's Helper (WIP)"
          detail=""
          icon={faGifts}
          onClick={() => pushWindow(BlankWindow("(WIP) Secret Santa's Helper"))}
        />,
        <Item
          text="Home POS (WIP)"
          detail=""
          icon={faCartPlus}
          onClick={() => pushWindow(BlankWindow("(WIP) Home POS"))}
        />,
      ]}
    />
  )
}