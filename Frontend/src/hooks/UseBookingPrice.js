import { useMemo } from "react";

// ===== calculates an ESTIMATED total for preview only =====
// Backend must always recalculate the real price from the database —
// this value should never be trusted or sent as the final price.
export default function useBookingPrice({ basePrice = 0, adults = 1, roomPrice = 0, extrasTotal = 0 }) {
  return useMemo(() => {
    const travelersCount = Math.max(1, Number(adults) || 1);
    const tourTotal = Number(basePrice || 0) * travelersCount;
    const roomTotal = Number(roomPrice || 0);
    const extras = Number(extrasTotal || 0);
    const total = tourTotal + roomTotal + extras;

    return {
      travelersCount,
      tourTotal,
      roomTotal,
      extrasTotal: extras,
      total,
    };
  }, [basePrice, adults, roomPrice, extrasTotal]);
}