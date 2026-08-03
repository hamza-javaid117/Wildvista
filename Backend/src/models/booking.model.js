import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        userName: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            default: "",
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        tourId: {
            type: String,
            default: "",
        },
        tourTitle: {
            type: String,
            required: true,
        },
        pickupCity: {
            type: String,
            required: true,
        },
        departureDate: {
            type: Date,
            required: true,
        },
        tourPricePerAdult: {
            type: Number,
            required: true,
        },
        adults: {
            type: Number,
            default: 1,
        },
        children: {
            type: Number,
            default: 0,
        },
        travellers: [
            {
                fullName: { type: String, required: true },
                age: { type: Number, required: true },
                cnic: { type: String, required: true },
                gender: { type: String, required: true },
            }
        ],
        childrenDetails: [
            {
                fullName: { type: String, required: true },
                age: { type: Number, required: true },
            }
        ],
        extraServices: [{ type: String }],
        originalPrice: {
            type: Number,
            required: true,
        },
        discountedPrice: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
            default: "Pending",
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Refunded"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
