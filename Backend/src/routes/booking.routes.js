import express from "express";
import { createBooking, generateTicketPDF } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/:id/ticket", generateTicketPDF);

export default router;
