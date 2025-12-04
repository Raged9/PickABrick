'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; 
import { Container, Spinner } from 'react-bootstrap';

export default function EditArticlePage() {
    const router = useRouter();
    const params = useParams();
    const articleId = params.Id; 
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('News');
    
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [existingThumbnail, setExistingThumbnail] = useState(''); 

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await fetch(`${API_URL}/articles/${articleId}`);
                
                if (!res.ok) throw new Error('Gagal mengambil data');
                
                const data = await res.json();
                
                setTitle(data.title);
                setContent(data.content);
                setCategory(data.category);
                setExistingThumbnail(data.thumbnail);
                
            } catch (error) {
                console.error(error);
                alert('Gagal memuat data artikel. Pastikan Backend nyala.');
            } finally {
                setLoading(false);
            }
        };

        if (articleId) {
            fetchArticle();
        }
    }, [articleId]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnail(e.target.files[0]);
        }
    };

    const handleUpdate = async (status: 'draft' | 'published') => {
        setSubmitting(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        formData.append('status', status);
        
        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }

        try {
            const res = await fetch(`${API_URL}/articles/${articleId}`, {
                method: 'PUT', 
                body: formData,
            });

            if (res.ok) {
                alert(`Article updated successfully!`);
                router.push('/admin/article'); 
            } else {
                alert('Failed to update article');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <Container className="py-5 text-center"><Spinner animation="border" /></Container>;

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">Edit Article</h2>
            
            <div className="row">
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label fw-bold">Article Title</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)} 
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label fw-bold">Content</label>
                                <textarea 
                                    className="form-control" 
                                    rows={15} 
                                    value={content} 
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="d-flex justify-content-end gap-2">
                                <button 
                                    className="btn btn-secondary" 
                                    onClick={() => handleUpdate('draft')} 
                                    disabled={submitting}
                                >
                                    {submitting ? 'Saving...' : 'Update Draft'}
                                </button>
                                <button 
                                    className="btn btn-primary px-4" 
                                    onClick={() => handleUpdate('published')} 
                                    disabled={submitting}
                                >
                                    {submitting ? 'Updating...' : 'Update & Publish'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-lg-4">
                    <div className="card shadow-sm mb-3">
                        <div className="card-header bg-light">Publishing Options</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Category</label>
                                <select 
                                    className="form-select" 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="News">News</option>
                                    <option value="Tutorial">Tutorial</option>
                                    <option value="Review">Review</option>
                                </select>
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Thumbnail Image</label>
                                
                                {existingThumbnail && !thumbnail && (
                                    <div className="mb-2 p-2 border rounded bg-light">
                                        <small className="d-block text-muted mb-1">Current Image:</small>
                                        <img 
                                            src={existingThumbnail.startsWith('http') ? existingThumbnail : `${BASE_URL}${existingThumbnail}`} 
                                            alt="Current" 
                                            style={{ width: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }}
                                        />
                                    </div>
                                )}

                                <input 
                                    type="file" 
                                    className="form-control" 
                                    accept="image/*" 
                                    onChange={handleFileChange} 
                                />
                                <small className="text-muted">Leave empty to keep current image</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}