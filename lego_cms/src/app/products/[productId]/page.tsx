'use client';

import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { allProducts } from '@/data/products';
import { useFavorites } from '../../contexts/FavoritesContext';

export default function ProductDetailPage() {
  
  const params = useParams();
  const productId = params.productId as string;
  
  const product = allProducts.find(p => p.id === productId);
  
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (!product) {
    return (
      <Container className="text-center py-5 my-5">
        <h2 className="fw-bold">Produk Tidak Ditemukan</h2>
        <p className="text-muted">Produk yang Anda cari tidak ada.</p>
        <Button as={Link} href="/products" variant="dark" className="rounded-3 fw-semibold">
          Kembali ke Semua Produk
        </Button>
      </Container>
    );
  }

  // Cek status favorit untuk produk ini
  const isFav = isFavorite(product.id);

  return (
    <>
      <main>
        <section className="py-5">
          <Container>
            <p className="text-muted mb-4">
              <Link href="/products">Products</Link> / {product.name}
            </p>
            <Row className="g-5">
              <Col lg={7}>
                <div className="detail-image-wrapper border rounded-3 p-4">
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
                <p className="text-muted">SKU: {product.sku}</p>
                <h2 className="fw-semibold my-3">{product.price}</h2>
                <p className="lead">
                  {product.description || 'Body text for describing what this product is and why this product is simply a must-buy.'}
                </p>
                
                {/* (PERBAIKAN 4) Tombol Add to Cart & Favorite */}
                <div className="d-flex gap-2 my-4">
                  <Button variant="dark" size="lg" className="w-100 rounded-3 fw-semibold">
                    <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                    Add to cart
                  </Button>
                  
                  <Button 
                    variant={isFav ? "danger" : "light"}
                    size="lg"
                    className="rounded-3 shadow-sm border d-flex align-items-center justify-content-center"
                    style={{ width: '60px', height: '50px' }}
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
                    />
                  </Button>
                </div>
                
                <small className="text-muted">
                  Kategori: <Badge bg="secondary">{product.category}</Badge>
                </small>
              </Col>
            </Row>
          </Container>
        </section>

        {/* (PERBAIKAN 5) Logika "See Other" diperbaiki */}
        <section className="py-5 bg-light">
          <Container>
            <h3 className="fw-bold mb-4">See Other Products</h3>
            <Row className="g-4">
              {/* Filter produk ini dan ambil 3 lainnya */}
              {allProducts
                .filter(p => p.id !== product.id) 
                .slice(0, 3) 
                .map((prod) => {
                  const isProdFav = isFavorite(product.id); // Cek favorit untuk kartu
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
                          {/* (PERBAIKAN 6) Tombol favorit di kartu "Other" */}
                          <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
                            <Button 
                              variant="light" 
                              className="rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" 
                              style={{width: '35px', height: '35px'}}
                              onClick={async (e) => {
                                e.preventDefault(); // Hentikan Link
                                if (isProdFav) {
                                  await removeFavorite(prod.id);
                                } else {
                                  await addFavorite(prod);
                                }
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