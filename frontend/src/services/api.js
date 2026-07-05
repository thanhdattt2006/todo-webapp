const LATENCY = { MIN: 500, MAX: 1000 };
const ERROR_RATE = 0.05;

let mockDatabase = [
  {
    id: crypto.randomUUID(),
    title: 'Fix lỗi màn hình thanh toán (P0)',
    description: 'Khách hàng không thể submit form khi dùng thẻ Visa. Dev team cần hotfix ngay trong chiều nay trước lúc deploy.',
    is_completed: false,
    is_pinned: true,
    priority: 'urgent',
    created_at: new Date().toISOString(),
    due_date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: crypto.randomUUID(),
    title: 'Review UI/UX bản thiết kế DaveTask',
    description: 'Kiểm tra lại spacing, shadow và dark mode xem đã đủ độ "SaaS" chưa.',
    is_completed: false,
    is_pinned: false,
    priority: 'medium',
    created_at: new Date().toISOString(),
    due_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: crypto.randomUUID(),
    title: 'Lên khung cấu trúc HTML/CSS cơ bản',
    description: '',
    is_completed: true,
    is_pinned: false,
    priority: 'low',
    created_at: new Date().toISOString(),
    due_date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  }
];

const simulateNetwork = () => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * (LATENCY.MAX - LATENCY.MIN + 1)) + LATENCY.MIN;
    setTimeout(() => {
      if (Math.random() < ERROR_RATE) {
        reject(new Error('Network error: Máy chủ không phản hồi. Vui lòng thử lại.'));
      } else {
        resolve();
      }
    }, delay);
  });
};

export const taskApi = {
  fetchTasks: async (filters = {}) => {
    await simulateNetwork();
    let result = [...mockDatabase];
    if (filters.status === 'completed') result = result.filter(t => t.is_completed);
    if (filters.status === 'pending') result = result.filter(t => !t.is_completed);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }
    return result;
  },
  createTask: async (taskData) => {
    await simulateNetwork();
    const newTask = {
      id: crypto.randomUUID(),
      ...taskData,
      is_completed: false,
      is_pinned: taskData.is_pinned || false,
      created_at: new Date().toISOString(),
    };
    mockDatabase = [newTask, ...mockDatabase];
    return newTask;
  },
  updateTask: async (id, updates) => {
    await simulateNetwork();
    const index = mockDatabase.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task không tồn tại hoặc đã bị xóa');
    mockDatabase[index] = { ...mockDatabase[index], ...updates };
    return mockDatabase[index];
  },
  toggleComplete: async (id) => {
    await simulateNetwork();
    const index = mockDatabase.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task không tồn tại');
    mockDatabase[index].is_completed = !mockDatabase[index].is_completed;
    return mockDatabase[index];
  },
  deleteTask: async (id) => {
    await simulateNetwork();
    mockDatabase = mockDatabase.filter(t => t.id !== id);
    return { success: true, id };
  }
};
