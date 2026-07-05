import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axiosInstance from '../api/axiosInstance';
import { AgentProfile, LoginResponse } from '../types/auth';

interface AuthContextType {
  user: AgentProfile | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AgentProfile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // If token exists, session is considered active. 
    // (Optional: fetch profile details via a /me endpoint here)
    setLoading(false);
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post<LoginResponse>('/api/v1/auth/login/', { 
        email, 
        password 
      });
      
      const { token: userToken, data } = response.data;
      
      localStorage.setItem('auth_token', userToken);
      setToken(userToken);
      setUser(data);
      
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Invalid email or password structure.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be executed within an AuthProvider scope');
  }
  return context;
};