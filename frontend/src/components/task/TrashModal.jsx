import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { taskApi } from '../../services/taskService';
import toast from 'react-hot-toast';
import { useLanguage } from '../../hooks/useLanguage';

export default function TrashModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [trashedTasks, setTrashedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrash = async () => {
    try {
      setIsLoading(true);
      const data = await taskApi.getTrash();
      setTrashedTasks(data);
    } catch (error) {
      toast.error(t('trashLoadError'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTrash();
    }
  }, [isOpen]);

  const handleRestore = async (id) => {
    try {
      await taskApi.restore(id);
      toast.success(t('taskRestored'));
      setTrashedTasks(prev => prev.filter(t => t.id !== id));
      window.dispatchEvent(new Event('task-changed'));
    } catch (error) {
      toast.error(t('restoreError'));
    }
  };

  const handleForceDelete = async (id) => {
    try {
      await taskApi.forceDelete(id);
      toast.success(t('taskPermanentlyDeleted'));
      setTrashedTasks(prev => prev.filter(t => t.id !== id));
      window.dispatchEvent(new Event('task-changed'));
    } catch (error) {
      toast.error(t('deleteFailed'));
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-card-light dark:bg-card-dark border border-borderline-light dark:border-borderline-dark p-6 text-left align-middle shadow-xl transition-all flex flex-col max-h-[80vh]">
                <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-content-main-light dark:text-content-main-dark flex items-center gap-2 pb-4 border-b border-borderline-light dark:border-borderline-dark">
                  <i className="fa-solid fa-trash-can text-priority-urgent"></i>
                  {t('trashTitle')}
                </Dialog.Title>
                
                <div className="mt-4 flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                  {isLoading ? (
                    <div className="text-center py-10 opacity-50"><i className="fa-solid fa-spinner fa-spin text-2xl"></i></div>
                  ) : trashedTasks.length === 0 ? (
                    <div className="text-center py-10 text-content-sub-light dark:text-content-sub-dark">
                      {t('trashEmpty')}
                    </div>
                  ) : (
                    trashedTasks.map(task => (
                      <div key={task.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-background-light dark:bg-background-dark rounded-xl border border-borderline-light dark:border-borderline-dark gap-3">
                        <div className="flex-1 line-clamp-1 w-full">
                          <span className="font-semibold text-content-main-light dark:text-content-main-dark block truncate">{task.title}</span>
                          <span className="text-xs text-content-sub-light dark:text-content-sub-dark block mt-1">
                            {t('deletedAt')} 
                            {new Date(task.deletedAt || Date.now()).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button onClick={() => handleRestore(task.id)} className="flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium bg-surface-light dark:bg-surface-dark hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 border border-borderline-light dark:border-borderline-dark hover:border-green-300 dark:hover:border-green-700 rounded-lg transition-colors flex items-center justify-center gap-1.5">
                            <i className="fa-solid fa-rotate-left"></i>
                            {t('btnRestore')}
                          </button>
                          <button onClick={() => handleForceDelete(task.id)} className="flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium bg-surface-light dark:bg-surface-dark hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 border border-borderline-light dark:border-borderline-dark hover:border-red-300 dark:hover:border-red-700 rounded-lg transition-colors flex items-center justify-center gap-1.5">
                            <i className="fa-solid fa-xmark"></i>
                            {t('btnForceDelete')}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-borderline-light dark:border-borderline-dark flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-xl border border-borderline-light dark:border-borderline-dark px-5 py-2 text-sm font-medium text-content-main-light dark:text-content-main-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors focus:outline-none"
                    onClick={onClose}
                  >
                    {t('btnClose')}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
