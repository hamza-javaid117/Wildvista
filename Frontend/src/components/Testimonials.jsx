import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ArrowLeft = ({ className, strokeWidth = 2 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className} strokeWidth={strokeWidth}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);

const ArrowRight = ({ className, strokeWidth = 2 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className} strokeWidth={strokeWidth}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);

// 📝 All testimonial content lives here — add/remove/edit freely
const testimonials = [
    {
        name: "Ahmed Raza",
        location: "Lahore, Pakistan",
        rating: 5,
        review: "We had always dreamed of visiting Hunza, and WildVista made it effortless. Every stop was breathtaking, and the hospitality was beyond our expectations.",
        photo: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
        name: "Ayesha Malik",
        location: "Islamabad, Pakistan",
        rating: 5,
        review: "Our Skardu trip was perfectly organized. From transport to accommodation, everything was smooth. We will definitely travel with WildVista again.",
        photo: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
        name: "Hamza Khan",
        location: "Karachi, Pakistan",
        rating: 5,
        review: "The sunrise at Fairy Meadows is something I will never forget. It was one of the best experiences of my life. Highly recommended for adventurers.",
        photo: "https://randomuser.me/api/portraits/men/68.jpg",
    },
    {
        name: "Fatima Noor",
        location: "Peshawar, Pakistan",
        rating: 5,
        review: "Naran Kaghan felt like a piece of heaven. The guides were exceptionally knowledgeable, making sure we enjoyed every single moment of the tour.",
        photo: "https://randomuser.me/api/portraits/women/76.jpg",
    },
    {
        name: "Usman Ahmed",
        location: "Faisalabad, Pakistan",
        rating: 5,
        review: "Camping under the open sky at Deosai Plains was surreal. The entire arrangement by WildVista was premium and highly comfortable.",
        photo: "https://randomuser.me/api/portraits/men/21.jpg",
    },
    {
        name: "Hira Khan",
        location: "Multan, Pakistan",
        rating: 5,
        review: "Seeing the majestic Passu Cones in person left me speechless. Everything from the booking to the final day felt curated and deeply intentional.",
        photo: "https://randomuser.me/api/portraits/women/52.jpg",
    },
    {
        name: "Zain Ali",
        location: "Rawalpindi, Pakistan",
        rating: 5,
        review: "Boating in Attabad Lake was an absolute delight. WildVista truly sets a new standard for luxury travel across Northern Pakistan.",
        photo: "https://randomuser.me/api/portraits/men/11.jpg",
    },
];

// ⚙️ Horizontal spacing (px) between cards — tune per breakpoint
const getSpacing = () => {
    if (typeof window === "undefined") return 400;
    const w = window.innerWidth;
    if (w < 640) return 290; // mobile: ~1 card visible
    if (w < 1024) return 340; // tablet: ~2 cards visible
    return 400; // desktop: ~3 cards visible
};

