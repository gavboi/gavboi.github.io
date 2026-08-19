import Window from '.';
import { NoteAppInfo } from '../item';
import classes from './index.module.css';

function Content() {
  return (
    <div className={classes.text}>
      <NoteAppInfo
        status="started"
        created={[new Date("2026-03-15")]}
        tags={["JS/TS", "React", "no AI"]}
        repoName="home-inventory"
        repoUrl="https://github.com/gavboi/home-inventory"
      />
      <p>
        Interface and database for a home point-of-sale system. Focuses on 
        inventory management and easy interfacing.
      </p>
      <p><b>
        Currently privated as it is not yet complete enough to be used.
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

export default function NoteAppGitHomePos() {
  return (
    <Window
      title="Home POS"
      content={<Content />}
    />
  )
}