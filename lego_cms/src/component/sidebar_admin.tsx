"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from 'react';

interface SideBarAdminProps {
    children: ReactNode;
}

export default function SideBarAdmin({ children }: SideBarAdminProps) {
    const pathname = usePathname();

    // Function simple untuk cek active
    const isActive = (path: string) => pathname === path ? "active" : "";

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                {/* Sidebar Background Color */}
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{backgroundColor: '#0F0A3C'}}>
                    <div className="d-flex flex-column px-3 pt-4 text-white min-vh-100">
                        
                        {/* Menu List */}
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 w-100" id="menu">
                            
                            <li className="nav-item w-100">
                                <Link href="/admin/trends" className={`sidebar-link ${isActive("/admin/trends")}`}>
                                    <i className="bi bi-graph-up-arrow"></i> 
                                    <span className="d-none d-sm-inline">Trends</span>
                                </Link>
                            </li>

                            <li className="nav-item w-100">
                                <Link href="/admin/emails" className={`sidebar-link ${isActive("/admin/emails")}`}>
                                    <i className="bi bi-envelope"></i> 
                                    <span className="d-none d-sm-inline">Emails</span>
                                </Link>
                            </li>

                            <li className="nav-item w-100">
                                <Link href="/admin/users" className={`sidebar-link ${isActive("/admin/users")}`}>
                                    <i className="bi bi-people"></i> 
                                    <span className="d-none d-sm-inline">Users</span>
                                </Link>
                            </li>

                            <li className="nav-item w-100">
                                <Link href="/admin/stocks" className={`sidebar-link ${isActive("/admin/stocks")}`}>
                                    <i className="bi bi-box-seam"></i> 
                                    <span className="d-none d-sm-inline">Stocks</span>
                                </Link>
                            </li>

                            <li className="nav-item w-100">
                                <Link href="/admin/article" className={`sidebar-link ${isActive("/admin/article")}`}>
                                    <i className="bi bi-file-text"></i> 
                                    <span className="d-none d-sm-inline">Article</span>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>

                {/* Content Area */}
                <div className="col py-3 bg-light">
                    {children}
                </div>
            </div>
        </div>
    )
}