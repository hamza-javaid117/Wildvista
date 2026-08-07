import express from "express";
import cors from "cors";

import bookingRouter from "./routes/booking.routes.js";

const app = express();
const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173", "https://wildvista-sable.vercel.app"];

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],


    },
    
));





app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/bookings", bookingRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
});

export default app;