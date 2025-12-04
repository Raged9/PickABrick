'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Spinner, Modal, Button, Form, Table, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';

// Tipe data sesuai MongoDB
interface Product {
    _id: string;
    sku: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    discount?: number;
    category?: string;
    tokopediaLink?: string;
    shopeeLink?: string;
    otherLink?: string;
}

export default function StocksPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setTimeout(() => setEditingProduct(null), 200);
    };
    const handleShow = () => setShow(true);

    const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/products`);
            if (!res.ok) throw new Error("Gagal fetch");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const openAddModal = () => {
        setEditingProduct({});
        setImageFile(null);
        handleShow();
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setImageFile(null);
        handleShow();
    };

    const handleSaveProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const isNew = !editingProduct?._id;
        const url = isNew 
            ? `${API_URL}/products` 
            : `${API_URL}/products/${editingProduct?._id}`;
        
        const method = isNew ? 'POST' : 'PUT';

        const formData = new FormData();
        formData.append('sku', editingProduct?.sku || '');
        formData.append('name', editingProduct?.name || '');
        formData.append('description', editingProduct?.description || '');
        formData.append('price', String(editingProduct?.price || 0));
        formData.append('stock', String(editingProduct?.stock || 0));
        formData.append('discount', String(editingProduct?.discount || 0));
        formData.append('category', editingProduct?.category || 'Modular');
        formData.append('tokopediaLink', editingProduct?.tokopediaLink || '');
        formData.append('shopeeLink', editingProduct?.shopeeLink || '');
        formData.append('otherLink', editingProduct?.otherLink || '');
        
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const res = await fetch(url, { method, body: formData });
            if (res.ok) {
                alert(isNew ? 'Product added!' : 'Product updated!');
                fetchProducts();
                handleClose();
            } else {
                alert('Failed to save product');
            }
        } catch (error) {
            console.error(error);
            alert('Error saving product');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure delete this product?')) return;
        try {
            await fetch(`${API_URL}/products${id}`, { method: 'DELETE' });
            fetchProducts();
        } catch (error) {
            alert('Error deleting product');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditingProduct(prev => ({
            ...prev,
            [name]: (name === 'price' || name === 'stock' || name === 'discount') ? Number(value) : value
        }));
    };

    const getImageUrl = (path?: string) => {
        if (!path) return '/images/placeholder-product.png';
        if (path.startsWith('http')) return path;
        return `${BASE_URL}/${path.replace(/\\/g, '/')}`;
    };

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Stock Management</h2>
                <Button variant="primary" onClick={openAddModal}>
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Add New Product
                </Button>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" />
                </div>
            ) : (
                <>
                    {products.length === 0 ? (
                        <div className="text-center py-5 text-muted bg-light rounded-3">
                            <h4>No products found.</h4>
                            <p>Click "Add New Product" to start.</p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {products.map((product) => (
                                <div className="col-xl-3 col-lg-4 col-md-6" key={product._id}>
                                    <div className="card h-100 border-0 shadow-sm product-card">
                                        <div className="position-relative" style={{height: '200px', overflow: 'hidden', backgroundColor: '#f8f9fa'}}>
                                            <Image 
                                                src={getImageUrl(product.imageUrl)} 
                                                alt={product.name}
                                                fill
                                                style={{objectFit: 'contain', padding: '15px'}}
                                                onError={(e) => e.currentTarget.srcset = '/images/placeholder-product.png'}
                                            />
                                            {/* Badge Discount */}
                                            {(product.discount || 0) > 0 && (
                                                <span className="position-absolute top-0 start-0 m-2 badge bg-danger">
                                                    Sale {product.discount}%
                                                </span>
                                            )}
                                        </div>
                                        <div className="card-body d-flex flex-column">
                                            <small className="text-muted mb-1">SKU: {product.sku}</small>
                                            <h5 className="card-title fw-bold text-truncate" title={product.name}>{product.name}</h5>
                                            
                                            <div className="mt-auto pt-3 d-flex justify-content-between align-items-center">
                                                <span className="fw-bold text-primary">
                                                    Rp {product.price.toLocaleString('id-ID')}
                                                </span>
                                                <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-secondary'}`}>
                                                    Stock: {product.stock}
                                                </span>
                                            </div>
                                            
                                            <div className="d-flex gap-2 mt-3">
                                                <Button variant="outline-dark" size="sm" className="w-100" onClick={() => openEditModal(product)}>
                                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                                </Button>
                                                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(product._id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editingProduct?._id ? "Edit Product" : "Add New Product"}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSaveProduct}>
                    <Modal.Body>
                        <div className="row g-3">
                            {/* Nama & SKU */}
                            <div className="col-md-8">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type="text" name="name" value={editingProduct?.name || ''} onChange={handleChange} required />
                            </div>
                            <div className="col-md-4">
                                <Form.Label>SKU</Form.Label>
                                <Form.Control type="text" name="sku" value={editingProduct?.sku || ''} onChange={handleChange} required />
                            </div>

                            {/* Description */}
                            <div className="col-12">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} name="description" value={editingProduct?.description || ''} onChange={handleChange} />
                            </div>

                            {/* Harga, Stock, Discount */}
                            <div className="col-md-4">
                                <Form.Label>Price (Rp)</Form.Label>
                                <Form.Control type="number" name="price" value={editingProduct?.price || ''} onChange={handleChange} required />
                            </div>
                            <div className="col-md-4">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control type="number" name="stock" value={editingProduct?.stock || ''} onChange={handleChange} required />
                            </div>
                            <div className="col-md-4">
                                <Form.Label>Discount (%)</Form.Label>
                                <Form.Control type="number" name="discount" value={editingProduct?.discount || ''} onChange={handleChange} />
                            </div>

                            {/* Category */}
                            <div className="col-md-6">
                                <Form.Label>Category</Form.Label>
                                <Form.Select name="category" value={editingProduct?.category || 'Modular'} onChange={handleChange}>
                                    <option value="Modular">Modular</option>
                                    <option value="City">City</option>
                                    <option value="Minifigure">Minifigure</option>
                                    <option value="Star Wars">Star Wars</option>
                                    <option value="Harry Potter">Harry Potter</option>
                                    <option value="Super Heroes">Super Heroes</option>
                                    <option value="Friends">Friends</option>
                                </Form.Select>
                            </div>

                            {/* Image Upload */}
                            <div className="col-md-6">
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control type="file" accept="image/*" onChange={(e: any) => setImageFile(e.target.files[0])} />
                            </div>

                            <div className="col-12"><hr /><h6>Marketplace Links (Optional)</h6></div>
                            
                            <div className="col-md-4">
                                <Form.Control type="url" placeholder="Tokopedia Link" name="tokopediaLink" value={editingProduct?.tokopediaLink || ''} onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <Form.Control type="url" placeholder="Shopee Link" name="shopeeLink" value={editingProduct?.shopeeLink || ''} onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <Form.Control type="url" placeholder="Other Link" name="otherLink" value={editingProduct?.otherLink || ''} onChange={handleChange} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" type="submit" disabled={saving}>
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}