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

const outputPath = './test-build.pdf';
const output = fs.createWriteStream(outputPath);
const doc = new PDFDocument({ size: 'A4', margin: 36, autoFirstPage: true });
let addCount = 0;
const originalAddPage = PDFDocument.prototype.addPage;
PDFDocument.prototype.addPage = function (...args) {
  addCount += 1;
  console.log('*** prototype addPage called', addCount, 'page', this.page?.number);
  return originalAddPage.apply(this, args);
};

doc.pipe(output);

try {
  console.log('building ticket');
  buildTicketDocument(doc, booking);
  console.log('finished buildTicketDocument');
  doc.end();
} catch (err) {
  console.error('buildTicketDocument threw', err);
}

output.on('finish', () => {
  console.log('output finish', addCount);
  const pdf = fs.readFileSync(outputPath);
  console.log('pdf size', pdf.length);
  console.log('pageCount', (pdf.toString('latin1').match(/\/Type\s*\/Page/g) || []).length);
});
output.on('error', (err) => {
  console.error('output error', err);
});
