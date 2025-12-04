'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Product {
  _id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
  discount?: number;
}

interface IFavoritesContext {
  favorites: string[];
  addFavorite: (product: Product) => Promise<void>;
  removeFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean; 
  isLoading: boolean;
}

const FavoritesContext = createContext<IFavoritesContext | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
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
  }, [user]);


  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/favorites`;

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
    }
  };

  const addFavorite = async (product: Product) => {
    if (!user) {
      alert('Please log in to add favorites.');
      return;
    }
    const strId = String(product._id);
    
    const newFavorites = [...favorites, strId];
    setFavorites(newFavorites);

    updateUser({ ...user, favorites: newFavorites });

    await updateFavoritesOnServer(strId, 'add');
  };

  const removeFavorite = async (productId: string) => { 
    if (!user) return;
    
    const newFavorites = favorites.filter(id => id !== productId);
    setFavorites(newFavorites);

    updateUser({ ...user, favorites: newFavorites });

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