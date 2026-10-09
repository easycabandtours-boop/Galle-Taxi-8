import React, { useState } from 'react';
import { Currency } from '../types';
import { PhoneCall, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Routes', href: '#routes' },
    { label: 'Flight Concierge', href: '#flight-tracker' },
    { label: 'Protocol', href: '#protocol' },
  ];

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      'Hello Galle Taxi. I would like to inquire about booking an airport / southern coast executive transfer.'
    );
    window.open(`https://wa.me/94722885885?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="font-syne text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase hover:text-white/90 transition-colors flex items-center"
        >
          <span style={{ fontSize: '21px', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontStyle: 'normal' }}>
            GALLE TAXI
          </span>
        </a>

        {/* Zone 2: 4-6 Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#A5A5A5]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors duration-150 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Actions (Reserve Chauffeur / Book Ride) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Primary Action Button (Direct Booking Link) */}
          <a
            href="https://airporttaxis.lk/ride"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs sm:text-sm font-syne font-bold tracking-wide uppercase text-white bg-[#C1121F] rounded hover:bg-[#E31B2E] hover:shadow-[0_4px_20px_rgba(227,27,46,0.45)] transition-all duration-150 whitespace-nowrap flex items-center gap-1"
            title="Book ride on airporttaxis.lk/ride"
          >
            <span>Book Ride</span>
            <span className="text-[11px] font-mono opacity-80">↗</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#A5A5A5] hover:text-white border border-white/[0.08] rounded bg-[#0D0D0F]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0D0F] border-b border-white/[0.1] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#e3e2e2] hover:text-[#C7A56A] py-1 border-b border-white/[0.04]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppDirect();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-[#C7A56A] border border-[#C7A56A]/40 rounded bg-black/40 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#C7A56A]" />
              <span>Connect with VIP Concierge on WhatsApp</span>
            </button>

            <a
              href="https://airporttaxis.lk/ride"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 font-syne font-bold uppercase text-xs tracking-wider text-white bg-[#C1121F] rounded flex items-center justify-center gap-1.5"
            >
              <span>Book Online (airporttaxis.lk/ride)</span>
              <span className="text-[11px] font-mono">↗</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
