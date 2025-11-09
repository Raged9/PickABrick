'use client';

// =====================================================================
// 1. IMPORT SEMUA DEPENDENSI
// =====================================================================
import { Container, Row, Col, Card, Button, Navbar, Nav, Form, InputGroup, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react'; // <-- Import untuk fitur filter
import 'bootstrap/dist/css/bootstrap.min.css';

// =====================================================================
// 2. DATA PRODUK & KATEGORI
// =====================================================================

// Daftar kategori untuk filter bar Anda
const categories = ["All", "Minifigure", "Super-Heroes", "City", "Friends", "Harry Potter", "Modular"];

// Database produk Anda (HARUS menyertakan properti 'category')
const allProducts = [
 {
    id: 1,
    sku: 'LEGO - 75432',
    name: 'Classic Town Hall',
    price: 'Rp 1.299.000,00',
    pieces: '25 pcs',
    image: '/images/products/product1.jpg',
    category: 'Modular' // <-- Kategori ditambahkan
  },
  {
    id: 2,
    sku: 'LEGO - 75432',
    name: 'Minifigure Set Series 1',
    price: 'Rp 1.599.000,00',
    pieces: '12 pcs',
    image: '/images/products/product2.jpg',
    category: 'Minifigure' // <-- Kategori ditambahkan
  },
  {
    id: 3,
    sku: 'LEGO - 75432',
    name: 'Lego Pet Shop',
    price: 'Rp 2.399.000,00',
    pieces: '8 pcs',
    image: '/images/products/product3.jpg',
    category: 'City' // <-- Kategori ditambahkan
  },
  {
    id: 4,
    sku: 'LEGO - 75432',
    name: 'Lego Palace Cinema',
    price: 'Rp 1.299.000,00',
    pieces: '23 pcs',
    image: '/images/products/product4.jpg',
    category: 'Modular' // <-- Kategori ditambahkan
  },
  {
    id: 5,
    sku: 'LEGO - 75432',
    name: 'Lego Pet Shop',
    price: 'Rp 2.399.000,00',
    pieces: '8 pcs',
    image: '/images/products/product3.jpg',
    category: 'City' // <-- Kategori ditambahkan
  },
  {
    id: 6,
    sku: 'LEGO - 75432',
    name: 'Minifigure Set Series 1',
    price: 'Rp 1.599.000,00',
    pieces: '12 pcs',
    image: '/images/products/product2.jpg',
    category: 'Minifigure' // <-- Kategori ditambahkan
  },
  {
    id: 7,
    sku: 'LEGO - 75432',
    name: 'Classic Town Hall',
    price: 'Rp 1.299.000,00',
    pieces: '25 pcs',
    image: '/images/products/product1.jpg',
    category: 'Modular' // <-- Kategori ditambahkan
  },
  {
    id: 8,
    sku: 'LEGO - 75432',
    name: 'Minifigure Set Series 1',
    price: 'Rp 1.599.000,00',
    pieces: '12 pcs',
    image: '/images/products/product2.jpg',
    category: 'Minifigure' // <-- Kategori ditambahkan
  },
  {
    id: 9,
    sku: 'LEGO - 75432',
    name: 'Lego Pet Shop',
    price: 'Rp 2.399.000,00',
    pieces: '8 pcs',
    image: '/images/products/product3.jpg',
    category: 'City' // <-- Kategori ditambahkan
  },
];


// =====================================================================
// 3. KOMPONEN HALAMAN
// =====================================================================
export default function ProductsPage() {
  
  // State untuk menyimpan filter yang sedang aktif
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Logika untuk mem-filter produk berdasarkan state
  const filteredProducts = allProducts.filter(product => {
    if (selectedCategory === 'All') {
      return true; // Tampilkan semua jika filter 'All'
    }
    return product.category === selectedCategory; // Tampilkan yang cocok
  });


  return (
    <>
      {/* =============================================================== */}
      {/* 4. STYLE GLOBAL */}
      {/* =============================================================== */}
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

      {/* =============================================================== */}
      {/* 5. NAVBAR (HEADER) */}
      {/* =============================================================== */}
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

      {/* =============================================================== */}
      {/* 6. FILTER BAR (BARU) */}
      {/* =============================================================== */}
      <Navbar bg="light" variant="light" className="shadow-sm py-0" style={{ borderBottom: '1px solid #dee2e6' }}>
        <Container>
          <Nav className="flex-wrap">
            {categories.map((category) => (
              <Nav.Link 
                key={category}
                onClick={() => setSelectedCategory(category)}
                active={selectedCategory === category}
                className="fw-semibold"
                style={{fontSize: '0.9rem', padding: '0.75rem 0.5rem'}}
              >
                {category.toUpperCase()}
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>

      {/* =============================================================== */}
      {/* 7. KONTEN UTAMA HALAMAN */}
      {/* =============================================================== */}
      <main>
        {/* Products Section (Konten Utama) */}
        <section className="py-5" id="products">
          <Container className="py-4">
            <h2 className="fw-bold mb-5">Products Available</h2>
            
            <Row className="g-4">
              
              {/* Cek apakah ada produk hasil filter */}
              {filteredProducts.length > 0 ? (
                
                // Gunakan 'filteredProducts' untuk me-render kartu
                filteredProducts.map((product) => (
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
                ))
              ) : (
                // Tampilkan pesan jika tidak ada produk
                <Col className="text-center py-5">
                  <h4 className='text-muted'>No products found for "{selectedCategory}".</h4>
                </Col>
              )}
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
                        Deserunt polaroid, direct trade iceland cutting-edge laborum deserunt esse lorem. Cupidatat id est, sharp classic his best, commodo nostrud delightful. Convivial wine selfies, DIY whatever post-ironic chartreuse retro. Flexitarian four dollar toast, listicle goch_ujang culpa.
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
      
      {/* =============================================================== */}
      {/* 8. FOOTER */}
      {/* =============================================================== */}
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