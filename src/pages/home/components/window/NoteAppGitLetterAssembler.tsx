import Window from '.';
import { NoteAppInfo } from '../item';
import classes from './index.module.css';

function Content() {
  return (
    <div className={classes.text}>
      <NoteAppInfo
        status="in progress"
        created={[new Date("2022-04-26")]}
        tags={["Python", "cli", "tool", "no AI"]}
        repoName="quick-cover-letter"
        repoUrl="https://github.com/gavboi/quick-cover-letter"
      />
      <p>
        Based off of a job description, assembles a cover letter through pre-made components
        based on the topic of each component.
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

export default function NoteAppGitLetterAssembler() {
  return (
    <Window
      title="Cover Letter Assembler"
      content={<Content />}
    />
  )
}