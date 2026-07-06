import apiClient from './apiClient';

export const taskApi = {
  fetchTasks: async (filters = {}) => {
    const params = {};
    if (filters.status) params.status = filters.status;
    if (filters.search) params.search = filters.search;
    return apiClient.get('/tasks', { params });
  },
  
  createTask: async (taskData) => {
    return apiClient.post('/tasks', taskData);
  },
  
  updateTask: async (id, updates) => {
    return apiClient.put(`/tasks/${id}`, updates);
  },
  
  toggleComplete: async (id) => {
    return apiClient.patch(`/tasks/${id}/toggle`);
  },
  
  deleteTask: async (id) => {
    return apiClient.delete(`/tasks/${id}`);
  },

  pin: async (id) => {
    return apiClient.patch(`/tasks/${id}/pin`);
  },

  getTrash: async () => {
    return apiClient.get('/tasks/trash');
  },

  restore: async (id) => {
    return apiClient.patch(`/tasks/${id}/restore`);
  },

  forceDelete: async (id) => {
    return apiClient.delete(`/tasks/${id}/force`);
  },

  getAchievements: async () => {
    return apiClient.get('/tasks/achievements');
  }
};
