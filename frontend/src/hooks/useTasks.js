import { useState, useCallback, useEffect } from 'react';
import { taskApi } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [isProcessing, setIsProcessing] = useState(false); 
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (filters = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await taskApi.fetchTasks(filters);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskData) => {
    setIsProcessing(true);
    setError(null);
    try {
      const newTask = await taskApi.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const updateTask = async (id, updates) => {
    setError(null);
    const previousTasks = [...tasks];
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    try {
      await taskApi.updateTask(id, updates);
    } catch (err) {
      setTasks(previousTasks);
      setError(err.message);
    }
  };

  const toggleComplete = async (id) => {
    const previousTasks = [...tasks];
    setTasks(prev => prev.map(t => t.id === id ? { ...t, is_completed: !t.is_completed } : t));
    try {
      await taskApi.toggleComplete(id);
    } catch (err) {
      setTasks(previousTasks);
      setError(err.message);
    }
  };

  const deleteTask = async (id) => {
    const previousTasks = [...tasks];
    setTasks(prev => prev.filter(t => t.id !== id));
    try {
      await taskApi.deleteTask(id);
    } catch (err) {
      setTasks(previousTasks);
      setError(err.message);
    }
  };

  return {
    tasks, isLoading, isProcessing, error,
    clearError: () => setError(null),
    fetchTasks, addTask, updateTask, toggleComplete, deleteTask
  };
};
