import React, { useState } from 'react';
import { Currency, TripType, Vehicle, BookingDetails, GPSLocation } from '../types';
import { FLEET, POPULAR_LOCATIONS, WAYPOINTS, calculateEstimatedFare } from '../data/mockData';
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  Plane,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles,
  QrCode,
  Printer,
  MessageSquare,
  Copy,
  CheckCircle2,
  LocateFixed,
  ExternalLink,
  Share2,
  Trash2,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency: Currency;
  initialData?: {
    tripType?: TripType;
    pickupId?: string;
    dropoffId?: string;
    waypoints?: string[];
    date?: string;
    time?: string;
    flightNumber?: string;
    passengers?: number;
    luggage?: number;
    vehicleId?: string;
    hours?: number;
    livePickupCoords?: GPSLocation | null;
    liveDropoffCoords?: GPSLocation | null;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  currentCurrency,
  initialData,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [tripType, setTripType] = useState<TripType>(initialData?.tripType || 'transfer');
  const [pickupId, setPickupId] = useState<string>(initialData?.pickupId || 'cmb-airport');
  const [dropoffId, setDropoffId] = useState<string>(initialData?.dropoffId || 'galle-fort');
  const [selectedWaypoints, setSelectedWaypoints] = useState<string[]>(initialData?.waypoints || []);
  const [pickupDate, setPickupDate] = useState<string>(initialData?.date || '2026-10-15');
  const [pickupTime, setPickupTime] = useState<string>(initialData?.time || '14:30');
  const [flightNumber, setFlightNumber] = useState<string>(initialData?.flightNumber || 'UL504');
  const [passengers, setPassengers] = useState<number>(initialData?.passengers || 2);
  const [luggage, setLuggage] = useState<number>(initialData?.luggage || 2);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(initialData?.vehicleId || 'sedan-car');
  const [charterHours, setCharterHours] = useState<number>(initialData?.hours || 8);
  const [livePickupCoords, setLivePickupCoords] = useState<GPSLocation | null>(initialData?.livePickupCoords || null);
  const [liveDropoffCoords, setLiveDropoffCoords] = useState<GPSLocation | null>(initialData?.liveDropoffCoords || null);
  const [isLocatingModalPickup, setIsLocatingModalPickup] = useState<boolean>(false);
  const [isLocatingModalDropoff, setIsLocatingModalDropoff] = useState<boolean>(false);
  const [modalGPSNotice, setModalGPSNotice] = useState<string | null>(null);

  const handleCaptureModalGPS = (target: 'pickup' | 'dropoff') => {
    if (!navigator.geolocation) {
      setModalGPSNotice('Geolocation is not supported by your browser.');
      return;
    }

    if (target === 'pickup') setIsLocatingModalPickup(true);
    else setIsLocatingModalDropoff(true);
    setModalGPSNotice(null);

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
          setIsLocatingModalPickup(false);
          setLivePickupCoords(locationObj);
          setModalGPSNotice('Live Pickup GPS Pin locked! Attached to your booking voucher.');
        } else {
          setIsLocatingModalDropoff(false);
          setLiveDropoffCoords(locationObj);
          setModalGPSNotice('Live Destination GPS Pin locked!');
        }
      },
      (err) => {
        if (target === 'pickup') setIsLocatingModalPickup(false);
        else setIsLocatingModalDropoff(false);
        setModalGPSNotice('Unable to access location. Please allow browser location access.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  };

  // Guest Details
  const [guestName, setGuestName] = useState<string>('Alexander Wright');
  const [guestPhone, setGuestPhone] = useState<string>('+44 7911 123456');
  const [guestEmail, setGuestEmail] = useState<string>('alexander.wright@luxurytravel.com');
  const [villaAddress, setVillaAddress] = useState<string>('Amangalla Resort, 10 Church St, Galle Fort');
  const [pagingBoardName, setPagingBoardName] = useState<string>('MR. ALEXANDER WRIGHT');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Add-ons
  const [addOns, setAddOns] = useState({
    babySeat: false,
    refrigeratedKingCoconut: true,
    chilledChampagne: false,
    starlinkWifi: true,
    surfboardRack: false,
  });

  const [bookingRef, setBookingRef] = useState<string>('GPC-89241');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  // Pricing
  const fareResult = calculateEstimatedFare(
    pickupId,
    dropoffId,
    selectedVehicleId,
    tripType,
    selectedWaypoints,
    charterHours
  );

  let finalPriceUSD = fareResult.priceUSD;
  if (addOns.babySeat) finalPriceUSD += 15;
  if (addOns.refrigeratedKingCoconut) finalPriceUSD += 10;
  if (addOns.chilledChampagne) finalPriceUSD += 85;
  if (addOns.surfboardRack) finalPriceUSD += 20;

  const pickupObj = POPULAR_LOCATIONS.find((l) => l.id === pickupId) || POPULAR_LOCATIONS[0];
  const dropoffObj = POPULAR_LOCATIONS.find((l) => l.id === dropoffId) || POPULAR_LOCATIONS[1];
  const vehicleObj = FLEET.find((v) => v.id === selectedVehicleId) || FLEET[0];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      // Generate randomized realistic booking reference
      const randomCode = `GPC-${Math.floor(10000 + Math.random() * 90000)}`;
      setBookingRef(randomCode);
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleWhatsAppBooking = () => {
    const gpsPickupText = livePickupCoords
      ? `\n📍 Live GPS Pickup Pin: ${livePickupCoords.mapsUrl}`
      : '';
    const gpsDropoffText = liveDropoffCoords
      ? `\n📍 Live GPS Dropoff Pin: ${liveDropoffCoords.mapsUrl}`
      : '';

    const message = encodeURIComponent(
      `*GALLE TAXI CHAUFFEUR BOOKING DISPATCH*\n` +
      `Reference: ${bookingRef}\n` +
      `Guest Name: ${guestName}\n` +
      `Route: ${pickupObj.name} ➔ ${dropoffObj.name}\n` +
      `Vehicle: ${vehicleObj.name}\n` +
      `Date & Time: ${pickupDate} at ${pickupTime} (IST)\n` +
      `Flight: ${flightNumber || 'None'}\n` +
      `Guests / Bags: ${passengers} Guests, ${luggage} Bags\n` +
      `Dropoff Villa: ${villaAddress}` +
      gpsPickupText +
      gpsDropoffText +
      `\n\nKindly dispatch our assigned chauffeur. Thank you!`
    );
    window.open(`https://wa.me/94722885885?text=${message}`, '_blank');
  };

  const handleCopyDetails = () => {
    const gpsNote = livePickupCoords ? ` | Live Pin: ${livePickupCoords.mapsUrl}` : '';
    const text = `Booking Ref: ${bookingRef} | Guest: ${guestName} | Route: ${pickupObj.name} to ${dropoffObj.name} | Date: ${pickupDate} ${pickupTime} | Vehicle: ${vehicleObj.name}${gpsNote}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0D0D0F] border border-white/[0.12] rounded-xl shadow-[0_24px_48px_-12px_rgba(0,0,0,0.9)] overflow-hidden my-8">
        {/* Top Crimson Accent Line */}
        <div className="h-1 bg-gradient-to-r from-[#700D16] via-[#C1121F] to-[#700D16]" />

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C7A56A]">
              Executive Reservation Desk
            </span>
            <h2 className="font-syne text-xl font-bold text-white mt-0.5">
              {step === 4 ? 'Chauffeur Boarding Voucher' : 'Reserve Executive Chauffeur'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#A5A5A5] hover:text-white rounded bg-white/[0.04] hover:bg-white/[0.1] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Tabs (Steps 1-3) */}
        {step < 4 && (
          <div className="px-6 py-3 bg-[#17171C] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <span className={step >= 1 ? 'text-[#C7A56A] font-bold' : 'text-[#A5A5A5]'}>
              1. Journey
            </span>
            <span className="text-white/20">/</span>
            <span className={step >= 2 ? 'text-[#C7A56A] font-bold' : 'text-[#A5A5A5]'}>
              2. Vehicle & Luxuries
            </span>
            <span className="text-white/20">/</span>
            <span className={step >= 3 ? 'text-[#C7A56A] font-bold' : 'text-[#A5A5A5]'}>
              3. Guest Details
            </span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: JOURNEY */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-syne font-bold uppercase text-[#A5A5A5]">Pickup</label>
                    <button
                      type="button"
                      onClick={() => handleCaptureModalGPS('pickup')}
                      disabled={isLocatingModalPickup}
                      className="text-[10px] font-mono text-[#C7A56A] hover:text-white flex items-center gap-1"
                      title="Capture and share your current live GPS pickup coordinates"
                    >
                      <LocateFixed className={`w-3 h-3 ${isLocatingModalPickup ? 'animate-spin text-[#E31B2E]' : ''}`} />
                      <span>{isLocatingModalPickup ? 'Locating...' : 'Share Live GPS'}</span>
                    </button>
                  </div>
                  <select
                    value={pickupId}
                    onChange={(e) => setPickupId(e.target.value)}
                    className="w-full mt-1 bg-[#17171C] border border-white/[0.1] rounded px-3 py-2 text-sm text-white"
                  >
                    {POPULAR_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id} className="bg-[#17171C]">
                        {loc.name}
                      </option>
                    ))}
                  </select>

                  {/* Pickup Live GPS Badge */}
                  {livePickupCoords && (
                    <div className="mt-1.5 p-2 rounded bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5 text-emerald-300 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live Pin: {livePickupCoords.lat.toFixed(4)}°N, {livePickupCoords.lng.toFixed(4)}°E</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <a
                          href={livePickupCoords.mapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white hover:text-emerald-300"
                          title="Open Google Maps"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => setLivePickupCoords(null)}
                          className="text-[#A5A5A5] hover:text-red-400"
                          title="Clear Pin"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-syne font-bold uppercase text-[#A5A5A5]">Destination</label>
                    <button
                      type="button"
                      onClick={() => handleCaptureModalGPS('dropoff')}
                      disabled={isLocatingModalDropoff}
                      className="text-[10px] font-mono text-[#C7A56A] hover:text-white flex items-center gap-1"
                      title="Capture live GPS destination pin"
                    >
                      <LocateFixed className={`w-3 h-3 ${isLocatingModalDropoff ? 'animate-spin text-[#E31B2E]' : ''}`} />
                      <span>{isLocatingModalDropoff ? 'Locating...' : 'Share Live GPS'}</span>
                    </button>
                  </div>
                  <select
                    value={dropoffId}
                    onChange={(e) => setDropoffId(e.target.value)}
                    className="w-full mt-1 bg-[#17171C] border border-white/[0.1] rounded px-3 py-2 text-sm text-white"
                  >
                    {POPULAR_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id} className="bg-[#17171C]">
                        {loc.name}
                      </option>
                    ))}
                  </select>

                  {/* Dropoff Live GPS Badge */}
                  {liveDropoffCoords && (
                    <div className="mt-1.5 p-2 rounded bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5 text-emerald-300 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live Pin: {liveDropoffCoords.lat.toFixed(4)}°N, {liveDropoffCoords.lng.toFixed(4)}°E</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <a
                          href={liveDropoffCoords.mapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white hover:text-emerald-300"
                          title="Open Google Maps"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => setLiveDropoffCoords(null)}
                          className="text-[#A5A5A5] hover:text-red-400"
                          title="Clear Pin"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {modalGPSNotice && (
                <div className="p-2 rounded bg-[#17171C] border border-[#C7A56A]/40 text-xs text-[#C7A56A] flex items-center justify-between">
                  <span>{modalGPSNotice}</span>
                  <button type="button" onClick={() => setModalGPSNotice(null)} className="text-white/60">✕</button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-syne font-bold uppercase text-[#A5A5A5]">Date</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full mt-1 bg-[#17171C] border border-white/[0.1] rounded px-3 py-2 text-sm text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-syne font-bold uppercase text-[#A5A5A5]">Time</label>
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full mt-1 bg-[#17171C] border border-white/[0.1] rounded px-3 py-2 text-sm text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-syne font-bold uppercase text-[#A5A5A5]">Flight # (if arriving CMB)</label>
                  <input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="e.g. UL504, EK652"
                    className="w-full mt-1 bg-[#17171C] border border-white/[0.1] rounded px-3 py-2 text-sm text-white uppercase font-mono"
                  />
                </div>
              </div>

              {/* Waypoints Selection */}
              <div>
                <label className="text-[11px] font-syne font-bold uppercase text-[#A5A5A5] block mb-2">
                  Add En-Route Stopover (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {WAYPOINTS.slice(0, 4).map((wp) => {
                    const isSelected = selectedWaypoints.includes(wp.id);
                    return (
                      <button
                        key={wp.id}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedWaypoints(selectedWaypoints.filter((id) => id !== wp.id));
                          } else {
                            setSelectedWaypoints([...selectedWaypoints, wp.id]);
                          }
                        }}
                        className={`p-2.5 rounded text-left border text-xs flex items-center justify-between ${
                          isSelected
                            ? 'bg-black/60 border-[#C1121F] text-white'
                            : 'bg-[#17171C] border-white/[0.04] text-[#A5A5A5] hover:border-white/20'
                        }`}
                      >
                        <span className="truncate pr-2">{wp.name}</span>
                        <span className="text-[10px] font-mono text-[#C7A56A] shrink-0">+{wp.extraMinutes}m</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Transit Breakdown Preview */}
              <div className="p-4 rounded bg-[#17171C] border border-white/[0.06] flex items-center justify-between text-xs">
                <div>
                  <span className="text-white/60">Highway Distance: </span>
                  <span className="text-white font-mono font-bold">{fareResult.distanceKm} KM</span>
                  <span className="mx-2 text-white/20">|</span>
                  <span className="text-white/60">Estimated Transit: </span>
                  <span className="text-white font-mono font-bold">
                    {Math.floor(fareResult.durationMinutes / 60)}h {fareResult.durationMinutes % 60}m
                  </span>
                </div>
                <span className="text-emerald-400 font-mono">Southern Toll E01 Included</span>
              </div>
            </div>
          )}

          {/* STEP 2: VEHICLE & LUXURIES */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="text-[11px] font-syne font-bold uppercase text-[#A5A5A5] block mb-2">
                  Select Vehicle Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FLEET.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVehicleId(v.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedVehicleId === v.id
                          ? 'bg-black/80 border-[#C1121F] shadow-[0_0_15px_rgba(193,18,31,0.2)]'
                          : 'bg-[#17171C] border-white/[0.06] hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-syne text-sm font-bold text-white">{v.name}</p>
                          <p className="text-[10px] font-mono text-[#C7A56A]">{v.category}</p>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/20">
                          Available
                        </span>
                      </div>
                      <p className="text-[11px] text-[#A5A5A5] line-clamp-2">{v.shortDesc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bespoke Amenities & Add-ons */}
              <div>
                <label className="text-[11px] font-syne font-bold uppercase text-[#A5A5A5] block mb-2">
                  Tailored Cabin Luxuries & Amenities
                </label>
                <div className="space-y-2">
                  <label className="p-3 rounded bg-[#17171C] border border-white/[0.06] flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addOns.refrigeratedKingCoconut}
                        onChange={(e) =>
                          setAddOns({ ...addOns, refrigeratedKingCoconut: e.target.checked })
                        }
                        className="accent-[#C1121F] w-4 h-4"
                      />
                      <div>
                        <p className="text-xs font-semibold text-white">Chilled Fresh Ceylon King Coconut Service</p>
                        <p className="text-[11px] text-[#A5A5A5]">Freshly tapped king coconuts with cold towels upon boarding</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400">Included</span>
                  </label>

                  <label className="p-3 rounded bg-[#17171C] border border-white/[0.06] flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addOns.babySeat}
                        onChange={(e) => setAddOns({ ...addOns, babySeat: e.target.checked })}
                        className="accent-[#C1121F] w-4 h-4"
                      />
                      <div>
                        <p className="text-xs font-semibold text-white">Child Safety ISOFIX Seat</p>
                        <p className="text-[11px] text-[#A5A5A5]">European safety certified infant / toddler car seat installed</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400">On Request</span>
                  </label>

                  <label className="p-3 rounded bg-[#17171C] border border-white/[0.06] flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addOns.chilledChampagne}
                        onChange={(e) => setAddOns({ ...addOns, chilledChampagne: e.target.checked })}
                        className="accent-[#C1121F] w-4 h-4"
                      />
                      <div>
                        <p className="text-xs font-semibold text-white">Chilled Moët & Chandon Champagne Bottle</p>
                        <p className="text-[11px] text-[#A5A5A5]">Presented in silver ice bucket with crystal flutes</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400">On Request</span>
                  </label>

                  <label className="p-3 rounded bg-[#17171C] border border-white/[0.06] flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addOns.surfboardRack}
                        onChange={(e) => setAddOns({ ...addOns, surfboardRack: e.target.checked })}
                        className="accent-[#C1121F] w-4 h-4"
                      />
                      <div>
                        <p className="text-xs font-semibold text-white">Surfboard Roof Mounts & Padded Straps</p>
                        <p className="text-[11px] text-[#A5A5A5]">For Weligama & Midigama surfboards and hard boards</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400">Included</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: GUEST DETAILS */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-syne font-bold uppercase text-[#A5A5A5]">Guest Full Name *</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => {
                      setGuestName(e.target.value);
                      setPagingBoardName(e.target.value.toUpperCase());
                    }}
                    placeholder="e.g. Alexander Wright"
                    className="w-full mt-1 bg-[#17171C] border border-white/[0.1] rounded px-3 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-syne font-bold uppercase text-[#A5A5A5]">WhatsApp Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+44 7911 123456"
                    className="w-full mt-1 bg-[#17171C] border border-white/[0.1] rounded px-3 py-2 text-sm text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-syne font-bold uppercase text-[#A5A5A5]">Email Address</label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="alex@domain.com"
                    className="w-full mt-1 bg-[#17171C] border border-white/[0.1] rounded px-3 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-syne font-bold uppercase text-[#A5A5A5]">Paging Board Display Text</label>
                  <input
                    type="text"
                    value={pagingBoardName}
                    onChange={(e) => setPagingBoardName(e.target.value)}
                    className="w-full mt-1 bg-[#17171C] border border-white/[0.1] rounded px-3 py-2 text-sm text-white uppercase font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-syne font-bold uppercase text-[#A5A5A5]">
                  Drop-Off Villa / Hotel Exact Name & Address
                </label>
                <input
                  type="text"
                  value={villaAddress}
                  onChange={(e) => setVillaAddress(e.target.value)}
                  placeholder="e.g. Amangalla, Fort Bazaar, or Private Villa in Thalpe"
                  className="w-full mt-1 bg-[#17171C] border border-white/[0.1] rounded px-3 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-syne font-bold uppercase text-[#A5A5A5]">
                  Special Chauffeur Instructions / Flight Notes
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Traveling with oversize golf bag; please ensure cold towels are extra chilled."
                  className="w-full mt-1 bg-[#17171C] border border-white/[0.1] rounded px-3 py-2 text-sm text-white"
                />
              </div>
            </div>
          )}

          {/* STEP 4: VIP BOARDING VOUCHER & CONFIRMATION */}
          {step === 4 && (
            <div className="space-y-6">
              {/* Boarding Pass Container */}
              <div
                id="printable-voucher"
                className="bg-[#050505] border-2 border-[#C7A56A]/60 rounded-lg p-6 sm:p-8 text-white relative shadow-2xl overflow-hidden"
              >
                {/* Background watermark stamp */}
                <div className="absolute right-4 top-4 text-[9px] font-mono tracking-widest text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-500/10">
                  DISPATCH CONFIRMED
                </div>

                {/* Voucher Header */}
                <div className="flex items-center justify-between border-b border-white/[0.1] pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-syne font-bold tracking-[0.2em] uppercase text-[#C7A56A] block">
                      GALLE TAXI · PRESTIGE CHAUFFEUR
                    </span>
                    <h3 className="font-syne text-lg sm:text-xl font-bold text-white mt-0.5">
                      Executive Chauffeur Dispatch Voucher
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-[#A5A5A5] block">BOOKING REF</span>
                    <span className="font-syne text-lg font-mono font-bold text-white tracking-widest">
                      {bookingRef}
                    </span>
                  </div>
                </div>

                {/* Grid Details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-[#A5A5A5] uppercase">Passenger</span>
                    <p className="font-syne font-bold text-white mt-0.5 uppercase">{guestName}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#A5A5A5] uppercase">Transfer Date</span>
                    <p className="font-mono text-white mt-0.5">{pickupDate}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#A5A5A5] uppercase">Pickup Time</span>
                    <p className="font-mono text-white mt-0.5">{pickupTime} IST</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#A5A5A5] uppercase">Flight Inbound</span>
                    <p className="font-mono text-white mt-0.5">{flightNumber || 'None'}</p>
                  </div>
                </div>

                {/* Route Track */}
                <div className="p-3.5 rounded bg-[#0D0D0F] border border-white/[0.08] mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-[#A5A5A5] uppercase">Route Trajectory</span>
                    <p className="text-white font-medium mt-0.5 flex items-center gap-2">
                      <span>{pickupObj.name}</span>
                      <span className="text-[#C1121F]">➔</span>
                      <span>{dropoffObj.name}</span>
                    </p>
                    <p className="text-[11px] text-[#A5A5A5] mt-1">
                      Drop-off: <span className="text-white/80">{villaAddress}</span>
                    </p>

                    {/* Live GPS Pin Indicators */}
                    {livePickupCoords && (
                      <div className="mt-2 flex items-center gap-2 text-[11px] font-mono text-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>Live Pickup Pin: {livePickupCoords.lat.toFixed(4)}°N, {livePickupCoords.lng.toFixed(4)}°E</span>
                        <a
                          href={livePickupCoords.mapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white underline hover:text-emerald-400 flex items-center gap-0.5 ml-1"
                        >
                          <span>Open Map</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                    {liveDropoffCoords && (
                      <div className="mt-1 flex items-center gap-2 text-[11px] font-mono text-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Live Destination Pin: {liveDropoffCoords.lat.toFixed(4)}°N, {liveDropoffCoords.lng.toFixed(4)}°E</span>
                        <a
                          href={liveDropoffCoords.mapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white underline hover:text-emerald-400 flex items-center gap-0.5 ml-1"
                        >
                          <span>Open Map</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="sm:text-right">
                    <span className="text-[10px] font-mono text-[#A5A5A5] uppercase">Vehicle Tier</span>
                    <p className="font-syne font-bold text-[#C7A56A]">{vehicleObj.name}</p>
                    <p className="text-[10px] font-mono text-white/50">{vehicleObj.category}</p>
                  </div>
                </div>

                {/* Paging Board & Fare row */}
                <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/[0.1] pt-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-[#17171C] border border-white/[0.08]">
                      <QrCode className="w-10 h-10 text-[#C7A56A]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#A5A5A5] uppercase">Paging Signboard</span>
                      <p className="font-syne text-xs font-bold text-white uppercase">{pagingBoardName}</p>
                      <p className="text-[10px] text-white/50">Held at Terminal 1 Arrival Exit Gate</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase">Voucher Status</span>
                    <p className="font-syne text-xl font-extrabold text-white">
                      Confirmed Dispatch
                    </p>
                    <span className="text-[10px] font-mono text-[#A5A5A5]">All E01 Expressway Tolls Included</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Confirmed Pass */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="py-3 px-4 font-syne font-bold uppercase text-xs tracking-wider text-white bg-[#C1121F] rounded hover:bg-[#E31B2E] transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(227,27,46,0.4)]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send to WhatsApp Concierge</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyDetails}
                  className="py-3 px-4 text-xs font-semibold text-white bg-[#17171C] border border-white/[0.1] rounded hover:border-[#C7A56A] transition-all flex items-center justify-center gap-2"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Voucher Copied to Clipboard!' : 'Copy Voucher Reference'}</span>
                </button>

                <a
                  href="https://airporttaxis.lk/ride"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:col-span-2 py-3 px-4 font-syne font-bold uppercase text-xs tracking-wider text-white bg-[#0D0D0F] border border-[#C7A56A] rounded hover:bg-[#C7A56A]/15 transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4 text-[#C7A56A]" />
                  <span>Complete Online Booking on AirportTaxis.lk/ride</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (Steps 1-3) */}
        {step < 4 && (
          <div className="px-6 py-4 bg-[#17171C] border-t border-white/[0.08] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-xs font-semibold text-[#A5A5A5] hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] font-mono text-emerald-400 uppercase">Fixed Highway Transit</span>
                <p className="font-syne text-xs font-bold text-white">
                  Tolls & Chauffeur Included
                </p>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="py-2.5 px-6 font-syne font-bold uppercase text-xs tracking-wider text-white bg-[#C1121F] rounded hover:bg-[#E31B2E] transition-all flex items-center gap-2 shadow-[0_4px_16px_rgba(193,18,31,0.3)]"
              >
                <span>{step === 3 ? 'Generate Voucher' : 'Continue'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="px-6 py-4 bg-[#17171C] border-t border-white/[0.08] flex items-center justify-between text-xs text-[#A5A5A5]">
            <span>Need immediate amendments? 24/7 hotline: +94 72 288 5885</span>
            <button
              type="button"
              onClick={onClose}
              className="text-white hover:text-[#C7A56A] font-semibold"
            >
              Done / Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
