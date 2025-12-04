import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import { FavoritesProvider } from './(main)/contexts/FavoritesContext';
import { AuthProvider } from './(main)/contexts/AuthContext';
import { SearchProvider } from './(main)/contexts/SearchContext';

export const metadata = {
  title: 'Pick A Brick - LEGO Store',
  description: 'Where all the best and antique lego called gathered',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <FavoritesProvider>
            <SearchProvider>
              {children}
            </SearchProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}