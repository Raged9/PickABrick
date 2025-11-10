'use client'; // Kita gunakan 'use client' untuk interaktivitas seperti link aktif

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AdminLayout.module.css';

// Anda bisa mengganti ini dengan komponen Icon asli jika ada
const SearchIcon = () => <span>🔍</span>;
const HeartIcon = () => <span>❤️</span>;
const CartIcon = () => <span>🛒</span>;
const FacebookIcon = () => <span>F</span>;
const LinkedInIcon = () => <span>L</span>;
const YouTubeIcon = () => <span>Y</span>;
const InstagramIcon = () => <span>I</span>;
const ImagePlaceholderIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#999"
    strokeWidth="2"
  >
    <path d="M10 10 H 90 V 90 H 10 Z" />
    <path d="M20 70 L 45 45 L 60 60 L 80 40" />
    <circle cx="75" cy="25" r="5" />
  </svg>
);
// Ekspor icon ini agar bisa dipakai di halaman input
export { ImagePlaceholderIcon };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    return pathname === path ? `${styles.sidebarLink} ${styles.active}` : styles.sidebarLink;
  };

  return (
    <div className={styles.adminPage}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>PICKABRICK</div>
        <nav className={styles.nav}>
          <Link href="/products">PRODUCTS</Link>
          <Link href="/discover">DISCOVER</Link>
          <Link href="/category">CATEGORY</Link>
        </nav>
        <div className={styles.headerRight}>
          <div className={styles.searchBar}>
            <SearchIcon />
            <input type="text" placeholder="Search..." />
          </div>
          <HeartIcon />
          <CartIcon />
        </div>
      </header>

      <div className={styles.container}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSearch}>
            <input type="text" placeholder="Input" />
          </div>
          <nav>
            <Link href="/admin/dashboard" className={getLinkClass('/admin/dashboard')}>
              Trends & Sales
            </Link>
            <Link href="/admin/input-product" className={getLinkClass('/admin/input-product')}>
              Input Items
            </Link>
            <Link href="/admin/input-discount" className={getLinkClass('/admin/input-discount')}>
              Input Discount
            </Link>
            <Link href="/admin/articles" className={getLinkClass('/admin/articles')}>
              Add Article
            </Link>
            {/* Tambahkan link 'Delete Items' dan 'Edit' jika perlu */}
            {/* <Link href="/admin/delete-items" className={getLinkClass('/admin/delete-items')}>
              Delete Items
            </Link>
            <Link href="/admin/edit" className={getLinkClass('/admin/edit')}>
              Edit
            </Link> */}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>{children}</main>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.aboutUs}>
            <h3>About Us</h3>
            <p>Your trusted source for Lego masterpieces.</p>
          </div>
          <div className={styles.footerLinks}>
            <h3>Topic</h3>
            <Link href="#">Page</Link>
            <Link href="#">Page</Link>
            <Link href="#">Page</Link>
          </div>
          <div className={styles.footerLinks}>
            <h3>Topic</h3>
            <Link href="#">Page</Link>
            <Link href="#">Page</Link>
            <Link href="#">Page</Link>
          </div>
          <div className={styles.footerLinks}>
            <h3>Topic</h3>
            <Link href="#">Page</Link>
            <Link href="#">Page</Link>
            <Link href="#">Page</Link>
            <div className={styles.socialIcons}>
              <FacebookIcon />
              <LinkedInIcon />
              <YouTubeIcon />
              <InstagramIcon />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}