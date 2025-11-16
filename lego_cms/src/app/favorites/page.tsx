'use client';
 
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

import { allProducts } from '../../data/products';
import { useFavorites } from '../contexts/FavoritesContext';
import { useSearch } from '../contexts/SearchContext';

export default function FavoritesPage() {
  
  const { 
    favorites: favoriteIds,
    addFavorite, 
    removeFavorite, 
    isFavorite, 
    isLoading
  } = useFavorites();
  
  const { searchTerm } = useSearch();
  
  const favoriteProducts = allProducts.filter(product => 
    favoriteIds.includes(String(product.id))
  );

  const filteredFavoriteProducts = favoriteProducts.filter(product => {
    if (!searchTerm) return true;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(lowerSearchTerm);
    const skuMatch = product.sku.toLowerCase().includes(lowerSearchTerm);
    
    return nameMatch || skuMatch;
  });

  if (isLoading) {
    return (
      <Container className="text-center py-5 my-5">
        <Spinner animation="border" role="status" className="my-3" />
        <h4 className='text-muted'>Loading your favorites...</h4>
      </Container>
    );
  }

  return (
    <>
      <main>
        <section className="py-5" id="products">
          <Container className="py-4">
            <h2 className="fw-bold mb-5">Your Favorite Products</h2>
            
            <Row className="g-4">
              
              {!isLoading && favoriteProducts.length === 0 && (
                <Col className="text-center py-5">
                  <h4 className='text-muted'>You haven't added any favorites yet.</h4>
                  <Link href="/products" className="btn btn-dark rounded-3 fw-semibold">Browse products</Link>
                </Col>
              )}

              {!isLoading && favoriteProducts.length > 0 && filteredFavoriteProducts.length === 0 && (
                <Col className="text-center py-5">
                  <h4 className='text-muted'>No favorites found matching "{searchTerm}".</h4>
                </Col>
              )}
              
              {filteredFavoriteProducts.map((product) => {
                  const isFav = isFavorite(product.id);

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
                            <Button 
                              variant="light" 
                              className="rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" 
                              style={{width: '35px', height: '35px'}}
                              onClick={async () => {
                                if (isFav) {
                                  await removeFavorite(product.id);
                                } else {
                                  await addFavorite(product);
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
              }
              
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}