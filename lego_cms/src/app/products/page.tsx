'use client';

// 1. IMPORT SEMUA YANG ANDA PERLUKAN (SAMA SEPERTI HOMEPAGE)
import { Container, Row, Col, Card, Button, Navbar, Nav, Form, InputGroup, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProductsPage() {
  
  // DATA UNTUK HALAMAN INI (Bisa lebih banyak dari homepage)
  const allProducts = [
    {
      id: 1,
      sku: 'LEGO - 75432',
      name: 'Classic Town Hall',
      price: 'Rp 1.299.000,00',
      pieces: '25 pcs',
      image: '/images/products/product1.png'
    },
    {
      id: 2,
      sku: 'LEGO - 75432',
      name: 'Minifigure Set Series 1',
      price: 'Rp 1.599.000,00',
      pieces: '12 pcs',
      image: '/images/products/product2.png'
    },
    {
      id: 3,
      sku: 'LEGO - 75432',
      name: 'Lego Pet Shop', // Anda salah ketik 'Fun Shop' di homepage
      price: 'Rp 2.399.000,00',
      pieces: '8 pcs',
      image: '/images/products/product3.png'
    },
    {
      id: 4,
      sku: 'LEGO - 75432',
      name: 'Lego Palace Cinema',
      price: 'Rp 1.299.000,00',
      pieces: '23 pcs',
      image: '/images/products/product4.png'
    },
    {
      id: 5,
      sku: 'LEGO - 75432',
      name: 'Lego Pet Shop',
      price: 'Rp 2.399.000,00',
      pieces: '8 pcs',
      image: '/images/products/product5.png'
    },
    {
      id: 6,
      sku: 'LEGO - 75432',
      name: 'Minifigure Set Series 1',
      price: 'Rp 1.599.000,00',
      pieces: '12 pcs',
      image: '/images/products/product6.png'
    },
    // TAMBAHAN PRODUK (Seperti di gambar desain Anda)
    {
      id: 7,
      sku: 'LEGO - 75432',
      name: 'Classic Town Hall',
      price: 'Rp 1.299.000,00',
      pieces: '25 pcs',
      image: '/images/products/product1.png' // Ganti dengan gambar yang benar
    },
    {
      id: 8,
      sku: 'LEGO - 75432',
      name: 'Minifigure Set Series 1',
      price: 'Rp 1.599.000,00',
      pieces: '12 pcs',
      image: '/images/products/product2.png' // Ganti dengan gambar yang benar
    },
    {
      id: 9,
      sku: 'LEGO - 75432',
      name: 'Lego Pet Shop',
      price: 'Rp 2.399.000,00',
      pieces: '8 pcs',
      image: '/images/products/product3.png' // Ganti dengan gambar yang benar
    },
  ];

  return (
    <>
      {/* 2. STYLE GLOBAL (SALIN DARI HOMEPAGE) */}
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
          min-height: 600px;
          background-image: url('/images/hero-logo.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
        }
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .hero-content {
          position: relative;
          z-index: 1;
        }
        .product-image-wrapper {
          position: relative;
          width: 100%;
          height: 250px;
          background: #f5f5f5;
        }
      `}</style>

      {/* 3. NAVBAR (SALIN DARI HOMEPAGE) */}
      <Navbar expand="lg" className="bg-yellow sticky-top shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="fw-bold fs-4">
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
              {/* UBAH LINK INI */}
              <Nav.Link href="/products" className="fw-semibold text-dark">PRODUCTS</Nav.Link>
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
              <Button variant="light" className="d-flex align-items-center justify-content-center shadow-sm" style={{width: '32px', height: '32px', borderRadius: '50%'}}>
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

      {/* 4. KONTEN UTAMA HALAMAN INI */}
      <main>
        {/* Products Section (Konten Utama) */}
        <section className="py-5" id="products">
          <Container className="py-4">
            <h2 className="fw-bold mb-5">Products Available</h2>
            
            <Row className="g-4">
              {allProducts.map((product) => (
                <Col key={product.id} lg={4} md={6}>
                  <Card className="border-0 shadow-sm h-100">
                    <div className="position-relative product-image-wrapper">
                      <Image 
                        src={product.image || '/images/placeholder-product.png'}
                        alt={product.name}
                        fill
                        style={{objectFit: 'contain', padding: '20px'}}
                        onError={(e) => {
                          e.currentTarget.src = '/images/placeholder-product.png';
                        }}
                      />
                      <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
                        <Button variant="light" className="rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" style={{width: '35px', height: '35px'}}>
                          <FontAwesomeIcon icon={faHeart} size="sm" />
                        </Button>
                        <Button variant="light" className="rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" style={{width: '35px', height: '35px'}}>
                          <FontAwesomeIcon icon={faShoppingCart} size="sm" />
                        </Button>
                      </div>
                    </div>
                    <Card.Body>
                      <p className="text-muted small mb-2">SKU : {product.sku}</p>
                      <Card.Title className="fw-bold mb-3">{product.name}</Card.Title>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="fw-bold fs-5">{product.price}</span>
                        <span className="text-muted">🧩 {product.pieces}</span>
                      </div>
                      <Button as={Link} href={`/products/${product.id}`} variant="dark" className="w-100 rounded-3 fw-semibold">
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Filler Text Section */}
        <section className='py-5 bg-light'>
          <Container>
              <Row className='justify-content-center'>
                  <Col lg={8}>
                      <p className='text-muted'>
                        Excepteur efficient emerging, minim veniam enim slaying non carefully curated gauche. Vaporware fixie unicorn, blog trust fund deep v taxidermy. Enamel pin poke kogi, lo-fi aesthetic lovely tumblr quinoa tumeric. Exclusive ipsum charting Quezon City, musculature sunt artisan pork belly. Subway tile semiotics, locavore typewriter excepteur trust fund eu non fingerstache vape.
                      </p>
                      <p className='text-muted'>
                        Deserunt polaroid, direct trade iceland cutting-edge laborum deserunt esse lorem. Cupidatat id est, sharp classic his best, commodo nostrud delightful. Convivial wine selfies, DIY whatever post-ironic chartreuse retro. Flexitarian four dollar toast, listicle gochujang culpa.
                      </p>
                  </Col>
              </Row>
          </Container>
        </section>

        {/* Discount and Promo Section */}
        <section className="py-5">
          <Container className="py-4">
            <h2 className="fw-bold mb-5">Discount and Promo</h2>
            <Row className="g-4">
              <Col md={4}>
                <Card className='border-0'>
                  <Image src="/images/promo/promo1.png" alt="Promo 1" width={500} height={300} style={{objectFit: 'cover', borderRadius: '0.375rem'}} />
                  <Card.Body className='px-0'>
                    <Card.Title className='fw-semibold'>Title</Card.Title>
                    <Card.Text className='text-muted'>SLUG co</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                  <Card className='border-0'>
                  <Image src="/images/promo/promo2.png" alt="Promo 2" width={500} height={300} style={{objectFit: 'cover', borderRadius: '0.375rem'}} />
                  <Card.Body className='px-0'>
                    <Card.Title className='fw-semibold'>Title</Card.Title>
                    <Card.Text className='text-muted'>SLUG co</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                  <Card className='border-0'>
                  <Image src="/images/promo/promo3.png" alt="Promo 3" width={500} height={300} style={{objectFit: 'cover', borderRadius: '0.375rem'}} />
                  <Card.Body className='px-0'>
                    <Card.Title className='fw-semibold'>Title</Card.Title>
                    <Card.Text className='text-muted'>SLUG co</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      
      {/* 5. FOOTER (SALIN DARI HOMEPAGE) */}
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
    </>
  );
}