const AUTOPLAY_DELAY = 3000; // ⏱ ms between automatic slides, per spec

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [spacing, setSpacing] = useState(getSpacing());
    const [isHovered, setIsHovered] = useState(false);
    
    const startXRef = useRef(null); // For drag/swipe

    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const subtitleRef = useRef(null);
    const trackRef = useRef(null);
    const cardInnerRefs = useRef([]);

    const total = testimonials.length;

    // ---------- Responsive spacing ----------
    useEffect(() => {
        const onResize = () => setSpacing(getSpacing());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // ---------- Autoplay every 3s ----------
    useEffect(() => {
        const id = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % total);
        }, AUTOPLAY_DELAY);
        return () => clearInterval(id);
    }, [total]);

    const goTo = useCallback(
        (index) => setActiveIndex(((index % total) + total) % total),
        [total]
    );

    // ---------- Shortest circular distance from active card (seamless loop) ----------
    const getDistance = (index) => {
        let diff = index - activeIndex;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
        return diff;
    };
    
    // ---------- Drag / Swipe Logic ----------
    const handlePointerDown = (e) => {
        startXRef.current = e.touches ? e.touches[0].clientX : e.clientX;
    };

    const handlePointerUp = (e) => {
        if (startXRef.current === null) return;
        const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const diffX = startXRef.current - endX;
        
        if (diffX > 50) {
            goTo(activeIndex + 1);
        } else if (diffX < -50) {
            goTo(activeIndex - 1);
        }
        startXRef.current = null;
    };

    // ---------- GSAP entrance animation (plays once on scroll into view) ----------
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            tl.from(headingRef.current, { y: 50, opacity: 0, duration: 1, ease: "power3.out" })
                .from(
                    subtitleRef.current,
                    { y: 30, opacity: 0, duration: 0.9, ease: "power3.out" },
                    "-=0.6"
                )
                .from(
                    cardInnerRefs.current,
                    { y: 50, opacity: 0, duration: 0.9, ease: "power2.out", stagger: 0.12 },
                    "-=0.5"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#0A0A0A] py-24 md:py-32 px-6 overflow-hidden"
        >
            {/* ================= Ambient glow background ================= */}
            {/* Purely decorative, sits behind everything, never intercepts clicks */}
            <div className="pointer-events-none absolute inset-0 -z-0">
                <div className="absolute top-1/4 left-[10%] w-72 h-72 md:w-96 md:h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-[10%] w-72 h-72 md:w-96 md:h-96 bg-emerald-400/10 rounded-full blur-[110px] animate-pulse-slow [animation-delay:1.5s]" />
            </div>

            {/* ================= Header ================= */}
            <div className="relative z-10 max-w-3xl mx-auto text-center mb-16 md:mb-24">
                <span className="text-xs md:text-sm tracking-[0.3em] text-emerald-400 uppercase mb-4 block">
                    Traveler Stories
                </span>
                <h2
                    ref={headingRef}
                    className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.15] mb-5"
                >
                    What Our Travelers Say
                </h2>
                <p ref={subtitleRef} className="text-base md:text-lg text-white/60 leading-relaxed">
                    Every unforgettable journey begins with trust and ends with lifelong memories.
                </p>
            </div>

            {/* ================= Carousel ================= */}
            <div
                ref={trackRef}
                className="relative z-10 h-[460px] md:h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { setIsHovered(false); startXRef.current = null; }}
                onMouseDown={handlePointerDown}
                onMouseUp={handlePointerUp}
                onTouchStart={handlePointerDown}
                onTouchEnd={handlePointerUp}
            >
                {testimonials.map((t, index) => {
                    const distance = getDistance(index);
                    const isActive = distance === 0;
                    const absDist = Math.abs(distance);

                    if (absDist > 2) return null; // keep only nearby cards rendered

                    const scale = isActive ? 1 : absDist === 1 ? 0.85 : 0.72;
                    const opacity = isActive ? 1 : absDist === 1 ? 0.5 : 0.15;
                    const blur = isActive ? "blur-0" : absDist === 1 ? "blur-[2px]" : "blur-[4px]";

                    return (
                        <div
                            key={t.name}
                            onClick={(e) => {
                                // Only trigger click if not dragging
                                if (startXRef.current !== null) {
                                    const diff = Math.abs(startXRef.current - e.clientX);
                                    if (diff > 5) return;
                                }
                                goTo(index);
                            }}
                            className="absolute w-[85vw] sm:w-[380px] md:w-[400px] cursor-pointer transition-transform duration-700"
                            style={{
                                transform: `translateX(${distance * spacing}px) scale(${scale})`,
                                opacity,
                                zIndex: total - absDist,
                                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                            }}
                        >
                            <div
                                ref={(el) => (cardInnerRefs.current[index] = el)}
                                className={`group relative rounded-3xl p-7 md:p-8
                            bg-white/5 backdrop-blur-md border border-white/10
                            shadow-xl shadow-black/40
                            transition-all duration-500 ${blur}
                            ${isActive ? "ring-1 ring-emerald-400/30" : ""}
                            hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 pointer-events-auto`}
                            >
                                {/* ---- Photo + name + location ---- */}
                                <div className="flex items-center gap-4 mb-5 pointer-events-none">
                                    <div className="w-14 h-14 rounded-full overflow-hidden border border-white/15 shrink-0">
                                        <img
                                            src={t.photo}
                                            alt={t.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            draggable={false}
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = "/images/logo.png";
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{t.name}</p>
                                        <p className="text-white/50 text-sm">{t.location}</p>
                                    </div>
                                </div>

                                {/* ---- Star rating ---- */}
                                <div className="flex gap-1 mb-4 pointer-events-none">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span
                                            key={i}
                                            className={i < t.rating ? "text-emerald-400" : "text-white/15"}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>

                                {/* ---- Review ---- */}
                                <p className="text-white/75 text-sm md:text-base leading-relaxed pointer-events-none">
                                    “{t.review}”
                                </p>
                            </div>
                        </div>
                    );
                })}
                
                {/* ← Left arrow */}
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); goTo(activeIndex - 1); }}
                    className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 text-white/50 hover:text-white transition bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-sm border border-white/10"
                    aria-label="Previous testimonial"
                >
                    <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2} />
                </button>

                {/* → Right arrow */}
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); goTo(activeIndex + 1); }}
                    className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 text-white/50 hover:text-white transition bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-sm border border-white/10"
                    aria-label="Next testimonial"
                >
                    <ArrowRight className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2} />
                </button>
            </div>

            {/* ---- Keyframes for the slow ambient glow pulse (scoped to this file) ---- */}
            <style>{`
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
        
        `}

            </style>
        </section>
    );
}