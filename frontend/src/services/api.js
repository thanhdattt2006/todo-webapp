import axiosClient from '../api/axiosClient';

export const taskApi = {
  fetchTasks: async (filters = {}) => {
    // Truyền filter xuống backend (nếu backend hỗ trợ)
    const params = {};
    if (filters.status) params.status = filters.status;
    if (filters.search) params.search = filters.search;
    
    return axiosClient.get('/tasks', { params });
  },
  
  createTask: async (taskData) => {
    return axiosClient.post('/tasks', taskData);
  },
  
  updateTask: async (id, updates) => {
    return axiosClient.put(`/tasks/${id}`, updates);
  },
  
  toggleComplete: async (id) => {
    return axiosClient.patch(`/tasks/${id}/toggle`);
  },
  
  deleteTask: async (id) => {
    return axiosClient.delete(`/tasks/${id}`);
  }
};
