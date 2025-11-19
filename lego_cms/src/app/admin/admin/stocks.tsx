export default function StocksPage() {
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Stock Management</h2>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">
                    <i className="bi bi-plus-lg"></i> Add New Product
                </button>
            </div>

            {/* Grid Card Product */}
            <div className="row g-4">
                {/* Contoh Product Card 1 */}
                <div className="col-md-4 col-lg-3">
                    <div className="card h-100 shadow-sm">
                        <div style={{height: "150px", backgroundColor: "#eee"}} className="d-flex align-items-center justify-content-center text-muted">
                            [Image Preview]
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Lego Millennium Falcon</h5>
                            <p className="card-text text-truncate">Star Wars Series Ultimate Collector...</p>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="fw-bold text-primary">Rp 12.500.000</span>
                                <span className="badge bg-success">Stock: 5</span>
                            </div>
                            <div className="d-grid gap-2">
                                <button className="btn btn-sm btn-outline-dark"><i className="bi bi-pencil"></i> Edit</button>
                                <a href="#" className="btn btn-sm btn-success"><i className="bi bi-cart"></i> Tokopedia</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mockup Modal Form (Bootstrap Modal structure) */}
            <div className="modal fade" id="addProductModal" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Product Name</label>
                                    <input type="text" className="form-control" placeholder="e.g. Gundam RX-78" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" rows={3}></textarea>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Price (Rp)</label>
                                        <input type="number" className="form-control" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Stock Qty</label>
                                        <input type="number" className="form-control" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image URL / Upload</label>
                                    <input type="file" className="form-control" />
                                </div>
                                <hr />
                                <h6>Marketplace Links</h6>
                                <div className="input-group mb-2">
                                    <span className="input-group-text bg-success text-white">Tokopedia</span>
                                    <input type="text" className="form-control" placeholder="https://..." />
                                </div>
                                <div className="input-group mb-2">
                                    <span className="input-group-text bg-warning text-dark">Shopee</span>
                                    <input type="text" className="form-control" placeholder="https://..." />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}