function Project({ name, wip=false, details, madeWith, focusPage }) {
  return (
    <div className="item-box">
      <h4>{name} {wip && "(WIP)"}</h4>
      <p>{details}</p>
      <p>Made using: {madeWith.join(", ")}</p>
      <a className="button" href={focusPage} target="_blank">View More</a>
    </div>
  );
}

export default Project;