import React from 'react'
import { Link, useLocation } from "react-router-dom";

const Tersimpan = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const links = [
        { path: "/simpan/postingan", label: "Postingan" },
        { path: "/simpan/pekerjaan", label: "Pekerjaan" },
        { path: "/simpan/sertifikasi", label: "Sertifikasi" },
    ];

    return (
        <div className="w-72 bg-white rounded-xl shadow px-6 py-4 space-y-3 ml-10">
            {links.map((link) => (
                <Link key={link.path} to={link.path}>
                    <p
                        className={`py-2 px-4 rounded-lg cursor-pointer ${currentPath === link.path
                            ? "text-blue-700 font-semibold bg-blue-50"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        {link.label}
                    </p>
                </Link>
            ))}
        </div>
    );
};

export default Tersimpan
