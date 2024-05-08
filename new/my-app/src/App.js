import {Project, ProjectList} from './ProjectDescription.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <p>
          Hi, my name is Gavin and welcome to my page! I'm a Software Engineering student with a passion for coding. Here, I have a highlight of some of the personal projects I've done. All projects can also be found through <a className="App-link" href="https://www.github.com/gavboi" target="_blank" rel="noreferrer">my GitHub profile</a>.
        </p>
      </div>
      
      <ProjectList name="Small Tools">
        <Project
          name="Secret Santa Helper"
          wip={true}
          details="This tool allows groups to create Secret Santa-style assignments, such that everyone is able to participate - even the person using the tool! Assignments are made automatically, can be set to avoid assignments between specific people or assignments from previous years, and can be sent out automatically by email."
          madeWith={["Python"]}
          focusPage="https://github.com/gavboi/secret-santa"
        />
        <Project
          name="Window Tweaks"
          wip={false}
          details="This tool allows pretty much any window to be set to always stay on top, or to become semi-transparent. I use it occasionally to keep a notepad on top so I can read the contents, but transparent so I can still see beneath it as well."
          madeWith={["AutoHotKey"]}
          focusPage="https://github.com/gavboi/window-tweaks"
        />
      </ProjectList>
      
      <ProjectList name="Gaming-related Projects">
        <Project
          name="Bloons TD6 Farming Script"
          wip={true}
          details="This script repeatedly plays the game and wins, so that you can level up your in-game characters (monkeys) and earn in-game money as well as experience."
          madeWith={["AutoHotKey"]}
          focusPage="https://github.com/gavboi/btd6-farming"
        />
      </ProjectList>
      
      <ProjectList name="Desmos-related Projects">
        <Project
          name="Desphone"
          wip={false}
          details="In the Desmos web graphing calculator, I created a mock smartphone. The user is able to interact with it to play games, solve puzzles, draw, and use a calculator amongst other things. "
          madeWith={["Desmos Graphing Calculator"]}
          focusPage="https://www.desmos.com/calculator/4j4k0kyocl"
        />
        <Project
          name="Desmos Plotter"
          wip={false}
          details="If you want to have the equation of a line with a very specific shape, this tool lets you place and drag lines to shape them as needed so that you can simply copy the resulting equation."
          madeWith={["HTML", "Desmos API"]}
          focusPage="https://github.com/gavboi/desmos-plotter"
        />
        <Project
          name="Picture to Dots"
          wip={false}
          details="This script takes an image and returns a bunch of dots, that can either be viewed in an HTML page in a table or in Desmos as points."
          madeWith={["Python", "HTML"]}
          focusPage="https://github.com/gavboi/pic-to-rgb"
        />
      </ProjectList>
      
      <div className="App-header">
        <p>
          This site was made by me and my trusty copy of Notepad++, and is still very much under construction&nbsp;&#128736;
        </p>
      </div>
    </div>
  );
}

export default App;
