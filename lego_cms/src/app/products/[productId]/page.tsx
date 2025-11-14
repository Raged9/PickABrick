'use client';

import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// (DIHAPUS) faShoppingCart dihapus dari import ini
import { faStar } from '@fortawesome/free-solid-svg-icons'; 
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { useFavorites } from '../../contexts/FavoritesContext';
import { allProducts } from '../../../data/products';


export default function ProductDetailPage() {
  
  const params = useParams();
  const productId = params.productId; 
  
  const product = allProducts.find(p => p.id.toString() === productId);
  
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (!product) {
    return (
      <Container className="text-center py-5">
        <h2>Produk Tidak Ditemukan</h2>
        <Link href="/products">Kembali ke semua produk</Link>
      </Container>
    );
  }

  const isMainProductFav = isFavorite(product.id);

  return (
    <>
      <main>
        <section className="py-5">
          <Container>
            <p className="text-muted mb-4">Product detail page</p>
            <Row className="g-5">
              <Col lg={7}>
                <div className="detail-image-wrapper">
                  <Image 
                    src={product.image || '/images/placeholder-product.png'}
                    alt={product.name}
                    fill
                    style={{objectFit: 'contain', padding: '20px'}}
                    onError={(e) => { e.currentTarget.src = '/images/placeholder-product.png'; }}
                  />
                </div>
              </Col>
              
              <Col lg={5}>
                <h1 className="fw-bold">{product.name}</h1>
                <p className="text-muted">Subheading (SKU: {product.sku})</p>
                <h2 className="fw-semibold my-3">{product.price}</h2>
                <p className="lead">
                  {product.description || 'Body text for describing what this product is and why this product is simply a must-buy.'}
                </p>
                
                <div className="d-grid gap-2"> 
                  {/* TOMBOL "ADD TO CART" DIHAPUS DARI SINI */}
                  
                  <Button 
                    variant={isMainProductFav ? "danger" : "outline-danger"} 
                    size="lg"
                    onClick={() => {
                      if (isMainProductFav) {
                        removeFavorite(product.id);
                      } else {
                        addFavorite(product);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={isMainProductFav ? faHeartSolid : faHeartRegular} className="me-2" />
                    {isMainProductFav ? "Remove from Favorites" : "Add to Favorites"}
                  </Button>
                </div>
                
                <small className="text-muted mt-3 d-block">
                  Text box for additional details or fine print.
                </small>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="py-5 bg-light">
          <Container>
            <h3 className="fw-bold mb-4">See Other Products</h3>
            <Row className="g-4">
              {allProducts.slice(0, 6).map((prod) => {
                
                const isFav = isFavorite(prod.id);
                
                return (
                  <Col key={prod.id} lg={4} md={6}>
                    <Card className="border-0 shadow-sm h-100">
                      <div className="position-relative product-image-wrapper">
                        <Image 
                          src={prod.image || '/images/placeholder-product.png'}
                          alt={prod.name}
                          fill
                          style={{objectFit: 'contain', padding: '20px'}}
                          onError={(e) => { e.currentTarget.src = '/images/placeholder-product.png'; }}
                        />
                         <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
                            <Button 
                              variant="light" 
                              className="rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" 
                              style={{width: '35px', height: '35px'}}
                              onClick={() => {
                                if (isFav) {
                                  removeFavorite(prod.id);
                                } else {
                                  addFavorite(prod);
                                }
                              }}
                            >
                              <FontAwesomeIcon 
                                icon={isFav ? faHeartSolid : faHeartRegular} 
                                size="sm" 
                                color={isFav ? 'red' : 'inherit'} 
                              />
                            </Button>
                         </div>
                      </div>
                      <Card.Body>
                        <p className="text-muted small mb-2">SKU : {prod.sku}</p>
                        <Card.Title className="fw-bold mb-3">{prod.name}</Card.Title>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="fw-bold fs-5">{prod.price}</span>
                        </div>
                        <Button as={Link} href={`/products/${prod.id}`} variant="dark" className="w-100 rounded-3 fw-semibold">
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
      </main>
    </>
  ); 
}