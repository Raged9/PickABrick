import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}