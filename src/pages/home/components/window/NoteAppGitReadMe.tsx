import Window from '.';
import classes from './index.module.css';

function Content() {
  return (
    <div className={classes.text}>
      <p>
        Each item in this folder is a project that I have made (or am still working on) 
        and uploaded to GitHub. As such, all of these projects are available to view on GitHub,
        so if you are familiar with GitHub, it would make more sense to just look at them there.
      </p>
      <p>
        If you prefer to view them here, I have given descriptions and examples for each project
        written in a less technical way. 
      </p>
    </div>
  );
}

export default function NoteAppGitReadMe() {
  return (
    <Window
      title="README"
      content={<Content />}
    />
  )
}