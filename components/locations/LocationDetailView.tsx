'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { LocationInfo } from '@/types';
import { useLocation } from '@/context/LocationContext';
import { PROJECTS, REVIEWS, SERVICES } from '@/constants/data';
import GoogleMapSection from '@/components/common/GoogleMapSection';
import ProjectCard from '@/components/projects/ProjectCard';
import ReviewCard from '@/components/reviews/ReviewCard';
import QuoteForm from '@/components/forms/QuoteForm';

interface LocationDetailViewProps {
  location: LocationInfo;
}

export default function LocationDetailView({ location }: LocationDetailViewProps) {
  const { setMarket } = useLocation();

  useEffect(() => {
    setMarket(location.slug);
  }, [location.slug, setMarket]);

  // Local projects and reviews
  const localProjects = PROJECTS.filter(p => p.locationSlug === location.slug);
  const localReviews = REVIEWS.filter(r => r.locationSlug === location.slug);

  return (
    <div className="flex flex-col w-full">
      {/* City Hero */}
      <section className="bg-gradient-to-b from-surface-container-low to-surface py-16 lg:py-24 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span>{location.regionalTag}</span>
              </div>

              <h1 className="font-display-xl text-headline-lg lg:text-display-xl text-primary font-extrabold tracking-tight">
                Roofing Services in {location.displayName}, {location.state}
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                {location.heroDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#local-estimate-form"
                  className="bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-label-lg text-label-lg font-bold px-7 py-4 rounded-lg shadow-md hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <span>Get a {location.city} Roof Estimate</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </a>
                <a
                  href={`tel:${location.phone.replace(/[^0-9]/g, '')}`}
                  className="bg-surface-container-lowest text-primary-container font-label-lg text-label-lg font-bold px-6 py-4 rounded-lg border border-outline-variant hover:bg-surface-container transition-all flex items-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[20px] text-secondary">call</span>
                  <span>Direct: {location.phone}</span>
                </a>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-primary-container">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">warehouse</span>
                  Local Material Staging Depot
                </span>
                <span className="text-outline-variant">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">engineering</span>
                  {location.stats.activeCrews} On-Call Crews
                </span>
                <span className="text-outline-variant">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                  {location.stats.completedProjects} Completed
                </span>
              </div>
            </div>

            {/* Local Contact Info Card */}
            <div className="lg:col-span-5">
              <div className="p-8 rounded-3xl bg-surface-container-lowest shadow-xl border border-outline-variant/60 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-surface-container">
                  <div>
                    <h3 className="font-headline-sm text-title-md font-bold text-primary-container">
                      {location.displayName} Hub Contact
                    </h3>
                    <p className="text-xs text-on-surface-variant">Regional Operations Headquarters</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-caps text-xs font-bold">
                    Active
                  </span>
                </div>

                <div className="space-y-4 text-sm font-body-sm text-on-surface">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[20px] text-secondary shrink-0 mt-0.5">location_on</span>
                    <div>
                      <strong className="block text-xs uppercase text-on-surface-variant font-bold">Physical Address:</strong>
                      <span>{location.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[20px] text-secondary shrink-0 mt-0.5">call</span>
                    <div>
                      <strong className="block text-xs uppercase text-on-surface-variant font-bold">Local Telephone:</strong>
                      <a href={`tel:${location.phone.replace(/[^0-9]/g, '')}`} className="font-bold text-base text-primary hover:underline">
                        {location.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[20px] text-secondary shrink-0 mt-0.5">mail</span>
                    <div>
                      <strong className="block text-xs uppercase text-on-surface-variant font-bold">Direct Email:</strong>
                      <a href={`mailto:${location.email}`} className="text-secondary hover:underline">
                        {location.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[20px] text-secondary shrink-0 mt-0.5">schedule</span>
                    <div>
                      <strong className="block text-xs uppercase text-on-surface-variant font-bold">Operating Hours:</strong>
                      <span>{location.hours}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#local-estimate-form"
                    className="w-full py-3.5 px-4 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-xs font-bold text-center block shadow transition-colors"
                  >
                    Schedule On-Site Inspection in {location.city}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Services Offered */}
      <section className="py-16 lg:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">Localized Capabilities</span>
            <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-primary-container font-extrabold mt-1">
              Roofing Services in {location.city}
            </h2>
            <p className="font-body-md text-on-surface-variant text-sm mt-2">
              Every system is customized for {location.city} building codes, HOA guidelines, and local weather patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {location.services.map((srv, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/50 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-secondary">verified</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-title-md font-bold text-primary-container mb-1">
                    {srv}
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    Full local code compliance, permitting management, and manufacturer certified warranty protection in {location.city}.
                  </p>
                  <Link
                    href={`/contact?type=estimate&service=${encodeURIComponent(srv)}&city=${encodeURIComponent(location.city)}`}
                    className="inline-flex items-center gap-1 text-xs text-secondary font-bold hover:underline mt-3"
                  >
                    <span>Request pricing</span>
                    <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Communities Served */}
      <section className="py-14 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="max-w-3xl">
            <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">Service Territory</span>
            <h2 className="font-headline-md text-title-md md:text-headline-sm text-primary-container font-bold mt-1">
              Communities Served by Our {location.city} Hub
            </h2>
            <p className="font-body-sm text-sm text-on-surface-variant mt-2 mb-6">
              Our regional crews provide prompt same-day service and inspections across {location.headline}:
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {location.nearbyAreas.map((area, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/60 text-xs font-bold text-primary-container shadow-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary">pin_drop</span>
                <span>{area}, TX</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Local Projects Gallery */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">Local Work</span>
              <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-primary-container font-extrabold mt-1">
                Completed Roofing Projects in {location.city}
              </h2>
            </div>
            <Link href="/projects" className="text-secondary font-label-md font-bold text-xs hover:underline flex items-center gap-1">
              <span>View All Texas Galleries</span>
              <span className="material-symbols-outlined text-[15px]">east</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localProjects.length > 0 ? (
              localProjects.map((p) => <ProjectCard key={p.id} project={p} />)
            ) : (
              PROJECTS.slice(0, 3).map((p) => <ProjectCard key={p.id} project={p} />)
            )}
          </div>
        </div>
      </section>

      {/* Local Google Map Section */}
      <section className="py-12 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <GoogleMapSection location={location} />
        </div>
      </section>

      {/* Local Testimonials */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">Neighbor Reviews</span>
            <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-primary-container font-extrabold mt-1">
              Verified {location.city} Customer Testimonials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localReviews.length > 0 ? (
              localReviews.map((r) => <ReviewCard key={r.id} review={r} />)
            ) : (
              REVIEWS.slice(0, 3).map((r) => <ReviewCard key={r.id} review={r} />)
            )}
          </div>
        </div>
      </section>

      {/* Local Quote Form */}
      <section className="py-16 lg:py-24 bg-surface-container-low" id="local-estimate-form">
        <div className="max-w-4xl mx-auto px-margin md:px-margin-md">
          <QuoteForm preselectedCity={location.city} />
        </div>
      </section>
    </div>
  );
}
