import React, { useState } from 'react';
import TaskItem from './TaskItem';
import EmptyState from '../common/EmptyState';
import TaskModal from '../common/TaskModal';

export default function TaskList({ tasks, isLoading, error, t, onToggleComplete, onDelete, onAdd, onUpdate, onTogglePin }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAdd = async (data) => {
    const success = await onAdd(data);
    if (success) {
      setIsAddModalOpen(false);
    }
  };

  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const pending = total - done;

  return (
    <>
      <section className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-card-light dark:bg-card-dark rounded-[20px] p-5 shadow-card border border-borderline-light dark:border-borderline-dark flex flex-col justify-between hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
          <div className="text-content-sub-light dark:text-content-sub-dark text-xs sm:text-sm font-medium uppercase tracking-wider mb-2">
            {t('statTotal')}
          </div>
          <div className="text-3xl font-extrabold font-mono">{total.toString().padStart(2, '0')}</div>
        </div>
        <div className="bg-card-light dark:bg-card-dark rounded-[20px] p-5 shadow-card border border-borderline-light dark:border-borderline-dark flex flex-col justify-between hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
          <div className="text-content-sub-light dark:text-content-sub-dark text-xs sm:text-sm font-medium uppercase tracking-wider mb-2">
            {t('statDone')}
          </div>
          <div className="text-3xl font-extrabold font-mono text-priority-low">
            {done.toString().padStart(2, '0')}
          </div>
        </div>
        <div className="bg-card-light dark:bg-card-dark rounded-[20px] p-5 shadow-card border border-borderline-light dark:border-borderline-dark flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
          <div className="relative z-10">
            <div className="text-content-sub-light dark:text-content-sub-dark text-xs sm:text-sm font-medium uppercase tracking-wider mb-2">
              {t('statPending')}
            </div>
            <div className="text-3xl font-extrabold font-mono text-priority-medium">
              {pending.toString().padStart(2, '0')}
            </div>
          </div>
          <i className="fa-solid fa-circle-notch fa-spin absolute -right-6 -bottom-6 text-7xl text-accent opacity-10 group-hover:opacity-20 transition-opacity duration-300"></i>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold whitespace-nowrap">{t('listTitle')}</h2>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-accent transition-all duration-bounce hover:scale-105 flex items-center gap-2 whitespace-nowrap"
        >
          <i className="fa-solid fa-plus"></i>
          <span>{t('btnAddTask')}</span>
        </button>
      </div>

      <div className="space-y-4 relative">
        {error && (
          <div className="bg-priority-urgent/10 text-priority-urgent p-4 rounded-xl text-sm mb-4">
            <i className="fa-solid fa-circle-exclamation mr-2"></i> {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-10 opacity-50">
            <i className="fa-solid fa-spinner fa-spin text-3xl"></i>
          </div>
        ) : tasks.filter(t => !t.completed).length === 0 ? (
          <EmptyState t={t} />
        ) : (
          tasks.filter(t => !t.completed).map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              t={t} 
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onTogglePin={onTogglePin}
            />
          ))
        )}
      </div>

      <TaskModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSave={handleAdd} 
        t={t} 
        isEditMode={false} 
      />
    </>
  );
}
