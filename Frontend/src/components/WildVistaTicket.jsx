import React from "react";

const defaultData = {
  ticketNumber: "{{ticketNumber}}",
  bookingId: "{{bookingId}}",
  bookingStatus: "{{bookingStatus}}",
  paymentStatus: "{{paymentStatus}}",
  issuedDate: "{{issuedDate}}",
  bookingDate: "{{bookingDate}}",
  travelDate: "{{travelDate}}",
  tourName: "{{tourName}}",
  tourId: "{{tourId}}",
  pickupCity: "{{pickupCity}}",
  departureTime: "{{departureTime}}",
  reportingTime: "{{reportingTime}}",
  duration: "{{duration}}",
  destination: "{{destination}}",
  leadTraveller: "{{leadTraveller}}",
  phone: "{{phone}}",
  email: "{{email}}",
  emergencyContact: "{{emergencyContact}}",
  travellers: [
    {
      name: "{{travellerName}}",
      cnic: "{{cnicPassport}}",
      age: "{{age}}",
      gender: "{{gender}}",
      phone: "{{phone}}",
      email: "{{email}}",
    },
  ],
  adults: "{{adults}}",
  children: "{{children}}",
  totalPersons: "{{totalPersons}}",
  pricePerAdult: "{{pricePerAdult}}",
  childDiscount: "{{childDiscount}}",
  totalPrice: "{{totalPrice}}",
  meetingPoint: "{{meetingPoint}}",
  pickupInstructions: "{{pickupInstructions}}",
  tourGuidelines: "{{tourGuidelines}}",
  thingsToBring: "{{thingsToBring}}",
  website: "{{website}}",
  supportEmail: "{{supportEmail}}",
  supportPhone: "{{supportPhone}}",
};

