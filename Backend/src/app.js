import express from "express";
import cors from "cors";

import userRouter from "./routes/user.route.js";
import Loginrouter from "./routes/login.routes.js";
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

app.use("/api/v1/user", userRouter);
app.use("/api/v1/user", Loginrouter);
app.use("/api/v1/booking", bookingRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
});

export default app;