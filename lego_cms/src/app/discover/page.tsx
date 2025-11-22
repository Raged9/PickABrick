import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';

const placeholderArticles = [
  {
    id: '1',
    title: 'Sejarah Singkat LEGO Minifigure',
    excerpt: 'Jelajahi evolusi dari mainan figur paling ikonik di dunia, dari awal mulanya hingga sekarang...',
    image: '/images/offers/offer1.png', 
  },
  {
    id: '2',
    title: 'Panduan Membangun LEGO City Pertama Anda',
    excerpt: 'Panduan pemula untuk merencanakan dan membangun kota modular yang hidup.',
    image: '/images/offers/offer1.png', 
  },
  {
    id: '3',
    title: '5 Set LEGO Langka yang Paling Dicari Kolektor',
    excerpt: 'Temukan set-set yang telah menjadi buruan utama dan bernilai tinggi di pasar kolektor.',
    image: '/images/offers/offer1.png', 
  },
];

export default function DiscoverPage() {
  return (
    <main>
      <section className="py-5" id="articles">
        <Container className="py-4">
          <h2 className="fw-bold mb-5">Discover Our Articles</h2>
          
          <Row className="g-4">
            {placeholderArticles.map((article) => (
              <Col key={article.id} md={6} lg={4}>
                <Card className="border-0 shadow-sm h-100">
                  {/* Gunakan gambar placeholder, ganti path jika perlu */}
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={500}
                    height={300}
                    style={{ 
                      objectFit: 'cover', 
                      borderTopLeftRadius: '0.375rem', 
                      borderTopRightRadius: '0.375rem' 
                    }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-semibold mb-3">{article.title}</Card.Title>
                    <Card.Text className="text-muted">{article.excerpt}</Card.Text>
                    {/* Tombol ini bisa mengarah ke halaman detail artikel nanti */}
                    <Button 
                      as={Link} 
                      href={`/discover/${article.id}`} 
                      variant="dark" 
                      className="rounded-3 fw-semibold mt-auto"
                    >
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </main>
  );
}