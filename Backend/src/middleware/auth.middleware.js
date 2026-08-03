import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN || "wildvista-dev-secret");
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
});

export default authMiddleware;
