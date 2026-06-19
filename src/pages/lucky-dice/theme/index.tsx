import { createContext, CSSProperties, useContext, useEffect, useState, type ReactNode } from 'react';
import { LUCKY_DICE_THEMES } from '../constants';
import { Theme, ThemeName } from '../types';


type LuckyDiceThemeContext = {
  themeName: ThemeName;
  setThemeName: (themeName: ThemeName) => void;
  themeStyle: CSSProperties;
};

const LuckyDiceThemeContext = createContext<LuckyDiceThemeContext | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function LuckyDiceThemeProvider({ children }: Props) {
  const [themeName, setThemeName] = useState<ThemeName>('blue');
  const [themeStyle, setThemeStyle] = useState<CSSProperties>({} as CSSProperties);
  const theme = LUCKY_DICE_THEMES[themeName];

  useEffect(() => {
    setThemeStyle({
      '--background': theme.background,
      '--onBackground': theme.onBackground,
      '--surface': theme.surface,
      '--onSurface': theme.onSurface,
      '--primary': theme.primary,
      '--onPrimary': theme.onPrimary,
      '--primaryContainer': theme.primaryContainer,
      '--onPrimaryContainer': theme.onPrimaryContainer,
      '--secondary': theme.secondary,
      '--onSecondary': theme.onSecondary,
    } as CSSProperties);
  }, [themeName]);

  return (
    <LuckyDiceThemeContext.Provider
      value={{
        themeName,
        setThemeName,
        themeStyle,
      }}
    >
      {children}
    </LuckyDiceThemeContext.Provider>
  );
}

export function useLuckyDiceTheme() {
  const context = useContext(LuckyDiceThemeContext);

  if (!context) {
    throw new Error('useLuckyDiceTheme must be used within a LuckyDiceThemeProvider');
  }

  return context;
}