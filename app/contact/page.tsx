'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocation } from '@/context/LocationContext';
import { useAIModal } from '@/context/AIModalContext';
import { SITE_CONFIG, LOCATIONS } from '@/constants/data';
import QuoteForm from '@/components/forms/QuoteForm';

function ContactContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || 'Roof Replacement';
  const initialCity = searchParams.get('city') || undefined;
  const { currentLocation } = useLocation();
  const { openChat, openVoiceCall } = useAIModal();

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface-container-low to-surface py-16 lg:py-24 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-xs font-bold">
              <span className="material-symbols-outlined text-[16px]">call</span>
              Direct Regional Dispatch Active
            </div>
            <h1 className="font-display-xl text-headline-lg lg:text-display-xl text-primary font-extrabold tracking-tight">
              Contact Your Local RoofPro Team
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Schedule your complimentary 21-point drone roof assessment, request storm emergency tarping, or connect directly with our regional offices across Texas.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Hub Directory */}
      <section className="py-16 lg:py-24 bg-surface" id="estimate">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <QuoteForm initialService={initialService} preselectedCity={initialCity} />
            </div>

            {/* Local Hub Directory Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* AI Voice & Chat Booking Callout Card */}
              <div className="p-6 rounded-2xl bg-primary-container text-on-primary shadow-md border border-primary-fixed-variant/40 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
                  <span className="font-label-caps text-[11px] uppercase tracking-wider text-tertiary-fixed-dim font-bold">
                    Zero Wait Time • 24/7 AI Dispatch
                  </span>
                </div>
                <h4 className="font-headline-sm text-base font-bold text-on-primary">
                  Prefer to Schedule via AI Voice or Chat?
                </h4>
                <p className="text-xs text-primary-fixed-dim leading-relaxed">
                  Connect instantly with our automated RoofPro booking dispatcher to reserve your free 21-point drone inspection without waiting on hold.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={openVoiceCall}
                    className="py-2.5 px-3 rounded-lg bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">phone_in_talk</span>
                    <span>AI Voice Call</span>
                  </button>
                  <button
                    type="button"
                    onClick={openChat}
                    className="py-2.5 px-3 rounded-lg bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-on-primary font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-primary-fixed-variant/40"
                  >
                    <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                    <span>AI Chat</span>
                  </button>
                </div>
              </div>

              <div className="p-6 md:p-8 rounded-2xl bg-surface-container-low border border-outline-variant/50 shadow-sm space-y-6">
                <div>
                  <span className="font-label-caps text-secondary font-bold uppercase tracking-wider text-xs">Direct Telephone Lines</span>
                  <h3 className="font-headline-sm text-title-md md:text-headline-sm font-bold text-primary-container mt-1">
                    Connect With Regional Dispatch
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Speak directly with a local project coordinator in your metropolitan area:
                  </p>
                </div>

                <div className="space-y-4">
                  {Object.values(LOCATIONS).map((loc) => {
                    const isCurrent = currentLocation.slug === loc.slug;
                    return (
                      <div
                        key={loc.slug}
                        className={`p-4 rounded-xl border transition-all ${
                          isCurrent
                            ? 'bg-surface-container-lowest border-secondary shadow-sm'
                            : 'bg-surface-container-lowest/70 border-outline-variant/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <strong className="font-title-md text-sm text-primary-container font-bold flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
                            {loc.displayName}
                          </strong>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-caps text-[10px] font-bold">
                              Your Hub
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-on-surface-variant mt-1">{loc.address}</p>
                        <div className="mt-2 pt-2 border-t border-surface-container flex items-center justify-between text-xs">
                          <a
                            href={`tel:${loc.phone.replace(/[^0-9]/g, '')}`}
                            className="font-bold text-secondary hover:underline flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[15px]">call</span>
                            <span>{loc.phone}</span>
                          </a>
                          <a
                            href={`mailto:${loc.email}`}
                            className="text-on-surface-variant hover:text-primary hover:underline"
                          >
                            {loc.email}
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-surface-container text-xs text-on-surface-variant space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-secondary">verified_user</span>
                    <span>{SITE_CONFIG.license}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-secondary">schedule</span>
                    <span>{SITE_CONFIG.operatingHours}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading contact directory...</div>}>
      <ContactContent />
    </Suspense>
  );
}
