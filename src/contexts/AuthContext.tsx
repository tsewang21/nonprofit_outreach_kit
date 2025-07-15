import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import bcrypt from 'bcryptjs';

interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: 'super-admin' | 'campaign-manager' | 'volunteer-coordinator' | 'outreach-rep';
  permissions: string[];
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing - these bypass the database
const demoUsers: User[] = [
  {
    id: 'demo-admin',
    email: 'admin@yourorg.org',
    name: 'Admin User',
    role: 'super-admin',
    permissions: ['all'],
    avatar: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
  },
  {
    id: 'demo-manager',
    email: 'manager@yourorg.org',
    name: 'Campaign Manager',
    role: 'campaign-manager',
    permissions: ['campaigns.create', 'campaigns.edit', 'templates.manage', 'analytics.view'],
    avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
  }
];

// Simple local storage database functions
const getUsersFromStorage = (): StoredUser[] => {
  const usersJson = localStorage.getItem('nonprofit_users');
  return usersJson ? JSON.parse(usersJson) : [];
};

const saveUsersToStorage = (users: StoredUser[]): void => {
  localStorage.setItem('nonprofit_users', JSON.stringify(users));
};

const findUserByEmail = (email: string): StoredUser | null => {
  const users = getUsersFromStorage();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
};

const createUser = async (name: string, email: string, password: string): Promise<StoredUser> => {
  const users = getUsersFromStorage();
  const passwordHash = await bcrypt.hash(password, 10);
  
  const newUser: StoredUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email: email.toLowerCase(),
    name: name.trim(),
    passwordHash,
    role: 'outreach-rep', // Default role for new users
    permissions: ['campaigns.view', 'templates.view', 'analytics.view'],
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsersToStorage(users);
  return newUser;
};

const convertStoredUserToUser = (storedUser: StoredUser): User => ({
  id: storedUser.id,
  email: storedUser.email,
  name: storedUser.name,
  role: storedUser.role,
  permissions: storedUser.permissions,
  avatar: storedUser.avatar
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Check demo users first
      const demoUser = demoUsers.find(u => u.email === email);
      if (demoUser && password === 'password') {
        setUser(demoUser);
        localStorage.setItem('auth_user', JSON.stringify(demoUser));
        return true;
      }

      // Check registered users
      const storedUser = findUserByEmail(email);
      if (storedUser) {
        const isValidPassword = await bcrypt.compare(password, storedUser.passwordHash);
        if (isValidPassword) {
          const userForState = convertStoredUserToUser(storedUser);
          setUser(userForState);
          localStorage.setItem('auth_user', JSON.stringify(userForState));
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Check if email already exists (including demo users)
      const isDemoUser = demoUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (isDemoUser) {
        return false; // Email already exists as demo user
      }

      const existingUser = findUserByEmail(email);
      if (existingUser) {
        return false; // Email already exists
      }

      // Create new user
      const newStoredUser = await createUser(name, email, password);
      const newUser = convertStoredUserToUser(newStoredUser);
      
      // Log them in immediately
      setUser(newUser);
      localStorage.setItem('auth_user', JSON.stringify(newUser));
      
      return true;
    } catch (error) {
      console.error('SignUp error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const value = {
    user,
    login,
    signUp,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};