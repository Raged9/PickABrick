'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; 
import { Container, Row, Col, Badge, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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

export default function ArticleDetailPage() {
  const params = useParams();
  const articleId = params.articleId;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const getImageUrl = (path: string) => {
    if (!path) return '/images/placeholder-product.png';
    if (path.startsWith('http')) return path;
    return `${BASE_URL}${path.replace(/\\/g, '/')}`;
  };

  useEffect(() => {
    if (!articleId) return;

    const fetchArticle = async () => {
      try {
        const res = await fetch(`${API_URL}/articles/${articleId}`);
        
        if (!res.ok) {
            setArticle(null);
        } else {
            const data = await res.json();
            setArticle(data);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (loading) {
    return (
      <Container className="d-flex vh-100 justify-content-center align-items-center flex-column">
        <Spinner animation="border" role="status" className="mb-3" />
        <p className="text-muted">Loading article details...</p>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container className="text-center py-5 my-5">
        <h2 className="fw-bold mb-3">Article Not Found</h2>
        <p className="text-muted mb-4">The article you are looking for does not exist or has been removed.</p>
        <Link 
          href="/discover" 
          className="btn btn-dark rounded-pill px-4"
          style={{ textDecoration: 'none' }}
        >
        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Back to Discover
        </Link>
      </Container>
    );
  }

  return (
    <main>
      <article className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              
              <Link href="/discover" className="text-decoration-none text-muted mb-4 d-inline-block">
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Back to Articles
              </Link>

              <header className="mb-5">
                <Badge bg="warning" text="dark" className="mb-3 px-3 py-2 rounded-pill">
                  {article.category}
                </Badge>
                
                <h1 className="fw-bold display-5 mb-4">{article.title}</h1>
                
                <div className="d-flex align-items-center text-muted">
                  <div className="d-flex align-items-center me-4">
                    <FontAwesomeIcon icon={faCalendar} className="me-2" />
                    <span>
                      {new Date(article.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    <span>Admin</span>
                  </div>
                </div>
              </header>

              <div className="position-relative w-100 mb-5 rounded-4 overflow-hidden shadow-sm" style={{ aspectRatio: '16/9' }}>
                <Image
                  src={getImageUrl(article.thumbnail)}
                  alt={article.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>

              <div 
                className="article-content fs-5 lh-lg text-dark"

                style={{ whiteSpace: 'pre-wrap', color: '#333' }}
              >
                {article.content}
              </div>

              <hr className="my-5" />

              <div className="text-center">
                <p className="fw-bold mb-3">Enjoyed this article?</p>
                <Link href="/discover" className="btn btn-outline-dark rounded-pill px-4" style={{ textDecoration: 'none' }}>
                  Read More Articles
                </Link>
              </div>

            </Col>
          </Row>
        </Container>
      </article>
    </main>
  );
}