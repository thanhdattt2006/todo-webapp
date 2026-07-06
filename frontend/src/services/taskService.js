import apiClient from './apiClient';

export const taskApi = {
  fetchTasks: async (filters = {}) => {
    // Truyền filter xuống backend (nếu backend hỗ trợ)
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
  }
};
