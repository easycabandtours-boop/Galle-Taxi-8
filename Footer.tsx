import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/[0.08] pt-16 pb-24 text-xs text-[#A5A5A5]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="font-syne text-lg font-extrabold tracking-tight text-white uppercase flex items-center gap-2">
              <span>GALLE TAXI</span>
              <span className="text-xs font-mono text-[#C7A56A] font-normal tracking-widest pl-1">PRESTIGE CHAUFFEUR</span>
            </div>
            <p className="text-xs leading-relaxed text-[#A5A5A5]">
              Executive airport transfers and bespoke private chauffeur touring across Sri Lanka.
              Direct non-stop Southern Expressway connections between Bandaranaike International Airport (CMB) and historic Galle Fort.
            </p>
          </div>

          {/* Col 2: Hub Locations */}
          <div className="space-y-3">
            <h4 className="font-syne text-xs font-bold uppercase tracking-wider text-white">
              Primary Transit Corridors
            </h4>
            <ul className="space-y-2">
              <li>Colombo Airport (CMB) ⇄ Galle Fort</li>
              <li>Galle Fort ⇄ Weligama Bay & Mirissa</li>
              <li>Southern Coast ⇄ Yala National Park</li>
              <li>Galle Fort ⇄ Ella & Central Highlands</li>
              <li>Colombo CBD ⇄ Bentota & Tangalle</li>
            </ul>
          </div>

          {/* Col 3: Fleet & Inclusions */}
          <div className="space-y-3">
            <h4 className="font-syne text-xs font-bold uppercase tracking-wider text-white">
              Executive Fleet Standards
            </h4>
            <ul className="space-y-2">
              <li>Sedan Cars & Luxury Crossover SUVs</li>
              <li>KDH Flat Roof & High Roof Passenger Vans</li>
              <li>Toyota Premio & Allion Executive Saloons</li>
              <li>Southern Expressway E01 Tolls Included</li>
            </ul>
          </div>

          {/* Col 4: Contact & Operations */}
          <div className="space-y-3">
            <h4 className="font-syne text-xs font-bold uppercase tracking-wider text-white">
              24/7 Operations Desk
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C7A56A] shrink-0 mt-0.5" />
                <span>Rampart St, Galle Fort & CMB Terminal 1 Lounge Desk</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C7A56A] shrink-0" />
                <a href="mailto:hello@galletaxi.lk" className="hover:text-white transition-colors">
                  hello@galletaxi.lk
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C7A56A] shrink-0" />
                <a
                  href="https://wa.me/94722885885"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-white hover:text-[#C7A56A] transition-colors"
                >
                  +94 72 288 5885
                </a>
              </div>
              <div className="pt-1">
                <a
                  href="https://airporttaxis.lk/ride"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#C7A56A] hover:text-white font-medium transition-colors"
                >
                  <span>Book Online at airporttaxis.lk/ride</span>
                  <span className="font-mono text-[10px]">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © 2026 Airport Taxis ( Pvt ) Ltd .All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[#A5A5A5]">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Chauffeur Transit</span>
            <span>·</span>
            <span>Google Translate Enabled</span>
            <span>·</span>
            <span>Flight Guarantee Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
