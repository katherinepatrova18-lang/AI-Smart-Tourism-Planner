// Sample data for seeding the database
// Run this in MongoDB directly or use it as reference

const destinations = [
  {
    name: 'Goa',
    location: 'West Coast, India',
    description: 'Goa is a perfect blend of adventure, culture, and relaxation. Known for its golden beaches, vibrant nightlife, Portuguese architecture, and delicious coastal cuisine. Perfect for beach lovers and party enthusiasts.',
    coverImage: 'https://images.unsplash.com/photo-1512453181578-de9e36838981?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1512453181578-de9e36838981?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    bestTime: 'November - February',
    weather: {
      temperature: '28-32°C',
      condition: 'Tropical',
      season: 'Winter'
    },
    rating: 4.7,
    estimatedBudget: {
      min: 500,
      max: 2000,
      currency: 'USD'
    },
    attractions: [
      {
        name: 'Baga Beach',
        description: 'Popular beach known for water sports and nightlife',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'
      },
      {
        name: 'Fort Aguada',
        description: '17th century Portuguese fort with lighthouse',
        image: 'https://images.unsplash.com/photo-1518599504759-0365c1982dcd?w=400'
      }
    ],
    foods: [
      {
        name: 'Fish Curry',
        description: 'Traditional Goan fish curry with coconut and spices',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
      }
    ],
    mapCoordinates: {
      latitude: 15.3004,
      longitude: 73.8343
    },
    isPopular: true
  },
  {
    name: 'Manali',
    location: 'Himachal Pradesh, India',
    description: 'A picturesque hill station nestled in the Himalayas, Manali is a paradise for adventure seekers. Enjoy trekking, paragliding, skiing, and stunning mountain views. Famous for its temples, apple orchards, and adventure sports.',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=800'
    ],
    bestTime: 'March - June, September - October',
    weather: {
      temperature: '10-20°C',
      condition: 'Cool and pleasant',
      season: 'Spring & Autumn'
    },
    rating: 4.8,
    estimatedBudget: {
      min: 600,
      max: 1800,
      currency: 'USD'
    },
    attractions: [
      {
        name: 'Solang Valley',
        description: 'Adventure sports paradise with paragliding and skiing',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
      }
    ],
    foods: [
      {
        name: 'Himachali Chikhalwali',
        description: 'Traditional Himachali cuisine with local flavors',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
      }
    ],
    mapCoordinates: {
      latitude: 32.2396,
      longitude: 77.1887
    },
    isPopular: true
  },
  {
    name: 'Kashmir',
    location: 'Jammu and Kashmir, India',
    description: 'The Crown Jewel of India, Kashmir offers breathtaking natural beauty with snow-capped mountains, pristine lakes, and lush valleys. A romantic destination perfect for couples and nature lovers.',
    coverImage: 'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    bestTime: 'April - October',
    weather: {
      temperature: '5-15°C',
      condition: 'Mild',
      season: 'Spring & Autumn'
    },
    rating: 4.9,
    estimatedBudget: {
      min: 800,
      max: 2500,
      currency: 'USD'
    },
    attractions: [
      {
        name: 'Dal Lake',
        description: 'Iconic lake with stunning mountain backdrop',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
      }
    ],
    foods: [
      {
        name: 'Kashmiri Wazwan',
        description: 'Traditional Kashmiri multi-course cuisine',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
      }
    ],
    mapCoordinates: {
      latitude: 34.0837,
      longitude: 74.7973
    },
    isPopular: true
  },
  {
    name: 'Jaipur',
    location: 'Rajasthan, India',
    description: 'The Pink City of India, Jaipur is a modern city with a touch of royal history. Famous for the City Palace, Jantar Mantar, and Hawa Mahal. A perfect blend of culture, history, and vibrant bazaars.',
    coverImage: 'https://images.unsplash.com/photo-1582610305589-6cfa0f9b5985?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1582610305589-6cfa0f9b5985?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    bestTime: 'October - March',
    weather: {
      temperature: '25-35°C',
      condition: 'Hot and dry',
      season: 'Winter'
    },
    rating: 4.6,
    estimatedBudget: {
      min: 400,
      max: 1500,
      currency: 'USD'
    },
    attractions: [
      {
        name: 'Hawa Mahal',
        description: 'The iconic Palace of Winds',
        image: 'https://images.unsplash.com/photo-1582610305589-6cfa0f9b5985?w=400'
      }
    ],
    foods: [
      {
        name: 'Ghevar',
        description: 'Traditional Rajasthani sweet',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
      }
    ],
    mapCoordinates: {
      latitude: 26.9124,
      longitude: 75.7873
    },
    isPopular: true
  },
  {
    name: 'Kerala',
    location: 'South India',
    description: 'God\'s Own Country! Kerala is a tropical paradise with backwaters, beaches, houseboats, and lush plantations. Known for Ayurveda, spices, and serene landscapes.',
    coverImage: 'https://images.unsplash.com/photo-1599839725105-d9f76b3ae0b3?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1599839725105-d9f76b3ae0b3?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    bestTime: 'June - September, November - February',
    weather: {
      temperature: '25-30°C',
      condition: 'Tropical',
      season: 'Monsoon & Winter'
    },
    rating: 4.8,
    estimatedBudget: {
      min: 700,
      max: 2000,
      currency: 'USD'
    },
    attractions: [
      {
        name: 'Backwaters',
        description: 'Scenic backwaters and houseboat cruises',
        image: 'https://images.unsplash.com/photo-1599839725105-d9f76b3ae0b3?w=400'
      }
    ],
    foods: [
      {
        name: 'Appam & Stew',
        description: 'Traditional Kerala breakfast dish',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
      }
    ],
    mapCoordinates: {
      latitude: 10.8505,
      longitude: 76.2711
    },
    isPopular: true
  },
  {
    name: 'Leh Ladakh',
    location: 'Union Territory, India',
    description: 'The adventure capital of India! Leh Ladakh offers breathtaking mountain landscapes, high altitude passes, ancient monasteries, and an unforgettable trekking experience. Perfect for thrill-seekers.',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=800'
    ],
    bestTime: 'June - September',
    weather: {
      temperature: '0-15°C',
      condition: 'Cold and dry',
      season: 'Summer'
    },
    rating: 4.9,
    estimatedBudget: {
      min: 1000,
      max: 3000,
      currency: 'USD'
    },
    attractions: [
      {
        name: 'Khardung La Pass',
        description: 'One of the highest passes in the world',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
      }
    ],
    foods: [
      {
        name: 'Momos',
        description: 'Traditional Ladakhi dumplings',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
      }
    ],
    mapCoordinates: {
      latitude: 34.1526,
      longitude: 77.5770
    },
    isPopular: true
  }
];

