'use client';

// 1. IMPORT SEMUA YANG ANDA PERLUKAN
import { Container, Row, Col, Card, Button, Navbar, Nav, Form, InputGroup, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. IMPORT HOOK BARU UNTUK MEMBACA URL
import { useParams } from 'next/navigation';
import Link from 'next/link';

// 3. "DATABASE" PRODUK ANDA (HARUS SAMA DENGAN DATABASE DI HALAMAN LAIN)
const allProducts = [
  { id: 1, sku: 'LEGO - 75432', name: 'Classic Town Hall', price: 'Rp 1.299.000,00', pieces: '25 pcs', image: '/images/products/product1.png', description: 'Body text for describing what this product is and why this product is simply a must-buy.' },
  { id: 2, sku: 'LEGO - 75432', name: 'Minifigure Set Series 1', price: 'Rp 1.599.000,00', pieces: '12 pcs', image: '/images/products/product2.png', description: 'A wonderful series of minifigures to collect.' },
  { id: 3, sku: 'LEGO - 75432', name: 'Lego Pet Shop', price: 'Rp 2.399.000,00', pieces: '8 pcs', image: '/images/products/product3.png', description: 'Build your own adorable pet shop, complete with animals.' },
  { id: 4, sku: 'LEGO - 75432', name: 'Lego Palace Cinema', price: 'Rp 1.299.000,00', pieces: '23 pcs', image: '/images/products/product4.png', description: 'Recreate the magic of the movies with this classic cinema.' },
  { id: 5, sku: 'LEGO - 75432', name: 'Lego Pet Shop', price: 'Rp 2.399.000,00', pieces: '8 pcs', image: '/images/products/product5.png', description: 'Another variant of the lovely pet shop.' },
  { id: 6, sku: 'LEGO - 75432', name: 'Minifigure Set Series 1', price: 'Rp 1.599.000,00', pieces: '12 pcs', image: '/images/products/product6.png', description: 'Continue your collection with Series 1.' },
  { id: 7, sku: 'LEGO - 75432', name: 'Classic Town Hall', price: 'Rp 1.299.000,00', pieces: '25 pcs', image: '/images/products/product1.png', description: 'Body text for describing what this product is and why this product is simply a must-buy.' },
  { id: 8, sku: 'LEGO - 75432', name: 'Minifigure Set Series 1', price: 'Rp 1.599.000,00', pieces: '12 pcs', image: '/images/products/product2.png', description: 'A wonderful series of minifigures to collect.' },
  { id: 9, sku: 'LEGO - 75432', name: 'Lego Pet Shop', price: 'Rp 2.399.000,00', pieces: '8 pcs', image: '/images/products/product3.png', description: 'Build your own adorable pet shop, complete with animals.' },
];

export default function ProductDetailPage() {
  
  // 4. MENGAMBIL ID DARI URL (CONTOH: /products/1)
  const params = useParams();
  const productId = params.productId; // Ini adalah string, misal "1", "2", dst.

  // 5. CARI DATA PRODUK BERDASARKAN ID
  const product = allProducts.find(p => p.id.toString() === productId);

  // 6. TAMPILKAN "NOT FOUND" JIKA PRODUK TIDAK ADA
  if (!product) {
    return (
      <Container className="text-center py-5">
        <h2>Produk Tidak Ditemukan</h2>
        <Link href="/products">Kembali ke semua produk</Link>
      </Container>
    );
  }

  // 7. JIKA PRODUK DITEMUKAN, TAMPILKAN HALAMAN LENGKAP
  return (
    <>
      {/* STYLE GLOBAL (SALIN DARI HOMEPAGE) */}
      <style jsx global>{`
        .bg-yellow { background-color: #FDB913 !important; }
        .bg-navy { background-color: #1a1a4d !important; }
        .text-navy { color: #1a1a4d !important; }
        .btn-yellow { background-color: #FDB913; border-color: #FDB913; color: #000; }
        .btn-yellow:hover { background-color: #e5a711; border-color: #e5a711; color: #000; }
        .product-image-wrapper { position: relative; width: 100%; height: 250px; background: #f5f5f5; }
        .detail-image-wrapper {
          position: relative;
          width: 100%;
          min-height: 400px; /* Tinggi minimal untuk gambar detail */
          background: #f8f9fa;
          border-radius: 0.375rem;
          overflow: hidden;
        }
      `}</style>

      {/* NAVBAR (SALIN DARI HOMEPAGE) */}
      <Navbar expand="lg" className="bg-yellow sticky-top shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="fw-bold fs-4">
            <Image src="/images/logo.png" alt="Pick A Brick Logo" width={70} height={70} /* ... etc */ />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto ms-5">
              <Nav.Link as={Link} href="/products" className="fw-semibold text-dark">PRODUCTS</Nav.Link>
              <Nav.Link href="#discover" className="fw-semibold text-dark">DISCOVER</Nav.Link>
              <Nav.Link href="#category" className="fw-semibold text-dark">CATEGORY</Nav.Link>
            </Nav>
            <div className="d-flex align-items-center ms-lg-5 gap-3">
               {/* ... (Isi lengkap Navbar Anda: search, heart, profile) ... */}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 8. KONTEN UTAMA HALAMAN INI */}
      <main>
        <section className="py-5">
          <Container>
            <p className="text-muted mb-4">Product detail page</p>
            <Row className="g-5">
              {/* KOLOM KIRI: GAMBAR */}
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
              
              {/* KOLOM KANAN: DETAIL INFO */}
              <Col lg={5}>
                <h1 className="fw-bold">{product.name}</h1>
                <p className="text-muted">Subheading (SKU: {product.sku})</p>
                <h2 className="fw-semibold my-3">{product.price}</h2>
                <p className="lead">
                  {product.description || 'Body text for describing what this product is and why this product is simply a must-buy.'}
                </p>
                
                <Button variant="dark" size="lg" className="w-100 my-4">
                  Add to cart
                </Button>
                
                <small className="text-muted">
                  Text box for additional details or fine print.
                </small>
              </Col>
            </Row>
          </Container>
        </section>

        {/* 9. BAGIAN "SEE OTHER PRODUCTS" */}
        <section className="py-5 bg-light">
          <Container>
            <h3 className="fw-bold mb-4">See Other Products</h3>
            <Row className="g-4">
              {/* Kita tampilkan 6 produk lain sebagai rekomendasi */}
              {allProducts.slice(0, 6).map((prod) => (
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
              ))}
            </Row>
          </Container>
        </section>
      </main>
      
      {/* 10. FOOTER (SALIN DARI HOMEPAGE) */}
      <footer className="bg-navy text-white py-5">
        <Container>
          <Row className="g-4">
            {/* ... (Isi lengkap Footer Anda) ... */}
          </Row>
          <hr className="my-4 bg-white opacity-25" />
          <p className="text-center text-white-50 mb-0">© 2024 Pick A Brick. All rights reserved.</p>
        </Container>
      </footer>
    </>
  );
}