import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const destinationsData = [
    {
        id: 1,
        name: "Hunza Valley",
        slug: "hunza-valley-adventure",
        region: "Gilgit-Baltistan",
        duration: "5 Days",
        price: "PKR 20000/-",
        level: "Easy",
        description:
            "Snow-capped peaks, ancient forts, and orchards that turn gold in autumn.",
        image: "/images/Hunza.jpg",
    },
    {
        id: 2,
        name: "Skardu",
        slug: "skardu-lakes-escape",
        region: "Gilgit-Baltistan",
        duration: "6 Days",
        price: "PKR 25000/-",
        level: "Moderate",
        description:
            "Gateway to the Karakoram, home to turquoise lakes and towering giants.",
        image: "/images/Skardu.jpg",
    },
    {
        id: 3,
        name: "Fairy Meadows",
        slug: "fairy-meadows-trek",
        region: "Gilgit-Baltistan",
        duration: "4 Days",
        price: "PKR 15000/-",
        level: "Challenging",
        description:
            "A dreamlike meadow beneath Nanga Parbat, the world's ninth-highest peak.",
        image: "/images/Fairy Meadows.jpg",
    },
    {
        id: 4,
        name: "Naran Kaghan",
        slug: "naran-kaghan-experience",
        region: "Khyber Pakhtunkhwa",
        duration: "4 Days",
        price: "PKR 12000/-",
        level: "Easy",
        description:
            "Alpine lakes, pine forests, and winding roads through the Kaghan Valley.",
        image: "/images/Naran-Kaghan.jpg",
    },
    {
        id: 5,
        name: "Deosai Plains",
        slug: "deosai-plains-expedition",
        region: "Gilgit-Baltistan",
        duration: "3 Days",
        price: "PKR 10000/-",
        level: "Moderate",
        description:
            "The 'Land of Giants' — vast alpine plateau alive with wildflowers.",
        image: "/images/Deosai-Plains.jpg",
    },
    {
        id: 6,
        name: "Neelum Valley",
        slug: "neelum-valley-retreat",
        region: "Azad Kashmir",
        duration: "5 Days",
        price: "PKR 18000/-",
        level: "Easy",
        description:
            "Emerald rivers and dense forests along one of Pakistan's most scenic valleys.",
        image: "/images/Neelum-Valley.jpg",
    },
    {
        id: 7,
        name: "Passu Cones",
        slug: "passu-cones-safari",
        region: "Gilgit-Baltistan",
        duration: "4 Days",
        price: "PKR 16000/-",
        level: "Moderate",
        description:
            "Dramatic jagged peaks rising above glaciers and the Hunza River.",
        image: "/images/Passu-cone.jpg",
    },
    {
        id: 8,
        name: "Attabad Lake",
        slug: "attabad-lake-journey",
        region: "Gilgit-Baltistan",
        duration: "3 Days",
        price: "PKR 14000/-",
        level: "Easy",
        description:
            "A surreal turquoise lake formed by a landslide, framed by golden cliffs.",
        image: "/images/Attabad-Lake.jpg",
    },
];

export default function Packages() {
    return (
        <>
            <Navbar />
            <div className="bg-[#0A0A0A] text-white min-h-screen">
                <section className="max-w-6xl mx-auto px-6 py-24">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Travel Packages</h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Choose from our curated travel packages, each designed to deliver unforgettable experiences across Pakistan's most stunning regions.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {destinationsData.map((packageItem) => (
                            <div key={packageItem.id} className="group rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/40 hover:shadow-xl">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={packageItem.image}
                                        alt={packageItem.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold mb-3">{packageItem.name}</h2>
                                    <p className="text-gray-400 mb-4">{packageItem.description}</p>
                                    <div className="flex flex-wrap gap-3 text-sm text-gray-300 mb-6">
                                        <span>{packageItem.duration}</span>
                                        <span>•</span>
                                        <span>{packageItem.level}</span>
                                        <span>•</span>
                                        <span>{packageItem.region}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-emerald-300 font-semibold">{packageItem.price}</span>
                                        <Link to={`/PackageDetails/${packageItem.slug}`}>
                                            <button className="rounded-full bg-emerald-500 px-5 py-2 text-black font-medium hover:bg-emerald-400 transition-colors">
                                                View Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
