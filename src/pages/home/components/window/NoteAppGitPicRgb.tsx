import Window from '.';
import { NoteAppInfo } from '../item';
import classes from './index.module.css';

function Content() {
  return (
    <div className={classes.text}>
      <NoteAppInfo
        status="complete"
        created={[new Date("2022-03-22")]}
        tags={["Desmos", "Python", "cli", "tool", "no AI"]}
        repoName="pic-to-rgb"
        repoUrl="https://github.com/gavboi/pic-to-rgb"
      />
      <p>
        An HTML file using the Desmos API to help you place and shape arcs with your mouse. 
      </p>
      <h2>Usage</h2>
      <p>
        Run "convert.py". Supply image path to convert, desired dot width then height of
        result, and format. 
      </p>
      <ul>
        <li><b>For HTML</b>: Open generated "out.html" file.</li>
        <li><b>For Desmos</b>: Due to amount of Desmos functions, the easiest way is to
          use the browser console (Ctrl+Shift+I or CTRL+Shift+J on most browsers). 
          Copy contents of "out.txt" into the console and submit while on Desmos
          graphing calculator. Use "S" slider to adjust dot size.</li>
      </ul>
      <h2>Limitations</h2>
      <p>
        Only uses jpg or png images. Uses pixel subsampling, does not use interpolation,
        filtering, etc.
      </p>
      <h2>Examples</h2>
      <ul>
        <li><a href="https://www.desmos.com/calculator/3wzqhr9vmi" target="_blank" rel="noopener noreferrer">My cat</a></li>
      </ul>
    </div>
  );
}

export default function NoteAppGitPicRgb() {
  return (
    <Window
      title="Pic to RGB"
      content={<Content />}
    />
  )
}