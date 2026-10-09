import { Currency, CurrencyRate, LocationPoint, Waypoint, Vehicle, CuratedRoute, TourPackage, FlightStatus, TripType } from '../types';

import sedanCarImg from '../assets/images/sedan_car_1791376520741.jpg';
import suvCarImg from '../assets/images/suv_car_1791376543702.jpg';
import kdhFlatImg from '../assets/images/kdh_flat_roof_1791376562188.jpg';
import kdhHighImg from '../assets/images/kdh_high_roof_1791376602232.jpg';

export const CURRENCIES: Record<Currency, CurrencyRate> = {
  USD: { code: 'USD', symbol: '$', rateFromUSD: 1 },
  EUR: { code: 'EUR', symbol: '€', rateFromUSD: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rateFromUSD: 0.79 },
  LKR: { code: 'LKR', symbol: 'Rs ', rateFromUSD: 305 },
};

export const POPULAR_LOCATIONS: LocationPoint[] = [
  {
    id: 'cmb-airport',
    name: 'Bandaranaike International Airport (CMB)',
    region: 'Katunayake / Western Province',
    isAirport: true,
    distanceKmFromAirport: 0,
    estMinutesFromAirport: 0,
    description: 'Terminal 1 & Silk Route Lounge Arrival Hall'
  },
  {
    id: 'galle-fort',
    name: 'Galle Fort (Historic Dutch Fort)',
    region: 'Southern Province',
    distanceKmFromAirport: 153,
    estMinutesFromAirport: 105,
    description: 'UNESCO Heritage Citadel, Amangalla, Fort Bazaar, Light House Street'
  },
  {
    id: 'weligama',
    name: 'Weligama Bay & Cape Weligama',
    region: 'Southern Province',
    distanceKmFromAirport: 172,
    estMinutesFromAirport: 120,
    description: 'Cape Weligama Luxury Resort, W15, Surf Sanctuary & Stilt Fishermen'
  },
  {
    id: 'mirissa',
    name: 'Mirissa Coastal Haven',
    region: 'Southern Province',
    distanceKmFromAirport: 180,
    estMinutesFromAirport: 130,
    description: 'Coconut Tree Hill, Sri Shariputhra Cliff, Deep Sea Whale Charters'
  },
  {
    id: 'tangalle',
    name: 'Tangalle & Amanwella Bay',
    region: 'Southern Coast',
    distanceKmFromAirport: 215,
    estMinutesFromAirport: 150,
    description: 'Amanwella, Anantara Peace Haven, Silent Beach Sanctuary'
  },
  {
    id: 'bentota',
    name: 'Bentota & Induruwa Beach',
    region: 'South-West Coast',
    distanceKmFromAirport: 108,
    estMinutesFromAirport: 80,
    description: 'Geoffrey Bawa Lunuganga Estate, Taj Bentota, River Safari'
  },
  {
    id: 'colombo-city',
    name: 'Colombo Central (Galle Face & CBD)',
    region: 'Western Province',
    distanceKmFromAirport: 35,
    estMinutesFromAirport: 40,
    description: 'Galle Face Hotel, Shangri-La Colombo, Cinnamon Grand'
  },
  {
    id: 'yala',
    name: 'Yala National Park (Wild Coast)',
    region: 'Southern Wildlife Reserve',
    distanceKmFromAirport: 295,
    estMinutesFromAirport: 210,
    description: 'Wild Coast Tented Lodge, Leopard Safari Reserves, Chena Huts'
  },
  {
    id: 'ella',
    name: 'Ella & Tea Country Highlands',
    region: 'Central Highlands',
    distanceKmFromAirport: 260,
    estMinutesFromAirport: 230,
    description: 'Nine Arches Bridge, Ceylon Tea Plantations, Little Adams Peak'
  },
  {
    id: 'kandy',
    name: 'Kandy Royal Hill Capital',
    region: 'Central Province',
    distanceKmFromAirport: 115,
    estMinutesFromAirport: 160,
    description: 'Temple of the Sacred Tooth Relic, Victoria Golf Resort'
  }
];

