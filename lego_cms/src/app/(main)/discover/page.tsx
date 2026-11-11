'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart, faComment, faVideo, faPlay, faFilm, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import VideoThumbnailPlayer, { isArticleVideo } from '@/component/VideoThumbnailPlayer';

interface Article {
  _id: string; 
  title: string;
  content: string;
  category: string;
  thumbnail: string;
  videoUrl?: string;
  mediaType?: 'image' | 'video';
  createdAt: string;
  views?: number;
  likes?: number;
  comments?: { user: string; text: string; createdAt: string }[];
}

export default function DiscoverPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'video' | 'article'>('all');

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

  const getMediaUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${process.env.NEXT_PUBLIC_BASE_URL}${path.replace(/\\/g, '/')}`;
  };

  if (loading) {
    return (
      <Container className="d-flex vh-100 justify-content-center align-items-center">
        <Spinner animation="border" role="status" className="me-2" />
        <span>Loading articles & videos...</span>
      </Container>
    );
  }

  // Pisahkan artikel yang memiliki video untuk Section Video
  const videoArticles = articles.filter(isArticleVideo);
  
  // Filtered articles untuk grid utama
  const filteredArticles = articles.filter((art) => {
    if (filter === 'video') return isArticleVideo(art);
    if (filter === 'article') return !isArticleVideo(art);
    return true;
  });

  return (
    <main>
      {/* ================= SECTION VIDEO ================= */}
      <section className="py-5" style={{ backgroundColor: '#141821', color: '#fff' }} id="video-section">
        <Container className="py-3">
          <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 gap-3">
            <div>
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-danger bg-opacity-25 text-danger fw-semibold mb-2 small">
                <FontAwesomeIcon icon={faVideo} />
                <span>VIDEO SPOTLIGHT</span>
              </div>
              <h2 className="fw-bold mb-1 text-white">Watch LEGO Videos & Guides</h2>
              <p className="text-secondary mb-0">
                Play video thumbnails directly or dive into detailed reviews and speed builds.
              </p>
            </div>
            {videoArticles.length > 0 && (
              <span className="badge bg-secondary px-3 py-2 rounded-pill">
                {videoArticles.length} Video{videoArticles.length > 1 ? 's' : ''} Available
              </span>
            )}
          </div>

          {videoArticles.length > 0 ? (
            <Row className="g-4">
              {videoArticles.slice(0, 3).map((article) => {
                const cover = getMediaUrl(article.thumbnail);
                const vidUrl = article.videoUrl || cover;
                return (
                  <Col key={`vid-${article._id}`} md={6} lg={4}>
                    <Card className="border-0 shadow-lg h-100 bg-dark text-white rounded-3 overflow-hidden">
                      <div className="position-relative">
                        <VideoThumbnailPlayer
                          thumbnailUrl={cover}
                          videoUrl={vidUrl}
                          mediaType="video"
                          title={article.title}
                          height="230px"
                        />
                        <div className="position-absolute top-0 start-0 m-3 d-flex gap-2" style={{ zIndex: 5, pointerEvents: 'none' }}>
                          <Badge bg="danger" className="fw-bold text-uppercase d-flex align-items-center gap-1">
                            <FontAwesomeIcon icon={faPlay} style={{ fontSize: '0.65rem' }} /> Video
                          </Badge>
                          <Badge bg="warning" className="text-dark fw-bold">
                            {article.category}
                          </Badge>
                        </div>
                      </div>

                      <Card.Body className="d-flex flex-column p-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <small className="text-secondary">
                            {new Date(article.createdAt).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </small>
                          <div className="d-flex align-items-center gap-3 text-secondary small">
                            <span title="Views">
                              <FontAwesomeIcon icon={faEye} className="me-1" />
                              {article.views ?? 0}
                            </span>
                            <span title="Likes">
                              <FontAwesomeIcon icon={faHeart} className="me-1 text-danger" />
                              {article.likes ?? 0}
                            </span>
                            <span title="Comments">
                              <FontAwesomeIcon icon={faComment} className="me-1" />
                              {article.comments?.length ?? 0}
                            </span>
                          </div>
                        </div>

                        <Card.Title className="fw-bold mb-2 fs-5 text-white">
                          {article.title}
                        </Card.Title>

                        <Card.Text 
                          className="text-secondary mb-4 small" 
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {article.content.replace(/<[^>]+>/g, '')}
                        </Card.Text>

                        <Link
                          href={`/discover/${article._id}`}
                          className="btn btn-outline-light rounded-pill fw-semibold mt-auto w-100 btn-sm py-2"
                        >
                          Watch & Read Full Article »
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <div className="text-center py-5 border border-secondary border-dashed rounded-3 p-4 bg-dark bg-opacity-50">
              <FontAwesomeIcon icon={faFilm} size="3x" className="text-secondary mb-3" />
              <h5 className="text-white fw-bold">Belum Ada Video Ditambahkan</h5>
              <p className="text-secondary mb-0">
                Anda dapat menambahkan artikel dengan video (YouTube URL / file video) melalui Admin Dashboard.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* ================= ALL ARTICLES SECTION ================= */}
      <section className="py-5" id="articles">
        <Container className="py-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
            <div>
              <h2 className="fw-bold mb-1">Discover Our Articles</h2>
              <p className="text-muted mb-0">Explore the latest news, tutorials, reviews, and video stories</p>
            </div>

            {/* Filter Buttons */}
            <div className="d-flex gap-2">
              <Button
                variant={filter === 'all' ? 'dark' : 'outline-secondary'}
                size="sm"
                className="rounded-pill px-3"
                onClick={() => setFilter('all')}
              >
                All ({articles.length})
              </Button>
              <Button
                variant={filter === 'video' ? 'dark' : 'outline-secondary'}
                size="sm"
                className="rounded-pill px-3 d-flex align-items-center gap-1"
                onClick={() => setFilter('video')}
              >
                <FontAwesomeIcon icon={faVideo} className="text-danger" /> Videos ({videoArticles.length})
              </Button>
              <Button
                variant={filter === 'article' ? 'dark' : 'outline-secondary'}
                size="sm"
                className="rounded-pill px-3 d-flex align-items-center gap-1"
                onClick={() => setFilter('article')}
              >
                <FontAwesomeIcon icon={faNewspaper} /> Articles ({articles.length - videoArticles.length})
              </Button>
            </div>
          </div>
          
          <Row className="g-4">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => {
                const isVideo = isArticleVideo(article);
                const cover = getMediaUrl(article.thumbnail);
                const vidUrl = article.videoUrl || (isVideo ? cover : '');

                return (
                  <Col key={article._id} md={6} lg={4}>
                    <Card className="border-0 shadow-sm h-100 card-hover">
                      <div className="position-relative">
                        <VideoThumbnailPlayer
                          thumbnailUrl={cover}
                          videoUrl={vidUrl}
                          mediaType={isVideo ? 'video' : 'image'}
                          title={article.title}
                          height="250px"
                        />
                        <div className="position-absolute top-0 start-0 m-3 d-flex gap-2" style={{ zIndex: 4, pointerEvents: 'none' }}>
                          <Badge 
                            bg="warning" 
                            className="text-dark fw-bold"
                          >
                            {article.category}
                          </Badge>
                          {isVideo && (
                            <Badge bg="danger" className="fw-bold d-flex align-items-center gap-1">
                              <FontAwesomeIcon icon={faPlay} style={{ fontSize: '0.65rem' }} /> VIDEO
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Card.Body className="d-flex flex-column p-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <small className="text-muted">
                            {new Date(article.createdAt).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </small>
                          <div className="d-flex align-items-center gap-3 text-muted small">
                            <span title="Views">
                              <FontAwesomeIcon icon={faEye} className="me-1" />
                              {article.views ?? 0}
                            </span>
                            <span title="Likes">
                              <FontAwesomeIcon icon={faHeart} className="me-1 text-danger" />
                              {article.likes ?? 0}
                            </span>
                            <span title="Comments">
                              <FontAwesomeIcon icon={faComment} className="me-1" />
                              {article.comments?.length ?? 0}
                            </span>
                          </div>
                        </div>
                        
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
                          {isVideo ? 'Watch & Read More' : 'Read More'}
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <Col className="text-center py-5">
                <h4 className="text-muted">No articles found in this category.</h4>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </main>
  );
}
