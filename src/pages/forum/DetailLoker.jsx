import React from "react";
import { useParams } from "react-router-dom";
import dataLoker from "../../data/loker";
import LokerInfo from "../../components/LokerInfo";
import { Link } from "react-router-dom";

const DetailLoker = () => {
    const { id } = useParams();
    const job = dataLoker.find((item) => item.id === parseInt(id));
    //const navigate = useNavigate();
    const user = { role: "admin" }; // ganti "user"
    const isAdmin = user.role === "admin";

    return (
        <div className="flex gap-10 px-10 py-8 bg-[#F5F5F5] min-h-screen">
            {/* KIRI – Sidebar */}
            <LokerInfo />

            {/* KANAN – Konten Utama */}
            <div className="w-2/3 bg-white p-4 rounded-lg mt-10">
                <h1 className="text-2xl font-bold mb-10">{job.position}</h1>
                <h2 className="text-lg font-semibold mb-1">Deskripsi Pekerjaan</h2>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed text-justify">
                    Sebagai {job.position}, Anda akan bertugas melakukan inspeksi sambungan las pada proyek
                    migas darat dan laut, memastikan hasil pengelasan memenuhi standar kualitas dan keselamatan
                    berdasarkan ketentuan AWS dan ASME. Anda juga akan bertanggung jawab dalam mendokumentasikan
                    temuan inspeksi untuk keperluan laporan teknis serta memberikan rekomendasi perbaikan jika
                    ditemukan ketidaksesuaian, guna menjamin integritas struktural dan keselamatan proyek.
                </p>

                <h2 className="text-lg font-semibold mb-1">Detail</h2>
                <div className="flex flex-wrap gap-3 text-sm mb-4">
                    {["Baca Gambar Teknik", "SMAW / GMAW", "Material Logam", "Standar Keselamatan", "Kertifikasi"].map((item, index) => (
                        <span key={index} className="bg-gray-200 px-3 py-1 rounded-full">{item}</span>
                    ))}
                </div>

                <h2 className="text-lg font-semibold mb-1">Kualifikasi</h2>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-6">
                    <li>Minimal lulusan SMK Teknik Mesin / Pengelasan</li>
                    <li>Memiliki sertifikasi Welding Inspector (BNSP / LSP–LMI)</li>
                    <li>Pengalaman minimal 2 tahun di industri manufaktur / konstruksi</li>
                    <li>Memahami standar NDT (Non-Destructive Test) dasar</li>
                    <li>Mampu membaca dan memahami WPS / PQR</li>
                </ul>

                <Link to={`/loker/apply/${job.id}`}>
                    <button
                        className={`px-6 py-2 rounded-xl text-sm text-white ${isAdmin ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                        disabled={isAdmin}
                    >
                        Lamar Pekerjaan
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default DetailLoker;
