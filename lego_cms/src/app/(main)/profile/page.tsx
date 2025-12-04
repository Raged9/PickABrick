'use client';

import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';

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

export default function ProfilePage() {
  
  const { user, logout } = useAuth();
  const { favorites: favoriteIds, isLoading: favoritesLoading, removeFavorite, isFavorite } = useFavorites();
  const router = useRouter();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        setAllProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoadingData(false);
      }
    };
    fetchProducts();
  }, []);

  const favoriteProducts = allProducts.filter(product => 
    favoriteIds.includes(product._id)
  );

  const getImageUrl = (path: string) => {
    if (!path) return '/images/placeholder-product.png';
    if (path.startsWith('http')) return path;
    return `${BASE_URL}/${path.replace(/\\/g, '/')}`;
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user || loadingData) {
    return (
      <Container className="d-flex vh-100 justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  
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

              {}
              <h3 className="fw-bold mb-4">My Favorites</h3>
              {favoriteProducts.length > 0 ? (
                <Row className="g-4">
                  {favoriteProducts.map((product) => {
                    
                    const isFav = isFavorite(product._id);
                    
                    return (
                      <Col md={6} lg={4} key={product._id}>
                        <Card className="border-0 shadow-sm h-100">
                          <div className="position-relative product-image-wrapper" style={{height: '200px', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#f8f9fa'}}>
                            <Image 
                              
                              src={getImageUrl(product.imageUrl)} 
                              alt={product.name}
                              width={150}
                              height={150}
                              style={{objectFit: 'contain', padding: '10px'}}
                              onError={(e) => {
                                e.currentTarget.srcset = '/images/placeholder-product.png';
                              }}
                            />
                            <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
                              <Button 
                                onClick={async () => {
                                  if (isFav) {
                                    await removeFavorite(product._id);
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
                            <Card.Title className="fw-bold mb-3 text-truncate">{product.name}</Card.Title>
                            {}
                            <Link href={`/products/${product._id}`} className="btn btn-dark w-100 rounded-3 fw-semibold">
                              View Details
                            </Link>
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

            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}