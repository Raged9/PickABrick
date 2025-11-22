'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Hook untuk ambil ID dari URL
import { Container, Row, Col, Badge, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

// 1. Definisi Tipe Data
interface Article {
  _id: string;
  title: string;
  content: string;
  category: string;
  thumbnail: string;
  createdAt: string;
}

export default function ArticleDetailPage() {
  // 2. Ambil ID dari URL
  const params = useParams();
  const articleId = params.articleId;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  // 3. Helper URL Gambar (Sama seperti sebelumnya)
  const getImageUrl = (path: string) => {
    if (!path) return '/images/placeholder-product.png';
    if (path.startsWith('http')) return path;
    return `http://localhost:5000${path}`;
  };

  // 4. Fetch Data Artikel Spesifik
  useEffect(() => {
    if (!articleId) return;

    const fetchArticle = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/articles/${articleId}`);
        
        if (!res.ok) {
            // Jika 404 atau error lain
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

  // --- TAMPILAN LOADING ---
  if (loading) {
    return (
      <Container className="d-flex vh-100 justify-content-center align-items-center flex-column">
        <Spinner animation="border" role="status" className="mb-3" />
        <p className="text-muted">Loading article details...</p>
      </Container>
    );
  }

  // --- TAMPILAN JIKA TIDAK DITEMUKAN ---
  if (!article) {
    return (
      <Container className="text-center py-5 my-5">
        <h2 className="fw-bold mb-3">Article Not Found</h2>
        <p className="text-muted mb-4">The article you are looking for does not exist or has been removed.</p>
        <Button as={Link} href="/discover" variant="dark" className="rounded-pill px-4">
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Back to Discover
        </Button>
      </Container>
    );
  }

  // --- TAMPILAN UTAMA ---
  return (
    <main>
      <article className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              
              {/* Tombol Kembali */}
              <Link href="/discover" className="text-decoration-none text-muted mb-4 d-inline-block">
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Back to Articles
              </Link>

              {/* Header Artikel */}
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

              {/* Gambar Utama */}
              <div className="position-relative w-100 mb-5 rounded-4 overflow-hidden shadow-sm" style={{ aspectRatio: '16/9' }}>
                <Image
                  src={getImageUrl(article.thumbnail)}
                  alt={article.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority // Prioritas loading gambar utama
                />
              </div>

              {/* Konten Artikel */}
              <div 
                className="article-content fs-5 lh-lg text-dark"
                // style: white-space pre-wrap agar enter/baris baru terbaca
                style={{ whiteSpace: 'pre-wrap', color: '#333' }}
              >
                {article.content}
              </div>

              <hr className="my-5" />

              {/* Footer Artikel */}
              <div className="text-center">
                <p className="fw-bold mb-3">Enjoyed this article?</p>
                <Button as={Link} href="/discover" variant="outline-dark" className="rounded-pill px-4">
                  Read More Articles
                </Button>
              </div>

            </Col>
          </Row>
        </Container>
      </article>
    </main>
  );
}