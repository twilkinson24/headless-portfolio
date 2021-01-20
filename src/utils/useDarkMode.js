import { useEffect, useState } from 'react';
import { setGlobal } from 'reactn';

export default function useDarkMode() {
  const [theme, setTheme] = useState('dark');
  const [componentMounted, setComponentMounted] = useState(false);

  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
      };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
      setGlobal({
        darkMode: true 
      });
    } else {
      setMode('light');
      setGlobal({
        darkMode: false 
      });
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');

     !localTheme
      ? setMode('dark')
      : localTheme
        ? setTheme(localTheme)
        : setMode('dark');

    setComponentMounted(true);
  }, []);

  return [theme, toggleTheme, componentMounted];
}
