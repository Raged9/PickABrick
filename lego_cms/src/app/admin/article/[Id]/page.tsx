'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; 
import { Container, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faImage, faPlay } from '@fortawesome/free-solid-svg-icons';
import { getYouTubeVideoId, isDirectVideoFile } from '@/component/VideoThumbnailPlayer';

export default function EditArticlePage() {
    const router = useRouter();
    const params = useParams();
    const articleId = params.Id; 
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('News');
    const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
    const [videoUrl, setVideoUrl] = useState('');
    
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
                
                setTitle(data.title || '');
                setContent(data.content || '');
                setCategory(data.category || 'News');
                setExistingThumbnail(data.thumbnail || '');
                setVideoUrl(data.videoUrl || '');
                setMediaType(data.mediaType || (data.videoUrl ? 'video' : 'image'));
                
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
            const file = e.target.files[0];
            setThumbnail(file);
            if (file.type.startsWith('video/')) {
                setMediaType('video');
            }
        }
    };

    const handleUpdate = async (status: 'draft' | 'published') => {
        setSubmitting(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        formData.append('status', status);
        formData.append('mediaType', mediaType);
        formData.append('videoUrl', videoUrl);
        
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
                const errData = await res.json().catch(() => ({}));
                alert('Failed to update article: ' + (errData.message || 'Unknown error'));
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <Container className="py-5 text-center"><Spinner animation="border" /></Container>;

    const previewYtId = videoUrl ? getYouTubeVideoId(videoUrl) : null;
    const isExistingVideo = isDirectVideoFile(existingThumbnail);

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4 fw-bold">Edit Article</h2>
            
            <div className="row">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-body p-4">
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
                                    rows={14} 
                                    value={content} 
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="d-flex justify-content-end gap-2 pt-2">
                                <button 
                                    type="button"
                                    className="btn btn-secondary px-4" 
                                    onClick={() => handleUpdate('draft')} 
                                    disabled={submitting}
                                >
                                    {submitting ? 'Saving...' : 'Update Draft'}
                                </button>
                                <button 
                                    type="button"
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
                    {/* Media Type Selection */}
                    <div className="card shadow-sm border-0 mb-3">
                        <div className="card-header bg-light fw-bold">Thumbnail & Media Type</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label small fw-semibold">Choose Media Format:</label>
                                <div className="btn-group w-100" role="group">
                                    <button
                                        type="button"
                                        className={`btn btn-sm ${mediaType === 'image' ? 'btn-dark' : 'btn-outline-secondary'}`}
                                        onClick={() => setMediaType('image')}
                                    >
                                        <FontAwesomeIcon icon={faImage} className="me-1" /> Image
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn btn-sm ${mediaType === 'video' ? 'btn-danger' : 'btn-outline-secondary'}`}
                                        onClick={() => setMediaType('video')}
                                    >
                                        <FontAwesomeIcon icon={faVideo} className="me-1" /> Video
                                    </button>
                                </div>
                            </div>

                            {mediaType === 'video' && (
                                <div className="mb-3 p-3 bg-light rounded border border-danger-subtle">
                                    <label className="form-label fw-bold small text-danger d-flex align-items-center gap-1">
                                        <FontAwesomeIcon icon={faPlay} /> Video URL (YouTube / Direct MP4)
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm mb-2"
                                        placeholder="e.g. https://www.youtube.com/watch?v=..."
                                        value={videoUrl}
                                        onChange={(e) => setVideoUrl(e.target.value)}
                                    />
                                    <small className="text-muted d-block mb-2">
                                        Masukkan link YouTube atau direct URL file video.
                                    </small>

                                    {previewYtId && (
                                        <div className="rounded overflow-hidden mb-2" style={{ aspectRatio: '16/9' }}>
                                            <iframe
                                                src={`https://www.youtube.com/embed/${previewYtId}`}
                                                style={{ width: '100%', height: '100%', border: 'none' }}
                                                title="Preview"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="mb-3">
                                <label className="form-label fw-semibold small">
                                    {mediaType === 'video' ? 'Cover Poster / Upload Video File' : 'Thumbnail Image'}
                                </label>
                                
                                {existingThumbnail && !thumbnail && (
                                    <div className="mb-2 p-2 border rounded bg-light">
                                        <small className="d-block text-muted mb-1">Current Media:</small>
                                        {isExistingVideo ? (
                                            <video 
                                                src={existingThumbnail.startsWith('http') ? existingThumbnail : `${BASE_URL}${existingThumbnail}`}
                                                controls
                                                style={{ width: '100%', maxHeight: '150px' }}
                                            />
                                        ) : (
                                            <img 
                                                src={existingThumbnail.startsWith('http') ? existingThumbnail : `${BASE_URL}${existingThumbnail}`} 
                                                alt="Current" 
                                                style={{ width: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }}
                                            />
                                        )}
                                    </div>
                                )}

                                <input 
                                    type="file" 
                                    className="form-control form-control-sm" 
                                    accept={mediaType === 'video' ? 'image/*,video/*' : 'image/*'} 
                                    onChange={handleFileChange} 
                                />
                                <small className="text-muted">Leave empty to keep current media</small>
                            </div>
                        </div>
                    </div>

                    {/* Publishing Options */}
                    <div className="card shadow-sm border-0 mb-3">
                        <div className="card-header bg-light fw-bold">Publishing Options</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label fw-semibold small">Category</label>
                                <select 
                                    className="form-select form-select-sm" 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="News">News</option>
                                    <option value="Tutorial">Tutorial</option>
                                    <option value="Review">Review</option>
                                    <option value="Video">Video Spotlight</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
