import classes from './index.module.css';

export default function InfoWindow() {
  return (
    <div className={classes.root}>
      <p className={classes.text}>
        This is a game about rolling dice. Get points by rolling your lucky number, 
        then buy upgrades to make it come up more often, so you can buy more upgrades...
      </p>
      <p className={classes.text}>
        Each upgrade and unlockable is revealed by specific achievements, 
        and is then purchaseable with points. You cannot do anything that will permanently
        lock you out of an achievement, but you may require resetting your run. 
        Achievement descriptions are revealed once you unlock them.
      </p>
      <p className={classes.text}>
        Loosely inspired by <a 
          href="https://store.steampowered.com/app/3925760/Unfair_Flips/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={classes.link}
        >
          Unfair Flips
        </a>
        .
      </p>
    </div>
  );
}