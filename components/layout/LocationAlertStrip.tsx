'use client';

import React from 'react';
import { useLocation } from '@/context/LocationContext';
import { SITE_CONFIG } from '@/constants/data';

export default function LocationAlertStrip() {
  const { currentLocation, setMarket } = useLocation();

  const handleScrollToSelector = () => {
    const el = document.getElementById('location-selector-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-surface-container-high py-2.5 px-margin md:px-margin-md lg:px-margin-lg border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-space-sm font-label-md text-label-md text-on-surface-variant">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          <span className="text-on-surface font-medium">
            Currently viewing: <strong className="text-primary-container font-bold">{currentLocation.displayName}, {currentLocation.state}</strong>
          </span>
          <button
            onClick={handleScrollToSelector}
            type="button"
            className="text-on-tertiary-fixed-variant hover:text-tertiary-container font-semibold underline underline-offset-2 ml-1 cursor-pointer transition-colors"
          >
            Switch Market (Houston, Austin, San Antonio)
          </button>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1 text-primary-container font-semibold">
            <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">check_circle</span>
            {SITE_CONFIG.license}
          </span>
          <span className="text-outline-variant">•</span>
          <span className="flex items-center gap-1 text-secondary font-medium">
            <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">bolt</span>
            {currentLocation.localAlert || 'Same-Day Drone Response Active'}
          </span>
        </div>
      </div>
    </div>
  );
}
