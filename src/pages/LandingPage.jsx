import React from 'react'
import Slideshow from '../components/Slideshow'
import Navbar from '../components/Navbar'
import AboutUs from '../components/AboutUs'
import Gallery from '../components/Gallery'
function LandingPage() {
    return (
        <div>
            <Navbar />
            <Slideshow />
            <Gallery />
            <AboutUs />
        </div>
    )
}

export default LandingPage

