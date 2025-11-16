'use client';

import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Container, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import Image from 'next/image';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    return (
      <Container className="d-flex vh-100 justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="my-5 py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="text-center shadow-sm border-0 rounded-4">
            <Card.Body className="p-4 p-md-5">
              
              {/* Gambar Profil */}
              <Image 
                src="/images/profile.png"
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