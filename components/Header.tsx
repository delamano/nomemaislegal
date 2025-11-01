import React from 'react';
import { Theme } from '../types.js';

const Header = ({ theme, setTheme }) => {
  const isRetro = theme === Theme.RETRO;

  const toggleTheme = () => {
    setTheme(isRetro ? Theme.GEOCITIES : Theme.RETRO);
  };
  
  const logoClasses = isRetro
    ? 'text-4xl font-bold text-retro-text'
    : 'text-3xl font-bold text-geocities-text font-georgia';
  
  const headerClasses = isRetro
    ? 'py-6 border-b-2 border-retro-border'
    : 'py-4 border-b-2 border-geocities-border my-2';
  
  const buttonClasses = isRetro
    ? 'px-4 py-2 bg-retro-primary text-white rounded-md shadow-sm hover:bg-retro-primary-hover transition-colors font-verdana text-sm'
    : 'px-3 py-1 bg-gray-200 text-black border-2 border-outset border-geocities-border hover:bg-gray-300 text-sm';
    
  return (
    <header className={`flex items-center justify-between ${headerClasses}`}>
      <h1 className={logoClasses}>Nomemaislegal</h1>
      <button onClick={toggleTheme} className={buttonClasses}>
        <span className="hidden sm:inline">
            {isRetro ? 'Ver em modo "Web 1.0"' : 'Voltar ao "Blog 2000s"'}
        </span>
        <span className="sm:hidden">
            {isRetro ? 'Web 1.0' : 'Blog'}
        </span>
      </button>
    </header>
  );
};

export default Header;