function StatusPill({ label, tone = "green" }) {
  const tones = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    slate: "bg-stone-100 text-stone-700 border-stone-200",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${tones[tone]}`}>
      {label}
    </span>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50/80 p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-500">{label}</p>
      <p className="text-[13px] font-semibold text-stone-800">{value}</p>
    </div>
  );
}

function SectionHeading({ title }) {
  return (
    <div className="mb-4 flex items-center justify-between border-b border-stone-200 pb-2">
      <h3 className="text-[13px] font-semibold uppercase tracking-[0.25em] text-stone-700">{title}</h3>
      <div className="h-[1px] flex-1 bg-stone-200" />
    </div>
  );
}

export default function WildVistaTicket({ data = defaultData }) {
  const ticket = { ...defaultData, ...data };
  const travellers = Array.isArray(ticket.travellers) && ticket.travellers.length > 0 ? ticket.travellers : [defaultData.travellers[0]];

  return (
    <div className="min-h-screen bg-[#f4f2eb] px-3 py-4 text-stone-800 sm:px-5 lg:px-8">
      <div className="mx-auto flex max-w-[980px] flex-col overflow-hidden rounded-[30px] border border-stone-200 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.08)]">
        <div className="border-b border-stone-200 bg-[linear-gradient(135deg,#ffffff_0%,#f8f7f1_100%)] px-6 py-8 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-[16px] font-black uppercase tracking-[0.2em] text-emerald-700">
                  WV
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-700">WildVista</p>
                  <h1 className="text-[28px] font-black uppercase tracking-[0.2em] text-stone-900">Travel E-Ticket</h1>
                </div>
              </div>
              <p className="text-[12px] font-medium uppercase tracking-[0.32em] text-stone-500">Official Booking Confirmation</p>
            </div>

            <div className="rounded-[24px] border border-stone-200 bg-white p-4 shadow-[0_6px_18px_rgba(0,0,0,0.04)] lg:min-w-[300px]">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-500">Ticket Number</p>
                  <p className="text-[14px] font-bold text-stone-900">{ticket.ticketNumber}</p>
                </div>
                <StatusPill label={ticket.bookingStatus} tone="green" />
              </div>
              <div className="grid grid-cols-2 gap-3 text-[12px]">
                <div>
                  <p className="text-stone-500">Issue Date</p>
                  <p className="font-semibold text-stone-800">{ticket.issuedDate}</p>
                </div>
                <div>
                  <p className="text-stone-500">Payment</p>
                  <p className="font-semibold text-stone-800">{ticket.paymentStatus}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-stone-200 bg-stone-50 px-6 py-4 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-3">
            <StatusPill label={`Booking: ${ticket.bookingStatus}`} tone="green" />
            <StatusPill label={`Payment: ${ticket.paymentStatus}`} tone="amber" />
            <StatusPill label={`ID: ${ticket.bookingId}`} tone="slate" />
          </div>
        </div>

        <div className="px-6 py-7 sm:px-8 lg:px-10">
          <div className="mb-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <InfoCard label="Booking ID" value={ticket.bookingId} />
            <InfoCard label="Booking Date" value={ticket.bookingDate} />
            <InfoCard label="Issued Date" value={ticket.issuedDate} />
            <InfoCard label="Tour ID" value={ticket.tourId} />
          </div>

          <div className="mb-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <InfoCard label="Tour Name" value={ticket.tourName} />
            <InfoCard label="Travel Date" value={ticket.travelDate} />
            <InfoCard label="Pickup City" value={ticket.pickupCity} />
            <InfoCard label="Departure Time" value={ticket.departureTime} />
          </div>

          <div className="mb-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <InfoCard label="Reporting Time" value={ticket.reportingTime} />
            <InfoCard label="Duration" value={ticket.duration} />
            <InfoCard label="Destination" value={ticket.destination} />
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-700">QR Code</p>
              <div className="h-16 w-full rounded-xl border border-dashed border-amber-300 bg-white/70" />
            </div>
          </div>

          <div className="mb-7 rounded-[24px] border border-stone-200 bg-stone-50/80 p-5">
            <SectionHeading title="Lead Traveller / Lead Booker" />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <InfoCard label="Lead Traveller" value={ticket.leadTraveller} />
              <InfoCard label="Phone Number" value={ticket.phone} />
              <InfoCard label="Email Address" value={ticket.email} />
              <InfoCard label="Emergency Contact" value={ticket.emergencyContact} />
            </div>
          </div>

          <div className="mb-7 rounded-[24px] border border-stone-200 bg-white p-5">
            <SectionHeading title="Traveller Details" />
            <div className="overflow-hidden rounded-2xl border border-stone-200">
              <table className="min-w-full divide-y divide-stone-200 text-left text-[12px]">
                <thead className="bg-stone-100 text-stone-600">
                  <tr>
                    <th className="px-3 py-3 font-semibold">#</th>
                    <th className="px-3 py-3 font-semibold">Full Name</th>
                    <th className="px-3 py-3 font-semibold">CNIC / Passport</th>
                    <th className="px-3 py-3 font-semibold">Age</th>
                    <th className="px-3 py-3 font-semibold">Gender</th>
                    <th className="px-3 py-3 font-semibold">Phone</th>
                    <th className="px-3 py-3 font-semibold">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 bg-white">
                  {travellers.map((traveller, index) => (
                    <tr key={`${traveller.name}-${index}`} className="even:bg-stone-50">
                      <td className="px-3 py-3 font-semibold text-stone-600">{index + 1}</td>
                      <td className="px-3 py-3 font-medium text-stone-800">{traveller.name}</td>
                      <td className="px-3 py-3 text-stone-700">{traveller.cnic}</td>
                      <td className="px-3 py-3 text-stone-700">{traveller.age}</td>
                      <td className="px-3 py-3 text-stone-700">{traveller.gender}</td>
                      <td className="px-3 py-3 text-stone-700">{traveller.phone}</td>
                      <td className="px-3 py-3 text-stone-700">{traveller.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-7 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[24px] border border-stone-200 bg-stone-50/80 p-5">
              <SectionHeading title="Important Information" />
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-500">Meeting Point</p>
                  <p className="text-[13px] font-medium text-stone-700">{ticket.meetingPoint}</p>
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-500">Pickup Instructions</p>
                  <p className="text-[13px] font-medium text-stone-700">{ticket.pickupInstructions}</p>
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-500">Tour Guidelines</p>
                  <p className="text-[13px] font-medium text-stone-700">{ticket.tourGuidelines}</p>
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-500">Things to Bring</p>
                  <p className="text-[13px] font-medium text-stone-700">{ticket.thingsToBring}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-stone-200 bg-[linear-gradient(180deg,#fefefe_0%,#f8f6ee_100%)] p-5">
              <SectionHeading title="Booking Summary" />
              <div className="space-y-3 text-[13px] text-stone-700">
                <div className="flex items-center justify-between">
                  <span>Adults</span>
                  <span className="font-semibold">{ticket.adults}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Children</span>
                  <span className="font-semibold">{ticket.children}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Persons</span>
                  <span className="font-semibold">{ticket.totalPersons}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Price Per Adult</span>
                  <span className="font-semibold">{ticket.pricePerAdult}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Child Discount</span>
                  <span className="font-semibold">{ticket.childDiscount}</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-4">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-stone-500">Total Amount</span>
                  <span className="text-[18px] font-black text-emerald-700">{ticket.totalPrice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Payment Status</span>
                  <StatusPill label={ticket.paymentStatus} tone="amber" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-stone-200 bg-stone-50/70 p-5">
            <SectionHeading title="Terms & Conditions" />
            <div className="grid gap-3 text-[12px] leading-6 text-stone-600 md:grid-cols-2">
              <p>{"Please arrive at the reporting time with valid identification and booking confirmation."}</p>
              <p>{"Changes are subject to availability and may require prior approval from the travel team."}</p>
              <p>{"All travellers are responsible for carrying personal essentials and following the tour guide instructions."}</p>
              <p>{"Payment terms and cancellation rules apply as confirmed at the time of booking."}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-200 bg-stone-50 px-6 py-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.25em] text-stone-700">WildVista</p>
              <p className="mt-1 text-[12px] text-stone-500">Customer Support · {ticket.website}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[12px] text-stone-600">
              <span>{ticket.supportEmail}</span>
              <span>{ticket.supportPhone}</span>
              <span>Instagram • Facebook • X</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full border border-stone-200 bg-white" />
              <div className="h-12 w-20 rounded-xl border border-dashed border-stone-300 bg-white" />
              <div className="h-12 w-24 rounded-xl border border-dashed border-stone-300 bg-white" />
            </div>
          </div>
          <div className="mt-3 border-t border-stone-200 pt-3 text-[11px] uppercase tracking-[0.25em] text-stone-500">
            © 2026 WildVista. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
