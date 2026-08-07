import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tours, getPriceInPKR } from "../consts/TourDetails";
import { getTourBySlug } from "../consts/TourDetails";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// ===== shared framer-motion variants =====
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function TourDetails() {
  const { slug } = useParams();
  const tour = getTourBySlug(slug);

  const heroRef = useRef(null);
  const heroImageRef = useRef(null);
  const titleRef = useRef(null);
  const locationRef = useRef(null);
  const descRef = useRef(null);

  const [lightboxImage, setLightboxImage] = useState(null);

  // ===== hero entrance + parallax (GSAP) =====
  useEffect(() => {
    if (!tour) return;

    const tl = gsap.timeline({ delay: 0.2 });
    tl.from(titleRef.current, { opacity: 0, y: 40, duration: 0.9, ease: "power2.out" })
      .from(locationRef.current, { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .from(descRef.current, { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" }, "-=0.3");

    gsap.to(heroImageRef.current, {
      yPercent: -18,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [tour]);

  // ===== tour not found (invalid slug) =====
  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
        <p className="text-lg text-gray-400">Sorry, we couldn't find that tour.</p>
      </div>
    );
  }

  return (

    <>
      <Navbar />

      <div className="bg-[#0A0A0A] text-white">
        {/* ==================== 1. HERO ==================== */}
        <section ref={heroRef} className="relative h-screen overflow-hidden flex items-end">
          <img
            ref={heroImageRef}
            src={tour.hero.coverImage}
            alt={tour.hero.title}
            className="absolute inset-0 w-full h-[120%] object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              if (tour.hero.coverImage.includes(" ")) {
                e.currentTarget.src = tour.hero.coverImage.replace(/ /g, "%20");
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-40">
            <p ref={locationRef} className="text-emerald-400 text-sm uppercase tracking-[0.2em] mb-4">
              📍 {tour.hero.location}
            </p>
            <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight max-w-3xl">
              {tour.hero.title}
            </h1>
            <p ref={descRef} className="text-gray-300 text-base sm:text-lg max-w-2xl mb-8">
              {tour.hero.shortDescription} · {tour.hero.duration}
            </p>

            <Link to="/BookForm" state={{ slug: tour.slug }}>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ y: -3, boxShadow: "0 0 30px rgba(16,185,129,0.4)" }}
                className="rounded-full bg-emerald-500 text-black font-semibold px-8 py-3.5"
              >
                Book Your Event →
              </motion.button>
            </Link>
          </div>

          {/* floating glass price cards */}
          <div className="absolute z-10 right-6 sm:right-12 bottom-10 flex flex-col sm:flex-row gap-4">
            <PriceCard label="Single Person" price={getPriceInPKR(tour.pricing.single)} delay={0.3} />
            <PriceCard label="Couple" price={getPriceInPKR(tour.pricing.couple)} delay={0.5} />
          </div>

          {/* scroll indicator */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-gray-300"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            ⌄
          </motion.div>
        </section>

        {/* ==================== 2. TOUR DETAILS ==================== */}
        <Section title="Tour Details">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <InfoCard icon="🕒" label="Duration" value={tour.tourDetails.duration} index={0} />
            <InfoCard icon="📍" label="Location" value={tour.tourDetails.location} index={1} />
            <InfoCard icon="🛫" label="Departure" value={tour.tourDetails.departure} index={2} />
            <InfoCard icon="🚙" label="Transport" value={tour.tourDetails.transport} index={3} />
            <InfoCard icon="👥" label="Group Size" value={tour.tourDetails.groupSize} index={4} />
            <InfoCard icon="☀️" label="Best Season" value={tour.tourDetails.bestSeason} index={5} />
          </div>
        </Section>

        {/* ==================== 3. HOTEL DETAILS ==================== */}
        <Section title="Where You'll Stay">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tour.hotelDetails.map((hotel, i) => (
              <motion.div
                key={hotel.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <h3 className="text-xl font-semibold mb-1">{hotel.name}</h3>
                <p className="text-emerald-400 text-sm mb-4">
                  {hotel.roomType} · {hotel.nights} Nights
                </p>
                <div className="flex flex-wrap gap-2">
                  {hotel.facilities.map((f) => (
                    <span
                      key={f}
                      className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-gray-300"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ==================== 4. SPECIAL FEATURES ==================== */}
        <Section title="Special About This Tour">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            {tour.specialFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <p className="text-sm text-gray-300">{feature.title}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ==================== 5. GALLERY ==================== */}
        <Section title="Gallery">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tour.gallery.map((img, i) => (
              <motion.div
                key={img + i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                onClick={() => setLightboxImage(img)}
                className="relative rounded-2xl overflow-hidden cursor-pointer h-48 sm:h-56"
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    if (img.includes(" ")) {
                      e.currentTarget.src = img.replace(/ /g, "%20");
                    }
                  }}
                />
              </motion.div>
            ))}
          </div>
        </Section>

        {/* lightbox */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
            >
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={lightboxImage}
                alt=""
                className="max-w-full max-h-full rounded-2xl"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ==================== 6. DESCRIPTION ==================== */}
        <Section title="The Story">
          <div className="max-w-3xl space-y-6">
            {tour.description.map((para, i) => (
              <motion.p
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="text-gray-300 text-base sm:text-lg leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </Section>

        {/* ==================== 7. BOOKING CTA ==================== */}
        <section className="relative py-24 px-6 text-center overflow-hidden">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
              Ready for your next adventure?
            </h2>
            <Link to="/BookForm" state={{ slug: tour.slug }}>
              <motion.button
                type="button"
                whileHover={{ y: -3, boxShadow: "0 0 30px rgba(16,185,129,0.5)" }}
                className="rounded-full bg-emerald-500 text-black font-semibold px-10 py-4"
              >
                Book Your Event →
              </motion.button>
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  );
}

// ===== reusable subcomponents =====

function Section({ title, children }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-bold mb-10"
      >
        {title}
      </motion.h2>
      {children}
    </section>
  );
}

function PriceCard({ label, price, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl px-6 py-4 min-w-[150px]"
    >
      <p className="text-xs uppercase tracking-wide text-gray-300 mb-1">{label}</p>
      <p className="text-2xl font-bold text-emerald-400">PKR {price}</p>
    </motion.div>
  );
}

function InfoCard({ icon, label, value, index }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
    >
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </motion.div>
  );
}