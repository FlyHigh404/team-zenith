import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa'
import FilterLoker from './FilterLoker'
import ListLoker from './ListLoker'


const Loker = () => {
    const [selected, setSelected] = useState('Terbaru');
    const [open, setOpen] = useState(false);

    const options = ['Terbaru', 'Terpopuler'];

    return (
        <div className='lg:mx-14 lg:px-6 py-5 md:mx-14 mx-5'>
            <div className='flex justify-between relative'>
                <h1 className='text-2xl font-medium'>Lowongan yang di rekomendasikan</h1>

                <div className="relative">
                    <button
                        className="btn btn-outline bg-transparent px-6 py-2 rounded-full text-black flex items-center gap-2"
                        onClick={() => setOpen(!open)}
                    >
                        {selected} <FaAngleDown />
                    </button>

                    {open && (
                        <div className="absolute left-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-10">
                            {options.map((option) => (
                                <div
                                    key={option}
                                    onClick={() => {
                                        setSelected(option);
                                        setOpen(false);
                                    }}
                                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${selected === option ? 'font-semibold text-blue-600' : ''
                                        }`}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className='flex my-5 '>
                <div className='w-[27%]'><FilterLoker /></div>
                <div className='w-[73%]'><ListLoker /></div>
            </div>
        </div>
    )
}

export default Loker
