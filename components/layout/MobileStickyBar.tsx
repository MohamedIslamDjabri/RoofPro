'use client';

import React from 'react';
import Link from 'next/link';
import { useLocation } from '@/context/LocationContext';

export default function MobileStickyBar() {
  const { currentLocation } = useLocation();

  return (
    <aside
      aria-label="Mobile contact actions"
      className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md border-t border-outline-variant/50 p-2.5 sm:hidden shadow-[0_-4px_16px_rgba(18,55,42,0.1)]"
    >
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`tel:${currentLocation.phone.replace(/[^0-9]/g, '')}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-surface-container text-primary-container font-label-md font-bold text-xs shadow-sm active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[16px] text-secondary">call</span>
          <span>Call {currentLocation.city}</span>
        </a>
        <Link
          href="/contact?type=estimate"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-tertiary-fixed-dim text-on-tertiary-fixed font-label-md font-bold text-xs shadow active:scale-95 transition-transform"
        >
          <span>Free Estimate</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
      </div>
    </aside>
  );
}