export const WAYPOINTS: Waypoint[] = [
  {
    id: 'turtle-sanctuary',
    name: 'Kosgoda Sea Turtle Hatchery & Conservation',
    category: 'nature',
    description: 'Private 30-min ocean sanctuary stopover to witness green sea turtles',
    extraMinutes: 35
  },
  {
    id: 'handunugoda-tea',
    name: 'Handunugoda Virgin White Tea Estate',
    category: 'tea',
    description: 'Low-country artisanal estate famed for emperor virgin white tea harvest',
    extraMinutes: 45
  },
  {
    id: 'bawa-lunuganga',
    name: 'Lunuganga (Geoffrey Bawa Country Estate)',
    category: 'heritage',
    description: 'Architectural landscape masterpiece along Dedduwa Lake in Bentota',
    extraMinutes: 50
  },
  {
    id: 'stilt-fishermen',
    name: 'Ahangama Stilt Fishermen Cultural Point',
    category: 'scenic',
    description: 'Traditional Sri Lankan coastal stilt fishing photography stop',
    extraMinutes: 20
  },
  {
    id: 'madu-river',
    name: 'Madu River Mangrove Private Safari',
    category: 'nature',
    description: 'Cinnamon island and ancient mangrove archipelago speedboat cruise',
    extraMinutes: 60
  }
];

