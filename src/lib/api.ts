// API configuration
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://pay4skill-api.onrender.com' 
  : 'http://localhost:5000';

// Helper function for API requests
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  
  // Get token from localStorage if it exists
  const token = localStorage.getItem('token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  // Add authorization header if token exists
  const headers = token
    ? { ...defaultHeaders, Authorization: `Bearer ${token}`, ...options.headers }
    : { ...defaultHeaders, ...options.headers };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
}

// API endpoints
export const api = {
  // Auth endpoints
  auth: {
    login: (data: { email: string; password: string }) => 
      apiRequest('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    register: (data: any) => 
      apiRequest('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    forgotPassword: (email: string) => 
      apiRequest('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
    resetPassword: (data: { token: string; password: string }) => 
      apiRequest('/api/auth/reset-password', { method: 'POST', body: JSON.stringify(data) }),
    getCurrentUser: () => apiRequest('/api/auth/user'),
  },
  
  // User endpoints
  users: {
    getAll: () => apiRequest('/api/users'),
    getById: (id: string) => apiRequest(`/api/users/${id}`),
    create: (data: any) => apiRequest('/api/users', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => apiRequest(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    uploadAvatar: (id: string, formData: FormData) => 
      apiRequest(`/api/users/${id}/avatar`, { 
        method: 'POST', 
        headers: {}, // Let browser set the content type with boundary
        body: formData 
      }),
    uploadResume: (id: string, formData: FormData) => 
      apiRequest(`/api/users/${id}/resume`, { 
        method: 'POST', 
        headers: {}, // Let browser set the content type with boundary
        body: formData 
      }),
  },
  
  // Task endpoints
  tasks: {
    getAll: () => apiRequest('/api/tasks'),
    getById: (id: string) => apiRequest(`/api/tasks/${id}`),
    create: (data: any) => apiRequest('/api/tasks', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => apiRequest(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    getByEmployer: (employerId: string) => apiRequest(`/api/tasks/employer/${employerId}`),
  },
  
  // Application endpoints
  applications: {
    getAll: () => apiRequest('/api/applications'),
    getById: (id: string) => apiRequest(`/api/applications/${id}`),
    create: (data: any) => apiRequest('/api/applications', { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (id: string, status: string) => apiRequest(`/api/applications/${id}/status`, { 
      method: 'PATCH', 
      body: JSON.stringify({ status }) 
    }),
    getByStudent: (studentId: string) => apiRequest(`/api/applications/student/${studentId}`),
    getByTask: (taskId: string) => apiRequest(`/api/applications/task/${taskId}`),
  },
  
  // Payment endpoints
  payments: {
    getAll: () => apiRequest('/api/payments'),
    getById: (id: string) => apiRequest(`/api/payments/${id}`),
    create: (data: any) => apiRequest('/api/payments', { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (id: string, status: string) => apiRequest(`/api/payments/${id}/status`, { 
      method: 'PATCH', 
      body: JSON.stringify({ status }) 
    }),
    getByEmployer: (employerId: string) => apiRequest(`/api/payments/employer/${employerId}`),
    getByStudent: (studentId: string) => apiRequest(`/api/payments/student/${studentId}`),
    uploadProof: (id: string, formData: FormData) => 
      apiRequest(`/api/payments/${id}/proof`, { 
        method: 'POST', 
        headers: {}, // Let browser set the content type with boundary
        body: formData 
      }),
  },
  
  // Message endpoints
  messages: {
    getAll: () => apiRequest('/api/messages'),
    getById: (id: string) => apiRequest(`/api/messages/${id}`),
    create: (data: any) => apiRequest('/api/messages', { method: 'POST', body: JSON.stringify(data) }),
    markAsRead: (id: string) => apiRequest(`/api/messages/${id}/read`, { method: 'PATCH' }),
    getConversation: (userId1: string, userId2: string, taskId?: string) => {
      const endpoint = taskId 
        ? `/api/messages/conversation/${userId1}/${userId2}?taskId=${taskId}`
        : `/api/messages/conversation/${userId1}/${userId2}`;
      return apiRequest(endpoint);
    },
    getUnreadCount: (userId: string) => apiRequest(`/api/messages/unread/${userId}`),
    uploadAttachment: (formData: FormData) => 
      apiRequest('/api/messages/attachment', { 
        method: 'POST', 
        headers: {}, // Let browser set the content type with boundary
        body: formData 
      }),
  },
  
  // Review endpoints
  reviews: {
    getAll: () => apiRequest('/api/reviews'),
    getById: (id: string) => apiRequest(`/api/reviews/${id}`),
    create: (data: any) => apiRequest('/api/reviews', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => apiRequest(`/api/reviews/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    getByUser: (userId: string) => apiRequest(`/api/reviews/user/${userId}`),
    getByTask: (taskId: string) => apiRequest(`/api/reviews/task/${taskId}`),
  },
  
  // Badges endpoints
  badges: {
    getAll: () => apiRequest('/api/badges'),
    getByUser: (userId: string) => apiRequest(`/api/badges/user/${userId}`),
  },
  
  // Analytics endpoints
  analytics: {
    getDashboard: (userId: string) => apiRequest(`/api/analytics/dashboard/${userId}`),
    getTasksStats: (period: string) => apiRequest(`/api/analytics/tasks?period=${period}`),
    getUsersStats: (period: string) => apiRequest(`/api/analytics/users?period=${period}`),
    getPaymentsStats: (period: string) => apiRequest(`/api/analytics/payments?period=${period}`),
  },
  
  // Health check
  health: () => apiRequest('/health'),
}; 