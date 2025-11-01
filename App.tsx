import React, { useState, useMemo } from 'react';
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import PopularPolls from './components/PopularPolls.js';
import SearchOrCreate from './components/SearchOrCreate.js';
import Footer from './components/Footer.js';
import CreatePollModal from './components/CreatePollModal.js';
import { Theme } from './types.js';
import { POPULAR_POLLS } from './constants.js';

const App = () => {
  const [theme, setTheme] = useState(Theme.RETRO);
  const [polls, setPolls] = useState(POPULAR_POLLS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userVotes, setUserVotes] = useState({});
  const [filterTerm, setFilterTerm] = useState('');

  const themeClasses = useMemo(() => {
    if (theme === Theme.GEOCITIES) {
      return 'font-georgia bg-geocities-bg text-geocities-text';
    }
    return 'font-georgia bg-retro-bg text-retro-text';
  }, [theme]);

  const displayedPolls = useMemo(() => {
    if (!filterTerm.trim()) {
      return polls;
    }
    return polls.filter(poll =>
      poll.question.toLowerCase().includes(filterTerm.toLowerCase())
    );
  }, [polls, filterTerm]);

  const handleVote = (pollId, optionId) => {
    const previousVoteOptionId = userVotes[pollId];

    if (previousVoteOptionId === optionId) {
      return;
    }

    setPolls(prevPolls =>
      prevPolls.map(poll => {
        if (poll.id === pollId) {
          const newTotalVotes = previousVoteOptionId === undefined ? poll.totalVotes + 1 : poll.totalVotes;

          const newOptions = poll.options.map(option => {
            if (option.id === optionId) {
              return { ...option, votes: option.votes + 1 };
            }
            if (option.id === previousVoteOptionId) {
              return { ...option, votes: Math.max(0, option.votes - 1) };
            }
            return option;
          });

          return { ...poll, options: newOptions, totalVotes: newTotalVotes };
        }
        return poll;
      })
    );

    setUserVotes(prevVotes => ({
      ...prevVotes,
      [pollId]: optionId,
    }));
  };

  const handleAddPoll = (newPoll) => {
    const newPollWithOptions = {
      id: Date.now(),
      question: newPoll.title,
      totalVotes: 0,
      options: newPoll.options.map((optionText, index) => ({
        id: index,
        text: optionText,
        votes: 0,
      })),
    };
    setPolls(prevPolls => [newPollWithOptions, ...prevPolls]);
    setIsModalOpen(false);
  };

  const handleSearch = (term) => {
    setFilterTerm(term);
  };

  const searchStatusContainerClasses = theme === Theme.RETRO
    ? 'bg-retro-card border border-retro-border rounded-lg p-3 shadow-sm'
    : 'border border-geocities-border p-3 bg-geocities-card';
    
  const clearButtonClasses = theme === Theme.RETRO
    ? 'text-retro-primary hover:underline'
    : 'text-geocities-link hover:underline';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${themeClasses}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
        <Header theme={theme} setTheme={setTheme} />
        <main className="flex-grow">
          <Hero theme={theme} onOpenModal={() => setIsModalOpen(true)} />
          <div className="max-w-4xl mx-auto">
            {filterTerm.trim() && (
              <div className={`mb-6 flex justify-between items-center ${searchStatusContainerClasses}`}>
                <p className="text-sm italic">
                    Resultados para: <span className="font-bold">"{filterTerm}"</span>
                </p>
                <button onClick={() => setFilterTerm('')} className={`text-sm font-bold ${clearButtonClasses}`}>
                    Limpar busca
                </button>
              </div>
            )}
            <PopularPolls 
              theme={theme} 
              polls={displayedPolls} 
              onVote={handleVote} 
              userVotes={userVotes}
              filterTerm={filterTerm}
            />
            <SearchOrCreate 
              theme={theme} 
              onOpenModal={() => setIsModalOpen(true)}
              onSearch={handleSearch}
            />
          </div>
        </main>
        <Footer theme={theme} />
      </div>
      <CreatePollModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPoll}
        theme={theme}
      />
    </div>
  );
};

export default App;
