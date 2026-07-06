import React, { useState, useRef, useEffect } from 'react';

export default function TaskItemMenu({ task, t, onTogglePin, onEdit, onDelete }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-2">
      {task.is_pinned && (
        <button 
          onClick={() => onTogglePin(task.id)}
          className={`${task.priority === 'urgent' ? 'text-priority-urgent' : 'text-accent'} opacity-50 hover:opacity-100 transition-opacity p-1`}
        >
          <i className="fa-solid fa-thumbtack"></i>
        </button>
      )}

      <div className="relative" ref={menuRef}>
        <button
          onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
          className="text-content-sub-light dark:text-content-sub-dark hover:text-content-main-light dark:hover:text-content-main-dark p-1 rounded-md hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
        >
          <i className="fa-solid fa-ellipsis-vertical px-2"></i>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-card-light dark:bg-card-dark border border-borderline-light dark:border-borderline-dark rounded-xl shadow-card-hover z-20 py-2 animate-fade-in-down">
            <button 
              onClick={(e) => { e.stopPropagation(); onTogglePin(task.id); setIsMenuOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm text-content-main-light dark:text-content-main-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors flex items-center gap-3"
            >
              <i className="fa-solid fa-thumbtack w-4"></i>
              <span>{task.is_pinned ? (t('menuUnpin') || 'Bỏ ghim') : (t('menuPin') || 'Ghim task')}</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(); setIsMenuOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm text-content-main-light dark:text-content-main-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors flex items-center gap-3"
            >
              <i className="fa-regular fa-pen-to-square w-4"></i>
              <span>{t('menuEdit') || 'Chỉnh sửa'}</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(); setIsMenuOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm text-priority-urgent hover:bg-priority-urgent/10 transition-colors flex items-center gap-3"
            >
              <i className="fa-regular fa-trash-can w-4"></i>
              <span>{t('menuDelete') || 'Xóa'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
