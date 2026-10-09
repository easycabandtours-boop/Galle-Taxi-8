import React, { useState, useMemo } from 'react';
import { Currency, TripType, GPSLocation } from '../types';
import {
  POPULAR_LOCATIONS,
  WAYPOINTS,
  FLEET,
  SAMPLE_FLIGHTS,
  calculateEstimatedFare,
} from '../data/mockData';
import {
  Plane,
  MapPin,
  Clock,
  ArrowRightLeft,
  Users,
  Briefcase,
  Shield,
  Sparkles,
  Compass,
  Plus,
  Trash2,
  CheckCircle2,
  Navigation,
  LocateFixed,
  ExternalLink,
  Share2,
  Check,
  CarTaxiFront,
  PlaneTakeoff,
  Car,
  CarFront,
  BusFront,
  Bus,
  ShoppingBag,
  Snowflake,
} from 'lucide-react';

interface HeroBookingSplitProps {
  currentCurrency: Currency;
  onInitiateBooking: (initialData: {
    tripType: TripType;
    pickupId: string;
    dropoffId: string;
    waypoints: string[];
    date: string;
    time: string;
    flightNumber: string;
    passengers: number;
    luggage: number;
    vehicleId: string;
    hours: number;
    livePickupCoords?: GPSLocation | null;
    liveDropoffCoords?: GPSLocation | null;
  }) => void;
}

