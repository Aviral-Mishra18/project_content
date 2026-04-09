import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthUser } from '@/types/tweet';

interface AuthContextType {
  isLoggedIn: boolean;
  user: AuthUser | null;
  login: (userData: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Check for existing session
    try {
      const savedUser = localStorage.getItem('user_session');
      if (savedUser) {
        const parsed = JSON.parse(savedUser) as AuthUser;
        setUser(parsed);
        setIsLoggedIn(true);
      }
    } catch {
      localStorage.removeItem('user_session');
    }
  }, []);

  const login = useCallback((userData: AuthUser) => {
    localStorage.setItem('user_session', JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user_session');
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
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
