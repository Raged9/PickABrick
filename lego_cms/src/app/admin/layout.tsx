import { Children } from "react";
import Trends from "./trends/page";
import NavbarAdmin from "@/component/navbar_admin";

export default function AdminLayout(){
    return(
        <div>
            <NavbarAdmin/>
            <Trends/>
        </div>
    )
}