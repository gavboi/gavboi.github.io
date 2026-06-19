import { useLuckyDiceTheme } from '../../theme';
import classes from './index.module.css';

interface ItemProps {
  name: string;
  details: string;
  cost: number;
  counter: string;
  currentPoints: number;
  onBuy: () => void;
}

export default function ShopItem(
  { name, details, cost, counter, currentPoints, onBuy }: ItemProps
) {
  const { themeStyle } = useLuckyDiceTheme();

  const maxed = cost === undefined;
  const canNotBuy = currentPoints < cost;
  const disabled = maxed || canNotBuy;

  return (
    <div 
      className={`${classes.tile} ${disabled ? classes.disabled : ''}`}
      onClick={disabled ? undefined : onBuy}
      style={themeStyle}
    >
      <div className={classes.titleContainer}>
        <h3 className={classes.titleText}>
          {maxed ? `${name} (Maxed)` : `${name} (${cost} point${cost !== 1 ? 's' : ''})`}
        </h3>
        <p className={classes.detailText}>{details}</p>
      </div>
      <p className={classes.counterText}>{counter}</p>
      </div>
  )
}