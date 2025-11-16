'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Definisikan seperti apa data user kita
interface IUser {
  id: string;
  email: string;
  username: string;
}

// 2. Definisikan apa yang akan disediakan oleh context
interface IAuthContext {
  user: IUser | null;
  login: (userData: IUser) => void;
  logout: () => void;
}

// 3. Buat Context
const AuthContext = createContext<IAuthContext | undefined>(undefined);

// 4. Buat Provider (komponen pembungkus)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = (userData: IUser) => {
    setUser(userData);
    // Di aplikasi nyata, Anda bisa menyimpan ini di localStorage
  };

  const logout = () => {
    setUser(null);
    // Hapus dari localStorage jika ada
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. Buat Hook kustom untuk kemudahan
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};