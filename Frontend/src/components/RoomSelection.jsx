import React from "react";
import { ROOM_OPTIONS } from "../consts/BookingOption";

export default function RoomSelection({ register, watch, errors }) {
  const selectedRoom = watch("roomType");

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm">
          4
        </span>
        <div>
          <h2 className="text-xl font-bold text-white">Room Selection</h2>
          <p className="text-xs text-gray-400">Choose accommodation type for your stay</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ROOM_OPTIONS.map((room) => {
          const isSelected = selectedRoom === room.value;
          return (
            <label
              key={room.value}
              className={`relative flex flex-col justify-between p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-white text-base">{room.label}</h3>
                  <p className="text-xs text-gray-400 mt-1">{room.description}</p>
                </div>
                <input
                  type="radio"
                  value={room.value}
                  {...register("roomType", { required: "Please select a room type" })}
                  className="accent-emerald-500 w-4 h-4 mt-1"
                />
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">Additional Cost</span>
                <span className={`text-sm font-bold ${room.price === 0 ? "text-gray-400" : "text-emerald-400"}`}>
                  {room.price === 0 ? "Included (+Rs. 0)" : `+Rs. ${room.price.toLocaleString()}`}
                </span>
              </div>
            </label>
          );
        })}
      </div>

      {errors?.roomType && (
        <p className="text-xs text-red-400 mt-2">⚠️ {errors.roomType.message}</p>
      )}
    </div>
  );
}
