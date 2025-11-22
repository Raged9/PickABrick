'use client';

import { useState } from 'react';
import { Container, Card, Form, Button, CloseButton, Alert } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

const yellowBrickImg = '/images/studs.png';
const redBrickImg = '/images/brickclean.png';
const minifigureImg = '/images/legoman.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // SUKSES
        login(data.user);
        console.log('Login successful:', data);
        router.push('/'); 

      } else {
        // GAGAL
        setError(data.message || 'Login failed.');
      }
    } catch (err: any) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <Container 
        fluid 
        className="vh-100 d-flex align-items-center justify-content-center p-3 position-relative"
        style={{ backgroundColor: '#f8f9fa', overflow: 'hidden' }}
      >
        
        {/* === GAMBAR DEKORATIF === */}
        <Image src={yellowBrickImg} alt="Yellow brick" width={100} height={100} className="position-absolute d-none d-md-block" style={{ top: '10%', left: '15%', transform: 'rotate(30deg)', opacity: 0.9, zIndex: 1 }}/>
        <Image src={redBrickImg} alt="Red brick" width={170} height={100} className="position-absolute d-none d-md-block" style={{ bottom: '5%', left: '10%', transform: 'rotate(-5deg)', zIndex: 1 }}/>
        <Image src={minifigureImg} alt="Minifigure" width={220} height={320} className="position-absolute d-none d-lg-block" style={{ bottom: '0%', right: '10%', transform: 'rotate(10deg)', zIndex: 1 }}/>

        {/* === KARTU LOGIN === */}
        <Card 
          className="border-0 rounded-4 shadow-lg"
          style={{ width: '100%', maxWidth: '480px', zIndex: 2, position: 'relative' }}
        >
          <CloseButton 
            style={{ position: 'absolute', top: '1.5rem', right: '1.1rem', fontSize: '1rem', zIndex: 3 }}
            onClick={() => router.push('/')}
          />

          <Card.Body className="p-4 p-md-5">
            <h2 className="text-center fw-bold mb-4" style={{ fontSize: '2.1rem' }}>
              Sign In to Your <br />
              Pick A <span style={{ color: '#d9534f' }}>Brick</span> Account!
            </h2>
            
            <Form onSubmit={handleSubmit}>
              
              {/* Tampilkan pesan Error jika ada */}
              {error && <Alert variant="danger">{error}</Alert>}

              {/* Field Email */}
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label className="fw-semibold" style={{ color: '#555', fontSize: '0.9rem' }}>
                  Active Email
                </Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter your email here..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-3"
                  style={{ padding: '0.9rem 1rem', border: '2px solid #ced4da' }}
                />
              </Form.Group>

              {/* Field Password */}
              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label className="fw-semibold" style={{ color: '#555', fontSize: '0.9rem' }}>
                  Password
                </Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Enter your password here..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-3"
                  style={{ padding: '0.9rem 1rem', border: '2px solid #ced4da' }}
                />
              </Form.Group>

              {/* Tombol Submit */}
              <Button 
                type="submit"
                className="w-100 fw-bold rounded-3"
                style={{
                  backgroundColor: '#4A69E2',
                  borderColor: '#4A69E2',
                  fontSize: '1.1rem',
                  padding: '0.8rem 0'
                }}
                disabled={isLoading} // Nonaktifkan tombol saat loading
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Form>
            
            <p className="text-center text-muted mt-4 mb-0">
              Don't have an account?{' '}
              <Link href="/register" className="fw-bold" style={{ textDecoration: 'none' }}>
                Sign Up
              </Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
}