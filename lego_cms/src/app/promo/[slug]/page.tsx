// src/app/promo/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { getPromoBySlug } from '../promoData'; // Impor data kita
import styles from './PromoArticle.module.css'; // Kita akan buat file CSS ini

export default function PromoArticlePage({ params }: { params: { slug: string } }) {
  // 1. Dapatkan slug dari URL (misal: "diskon-akhir-tahun")
  const slug = params.slug;

  // 2. Cari data artikel berdasarkan slug tersebut
  const article = getPromoBySlug(slug);

  // 3. Jika artikel tidak ditemukan, tampilkan halaman 404
  if (!article) {
    notFound();
  }

  // 4. Jika ditemukan, tampilkan halaman artikel
  return (
    <Container className={`${styles.articleContainer} my-5`}>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          {/* Judul Artikel */}
          <h1 className="mb-3">{article.title}</h1>
          
          {/* Gambar Header Artikel */}
          <Image src={article.image} alt={article.title} fluid className="mb-4 rounded" />
          
          {/* Konten Artikel */}
          <div 
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />
          {/* Catatan: dangerouslySetInnerHTML digunakan di sini karena
            data dummy kita berisi tag HTML (<p>, <ul>). 
            Jika konten Anda adalah teks murni, cukup gunakan:
            <div className={styles.articleContent}>{article.content}</div>
          */}

        </Col>
      </Row>
    </Container>
  );
}