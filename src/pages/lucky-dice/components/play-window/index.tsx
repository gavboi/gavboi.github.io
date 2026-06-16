import Die from '../die';
import classes from './index.module.css';

interface PlayProps {
  notices: string[];
  handleRollResult: (arg0: number) => void;
}

export default function PlayWindow(
  { notices, handleRollResult }: PlayProps
) {
  return (
    <div className={classes.playRoot}>
      <div className={classes.dice}>
        <Die handleResult={handleRollResult} />
      </div>
      <div className={classes.notices}>
        {notices}
      </div>
    </div>
  );
}