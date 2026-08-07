// ===== TOUR DATA SOURCE — all package pages pull from this shared file =====
export const tours = [
  {
    slug: "hunza-valley-adventure",
    availableSeats: 12,
    hero: {
      coverImage: "/images/Hunza.jpg",
      title: "Hunza Valley Adventure",
      location: "Hunza, Gilgit-Baltistan",
      duration: "5 Days / 4 Nights",
      shortDescription:
        "Snow-capped peaks, ancient forts, and skies full of stars — Hunza is where memories are made.",
    },
    pricing: {
      single: 450,
      couple: 800,
    },
    tourDetails: {
      duration: "5 Days / 4 Nights",
      location: "Hunza, Gilgit-Baltistan",
      departure: "Islamabad",
      transport: "Private 4x4 Jeep",
      groupSize: "2 - 12 People",
      bestSeason: "April - October",
    },
    hotelDetails: [
      {
        name: "Hunza Serena Inn",
        roomType: "Deluxe Mountain View",
        nights: 2,
        facilities: ["Free WiFi", "Breakfast Included", "Mountain View", "Heating"],
      },
      {
        name: "Eagle's Nest Hotel",
        roomType: "Premium Suite",
        nights: 2,
        facilities: ["Panoramic Views", "Room Service", "Parking", "Restaurant"],
      },
    ],
    specialFeatures: [
      { icon: "🚙", title: "Jeep Riding" },
      { icon: "🚣", title: "Boating" },
      { icon: "🔥", title: "Bonfire Nights" },
      { icon: "📸", title: "Photography Spots" },
      { icon: "🥾", title: "Guided Hiking" },
    ],
    gallery: [
      "/images/hunza/Hunza.jpg",
      "/images/hunza/hunza1.jpg",
      "/images/hunza/hunza2.jpg",
      "/images/hunza/hunza3.jpg",
      "/images/hunza/hunza4.jpg",
      "/images/Hunza.jpg",
    ],
    description: [
      "Tucked between some of the world's highest peaks, Hunza Valley feels like a place suspended in time. Terraced orchards cling to mountainsides, ancient forts watch over quiet villages, and the Karakoram Highway winds through scenery that shifts from golden autumn hues to snow-white winters.",
      "This five-day journey takes you through Karimabad, Altit Fort, Passu Cones, and the otherworldly turquoise of Attabad Lake. Evenings are spent around bonfires under some of the clearest night skies in the world.",
      "Whether you're chasing adventure or simply need to disconnect, Hunza offers a rare kind of stillness — the kind that stays with you long after you've left.",
    ],
  },
  {
    slug: "skardu-lakes-escape",
    availableSeats: 8,
    hero: {
      coverImage: "/images/Skardu.jpg",
      title: "Skardu Lakes Escape",
      location: "Skardu, Gilgit-Baltistan",
      duration: "6 Days / 5 Nights",
      shortDescription:
        "Gateway to the Karakoram — turquoise lakes, desert dunes, and towering giants.",
    },
    pricing: {
      single: 520,
      couple: 950,
    },
    tourDetails: {
      duration: "6 Days / 5 Nights",
      location: "Skardu, Gilgit-Baltistan",
      departure: "Islamabad",
      transport: "Private 4x4 Jeep",
      groupSize: "2 - 10 People",
      bestSeason: "May - September",
    },
    hotelDetails: [
      {
        name: "Shangrila Resort",
        roomType: "Lake View Cottage",
        nights: 3,
        facilities: ["Lake View", "Breakfast Included", "Boating", "Garden"],
      },
      {
        name: "Skardu Fort Hotel",
        roomType: "Standard Room",
        nights: 2,
        facilities: ["Free WiFi", "Parking", "Restaurant"],
      },
    ],
    specialFeatures: [
      { icon: "🚣", title: "Boating" },
      { icon: "🏜️", title: "Cold Desert Safari" },
      { icon: "🔥", title: "Bonfire Nights" },
      { icon: "📸", title: "Photography Spots" },
      { icon: "🥾", title: "Trekking" },
    ],
    gallery: [
      "/images/skardu/0670527e70dea0c0ded2670791de2752.jpg",
      "/images/skardu/117e2d71abd6f270b75f98c58ec5c72b.jpg",
      "/images/skardu/6ac7b60af5f6cfa158926c574822efe7.jpg",
      "/images/skardu/ee9000747322be49dc908a72a52bab59.jpg",
      "/images/skardu/eee6627eccb6c0a29c5de3bdcdca4b80.jpg",
      "/images/Skardu.jpg",
    ],
    description: [
      "Skardu sits at the doorstep of some of the tallest mountains on Earth, yet its charm lies just as much in its stillness — glassy lakes reflecting jagged peaks, and a cold desert that feels borrowed from another planet.",
      "Over six days, explore Shangrila Resort's lake, the vast Deosai Plains, and Kharpocho Fort overlooking the Indus River. This is a trip for those who want their travel to feel vast, quiet, and unforgettable.",
    ],
  },
  {
    slug: "fairy-meadows-trek",
    availableSeats: 5,
    hero: {
      coverImage: "/images/Fairy Meadows.jpg",
      title: "Fairy Meadows Trek",
      location: "Diamer, Gilgit-Baltistan",
      duration: "4 Days / 3 Nights",
      shortDescription:
        "A dreamlike campsite below Nanga Parbat with alpine meadows and unforgettable sunrises.",
    },
    pricing: {
      single: 390,
      couple: 710,
    },
    tourDetails: {
      duration: "4 Days / 3 Nights",
      location: "Fairy Meadows, Diamer",
      departure: "Islamabad",
      transport: "Jeep + Trek",
      groupSize: "2 - 8 People",
      bestSeason: "June - September",
    },
    hotelDetails: [
      {
        name: "Meadows Camp",
        roomType: "Shared Alpine Tent",
        nights: 2,
        facilities: ["Campfire", "Breakfast", "Trek Support", "Stargazing"],
      },
      {
        name: "Babusar Retreat",
        roomType: "Comfort Stay",
        nights: 1,
        facilities: ["WiFi", "Restaurant", "Parking", "Hot Tea"],
      },
    ],
    specialFeatures: [
      { icon: "🥾", title: "Trekking" },
      { icon: "⛰️", title: "Mountain Views" },
      { icon: "🌌", title: "Night Sky" },
      { icon: "📸", title: "Photography Spots" },
      { icon: "🔥", title: "Bonfire Nights" },
    ],
    gallery: [
      "/images/fairymedows/07fecc3112140bb623c6018d0ba6535b.jpg",
      "/images/fairymedows/5bb74cfae396748bdbf421ecc098902f.jpg",
      "/images/fairymedows/68688113670bf980b93140e5b34ec6c1.jpg",
      "/images/fairymedows/d5019395e7013977a32933bc4f1cad96.jpg",
      "/images/fairymedows/eee6627eccb6c0a29c5de3bdcdca4b80.jpg",
      "/images/Fairy Meadows.jpg",
    ],
    description: [
      "At Fairy Meadows, the mountains feel close enough to touch. Every curve of the path opens into another spectacular view of Nanga Parbat, and every evening settles into a quiet glow of dusk over the alpine grasslands.",
      "This short trek is designed for travelers who want a mix of adventure and tranquility, with scenic riding, forest trails, and a campsite that feels like a picture come to life.",
    ],
  },
  {
    slug: "naran-kaghan-experience",
    availableSeats: 10,
    hero: {
      coverImage: "/images/Naran-Kaghan.jpg",
      title: "Naran Kaghan Experience",
      location: "Naran, Khyber Pakhtunkhwa",
      duration: "5 Days / 4 Nights",
      shortDescription:
        "Crystal rivers, pine-lined valleys, and Himalayan drama at every turn.",
    },
    pricing: {
      single: 410,
      couple: 760,
    },
    tourDetails: {
      duration: "5 Days / 4 Nights",
      location: "Naran Kaghan Valley",
      departure: "Islamabad",
      transport: "Coaster + Local Transfer",
      groupSize: "2 - 14 People",
      bestSeason: "June - September",
    },
    hotelDetails: [
      {
        name: "Kaghan Heights Inn",
        roomType: "Standard Room",
        nights: 2,
        facilities: ["WiFi", "Breakfast", "Mountain View", "Restaurant"],
      },
      {
        name: "River Edge Lodge",
        roomType: "Family Suite",
        nights: 2,
        facilities: ["Waterfall View", "Parking", "Dinner", "Hot Shower"],
      },
    ],
    specialFeatures: [
      { icon: "🌊", title: "Lake Visits" },
      { icon: "🥾", title: "Easy Trekking" },
      { icon: "📸", title: "Photo Stops" },
      { icon: "🛶", title: "River Views" },
      { icon: "🔥", title: "Bonfire Nights" },
    ],
    gallery: [
      "/images/naran/e20fa207eea16c38a5282a75a8f02cd3.jpg",
      "/images/naran/jalal-ajmal-rdTFb_PZg6M-unsplash.jpg",
      "/images/naran/kamran-ch-hU18vj9N7Es-unsplash.jpg",
      "/images/naran/majyd-inam-Q0u4kDHiGEs-unsplash.jpg",
      "/images/naran/salsabeel-ehsan-Xvbyna9rvgw-unsplash.jpg",
      "/images/naran/zeesha-Or-JBKVa154-unsplash.jpg",
    ],
    description: [
      "Naran Kaghan is one of Pakistan's most accessible mountain escapes, where every mile adds a new postcard view. The landscape changes from green forest roads to roaring rivers and glacier-fed lakes, making it perfect for first-time highland explorers.",
      "This package balances scenic travel with comfort, taking you to the valley's most beautiful viewpoints while still leaving room for quiet evenings and shared meals with fellow travelers.",
    ],
  },
  {
    slug: "deosai-plains-expedition",
    availableSeats: 6,
    hero: {
      coverImage: "/images/Deosai-Plains.jpg",
      title: "Deosai Plains Expedition",
      location: "Deosai, Gilgit-Baltistan",
      duration: "7 Days / 6 Nights",
      shortDescription:
        "A high-altitude plateau that turns into a dreamscape of silence, wildflowers, and endless skies.",
    },
    pricing: {
      single: 610,
      couple: 1100,
    },
    tourDetails: {
      duration: "7 Days / 6 Nights",
      location: "Deosai Plains, Skardu",
      departure: "Islamabad",
      transport: "Private 4x4 Jeep",
      groupSize: "2 - 10 People",
      bestSeason: "June - August",
    },
    hotelDetails: [
      {
        name: "Skardu Highland Lodge",
        roomType: "Premium Stay",
        nights: 3,
        facilities: ["Breakfast", "WiFi", "Parking", "Restaurant"],
      },
      {
        name: "Deosai Camp Base",
        roomType: "Expedition Tent",
        nights: 3,
        facilities: ["Campfire", "Guide Support", "Hot Drinks", "Stargazing"],
      },
    ],
    specialFeatures: [
      { icon: "🏕️", title: "Camp Stay" },
      { icon: "🌼", title: "Wildflower Plains" },
      { icon: "🌌", title: "Astronomy Nights" },
      { icon: "🦅", title: "Wildlife Sightings" },
      { icon: "🥾", title: "Plateau Trek" },
    ],
    gallery: [
      "/images/dossaiplain/dossai1.jpg",
      "/images/dossaiplain/dossai2.jpg",
      "/images/dossaiplain/dossai3.jpg",
      "/images/dossaiplain/dossai4.jpg",
      "/images/dossaiplain/5bb74cfae396748bdbf421ecc098902f.jpg",
      "/images/Deosai-Plains.jpg",
    ],
    description: [
      "Deosai is one of the world's highest plateaus, known for its dramatic openness and silence. Here, the horizon looks infinite, and every step across the grasslands feels like entering another world.",
      "The journey is crafted for explorers who want more than scenery — it is a front-row seat to vast skies, rare wildlife, and a sense of remote solitude that is hard to find elsewhere.",
    ],
  },
  {
    slug: "neelum-valley-retreat",
    availableSeats: 15,
    hero: {
      coverImage: "/images/Neelum-Valley.jpg",
      title: "Neelum Valley Retreat",
      location: "Neelum, Azad Kashmir",
      duration: "4 Days / 3 Nights",
      shortDescription:
        "Lush green valleys, flowing rivers, and postcard-worthy mountain roads.",
    },
    pricing: {
      single: 360,
      couple: 680,
    },
    tourDetails: {
      duration: "4 Days / 3 Nights",
      location: "Neelum Valley, Azad Kashmir",
      departure: "Islamabad",
      transport: "Comfort Coaster",
      groupSize: "2 - 12 People",
      bestSeason: "May - October",
    },
    hotelDetails: [
      {
        name: "Neelum View Resort",
        roomType: "Premium Room",
        nights: 2,
        facilities: ["Mountain View", "Breakfast", "Restaurant", "Parking"],
      },
      {
        name: "Riverside Stay",
        roomType: "Luxe Cottage",
        nights: 1,
        facilities: ["River View", "Tea Service", "Garden", "WiFi"],
      },
    ],
    specialFeatures: [
      { icon: "🌿", title: "Valley Walks" },
      { icon: "🏞️", title: "River View" },
      { icon: "🍃", title: "Scenic Roads" },
      { icon: "📸", title: "Photography Stops" },
      { icon: "🔥", title: "Bonfire Evenings" },
    ],
    gallery: [
      "/images/Neelum-Valley.jpg",
      "/images/naran/e20fa207eea16c38a5282a75a8f02cd3.jpg",
      "/images/naran/jalal-ajmal-rdTFb_PZg6M-unsplash.jpg",
      "/images/naran/kamran-ch-hU18vj9N7Es-unsplash.jpg",
      "/images/naran/majyd-inam-Q0u4kDHiGEs-unsplash.jpg",
      "/images/naran/salsabeel-ehsan-Xvbyna9rvgw-unsplash.jpg",
    ],
    description: [
      "Neelum Valley wraps the traveler in layers of green — misty mountain roads, pine-covered slopes, and stone houses tucked into the hillside. It is the kind of place that slows the body down and sharpens the senses.",
      "This retreat is built for peaceful travel, with scenic stops, local style stays, and plenty of room to simply take in the view.",
    ],
  },
  {
    slug: "passu-cones-safari",
    availableSeats: 7,
    hero: {
      coverImage: "/images/Passu-cone.jpg",
      title: "Passu Cones Safari",
      location: "Passu, Gilgit-Baltistan",
      duration: "5 Days / 4 Nights",
      shortDescription:
        "Sharp granite towers, glacier roads, and the kind of landscape that looks unreal.",
    },
    pricing: {
      single: 470,
      couple: 860,
    },
    tourDetails: {
      duration: "5 Days / 4 Nights",
      location: "Passu, Gilgit-Baltistan",
      departure: "Islamabad",
      transport: "Private 4x4 Jeep",
      groupSize: "2 - 10 People",
      bestSeason: "April - October",
    },
    hotelDetails: [
      {
        name: "Passu Glacier Inn",
        roomType: "Mountain View Room",
        nights: 2,
        facilities: ["WiFi", "Breakfast", "Mountain View", "Heating"],
      },
      {
        name: "Karakoram Lodge",
        roomType: "Comfort Suite",
        nights: 2,
        facilities: ["Restaurant", "Parking", "Tea Service", "Hot Shower"],
      },
    ],
    specialFeatures: [
      { icon: "🏔️", title: "Cone Views" },
      { icon: "🚙", title: "Jeep Ride" },
      { icon: "📸", title: "Photography" },
      { icon: "🧭", title: "Scenic Drive" },
      { icon: "🔥", title: "Bonfire Nights" },
    ],
    gallery: [
      "/images/passucones/2a84a53cce5d40a7eabb5b65b7ff0f28.jpg",
      "/images/passucones/ac1fa84a5fb4c4b5bf6156e7303b137f.jpg",
      "/images/passucones/b07783f0ab6edaa18a2b339ab6b3b355.jpg",
      "/images/passucones/ce595dc5b99cb099b7a23da5fb68418f.jpg",
      "/images/Passu-cone.jpg",
    ],
    description: [
      "Passu Cones are among the most recognizable mountain forms in Pakistan. Their steep faces and clean lines dominate the skyline, giving the valley a cinematic look that feels almost impossible to forget.",
      "The route takes you through some of the region's most dramatic roads and viewpoints, with stops for photography, local flavor, and a chance to simply witness a landscape that changes by the hour.",
    ],
  },
  {
    slug: "attabad-lake-journey",
    availableSeats: 9,
    hero: {
      coverImage: "/images/Attabad-Lake.jpg",
      title: "Attabad Lake Journey",
      location: "Attabad, Hunza",
      duration: "3 Days / 2 Nights",
      shortDescription:
        "Turquoise water, dramatic cliffs, and the unforgettable beauty of Hunza's most iconic lake.",
    },
    pricing: {
      single: 320,
      couple: 590,
    },
    tourDetails: {
      duration: "3 Days / 2 Nights",
      location: "Attabad Lake, Hunza",
      departure: "Islamabad",
      transport: "Private 4x4 Jeep",
      groupSize: "2 - 8 People",
      bestSeason: "April - October",
    },
    hotelDetails: [
      {
        name: "Lakeview Hotel",
        roomType: "Deluxe Room",
        nights: 1,
        facilities: ["Lake View", "Breakfast", "Restaurant", "Parking"],
      },
      {
        name: "Hunza Heritage Stay",
        roomType: "Comfort Suite",
        nights: 1,
        facilities: ["Mountain View", "Tea Service", "WiFi", "Garden"],
      },
    ],
    specialFeatures: [
      { icon: "🚤", title: "Lake Boat Ride" },
      { icon: "📸", title: "Photography" },
      { icon: "🧭", title: "Scenic Drive" },
      { icon: "🔥", title: "Campfire" },
      { icon: "🌅", title: "Golden Hour" },
    ],
    gallery: [
      "/images/Attabad-Lake.jpg",
      "/images/hunza/Hunza.jpg",
      "/images/hunza/hunza1.jpg",
      "/images/hunza/hunza2.jpg",
      "/images/hunza/hunza3.jpg",
      "/images/hunza/hunza4.jpg",
    ],
    description: [
      "Attabad Lake is one of the most visually striking stops in the north, where a reservoir of bright turquoise water sits between steep valley walls and endless mountain backdrop.",
      "This shorter tour gives you a relaxed pace, superb views, and a memorable experience centered around one of Hunza's signature landscapes.",
    ],
  },
];

const parseTourPrice = (value) => {
  if (typeof value === "number" && !Number.isNaN(value)) {
    return value;
  }
  if (typeof value === "string") {
    const digits = Number(value.replace(/[^\d.]/g, ""));
    if (!Number.isFinite(digits)) {
      return 0;
    }
    const hasCurrencySuffix = /\/\-|PKR|Rs|rs/i.test(value);
    return hasCurrencySuffix && digits > 100 ? digits / 100 : digits;
  }
  return 0;
};

export const getPriceInPKR = (value) => parseTourPrice(value) * 100;

export const formatPKR = (value) => {
  const amount = getPriceInPKR(value);
  return new Intl.NumberFormat("en-IN").format(amount);
};

export const getTourBySlug = (slug) => tours.find((t) => t.slug === slug);