'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ISearchContext {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchContext = createContext<ISearchContext | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};