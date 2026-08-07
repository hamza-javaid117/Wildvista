import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { div } from "framer-motion/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// ===== SAMPLE DESTINATION DATA (replace images/prices with real data later) =====
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

const regionOptions = ["All Regions", ...new Set(destinationsData.map((d) => d.region))];
const durationOptions = ["Any Duration", "3 Days", "4 Days", "5 Days", "6 Days"];
const levelOptions = ["All Levels", "Easy", "Moderate", "Challenging"];

const featuredDestination = destinationsData.find((destination) => destination.id === 1);

export default function Destinations() {
    // ===== refs =====
    const heroRef = useRef(null);
    const headingRef = useRef(null);
    const subtitleRef = useRef(null);
    const glowRefs = useRef([]);
    const particleRefs = useRef([]);

    const filterBarRef = useRef(null);
    const cardRefs = useRef([]);
    const headlineRef = useRef(null);

    const featuredSectionRef = useRef(null);
    const featuredImageRef = useRef(null);
    const featuredContentRef = useRef(null);

    const ctaRef = useRef(null);
    const ctaGlowRef = useRef(null);

    // ===== filter state =====
    const [search, setSearch] = useState("");
    const [region, setRegion] = useState("All Regions");
    const [duration, setDuration] = useState("Any Duration");
    const [level, setLevel] = useState("All Levels");

    const filtered = destinationsData.filter((d) => {
        const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
        const matchesRegion = region === "All Regions" || d.region === region;
        const matchesDuration = duration === "Any Duration" || d.duration === duration;
        const matchesLevel = level === "All Levels" || d.level === level;
        return matchesSearch && matchesRegion && matchesDuration && matchesLevel;
    });

    // reset ref slots before each render's mapping so filtering doesn't leave stale refs
    cardRefs.current = [];

    // ===== HERO entrance animation =====
    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.2 });
        tl.from(headingRef.current, { opacity: 0, y: 50, duration: 0.9, ease: "power2.out" })
            .from(subtitleRef.current, { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" }, "-=0.5");

        // floating glow drift
        glowRefs.current.filter(Boolean).forEach((glow, i) => {
            gsap.to(glow, {
                x: i % 2 === 0 ? 50 : -50,
                y: i % 2 === 0 ? -40 : 40,
                duration: 9 + i,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        });

        // subtle floating particles
        particleRefs.current.filter(Boolean).forEach((p, i) => {
            gsap.to(p, {
                y: -20 - i * 5,
                opacity: 0.8,
                duration: 3 + i * 0.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.2,
            });
        });
    }, []);

    // ===== FILTER BAR fade-in =====
    useEffect(() => {
        gsap.from(filterBarRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
                trigger: filterBarRef.current,
                start: "top 90%",
            },
        });
    }, []);

    // ===== DESTINATION CARDS stagger reveal (re-runs when the filtered list changes) =====
    useEffect(() => {
        const validCards = cardRefs.current.filter(Boolean); // avoids "GSAP target null" errors

        const ctx = gsap.context(() => {
            gsap.fromTo(
                validCards,
                { opacity: 0, y: 60, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: "power2.out",
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: validCards[0]?.closest(".destination-grid") || null,
                        start: "top 85%",
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [filtered.length, search, region, duration, level]);

    // ===== FEATURED DESTINATION parallax =====
    useEffect(() => {
        gsap.from(featuredContentRef.current, {
            opacity: 0,
            x: 60,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: featuredSectionRef.current,
                start: "top 75%",
            },
        });

        gsap.to(featuredImageRef.current, {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
                trigger: featuredSectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });
    }, []);

    // ===== CTA reveal =====
    useEffect(() => {
        gsap.from(ctaRef.current, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ctaRef.current,
                start: "top 85%",
            },
        });

        gsap.to(ctaGlowRef.current, {
            x: 30,
            y: -20,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    }, []);

    return (

        <>
            <Navbar />


            <div className="bg-[#0A0A0A] text-white">
                {/* ==================== 1. HERO BANNER ==================== */}
                <section
                    ref={heroRef}
                    className="relative h-[80vh] min-h-[560px] flex items-center justify-center overflow-hidden"
                >
                    <img
                        src="/images/hero.jpg"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />

                    {/* floating glow shapes */}
                    <div
                        ref={(el) => (glowRefs.current[0] = el)}
                        className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
                    />
                    <div
                        ref={(el) => (glowRefs.current[1] = el)}
                        className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"
                    />

                    {/* floating particles */}
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            ref={(el) => (particleRefs.current[i] = el)}
                            className="pointer-events-none absolute w-1.5 h-1.5 bg-emerald-300/60 rounded-full"
                            style={{ top: `${20 + i * 12}%`, left: `${15 + i * 14}%` }}
                        />
                    ))}

                    <div className="relative z-10 max-w-3xl text-center px-6">
                        <h1 ref={headingRef} className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                            Explore Pakistan's Most Breathtaking Destinations
                        </h1>
                        <p ref={subtitleRef} className="text-gray-300 text-base sm:text-lg md:text-xl">
                            From the majestic peaks of Hunza to the crystal lakes of Skardu, discover
                            journeys designed for unforgettable memories.
                        </p>
                    </div>
                </section>

                <section ref={featuredSectionRef} className="relative py-16 overflow-hidden">
                    {/* backdrop glow */}
                    <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />

                    {/* grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,transparent_60%)]" />

                    <div className="relative z-10 max-w-5xl mx-auto px-4">
                        {/* headline */}
                        <h2 ref={(el) => (headlineRef.current = el)} className="text-center text-3xl sm:text-4xl font-semibold mb-14">
                            Featured Destinations
                        </h2>

                        {/* featured card */}
                        <div
                            className="grid md:grid-cols-2 gap-12 items-center bg-white/5 border border-white/10 rounded-2xl p-10 mb-16 backdrop-blur-lg"
                        >
                            <div
                                ref={(el) => (featuredImageRef.current = el)}
                                className="rounded-2xl overflow-hidden relative group"
                            >
                                <img
                                    src="/images/Hunza.jpg"
                                    alt="Hunza Valley"
                                    className="w-full h-auto rounded-2xl transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-40" />
                            </div>

                            <div
                                ref={(el) => (featuredContentRef.current = el)}
                                className="space-y-8"
                            >
                                <h3 className="text-3xl sm:text-4xl font-bold">
                                    Hunza Valley
                                </h3>
                                <p className="text-gray-300">
                                    Nestled amidst towering peaks, Hunza Valley offers serene landscapes, ancient forts, and a unique cultural experience. A paradise for trekkers and nature lovers.
                                </p>

                                <div className="grid grid-cols-2 gap-6 text-sm">
                                    <div>
                                        <h4 className="font-semibold mb-2">Duration</h4>
                                        <p className="text-gray-400">5–7 days</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">Best Time</h4>
                                        <p className="text-gray-400">April–October</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">Difficulty</h4>
                                        <p className="text-gray-400">Easy–Moderate</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">Region</h4>
                                        <p className="text-gray-400">Gilgit-Baltistan</p>
                                    </div>
                                </div>
                                <Link to={`/PackageDetails/${featuredDestination.slug}`}>
                                    <button className="bg-white text-[#0A0A0A] px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
                                        View Package →
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* filter bar */}
                        <div
                            ref={(el) => (filterBarRef.current = el)}
                            className="grid grid-cols-2 md:grid-cols-5 gap-4 p-3 bg-white/5 rounded-2xl border border-white/10 mb-10"
                        >
                            <input
                                type="text"
                                placeholder="Search destination"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="col-span-2 md:col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400"
                            />

                            <select
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400"
                            >
                                {regionOptions.map((opt) => (
                                    <option key={opt}>{opt}</option>
                                ))}
                            </select>

                            <select
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400"
                            >
                                {durationOptions.map((opt) => (
                                    <option key={opt}>{opt}</option>
                                ))}
                            </select>

                            <select
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400"
                            >
                                {levelOptions.map((opt) => (
                                    <option key={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>

                        {/* cards grid */}
                        <div className="destination-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((d) => (
                                <div
                                    key={d.id}
                                    ref={(el) => (cardRefs.current[d.id] = el)}
                                    className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:shadow-xl transition-all duration-700 cursor-pointer"
                                >
                                <div className="relative h-56">
                                            <img
                                                src={d.image}
                                                alt={d.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null;
                                                    if (d.image.includes(" ")) {
                                                        e.currentTarget.src = d.image.replace(/ /g, "%20");
                                                    }
                                                }}
                                            />
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-40" />
                                    </div>

                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-bold text-lg">{d.name}</h4>
                                            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                                                {d.region}
                                            </span>
                                        </div>

                                        <p className="text-gray-400 text-sm">
                                            {d.description.substring(0, 80)}
                                        </p>

                                        <div className="mt-4 pt-4 border-t border-white/5">
                                            <div className="flex justify-between items-center mb-3">
                                                <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
                                                    <span>{d.price}</span>
                                                </div>

                                                <div className="flex items-center gap-1 text-gray-400 text-xs">
                                                    <span>{d.duration}</span>
                                                    <span>•</span>
                                                    <span>{d.level}</span>
                                                </div>
                                            </div>

                                            <Link to={`/PackageDetails/${d.slug}`}>
                                            
                                                <button className="w-full bg-emerald-500/10 border border-emerald-400/50 text-emerald-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-500/20 transition-colors">
                                                    View Details
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <p className="text-center text-gray-400 mt-10">
                                No destinations match your filters.
                            </p>
                        )}

                        {/* CTA section */}
                        <div
                            ref={(el) => (ctaRef.current = el)}
                            className="relative mt-20 bg-gradient-to-br from-emerald-500/10 to-white/5 rounded-2xl p-10 sm:p-16 border border-white/10 overflow-hidden"
                        >
                            {/* subtle glow for CTA */}
                            <div
                                ref={(el) => (ctaGlowRef.current = el)}
                                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl opacity-50"
                            />

                            <div className="relative z-10 max-w-4xl mx-auto text-center">
                                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                                    Ready for an Adventure?
                                </h3>
                                <p className="text-gray-300 text-base sm:text-lg mb-8">
                                    Explore our curated travel packages and find the perfect
                                    journey for you.
                                </p>
                                <button className="bg-white text-[#0A0A0A] px-6 py-3 rounded-full font-medium text-base sm:text-lg hover:bg-gray-200 transition-colors">
                                    View All Packages
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />

        </>

    );
};

