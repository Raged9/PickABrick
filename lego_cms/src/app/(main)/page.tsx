'use client';

import { Container, Row, Col, Card, Button, Form, Badge, Spinner, Carousel } from 'react-bootstrap';
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

  const aboutRef = useRef<HTMLDivElement | null>(null);

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  
  const [loading, setLoading] = useState(true);
  
  const [stats, setStats] = useState({ totalStock: 0, totalUsers: 0, totalReviews: 0 });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        
        setProducts(data.slice(0, 6));

        const sortedByDiscount = data
            .filter((p: Product) => (p.discount || 0) > 0)
            .sort((a: Product, b: Product) => (b.discount || 0) - (a.discount || 0))
            .slice(0, 10);
            
        setDiscountedProducts(sortedByDiscount);

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
        try {
            const res = await fetch(`${API_URL}/stats`);
            const data = await res.json();
            setStats(data);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };
    fetchStats();
  }, []);

  const getImageUrl = (path: string) => {
    if (!path) return '/images/placeholder-product.png';
    if (path.startsWith('http')) return path;
    return `${BASE_URL}/${path.replace(/\\/g, '/')}`;
  };

  const HotDealCard = ({ product }: { product: Product }) => {
    const discountAmount = (product.price * (product.discount || 0)) / 100;
    const finalPrice = product.price - discountAmount;

    return (
      <Card className="border-0 shadow-sm h-100 flex-row overflow-hidden mx-auto" style={{maxWidth: '800px'}}>
        <div className="position-relative bg-white" style={{width: '40%', minHeight: '300px'}}>
          <Image 
            src={getImageUrl(product.imageUrl)} 
            alt={product.name}
            fill
            style={{objectFit: 'contain', padding: '20px'}}
            onError={(e) => {
              e.currentTarget.srcset = '/images/placeholder-product.png';
            }}
          />
          <Badge bg="danger" className="position-absolute top-0 start-0 m-3 fs-6 px-3 py-2">
             SAVE {product.discount}%
          </Badge>
        </div>
        
        <Card.Body className="d-flex flex-column justify-content-center p-4 p-md-5" style={{width: '60%', backgroundColor: '#fff'}}>
          <div className="mb-2">
            <Badge bg="warning" text="dark" className="me-2">HOT DEAL</Badge>
            <small className="text-muted">Limited Time Offer</small>
          </div>
          
          <h3 className="fw-bold text-truncate mb-3" title={product.name}>
              {product.name}
          </h3>
          
          <div className="mb-4">
             <span className="text-muted text-decoration-line-through me-3 fs-5">
               Rp {product.price.toLocaleString('id-ID')}
             </span>
             <span className="text-danger fw-bold display-6">
               Rp {finalPrice.toLocaleString('id-ID')}
             </span>
          </div>

          <p className="mb-4 text-muted d-none d-md-block">
             Get this item now before it's gone! Limited stock available for this exclusive price drop.
          </p>
          
          <div className="d-flex gap-3">
            <Link href={`/products/${product._id}`} className="btn btn-dark rounded-pill px-4 py-2 fw-semibold flex-grow-1 flex-md-grow-0">
              Grab it Now
            </Link>
            <div className="text-success d-flex align-items-center">
                <FontAwesomeIcon icon={faBox} className="me-2"/>
                <span className="fw-bold">{product.stock} left</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
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
                  <h3 className="fw-bold">{stats.totalStock.toLocaleString('id-ID')}</h3>
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
                  <h3 className="fw-bold">{stats.totalUsers.toLocaleString('id-ID')}</h3>
                  <p className="mb-1 fw-semibold">Total Users</p>
                  <small className="text-muted">Registered Accounts</small>
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
                  <h3 className="fw-bold">{stats.totalReviews.toLocaleString('id-ID')}</h3>
                  <p className="mb-1 fw-semibold">Total Favorites</p>
                  <small className="text-muted">User Interactions</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5" id="products">
        <Container className="py-4">
          <h2 className="text-center fw-bold mb-5">Stock and Products</h2>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h5 className="fw-bold">Newest Stock Arrivals</h5>
              <p className="text-muted mb-0">Latest LEGO Products in our inventory</p>
            </div>
            <Link href="/products" className="btn btn-yellow fw-semibold rounded-pill px-4">
              See More »
            </Link>
          </div>

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
                const isFav = isFavorite(product._id);

                return (
                    <Col key={product._id} lg={4} md={6}>
                    <Card className="border-0 shadow-sm h-100">
                        <div className="position-relative product-image-wrapper" style={{height: '250px', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#f8f9fa'}}>
                        <Image 
                            src={getImageUrl(product.imageUrl)}
                            alt={product.name}
                            width={200} height={200}
                            style={{objectFit: 'contain', padding: '15px'}}
                            onError={(e) => {
                                e.currentTarget.srcset = '/images/placeholder-product.png';
                            }}
                        />
                        
                        {(product.discount || 0) > 0 && (
                            <span className="position-absolute top-0 start-0 m-3 badge bg-danger">
                                Sale {product.discount}%
                            </span>
                        )}

                        <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
                            <Button 
                                variant="light" 
                                className="rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" 
                                style={{width: '35px', height: '35px'}}
                                onClick={async () => {
                                    if (isFav) {
                                        await removeFavorite(product._id);
                                    } else {
                                        await addFavorite({
                                            _id: product._id, 
                                            name: product.name,
                                            sku: product.sku,
                                            price: product.price,
                                            imageUrl: product.imageUrl,
                                            stock: product.stock,
                                            category: 'General', 
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
                            <span className="fw-bold fs-5">Rp {product.price.toLocaleString('id-ID')}</span>
                            <span className="badge bg-success py-2 px-3">
                                {product.stock} pcs
                            </span>
                        </div>
                        <Link href={`/products/${product._id}`} className="btn btn-dark w-100 rounded-3 fw-semibold">
                          View Details
                        </Link>
                        </Card.Body>
                    </Card>
                    </Col>
                );
                })}
            </Row>
          )}
        </Container>
      </section>

      <section className="bg-light py-5">
        <Container className="py-4">
          <h2 className="text-center fw-bold mb-5">
            <span style={{ color: '#d9534f' }}>Hot Deals!</span> Biggest Discounts
          </h2>
          
          {loading && (
             <div className="text-center py-5"><Spinner animation="border" /></div>
          )}

          {!loading && (
            <>
              {discountedProducts.length === 0 && (
                 <div className="text-center py-5 text-muted fw-semibold fs-5">
                    No discount available
                 </div>
              )}

              {discountedProducts.length === 1 && (
                 <Row className="justify-content-center">
                    <Col lg={10}>
                        <HotDealCard product={discountedProducts[0]} />
                    </Col>
                 </Row>
              )}

              {discountedProducts.length > 1 && (
                 <Row className="justify-content-center">
                    <Col lg={10}>
                        <Carousel 
                            indicators={true} 
                            controls={true} 
                            interval={3000} 
                            pause="hover" 
                            fade={false} 
                            variant="dark"
                        >
                            {discountedProducts.map((product) => (
                                <Carousel.Item key={product._id} className="pb-5 px-2"> 
                                    <HotDealCard product={product} />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>
                 </Row>
              )}
            </>
          )}
        </Container>
      </section>

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