'use client';

import React from 'react';
import Link from 'next/link';
import { useLocation } from '@/context/LocationContext';
import { LOCATIONS } from '@/constants/data';
import { LocationSlug } from '@/types';

export default function LocationSelector() {
  const { selectedSlug, setMarket, currentLocation } = useLocation();

  const markets: { slug: LocationSlug; name: string }[] = [
    { slug: 'dallas', name: 'Dallas-Fort Worth' },
    { slug: 'houston', name: 'Greater Houston' },
    { slug: 'austin', name: 'Austin & Hill Country' },
    { slug: 'san-antonio', name: 'San Antonio Metro' },
  ];

  return (
    <section className="w-full bg-surface-container-low py-12 lg:py-16" id="location-selector-section">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
        <div className="p-6 md:p-8 lg:p-10 rounded-2xl bg-surface-container-lowest shadow-md border border-outline-variant/30">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6">
            <div>
              <div className="flex items-center gap-2 text-secondary font-label-caps uppercase tracking-wider font-bold mb-1">
                <span className="material-symbols-outlined text-[16px]">pin_drop</span>
                Localized Service Engine
              </div>
              <h2 className="font-headline-md text-headline-sm lg:text-headline-md text-primary-container font-bold">
                Where Do You Need Roofing Help?
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
              RoofPro maintains dedicated brick-and-mortar facilities in all four major Texas metros with localized inventory and direct emergency response.
            </p>
          </div>

          {/* Segmented Location Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 rounded-xl bg-surface-container-high mb-6">
            {markets.map((m) => {
              const isActive = selectedSlug === m.slug;
              return (
                <button
                  key={m.slug}
                  onClick={() => setMarket(m.slug)}
                  type="button"
                  className={`px-4 py-3 rounded-lg font-label-lg text-label-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                      : 'text-on-surface-variant font-semibold hover:text-on-surface hover:bg-surface-container-lowest'
                  }`}
                >
                  {isActive && <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim shrink-0"></span>}
                  <span>{m.name}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Summary Card */}
          <div className="p-6 rounded-xl bg-surface-container transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-caps text-label-caps font-bold">
                    {currentLocation.regionalTag}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-on-surface-variant font-medium">
                    <span className="material-symbols-outlined text-[16px] text-secondary">schedule</span>
                    Same-Day Drone Inspection Slots Available
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary-container font-bold">
                  {currentLocation.headline}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {currentLocation.localSuburbsText}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-primary-container pt-1">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-tertiary-fixed-dim">verified</span>
                    Local Permitting Team
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-tertiary-fixed-dim">warehouse</span>
                    18,000 sq ft Shingle Supply Depot
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-tertiary-fixed-dim">engineering</span>
                    {currentLocation.stats.activeCrews} Active Field Crews
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col justify-end gap-3">
                <div className="p-3.5 rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-[24px]">call</span>
                    <div>
                      <div className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                        {currentLocation.city} Direct Line
                      </div>
                      <div className="font-title-md text-title-md font-bold text-primary-container">
                        {currentLocation.phone}
                      </div>
                    </div>
                  </div>
                  <a
                    href={`tel:${currentLocation.phone.replace(/[^0-9]/g, '')}`}
                    className="px-3 py-1.5 rounded bg-surface-container hover:bg-surface-container-high text-xs font-bold text-primary-container transition-colors"
                  >
                    Call Hub
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    href={`/locations/${currentLocation.slug}`}
                    className="flex-1 bg-surface-container-lowest hover:bg-surface-container text-primary-container border border-outline-variant/60 font-label-lg text-label-lg font-bold py-3.5 px-4 rounded-lg text-center transition-all flex items-center justify-center gap-2"
                  >
                    <span>View {currentLocation.city} Hub</span>
                    <span className="material-symbols-outlined text-[18px]">domain</span>
                  </Link>

                  <Link
                    href={`/services?market=${currentLocation.slug}`}
                    className="flex-1 bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg font-bold py-3.5 px-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Services &amp; Pricing</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
