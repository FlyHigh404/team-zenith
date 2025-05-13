import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Logo from '../components/Logo'
import Tentang from '../components/Tentang'
import Kegunaan from '../components/Kegunaan'
import Keunggulan from '../components/Keunggulan'
import Carapendaftaran from '../components/Carapendaftaran'
import Footer from '../components/Footer'

const LandingPage = () => {
    return (
        <div>

            <Banner />
            <Logo />
            <Tentang />
            <Kegunaan />
            <Keunggulan />
            <Carapendaftaran />
            <Footer />
        </div>
    )
}

export default LandingPage
