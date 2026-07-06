import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText, type = 'danger' }) {
  const isDanger = type === 'danger';
  const colorClass = isDanger ? 'text-priority-urgent' : 'text-green-500';
  const bgClass = isDanger ? 'bg-priority-urgent hover:bg-priority-urgent/90' : 'bg-green-500 hover:bg-green-600';
  const icon = isDanger ? 'fa-triangle-exclamation' : 'fa-circle-check';

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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-card-light dark:bg-card-dark border border-borderline-light dark:border-borderline-dark p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className={`text-lg font-bold leading-6 ${colorClass} flex items-center gap-2`}>
                  <i className={`fa-solid ${icon}`}></i>
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-content-sub-light dark:text-content-sub-dark">
                    {message}
                  </p>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-lg border border-borderline-light dark:border-borderline-dark px-4 py-2 text-sm font-medium text-content-main-light dark:text-content-main-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors focus:outline-none"
                    onClick={onClose}
                  >
                    {cancelText}
                  </button>
                  <button
                    type="button"
                    className={`inline-flex justify-center rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-white transition-colors focus:outline-none ${bgClass}`}
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                  >
                    {confirmText}
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
