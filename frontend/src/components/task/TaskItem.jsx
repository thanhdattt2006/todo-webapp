import React, { useState } from 'react';
import TaskModal from '../common/TaskModal';
import ConfirmDialog from '../common/ConfirmDialog';
import ViewTaskModal from '../common/ViewTaskModal';
import TaskItemMenu from './TaskItemMenu';
import toast from 'react-hot-toast';
import { formatDate } from '../../utils/dateUtils';
import { useLanguage } from '../../hooks/useLanguage';

export default function TaskItem({ task, t, onToggleComplete, onDelete, onUpdate, onTogglePin }) {
  const { currentLang } = useLanguage();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmCompleteOpen, setIsConfirmCompleteOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const isUrgent = task.priority === 'urgent';
  const isCompleted = task.completed;

  const handleToggle = (e) => {
    e.stopPropagation();
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
      <div 
        onClick={() => setIsViewModalOpen(true)}
        className="relative bg-surface-light/30 dark:bg-surface-dark/30 rounded-[20px] p-5 border border-borderline-light/50 dark:border-borderline-dark/50 hover:opacity-80 transition-all duration-300 animate-fade-in-down group flex gap-4 items-start shadow-sm cursor-pointer"
      >
        <div className="pt-1">
          <button 
            onClick={handleToggle}
            disabled={isToggling}
            className="w-6 h-6 rounded-full border-2 bg-green-500 border-green-500 text-white flex items-center justify-center transition-all duration-300 shadow-sm shadow-green-500/20"
          >
            {isToggling ? <i className="fa-solid fa-spinner fa-spin text-xs"></i> : <i className="fa-solid fa-check text-xs"></i>}
          </button>
        </div>
        <div className="flex-1 opacity-50 transition-opacity group-hover:opacity-70">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-medium text-slate-500 dark:text-slate-400 line-through decoration-2 decoration-borderline-light dark:decoration-borderline-dark">
              {task.title}
            </h3>
            
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setIsDeleteModalOpen(true); }}
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
          type="danger"
        />
        <ViewTaskModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} task={task} t={t} currentLang={currentLang} />
      </div>
    );
  }

  return (
    <div 
      onClick={() => setIsViewModalOpen(true)}
      className={`relative rounded-[20px] p-5 border transition-all duration-bounce hover:-translate-y-1 hover:shadow-card-hover group animate-fade-in-down cursor-pointer ${isUrgent ? 'bg-priority-urgent/5 dark:bg-priority-urgent/10 shadow-urgent border-priority-urgent/20 dark:border-priority-urgent/30' : 'bg-card-light dark:bg-card-dark shadow-card border-borderline-light dark:border-borderline-dark'}`}
    >
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
        <div className="flex-1 w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`text-lg leading-tight truncate pr-4 ${isUrgent ? 'font-extrabold text-priority-urgent' : 'font-bold'}`}>
              {task.title}
            </h3>
            
            <TaskItemMenu 
              task={task} 
              t={t} 
              onTogglePin={onTogglePin} 
              onEdit={() => setIsEditModalOpen(true)} 
              onDelete={() => setIsDeleteModalOpen(true)} 
            />
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
              <i className="fa-regular fa-clock"></i> {formatDate(task.created_at || new Date(), currentLang)}
            </span>
          </div>
        </div>
      </div>

      <TaskModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={(data) => onUpdate(task.id, data)} t={t} isEditMode={true} initialData={task} />
      <ConfirmDialog isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={() => onDelete(task.id)} title={t('confirmDeleteTitle')} message={t('confirmDeleteMsg')} confirmText={t('btnDelete')} cancelText={t('btnCancel')} type="danger" />
      <ConfirmDialog isOpen={isConfirmCompleteOpen} onClose={() => setIsConfirmCompleteOpen(false)} onConfirm={handleConfirmComplete} title={t('confirmCompleteTitle') || 'Xác nhận hoàn thành'} message={t('confirmCompleteMsg') || 'Bạn đã thực sự hoàn thành xuất sắc công việc này?'} confirmText={t('btnYesDone') || 'Đúng vậy!'} cancelText={t('btnNotYet') || 'Chưa đâu'} type="success" />
      <ViewTaskModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} task={task} t={t} currentLang={currentLang} />
    </div>
  );
}
