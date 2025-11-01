import React from 'react';
import { Theme } from '../types.js';

const Hero = ({ theme, onOpenModal }) => {
  const isRetro = theme === Theme.RETRO;

  const titleClasses = isRetro
    ? 'text-5xl md:text-6xl font-bold text-retro-text'
    : 'text-4xl md:text-5xl font-bold text-geocities-title';

  const subtitleClasses = isRetro
    ? 'mt-4 text-xl md:text-2xl text-retro-text/80 font-verdana'
    : 'mt-4 text-lg md:text-xl text-geocities-text';
    
  const buttonClasses = isRetro
    ? 'mt-8 px-8 py-4 bg-retro-primary text-white font-bold text-lg rounded-lg shadow-lg hover:bg-retro-primary-hover transform hover:scale-105 transition-all'
    : 'mt-8 px-6 py-3 bg-gray-200 text-black border-2 border-outset border-geocities-border hover:bg-gray-300';

  return (
    <section className="text-center py-16 md:py-24">
      <h2 className={titleClasses}>
        Bem-vindo ao Nomemaislegal 😎
      </h2>
      <p className={subtitleClasses}>
        {isRetro 
          ? 'Onde as ideias ganham nomes geniais.'
          : 'Onde as ideias ganham nomes geniais.'
        }
      </p>
      <button onClick={onOpenModal} className={buttonClasses}>
        Criar nova votação
      </button>
    </section>
  );
};

export default Hero;
