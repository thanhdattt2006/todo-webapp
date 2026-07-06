import React from 'react';

export default function LanguageToggle({ currentLang, toggleLanguage }) {
  return (
    <button
      onClick={toggleLanguage}
      className="w-10 h-10 rounded-full flex items-center justify-center text-content-sub-light dark:text-content-sub-dark hover:bg-borderline-light dark:hover:bg-borderline-dark transition-colors font-mono font-bold text-sm"
    >
      {currentLang.toUpperCase()}
    </button>
  );
}
