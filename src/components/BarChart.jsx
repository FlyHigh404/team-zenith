import React from 'react'

const BarChart = () => {
    return (
        <div className='mt-5 grid grid-cols-2 mx-5 gap-4'>
            <div className=' bg-white p-5 rounded-xl'>
                <p className='font-semibold'>Total Pengguna</p>
            </div>
            <div className=' bg-white p-5 rounded-xl'>
                <p className='font-semibold'>Mitra Unedo</p>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nama</th>
                                <th>Pekerjaan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>01</th>
                                <td>PT. Jaya Abadi</td>
                                <td>100</td>
                            </tr>
                            <tr>
                                <th>02</th>
                                <td>PT. Petro Weldindo</td>
                                <td>75</td>
                            </tr>
                            <tr>
                                <th>03</th>
                                <td>PT. Karya Baja</td>
                                <td>63</td>
                            </tr>
                            <tr>
                                <th>04</th>
                                <td>PT. Energi Maritim</td>
                                <td>34</td>
                            </tr>
                            <tr>
                                <th>05</th>
                                <td>PT. Surya Teknik</td>
                                <td>12</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BarChart
