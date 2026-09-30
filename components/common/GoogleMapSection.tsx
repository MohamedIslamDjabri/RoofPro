'use client';

import React from 'react';
import { LOCATIONS } from '@/constants/data';
import { LocationInfo } from '@/types';

interface GoogleMapSectionProps {
  location?: LocationInfo;
  headline?: string;
  subheadline?: string;
}

export default function GoogleMapSection({ location, headline, subheadline }: GoogleMapSectionProps) {
  const isMulti = !location;

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/50 shadow-md">
      {/* Map Header Bar */}
      <div className="p-4 md:p-6 bg-surface-container flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/40">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[16px]">map</span>
            <span>{isMulti ? 'Statewide Network Dispatch Map' : `${location.city} Hub Regional Territory`}</span>
          </div>
          <h3 className="font-headline-sm text-title-md md:text-headline-sm text-primary-container font-bold">
            {headline || (isMulti ? 'RoofPro Physical Hubs & Rapid Response Zones' : `${location.displayName} Facility & Service Coverage`)}
          </h3>
          <p className="text-xs md:text-sm text-on-surface-variant mt-0.5">
            {subheadline || (isMulti ? '4 fully staffed facilities with proprietary shingle storage yards and drone dispatch teams.' : `Covering ${location.localSuburbsText}`)}
          </p>
        </div>

        {location ? (
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-xs font-bold hover:bg-primary transition-all flex items-center gap-1.5 shadow"
          >
            <span>Open in Google Maps</span>
            <span className="material-symbols-outlined text-[15px]">open_in_new</span>
          </a>
        ) : (
          <div className="flex items-center gap-2 text-xs font-bold text-primary-container">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
            <span>All 4 Texas Hubs Operational</span>
          </div>
        )}
      </div>

      {/* Styled Interactive/Polished Map Visual Canvas */}
      <div className="relative w-full h-[360px] md:h-[420px] bg-[#dbe8dc] flex items-center justify-center overflow-hidden">
        {/* SVG Topographical & Road Network Visual Backdrop */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          <path d="M 50,50 Q 200,100 400,80 T 800,150 T 1000,120" fill="none" stroke="#376851" strokeWidth="4" />
          <path d="M 0,250 C 300,200 450,380 700,320 T 1000,400" fill="none" stroke="#717974" strokeWidth="3" />
          <path d="M 200,0 L 250,600" fill="none" stroke="#c1c8c3" strokeWidth="2" strokeDasharray="8,6" />
          <path d="M 500,0 L 520,600" fill="none" stroke="#376851" strokeWidth="5" />
          <path d="M 750,0 L 730,600" fill="none" stroke="#c1c8c3" strokeWidth="2" />
          <path d="M 0,450 Q 300,500 600,460 T 1000,520" fill="none" stroke="#717974" strokeWidth="3" />
          {/* County grid rings */}
          <circle cx="500" cy="180" r="120" fill="#376851" fillOpacity="0.05" stroke="#376851" strokeWidth="1.5" strokeDasharray="6,4" />
          <circle cx="720" cy="380" r="140" fill="#376851" fillOpacity="0.05" stroke="#376851" strokeWidth="1.5" strokeDasharray="6,4" />
          <circle cx="420" cy="360" r="90" fill="#376851" fillOpacity="0.05" stroke="#376851" strokeWidth="1.5" strokeDasharray="6,4" />
          <circle cx="360" cy="480" r="110" fill="#376851" fillOpacity="0.05" stroke="#376851" strokeWidth="1.5" strokeDasharray="6,4" />
        </svg>

        {/* State/Hub Marker Overlays */}
        {isMulti ? (
          <div className="relative z-10 w-full max-w-4xl h-full p-4 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
              {Object.values(LOCATIONS).map((loc) => (
                <div
                  key={loc.slug}
                  className="bg-surface-container-lowest/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-outline-variant/60 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded-full bg-primary-container text-tertiary-fixed-dim flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                    </div>
                    <div>
                      <div className="font-title-md text-xs font-bold text-primary-container">{loc.displayName}</div>
                      <div className="text-[10px] text-on-surface-variant font-semibold">{loc.regionalTag}</div>
                    </div>
                  </div>
                  <div className="text-[11px] text-on-surface-variant space-y-0.5 mt-1 border-t border-surface-container pt-1.5">
                    <p className="line-clamp-1">{loc.address}</p>
                    <p className="font-bold text-primary-container">{loc.phone}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="self-center bg-primary-container text-on-primary px-4 py-2 rounded-full font-label-caps text-xs font-bold shadow-xl flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-ping"></span>
              <span>4 Statewide Distribution Warehouses • 100% Texas Owned &amp; Operated</span>
            </div>
          </div>
        ) : (
          <div className="relative z-10 text-center max-w-md p-6 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-md shadow-2xl border border-outline-variant/70">
            <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container mx-auto flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[28px] text-secondary">domain</span>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-secondary/15 text-secondary font-label-caps text-[11px] font-bold uppercase">
              {location.regionalTag}
            </span>
            <h4 className="font-headline-sm text-title-md font-bold text-primary-container mt-1">
              {location.displayName} Regional Facility
            </h4>
            <p className="text-xs text-on-surface font-semibold mt-1">
              {location.address}
            </p>
            <p className="text-xs text-on-surface-variant mt-2">
              Hours: {location.hours}
            </p>
            <div className="mt-4 pt-3 border-t border-surface-container flex items-center justify-center gap-4 text-xs font-bold">
              <a
                href={`tel:${location.phone.replace(/[^0-9]/g, '')}`}
                className="text-secondary hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[15px]">call</span>
                <span>{location.phone}</span>
              </a>
              <span className="text-outline">•</span>
              <a
                href={`mailto:${location.email}`}
                className="text-primary-container hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[15px]">mail</span>
                <span>{location.email}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
