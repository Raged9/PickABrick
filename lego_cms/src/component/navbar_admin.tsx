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

                <div className="d-flex">
                    <Link className="btn btn-dark btn-sm fw-bold px-4 d-flex align-items-center justify-content-center" href="/">
                        Back
                    </Link>
                </div>
            </div>
        </nav>
    )
}