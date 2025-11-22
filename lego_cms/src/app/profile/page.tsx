'use client';

import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { allProducts } from '../../data/products';

export default function ProfilePage() {
  
  const { user, logout } = useAuth();
  const { favorites: favoriteIds, isLoading: favoritesLoading, removeFavorite, isFavorite } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  const favoriteProducts = allProducts.filter(product => 
    favoriteIds.includes(String(product.id))
  );

  if (!user || favoritesLoading) {
    return (
      <Container className="d-flex vh-100 justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      <main>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col lg={10}>
              
              <div className="d-flex align-items-center mb-5">
                <Image 
                  src="/images/profile.png" 
                  alt="Profile" 
                  width={100} 
                  height={100}
                  className="rounded-circle"
                  style={{objectFit: 'cover', border: '3px solid #FDB913'}}
                />
                <div className="ms-4">
                  <h1 className="fw-bold mb-0">{user.username}</h1>
                  <p className="text-muted fs-5">{user.email}</p>
                  <Button variant="danger" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </div>

              <h3 className="fw-bold mb-4">My Favorites</h3>
              {favoriteProducts.length > 0 ? (
                <Row className="g-4">
                  {favoriteProducts.map((product) => {
                    const isFav = isFavorite(product.id);
                    return (
                      <Col md={6} lg={4} key={product.id}>
                        <Card className="border-0 shadow-sm h-100">
                          <div className="position-relative product-image-wrapper">
                            <Image 
                              src={product.image || '/images/placeholder-product.png'}
                              alt={product.name}
                              fill
                              style={{objectFit: 'contain', padding: '20px'}}
                            />
                            <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
                              <Button 
                                onClick={async () => {
                                  if (isFav) {
                                    await removeFavorite(product.id);
                                  }
                                }}
                                variant="light" 
                                className="rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" 
                                style={{width: '35px', height: '35px'}}
                              >
                                <FontAwesomeIcon icon={isFav ? faHeartSolid : faHeartRegular} size="sm" color={isFav ? 'red' : 'inherit'} />
                              </Button>
                            </div>
                          </div>
                          <Card.Body>
                            <p className="text-muted small mb-2">SKU : {product.sku}</p>
                            <Card.Title className="fw-bold mb-3">{product.name}</Card.Title>
                            <Button as={Link} href={`/products/${product.id}`} variant="dark" className="w-100 rounded-3 fw-semibold">
                              View Details
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              ) : (
                <p className="text-muted">
                  You haven't favorited any items yet. 
                  <Link href="/products" className="ms-1">Find some!</Link>
                </p>
              )}
              
              <hr className="my-5" />
              <h3 className="fw-bold mb-4">Order History</h3>
              <p className="text-muted">You have no past orders.</p>

            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}