// API configuration
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://pay4skill-api.onrender.com' 
  : 'http://localhost:5000';

// Helper function for API requests
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
}

// API endpoints
export const api = {
  // User endpoints
  users: {
    getAll: () => apiRequest('/api/users'),
    getById: (id: string) => apiRequest(`/api/users/${id}`),
    create: (data: any) => apiRequest('/api/users', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => apiRequest(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
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
  
  // Health check
  health: () => apiRequest('/health'),
}; 