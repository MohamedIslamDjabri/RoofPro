'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocation } from '@/context/LocationContext';
import QuoteForm from '@/components/forms/QuoteForm';
import ProjectCard from '@/components/projects/ProjectCard';
import { PROJECTS, REVIEWS } from '@/constants/data';

export default function RoofReplacementPage() {
  const { currentLocation } = useLocation();

  const replacementSigns = [
    { title: 'Age Exceeding 18–22 Years', desc: 'Standard asphalt shingles dry out, become brittle, and lose granular adhesion in Texas summer heat.' },
    { title: 'Curling, Buckling, or Missing Shingles', desc: 'Shingles pulling upward or blowing off expose the underlying wood decking to direct rainwater.' },
    { title: 'Granules Accumulating in Gutters', desc: 'Excessive shingle grit washed into downspouts signals the fiberglass matting is unprotected against UV rays.' },
    { title: 'Sagging Decking or Water Staining', desc: 'Spongy spots when walked on or brown moisture rings across your drywall ceilings require immediate full overhaul.' }
  ];

  const materialOptions = [
    {
      title: 'GAF Timberline HDZ Architectural',
      desc: 'America’s #1 selling shingle featuring LayerLock technology and WindProven unlimited wind speed warranty protection.',
      warranty: '50-Year Non-Prorated System',
      features: ['Class 4 impact upgrade available', 'Algae-resistant StainGuard Plus', 'Dual shadow lines for rich curb appeal']
    },
    {
      title: 'Class 4 Impact Resistant Shingles',
      desc: 'Engineered specifically for Texas hail alleys. Eligible for up to 25% homeowner insurance premium discounts.',
      warranty: 'Lifetime Impact Warranty',
      features: ['SBS modified rubberized asphalt', 'UL 2218 Class 4 steel ball rated', 'Reduced cracking in extreme freezing temps']
    },
    {
      title: 'Standing Seam Architectural Metal',
      desc: 'Sleek modern aesthetics with concealed fastener systems engineered to withstand 140+ mph hurricane gusts.',
      warranty: '50+ Year Expected Lifespan',
      features: ['24-gauge Galvalume steel', 'Cool-roof reflective energy pigments', 'Zero maintenance life expectancy']
    }
  ];

  const localProjects = PROJECTS.filter(p => p.service === 'Roof Replacement');
  const localReviews = REVIEWS.filter(r => r.locationSlug === currentLocation.slug);

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface-container-low to-surface py-16 lg:py-24 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-xs font-bold">
                <span className="material-symbols-outlined text-[16px]">roofing</span>
                Master Elite Factory Certified Reroofing in {currentLocation.city}
              </div>
              <h1 className="font-display-xl text-headline-lg lg:text-display-xl text-primary font-extrabold tracking-tight">
                Architectural Roof Replacement in {currentLocation.city}, TX
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Upgrade your home with lifetime architectural roofing designed to withstand Texas hail, high winds, and blistering UV rays. Complete tear-off, reinforced ice &amp; water shields, and transferable 50-year non-prorated warranties.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#replacement-form"
                  className="bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-label-lg text-label-lg font-bold px-7 py-4 rounded-lg shadow transition-all flex items-center gap-2"
                >
                  <span>Request a Roof Replacement Estimate</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
                <a
                  href={`tel:${currentLocation.phone.replace(/[^0-9]/g, '')}`}
                  className="bg-surface-container-lowest text-primary-container font-label-lg font-bold px-6 py-4 rounded-lg border border-outline-variant hover:bg-surface-container transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px] text-secondary">call</span>
                  <span>{currentLocation.phone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl border border-outline-variant/40">
                <Image
                  src="https://images.unsplash.com/photo-1622372738946-62e02505feb3?auto=format&fit=crop&w=1200&q=80"
                  alt="High quality architectural shingle roof replacement"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow flex items-center justify-between">
                  <div>
                    <div className="font-label-caps text-xs text-secondary font-bold uppercase">Financing Available</div>
                    <div className="font-title-md text-sm font-bold text-primary-container">$0 Down • Plans from 0% APR</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-caps text-xs font-bold">
                    50-Yr Warranty
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signs It's Time to Replace */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">Homeowner Checklist</span>
            <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-primary-container font-extrabold mt-1">
              4 Signs Your Texas Roof Needs Replacement
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {replacementSigns.map((sign, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-lg bg-surface-container text-secondary font-bold flex items-center justify-center">
                  0{idx + 1}
                </div>
                <h3 className="font-headline-sm text-title-md font-bold text-primary-container">{sign.title}</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">{sign.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Material & Shingle Systems */}
      <section className="py-16 lg:py-24 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">Engineered Systems</span>
            <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-primary-container font-extrabold mt-1">
              Premium Roofing Options
            </h2>
            <p className="font-body-md text-on-surface-variant text-sm mt-2">
              We exclusively install factory-certified roofing systems featuring continuous ventilation, leak barriers, and starter strips.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {materialOptions.map((opt, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/40 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded bg-secondary-container text-on-secondary-container font-label-caps text-xs font-bold">
                    {opt.warranty}
                  </span>
                  <h3 className="font-headline-sm text-title-md font-bold text-primary-container">
                    {opt.title}
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    {opt.desc}
                  </p>
                  <ul className="space-y-2 pt-2 border-t border-surface-container text-xs text-on-surface">
                    {opt.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[15px] text-secondary">check_circle</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 mt-6 border-t border-surface-container">
                  <a
                    href="#replacement-form"
                    className="w-full py-2.5 px-4 rounded-lg bg-surface-container hover:bg-primary-container text-primary-container hover:text-on-primary font-label-md text-xs font-bold transition-all text-center block"
                  >
                    Select Material in {currentLocation.city}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Replacement Projects */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">Proof of Work</span>
              <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-primary-container font-extrabold mt-1">
                Recent Full Roof Replacements
              </h2>
            </div>
            <Link href="/projects" className="text-secondary font-label-md font-bold text-xs hover:underline flex items-center gap-1">
              <span>View All Texas Projects</span>
              <span className="material-symbols-outlined text-[15px]">east</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {localProjects.slice(0, 3).map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Replacement Quote Form */}
      <section className="py-16 lg:py-24 bg-surface-container-low" id="replacement-form">
        <div className="max-w-4xl mx-auto px-margin md:px-margin-md">
          <QuoteForm initialService="Roof Replacement" />
        </div>
      </section>
    </div>
  );
}
