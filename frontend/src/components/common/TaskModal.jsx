import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

export default function TaskModal({ isOpen, onClose, onSave, initialData, t, isEditMode }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: t('placeholderDesc') || 'Task description...',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert focus:outline-none min-h-[150px] max-w-none text-content-main-light dark:text-content-main-dark',
      },
    },
  });

  useEffect(() => {
    if (isOpen) {
      setTitle(initialData?.title || '');
      setPriority(initialData?.priority || 'medium');
      if (editor) {
        editor.commands.setContent(initialData?.description || '');
      }
      setIsSubmitting(false);
    }
  }, [isOpen, initialData, editor]);

  const handleSave = async () => {
    if (!title.trim()) {
      alert(t('errorEmptyTitle') || 'Title must not be blank');
      return;
    }
    
    // Fallback description to empty string to ensure it's not null
    const htmlContent = editor ? editor.getHTML() : '';
    const description = htmlContent === '<p></p>' ? '' : htmlContent;

    setIsSubmitting(true);
    try {
      await onSave({
        title: title.trim(),
        priority,
        description,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={() => !isSubmitting && onClose()}>
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-card-light dark:bg-card-dark border border-borderline-light dark:border-borderline-dark p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-content-main-light dark:text-content-main-dark mb-4 border-b border-borderline-light dark:border-borderline-dark pb-3">
                  {isEditMode ? (t('editTaskTitle') || 'Edit Task') : (t('addTaskTitle') || 'Create New Task')}
                </Dialog.Title>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-content-sub-light dark:text-content-sub-dark mb-1">
                      {t('fieldTitle') || 'Title'} <span className="text-priority-urgent">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      disabled={isSubmitting}
                      placeholder={t('placeholderNewTask') || 'Enter task title...'}
                      className="w-full bg-background-light dark:bg-background-dark border border-borderline-light dark:border-borderline-dark rounded-xl px-4 py-2 focus:outline-none focus:border-accent text-content-main-light dark:text-content-main-dark disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-content-sub-light dark:text-content-sub-dark mb-1">
                      {t('fieldPriority') || 'Priority'}
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full bg-background-light dark:bg-background-dark border border-borderline-light dark:border-borderline-dark rounded-xl px-4 py-2 focus:outline-none focus:border-accent text-content-main-light dark:text-content-main-dark disabled:opacity-50"
                    >
                      <option value="low">{t('priorityLow') || 'Low'}</option>
                      <option value="medium">{t('priorityMedium') || 'Medium'}</option>
                      <option value="urgent">{t('priorityUrgent') || 'Urgent'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-content-sub-light dark:text-content-sub-dark mb-1">
                      {t('fieldDescription') || 'Description'}
                    </label>
                    <div className={`border border-borderline-light dark:border-borderline-dark rounded-xl p-3 bg-background-light dark:bg-background-dark transition-colors ${isSubmitting ? 'opacity-50 pointer-events-none' : 'focus-within:border-accent'}`}>
                      <div className="border-b border-borderline-light dark:border-borderline-dark pb-2 mb-2 flex gap-2 text-content-sub-light dark:text-content-sub-dark">
                        <button onClick={() => editor?.chain().focus().toggleBold().run()} className={`p-1 rounded ${editor?.isActive('bold') ? 'bg-surface-light dark:bg-surface-dark text-accent' : 'hover:bg-surface-light dark:hover:bg-surface-dark'}`}><i className="fa-solid fa-bold"></i></button>
                        <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={`p-1 rounded ${editor?.isActive('italic') ? 'bg-surface-light dark:bg-surface-dark text-accent' : 'hover:bg-surface-light dark:hover:bg-surface-dark'}`}><i className="fa-solid fa-italic"></i></button>
                        <button onClick={() => editor?.chain().focus().toggleStrike().run()} className={`p-1 rounded ${editor?.isActive('strike') ? 'bg-surface-light dark:bg-surface-dark text-accent' : 'hover:bg-surface-light dark:hover:bg-surface-dark'}`}><i className="fa-solid fa-strikethrough"></i></button>
                        <div className="w-px bg-borderline-light dark:bg-borderline-dark mx-1"></div>
                        <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className={`p-1 rounded ${editor?.isActive('bulletList') ? 'bg-surface-light dark:bg-surface-dark text-accent' : 'hover:bg-surface-light dark:hover:bg-surface-dark'}`}><i className="fa-solid fa-list-ul"></i></button>
                        <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={`p-1 rounded ${editor?.isActive('orderedList') ? 'bg-surface-light dark:bg-surface-dark text-accent' : 'hover:bg-surface-light dark:hover:bg-surface-dark'}`}><i className="fa-solid fa-list-ol"></i></button>
                      </div>
                      <EditorContent editor={editor} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-xl border border-borderline-light dark:border-borderline-dark px-5 py-2 text-sm font-medium text-content-main-light dark:text-content-main-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={onClose}
                  >
                    {t('btnCancel') || 'Cancel'}
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-transparent bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors focus:outline-none shadow-accent disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={handleSave}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <span>{t('btnSave') || 'Save Task'}...</span>
                      </>
                    ) : (
                      t('btnSave') || 'Save Task'
                    )}
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