export const FLEET: Vehicle[] = [
  {
    id: 'sedan-car',
    name: 'Sedan Car (Toyota Premio / Allion)',
    brand: 'Toyota / Executive Saloon',
    category: 'SEDAN CAR',
    shortDesc: 'Smooth, air-conditioned executive saloon tailored for up to 3 passengers. Ideal for airport expressway transfers and city travel.',
    image: sedanCarImg,
    passengers: 3,
    luggage: 3,
    baseFareUSD: 65,
    perKmRateUSD: 0.50,
    hourlyRateUSD: 28,
    features: [
      'Ergonomic Velvet / Leather Comfort Seating',
      'Southern Expressway E01 Electronic Toll Pass Included',
      'Onboard 4G/5G Wi-Fi Hotspot for Connected Travel',
      'Complimentary Bottled Mineral Water & Mints',
      '60 Minutes Free Flight Delay Waiting Buffer at CMB Gate'
    ],
    specs: {
      wifi: 'Onboard 4G/5G Hotspot',
      refreshments: 'Mineral Water & Mints',
      seating: '3 Passenger Saloon Seating',
      ac: 'Dual-Zone Automatic Climate'
    },
    chauffeurTier: 'Licensed Tourist Board Chauffeur (English)',
    popular: true
  },
  {
    id: 'suv-car',
    name: 'SUV Car (Honda Vezel)',
    brand: 'Luxury Crossover SUV',
    category: 'SUV CAR',
    shortDesc: 'Elevated 4WD ride height with panoramic views across southern coastal roads, wildlife reserves, and scenic highland routes.',
    image: '/White Honda Vezel by the Tropical Coast.png',
    passengers: 4,
    luggage: 4,
    baseFareUSD: 95,
    perKmRateUSD: 0.70,
    hourlyRateUSD: 42,
    features: [
      'Full-time All-Wheel Drive with High Ground Clearance',
      'Elevated Panoramic Seating for Coastal Sightseeing',
      'Heavy-Duty Front & Rear Climate Control Air Conditioning',
      'Expansive Boot Space Accommodating 4 Hard Suitcases',
      'Refrigerated Cool Box with Fresh Ceylon King Coconut Water'
    ],
    specs: {
      wifi: 'High-Speed 5G',
      refreshments: 'King Coconut & Cold Towels',
      seating: '4 Elevated Reclining Seats',
      ac: 'Multi-Zone Heavy-Duty Dual AC'
    },
    chauffeurTier: 'Senior Coastal & Highlands Chauffeur (English)',
    popular: true
  },
  {
    id: 'kdh-flat-roof',
    name: 'KDH Flat Roof (Toyota HiAce Standard)',
    brand: 'Toyota HiAce',
    category: 'KDH FLAT ROOF',
    shortDesc: 'The definitive Sri Lankan touring van. Comfortable adjustable seating for 6 passengers with ample luggage and surfboard capacity.',
    image: kdhFlatImg,
    passengers: 6,
    luggage: 6,
    baseFareUSD: 85,
    perKmRateUSD: 0.62,
    hourlyRateUSD: 38,
    features: [
      '6 Adjustable High-Back Reclining Passenger Seats',
      'Large Luggage Cargo Bay for 6 Suitcases & Surfboards',
      'Overhead Individual Passenger AC Blowers',
      'Southern Expressway Fast-Tag Electronic Toll Included',
      'Chilled Bottled Water & Wet Towels Provided'
    ],
    specs: {
      wifi: 'Onboard 5G Hotspot',
      refreshments: 'Bottled Water & Fresh Towels',
      seating: '6 Adjustable Reclining Seats',
      ac: 'Front & Rear Overhead Dual AC'
    },
    chauffeurTier: 'Licensed Tourist Chauffeur Guide (English)',
    popular: true
  },
  {
    id: 'kdh-high-roof',
    name: 'KDH High Roof (Toyota HiAce Commuter)',
    brand: 'Toyota HiAce Grand Cabin',
    category: 'KDH HIGH ROOF',
    shortDesc: 'Spacious high-ceiling van with full walk-in standing room, 10 individual reclining armchairs, and massive luggage capacity.',
    image: kdhHighImg,
    passengers: 10,
    luggage: 10,
    baseFareUSD: 110,
    perKmRateUSD: 0.80,
    hourlyRateUSD: 48,
    features: [
      'High Ceiling Cabin with Walk-In Standing Room Clearance',
      '10 Individual Reclining Armchair Seats with Headrests',
      'Cavernous Rear Luggage Compartment for 10 Large Bags',
      'Commercial Grade High-Output Dual Air Conditioning',
      'Starlink Satellite 5G Fast Mobile Wi-Fi Onboard'
    ],
    specs: {
      wifi: 'Starlink Business 5G',
      refreshments: 'Chilled Coconut Water & Drinks',
      seating: '10 Individual Reclining Armchairs',
      ac: 'Commercial High-Output Multi-Vent AC'
    },
    chauffeurTier: 'Senior Tour Chauffeur Guide (English / German)',
    popular: true
  }
];

