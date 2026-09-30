'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { REVIEWS, LOCATIONS } from '@/constants/data';
import ReviewCard from '@/components/reviews/ReviewCard';
import { useLocation } from '@/context/LocationContext';

export default function ReviewsPage() {
  const { currentLocation } = useLocation();
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const locationOptions = [
    { value: 'all', label: 'All Texas Locations' },
    { value: 'dallas', label: 'Dallas-Fort Worth' },
    { value: 'houston', label: 'Greater Houston' },
    { value: 'austin', label: 'Austin & Hill Country' },
    { value: 'san-antonio', label: 'San Antonio Metro' }
  ];

  const filteredReviews = REVIEWS.filter((review) => {
    return selectedLocation === 'all' || review.locationSlug === selectedLocation;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface-container-low to-surface py-16 lg:py-24 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-xs font-bold">
              <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">stars</span>
              4.9/5.0 Overall Texas Rating • 2,800+ Verified Homeowners
            </div>
            <h1 className="font-display-xl text-headline-lg lg:text-display-xl text-primary font-extrabold tracking-tight">
              What Texas Homeowners Say About RoofPro USA
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Read transparent feedback from neighbors across Dallas, Houston, Austin, and San Antonio who trusted our certified master installers with their roof repairs, hail claims, and full reroofs.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Content & Filtering */}
      <section className="py-12 lg:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          {/* Location Filter Tabs */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/50 shadow-sm mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-primary-container uppercase">
              <span className="material-symbols-outlined text-[18px] text-secondary">tune</span>
              <span>Filter Reviews by Market:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {locationOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSelectedLocation(opt.value)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedLocation === opt.value
                      ? 'bg-primary-container text-on-primary shadow-sm'
                      : 'bg-surface-container hover:bg-surface-container-high text-primary-container'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="py-16 bg-surface-container-low border-t border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg text-center space-y-6">
          <h2 className="font-headline-lg text-headline-sm md:text-headline-lg font-bold text-primary-container">
            Experience the RoofPro Standard on Your Next Project
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-xl mx-auto text-sm">
            Join thousands of satisfied Texas homeowners. Book your 100% free aerial drone inspection with our {currentLocation.city} office today.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact?type=estimate"
              className="bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-label-lg font-bold px-8 py-3.5 rounded-lg shadow-md inline-flex items-center gap-2"
            >
              <span>Request Free Inspection</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
