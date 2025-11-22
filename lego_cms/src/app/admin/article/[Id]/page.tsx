'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Hook wajib untuk navigasi & params
import { Container, Spinner } from 'react-bootstrap';

export default function EditArticlePage() {
    const router = useRouter();
    const params = useParams();
    const articleId = params.Id; // Mengambil ID dari URL (misal: /admin/article/65f2...)
    
    // State untuk menampung data form
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('News');
    
    // State untuk file (hanya diisi jika user upload gambar BARU)
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [existingThumbnail, setExistingThumbnail] = useState(''); // Untuk preview gambar lama

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // --- 1. FETCH DATA LAMA (PRE-FILL) ---
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                // Panggil API Backend untuk detail artikel
                const res = await fetch(`http://localhost:5000/api/articles/${articleId}`);
                
                if (!res.ok) throw new Error('Gagal mengambil data');
                
                const data = await res.json();
                
                // ISI STATE DENGAN DATA DARI DATABASE
                setTitle(data.title);
                setContent(data.content);
                setCategory(data.category);
                setExistingThumbnail(data.thumbnail); // Simpan URL gambar lama untuk preview
                
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

    // --- 2. HANDLE FILE CHANGE ---
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnail(e.target.files[0]);
        }
    };

    // --- 3. HANDLE UPDATE (PUT) ---
    const handleUpdate = async (status: 'draft' | 'published') => {
        setSubmitting(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        formData.append('status', status);
        
        // Hanya kirim thumbnail jika user memilih file baru
        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }

        try {
            // Kirim request PUT ke Backend
            const res = await fetch(`http://localhost:5000/api/articles/${articleId}`, {
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

    // Tampilan Loading saat mengambil data awal
    if (loading) return <Container className="py-5 text-center"><Spinner animation="border" /></Container>;

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">Edit Article</h2>
            
            <div className="row">
                {/* Kolom Kiri: Form Utama */}
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label fw-bold">Article Title</label>
                                {/* PENTING: value={title} adalah kunci agar data lama muncul */}
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)} 
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label fw-bold">Content</label>
                                {/* PENTING: value={content} */}
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
                
                {/* Kolom Kanan: Opsi Tambahan */}
                <div className="col-lg-4">
                    <div className="card shadow-sm mb-3">
                        <div className="card-header bg-light">Publishing Options</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Category</label>
                                {/* PENTING: value={category} */}
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
                                
                                {/* Preview Gambar Lama */}
                                {existingThumbnail && !thumbnail && (
                                    <div className="mb-2 p-2 border rounded bg-light">
                                        <small className="d-block text-muted mb-1">Current Image:</small>
                                        <img 
                                            // Helper sederhana untuk menampilkan gambar (Local/Cloudinary)
                                            src={existingThumbnail.startsWith('http') ? existingThumbnail : `http://localhost:5000${existingThumbnail}`} 
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