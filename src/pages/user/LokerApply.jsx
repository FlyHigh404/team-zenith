import React from 'react'
import { useParams } from 'react-router-dom'
import dataLoker from '../../data/loker'
import LokerInfo from '../../components/LokerInfo'
import LokerForm from '../../components/LokerForm'

const LokerApply = () => {
    const { id } = useParams();
    const job = dataLoker.find((item) => item.id === parseInt(id));

    // const [formData, setFormData] = useState({
    //     nama: ''
    // });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };

    // const handleNext = (e) => {
    //     e.preventDefault();
    //     console.log('Form data:', formData);
    //     // Lanjut ke step berikutnya atau submit ke API di sini
    // };

    if (!job) return <p>Loker tidak ditemukan.</p>;

    return (
        <div className="flex gap-10 px-10 py-8 bg-[#F5F5F5] min-h-screen">
            {/* KIRI – Sidebar */}
            <LokerInfo />

            {/* KANAN – Konten Form */}
            <LokerForm />
        </div>
    )
}


export default LokerApply
