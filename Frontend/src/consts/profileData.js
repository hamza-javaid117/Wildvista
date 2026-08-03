export const profileData = {
  user: {
    name: "Ava Rahman",
    email: "ava@wildvista.com",
    phone: "+92 300 1234567",
    memberSince: "March 2024",
    avatar: "/images/hero.jpg",
    completedTours: 12,
    upcomingTours: 3,
  },
  stats: [
    { title: "Tours Completed", value: "12", accent: "bg-emerald-400" },
    { title: "Upcoming Tours", value: "3", accent: "bg-sky-400" },
    { title: "Total Amount Spent", value: "PKR 458,000", accent: "bg-violet-400" },
    { title: "Reviews Given", value: "8", accent: "bg-amber-400" },
  ],
  upcomingBookings: [
    {
      id: "WV-2048",
      title: "Fairy Meadows Escape",
      image: "/images/fairymedows/Fairy Meadows.jpg",
      date: "15 Aug 2026",
      pickupCity: "Islamabad",
      travelers: 2,
      status: "Confirmed",
      amount: "PKR 94,000",
    },
    {
      id: "WV-3012",
      title: "Hunza Valley Adventure",
      image: "/images/hunza/Hunza.jpg",
      date: "28 Aug 2026",
      pickupCity: "Lahore",
      travelers: 4,
      status: "Pending",
      amount: "PKR 168,000",
    },
  ],
  bookingHistory: [
    {
      title: "Skardu Highlands",
      image: "/images/skardu/Skardu.jpg",
      date: "10 Jul 2026",
      amount: "PKR 122,000",
      status: "Completed",
    },
    {
      title: "Naran Kaghan Retreat",
      image: "/images/naran/Naran-Kaghan.jpg",
      date: "02 Jun 2026",
      amount: "PKR 79,500",
      status: "Completed",
    },
  ],
  reviews: [
    {
      id: 1,
      tour: "Skardu Highlands",
      rating: 5,
      comment: "An unforgettable escape with luxury stays and seamless planning.",
      date: "12 Jul 2026",
    },
  ],
  wishlist: [
    {
      title: "Deosai Plains",
      image: "/images/Deosai-Plains.jpg",
    },
    {
      title: "Passu Cones",
      image: "/images/Passu-cone.jpg",
    },
  ],
  travelers: [
    {
      name: "Ava Rahman",
      idNumber: "61101-1234567-8",
      dob: "14 May 1994",
      gender: "Female",
    },
  ],
  notifications: [
    "Booking Confirmed",
    "Payment Received",
    "Tour Reminder",
    "Special Offers",
  ],
};
