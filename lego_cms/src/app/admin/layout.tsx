import NavbarAdmin from "@/component/navbar_admin";
import SideBarAdmin from "@/component/sidebar_admin";
import { ReactNode } from "react";


export default function AdminLayout({children,}: {children: ReactNode;}){
    return(
        <>
            <NavbarAdmin/>
            <SideBarAdmin>
                {children}
            </SideBarAdmin>   
        </> 
    )
}