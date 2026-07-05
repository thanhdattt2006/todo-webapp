import React from 'react';

export default function EmptyState({ t }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in-down">
      <div className="w-24 h-24 bg-surface-light dark:bg-surface-dark rounded-full flex items-center justify-center mb-6 shadow-card">
        <i className="fa-solid fa-mug-hot text-4xl text-content-sub-light dark:text-content-sub-dark opacity-50"></i>
      </div>
      <h3 className="text-lg font-bold mb-2">{t('emptyTitle')}</h3>
      <p className="text-content-sub-light dark:text-content-sub-dark text-sm max-w-xs">
        {t('emptyDesc')}
      </p>
    </div>
  );
}
