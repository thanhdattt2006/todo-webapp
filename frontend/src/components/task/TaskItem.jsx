import React, { useState, useRef, useEffect } from 'react';
import TaskModal from '../common/TaskModal';
import ConfirmDialog from '../common/ConfirmDialog';
import toast from 'react-hot-toast';

export default function TaskItem({ task, t, onToggleComplete, onDelete, onUpdate, onTogglePin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmCompleteOpen, setIsConfirmCompleteOpen] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
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
  const isCompleted = task.completed;

  const handleToggle = () => {
    if (isCompleted) {
      handleConfirmComplete();
    } else {
      setIsConfirmCompleteOpen(true);
    }
  };

  const handleConfirmComplete = async () => {
    setIsToggling(true);
    await onToggleComplete(task.id);
    setIsToggling(false);
    
    if (!isCompleted) {
      toast.custom((t_toast) => (
        <div className={`${t_toast.visible ? 'animate-fade-in-down' : 'animate-fade-out-up'} max-w-md w-full bg-yellow-50 dark:bg-yellow-900/40 shadow-lg rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 border border-yellow-200 dark:border-yellow-700/50 p-4`}>
          <div className="flex-1 w-0 p-2">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <i className="fa-solid fa-trophy text-yellow-500 text-3xl drop-shadow-md"></i>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-bold text-yellow-800 dark:text-yellow-200">
                  🎉 Thành tựu mới!
                </p>
                <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
                  <span className="font-semibold">{task.title}</span> đã được chinh phục!
                </p>
              </div>
            </div>
          </div>
        </div>
      ), { duration: 4000 });
    }
  };

  if (isCompleted) {
    return (
      <div className="relative bg-surface-light/30 dark:bg-surface-dark/30 rounded-[20px] p-5 border border-borderline-light/50 dark:border-borderline-dark/50 hover:opacity-80 transition-all duration-300 animate-fade-in-down group flex gap-4 items-start shadow-sm">
        <div className="pt-1">
          <button 
            onClick={handleToggle}
            disabled={isToggling}
            className="w-6 h-6 rounded-full border-2 bg-green-500 border-green-500 text-white flex items-center justify-center transition-all duration-300 shadow-sm shadow-green-500/20"
          >
            {isToggling ? (
              <i className="fa-solid fa-spinner fa-spin text-xs"></i>
            ) : (
              <i className="fa-solid fa-check text-xs"></i>
            )}
          </button>
        </div>
        <div className="flex-1 opacity-50 transition-opacity group-hover:opacity-70">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-medium text-slate-500 dark:text-slate-400 line-through decoration-2 decoration-borderline-light dark:decoration-borderline-dark">
              {task.title}
            </h3>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="text-content-sub-light dark:text-content-sub-dark hover:text-priority-urgent p-1 rounded-md transition-colors"
              >
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>
          {task.description && (
            <div 
              className="text-slate-400 text-sm mb-3 line-clamp-2 prose prose-sm dark:prose-invert max-w-none prose-p:my-0 line-through"
              dangerouslySetInnerHTML={{ __html: task.description }}
            />
          )}
        </div>

        <ConfirmDialog
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => onDelete(task.id)}
          title={t('confirmDeleteTitle')}
          message={t('confirmDeleteMsg')}
          confirmText={t('btnDelete')}
          cancelText={t('btnCancel')}
        />
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
          <button 
            onClick={handleToggle}
            disabled={isToggling}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 border-borderline-light dark:border-borderline-dark hover:border-accent ${isToggling ? 'text-accent' : ''}`}
          >
            {isToggling && <i className="fa-solid fa-spinner fa-spin text-xs"></i>}
          </button>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`text-lg leading-tight line-clamp-1 ${isUrgent ? 'font-extrabold text-priority-urgent' : 'font-bold'}`}>
              {task.title}
            </h3>
            
            <div className="flex items-center gap-2">
              {task.is_pinned && (
                <button 
                  onClick={() => onTogglePin(task.id)}
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
                      onClick={() => { onTogglePin(task.id); setIsMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-content-main-light dark:text-content-main-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors flex items-center gap-3"
                    >
                      <i className="fa-solid fa-thumbtack w-4"></i>
                      <span>{task.is_pinned ? (t('menuUnpin') || 'Bỏ ghim') : (t('menuPin') || 'Ghim task')}</span>
                    </button>
                    <button 
                      onClick={() => { setIsEditModalOpen(true); setIsMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-content-main-light dark:text-content-main-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors flex items-center gap-3"
                    >
                      <i className="fa-regular fa-pen-to-square w-4"></i>
                      <span>{t('menuEdit') || 'Chỉnh sửa'}</span>
                    </button>
                    <button 
                      onClick={() => { setIsDeleteModalOpen(true); setIsMenuOpen(false); }}
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
            <div 
              className="text-content-sub-light dark:text-content-sub-dark text-sm mb-3 line-clamp-2 prose prose-sm dark:prose-invert max-w-none prose-p:my-0"
              dangerouslySetInnerHTML={{ __html: task.description }}
            />
          )}

          <div className="flex items-center gap-3 font-mono text-xs font-semibold">
            {isUrgent ? (
              <span className="bg-priority-urgent/10 text-priority-urgent px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <i className="fa-solid fa-fire text-[10px]"></i> {t('priorityUrgentLabel')}
              </span>
            ) : (
              <span className="bg-priority-medium/10 text-priority-medium dark:text-[#FBBF24] px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-priority-medium dark:bg-[#FBBF24]"></div>
                {t('priorityMediumLabel')}
              </span>
            )}
            
            <span className="text-content-sub-light dark:text-content-sub-dark flex items-center gap-1.5">
              <i className="fa-regular fa-clock"></i> {t('todayLabel')}
            </span>
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(data) => {
          onUpdate(task.id, data);
        }}
        t={t}
        isEditMode={true}
        initialData={task}
      />

      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => onDelete(task.id)}
        title={t('confirmDeleteTitle')}
        message={t('confirmDeleteMsg')}
        confirmText={t('btnDelete')}
        cancelText={t('btnCancel')}
        type="danger"
      />
      
      <ConfirmDialog
        isOpen={isConfirmCompleteOpen}
        onClose={() => setIsConfirmCompleteOpen(false)}
        onConfirm={handleConfirmComplete}
        title={t('confirmCompleteTitle') || 'Xác nhận hoàn thành'}
        message={t('confirmCompleteMsg') || 'Bạn đã thực sự hoàn thành xuất sắc công việc này?'}
        confirmText={t('btnYesDone') || 'Đúng vậy!'}
        cancelText={t('btnNotYet') || 'Chưa đâu'}
        type="success"
      />
    </div>
  );
}
