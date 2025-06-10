import { useState, useEffect, useCallback } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { toast } from 'react-hot-toast'
import { register } from '../api/auth'

const RegisterFormStep2 = ({ formData, setFormData, setStep, navigate }) => {
  const [errors, setErrors] = useState({})
  const handleChange = useCallback(
    (e) => {
      const { name, type, value, options } = e.target

      const finalValue =
        type === 'select-multiple'
          ? Array.from(options)
              .filter((opt) => opt.selected)
              .map((opt) => opt.value)
          : value

      setFormData((prev) => ({
        ...prev,
        [name]: finalValue,
      }))

      if (name === 'notelp') {
        const phoneRegex = /^\+?\d{10,15}$/
        const cleanValue = finalValue.replace(/[^+\d]/g, '')
        setErrors((prev) => ({
          ...prev,
          notelp: phoneRegex.test(cleanValue) ? '' : 'Invalid phone number',
        }))
      }
    },
    [setFormData, setErrors]
  )

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

  const handleBack = () => {
    setStep(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('[Register Form Data]', formData)

    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, ...raw } = formData

    const payload = {
      ...raw,
      levelProfesional: Array.isArray(raw.levelProfesional) ? raw.levelProfesional : [raw.levelProfesional],
      keahlian: Array.isArray(raw.keahlian) ? raw.keahlian : [raw.keahlian],
    }

    try {
      const res = await register(payload)
      console.log('[Register Success]', res)
      toast.success('Registration successful!')
      localStorage.removeItem('formData')
      navigate('/')
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const errorMessage = Object.values(error.response.data.errors)
          .map((err) => err[0])
          .join('\n')
        toast.error(errorMessage || 'Registration failed!')
        console.error('Registration errors:', errorMessage)
      } else {
        toast.error('Registration failed!')
      }
    }
  }

  return (
    <div className="py-3 md:py-10 lg:py-5">
      <div className="relative flex items-center">
        <button onClick={handleBack} className="absolute left-0">
          <FaArrowLeftLong size={20} className="cursor-pointer text-lg" />
        </button>
        <h2 className="text-3xl font-semibold pl-10">Lengkapi Profil Anda</h2>
      </div>
      <p className="dark:text-slate-300 text-sm md:text-base mt-2 font-medium">Silahkan isi informasi pribadi Anda</p>

      <form className="mt-5 md:mt-10 lg:mt-5" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Tanggal Lahir</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            className="bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 dark:text-slate-300 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Nomor Telepon</label>
          <input
            type="tel"
            name="notelp"
            value={formData.notelp}
            onChange={handleChange}
            className="bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 dark:text-slate-300 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onInput={(e) => (e.target.value = e.target.value.replace(/[^+\d]/g, ''))}
            placeholder="Masukkan nomor telepon yang valid (10-15 digit, dapat dimulai dengan +))"
            required
          />
          {errors.notelp && <p className="text-red-500 text-xs mt-1">{errors.notelp}</p>}
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Provinsi</label>
          <select
            name="provinsi"
            value={formData.provinsi}
            onChange={handleChange}
            className="select bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 dark:text-slate-300 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">- Pilih Provinsi Anda -</option>
            <option value="Jawa Timur">Jawa Timur</option>
            <option value="Jawa Barat">Jawa Barat</option>
            <option value="Jawa Tengah">Jawa Tengah</option>
          </select>
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Kota</label>
          <select
            name="kota"
            value={formData.kota}
            onChange={handleChange}
            className="select bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 dark:text-slate-300 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">- Pilih Kota Anda -</option>
            <option value="Jakarta">Jakarta</option>
            <option value="Surabaya">Surabaya</option>
          </select>
        </div>

        <MultiSelect
          label="Kelas"
          name="levelProfesional"
          options={[
            { value: '1G', label: 'Kelas 1 (1G)' },
            { value: '2G', label: 'Kelas 2 (2G)' },
            { value: '3G', label: 'Kelas 3 (3G)' },
          ]}
          value={formData.levelProfesional}
          onChange={handleChange}
        />

        <MultiSelect
          label="Keahlian"
          name="keahlian"
          options={[
            { value: 'plate', label: 'Spesialis Pelat' },
            { value: 'pipe', label: 'Spesialis Pipa' },
          ]}
          value={formData.keahlian}
          onChange={handleChange}
        />

        <div className="my-5 flex items-center">
          <input type="checkbox" className="mr-2" name="terms" required />
          <p className="font-medium text-black dark:text-white text-xs">
            Saya setuju dengan <span className="underline">syarat dan ketentuan</span>
          </p>
        </div>

        <button type="submit" className="btn btn-primary bg-[#86CEEB] dark:bg-[#659BB0] border border-[#86CEEB] hover:bg-[#659BB0] dark:hover:bg-[#2F4852] hover:border-[#659BB0] w-full text-sm rounded-[10px]">
          Daftar Akun
        </button>
      </form>
    </div>
  )
}

const MultiSelect = ({ label, name, options, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm md:text-base font-medium mb-1">
      {label}
    </label>
    <select
      id={name}
      name={name}
      multiple
      value={value}
      onChange={onChange}
      className="select bg-gray-50 dark:bg-[#1D232A] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-slate-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      <option disabled value="">
        {`- Pilih ${label} -`}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
)

export default RegisterFormStep2
