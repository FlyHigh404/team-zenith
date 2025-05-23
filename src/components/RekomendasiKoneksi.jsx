import React, { useState } from "react";
import { FaRegSquarePlus, FaRegSquareCheck  } from "react-icons/fa6";

const RekomendasiKoneksi = () => {
    const [isConnect, setIsConnect] = useState(false)

    return (
        <div className="flex flex-col gap-0 mt-4 font-sans">
            <div className="flex flex-col border-gray-300 border rounded-t-xl bg-white px-4 py-3 gap-4">
                <h2 className="font-semibold text-base">Orang yang Mungkin Anda Kenal</h2>
            </div>
            
            <div className="flex flex-col border-gray-300 border border-t-0 rounded-b-xl bg-white px-4 py-3 gap-3">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row gap-3 items-center">
                        <div className="bg-gray-700 w-8 h-8 rounded-full"></div>
                        <div>
                            <p className="font-semibold text-sm">Andi Prasetyo</p>
                            <p className="text-xs">Welder - Plate | 3G GMAW & GTAW</p>
                        </div>
                    </div>
                    <button 
                        type="button"
                        onClick={() => setIsConnect(!isConnect)}
                        className="text-lg"
                    >
                        {isConnect ? <FaRegSquareCheck className="text-blue-600" /> : <FaRegSquarePlus/>}
                    </button>
                </div>

                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-row gap-3 items-center">
                        <div className="bg-gray-700 w-8 h-8 rounded-full"></div>
                        <div>
                            <p className="font-semibold text-sm">Rizky Maulana</p>
                            <p className="text-xs">Welder - Pipe/Structure | 6G SMAW</p>
                        </div>
                    </div>
                    <button 
                        type="button"
                        onClick={() => setIsConnect(!isConnect)}
                        className="text-lg"
                    >
                        {isConnect ? <FaRegSquareCheck className="text-blue-600" /> : <FaRegSquarePlus/>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RekomendasiKoneksi