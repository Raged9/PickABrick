import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pick A Brick - LEGO Store',
  description: 'Where all the best and antique lego called gathered',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}