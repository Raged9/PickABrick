'use client';

import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Row, Col, Button, Navbar, Nav, Form, InputGroup, Modal, CloseButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

const yellowBrickImg = '/images/studs.png';
const redBrickImg = '/images/brickclean.png';
const minifigureImg = '/images/legoman.png';

import { FavoritesProvider } from './contexts/FavoritesContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SearchProvider, useSearch } from './contexts/SearchContext';

function AuthNavArea({ onShowLoginModal }: { onShowLoginModal: () => void }) {
  const { user } = useAuth();
  const { searchTerm, setSearchTerm } = useSearch();

  return (
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
      
      {/* Tombol Hati */}
      <Button as={Link} href="/favorites" variant="light" className="d-flex align-items-center justify-content-center shadow-sm" style={{width: '32px', height: '32px', borderRadius: '50%'}}>
        <FontAwesomeIcon icon={faHeart} />
      </Button>
      
      {user ? (
        // A. JIKA SUDAH LOGIN
        <div className="d-flex align-items-center gap-2">
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

          {/* Username (di KANAN, tanpa "Hi,") */}
          <span className="fw-semibold text-dark d-none d-lg-block">
            {user.username}
          </span>
        </div>
      ) : (
        // B. JIKA BELUM LOGIN (KODE ASLI ANDA)
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

          {/* Style Global */}
          <style jsx global>{`

          `}</style>

          {/* Navbar */}
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

          {/* Footer */}
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
            {/* (BARU) Modal Login diletakkan di sini */}
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
                
                {/* === GAMBAR DEKORATIF MODAL === */}
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

                {/* === KONTEN MODAL === */}
                <Container fluid style={{ zIndex: 2, position: 'relative' }}>
                  <Row className="justify-content-center text-center">
                    <Col xs={12}>
                      {/* Logo (Menggunakan logo dari Navbar Anda) */}
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
                      {/* Tombol Sign In */}
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