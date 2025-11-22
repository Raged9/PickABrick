'use client';

import { Container, Row, Col, Card, Button, Navbar, Nav, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useFavorites } from '../contexts/FavoritesContext';
import { useSearch } from '../contexts/SearchContext';
import { allProducts } from '@/data/products';


const categories = ["All", "Minifigure", "Super-Heroes", "City", "Friends", "Harry Potter", "Modular"];

export default function ProductsPage() {
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { searchTerm } = useSearch();


  const filteredProducts = allProducts.filter(product => {
    
    // Filter Kategori
    const categoryMatch = (selectedCategory === 'All') || (product.category === selectedCategory);

    // Filter Search (case-insensitive)
    const lowerSearchTerm = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(lowerSearchTerm);
    const skuMatch = product.sku.toLowerCase().includes(lowerSearchTerm);
    const searchMatch = nameMatch || skuMatch;

    return categoryMatch && searchMatch;
  });


  return (
    <>
      {/* FILTER BAR */}
      <Navbar bg="light" variant="light" className="shadow-sm py-0" style={{ borderBottom: '1px solid #dee2e6' }}>
        <Container>
          <Nav className="flex-wrap">
            {categories.map((category) => (
              <Nav.Link 
                key={category}
                onClick={() => setSelectedCategory(category)}
                active={selectedCategory === category}
                className="fw-semibold"
                style={{fontSize: '0.9rem', padding: '0.75rem 0.5rem'}}
              >
                {category.toUpperCase()}
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>

      {/* KONTEN UTAMA HALAMAN */}
      <main>
        <section className="py-5" id="products">
          <Container className="py-4">
            <h2 className="fw-bold mb-5">Products Available</h2>
            
            <Row className="g-4">
              
              {filteredProducts.length > 0 ? (
                
                filteredProducts.map((product) => {
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
              ) : (
                <Col className="text-center py-5">
                  <h4 className='text-muted'>
                    No products found for "{selectedCategory}"
                    {searchTerm && ` matching "${searchTerm}"`}
                  </h4>
                </Col>
              )}
            </Row>
          </Container>
        </section>

        {/* Filler Text Section */}
        <section className='py-5 bg-light'>
          {/* ... */}
        </section>

        {/* Discount and Promo Section */}
        <section className="py-5">
          {/* ... */}
        </section>
      </main>
    </>
  );
}