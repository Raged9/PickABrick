'use client';

import { Container, Row, Col, Card, Button, Form, Badge, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBox, faChartLine, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

import { useFavorites } from './contexts/FavoritesContext';

interface Product {
  _id: string;
  sku: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  discount?: number;
}

export default function Home() {

  // Ref untuk About Section
  const aboutRef = useRef<HTMLDivElement | null>(null);

  // Fungsi Scroll ke About
  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        // Ambil 6 produk terbaru
        setProducts(data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Helper URL Gambar
  const getImageUrl = (path: string) => {
    if (!path) return '/images/placeholder-product.png';
    if (path.startsWith('http')) return path;
    return `http://localhost:5000/${path.replace(/\\/g, '/')}`;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section text-white py-5">
        <Container className="py-5 hero-content">
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-3 fw-bold mb-3">Welcome to Pick A Brick!</h1>
              <p className="lead mb-4">Where all the best and antique lego called gathered</p>
              <Button variant="light" size="lg" className="rounded-pill px-4 fw-semibold" onClick={scrollToAbout}>
                Learn More »
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ABOUT SECTION — BARU */}
      <section ref={aboutRef} className="py-5 bg-white">
        <Container className="py-4">
          <h2 className="fw-bold text-center mb-4">About Pick A Brick</h2>
          <p
            className="text-center mx-auto"
            style={{ maxWidth: '700px', fontSize: '1.1rem' }}
          >
            Pick A Brick adalah toko LEGO yang menyediakan berbagai koleksi mulai dari yang
            terbaru hingga yang rare & antique. Kami mengumpulkan berbagai item berkualitas
            dari seluruh dunia untuk para kolektor, builder, dan pengguna LEGO dari semua usia.
            Dengan ribuan stok dan penjualan yang terus meningkat, Pick A Brick selalu
            berkomitmen memberikan pengalaman terbaik bagi para penggemar LEGO.
          </p>
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

          {/* (5. BARU) Tampilkan Loading atau Produk */}
          {loading ? (
            <div className="text-center py-5">
                <Spinner animation="border" />
                <p className="mt-3">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-5 text-muted">
                <p>No products available at the moment.</p>
            </div>
          ) : (
            <Row className="g-4">
                {products.map((product) => {
                // (6. BARU) Cek status favorit (gunakan _id)
                const isFav = isFavorite(product._id);

                return (
                    <Col key={product._id} lg={4} md={6}>
                    <Card className="border-0 shadow-sm h-100">
                        <div className="position-relative product-image-wrapper" style={{height: '250px', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#f8f9fa'}}>
                        <Image 
                            // (7. BARU) Gunakan getImageUrl
                            src={getImageUrl(product.imageUrl)}
                            alt={product.name}
                            width={200} height={200}
                            style={{objectFit: 'contain', padding: '15px'}}
                            onError={(e) => {
                                e.currentTarget.srcset = '/images/placeholder-product.png';
                            }}
                        />
                        
                        {/* Badge Diskon */}
                        {(product.discount || 0) > 0 && (
                            <span className="position-absolute top-0 start-0 m-3 badge bg-danger">
                                Sale {product.discount}%
                            </span>
                        )}

                        <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
                            
                            {/* Tombol Hati (Terhubung ke Context) */}
                            <Button 
                                variant="light" 
                                className="rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" 
                                style={{width: '35px', height: '35px'}}
                                onClick={async () => {
                                    if (isFav) {
                                        await removeFavorite(product._id);
                                    } else {
                                        // Kirim data minimal untuk context (sesuaikan jika perlu)
                                        await addFavorite({
                                            id: product._id, // penting
                                            name: product.name,
                                            sku: product.sku,
                                            price: String(product.price),
                                            image: product.imageUrl,
                                            pieces: String(product.stock),
                                            category: 'General', // Default jika tidak ada di home
                                            description: ''
                                        } as any);
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
                        <Card.Title className="fw-bold mb-3 text-truncate">{product.name}</Card.Title>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            {/* Harga dengan format Rupiah */}
                            <span className="fw-bold fs-5">Rp {product.price.toLocaleString('id-ID')}</span>
                            {/* Stock Badge */}
                            <span className="badge bg-success py-2 px-3">
                                {product.stock} pcs
                            </span>
                        </div>
                        <Button as={Link} href={`/products/${product._id}`} variant="dark" className="w-100 rounded-3 fw-semibold">
                            View Details
                        </Button>
                        </Card.Body>
                    </Card>
                    </Col>
                );
                })}
            </Row>
          )}
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
              placeholder="Enter your email here..." 
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
