import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingForm from "../components/BookingForm";
import { tours } from "../consts/TourDetails";

export default function BookForm() {
  const location = useLocation();

  // Pick tour passed via navigation state, or fallback to first tour in data
  const passedTour = location.state?.tour;
  const defaultTour = tours && tours.length > 0 ? tours[0] : {
    id: "123",
    title: "Hunza Valley Adventure",
    price: 45000,
    duration: "5 Days",
    location: "Hunza, Gilgit-Baltistan",
  };

  const selectedTour = passedTour || {
    id: defaultTour.slug || "123",
    title: defaultTour.hero?.title || defaultTour.title || "Hunza Valley Adventure",
    price: defaultTour.pricing?.single ? defaultTour.pricing.single * 100 : 45000,
    duration: defaultTour.hero?.duration || defaultTour.duration || "5 Days",
    location: defaultTour.hero?.location || defaultTour.location || "Hunza, Gilgit-Baltistan",
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      <Navbar />

      <main className="pt-24 pb-16 flex-grow">
        <BookingForm tour={selectedTour} />
      </main>

      <Footer />
    </div>
  );
}