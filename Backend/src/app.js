import express from "express";
import cors from "cors";

import bookingRouter from "./routes/booking.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://wildvista-sable.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
// app.options("*", cors(corsOptions)); ❌ ye line hata di — zaroorat nahi thi

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/bookings", bookingRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;