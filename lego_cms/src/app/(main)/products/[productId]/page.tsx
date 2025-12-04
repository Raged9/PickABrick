'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBagShopping, faShop } from '@fortawesome/free-solid-svg-icons'; 
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { useFavorites } from '../../contexts/FavoritesContext';

interface Product {
  _id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  tokopediaLink?: string;
  shopeeLink?: string;
}

export default function ProductDetailPage() {
  
  const params = useParams();
  const productId = params.productId as string; 
  
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]); 
  const [loading, setLoading] = useState(true);
  
  const [showBuyModal, setShowBuyModal] = useState(false);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resDetail = await fetch(`${API_URL}/products/${productId}`);
        if (!resDetail.ok) throw new Error('Not found');
        const dataDetail = await resDetail.json();
        setProduct(dataDetail);

        const resAll = await fetch(`${API_URL}/products`);
        const dataAll = await resAll.json();
        setAllProducts(dataAll);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if(productId) fetchData();
  }, [productId]);

  const getImageUrl = (path: string) => {
    if (!path) return '/images/placeholder-product.png';
    if (path.startsWith('http')) return path;
    return `${BASE_URL}/${path.replace(/\\/g, '/')}`;
  };

  if (loading) return <Container className="text-center py-5"><Spinner animation="border" /></Container>;

  if (!product) {
    return (
      <Container className="text-center py-5">
        <h2>Product Not Found</h2>
        <Link href="/products" className="btn btn-dark mt-3">Back to Products</Link>
      </Container>
    );
  }

  const isFav = isFavorite(product._id);

  return (
    <>
      <main>
        <section className="py-5">
          <Container>
            <p className="text-muted mb-4">
              <Link href="/products" className="text-decoration-none text-muted">Products</Link> / {product.name}
            </p>
            
            <Row className="g-5">
              <Col lg={7}>
                <div className="detail-image-wrapper p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'relative', width: '100%', height: '500px' }}>
                    <Image 
                        src={getImageUrl(product.imageUrl)}
                        alt={product.name}
                        fill
                        style={{objectFit: 'contain'}}
                        onError={(e) => { e.currentTarget.srcset = '/images/placeholder-product.png'; }}
                    />
                  </div>
                </div>
              </Col>
              
              <Col lg={5}>
                <h1 className="fw-bold display-6">{product.name}</h1>
                <p className="text-muted">SKU: {product.sku}</p>
                
                <h2 className="fw-bold my-3" style={{ fontSize: '2rem' }}>
                  Rp {product.price.toLocaleString('id-ID')}
                </h2>
                
                <p className="lead text-secondary" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                  {product.description || 'Body text for describing what this product is and why this product is simply a must-buy.'}
                </p>
                
                <div className="d-flex gap-3 my-4">
                    <Button 
                        variant="dark" 
                        size="lg" 
                        className="flex-grow-1 rounded-3 fw-semibold py-3"
                        onClick={() => setShowBuyModal(true)}
                    >
                        <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                        Buy Now
                    </Button>

                    <Button 
                        variant="light" 
                        className="border rounded-3 d-flex align-items-center justify-content-center"
                        style={{ width: '58px', borderColor: '#dee2e6' }}
                        onClick={async () => {
                            if (isFav) {
                                await removeFavorite(product._id);
                            } else {
                                await addFavorite({
                                    id: product._id,
                                    name: product.name,
                                    sku: product.sku,
                                    price: String(product.price),
                                    image: product.imageUrl,
                                    pieces: String(product.stock),
                                    category: product.category,
                                    description: product.description
                                } as any);
                            }
                        }}
                    >
                        <FontAwesomeIcon 
                          icon={isFav ? faHeartSolid : faHeartRegular} 
                          size="lg"
                          color={isFav ? 'red' : 'inherit'}
                        />
                    </Button>
                </div>
                
                <small className="text-muted fw-semibold">
                  Kategori: <Badge bg="secondary">{product.category}</Badge> | Stock: {product.stock}
                </small>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="py-5 bg-light">
          <Container>
            <h3 className="fw-bold mb-4">See Other Products</h3>
            <Row className="g-4">
              {allProducts
                .filter(p => p._id !== product._id)
                .slice(0, 3) 
                .map((prod) => {
                  const isProdFav = isFavorite(prod._id);
                  return (
                    <Col key={prod._id} lg={4} md={6}>
                      <Card className="border-0 shadow-sm h-100">
                        <div className="position-relative product-image-wrapper" style={{height: '250px', overflow: 'hidden', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <Image 
                            src={getImageUrl(prod.imageUrl)}
                            alt={prod.name}
                            width={200} height={200}
                            style={{objectFit: 'contain'}}
                          />
                          <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
                              <Button 
                                  variant="light" 
                                  className="rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" 
                                  style={{width: '35px', height: '35px'}}
                                  onClick={async (e) => {
                                      e.preventDefault(); 
                                      if (isProdFav) await removeFavorite(prod._id);
                                      else await addFavorite({ id: prod._id } as any);
                                  }}
                              >
                                  <FontAwesomeIcon 
                                      icon={isProdFav ? faHeartSolid : faHeartRegular} 
                                      size="sm" 
                                      color={isProdFav ? 'red' : 'inherit'} 
                                  />
                              </Button>
                          </div>
                        </div>
                        <Card.Body>
                          <p className="text-muted small mb-2">SKU : {prod.sku}</p>
                          <Card.Title className="fw-bold mb-3 text-truncate">{prod.name}</Card.Title>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="fw-bold fs-5">Rp {prod.price.toLocaleString('id-ID')}</span>
                          </div>
                          <Link href={`/products/${prod._id}`} className="btn btn-dark w-100 rounded-3 fw-semibold">
                            View Details
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                )})}
            </Row>
          </Container>
        </section>
      </main>

      <Modal show={showBuyModal} onHide={() => setShowBuyModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="fw-bold">Buy {product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
            <p className="text-muted mb-4">Choose your preferred marketplace to purchase this item:</p>
            
            <div className="d-grid gap-3">
                {product.tokopediaLink ? (
                    <Button 
                        as="a" 
                        href={product.tokopediaLink} 
                        target="_blank"
                        size="lg"
                        className="d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{ backgroundColor: '#42B549', borderColor: '#42B549' }}
                    >
                        <FontAwesomeIcon icon={faBagShopping} className="me-2" />
                        Buy on Tokopedia
                    </Button>
                ) : (
                    <Button variant="secondary" disabled size="lg">Tokopedia (Out of Stock/Not Available)</Button>
                )}

                {product.shopeeLink ? (
                    <Button 
                        as="a" 
                        href={product.shopeeLink} 
                        target="_blank"
                        size="lg"
                        className="d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{ backgroundColor: '#EE4D2D', borderColor: '#EE4D2D' }}
                    >
                        <FontAwesomeIcon icon={faShop} className="me-2" />
                        Buy on Shopee
                    </Button>
                ) : (
                    <Button variant="secondary" disabled size="lg">Shopee (Out of Stock/Not Available)</Button>
                )}
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}