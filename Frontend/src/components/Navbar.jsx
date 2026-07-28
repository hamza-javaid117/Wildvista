import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-7xl transition-all duration-500 ${scrolled
                ? "bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
                : "bg-transparent"
                }`}
        >
            <nav className="flex items-center justify-between px-6 py-3 h-[64px] w-full object-cover">

                {/* Logo */}
                <div className="flex items-center ">
                    <img src="/images/logo.png" alt="logo" className="h-[64px] w-auto object-contain" />
                </div>


                {/* Glass Navigation */}
                <div
                    className="
          hidden md:flex 
          items-center 
          gap-8 
          px-8 
          py-3
          rounded-full
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          shadow-xl
          "
                >
                    <Link
                        to="/"
                        className="text-white/90 hover:text-white transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/destinations"
                        className="text-white/90 hover:text-white transition"
                    >
                        Destinations
                    </Link>

                    <a
                        href="#packages"
                        className="text-white/90 hover:text-white transition"
                    >
                        Packages
                    </a>

                    <a
                        href="#about"
                        className="text-white/90 hover:text-white transition"
                    >
                        About
                    </a>
                    <a
                        href="#gallery"
                        className="text-white/90 hover:text-white transition"
                    >
                        Gallery
                    </a>

                </div>


                {/* Button */}
                <button
                    className="
          px-6
          py-3
          rounded-full
          bg-white/15
          backdrop-blur-xl
          border border-white/30
          text-white
          hover:bg-white/25
          transition-all
          duration-300
          "
                >
                    Book Now
                </button>


            </nav>
        </header>
    );
};

export default Navbar;