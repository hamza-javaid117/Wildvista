import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PersonalInfo from "./PersonalInfo";
import TourDetails from "./TourDetails";
import TravelerDetails from "./TravelerDetails";
import RoomSelection from "./RoomSelection";
import ExtraServices from "./ExtraServices";
import BookingSummary from "./BookingSummary";
import useBookingPrice from "../hooks/useBookingPrice";
import { ROOM_OPTIONS, EXTRA_SERVICES } from "../consts/BookingOption";
import { registerUser, loginUser as loginAuthUser } from "../api/authApi";
import { AUTH_STORAGE_KEY, USER_STORAGE_KEY } from "../utils/auth";

export default function BookingForm({ tour }) {
  const navigate = useNavigate();

  const defaultTour = tour || {
    id: "hunza-123",
    title: "Hunza Valley Adventure",
    price: 45000,
    duration: "5 Days",
    location: "Hunza, Gilgit-Baltistan",
  };

  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      customer: {
        name: "",
        phone: "",
        email: "",
        emergencyContact: "",
        cnic: "",
        password: "",
      },
      booking: {
        travelDate: "",
        pickupCity: "Islamabad",
        adults: 1,
        children: 0,
        infants: 0,
      },
      travelers: [
        { name: "", cnic: "", age: "", gender: "Male" },
      ],
      roomType: "single",
      extras: [],
      specialRequest: "",
    },
  });

  // Watch form values for dynamic calculation and preview
  const watchedValues = watch();
  const adults = watchedValues.booking?.adults || 1;
  const roomType = watchedValues.roomType || "single";
  const extras = watchedValues.extras || [];

  // Get selected room price
  const selectedRoomObj = ROOM_OPTIONS.find((r) => r.value === roomType);
  const roomPrice = selectedRoomObj ? selectedRoomObj.price : 0;

  // Calculate sum of selected extra services
  const extrasTotal = EXTRA_SERVICES.filter((e) =>
    Array.isArray(extras) && extras.includes(e.value)
  ).reduce((acc, curr) => acc + curr.price, 0);

  // Price Calculation Hook
  const calculatedPrice = useBookingPrice({
    basePrice: defaultTour.price || defaultTour.pricing?.single || 45000,
    adults,
    roomPrice,
    extrasTotal,
  });

  // Submit Handler
  const onSubmit = async (data) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    const registrationPayload = {
      name: data.customer.name,
      phone: data.customer.phone,
      cnic: data.customer.cnic,
      email: data.customer.email || "",
      password: data.customer.password,
    };

    try {
      const registerResponse = await registerUser(registrationPayload);

      if (!registerResponse?.success) {
        throw new Error(registerResponse?.message || "Registration failed.");
      }

      const loginPayload = {
        password: data.customer.password,
        ...(data.customer.cnic ? { cnic: data.customer.cnic } : {}),
        ...(data.customer.email ? { email: data.customer.email } : {}),
      };

      const loginResponse = await loginAuthUser(loginPayload);

      if (!loginResponse?.success) {
        throw new Error(loginResponse?.message || "Login failed.");
      }

      const token = loginResponse?.token || loginResponse?.data?.token || null;
      const user = loginResponse?.user || loginResponse?.data?.user || null;

      if (token) {
        localStorage.setItem(AUTH_STORAGE_KEY, token);
      }

      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      }

      setSubmitSuccess({
        message: "Registration and login successful. Redirecting to your profile...",
        data: {
          register: registerResponse,
          login: loginResponse,
        },
      });

      navigate("/profile", { replace: true });
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong.";
      setSubmitError(errorMessage);
      setSubmitSuccess(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Title Header */}
      <div className="mb-10 text-center sm:text-left space-y-2">
        <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          WildVista Luxury Travel
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
          Book Your Next Adventure
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl">
          Complete the form below to reserve your spot for{" "}
          <span className="text-emerald-400 font-semibold">
            {defaultTour.title || defaultTour.hero?.title || "Hunza Valley Adventure"}
          </span>
        </p>
      </div>

      {/* Success Notification Modal */}
      {submitSuccess && (
        <div className="mb-8 rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-6 backdrop-blur-xl text-white space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <h3 className="text-lg font-bold text-emerald-400">{submitSuccess.message}</h3>
          </div>
          <div className="bg-black/50 p-4 rounded-xl text-xs font-mono overflow-x-auto text-emerald-200">
            <pre>{JSON.stringify(submitSuccess.data, null, 2)}</pre>
          </div>
        </div>
      )}

      {/* Error Notification Modal */}
      {submitError && (
        <div className="mb-8 rounded-2xl border border-rose-500/40 bg-rose-950/40 p-6 backdrop-blur-xl text-white space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <h3 className="text-lg font-bold text-rose-400">Registration failed</h3>
          </div>
          <p className="text-sm text-rose-100">{submitError}</p>
        </div>
      )}

      {/* Main 2-Column Responsive Layout */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Sections */}
        <div className="lg:col-span-7 space-y-8">
          <PersonalInfo register={register} errors={errors} />

          <TourDetails tour={defaultTour} register={register} errors={errors} watch={watch} />

          <TravelerDetails adultsCount={adults} register={register} errors={errors} />

          <RoomSelection register={register} watch={watch} errors={errors} />

          <ExtraServices register={register} watch={watch} />

          {/* Special Requests */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm">
                6
              </span>
              <div>
                <h2 className="text-xl font-bold text-white">Special Instructions or Requests</h2>
                <p className="text-xs text-gray-400">Dietary requirements, accessibility, etc.</p>
              </div>
            </div>
            <textarea
              rows={3}
              placeholder="Any special requests or instructions for our tour team..."
              {...register("specialRequest")}
              className="w-full rounded-xl bg-white/5 border border-white/15 focus:border-emerald-500 focus:ring-emerald-500 p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition text-sm"
            />
          </div>
        </div>

        {/* Right Column: Sticky Booking Summary */}
        <div className="lg:col-span-5">
          <BookingSummary
            tour={defaultTour}
            watchedValues={watchedValues}
            calculatedPrice={calculatedPrice}
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}
