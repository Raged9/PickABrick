'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation'; 
import { Container, Row, Col, Badge, Button, Spinner, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faArrowLeft, faEye, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

interface ArticleComment {
  _id?: string;
  user: string;
  text: string;
  createdAt: string;
}

interface Article {
  _id: string;
  title: string;
  content: string;
  category: string;
  thumbnail: string;
  createdAt: string;
  views?: number;
  likes?: number;
  likedBy?: string[];
  comments?: ArticleComment[];
}

export default function ArticleDetailPage() {
  const params = useParams();
  const articleId = params.articleId;
  const { user } = useAuth();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const hasViewedRef = useRef<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const getImageUrl = (path: string) => {
    if (!path) return '/images/placeholder-product.png';
    if (path.startsWith('http')) return path;
    return `${BASE_URL}${path.replace(/\\/g, '/')}`;
  };

  useEffect(() => {
    if (!articleId || hasViewedRef.current === String(articleId)) return;
    hasViewedRef.current = String(articleId);

    const fetchArticle = async () => {
      try {
        const res = await fetch(`${API_URL}/articles/${articleId}/view`, {
          method: 'POST',
        });
        
        if (!res.ok) {
          const fallbackRes = await fetch(`${API_URL}/articles/${articleId}`);
          if (!fallbackRes.ok) {
            setArticle(null);
          } else {
            const data = await fallbackRes.json();
            setArticle(data);
          }
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

  const handleLike = async () => {
    if (!article) return;
    try {
      const res = await fetch(`${API_URL}/articles/${article._id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id || null }),
      });
      if (res.ok) {
        const updated = await res.json();
        setArticle(updated);
      }
    } catch (error) {
      console.error('Error liking article:', error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article || !commentText.trim()) return;
    setSubmittingComment(true);
    try {
      const res = await fetch(`${API_URL}/articles/${article._id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: user?.username || 'Guest',
          text: commentText.trim(),
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setArticle(updated);
        setCommentText('');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setSubmittingComment(false);
    }
  };

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
                
                <div className="d-flex flex-wrap align-items-center text-muted gap-4">
                  <div className="d-flex align-items-center">
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
                  <div className="d-flex align-items-center" title="Views">
                    <FontAwesomeIcon icon={faEye} className="me-2" />
                    <span>{article.views ?? 0}</span>
                  </div>
                  <div
                    className="d-flex align-items-center"
                    style={{ cursor: 'pointer' }}
                    onClick={handleLike}
                    title="Click to Like"
                  >
                    <FontAwesomeIcon icon={faHeart} className="me-2 text-danger" />
                    <span>{article.likes ?? 0}</span>
                  </div>
                  <div
                    className="d-flex align-items-center"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowComments(!showComments)}
                    title="Click to view/add comments"
                  >
                    <FontAwesomeIcon icon={faComment} className="me-2" />
                    <span>{article.comments?.length ?? 0}</span>
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

              {showComments && (
                <div className="mt-5 pt-4 border-top">
                  <h5 className="fw-bold mb-3">
                    <FontAwesomeIcon icon={faComment} className="me-2" />
                    Comments ({article.comments?.length ?? 0})
                  </h5>
                  <Form onSubmit={handleCommentSubmit} className="mb-4">
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="text"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <Button type="submit" variant="dark" disabled={submittingComment}>
                        {submittingComment ? 'Posting...' : 'Post'}
                      </Button>
                    </div>
                  </Form>
                  {article.comments && article.comments.length > 0 ? (
                    <div className="d-flex flex-column gap-3">
                      {article.comments.map((c, idx) => (
                        <div key={c._id || idx} className="p-3 bg-light rounded-3">
                          <div className="d-flex justify-content-between mb-1">
                            <strong className="small">{c.user}</strong>
                            <small className="text-muted">
                              {new Date(c.createdAt).toLocaleDateString('id-ID')}
                            </small>
                          </div>
                          <p className="mb-0 small">{c.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted small">No comments yet.</p>
                  )}
                </div>
              )}

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
