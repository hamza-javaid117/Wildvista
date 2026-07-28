import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Slideshow.css";



// 👉 sirf images — koi text/title/rating data nahi
const images = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
];

// NEW: har slide ka apna heading/subtitle/button — index images array se match karta hai
const slidesContent = [
    {
        heading: "Discover The Wild Beyond",
        subtitle: "Escape the crowded paths and explore breathtaking landscapes, hidden valleys, and unforgettable adventures waiting for you.",
        button: "Explore Now",
    },
    {
        heading: "Where Mountains Tell Stories",
        subtitle: "Journey through the untouched beauty of Pakistan's northern landscapes and create memories that last a lifetime.",
        button: "Explore Now",
    },
    {
        heading: "Experience Nature Like Never Before",
        subtitle: "From majestic peaks to peaceful valleys, we craft journeys that connect you with the beauty of the wild.",
        button: "Explore Now",
    },
    {
        heading: "Adventure Awaits Beyond The Horizon",
        subtitle: "Explore hidden places, embrace new experiences, and travel where your heart finds freedom.",
        button: "Explore Now",
    },
];



const AUTO_PLAY_DELAY = 4000;
const BG_TRANSITION = 1;
const ZOOM_AMOUNT = 1.15;
const CARD_TRANSITION = 0.8;
const CARD_GAP = 310;



export default function Slideshow() {
    const [activeIndex, setActiveIndex] = useState(0);
    const bgRefs = useRef([]);
    const cardRefs = useRef([]);

    const [textIndex, setTextIndex] = useState(0); // NEW: text apni speed se change hoga (old fade-out ke baad)
    const textRef = useRef(null); // NEW: text block ka ref
    const autoplayRef = useRef(null);

    const getOffset = (index) => {
        const total = images.length;
        let diff = index - activeIndex;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
        return diff;
    };

    const goTo = (newIndex) => {
        const total = images.length;
        setActiveIndex(((newIndex % total) + total) % total);
        resetAutoplay();
    };

    const next = () => goTo(activeIndex + 1);
    const prev = () => goTo(activeIndex - 1);

    const resetAutoplay = () => {
        clearInterval(autoplayRef.current);
        autoplayRef.current = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, AUTO_PLAY_DELAY);
    };

    useEffect(() => {
        resetAutoplay();
        return () => clearInterval(autoplayRef.current);
    }, []);

    // Background: fade + Ken Burns zoom, synced to active card
    useEffect(() => {
        bgRefs.current.forEach((bg, i) => {
            if (!bg) return;
            if (i === activeIndex) {
                gsap.set(bg, { scale: 1 });
                gsap.to(bg, { opacity: 1, duration: BG_TRANSITION, ease: "power2.inOut" });
                gsap.to(bg, { scale: ZOOM_AMOUNT, duration: AUTO_PLAY_DELAY / 1000 + BG_TRANSITION, ease: "none" });
            } else {
                gsap.to(bg, { opacity: 0, duration: BG_TRANSITION, ease: "power2.inOut" });
            }
        });
    }, [activeIndex]);

    // Cards: active + 1 neighbor visible, everything else fully hidden
    useEffect(() => {
        cardRefs.current.forEach((card, i) => {
            if (!card) return;
            const offset = getOffset(i);
            const distance = Math.abs(offset);
            const isVisible = distance <= 1;

            let target;
            if (distance === 0) {
                target = { x: 0, scale: 1.1, opacity: 1, zIndex: 5 };
            } else if (distance === 1) {
                target = { x: offset * CARD_GAP, scale: 0.85, opacity: 0.85, zIndex: 4 };
            } else {
                target = { x: offset * CARD_GAP * 1.2, scale: 0.6, opacity: 0, zIndex: 1 };
            }

            if (isVisible) {
                gsap.set(card, { visibility: "visible" });
            }

            gsap.to(card, {
                ...target,
                duration: CARD_TRANSITION,
                ease: "power3.out",
                onComplete: () => {
                    if (!isVisible) {
                        gsap.set(card, { visibility: "hidden" });
                    }
                },
            });
        });
    }, [activeIndex]);




    // NEW: text animation — old text fade+move up, phir new text fade in
    useEffect(() => {
        const tl = gsap.timeline();

        tl.to(textRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => setTextIndex(activeIndex), // text content sirf tabhi badalta hai jab purana fade ho chuka ho
        }).to(textRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
        });
    }, [activeIndex]);

    return (
        <div className="hero">
            {/* Background images only — no text overlay content */}
            <div className="hero-background">
                {images.map((src, i) => (
                    <img
                        key={i}
                        ref={(el) => (bgRefs.current[i] = el)}
                        src={src}
                        alt=""
                        className="bg-image"
                        style={{ opacity: i === activeIndex ? 1 : 0 }}
                    />
                ))}
            </div>

            {/* Dark overlay for contrast */}
            <div className="overlay"></div>

            {/* NEW: animated text overlay, synced with slide index */}
            <div
                ref={textRef}
                className="absolute z-[5] top-1/2 left-6 sm:left-10 md:left-20 -translate-y-1/2 max-w-[90%] sm:max-w-md text-white"
            >
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
                    {slidesContent[textIndex].heading}
                </h1>
                <p className="text-sm sm:text-base md:text-lg opacity-90 mb-4 md:mb-6">
                    {slidesContent[textIndex].subtitle}
                </p>
                {slidesContent[textIndex].button && (
                    <button className="px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base rounded-full border border-white/40 bg-white/10 backdrop-blur-md hover:bg-white/20 transition">
                        {slidesContent[textIndex].button}
                    </button>
                )}
            </div>

            {/* Cards + nav buttons only — no labels, no ratings, no icons */}
            <div className="cards-row">
                <div className="cards-viewport">
                    {images.map((src, i) => (
                        <div key={i} ref={(el) => (cardRefs.current[i] = el)} className="card">
                            <img src={src} alt="" className="card-image" />
                        </div>
                    ))}
                </div>

                <div className="nav-buttons">
                    <button onClick={prev} className="nav-btn">‹</button>
                    <button onClick={next} className="nav-btn">›</button>
                </div>
            </div>
        </div>
    );
}

