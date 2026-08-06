import fs from 'fs';
import PDFDocument from 'pdfkit';
import { buildTicketDocument } from './src/controllers/booking.controller.js';

const booking = {
  _id: '649f3b1e0000000000000000',
  ticketNumber: 'WV-2026-123456',
  bookingStatus: 'confirmed',
  paymentStatus: 'pending',
  issuedAt: new Date(),
  bookingDate: new Date('2026-09-15'),
  tourName: 'Hunza Valley Adventure',
  tourId: 'HUNZA123',
  pickupCity: 'Islamabad',
  emergencyContact: '+923001234567',
  duration: '5 Days / 4 Nights',
  destination: 'Hunza Valley',
  totalPrice: 250000,
  adults: 2,
  children: 1,
  totalPersons: 3,
  travellers: [
    { name: 'Ali Khan', cnic: '61101-1234567-8', phone: '03001234567', email: 'ali.khan@example.com', gender: 'Male', age: 34 },
    { name: 'Sara Ahmed', cnic: '61101-2234567-8', phone: '03007654321', email: 'sara.ahmed@example.com', gender: 'Female', age: 28 },
    { name: 'Zara Khan', cnic: '61101-3234567-8', phone: '03012345678', email: 'zara.khan@example.com', gender: 'Female', age: 8 },
  ],
};

const output = fs.createWriteStream('test-ticket.pdf');
const doc = new PDFDocument({ size: 'A4', margin: 36, autoFirstPage: true });
const originalAddPage = doc.addPage.bind(doc);
let addCount = 0;
doc.addPage = function (...args) {
  addCount += 1;
  console.log('*** addPage called:', addCount, 'current page', doc.page?.number);
  return originalAddPage(...args);
};

const originalText = doc.text.bind(doc);
doc.text = function (text, x, y, options) {
  const before = { x: doc.x, y: doc.y, page: doc.page?.number };
  const result = originalText(text, x, y, options);
  const after = { x: doc.x, y: doc.y, page: doc.page?.number };
  if (before.page !== after.page) {
    console.log('--- text moved to new page', before, after, 'text:', String(text).slice(0, 40));
  }
  return result;
};

const wrappedBuild = async () => {
  console.log('starting PDF generation');
  buildTicketDocument(doc, booking);
  doc.end();
  await new Promise((resolve, reject) => {
    output.on('finish', resolve);
    output.on('error', reject);
  });
  console.log('Done addCount', addCount);
  const pdf = fs.readFileSync('test-ticket.pdf');
  const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page/g) || []).length;
  console.log('pageCount', pages);
};

await wrappedBuild();
