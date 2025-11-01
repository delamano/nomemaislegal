import React, { useState, useEffect } from 'react';
import { Theme } from '../types.js';

const CreatePollModal = ({ isOpen, onClose, onSubmit, theme }) => {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      // Reset form state on close
      setTitle('');
      setOptions(['', '']);
      setError(null);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    if (options.length < 10) { // Limit options
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) { // Minimum 2 options
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('O título do tópico é obrigatório.');
      return;
    }
    const filledOptions = options.map(o => o.trim()).filter(o => o !== '');
    if (filledOptions.length < 2) {
      setError('São necessárias pelo menos duas opções preenchidas.');
      return;
    }
    
    onSubmit({ title: title.trim(), options: filledOptions });
  };

  const isRetro = theme === Theme.RETRO;

  const modalOverlayClasses = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  const modalContentClasses = isRetro
    ? 'bg-retro-card p-8 rounded-lg shadow-2xl w-full max-w-lg m-4'
    : 'bg-geocities-card border-4 border-double border-geocities-border p-6 w-full max-w-lg m-4';
  const titleClasses = isRetro
    ? 'text-2xl font-bold text-retro-text mb-6 font-verdana'
    : 'text-2xl font-bold text-geocities-title mb-6';
  const inputClasses = isRetro
    ? 'w-full px-4 py-2 bg-white text-retro-text border border-retro-border rounded-md focus:ring-retro-primary focus:border-retro-primary'
    : 'w-full px-3 py-2 bg-white text-black border-2 border-inset border-geocities-border';
  const primaryButtonClasses = isRetro
    ? 'px-6 py-2 bg-retro-primary text-white font-bold rounded-md shadow-sm hover:bg-retro-primary-hover'
    : 'px-4 py-2 bg-gray-200 text-black border-2 border-outset border-geocities-border hover:bg-gray-300';
  const secondaryButtonClasses = isRetro
    ? 'px-6 py-2 bg-transparent text-retro-text hover:bg-retro-bg rounded-md'
    : 'px-4 py-2 text-geocities-link hover:underline';

  return (
    <div className={modalOverlayClasses} onClick={onClose} role="dialog" aria-modal="true">
      <div className={modalContentClasses} onClick={(e) => e.stopPropagation()}>
        <h3 className={titleClasses}>Criar Nova Votação</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="poll-title" className="block text-sm font-bold mb-2">Título do Tópico</label>
            <input
              id="poll-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Qual o melhor nome para...?"
              className={inputClasses}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Opções de Voto</label>
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Opção ${index + 1}`}
                    className={`flex-grow ${inputClasses}`}
                  />
                  {options.length > 2 && (
                    <button type="button" onClick={() => handleRemoveOption(index)} className="text-red-500 hover:text-red-700 font-bold text-xl">&times;</button>
                  )}
                </div>
              ))}
            </div>
            {options.length < 10 && (
                <button type="button" onClick={handleAddOption} className={`mt-2 text-sm ${isRetro ? 'text-retro-primary hover:underline' : 'text-geocities-link hover:underline'}`}>
                + Adicionar opção
              </button>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className={secondaryButtonClasses}>
              Cancelar
            </button>
            <button type="submit" className={primaryButtonClasses}>
              Publicar Votação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePollModal;
