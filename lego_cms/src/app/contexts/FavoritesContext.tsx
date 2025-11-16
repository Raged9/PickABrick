'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Product } from '../../data/products'; 

interface IFavoritesContext {
  favorites: string[];
  addFavorite: (product: Product) => Promise<void>;
  removeFavorite: (productId: number) => Promise<void>;
  isFavorite: (productId: number) => boolean;
  isLoading: boolean;
}

const FavoritesContext = createContext<IFavoritesContext | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth(); 
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
  }, [user]);

  const updateFavoritesOnServer = async (productId: string, action: 'add' | 'remove') => {
    if (!user) return; 
    try {
      await fetch('/api/favorites', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          productId: productId, // Kirim ID sebagai string
          action: action,
        }),
      });
    } catch (error) {
      console.error('Failed to update favorites on server:', error);
      if (action === 'add') {
        setFavorites(prev => prev.filter(id => id !== productId));
      } else {
        setFavorites(prev => [...prev, productId]);
      }
    }
  };

  const addFavorite = async (product: Product) => {
    if (!user) {
      alert('Please log in to add favorites.');
      return;
    }
    const productIdString = String(product.id); 
    
    setFavorites(prev => [...prev, productIdString]);
    
    await updateFavoritesOnServer(productIdString, 'add');
  };

  const removeFavorite = async (productId: number) => {
    if (!user) return;
    const productIdString = String(productId); 
    
    setFavorites(prev => prev.filter(id => id !== productIdString));
    
    await updateFavoritesOnServer(productIdString, 'remove');
  };

  const isFavorite = (productId: number) => {
    return favorites.includes(String(productId));
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