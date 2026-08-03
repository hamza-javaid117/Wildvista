import { motion } from "framer-motion";

const statusStyles = {
  Pending: "bg-amber-500/15 text-amber-300",
  Confirmed: "bg-emerald-500/15 text-emerald-300",
  Completed: "bg-sky-500/15 text-sky-300",
  Cancelled: "bg-rose-500/15 text-rose-300",
};

export default function BookingCard({ booking, variant = "upcoming" }) {
  const isHistory = variant === "history";

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-[24px] border border-white/10 bg-[#111111]/80 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <img src={booking.image} alt={booking.title} className="h-40 w-full object-cover" />
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-lg font-semibold text-white">{booking.title}</h4>
            <p className="text-sm text-gray-400">{isHistory ? "Completed journey" : `Booking ID: ${booking.id}`}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[booking.status] || "bg-white/10 text-gray-300"}`}>
            {booking.status}
          </span>
        </div>

        <div className="grid gap-2 text-sm text-gray-300 sm:grid-cols-2">
          <p><span className="text-gray-500">Travel Date:</span> {booking.date}</p>
          {!isHistory ? (
            <>
              <p><span className="text-gray-500">Pickup:</span> {booking.pickupCity}</p>
              <p><span className="text-gray-500">Travelers:</span> {booking.travelers}</p>
            </>
          ) : (
            <p><span className="text-gray-500">Paid:</span> {booking.amount}</p>
          )}
          <p><span className="text-gray-500">{isHistory ? "Paid" : "Amount"}:</span> {booking.amount}</p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button className="rounded-full border border-white/15 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10">
            {isHistory ? "View Details" : "View Booking"}
          </button>
          <button className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-emerald-400">
            {isHistory ? "Book Again" : "Download Invoice"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
