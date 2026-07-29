import Header from './components/header'
import Item from './components/item';
import { useTheme } from '../../theme/ThemeProvider';
import classes from './index.module.css';
import { navigateTo } from '../../helpers';
import { useWindowNav, WindowNavProvider } from './WindowNavProvider';
import NoteAppReadMe from './components/window/NoteAppReadMe';
import FileAppGames from './components/window/FileAppGames';

function HomePageContent() {
  const { theme } = useTheme();
  const { currentWindow, pushWindow } = useWindowNav();

  const handleClickGames = () => {
    pushWindow(<FileAppGames />);
  }

  const handleClickReadMe = () => {
    pushWindow(<NoteAppReadMe />);
  };

  const handleClickLegacy = () => {
    navigateTo('legacy');
  }

  return (
    <div className={`${classes.bg} ${classes.theme}`}>
      <Header />

      <div className={classes.content}>
        {currentWindow}

        <div className={classes.itemContainer}>
          <Item text="GitHub Projects" iconShortcut="folder" onClick={() => {}}/>
          <Item text="Ideas" iconShortcut="folder" onClick={() => {}} />
          <Item text="Games" iconShortcut="folder" onClick={handleClickGames} />
          <Item text="README" iconShortcut="file"  onClick={handleClickReadMe} />
          <Item text="Legacy Page" iconShortcut="globe" onClick={handleClickLegacy} />
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