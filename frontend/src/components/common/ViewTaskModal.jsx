import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { formatDate } from '../../utils/dateUtils';

export default function ViewTaskModal({ isOpen, onClose, task, t, currentLang }) {
  if (!task) return null;
  const isUrgent = task.priority === 'urgent';

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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-card-light dark:bg-card-dark border border-borderline-light dark:border-borderline-dark p-8 text-left align-middle shadow-2xl transition-all">
                
                <div className="flex justify-between items-start mb-6 border-b border-borderline-light dark:border-borderline-dark pb-4">
                  <Dialog.Title as="h3" className={`text-2xl font-extrabold leading-tight ${isUrgent ? 'text-priority-urgent' : 'text-content-main-light dark:text-content-main-dark'}`}>
                    {task.title}
                  </Dialog.Title>
                  <button onClick={onClose} className="text-content-sub-light dark:text-content-sub-dark hover:text-content-main-light dark:hover:text-content-main-dark transition-colors">
                    <i className="fa-solid fa-xmark text-xl"></i>
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  {isUrgent ? (
                    <span className="bg-priority-urgent/10 text-priority-urgent px-3 py-1.5 rounded-lg flex items-center gap-2 font-mono text-sm font-semibold">
                      <i className="fa-solid fa-fire text-xs"></i> {t('priorityUrgentLabel') || 'URGENT'}
                    </span>
                  ) : (
                    <span className="bg-priority-medium/10 text-priority-medium dark:text-[#FBBF24] px-3 py-1.5 rounded-lg flex items-center gap-2 font-mono text-sm font-semibold">
                      <div className="w-2 h-2 rounded-full bg-priority-medium dark:bg-[#FBBF24]"></div>
                      {t('priorityMediumLabel') || 'MEDIUM'}
                    </span>
                  )}

                  <span className="text-content-sub-light dark:text-content-sub-dark flex items-center gap-2 font-mono text-sm font-semibold bg-surface-light dark:bg-surface-dark px-3 py-1.5 rounded-lg">
                    <i className="fa-regular fa-calendar"></i> {formatDate(task.created_at || new Date(), currentLang)}
                  </span>

                  {task.completed && (
                    <span className="bg-green-500/10 text-green-500 px-3 py-1.5 rounded-lg flex items-center gap-2 font-mono text-sm font-semibold">
                      <i className="fa-solid fa-check-double text-xs"></i> {t('completedLabel') || 'Completed'}
                    </span>
                  )}
                </div>
                
                <div className="mt-4 min-h-[150px] bg-background-light dark:bg-background-dark rounded-2xl p-5 border border-borderline-light dark:border-borderline-dark">
                  {task.description ? (
                    <div 
                      className="prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-p:leading-relaxed text-content-main-light dark:text-content-main-dark"
                      dangerouslySetInnerHTML={{ __html: task.description }}
                    />
                  ) : (
                    <div className="text-content-sub-light dark:text-content-sub-dark italic opacity-70 flex items-center justify-center h-full">
                      Không có mô tả chi tiết / No description
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-xl border border-transparent bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-all shadow-accent hover:shadow-accent-hover hover:-translate-y-0.5 focus:outline-none"
                    onClick={onClose}
                  >
                    {t('btnClose') || 'Close'}
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
