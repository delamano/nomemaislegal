import React from 'react';
import { Theme } from '../types.js';

const Footer = ({ theme }) => {
  const isRetro = theme === Theme.RETRO;

  const footerClasses = isRetro
    ? 'text-center py-8 mt-12 border-t-2 border-retro-border text-retro-text/70'
    : 'text-center py-6 mt-8 border-t border-geocities-border text-sm';
  
  const linkClasses = isRetro
    ? 'mx-2 hover:underline'
    : 'mx-2 text-geocities-link hover:text-geocities-link-hover';

  const copyrightClasses = isRetro ? 'mt-4' : 'mt-4 text-geocities-text';

  return (
    <footer className={footerClasses}>
      {!isRetro && (
        <div className="mb-4">
           <div className="mt-2 inline-block bg-white border border-geocities-border p-1">
                <span className="font-mono text-xs">VISITORS: 001337</span>
           </div>
        </div>
      )}
      <nav>
        <a href="#about" className={linkClasses}>Sobre</a>
        <a href="#contact" className={linkClasses}>Contato</a>
        <a href="#policy" className={linkClasses}>Política Divertida</a>
      </nav>
      <p className={copyrightClasses}>
        © 2025 Nomemaislegal – Os nomes mais legais da internet.
      </p>
    </footer>
  );
};

export default Footer;
