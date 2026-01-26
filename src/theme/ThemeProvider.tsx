import React, { createContext, useContext, useState } from 'react';

type ThemeType = 'light' | 'dark' | undefined;

interface Theme {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const ThemeContext = createContext<Theme>({
  theme: undefined,
  setTheme: () => { },
});

type Props = {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<ThemeType>(undefined);

  const handleSetTheme = (theme: ThemeType) => {
    setTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
