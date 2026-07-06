import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { taskApi } from '../../services/taskService';
import { useLanguage } from '../../hooks/useLanguage';

export default function AchievementModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAchievements = async () => {
    try {
      setIsLoading(true);
      const data = await taskApi.getAchievements();
      setAchievements(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAchievements();
    }
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-75 translate-y-8"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] border border-yellow-500/30 p-8 text-left align-middle shadow-[0_0_50px_-12px_rgba(234,179,8,0.5)] transition-all flex flex-col max-h-[85vh] relative">
                
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-3xl">
                  <div className="absolute -top-24 -left-24 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
                </div>

                <Dialog.Title as="h3" className="text-3xl font-extrabold leading-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 flex items-center justify-center gap-3 pb-6 relative z-10 text-center">
                  <i className="fa-solid fa-trophy text-yellow-500 text-4xl animate-pulse"></i>
                  {t('achievementTitle')}
                </Dialog.Title>
                
                <p className="text-center text-gray-400 mb-8 max-w-lg mx-auto relative z-10 text-sm">
                  {t('achievementDesc')}
                </p>

                <div className="mt-2 flex-1 overflow-y-auto pr-3 custom-scrollbar space-y-4 relative z-10">
                  {isLoading ? (
                    <div className="text-center py-12 opacity-80 text-yellow-500"><i className="fa-solid fa-spinner fa-spin text-4xl"></i></div>
                  ) : achievements.length === 0 ? (
                    <div className="text-center py-16 text-gray-500 flex flex-col items-center gap-4">
                      <i className="fa-solid fa-seedling text-5xl opacity-50"></i>
                      <span>{t('achievementEmpty')}</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((task, index) => (
                        <div key={task.id} className="relative group bg-white/5 hover:bg-white/10 p-5 rounded-2xl border border-white/10 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-500/10 backdrop-blur-sm">
                          <div className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-bl from-yellow-500/20 to-transparent rounded-tr-2xl rounded-bl-2xl flex items-center justify-center">
                            <span className="text-yellow-500 font-bold text-xs">#{index + 1}</span>
                          </div>
                          <h4 className="font-bold text-white text-lg mb-2 pr-6 line-clamp-1">{task.title}</h4>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-full">
                              <i className="fa-solid fa-check-double text-green-400"></i>
                              {new Date(task.updatedAt || Date.now()).toLocaleDateString()} - {t('completedLabel')}
                            </span>
                            {task.priority === 'urgent' && (
                              <span className="flex items-center gap-1.5 bg-red-500/10 text-red-400 px-2.5 py-1 rounded-full border border-red-500/20">
                                <i className="fa-solid fa-fire"></i> {t('priorityUrgentLabel')}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 flex justify-center relative z-10">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 px-10 py-3 text-sm font-bold text-white hover:from-yellow-400 hover:to-amber-500 transition-all shadow-[0_0_20px_-5px_rgba(234,179,8,0.5)] hover:shadow-[0_0_25px_-5px_rgba(234,179,8,0.8)] hover:scale-105 focus:outline-none"
                    onClick={onClose}
                  >
                    {t('btnKeepItUp')}
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
