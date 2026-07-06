import { useState, useCallback, useEffect } from 'react';
import { taskApi } from '../services/taskService';
import toast from 'react-hot-toast';

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
      toast.success('Thêm task thành công!');
      return true;
    } catch (err) {
      toast.error('Lỗi khi thêm task: ' + err.message);
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
      toast.success('Cập nhật thành công!');
    } catch (err) {
      setTasks(previousTasks);
      toast.error('Lỗi cập nhật: ' + err.message);
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
      toast.error('Lỗi: ' + err.message);
      setError(err.message);
    }
  };

  const togglePinTask = useCallback(async (id) => {
    try {
      const updatedTask = await taskApi.pin(id);
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
      toast.success('Task pinned status updated');
    } catch (err) {
      toast.error('Failed to update pin status');
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      await taskApi.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  }, []);

  useEffect(() => {
    const handleRefetch = () => fetchTasks();
    window.addEventListener('task-changed', handleRefetch);
    return () => window.removeEventListener('task-changed', handleRefetch);
  }, [fetchTasks]);

  return {
    tasks, isLoading, isProcessing, error,
    clearError: () => setError(null),
    fetchTasks, addTask, updateTask, toggleComplete, deleteTask, togglePinTask
  };
};
