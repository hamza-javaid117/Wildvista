import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const registerUser = asyncHandler(async (req, res) => {
    const body = req.body || {};
    const { name, email, password, phoneNumber, phone, cnic } = body;
    const normalizedPhone = phone || phoneNumber;

    if (!name || !email || !password || !normalizedPhone || !cnic) {
        return res.status(400).json({
            success: false,
            message: "Name, email, password, phone number, and CNIC are required",
        });
    }

    const existingUser = await User.findOne({ $or: [{ email: email.toLowerCase() }, { cnic }] });

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        phone: normalizedPhone,
        cnic,
    });

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        },
    });
});

export const getProfile = asyncHandler(async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    });
});

export const updateProfile = asyncHandler(async (req, res) => {
    const { name, phone, address, city } = req.body || {};

    if (!name || !phone) {
        return res.status(400).json({
            success: false,
            message: "Name and phone number are required",
        });
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            name,
            phone,
            address: address || "",
            city: city || "",
        },
        { new: true, runValidators: true }
    ).select("-password");

    return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
    });
});


