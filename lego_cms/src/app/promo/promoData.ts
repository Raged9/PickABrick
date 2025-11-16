// src/app/promo/promoData.ts

// Definisikan struktur data untuk setiap promo
export interface PromoArticle {
  slug: string; // ID unik untuk URL (misal: "year-end-sale")
  title: string;
  image: string; // Path ke gambar header artikel
  description: string;
  content: string; // Isi artikel
}

// Database "dummy" dalam bahasa Inggris
export const promoData: PromoArticle[] = [
  {
    slug: 'year-end-sale',
    title: 'Big Year-End Sale!',
    image: '/images/promo-banner-1.jpg', // Ganti dengan path gambar Anda
    description: 'Get up to 50% off all LEGO City and Friends!',
    content: `
      <p>This is the first paragraph of the Year-End Sale article. Get up to 50% off on all LEGO City and Friends series products!</p>
      <p>Terms and conditions:</p>
      <ul>
        <li>Promo valid from December 1st - 31st.</li>
        <li>Valid for online purchases only.</li>
        <li>Cannot be combined with other promotions.</li>
      </ul>
    `,
  },
  {
    slug: 'free-keychain',
    title: 'Free Exclusive LEGO Keychain',
    image: '/images/promo-banner-2.jpg', // Ganti dengan path gambar Anda
    description: 'Free exclusive keychain with minimum purchase.',
    content: `
      <p>Get a free exclusive LEGO keychain for every purchase over IDR 500,000 in a single transaction.</p>
      <p>Stock is limited, so hurry!</p>
    `,
  },
  {
    slug: 'special-cashback',
    title: 'Special 10% Cashback',
    image: '/images/promo-banner-3.jpg', // Ganti dengan path gambar Anda
    description: 'Enjoy 10% cashback using partner e-wallets.',
    content: `
      <p>Enjoy 10% cashback for all payments using our partner digital wallets. Maximum cashback is IDR 50,000.</p>
    `,
  },
];

// Fungsi helper untuk mendapatkan artikel berdasarkan slug-nya
export const getPromoBySlug = (slug: string) => {
  return promoData.find((promo) => promo.slug === slug);
};