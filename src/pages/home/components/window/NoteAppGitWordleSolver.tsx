import Window from '.';
import { NoteAppInfo } from '../item';
import classes from './index.module.css';

function Content() {
  return (
    <div className={classes.text}>
      <NoteAppInfo
        status="complete"
        created={[new Date("2024-05-29")]}
        tags={["Python", "cli", "tool", "no AI"]}
        repoName="wordle-solver"
        repoUrl="https://github.com/gavboi/wordle-solver"
      />
      <p>
        Command line tool that provides good guesses for Wordle and Mastermind.
      </p>
      <h2>Usage</h2>
      <p>
        Guesses are communicated through the CLI via the following code:
      </p>
      <ul>
        <li><b>x</b>: Letter is not present (grey)</li>
        <li><b>c</b>: Letter is present but not in that spot (yellow)</li>
        <li><b>o</b>: Letter is in the correct spot (green)</li>
      </ul>
      <p>
        Run "play.py" to play Wordle (you try and guess a word the computer is thinking of). 
      </p>
      <p>Run "solve.py" to solve Wordles and Masterminds.
        Add "-h" flag to see usage instructions. You can either plug in the guesses
        to another website/board and then manually copy the result back to the tool, or 
        use your mind and have it play against you.
      </p>
      <h2>Limitations</h2>
      <p>
        I created this with my own strategy in mind, with the intention of 
        the same code being able to solve both Wordle and Mastermind. As a result, 
        it is not optimized for either game - it is not the best Wordle solver, and it
        is unable to play very large mastermind games. However, with standard games for both,
        I have always found it to be sufficient to win.
      </p>
    </div>
  );
}

export default function NoteAppGitWordleSolver() {
  return (
    <Window
      title="Wordle (and Mastermind) Solver"
      content={<Content />}
    />
  )
}