/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Currency, TripType, CuratedRoute, GPSLocation } from './types';
import { Header } from './components/Header';
import { HeroBookingSplit } from './components/HeroBookingSplit';
import { FlightRadarCockpit } from './components/FlightRadarCockpit';
import { RouteExplorer } from './components/RouteExplorer';
import { PrestigeProtocol } from './components/PrestigeProtocol';
import { Footer } from './components/Footer';
import { FloatingConciergeBar } from './components/FloatingConciergeBar';
import { BookingModal } from './components/BookingModal';
import { WhatsAppChatWidget } from './components/WhatsAppChatWidget';

export default function App() {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('USD');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingInitialData, setBookingInitialData] = useState<{
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
  }>({
    tripType: 'transfer',
    pickupId: 'cmb-airport',
    dropoffId: 'galle-fort',
    waypoints: [],
    date: '2026-10-15',
    time: '14:30',
    flightNumber: 'UL504',
    passengers: 2,
    luggage: 2,
    vehicleId: 'sedan-car',
    hours: 8,
    livePickupCoords: null,
    liveDropoffCoords: null,
  });

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
  };

  const handleInitiateFromHero = (data: {
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
  }) => {
    setBookingInitialData(data);
    setIsBookingModalOpen(true);
  };

  const handleBookCuratedRoute = (route: CuratedRoute) => {
    let pId = 'galle-fort';
    let dId = 'weligama';
    if (route.id === 'bia-to-galle') {
      pId = 'cmb-airport';
      dId = 'galle-fort';
    } else if (route.id === 'galle-to-yala-safari') {
      pId = 'galle-fort';
      dId = 'yala';
    } else if (route.id === 'tea-country-highlands') {
      pId = 'galle-fort';
      dId = 'ella';
    }

    setBookingInitialData((prev) => ({
      ...prev,
      tripType: route.id === 'galle-to-weligama-mirissa' ? 'hourly' : 'transfer',
      pickupId: pId,
      dropoffId: dId,
      hours: 8,
    }));
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e3e2e2] flex flex-col font-body selection:bg-[#C1121F] selection:text-white">
      {/* Navigation Header */}
      <Header
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Split Cockpit Hero: Real-Time Booking Engine + Radar Trajectory */}
        <HeroBookingSplit
          currentCurrency={currentCurrency}
          onInitiateBooking={handleInitiateFromHero}
        />

        {/* Airport Flight Radar & Signboard Simulator */}
        <FlightRadarCockpit />

        {/* Curated Southern Itineraries & Highway Express */}
        <RouteExplorer
          currentCurrency={currentCurrency}
          onBookRoute={handleBookCuratedRoute}
        />

        {/* The Sovereign Standard / Prestige Protocol */}
        <PrestigeProtocol />
      </main>

      {/* Discrete Quiet Footer */}
      <Footer />

      {/* Persistent Floating Quick-Concierge Bar */}
      <FloatingConciergeBar onOpenBooking={handleOpenBooking} />

      {/* Floating Animated WhatsApp Chat Widget */}
      <WhatsAppChatWidget />

      {/* 4-Step VIP Chauffeur Booking Modal & Boarding Voucher Generator */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        currentCurrency={currentCurrency}
        initialData={bookingInitialData}
      />
    </div>
  );
}
