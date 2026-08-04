import asyncHandler from "../utils/asyncHandler.js";
import Booking from "../models/booking.model.js";

// Helper for validating email format
const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Helper for validating CNIC or Passport
const isValidCnicOrPassport = (val) => {
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    const passportRegex = /^[A-Za-z0-9]{7,15}$/;
    return cnicRegex.test(val) || passportRegex.test(val);
};

// Helper for validating phone number
const isValidPhone = (phone) => {
    const regex = /^(\+92|0)?[0-9]{10}$/;
    return regex.test(phone);
};

export const createBooking = asyncHandler(async (req, res) => {
    const {
        tourId,
        tourName,
        bookingDate,
        pickupCity,
        emergencyContact,
        travellers,
        tourPricePerAdult,
    } = req.body;

    // 1. Basic validation
    if (!tourId || !tourName) {
        return res.status(400).json({ success: false, message: "Tour selection is required" });
    }
    if (!bookingDate) {
        return res.status(400).json({ success: false, message: "Booking date is required" });
    }
    if (!pickupCity) {
        return res.status(400).json({ success: false, message: "Pickup city is required" });
    }
    if (!emergencyContact || !isValidPhone(emergencyContact)) {
        return res.status(400).json({ success: false, message: "Valid emergency contact phone number is required" });
    }
    if (!Array.isArray(travellers) || travellers.length === 0) {
        return res.status(400).json({ success: false, message: "At least one traveller is required to book" });
    }
    if (!tourPricePerAdult || Number(tourPricePerAdult) <= 0) {
        return res.status(400).json({ success: false, message: "Valid tour price is required" });
    }

    // 2. Traveller validation and age classification
    let adultsCount = 0;
    let childrenCount = 0;
    let computedTotalPrice = 0;

    const validatedTravellers = [];

    for (let i = 0; i < travellers.length; i++) {
        const t = travellers[i];
        const index = i + 1;

        if (!t.name || t.name.trim().length < 3) {
            return res.status(400).json({ success: false, message: `Traveller ${index}: Full Name is required and must be at least 3 characters` });
        }
        if (!t.cnic || !isValidCnicOrPassport(t.cnic)) {
            return res.status(400).json({ success: false, message: `Traveller ${index}: Valid CNIC (e.g. 61101-1234567-8) or Passport is required` });
        }
        if (!t.phone || !isValidPhone(t.phone)) {
            return res.status(400).json({ success: false, message: `Traveller ${index}: Valid phone number is required` });
        }
        if (!t.email || !isValidEmail(t.email)) {
            return res.status(400).json({ success: false, message: `Traveller ${index}: Valid email address is required` });
        }
        if (!t.gender || !["Male", "Female", "Other"].includes(t.gender)) {
            return res.status(400).json({ success: false, message: `Traveller ${index}: Gender must be Male, Female, or Other` });
        }
        if (t.age === undefined || t.age === null || Number(t.age) < 1 || Number(t.age) > 120) {
            return res.status(400).json({ success: false, message: `Traveller ${index}: Valid age is required` });
        }

        const ageNum = Number(t.age);
        const base = Number(tourPricePerAdult);

        if (ageNum >= 12) {
            adultsCount++;
            computedTotalPrice += base;
        } else {
            childrenCount++;
            computedTotalPrice += base * 0.70; // 30% discount
        }

        validatedTravellers.push({
            name: t.name.trim(),
            cnic: t.cnic.trim(),
            phone: t.phone.trim(),
            email: t.email.trim(),
            gender: t.gender,
            age: ageNum,
        });
    }

    // 3. Create the booking object
    const bookingData = {
        tourId,
        tourName,
        bookingDate: new Date(bookingDate),
        adults: adultsCount,
        children: childrenCount,
        totalPersons: travellers.length,
        pickupCity,
        emergencyContact,
        totalPrice: computedTotalPrice,
        travellers: validatedTravellers,
        status: "Pending",
    };

    const booking = await Booking.create(bookingData);

    return res.status(201).json({
        success: true,
        message: "Booking created successfully",
        booking,
    });
});

