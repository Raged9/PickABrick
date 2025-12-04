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

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${API_URL}/articles`);
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
    if (!path) return '/images/placeholder-product.png';
    if (path.startsWith('http')) return path;
    return `${process.env.NEXT_PUBLIC_BASE_URL}${path.replace(/\\/g, '/')}`;
  };

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
          </div>
          
          <Row className="g-4">
            {articles.length > 0 ? (
              articles.map((article) => (
                <Col key={article._id} md={6} lg={4}>
                  <Card className="border-0 shadow-sm h-100 card-hover">
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
                      
                      <Card.Text className="text-muted mb-4" style={{ 
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {article.content.replace(/<[^>]+>/g, '')}
                      </Card.Text>
                      
                      <Link
                        href={`/discover/${article._id}`}
                        className="btn btn-dark rounded-3 fw-semibold mt-auto w-100"
                        style={{ textDecoration: 'none' }}
                      >
                        Read More
                      </Link>
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