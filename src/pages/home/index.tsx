import Header from "./components/header";
import Item from "./components/item";
import classes from "./index.module.css";
import { navigateTo } from "../../helpers";
import { useWindowNav, WindowNavProvider } from "./WindowNavProvider";
import NoteAppReadMe from "./components/window/NoteAppReadMe";
import FileAppGames from "./components/window/FileAppGames";
import FileAppGitProj from "./components/window/FileAppGitProj";
import FileAppIdeas from "./components/window/FileAppIdeas";

function HomePageContent() {
  const { currentWindow, pushWindow } = useWindowNav();

  const handleClickGitProj = () => {
    pushWindow(<FileAppGitProj />);
  };

  const handleClickIdeas = () => {
    pushWindow(<FileAppIdeas />);
  };

  const handleClickGames = () => {
    pushWindow(<FileAppGames />);
  };

  const handleClickReadMe = () => {
    pushWindow(<NoteAppReadMe />);
  };

  const handleClickLegacy = () => {
    navigateTo("legacy");
  };

  return (
    <div className={`${classes.bg} ${classes.theme}`}>
      <Header />

      <div className={classes.content}>
        {currentWindow}

        <div className={classes.itemContainer}>
          <Item
            text="GitHub Projects"
            iconShortcut="folder"
            onClick={handleClickGitProj}
          />
          <Item text="Ideas" iconShortcut="folder" onClick={handleClickIdeas} />
          <Item text="Games" iconShortcut="folder" onClick={handleClickGames} />
          <Item text="README" iconShortcut="file" onClick={handleClickReadMe} />
          <Item
            text="Legacy Page"
            iconShortcut="globe"
            onClick={handleClickLegacy}
          />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <WindowNavProvider>
      <HomePageContent />
    </WindowNavProvider>
  );
}
