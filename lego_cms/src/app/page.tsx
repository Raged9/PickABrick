'use client';

// Import HANYA yang diperlukan untuk halaman ini
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBox, faChartLine, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'; // (1. BARU) Hati penuh
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'; // (2. MODIFIKASI) Ganti nama
import Image from 'next/image';
import Link from 'next/link';

// (3. BARU) Import hook 'useFavorites' dan data produk
import { useFavorites } from './contexts/FavoritesContext';
import { allProducts } from '../data/products';


export default function Home() {
  
  // (4. BARU) Ambil data dan fungsi dari context
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  // Ambil 6 produk pertama untuk homepage
  const products = allProducts.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section text-white py-5">
        <Container className="py-5 hero-content">
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-3 fw-bold mb-3">Welcome to Pick A Brick!</h1>
              <p className="lead mb-4">Where all the best and antique lego called gathered</p>
              <Button variant="light" size="lg" className="rounded-pill px-4 fw-semibold">
                Learn More »
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="bg-light py-5">
        <Container className="py-4">
          <h2 className="text-center fw-bold mb-5">Stats Pick A Brick</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="border-0 shadow-sm text-center h-100">
                <Card.Body className="p-4">
                  <div className="bg-yellow rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{width: '80px', height: '80px'}}>
                    <FontAwesomeIcon icon={faBox} size="2x" />
                  </div>
                  <h3 className="fw-bold">2,483</h3>
                  <p className="mb-1 fw-semibold">Total Stock</p>
                  <small className="text-muted">Items Available</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm text-center h-100">
                <Card.Body className="p-4">
                  <div className="bg-yellow rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{width: '80px', height: '80px'}}>
                    <FontAwesomeIcon icon={faChartLine} size="2x" />
                  </div>
                  <h3 className="fw-bold">10,278</h3>
                  <p className="mb-1 fw-semibold">Total Sales</p>
                  <small className="text-muted">This Month</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm text-center h-100">
                <Card.Body className="p-4">
                  <div className="bg-yellow rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{width: '80px', height: '80px'}}>
                    <FontAwesomeIcon icon={faStar} size="2x" />
                  </div>
                  <h3 className="fw-bold">4.8 / 5</h3>
                  <p className="mb-1 fw-semibold">Total Reviews</p>
                  <small className="text-muted">From 3,269 Reviews</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Products Section */}
      <section className="py-5" id="products">
        <Container className="py-4">
          <h2 className="text-center fw-bold mb-5">Stock and Products</h2>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h5 className="fw-bold">Newest Stock Arrivals</h5>
              <p className="text-muted mb-0">Latest LEGO Products in our inventory</p>
            </div>
            <Button as={Link} href="/products" className="btn-yellow fw-semibold rounded-pill px-4">
              See More »
            </Button>
          </div>

          <Row className="g-4">
            {products.map((product) => {
              // (5. BARU) Cek status favorit untuk setiap produk
              const isFav = isFavorite(product.id);

              return (
                <Col key={product.id} lg={4} md={6}>
                  <Card className="border-0 shadow-sm h-100">
                    <div className="position-relative product-image-wrapper">
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        fill
                        style={{objectFit: 'contain', padding: '20px'}}
                        onError={(e) => {
                          e.currentTarget.src = '/images/placeholder-product.png';
                        }}
                      />
                      <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
                        
                        {/* (6. DIUBAH) Tombol Hati yang sudah berfungsi */}
                        <Button 
                          variant="light" 
                          className="rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" 
                          style={{width: '35px', height: '35px'}}
                          onClick={() => {
                            if (isFav) {
                              removeFavorite(product.id);
                            } else {
                              addFavorite(product);
                            }
                          }}
                        >
                          <FontAwesomeIcon 
                            icon={isFav ? faHeartSolid : faHeartRegular} 
                            size="sm" 
                            color={isFav ? 'red' : 'inherit'} 
                          />
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
              );
            })}
          </Row>
        </Container>
      </section>

      {/* Limited Offers */}
      <section className="bg-light py-5">
        <Container className="py-4">
          <h2 className="text-center fw-bold mb-5">Limited Time Offers</h2>
          <Row className="g-4">
            <Col md={6}>
              <Card className="border-0 shadow-sm h-100">
                <div className="position-relative" style={{height: '300px'}}>
                  <Image 
                    src="/images/offers/offer1.png" 
                    alt="Sale 40%"
                    fill
                    style={{objectFit: 'cover'}}
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder-offer.png';
                    }}
                  />
                </div>
                <Card.Body className="p-4">
                  <Badge bg="danger" className="rounded-pill px-3 py-2 mb-3">Sale 40%</Badge>
                  <p className="mb-0">Body text for whatever you'd like to add more to the subheading</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 shadow-sm h-100">
                <div className="position-relative" style={{height: '300px'}}>
                  <Image 
                    src="/images/offers/offer2.png" 
                    alt="Limited Items"
                    fill
                    style={{objectFit: 'cover'}}
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder-offer.png';
                    }}
                  />
                </div>
                <Card.Body className="p-4">
                  <Badge bg="danger" className="rounded-pill px-3 py-2 mb-3">Limited Items (100 pcs)</Badge>
                  <p className="mb-0">Body text for whatever you'd like to expand on the main point</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="bg-yellow py-5">
        <Container className="text-center py-4">
          <h3 className="fw-bold mb-4">Subscribe to our newsletter for exclusive deals and new arrivals</h3>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Form.Control 
              type="email" 
              placeholder="Enter your email" 
              className="rounded-3"
              style={{maxWidth: '400px'}} 
            />
            <Button className="bg-navy text-white fw-semibold rounded-3 px-4 border-0">
              Subscribe
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
} 