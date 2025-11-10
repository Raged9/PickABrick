// 1. Definisikan Tipe Data (Interface) Produk
// Kita ekspor ini agar bisa dipakai di file lain (seperti Context)
export interface Product {
  id: number;
  sku: string;
  name: string;
  price: string;
  pieces: string;
  image: string;
  category: string;
  description?: string; // Deskripsi opsional
}

// 2. Definisikan "Database" Produk
// Kita ekspor ini agar bisa di-import oleh semua halaman
export const allProducts: Product[] = [
  {
    id: 1,
    sku: 'LEGO - 75432',
    name: 'Classic Town Hall',
    price: 'Rp 1.299.000,00',
    pieces: '25 pcs',
    image: '/images/products/product1.jpg',
    category: 'Modular',
    description: 'Body text for describing what this product is and why this product is simply a must-buy.'
  },
  {
    id: 2,
    sku: 'LEGO - 75432',
    name: 'Minifigure Set Series 1',
    price: 'Rp 1.599.000,00',
    pieces: '12 pcs',
    image: '/images/products/product2.jpg',
    category: 'Minifigure',
    description: 'A wonderful series of minifigures to collect.'
  },
  {
    id: 3,
    sku: 'LEGO - 75432',
    name: 'Lego Pet Shop',
    price: 'Rp 2.399.000,00',
    pieces: '8 pcs',
    image: '/images/products/product3.jpg',
    category: 'City',
    description: 'Build your own adorable pet shop, complete with animals.'
  },
  {
    id: 4,
    sku: 'LEGO - 75432',
    name: 'Lego Palace Cinema',
    price: 'Rp 1.299.000,00',
    pieces: '23 pcs',
    image: '/images/products/product4.jpg',
    category: 'Modular',
    description: 'Recreate the magic of the movies with this classic cinema.'
  },
  {
    id: 5,
    sku: 'LEGO - 75432',
    name: 'Lego Pet Shop',
    price: 'Rp 2.399.000,00',
    pieces: '8 pcs',
    image: '/images/products/product3.jpg',
    category: 'City',
    description: 'Another variant of the lovely pet shop.'
  },
  {
    id: 6,
    sku: 'LEGO - 75432',
    name: 'Minifigure Set Series 1',
    price: 'Rp 1.599.000,00',
    pieces: '12 pcs',
    image: '/images/products/product2.jpg',
    category: 'Minifigure',
    description: 'Continue your collection with Series 1.'
  },
  {
    id: 7,
    sku: 'LEGO - 75432',
    name: 'Classic Town Hall',
    price: 'Rp 1.299.000,00',
    pieces: '25 pcs',
    image: '/images/products/product1.jpg',
    category: 'Modular',
    description: 'Body text for describing what this product is and why this product is simply a must-buy.'
  },
  {
    id: 8,
    sku: 'LEGO - 75432',
    name: 'Minifigure Set Series 1',
    price: 'Rp 1.599.000,00',
    pieces: '12 pcs',
    image: '/images/products/product2.jpg',
    category: 'Minifigure',
    description: 'A wonderful series of minifigures to collect.'
  },
  {
    id: 9,
    sku: 'LEGO - 75432',
    name: 'Lego Pet Shop',
    price: 'Rp 2.399.000,00',
    pieces: '8 pcs',
    image: '/images/products/product3.jpg',
    category: 'City',
    description: 'Build your own adorable pet shop, complete with animals.'
  },
];