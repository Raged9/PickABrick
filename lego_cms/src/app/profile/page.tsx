'use client';

import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Container, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import Image from 'next/image';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // --- 1. Logika Perlindungan Rute ---
  // Cek ini saat komponen dimuat
  useEffect(() => {
    // Jika 'user' adalah null (tidak ada yang login),
    // kembalikan mereka ke halaman login.
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]); // Jalankan efek ini setiap kali 'user' berubah

  // --- 2. Logika Tombol Logout ---
  const handleLogout = () => {
    logout(); // Hapus user dari state global
    router.push('/'); // Kembalikan ke homepage
  };

  // --- 3. Tampilan Loading ---
  // Tampilkan ini selagi 'user' masih dicek
  // atau selagi proses redirect ke /login berjalan.
  if (!user) {
    return (
      <Container className="d-flex vh-100 justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  // --- 4. Tampilan Halaman Profil ---
  // Jika kita sampai di sini, berarti 'user' sudah terisi (login berhasil)
  return (
    <Container className="my-5 py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="text-center shadow-sm border-0 rounded-4">
            <Card.Body className="p-4 p-md-5">
              
              {/* Gambar Profil */}
              <Image 
                src="/images/profile.png" // Menggunakan gambar profil yang sama
                width={120} 
                height={120} 
                alt={user.username} 
                className="rounded-circle mb-3 border border-3" 
              />
              
              {/* Info User */}
              <h2 className="fw-bold mb-1">{user.username}</h2>
              <p className="text-muted fs-5">
                {user.email}
              </p>
              
              <hr className="my-4" />
              
              {/* Tombol Logout */}
              <Button 
                variant="danger" 
                size="lg" 
                className="w-100 fw-semibold rounded-3"
                onClick={handleLogout}
              >
                Logout
              </Button>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}