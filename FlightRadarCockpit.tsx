import React, { useState } from 'react';
import { SAMPLE_FLIGHTS } from '../data/mockData';
import { FlightStatus } from '../types';
import { Plane, Clock, ShieldCheck, UserCheck, AlertCircle, Luggage, Search } from 'lucide-react';

export const FlightRadarCockpit: React.FC = () => {
  const [activeFlight, setActiveFlight] = useState<FlightStatus>(SAMPLE_FLIGHTS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [guestPagingName, setGuestPagingName] = useState<string>('MR. ALEXANDER WRIGHT');
  const [villaNote, setVillaNote] = useState<string>('AMANGALLA RESIDENCE GUEST');

  const handleSelectFlight = (flight: FlightStatus) => {
    setActiveFlight(flight);
    setSearchQuery(flight.flightNumber);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    const found = SAMPLE_FLIGHTS.find((f) => f.flightNumber === query);
    if (found) {
      setActiveFlight(found);
    } else if (query) {
      // Mock lookup for any entered flight number
      setActiveFlight({
        flightNumber: query,
        airline: 'International Carrier',
        origin: 'Direct Inbound',
        destination: 'Colombo (CMB)',
        scheduledTime: '17:15',
        estimatedTime: '17:10',
        terminal: 'Terminal 1',
        gate: 'Gate 03',
        status: 'ON-TIME',
        aircraft: 'Widebody Commercial',
      });
    }
  };

  return (
    <section id="flight-tracker" className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-widest text-[#C7A56A]">
          <span className="w-1.5 h-1.5 bg-[#E31B2E] rounded-full" />
          <span>Automated Operations Radar</span>
        </div>
        <h2
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          CMB Airport Arrival Concierge & Flight Radar
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#A5A5A5]">
          We track radar telemetry from wheels-up to touchdown. If your flight is delayed by headwinds, air traffic, or customs processing, your chauffeur adjusts automatically with zero penalty waiting fees.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Flight Lookup & Live Status (6 cols) */}
        <div className="lg:col-span-6 bg-[#0D0D0F] border border-white/[0.08] rounded-lg p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <h3 className="font-syne text-lg font-bold text-white flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#C1121F]" />
              <span>Bandaranaike International (CMB) Radar</span>
            </h3>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE TELEMETRY
            </span>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter flight number (e.g. EK652, QR668, UL504)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#17171C] border border-white/[0.1] rounded px-3 py-2.5 text-sm text-white uppercase placeholder:text-white/30 focus:outline-none focus:border-[#E31B2E] font-mono"
              />
              <Search className="w-4 h-4 text-[#A5A5A5] absolute right-3 top-3 pointer-events-none" />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 font-syne text-xs uppercase font-bold text-white bg-[#C1121F] rounded hover:bg-[#E31B2E] transition-colors"
            >
              Track
            </button>
          </form>

          {/* Quick Preset Flights */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-[#A5A5A5]">Recent Tracked Arrivals Today</span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_FLIGHTS.map((flight) => (
                <button
                  key={flight.flightNumber}
                  type="button"
                  onClick={() => handleSelectFlight(flight)}
                  className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                    activeFlight.flightNumber === flight.flightNumber
                      ? 'bg-white/[0.1] border-[#C7A56A] text-white font-bold'
                      : 'bg-[#17171C] border-white/[0.04] text-[#A5A5A5] hover:text-white'
                  }`}
                >
                  {flight.flightNumber} ({flight.origin.split(' ')[0]})
                </button>
              ))}
            </div>
          </div>

          {/* Active Flight Detail Card */}
          <div className="p-5 rounded bg-[#17171C] border border-white/[0.06] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#A5A5A5]">Carrier</span>
                <p className="font-syne text-base font-bold text-white">{activeFlight.airline}</p>
                <p className="text-xs font-mono text-[#C7A56A]">{activeFlight.flightNumber} · {activeFlight.aircraft}</p>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {activeFlight.status}
                </span>
                <p className="text-xs text-[#A5A5A5] font-mono mt-1">{activeFlight.terminal}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.04]">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#A5A5A5]">Origin</span>
                <p className="text-xs font-bold text-white mt-0.5">{activeFlight.origin}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#A5A5A5]">Destination</span>
                <p className="text-xs font-bold text-white mt-0.5">{activeFlight.destination}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#A5A5A5]">Scheduled Touchdown</span>
                <p className="text-sm font-mono font-bold text-white mt-0.5">{activeFlight.scheduledTime}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#A5A5A5]">Estimated Touchdown</span>
                <p className="text-sm font-mono font-bold text-emerald-400 mt-0.5">{activeFlight.estimatedTime}</p>
              </div>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded bg-black/40 border border-white/[0.04] flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#C7A56A] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-white">60 Min Buffer</p>
                <p className="text-[11px] text-[#A5A5A5]">No waiting fees if immigration or baggage is slow.</p>
              </div>
            </div>
            <div className="p-3 rounded bg-black/40 border border-white/[0.04] flex items-start gap-2.5">
              <UserCheck className="w-4 h-4 text-[#C7A56A] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-white">Terminal Meet & Greet</p>
                <p className="text-[11px] text-[#A5A5A5]">Chauffeur stations at Arrival Exit Gate with signboard.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Arrival Signboard Simulator & Dispatch Brief (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#0D0D0F] border border-white/[0.08] rounded-lg p-6 sm:p-8 space-y-5">
            <div>
              <span className="text-[11px] font-syne font-bold uppercase tracking-wider text-[#C7A56A]">
                Signboard Customizer
              </span>
              <h3 className="font-syne text-lg font-bold text-white mt-1">
                Your Chauffeur's Arrival Paging Board
              </h3>
              <p className="text-xs text-[#A5A5A5] mt-1">
                Preview how your chauffeur will hold your nameboard at the Bandaranaike International arrival hall.
              </p>
            </div>

            {/* Inputs to customize preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-mono uppercase text-[#A5A5A5]">Guest Name</label>
                <input
                  type="text"
                  value={guestPagingName}
                  onChange={(e) => setGuestPagingName(e.target.value)}
                  className="w-full mt-1 bg-[#17171C] border border-white/[0.1] rounded px-3 py-1.5 text-xs text-white uppercase font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono uppercase text-[#A5A5A5]">Affiliation / Villa Note</label>
                <input
                  type="text"
                  value={villaNote}
                  onChange={(e) => setVillaNote(e.target.value)}
                  className="w-full mt-1 bg-[#17171C] border border-white/[0.1] rounded px-3 py-1.5 text-xs text-white uppercase font-mono"
                />
              </div>
            </div>

            {/* The Physical Signboard Graphic */}
            <div className="relative mx-auto w-full max-w-md bg-[#050505] border-2 border-[#C7A56A]/50 rounded-sm p-8 text-center shadow-2xl overflow-hidden">
              {/* Subtle gold corner accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#C7A56A]" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#C7A56A]" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#C7A56A]" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#C7A56A]" />

              <div className="text-[10px] font-syne font-bold uppercase tracking-[0.25em] text-[#C7A56A] mb-3">
                GALLE PRESTIGE CHAUFFEUR
              </div>

              <div className="py-4 border-y border-white/[0.08]">
                <h4 className="font-syne text-xl sm:text-2xl font-extrabold text-white tracking-wide uppercase">
                  {guestPagingName || 'GUEST NAME'}
                </h4>
                {villaNote && (
                  <p className="text-[11px] font-mono text-[#C7A56A] tracking-wider mt-1 uppercase">
                    {villaNote}
                  </p>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-white/50 px-2">
                <span>FLIGHT: {activeFlight.flightNumber}</span>
                <span>DEST: GALLE FORT</span>
              </div>
            </div>

            {/* Chauffeur Dispatch Assignment Preview */}
            <div className="p-4 rounded bg-[#17171C] border border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#050505] border border-white/[0.1] flex items-center justify-center font-syne font-bold text-white text-sm">
                  NP
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Nimal Perera</p>
                  <p className="text-[11px] text-[#A5A5A5]">SLTDA Licensed Chauffeur Guide #CT-8492</p>
                  <p className="text-[10px] font-mono text-[#C7A56A]">Mercedes-Benz S-Class · WP-CAB-4920</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 bg-white/[0.06] text-white rounded border border-white/[0.1]">
                ASSIGNED
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
