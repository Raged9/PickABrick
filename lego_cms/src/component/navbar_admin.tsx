import Link from "next/link";
import Image from "next/image";

export default function NavbarAdmin(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/admin/trends">
                    <Image
                        src="/images/logo.png"
                        alt="Pick A Brick"
                        width={70}
                        height={70}
                        style={{objectFit: "contain"}}
                    />
                </Link>

                {}
                <Link className="nav-link text-dark" href="/">
                    {}
                    <i className="bi bi-arrow-left fs-1"></i> 
                </Link>
                
                <div className="d-flex">
                    <Link 
                        className="btn btn-dark rounded-pill px-4 fw-semibold d-flex align-items-center" 
                        href="/"
                        title="Kembali ke Website Utama"
                    >
                        <i className="bi bi-arrow-left me-2"></i> 
                        Back to Home
                    </Link>
                </div>
            </div>
        </nav>
    )
}