import FileApp from "./FileApp";
import {
  faDisplay,
  faMoneyCheckDollar,
  faTableCells,
  faGridVertical,
  faBullhorn,
  faCommentNodes,
  faWindowRestore,
  faChartLine,
  faCube,
  faSquareBinary,
  faComment,
  faEnvelopeOpenText,
  faGifts,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import Item from "../item";
import { useWindowNav } from "../../WindowNavProvider";
import NoteAppGitReadMe from "./NoteAppGitReadMe";
import NoteAppGitSudokuSolver from "./NoteAppGitSudoku";
import NoteAppGitWebsite from "./NoteAppGitWebsite";
import NoteAppGitWordleSolver from "./NoteAppGitWordleSolver";
import NoteAppGitVoiceCommand from "./NoteAppGitVoiceCommand";
import NoteAppGitConnectionsTogether from "./NoteAppGitConnectionsTogether";
import NoteAppGitWindowTweaks from "./NoteAppGitWindowTweaks";
import NoteAppGitDesmosPlotter from "./NoteAppGitDesmosPlotter";
import NoteAppGitMinecraftAutofish from "./NoteAppGitMinecraftAutofish";
import NoteAppGitSecretSanta from "./NoteAppGitSecretSanta";
import NoteAppGitBtd6Script from "./NoteAppGitBtd6Script";
import NoteAppGitLetterAssembler from "./NoteAppGitLetterAssembler";
import NoteAppGitHomePos from "./NoteAppGitHomePos";
import NoteAppGitPicRgb from "./NoteAppGitPicRgb";
import NoteAppGitDiscordHomeBot from "./NoteAppGitDiscordHomeBot";

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
        // 2026 Mar 15
        <Item
          text="Home POS"
          detail=""
          icon={faCartPlus}
          onClick={() => pushWindow(<NoteAppGitHomePos />)}
        />,
        // 2026 Jan 26
        <Item
          text="This Website"
          detail=""
          icon={faDisplay}
          onClick={() => pushWindow(<NoteAppGitWebsite />)}
        />,
        // 2020 Dec 31 / 2022 Dec 9 / 2024 Sept 12 / 2024 Sept 14
        <Item
          text="Discord Home Bot"
          detail=""
          icon={faComment}
          onClick={() => pushWindow(<NoteAppGitDiscordHomeBot />)}
        />,
        // 2024 Aug 23
        <Item
          text="Connections Together"
          detail=""
          icon={faCommentNodes}
          onClick={() => pushWindow(<NoteAppGitConnectionsTogether />)}
        />,
        // 2022 Apr 26 / 2024 Jun 20
        <Item
          text="Cover Letter Assembler"
          detail=""
          icon={faEnvelopeOpenText}
          onClick={() => pushWindow(<NoteAppGitLetterAssembler />)}
        />,
        // 2024 May 29
        <Item
          text="Wordle Solver"
          detail=""
          icon={faGridVertical}
          onClick={() => pushWindow(<NoteAppGitWordleSolver />)}
        />,
        // 2024 May 22
        <Item
          text="Voice Command"
          detail=""
          icon={faBullhorn}
          onClick={() => pushWindow(<NoteAppGitVoiceCommand />)}
        />,
        // 2024 May 13
        <Item
          text="Sudoku Solver"
          detail=""
          icon={faTableCells}
          onClick={() => pushWindow(<NoteAppGitSudokuSolver />)}
        />,
        // 2023 Dec 7
        <Item
          text="Secret Santa's Helper"
          detail=""
          icon={faGifts}
          onClick={() => pushWindow(<NoteAppGitSecretSanta />)}
        />,
        // 2023 Jan 16
        <Item
          text="BTD6 Script"
          detail=""
          icon={faMoneyCheckDollar}
          onClick={() => pushWindow(<NoteAppGitBtd6Script />)}
        />,
        // 2022 Mar 22
        <Item
          text="Pic To RGB"
          detail=""
          icon={faSquareBinary}
          onClick={() => pushWindow(<NoteAppGitPicRgb />)}
        />,
        // 2022 Mar 22
        <Item
          text="Window Tweaks"
          detail=""
          icon={faWindowRestore}
          onClick={() => pushWindow(<NoteAppGitWindowTweaks />)}
        />,
        // 2021 Jan 6
        <Item
          text="Minecraft Autofish"
          detail=""
          icon={faCube}
          onClick={() => pushWindow(<NoteAppGitMinecraftAutofish />)}
        />,
        // 2020 Dec 31
        <Item
          text="Desmos Plotter"
          detail=""
          icon={faChartLine}
          onClick={() => pushWindow(<NoteAppGitDesmosPlotter />)}
        />,
      ]}
    />
  );
}
