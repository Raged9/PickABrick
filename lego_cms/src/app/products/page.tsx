'use client';

// =====================================================================
// 1. IMPORT (Sudah dibersihkan)
// =====================================================================
import { Container, Row, Col, Card, Button, Navbar, Nav, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
// Hapus: 'bootstrap/dist/css/bootstrap.min.css' (sudah di layout)
// Hapus: import Form, InputGroup, faSearch, faXmark, faFacebook, dll.

// =====================================================================
// 2. DATA PRODUK & KATEGORI
// =====================================================================

const categories = ["All", "Minifigure", "Super-Heroes", "City", "Friends", "Harry Potter", "Modular"];

const allProducts = [
  {
    id: 1,
    sku: 'LEGO - 75432',
    name: 'Classic Town Hall',
    price: 'Rp 1.299.000,00',
    pieces: '25 pcs',
    image: '/images/products/product1.jpg',
    category: 'Modular'
  },
  {
    id: 2,
    sku: 'LEGO - 75432',
    name: 'Minifigure Set Series 1',
    price: 'Rp 1.599.000,00',
    pieces: '12 pcs',
    image: '/images/products/product2.jpg',
    category: 'Minifigure'
  },
  {
    id: 3,
    sku: 'LEGO - 75432',
    name: 'Lego Pet Shop',
    price: 'Rp 2.399.000,00',
    pieces: '8 pcs',
    image: '/images/products/product3.jpg',
    category: 'City'
  },
  {
    id: 4,
    sku: 'LEGO - 75432',
    name: 'Lego Palace Cinema',
    price: 'Rp 1.299.000,00',
    pieces: '23 pcs',
    image: '/images/products/product4.jpg',
    category: 'Modular'
  },
  {
    id: 5,
    sku: 'LEGO - 75432',
    name: 'Lego Pet Shop',
    price: 'Rp 2.399.000,00',
    pieces: '8 pcs',
    image: '/images/products/product3.jpg',
    category: 'City'
  },
  {
    id: 6,
    sku: 'LEGO - 75432',
    name: 'Minifigure Set Series 1',
    price: 'Rp 1.599.000,00',
    pieces: '12 pcs',
    image: '/images/products/product2.jpg',
    category: 'Minifigure'
  },
  {
    id: 7,
    sku: 'LEGO - 75432',
    name: 'Classic Town Hall',
    price: 'Rp 1.299.000,00',
    pieces: '25 pcs',
    image: '/images/products/product1.jpg',
    category: 'Modular'
  },
  {
    id: 8,
    sku: 'LEGO - 75432',
    name: 'Minifigure Set Series 1',
    price: 'Rp 1.599.000,00',
    pieces: '12 pcs',
    image: '/images/products/product2.jpg',
    category: 'Minifigure'
  },
  {
    id: 9,
    sku: 'LEGO - 75432',
    name: 'Lego Pet Shop',
    price: 'Rp 2.399.000,00',
    pieces: '8 pcs',
    image: '/images/products/product3.jpg',
    category: 'City'
  },
];


// =====================================================================
// 3. KOMPONEN HALAMAN
// =====================================================================
export default function ProductsPage() {
  
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = allProducts.filter(product => {
    if (selectedCategory === 'All') {
      return true;
    }
    return product.category === selectedCategory;
  });


  return (
    <>
      {/* Hapus: <style jsx global> */}
      {/* Hapus: Main <Navbar> */}

      {/* =============================================================== */}
      {/* 6. FILTER BAR (INI TETAP ADA) */}
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
              
              {filteredProducts.length > 0 ? (
                
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
      
      {/* Hapus: <Footer> */}
    </>
  );
}