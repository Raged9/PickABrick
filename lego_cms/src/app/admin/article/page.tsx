export default function ArticlePage() {
    return (
        <div className="container-fluid">
            <h2 className="mb-4">Write New Article</h2>
            <div className="row">
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label fw-bold">Article Title</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Enter title here..." />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label fw-bold">Content</label>
                                {/* Di real app, Anda bisa pakai Rich Text Editor seperti Quill/TinyMCE */}
                                <textarea className="form-control" rows={15} placeholder="Start writing your article..."></textarea>
                            </div>

                            <div className="d-flex justify-content-end gap-2">
                                <button className="btn btn-secondary">Save Draft</button>
                                <button className="btn btn-primary px-4">Publish Article</button>
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
                                <select className="form-select">
                                    <option>News</option>
                                    <option>Tutorial</option>
                                    <option>Review</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Thumbnail Image</label>
                                <input type="file" className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}