'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav, Spinner, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

// Import Contexts
import { useFavorites } from '../contexts/FavoritesContext';
import { useSearch } from '../contexts/SearchContext';

// 1. Definisikan Tipe Data (Sesuai Model Backend)
interface Product {
  _id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
  discount?: number;
}

const categories = ["All", "Minifigure", "Super-Heroes", "City", "Friends", "Harry Potter", "Modular"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { searchTerm } = useSearch();

  // 2. Fetch Data dari Backend saat halaman dibuka
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 3. Helper untuk URL Gambar (Cloudinary vs Local)
  const getImageUrl = (path: string) => {
    if (!path) return '/images/placeholder-product.png';
    if (path.startsWith('http')) return path; // Cloudinary
    return `http://localhost:5000/${path.replace(/\\/g, '/')}`; // Localhost (fix backslash windows)
  };

  // 4. Logika Filter (Category + Search)
  const filteredProducts = products.filter(product => {
    // Filter Kategori
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;

    // Filter Search
    const lowerSearch = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(lowerSearch);
    const skuMatch = product.sku.toLowerCase().includes(lowerSearch);
    const searchMatch = nameMatch || skuMatch;

    return categoryMatch && searchMatch;
  });

  // Tampilan Loading
  if (loading) {
    return (
      <Container className="d-flex vh-100 justify-content-center align-items-center">
        <Spinner animation="border" role="status" className="me-2" />
        <span>Loading products...</span>
      </Container>
    );
  }

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

      {/* KONTEN UTAMA */}
      <main>
        <section className="py-5" id="products">
          <Container className="py-4">
            <h2 className="fw-bold mb-5">Products Available</h2>
            
            <Row className="g-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  // Gunakan _id dari MongoDB
                  const isFav = isFavorite(product._id);

                  return (
                    <Col key={product._id} lg={4} md={6}>
                      <Card className="border-0 shadow-sm h-100">
                        
                        {/* Wrapper Gambar */}
                        <div className="position-relative product-image-wrapper" style={{ height: '250px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
                          <Image 
                            src={getImageUrl(product.imageUrl)}
                            alt={product.name}
                            width={200}
                            height={200}
                            style={{objectFit: 'contain', padding: '10px'}}
                            onError={(e) => {
                              e.currentTarget.srcset = '/images/placeholder-product.png';
                            }}
                          />
                          
                          {/* Tombol Aksi (Hati & Cart) */}
                          <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
                            <Button 
                              variant="light" 
                              className="rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" 
                              style={{width: '35px', height: '35px'}}
                              onClick={async () => {
                                if (isFav) {
                                  await removeFavorite(product._id);
                                } else {
                                  // Konversi data MongoDB ke format yang diterima context (jika perlu)
                                  await addFavorite({
                                      id: product._id,
                                      name: product.name,
                                      price: String(product.price), // Context butuh string? sesuaikan
                                      image: product.imageUrl,
                                      sku: product.sku,
                                      pieces: String(product.stock),
                                      category: product.category,
                                      description: product.description
                                  });
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

                        {/* Body Card */}
                        <Card.Body>
                          <p className="text-muted small mb-2">SKU : {product.sku}</p>
                          <Card.Title className="fw-bold mb-3 text-truncate">{product.name}</Card.Title>
                          
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="fw-bold fs-5">
                              Rp {product.price.toLocaleString('id-ID')}
                            </span>
                            {/* Menampilkan Stock sebagai pengganti 'pieces' */}
                            <span className="text-muted small">
                                <Badge bg={product.stock > 0 ? "success" : "danger"}>
                                    {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                                </Badge>
                            </span>
                          </div>
                          
                          {/* Link Detail: Menggunakan _id */}
                          <Button as={Link} href={`/products/${product._id}`} variant="dark" className="w-100 rounded-3 fw-semibold">
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
                    {searchTerm && ` matching "${searchTerm}"`}.
                  </h4>
                </Col>
              )}
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}