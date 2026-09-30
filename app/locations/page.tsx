'use client';

import React from 'react';
import Link from 'next/link';
import { useLocation } from '@/context/LocationContext';
import { LOCATIONS } from '@/constants/data';
import GoogleMapSection from '@/components/common/GoogleMapSection';
import LocationSelector from '@/components/locations/LocationSelector';
import QuoteForm from '@/components/forms/QuoteForm';

export default function LocationsPage() {
  const { currentLocation, setMarket } = useLocation();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-surface-container-low to-surface py-16 lg:py-24 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-xs font-bold">
              <span className="material-symbols-outlined text-[16px]">domain</span>
              Statewide Texas Roofing Presence
            </div>
            <h1 className="font-display-xl text-headline-lg lg:text-display-xl text-primary font-extrabold tracking-tight">
              RoofPro Regional Hubs &amp; Service Areas
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              We operate dedicated brick-and-mortar facilities in Dallas, Houston, Austin, and San Antonio. Every location features local master certified installers, fully stocked shingle storage depots, and 24/7 storm emergency units.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Location Selector */}
      <LocationSelector />

      {/* Statewide Interactive Map */}
      <section className="py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <GoogleMapSection />
        </div>
      </section>

      {/* 4 Regional Hub Cards Grid */}
      <section className="py-16 lg:py-24 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">Physical Branches</span>
            <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-primary-container font-extrabold mt-1">
              Select Your Local Texas Office
            </h2>
            <p className="font-body-md text-on-surface-variant text-sm mt-2">
              Click any regional hub to explore localized services, nearby served communities, project galleries, and verified homeowner reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(LOCATIONS).map((loc) => {
              const isSelected = currentLocation.slug === loc.slug;
              return (
                <div
                  key={loc.slug}
                  className={`p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all border-t-4 flex flex-col justify-between ${
                    isSelected ? 'border-secondary ring-2 ring-secondary/20' : 'border-primary-container'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-title-md text-headline-sm font-bold text-primary-container">
                        {loc.displayName}
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                    </div>

                    <span className="px-2.5 py-0.5 rounded bg-surface-container font-label-caps text-[10px] font-bold text-secondary uppercase block">
                      {loc.regionalTag}
                    </span>

                    <div className="space-y-2 text-xs text-on-surface-variant font-body-sm pt-2">
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">location_on</span>
                        <span>{loc.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">call</span>
                        <a
                          href={`tel:${loc.phone.replace(/[^0-9]/g, '')}`}
                          className="font-bold text-on-surface hover:text-secondary"
                        >
                          {loc.phone}
                        </a>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">schedule</span>
                        <span>{loc.hours}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-surface-container">
                      <div className="text-[11px] font-bold text-primary-container uppercase mb-1">Nearby Communities:</div>
                      <p className="text-xs text-on-surface-variant line-clamp-2">
                        {loc.nearbyAreas.join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-surface-container space-y-2">
                    <button
                      type="button"
                      onClick={() => setMarket(loc.slug)}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-secondary text-on-secondary'
                          : 'bg-surface-container text-primary-container hover:bg-surface-container-high'
                      }`}
                    >
                      {isSelected ? 'Currently Selected Hub' : `Set Market to ${loc.city}`}
                    </button>
                    <Link
                      href={`/locations/${loc.slug}`}
                      className="w-full py-2.5 px-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>View {loc.city} Local Page</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-margin md:px-margin-md">
          <QuoteForm />
        </div>
      </section>
    </div>
  );
}
