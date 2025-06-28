import React from 'react'

const LamaranSidebar = ({ selected, onSelect }) => {
    const options = ['semua', 'dilamar', 'diterima', 'ditolak']

    return (
        <div className="w-60 bg-white rounded-xl shadow px-6 py-4 space-y-2">
            {options.map((status) => (
                <p
                    key={status}
                    onClick={() => onSelect(status)}
                    className={`capitalize py-2 px-4 rounded-lg cursor-pointer ${selected === status
                            ? 'text-[#86CEEB] font-semibold bg-blue-50'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    {status}
                </p>
            ))}
        </div>
    )
}

export default LamaranSidebar
