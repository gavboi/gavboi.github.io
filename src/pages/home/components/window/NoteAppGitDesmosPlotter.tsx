import Window from '.';
import { NoteAppInfo } from '../item';
import classes from './index.module.css';

function Content() {
  return (
    <div className={classes.text}>
      <NoteAppInfo
        status="complete"
        created={[new Date("2020-12-31")]}
        tags={["Desmos", "JS/TS", "tool", "no AI"]}
        repoName="desmos-plotter"
        repoUrl="https://github.com/gavboi/desmos-plotter"
      />
      <p>
        An HTML file using the Desmos API to help you place and shape arcs with your mouse. 
      </p>
      <h2>Usage</h2>
      <p>
        Add arcs with the buttons at the top of the page, then drag the points to shape
        them before placing them using the place button. The resulting equations
        can then be copied for use elsewhere.
      </p>
      <h2>Limitations</h2>
      <p>
        Uses a (now) outdated version of the Desmos API with the demonstration API key,
        which is not suitable for production use.
      </p>
    </div>
  );
}

export default function NoteAppGitDesmosPlotter() {
  return (
    <Window
      title="Desmos Plotter"
      content={<Content />}
    />
  )
}