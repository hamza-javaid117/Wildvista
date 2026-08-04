import React from "react";
import { PICKUP_CITIES } from "../consts/BookingOption";

export default function TourDetails({ tours = [], selectedTour, onTourChange, register, errors }) {
  const today = new Date().toISOString().split("T")[0];

  // Helper to format values
  const getAdultPriceVal = (t) => {
    return t?.pricing?.single ? t.pricing.single * 100 : 45000;
  };

  const getChildPriceVal = (t) => {
    return getAdultPriceVal(t) * 0.70;
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm">
          2
        </span>
        <div>
          <h2 className="text-xl font-bold text-white">Tour & Travel Details</h2>
          <p className="text-xs text-gray-400">Select your package and pick-up details</p>
        </div>
      </div>

      {/* Tour Selection Dropdown */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Select Tour Package <span className="text-emerald-400">*</span>
        </label>
        <select
          value={selectedTour?.slug || ""}
          onChange={(e) => onTourChange(e.target.value)}
          className="w-full rounded-xl bg-neutral-900 border border-white/15 focus:border-emerald-500 focus:ring-emerald-500 px-4 py-3 text-white focus:outline-none focus:ring-1 transition text-sm cursor-pointer"
        >
          {tours.map((t) => (
            <option key={t.slug} value={t.slug} className="bg-neutral-900 text-white">
              {t.hero?.title || t.title} ({t.hero?.duration || t.duration})
            </option>
          ))}
        </select>
      </div>

      {/* Dynamic Selected Tour Info Card */}
      {selectedTour && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                Selected Package Info
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">
                {selectedTour.hero?.title || selectedTour.title}
              </h3>
              <p className="text-sm text-gray-300 mt-1">
                📍 {selectedTour.hero?.location || selectedTour.location} · 🕒 {selectedTour.hero?.duration || selectedTour.duration}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs text-gray-400">Adult Price / Child Price</p>
              <p className="text-xl font-extrabold text-emerald-400">
                Rs. {getAdultPriceVal(selectedTour).toLocaleString()} / Rs. {getChildPriceVal(selectedTour).toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                (Child: Age &lt; 12 gets 30% off)
              </p>
            </div>
          </div>

          {/* Additional details: description, seats, hotels, pickup info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Description</p>
              <p className="text-xs text-gray-300 leading-relaxed">
                {selectedTour.description?.[0] || "No description available."}
              </p>
            </div>
            <div className="space-y-3 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Available Seats</p>
                <p className="text-sm font-bold text-emerald-400 mt-0.5">
                  🔥 Only {selectedTour.availableSeats || 10} seats remaining
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Included Hotel</p>
                <div className="mt-0.5 text-xs text-gray-300 space-y-1">
                  {selectedTour.hotelDetails?.map((hotel) => (
                    <div key={hotel.name}>
                      🏨 <span className="font-semibold text-white">{hotel.name}</span> ({hotel.roomType} · {hotel.nights} Nights)
                    </div>
                  )) || "Standard luxury hotel accommodation"}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Pickup / Departure Info</p>
                <p className="text-xs text-white mt-0.5">
                  🚌 Departs from <span className="font-semibold">{selectedTour.tourDetails?.departure || "Islamabad"}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Travel Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Travel Date <span className="text-emerald-400">*</span>
          </label>
          <input
            type="date"
            min={today}
            {...register("booking.travelDate", {
              required: "Travel Date is required",
            })}
            className={`w-full rounded-xl bg-white/5 border ${
              errors?.booking?.travelDate ? "border-red-500 focus:ring-red-500" : "border-white/15 focus:border-emerald-500 focus:ring-emerald-500"
            } px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition text-sm`}
          />
          {errors?.booking?.travelDate && (
            <p className="text-xs text-red-400 mt-1">⚠️ {errors.booking.travelDate.message}</p>
          )}
        </div>

        {/* Pickup City */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Pickup City <span className="text-emerald-400">*</span>
          </label>
          <select
            {...register("booking.pickupCity", {
              required: "Pickup City is required",
            })}
            className={`w-full rounded-xl bg-neutral-900 border ${
              errors?.booking?.pickupCity ? "border-red-500 focus:ring-red-500" : "border-white/15 focus:border-emerald-500 focus:ring-emerald-500"
            } px-4 py-3 text-white focus:outline-none focus:ring-1 transition text-sm cursor-pointer`}
          >
            {PICKUP_CITIES.map((city) => (
              <option key={city} value={city} className="bg-neutral-900 text-white">
                {city}
              </option>
            ))}
          </select>
          {errors?.booking?.pickupCity && (
            <p className="text-xs text-red-400 mt-1">⚠️ {errors.booking.pickupCity.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
