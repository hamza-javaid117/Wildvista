import express from "express";
import cors from "cors";

import bookingRouter from "./routes/booking.routes.js";

const app = express();
const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/bookings", bookingRouter);

app.get("/test", (req, res) => {
    res.send("WildVista Backend is running");
});

export default app;