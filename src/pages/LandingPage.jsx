import React from 'react'
import Slideshow from '../components/Slideshow'
import Navbar from '../components/Navbar'
import AboutUs from '../components/AboutUs'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'




function LandingPage() {
    return (
        <div>
            <Navbar />
            <Slideshow />
            <Gallery />
            <AboutUs />
            <Testimonials />
        </div>
    )
}

export default LandingPage

