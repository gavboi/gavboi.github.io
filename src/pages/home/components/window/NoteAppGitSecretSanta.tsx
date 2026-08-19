import Window from '.';
import { NoteAppInfo } from '../item';
import classes from './index.module.css';

function Content() {
  return (
    <div className={classes.text}>
      <NoteAppInfo
        status="in progress"
        created={[new Date("2023-12-07")]}
        tags={["Python", "tool", "no AI"]}
        repoName="secret-santa"
        repoUrl="https://github.com/gavboi/secret-santa"
      />
      <p>
        Assigns recipients for a "Secret Santa" gift exchange, allowing all members of
        a group to participate without anyone knowing the assignments.
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

export default function NoteAppGitSecretSanta() {
  return (
    <Window
      title="Secret Santa's Helper"
      content={<Content />}
    />
  )
}