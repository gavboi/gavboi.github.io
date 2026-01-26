import Header from './components/header';
import Item from './components/item/index.tsx';
import NoteApp from './components/note-app/index.tsx';
import FileApp from './components/file-app/index.tsx';
import { useTheme } from '../../theme/ThemeProvider.tsx';
import ContentReadMe from './components/note-app/ContentReadMe.js';
import { useState } from 'react';
import './index.css';
import { navigateTo } from '../../helpers/index.ts';

export default function HomePage() {
  const { theme } = useTheme();
  const [fileAppProps, setFileAppProps] = useState(null);
  const [noteAppProps, setNoteAppProps] = useState(null);

  const handleClickGames = () => {
    setFileAppProps({
      title: "Games",
      content: [
        {
          title: "Lucky Dice",
          image: "",
          detail: 'A clicker/upgrade game inspired by "Unfair Flips"',
          handleClick: () => { }
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
    <div className={`bg ${theme}`}>
      <Header />

      <div className='content'>
        {noteAppProps && <NoteApp
          {...noteAppProps}
        />}

        {fileAppProps && <FileApp
          {...fileAppProps}
        />}

        <div className="item-container">
          <Item icon="folder" text="GitHub Projects" />
          <Item icon="folder" text="Ideas" />
          <Item icon="folder" text="Games" onClick={handleClickGames} />
          <Item icon="file" text="README" onClick={handleClickReadMe} />
          <Item icon="globe" text="Legacy Page" onClick={handleClickLegacy} />
        </div>
      </div>
    </div>
  );
}