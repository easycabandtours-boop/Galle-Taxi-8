import React, { useState } from 'react';
import { Currency, Vehicle } from '../types';
import { FLEET } from '../data/mockData';
import { Users, Briefcase, Wifi, Wind, Coffee, ShieldCheck, Check } from 'lucide-react';

interface FleetShowcaseProps {
  currentCurrency: Currency;
  onSelectVehicle: (vehicleId: string) => void;
}

export const FleetShowcase: React.FC<FleetShowcaseProps> = ({
  currentCurrency,
  onSelectVehicle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Fleet' },
    { id: 'KDH FLAT ROOF', label: 'KDH FLAT ROOF' },
    { id: 'KDH HIGH ROOF', label: 'KDH HIGH ROOF' },
  ];

  const filteredFleet = FLEET.filter((v) => v.id !== 'sedan-car' && v.id !== 'suv-car').filter((v) => {
    if (selectedCategory === 'all') return true;
    return v.category === selectedCategory;
  });

  return (
    <section id="fleet" className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-widest text-[#C7A56A]">
          <span className="w-1.5 h-1.5 bg-[#E31B2E] rounded-full" />
          <span>Vehicle Classifications</span>
        </div>
        <h2
          className="text-3xl sm:text-4xl text-white tracking-tight"
          style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontStyle: 'italic' }}
        >
          The Prestige Chauffeur Fleet
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#A5A5A5]">
          A meticulously maintained stable of executive limousines, luxury lounge vans, and high-clearance expedition vehicles.
          Every vehicle is sanitized prior to dispatch and stocked with refrigerated Ceylon king coconuts, chilled towels, and high-speed Wi-Fi.
        </p>
      </div>

      {/* Interactive Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`py-2 px-4 text-xs font-medium rounded transition-all whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-[#17171C] text-white border border-white/[0.2] shadow-sm font-semibold'
                : 'text-[#A5A5A5] hover:text-white bg-transparent border border-white/[0.04]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFleet.map((vehicle) => (
          <div
            key={vehicle.id}
            className="group bg-[#0D0D0F] border border-white/[0.08] hover:border-white/[0.2] rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-2xl hover:shadow-black"
          >
            <div>
              {/* Vehicle Image Container */}
              <div className="relative aspect-[16/10] bg-gradient-to-b from-[#181B26] via-[#0E1017] to-[#07080B] overflow-hidden">
                {/* Ambient Showcase Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-36 bg-[#C7A56A]/15 blur-3xl pointer-events-none rounded-full" />

                <img
                  src={vehicle.id === 'suv-car' ? '/White Honda Vezel by the Tropical Coast.png' : vehicle.image}
                  alt={vehicle.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 relative z-10"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 50%, #1A1D2A 0%, #0D0E15 65%, #050608 100%)',
                  }}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    if (vehicle.id === 'suv-car') {
                      img.src = '/images/vezel_ehev_white.jpg';
                    } else if (vehicle.id === 'sedan-car') {
                      img.src = '/images/sedan_car_1791376520741.jpg';
                    } else if (vehicle.id === 'kdh-flat-roof') {
                      img.src = '/images/kdh_flat_roof_1791376562188.jpg';
                    } else if (vehicle.id === 'kdh-high-roof') {
                      img.src = '/images/kdh_high_roof_1791376602232.jpg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0F] via-transparent to-transparent opacity-50 z-20 pointer-events-none" />

                {/* Popular or Category Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/[0.1] text-white">
                    {vehicle.category}
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-syne text-xl font-bold text-white group-hover:text-white/90">
                    {vehicle.name}
                  </h3>
                </div>

                <p className="text-xs text-[#A5A5A5] leading-relaxed mb-6">
                  {vehicle.shortDesc}
                </p>

                {/* Avionics Specs Grid */}
                <div className="grid grid-cols-2 gap-2.5 p-3 rounded bg-[#17171C] border border-white/[0.04] mb-6">
                  <div className="flex items-center gap-2 text-xs text-white">
                    <Users className="w-3.5 h-3.5 text-[#C7A56A]" />
                    <span>Up to {vehicle.passengers} Guests</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white">
                    <Briefcase className="w-3.5 h-3.5 text-[#C7A56A]" />
                    <span>{vehicle.luggage} Hard Cases</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white">
                    <Wifi className="w-3.5 h-3.5 text-[#C7A56A]" />
                    <span className="truncate">{vehicle.specs.wifi}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white">
                    <Coffee className="w-3.5 h-3.5 text-[#C7A56A]" />
                    <span className="truncate">Cold Refreshments</span>
                  </div>
                </div>

                {/* Features Bullet List */}
                <ul className="space-y-2 mb-6">
                  {vehicle.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#A5A5A5]">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Footer with Fleet Status & Reservation CTA */}
            <div className="p-6 pt-0 border-t border-white/[0.06] mt-auto">
              <div className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Licensed Chauffeur Ready</span>
                </div>

                <span className="text-[10px] font-mono text-[#C7A56A] uppercase tracking-wider">
                  Expressway Fast-Tag Included
                </span>
              </div>

              <button
                type="button"
                onClick={() => onSelectVehicle(vehicle.id)}
                className="w-full py-2.5 px-4 font-syne font-bold uppercase text-xs tracking-wider text-white bg-[#17171C] border border-white/[0.1] rounded hover:bg-[#C1121F] hover:border-[#C1121F] transition-all duration-150"
              >
                Reserve This Vehicle
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
