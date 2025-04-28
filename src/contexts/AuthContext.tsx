import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'student' | 'employer' | 'admin';

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  skills?: string[];
  location?: string;
  education?: string;
  experience?: string;
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
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would be an API call to authenticate
      // For now, simulate API login and determine user role from email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate response data
      let userData: User;
      
      if (email.toLowerCase().includes('admin')) {
        userData = {
          _id: 'admin-123',
          fullName: 'Admin User',
          email: email,
          role: 'admin',
        };
      } else if (email.toLowerCase().includes('employer')) {
        userData = {
          _id: 'employer-123',
          fullName: 'Employer User',
          email: email,
          role: 'employer',
          location: 'San Francisco, CA',
          bio: 'Tech company looking for skilled developers',
        };
      } else {
        userData = {
          _id: 'student-123',
          fullName: 'Student User',
          email: email,
          role: 'student',
          bio: 'Passionate student looking for opportunities',
          location: 'New York, USA',
          education: 'Bachelor of Computer Science',
          experience: '1 year of freelance work',
          skills: ['JavaScript', 'React', 'Node.js'],
        };
      }
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      // Store a fake token to simulate authentication
      localStorage.setItem('token', 'fake-jwt-token');
      return;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: any) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would be an API call to create user
      // For now, simulate API registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a simulated user based on registration data
      const newUser: User = {
        _id: `${userData.role}-${Date.now()}`,
        fullName: userData.fullName,
        email: userData.email,
        role: userData.role as UserRole,
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      // Store a fake token to simulate authentication
      localStorage.setItem('token', 'fake-jwt-token');
      return;
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear user data and token
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    
    setIsLoading(true);
    try {
      // In a real implementation, this would be an API call to update user
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return;
    } catch (error) {
      console.error('Update user error:', error);
      throw new Error('Failed to update user');
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