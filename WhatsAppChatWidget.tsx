import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Check, Clock } from 'lucide-react';

export const WhatsAppChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasShownBubble, setHasShownBubble] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  // Preset quick message prompts
  const quickPrompts = [
    'Hi! I need an airport transfer from CMB Airport to Galle Fort.',
    'I want to check rates for a full-day chauffeur tour to Weligama & Mirissa.',
    'I need an immediate taxi with live GPS pickup location.',
  ];

  // Auto trigger small greeting bubble after 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasShownBubble(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleSendWhatsApp = (textToSend?: string) => {
    const finalMsg = textToSend || message.trim() || 'Hello Galle Taxi! I would like to inquire about booking a ride.';
    const encoded = encodeURIComponent(finalMsg);
    window.open(`https://wa.me/94722885885?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 right-4 sm:right-6 z-40 flex flex-col items-end pointer-events-none">
      {/* Pop-up Greeting Bubble (Appears automatically before click) */}
      {!isOpen && hasShownBubble && (
        <div className="pointer-events-auto mb-3 max-w-xs animate-bounce-subtle bg-[#0D0D0F]/95 backdrop-blur-md border border-[#25D366]/40 p-3.5 rounded-2xl rounded-br-sm shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative group">
          <button
            onClick={() => setHasShownBubble(false)}
            className="absolute -top-2 -left-2 w-5 h-5 bg-[#17171C] border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white text-xs"
            title="Dismiss"
          >
            ✕
          </button>
          <div className="flex items-start gap-2.5">
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white font-bold text-xs shadow-md">
                GT
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0D0D0F]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Galle Taxi Concierge</p>
              <p className="text-[11px] text-[#A5A5A5] mt-0.5 leading-snug">
                Planning a trip? Tap to chat live on WhatsApp with our 24/7 dispatch desk.
              </p>
              <button
                onClick={() => setIsOpen(true)}
                className="mt-2 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
              >
                <span>Chat Now</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-Up Chat Card Window */}
      {isOpen && (
        <div className="pointer-events-auto mb-3 w-[92vw] sm:w-[350px] bg-[#0D0D0F] border border-[#25D366]/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden animate-scale-in transition-all">
          {/* Card Header with WhatsApp Green Accent */}
          <div className="bg-gradient-to-r from-emerald-950 via-[#0D0D0F] to-emerald-950 p-4 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-600/30 border border-emerald-400/50 flex items-center justify-center text-emerald-400 font-bold text-sm">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-[#0D0D0F]" />
              </div>

              <div>
                <h4 className="font-syne text-sm font-bold text-white">Galle Taxi Dispatch</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online · +94 72 288 5885</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/50 hover:text-white rounded-full bg-white/[0.04] transition-colors"
              title="Close chat preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body & Quick Prompts */}
          <div className="p-4 space-y-3 bg-[#0D0D0F]">
            <div className="bg-[#17171C] border border-white/[0.06] rounded-xl p-3 text-xs text-[#A5A5A5] leading-relaxed">
              <p className="text-white font-medium mb-1 flex items-center gap-1.5">
                <span>👋 Welcome to Galle Taxi</span>
              </p>
              <span>
                Need airport pickup, instant quotation, or private tour? Select an inquiry below or type your message.
              </span>
            </div>

            {/* Quick Prompts List */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-[#A5A5A5]">Tap a prompt to send:</span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendWhatsApp(prompt)}
                  className="w-full text-left p-2.5 rounded-lg bg-[#17171C] hover:bg-[#25D366]/10 border border-white/[0.06] hover:border-[#25D366]/50 transition-all text-xs text-white/90 hover:text-white flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{prompt}</span>
                  <Send className="w-3 h-3 text-emerald-400 shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendWhatsApp();
                  }}
                  className="flex-1 bg-[#17171C] border border-white/[0.1] rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#25D366] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => handleSendWhatsApp()}
                  className="px-3.5 py-2 bg-[#25D366] hover:bg-[#20ba59] text-black font-bold rounded-lg transition-colors flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20"
                  title="Send via WhatsApp"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-center pt-1">
              <span className="text-[10px] font-mono text-white/40">
                Direct WhatsApp Hotline: +94 72 288 5885
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Animated Luxury WhatsApp Capsule / Orb Button */}
      <div className="relative pointer-events-auto group">
        {/* Pulsing Beacon Ring Animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 blur-md animate-ping pointer-events-none" />

        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setHasShownBubble(false);
          }}
          className={`relative flex items-center gap-3 p-2 sm:px-4 sm:py-2.5 rounded-full text-white transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.8),0_0_24px_rgba(37,211,102,0.35)] border ${
            isOpen
              ? 'bg-[#17171C] border-white/20 text-white'
              : 'bg-[#0D0D0F]/95 backdrop-blur-xl border-[#25D366]/50 hover:border-[#25D366] hover:shadow-[0_16px_40px_rgba(37,211,102,0.45)] hover:scale-[1.03]'
          }`}
          aria-label="Open WhatsApp Chat"
          title="Chat with us on WhatsApp"
        >
          {/* Circular Glowing WhatsApp Emblem */}
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
            {isOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-white drop-shadow" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            )}
            {/* Live Green Online Beacon */}
            {!isOpen && (
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0D0D0F]" />
            )}
          </div>

          {/* Typography label (Visible on sm+ screens) */}
          <div className="hidden sm:block text-left pr-2">
            <p className="text-xs font-syne font-bold text-white tracking-wide">
              {isOpen ? 'Close Chat' : 'WhatsApp Concierge'}
            </p>
            <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>Online · Response &lt; 1 min</span>
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
