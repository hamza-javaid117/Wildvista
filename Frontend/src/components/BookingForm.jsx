import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PersonalInfo from "./PersonalInfo";
import TourDetails from "./TourDetails";
import TravelerDetails from "./TravelerDetails";
import RoomSelection from "./RoomSelection";
import ExtraServices from "./ExtraServices";
import BookingSummary from "./BookingSummary";
import { ROOM_OPTIONS, EXTRA_SERVICES } from "../consts/BookingOption";
import { createBooking, downloadTicket } from "../api/bookingApi";
import { getPriceInPKR } from "../consts/TourDetails";

export default function BookingForm({ tours = [], initialTour }) {
  const [selectedTour, setSelectedTour] = useState(initialTour || tours[0] || null);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [ticketDownloadError, setTicketDownloadError] = useState(null);
  const [isDownloadingTicket, setIsDownloadingTicket] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      customer: {
        name: "",
        phone: "",
        email: "",
        emergencyContact: "",
        cnic: "",
      },
      booking: {
        travelDate: "",
        pickupCity: "Islamabad",
      },
      travelers: [
        { name: "", cnic: "", phone: "", email: "", gender: "Male", age: "" },
      ],
      roomType: "single",
      extras: [],
      specialRequest: "",
    },
  });

  // Watch form values for dynamic calculation
  const watchedValues = watch();
  const travelersList = watchedValues.travelers || [];
  const roomType = watchedValues.roomType || "single";
  const extras = watchedValues.extras || [];

  // Calculate pricing based on age and tour base price
  const adultBasePrice = selectedTour ? getPriceInPKR(selectedTour.pricing.single) : 45000;
  const childBasePrice = adultBasePrice * 0.70;

  let adultCount = 0;
  let childCount = 0;
  let adultCost = 0;
  let childCost = 0;

  travelersList.forEach((traveller) => {
    // If age is not set, default to adult
    const age = traveller.age !== undefined && traveller.age !== "" ? Number(traveller.age) : 12;
    if (age >= 12) {
      adultCount++;
      adultCost += adultBasePrice;
    } else {
      childCount++;
      childCost += childBasePrice;
    }
  });

  // Safe checks for counts (at least 1 traveler total if travelers array is empty)
  if (travelersList.length === 0) {
    adultCount = 1;
    adultCost = adultBasePrice;
  }

  // Selected Room Details
  const selectedRoomObj = ROOM_OPTIONS.find((r) => r.value === roomType);
  const roomPrice = selectedRoomObj ? selectedRoomObj.price : 0;

  // Selected Extras Details
  const extrasTotal = EXTRA_SERVICES.filter((e) =>
    Array.isArray(extras) && extras.includes(e.value)
  ).reduce((acc, curr) => acc + curr.price, 0);

  const grandTotal = adultCost + childCost + roomPrice + extrasTotal;

  const calculatedPrice = {
    adultCount,
    childCount,
    adultCost,
    childCost,
    roomPrice,
    extrasTotal,
    total: grandTotal,
  };

  const handleTourChange = (slug) => {
    const tour = tours.find((t) => t.slug === slug);
    if (tour) {
      setSelectedTour(tour);
    }
  };

  // Submit Handler
  const onSubmit = async (data) => {
    setSubmitError(null);
    setSubmitSuccess(null);
    setTicketDownloadError(null);

    const bookingPayload = {
      tourId: selectedTour?.slug || "",
      tourName: selectedTour?.hero?.title || selectedTour?.title || "WildVista Tour",
      destination: selectedTour?.hero?.title || selectedTour?.title || "WildVista Tour",
      duration: selectedTour?.hero?.duration || selectedTour?.duration || "",
      bookingDate: data.booking?.travelDate || "",
      pickupCity: data.booking?.pickupCity || "",
      emergencyContact: data.customer?.emergencyContact || "",
      tourPricePerAdult: adultBasePrice,
      totalPrice: grandTotal,
      travellers: (data.travelers || []).map((t) => ({
        name: t.name || "",
        cnic: t.cnic || "",
        phone: t.phone || "",
        email: t.email || "",
        gender: t.gender || "Male",
        age: Number(t.age || 0),
      })),
    };

    try {
      const response = await createBooking(bookingPayload);

      if (!response?.success) {
        throw new Error(response?.message || "Booking failed.");
      }

      setSubmitSuccess({
        message: "Your luxury tour booking is confirmed! Details are stored securely.",
        booking: response.booking,
        bookingId: response.bookingId || response.booking?._id,
      });
      
      // Smooth scroll to top to see success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong.";
      setSubmitError(errorMessage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDownloadTicket = async () => {
    if (!submitSuccess?.bookingId) {
      setTicketDownloadError("Booking information is missing.");
      return;
    }

    setTicketDownloadError(null);
    setIsDownloadingTicket(true);

    try {
      const response = await downloadTicket(submitSuccess.bookingId);
      const contentDisposition = response.headers["content-disposition"];
      let fileName = `wildvista-ticket-${submitSuccess.bookingId}.pdf`;

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?([^";]+)"?/);
        if (fileNameMatch?.[1]) {
          fileName = fileNameMatch[1];
        }
      }

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Unable to download ticket. Please try again.";
      setTicketDownloadError(message);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsDownloadingTicket(false);
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
          Complete the form below to reserve your luxury spot. No account required.
        </p>
      </div>

      {/* Success Notification Modal */}
      {submitSuccess && (
        <div className="mb-8 rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-6 sm:p-8 backdrop-blur-xl text-white space-y-5 animate-fadeIn">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎉</span>
              <div>
                <h3 className="text-xl font-bold text-emerald-400">Booking Successful</h3>
                <p className="text-sm text-gray-300">Your booking is confirmed. Your ticket is ready to download.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDownloadTicket}
              disabled={isDownloadingTicket}
              className="inline-flex items-center justify-center rounded-full bg-white text-black font-semibold px-5 py-3 transition hover:bg-emerald-400 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloadingTicket ? "Downloading Ticket..." : "Download Ticket"}
            </button>
          </div>

          <div className="bg-black/50 p-6 rounded-xl space-y-4 border border-white/10">
            <h4 className="text-sm uppercase tracking-wider text-emerald-400 font-bold">Booking Confirmation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div className="space-y-2">
                <p className="text-gray-400 uppercase tracking-wider text-[11px]">Ticket Number</p>
                <p className="text-white font-semibold">{submitSuccess.booking.ticketNumber}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400 uppercase tracking-wider text-[11px]">Booking ID</p>
                <p className="text-white font-semibold">{submitSuccess.bookingId}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400 uppercase tracking-wider text-[11px]">Booking Status</p>
                <p className="text-white font-semibold">{submitSuccess.booking.bookingStatus}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400 uppercase tracking-wider text-[11px]">Payment Status</p>
                <p className="text-white font-semibold">{submitSuccess.booking.paymentStatus}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300 pt-4 border-t border-white/10">
              <p>📌 <strong className="text-white">Tour Name:</strong> {submitSuccess.booking.tourName}</p>
              <p>📅 <strong className="text-white">Travel Date:</strong> {new Date(submitSuccess.booking.bookingDate).toLocaleDateString()}</p>
              <p>🚌 <strong className="text-white">Pickup City:</strong> {submitSuccess.booking.pickupCity}</p>
              <p>🚨 <strong className="text-white">Emergency Contact:</strong> {submitSuccess.booking.emergencyContact}</p>
              <p>👥 <strong className="text-white">Total Travelers:</strong> {submitSuccess.booking.totalPersons} ({submitSuccess.booking.adults} Adults, {submitSuccess.booking.children} Children)</p>
              <p>💰 <strong className="text-white">Grand Total:</strong> Rs. {submitSuccess.booking.totalPrice.toLocaleString()}</p>
            </div>

            {ticketDownloadError && (
              <div className="rounded-xl bg-rose-950/70 border border-rose-500/30 p-4 text-sm text-rose-100">
                <strong className="font-semibold">Download failed:</strong> {ticketDownloadError}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error Notification Modal */}
      {submitError && (
        <div className="mb-8 rounded-2xl border border-rose-500/40 bg-rose-950/40 p-6 backdrop-blur-xl text-white space-y-2 animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <h3 className="text-lg font-bold text-rose-400">Booking Submission Failed</h3>
          </div>
          <p className="text-sm text-rose-100">{submitError}</p>
        </div>
      )}

      {!submitSuccess && (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Sections */}
          <div className="lg:col-span-7 space-y-8">
            <PersonalInfo register={register} errors={errors} />

            <TourDetails
              tours={tours}
              selectedTour={selectedTour}
              onTourChange={handleTourChange}
              register={register}
              errors={errors}
            />

            <TravelerDetails
              register={register}
              control={control}
              errors={errors}
            />

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
              tour={selectedTour}
              watchedValues={watchedValues}
              calculatedPrice={calculatedPrice}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      )}
    </div>
  );
}
