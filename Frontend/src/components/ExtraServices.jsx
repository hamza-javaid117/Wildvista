import React from "react";
import { EXTRA_SERVICES } from "../consts/BookingOption";

export default function ExtraServices({ register, watch }) {
  const selectedExtras = watch("extras") || [];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm">
          5
        </span>
        <div>
          <h2 className="text-xl font-bold text-white">Extra Services & Experiences</h2>
          <p className="text-xs text-gray-400">Optional add-ons to customize your journey</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {EXTRA_SERVICES.map((extra) => {
          const isChecked = Array.isArray(selectedExtras) && selectedExtras.includes(extra.value);
          return (
            <label
              key={extra.value}
              className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                isChecked
                  ? "border-emerald-500 bg-emerald-500/10 shadow-md shadow-emerald-500/5"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">{extra.icon}</span>
                <div>
                  <h3 className="font-semibold text-white text-sm">{extra.label}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{extra.description}</p>
                  <p className="text-xs font-bold text-emerald-400 mt-2">
                    +Rs. {extra.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                value={extra.value}
                {...register("extras")}
                className="accent-emerald-500 w-4 h-4 mt-1 rounded focus:ring-emerald-500"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
