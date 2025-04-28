import { toast } from "sonner";

// Configure API base URL based on environment
const API_BASE_URL = import.meta.env.PROD 
  ? '/api' // Use relative path for production with Vercel (proxied via vercel.json)
  : 'http://localhost:5000/api'; // Development URL

// Interface for API response
interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  debug?: { status?: number; data?: any; error?: any };
}

// Reusable API request function
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // Default headers
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    // Merge options
    const config = {
      ...options,
      headers,
    };

    console.log(`Making request to ${API_BASE_URL}${endpoint}`, config);

    // Make the request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    console.log(`Response from ${endpoint}:`, { status: response.status, data });

    // Handle HTTP errors
    if (!response.ok) {
      const errorMessage = data.message || 'Something went wrong';
      console.error(`API Error (${response.status}):`, data);
      toast.error(errorMessage);
      return { error: errorMessage, debug: { status: response.status, data } };
    }

    return { data: data as T, message: data.message };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Network error';
    console.error('API Request failed:', error);
    toast.error(errorMessage);
    return { error: errorMessage, debug: { error } };
  }
}

// Helper methods for different request types
export const api = {
  get: <T>(endpoint: string, options?: RequestInit) => 
    apiRequest<T>(endpoint, { method: 'GET', ...options }),
  
  post: <T>(endpoint: string, data: unknown, options?: RequestInit) => 
    apiRequest<T>(endpoint, { 
      method: 'POST', 
      body: JSON.stringify(data), 
      ...options 
    }),
  
  put: <T>(endpoint: string, data: unknown, options?: RequestInit) => 
    apiRequest<T>(endpoint, { 
      method: 'PUT', 
      body: JSON.stringify(data), 
      ...options 
    }),
  
  patch: <T>(endpoint: string, data: unknown, options?: RequestInit) => 
    apiRequest<T>(endpoint, { 
      method: 'PATCH', 
      body: JSON.stringify(data), 
      ...options 
    }),
  
  delete: <T>(endpoint: string, options?: RequestInit) => 
    apiRequest<T>(endpoint, { method: 'DELETE', ...options }),
};

// Usage example:
/*
  // Get all tasks
  const { data, error } = await api.get<Task[]>('/tasks');
  
  // Create a new task
  const { data, error } = await api.post<Task>('/tasks', { 
    title: 'New Task',
    description: 'Task description'
  });
*/

// API endpoints
export const apiEndpoints = {
  // Auth endpoints
  auth: {
    login: (data: { email: string; password: string }) => 
      api.post<{ token: string }>('/api/auth/login', data),
    register: (data: any) => 
      api.post('/api/auth/register', data),
    forgotPassword: (email: string) => 
      api.post('/api/auth/forgot-password', { email }),
    resetPassword: (data: { token: string; password: string }) => 
      api.post('/api/auth/reset-password', data),
    getCurrentUser: () => api.get('/api/auth/user'),
  },
  
  // User endpoints
  users: {
    getAll: () => api.get('/api/users'),
    getById: (id: string) => api.get(`/api/users/${id}`),
    create: (data: any) => api.post('/api/users', data),
    update: (id: string, data: any) => api.put(`/api/users/${id}`, data),
    uploadAvatar: (id: string, formData: FormData) => 
      api.post(`/api/users/${id}/avatar`, formData, { 
        headers: {}, // Let browser set the content type with boundary
      }),
    uploadResume: (id: string, formData: FormData) => 
      api.post(`/api/users/${id}/resume`, formData, { 
        headers: {}, // Let browser set the content type with boundary
      }),
  },
  
  // Task endpoints
  tasks: {
    getAll: () => api.get('/api/tasks'),
    getById: (id: string) => api.get(`/api/tasks/${id}`),
    create: (data: any) => api.post('/api/tasks', data),
    update: (id: string, data: any) => api.put(`/api/tasks/${id}`, data),
    getByEmployer: (employerId: string) => api.get(`/api/tasks/employer/${employerId}`),
  },
  
  // Application endpoints
  applications: {
    getAll: () => api.get('/api/applications'),
    getById: (id: string) => api.get(`/api/applications/${id}`),
    create: (data: any) => api.post('/api/applications', data),
    updateStatus: (id: string, status: string) => api.patch(`/api/applications/${id}/status`, { status }),
    getByStudent: (studentId: string) => api.get(`/api/applications/student/${studentId}`),
    getByTask: (taskId: string) => api.get(`/api/applications/task/${taskId}`),
  },
  
  // Payment endpoints
  payments: {
    getAll: () => api.get('/api/payments'),
    getById: (id: string) => api.get(`/api/payments/${id}`),
    create: (data: any) => api.post('/api/payments', data),
    updateStatus: (id: string, status: string) => api.patch(`/api/payments/${id}/status`, { status }),
    getByEmployer: (employerId: string) => api.get(`/api/payments/employer/${employerId}`),
    getByStudent: (studentId: string) => api.get(`/api/payments/student/${studentId}`),
    uploadProof: (id: string, formData: FormData) => 
      api.post(`/api/payments/${id}/proof`, formData, { 
        headers: {}, // Let browser set the content type with boundary
      }),
  },
  
  // Message endpoints
  messages: {
    getAll: () => api.get('/api/messages'),
    getById: (id: string) => api.get(`/api/messages/${id}`),
    create: (data: any) => api.post('/api/messages', data),
    markAsRead: (id: string) => api.patch(`/api/messages/${id}/read`),
    getConversation: (userId1: string, userId2: string, taskId?: string) => {
      const endpoint = taskId 
        ? `/api/messages/conversation/${userId1}/${userId2}?taskId=${taskId}`
        : `/api/messages/conversation/${userId1}/${userId2}`;
      return api.get(endpoint);
    },
    getUnreadCount: (userId: string) => api.get(`/api/messages/unread/${userId}`),
    uploadAttachment: (formData: FormData) => {
      const options = { headers: {} }; // Let browser set content type with boundary
      return api.post('/api/messages/attachment', formData, options);
    },
  },
  
  // Review endpoints
  reviews: {
    getAll: () => api.get('/api/reviews'),
    getById: (id: string) => api.get(`/api/reviews/${id}`),
    create: (data: any) => api.post('/api/reviews', data),
    update: (id: string, data: any) => api.put(`/api/reviews/${id}`, data),
    getByUser: (userId: string) => api.get(`/api/reviews/user/${userId}`),
    getByTask: (taskId: string) => api.get(`/api/reviews/task/${taskId}`),
  },
  
  // Badges endpoints
  badges: {
    getAll: () => api.get('/api/badges'),
    getByUser: (userId: string) => api.get(`/api/badges/user/${userId}`),
  },
  
  // Analytics endpoints
  analytics: {
    getDashboard: (userId: string) => api.get(`/api/analytics/dashboard/${userId}`),
    getTasksStats: (period: string) => api.get(`/api/analytics/tasks?period=${period}`),
    getUsersStats: (period: string) => api.get(`/api/analytics/users?period=${period}`),
    getPaymentsStats: (period: string) => api.get(`/api/analytics/payments?period=${period}`),
  },
  
  // Health check
  health: () => api.get('/api/health'),
}; 