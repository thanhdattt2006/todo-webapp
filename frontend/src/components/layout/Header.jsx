import React from 'react';

export default function Header({ isDark, toggleTheme, currentLang, toggleLanguage }) {
  return (
    <header className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-card-light dark:bg-card-dark border border-borderline-light dark:border-borderline-dark flex items-center justify-center shadow-sm transition-transform hover:scale-105 duration-bounce cursor-pointer text-content-main-light dark:text-content-main-dark hover:text-accent dark:hover:text-accent-hover">
          <div className="w-6 h-6 logo-icon transition-colors"></div>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          DaveTask<span className="text-accent">.</span>
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleLanguage}
          className="w-10 h-10 rounded-full flex items-center justify-center text-content-sub-light dark:text-content-sub-dark hover:bg-borderline-light dark:hover:bg-borderline-dark transition-colors font-mono font-bold text-sm"
        >
          {currentLang.toUpperCase()}
        </button>
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full flex items-center justify-center text-content-sub-light dark:text-content-sub-dark hover:bg-borderline-light dark:hover:bg-borderline-dark transition-colors text-lg"
        >
          <i className={`fa-solid ${isDark ? 'fa-sun text-yellow-400' : 'fa-moon'}`}></i>
        </button>
      </div>
    </header>
  );
}
