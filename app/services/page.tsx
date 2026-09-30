'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocation } from '@/context/LocationContext';
import { SERVICES, LOCATIONS, VALUE_PROPS } from '@/constants/data';
import QuoteForm from '@/components/forms/QuoteForm';

export default function ServicesPage() {
  const { currentLocation } = useLocation();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-surface-container-low to-surface py-16 lg:py-24 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-xs font-bold">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Master Elite Certified Exterior Installations
            </div>
            <h1 className="font-display-xl text-headline-lg lg:text-display-xl text-primary font-extrabold tracking-tight">
              Roofing Services Engineered for Texas Weather
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              From emergency leak stopping and hail insurance claims to complete 50-year architectural reroofing. Every project is backed by our local {currentLocation.city} project managers and factory-certified crews.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact?type=estimate"
                className="bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-label-lg font-bold px-6 py-3.5 rounded-lg shadow transition-all flex items-center gap-2"
              >
                <span>Get a Free Estimate</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <a
                href={`tel:${currentLocation.phone.replace(/[^0-9]/g, '')}`}
                className="bg-surface-container-lowest text-primary-container font-label-lg font-bold px-6 py-3.5 rounded-lg border border-outline-variant hover:bg-surface-container transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px] text-secondary">call</span>
                <span>Call {currentLocation.city} Dispatch: {currentLocation.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg space-y-16">
          {SERVICES.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={service.id}
                id={service.id}
                className="p-8 md:p-12 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                  {/* Image Column */}
                  <div className={`lg:col-span-5 relative ${isEven ? '' : 'lg:col-start-8'}`}>
                    <div className="relative h-[320px] rounded-2xl overflow-hidden shadow-md">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-caps text-xs font-bold shadow">
                        {service.warrantyInfo || 'Certified Installation'}
                      </div>
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-primary-container font-label-caps text-xs font-bold shadow">
                        Available in {currentLocation.city}
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-7 space-y-5 ${isEven ? '' : 'lg:col-start-1'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-[24px] text-secondary">{service.icon}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded bg-surface-container font-label-caps text-xs font-bold text-secondary uppercase">
                        {service.priceStarting}
                      </span>
                    </div>

                    <h2 className="font-headline-lg text-headline-sm md:text-headline-lg font-bold text-primary-container">
                      {service.title}
                    </h2>

                    <p className="font-body-md text-on-surface-variant leading-relaxed">
                      {service.fullDesc}
                    </p>

                    <div className="space-y-2 pt-2">
                      <h4 className="font-label-lg text-primary-container font-bold text-sm">Key Service Highlights:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-on-surface">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/contact?type=estimate&service=${encodeURIComponent(service.title)}`}
                        className="bg-primary-container hover:bg-primary text-on-primary font-label-md font-bold px-5 py-3 rounded-lg shadow transition-all inline-flex items-center gap-2"
                      >
                        <span>Request {service.title} Estimate</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                      {service.slug.startsWith('roof-') || service.slug.startsWith('storm-') ? (
                        <Link
                          href={`/${service.slug}`}
                          className="text-secondary font-label-md font-bold text-xs hover:underline inline-flex items-center gap-1 px-3 py-3"
                        >
                          <span>Full details &amp; guidelines</span>
                          <span className="material-symbols-outlined text-[14px]">east</span>
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 21-Point Inspection Process Ribbon */}
      <section className="py-16 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">Our Inspection Protocol</span>
            <h3 className="font-headline-lg text-headline-sm md:text-headline-lg text-primary-container font-extrabold mt-1">
              The RoofPro 21-Point Certified Evaluation
            </h3>
            <p className="font-body-md text-on-surface-variant text-sm mt-2">
              Every home undergoes our systematic diagnostic process combining manual attic rafter checks and automated 4K drone surface scans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-headline-sm text-title-md font-bold text-primary-container">Attic &amp; Decking Diagnosis</h4>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                We inspect underside plywood moisture levels, thermal heat traps, rafter bowing, daylight penetration through vents, and bathroom exhaust discharge.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-headline-sm text-title-md font-bold text-primary-container">Exterior Perimeter &amp; Flashing</h4>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Step flashing along siding, chimney crickets, valley metal, drip edge gradient, pipe boot rubber dry-rot, and gutter slope alignment.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-headline-sm text-title-md font-bold text-primary-container">4K Aerial Shingle Health Scan</h4>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Micro-fracture hail bruising, wind creasing along nail lines, thermal blistering, granule loss quantification, and remaining life expectancy.
              </p>
            </div>
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
