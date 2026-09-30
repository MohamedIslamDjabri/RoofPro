'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocation } from '@/context/LocationContext';
import QuoteForm from '@/components/forms/QuoteForm';

export default function RoofRepairPage() {
  const { currentLocation } = useLocation();

  const commonIssues = [
    {
      title: 'Active Water Leaks & Ceiling Drips',
      desc: 'Small pinhole attic penetrations quickly ruin drywall and insulation. We use thermal infrared imaging to trace the exact water point-of-entry on the roof surface.',
      icon: 'water_drop'
    },
    {
      title: 'Missing & Wind-Damaged Shingles',
      desc: 'Severe Texas crosswinds shear shingles away, leaving exposed tar paper. We replace shingles with exact color-matching and reinforced hand-nailing.',
      icon: 'air'
    },
    {
      title: 'Flashing & Valley Deterioration',
      desc: 'Over 80% of roof leaks originate where roof planes meet walls, chimneys, or valleys. We install heavy-gauge metal flashing and self-adhering waterproof membranes.',
      icon: 'build'
    },
    {
      title: 'Dry-Rotted Pipe Boots & Collars',
      desc: 'Intense Texas sun cracks rubber plumbing vent seals within 5–7 years. We swap deteriorated gaskets with lifetime silicone collar shields.',
      icon: 'shield'
    }
  ];

  const repairSteps = [
    {
      step: '01',
      title: 'Rapid Dispatch & Diagnostic',
      desc: `A certified repair technician from our ${currentLocation.city} hub arrives with a fully stocked service truck to inspect interior moisture and attic rafters.`
    },
    {
      step: '02',
      title: 'Upfront Flat-Rate Estimate',
      desc: 'You receive an exact written quote before any work starts. No hidden surcharges, no surprise line items.'
    },
    {
      step: '03',
      title: 'Surgical Permanent Repair',
      desc: 'We replace rotted decking, reflash masonry transitions, and fasten replacement shingles to manufacturer specifications.'
    },
    {
      step: '04',
      title: 'Water Test & 2-Year Warranty',
      desc: 'We perform a controlled water spray verification test and issue a written 2-year leak-free workmanship guarantee.'
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-surface-container-low to-surface py-16 lg:py-24 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-xs font-bold">
                <span className="material-symbols-outlined text-[16px]">home_repair_service</span>
                Same-Day Repair Dispatch Available in {currentLocation.city}
              </div>
              <h1 className="font-display-xl text-headline-lg lg:text-display-xl text-primary font-extrabold tracking-tight">
                Precision Roof Repair in {currentLocation.city}, TX
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Stop active leaks before they cause structural wood rot, insulation ruin, and hazardous mold. Our factory-trained master repair specialists fix leaks right the first time—backed by a 2-year leak-free guarantee.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#repair-form"
                  className="bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-label-lg font-bold px-7 py-4 rounded-lg shadow transition-all flex items-center gap-2"
                >
                  <span>Request a {currentLocation.city} Repair Quote</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
                <a
                  href={`tel:${currentLocation.phone.replace(/[^0-9]/g, '')}`}
                  className="bg-surface-container-lowest text-primary-container font-label-lg font-bold px-6 py-4 rounded-lg border border-outline-variant hover:bg-surface-container transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px] text-secondary">call</span>
                  <span>Direct: {currentLocation.phone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-xl border border-outline-variant/40">
                <Image
                  src="https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=80"
                  alt="Professional roof repair technician replacing damaged flashing"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow text-xs font-semibold text-primary-container flex items-center justify-between">
                  <span>Fast Local Dispatch</span>
                  <span className="text-secondary font-bold">From $299 Flat Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Problems We Fix */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">Targeted Solutions</span>
            <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-primary-container font-extrabold mt-1">
              Common Texas Roof Issues We Repair Daily
            </h2>
            <p className="font-body-md text-on-surface-variant text-sm mt-2">
              Never let minor shingle wear or flashing cracks turn into a costly premature total roof replacement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commonIssues.map((issue, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/50 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[26px] text-secondary">{issue.icon}</span>
                  </div>
                  <h3 className="font-headline-sm text-title-md font-bold text-primary-container">
                    {issue.title}
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    {issue.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Repair Process */}
      <section className="py-16 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">How We Work</span>
            <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-primary-container font-extrabold mt-1">
              Our 4-Step Professional Repair Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {repairSteps.map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm relative">
                <span className="text-4xl font-extrabold text-secondary/20 font-headline-lg absolute top-4 right-4">
                  {step.step}
                </span>
                <h3 className="font-headline-sm text-title-md font-bold text-primary-container mb-2">
                  {step.title}
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location-Aware Quote Form */}
      <section className="py-16 lg:py-24 bg-surface" id="repair-form">
        <div className="max-w-4xl mx-auto px-margin md:px-margin-md">
          <QuoteForm initialService="Roof Repair" />
        </div>
      </section>
    </div>
  );
}
