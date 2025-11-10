import { redirect } from 'next/navigation';

export default function Home() {
  // Langsung arahkan pengguna ke halaman dashboard admin
  redirect('/admin/dashboard');

  // Kita return null karena redirect akan terjadi di server
  return null;
}