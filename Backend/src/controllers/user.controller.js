import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const registerUser = asyncHandler(async (req, res) => {
  const body = req.body || {};
  console.log("Incoming request body:", body);

  const { name, email, password, phoneNumber, phone, cnic } = body;
  const normalizedPhone = phone || phoneNumber;
  const normalizedEmail = String(email || "").toLowerCase().trim();

  const validationResult = {
    hasName: Boolean(name),
    hasEmail: Boolean(email),
    hasPassword: Boolean(password),
    hasPhone: Boolean(normalizedPhone),
    hasCnic: Boolean(cnic),
  };

  console.log("Validation results:", validationResult);

  if (!name || !email || !password || !normalizedPhone || !cnic) {
    console.log("Validation failed: missing required fields");
    return res.status(400).json({
      success: false,
      message: "Name, email, password, phone number, and CNIC are required",
    });
  }

  const existingUser = await User.findOne({
    $or: [{ email: normalizedEmail }, { cnic }],
  });

  console.log("Existing user lookup result:", existingUser ? existingUser._id : null);

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const payload = {
    name,
    email: normalizedEmail,
    password: hashedPassword,
    phone: normalizedPhone,
    cnic,
  };

  console.log("Data before save:", { ...payload, password: "[hashed]" });

  try {
    const newUser = await User.create(payload);
    console.log("Result returned by User.create():", newUser);
    console.log("Connected database name:", mongoose.connection.name);
    console.log("Connected collection:", User.collection.name);
    console.log("Total user count after save:", await User.countDocuments({}));

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration exception:", error);
    throw error;
  }
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
    { new: true, runValidators: true },
  ).select("-password");

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser,
  });
});
