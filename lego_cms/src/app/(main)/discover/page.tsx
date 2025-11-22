'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';

interface Article {
  _id: string; 
  title: string;
  content: string;
  category: string;
  thumbnail: string;
  createdAt: string;
}

export default function DiscoverPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Fungsi untuk Fetch Data dari Backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Request ke Backend Node.js (Port 5000)
        const res = await fetch('http://localhost:5000/api/articles');
        if (!res.ok) throw new Error('Gagal mengambil data');
        
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const getImageUrl = (path: string) => {
    if (!path) return '/images/placeholder-product.png'; // Gambar default
    if (path.startsWith('http')) return path; // Jika Cloudinary, pakai langsung
    return `http://localhost:5000${path}`; // Jika lokal, tambahkan host backend
  };

  // Tampilan Loading
  if (loading) {
    return (
      <Container className="d-flex vh-100 justify-content-center align-items-center">
        <Spinner animation="border" role="status" className="me-2" />
        <span>Loading articles...</span>
      </Container>
    );
  }

  return (
    <main>
      <section className="py-5" id="articles">
        <Container className="py-4">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2 className="fw-bold mb-0">Discover Our Articles</h2>
            {/* Tombol ini disembunyikan jika user bukan admin 
            <Link href="/admin/article" className="btn btn-outline-dark rounded-pill">
              Write Article
            </Link> */}
          </div>
          
          <Row className="g-4">
            {articles.length > 0 ? (
              articles.map((article) => (
                <Col key={article._id} md={6} lg={4}>
                  <Card className="border-0 shadow-sm h-100 card-hover">
                    {/* Gambar Artikel */}
                    <div style={{ position: 'relative', width: '100%', height: '250px' }}>
                      <Image
                        src={getImageUrl(article.thumbnail)}
                        alt={article.title}
                        fill
                        style={{ 
                          objectFit: 'cover', 
                          borderTopLeftRadius: '0.375rem', 
                          borderTopRightRadius: '0.375rem' 
                        }}
                        // Jika gambar error/hilang, ganti ke placeholder
                        onError={(e) => {
                           e.currentTarget.srcset = '/images/placeholder-product.png';
                        }}
                      />
                      <Badge 
                        bg="warning" 
                        className="position-absolute top-0 start-0 m-3 text-dark fw-bold"
                      >
                        {article.category}
                      </Badge>
                    </div>

                    <Card.Body className="d-flex flex-column p-4">
                      <small className="text-muted mb-2">
                        {new Date(article.createdAt).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </small>
                      
                      <Card.Title className="fw-bold mb-3 fs-5">
                        {article.title}
                      </Card.Title>
                      
                      {/* Tampilkan cuplikan konten (hapus tag HTML jika ada) */}
                      <Card.Text className="text-muted mb-4" style={{ 
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {article.content.replace(/<[^>]+>/g, '')}
                      </Card.Text>
                      
                      <Button 
                        as={Link} 
                        // Link ke Detail Page (Gunakan _id dari MongoDB)
                        href={`/discover/${article._id}`} 
                        variant="dark" 
                        className="rounded-3 fw-semibold mt-auto w-100"
                      >
                        Read More
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col className="text-center py-5">
                <h4 className="text-muted">No articles found yet.</h4>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </main>
  );
}