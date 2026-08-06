import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import PDFDocument from "pdfkit";
import asyncHandler from "../utils/asyncHandler.js";
import Booking from "../models/booking.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOGO_PATH = path.join(__dirname, "../../public/logo.png");
const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const isValidCnicOrPassport = (val) => {
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    const passportRegex = /^[A-Za-z0-9]{7,15}$/;
    return cnicRegex.test(val) || passportRegex.test(val);
};

const isValidPhone = (phone) => {
    const regex = /^(\+92|0)?[0-9]{10}$/;
    return regex.test(phone);
};

export const generateTicketNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    return `WV-${year}-${random}`;
};

const TICKET_COLORS = {
    emerald: "#1f6f4b",
    amber: "#b8860b",
    dark: "#1f2937",
    muted: "#6b7280",
    border: "#d6d3d1",
    bg: "#f5f5f4",
    card: "#fafaf9",
    white: "#ffffff",
};

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 36;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const formatDate = (value) => {
    if (!value) {
        return "{{issuedDate}}";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "{{issuedDate}}";
    }

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const formatCurrency = (value) => {
    if (value === undefined || value === null || Number.isNaN(Number(value))) {
        return "{{totalPrice}}";
    }

    return `PKR ${Number(value).toLocaleString("en-PK")}`;
};

const getTicketData = (booking) => {
    const travellers = Array.isArray(booking?.travellers)
        ? booking.travellers.map((traveller) => ({
            name: traveller?.name || "{{travellerName}}",
            cnic: traveller?.cnic || "{{cnicPassport}}",
            age: traveller?.age ?? "{{age}}",
            gender: traveller?.gender || "{{gender}}",
            phone: traveller?.phone || "{{phone}}",
            email: traveller?.email || "{{email}}",
        }))
        : [];

    const leadTraveller = travellers[0] || {};

    return {
        ticketNumber: booking?.ticketNumber || "{{ticketNumber}}",
        bookingId: booking?._id ? String(booking._id) : "{{bookingId}}",
        bookingStatus: booking?.bookingStatus || "{{bookingStatus}}",
        paymentStatus: booking?.paymentStatus || "{{paymentStatus}}",
        issuedDate: formatDate(booking?.issuedAt || booking?.createdAt),
        bookingDate: formatDate(booking?.bookingDate),
        travelDate: formatDate(booking?.bookingDate),
        tourName: booking?.tourName || "{{tourName}}",
        tourId: booking?.tourId || "{{tourId}}",
        pickupCity: booking?.pickupCity || "{{pickupCity}}",
        reportingTime: "10:00 PM",
        departureTime: "12:00 AM",
        duration: booking?.duration || "Duration Not Available",
        destination: booking?.destination || booking?.tourName || "{{destination}}",
        leadTraveller: leadTraveller.name || "{{leadTraveller}}",
        phone: leadTraveller.phone || "{{phone}}",
        email: leadTraveller.email || "{{email}}",
        emergencyContact: booking?.emergencyContact || "{{emergencyContact}}",
        travellers,
        adults: booking?.adults ?? "{{adults}}",
        children: booking?.children ?? "{{children}}",
        totalPersons: booking?.totalPersons ?? "{{totalPersons}}",
        pricePerAdult: booking?.adults ? formatCurrency(Number(booking.totalPrice || 0) / Number(booking.adults)) : "{{pricePerAdult}}",
        childDiscount: "{{childDiscount}}",
        totalPrice: booking?.totalPrice ? formatCurrency(booking.totalPrice) : "{{totalPrice}}",
        meetingPoint: "{{meetingPoint}}",
        pickupInstructions: "{{pickupInstructions}}",
        tourGuidelines: "{{tourGuidelines}}",
        thingsToBring: "{{thingsToBring}}",
        website: "{{website}}",
        supportEmail: "{{supportEmail}}",
        supportPhone: "{{supportPhone}}",
    };
};

const drawRoundedCard = (doc, x, y, width, height, fillColor, borderColor, radius = 10) => {
    doc.save();
    doc.roundedRect(x, y, width, height, radius).lineWidth(0.8).fillAndStroke(fillColor, borderColor);
    doc.restore();
};

const drawSectionHeading = (doc, x, y, title) => {
    doc.font("Helvetica-Bold").fontSize(11).fillColor(TICKET_COLORS.dark).text(title, x, y);
    doc.moveTo(x, y + 16).lineTo(x + 140, y + 16).lineWidth(0.6).stroke(TICKET_COLORS.border);
};

const drawInfoCard = (doc, x, y, width, height, label, value) => {
    // Ensure a sensible minimum height so label + value fit comfortably
    const minHeight = 40; // px
    const cardHeight = Math.max(height, minHeight);
    drawRoundedCard(doc, x, y, width, cardHeight, TICKET_COLORS.card, TICKET_COLORS.border, 8);

    const paddingLeft = 12;
    const paddingRight = 12;
    const contentWidth = width - paddingLeft - paddingRight;

    // Label settings (fixed at top)
    const labelFont = "Helvetica-Bold";
    const labelSize = 8;
    const labelX = x + paddingLeft;
    const labelY = y + 10;
    doc.font(labelFont).fontSize(labelSize).fillColor(TICKET_COLORS.muted).text(label, labelX, labelY, {
        width: contentWidth,
        align: "center",
    });

    // Value settings (below label with a small gap)
    const gap = 6; // px gap between label and value
    const bottomPadding = 8; // px bottom padding inside card
    const valueTop = labelY + labelSize + gap;
    const availableHeight = cardHeight - (valueTop - y) - bottomPadding;

    const baseFont = "Helvetica-Bold";
    const maxFontSize = 10;
    const minFontSize = 7;
    let chosenSize = Math.min(maxFontSize, Math.floor(availableHeight));
    if (chosenSize > maxFontSize) chosenSize = maxFontSize;
    if (chosenSize < minFontSize) chosenSize = minFontSize;

    let rendered = String(value ?? "");

    // Reduce font size until text fits width and height
    for (let size = chosenSize; size >= minFontSize; size--) {
        doc.font(baseFont).fontSize(size);
        const textWidth = doc.widthOfString(rendered);
        const textHeight = size * 1.15; // estimate line height
        if (textWidth <= contentWidth && textHeight <= availableHeight) {
            chosenSize = size;
            break;
        }
        chosenSize = size;
    }

    doc.font(baseFont).fontSize(chosenSize);

    // If width still exceeds, truncate with ellipsis
    if (doc.widthOfString(rendered) > contentWidth) {
        const ell = "...";
        let available = contentWidth - doc.widthOfString(ell);
        let text = rendered;
        while (text.length > 0 && doc.widthOfString(text) > available) {
            text = text.slice(0, -1);
        }
        rendered = text + ell;
    }

    // Compute vertical center within remaining area below the label
    const usedValueHeight = chosenSize * 1.15;
    const valueY = valueTop + Math.max(0, Math.floor((availableHeight - usedValueHeight) / 2));

    doc.font(baseFont).fontSize(chosenSize).fillColor(TICKET_COLORS.dark).text(rendered, labelX, valueY, {
        width: contentWidth,
        align: "center",
        lineBreak: false,
        ellipsis: true,
    });
};

const drawStatusPill = (doc, x, y, label, color) => {
    const width = doc.widthOfString(label) + 16;
    drawRoundedCard(doc, x, y, width, 20, color === TICKET_COLORS.emerald ? "#ecfdf3" : color === TICKET_COLORS.amber ? "#fffbeb" : "#f5f5f4", color === TICKET_COLORS.emerald ? "#a7f3d0" : color === TICKET_COLORS.amber ? "#fde68a" : TICKET_COLORS.border, 10);
    doc.font("Helvetica-Bold").fontSize(8).fillColor(color).text(label, x + 8, y + 5);
};

const drawTravellerTable = (doc, ticket, startY) => {
    const tableWidth = CONTENT_WIDTH;
    const tableX = MARGIN;
    const headerHeight = 24;
    const rowHeight = 22;
    const bottomLimit = doc.page.height - MARGIN - 44;
    let currentY = startY;
    const travellers = Array.isArray(ticket.travellers) ? ticket.travellers : [];

    const renderHeader = () => {
        if (currentY + headerHeight + rowHeight > bottomLimit) {
            drawFooter(doc, ticket, doc.page.number);
            doc.addPage();
            currentY = MARGIN;
        }
        drawSectionHeading(doc, MARGIN, currentY, "Traveller Details");
        currentY += 22;
        drawRoundedCard(doc, tableX, currentY, tableWidth, headerHeight, TICKET_COLORS.bg, TICKET_COLORS.border, 8);
        doc.font("Helvetica-Bold").fontSize(8).fillColor(TICKET_COLORS.muted).text("#", tableX + 8, currentY + 6, { lineBreak: false, ellipsis: true, width: 16 });
        doc.text("Full Name", tableX + 34, currentY + 6, { lineBreak: false, ellipsis: true, width: 88 });
        doc.text("CNIC / Passport", tableX + 132, currentY + 6, { lineBreak: false, ellipsis: true, width: 88 });
        doc.text("Age", tableX + 233, currentY + 6, { lineBreak: false, ellipsis: true, width: 30 });
        doc.text("Gender", tableX + 270, currentY + 6, { lineBreak: false, ellipsis: true, width: 44 });
        doc.text("Phone", tableX + 320, currentY + 6, { lineBreak: false, ellipsis: true, width: 70 });
        doc.text("Email", tableX + 395, currentY + 6, { lineBreak: false, ellipsis: true, width: 115 });
        currentY += headerHeight;
    };

    renderHeader();

    travellers.forEach((traveller, index) => {
        if (currentY + rowHeight > bottomLimit) {
            drawFooter(doc, ticket, doc.page.number);
            doc.addPage();
            currentY = MARGIN;
            renderHeader();
        }
 
        const rowY = currentY;
        drawRoundedCard(doc, tableX, rowY, tableWidth, rowHeight, index % 2 === 0 ? TICKET_COLORS.white : TICKET_COLORS.card, TICKET_COLORS.border, 6);
        doc.font("Helvetica").fontSize(8).fillColor(TICKET_COLORS.dark).text(String(index + 1), tableX + 8, rowY + 7, { lineBreak: false, ellipsis: true, width: 16 });
        doc.text(traveller.name, tableX + 34, rowY + 7, { width: 88, lineBreak: false, ellipsis: true });
        doc.text(traveller.cnic, tableX + 132, rowY + 7, { width: 88, lineBreak: false, ellipsis: true });
        doc.text(String(traveller.age), tableX + 233, rowY + 7, { width: 30, lineBreak: false, ellipsis: true });
        doc.text(traveller.gender || "-", tableX + 270, rowY + 7, { width: 44, lineBreak: false, ellipsis: true });
        doc.text(traveller.phone || "-", tableX + 320, rowY + 7, { width: 70, lineBreak: false, ellipsis: true });
        doc.text(traveller.email || "-", tableX + 395, rowY + 7, { width: 115, lineBreak: false, ellipsis: true });
        currentY += rowHeight;
    });


    return currentY;
};

const drawFooter = (doc, ticket, pageNumber) => {
    const footerY = doc.page.height - MARGIN - 30;
    const footerItems = [
        { text: "WildVista", x: MARGIN, fontSize: 9, color: TICKET_COLORS.dark, width: 60 },
        {
            text: `Customer Support • ${ticket.website}`,
            x: MARGIN + 70,
            fontSize: 8,
            color: TICKET_COLORS.muted,
            width: 140,
        },
        { text: `Email: ${ticket.supportEmail}`, x: MARGIN + 260, fontSize: 8, color: TICKET_COLORS.muted, width: 120 },
        { text: `Phone: ${ticket.supportPhone}`, x: MARGIN + 395, fontSize: 8, color: TICKET_COLORS.muted, width: 100 },
        {
            text: `Page ${pageNumber}`,
            x: PAGE_WIDTH - MARGIN - 40,
            fontSize: 7,
            color: TICKET_COLORS.muted,
            width: 40,
        },
    ];

    footerItems.forEach((item) => {
        doc.font(item.fontSize <= 7 ? "Helvetica" : item.fontSize <= 8 ? "Helvetica" : "Helvetica-Bold").fontSize(item.fontSize).fillColor(item.color);
        doc.text(item.text, item.x, footerY, {
            width: item.width,
            lineBreak: false,
            ellipsis: true,
        });
    });
};

const ensurePageSpace = (doc, currentY, requiredHeight) => {
    const pageBottom = doc.page.height - MARGIN - 40;
    if (currentY + requiredHeight > pageBottom) {
        doc.addPage();
        return MARGIN;
    }
    return currentY;
};

export const buildTicketDocument = (doc, booking) => {
    const ticket = getTicketData(booking);
    let currentY = MARGIN;
    const pageBottom = doc.page.height - MARGIN - 40;

    if (LOGO_PATH && fs.existsSync(LOGO_PATH)) {
        try {
            doc.image(LOGO_PATH, MARGIN, currentY, { width: 70 });
        } catch (error) {
            console.warn("buildTicketDocument: Unable to load logo image", error);
        }
    }

    const titleX = MARGIN + 90;
    const titleWidth = PAGE_WIDTH - titleX - MARGIN;
    doc.font("Helvetica-Bold").fontSize(20).fillColor(TICKET_COLORS.emerald).text("TRAVEL E-TICKET", titleX, currentY + 2, {
        width: titleWidth,
        align: "left",
    });
    doc.font("Helvetica").fontSize(9).fillColor(TICKET_COLORS.muted).text("Official Booking Confirmation", titleX, currentY + 28, {
        width: titleWidth,
        align: "left",
    });
    doc.font("Helvetica-Bold").fontSize(8).fillColor(TICKET_COLORS.muted).text(`Booking Date: ${ticket.bookingDate}`, titleX, currentY + 48, {
        width: titleWidth,
        align: "left",
    });

    currentY += 72;
    drawRoundedCard(doc, MARGIN, currentY, CONTENT_WIDTH, 28, "#f8faf9", TICKET_COLORS.border, 8);
    drawStatusPill(doc, MARGIN + 10, currentY + 4, `Booking: ${ticket.bookingStatus}`, TICKET_COLORS.emerald);
    drawStatusPill(doc, MARGIN + 150, currentY + 4, `Payment: ${ticket.paymentStatus}`, TICKET_COLORS.amber);
    drawStatusPill(doc, MARGIN + 285, currentY + 4, `ID: ${ticket.bookingId}`, TICKET_COLORS.border);
    currentY += 38;

    const rowCardHeight = 48;
    const rowGap = 4;
    drawInfoCard(doc, MARGIN, currentY, (CONTENT_WIDTH - 12) / 4, rowCardHeight, "Booking ID", ticket.bookingId);
    drawInfoCard(doc, MARGIN + (CONTENT_WIDTH - 12) / 4 + 4, currentY, (CONTENT_WIDTH - 12) / 4, rowCardHeight, "Booking Date", ticket.bookingDate);
    drawInfoCard(doc, MARGIN + ((CONTENT_WIDTH - 12) / 4) * 2 + 8, currentY, (CONTENT_WIDTH - 12) / 4, rowCardHeight, "Issued Date", ticket.issuedDate);
    drawInfoCard(doc, MARGIN + ((CONTENT_WIDTH - 12) / 4) * 3 + 12, currentY, (CONTENT_WIDTH - 12) / 4, rowCardHeight, "Tour ID", ticket.tourId);
    currentY += rowCardHeight + rowGap;

    drawInfoCard(doc, MARGIN, currentY, (CONTENT_WIDTH - 12) / 4, rowCardHeight, "Tour Name", ticket.tourName);
    drawInfoCard(doc, MARGIN + (CONTENT_WIDTH - 12) / 4 + 4, currentY, (CONTENT_WIDTH - 12) / 4, rowCardHeight, "Travel Date", ticket.travelDate);
    drawInfoCard(doc, MARGIN + ((CONTENT_WIDTH - 12) / 4) * 2 + 8, currentY, (CONTENT_WIDTH - 12) / 4, rowCardHeight, "Pickup City", ticket.pickupCity);
    drawInfoCard(doc, MARGIN + ((CONTENT_WIDTH - 12) / 4) * 3 + 12, currentY, (CONTENT_WIDTH - 12) / 4, rowCardHeight, "Departure Time", ticket.departureTime);
    currentY += rowCardHeight + rowGap;

    drawInfoCard(doc, MARGIN, currentY, (CONTENT_WIDTH - 12) / 4, rowCardHeight, "Reporting Time", ticket.reportingTime);
    drawInfoCard(doc, MARGIN + (CONTENT_WIDTH - 12) / 4 + 4, currentY, (CONTENT_WIDTH - 12) / 4, rowCardHeight, "Duration", ticket.duration);
    drawInfoCard(doc, MARGIN + ((CONTENT_WIDTH - 12) / 4) * 2 + 8, currentY, (CONTENT_WIDTH - 12) / 4, rowCardHeight, "Destination", ticket.destination);
    drawRoundedCard(doc, MARGIN + ((CONTENT_WIDTH - 12) / 4) * 3 + 12, currentY, (CONTENT_WIDTH - 12) / 4, 48, "#fffbeb", "#fde68a", 8);
    doc.font("Helvetica-Bold").fontSize(8).fillColor(TICKET_COLORS.amber).text("QR Code", MARGIN + ((CONTENT_WIDTH - 12) / 4) * 3 + 24, currentY + 8);
    doc.rect(MARGIN + ((CONTENT_WIDTH - 12) / 4) * 3 + 24, currentY + 22, 86, 18).stroke(TICKET_COLORS.border);
    currentY += 52;

    currentY = ensurePageSpace(doc, currentY, 92, ticket);
    drawRoundedCard(doc, MARGIN, currentY, CONTENT_WIDTH, 78, TICKET_COLORS.card, TICKET_COLORS.border, 12);
    drawSectionHeading(doc, MARGIN + 12, currentY + 10, "Lead Traveller / Lead Booker");
    drawInfoCard(doc, MARGIN + 12, currentY + 28, (CONTENT_WIDTH - 36) / 4, 40, "Lead Traveller", ticket.leadTraveller);
    drawInfoCard(doc, MARGIN + 12 + (CONTENT_WIDTH - 36) / 4 + 4, currentY + 28, (CONTENT_WIDTH - 36) / 4, 40, "Phone", ticket.phone);
    drawInfoCard(doc, MARGIN + 12 + ((CONTENT_WIDTH - 36) / 4) * 2 + 8, currentY + 28, (CONTENT_WIDTH - 36) / 4, 40, "Email", ticket.email);
    drawInfoCard(doc, MARGIN + 12 + ((CONTENT_WIDTH - 36) / 4) * 3 + 12, currentY + 28, (CONTENT_WIDTH - 36) / 4, 40, "Emergency Contact", ticket.emergencyContact);
    currentY += 88;

    currentY = drawTravellerTable(doc, ticket, currentY);
    currentY += 20;

    const finalCardHeight = 110;
    const finalGap = 12;
    const termsHeight = 48;
    const finalSectionHeight = finalCardHeight + finalGap + termsHeight;
    if (currentY + finalSectionHeight > pageBottom) {
        drawFooter(doc, ticket, doc.page.number);
        doc.addPage();
        currentY = MARGIN;
    }

    drawRoundedCard(doc, MARGIN, currentY, CONTENT_WIDTH - 250, finalCardHeight, TICKET_COLORS.card, TICKET_COLORS.border, 12);
    drawSectionHeading(doc, MARGIN + 12, currentY + 12, "Important Information");
    doc.font("Helvetica").fontSize(9).fillColor(TICKET_COLORS.dark).text(`Meeting Point: ${ticket.meetingPoint}`, MARGIN + 12, currentY + 42, { width: CONTENT_WIDTH - 280 });
    doc.text(`Pickup Instructions: ${ticket.pickupInstructions}`, MARGIN + 12, currentY + 66, { width: CONTENT_WIDTH - 280 });
    doc.text(`Tour Guidelines: ${ticket.tourGuidelines}`, MARGIN + 12, currentY + 90, { width: CONTENT_WIDTH - 280 });
    doc.text(`Things to Bring: ${ticket.thingsToBring}`, MARGIN + 12, currentY + 114, { width: CONTENT_WIDTH - 280 });

    drawRoundedCard(doc, MARGIN + CONTENT_WIDTH - 250 + 12, currentY, 238, finalCardHeight, TICKET_COLORS.white, TICKET_COLORS.border, 12);
    drawSectionHeading(doc, MARGIN + CONTENT_WIDTH - 250 + 24, currentY + 12, "Booking Summary");
    doc.font("Helvetica").fontSize(9).fillColor(TICKET_COLORS.dark).text(`Adults: ${ticket.adults}`, MARGIN + CONTENT_WIDTH - 250 + 24, currentY + 34);
    doc.text(`Children: ${ticket.children}`, MARGIN + CONTENT_WIDTH - 250 + 24, currentY + 50);
    doc.text(`Total Persons: ${ticket.totalPersons}`, MARGIN + CONTENT_WIDTH - 250 + 24, currentY + 66);
    doc.text(`Price Per Adult: ${ticket.pricePerAdult}`, MARGIN + CONTENT_WIDTH - 250 + 24, currentY + 82);
    doc.text(`Child Discount: ${ticket.childDiscount}`, MARGIN + CONTENT_WIDTH - 250 + 24, currentY + 98);
    doc.font("Helvetica-Bold").fontSize(10).fillColor(TICKET_COLORS.emerald).text(`Total Amount: ${ticket.totalPrice}`, MARGIN + CONTENT_WIDTH - 250 + 24, currentY + 114);

    const termsY = currentY + finalCardHeight + finalGap;
    drawRoundedCard(doc, MARGIN, termsY, CONTENT_WIDTH, termsHeight, TICKET_COLORS.card, TICKET_COLORS.border, 12);
    drawSectionHeading(doc, MARGIN + 12, termsY + 12, "Terms & Conditions");
    doc.font("Helvetica").fontSize(8).fillColor(TICKET_COLORS.muted).text("Please arrive at the reporting time with valid identification and booking confirmation.", MARGIN + 12, termsY + 36, { width: CONTENT_WIDTH - 24 });
    doc.text("Changes are subject to availability and prior approval from the travel team.", MARGIN + 12, termsY + 52, { width: CONTENT_WIDTH - 24 });

    drawFooter(doc, ticket, doc.page.number);
};

export const createBooking = asyncHandler(async (req, res) => {
    const {
        tourId,
        tourName,
        destination,
        bookingDate,
        pickupCity,
        emergencyContact,
        travellers,
        tourPricePerAdult,
    } = req.body;

    if (!tourId || !tourName) {
        return res.status(400).json({
            success: false,
            message: "Tour selection is required",
        });
    }

    if (!bookingDate) {
        return res.status(400).json({
            success: false,
            message: "Booking date is required",
        });
    }

    if (!pickupCity) {
        return res.status(400).json({
            success: false,
            message: "Pickup city is required",
        });
    }

    if (!emergencyContact || !isValidPhone(emergencyContact)) {
        return res.status(400).json({
            success: false,
            message: "Valid emergency contact phone number is required",
        });
    }

    if (!Array.isArray(travellers) || travellers.length === 0) {
        return res.status(400).json({
            success: false,
            message: "At least one traveller is required",
        });
    }

    if (!tourPricePerAdult || Number(tourPricePerAdult) <= 0) {
        return res.status(400).json({
            success: false,
            message: "Valid tour price is required",
        });
    }

    let adultsCount = 0;
    let childrenCount = 0;
    let computedTotalPrice = 0;
    const validatedTravellers = [];

    for (let i = 0; i < travellers.length; i++) {
        const traveller = travellers[i];
        const index = i + 1;

        if (!traveller.name || traveller.name.trim().length < 3) {
            return res.status(400).json({
                success: false,
                message: `Traveller ${index}: Name required`,
            });
        }

        if (!traveller.cnic || !isValidCnicOrPassport(traveller.cnic)) {
            return res.status(400).json({
                success: false,
                message: `Traveller ${index}: Valid CNIC/Passport required`,
            });
        }

        if (!traveller.phone || !isValidPhone(traveller.phone)) {
            return res.status(400).json({
                success: false,
                message: `Traveller ${index}: Valid phone required`,
            });
        }

        if (traveller.email && !isValidEmail(traveller.email)) {
            return res.status(400).json({
                success: false,
                message: `Traveller ${index}: Valid email required`,
            });
        }

            if (!traveller.gender || !["Male", "Female", "Other"].includes(traveller.gender)) {
            return res.status(400).json({
                success: false,
                message: `Traveller ${index}: Gender invalid`,
            });
        }

        if (traveller.age === undefined || Number(traveller.age) < 1 || Number(traveller.age) > 120) {
            return res.status(400).json({
                success: false,
                message: `Traveller ${index}: Valid age required`,
            });
        }

        const ageNum = Number(traveller.age);
        const base = Number(tourPricePerAdult);

        if (ageNum >= 12) {
            adultsCount += 1;
            computedTotalPrice += base;
        } else {
            childrenCount += 1;
            computedTotalPrice += base * 0.70;
        }

        validatedTravellers.push({
            name: traveller.name.trim(),
            cnic: traveller.cnic.trim(),
            phone: traveller.phone.trim(),
            email: traveller.email ? traveller.email.trim() : undefined,
            gender: traveller.gender,
            age: ageNum,
        });
    }

    let ticketNumber = generateTicketNumber();
    let attempts = 0;

    while (attempts < 10) {
        const existingBooking = await Booking.findOne({ ticketNumber });
        if (!existingBooking) {
            break;
        }
        ticketNumber = generateTicketNumber();
        attempts += 1;
    }

    if (attempts >= 10) {
        return res.status(500).json({
            success: false,
            message: "Unable to generate a unique ticket number right now",
        });
    }

    const bookingData = {
        tourId,
        tourName,
        destination: destination || tourName,
        bookingDate: new Date(bookingDate),
        adults: adultsCount,
        children: childrenCount,
        totalPersons: travellers.length,
        pickupCity,
        emergencyContact,
        totalPrice: computedTotalPrice,
        bookingStatus: "confirmed",
        paymentStatus: "pending",
        ticketNumber,
        issuedAt: new Date(),
        travellers: validatedTravellers,
    };

    const booking = await Booking.create(bookingData);

    const bookingResponse = {
        _id: booking._id,
        tourId: booking.tourId,
        tourName: booking.tourName,
        destination: booking.destination,
        duration: booking.duration,
        bookingDate: booking.bookingDate,
        pickupCity: booking.pickupCity,
        emergencyContact: booking.emergencyContact,
        totalPersons: booking.totalPersons,
        adults: booking.adults,
        children: booking.children,
        totalPrice: booking.totalPrice,
        ticketNumber: booking.ticketNumber,
        bookingStatus: booking.bookingStatus,
        paymentStatus: booking.paymentStatus,
        issuedAt: booking.issuedAt,
    };

    return res.status(201).json({
        success: true,
        message: "Booking created successfully",
        bookingId: booking._id,
        ticketNumber: booking.ticketNumber,
        booking: bookingResponse,
    });
});

export const generateTicketPDF = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid booking id",
        });
    }

    const booking = await Booking.findById(id);

    console.log("generateTicketPDF: Booking lookup completed for id", id);

    if (!booking) {
        return res.status(404).json({
            success: false,
            message: "Booking not found",
        });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename="wildvista-ticket-${booking.ticketNumber || booking._id}.pdf"`
    );

    const doc = new PDFDocument({ size: "A4", margin: MARGIN, autoFirstPage: true });

    doc.on("error", (error) => {
        console.error("generateTicketPDF: PDF document error", error);
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: "Failed to generate ticket PDF",
            });
        } else {
            res.destroy(error);
        }
    });

    res.on("close", () => {
        if (!res.writableEnded) {
            console.warn("generateTicketPDF: client closed connection before PDF generation completed");
            doc.destroy();
        }
    });

    doc.on("finish", () => {
        console.log(`generateTicketPDF: PDF generation finished for booking ${booking._id}`);
    });

    doc.pipe(res);
    console.log("generateTicketPDF: Starting PDF build for booking", booking._id);

    try {
        buildTicketDocument(doc, booking);
        doc.end();
    } catch (error) {
        console.error("generateTicketPDF: Error during ticket build", error);
        doc.destroy(error);
    }
});
