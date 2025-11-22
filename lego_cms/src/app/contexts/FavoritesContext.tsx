'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Product } from '../../data/products'; 

interface IFavoritesContext {
  favorites: string[];
  addFavorite: (product: Product) => Promise<void>;
  removeFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean; 
  isLoading: boolean;
}

const FavoritesContext = createContext<IFavoritesContext | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  // (1. BARU) Ambil fungsi updateUser
  const { user, updateUser } = useAuth(); 
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (user && user.favorites) {
      setFavorites(user.favorites);
    } else {
      setFavorites([]);
    }
    setIsLoading(false);
  }, [user]); // Efek ini akan jalan saat user (termasuk favorites-nya) berubah

  // (2. PENTING) Pastikan URL mengarah ke Backend Port 5000
  const API_URL = 'http://localhost:5000/api/favorites';

  const updateFavoritesOnServer = async (productId: string, action: 'add' | 'remove') => {
    if (!user) return;
    try {
      await fetch(API_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          productId: productId,
          action: action,
        }),
      });
    } catch (error) {
      console.error('Failed to update favorites on server:', error);
      // Rollback (opsional, logika di bawah sudah menangani update state)
    }
  };

  const addFavorite = async (product: Product) => {
    if (!user) {
      alert('Please log in to add favorites.');
      return;
    }
    const strId = String(product.id);
    
    // 1. Update state lokal FavoritesContext (agar UI cepat)
    const newFavorites = [...favorites, strId];
    setFavorites(newFavorites);

    // 2. Update AuthContext & LocalStorage (agar tidak hilang saat refresh)
    updateUser({ ...user, favorites: newFavorites });

    // 3. Kirim ke Backend
    await updateFavoritesOnServer(strId, 'add');
  };

  const removeFavorite = async (productId: string) => { 
    if (!user) return;
    
    // 1. Update state lokal
    const newFavorites = favorites.filter(id => id !== productId);
    setFavorites(newFavorites);

    // 2. Update AuthContext & LocalStorage
    updateUser({ ...user, favorites: newFavorites });

    // 3. Kirim ke Backend
    await updateFavoritesOnServer(productId, 'remove');
  };

  const isFavorite = (productId: string) => { 
    return favorites.includes(productId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, isLoading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};