export const CURATED_ROUTES: CuratedRoute[] = [
  {
    id: 'bia-to-galle',
    title: 'The Southern Expressway Direct Highway Express',
    subtitle: 'Bandaranaike International Airport (CMB) ⇄ Galle Fort',
    duration: '1 Hour 45 Minutes',
    distanceKm: 153,
    tag: 'MOST POPULAR TRANSFER',
    image: '/images/route_galle_fort_1791374353241.jpg',
    basePriceUSD: 110,
    highlights: [
      'All Southern Expressway (E01) Tolls Included',
      '60 Minutes complimentary flight delay wait time',
      'VIP Exit Gate Paging Board Meet-and-Greet',
      'Direct doorstep drop-off inside Galle Fort ramparts'
    ],
    description: 'The definitive executive airport transfer. Bypass congested city arteries via the elevated Outer Circular & Southern Expressway directly to the southern ocean gateway.',
    idealFor: 'Arriving international travelers checking in to Galle Fort, Thalpe, or Unawatuna luxury villas.'
  },
  {
    id: 'galle-to-weligama-mirissa',
    title: 'Southern Riviera & Whale Coastline Chauffeur',
    subtitle: 'Galle Fort ⇄ Weligama Bay ⇄ Mirissa ⇄ Tangalle',
    duration: 'Full Day Chauffeur (8-10 Hours)',
    distanceKm: 85,
    tag: 'BESPOKE DAY CHAUFFEUR',
    image: '/images/fleet_vellfire_vip_1791374316710.jpg',
    basePriceUSD: 180,
    highlights: [
      'Handunugoda White Tea Estate private visit',
      'Stilt Fishermen photography & Mirissa Coconut Hill',
      'Private waiting while you enjoy beachfront lunch & surf',
      'Air-conditioned sanctuary parked and ready whenever needed'
    ],
    description: 'Explore the glamorous beaches and tea estates of the southern coast at your own leisurely pace with a dedicated chauffeur stationed exclusively at your command.',
    idealFor: 'Couples and families looking for spontaneous ocean excursions without hailing taxis.'
  },
  {
    id: 'galle-to-yala-safari',
    title: 'Colonial Ramparts to Wild Leopard Reserve',
    subtitle: 'Galle Fort ⇄ Tangalle ⇄ Yala National Park',
    duration: '3 Hours 30 Minutes',
    distanceKm: 195,
    tag: 'WILDLIFE SAFARI EXPEDITION',
    image: '/images/hero_chauffeur_sclass_1791374288714.jpg',
    basePriceUSD: 210,
    highlights: [
      'Scenic highway transfer along the deep south coast',
      'Chauffeur coordination with Wild Coast Tented Lodge / Safari 4x4s',
      'Optional pitstop at Kalametiya Bird Sanctuary or Bundala',
      'Spacious luggage capacity for safari gear and photography kits'
    ],
    description: 'A seamless luxury transition between colonial maritime history and untouched dry-zone leopard wilderness.',
    idealFor: 'High-end safari travelers transitioning from southern resorts to Yala luxury tented lodges.'
  },
  {
    id: 'tea-country-highlands',
    title: 'The Ceylon Heritage Tea Country Traverse',
    subtitle: 'Galle Fort ⇄ Ravana Falls ⇄ Ella ⇄ Nuwara Eliya',
    duration: '4 Hours 15 Minutes',
    distanceKm: 235,
    tag: 'HIGHLANDS PANORAMA',
    image: '/images/fleet_mercedes_limousine_1791374371274.jpg',
    basePriceUSD: 240,
    highlights: [
      'Climbing from sea-level coastal plains to 1,800m cool mountain mist',
      'Spectacular viewpoints across Ravana Waterfalls and Ella Gap',
      'Chauffeur trained in gentle mountain switchback driving techniques',
      'Hot spiced tea and King Coconut roadside hydration service'
    ],
    description: 'Watch tropical palm shorelines surrender to emerald green tea plantations and cloud forests in serene first-class isolation.',
    idealFor: 'Guests embarking on a multi-destination Sri Lankan grand tour.'
  }
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'galle-southern-riviera',
    title: 'Galle Fort & Southern Coast Explorer',
    tagline: 'Lighthouse, Stilt Fishermen, Sea Turtle Hatchery & White Tea Estate',
    duration: 'Full Day (8 - 10 Hours)',
    distanceKm: 95,
    badge: '#1 TOP RATED DAY TOUR',
    image: '/images/route_galle_fort_1791374353241.jpg',
    basePriceUSD: 120,
    rating: 4.98,
    reviewsCount: 382,
    stops: [
      'Galle Dutch Fort UNESCO Citadel & Ramparts',
      'Handunugoda Virgin White Tea Plantation',
      'Koggala Traditional Stilt Fishermen',
      'Sea Turtle Conservation & Hatchery Project',
      'Unawatuna Bay & Jungle Beach Coastal Cove'
    ],
    inclusions: [
      'Dedicated English-Speaking Licensed Tour Chauffeur',
      'Private Air-Conditioned Executive Vehicle',
      'All Fuel, Expressway E01 Tolls & Parking Fees Included',
      'Complimentary Chilled Ceylon King Coconut & Mineral Water',
      'Flexible Photo Stops & Custom Meal Schedule'
    ],
    description: 'Immerse yourself in centuries of colonial maritime history and sun-drenched coastal beauty. Stroll the cobble-stoned ramparts of Galle Fort, discover unique white tea, and witness iconic stilt fishermen.',
    idealFor: 'Couples, families, and photographers seeking the ultimate Southern Sri Lankan cultural day out.'
  },
  {
    id: 'yala-wildlife-safari',
    title: 'Yala National Park Wild Leopard Safari',
    tagline: 'Big Cat Game Drive, Wild Elephants & Coastal Flamingo Wetlands',
    duration: 'Full Day (10 - 12 Hours)',
    distanceKm: 220,
    badge: 'PREMIER WILDLIFE EXPEDITION',
    image: '/images/hero_chauffeur_sclass_1791374288714.jpg',
    basePriceUSD: 195,
    rating: 4.95,
    reviewsCount: 294,
    stops: [
      'Yala National Park Block 1 Wilderness',
      'Bundala UNESCO Biosphere Wetland Reserve',
      'Hambantota Southern Expressway Express Route',
      'Kalametiya Sanctuary Birdwatching Viewpoint',
      'Scenic Coconut Palm Coastline'
    ],
    inclusions: [
      'Door-to-door Hotel / Villa Chauffeur Transfer',
      'Coordination with Experienced 4x4 Safari Jeep & Tracker',
      'Air-conditioned Highway Travel with Fast-Tag Passes',
      'Refrigerated Ice Box with Cold Drinks & Snacks',
      'Luggage Storage for Safari & Camera Equipment'
    ],
    description: 'Venture into the premier leopard habitat on planet Earth. Yala boasts the highest leopard density worldwide alongside herds of wild Asian elephants, sloth bears, and crocodiles.',
    idealFor: 'Wildlife lovers, birders, and safari adventurers looking for high probability leopard sightings.'
  },
  {
    id: 'ella-highlands-odyssey',
    title: 'Ella & Misty Tea Country Highlands Odyssey',
    tagline: 'Nine Arch Demodara Bridge, Ravana Falls & Little Adam’s Peak',
    duration: 'Full Day (11 - 13 Hours)',
    distanceKm: 260,
    badge: 'HIGHLANDS PANORAMA',
    image: '/images/fleet_mercedes_limousine_1791374371274.jpg',
    basePriceUSD: 210,
    rating: 4.97,
    reviewsCount: 247,
    stops: [
      'Iconic Nine Arch Viaduct Train Bridge',
      'Little Adam’s Peak Panoramic Summit Walk',
      'Ravana Waterfalls & Ancient Legend Cave',
      'Halpewatte Authentic Ceylon Tea Factory',
      'Ella Gap Mountain Valley Viewpoint'
    ],
    inclusions: [
      'Certified Mountain-Trained Tour Chauffeur',
      'Smooth Highway & Scenic Serpentine Route Mastery',
      'Fresh Spiced Ceylon Hot Tea & Cold Towels',
      'All Fuel, Mountain Tolls & Vehicle Entry Fees',
      'Timing Aligned with Scenic Blue Train Passing'
    ],
    description: 'Ascend from the warm Indian Ocean shores into the emerald green, mist-shrouded mountain kingdom of Ella. Walk the famous railway bridge and breathe the crisp mountain air.',
    idealFor: 'Hikers, panoramic landscape photographers, and tea enthusiasts craving mountain serenity.'
  },
  {
    id: 'sigiriya-cultural-triangle',
    title: 'Sigiriya Rock Citadel & Dambulla Royal Caves',
    tagline: '5th-Century Sky Palace, Golden Cave Temples & Minneriya Elephants',
    duration: 'Full Day (12 - 14 Hours)',
    distanceKm: 290,
    badge: 'UNESCO WORLD HERITAGE',
    image: '/images/fleet_vellfire_vip_1791374316710.jpg',
    basePriceUSD: 225,
    rating: 4.99,
    reviewsCount: 318,
    stops: [
      'Sigiriya Lion Rock Fortress & Water Gardens',
      'Dambulla Golden Cave Temple UNESCO Complex',
      'Minneriya Elephant Gathering Safari Coordination',
      'Traditional Ayurvedic Herbal & Spice Garden',
      'Scenic Central Expressway Transit'
    ],
    inclusions: [
      'Executive Long-Distance Saloon or KDH Van',
      'Starlink / High-Speed 5G Wi-Fi Onboard',
      'All Express Highway Tolls & Fuel Included',
      'Complimentary Bottled Mineral Water & Mints',
      'Direct Pick-up from Galle, Colombo, or Negombo'
    ],
    description: 'Behold the 8th Wonder of the Ancient World: King Kashyapa’s astonishing sky citadel atop a 200m vertical monolith, paired with 2,000-year-old Buddhist cave frescoes in Dambulla.',
    idealFor: 'History buffs, architecture admirers, and travelers desiring Sri Lanka’s most legendary sight.'
  },
  {
    id: 'mirissa-whale-safari',
    title: 'Mirissa Blue Whale Safari & Tropical Coastline',
    tagline: 'Ocean Giant Safari, Coconut Tree Hill & Weligama Surf Bay',
    duration: 'Full Day (8 - 9 Hours)',
    distanceKm: 75,
    badge: 'OCEAN GIANTS EXPEDITION',
    image: '/White Honda Vezel by the Tropical Coast.png',
    basePriceUSD: 140,
    rating: 4.93,
    reviewsCount: 265,
    stops: [
      'Mirissa Harbor Blue Whale Safari Pier',
      'Coconut Tree Hill Iconic Ocean Cliff',
      'Secret Beach Secluded Snorkel Lagoon',
      'Weligama Bay Gentle Surf Lessons & Lunch',
      'Ahangama Sunset Stilt Fishermen Coast'
    ],
    inclusions: [
      'Early Morning 6:00 AM Direct Pier Chauffeur Transfer',
      'Coordination with Licensed Harbor Whale Vessel',
      'Air-conditioned Coastal Road Cruiser',
      'Dry Towel Storage & Beach Day Waiting Service',
      'All Taxes, Fuel, Tolls & Parking Handled'
    ],
    description: 'Set sail into the sapphire depths of the Indian Ocean to witness the largest animals to ever exist on Earth: majestic Blue Whales and playful spinner dolphins leaping in pod formations.',
    idealFor: 'Marine life lovers, ocean adventurers, surfers, and beach lovers.'
  }
];

