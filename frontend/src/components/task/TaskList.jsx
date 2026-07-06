import React, { useState } from 'react';
import TaskItem from './TaskItem';
import EmptyState from '../common/EmptyState';

export default function TaskList({ tasks, isLoading, error, t, onToggleComplete, onDelete, onAdd, onUpdate }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAdd = async () => {
    if (!newTaskTitle.trim()) {
      alert(t('errorEmptyTitle') || 'Title must not be blank');
      return;
    }
    const success = await onAdd({ title: newTaskTitle.trim(), priority: 'medium' });
    if (success) {
      setNewTaskTitle('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const total = tasks.length;
  const done = tasks.filter(t => t.is_completed).length;
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
        <div className="flex w-full sm:w-auto items-center gap-2">
          <input 
            type="text" 
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('placeholderNewTask') || 'Enter new task...'}
            className="flex-1 sm:w-64 bg-background-light dark:bg-background-dark border border-borderline-light dark:border-borderline-dark rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
          />
          <button 
            onClick={handleAdd}
            className="bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-accent transition-all duration-bounce hover:scale-105 flex items-center gap-2 whitespace-nowrap"
          >
            <i className="fa-solid fa-plus"></i>
            <span className="hidden sm:inline">{t('btnAddTask')}</span>
          </button>
        </div>
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
        ) : tasks.length === 0 ? (
          <EmptyState t={t} />
        ) : (
          tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              t={t} 
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))
        )}
      </div>
    </>
  );
}
