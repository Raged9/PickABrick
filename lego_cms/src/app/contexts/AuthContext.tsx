'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';

// 1. Tentukan Tipe Data untuk User
//    (ProfilePage Anda butuh 'username' dan 'email')
interface User {
  id: string; // atau number, sesuaikan dengan data Anda
  username: string;
  email: string;
  // Anda bisa tambahkan field lain di sini jika perlu
}

// 2. Tentukan Tipe Data untuk Nilai Context
//    Ini adalah semua data dan fungsi yang akan "dibagikan"
interface AuthContextType {
  user: User | null;       // Data user (atau null jika tidak login)
  isLoggedIn: boolean;     // Status login (true/false)
  isLoading: boolean;      // Status loading (untuk cek session)
  login: (userData: User) => void; // Fungsi untuk login
  logout: () => void;      // Fungsi untuk logout
}

// 3. Buat Context-nya
//    Nilai 'undefined' adalah nilai awal sebelum Provider siap
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Buat Komponen "Provider"
//    Komponen ini yang akan "membungkus" aplikasi Anda
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Mulai dengan true!
  const router = useRouter();

  // 5. Efek untuk Mengecek Session (PENTING!)
  //    Ini berjalan *sekali* saat aplikasi pertama kali di-load
  useEffect(() => {
    try {
      // Coba ambil data user dari localStorage
      const storedUser = localStorage.getItem('app_user');
      
      if (storedUser) {
        // Jika ada, set user-nya ke state
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Gagal mengambil session user:", error);
      // Jika error (misal data JSON rusak), pastikan user-nya null
      setUser(null);
      localStorage.removeItem('app_user');
    } finally {
      // APAPUN HASILNYA, loading selesai.
      // Ini akan menghentikan "Loading profile..." di ProfilePage
      setIsLoading(false);
    }
  }, []); // [] = jalankan sekali saja

  // 6. Buat Fungsi 'login'
  const login = (userData: User) => {
    // 1. Simpan data user ke state
    setUser(userData);
    // 2. Simpan data user ke localStorage agar "awet"
    localStorage.setItem('app_user', JSON.stringify(userData));
  };

  // 7. Buat Fungsi 'logout'
  const logout = () => {
    // 1. Kosongkan data user dari state
    setUser(null);
    // 2. Hapus data user dari localStorage
    localStorage.removeItem('app_user');
    // 3. (Opsional) Arahkan user ke halaman login
    router.push('/login');
  };

  // 8. Tentukan 'isLoggedIn' secara dinamis
  //    '!!user' adalah trik:
  //    - Jika user 'null',     jadi 'false'
  //    - Jika user 'object',   jadi 'true'
  const isLoggedIn = !!user;

  // 9. Siapkan "nilai" yang akan dibagikan oleh Provider
  const value = {
    user,
    isLoggedIn,
    isLoading, // Ini yang ditunggu oleh ProfilePage!
    login,
    logout,
  };

  // 10. Kembalikan Provider dengan nilai tersebut
  return (
    <AuthContext.Provider value={value}>
      {/* 'children' adalah seluruh aplikasi Anda */}
      {children}
    </AuthContext.Provider>
  );
}

// 11. Buat Custom Hook 'useAuth' (PENTING!)
//     Ini yang akan Anda panggil di 'ProfilePage.tsx' dan komponen lain
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Jika komponen (misal ProfilePage) memanggil 'useAuth'
  // tapi TIDAK berada di dalam 'AuthProvider', lempar error
  if (context === undefined) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }

  return context;
};