// src/context/ThemeContext.jsx

import { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const ThemeContext = createContext();

// ThemeProvider component to wrap your app
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Optional: save theme in localStorage so it remembers the user's preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('app-theme');
    if (storedTheme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use the ThemeContext in other components
export const useTheme = () => useContext(ThemeContext);
