import React from 'react';
import { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-outline-variant/40">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {/* Star Rating */}
          <div className="flex items-center gap-1 text-tertiary-fixed-dim">
            {[...Array(review.rating)].map((_, i) => (
              <span
                key={i}
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            ))}
          </div>

          {/* Location Tag */}
          <span className="px-2.5 py-1 rounded bg-surface-container text-xs font-bold text-primary-container">
            {review.city}, {review.state}
          </span>
        </div>

        {/* Testimonial Quote */}
        <p className="font-body-md text-body-sm text-on-surface leading-relaxed italic">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>

      <div className="pt-6 mt-6 border-t border-surface-container flex items-center justify-between">
        <div>
          <div className="font-title-md text-label-lg font-bold text-primary-container">
            {review.name}
          </div>
          <div className="font-label-caps text-xs text-on-surface-variant">
            {review.service}
          </div>
        </div>

        {review.verified && (
          <span className="flex items-center gap-1 text-xs text-secondary font-semibold">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            Verified Owner
          </span>
        )}
      </div>
    </div>
  );
}
