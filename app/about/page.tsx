'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONFIG, COMPANY_STATS, LOCATIONS, FAQS } from '@/constants/data';
import { useLocation } from '@/context/LocationContext';

export default function AboutPage() {
  const { currentLocation } = useLocation();

  const companyValues = [
    {
      title: 'Institutional Stability, Local Pride',
      desc: 'We combine the material purchasing volume, safety standards, and manufacturer relationships of a statewide enterprise with local project managers who live in your community.',
      icon: 'corporate_fare'
    },
    {
      title: 'Master Elite Top 2% Certification',
      desc: 'Less than 2% of roofing contractors in North America qualify for Master Elite credentials. This authorizes us to provide non-prorated, factory-backed 50-year system warranties.',
      icon: 'workspace_premium'
    },
    {
      title: 'Zero High-Pressure Sales',
      desc: 'Our certified inspectors provide honest, photographic evidence. If your roof only needs a $299 pipe boot repair rather than a $15,000 replacement, we tell you truthfully.',
      icon: 'handshake'
    },
    {
      title: 'Rapid Emergency Mobilization',
      desc: 'When severe hail or tropical squalls hit North or Central Texas, our regional facilities deploy emergency tarping units within hours to protect home contents.',
      icon: 'bolt'
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface-container-low to-surface py-16 lg:py-24 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-xs font-bold">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              {SITE_CONFIG.license}
            </div>
            <h1 className="font-display-xl text-headline-lg lg:text-display-xl text-primary font-extrabold tracking-tight">
              National Reach. Local Roofing Experts.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              RoofPro USA was founded to solve a critical Texas homeowner challenge: the gap between unreliable local fly-by-night storm chasers and impersonal national conglomerates. We provide permanent brick-and-mortar facilities in Dallas, Houston, Austin, and San Antonio.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview & Scale */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">Our Heritage</span>
              <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-primary-container font-extrabold">
                15+ Years Protecting Texas Homes from the Top Down
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Texas roofing systems confront some of the harshest climatic extremes on earth: 2+ inch hailstorms in DFW, 130 mph coastal hurricane winds in Houston, blistering 105° UV heat waves in Austin, and sudden Hill Country flash floods.
              </p>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Standard builder-grade shingles fail under these stresses within 8 to 12 years. At RoofPro, our master technicians engineer multi-layered defense systems featuring reinforced synthetic underlayment, ice-and-water valley barriers, Class 4 impact shingles, and continuous balanced attic ridge ventilation.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/60 flex-1 min-w-[200px]">
                  <div className="font-headline-md text-primary font-bold">10,000+</div>
                  <div className="text-xs text-on-surface-variant">Completed Installations</div>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/60 flex-1 min-w-[200px]">
                  <div className="font-headline-md text-secondary font-bold">4 Major Hubs</div>
                  <div className="text-xs text-on-surface-variant">Permanent Physical Offices</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/50">
                <Image
                  src={SITE_CONFIG.heroImage}
                  alt="RoofPro master certified roofing crew on residential Texas job site"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="py-16 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">The RoofPro Advantage</span>
            <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-primary-container font-extrabold mt-1">
              Built on Transparency, Precision &amp; Safety
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((val, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[26px] text-secondary">{val.icon}</span>
                  </div>
                  <h3 className="font-headline-sm text-title-md font-bold text-primary-container">
                    {val.title}
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-margin md:px-margin-md">
          <div className="text-center mb-12">
            <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">Homeowner Guidance</span>
            <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-primary-container font-extrabold mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/50 shadow-sm space-y-2">
                <h3 className="font-headline-sm text-title-md font-bold text-primary-container flex items-start gap-2">
                  <span className="material-symbols-outlined text-[20px] text-secondary shrink-0 mt-0.5">help</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="font-body-md text-sm text-on-surface-variant pl-7 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
