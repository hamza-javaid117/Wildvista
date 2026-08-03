import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const loginUser = asyncHandler(async (req, res) => {
    const { email, cnic, password } = req.body || {};
    const identifier = (email || cnic || "").trim();

    if ((!email && !cnic) || !password) {
        return res.status(400).json({
            success: false,
            message: "Email/CNIC and password are required",
        });
    }

    const user = await User.findOne(
        identifier.includes("@")
            ? { email: identifier.toLowerCase() }
            : { cnic: identifier }
    );

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password",
        });
    }

    const token = JWT.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_TOKEN || "wildvista-dev-secret",
        {
            expiresIn: "7d",
        }
    );

    return res.status(200).json({
        success: true,
        message: "Login Successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            cnic: user.cnic,
            createdAt: user.createdAt,
        },
    });
});