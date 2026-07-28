// ===== shared price data — used by RoomSelection, ExtraServices, and price calculation =====
export const ROOM_OPTIONS = [
  { value: "single", label: "Single Room", price: 0, description: "Standard single occupancy room" },
  { value: "double", label: "Double Room", price: 3000, description: "Queen/Twin bed for 2 persons" },
  { value: "triple", label: "Triple Room", price: 5000, description: "3 single beds or 1 double + 1 single" },
  { value: "family", label: "Family Room", price: 8000, description: "Spacious suite for up to 4-5 persons" },
];

export const EXTRA_SERVICES = [
  { value: "privateRoom", label: "Private Hotel Room", price: 12000, icon: "🏨", description: "Upgrade to private luxury suite" },
  { value: "jeepSafari", label: "Jeep Safari", price: 5000, icon: "🚙", description: "Off-road 4x4 mountain expedition" },
  { value: "bonfire", label: "Bonfire", price: 2000, icon: "🔥", description: "Stargazing campfire with musical evening" },
  { value: "airportPickup", label: "Airport Pickup", price: 3000, icon: "🛬", description: "Private airport transfer on arrival" },
  { value: "photography", label: "Photography", price: 4000, icon: "📸", description: "Professional photographer session" },
];

export const PICKUP_CITIES = [
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Karachi",
  "Multan",
  "Faisalabad",
];