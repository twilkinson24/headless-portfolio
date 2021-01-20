// import { Link } from "gatsby";
import React, { useEffect } from "react";

// Components 
import MainNavMenu from './main-nav-menu';

// Images
import SVGAnimated from '../assets/images/steven-orechow-creative-icon.svg';
import Moon from '../assets/images/icons/moon.svg';
import Sun from '../assets/images/icons/sun.svg';

// Utils
import useDarkMode from '../utils/useDarkMode';

function Header() {
  const [theme, toggleTheme] = useDarkMode();

  useEffect(() => {
    const defaultElement = window.document.body;
    const classNameDark = 'dark-mode';
    const classNameLight = 'light-mode';
    
    defaultElement.classList.add(theme === 'dark' ? classNameDark : classNameLight);
    defaultElement.classList.remove(theme === 'dark' ? classNameLight : classNameDark);
  }, [theme]);

  return (
    <header className="container">
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 py-8 md:px-0 md:py-8">
        <a href="https://stevenorechow.me" className="block w-12">
          <span className="sr-only">Home</span>
          <SVGAnimated className="header-logo" />
        </a>
        <div className="flex justify-end w-1/2 sm:w-full max-w-sm">
          <MainNavMenu />
          
          <div className="flex justify-center items-center">
            <button
              onClick={() => toggleTheme(!theme)}
              aria-label={
                theme === 'light'
                  ? 'Activate light mode'
                  : 'Activate dark mode'
              }
              className="mode z-20"
              id="dark-mode-btn"
              >
              {theme === 'light' ? <Moon /> : <Sun />}
              <span className="sr-only">Toggle Light and Dark Mode</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
