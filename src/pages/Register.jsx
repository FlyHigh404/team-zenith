import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash, FaGoogle, FaApple } from 'react-icons/fa'
import img from '../assets/img/register.png'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import { FaArrowLeftLong } from 'react-icons/fa6'

const Register = () => {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nama: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    lokasi: '',
    notelp: '',
    levelProfesional: '',
    keahlian: '',
    file: null,
  })

  useEffect(() => {
    const phoneRegex = /^\+?\d{10,15}$/
    let newErrors = {}

    if (formData.notelp && !phoneRegex.test(formData.notelp)) {
      newErrors.notelp = 'Phone number must be 10-15 digits and may start with +'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem('formData', JSON.stringify(formData))
    }
  }, [formData])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const onDrop = useCallback((acceptedFiles) => {
    setFormData((prev) => ({ ...prev, file: acceptedFiles[0] || null }))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*, application/pdf',
    maxSize: 5 * 1024 * 1024,
  })

  const handleNext = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error('Password tidak sama!')
      return
    }
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = new FormData()
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          data.append(key, formData[key])
        }
      })

      await axios.post('https://api.flyhigh.web.id/api/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      toast.success('Registration successful!')
      localStorage.removeItem('formData')
      navigate('/')
    } catch (error) {
      if (error.response && error.response.data.errors) {
        Object.values(error.response.data.errors).forEach((err) => {
          toast.error(err[0])
        })
      } else {
        toast.error('Registration failed!')
      }
    }
  }

  return (
    <div className="flex h-screen">
      <div className="w-[55%] flex flex-col justify-start px-20 h-screen overflow-y-auto">
        {step === 1 ? (
          <div className="py-10">
            <h2 className="text-2xl font-semibold">Get Started Now</h2>
            <p className="text-md mt-2 font-medium">Enter your Credentials to access your account</p>
            <form className="mt-3" onSubmit={handleNext}>
              <div className="mb-4">
                <label className="block text-xs font-medium mb-1">Name</label>
                <input type="text" name="nama" value={formData.nama} onChange={handleChange} placeholder="Enter your name" className="input input-bordered w-full rounded-[10px] placeholder:text-xs" required />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium mb-1">Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" className="input input-bordered w-full rounded-[10px] placeholder:text-xs" required />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium mb-1">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="input input-bordered w-full rounded-[10px] placeholder:text-xs" required />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium mb-1">Password</label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="input input-bordered w-full rounded-[10px] pr-10 placeholder:text-xs"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 cursor-pointer text-gray-500">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium mb-1">Confirmation Password</label>
                <div className="relative flex items-center">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="input input-bordered w-full rounded-[10px] pr-10 placeholder:text-xs"
                    required
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 cursor-pointer text-gray-500">
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full text-xs rounded-[10px]">
                Create Account
              </button>
            </form>
            <div className="divider my-2 font-semibold text-xs">Or</div>

            <div className="flex gap-8 justify-center">
              <button className="btn btn-outline rounded-[10px] px-10 text-xs">
                <FaGoogle size={12} className="mr-3" /> Sign in with Google
              </button>
              <button className="btn btn-outline rounded-[10px] px-10 text-xs">
                <FaApple size={16} className="mr-3" /> Sign in with Apple
              </button>
            </div>

            <p className="text-center font-semibold mt-4 text-xs">
              Have an account?{' '}
              <a href="#" className="text-blue-600 font-medium">
                Sign In
              </a>
            </p>
          </div>
        ) : (
          <div className="py-10">
            <div className="relative flex items-center">
              <button onClick={handleBack} className="absolute left-0">
                <FaArrowLeftLong size={20} className="cursor-pointer text-lg" />
              </button>
              <h2 className="text-2xl font-semibold pl-10">Complete your Profile</h2>
            </div>
            <p className="text-md mt-2 font-medium">Enter your personal details below</p>

            <form className="mt-3" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-xs font-medium mb-1">Address</label>
                <input type="text" name="lokasi" value={formData.lokasi} onChange={handleChange} className="input input-bordered w-full rounded-[10px]" required />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium mb-1">Birth Date</label>
                <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} className="input input-bordered w-full rounded-[10px]" required />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium mb-1">Telephone Number</label>
                <input
                  type="text"
                  name="notelp"
                  value={formData.notelp}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-[10px]"
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^+\d]/g, ''))}
                  placeholder="Enter a valid phone number (10-15 digits, may start with +))"
                  required
                />
                {errors.notelp && <p className="text-red-500 text-xs mt-1">{errors.notelp}</p>}
              </div>

              <div className="mb-4 relative">
                <label className="block text-xs font-medium mb-1">Class</label>
                <select name="levelProfesional" value={formData.levelProfesional} onChange={handleChange} className="select w-full">
                  <option value="">- Choose your class -</option>
                  <option value="1">1st Class</option>
                  <option value="2">2nd Class</option>
                  <option value="3">3rd Class</option>
                </select>
              </div>

              <div className="mb-4 relative">
                <label className="block text-xs font-medium mb-1">Speciality</label>
                <select name="keahlian" value={formData.keahlian} onChange={handleChange} className="select w-full">
                  <option value="">- Choose your speciality -</option>
                  <option value="plate">Plate Speciality</option>
                  <option value="pipe">Pipe Speciality</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium mb-1">Upload your Certificates</label>
                <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer">
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center">
                    <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l5-5m0 0l5 5m-5-5v12"></path>
                    </svg>
                    <p className="mt-2 text-xs text-gray-600">PDF, JPG, PNG - Max 5MB</p>
                    {formData.file ? (
                      <p className="text-xs text-green-600">{formData.file.name}</p>
                    ) : (
                      <p className="font-medium mt-1 text-xs">
                        Drag and drop your file here or <span className="text-blue-600 cursor-pointer">Browse file</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-2 flex items-center">
                <input type="checkbox" className="mr-2" name="terms" required />
                <p className="font-medium text-black dark:text-white text-xs">
                  I agree to <span className="underline">terms & policy</span>
                </p>
              </div>

              <button type="submit" className="btn btn-primary w-full text-xs rounded-[10px]">
                Sign Up
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="w-[45%] flex justify-end">
        <img src={img} className="sticky top-0 h-screen object-cover rounded-l-3xl" alt="" />
      </div>
    </div>
  )
}

export default Register