export const SAMPLE_FLIGHTS: FlightStatus[] = [
  {
    flightNumber: 'EK652',
    airline: 'Emirates',
    origin: 'Dubai (DXB)',
    destination: 'Colombo (CMB)',
    scheduledTime: '15:25',
    estimatedTime: '15:20',
    terminal: 'Terminal 1',
    gate: 'Gate 06',
    status: 'ON-TIME',
    aircraft: 'Boeing 777-300ER'
  },
  {
    flightNumber: 'QR668',
    airline: 'Qatar Airways',
    origin: 'Doha (DOH)',
    destination: 'Colombo (CMB)',
    scheduledTime: '16:40',
    estimatedTime: '16:35',
    terminal: 'Terminal 1',
    gate: 'Gate 04',
    status: 'ON-TIME',
    aircraft: 'Airbus A350-900'
  },
  {
    flightNumber: 'UL504',
    airline: 'SriLankan Airlines',
    origin: 'London Heathrow (LHR)',
    destination: 'Colombo (CMB)',
    scheduledTime: '18:15',
    estimatedTime: '18:10',
    terminal: 'Terminal 1',
    gate: 'Gate 02',
    status: 'ON-TIME',
    aircraft: 'Airbus A330-300'
  },
  {
    flightNumber: 'SQ468',
    airline: 'Singapore Airlines',
    origin: 'Singapore (SIN)',
    destination: 'Colombo (CMB)',
    scheduledTime: '23:55',
    estimatedTime: '23:50',
    terminal: 'Terminal 1',
    gate: 'Gate 08',
    status: 'ON-TIME',
    aircraft: 'Boeing 787-10 Dreamliner'
  },
  {
    flightNumber: 'BA2042',
    airline: 'British Airways',
    origin: 'London Gatwick (LGW)',
    destination: 'Colombo (CMB)',
    scheduledTime: '08:30',
    estimatedTime: '08:45',
    terminal: 'Terminal 1',
    gate: 'Gate 05',
    status: 'DELAYED',
    aircraft: 'Boeing 777-200'
  }
];

