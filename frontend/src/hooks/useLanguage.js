import { useState, useCallback, useEffect } from 'react';
import { dict } from '../locales/i18n';

export const useLanguage = () => {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('app_lang') || 'vi';
  });

  useEffect(() => {
    const handleLanguageChange = (e) => {
      setCurrentLang(e.detail);
    };
    window.addEventListener('language-changed', handleLanguageChange);
    return () => window.removeEventListener('language-changed', handleLanguageChange);
  }, []);

  const toggleLanguage = () => {
    const newLang = currentLang === 'vi' ? 'en' : 'vi';
    localStorage.setItem('app_lang', newLang);
    window.dispatchEvent(new CustomEvent('language-changed', { detail: newLang }));
  };

  const t = useCallback((key) => {
    return dict[currentLang]?.[key] || dict['vi'][key] || key;
  }, [currentLang]);

  return { currentLang, toggleLanguage, t };
};
