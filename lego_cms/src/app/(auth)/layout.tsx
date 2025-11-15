import React from 'react';

// (Impor font Anda atau provider global lainnya di sini)

/* Ini adalah ROOT LAYOUT. 
  Layout ini tidak memiliki Navbar/Footer.
  Next.js akan secara otomatis memasukkan (main)/layout.tsx ATAU (auth)/layout.tsx 
  ke dalam {children} di bawah ini, tergantung halaman yang diakses.
*/
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}