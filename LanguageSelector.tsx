import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface Language {
  code: string;
  country: string;
  label: string;
  native: string;
}

const LANGUAGES: Language[] = [
  { code: 'en', country: 'gb', label: 'English', native: 'English' },
  { code: 'de', country: 'de', label: 'German', native: 'Deutsch' },
  { code: 'fr', country: 'fr', label: 'French', native: 'Français' },
  { code: 'ru', country: 'ru', label: 'Russian', native: 'Русский' },
  { code: 'it', country: 'it', label: 'Italian', native: 'Italiano' },
  { code: 'es', country: 'es', label: 'Spanish', native: 'Español' },
  { code: 'zh-CN', country: 'cn', label: 'Chinese', native: '中文 (简体)' },
  { code: 'ja', country: 'jp', label: 'Japanese', native: '日本語' },
  { code: 'ar', country: 'ae', label: 'Arabic', native: 'العربية' },
  { code: 'nl', country: 'nl', label: 'Dutch', native: 'Nederlands' },
  { code: 'si', country: 'lk', label: 'Sinhala', native: 'සිංහල' },
];

export const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<string>('en');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Detect current language from cookie on mount
  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    if (match && match[1]) {
      setCurrentLang(match[1]);
    }
  }, []);

  const handleSelectLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    // Set Google Translate cookie
    const hostname = window.location.hostname;
    if (langCode === 'en') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;
    } else {
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=${hostname};`;
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${hostname};`;
    }

    // Trigger change on Google Translate combo element
    const googleSelect = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (googleSelect) {
      googleSelect.value = langCode;
      googleSelect.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      window.location.reload();
    }
  };

  const selectedLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Luxury Language Trigger Button with Flag Image */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-medium text-[#A5A5A5] bg-[#0D0D0F] border border-white/[0.1] rounded hover:text-white hover:border-white/25 transition-colors shadow-sm"
        aria-label="Select Google Translate language"
        title={`Current Language: ${selectedLangObj.label} (Google Translate)`}
      >
        <Globe className="w-3.5 h-3.5 text-[#C7A56A]" />
        <img
          src={`https://flagcdn.com/w40/${selectedLangObj.country}.png`}
          alt={selectedLangObj.label}
          className="w-4 h-3 object-cover rounded-[2px] border border-white/20 shadow-xs shrink-0"
          loading="lazy"
        />
        <span className="uppercase font-semibold text-white">{selectedLangObj.code.split('-')[0]}</span>
        <ChevronDown className="w-3 h-3 text-[#A5A5A5]" />
      </button>

      {/* Language Selection Menu Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[#0D0D0F] border border-white/[0.15] rounded shadow-2xl py-1.5 z-50 max-h-80 overflow-y-auto">
          {/* Header */}
          <div className="px-3 py-1.5 border-b border-white/[0.06] mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#C7A56A] block">
              Google Translate · Select Language
            </span>
          </div>

          {/* Quick Flag Strip */}
          <div className="px-3 pb-2 pt-0.5 border-b border-white/[0.06] mb-1 flex items-center justify-between gap-1">
            {LANGUAGES.slice(0, 7).map((qLang) => (
              <button
                key={qLang.code}
                type="button"
                onClick={() => handleSelectLanguage(qLang.code)}
                title={`${qLang.label} (${qLang.native})`}
                className={`p-1 rounded hover:bg-white/10 transition-all ${
                  currentLang === qLang.code ? 'ring-1 ring-[#C7A56A] bg-white/[0.06]' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={`https://flagcdn.com/w40/${qLang.country}.png`}
                  alt={qLang.label}
                  className="w-4 h-3 object-cover rounded-[2px] border border-white/20"
                />
              </button>
            ))}
          </div>

          {/* Full Language List with Flags */}
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelectLanguage(lang.code)}
              className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                currentLang === lang.code
                  ? 'text-[#C7A56A] bg-white/[0.06] font-bold'
                  : 'text-[#A5A5A5] hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={`https://flagcdn.com/w40/${lang.country}.png`}
                  alt={lang.label}
                  className="w-4 h-3 object-cover rounded-[2px] border border-white/20 shrink-0"
                  loading="lazy"
                />
                <span className="text-white font-medium">{lang.native}</span>
                <span className="text-[10px] text-white/40">({lang.label})</span>
              </div>
              {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-[#C7A56A] shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
