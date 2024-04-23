import Project from './ProjectDescription.js';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="Project-list">
        <Project
          name="Secret Santa Helper"
          wip={true}
          details="This tool allows groups to create Secret Santa-style assignments, such that everyone is able to participate - even the person using the tool! Assignments are made automatically, can be set to avoid assignments between specific people or assignments from previous years, and can be sent out automatically by email."
          madeWith={["Python"]}
          focusPage="https://github.com/gavboi/secret-santa"
        />
      </div>
    </div>
  );
}

export default App;
