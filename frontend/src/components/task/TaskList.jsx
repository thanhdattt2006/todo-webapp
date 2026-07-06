import React, { useState } from 'react';
import TaskItem from './TaskItem';
import EmptyState from '../common/EmptyState';
import TaskModal from '../common/TaskModal';

export default function TaskList({ tasks, isLoading, error, t, onToggleComplete, onDelete, onAdd, onUpdate, onTogglePin }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending'); // 'all', 'pending', 'completed'

  const handleAdd = async (data) => {
    const success = await onAdd(data);
    if (success) {
      setIsAddModalOpen(false);
    }
  };

  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const pending = total - done;

  const filteredTasks = tasks.filter(t => {
    if (filterStatus === 'pending' && t.completed) return false;
    if (filterStatus === 'completed' && !t.completed) return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(query);
      const matchDesc = t.description && t.description.toLowerCase().includes(query);
      if (!matchTitle && !matchDesc) return false;
    }
    return true;
  });

  return (
    <>
      <section className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-card-light dark:bg-card-dark rounded-[20px] p-5 shadow-card border border-borderline-light dark:border-borderline-dark flex flex-col justify-between hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
          <div className="text-content-sub-light dark:text-content-sub-dark text-xs sm:text-sm font-medium uppercase tracking-wider mb-2">
            {t('statTotal') || 'Tổng'}
          </div>
          <div className="text-3xl font-extrabold font-mono">{total.toString().padStart(2, '0')}</div>
        </div>
        <div className="bg-card-light dark:bg-card-dark rounded-[20px] p-5 shadow-card border border-borderline-light dark:border-borderline-dark flex flex-col justify-between hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
          <div className="text-content-sub-light dark:text-content-sub-dark text-xs sm:text-sm font-medium uppercase tracking-wider mb-2">
            {t('statDone') || 'Hoàn thành'}
          </div>
          <div className="text-3xl font-extrabold font-mono text-priority-low">
            {done.toString().padStart(2, '0')}
          </div>
        </div>
        <div className="bg-card-light dark:bg-card-dark rounded-[20px] p-5 shadow-card border border-borderline-light dark:border-borderline-dark flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
          <div className="relative z-10">
            <div className="text-content-sub-light dark:text-content-sub-dark text-xs sm:text-sm font-medium uppercase tracking-wider mb-2">
              {t('statPending') || 'Chưa xong'}
            </div>
            <div className="text-3xl font-extrabold font-mono text-priority-medium">
              {pending.toString().padStart(2, '0')}
            </div>
          </div>
          <i className="fa-solid fa-circle-notch fa-spin absolute -right-6 -bottom-6 text-7xl text-accent opacity-10 group-hover:opacity-20 transition-opacity duration-300"></i>
        </div>
      </section>

      <div className="flex flex-col mb-6 gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-xl font-bold whitespace-nowrap">{t('listTitle') || 'Danh sách'}</h2>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-accent transition-all duration-bounce hover:scale-105 flex items-center gap-2 whitespace-nowrap w-full sm:w-auto justify-center"
          >
            <i className="fa-solid fa-plus"></i>
            <span>{t('btnAddTask') || 'Thêm mới'}</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder={t('searchPlaceholder') || 'Tìm kiếm công việc...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-light dark:bg-surface-dark border border-borderline-light dark:border-borderline-dark rounded-xl py-2.5 pl-11 pr-4 focus:outline-none focus:border-accent transition-colors text-sm"
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-surface-light dark:bg-surface-dark border border-borderline-light dark:border-borderline-dark rounded-xl py-2.5 px-4 focus:outline-none focus:border-accent transition-colors text-sm min-w-[140px]"
          >
            <option value="all">{t('filterAll') || 'Tất cả'}</option>
            <option value="pending">{t('filterPending') || 'Chưa xong'}</option>
            <option value="completed">{t('filterCompleted') || 'Đã xong'}</option>
          </select>
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
        ) : filteredTasks.length === 0 ? (
          <EmptyState t={t} />
        ) : (
          filteredTasks.map(task => (
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