const hotels = [
  {
    name: 'Ocean Breeze Resort',
    destination: 'Goa',
    location: 'Baga Beach, Goa',
    description: 'Luxury beachfront resort with world-class amenities, pristine beaches, and excellent service. Perfect for a relaxing vacation.',
    bannerImage: 'https://images.unsplash.com/photo-1496417263034-38461f403636?w=800',
    rating: 4.8,
    price: {
      perNight: 120,
      currency: 'USD'
    },
    facilities: ['WiFi', 'Pool', 'Beach Access', 'Spa', 'Restaurant', 'Bar'],
    rooms: [
      { roomType: 'Deluxe', maxGuests: 2, price: 120 },
      { roomType: 'Suite', maxGuests: 4, price: 200 }
    ]
  },
  {
    name: 'Mountain View Hotel',
    destination: 'Manali',
    location: 'Old Manali, Himachal Pradesh',
    description: 'Cozy hotel with spectacular mountain views, perfect for adventure lovers. Great base for trekking and sports activities.',
    bannerImage: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
    rating: 4.7,
    price: {
      perNight: 80,
      currency: 'USD'
    },
    facilities: ['WiFi', 'Fireplace', 'Restaurant', 'Parking', 'Mountain View'],
    rooms: [
      { roomType: 'Standard', maxGuests: 2, price: 80 },
      { roomType: 'Premium', maxGuests: 2, price: 120 }
    ]
  }
];

export { destinations, hotels };
