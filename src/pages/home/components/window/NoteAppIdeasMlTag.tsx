import Window from ".";
import { NoteAppInfo } from "../item";
import classes from "./index.module.css";

function Content() {
  return (
    <div className={classes.text}>
      <NoteAppInfo status="idea" tags={["game", "Python"]} />
      <p>
        This will be a game of freeze tag that you can either watch as a
        simulation, or play as a player alongside AI players. There will be two
        difficulty levels: one with manually coded behaviour as a benchmark, and
        one trained with a machine learning model.
      </p>
      <p>
        Freeze tag is a variation of tag consisting of two unchanging teams:
        those who are "it" (taggers) and those who are not (runners). Typically
        the tagging team is only one or two players, but it can be more,
        although should be less than the amount of runners for balanced play.
        Taggers must try to tag runners, and runners must try to avoid being
        tagged by them. When a runner is tagged, they can no longer move
        ("frozen") until another runner tags them, which lets them move again
        ("unfreezes them"). Taggers win by freezing all runners simultaneously,
        and runners win if this is not done in a set amount of time.
      </p>
      <h2>Goals</h2>
      <ul>
        <li>
          Train a machine learning model (in something that I have not seen
          before, but is also not prohibitively complex or trivially simple)
        </li>
        <li>
          Create a game with competent AI that works better than a simple
          manually-coded AI
        </li>
        <li>See how large of a simulated game I can run</li>
      </ul>
      <h2>Plan</h2>
      <ol>
        <li>
          Create a playable freeze tag game in Python with a UI library like
          PyGame with a simple manually-coded AI for testing.
        </li>
        <li>
          Using probably Python and an existing ML library (e.g. Scikit-learn,
          which I have tested years ago) train a machine learning model to play
          the game as either team and add it as an additional difficulty level.
        </li>
        <li>
          Attempt to add "cops and robbers" mode; should be doable with no
          change to AI, just requiring all tagged players to be teleported to
          the same location.
        </li>
      </ol>
    </div>
  );
}

export default function NoteAppIdeasMlTag() {
  return <Window title="ML Freeze Tag" content={<Content />} />;
}
