import React, { useState } from 'react';
import { suggestTopic } from '../services/geminiService.js';

const SparklesIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9 4.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V5.25A.75.75 0 019 4.5zM12.75 8.25a.75.75 0 010 1.5h2.25a.75.75 0 010-1.5H12.75zM9 15a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V15.75A.75.75 0 019 15zM4.5 9a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V9.75A.75.75 0 014.5 9zM15 9a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V9.75A.75.75 0 0115 9zM18.75 8.25a.75.75 0 010 1.5h2.25a.75.75 0 010-1.5H18.75zM12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM3.75 3.75a.75.75 0 00-1.06 1.06l1.06-1.06zM20.25 20.25a.75.75 0 001.06-1.06l-1.06 1.06zM3.75 20.25a.75.75 0 001.06 1.06l-1.06-1.06zM20.25 3.75a.75.75 0 00-1.06-1.06l1.06 1.06z"
      clipRule="evenodd"
    />
  </svg>
);


const SearchOrCreate = ({ theme, onOpenModal, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isRetro = theme === 'retro';

  const handleSuggestClick = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const topic = await suggestTopic();
      setSearchTerm(topic);
    } catch (err) {
      setError('A IA está tirando uma soneca. Tente de novo!');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearchClick = () => {
    onSearch(searchTerm);
  };
  
  const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
          handleSearchClick();
      }
  }

  const sectionClasses = isRetro
    ? 'bg-retro-card border border-retro-border rounded-lg p-6 shadow-md'
    : 'border border-geocities-border p-4 my-8 bg-geocities-card';
  
  const titleClasses = isRetro
    ? 'text-2xl font-bold text-retro-text mb-4 font-verdana'
    : 'text-2xl font-bold text-geocities-title mb-4 pb-2 border-b border-dashed border-geocities-border';

  const inputClasses = isRetro
    ? 'w-full px-4 py-3 bg-white text-retro-text border border-retro-border rounded-md focus:ring-retro-primary focus:border-retro-primary transition'
    : 'w-full px-3 py-2 bg-white text-black border-2 border-inset border-geocities-border focus:outline-none focus:ring-2 focus:ring-geocities-link';

  const createButtonClasses = isRetro
    ? 'px-6 py-3 bg-retro-primary text-white font-bold rounded-md shadow-sm hover:bg-retro-primary-hover transition-colors'
    : 'px-4 py-2 bg-gray-200 text-black border-2 border-outset border-geocities-border hover:bg-gray-300';
  
  const searchButtonClasses = isRetro
    ? 'px-6 py-3 bg-retro-text text-white font-bold rounded-md shadow-sm hover:bg-opacity-90 transition-colors'
    : 'px-4 py-2 bg-gray-700 text-white border-2 border-outset border-geocities-border hover:bg-gray-800';

  const suggestButtonClasses = isRetro
    ? "text-sm text-retro-text/70 hover:text-retro-text"
    : "text-sm text-geocities-link hover:underline"

  return (
    <section className={`my-12 ${sectionClasses}`}>
      <h3 className={titleClasses}>Pesquise ou crie um novo tópico</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ex: Melhor nome para um peixinho dourado..."
          className={`flex-grow ${inputClasses}`}
          aria-label="Pesquisar tópico"
        />
        <button onClick={handleSearchClick} className={searchButtonClasses}>Pesquisar</button>
        <button onClick={onOpenModal} className={createButtonClasses}>Criar tópico</button>
      </div>
       <div className="mt-4 text-center">
        <button
            onClick={handleSuggestClick}
            disabled={isLoading}
            className={`inline-flex items-center gap-2 disabled:opacity-50 transition-colors ${suggestButtonClasses}`}
        >
            <SparklesIcon className="w-5 h-5" />
            {isLoading ? 'A IA está pensando...' : 'Me dê uma ideia, IA!'}
        </button>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
    </section>
  );
};

export default SearchOrCreate;
