import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingForm from "../components/BookingForm";
import { tours, getTourBySlug } from "../consts/TourDetails";

export default function BookForm() {
  const location = useLocation();

  const passedSlug = location.state?.slug;
  const initialTour = passedSlug ? getTourBySlug(passedSlug) : (tours && tours.length > 0 ? tours[0] : null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      <Navbar />

      <main className="pt-24 pb-16 flex-grow">
        <BookingForm tours={tours} initialTour={initialTour} />
      </main>

      <Footer />
    </div>
  );
}