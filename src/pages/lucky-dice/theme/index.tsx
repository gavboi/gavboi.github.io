import { createContext, CSSProperties, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { DEFAULT_LUCKY_DICE_THEME, LUCKY_DICE_THEMES } from '../constants';
import { Theme, ThemeName } from '../types';
import { LUCKY_DICE_THEME_SAVE_KEY } from '../components/store/saveObj';


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
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_LUCKY_DICE_THEME);
  const [themeStyle, setThemeStyle] = useState<CSSProperties>({} as CSSProperties);
  const [loadTime, setLoadTime] = useState<number>(Date.now());
  const theme: Theme = LUCKY_DICE_THEMES[themeName];

  const saveThemeState = () => {
    localStorage.setItem(LUCKY_DICE_THEME_SAVE_KEY, JSON.stringify(themeName));
    console.debug("Theme state saved to localStorage");
  };

  const loadThemeState = () => {
    const raw = localStorage.getItem(LUCKY_DICE_THEME_SAVE_KEY);
    if (!raw) return;

    try {
      const savedThemeName = JSON.parse(raw) as ThemeName;
      if (savedThemeName in LUCKY_DICE_THEMES) {
        setThemeName(savedThemeName);
        console.debug("Theme state loaded from localStorage");
        return;
      }
    } catch {
      // ignore
    }

    setThemeName(DEFAULT_LUCKY_DICE_THEME);
    console.debug("No valid theme state found in localStorage, using default theme");
  }

  useEffect(() => {
    loadThemeState();
    setLoadTime(Date.now());
  }, []);

  useEffect(() => {
    if (Date.now() > loadTime + 100) {
      saveThemeState();
    }
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
        themeName: themeName === null ? DEFAULT_LUCKY_DICE_THEME : themeName,
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