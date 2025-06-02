import React from 'react'
import { Link } from 'react-router-dom';
import { FaRegBookmark, FaHardHat } from 'react-icons/fa'
import { FaClock, FaToolbox } from "react-icons/fa6";
import img from '../assets/img/sertifikasi.png'
import dataLoker from '../data/loker';

const ListLoker = () => {
    return (
        <div className='grid grid-cols-3 gap-2'>
            {dataLoker.map((job) => (
                <Link to={`/loker/${job.id}`} key={job.id}>
                    <div className='bg-white p-4 rounded-xl hover:shadow-lg transition-all duration-200'>
                        <div className='flex justify-between'>
                            <div className='flex space-x-3'>
                                <img src={img} className='h-12' alt='Company Logo' />
                                <div>
                                    <p className='text-sm font-semibold'>{job.company}</p>
                                    <p className='text-xs font-light'>{job.location}</p>
                                </div>
                            </div>
                            <FaRegBookmark />
                        </div>
                        <h1 className='font-semibold text-base my-4'>{job.position}</h1>
                        <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-500 mb-4 w-full">
                            <div className="flex items-center gap-2">
                                <FaClock className="text-gray-400" />
                                <span>{job.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 ml-5">
                                <FaHardHat className="text-gray-400" />
                                <span>{job.category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaToolbox className="text-gray-400" />
                                <span>{job.experience}</span>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-gray-700 mb-4">
                            {job.description}
                        </p>
                        <p className="text-sm text-gray-400 text-end">{job.time}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ListLoker
