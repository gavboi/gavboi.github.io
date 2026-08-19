import Window from '.';
import { NoteAppInfo } from '../item';
import classes from './index.module.css';

function Content() {
  return (
    <div className={classes.text}>
      <NoteAppInfo
        status="nearly finished"
        created={[new Date("2024-08-23")]}
        tags={["JS/TS", "Java", "game", "no AI"]}
        repoName="connections-together"
        repoUrl="https://github.com/gavboi/connections-together"
      />
      <p>
        LAN multiplayer versus word association guessing game based off "Connections",
        with inspiration from Jackbox games.
      </p>
      <p><b>
        Currently privated as instability in websocket setup makes games nearly unplayable.
      </b></p>
      {/*<h2>Usage</h2>
      <p>
        INSTR
      </p>
      <h2>Limitations</h2>
      <p>
        LMITATIONS
      </p>*/}
    </div>
  );
}

export default function NoteAppGitConnectionsTogether() {
  return (
    <Window
      title="Connections Together"
      content={<Content />}
    />
  )
}