// Calculation helper
export function calculateEstimatedFare(
  pickupId: string,
  dropoffId: string,
  vehicleId: string,
  tripType: TripType,
  waypoints: string[] = [],
  hours: number = 8
): { distanceKm: number; durationMinutes: number; priceUSD: number } {
  const pickup = POPULAR_LOCATIONS.find(l => l.id === pickupId) || POPULAR_LOCATIONS[0];
  const dropoff = POPULAR_LOCATIONS.find(l => l.id === dropoffId) || POPULAR_LOCATIONS[1];
  const vehicle = FLEET.find(v => v.id === vehicleId) || FLEET[0];

  let distanceKm = 153;
  let durationMinutes = 105;

  if (pickup.id === 'cmb-airport') {
    distanceKm = dropoff.distanceKmFromAirport || 153;
    durationMinutes = dropoff.estMinutesFromAirport || 105;
  } else if (dropoff.id === 'cmb-airport') {
    distanceKm = pickup.distanceKmFromAirport || 153;
    durationMinutes = pickup.estMinutesFromAirport || 105;
  } else {
    // Inter-city calculation
    distanceKm = Math.abs(dropoff.distanceKmFromAirport - pickup.distanceKmFromAirport) || 85;
    durationMinutes = Math.abs(dropoff.estMinutesFromAirport - pickup.estMinutesFromAirport) + 30 || 90;
    if (distanceKm < 30) distanceKm = 40;
    if (durationMinutes < 40) durationMinutes = 45;
  }

  // Add waypoints
  const waypointsTime = waypoints.reduce((acc, wpId) => {
    const wp = WAYPOINTS.find(w => w.id === wpId);
    return acc + (wp ? wp.extraMinutes : 0);
  }, 0);
  durationMinutes += waypointsTime;
  distanceKm += waypoints.length * 12;

  let priceUSD = 0;
  if (tripType === 'hourly') {
    priceUSD = Math.round(vehicle.hourlyRateUSD * Math.max(hours, 4));
  } else if (tripType === 'grand-tour') {
    priceUSD = Math.round(vehicle.baseFareUSD * 1.5 + distanceKm * vehicle.perKmRateUSD * 0.9 + waypoints.length * 20);
  } else {
    // Standard transfer
    priceUSD = Math.round(vehicle.baseFareUSD + (distanceKm - 50) * vehicle.perKmRateUSD + waypoints.length * 20);
  }

  return {
    distanceKm: Math.round(distanceKm),
    durationMinutes: Math.round(durationMinutes),
    priceUSD: Math.max(priceUSD, 85)
  };
}

export function formatCurrency(amountUSD: number, currency: Currency): string {
  const config = CURRENCIES[currency];
  const converted = amountUSD * config.rateFromUSD;
  if (currency === 'LKR') {
    return `${config.symbol}${Math.round(converted).toLocaleString('en-US')}`;
  }
  return `${config.symbol}${Math.round(converted)}`;
}
