'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  email: string;
  favorites: string[];
  role: 'user' | 'admin';
  isTwoFactorEnabled: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
  isAdminUnlocked: boolean; 
  unlockAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  

  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false); 
  
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('app_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      
      
      const sessionUnlocked = sessionStorage.getItem('admin_unlocked');
      if (sessionUnlocked === 'true') {
        setIsAdminUnlocked(true);
      }

    } catch (error) {
      console.error("Gagal mengambil session user:", error);
      setUser(null);
      localStorage.removeItem('app_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('app_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAdminUnlocked(false);
    localStorage.removeItem('app_user');
    sessionStorage.removeItem('admin_unlocked'); 
    router.push('/login');
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('app_user', JSON.stringify(userData));
  };

  const unlockAdmin = () => {
    setIsAdminUnlocked(true);
    sessionStorage.setItem('admin_unlocked', 'true');
  };

  const isLoggedIn = !!user;

  const value = {
    user,
    isLoggedIn,
    isLoading,
    login,
    logout,
    updateUser,
    isAdminUnlocked, 
    unlockAdmin      
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
};