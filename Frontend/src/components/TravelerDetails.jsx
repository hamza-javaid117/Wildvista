import React from "react";

export default function TravelerDetails({ adultsCount = 1, register, errors }) {
  const count = Math.max(1, Number(adultsCount) || 1);
  const travelersList = Array.from({ length: count }, (_, index) => index);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm">
          3
        </span>
        <div>
          <h2 className="text-xl font-bold text-white">Traveler Details</h2>
          <p className="text-xs text-gray-400">
            Provide details for all {count} adult traveler{count > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {travelersList.map((index) => {
          const travelerErr = errors?.travelers?.[index];
          return (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-4 hover:border-emerald-500/30 transition duration-300"
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-xs font-medium text-gray-300">
                    Full Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Full name as on CNIC/Passport"
                    {...register(`travelers.${index}.name`, {
                      required: `Traveler ${index + 1} name is required`,
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
                    placeholder="13-digit CNIC or Passport"
                    {...register(`travelers.${index}.cnic`, {
                      required: `Traveler ${index + 1} CNIC is required`,
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
                    placeholder="e.g. 28"
                    {...register(`travelers.${index}.age`, {
                      required: `Traveler ${index + 1} age is required`,
                      min: { value: 1, message: "Age must be valid" },
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

                {/* Gender */}
                <div className="sm:col-span-2 md:col-span-4 space-y-1.5">
                  <label className="block text-xs font-medium text-gray-300">Gender</label>
                  <div className="flex gap-4">
                    {["Male", "Female", "Other"].map((g) => (
                      <label
                        key={g}
                        className="flex items-center gap-2 cursor-pointer text-xs text-gray-300 hover:text-white"
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
    </div>
  );
}
