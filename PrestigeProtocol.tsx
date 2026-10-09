import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const PrestigeProtocol: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Discretion & SLTDA Certification',
      desc: 'Every chauffeur is certified by the Sri Lanka Tourism Development Authority (SLTDA), English-fluent, background-vetted, and adheres to strict non-disclosure protocol.',
      points: ['Official SLTDA National Tourist Guide / Chauffeur licence', 'NDA signed on client request', 'Discreet, unbranded executive transport']
    },
    {
      num: '02',
      title: 'Guaranteed Routes & E01 Toll Passes',
      desc: 'All Southern Expressway electronic RFID toll charges are included in your transfer. Never face unexpected fuel surcharges, peak-hour surge, or midnight arrival fees.',
      points: ['All-inclusive expressway transits', 'Pre-paid E01 expressway transponder (no cash stops)', 'Zero flight delay waiting penalty up to 60 mins']
    },
    {
      num: '03',
      title: 'Executive Cabin Hospitality',
      desc: 'Vehicles undergo full acoustic inspection and mechanical sanitization before every dispatch. Cabins are pre-chilled to your preferred temperature with island refreshments.',
      points: ['Chilled fresh King Coconut & artisan mineral water', 'Lemongrass refreshing cold towels on arrival', 'High-speed Starlink 5G mobile hotspot']
    },
    {
      num: '04',
      title: 'Direct Villa Concierge Coordination',
      desc: 'We coordinate arrival timing directly with your villa management, resort front desk, or butler to ensure private gate clearances and smooth luggage transfer.',
      points: ['Door-to-door luggage porterage into villa suites', 'Direct liaison with Amangalla, Cape Weligama & Amanwella', 'Flexible on-demand route itinerary amendments']
    }
  ];

  return (
    <section id="protocol" className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-widest text-[#C7A56A]">
          <span className="w-1.5 h-1.5 bg-[#E31B2E] rounded-full" />
          <span>The Sovereign Standard</span>
        </div>
        <h2
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          The Galle Prestige Protocol
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#A5A5A5]">
          Operating at the intersection of private aviation precision and gracious Ceylon hospitality.
          Here is how we deliver seamless travel between Bandaranaike International and the southern sanctuary.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((pillar) => (
          <div
            key={pillar.num}
            className="p-8 bg-[#0D0D0F] border border-white/[0.08] rounded-lg hover:border-white/[0.18] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span
                  className="text-2xl font-extrabold text-[#C7A56A]"
                  style={{ fontFamily: 'Verdana, sans-serif' }}
                >
                  {pillar.num}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#C1121F]" />
              </div>

              <h3 className="font-syne text-xl font-bold text-white mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#A5A5A5] leading-relaxed mb-6">
                {pillar.desc}
              </p>
            </div>

            <ul className="space-y-2 pt-4 border-t border-white/[0.04]">
              {pillar.points.map((pt, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-white/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A56A] shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
