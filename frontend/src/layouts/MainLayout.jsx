import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import { Toaster } from 'react-hot-toast';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

export default function MainLayout() {
  const { isDark, toggleTheme } = useTheme();
  const { currentLang, toggleLanguage } = useLanguage();

  return (
    <>
      <div className="ambient-glow"></div>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 relative z-10">
        <Header 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
          currentLang={currentLang} 
          toggleLanguage={toggleLanguage} 
        />
        
        <Outlet />
        
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            className: 'dark:bg-card-dark dark:text-content-main-dark border dark:border-borderline-dark',
          }}
          containerStyle={{ zIndex: 999999 }}
        />
      </main>
    </>
  );
}
