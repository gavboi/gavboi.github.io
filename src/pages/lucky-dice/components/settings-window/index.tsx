import type { CSSProperties } from 'react';
import classes from './index.module.css';
import { LUCKY_DICE_THEMES } from '../../constants';
import { useLuckyDiceTheme } from '../../theme';
import { Theme, ThemeName } from '../../types';

interface SettingsWindowProps {
  wipeSave: () => void;
  restartGame: () => void;
  restartGameHardMode: null | (() => void);
}

export default function SettingsWindow(
  { wipeSave, restartGame, restartGameHardMode }: SettingsWindowProps
) {
  const { themeStyle, themeName, setThemeName } = useLuckyDiceTheme();

  return (
    <div className={classes.root} style={themeStyle}>
      <h3 className={classes.title}>Theme</h3>
      <div className={classes.themeList}>
        {(Object.entries(LUCKY_DICE_THEMES) as Array<[ThemeName, Theme]>).map(([key, theme]) => (
          <button
            key={key}
            type="button"
            className={`${classes.themeButton} ${themeName === key ? classes.themeButtonSelected : ''}`}
            onClick={() => setThemeName(key)}
            style={{
              '--theme-primary': theme.primary,
              '--theme-on-primary': theme.onPrimary,
              '--theme-secondary': theme.secondary,
            } as CSSProperties}
          >
            <span className={classes.themeName}>{key[0].toUpperCase() + key.slice(1)}</span>
            <span className={classes.themePreview}>Aa</span>
          </button>
        ))}
      </div>
      <h3 className={classes.title}>Game Data</h3>
      <button className={classes.restartButton} onClick={restartGame}>
        Restart Game
      </button>
      {restartGameHardMode && (
        <button className={classes.restartButton} onClick={restartGameHardMode}>
          Restart Game (Hard Mode)
        </button>
      )}
      <button className={`${classes.restartButton} ${classes.wipeButton}`} onClick={wipeSave}>
        Delete All Game Data
      </button>
    </div>
  );
}