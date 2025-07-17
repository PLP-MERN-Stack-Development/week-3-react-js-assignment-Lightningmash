// src/components/ThemeSwitcher/ThemeSwitcher.jsx
import React from 'react';
import useTheme from '../hooks/useTheme';
import Button from './Button';


const ThemeSwitcher = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="flex justify-end mb-4">
      <Button
        variant={theme === 'light' ? 'primary' : 'secondary'}
        onClick={toggleTheme}
      >
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </Button>
    </div>
  );
};

export default ThemeSwitcher;