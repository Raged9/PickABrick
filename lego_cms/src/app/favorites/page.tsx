'use client';
 
// Import yang diperlukan
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'; // Hati penuh
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'; // Hati kosong
import Image from 'next/image';
import Link from 'next/link';

// (1. PENTING) Import hook 'useFavorites'
import { useFavorites } from '../contexts/FavoritesContext';

export default function FavoritesPage() {
  
  // (2. PENTING) Ambil data dan fungsi dari context
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  return (
    <>
      {/* Konten Halaman Favorit */}
      <main>
        <section className="py-5" id="products">
          <Container className="py-4">
            <h2 className="fw-bold mb-5">Your Favorite Products</h2>
            
            <Row className="g-4">
              
              {/* (3. PENTING) Cek apakah daftar favorit kosong */}
              {favorites.length > 0 ? (
                
                // (4. PENTING) Map dari 'favorites'
                favorites.map((product) => {
                  const isFav = isFavorite(product.id); // Cek status favorit

                  return (
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
                            
                            {/* (5. PENTING) Tombol Hati yang sudah berfungsi */}
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
                })
              ) : (
                // (6. PENTING) Pesan jika tidak ada favorit
                <Col className="text-center py-5">
                  <h4 className='text-muted'>You haven't added any favorites yet.</h4>
                  <Link href="/products">Browse products</Link>
                </Col>
              )}
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}