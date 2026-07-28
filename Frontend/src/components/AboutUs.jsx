import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 📝 All story content lives here — edit freely, add/remove stories anytime
const stories = [
    {
        label: "Who We Are",
        heading: "A Team Bound By Wanderlust",
        text: "WildVista was born from a simple idea — travel should feel like discovery, not a checklist. We're a collective of explorers, guides, and storytellers crafting journeys that linger long after you've returned home.",
        image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    },
    {
        label: "Our Mission",
        heading: "Journeys With Purpose",
        text: "We believe travel should leave places better than we found them. Every WildVista trip is built on sustainable practices, local partnerships, and deep respect for the landscapes we're privileged to visit.",
        image:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
    },
    {
        label: "Why Choose WildVista",
        heading: "Crafted, Not Templated",
        text: "No two travelers are alike, and no two WildVista itineraries are either. From private mountain lodges to hidden coastal trails, every detail is curated by hand — never mass-produced, always intentional.",
        image:
            "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1600&auto=format&fit=crop",
    },
    {
        label: "Your Next Adventure Begins Here",
        heading: "The World Is Waiting",
        text: "Somewhere out there is a sunrise you haven't seen, a trail you haven't walked, a horizon you haven't chased. Let WildVista take you there — thoughtfully, comfortably, unforgettably.",
        image:
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1600&auto=format&fit=crop",
    },
];

export default function About() {
    const introRef = useRef(null);
    const pinRef = useRef(null);
    const panelRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ---------- Intro heading: simple one-time fade-in, NOT pinned ----------
            gsap.from(introRef.current.children, {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: introRef.current,
                    start: "top 80%",
                    once: true,
                },
            });

            const panels = panelRefs.current;

            // ---------- Set starting positions ----------
            // Story 1 visible, all others waiting below (invisible)
            gsap.set(panels[0], { yPercent: 0, opacity: 1 });
            gsap.set(panels.slice(1), { yPercent: 15, opacity: 0 });

            // ---------- Master scrubbed timeline ----------
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: pinRef.current,
                    start: "top top",
                    // scroll distance = one full screen per transition (3 transitions for 4 stories)
                    end: `+=${(stories.length - 1) * 100}%`,
                    scrub: 1, // smooth "catch-up" scrubbing instead of 1:1 jumpiness
                    pin: true, // keeps section fixed while the story plays out
                    anticipatePin: 1,
                },
            });

            panels.forEach((panel, i) => {
                if (i === panels.length - 1) return; // last story has nothing to transition into
                const next = panels[i + 1];

                tl.to(
                    panel,
                    { yPercent: -15, opacity: 0, duration: 1, ease: "power2.inOut" },
                    i // each transition occupies one "unit" of the timeline, back to back
                ).fromTo(
                    next,
                    { yPercent: 15, opacity: 0 },
                    { yPercent: 0, opacity: 1, duration: 1, ease: "power2.inOut" },
                    i // starts at the same time as the fade-out above
                );
            });
        }, pinRef);

        return () => ctx.revert(); // cleans up timeline + ScrollTriggers on unmount
    }, []);

    return (
        <div className="bg-[#0A0A0A]">
            {/* ================= Intro Heading ================= */}
            <div
                ref={introRef}
                className="flex flex-col items-center text-center px-6 pt-28 pb-16 md:pt-36 md:pb-24"
            >
                <span className="text-sm md:text-base tracking-[0.3em] text-emerald-400 uppercase mb-5">
                    About WildVista
                </span>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight max-w-4xl leading-[1.1]">
                    Discover the Spirit of Adventure
                </h2>
            </div>

            {/* ================= Pinned Storytelling Section ================= */}
            <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
                {stories.map((story, i) => {
                    const imageFirst = i % 2 !== 0; // alternates layout: 0=text-left, 1=image-left, 2=text-left...

                    return (
                        <div
                            key={story.label}
                            ref={(el) => (panelRefs.current[i] = el)}
                            className="absolute inset-0 flex items-center px-6 md:px-16 lg:px-24"
                        >
                            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center w-full">
                                {/* ---- Image ---- */}
                                <div
                                    className={`relative rounded-3xl overflow-hidden shadow-2xl shadow-black/60 aspect-[16/10] md:aspect-[16/9] lg:aspect-[4/5] ${imageFirst ? "lg:order-1" : "lg:order-2"
                                        }`}
                                >
                                    <img
                                        src={story.image}
                                        alt={story.heading}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = "/images/hero.jpg";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                </div>

                                {/* ---- Text ---- */}
                                <div
                                    className={`flex flex-col items-start ${imageFirst ? "lg:order-2" : "lg:order-1"
                                        }`}
                                >
                                    <span className="text-xs md:text-sm tracking-[0.3em] text-emerald-400 uppercase mb-4">
                                        {story.label}
                                    </span>
                                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white leading-[1.15] tracking-tight mb-4 md:mb-6">
                                        {story.heading}
                                    </h3>
                                    <p className="text-sm md:text-lg text-white/70 leading-relaxed max-w-lg">
                                        {story.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}