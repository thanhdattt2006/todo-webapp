import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import TaskList from './components/task/TaskList';
import NotFound from './components/layout/NotFound';
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
        
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={
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
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            className: 'dark:bg-card-dark dark:text-content-main-dark border dark:border-borderline-dark',
          }}
          containerStyle={{ zIndex: 999999 }}
        />
      </main>
    </>
  );
}

export default App;
