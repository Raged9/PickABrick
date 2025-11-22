import Link from "next/link";
import Image from "next/image";

export default function NavbarAdmin(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
            <div className="container-fluid">
                {}
                <Link className="navbar-brand" href="/admin/trends">
                    <Image
                        src="/image/logo.png"
                        alt="Pick A Brick"
                        width={70}
                        height={70}
                    />
                </Link>

                {}
                <Link className="nav-link text-dark" href="/">
                    {}
                    <i className="bi bi-arrow-left fs-1"></i> 
                </Link>
            </div>
        </nav>
    )
}