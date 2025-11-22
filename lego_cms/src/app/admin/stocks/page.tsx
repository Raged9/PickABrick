"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Product {
    id: number;
    sku: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    discount?: number;
    tokopediaLink?: string;
    shopeeLink?: string;
    otherLink?: string;
}

export default function StocksPage() {
    // Data Dummy Awal
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            sku: "LEGO-10218",
            name: "Lego Pet Shop",
            description: "Modular Building Series, collectible set for adults.",
            price: 2399000,
            stock: 8,
            imageUrl: "/image/lego_pet_shop.jpg",
            discount: 10,
            tokopediaLink: "https://www.tokopedia.com/lego-pet-shop",
            shopeeLink: "https://shopee.co.id/lego-pet-shop",
        },
        {
            id: 2,
            sku: "LEGO-75301",
            name: "Lego Luke Skywalker's X-Wing Fighter",
            description: "Build an iconic Star Wars X-wing Fighter, featuring an opening cockpit.",
            price: 799000,
            stock: 3,
            imageUrl: "/image/lego_xwing.jpg",
            tokopediaLink: "https://www.tokopedia.com/lego-xwing",
        },
    ]);

    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Load Bootstrap JS Client-Side
    useEffect(() => {
        if (typeof window !== "undefined") {
            require("bootstrap/dist/js/bootstrap.bundle.min.js");
        }
    }, []);

    // Handle Klik Tombol Edit
    const handleEditClick = (product: Product) => {
        setEditingProduct(product);
        const modalElement = document.getElementById('productFormModal');
        if (modalElement) {
            // @ts-ignore
            const bootstrap = window.bootstrap || (window as any).bootstrap;
            if (bootstrap) {
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            }
        }
    };

    // Handle Tutup Modal
    const handleCloseModal = () => {
        const modalElement = document.getElementById('productFormModal');
        if (modalElement) {
            // @ts-ignore
            const bootstrap = window.bootstrap || (window as any).bootstrap;
            if (bootstrap) {
                const modal = bootstrap.Modal.getInstance(modalElement); 
                if (modal) {
                    modal.hide();
                }
            }
        }
        setTimeout(() => setEditingProduct(null), 150);
    };

    // Handle Simpan Perubahan
    const handleSaveProduct = (event: React.FormEvent) => {
        event.preventDefault();
        if (editingProduct) {
            if (editingProduct.id === 0) {
                 // Logic Tambah Produk Baru (Simulasi ID)
                 const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
                 setProducts([...products, { ...editingProduct, id: newId }]);
            } else {
                // Logic Update Produk
                setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
            }
        }
        handleCloseModal();
    };

    // Handle Perubahan Input Form
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (editingProduct) {
            setEditingProduct({
                ...editingProduct,
                [name]: name === "price" || name === "stock" || name === "discount" ? parseFloat(value) : value,
            });
        }
    };

    // Handle Buka Modal Tambah Produk
    const openAddModal = () => {
        setEditingProduct({
            id: 0, 
            sku: "", 
            name: "", 
            description: "", 
            price: 0, 
            stock: 0, 
            imageUrl: "",
            discount: 0
        }); 
        
        const modalElement = document.getElementById('productFormModal');
        if (modalElement) {
             // @ts-ignore
             const bootstrap = window.bootstrap || (window as any).bootstrap;
             if (bootstrap) {
                 const modal = new bootstrap.Modal(modalElement);
                 modal.show();
             }
        }
    }

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Stock Management</h2>
                <button className="btn btn-primary" onClick={openAddModal}>
                    <i className="bi bi-plus-lg"></i> Add New Product
                </button>
            </div>

            {/* Grid Produk */}
            <div className="row g-4">
                {products.map((product) => (
                    <div className="col-md-4 col-lg-3" key={product.id}>
                        <div className="card h-100 shadow-sm product-card position-relative">
                            
                            {/* Gambar Produk */}
                            <div className="d-flex align-items-center justify-content-center pt-3 position-relative" style={{ height: "180px", overflow: "hidden" }}>
                                <Image
                                    src={product.imageUrl || "/image/placeholder.png"} 
                                    alt={product.name}
                                    width={150}
                                    height={150}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>

                            {/* Info Produk */}
                            <div className="card-body pt-0 text-dark d-flex flex-column">
                                {/* Diskon Tag */}
                                {product.discount && product.discount > 0 ? (
                                    <div className="mb-2">
                                        <span className="badge rounded-pill bg-danger px-3 py-2">
                                            Sale {product.discount}%
                                        </span>
                                    </div>
                                ) : <div className="mb-2" style={{height: '31px'}}></div>}
                                
                                <small className="text-muted d-block mb-1">SKU : {product.sku}</small>
                                <h5 className="card-title fw-bold mb-1 text-truncate">{product.name}</h5>
                                
                                {/* Menampilkan Description di Card (Truncated) */}
                                <p className="card-text text-muted small text-truncate mb-3">
                                    {product.description}
                                </p>
                                
                                <div className="d-flex justify-content-between align-items-center mb-3 mt-auto">
                                    <span className="fw-bold fs-5 text-primary">Rp {product.price.toLocaleString('id-ID')}</span>
                                    <span className="badge bg-success py-2 px-3"><i className="bi bi-boxes me-1"></i> {product.stock} pcs</span>
                                </div>
                                
                                <div className="d-grid">
                                    <button 
                                        className="btn btn-dark btn-sm rounded-pill py-2"
                                        onClick={() => handleEditClick(product)}
                                    >
                                        <i className="bi bi-pencil me-2"></i> Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Form Add/Edit */}
            <div className="modal fade" id="productFormModal" tabIndex={-1} aria-labelledby="productFormModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="productFormModalLabel">
                                {editingProduct && editingProduct.id !== 0 ? "Edit Product" : "Add New Product"}
                            </h5>
                            <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSaveProduct}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="productName" className="form-label">Product Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="productName"
                                        name="name"
                                        placeholder="e.g. Gundam RX-78"
                                        value={editingProduct?.name || ''}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productSKU" className="form-label">SKU</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="productSKU"
                                        name="sku"
                                        placeholder="e.g. GUNDAM-RX78-01"
                                        value={editingProduct?.sku || ''}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>
                                
                                {/* INPUT UNTUK MENGUBAH DESCRIPTION */}
                                <div className="mb-3">
                                    <label htmlFor="productDescription" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="productDescription"
                                        name="description"
                                        rows={3}
                                        placeholder="Enter product description"
                                        value={editingProduct?.description || ''}
                                        onChange={handleFormChange}
                                    ></textarea>
                                </div>

                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="productPrice" className="form-label">Price (Rp)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="productPrice"
                                            name="price"
                                            value={editingProduct?.price || ''}
                                            onChange={handleFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="productStock" className="form-label">Stock Qty</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="productStock"
                                            name="stock"
                                            value={editingProduct?.stock || ''}
                                            onChange={handleFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="productDiscount" className="form-label">Discount (%)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="productDiscount"
                                            name="discount"
                                            placeholder="0"
                                            value={editingProduct?.discount || ''}
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productImage" className="form-label">Image URL / Upload</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="productImage"
                                        name="imageUrl"
                                        placeholder="e.g. /image/product-name.jpg"
                                        value={editingProduct?.imageUrl || ''}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <hr />
                                <h6>Marketplace Links</h6>
                                <div className="input-group mb-2">
                                    <span className="input-group-text bg-success text-white"><i className="bi bi-bag"></i> Tokopedia</span>
                                    <input
                                        type="url"
                                        className="form-control"
                                        name="tokopediaLink"
                                        placeholder="https://www.tokopedia.com/your-product"
                                        value={editingProduct?.tokopediaLink || ''}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div className="input-group mb-2">
                                    <span className="input-group-text bg-danger text-white"><i className="bi bi-shop"></i> Shopee</span>
                                    <input
                                        type="url"
                                        className="form-control"
                                        name="shopeeLink"
                                        placeholder="https://shopee.co.id/your-product"
                                        value={editingProduct?.shopeeLink || ''}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div className="input-group mb-2">
                                    <span className="input-group-text bg-info text-white"><i className="bi bi-link"></i> Other Link</span>
                                    <input
                                        type="url"
                                        className="form-control"
                                        name="otherLink"
                                        placeholder="https://your-custom-link.com"
                                        value={editingProduct?.otherLink || ''}
                                        onChange={handleFormChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                                <button type="submit" className="btn btn-primary">
                                    {editingProduct && editingProduct.id !== 0 ? "Save Changes" : "Add Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}