import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import LanguageToggle from '../common/LanguageToggle';
import TrashModal from '../task/TrashModal';
import AchievementModal from '../task/AchievementModal';

export default function Header({ isDark, toggleTheme, currentLang, toggleLanguage }) {
  const [isTrashOpen, setIsTrashOpen] = useState(false);
  const [isAchievementOpen, setIsAchievementOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between mb-10">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link to="/home" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-card-light dark:bg-card-dark border border-borderline-light dark:border-borderline-dark flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 duration-bounce cursor-pointer text-content-main-light dark:text-content-main-dark group-hover:text-accent dark:group-hover:text-accent-hover">
              <div className="w-6 h-6 logo-icon transition-colors"></div>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight group-hover:text-accent transition-colors hidden sm:block">
              DaveTask<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>

        {/* Center: Language & Theme toggles */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center bg-card-light dark:bg-card-dark rounded-full p-1 border border-borderline-light dark:border-borderline-dark shadow-sm">
            <LanguageToggle currentLang={currentLang} toggleLanguage={toggleLanguage} />
            <div className="w-px h-5 bg-borderline-light dark:bg-borderline-dark mx-1"></div>
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex justify-end gap-2">
          <button 
            onClick={() => setIsAchievementOpen(true)}
            className="w-10 h-10 rounded-full bg-card-light dark:bg-card-dark border border-borderline-light dark:border-borderline-dark flex items-center justify-center text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:border-yellow-300 dark:hover:border-yellow-700 transition-all shadow-sm group"
            title="Achievements"
          >
            <i className="fa-solid fa-medal group-hover:scale-110 transition-transform"></i>
          </button>
          
          <button 
            onClick={() => setIsTrashOpen(true)}
            className="w-10 h-10 rounded-full bg-card-light dark:bg-card-dark border border-borderline-light dark:border-borderline-dark flex items-center justify-center text-content-sub-light dark:text-content-sub-dark hover:text-priority-urgent hover:bg-priority-urgent/10 hover:border-priority-urgent/30 transition-all shadow-sm group"
            title="Trash"
          >
            <i className="fa-solid fa-trash-can group-hover:scale-110 transition-transform"></i>
          </button>
        </div>
      </header>

      <TrashModal 
        isOpen={isTrashOpen} 
        onClose={() => setIsTrashOpen(false)} 
        currentLang={currentLang} 
      />
      <AchievementModal 
        isOpen={isAchievementOpen} 
        onClose={() => setIsAchievementOpen(false)} 
        currentLang={currentLang} 
      />
    </>
  );
}
