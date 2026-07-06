import { useState, useCallback } from 'react';
import { dict } from '../locales/i18n';

export const useLanguage = () => {
  const [currentLang, setCurrentLang] = useState('en');

  const toggleLanguage = () => {
    setCurrentLang(prev => prev === 'vi' ? 'en' : 'vi');
  };

  const t = useCallback((key) => {
    return dict[currentLang][key] || key;
  }, [currentLang]);

  return { currentLang, toggleLanguage, t };
};
