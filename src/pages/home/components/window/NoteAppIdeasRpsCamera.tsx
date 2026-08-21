import Window from ".";
import { NoteAppInfo } from "../item";
import classes from "./index.module.css";

function Content() {
  return (
    <div className={classes.text}>
      <NoteAppInfo status="idea" tags={["game", "Python"]} />
      <p>
        This will be a game played against a computer with your camera. With
        your hands being watched with the camera, it will determine what you
        "throw" and it will decide what to throw, and determine a winner.
      </p>
      <h2>Goals</h2>
      <ul>
        <li>Use computer vision to detect hand gestures</li>
      </ul>
      <h2>Plan</h2>
      <p>
        Using probably Python and an existing computer vision library (e.g.
        MediaPipe), detect finger/hand positions and find best fit for what is
        "thrown." Then, Have a looping counter that determines when to "throw"
        and then have the computer throw something and determine a winner.
      </p>
    </div>
  );
}

export default function NoteAppIdeasRpsCamera() {
  return <Window title="RPS Camera" content={<Content />} />;
}
