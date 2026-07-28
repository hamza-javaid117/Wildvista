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


// 📝 All slide content lives here — add/remove/edit freely
const journeyMoments = [
    {
        location: "Hunza Valley",
        title: "Golden Sunrise",
        description: "Watch the first rays of sunlight touch the mountain peaks.",
        image: "/images/Hunza.jpg",
    },
    {
        location: "Skardu",
        title: "Crystal Blue Lakes",
        description: "Discover peaceful lakes surrounded by breathtaking mountains.",
        image: "/images/Skardu.jpg",
    },
    {
        location: "Fairy Meadows",
        title: "Camp Under The Stars",
        description: "Experience unforgettable nights beneath the Milky Way.",
        image: "/images/Fairy Meadows.jpg",
    },
    {
        location: "Naran Kaghan",
        title: "Hidden Waterfalls",
        description: "Walk through nature and discover untouched beauty.",
        image: "/images/Naran-Kaghan.jpg",
    },
    {
        location: "Deosai Plains",
        title: "Endless Horizons",
        description: "Explore high-altitude plains filled with wildflowers and wildlife.",
        image: "/images/Deosai-Plains.jpg",
    },
    {
        location: "Neelum Valley",
        title: "Lush Green Escapes",
        description: "Relax by pristine rivers and lush alpine valleys.",
        image: "/images/Neelum-Valley.jpg",
    },
    {
        location: "Passu Cones",
        title: "Majestic Cathedral Peaks",
        description: "Witness the dramatic granite spires along Karakoram.",
        image: "/images/Passu-cone.jpg",
    },
    {
        location: "Attabad Lake",
        title: "Turquoise Waters",
        description: "Glide across vibrant turquoise waters surrounded by high cliffs.",
        image: "/images/Attabad-Lake.jpg",
    },
];

// ⚙️ Horizontal distance (px) between each slide — tweak per your taste
const getSpacing = () => {
    if (typeof window === "undefined") return 420;
    const w = window.innerWidth;
    if (w < 640) return 300; // mobile: ~1 card visible, small peeks on the sides
    if (w < 1024) return 360; // tablet: ~2 cards visible
    return 420; // desktop: 3-4 cards visible
};

const AUTOPLAY_DELAY = 4000; // ⏱ ms between automatic slides

export default function ExperienceGallery() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [spacing, setSpacing] = useState(getSpacing());
    const [isHovered, setIsHovered] = useState(false);

    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const subtitleRef = useRef(null);
    const trackRef = useRef(null);
    const cardInnerRefs = useRef([]);

    const total = journeyMoments.length;

    // ---------- Keep spacing responsive on resize ----------
    useEffect(() => {
        const onResize = () => setSpacing(getSpacing());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // ---------- Infinite autoplay, paused on hover ----------
    useEffect(() => {
        if (isHovered) return;
        const id = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % total);
        }, AUTOPLAY_DELAY);
        return () => clearInterval(id);
    }, [isHovered, total]);

    const goTo = useCallback((index) => {
        setActiveIndex(((index % total) + total) % total);
    }, [total]);

    // ---------- Shortest circular distance from the active slide ----------
    // This is what makes looping feel seamless instead of snapping backwards
    const getDistance = (index) => {
        let diff = index - activeIndex;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
        return diff;
    };

    // ---------- GSAP entrance animation (runs once on scroll into view) ----------
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            tl.from(headingRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            })
                .from(
                    subtitleRef.current,
                    { y: 30, opacity: 0, duration: 0.9, ease: "power3.out" },
                    "-=0.6"
                )
                .from(
                    trackRef.current,
                    { y: 60, opacity: 0, duration: 1, ease: "power3.out" },
                    "-=0.5"
                )
                .from(
                    cardInnerRefs.current,
                    {
                        y: 40,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        stagger: 0.12,
                    },
                    "-=0.6"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-[#0A0A0A] py-24 md:py-32 px-6 overflow-hidden"
        >
            {/* ================= Header ================= */}
            <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
                <span className="text-xs md:text-sm tracking-[0.3em] text-emerald-400 uppercase mb-4 block">
                    Journey Moments
                </span>
                <h2
                    ref={headingRef}
                    className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.15] mb-5"
                >
                    Experience Every Adventure Before You Arrive
                </h2>
                <p ref={subtitleRef} className="text-base md:text-lg text-white/60 leading-relaxed">
                    Take a glimpse into the unforgettable moments that make every
                    WildVista journey truly special.
                </p>
            </div>

            {/* ================= Carousel ================= */}
            <div
                ref={trackRef}
                className="relative h-[420px] md:h-[500px] lg:h-[560px] flex items-center justify-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {journeyMoments.map((slide, index) => {
                    const distance = getDistance(index);
                    const isActive = distance === 0;
                    const absDist = Math.abs(distance);

                    // Beyond 2 slides away, hide completely so the carousel stays clean
                    if (absDist > 2) return null;

                    const scale = isActive ? 1 : absDist === 1 ? 0.82 : 0.68;
                    const opacity = isActive ? 1 : absDist === 1 ? 0.55 : 0.2;

                    return (
                        <div
                            key={slide.location}
                            onClick={() => goTo(index)}
                            className="absolute w-[78vw] sm:w-[380px] md:w-[420px] lg:w-[460px] cursor-pointer transition-transform duration-700"
                            style={{
                                transform: `translateX(${distance * spacing}px) scale(${scale})`,
                                opacity,
                                zIndex: total - absDist,
                                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                            }}
                        >
                            {/* Inner wrapper — GSAP targets this for entrance stagger,
                  keeping it separate from the transform above avoids conflicts */}
                            <div
                                ref={(el) => (cardInnerRefs.current[index] = el)}
                                className={`group relative rounded-3xl overflow-hidden shadow-2xl shadow-black/60
                            aspect-[3/4] border border-white/10
                            ${isActive ? "ring-1 ring-emerald-400/40" : ""}`}
                            >
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        if (slide.image.includes(" ")) {
                                            e.currentTarget.src = slide.image.replace(/ /g, "%20");
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}

                {/* ← Left arrow */}
                <button
                    type="button"
                    onClick={() => goTo(activeIndex - 1)}
                    className="absolute -left-10 md:-left-14 top-1/2 -translate-y-1/2 z-20 p-4 text-white/80 hover:text-white transition"
                    aria-label="Previous slide"
                >
                    <ArrowLeft className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2} />
                </button>

                {/* → Right arrow */}
                <button
                    type="button"
                    onClick={() => goTo(activeIndex + 1)}
                    className="absolute -right-10 md:-right-14 top-1/2 -translate-y-1/2 z-20 p-4 text-white/80 hover:text-white transition"
                    aria-label="Next slide"
                >
                    <ArrowRight className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2} />
                </button>
            </div>

            {/* ← Dots (only active/adjacent) */}
            <div className="flex items-center justify-center gap-2 mt-12">
                {journeyMoments.map((_, index) => {
                    const distance = getDistance(index);
                    // Only show active & immediate neighbors
                    if (Math.abs(distance) > 1) return null;
                    const isActive = distance === 0;
                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => goTo(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300
                ${isActive
                                    ? "bg-emerald-400 w-8 scale-110 shadow-[0_0_10px_rgba(16,185,129,0.6)]"
                                    : "bg-white/20 hover:bg-white/40"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    );
                })}
            </div>
        </section>
    );
}