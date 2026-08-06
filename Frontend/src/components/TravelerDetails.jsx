import React from "react";
import { useFieldArray } from "react-hook-form";

export default function TravelerDetails({ register, control, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "travelers",
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm">
            3
          </span>
          <div>
            <h2 className="text-xl font-bold text-white">Traveler Details</h2>
            <p className="text-xs text-gray-400">
              Provide details for all travelers. Price adjusts dynamically by age.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => {
          const travelerErr = errors?.travelers?.[index];
          return (
            <div
              key={field.id}
              className="relative rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-4 hover:border-emerald-500/30 transition duration-300 animate-fadeIn"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-emerald-400 flex items-center gap-2">
                  👤 Traveler {index + 1}
                  {index === 0 && (
                    <span className="text-[10px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-normal px-2 py-0.5 rounded-full">
                      Primary Contact
                    </span>
                  )}
                </h3>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-xs text-rose-400 hover:text-rose-300 font-medium transition cursor-pointer"
                  >
                    Remove Traveler
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-300">
                    Full Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="As on CNIC/Passport"
                    {...register(`travelers.${index}.name`, {
                      required: "Name is required",
                      minLength: { value: 3, message: "Min 3 characters" },
                    })}
                    className={`w-full rounded-xl bg-white/5 border ${
                      travelerErr?.name ? "border-red-500 focus:ring-red-500" : "border-white/15 focus:border-emerald-500 focus:ring-emerald-500"
                    } px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition`}
                  />
                  {travelerErr?.name && (
                    <p className="text-[11px] text-red-400 mt-1">⚠️ {travelerErr.name.message}</p>
                  )}
                </div>

                {/* CNIC / Passport */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-300">
                    CNIC / Passport <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 61101-1234567-8"
                    {...register(`travelers.${index}.cnic`, {
                      required: "CNIC/Passport is required",
                      pattern: {
                        value: /^(\d{5}-\d{7}-\d{1})|([A-Za-z0-9]{7,15})$/,
                        message: "Enter a valid CNIC (61101-1234567-8) or Passport",
                      },
                    })}
                    className={`w-full rounded-xl bg-white/5 border ${
                      travelerErr?.cnic ? "border-red-500 focus:ring-red-500" : "border-white/15 focus:border-emerald-500 focus:ring-emerald-500"
                    } px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition`}
                  />
                  {travelerErr?.cnic && (
                    <p className="text-[11px] text-red-400 mt-1">⚠️ {travelerErr.cnic.message}</p>
                  )}
                </div>

                {/* Age */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-300">
                    Age <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    placeholder="Age"
                    {...register(`travelers.${index}.age`, {
                      required: "Age is required",
                      min: { value: 1, message: "Invalid age" },
                      valueAsNumber: true,
                    })}
                    className={`w-full rounded-xl bg-white/5 border ${
                      travelerErr?.age ? "border-red-500 focus:ring-red-500" : "border-white/15 focus:border-emerald-500 focus:ring-emerald-500"
                    } px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition`}
                  />
                  {travelerErr?.age && (
                    <p className="text-[11px] text-red-400 mt-1">⚠️ {travelerErr.age.message}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-300">
                    Phone Number <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 03001234567"
                    {...register(`travelers.${index}.phone`, {
                      required: "Phone is required",
                      pattern: {
                        value: /^(\+92|0)?[0-9]{10}$/,
                        message: "Enter a valid phone number",
                      },
                    })}
                    className={`w-full rounded-xl bg-white/5 border ${
                      travelerErr?.phone ? "border-red-500 focus:ring-red-500" : "border-white/15 focus:border-emerald-500 focus:ring-emerald-500"
                    } px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition`}
                  />
                  {travelerErr?.phone && (
                    <p className="text-[11px] text-red-400 mt-1">⚠️ {travelerErr.phone.message}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. email@domain.com"
                    {...register(`travelers.${index}.email`, {
                      validate: (value) =>
                        !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Enter a valid email",
                    })}
                    className={`w-full rounded-xl bg-white/5 border ${
                      travelerErr?.email ? "border-red-500 focus:ring-red-500" : "border-white/15 focus:border-emerald-500 focus:ring-emerald-500"
                    } px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition`}
                  />
                  {travelerErr?.email && (
                    <p className="text-[11px] text-red-400 mt-1">⚠️ {travelerErr.email.message}</p>
                  )}
                </div>

                {/* Gender */}
                <div className="space-y-1.5 flex flex-col justify-center">
                  <label className="block text-xs font-medium text-gray-300 mb-1">Gender</label>
                  <div className="flex gap-4">
                    {["Male", "Female", "Other"].map((g) => (
                      <label
                        key={g}
                        className="flex items-center gap-1.5 cursor-pointer text-xs text-gray-300 hover:text-white"
                      >
                        <input
                          type="radio"
                          value={g}
                          defaultChecked={g === "Male"}
                          {...register(`travelers.${index}.gender`)}
                          className="accent-emerald-500 focus:ring-emerald-500"
                        />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => append({ name: "", cnic: "", phone: "", email: "", gender: "Male", age: "" })}
        className="w-full py-3.5 rounded-xl border border-dashed border-emerald-500/30 hover:border-emerald-500 text-emerald-400 hover:text-emerald-300 font-semibold text-sm transition cursor-pointer flex items-center justify-center gap-2 bg-emerald-500/5 hover:bg-emerald-500/10"
      >
        ➕ Add Another Traveler
      </button>
    </div>
  );
}
