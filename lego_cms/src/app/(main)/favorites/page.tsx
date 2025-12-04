'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

import { useFavorites } from '../contexts/FavoritesContext';
import { useSearch } from '../contexts/SearchContext';

interface Product {
  _id: string;
  sku: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
}

export default function FavoritesPage() {
  
  const { 
    favorites: favoriteIds,
    removeFavorite, 
    isFavorite, 
    isLoading: favoritesLoading
  } = useFavorites();
  
  const { searchTerm } = useSearch();
  
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchProducts();
  }, []);

  const favoriteProducts = allProducts.filter(product => 
    favoriteIds.includes(product._id)
  );

  const filteredFavoriteProducts = favoriteProducts.filter(product => {
    if (!searchTerm) return true;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(lowerSearchTerm);
    const skuMatch = product.sku.toLowerCase().includes(lowerSearchTerm);
    
    return nameMatch || skuMatch;
  });

  const getImageUrl = (path: string) => {
    if (!path) return '/images/placeholder-product.png';
    if (path.startsWith('http')) return path;
    return `${BASE_URL}${path.replace(/\\/g, '/')}`;
  };

  if (favoritesLoading || loadingData) {
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
              
              {favoriteProducts.length === 0 && (
                <Col className="text-center py-5">
                  <h4 className='text-muted'>You haven't added any favorites yet.</h4>
                  <Link href="/products" className="btn btn-dark rounded-3 fw-semibold mt-3">Browse products</Link>
                </Col>
              )}

              {favoriteProducts.length > 0 && filteredFavoriteProducts.length === 0 && (
                <Col className="text-center py-5">
                  <h4 className='text-muted'>No favorites found matching "{searchTerm}".</h4>
                </Col>
              )}
              
              {filteredFavoriteProducts.map((product) => {
                  const isFav = isFavorite(product._id);

                  return (
                    <Col key={product._id} lg={4} md={6}>
                      <Card className="border-0 shadow-sm h-100">
                        <div className="position-relative product-image-wrapper" style={{height: '250px', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#f8f9fa'}}>

                          <Image 
                            src={getImageUrl(product.imageUrl)}
                            alt={product.name}
                            width={200} height={200}
                            style={{objectFit: 'contain', padding: '10px'}}
                            onError={(e) => {
                              e.currentTarget.srcset = '/images/placeholder-product.png';
                            }}
                          />

                          <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
                            <Button 
                              variant="light" 
                              className="rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" 
                              style={{width: '35px', height: '35px'}}
                              onClick={async () => {
                                if (isFav) {
                                  await removeFavorite(product._id);
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
                            
                            <span className="text-muted small">
                                <Badge bg={product.stock > 0 ? "success" : "danger"}>
                                    {product.stock > 0 ? `${product.stock} in stock` : "Habis"}
                                </Badge>
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
          </Container>
        </section>
      </main>
    </>
  );
}