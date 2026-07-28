import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#0A0A0A] border-t border-white/10 pt-16 pb-8 px-6 text-white relative z-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                {/* Brand & Logo */}
                <div className="md:col-span-1 flex flex-col gap-6">
                    <img src="/images/logo.png" alt="WildVista Logo" className="h-[64px] w-auto object-contain self-start" />
                    <p className="text-white/60 text-sm leading-relaxed">
                        Curating unforgettable travel experiences across the breathtaking landscapes of Northern Pakistan.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-6 text-emerald-400">Quick Links</h3>
                    <ul className="space-y-4">
                        <li><a href="#home" className="text-white/60 hover:text-emerald-400 transition-colors text-sm">Home</a></li>
                        <li><a href="#destinations" className="text-white/60 hover:text-emerald-400 transition-colors text-sm">Destinations</a></li>
                        <li><a href="#packages" className="text-white/60 hover:text-emerald-400 transition-colors text-sm">Packages</a></li>
                        <li><a href="#about" className="text-white/60 hover:text-emerald-400 transition-colors text-sm">About Us</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold mb-6 text-emerald-400">Contact Us</h3>
                    <ul className="space-y-4">
                        <li className="text-white/60 text-sm">Lahore, Pakistan</li>
                        <li className="text-white/60 text-sm">+92 XXX XXXXXXX</li>
                        <li className="text-white/60 text-sm">hello@wildvista.com</li>
                    </ul>
                </div>

                {/* Newsletter / Social */}
                <div>
                    <h3 className="text-lg font-semibold mb-6 text-emerald-400">Follow Us</h3>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all">
                            FB
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all">
                            IG
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all">
                            X
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-white/40 text-xs">
                    © {new Date().getFullYear()} WildVista. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">Privacy Policy</a>
                    <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
