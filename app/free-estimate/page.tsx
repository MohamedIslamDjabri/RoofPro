'use client';

import React from 'react';
import Link from 'next/link';
import QuoteForm from '@/components/forms/QuoteForm';
import { useLocation } from '@/context/LocationContext';
import { VALUE_PROPS } from '@/constants/data';

export default function FreeEstimatePage() {
  const { currentLocation } = useLocation();

  return (
    <div className="flex flex-col w-full py-16 lg:py-24 bg-surface">
      <div className="max-w-4xl mx-auto px-margin md:px-margin-md space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-xs font-bold">
            <span className="material-symbols-outlined text-[16px]">assignment</span>
            Zero Obligation • 100% Free Drone &amp; Attic Assessment
          </div>
          <h1 className="font-display-xl text-headline-lg lg:text-display-xl text-primary font-extrabold tracking-tight">
            Schedule Your Free {currentLocation.city} Roof Estimate
          </h1>
          <p className="font-body-lg text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Get an honest, photographic roof assessment from our local master certified team. We inspect shingles, flashing, attic rafters, and ventilation with upfront itemized pricing.
          </p>
        </div>

        <QuoteForm />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
          {VALUE_PROPS.map((vp) => (
            <div key={vp.title} className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 text-center space-y-1">
              <span className="material-symbols-outlined text-secondary text-[24px]">{vp.icon}</span>
              <div className="font-label-lg text-primary font-bold text-xs">{vp.title}</div>
              <div className="text-[11px] text-on-surface-variant">{vp.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
