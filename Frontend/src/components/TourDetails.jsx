import React from "react";
import { PICKUP_CITIES } from "../consts/BookingOption";

export default function TourDetails({ tour, register, errors }) {
  // Today's date YYYY-MM-DD for min date
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm">
          2
        </span>
        <div>
          <h2 className="text-xl font-bold text-white">Tour & Travel Details</h2>
          <p className="text-xs text-gray-400">Selected package info and trip schedule</p>
        </div>
      </div>

      {/* Read-Only Selected Tour Info Card */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            Selected Tour Package
          </span>
          <h3 className="text-2xl font-bold text-white mt-2">
            {tour?.title || tour?.hero?.title || "Hunza Valley Adventure"}
          </h3>
          <p className="text-sm text-gray-300 mt-1">
            📍 {tour?.location || tour?.hero?.location || "Hunza, Gilgit-Baltistan"} · 🕒 {tour?.duration || tour?.hero?.duration || "5 Days"}
          </p>
        </div>
        <div className="text-left sm:text-right border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
          <p className="text-xs text-gray-400">Base Price / Person</p>
          <p className="text-2xl font-extrabold text-emerald-400">
            Rs. {(tour?.price || tour?.pricing?.single || 45000).toLocaleString()}
          </p>
        </div>
      </div>

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
            } px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition`}
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
            } px-4 py-3 text-white focus:outline-none focus:ring-1 transition`}
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

        {/* Adults Count */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Adults (12+ yrs) <span className="text-emerald-400">*</span>
          </label>
          <input
            type="number"
            min="1"
            max="20"
            {...register("booking.adults", {
              required: "At least 1 adult is required",
              min: { value: 1, message: "Minimum 1 adult required" },
              valueAsNumber: true,
            })}
            className={`w-full rounded-xl bg-white/5 border ${
              errors?.booking?.adults ? "border-red-500 focus:ring-red-500" : "border-white/15 focus:border-emerald-500 focus:ring-emerald-500"
            } px-4 py-3 text-white focus:outline-none focus:ring-1 transition`}
          />
          {errors?.booking?.adults && (
            <p className="text-xs text-red-400 mt-1">⚠️ {errors.booking.adults.message}</p>
          )}
        </div>

        {/* Children & Infants */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Children (2-11 yrs)</label>
            <input
              type="number"
              min="0"
              max="10"
              {...register("booking.children", { valueAsNumber: true })}
              className="w-full rounded-xl bg-white/5 border border-white/15 focus:border-emerald-500 focus:ring-emerald-500 px-4 py-3 text-white focus:outline-none focus:ring-1 transition"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Infants (&lt;2 yrs)</label>
            <input
              type="number"
              min="0"
              max="5"
              {...register("booking.infants", { valueAsNumber: true })}
              className="w-full rounded-xl bg-white/5 border border-white/15 focus:border-emerald-500 focus:ring-emerald-500 px-4 py-3 text-white focus:outline-none focus:ring-1 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
