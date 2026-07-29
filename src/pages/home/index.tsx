import Header from './components/header'
import Item from './components/item';
import NoteApp from './components/note-app';
import FileApp from './components/file-app';
import { useTheme } from '../../theme/ThemeProvider';
import ContentReadMe from './components/note-app/ContentReadMe';
import { useState } from 'react';
import classes from './index.module.css';
import { navigateTo } from '../../helpers';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { AppProps } from './types';

export default function HomePage() {
  const { theme } = useTheme();
  const [fileAppProps, setFileAppProps] = useState<AppProps | null>(null);
  const [noteAppProps, setNoteAppProps] = useState<AppProps | null>(null);

  const handleClickGames = () => {
    setFileAppProps({
      title: "Games",
      content: [
        {
          title: "Lucky Dice",
          detail: 'A clicker/upgrade game inspired by "Unfair Flips"',
          image: faDice,
          handleClick: () => {navigateTo("lucky-dice")}
        }
      ],
      onClose: () => setFileAppProps(null)
    })
  }

  const handleClickReadMe = () => {
    setNoteAppProps({
      title: "README",
      content: <ContentReadMe />,
      onClose: () => setNoteAppProps(null)
    });
  };

  const handleClickLegacy = () => {
    navigateTo('legacy');
  }

  return (
    <div className={`bg ${classes.theme}`}>
      <Header />

      <div className={classes.content}>
        {noteAppProps && <NoteApp
          {...noteAppProps}
        />}

        {fileAppProps && <FileApp
          {...fileAppProps}
        />}


        <div className={classes.itemContainer}>
          <Item icon="folder" text="GitHub Projects" onClick={() => {}}/>
          <Item icon="folder" text="Ideas" onClick={() => {}} />
          <Item icon="folder" text="Games" onClick={handleClickGames} />
          <Item icon="file" text="README" onClick={handleClickReadMe} />
          <Item icon="globe" text="Legacy Page" onClick={handleClickLegacy} />
        </div>
      </div>
    </div>
  );
}