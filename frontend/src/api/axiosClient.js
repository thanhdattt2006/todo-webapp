import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptors xử lý response chung
axiosClient.interceptors.response.use(
  (response) => {
    return response.data; // Chỉ trả về data, bỏ qua config/headers của axios
  },
  (error) => {
    // Xử lý lỗi chung
    const message = error.response?.data?.message || error.message || 'Lỗi kết nối đến server';
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
