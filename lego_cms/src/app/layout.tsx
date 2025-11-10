'use client';

import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Navbar, Nav, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

// (1. BARU) Import Provider Favorit Anda
import { FavoritesProvider } from './contexts/FavoritesContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Pick A Brick - LEGO Store</title>
        <meta name="description" content="Where all the best and antique lego called gathered" />
      </head>
      <body>
        {/* (2. BARU) Bungkus semua dengan Provider */}
        <FavoritesProvider>

          {/* Style Global */}
          <style jsx global>{`
            .bg-yellow {
              background-color: #FDB913 !important;
            }
            .bg-navy {
              background-color: #1a1a4d !important;
            }
            .text-navy {
              color: #1a1a4d !important;
            }
            .btn-yellow {
              background-color: #FDB913;
              border-color: #FDB913;
              color: #000;
            }
            .btn-yellow:hover {
              background-color: #e5a711;
              border-color: #e5a711;
              color: #000;
            }
            .hero-section {
              min-height: 100vh;
              background-image: url('/images/hero-logo.jpg');
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              position: relative;
              display: flex;
              align-items: center;
            }
            .hero-section::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0,0,0,0.3);
              z-index: 0;
            }
            .hero-content {
              position: relative;
              z-index: 1;
              width: 100%;
            }
            .product-image-wrapper {
              position: relative;
              width: 100%;
              height: 250px;
              background: #f5f5ff;
            }
            .detail-image-wrapper {
              position: relative;
              width: 100%;
              min-height: 400px;
              background: #f8f9fa;
              border-radius: 0.375rem;
              overflow: hidden;
            }
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
                  <Nav.Link href="#discover" className="fw-semibold text-dark">DISCOVER</Nav.Link>
                  <Nav.Link href="#category" className="fw-semibold text-dark">CATEGORY</Nav.Link>
                </Nav>
                <div className="d-flex align-items-center ms-lg-5 gap-3">
                  <InputGroup style={{maxWidth: '400px', borderRadius: '50px', overflow: 'hidden'}}>
                    <InputGroup.Text className="bg-white border-0">
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <Form.Control 
                      type="text" 
                      placeholder="Search..." 
                      className="border-0"
                    />
                    <Button variant="white" className="border-0 bg-white">
                      <FontAwesomeIcon icon={faXmark} />
                    </Button>
                  </InputGroup>
                  
                  {/* (3. MODIFIKASI) Tombol hati di Navbar sekarang link ke halaman favorit */}
                  <Button as={Link} href="/favorites" variant="light" className="d-flex align-items-center justify-content-center shadow-sm" style={{width: '32px', height: '32px', borderRadius: '50%'}}>
                    <FontAwesomeIcon icon={faHeart} />
                  </Button>
                  
                  <div className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px', minWidth: '32px', minHeight: '32px', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer', backgroundColor: 'white'}}>
                    <Image 
                      src="/images/profile.png" 
                      alt="Profile" 
                      width={22} 
                      height={22}
                      style={{objectFit: 'cover', borderRadius: '50%'}}
                    />
                  </div>
                </div>
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
          </footer>
        
        </FavoritesProvider> {/* (4. BARU) Tutup Provider */}
      </body>
    </html>
  );
}