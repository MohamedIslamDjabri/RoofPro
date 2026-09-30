'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocation } from '@/context/LocationContext';
import QuoteForm from '@/components/forms/QuoteForm';

export default function StormDamagePage() {
  const { currentLocation } = useLocation();

  const stormThreats = [
    {
      title: 'Hail Impact & Shingle Fractures',
      desc: 'Hailstones over 1 inch bruise the asphalt core and shatter protective granules, leaving the fiber matting porous to rainfall. We document impact diameters with high-resolution drone scans.',
      icon: 'grain'
    },
    {
      title: 'Torn & Uplifted Wind Shingles',
      desc: 'Texas straight-line winds and microbursts break factory sealant seals. Uplifted shingles flap loose, allowing wind-driven moisture beneath the roof plane.',
      icon: 'air'
    },
    {
      title: 'Fallen Tree Limbs & Structural Breaches',
      desc: 'Heavy live oak limbs crashing through roof trusses require immediate emergency tarping, debris removal, and structural rafter reinforcement.',
      icon: 'park'
    },
    {
      title: 'Dented Soft Metals & Gutter Troughs',
      desc: 'Hail dents on chimney flashing, ridge vents, downspouts, and AC fan fins are crucial evidence needed to prove full insurance loss claims.',
      icon: 'receipt_long'
    }
  ];

  const claimSteps = [
    {
      step: '1',
      title: 'Complimentary Drone Hail Inspection',
      desc: `Our ${currentLocation.city} inspection team captures high-definition aerial footage and physical test-square chalk marks within 24 hours of storm impact.`
    },
    {
      step: '2',
      title: 'Emergency Tarping & Loss Mitigation',
      desc: 'We secure damaged valleys and punctures immediately to prevent interior drywall staining, water ruin, and mold proliferation.'
    },
    {
      step: '3',
      title: 'On-Site Adjuster Walkthrough',
      desc: 'We meet your insurance company adjuster on your roof. We provide Xactimate line-item software estimates to ensure full replacement is approved.'
    },
    {
      step: '4',
      title: 'Code-Compliant Restoration',
      desc: 'Once approved, we install a complete Class 4 impact system. You pay only your required deductible—zero unexpected costs.'
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface-container-low to-surface py-16 lg:py-24 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error/15 text-error font-label-caps text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                Active Texas Storm Restoration Response Unit
              </div>
              <h1 className="font-display-xl text-headline-lg lg:text-display-xl text-primary font-extrabold tracking-tight">
                Storm &amp; Hail Damage Restoration in {currentLocation.city}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Texas hailstorms and severe thunderstorms cause millions in unspotted roof damage every year. RoofPro USA provides free drone damage assessments, emergency tarping, and complete insurance claim advocacy from start to finish.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#storm-form"
                  className="bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-label-lg text-label-lg font-bold px-7 py-4 rounded-lg shadow transition-all flex items-center gap-2"
                >
                  <span>Request a Storm Damage Inspection</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
                <a
                  href={`tel:${currentLocation.phone.replace(/[^0-9]/g, '')}`}
                  className="bg-surface-container-lowest text-primary-container font-label-lg font-bold px-6 py-4 rounded-lg border border-outline-variant hover:bg-surface-container transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px] text-error">emergency</span>
                  <span>24/7 Dispatch: {currentLocation.phone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-xl border border-outline-variant/40">
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=1200&q=80"
                  alt="Hail storm damage restoration on Texas residential roof"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-caps text-xs font-bold shadow">
                  Xactimate Certified Estimators
                </div>
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow text-xs font-semibold text-primary-container flex items-center justify-between">
                  <span>Zero Out-of-Pocket Beyond Deductible</span>
                  <span className="text-secondary font-bold">100% Free Drone Scan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Storm Threats Breakdown */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">Impact Categories</span>
            <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-primary-container font-extrabold mt-1">
              Types of Severe Weather Damage We Resolve
            </h2>
            <p className="font-body-md text-on-surface-variant text-sm mt-2">
              Hail and wind damage are frequently invisible from the ground until water begins staining your ceiling months later.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stormThreats.map((threat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/50 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[26px] text-secondary">{threat.icon}</span>
                  </div>
                  <h3 className="font-headline-sm text-title-md font-bold text-primary-container">
                    {threat.title}
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    {threat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Claims Assistance Process */}
      <section className="py-16 lg:py-24 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">Hassle-Free Claims</span>
            <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-primary-container font-extrabold mt-1">
              How We Help You Win Your Insurance Claim
            </h2>
            <p className="font-body-md text-on-surface-variant text-sm mt-2">
              We take the stress out of dealing with insurance adjusters by providing indisputable digital proof and code compliance requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {claimSteps.map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container font-bold flex items-center justify-center">
                  {step.step}
                </div>
                <h3 className="font-headline-sm text-title-md font-bold text-primary-container">
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

      {/* Quote/Inspection Request Form */}
      <section className="py-16 lg:py-24 bg-surface" id="storm-form">
        <div className="max-w-4xl mx-auto px-margin md:px-margin-md">
          <QuoteForm initialService="Storm Damage" />
        </div>
      </section>
    </div>
  );
}
