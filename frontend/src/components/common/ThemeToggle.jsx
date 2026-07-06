import React from 'react';

export default function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full flex items-center justify-center text-content-sub-light dark:text-content-sub-dark hover:bg-borderline-light dark:hover:bg-borderline-dark transition-colors text-lg"
    >
      <i className={`fa-solid ${isDark ? 'fa-sun text-yellow-400' : 'fa-moon'}`}></i>
    </button>
  );
}
