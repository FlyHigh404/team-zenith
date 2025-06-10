import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

const LokerAktif = () => {
    const [lokerData, setLokerData] = useState([
        {
            id: 1,
            name: "Welder",
            company: "PT. Nusa Sejahtera",
            location: "Jakarta Pusat"
        },
        {
            id: 2,
            name: "Welder Inspector",
            company: "PT. Baja Karya Man",
            location: "Surabaya"
        }
    ])

    return (
        <div className="flex flex-col gap-0 font-sans">
            <div className="flex flex-col border-gray-300 border rounded-t-xl bg-white px-4 py-3">
                <h2 className="font-semibold text-base">Lowongan Pekerjaan Aktif</h2>
            </div>
            

            <div className="flex flex-col border-gray-300 border border-t-0 rounded-b-xl bg-white px-4 py-3 gap-4">
                {lokerData.slice(0, 10).map((loker) => (
                    <NavLink to="#detail-pekerjaan" className="flex flex-row items-center justify-between">
                        <div key={loker.id} className="flex flex-row gap-2 items-center">
                            <div className="bg-blue-700 w-7 h-7"></div>
                            <div className="flex flex-col">
                                <p className="font-semibold text-sm">{loker.name}</p>
                                <p className="text-xs text-gray-500 line-clamp-2">{loker.company} | {loker.location}</p>
                            </div>
                        </div>
                        
                        <div className=" text-gray-400 text-sm">
                            <a href="#detail-pekerjaan">
                                <button className="cursor-pointer">
                                    <FaAngleRight />
                                </button>
                            </a>
                        </div>
                    </NavLink>
                ))}
            </div>
            
        
           
        </div>
    )
}

export default LokerAktif