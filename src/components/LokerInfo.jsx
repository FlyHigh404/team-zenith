import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaStar, FaUsers, FaClock, FaLocationDot, FaToolbox, FaSackDollar } from "react-icons/fa6";
import dataLoker from "../data/loker";
import img from '../assets/img/sertifikasi.png'

const LokerInfo = () => {
    const { id } = useParams();
    const job = dataLoker.find((item) => item.id === parseInt(id));
    const navigate = useNavigate();

    if (!job) return <p>Loker tidak ditemukan.</p>;
    return (
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
                    <p className="font-semibold">{job.position}</p>
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
                <div className="flex gap-4 text-[#424242]">
                    <FaSackDollar className="mt-1" />
                    <div>
                        <p className="text-sky-400 font-semibold">Gaji</p>
                        <p>{job.gaji}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LokerInfo
