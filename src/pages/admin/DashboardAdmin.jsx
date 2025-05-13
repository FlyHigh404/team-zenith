import React from 'react'
import Data from '../../components/Data'
import LineChart from '../../components/LineChart'
import BarChart from '../../components/BarChart'

const DashboardAdmin = () => {
    return (
        <div className='bg-[#F5F5F5]'>
            <div className='p-4 sm:ml-64 '>
                <Data />
                <LineChart />
                <BarChart />
            </div>
        </div>
    )
}

export default DashboardAdmin
