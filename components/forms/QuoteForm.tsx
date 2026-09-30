'use client';

import React, { useState } from 'react';
import { useLocation } from '@/context/LocationContext';
import { LOCATIONS } from '@/constants/data';

interface QuoteFormProps {
  initialService?: string;
  preselectedCity?: string;
}

export default function QuoteForm({ initialService = 'Roof Replacement', preselectedCity }: QuoteFormProps) {
  const { currentLocation, setMarket } = useLocation();
  const [selectedCityOverride, setSelectedCityOverride] = useState<string | null>(null);
  const effectiveCity = preselectedCity || selectedCityOverride || currentLocation.city;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    service: initialService,
    contactMethod: 'Phone Call',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.address.trim()) newErrors.address = 'Property street address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleCityChange = (cityName: string) => {
    setSelectedCityOverride(cityName);
    const found = Object.values(LOCATIONS).find(l => l.city.toLowerCase() === cityName.toLowerCase());
    if (found) {
      setMarket(found.slug);
    }
  };

  const servicesList = [
    'Roof Replacement',
    'Roof Repair',
    'Storm Damage',
    'Roof Inspection',
    'Emergency Roofing',
    'Specialty Tile & Metal',
    'Other'
  ];

  return (
    <div className="bg-surface-container-lowest p-6 md:p-8 lg:p-10 rounded-2xl shadow-lg border border-outline-variant/50">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-xs font-bold mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          Your Location: {effectiveCity}, TX
        </div>
        <h3 className="font-headline-md text-title-md md:text-headline-sm text-primary-container font-extrabold">
          Get Your {effectiveCity} Roofing Estimate
        </h3>
        <p className="font-body-sm text-on-surface-variant text-sm mt-1">
          Complimentary 21-point drone and attic inspection with transparent, itemized pricing. No high-pressure sales.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-8 rounded-xl bg-secondary-container/30 border border-secondary/40 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-[36px] text-secondary">check_circle</span>
          </div>
          <h4 className="font-headline-sm text-primary-container font-bold">
            Estimate Request Received!
          </h4>
          <p className="font-body-md text-sm text-on-surface-variant max-w-md mx-auto">
            Thank you, <strong className="text-primary-container">{formData.fullName}</strong>. A licensed project manager from our{' '}
            <strong className="text-primary-container">{effectiveCity} Hub</strong> will contact you via {formData.contactMethod.toLowerCase()} within 2 business hours to schedule your inspection.
          </p>
          <div className="pt-2 text-xs text-on-surface-variant">
            Need urgent assistance? Call our direct line:{' '}
            <a href={`tel:${currentLocation.phone.replace(/[^0-9]/g, '')}`} className="font-bold text-secondary hover:underline">
              {currentLocation.phone}
            </a>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                fullName: '',
                phone: '',
                email: '',
                address: '',
                service: initialService,
                contactMethod: 'Phone Call',
                message: ''
              });
            }}
            className="mt-4 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md font-bold text-xs hover:bg-primary transition-colors cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block font-label-md text-xs text-primary-container font-bold mb-1">
                Full Name <span className="text-error">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="e.g. Michael Smith"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest border text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary ${
                  errors.fullName ? 'border-error ring-1 ring-error' : 'border-outline-variant'
                }`}
              />
              {errors.fullName && <p className="text-error text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block font-label-md text-xs text-primary-container font-bold mb-1">
                Phone Number <span className="text-error">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="(214) 555-0100"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest border text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary ${
                  errors.phone ? 'border-error ring-1 ring-error' : 'border-outline-variant'
                }`}
              />
              {errors.phone && <p className="text-error text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-label-md text-xs text-primary-container font-bold mb-1">
                Email Address <span className="text-error">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest border text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary ${
                  errors.email ? 'border-error ring-1 ring-error' : 'border-outline-variant'
                }`}
              />
              {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
            </div>

            {/* City Selection */}
            <div>
              <label htmlFor="city" className="block font-label-md text-xs text-primary-container font-bold mb-1">
                Texas Metro Region <span className="text-error">*</span>
              </label>
              <select
                id="city"
                value={effectiveCity}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="Dallas">Dallas-Fort Worth Metro</option>
                <option value="Houston">Greater Houston Metro</option>
                <option value="Austin">Austin &amp; Hill Country</option>
                <option value="San Antonio">San Antonio Metro</option>
              </select>
            </div>
          </div>

          {/* Property Address */}
          <div>
            <label htmlFor="address" className="block font-label-md text-xs text-primary-container font-bold mb-1">
              Property Street Address &amp; Zip <span className="text-error">*</span>
            </label>
            <input
              id="address"
              type="text"
              placeholder="e.g. 742 Evergreen Terrace, Dallas, TX 75201"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest border text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary ${
                errors.address ? 'border-error ring-1 ring-error' : 'border-outline-variant'
              }`}
            />
            {errors.address && <p className="text-error text-xs mt-1">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Service Needed */}
            <div>
              <label htmlFor="service" className="block font-label-md text-xs text-primary-container font-bold mb-1">
                Service Needed
              </label>
              <select
                id="service"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                {servicesList.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label htmlFor="contactMethod" className="block font-label-md text-xs text-primary-container font-bold mb-1">
                Preferred Contact Method
              </label>
              <select
                id="contactMethod"
                value={formData.contactMethod}
                onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="Phone Call">Phone Call</option>
                <option value="Text Message">Text Message</option>
                <option value="Email">Email</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block font-label-md text-xs text-primary-container font-bold mb-1">
              Project Notes / Details (Optional)
            </label>
            <textarea
              id="message"
              rows={3}
              placeholder="Tell us about roof age, visible leaks, storm date, insurance claim status, or specific shingle styles..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-lg bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-label-lg font-bold text-base shadow-[0_2px_8px_rgba(231,184,60,0.3)] hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-on-tertiary-fixed border-t-transparent rounded-full animate-spin"></span>
                <span>Transmitting Details to {effectiveCity} Dispatch...</span>
              </>
            ) : (
              <>
                <span>Get Free {effectiveCity} Roof Estimate</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-on-surface-variant">
            By submitting, you agree to receive follow-up contact regarding your roofing project. We never sell your personal information.
          </p>
        </form>
      )}
    </div>
  );
}
