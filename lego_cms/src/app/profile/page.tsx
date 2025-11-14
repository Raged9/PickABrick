'use client';

// Import yang diperlukan
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

// Import hook 'useFavorites' untuk menampilkan daftar favorit
import { useFavorites } from '../contexts/FavoritesContext';

export default function ProfilePage() {
  
  // Ambil daftar favorit dari context
  const { favorites } = useFavorites();

  return (
    <>
      <main>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col lg={10}>
              
              {/* Bagian Header Profile */}
              <div className="d-flex align-items-center mb-5">
                <Image 
                  src="/images/profile.png" // Menggunakan gambar profil yang sama
                  alt="Profile" 
                  width={100} 
                  height={100}
                  className="rounded-circle"
                  style={{objectFit: 'cover', border: '3px solid #FDB913'}}
                />
                <div className="ms-4">
                  <h1 className="fw-bold mb-0">My Profile</h1>
                  {/* Nantinya ini bisa diganti dengan nama user */}
                  <p className="text-muted fs-5">Welcome back, LEGO Fan!</p>
                </div>
              </div>

              {/* Bagian Menampilkan Favorit */}
              <h3 className="fw-bold mb-4">My Favorites</h3>
              {favorites.length > 0 ? (
                <Row className="g-4">
                  {favorites.map((product) => (
                    <Col md={6} lg={4} key={product.id}>
                      {/* Menggunakan kembali desain Kartu Produk */}
                      <Card className="border-0 shadow-sm h-100">
                        <div className="position-relative product-image-wrapper">
                          <Image 
                            src={product.image || '/images/placeholder-product.png'}
                            alt={product.name}
                            fill
                            style={{objectFit: 'contain', padding: '20px'}}
                          />
                          <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
                            {/* Tombol hati di sini hanya untuk penanda (sudah favorit) */}
                            <Button 
                              disabled 
                              variant="light" 
                              className="rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" 
                              style={{width: '35px', height: '35px'}}
                            >
                              <FontAwesomeIcon icon={faHeartSolid} size="sm" color="red" />
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
                  ))}
                </Row>
              ) : (
                <p className="text-muted">
                  You haven't favorited any items yet. 
                  <Link href="/products" className="ms-1">Find some!</Link>
                </p>
              )}

              {/* Placeholder untuk bagian lain */}
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