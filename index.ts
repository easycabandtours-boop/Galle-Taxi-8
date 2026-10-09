export type Currency = 'USD' | 'EUR' | 'GBP' | 'LKR';

export interface CurrencyRate {
  code: Currency;
  symbol: string;
  rateFromUSD: number;
}

export type TripType = 'transfer' | 'hourly' | 'grand-tour';

export interface LocationPoint {
  id: string;
  name: string;
  region: string;
  isAirport?: boolean;
  distanceKmFromAirport: number;
  estMinutesFromAirport: number;
  description: string;
}

export interface Waypoint {
  id: string;
  name: string;
  category: 'heritage' | 'nature' | 'tea' | 'scenic';
  description: string;
  extraMinutes: number;
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  category: 'SEDAN CAR' | 'SUV CAR' | 'KDH FLAT ROOF' | 'KDH HIGH ROOF' | string;
  shortDesc: string;
  image: string;
  passengers: number;
  luggage: number;
  baseFareUSD: number;
  perKmRateUSD: number;
  hourlyRateUSD: number;
  features: string[];
  specs: {
    wifi: string;
    refreshments: string;
    seating: string;
    ac: string;
  };
  chauffeurTier: string;
  popular?: boolean;
}

export interface CuratedRoute {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  distanceKm: number;
  tag: string;
  image: string;
  basePriceUSD: number;
  highlights: string[];
  description: string;
  idealFor: string;
}

export interface TourPackage {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  distanceKm: number;
  badge: string;
  image: string;
  basePriceUSD: number;
  stops: string[];
  inclusions: string[];
  description: string;
  idealFor: string;
  rating: number;
  reviewsCount: number;
}

export interface FlightStatus {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  scheduledTime: string;
  estimatedTime: string;
  terminal: string;
  gate: string;
  status: 'ON-TIME' | 'DELAYED' | 'LANDED' | 'EN-ROUTE';
  aircraft: string;
}

export interface GPSLocation {
  lat: number;
  lng: number;
  accuracy?: number;
  label?: string;
  mapsUrl: string;
}

export interface BookingDetails {
  bookingRef: string;
  tripType: TripType;
  pickupLocation: string;
  customPickupAddress?: string;
  livePickupCoords?: GPSLocation;
  dropoffLocation: string;
  customDropoffAddress?: string;
  liveDropoffCoords?: GPSLocation;
  selectedWaypoints: string[];
  pickupDate: string;
  pickupTime: string;
  flightNumber: string;
  passengers: number;
  luggageCount: number;
  vehicleId: string;
  hoursNeeded?: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
  pagingBoardName: string;
  addOns: {
    babySeat: boolean;
    refrigeratedKingCoconut: boolean;
    chilledChampagne: boolean;
    starlinkWifi: boolean;
    surfboardRack: boolean;
  };
  totalPriceUSD: number;
  currency: Currency;
  createdAt: string;
}
