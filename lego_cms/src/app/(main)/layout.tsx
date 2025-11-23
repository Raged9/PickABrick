'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Row, Col, Button, Navbar, Nav, Form, InputGroup, Modal, CloseButton, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark, faUserSecret, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const yellowBrickImg = '/images/studs.png';
const redBrickImg = '/images/brickclean.png';
const minifigureImg = '/images/legoman.png';

import { FavoritesProvider } from './contexts/FavoritesContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SearchProvider, useSearch } from './contexts/SearchContext';

function AuthNavArea({ onShowLoginModal }: { onShowLoginModal: () => void }) {
  const { user, updateUser } = useAuth();
  const { searchTerm, setSearchTerm } = useSearch();
  const router = useRouter();

  const [showCartModal, setShowCartModal] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);
  const [step, setStep] = useState<'input' | 'setup'>('input'); 
  const [qrCode, setQrCode] = useState('');
  const [token, setToken] = useState('');
  const [msg, setMsg] = useState('');
  const [secret, setSecret] = useState('');

  const handleDevModeClick = async () => {
    setMsg('');
    setToken('');
    
    if (user && !user.isTwoFactorEnabled) {
      try {
        const res = await fetch('http://localhost:5000/api/setup-2fa', { 
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ userId: user.id })
        });
        
        const data = await res.json();
        
        if (res.ok) {
          setQrCode(data.qrCode);
          setSecret(data.secret);
          setStep('setup');
          setShowDevModal(true);
        } else {
          alert('Gagal memuat QR Code: ' + (data.message || 'Unknown Error'));
        }
      } catch (err) {
        console.error(err);
        alert('Terjadi kesalahan koneksi ke server.');
      }
    } else {
      setStep('input');
      setShowDevModal(true);
    }
  };

  const verifyToken = async () => {
    if (!user) return;

    try {
      const res = await fetch('http://localhost:5000/api/verify-2fa', { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ userId: user.id, token })
      });
      
      const data = await res.json();

      if (res.ok && data.isValid) {
        setShowDevModal(false);
        
        if (step === 'setup') {
             updateUser({ ...user, isTwoFactorEnabled: true });
        }

        router.push('/admin/trends');
      } else {
        setMsg(data.message || 'Invalid Token! Please try again.');
      }
    } catch (err) {
      console.error(err);
      setMsg('Error verifying token. Check server connection.');
    }
  };

  return (
    <>
      <div className="d-flex align-items-center ms-lg-5 gap-3">
        <InputGroup style={{maxWidth: '400px', borderRadius: '50px', overflow: 'hidden'}}>
          <InputGroup.Text className="bg-white border-0">
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
          <Form.Control 
            type="text" 
            placeholder="Search..." 
            className="border-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="white" className="border-0 bg-white" onClick={() => setSearchTerm('')}>
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </InputGroup>
      
        <Button as={Link} href="/favorites" variant="light" className="d-flex align-items-center justify-content-center shadow-sm" style={{width: '32px', height: '32px', borderRadius: '50%'}}>
          <FontAwesomeIcon icon={faHeart} />
        </Button>

        <Button 
            variant="light" 
            className="d-flex align-items-center justify-content-center shadow-sm" 
            style={{width: '32px', height: '32px', borderRadius: '50%'}}
            onClick={() => setShowCartModal(true)}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
        </Button>
        
        {user ? (
          <div className="d-flex align-items-center gap-2">
            
            {user.role === 'admin' && (
              <Button 
                variant="dark"
                title="Developer Mode (Admin Area)"
                className="rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: '32px', height: '32px' }}
                onClick={handleDevModeClick}
              >
                <FontAwesomeIcon icon={faUserSecret} size="sm" />
              </Button>
            )}
            
            <Button 
              as={Link}
              href="/profile"
              variant="light"
              title="View Profile"
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '32px', 
                height: '32px', 
                minWidth: '32px', 
                minHeight: '32px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
                overflow: 'hidden'
              }}
            >
              <Image 
                src="/images/profile.png" 
                alt={user.username}
                width={22}
                height={22}
                style={{objectFit: 'cover', borderRadius: '50%'}}
              />
            </Button>

            <span className="fw-semibold text-dark d-none d-lg-block">
              {user.username}
            </span>
          </div>
        ) : (
          <Button 
            variant="light"
            onClick={onShowLoginModal}
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{width: '32px', height: '32px', minWidth: '32px', minHeight: '32px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden'}}
          >
            <Image 
              src="/images/profile.png" 
              alt="Profile" 
              width={22} height={22} style={{objectFit: 'cover', borderRadius: '50%'}}
            />
          </Button>
        )}
      </div>

      <Modal show={showDevModal} onHide={() => setShowDevModal(false)} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            <FontAwesomeIcon icon={faUserSecret} className="me-2" />
            Developer Mode Access
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-4">
          
          {step === 'setup' && (
            <div className="mb-4">
              <h5 className="mb-3">Setup 2-Factor Authentication</h5>
              <p className="text-muted small">
                For security, please scan this QR code with <strong>Google Authenticator</strong> app on your phone.
              </p>
              <div className="border p-3 d-inline-block rounded mb-3 bg-white">
                {qrCode ? <img src={qrCode} alt="QR Code" width={180} /> : <p>Loading QR...</p>}
              </div>
              <p className="text-muted small">
                Or enter this key manually: <br/>
                <strong className="text-dark font-monospace">{secret}</strong>
              </p>
            </div>
          )}

          {step === 'input' && (
            <div className="mb-3">
              <h5>Enter Authenticator Code</h5>
              <p className="text-muted">Please enter the 6-digit code from your app to enter Developer Mode.</p>
            </div>
          )}

          {msg && <Alert variant="danger" className="py-2 small">{msg}</Alert>}

          <Form.Group className="mb-4">
            <Form.Control 
              type="text" 
              placeholder="000000" 
              className="text-center fs-3 fw-bold"
              maxLength={6}
              value={token}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                setToken(val);
                if(val.length === 6) setMsg('');
              }}
              autoFocus
              style={{ letterSpacing: '0.5rem' }}
            />
          </Form.Group>

          <Button 
            variant="warning" 
            className="w-100 fw-bold py-2" 
            onClick={verifyToken}
            disabled={token.length < 6}
          >
            {step === 'setup' ? 'Verify & Activate' : 'Enter Developer Mode'}
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showCartModal} onHide={() => setShowCartModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="fw-bold">Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
            <p className="text-muted mb-4">Visit our marketplace to checkout items:</p>
            
            <div className="d-grid gap-3">
                {/* Tombol Tokopedia */}
                <Button 
                    as="a" 
                    href="https://www.tokopedia.com/"
                    target="_blank"
                    size="lg"
                    className="d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{ backgroundColor: '#42B549', borderColor: '#42B549' }}
                >
                     Buy on Tokopedia
                </Button>

                {/* Tombol Shopee */}
                <Button 
                    as="a" 
                    href="https://shopee.co.id/"
                    target="_blank"
                    size="lg"
                    className="d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{ backgroundColor: '#EE4D2D', borderColor: '#EE4D2D' }}
                >
                     Buy on Shopee
                </Button>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);

  return (
    <html lang="en">
      <head>
        <title>Pick A Brick - LEGO Store</title>
        <meta name="description" content="Where all the best and antique lego called gathered" />
      </head>
      <body>

        <AuthProvider>
          <FavoritesProvider>
            <SearchProvider>

          <style jsx global>{`
          `}</style>

          <Navbar expand="lg" className="bg-yellow sticky-top shadow-sm">
            <Container>
              <Navbar.Brand as={Link} href="/" className="fw-bold fs-4">
                <Image 
                  src="/images/logo.png" 
                  alt="Pick A Brick Logo" 
                  width={70} 
                  height={70}
                  style={{objectFit: 'contain'}}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span class="bg-dark text-warning px-3 py-2 rounded">PICK</span><span class="text-dark">go</span>';
                  }}
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbar-nav" />
              <Navbar.Collapse id="navbar-nav">
                <Nav className="me-auto ms-5">
                  <Nav.Link as={Link} href="/products" className="fw-semibold text-dark">PRODUCTS</Nav.Link>
                  <Nav.Link as={Link} href="/discover" className="fw-semibold text-dark">DISCOVER</Nav.Link>
                  <Nav.Link href="#category" className="fw-semibold text-dark">CATEGORY</Nav.Link>
                </Nav>
                  
                  <AuthNavArea onShowLoginModal={handleShowLoginModal} />
              
              </Navbar.Collapse>
            </Container>
          </Navbar>
          
          <main>
            {children}
          </main>

          <footer className="bg-navy text-white py-5">
            <Container>
              <Row className="g-4">
                <Col lg={3} md={6}>
                  <h5 className="fw-bold mb-3">About Us</h5>
                  <p className="text-white-50">Your trusted source for high quality LEGO products</p>
                </Col>
                <Col lg={2} md={6}>
                  <h6 className="fw-bold mb-3">Topic</h6>
                  <ul className="list-unstyled">
                    <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Page</a></li>
                    <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Page</a></li>
                    <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Page</a></li>
                  </ul>
                </Col>
                <Col lg={2} md={6}>
                  <h6 className="fw-bold mb-3">Topic</h6>
                  <ul className="list-unstyled">
                    <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Page</a></li>
                    <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Page</a></li>
                    <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Page</a></li>
                  </ul>
                </Col>
                <Col lg={3} md={6}>
                  <h6 className="fw-bold mb-3">Follow Us</h6>
                  <div className="d-flex gap-2">
                    <Button variant="outline-light" className="rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                      <FontAwesomeIcon icon={faFacebook} />
                    </Button>
                    <Button variant="outline-light" className="rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                      <FontAwesomeIcon icon={faLinkedin} />
                    </Button>
                    <Button variant="outline-light" className="rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                      <FontAwesomeIcon icon={faTwitter} />
                    </Button>
                    <Button variant="outline-light" className="rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                      <FontAwesomeIcon icon={faYoutube} />
                    </Button>
                  </div>
                </Col>
              </Row>
              <hr className="my-4 bg-white opacity-25" />
              <p className="text-center text-white-50 mb-0">© 2024 Pick A Brick. All rights reserved.</p>
            </Container>

            <Modal
              show={showLoginModal}
              onHide={handleCloseLoginModal}
              centered
              dialogClassName="rounded-4"
              contentClassName="border-0 rounded-4"
            >
              <Modal.Body 
                className="p-4 p-md-5 position-relative"
                style={{ 
                  overflow: 'hidden',
                  minHeight: '500px',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <CloseButton 
                  onClick={handleCloseLoginModal}
                  className="position-absolute"
                  style={{ top: '20px', right: '20px', zIndex: 10 }}
                />
                
                <Image
                  src={yellowBrickImg}
                  alt="Yellow brick"
                  width={80}
                  height={80}
                  className="position-absolute d-none d-md-block"
                  style={{ top: '5%', left: '5%', zIndex: 1, transform: 'rotate(-15deg)' }}
                />
                <Image
                  src={redBrickImg}
                  alt="Red brick"
                  width={150}
                  height={90}
                  className="position-absolute d-none d-md-block"
                  style={{ bottom: '3%', left: '0%', zIndex: 1, transform: 'translateX(-10%)' }}
                />
                <Image
                  src={minifigureImg}
                  alt="Minifigure"
                  width={180}
                  height={260}
                  className="position-absolute d-none d-md-block"
                  style={{ bottom: '0%', right: '-2%', zIndex: 1, transform: 'rotate(10deg)' }}
                />

                <Container fluid style={{ zIndex: 2, position: 'relative' }}>
                  <Row className="justify-content-center text-center">
                    <Col xs={12}>
                      <Image 
                        src="/images/logo.png" 
                        alt="Pick A Brick Logo" 
                        width={100} 
                        height={100}
                        style={{objectFit: 'contain'}}
                      />
                    </Col>
                    
                    <Col xs={12} className="mt-4">
                      <h4 className="fw-bold">Sign in to your Pick A Brick Account</h4>
                    </Col>
                    
                    <Col xs={12} md={10} className="mt-4">
                      <Button 
                        as={Link} 
                        href="/login" 
                        variant="primary"
                        className="w-100 rounded-pill fw-semibold"
                        style={{ padding: '0.75rem', fontSize: '1.1rem', backgroundColor: '#4A69E2', borderColor: '#4A69E2' }}
                        onClick={handleCloseLoginModal}
                      >
                        Sign In
                      </Button>
                    </Col>
                    
                    <Col xs={12} className="mt-4">
                      <p className="mb-0">
                        Don't have an account?{' '}
                        <Link href="/register" onClick={handleCloseLoginModal} className="fw-bold" style={{ textDecoration: 'none' }}>
                          Register
                        </Link>
                      </p>
                    </Col>
                  </Row>
                </Container>

              </Modal.Body>
            </Modal>
          </footer>
          
          </SearchProvider>
          </FavoritesProvider> 
        </AuthProvider>
      </body>
    </html>
  );
}