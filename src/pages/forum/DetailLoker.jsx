import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaStar, FaUsers, FaClock, FaLocationDot, FaToolbox } from "react-icons/fa6";
import dataLoker from "../../data/loker";
import { Link } from "react-router-dom";
import img from '../../assets/img/sertifikasi.png'

const DetailLoker = () => {
    const { id } = useParams();
    const job = dataLoker.find((item) => item.id === parseInt(id));
    const navigate = useNavigate();
    const user = { role: "admin" };
    const isAdmin = user.role === "admin";



    if (!job) return <p>Loker tidak ditemukan.</p>;

    return (
        <div className="flex gap-10 px-10 py-8 bg-[#F5F5F5] min-h-screen">
            {/* KIRI – Sidebar */}
            <div className="w-80">
                <button
                    onClick={() => navigate(-1)}
                    className="text-black text-base font-medium flex items-center mb-4"
                >
                    <FaArrowLeft className="mr-2" /> Detail pekerjaan
                </button>
                <div className="bg-white rounded-xl shadow-md">
                    <div className="bg-[#86CEEB]  py-4 px-6 rounded-lg mb-4">
                        <div className="flex gap-3">
                            <img src={img} className="w-12 " />
                            <div className="text-white">
                                <h2 className="font-bold">{job.company}</h2>
                                <p className="text-sm">{job.location}</p>
                            </div>
                        </div>
                        <div className="flex justify-between my-3">
                            <button className="btn btn-white px-auto w-33 rounded-full text-blue-600">
                                Ikuti
                            </button>
                            <button className="btn btn-outline-white bg-transparent px-auto w-33 rounded-full text-white">
                                Kirim Email
                            </button>
                        </div>
                    </div>
                    <div className="mb-4 py-2 px-6 text-base text-gray-700 space-y-3">
                        <div className="flex gap-2">
                            <FaStar /> <p>4.0 . 24 ulasan</p>
                        </div>
                        <div className="flex gap-2">
                            <FaUsers /> <p>100 - 150 Pegawai</p>
                        </div>
                        <hr className="border-0.3 text-[#D2D2D2]" />
                        <p className="text-justify pb-6">
                            {job.company} adalah perusahaan nasional yang bergerak di bidang jasa pengelasan,
                            inspeksi teknis, dan konstruksi untuk sektor minyak & gas.
                        </p>
                    </div>
                </div>
                <div className="mt-4 text-base space-y-3 text-gray-700 bg-white py-4 px-6 rounded-xl shadow-md">
                    <div>
                        <p className="font-semibold">Welding Inspector</p>
                    </div>
                    <hr className="border-0.3 text-[#D2D2D2]" />
                    <div className="flex gap-4 text-[#424242]">
                        <FaClock className="mt-1" />
                        <div>
                            <p className="text-sky-400 font-semibold">Durasi</p>
                            <p>{job.duration}</p>
                        </div>
                    </div>
                    <div className="flex gap-4 text-[#424242]">
                        <FaLocationDot className="mt-1" />
                        <div>
                            <p className="text-sky-400 font-semibold">Lokasi</p>
                            <p>{job.location}</p>
                        </div>
                    </div>
                    <div className="flex gap-4 text-[#424242]">
                        <FaToolbox className="mt-1" />
                        <div>
                            <p className="text-sky-400 font-semibold">Pengalaman</p>
                            <p>{job.experience}</p>
                        </div>
                    </div>
                </div>
            </div>

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

                <button
                    className={`px-6 py-2 rounded-xl text-sm text-white ${isAdmin ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    disabled={isAdmin}
                >
                    Lamar Pekerjaan
                </button>

            </div>
        </div>
    );
};

export default DetailLoker;
