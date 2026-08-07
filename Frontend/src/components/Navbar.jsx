import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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
            <nav className="relative flex items-center justify-between px-6 py-3 h-16 w-full object-cover">

                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="md:hidden flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/10 text-white"
                    aria-label="Toggle navigation menu"
                >
                    <span className="h-0.5 w-6 bg-current" />
                    <span className="h-0.5 w-6 bg-current" />
                    <span className="h-0.5 w-6 bg-current" />
                </button>

                <div className="absolute left-[42%] top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0">
                    <img src="/images/logo.png" alt="logo" className="h-10 w-auto max-w-[110px] object-contain md:h-16" />
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

                    <Link
                        to="/packages"
                        className="text-white/90 hover:text-white transition"
                    >
                        Packages
                    </Link>

                    <Link
                        to="/about-us"
                        className="text-white/90 hover:text-white transition"
                    >
                        About Us
                    </Link>
                </div>


                {/* Button */}
                <Link to={"/BookForm"}>
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
            </Link>


            </nav>

            {/* Mobile menu dropdown */}
            {isOpen && (
                <div className="md:hidden mt-2 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl p-4 text-white">
                    <Link onClick={() => setIsOpen(false)} to="/" className="block py-3 text-white/90 hover:text-white">
                        Home
                    </Link>
                    <Link onClick={() => setIsOpen(false)} to="/destinations" className="block py-3 text-white/90 hover:text-white">
                        Destinations
                    </Link>
                    <Link onClick={() => setIsOpen(false)} to="/packages" className="block py-3 text-white/90 hover:text-white">
                        Packages
                    </Link>
                    <Link onClick={() => setIsOpen(false)} to="/about-us" className="block py-3 text-white/90 hover:text-white">
                        About Us
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Navbar;