import React from 'react';
import { Theme } from '../types.js';
import PollItem from './PollItem.js';

const PopularPolls = ({ theme, polls, onVote, userVotes, filterTerm }) => {
  const isRetro = theme === Theme.RETRO;

  const sectionClasses = isRetro
    ? 'bg-retro-card border border-retro-border rounded-lg p-6 shadow-md'
    : 'border border-geocities-border p-4 my-8 bg-geocities-card';

  const titleClasses = isRetro
    ? 'text-2xl font-bold text-retro-text mb-6 font-verdana'
    : 'text-2xl font-bold text-geocities-title mb-4 pb-2 border-b border-dashed border-geocities-border';

  const linkClasses = isRetro
    ? 'text-retro-primary hover:underline mt-6 inline-block'
    : 'text-geocities-link hover:text-geocities-link-hover mt-4 inline-block';

  const noResultsTextClasses = isRetro ? 'text-retro-text/80' : 'text-geocities-text';

  return (
    <section className={`mb-12 ${sectionClasses}`}>
      <h3 className={titleClasses}>Votações em alta agora</h3>
      
      {polls.length > 0 ? (
        <div className="space-y-6">
          {polls.map((poll) => (
            <PollItem key={poll.id} poll={poll} theme={theme} onVote={onVote} userVote={userVotes[poll.id]} />
          ))}
        </div>
      ) : filterTerm.trim() ? (
        <div className={`text-center py-8 ${noResultsTextClasses}`}>
          <p>Nenhum resultado encontrado para <span className="font-bold">"{filterTerm}"</span>.</p>
          <p className="mt-2">Que tal criar um novo tópico sobre isso?</p>
        </div>
      ) : null}

      <div className="text-center">
        <a href="#all" className={linkClasses}>
          Ver todas as votações &rarr;
        </a>
      </div>
    </section>
  );
};

export default PopularPolls;
