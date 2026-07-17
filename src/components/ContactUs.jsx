import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ===== dropdown options — edit freely =====
const destinations = [
    "Hunza Valley",
    "Skardu",
    "Fairy Meadows",
    "Naran Kaghan",
    "Swat Valley",
    "Other / Not Sure Yet",
];

// ===== contact info cards data =====
const contactInfo = [
    {
        icon: "📍",
        label: "Office",
        value: "Lahore, Pakistan",
    },
    {
        icon: "📞",
        label: "Phone",
        value: "+92 XXX XXXXXXX",
    },
    {
        icon: "✉",
        label: "Email",
        value: "hello@wildvista.com",
    },
    {
        icon: "🕒",
        label: "Working Hours",
        value: "Mon - Sat, 9:00 AM - 7:00 PM",
    },
];

// ===== reusable floating input component =====
const FloatingInput = ({ fieldRef, label, name, type = "text", value, onChange }) => (
    <div ref={fieldRef} className="relative">
        <input
            type={type === "date" && !value ? "text" : type}
            onFocus={(e) => {
                if (type === "date") e.target.type = "date";
            }}
            onBlur={(e) => {
                if (type === "date" && !e.target.value) e.target.type = "text";
            }}
            name={name}
            value={value}
            onChange={onChange}
            placeholder=" "
            className="peer w-full rounded-2xl bg-white/5 border border-white/15 text-white px-4 pt-5 pb-2 focus:outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all"
        />
        <label className="pointer-events-none absolute left-4 top-2 text-xs text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-400 transition-all">
            {label}
        </label>
    </div>
);

export default function Contact() {
    const sectionRef = useRef(null);
    const labelRef = useRef(null);
    const infoHeadingRef = useRef(null);
    const infoTextRef = useRef(null);
    const cardRefs = useRef([]);
    const formRef = useRef(null);
    const fieldRefs = useRef([]);
    const buttonRef = useRef(null);
    const blobRefs = useRef([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        destination: "",
        date: "",
        travelers: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 👉 hook up your backend/email service here
        console.log("Inquiry submitted:", formData);
    };

    // ===== entrance animation on scroll =====
    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });

            tl.from(labelRef.current, { opacity: 0, y: 30, duration: 0.6, ease: "power2.out" })
                .from(infoHeadingRef.current, { opacity: 0, y: 40, duration: 0.7, ease: "power2.out" }, "-=0.3")
                .from(infoTextRef.current, { opacity: 0, y: 30, duration: 0.6, ease: "power2.out" }, "-=0.4")
                .from(
                    cardRefs.current,
                    { opacity: 0, x: -60, duration: 0.7, ease: "power2.out", stagger: 0.15 },
                    "-=0.3"
                )
                .from(
                    formRef.current,
                    { opacity: 0, x: 60, duration: 0.8, ease: "power2.out" },
                    "-=0.9"
                )
                .from(
                    fieldRefs.current,
                    { opacity: 0, y: 20, duration: 0.5, ease: "power2.out", stagger: 0.08 },
                    "-=0.5"
                )
                .from(buttonRef.current, { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" }, "-=0.1");

            // ===== slow floating drift for background glow blobs =====
            blobRefs.current.forEach((blob, i) => {
                if (blob) {
                    gsap.to(blob, {
                        x: i % 2 === 0 ? 40 : -40,
                        y: i % 2 === 0 ? -30 : 30,
                        duration: 8 + i,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#0A0A0A] overflow-hidden py-24 px-6"
        >
            {/* ===== floating glow blobs (background ambience) ===== */}
            <div
                ref={(el) => (blobRefs.current[0] = el)}
                className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
            />
            <div
                ref={(el) => (blobRefs.current[1] = el)}
                className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"
            />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* ===== section label ===== */}
                <p
                    ref={labelRef}
                    className="uppercase tracking-[0.2em] text-emerald-400 text-xs sm:text-sm font-medium mb-4 text-center lg:text-left"
                >
                    Contact Us
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* ================= LEFT: INFO PANEL ================= */}
                    <div>
                        <h2
                            ref={infoHeadingRef}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
                        >
                            Let's Talk About Your Next Trip
                        </h2>
                        <p ref={infoTextRef} className="text-gray-400 text-base sm:text-lg mb-10 max-w-md">
                            We'd love to hear about your travel plans and help you create an
                            unforgettable experience.
                        </p>

                        <div className="space-y-5">
                            {contactInfo.map((item, i) => (
                                <div
                                    key={i}
                                    ref={(el) => (cardRefs.current[i] = el)}
                                    className="group flex items-center gap-5 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:shadow-lg hover:shadow-emerald-500/10"
                                >
                                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-emerald-500/10 text-xl border border-emerald-400/20 transition-transform duration-300 group-hover:scale-110">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                                            {item.label}
                                        </p>
                                        <p className="text-white font-medium">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ================= RIGHT: CONTACT FORM ================= */}
                    <div
                        ref={formRef}
                        className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10 shadow-2xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FloatingInput
                                    fieldRef={(el) => (fieldRefs.current[0] = el)}
                                    label="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <FloatingInput
                                    fieldRef={(el) => (fieldRefs.current[1] = el)}
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FloatingInput
                                    fieldRef={(el) => (fieldRefs.current[2] = el)}
                                    label="Phone Number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />

                                {/* Destination dropdown */}
                                <div ref={(el) => (fieldRefs.current[3] = el)} className="relative">
                                    <select
                                        name="destination"
                                        value={formData.destination}
                                        onChange={handleChange}
                                        className="peer w-full appearance-none rounded-2xl bg-white/5 border border-white/15 text-white px-4 pt-5 pb-2 focus:outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                                    >
                                        <option value="" disabled hidden></option>
                                        {destinations.map((d) => (
                                            <option key={d} value={d} className="bg-[#0A0A0A]">
                                                {d}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="pointer-events-none absolute left-4 top-2 text-xs text-gray-400 peer-focus:text-emerald-400 transition-all">
                                        Destination Interested In
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FloatingInput
                                    fieldRef={(el) => (fieldRefs.current[4] = el)}
                                    label="Travel Date"
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                                <FloatingInput
                                    fieldRef={(el) => (fieldRefs.current[5] = el)}
                                    label="Number of Travelers"
                                    name="travelers"
                                    type="number"
                                    value={formData.travelers}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Message textarea */}
                            <div ref={(el) => (fieldRefs.current[6] = el)} className="relative">
                                <textarea
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder=" "
                                    className="peer w-full resize-none rounded-2xl bg-white/5 border border-white/15 text-white px-4 pt-5 pb-2 focus:outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                                />
                                <label className="pointer-events-none absolute left-4 top-2 text-xs text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-400 transition-all">
                                    Tell us about your dream trip
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                ref={buttonRef}
                                type="submit"
                                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-medium py-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/25"
                            >
                                Send Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}