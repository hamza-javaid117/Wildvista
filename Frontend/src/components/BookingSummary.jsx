import React from "react";
import { ROOM_OPTIONS, EXTRA_SERVICES } from "../consts/BookingOption";

export default function BookingSummary({ tour, watchedValues, calculatedPrice, isSubmitting }) {
  const { booking = {}, roomType = "single", extras = [] } = watchedValues || {};

  const basePrice = Number(tour?.price || tour?.pricing?.single || 45000);
  const adults = Number(booking.adults) || 1;

  // Selected Room Details
  const selectedRoomObj = ROOM_OPTIONS.find((r) => r.value === roomType) || ROOM_OPTIONS[0];

  // Selected Extras List
  const selectedExtrasList = EXTRA_SERVICES.filter((e) => Array.isArray(extras) && extras.includes(e.value));

  return (
    <div className="lg:sticky lg:top-24 rounded-2xl border border-white/15 bg-neutral-900/80 backdrop-blur-2xl p-6 sm:p-7 shadow-2xl space-y-6">
      {/* Summary Header */}
      <div className="border-b border-white/10 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Booking Summary</h2>
          <p className="text-xs text-gray-400">Instant price estimate preview</p>
        </div>
        <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full">
          Live Estimate
        </span>
      </div>

      {/* Tour Title & Duration */}
      <div className="space-y-1">
        <p className="text-xs text-gray-400 uppercase tracking-wider">Tour Package</p>
        <p className="text-lg font-bold text-white">
          {tour?.title || tour?.hero?.title || "Hunza Valley Adventure"}
        </p>
        <p className="text-xs text-emerald-400">
          📍 {tour?.location || tour?.hero?.location || "Hunza"} · 🕒 {tour?.duration || tour?.hero?.duration || "5 Days"}
        </p>
      </div>

      {/* Trip Details List */}
      <div className="space-y-3 text-xs border-t border-b border-white/10 py-4">
        <div className="flex justify-between text-gray-300">
          <span className="text-gray-400">Travel Date:</span>
          <span className="font-medium text-white">{booking.travelDate || "Not selected"}</span>
        </div>

        <div className="flex justify-between text-gray-300">
          <span className="text-gray-400">Pickup City:</span>
          <span className="font-medium text-white">{booking.pickupCity || "Islamabad"}</span>
        </div>

        <div className="flex justify-between text-gray-300">
          <span className="text-gray-400">Travelers:</span>
          <span className="font-medium text-white">
            {adults} Adult{adults > 1 ? "s" : ""}
            {Number(booking.children) > 0 ? `, ${booking.children} Child` : ""}
            {Number(booking.infants) > 0 ? `, ${booking.infants} Infant` : ""}
          </span>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-2.5 text-xs">
        <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
          Cost Breakdown
        </p>

        {/* Base Price */}
        <div className="flex justify-between text-gray-300">
          <span>Tour ({adults} x Rs. {basePrice.toLocaleString()})</span>
          <span className="font-medium text-white">Rs. {calculatedPrice?.tourTotal?.toLocaleString() || 0}</span>
        </div>

        {/* Room Price */}
        <div className="flex justify-between text-gray-300">
          <span>Room ({selectedRoomObj.label})</span>
          <span className="font-medium text-white">
            {selectedRoomObj.price === 0 ? "Free" : `+Rs. ${selectedRoomObj.price.toLocaleString()}`}
          </span>
        </div>

        {/* Extra Services Breakdown */}
        {selectedExtrasList.length > 0 ? (
          <div className="space-y-1 pt-1">
            <span className="text-gray-400 block font-medium">Selected Extras:</span>
            {selectedExtrasList.map((extra) => (
              <div key={extra.value} className="flex justify-between text-[11px] text-gray-300 pl-2">
                <span>• {extra.label}</span>
                <span className="text-emerald-400">+Rs. {extra.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-between text-gray-400 text-[11px]">
            <span>Extra Services</span>
            <span>None selected</span>
          </div>
        )}
      </div>

      {/* Total Estimated Price Display */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-300">Estimated Total</span>
          <span className="text-2xl font-black text-emerald-400">
            Rs. {(calculatedPrice?.total || 0).toLocaleString()}
          </span>
        </div>
        <p className="text-[10px] text-gray-400 text-center pt-1 border-t border-emerald-500/20">
          🔒 Preview only. Final total will be verified by server.
        </p>
      </div>

      {/* Form Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-extrabold text-base py-4 shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin border-2 border-black border-t-transparent rounded-full w-5 h-5"></span>
            Processing Booking...
          </>
        ) : (
          <>Confirm & Book Tour →</>
        )}
      </button>
    </div>
  );
}
