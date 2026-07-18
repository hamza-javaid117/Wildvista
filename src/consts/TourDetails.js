// ===== SAMPLE TOUR DATA — replace/add real tours here, page pulls everything from this file =====
export const tours = [
    {
      slug: "hunza-valley-adventure",
      hero: {
        coverImage: "https://source.unsplash.com/1600x900/?hunza,valley,mountains",
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
        "https://source.unsplash.com/800x600/?hunza,mountains",
        "https://source.unsplash.com/800x600/?hunza,lake",
        "https://source.unsplash.com/800x600/?hunza,valley",
        "https://source.unsplash.com/800x600/?karakoram",
        "https://source.unsplash.com/800x600/?passu,cones",
        "https://source.unsplash.com/800x600/?attabad,lake",
      ],
      description: [
        "Tucked between some of the world's highest peaks, Hunza Valley feels like a place suspended in time. Terraced orchards cling to mountainsides, ancient forts watch over quiet villages, and the Karakoram Highway winds through scenery that shifts from golden autumn hues to snow-white winters.",
        "This five-day journey takes you through Karimabad, Altit Fort, Passu Cones, and the otherworldly turquoise of Attabad Lake. Evenings are spent around bonfires under some of the clearest night skies in the world.",
        "Whether you're chasing adventure or simply need to disconnect, Hunza offers a rare kind of stillness — the kind that stays with you long after you've left.",
      ],
    },
    {
      slug: "skardu-lakes-escape",
      hero: {
        coverImage: "https://source.unsplash.com/1600x900/?skardu,lake",
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
        "https://source.unsplash.com/800x600/?skardu",
        "https://source.unsplash.com/800x600/?shangrila,lake",
        "https://source.unsplash.com/800x600/?deosai",
        "https://source.unsplash.com/800x600/?karakoram,peak",
        "https://source.unsplash.com/800x600/?cold,desert",
        "https://source.unsplash.com/800x600/?baltistan",
      ],
      description: [
        "Skardu sits at the doorstep of some of the tallest mountains on Earth, yet its charm lies just as much in its stillness — glassy lakes reflecting jagged peaks, and a cold desert that feels borrowed from another planet.",
        "Over six days, explore Shangrila Resort's lake, the vast Deosai Plains, and Kharpocho Fort overlooking the Indus River. This is a trip for those who want their travel to feel vast, quiet, and unforgettable.",
      ],
    },
  ];
  
  // helper to find a tour by its slug (used by the dynamic page)
  export const getTourBySlug = (slug) => tours.find((t) => t.slug === slug);