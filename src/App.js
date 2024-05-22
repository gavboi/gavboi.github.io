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
      
			<ProjectList name="Summer 2024 Project Marathon">
				<div className="Note-box">
					<p>I wanted to take the summer to develop my skills in various areas before my last year of classes for my Bachelor's degree, so I set myself a challenge to do a new project every week. In this section, you can find each of those projects. I came up with 20 goals for the duration of it, and picked projects that I would find fun, challenging, and would let me reach every goal by the end. The scale of each project depends on how much I felt I needed to do to meet my goals I chose for that project, and how long it took me to do; as I only had a week per project, I was limited in how much I could add.</p>
					
					<p>These are my goals (completed goals are struck out):</p>
					<ul>
						<li><u>Languages</u>: AutoHotKey, <s>C</s>, Java, <s>JavaScript</s>, Python</li> 
						<li><u>Include</u>: email communication, existing AI APIs, my own ML, databases, image recognition, arduino, device-to-device communication</li>
						<li><u>Make</u>: discord bot, mobile app, mod for a game, an actual game/something playable</li>
						<li><u>Purpose</u>: something for me to actually use, something for others to actually use, something silly</li>
					</ul>
				</div>
				<Project
					name="Portfolio Site"
					wip={true}
					details="(May 6 - May 10) I only created this site a few weeks before this in pure HTML/CSS, but I wanted to remake it with React to give it a more modern look and gain some experience with a more commonly used front-end library (if only my graphic design skills looked modern...)."
          madeWith={["GitHub sites, React"]}
					focusPage="https://github.com/gavboi/gavboi.github.io"
				/>
				<Project
					name="Sudoku Solver"
					wip={false}
					details="(May 13 - May 17) I casually enjoy sudoku puzzles, but have always thought it would be cool if I could make something to do them for me... so I did. Nothing too fancy, but gets the job done quick."
          madeWith={["C"]}
					focusPage="https://github.com/gavboi/sudoku-solver"
				/>
				<Project
					name="Voice Command Script"
					wip={true}
					details="(May 21 - May 24) ..."
          madeWith={[]}
					focusPage=""
				/>
				<Project
					name="May 27"
					wip={false}
					details="???"
          madeWith={[]}
					focusPage=""
				/>
				<Project
					name="June 3"
					wip={false}
					details="???"
          madeWith={[]}
					focusPage=""
				/>
			</ProjectList>
			
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
