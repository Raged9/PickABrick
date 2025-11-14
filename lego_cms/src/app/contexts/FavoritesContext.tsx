'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
// (BARU) Import Tipe Data 'Product' dari file data Anda
import { Product } from '../../data/products';

// Definisikan tipe untuk Context
interface FavoritesContextType {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

// Buat Context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Buat Provider (Komponen yang akan "membungkus" aplikasi Anda)
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addFavorite = (product: Product) => {
    // Tambahkan produk HANYA jika belum ada
    if (!favorites.find(fav => fav.id === product.id)) {
      setFavorites(prevFavorites => [...prevFavorites, product]);
    }
  };

  const removeFavorite = (productId: number) => {
    setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== productId));
  };

  // Fungsi helper untuk mengecek apakah suatu produk sudah difavoritkan
  const isFavorite = (productId: number) => {
    return !!favorites.find(fav => fav.id === productId);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Buat Hook kustom untuk memudahkan penggunaan
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}