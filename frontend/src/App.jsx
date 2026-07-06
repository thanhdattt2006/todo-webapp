import { useState } from 'react';
import Header from './components/layout/Header';
import TaskList from './components/task/TaskList';
import { useTasks } from './hooks/useTasks';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { Toaster } from 'react-hot-toast';

function App() {
  const { tasks, isLoading, error, fetchTasks, addTask, toggleComplete, updateTask, deleteTask } = useTasks();
  const { isDark, toggleTheme } = useTheme();
  const { currentLang, toggleLanguage, t } = useLanguage();

  return (
    <>
      <div className="ambient-glow"></div>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 relative z-10">
        <Header 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
          currentLang={currentLang} 
          toggleLanguage={toggleLanguage} 
        />
        
        <TaskList 
          tasks={tasks}
          isLoading={isLoading}
          error={error}
          t={t}
          onToggleComplete={toggleComplete}
          onDelete={deleteTask}
          onAdd={addTask}
          onUpdate={updateTask}
        />
        <Toaster position="bottom-right" />
      </main>
    </>
  );
}

export default App;
