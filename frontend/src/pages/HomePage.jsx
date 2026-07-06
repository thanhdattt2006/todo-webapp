import React from 'react';
import TaskList from '../components/task/TaskList';
import { useTasks } from '../hooks/useTasks';
import { useLanguage } from '../hooks/useLanguage';

export default function HomePage() {
  const { tasks, isLoading, error, addTask, toggleComplete, updateTask, deleteTask } = useTasks();
  const { t } = useLanguage();

  return (
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
  );
}
