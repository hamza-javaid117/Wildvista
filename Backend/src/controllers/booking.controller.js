import asyncHandler from "../utils/asyncHandler.js";
import Booking from "../models/booking.model.js";
import User from "../models/user.model.js";
import { calculateBookingTotals } from "../utils/bookingPricing.js";

const buildBookingPayload = (body, user) => {
    const adults = Number(body.adults || 1);
    const children = Number(body.children || 0);
    const travellers = Array.isArray(body.travellers) ? body.travellers : [];
    const childrenDetails = Array.isArray(body.childrenDetails) ? body.childrenDetails : [];
    const extraServices = Array.isArray(body.extraServices) ? body.extraServices : [];

    const totals = calculateBookingTotals({
        tourPricePerAdult: Number(body.tourPricePerAdult || 0),
        adults,
        children,
        extraServices,
    });

    return {
        userId: user._id,
        userName: body.userName || user.name,
        email: body.email || user.email,
        phoneNumber: body.phoneNumber || user.phone,
        tourId: body.tourId || "",
        tourTitle: body.tourTitle,
        pickupCity: body.pickupCity,
        departureDate: new Date(body.departureDate),
        tourPricePerAdult: Number(body.tourPricePerAdult || 0),
        adults,
        children,
        travellers,
        childrenDetails,
        extraServices,
        originalPrice: totals.originalPrice,
        discountedPrice: totals.discountedPrice,
        totalPrice: totals.discountedPrice,
    };
};

export const createBooking = asyncHandler(async (req, res) => {
    const payload = buildBookingPayload(req.body, req.user);

    if (!payload.pickupCity) {
        return res.status(400).json({ success: false, message: "Pickup city is required" });
    }

    if (!payload.departureDate || Number.isNaN(payload.departureDate.getTime())) {
        return res.status(400).json({ success: false, message: "Departure date is required" });
    }

    if (!payload.tourTitle) {
        return res.status(400).json({ success: false, message: "Tour title is required" });
    }

    if (payload.adults < 1) {
        return res.status(400).json({ success: false, message: "At least one adult traveller is required" });
    }

    if (!Array.isArray(payload.travellers) || payload.travellers.length !== payload.adults) {
        return res.status(400).json({ success: false, message: "Traveller count must match the number of adult travellers" });
    }

    const invalidAdult = payload.travellers.find((traveller) => !traveller.fullName || !traveller.cnic || traveller.age < 12);
    if (invalidAdult) {
        return res.status(400).json({ success: false, message: "Every adult traveller must be 12 or above and must include full name and CNIC" });
    }

    const invalidChild = (payload.childrenDetails || []).find((child) => !child.fullName || child.age >= 12);
    if (invalidChild) {
        return res.status(400).json({ success: false, message: "Every child must be under 12 and must include a full name" });
    }

    const booking = await Booking.create(payload);

    await User.findByIdAndUpdate(req.user._id, {
        $push: { bookings: booking._id },
    });

    return res.status(201).json({
        success: true,
        message: "Booking created successfully",
        booking,
    });
});

export const getMyBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({ userId: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        bookings,
    });
});

export const getBookingById = asyncHandler(async (req, res) => {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.user._id });

    if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
    }

    return res.status(200).json({ success: true, booking });
});

export const updateBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.user._id });

    if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const { status, paymentStatus } = req.body || {};
    const updates = {};

    if (status) updates.status = status;
    if (paymentStatus) updates.paymentStatus = paymentStatus;

    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, updates, { new: true });

    return res.status(200).json({ success: true, booking: updatedBooking });
});

export const deleteBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.user._id });

    if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
    }

    await Booking.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(req.user._id, {
        $pull: { bookings: req.params.id },
    });

    return res.status(200).json({ success: true, message: "Booking deleted successfully" });
});
