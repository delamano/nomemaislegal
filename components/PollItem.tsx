import React from 'react';
import { Theme } from '../types.js';

const PollItem = ({ poll, theme, onVote, userVote }) => {
  const isRetro = theme === Theme.RETRO;
  
  const pollQuestionClasses = isRetro
    ? 'font-bold text-lg text-retro-text mb-3'
    : 'font-bold text-lg text-geocities-text mb-3';
    
  const optionButtonClasses = isRetro
    ? 'w-full text-left p-3 border border-retro-border rounded-md hover:bg-retro-bg transition-colors'
    : 'w-full text-left p-2 border border-geocities-border bg-white hover:bg-gray-100';
    
  const progressBarBgClasses = isRetro ? 'bg-retro-progress-bg' : 'bg-geocities-progress-bg';
  const progressBarFillClasses = isRetro ? 'bg-retro-progress-fill' : 'bg-geocities-progress-fill';
  const voteTextClasses = isRetro ? 'text-retro-text/80' : 'text-geocities-text/90';

  return (
    <div className="w-full">
      <h4 className={pollQuestionClasses}>{poll.question}</h4>
      <div className="space-y-2">
        {poll.options.map(option => {
          const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0;
          const isSelected = userVote === option.id;

          const retroSelectedClasses = 'border-retro-primary ring-2 ring-retro-primary/50';
          const geocitiesSelectedClasses = 'border-geocities-link border-2';
          const selectedClasses = isSelected ? (isRetro ? retroSelectedClasses : geocitiesSelectedClasses) : '';

          return (
            <button key={option.id} onClick={() => onVote(poll.id, option.id)} className={`${optionButtonClasses} ${selectedClasses}`}>
              <div className="flex justify-between items-center text-sm">
                <span>{option.text}</span>
                <span className={voteTextClasses}>{option.votes} votos</span>
              </div>
              <div className={`w-full h-2 rounded-full mt-1.5 overflow-hidden ${progressBarBgClasses}`}>
                <div 
                  className={`h-full rounded-full ${progressBarFillClasses} transition-all duration-500 ease-out`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PollItem;
