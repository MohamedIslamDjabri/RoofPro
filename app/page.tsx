'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LocationAlertStrip from '@/components/layout/LocationAlertStrip';
import LocationSelector from '@/components/locations/LocationSelector';
import ServiceCard from '@/components/services/ServiceCard';
import { useLocation } from '@/context/LocationContext';
import { SITE_CONFIG, COMPANY_STATS, VALUE_PROPS, SERVICES, LOCATIONS } from '@/constants/data';

export default function HomePage() {
  const { currentLocation } = useLocation();

  return (
    <div className="flex flex-col w-full">
      {/* Top Location Alert Strip (Persistent Context) */}
      <LocationAlertStrip />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface to-surface-container-low py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-gutter-lg items-center">
            {/* Text Content */}
            <div className="lg:col-span-7 flex flex-col space-y-space-lg">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-surface-container-highest shadow-sm">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary-container font-bold">
                  Texas Multi-Location Headquarters
                </span>
                <span className="font-label-caps text-label-caps px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                  {currentLocation.city} Hub
                </span>
              </div>

              <div className="space-y-space-sm">
                <h1 className="font-display-xl text-headline-lg lg:text-display-xl text-primary font-extrabold tracking-tight">
                  Reliable Roofing. Local Experts. One RoofPro Standard.
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                  Professional roof repair, full replacement, drone inspections, and storm damage restoration from dedicated regional master installers across Dallas, Houston, Austin, and San Antonio.
                </p>
              </div>

              {/* Dual CTA Group */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md pt-2">
                <Link
                  className="bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-label-lg text-label-lg font-bold px-7 py-4 rounded-lg shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-space-xs text-center"
                  href="/contact?type=estimate"
                >
                  <span>Get a Free Estimate</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </Link>
                <a
                  className="bg-surface-container-lowest hover:bg-surface-container text-primary-container font-label-lg text-label-lg font-semibold px-6 py-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-space-xs text-center"
                  href="#location-selector-section"
                >
                  <span className="material-symbols-outlined text-[20px] text-secondary">domain</span>
                  <span>Find Your Local RoofPro Office</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-lowest shadow-sm">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim text-[24px]">stars</span>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg font-bold text-on-surface">4.9/5 Rating</span>
                    <span className="font-label-caps text-label-caps text-on-surface-variant">1,240+ Texas Reviews</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-lowest shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg font-bold text-on-surface">Licensed &amp; Insured</span>
                    <span className="font-label-caps text-label-caps text-on-surface-variant">TX License #48192</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-lowest shadow-sm">
                  <span className="material-symbols-outlined text-primary-container text-[24px]">workspace_premium</span>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg font-bold text-on-surface">Master Elite</span>
                    <span className="font-label-caps text-label-caps text-on-surface-variant">Top 2% Certified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual Element */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container-highest">
                <Image
                  src={SITE_CONFIG.heroImage}
                  alt="High-end Texas suburban residence with completed architectural roof"
                  width={600}
                  height={440}
                  className="w-full h-[440px] object-cover"
                  priority
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>

                {/* Dynamic Info Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-lg flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[22px]">engineering</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-md text-label-lg font-bold text-primary-container">
                        {currentLocation.city} Hub Active Dispatch
                      </span>
                      <span className="font-body-sm text-xs text-on-surface-variant">
                        {currentLocation.stats.activeCrews} certified crews on-site across {currentLocation.city} today
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-caps text-label-caps font-bold uppercase">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Local Service Prompt (Interactive Module) */}
      <LocationSelector />

      {/* Section 3: Trust & Company Scale Section */}
      <section className="w-full bg-surface-container-lowest py-16">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-surface-container-low shadow-sm">
            {COMPANY_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col p-4">
                <span className="font-label-caps text-label-caps text-secondary font-bold uppercase tracking-wider mb-1">
                  {stat.label}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="font-display-xl text-headline-lg lg:text-headline-lg font-extrabold text-primary-container">
                    {stat.value}
                  </span>
                  {stat.icon && (
                    <span className="material-symbols-outlined text-tertiary-fixed-dim text-[24px]">
                      {stat.icon}
                    </span>
                  )}
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Key Value Props Ribbon */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {VALUE_PROPS.map((vp) => (
              <div key={vp.title} className="flex items-center gap-3 p-4 rounded-xl bg-surface-container">
                <div className="w-10 h-10 rounded-lg bg-surface-container-lowest text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">{vp.icon}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg font-bold text-primary-container">{vp.title}</span>
                  <span className="font-body-sm text-xs text-on-surface-variant">{vp.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Comprehensive Services Section */}
      <section className="w-full bg-surface py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary font-bold">
              Comprehensive Capabilities
            </span>
            <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-primary-container font-extrabold">
              Roofing Services for Every Stage of Your Roof
            </h2>
            <p className="font-body-lg text-body-md text-on-surface-variant">
              Backed by Texas regional warehouses, company-owned scaffolding fleets, and certified local master installers.
            </p>
          </div>

          {/* 6 Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} currentCity={currentLocation.city} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              className="inline-flex items-center gap-2 bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg font-bold px-8 py-4 rounded-lg shadow-sm hover:shadow-md transition-all"
              href="/services"
            >
              <span>Explore All Roofing Services</span>
              <span className="material-symbols-outlined text-[18px]">east</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Local Expertise (Split Multi-Location Architecture Showcase) */}
      <section className="w-full bg-surface-container-low py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary font-bold">
                Texas Footprint &amp; Physical Offices
              </span>
              <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-primary-container font-extrabold">
                Big Enough to Serve You. Local Enough to Know Your Neighborhood.
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Why choose RoofPro USA? You get the buying power, lifetime warranties, and rigorous safety standards of a premier regional enterprise, matched with project managers who live in your city and know your local building codes.
            </p>
          </div>

          {/* 4 Market Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(LOCATIONS).map((loc) => {
              const isSelected = currentLocation.slug === loc.slug;
              return (
                <div
                  key={loc.slug}
                  className={`flex flex-col justify-between p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all border-t-4 ${
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

                    <div className="space-y-2 text-xs text-on-surface-variant font-body-sm">
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">location_on</span>
                        <span>{loc.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">call</span>
                        <a href={`tel:${loc.phone.replace(/[^0-9]/g, '')}`} className="font-bold text-on-surface hover:underline">
                          {loc.phone}
                        </a>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">map</span>
                        <span>{loc.localSuburbsText}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-container text-xs font-semibold text-primary-container flex items-center justify-between">
                      <span>Completed Projects:</span>
                      <span className="font-bold text-secondary">{loc.stats.completedProjects}</span>
                    </div>
                  </div>

                  <Link
                    className="mt-6 pt-4 border-t border-surface-container flex items-center justify-between font-label-md text-label-md font-bold text-primary-container hover:text-secondary transition-colors"
                    href={`/locations/${loc.slug}`}
                  >
                    <span>View {loc.city} Location</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 6: Featured Local Project Case Study */}
      <section className="w-full bg-surface-container-lowest py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="p-8 md:p-12 rounded-3xl bg-surface-container-low shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Image Split Column */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={SITE_CONFIG.caseStudyImage}
                    alt="Close up architectural detail of newly installed pewter gray Class 4 impact resistant shingles"
                    width={600}
                    height={380}
                    className="w-full h-[380px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Comparison / Info Pill */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary-container text-on-primary font-label-caps text-label-caps font-bold shadow-md flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">verified</span>
                    Verified {currentLocation.city} Installation
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-caps text-label-caps font-bold shadow">
                    Preston Hollow, Dallas, TX
                  </div>
                </div>
              </div>

              {/* Content Split Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary font-bold">
                    Featured Regional Project
                  </span>
                  <h3 className="font-headline-md text-headline-sm md:text-headline-md text-primary-container font-extrabold">
                    Dallas Residential Architectural Shingle Replacement
                  </h3>
                  <p className="font-body-md text-body-sm text-on-surface-variant font-medium">
                    System: GAF Timberline HDZ with Class 4 Impact Resistance &amp; Cobra Snow Country Ridge Vents
                  </p>
                </div>

                {/* Case Metrics Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-surface-container-lowest shadow-sm">
                    <span className="font-label-caps text-label-caps text-on-surface-variant block uppercase">Roof Area</span>
                    <span className="font-title-md text-label-lg font-bold text-primary-container">4,800 Sq Ft</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-lowest shadow-sm">
                    <span className="font-label-caps text-label-caps text-on-surface-variant block uppercase">Turnaround</span>
                    <span className="font-title-md text-label-lg font-bold text-secondary">2 Working Days</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-lowest shadow-sm col-span-2 sm:col-span-1">
                    <span className="font-label-caps text-label-caps text-on-surface-variant block uppercase">Warranty</span>
                    <span className="font-title-md text-label-lg font-bold text-primary-container">50-Yr Lifetime</span>
                  </div>
                </div>

                {/* Scope & Challenge Details */}
                <div className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
                  <p>
                    <strong className="text-on-surface">The Challenge:</strong> Severe 2.25-inch April hail cracked 40% of the south-facing slopes, resulting in active attic leaks and damaged plywood underlayment.
                  </p>
                  <p>
                    <strong className="text-on-surface">The Solution:</strong> RoofPro USA dispatched our licensed insurance specialist to coordinate on-site with the adjuster, securing 100% replacement coverage plus an upgraded class 4 insurance discount for the homeowner.
                  </p>
                </div>

                {/* Client Quote Card */}
                <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-start gap-3">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim text-[24px]">format_quote</span>
                  <div>
                    <p className="font-body-sm text-xs italic text-on-surface mb-1">
                      &ldquo;RoofPro handled everything directly with our insurance adjuster. Their team had the 4,800 sq ft roof completed in 48 hours without leaving a single nail in our driveway.&rdquo;
                    </p>
                    <span className="font-label-md text-xs font-bold text-primary-container">
                      — Mark &amp; Cheryl Henderson, Dallas Homeowners
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    className="inline-flex items-center gap-2 font-label-lg text-label-lg font-bold text-primary-container hover:text-secondary transition-colors"
                    href="/projects"
                  >
                    <span>View Full Texas Case Studies &amp; Galleries</span>
                    <span className="material-symbols-outlined text-[18px]">east</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Texas Homeowner Testimonials */}
      <section className="w-full bg-surface py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary font-bold">
              Verified Customer Stories
            </span>
            <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-primary-container font-extrabold">
              What Texas Homeowners Say About Their Local RoofPro Teams
            </h2>
            <p className="font-body-lg text-body-md text-on-surface-variant">
              Read real reviews from neighbors across Dallas, Houston, Austin, and San Antonio who trusted RoofPro USA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1: Dallas */}
            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-outline-variant/40">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-tertiary-fixed-dim">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                  <span className="px-2.5 py-1 rounded bg-surface-container text-xs font-bold text-primary-container">
                    Plano, TX
                  </span>
                </div>
                <p className="font-body-md text-body-sm text-on-surface leading-relaxed italic">
                  &ldquo;We had hail damage after the spring storms. The Dallas hub dispatched an inspector the same afternoon. Their drone scan found leaks we couldn&apos;t see from ground level. Total roof replacement was done quickly and professionally!&rdquo;
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-surface-container flex items-center justify-between">
                <div>
                  <div className="font-title-md text-label-lg font-bold text-primary-container">David M.</div>
                  <div className="font-label-caps text-xs text-on-surface-variant">Complete Architectural Reroof</div>
                </div>
                <span className="flex items-center gap-1 text-xs text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  Verified Owner
                </span>
              </div>
            </div>

            {/* Review 2: Houston */}
            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-outline-variant/40">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-tertiary-fixed-dim">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                  <span className="px-2.5 py-1 rounded bg-surface-container text-xs font-bold text-primary-container">
                    Katy, TX
                  </span>
                </div>
                <p className="font-body-md text-body-sm text-on-surface leading-relaxed italic">
                  &ldquo;Living on the Gulf coast, hurricane wind resistance is crucial. The Houston RoofPro team handled our insurance claim with zero stress, providing high-wind rated shingles and emergency tarping when we needed it.&rdquo;
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-surface-container flex items-center justify-between">
                <div>
                  <div className="font-title-md text-label-lg font-bold text-primary-container">Elena R.</div>
                  <div className="font-label-caps text-xs text-on-surface-variant">Storm Restoration &amp; Claim</div>
                </div>
                <span className="flex items-center gap-1 text-xs text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  Verified Owner
                </span>
              </div>
            </div>

            {/* Review 3: Austin */}
            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-outline-variant/40">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-tertiary-fixed-dim">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                  <span className="px-2.5 py-1 rounded bg-surface-container text-xs font-bold text-primary-container">
                    Round Rock, TX
                  </span>
                </div>
                <p className="font-body-md text-body-sm text-on-surface leading-relaxed italic">
                  &ldquo;Honest contractors are rare. RoofPro&apos;s inspector showed me the photos and told me honestly that I only needed minor valley flashing maintenance rather than a full replacement. Saved me thousands. Customer for life!&rdquo;
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-surface-container flex items-center justify-between">
                <div>
                  <div className="font-title-md text-label-lg font-bold text-primary-container">Marcus T.</div>
                  <div className="font-label-caps text-xs text-on-surface-variant">Flashing &amp; Valley Repair</div>
                </div>
                <span className="flex items-center gap-1 text-xs text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  Verified Owner
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Global Conversion Banner */}
      <section className="w-full bg-primary-container py-16 lg:py-20 text-on-primary">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="p-8 md:p-12 lg:p-16 rounded-3xl bg-primary relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container text-tertiary-fixed-dim font-label-caps text-label-caps font-bold">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                Zero Obligation • 100% Free Texas Roof Assessments
              </div>

              <h2 className="font-headline-lg text-headline-sm md:text-headline-lg font-extrabold text-on-primary leading-tight">
                Ready to Protect Your Texas Home?
              </h2>

              <p className="font-body-lg text-body-md text-surface-container-high/90 max-w-2xl leading-relaxed">
                Get your free, no-obligation roof assessment or call your nearest RoofPro team today. Our certified Texas inspectors provide detailed aerial damage reports and straightforward upfront pricing.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Link
                  className="bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-label-lg text-label-lg font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all text-center flex items-center justify-center gap-2"
                  href="/contact?type=estimate"
                >
                  <span>Get a Free Roof Estimate</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </Link>

                <a
                  className="bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-on-primary font-label-lg text-label-lg font-bold px-7 py-4 rounded-lg shadow-sm transition-all text-center flex items-center justify-center gap-2"
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                >
                  <span className="material-symbols-outlined text-[20px] text-tertiary-fixed-dim">call</span>
                  <span>Call {SITE_CONFIG.phone}</span>
                </a>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-primary-fixed-dim">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">check_circle</span>
                  Same-Day Response
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">check_circle</span>
                  No High-Pressure Sales
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">check_circle</span>
                  50-Year Non-Prorated Warranty
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
