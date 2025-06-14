import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'
import { login } from '../api/auth'
import { useAuth } from '../auth/useAuth'
import { toast } from 'react-hot-toast'
import img from '../assets/img/register.png'

const Login = () => {
  const navigate = useNavigate()
  const { loginUser } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [rememberCheck, setRememberCheck] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('rememberedUser')
    if (saved) {
      const parsed = JSON.parse(saved)
      const now = new Date().getTime()
      if (now < parsed.expiresAt) {
        return { email: parsed.email, password: parsed.password }
      } else {
        localStorage.removeItem('rememberedUser')
      }
    }
    return { email: '', password: '' }
  })

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleRegister = () => {
    navigate('/register')
  }

  const handleForgotPassword = () => {
    navigate('/forgot-password')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    try {
      const res = await login({
        email: 'nap@gmail.com',
        password: 'password123',
      })

      if (res.access_token) {
        loginUser(res.access_token)
        toast.success('Login berhasil!')
      } else {
        toast.error('Login gagal: token tidak ditemukan.')
      }
    } catch (error) {
      console.error('[Login Error]', error)

      if (error.response?.status === 401) {
        toast.error('Email atau password salah.')
      } else if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach((err) => toast.error(err[0]))
      } else {
        toast.error('Terjadi kesalahan saat login.')
      }
    }
    setLoading(false)
  }

  return (
    <div className="flex md:flex-col lg:flex-row h-screen">
      <div className="flex-grow w-full lg:w-[55%] flex flex-col justify-center px-6 md:px-20 overflow-y-auto font-sans">
        <h2 className="text-3xl font-semibold">Selamat Datang</h2>
        <p className="dark:text-slate-300 text-sm md:text-base mt-1 font-medium">Masuk ke akunmu dan jelajahi peluang tanpa batas!</p>

        <form className="mt-5 md:mt-10 lg:mt-5" onSubmit={handleSubmit}>
          <div className="mb-4 md:mb-7 lg:mb-4">
            <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              // value={formData.email}
              value="nap@gmail.com"
              onChange={handleChange}
              placeholder="Masukkan alamat email Anda"
              className="bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 dark:text-slate-300 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Kata Sandi</label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                // value={formData.password}
                value="password123"
                onChange={handleChange}
                placeholder="Buat kata sandi Anda"
                className="bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 dark:text-slate-300 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 cursor-pointer text-gray-500 dark:text-slate-300">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex justify-between mb-7">
            <div className="flex items-center">
              <button type="button" onClick={() => setRememberCheck(!rememberCheck)} className="text-lg">
                {rememberCheck ? <MdCheckBox className="text-[#0284C7]" /> : <MdCheckBoxOutlineBlank />}
              </button>
              <p className="text-sm ml-1.5">Ingat untuk 14 hari</p>
            </div>
            <span onClick={handleForgotPassword} className="text-sm font-medium text-[#0284C7] dark:text-sky-500 hover:underline text-right cursor-pointer">
              Lupa kata sandi?
            </span>
          </div>

          {loading ? (
            <button className="btn btn-primary border border-[#86CEEB] bg-[#659BB0] dark:bg-[#2F4852] w-full text-sm md:text-base lg:text-sm rounded-[10px] disabled">
              <svg aria-hidden="true" className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              Menunggu
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-[#659BB0] text-white bg-[#86CEEB] dark:bg-[#659BB0] border border-[#86CEEB] hover:bg-[#659BB0] dark:hover:bg-[#2F4852] hover:border-[#659BB0] w-full text-sm md:text-base lg:text-sm rounded-[10px]"
            >
              Masuk sekarang
            </button>
          )}
        </form>

        <div className="divider my-4 font-semibold text-xs text-gray-400">atau</div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center">
          <button className="btn btn-outline rounded-[10px] px-8 text-xs">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
              </g>
            </svg>{' '}
            Masuk dengan Google
          </button>
          <button className="btn btn-outline rounded-[10px] px-8 text-xs">
            <svg aria-label="Apple logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1195 1195">
              <path
                fill="#000"
                d="M1006.933 812.8c-32 153.6-115.2 211.2-147.2 249.6-32 25.6-121.6 25.6-153.6 6.4-38.4-25.6-134.4-25.6-166.4 0-44.8 32-115.2 19.2-128 12.8-256-179.2-352-716.8 12.8-774.4 64-12.8 134.4 32 134.4 32 51.2 25.6 70.4 12.8 115.2-6.4 96-44.8 243.2-44.8 313.6 76.8-147.2 96-153.6 294.4 19.2 403.2zM802.133 64c12.8 70.4-64 224-204.8 230.4-12.8-38.4 32-217.6 204.8-230.4z"
              ></path>
            </svg>{' '}
            Masuk dengan Apple
          </button>
        </div>
        <p className="text-center font-normal mt-4 text-sm">
          Tidak punya akun?{' '}
          <span onClick={handleRegister} className="text-[#0284C7] dark:text-sky-500 font-medium hover:underline cursor-pointer text-sm">
            Daftar
          </span>
        </p>
      </div>

      <div className="hidden lg:flex w-[45%] justify-end">
        <img src={img} className="sticky top-0 h-screen object-cover rounded-l-3xl" alt="" />
      </div>
    </div>
  )
}

export default Login
