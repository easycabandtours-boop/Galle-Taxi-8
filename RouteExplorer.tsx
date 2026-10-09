import React from 'react';
import { Currency, CuratedRoute } from '../types';
import { CURATED_ROUTES } from '../data/mockData';
import { Clock, Navigation, CheckCircle2, ArrowRight } from 'lucide-react';

interface RouteExplorerProps {
  currentCurrency: Currency;
  onBookRoute: (route: CuratedRoute) => void;
}

export const RouteExplorer: React.FC<RouteExplorerProps> = ({
  currentCurrency,
  onBookRoute,
}) => {
  return (
    <section id="routes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-widest text-[#C7A56A]">
          <span className="w-1.5 h-1.5 bg-[#E31B2E] rounded-full" />
          <span>Curated Southern Journeys</span>
        </div>
        <h2
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          style={{ fontFamily: 'Verdana, sans-serif' }}
        >
          Signature Transfers & Chauffeur Itineraries
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#A5A5A5]">
          Handcrafted routes designed for effortless transit across Sri Lanka's UNESCO citadels, secluded surf breaks, wild leopard habitats, and misty Ceylon tea hills.
        </p>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {CURATED_ROUTES.map((route) => (
          <div
            key={route.id}
            className="group bg-[#0D0D0F] border border-white/[0.08] hover:border-white/[0.2] rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-2xl hover:shadow-black"
          >
            <div>
              {/* Route Hero Image with measured contrast scrim */}
              <div className="relative aspect-[16/9] bg-[#050505] overflow-hidden">
                <img
                  src={route.image}
                  alt={route.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0F] via-black/40 to-transparent" />

                {/* Tag Pill */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/[0.1] text-[#C7A56A] font-bold">
                    {route.tag}
                  </span>
                </div>

                {/* Duration & Distance Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="flex items-center gap-1.5 font-mono bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/[0.1]">
                    <Clock className="w-3.5 h-3.5 text-[#C7A56A]" />
                    {route.duration}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/[0.1]">
                    <Navigation className="w-3.5 h-3.5 text-[#C1121F]" />
                    {route.distanceKm} KM
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8">
                <p className="text-xs font-mono uppercase text-[#C7A56A] mb-1">
                  {route.subtitle}
                </p>
                <h3 className="font-syne text-xl sm:text-2xl font-bold text-white mb-3">
                  {route.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A5A5A5] leading-relaxed mb-6">
                  {route.description}
                </p>

                {/* Inclusions */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] font-mono uppercase text-white/50 tracking-wider">
                    Journey Inclusions & Standards
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {route.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-white/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A56A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded bg-[#17171C] border border-white/[0.04] text-xs text-[#A5A5A5]">
                  <span className="text-white font-medium">Ideal for: </span>
                  {route.idealFor}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-6 sm:p-8 pt-0 border-t border-white/[0.06] mt-auto flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400">Fixed Transit Route</span>
                <p className="font-syne text-sm font-bold text-white mt-0.5">
                  Express Highway Transit
                </p>
              </div>

              <a
                href="https://airporttaxis.lk/ride"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-5 font-syne font-bold uppercase text-xs tracking-wider text-white bg-[#C1121F] rounded hover:bg-[#E31B2E] transition-all duration-150 flex items-center gap-2 shadow-[0_4px_16px_rgba(193,18,31,0.3)]"
              >
                <span>Book This Route</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
