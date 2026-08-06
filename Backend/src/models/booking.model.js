import mongoose from "mongoose";

const travellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cnic: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
});

const bookingSchema = new mongoose.Schema(
    {
        tourId: {
            type: String,
            required: true,
        },
        tourName: {
            type: String,
            required: true,
        },
        destination: {
            type: String,
            required: false,
            trim: true,
        },
        bookingDate: {
            type: Date,
            required: true,
        },
        duration: {
            type: String,
            required: false,
            trim: true,
        },
        adults: {
            type: Number,
            required: true,
            default: 1,
        },
        children: {
            type: Number,
            required: true,
            default: 0,
        },
        totalPersons: {
            type: Number,
            required: true,
            default: 1,
        },
        pickupCity: {
            type: String,
            required: true,
        },
        emergencyContact: {
            type: String,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        bookingStatus: {
            type: String,
            enum: ["confirmed", "pending", "cancelled"],
            default: "confirmed",
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "refunded"],
            default: "pending",
        },
        ticketNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        issuedAt: {
            type: Date,
            default: Date.now,
            required: true,
        },
        travellers: [travellerSchema],
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
