import React from "react";

const PekerjaanTerbaru = () => {
    return (
        <div className="flex flex-col gap-0  mt-4 font-sans">
            <div className="flex flex-col border-gray-300 border rounded-t-xl bg-white px-4 py-3">
                <h2 className="font-semibold text-base">Pekerjaan Terbaru</h2>
            </div>
            

            <div className="flex flex-col border-gray-300 border border-t-0 rounded-b-xl bg-white px-4 py-3 gap-4">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                        <p className="font-semibold text-sm">Welder Inspector</p>
                        <p className="text-sm text-gray-500"> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className=" text-gray-400 hover:text-gray-700 text-xs">
                        <a href="#detail-pekerjaan">
                            <button className="cursor-pointer">Selengkapnya</button>
                        </a>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                        <p className="font-semibold text-sm">Welder Inspector</p>
                        <p className="text-sm text-gray-500"> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className=" text-gray-400 hover:text-gray-700 text-xs">
                        <a href="#detail-pekerjaan">
                            <button className="cursor-pointer">Selengkapnya</button>
                        </a>
                    </div>
                </div>
            </div>
            
        
           
        </div>
    )
}

export default PekerjaanTerbaru