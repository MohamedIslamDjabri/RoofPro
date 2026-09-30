'use client';

import React, { useState } from 'react';
import { useAIModal } from '@/context/AIModalContext';
import { useLocation } from '@/context/LocationContext';

export default function AIConciergeWidget() {
  const { openChat, openVoiceCall } = useAIModal();
  const { currentLocation } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
      {/* Floating Menu Popover */}
      {isMenuOpen && (
        <div className="mb-3 w-76 max-w-[calc(100vw-2rem)] bg-surface-container-lowest rounded-2xl p-4 shadow-2xl border border-outline-variant/60 animate-fadeIn space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-surface-container">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-title-md text-xs font-bold text-primary-container">
                RoofPro AI Concierge
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary transition-colors text-xs p-1 cursor-pointer"
              aria-label="Close concierge menu"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
            Need to book an inspection or ask about Texas roofing? Choose an option:
          </p>

          <div className="space-y-2">
            {/* Voice Call Option */}
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                openVoiceCall();
              }}
              className="w-full p-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary transition-all flex items-center gap-3 text-left shadow-sm group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-surface-container-lowest/15 flex items-center justify-center text-tertiary-fixed-dim group-hover:scale-110 transition-transform shrink-0">
                <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-label-lg text-xs font-bold flex items-center justify-between">
                  <span>AI Voice Call</span>
                  <span className="text-[10px] text-tertiary-fixed-dim uppercase tracking-wider font-bold">Live</span>
                </div>
                <div className="text-[10px] text-primary-fixed-dim truncate">
                  Interactive voice phone call
                </div>
              </div>
            </button>

            {/* Chat Option */}
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                openChat();
              }}
              className="w-full p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary-container transition-all flex items-center gap-3 text-left shadow-sm group cursor-pointer border border-outline-variant/40"
            >
              <div className="w-9 h-9 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary group-hover:scale-110 transition-transform shrink-0">
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-label-lg text-xs font-bold">
                  AI Chat Booking
                </div>
                <div className="text-[10px] text-on-surface-variant truncate">
                  Schedule inspection via chat
                </div>
              </div>
            </button>
          </div>

          <div className="pt-1 text-[10px] text-center text-on-surface-variant">
            Serving {currentLocation.displayName} Hub • 24/7 Response
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="group flex items-center gap-2.5 p-2 sm:px-4 sm:py-3 rounded-full bg-primary-container hover:bg-primary text-on-primary shadow-xl hover:shadow-2xl transition-all border border-primary-fixed-variant/40 cursor-pointer active:scale-95"
        aria-label="Open RoofPro AI Booking Assistant"
      >
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[20px] text-secondary">
              {isMenuOpen ? 'close' : 'smart_toy'}
            </span>
          </div>
          <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim border-2 border-primary-container animate-pulse"></span>
        </div>

        <div className="hidden sm:flex flex-col text-left pr-1">
          <span className="font-title-md text-xs font-bold leading-tight flex items-center gap-1">
            <span>AI Voice &amp; Chat</span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          </span>
          <span className="font-body-sm text-[10px] text-primary-fixed-dim">
            Book Inspection
          </span>
        </div>
      </button>
    </div>
  );
}
