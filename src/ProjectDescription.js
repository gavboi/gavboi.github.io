import { Children } from 'react';

export function ProjectList({ name, children }) {
  return (
    <div className="Large-box">
      <p><b>{name}</b></p>
			<div className="Project-list">
				{Children.map(children, child => 
					<div>{child}</div>
				)}
			</div>
    </div>
  );
}

export function Project({ name, wip=false, details, madeWith, focusPage="" }) {
  return (
    <div className="Project-box">
      <p><b>{name} {wip && "(WIP)"}</b></p>
      <p>{details}</p>
			{madeWith.length > 0 && <p>Made using: {madeWith.join(", ")}</p>}
			{focusPage !== "" && <a className="App-link" href={focusPage} target="_blank" rel="noreferrer">View More</a>}
    </div>
  );
}