import React from "react";
import { NavLink } from 'react-router-dom';
import { FaBagShopping, FaCertificate } from 'react-icons/fa6';
import badgeAdmin from "../assets/img/badgeAdmin.png";

const SidebarProfil = () => {
    return (
        <div className="flex flex-col border-gray-300 w-full border rounded-2xl bg-white p-4 gap-4 font-sans">
            <div className="flex flex-row gap-3 items-center">
                <div className="bg-blue-700 w-8 h-8 rounded-full"></div>
                <NavLink to="/profil-admin" className="flex flex-col">
                    <div className="flex flex-row gap-1 items-center">
                        <p className="font-semibold text-base">UNEDO</p>
                        <img src={badgeAdmin} alt="Badge Admin"/>
                    </div>
                    <p className="text-xs">@unedo</p>
                </NavLink>
            </div>

            <ul className="space-y-1">
                <li>
                    <NavLink to="#sertifikat" className="flex items-center p-2 rounded-lg group font-medium hover:bg-gray-100">
                        <FaCertificate className="text-xl" />
                        <span className="ml-3 text-sm">Sertifikasi</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="#pekerjaan" className="flex items-center p-2 rounded-lg group font-medium hover:bg-gray-100">
                        <FaBagShopping className="text-xl" />
                        <span className="ml-3 text-sm">Pekerjaan</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default SidebarProfil