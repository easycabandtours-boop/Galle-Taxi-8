import React from 'react';
import { MessageSquare, PhoneCall, ArrowUpRight } from 'lucide-react';

interface FloatingConciergeBarProps {
  onOpenBooking: () => void;
}

export const FloatingConciergeBar: React.FC<FloatingConciergeBarProps> = ({
  onOpenBooking,
}) => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Galle Taxi. I would like to check availability for an airport / southern coast executive transfer.'
    );
    window.open(`https://wa.me/94722885885?text=${text}`, '_blank');
  };

  return (
    <aside aria-label="VIP Concierge Quick Actions" className="fixed bottom-0 left-0 right-0 z-30 p-2 sm:p-3 pointer-events-none">
      <div className="max-w-3xl mx-auto bg-[#0D0D0F]/95 backdrop-blur-xl border border-white/[0.12] rounded-lg p-2.5 sm:p-3 shadow-[0_12px_32px_-8px_rgba(193,18,31,0.25)] flex items-center justify-between pointer-events-auto gap-3">
        {/* Left: Dispatch Beacon */}
        <div className="flex items-center gap-2.5 pl-1 sm:pl-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31B2E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31B2E]"></span>
          </span>
          <div className="text-left">
            <p className="text-[11px] font-syne font-bold uppercase tracking-wider text-white truncate">
              Chauffeur Dispatch Active
            </p>
            <p className="text-[10px] text-[#A5A5A5] font-mono hidden sm:block">
              Average Concierge Response &lt; 2 mins
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="py-1.5 px-3 text-xs font-semibold text-emerald-400 bg-[#0D0D0F] border border-emerald-500/40 rounded hover:border-emerald-400 hover:bg-emerald-500/10 transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp Concierge</span>
          </button>

          <a
            href="https://airporttaxis.lk/ride"
            target="_blank"
            rel="noopener noreferrer"
            className="py-1.5 px-3.5 font-syne font-bold uppercase text-xs tracking-wider text-white bg-[#C1121F] rounded hover:bg-[#E31B2E] transition-all flex items-center gap-1 shadow-[0_2px_12px_rgba(227,27,46,0.35)] whitespace-nowrap"
            title="Book ride on airporttaxis.lk/ride"
          >
            <span>Book Ride</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </aside>
  );
};
