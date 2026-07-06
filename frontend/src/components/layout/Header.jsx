import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import LanguageToggle from '../common/LanguageToggle';

export default function Header({ isDark, toggleTheme, currentLang, toggleLanguage }) {
  return (
    <header className="flex items-center justify-between mb-10">
      <Link to="/home" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-xl bg-card-light dark:bg-card-dark border border-borderline-light dark:border-borderline-dark flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 duration-bounce cursor-pointer text-content-main-light dark:text-content-main-dark group-hover:text-accent dark:group-hover:text-accent-hover">
          <div className="w-6 h-6 logo-icon transition-colors"></div>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight group-hover:text-accent transition-colors">
          DaveTask<span className="text-accent">.</span>
        </h1>
      </Link>
      <div className="flex items-center gap-2">
        <LanguageToggle currentLang={currentLang} toggleLanguage={toggleLanguage} />
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
}
