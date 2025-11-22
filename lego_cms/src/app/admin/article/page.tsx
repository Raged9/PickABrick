'use client';

import { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Article {
  _id: string;
  title: string;
  category: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Fetch Semua Artikel
  const fetchArticles = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/articles');
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // 2. Fungsi Hapus (Delete)
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/articles/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Refresh list tanpa reload halaman
        setArticles(prev => prev.filter(article => article._id !== id));
        alert('Article deleted!');
      } else {
        alert('Failed to delete');
      }
    } catch (error) {
      alert('Error deleting article');
    }
  };

  if (loading) return <Container className="p-5 text-center"><Spinner animation="border" /></Container>;

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <Link href="/admin/article_new" className="btn btn-primary">
          + Create New Article
        </Link>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <Table responsive hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article._id} style={{ verticalAlign: 'middle' }}>
                  <td className="p-3 fw-semibold">{article.title}</td>
                  <td className="p-3"><Badge bg="info">{article.category}</Badge></td>
                  <td className="p-3">
                    <Badge bg={article.status === 'published' ? 'success' : 'secondary'}>
                      {article.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-muted">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-end">
                    <Link 
                      href={`/admin/article/${article._id}`} 
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      Edit
                    </Link>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDelete(article._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {articles.length === 0 && (
            <div className="text-center py-5 text-muted">No articles found.</div>
          )}
        </div>
      </div>
    </Container>
  );
}