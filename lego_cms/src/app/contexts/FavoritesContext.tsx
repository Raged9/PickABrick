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
          productId: productId,
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
    setFavorites(prev => [...prev, product.id]);
    await updateFavoritesOnServer(product.id, 'add');
  };

  const removeFavorite = async (productId: string) => { 
    if (!user) return;
    setFavorites(prev => prev.filter(id => id !== productId));
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