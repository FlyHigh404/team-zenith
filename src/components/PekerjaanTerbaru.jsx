import React, { useState } from "react";

const PekerjaanTerbaru = () => {
    const [lokerData, setLokerData] = useState([
        {
            id: 1,
            name: "Welder",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            id: 2,
            name: "Welder Inspector",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        }
    ])

    return (
        <div className="flex flex-col gap-0 font-sans">
            <div className="flex flex-col border-gray-300 border rounded-t-xl bg-white px-4 py-3">
                <h2 className="font-semibold text-base">Pekerjaan Terbaru</h2>
            </div>
            

            <div className="flex flex-col border-gray-300 border border-t-0 rounded-b-xl bg-white px-4 py-3 gap-4">
                {lokerData.slice(0, 10).map((loker) => (
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <p className="font-semibold text-sm">{loker.name}</p>
                            <p className="text-sm text-gray-500 line-clamp-2">{loker.desc}</p>
                        </div>
                        <div className=" text-gray-400 hover:text-gray-700 text-xs">
                            <a href="#detail-pekerjaan">
                                <button className="cursor-pointer">Selengkapnya</button>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PekerjaanTerbaru