import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
import { Link } from "react-router-dom";
import img from '../assets/img/register.png'
import { FaArrowLeftLong } from "react-icons/fa6";
// import { FaGoogle } from 'react-icons/fa6';
// import { FaApple } from 'react-icons/fa6'

const Next = () => {
    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*, application/pdf, application/vnd.ms-powerpoint',
        maxSize: 5 * 1024 * 1024, // 5MB
    });

    return (
        <div className="flex h-screen relative">
            <Link to="/register">
                <FaArrowLeftLong size={20} className="absolute top-4 left-8 cursor-pointer text-lg" />
            </Link>
            <div className='w-[55%] flex flex-col justify-center px-20 my-auto'>
                <h2 className='text-md font-semibold'>Complete your Profile</h2>
                <p className='text-xs mt-2 font-medium'>Enter your personal details below</p>
                <form className='mt-3'>
                    <div className='mb-4'>
                        <label className='block text-xs font-medium mb-1'>Address</label>
                        <input type='text' placeholder='Enter your address' className='input input-bordered w-full rounded-[10px] placeholder:text-xs' />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-xs font-medium mb-1'>Birth Date</label>
                        <input
                            type='date'
                            placeholder='dd/mm/yyyy'
                            className='input input-bordered w-full rounded-[10px] pr-10 placeholder:text-xs'
                        />
                    </div>

                    <div className='mb-4 relative'>
                        <label className='block text-xs font-medium mb-1'>Class</label>
                        <select defaultValue='Pick a color' className='select w-full'>
                            <option>- Choose your class -</option>
                            <option>1st Class</option>
                            <option>2nd Class</option>
                            <option>3rd Class</option>
                        </select>
                    </div>

                    <div className='mb-4 relative'>
                        <label className='block text-xs font-medium mb-1'>Speciality</label>
                        <select defaultValue='Pick a color' className='select w-full'>
                            <option>- Choose your speciality -</option>
                            <option>Plate Speciality</option>
                            <option>Pipe Speciality</option>
                        </select>
                    </div>

                    <div className='mb-4'>
                        <label className='block text-xs font-medium mb-1'>Upload your Certificates</label>
                        <div {...getRootProps()} className='border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer'>
                            <input {...getInputProps()} />
                            <div className='flex flex-col items-center'>
                                <svg className='w-10 h-3 text-gray-500' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M7 16l5-5m0 0l5 5m-5-5v12'></path>
                                </svg>
                                <p className='mt-2 text-xs text-gray-600'>PDF, PPT, JPG, PNG - Max 5MB</p>
                                <p className='font-medium mt-1 text-xs'>
                                    Drag and drop your file here or <span className='text-blue-600 cursor-pointer'>Browse file</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='mb-2'>
                        <label className='fieldset-label'>
                            <input type='checkbox' className='checkbox' />
                            <p className='font-medium text-black text-xs'>I agree to <span className='underline'>terms & policy</span></p>
                        </label>
                    </div>

                    <button className='btn btn-primary w-full text-xs rounded-[10px]'>Create Account</button>
                </form>
                {/* <div className='divider my-4 font-semibold text-xs'>Or</div>

                <div className='flex gap-8 justify-center'>
                    <button className='btn btn-outline rounded-[10px] px-10 text-xs'><FaGoogle size={16} /> Sign in with Google</button>
                    <button className='btn btn-outline rounded-[10px] px-10 text-xs'><FaApple size={24} /> Sign in with Apple</button>
                </div>

                <p className='text-center font-semibold mt-4 text-xs'>
                    Have an account? <a href='#' className='text-blue-600 font-medium'>Sign In</a>
                </p> */}
            </div>
            <div className='w-[45%] flex justify-end'>
                <img src={img} className='relative rounded-l-3xl' alt='' />
            </div>
        </div>
    )
}

export default Next
