import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterFormStep1 from '../components/RegisterFormStep1'
import RegisterFormStep2 from '../components/RegisterFormStep2'
import img from '../assets/img/register.png'

const Register = () => {
  const [step, setStep] = useState(1)
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
    fotoProfile: null,
  })
  const navigate = useNavigate()

  return (
    <div className="flex md:flex-col lg:flex-row h-screen">
      <div className="flex-grow w-full lg:w-[55%] flex flex-col justify-start px-6 md:px-20 overflow-y-auto">
        {step === 1 ? <RegisterFormStep1 formData={formData} setFormData={setFormData} setStep={setStep} /> : <RegisterFormStep2 formData={formData} setFormData={setFormData} setStep={setStep} navigate={navigate} />}
      </div>

      <div className="hidden lg:flex w-[45%] justify-end">
        <img src={img} className="sticky top-0 h-screen object-cover rounded-l-3xl" alt="" />
      </div>
    </div>
  )
}

export default Register
