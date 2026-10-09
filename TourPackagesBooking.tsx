import React, { useState } from 'react';
import { Currency, TourPackage } from '../types';
import { TOUR_PACKAGES, formatCurrency } from '../data/mockData';
import {
  Clock,
  Compass,
  Check,
  Star,
  Users,
  Briefcase,
  Car,
  CarFront,
  BusFront,
  Bus,
  Calendar,
  MapPin,
  ExternalLink,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';

interface TourPackagesBookingProps {
  currentCurrency: Currency;
  onOpenGlobalModal?: () => void;
}

interface VehicleTierOption {
  id: string;
  name: string;
  category: string;
  passengers: number;
  luggage: number;
  extraUSD: number;
  icon: React.FC<{ className?: string }>;
}

const VEHICLE_TIERS: VehicleTierOption[] = [
  {
    id: 'sedan-car',
    name: 'Executive Sedan',
    category: 'Toyota Premio / Allion',
    passengers: 3,
    luggage: 3,
    extraUSD: 0,
    icon: Car,
  },
  {
    id: 'suv-car',
    name: 'Crossover SUV',
    category: 'Honda Vezel 4WD',
    passengers: 4,
    luggage: 4,
    extraUSD: 30,
    icon: CarFront,
  },
  {
    id: 'kdh-flat-roof',
    name: 'KDH Passenger Van',
    category: 'Toyota HiAce Standard',
    passengers: 6,
    luggage: 6,
    extraUSD: 55,
    icon: BusFront,
  },
  {
    id: 'kdh-high-roof',
    name: 'KDH Luxury Commuter',
    category: 'Toyota HiAce High Roof',
    passengers: 9,
    luggage: 8,
    extraUSD: 90,
    icon: Bus,
  },
];

const POPULAR_PICKUP_HUBS = [
  'Galle Fort (Historic Ramparts)',
  'Unawatuna & Thalpe Beach Villas',
  'Mirissa & Weligama Bay Resorts',
  'Bandaranaike Int Airport (CMB Terminal)',
  'Colombo 01-07 City Hotels',
  'Bentota & Beruwala Coastal Resorts',
  'Tangalle & Dikwella Ocean Fronts',
  'Custom Villa / Hotel Address',
];

export const TourPackagesBooking: React.FC<TourPackagesBookingProps> = ({
  currentCurrency,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedPackageId, setSelectedPackageId] = useState<string>(TOUR_PACKAGES[0].id);
  const [selectedVehicleTier, setSelectedVehicleTier] = useState<string>('sedan-car');

  // Step 2 Form State
  const [pickupLocation, setPickupLocation] = useState<string>('Galle Fort (Historic Ramparts)');
  const [customHotel, setCustomHotel] = useState<string>('');
  const [tourDate, setTourDate] = useState<string>('2026-10-18');
  const [departureTime, setDepartureTime] = useState<string>('07:30');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [luggageCount, setLuggageCount] = useState<number>(2);
  const [addSafariJeep, setAddSafariJeep] = useState<boolean>(false);
  const [addEnglishGuide, setAddEnglishGuide] = useState<boolean>(false);
  const [addRefreshments, setAddRefreshments] = useState<boolean>(true);

  // Active package & vehicle
  const activePackage = TOUR_PACKAGES.find((p) => p.id === selectedPackageId) || TOUR_PACKAGES[0];
  const activeVehicle = VEHICLE_TIERS.find((v) => v.id === selectedVehicleTier) || VEHICLE_TIERS[0];

  // Pricing Calculation
  const vehicleExtra = activeVehicle.extraUSD;
  const safariJeepExtra = addSafariJeep ? 75 : 0;
  const englishGuideExtra = addEnglishGuide ? 35 : 0;
  const totalTourUSD = activePackage.basePriceUSD + vehicleExtra + safariJeepExtra + englishGuideExtra;

  // Handle WhatsApp Voucher Booking
  const handleWhatsAppBooking = () => {
    const pickupDisplay = pickupLocation === 'Custom Villa / Hotel Address' && customHotel ? customHotel : pickupLocation;
    const msg = [
      `*GALLE TAXI - TOUR PACKAGE RESERVATION*`,
      `---------------------------------------`,
      `*Package:* ${activePackage.title}`,
      `*Vehicle Tier:* ${activeVehicle.name} (${activeVehicle.category})`,
      `*Pickup Location:* ${pickupDisplay}`,
      `*Date & Departure Time:* ${tourDate} at ${departureTime}`,
      `*Guests:* ${guestCount} Guests · ${luggageCount} Suitcases`,
      `*Add-ons:* ${addSafariJeep ? 'Private 4x4 Jeep included, ' : ''}${addEnglishGuide ? 'Dedicated Guide, ' : ''}Complimentary Refreshments`,
      `*Estimated Tour Fare:* ${formatCurrency(totalTourUSD, currentCurrency)}`,
      `---------------------------------------`,
      `Please confirm availability and dispatch voucher for my tour. Thank you!`,
    ].join('\n');

    window.open(`https://wa.me/94722885885?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="tours" className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto border-t border-white/[0.08]">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-widest text-[#C7A56A]">
          <span className="w-1.5 h-1.5 bg-[#E31B2E] rounded-full" />
          <span>Curated Sri Lankan Journeys · 1 - 3 Step Booking</span>
        </div>
        <h2
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
          style={{ fontFamily: 'Verdana, sans-serif' }}
        >
          5 Best Sri Lanka Tour Packages
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#A5A5A5] max-w-2xl mx-auto leading-relaxed">
          Exclusive private chauffeur-driven day and overnight excursions across UNESCO fortresses, wild leopard kingdoms, coastal whale migration paths, and misty Ceylon tea peaks.
        </p>

        {/* 1 - 3 Step Navigation Indicators */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto mt-8 p-1.5 bg-[#17171C] rounded-lg border border-white/[0.08]">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`py-2.5 px-2 rounded text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              currentStep === 1
                ? 'bg-[#050505] text-white border border-[#C1121F] shadow-md'
                : 'text-[#A5A5A5] hover:text-white'
            }`}
          >
            <span className={`w-5 h-5 rounded-full text-[11px] font-mono flex items-center justify-center font-bold ${
              currentStep === 1 ? 'bg-[#C1121F] text-white' : 'bg-white/10 text-white'
            }`}>
              1
            </span>
            <span className="hidden sm:inline">Choose Tour & Car</span>
            <span className="sm:hidden">Tour</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className={`py-2.5 px-2 rounded text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              currentStep === 2
                ? 'bg-[#050505] text-white border border-[#C1121F] shadow-md'
                : 'text-[#A5A5A5] hover:text-white'
            }`}
          >
            <span className={`w-5 h-5 rounded-full text-[11px] font-mono flex items-center justify-center font-bold ${
              currentStep === 2 ? 'bg-[#C1121F] text-white' : 'bg-white/10 text-white'
            }`}>
              2
            </span>
            <span className="hidden sm:inline">Schedule & Pickup</span>
            <span className="sm:hidden">Schedule</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className={`py-2.5 px-2 rounded text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              currentStep === 3
                ? 'bg-[#050505] text-white border border-[#C1121F] shadow-md'
                : 'text-[#A5A5A5] hover:text-white'
            }`}
          >
            <span className={`w-5 h-5 rounded-full text-[11px] font-mono flex items-center justify-center font-bold ${
              currentStep === 3 ? 'bg-[#C1121F] text-white' : 'bg-white/10 text-white'
            }`}>
              3
            </span>
            <span className="hidden sm:inline">Review & Confirm</span>
            <span className="sm:hidden">Confirm</span>
          </button>
        </div>
      </div>

      {/* STEP 1: SELECT TOUR PACKAGE & VEHICLE TIER */}
      {currentStep === 1 && (
        <div className="space-y-12">
          {/* 5 Tour Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOUR_PACKAGES.map((pkg, idx) => {
              const isSelected = selectedPackageId === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackageId(pkg.id)}
                  className={`group bg-[#0D0D0F] border rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-[#C1121F] shadow-[0_0_25px_rgba(193,18,31,0.25)] ring-1 ring-[#C1121F]'
                      : 'border-white/[0.08] hover:border-white/[0.2] hover:shadow-xl'
                  }`}
                >
                  <div>
                    {/* Package Hero Image */}
                    <div className="relative aspect-[16/10] bg-[#050505] overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = '/images/route_galle_fort_1791374353241.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0F] via-transparent to-transparent opacity-80" />

                      {/* Badge & Duration */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/[0.1] text-[#C7A56A] font-bold">
                          {pkg.badge}
                        </span>
                        <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md border border-white/[0.1] px-2 py-0.5 rounded text-[11px] text-amber-400 font-mono">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{pkg.rating}</span>
                        </div>
                      </div>

                      <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs font-mono text-white/90">
                        <Clock className="w-3.5 h-3.5 text-[#C7A56A]" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6">
                      <h3 className="font-syne text-xl font-bold text-white group-hover:text-white/90 mb-1 leading-snug">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-[#C7A56A] font-mono mb-4 leading-relaxed">
                        {pkg.tagline}
                      </p>
                      <p className="text-xs text-[#A5A5A5] leading-relaxed mb-4 line-clamp-2">
                        {pkg.description}
                      </p>

                      {/* Itinerary Highlights */}
                      <div className="space-y-1.5 pt-3 border-t border-white/[0.06]">
                        <p className="text-[10px] font-mono uppercase text-white/60 tracking-wider">
                          Key Itinerary Highlights:
                        </p>
                        {pkg.stops.slice(0, 3).map((stop, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-xs text-white/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E31B2E] shrink-0" />
                            <span className="truncate">{stop}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-white/[0.06] mt-auto">
                    <div className="flex items-baseline justify-between py-3">
                      <div>
                        <span className="text-[10px] text-[#A5A5A5] uppercase font-mono block">From</span>
                        <span className="text-xl font-syne font-bold text-white">
                          {formatCurrency(pkg.basePriceUSD, currentCurrency)}
                        </span>
                        <span className="text-[10px] text-[#A5A5A5] font-mono ml-1">/ Private Vehicle</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPackageId(pkg.id);
                          setCurrentStep(2);
                        }}
                        className={`py-2 px-3.5 rounded text-xs font-syne font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#C1121F] text-white hover:bg-[#E31B2E] shadow-md'
                            : 'bg-[#17171C] text-white hover:bg-white/10 border border-white/[0.1]'
                        }`}
                      >
                        <span>{isSelected ? 'Configure Schedule' : 'Select Package'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Vehicle Tier Selection for the Selected Package */}
          <div className="bg-[#0D0D0F] border border-white/[0.08] rounded-xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#C7A56A]">
                  Step 1.2 · Chauffeur Vehicle Fleet Tier
                </span>
                <h3 className="text-xl font-syne font-bold text-white mt-1">
                  Choose Vehicle for {activePackage.title}
                </h3>
              </div>
              <span className="text-xs text-[#A5A5A5] font-mono">
                All vehicles air-conditioned with professional tourist chauffeur
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {VEHICLE_TIERS.map((tier) => {
                const IconComponent = tier.icon;
                const isSelected = selectedVehicleTier === tier.id;
                const tierPrice = activePackage.basePriceUSD + tier.extraUSD;

                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedVehicleTier(tier.id)}
                    className={`p-4 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-black/90 border-[#C1121F] shadow-[0_0_15px_rgba(193,18,31,0.3)] ring-1 ring-[#C1121F]'
                        : 'bg-[#17171C] border-white/[0.06] hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 rounded bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-[#C7A56A]" />
                        </div>
                        {tier.extraUSD === 0 ? (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                            Base Included
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-[#C7A56A] bg-amber-950/40 px-2 py-0.5 rounded border border-[#C7A56A]/30">
                            +{formatCurrency(tier.extraUSD, currentCurrency)}
                          </span>
                        )}
                      </div>

                      <h4 className="font-syne font-bold text-sm text-white">{tier.name}</h4>
                      <p className="text-[11px] text-[#A5A5A5] font-mono mb-3">{tier.category}</p>

                      <div className="space-y-1.5 text-xs text-white/80 pt-2 border-t border-white/[0.06]">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#C7A56A]" />
                          <span>1-{tier.passengers} Passengers</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-[#C7A56A]" />
                          <span>1-{tier.luggage} Suitcases</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-white">
                        {formatCurrency(tierPrice, currentCurrency)}
                      </span>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#C1121F] bg-[#C1121F]' : 'border-white/20'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Proceed to Step 2 Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="py-3 px-8 font-syne font-bold tracking-wide uppercase text-xs sm:text-sm text-white bg-[#C1121F] hover:bg-[#E31B2E] rounded transition-all shadow-[0_4px_20px_rgba(227,27,46,0.35)] flex items-center gap-2"
              >
                <span>Proceed to Schedule & Pickup Details (Step 2)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: SCHEDULE & PICKUP LOCATION */}
      {currentStep === 2 && (
        <div className="max-w-4xl mx-auto bg-[#0D0D0F] border border-white/[0.08] rounded-xl p-6 sm:p-10 space-y-8 shadow-2xl">
          {/* Header Summary */}
          <div className="border-b border-white/[0.08] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#C7A56A]">
                Step 2 of 3 · Journey Logistics
              </span>
              <h3 className="text-2xl font-syne font-bold text-white mt-1">
                Customize Pickup & Departure
              </h3>
            </div>
            <div className="bg-[#17171C] border border-white/[0.06] rounded px-4 py-2 text-right">
              <span className="text-[10px] text-[#A5A5A5] uppercase font-mono block">Selected Package</span>
              <span className="text-xs font-bold text-white truncate block max-w-xs">{activePackage.title}</span>
              <span className="text-[11px] text-[#C7A56A] font-mono">{activeVehicle.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pickup Hub Selection */}
            <div className="space-y-2">
              <label className="text-xs font-syne font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C7A56A]" />
                <span>Pickup Location</span>
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full bg-[#17171C] border border-white/[0.1] rounded px-3.5 py-3 text-sm text-white focus:outline-none focus:border-[#C1121F] cursor-pointer"
              >
                {POPULAR_PICKUP_HUBS.map((hub) => (
                  <option key={hub} value={hub} className="bg-[#17171C] text-white">
                    {hub}
                  </option>
                ))}
              </select>

              {pickupLocation === 'Custom Villa / Hotel Address' && (
                <input
                  type="text"
                  placeholder="Enter Villa / Hotel Name or Address"
                  value={customHotel}
                  onChange={(e) => setCustomHotel(e.target.value)}
                  className="w-full mt-2 bg-[#17171C] border border-white/[0.1] rounded px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#C1121F]"
                />
              )}
            </div>

            {/* Departure Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-syne font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#C7A56A]" />
                  <span>Tour Date</span>
                </label>
                <input
                  type="date"
                  value={tourDate}
                  onChange={(e) => setTourDate(e.target.value)}
                  className="w-full bg-[#17171C] border border-white/[0.1] rounded px-3 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-[#C1121F]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-syne font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#C7A56A]" />
                  <span>Departure Time</span>
                </label>
                <input
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="w-full bg-[#17171C] border border-white/[0.1] rounded px-3 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-[#C1121F]"
                />
              </div>
            </div>

            {/* Guests & Luggage Count */}
            <div className="bg-[#17171C] border border-white/[0.08] rounded p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Users className="w-4 h-4 text-[#C7A56A]" />
                <span className="text-xs font-medium">Tour Guests</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                  className="w-7 h-7 rounded bg-black/40 border border-white/[0.1] text-white flex items-center justify-center hover:bg-white/10"
                >
                  -
                </button>
                <span className="text-sm font-mono font-bold text-white w-4 text-center">{guestCount}</span>
                <button
                  type="button"
                  onClick={() => setGuestCount(Math.min(activeVehicle.passengers, guestCount + 1))}
                  className="w-7 h-7 rounded bg-black/40 border border-white/[0.1] text-white flex items-center justify-center hover:bg-white/10"
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-[#17171C] border border-white/[0.08] rounded p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Briefcase className="w-4 h-4 text-[#C7A56A]" />
                <span className="text-xs font-medium">Luggage Pieces</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLuggageCount(Math.max(0, luggageCount - 1))}
                  className="w-7 h-7 rounded bg-black/40 border border-white/[0.1] text-white flex items-center justify-center hover:bg-white/10"
                >
                  -
                </button>
                <span className="text-sm font-mono font-bold text-white w-4 text-center">{luggageCount}</span>
                <button
                  type="button"
                  onClick={() => setLuggageCount(Math.min(activeVehicle.luggage, luggageCount + 1))}
                  className="w-7 h-7 rounded bg-black/40 border border-white/[0.1] text-white flex items-center justify-center hover:bg-white/10"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Optional Tour Add-ons */}
          <div className="space-y-3 pt-4 border-t border-white/[0.08]">
            <h4 className="text-xs font-syne font-bold uppercase tracking-wider text-[#C7A56A]">
              Optional Tour Enhancements
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className={`p-3 rounded border cursor-pointer transition-all flex items-start gap-2.5 ${
                addSafariJeep ? 'bg-black/60 border-[#C1121F]' : 'bg-[#17171C] border-white/[0.06]'
              }`}>
                <input
                  type="checkbox"
                  checked={addSafariJeep}
                  onChange={(e) => setAddSafariJeep(e.target.checked)}
                  className="mt-1 accent-[#C1121F]"
                />
                <div>
                  <p className="text-xs font-bold text-white">Private 4x4 Safari Jeep</p>
                  <p className="text-[11px] text-[#A5A5A5]">+{formatCurrency(75, currentCurrency)} · Safari tracker</p>
                </div>
              </label>

              <label className={`p-3 rounded border cursor-pointer transition-all flex items-start gap-2.5 ${
                addEnglishGuide ? 'bg-black/60 border-[#C1121F]' : 'bg-[#17171C] border-white/[0.06]'
              }`}>
                <input
                  type="checkbox"
                  checked={addEnglishGuide}
                  onChange={(e) => setAddEnglishGuide(e.target.checked)}
                  className="mt-1 accent-[#C1121F]"
                />
                <div>
                  <p className="text-xs font-bold text-white">National Tourist Guide</p>
                  <p className="text-[11px] text-[#A5A5A5]">+{formatCurrency(35, currentCurrency)} · In-depth commentary</p>
                </div>
              </label>

              <label className={`p-3 rounded border cursor-pointer transition-all flex items-start gap-2.5 ${
                addRefreshments ? 'bg-black/60 border-emerald-500/40' : 'bg-[#17171C] border-white/[0.06]'
              }`}>
                <input
                  type="checkbox"
                  checked={addRefreshments}
                  onChange={(e) => setAddRefreshments(e.target.checked)}
                  className="mt-1 accent-emerald-500"
                />
                <div>
                  <p className="text-xs font-bold text-white">Cold Ceylon Refreshments</p>
                  <p className="text-[11px] text-emerald-400">Included Free · King Coconuts & Water</p>
                </div>
              </label>
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="py-3 px-6 rounded text-xs font-syne font-bold uppercase tracking-wider text-[#A5A5A5] hover:text-white bg-[#17171C] hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Packages</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="py-3 px-8 font-syne font-bold tracking-wide uppercase text-xs sm:text-sm text-white bg-[#C1121F] hover:bg-[#E31B2E] rounded transition-all shadow-[0_4px_20px_rgba(227,27,46,0.35)] flex items-center gap-2"
            >
              <span>Review Voucher & Confirm (Step 3)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: INSTANT CONFIRMATION & VOUCHER GENERATOR */}
      {currentStep === 3 && (
        <div className="max-w-3xl mx-auto bg-[#0D0D0F] border border-white/[0.08] rounded-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle gold brand glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#C7A56A]/10 blur-3xl pointer-events-none rounded-full" />

          {/* Voucher Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>STEP 3 OF 3 · VOUCHER READY FOR DISPATCH</span>
              </div>
              <h3 className="text-2xl font-syne font-bold text-white">
                Private Tour Booking Summary
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#A5A5A5] font-mono block">Voucher Ref:</span>
              <span className="text-xs font-mono font-bold text-[#C7A56A]">
                GT-{activePackage.id.slice(0, 4).toUpperCase()}-2026
              </span>
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="my-6 p-6 rounded-lg bg-[#17171C] border border-white/[0.06] space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-syne font-bold text-lg text-white">{activePackage.title}</p>
                <p className="text-xs text-[#C7A56A] font-mono mt-0.5">{activePackage.duration} · {activePackage.distanceKm} KM Estimated</p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#050505] border border-white/[0.1] text-white">
                {activeVehicle.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-white/[0.06]">
              <div>
                <span className="text-[#A5A5A5] block">Pickup Location:</span>
                <span className="text-white font-medium">
                  {pickupLocation === 'Custom Villa / Hotel Address' && customHotel ? customHotel : pickupLocation}
                </span>
              </div>
              <div>
                <span className="text-[#A5A5A5] block">Tour Date & Time:</span>
                <span className="text-white font-mono font-medium">
                  {tourDate} at {departureTime} IST
                </span>
              </div>
              <div>
                <span className="text-[#A5A5A5] block">Tour Party Size:</span>
                <span className="text-white font-medium">{guestCount} Guests · {luggageCount} Suitcases</span>
              </div>
              <div>
                <span className="text-[#A5A5A5] block">Vehicle Tier:</span>
                <span className="text-white font-medium">{activeVehicle.category}</span>
              </div>
            </div>

            {/* Inclusions checklist */}
            <div className="pt-3 border-t border-white/[0.06] space-y-1.5">
              <p className="text-[11px] font-mono text-[#C7A56A] uppercase font-bold">Standard All-Inclusive Amenities:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Licensed English Tour Chauffeur</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Expressway Tolls & Vehicle Fuel</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Chilled King Coconuts & Water</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Zero Cancellation Fee up to 24h</span>
                </div>
              </div>
            </div>

            {/* Total Fare Row */}
            <div className="pt-4 border-t border-white/[0.1] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#A5A5A5] font-mono uppercase block">All-Inclusive Fixed Tour Fare</span>
                <span className="text-2xl sm:text-3xl font-syne font-extrabold text-[#C7A56A]">
                  {formatCurrency(totalTourUSD, currentCurrency)}
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded">
                Guaranteed Fixed Rate
              </span>
            </div>
          </div>

          {/* Action CTAs: Direct Booking & WhatsApp Dispatch */}
          <div className="space-y-3 pt-2">
            <a
              href="https://airporttaxis.lk/ride"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 font-syne font-extrabold tracking-wide uppercase text-sm text-[#0D0D0F] bg-[#C7A56A] hover:bg-[#D9B778] hover:shadow-[0_4px_24px_rgba(199,165,106,0.45)] rounded transition-all duration-150 flex items-center justify-center gap-2"
              title="Open https://airporttaxis.lk/ride"
            >
              <span>Book Online (airporttaxis.lk/ride)</span>
              <ExternalLink className="w-4 h-4 text-[#0D0D0F]" />
            </a>

            <button
              type="button"
              onClick={handleWhatsAppBooking}
              className="w-full py-3.5 px-6 font-syne font-bold tracking-wide uppercase text-xs sm:text-sm text-white bg-emerald-700 hover:bg-emerald-600 rounded transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Instant WhatsApp Concierge Voucher (+94 72 288 5885)</span>
            </button>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="text-xs text-[#A5A5A5] hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Modify Schedule Details</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs text-[#C7A56A] hover:underline transition-colors"
              >
                Browse Other Tour Packages
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
