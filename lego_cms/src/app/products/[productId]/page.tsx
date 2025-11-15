'use client';

import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const allProducts = [
  {
    id: 1,
    sku: 'LEGO - 75432',
    name: 'Classic Town Hall',
    price: 'Rp 1.299.000,00',
    pieces: '25 pcs',
    image: '/images/products/product1.jpg',
    category: 'Modular',
    description: 'Body text for describing what this product is and why this product is simply a must-buy.'
  },
  {
    id: 2,
    sku: 'LEGO - 75432',
    name: 'Minifigure Set Series 1',
    price: 'Rp 1.599.000,00',
    pieces: '12 pcs',
    image: '/images/products/product2.jpg',
    category: 'Minifigure',
    description: 'A wonderful series of minifigures to collect.'
  },
  {
    id: 3,
    sku: 'LEGO - 75432',
    name: 'Lego Pet Shop',
    price: 'Rp 2.399.000,00',
    pieces: '8 pcs',
    image: '/images/products/product3.jpg',
    category: 'City',
    description: 'Build your own adorable pet shop, complete with animals.'
  },
  {
    id: 4,
    sku: 'LEGO - 75432',
    name: 'Lego Palace Cinema',
    price: 'Rp 1.299.000,00',
    pieces: '23 pcs',
    image: '/images/products/product4.jpg',
    category: 'Modular',
    description: 'Recreate the magic of the movies with this classic cinema.'
  },
  {
    id: 5,
    sku: 'LEGO - 75432',
    name: 'Lego Pet Shop',
    price: 'Rp 2.399.000,00',
    pieces: '8 pcs',
    image: '/images/products/product3.jpg',
    category: 'City',
    description: 'Another variant of the lovely pet shop.'
  },
  {
    id: 6,
    sku: 'LEGO - 75432',
    name: 'Minifigure Set Series 1',
    price: 'Rp 1.599.000,00',
    pieces: '12 pcs',
    image: '/images/products/product2.jpg',
    category: 'Minifigure',
    description: 'Continue your collection with Series 1.'
  },
  {
    id: 7,
    sku: 'LEGO - 75432',
    name: 'Classic Town Hall',
    price: 'Rp 1.299.000,00',
    pieces: '25 pcs',
    image: '/images/products/product1.jpg',
    category: 'Modular',
    description: 'Body text for describing what this product is and why this product is simply a must-buy.'
  },
  {
    id: 8,
    sku: 'LEGO - 75432',
    name: 'Minifigure Set Series 1',
    price: 'Rp 1.599.000,00',
    pieces: '12 pcs',
    image: '/images/products/product2.jpg',
    category: 'Minifigure',
    description: 'A wonderful series of minifigures to collect.'
  },
  {
    id: 9,
    sku: 'LEGO - 75432',
    name: 'Lego Pet Shop',
    price: 'Rp 2.399.000,00',
    pieces: '8 pcs',
    image: '/images/products/product3.jpg',
    category: 'City',
    description: 'Build your own adorable pet shop, complete with animals.'
  },
];

export default function ProductDetailPage() {
  
  const params = useParams();
  const productId = params.productId; 
  const product = allProducts.find(p => p.id.toString() === productId);

  if (!product) {
    return (
      <Container className="text-center py-5">
        <h2>Produk Tidak Ditemukan</h2>
        <Link href="/products">Kembali ke semua produk</Link>
      </Container>
    );
  }

  return (
    <>
      <main>
        <section className="py-5">
          <Container>
            <p className="text-muted mb-4">Product detail page</p>
            <Row className="g-5">
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

        <section className="py-5 bg-light">
          <Container>
            <h3 className="fw-bold mb-4">See Other Products</h3>
            <Row className="g-4">
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
    </>
  ); 
}