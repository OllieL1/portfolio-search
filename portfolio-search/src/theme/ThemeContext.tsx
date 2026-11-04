"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
});

const QUERY = '(prefers-color-scheme: dark)';

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia(QUERY).matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

// Starts from the system theme. The user can flip it for the current visit;
// nothing is persisted, so a reload goes back to the system theme.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const userChose = useRef(false);

  useEffect(() => {
    const initial = getSystemTheme();
    setThemeState(initial);
    applyTheme(initial);

    // Follow system changes until the user picks a theme themselves
    const mql = window.matchMedia(QUERY);
    const handleChange = () => {
      if (userChose.current) return;
      const next = getSystemTheme();
      setThemeState(next);
      applyTheme(next);
    };
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    userChose.current = true;
    setThemeState(next);
    applyTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    userChose.current = true;
    setThemeState(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
