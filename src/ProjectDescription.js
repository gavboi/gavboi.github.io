import { Children } from 'react';

export function ProjectList({ name, children }) {
  return (
    <div className="Project-list">
      <p><b>{name}</b></p>
      {Children.map(children, child => 
        <div>{child}</div>
      )}
    </div>
  );
}

export function Project({ name, wip=false, details, madeWith, focusPage }) {
  return (
    <div className="Item-box">
      <p><b>{name} {wip && "(WIP)"}</b></p>
      <p>{details}</p>
      <p>Made using: {madeWith.join(", ")}</p>
      <a className="App-link" href={focusPage} target="_blank" rel="noreferrer">View More</a>
    </div>
  );
}