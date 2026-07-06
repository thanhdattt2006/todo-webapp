import React, { useState, useRef, useEffect } from 'react';

export default function TaskItem({ task, t, onToggleComplete, onDelete, onUpdate }) {
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

  const isUrgent = task.priority === 'urgent';
  const isCompleted = task.is_completed;

  if (isCompleted) {
    return (
      <div className="relative bg-transparent dark:bg-transparent rounded-[20px] p-5 border border-borderline-light/50 dark:border-borderline-dark/50 opacity-60 grayscale-[30%] hover:opacity-80 transition-opacity duration-300 animate-fade-in-down">
        <div className="flex gap-4 items-center">
          <div>
            <input 
              type="checkbox" 
              className="task-checkbox" 
              checked 
              onChange={() => onToggleComplete(task.id)} 
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-content-sub-light dark:text-content-sub-dark line-through decoration-2 decoration-borderline-light dark:decoration-borderline-dark">
              {task.title}
            </h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-[20px] p-5 border transition-all duration-bounce hover:-translate-y-1 hover:shadow-card-hover group animate-fade-in-down ${isUrgent ? 'bg-priority-urgent/5 dark:bg-priority-urgent/10 shadow-urgent border-priority-urgent/20 dark:border-priority-urgent/30' : 'bg-card-light dark:bg-card-dark shadow-card border-borderline-light dark:border-borderline-dark'}`}>
      {isUrgent && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/2 bg-priority-urgent rounded-r-full"></div>
      )}

      <div className={`flex gap-4 items-start ${isUrgent ? 'pl-2' : ''}`}>
        <div className="pt-1">
          <input 
            type="checkbox" 
            className={`task-checkbox ${isUrgent ? 'border-priority-urgent/50' : ''}`}
            checked={false}
            onChange={() => onToggleComplete(task.id)}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`text-lg leading-tight line-clamp-1 ${isUrgent ? 'font-extrabold text-priority-urgent' : 'font-bold'}`}>
              {task.title}
            </h3>
            
            <div className="flex items-center gap-2">
              {task.is_pinned && (
                <button 
                  onClick={() => onUpdate(task.id, { is_pinned: false })}
                  className={`${isUrgent ? 'text-priority-urgent' : 'text-accent'} opacity-50 hover:opacity-100 transition-opacity p-1`}
                >
                  <i className="fa-solid fa-thumbtack"></i>
                </button>
              )}

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-content-sub-light dark:text-content-sub-dark hover:text-content-main-light dark:hover:text-content-main-dark p-1 rounded-md hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
                >
                  <i className="fa-solid fa-ellipsis-vertical px-2"></i>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card-light dark:bg-card-dark border border-borderline-light dark:border-borderline-dark rounded-xl shadow-card-hover z-20 py-2 animate-fade-in-down">
                    <button 
                      onClick={() => { onUpdate(task.id, { is_pinned: !task.is_pinned }); setIsMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-content-main-light dark:text-content-main-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors flex items-center gap-3"
                    >
                      <i className="fa-solid fa-thumbtack w-4"></i>
                      <span>{task.is_pinned ? (t('menuUnpin') || 'Bỏ ghim') : (t('menuPin') || 'Ghim task')}</span>
                    </button>
                    <button 
                      onClick={() => { 
                        const newTitle = prompt('Cập nhật tên task:', task.title);
                        if (newTitle && newTitle.trim() !== '') {
                          onUpdate(task.id, { title: newTitle.trim() });
                        }
                        setIsMenuOpen(false); 
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-content-main-light dark:text-content-main-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors flex items-center gap-3"
                    >
                      <i className="fa-regular fa-pen-to-square w-4"></i>
                      <span>{t('menuEdit') || 'Chỉnh sửa'}</span>
                    </button>
                    <button 
                      onClick={() => onDelete(task.id)}
                      className="w-full text-left px-4 py-2 text-sm text-priority-urgent hover:bg-priority-urgent/10 transition-colors flex items-center gap-3"
                    >
                      <i className="fa-regular fa-trash-can w-4"></i>
                      <span>{t('menuDelete')}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {task.description && (
            <p className="text-content-sub-light dark:text-content-sub-dark text-sm mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-3 font-mono text-xs font-semibold">
            {isUrgent ? (
              <span className="bg-priority-urgent/10 text-priority-urgent px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <i className="fa-solid fa-fire text-[10px]"></i> URGENT
              </span>
            ) : (
              <span className="bg-priority-medium/10 text-priority-medium dark:text-[#FBBF24] px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-priority-medium dark:bg-[#FBBF24]"></div>
                MEDIUM
              </span>
            )}
            
            <span className="text-content-sub-light dark:text-content-sub-dark flex items-center gap-1.5">
              <i className="fa-regular fa-clock"></i> Today
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
