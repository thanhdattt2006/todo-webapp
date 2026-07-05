import { useState, useCallback } from 'react';
import { dict } from '../utils/i18n';

export const useLanguage = () => {
  const [currentLang, setCurrentLang] = useState('vi');

  const toggleLanguage = () => {
    setCurrentLang(prev => prev === 'vi' ? 'en' : 'vi');
  };

  const t = useCallback((key) => {
    return dict[currentLang][key] || key;
  }, [currentLang]);

  return { currentLang, toggleLanguage, t };
};
