import React from "react";

export default function PersonalInfo({ register, errors }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm">
          1
        </span>
        <div>
          <h2 className="text-xl font-bold text-white">Personal Information</h2>
          <p className="text-xs text-gray-400">Primary contact details for booking verification</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Full Name <span className="text-emerald-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Ali Khan"
            {...register("customer.name", {
              required: "Full Name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" },
            })}
            className={`w-full rounded-xl bg-white/5 border ${
              errors?.customer?.name ? "border-red-500 focus:ring-red-500" : "border-white/15 focus:border-emerald-500 focus:ring-emerald-500"
            } px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition`}
          />
          {errors?.customer?.name && (
            <p className="text-xs text-red-400 mt-1">⚠️ {errors.customer.name.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Phone Number <span className="text-emerald-400">*</span>
          </label>
          <input
            type="tel"
            placeholder="e.g. +92 300 1234567"
            {...register("customer.phone", {
              required: "Phone Number is required",
              pattern: {
                value: /^(\+92|0)?[0-9]{10}$/,
                message: "Enter a valid phone number (e.g. 03001234567 or +923001234567)",
              },
            })}
            className={`w-full rounded-xl bg-white/5 border ${
              errors?.customer?.phone ? "border-red-500 focus:ring-red-500" : "border-white/15 focus:border-emerald-500 focus:ring-emerald-500"
            } px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition`}
          />
          {errors?.customer?.phone && (
            <p className="text-xs text-red-400 mt-1">⚠️ {errors.customer.phone.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Email Address <span className="text-emerald-400">*</span>
          </label>
          <input
            type="email"
            placeholder="e.g. ali@example.com"
            {...register("customer.email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            className={`w-full rounded-xl bg-white/5 border ${
              errors?.customer?.email ? "border-red-500 focus:ring-red-500" : "border-white/15 focus:border-emerald-500 focus:ring-emerald-500"
            } px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition`}
          />
          {errors?.customer?.email && (
            <p className="text-xs text-red-400 mt-1">⚠️ {errors.customer.email.message}</p>
          )}
        </div>

        {/* Emergency Contact */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Emergency Contact Number <span className="text-emerald-400">*</span>
          </label>
          <input
            type="tel"
            placeholder="e.g. +92 321 9876543"
            {...register("customer.emergencyContact", {
              required: "Emergency contact is required",
              pattern: {
                value: /^(\+92|0)?[0-9]{10}$/,
                message: "Enter a valid phone number (e.g. 03219876543)",
              },
            })}
            className={`w-full rounded-xl bg-white/5 border ${
              errors?.customer?.emergencyContact ? "border-red-500 focus:ring-red-500" : "border-white/15 focus:border-emerald-500 focus:ring-emerald-500"
            } px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition`}
          />
          {errors?.customer?.emergencyContact && (
            <p className="text-xs text-red-400 mt-1">⚠️ {errors.customer.emergencyContact.message}</p>
          )}
        </div>

        {/* CNIC Number */}
        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            CNIC Number <span className="text-emerald-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 61101-1234567-8"
            {...register("customer.cnic", {
              required: "CNIC Number is required",
              pattern: {
                value: /^(\d{5}-\d{7}-\d{1})|([A-Za-z0-9]{7,15})$/,
                message: "Enter a valid CNIC (61101-1234567-8) or Passport",
              },
            })}
            className={`w-full rounded-xl bg-white/5 border ${
              errors?.customer?.cnic ? "border-red-500 focus:ring-red-500" : "border-white/15 focus:border-emerald-500 focus:ring-emerald-500"
            } px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition`}
          />
          {errors?.customer?.cnic && (
            <p className="text-xs text-red-400 mt-1">⚠️ {errors.customer.cnic.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
