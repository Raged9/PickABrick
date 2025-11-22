'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ArticlePage() {
    const router = useRouter();
    
    // State untuk form
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('News');
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    // Handle File Change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnail(e.target.files[0]);
        }
    };

    // Handle Submit
    const handleSubmit = async (status: 'draft' | 'published') => {
        if (!title || !content) {
            alert("Title and Content are required!");
            return;
        }

        setLoading(true);

        // Gunakan FormData untuk upload file
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        formData.append('status', status);
        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }

        try {
            // URL Backend Anda
            const res = await fetch('http://localhost:5000/api/articles', {
                method: 'POST',
                // Jangan set Content-Type header secara manual saat pakai FormData!
                // Browser akan mengaturnya otomatis.
                body: formData,
            });

            if (res.ok) {
                alert(`Article ${status} successfully!`);
                // Reset form atau redirect
                router.push('/admin/article');
            } else {
                alert('Failed to save article');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">Write New Article</h2>
            <div className="row">
                {/* Kolom Kiri */}
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label fw-bold">Article Title</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    placeholder="Enter title here..." 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label fw-bold">Content</label>
                                <textarea 
                                    className="form-control" 
                                    rows={15} 
                                    placeholder="Start writing your article..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="d-flex justify-content-end gap-2">
                                <button 
                                    className="btn btn-secondary" 
                                    onClick={() => handleSubmit('draft')}
                                    disabled={loading}
                                >
                                    {loading ? 'Saving...' : 'Save Draft'}
                                </button>
                                <button 
                                    className="btn btn-primary px-4" 
                                    onClick={() => handleSubmit('published')}
                                    disabled={loading}
                                >
                                    {loading ? 'Publishing...' : 'Publish Article'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Kolom Kanan */}
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
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}