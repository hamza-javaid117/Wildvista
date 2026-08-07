import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutUs() {
    return (
        <>
            <Navbar />
            <main className="bg-[#0A0A0A] text-white min-h-screen">
                <section className="max-w-4xl mx-auto px-6 py-24">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">About WildVista</h1>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        WildVista is a travel company dedicated to creating authentic journeys across Pakistan's most remarkable landscapes. We specialize in thoughtfully curated packages that combine adventure, culture, and comfort.
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        Our team works directly with local guides, experienced drivers, and trusted partners to ensure every trip is safe, seamless, and unforgettable. Whether you are exploring mountain valleys, lakes, or cultural heritage sites, WildVista delivers memorable travel experiences with care.
                    </p>
                    <div className="space-y-4 text-gray-200 text-lg">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
                            <p>Email: support@wildvista.com</p>
                            <p>Phone: +92 300 1234567</p>
                            <p>Address: 123 WildVista Travel Street, Islamabad, Pakistan</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
