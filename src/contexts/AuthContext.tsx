import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';

type UserRole = 'student' | 'employer' | 'admin';

interface User {
  _id: string;
  name: string;
  fullName?: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  skills?: string[];
  location?: string;
  education?: string;
  experience?: string;
  profile?: {
    avatar?: string;
    location?: string;
    education?: string;
    experience?: string;
    skills?: string[];
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from token
    const loadUserFromToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }
      
      try {
        // Get current user data
        const userData = await api.auth.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user from token:', error);
        // Clear invalid token
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserFromToken();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Real API call to authenticate
      const response = await api.auth.login({ email, password });
      
      // Save token and user data
      localStorage.setItem('token', response.token);
      
      // Set user data from response
      const userData = response.user;
      setUser(userData);

      // Fallback in case API doesn't return full user data
      if (!userData) {
        const userDetails = await api.auth.getCurrentUser();
        setUser(userDetails);
      }

      return;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: any) => {
    setIsLoading(true);
    try {
      // Real API call to register user
      const response = await api.auth.register(userData);
      
      // Save token and user data
      localStorage.setItem('token', response.token);
      setUser(response.user);
      
      return;
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear user data and token
    setUser(null);
    localStorage.removeItem('token');
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    
    setIsLoading(true);
    try {
      // Real API call to update user
      const updatedUser = await api.users.update(user._id, userData);
      setUser(updatedUser);
      return;
    } catch (error) {
      console.error('Update user error:', error);
      throw new Error('Failed to update user profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      isLoading, 
      login, 
      signup, 
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 