export const HeroBookingSplit: React.FC<HeroBookingSplitProps> = ({
  currentCurrency,
  onInitiateBooking,
}) => {
  const [tripType, setTripType] = useState<TripType>('transfer');
  const [pickupId, setPickupId] = useState<string>('cmb-airport');
  const [dropoffId, setDropoffId] = useState<string>('galle-fort');
  const [selectedWaypoints, setSelectedWaypoints] = useState<string[]>([]);
  const [pickupDate, setPickupDate] = useState<string>('2026-10-15');
  const [pickupTime, setPickupTime] = useState<string>('14:30');
  const [flightNumber, setFlightNumber] = useState<string>('UL504');
  const [passengers, setPassengers] = useState<number>(2);
  const [luggage, setLuggage] = useState<number>(2);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('sedan-car');
  const [charterHours, setCharterHours] = useState<number>(8);
  const [showWaypointSelector, setShowWaypointSelector] = useState<boolean>(false);
  const [livePickupCoords, setLivePickupCoords] = useState<GPSLocation | null>(null);
  const [liveDropoffCoords, setLiveDropoffCoords] = useState<GPSLocation | null>(null);
  const [isLocatingPickup, setIsLocatingPickup] = useState<boolean>(false);
  const [isLocatingDropoff, setIsLocatingDropoff] = useState<boolean>(false);
  const [locationNotice, setLocationNotice] = useState<string | null>(null);

  const handleCaptureLiveLocation = (target: 'pickup' | 'dropoff') => {
    if (!navigator.geolocation) {
      setLocationNotice('Geolocation is not supported by your browser.');
      return;
    }

    if (target === 'pickup') {
      setIsLocatingPickup(true);
    } else {
      setIsLocatingDropoff(true);
    }
    setLocationNotice(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
        const locationObj: GPSLocation = {
          lat: latitude,
          lng: longitude,
          accuracy: Math.round(accuracy),
          mapsUrl,
          label: `Live GPS Pin (${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E)`,
        };

        if (target === 'pickup') {
          setIsLocatingPickup(false);
          setLivePickupCoords(locationObj);
          setLocationNotice('Live Pickup GPS Pin locked! Ready to share with your chauffeur.');
        } else {
          setIsLocatingDropoff(false);
          setLiveDropoffCoords(locationObj);
          setLocationNotice('Live Destination GPS Pin locked!');
        }
      },
      (err) => {
        if (target === 'pickup') setIsLocatingPickup(false);
        else setIsLocatingDropoff(false);
        setLocationNotice('Unable to access GPS location. Please allow browser location access.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  };

  const handleShareLivePinDirectly = (coords: GPSLocation, title: string) => {
    const shareText = `Here is my live pickup GPS pin for Galle Taxi: ${coords.mapsUrl}`;
    if (navigator.share) {
      navigator.share({
        title,
        text: shareText,
        url: coords.mapsUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(coords.mapsUrl);
      setLocationNotice('Google Maps live location link copied to clipboard!');
      setTimeout(() => setLocationNotice(null), 3000);
    }
  };

  // Flight match detection
  const detectedFlight = useMemo(() => {
    if (!flightNumber.trim()) return null;
    return SAMPLE_FLIGHTS.find(
      (f) => f.flightNumber.toUpperCase() === flightNumber.trim().toUpperCase()
    );
  }, [flightNumber]);

  // Telemetry & fare calculation
  const calculated = useMemo(() => {
    return calculateEstimatedFare(
      pickupId,
      dropoffId,
      selectedVehicleId,
      tripType,
      selectedWaypoints,
      charterHours
    );
  }, [pickupId, dropoffId, selectedVehicleId, tripType, selectedWaypoints, charterHours]);

  const pickupLocation = POPULAR_LOCATIONS.find((l) => l.id === pickupId);
  const dropoffLocation = POPULAR_LOCATIONS.find((l) => l.id === dropoffId);
  const selectedVehicle = FLEET.find((v) => v.id === selectedVehicleId) || FLEET[0];

  const handleSwapLocations = () => {
    const temp = pickupId;
    setPickupId(dropoffId);
    setDropoffId(temp);
  };

  const handleToggleWaypoint = (waypointId: string) => {
    if (selectedWaypoints.includes(waypointId)) {
      setSelectedWaypoints(selectedWaypoints.filter((id) => id !== waypointId));
    } else {
      setSelectedWaypoints([...selectedWaypoints, waypointId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInitiateBooking({
      tripType,
      pickupId,
      dropoffId,
      waypoints: selectedWaypoints,
      date: pickupDate,
      time: pickupTime,
      flightNumber,
      passengers,
      luggage,
      vehicleId: selectedVehicleId,
      hours: charterHours,
      livePickupCoords,
      liveDropoffCoords,
    });
  };

  return (
    <section className="relative w-full pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto overflow-hidden">
      {/* Ambient background bloom */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#700D16]/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Hero Headline & Value Proposition */}
      <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 mb-4 text-xs font-mono tracking-widest text-[#C7A56A] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E31B2E]" />
          <span>Southern Expressway Express Transit · SLTDA Tour Chauffeurs</span>
        </div>

        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 text-balance"
          style={{ fontFamily: 'Verdana, sans-serif' }}
        >
          Galle Taxi & First-Class Chauffeur Transfers Across Sri Lanka's Southern Coast
        </h1>

        <p className="text-base sm:text-lg text-[#A5A5A5] max-w-2xl mx-auto leading-relaxed">
          Direct non-stop transit between Bandaranaike International Airport (CMB) and Galle Fort in 90 minutes.
          Executive air-conditioned sedans, spacious Toyota KDH passenger vans, crossover SUVs, and licensed tour chauffeurs.
        </p>
      </div>

      {/* Split Cockpit Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Booking & Journey Engine (7 cols) */}
        <div className="lg:col-span-7 bg-[#0D0D0F]/90 backdrop-blur-xl border border-white/[0.08] rounded-lg p-6 sm:p-8 shadow-2xl relative">
          {/* Subtle top indicator bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C1121F] to-transparent opacity-80" />

          {/* Trip Type Segmented Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 p-1.5 bg-[#17171C] rounded-lg mb-6 border border-white/[0.06]">
            <button
              type="button"
              onClick={() => {
                window.open('https://airporttaxis.lk/ride', '_blank');
              }}
              className="w-full py-2.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm font-semibold rounded transition-all flex items-center justify-center gap-1.5 bg-[#050505] text-white shadow-sm border border-white/[0.12] hover:border-[#C7A56A] active:scale-[0.98]"
              title="Book ride on https://airporttaxis.lk/ride"
            >
              <CarTaxiFront className="w-4 h-4 text-white shrink-0" />
              <span className="truncate">RIDE TAXI</span>
              <span className="text-[10px] font-mono text-white/80 shrink-0">↗</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTripType('transfer');
                window.open('https://airporttaxis.lk/airport-pickup', '_blank');
              }}
              className={`w-full py-2.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm font-semibold rounded transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                tripType === 'transfer' && pickupId === 'cmb-airport'
                  ? 'bg-[#050505] text-white shadow-sm border border-white/[0.12]'
                  : 'bg-transparent text-[#A5A5A5] hover:text-white hover:bg-white/[0.04]'
              }`}
              title="Book on https://airporttaxis.lk/airport-pickup"
            >
              <PlaneTakeoff className="w-4 h-4 text-white shrink-0" />
              <span className="truncate">AIRPORT PICK - UP</span>
              <span className="text-[10px] font-mono text-white/80 shrink-0">↗</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTripType('transfer');
                setPickupId('galle-fort');
                setDropoffId('cmb-airport');
                window.open('https://airporttaxis.lk/airport-drop', '_blank');
              }}
              className={`w-full py-2.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm font-semibold rounded transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                tripType === 'transfer' && pickupId !== 'cmb-airport'
                  ? 'bg-[#050505] text-white shadow-sm border border-white/[0.12]'
                  : 'bg-transparent text-[#A5A5A5] hover:text-white hover:bg-white/[0.04]'
              }`}
              title="Book on https://airporttaxis.lk/airport-drop"
            >
              <PlaneTakeoff className="w-4 h-4 text-white shrink-0" />
              <span className="truncate">AIRPORT DROP - OFF</span>
              <span className="text-[10px] font-mono text-white/80 shrink-0">↗</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Pick-Up & Drop-Off Grid with Instant Swap */}
            <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-start">
              {/* Pickup Selector */}
              <div className="sm:col-span-5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-syne font-bold uppercase tracking-wider text-[#A5A5A5] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full border border-white/80 bg-white" />
                    <span>Pickup Location</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleCaptureLiveLocation('pickup')}
                    disabled={isLocatingPickup}
                    className="text-[10px] font-mono text-[#C7A56A] hover:text-white flex items-center gap-1 transition-colors"
                    title="Detect and share your current live GPS coordinates"
                  >
                    <LocateFixed className={`w-3 h-3 ${isLocatingPickup ? 'animate-spin text-[#E31B2E]' : 'text-[#C7A56A]'}`} />
                    <span>{isLocatingPickup ? 'Locating...' : 'Share Live GPS'}</span>
                  </button>
                </div>

                <div className="relative">
                  <select
                    value={pickupId}
                    onChange={(e) => setPickupId(e.target.value)}
                    className="w-full bg-[#17171C] border border-white/[0.1] rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#E31B2E] transition-colors appearance-none cursor-pointer pr-8"
                  >
                    {POPULAR_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id} className="bg-[#17171C] text-white">
                        {loc.name}
                      </option>
                    ))}
                  </select>
                  <MapPin className="w-4 h-4 text-[#A5A5A5] absolute right-3 top-3 pointer-events-none" />
                </div>

                {/* Live Pickup GPS Badge */}
                {livePickupCoords && (
                  <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 text-emerald-300">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                      </span>
                      <span className="truncate max-w-[140px] font-mono font-medium">
                        {livePickupCoords.lat.toFixed(4)}°N, {livePickupCoords.lng.toFixed(4)}°E
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={livePickupCoords.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white hover:text-emerald-400 p-1"
                        title="View Live Pin on Google Maps"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleShareLivePinDirectly(livePickupCoords, 'My Live Pickup Location')}
                        className="text-[#C7A56A] hover:text-white p-1"
                        title="Share Live Pin"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setLivePickupCoords(null)}
                        className="text-[#A5A5A5] hover:text-red-400 p-1"
                        title="Clear Live Pin"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Swap Button */}
              <div className="sm:col-span-1 flex justify-center py-2 sm:pt-6">
                <button
                  type="button"
                  onClick={handleSwapLocations}
                  className="p-2 rounded bg-[#17171C] border border-white/[0.1] text-[#A5A5A5] hover:text-white hover:border-[#C7A56A] transition-all"
                  title="Swap Pickup & Destination"
                  aria-label="Swap locations"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Dropoff Selector */}
              <div className="sm:col-span-5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-syne font-bold uppercase tracking-wider text-[#A5A5A5] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E31B2E]" />
                    <span>Destination</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleCaptureLiveLocation('dropoff')}
                    disabled={isLocatingDropoff}
                    className="text-[10px] font-mono text-[#C7A56A] hover:text-white flex items-center gap-1 transition-colors"
                    title="Capture live GPS destination pin"
                  >
                    <LocateFixed className={`w-3 h-3 ${isLocatingDropoff ? 'animate-spin text-[#E31B2E]' : 'text-[#C7A56A]'}`} />
                    <span>{isLocatingDropoff ? 'Locating...' : 'Share Live GPS'}</span>
                  </button>
                </div>

                <div className="relative">
                  <select
                    value={dropoffId}
                    onChange={(e) => setDropoffId(e.target.value)}
                    className="w-full bg-[#17171C] border border-white/[0.1] rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#E31B2E] transition-colors appearance-none cursor-pointer pr-8"
                  >
                    {POPULAR_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id} className="bg-[#17171C] text-white">
                        {loc.name}
                      </option>
                    ))}
                  </select>
                  <MapPin className="w-4 h-4 text-[#A5A5A5] absolute right-3 top-3 pointer-events-none" />
                </div>

                {/* Live Dropoff GPS Badge */}
                {liveDropoffCoords && (
                  <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 text-emerald-300">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                      </span>
                      <span className="truncate max-w-[140px] font-mono font-medium">
                        {liveDropoffCoords.lat.toFixed(4)}°N, {liveDropoffCoords.lng.toFixed(4)}°E
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={liveDropoffCoords.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white hover:text-emerald-400 p-1"
                        title="View Live Pin on Google Maps"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleShareLivePinDirectly(liveDropoffCoords, 'My Destination GPS Pin')}
                        className="text-[#C7A56A] hover:text-white p-1"
                        title="Share Live Pin"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setLiveDropoffCoords(null)}
                        className="text-[#A5A5A5] hover:text-red-400 p-1"
                        title="Clear Live Pin"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notification alert if GPS captured or error */}
            {locationNotice && (
              <div className="p-2.5 rounded bg-[#17171C] border border-[#C7A56A]/40 text-xs text-[#C7A56A] flex items-center justify-between">
                <span>{locationNotice}</span>
                <button
                  type="button"
                  onClick={() => setLocationNotice(null)}
                  className="text-white/60 hover:text-white ml-2"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Date & Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-syne font-bold uppercase tracking-wider text-[#A5A5A5]">
                  Transfer Date
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full bg-[#17171C] border border-white/[0.1] rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#E31B2E] transition-colors font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-syne font-bold uppercase tracking-wider text-[#A5A5A5]">
                  Pickup Time (Local Sri Lanka IST)
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-[#17171C] border border-white/[0.1] rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#E31B2E] transition-colors font-mono"
                  />
                  <Clock className="w-4 h-4 text-[#A5A5A5] absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Hours selection for Hourly charter */}
            {tripType === 'hourly' && (
              <div className="space-y-1.5 bg-[#17171C] border border-white/[0.08] rounded p-3">
                <div className="flex items-center justify-between text-xs text-[#A5A5A5]">
                  <span className="font-syne font-bold uppercase text-[11px] text-white">Chauffeur Service Duration</span>
                  <span className="font-mono text-[#C7A56A] font-bold">{charterHours} Hours Reserved</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="14"
                  step="1"
                  value={charterHours}
                  onChange={(e) => setCharterHours(Number(e.target.value))}
                  className="w-full accent-[#C1121F] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#A5A5A5] font-mono">
                  <span>4h (Half Day)</span>
                  <span>8h (Standard Day)</span>
                  <span>14h (Full Southern Tour)</span>
                </div>
              </div>
            )}

            {/* Passengers & Luggage Steppers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 pt-1">
              <div className="bg-[#17171C] border border-white/[0.08] rounded p-2.5 sm:p-3 flex items-center justify-between min-w-0">
                <div className="flex items-center gap-2 text-white min-w-0">
                  <Users className="w-4 h-4 text-[#A5A5A5] shrink-0" />
                  <span className="text-xs font-medium truncate">Guests</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    className="w-7 h-7 sm:w-6 sm:h-6 rounded bg-black/40 border border-white/[0.1] text-white flex items-center justify-center hover:bg-white/10 active:scale-95 text-xs font-bold"
                    aria-label="Decrease guest count"
                  >
                    -
                  </button>
                  <span className="text-xs sm:text-sm font-mono font-bold text-white w-4 sm:w-5 text-center">
                    {passengers}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.min(9, passengers + 1))}
                    className="w-7 h-7 sm:w-6 sm:h-6 rounded bg-black/40 border border-white/[0.1] text-white flex items-center justify-center hover:bg-white/10 active:scale-95 text-xs font-bold"
                    aria-label="Increase guest count"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-[#17171C] border border-white/[0.08] rounded p-2.5 sm:p-3 flex items-center justify-between min-w-0">
                <div className="flex items-center gap-2 text-white min-w-0">
                  <Briefcase className="w-4 h-4 text-[#A5A5A5] shrink-0" />
                  <span className="text-xs font-medium truncate">Luggage</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setLuggage(Math.max(0, luggage - 1))}
                    className="w-7 h-7 sm:w-6 sm:h-6 rounded bg-black/40 border border-white/[0.1] text-white flex items-center justify-center hover:bg-white/10 active:scale-95 text-xs font-bold"
                    aria-label="Decrease luggage count"
                  >
                    -
                  </button>
                  <span className="text-xs sm:text-sm font-mono font-bold text-white w-4 sm:w-5 text-center">
                    {luggage}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLuggage(Math.min(10, luggage + 1))}
                    className="w-7 h-7 sm:w-6 sm:h-6 rounded bg-black/40 border border-white/[0.1] text-white flex items-center justify-center hover:bg-white/10 active:scale-95 text-xs font-bold"
                    aria-label="Increase luggage count"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Preferred Vehicle Quick Select */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-syne font-bold uppercase tracking-wider text-[#A5A5A5]">
                Preferred Vehicle Classification
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {FLEET.slice(0, 4).map((vehicle) => {
                  const specs =
                    vehicle.id === 'sedan-car'
                      ? {
                          passenger: '1-3 PASSENGER',
                          luggage: '1-3 LUGGAGE',
                          hand: '1-1 HAND LUGGAGE',
                          ac: 'AIR - CONDITIONING',
                        }
                      : vehicle.id === 'suv-car'
                      ? {
                          passenger: '1-4 PASSENGER',
                          luggage: '1-4 LUGGAGE',
                          hand: '1-2 HAND LUGGAGE',
                          ac: 'AIR - CONDITIONING',
                        }
                      : vehicle.id === 'kdh-flat-roof'
                      ? {
                          passenger: '1-6 PASSENGER',
                          luggage: '1-6 LUGGAGE',
                          hand: '1-4 HAND LUGGAGE',
                          ac: 'AIR - CONDITIONING',
                        }
                      : {
                          passenger: '1-9 PASSENGER',
                          luggage: '1-8 LUGGAGE',
                          hand: '1-6 HAND LUGGAGE',
                          ac: 'AIR - CONDITIONING',
                        };

                  return (
                    <div
                      key={vehicle.id}
                      onClick={() => setSelectedVehicleId(vehicle.id)}
                      className={`p-3 rounded border transition-all flex flex-col items-start text-left cursor-pointer ${
                        selectedVehicleId === vehicle.id
                          ? 'bg-black/80 border-[#C1121F] shadow-[0_0_15px_rgba(193,18,31,0.3)]'
                          : 'bg-[#17171C] border-white/[0.06] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2 w-full">
                        {vehicle.id === 'sedan-car' && <Car className="w-4 h-4 text-white shrink-0" />}
                        {vehicle.id === 'suv-car' && <CarFront className="w-4 h-4 text-white shrink-0" />}
                        {vehicle.id === 'kdh-flat-roof' && <BusFront className="w-4 h-4 text-white shrink-0" />}
                        {vehicle.id === 'kdh-high-roof' && <Bus className="w-4 h-4 text-white shrink-0" />}
                        <p className="text-xs font-bold text-white truncate">{vehicle.category}</p>
                      </div>

                      <div className="pt-2 border-t border-white/[0.08] w-full space-y-1 text-[11px] text-white font-mono flex-1">
                        <div className="flex items-center gap-1.5 truncate text-white">
                          <Users className="w-3.5 h-3.5 text-white shrink-0" />
                          <span className="text-white">{specs.passenger}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate text-white">
                          <Briefcase className="w-3.5 h-3.5 text-white shrink-0" />
                          <span className="text-white">{specs.luggage}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate text-white">
                          <ShoppingBag className="w-3.5 h-3.5 text-white shrink-0" />
                          <span className="text-white">{specs.hand}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate text-white">
                          <Snowflake className="w-3.5 h-3.5 text-white shrink-0" />
                          <span className="text-white">{specs.ac}</span>
                        </div>
                      </div>

                      {/* BOOK Button */}
                      <a
                        href="https://airporttaxis.lk/ride"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVehicleId(vehicle.id);
                        }}
                        className="w-full mt-3 py-2 px-3 bg-[#C1121F] hover:bg-[#E31B2E] text-white text-xs font-syne font-bold uppercase tracking-wider rounded text-center transition-all flex items-center justify-center gap-1 shadow-sm active:scale-[0.98]"
                        title={`Book ${vehicle.category} on airporttaxis.lk/ride`}
                      >
                        <span>BOOK</span>
                        <span className="text-[10px] font-mono opacity-80">↗</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit Action */}
            <div className="mt-4">
              <a
                href="https://airporttaxis.lk/ride"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 font-syne font-extrabold tracking-wide uppercase text-xs sm:text-sm text-[#0D0D0F] bg-[#C7A56A] hover:bg-[#D9B778] hover:shadow-[0_4px_24px_rgba(199,165,106,0.45)] rounded transition-all duration-150 flex items-center justify-center gap-2"
                title="Book Ride on airporttaxis.lk/ride"
              >
                <span>BOOK RIDE</span>
                <ExternalLink className="w-4 h-4 text-[#0D0D0F]" />
              </a>
            </div>
          </form>
        </div>

        {/* Right: Live Trajectory Radar & Real-Time Route Telemetry (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Radar Trajectory Visualizer Card */}
          <div className="bg-[#0D0D0F]/90 backdrop-blur-xl border border-white/[0.08] rounded-lg p-6 relative overflow-hidden shadow-2xl">
            {/* Top header status */}
            <div className="flex items-center justify-between mb-4 border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31B2E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31B2E]"></span>
                </span>
                <span className="font-syne text-xs font-bold uppercase tracking-wider text-white">
                  Trajectory Radar
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#C7A56A]">
                E01 SOUTHERN EXPRESSWAY
              </span>
            </div>

            {/* Stylized Vector Radar Map */}
            <div className="relative w-full h-56 bg-[#050505] rounded border border-white/[0.06] overflow-hidden flex items-center justify-center">
              {/* Radar Grid Circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-48 h-48 border border-white/20 rounded-full" />
                <div className="w-32 h-32 border border-white/20 rounded-full" />
                <div className="w-16 h-16 border border-white/20 rounded-full" />
                <div className="absolute w-full h-[1px] bg-white/15" />
                <div className="absolute h-full w-[1px] bg-white/15" />
              </div>

              {/* Vector SVG Coastal Highway Route */}
              <svg className="w-full h-full p-4" viewBox="0 0 300 180" fill="none">
                {/* Coastal Line Reference */}
                <path
                  d="M 60,20 Q 80,60 95,90 T 130,130 T 210,155 T 270,160"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* Active Crimson Expressway Path */}
                <path
                  d="M 70,30 C 90,65 110,95 130,125 C 150,145 190,155 240,155"
                  stroke="#C1121F"
                  strokeWidth="3.5"
                  strokeDasharray="4 2"
                  strokeLinecap="round"
                />

                {/* Colombo BIA Node */}
                <g transform="translate(70, 30)">
                  <circle r="7" fill="#050505" stroke="#FFFFFF" strokeWidth="2" />
                  <circle r="3" fill="#FFFFFF" />
                  <text x="12" y="4" fill="#FFFFFF" fontSize="9" fontFamily="Syne" fontWeight="bold">
                    CMB AIRPORT
                  </text>
                </g>

                {/* Bentota Waypoint node */}
                <g transform="translate(115, 100)">
                  <circle r="4" fill="#C7A56A" />
                  <text x="8" y="3" fill="#C7A56A" fontSize="7" fontFamily="monospace">
                    BENTOTA E01
                  </text>
                </g>

                {/* Galle Fort Destination Node */}
                <g transform="translate(195, 150)">
                  <circle r="8" fill="#050505" stroke="#E31B2E" strokeWidth="2.5" />
                  <circle r="4" fill="#E31B2E" />
                  <text x="12" y="4" fill="#E31B2E" fontSize="9" fontFamily="Syne" fontWeight="bold">
                    GALLE FORT
                  </text>
                </g>

                {/* Weligama / Mirissa coastal extension */}
                <g transform="translate(255, 158)">
                  <circle r="4" fill="#C7A56A" />
                  <text x="-40" y="16" fill="#A5A5A5" fontSize="7" fontFamily="monospace">
                    WELIGAMA / MIRISSA
                  </text>
                </g>
              </svg>

              {/* Live telemetry overlay chip */}
              <div className="absolute bottom-2 left-2 bg-[#0D0D0F]/90 border border-white/[0.1] px-2.5 py-1 rounded text-[10px] font-mono text-white/80">
                GPS TRACE: ACTIVE · TOLL E01 INCL.
              </div>
            </div>

            {/* Telemetry Avionics Grid */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-[#17171C] p-3 rounded border border-white/[0.04]">
                <p className="text-[10px] uppercase font-mono text-[#A5A5A5]">Highway Distance</p>
                <p className="font-syne text-xl font-bold text-white mt-0.5">
                  {calculated.distanceKm} <span className="text-xs font-normal text-[#A5A5A5]">KM</span>
                </p>
                <p className="text-[10px] text-white/50 mt-1">Non-stop coastal express</p>
              </div>

              <div className="bg-[#17171C] p-3 rounded border border-white/[0.04]">
                <p className="text-[10px] uppercase font-mono text-[#A5A5A5]">Estimated Transit</p>
                <p className="font-syne text-xl font-bold text-white mt-0.5">
                  {Math.floor(calculated.durationMinutes / 60)}h {calculated.durationMinutes % 60}m
                </p>
                <p className="text-[10px] text-emerald-400 mt-1">Direct via Southern Toll E01</p>
              </div>
            </div>

            {/* Inclusion Guarantee List */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#A5A5A5]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A56A] shrink-0" />
                <span>All Southern Expressway electronic tolls 100% included</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#A5A5A5]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A56A] shrink-0" />
                <span>60 Minutes complimentary flight delay wait time at CMB gate</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#A5A5A5]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A56A] shrink-0" />
                <span>English-speaking SLTDA certified tour chauffeur</span>
              </div>
            </div>
          </div>

          {/* Dynamic Route Summary Card */}
          <div className="bg-[#0D0D0F]/90 backdrop-blur-xl border border-white/[0.1] rounded-lg p-6 relative shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-syne font-bold uppercase tracking-wider text-[#C7A56A]">
                  Confirmed Route Trajectory
                </span>
                <p className="text-xs text-[#A5A5A5] mt-1">
                  Selected: <span className="text-white font-medium">{selectedVehicle.name}</span>
                </p>
              </div>
              <div className="text-right">
                <span
                  className="font-syne text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {calculated.distanceKm} KM
                </span>
                <p className="text-[10px] font-mono text-emerald-400 mt-0.5">~{calculated.durationMinutes} mins highway transit</p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-white/60">Southern Expressway fast tolls included</span>
              <button
                type="button"
                onClick={handleSubmit}
                className="text-[#C7A56A] hover:text-white font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Generate Voucher</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>

            <div className="mt-4">
              <a
                href="https://airporttaxis.lk/ride"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 font-syne font-bold uppercase text-xs tracking-wider text-white bg-[#C1121F] rounded hover:bg-[#E31B2E] transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(227,27,46,0.35)]"
                title="Book instant ride on airporttaxis.lk/ride"
              >
                <span>Book Ride on AirportTaxis.lk</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
