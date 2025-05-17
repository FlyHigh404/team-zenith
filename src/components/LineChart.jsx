import React from 'react'
import logo from '../assets/img/logo.png'

const Chart = () => {
    return (
        <div className='mt-5 mx-5 flex gap-4'>
            <div className='w-[70%] bg-white p-5 rounded-xl '>
                <p className='font-semibold'>Total Pekerjaan</p>
            </div>
            <div className='w-[30%] bg-white p-5 rounded-xl '>
                <p className='font-semibold mb-3'>Riwayat Aktivitas</p>
                <ol className='relative border-s border-gray-200 dark:border-gray-700 mx-2'>
                    <li className='mb-3 ms-6'>
                        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <img src={logo} alt="" />
                        </span>
                        <div>
                            <h1>Changed the style.</h1>
                            <time className='mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0'>just now</time>
                        </div>
                    </li>
                    <li className='mb-3 ms-6'>
                        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <img src={logo} alt="" />
                        </span>
                        <div>
                            <h1>Released a new version.</h1>
                            <time className='mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0'>just now</time>
                        </div>
                    </li>
                </ol>


            </div>
        </div>
    )
}

export default Chart
