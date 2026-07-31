import Window from '.';
import { NoteAppInfo } from '../item';
import classes from './index.module.css';

function Content() {
  return (
    <div className={classes.text}>
      <NoteAppInfo
        status="complete"
        created={"2024"}
        tags={["C", "cli", "game script", "no AI"]}
        repoName="sudoku-solver"
        repoUrl="https://github.com/gavboi/sudoku-solver"
      />
      <p>
        This is a command line tool that solves Sudoku puzzles. It takes a puzzle as input
        and algorithmically solves it (as opposed to trial and error), printing the solution 
        to the terminal.
      </p>
      <h2>Usage</h2>
      <p>
        On Windows, you can use the batch file provided to compile the program into
        an executable. If you run it through the command line, you can provide additional
        flags to configure how it runs. After running it, it will prompt you to enter
        the puzzle that you want solved, and then it will print the solution it finds.
      </p>
      <h2>Limitations</h2>
      <p>
        This tool was made quickly and under the self-imposed constraint of not researching
        existing solvers first. As a result, it is unable to perform high-level sudoku-solving 
        techniques, and is limited to simple strategies that I am able to perform 
        manually. Therefore, not every puzzle you provide it can be solved (namely,
        complicated ones).
      </p>
    </div>
  );
}

export default function NoteAppGitSudokuSolver() {
  return (
    <Window
      title="Sudoku Solver"
      content={<Content />}
    />
  )
}