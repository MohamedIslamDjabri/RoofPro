'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLocation } from '@/context/LocationContext';
import { useAIModal } from '@/context/AIModalContext';
import { SITE_CONFIG, NAV_LINKS } from '@/constants/data';
import { LocationSlug } from '@/types';

export default function Header() {
  const pathname = usePathname();
  const { selectedSlug, currentLocation, setMarket } = useLocation();
  const { openChat, openVoiceCall } = useAIModal();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const hubs: { slug: LocationSlug; name: string; region: string; phone: string }[] = [
    { slug: 'dallas', name: 'Dallas-Fort Worth', region: 'DFW Hub', phone: '(214) 555-0148' },
    { slug: 'houston', name: 'Greater Houston', region: 'Gulf Coast', phone: '(713) 555-0192' },
    { slug: 'austin', name: 'Austin & Hill Country', region: 'Central Texas', phone: '(512) 555-0176' },
    { slug: 'san-antonio', name: 'San Antonio Metro', region: 'South Texas', phone: '(210) 555-0134' },
  ];

  const handleSelectHub = (slug: LocationSlug) => {
    setMarket(slug);
    setDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-surface-container-lowest shadow-[0_2px_12px_rgba(18,55,42,0.06)] border-b border-outline-variant/30">
      {/* Top Banner Bar */}
      <div className="w-full bg-primary-container text-on-primary font-label-md text-label-md border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-10 flex items-center justify-between gap-4">
          {/* Left: Regional Hub Dropdown + License */}
          <div className="flex items-center gap-3 text-xs min-w-0">
            {/* Interactive Regional Hub Selector */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-on-primary border border-outline-variant/30 transition-all text-xs font-semibold cursor-pointer whitespace-nowrap"
              >
                <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim shrink-0"></span>
                <span className="material-symbols-outlined text-[15px] text-tertiary-fixed-dim shrink-0">location_on</span>
                <span>Serving: {currentLocation.city}, TX</span>
                <span className={`material-symbols-outlined text-[15px] text-primary-fixed-dim transition-transform shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-72 z-50 animate-fadeIn">
                  <div className="bg-surface-container-lowest text-on-surface rounded-xl p-4 shadow-[0_16px_32px_rgba(18,55,42,0.16)] border border-outline-variant/60">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-container-high">
                      <span className="font-label-caps text-label-caps text-on-surface-variant">Select Regional Dispatch</span>
                      <span className="font-label-caps text-label-caps text-secondary font-bold">4 Active Hubs</span>
                    </div>
                    <div className="space-y-1">
                      {hubs.map((hub) => {
                        const isActive = selectedSlug === hub.slug;
                        return (
                          <div
                            key={hub.slug}
                            onClick={() => handleSelectHub(hub.slug)}
                            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                              isActive
                                ? 'bg-surface-container text-on-surface font-semibold'
                                : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                            }`}
                          >
                            <div>
                              <div className="font-title-md text-label-lg text-primary-container font-bold flex items-center gap-1.5">
                                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>}
                                {hub.name}
                              </div>
                              <div className="text-on-surface-variant font-body-sm text-[11px]">
                                {hub.region} • {hub.phone}
                              </div>
                            </div>
                            {isActive ? (
                              <span className="font-label-caps text-[10px] px-1.5 py-0.5 rounded bg-secondary/15 text-secondary font-bold">
                                Active
                              </span>
                            ) : (
                              <span className="material-symbols-outlined text-[16px] text-outline">arrow_forward</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-2 pt-2 border-t border-surface-container-high text-center">
                      <Link
                        href="/locations"
                        onClick={() => setDropdownOpen(false)}
                        className="text-xs text-secondary hover:text-primary-container font-bold inline-flex items-center gap-1"
                      >
                        <span>Explore all Texas hub locations</span>
                        <span className="material-symbols-outlined text-[14px]">east</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <span className="hidden md:inline text-outline-variant shrink-0">|</span>
            <div className="hidden md:flex items-center gap-1.5 truncate">
              <span className="material-symbols-outlined text-[15px] text-tertiary-fixed-dim shrink-0">verified</span>
              <span className="text-secondary-fixed truncate">Licensed, Bonded &amp; Insured #48192-TX</span>
            </div>
          </div>

          {/* Right: Direct Local Phone & 24/7 Dispatch */}
          <div className="flex items-center gap-3 md:gap-4 text-xs shrink-0 whitespace-nowrap">
            <a
              className="hidden sm:flex items-center gap-1 text-secondary-fixed hover:text-tertiary-fixed-dim transition-colors font-semibold"
              href={`tel:${currentLocation.phone.replace(/[^0-9]/g, '')}`}
            >
              <span className="material-symbols-outlined text-[15px]">call</span>
              <span>{currentLocation.city}: {currentLocation.phone}</span>
            </a>
            <span className="hidden lg:inline text-outline-variant">|</span>
            <a
              className="hidden lg:flex items-center gap-1 hover:text-tertiary-fixed-dim transition-colors"
              href={`tel:${SITE_CONFIG.phoneRaw}`}
            >
              <span>National: {SITE_CONFIG.phone}</span>
            </a>
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-error/20 text-on-primary px-2 py-0.5 rounded font-label-caps text-label-caps">
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
              24/7 Storm Response
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full">
        <div className="h-20 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <Image
              src={SITE_CONFIG.logoUrl}
              alt="RoofPro USA Logo"
              width={38}
              height={38}
              className="h-9.5 w-9.5 object-contain shrink-0"
              priority
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-headline-sm text-headline-sm text-primary-container leading-none tracking-tight">
                RoofPro<span className="text-tertiary-fixed-dim font-bold">USA</span>
              </span>
              <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mt-0.5">
                Texas Premier Exterior
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Menu with clear spacing between items */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center justify-center gap-3 xl:gap-6 shrink-0"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg transition-colors font-label-lg text-sm whitespace-nowrap inline-flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-surface-container-high text-primary-container font-bold'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-tertiary-fixed-dim font-bold text-xs">{link.badge}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Primary CTA + AI Assistant */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact?type=estimate"
              className="bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-label-lg text-sm font-bold px-5 py-2.5 rounded-lg shadow-[0_2px_8px_rgba(231,184,60,0.3)] hover:shadow-[0_4px_14px_rgba(231,184,60,0.45)] transition-all inline-flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <span>Get Free Estimate</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>

            {/* AI Assistant Button */}
            <button
              type="button"
              onClick={openChat}
              title="RoofPro AI Booking & Voice Dispatch"
              className="hidden sm:flex w-10 h-10 rounded-full bg-primary hover:bg-primary-container items-center justify-center relative transition-colors cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">smart_toy</span>
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim absolute top-0 right-0 border-2 border-surface-container-lowest animate-pulse"></span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-primary-container hover:bg-surface-container transition-colors cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-[26px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-b border-outline-variant/40 shadow-xl px-4 py-4">
          {/* Location Picker on Mobile */}
          <div className="p-3 mb-4 rounded-xl bg-surface-container-low border border-outline-variant/50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-caps text-xs text-on-surface-variant font-bold">Select Active Texas Market:</span>
              <span className="text-xs text-secondary font-bold">Currently: {currentLocation.city}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {hubs.map((hub) => (
                <button
                  key={hub.slug}
                  onClick={() => {
                    handleSelectHub(hub.slug);
                  }}
                  className={`px-2 py-2 rounded text-xs text-left transition-colors flex items-center gap-1.5 cursor-pointer ${
                    selectedSlug === hub.slug
                      ? 'bg-primary-container text-on-primary font-bold'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${selectedSlug === hub.slug ? 'bg-tertiary-fixed-dim' : 'bg-outline'}`}></span>
                  <span>{hub.name.split('-')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1.5 mb-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-bold'
                      : 'text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-tertiary-fixed-dim font-bold text-xs">{link.badge}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* AI Voice Call & Chat in Mobile Menu */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openVoiceCall();
              }}
              className="py-2.5 px-3 rounded-lg bg-primary-container text-on-primary font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">phone_in_talk</span>
              <span>AI Voice Call</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openChat();
              }}
              className="py-2.5 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary-container font-bold text-xs flex items-center justify-center gap-1.5 border border-outline-variant/60 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary">smart_toy</span>
              <span>AI Chat Assistant</span>
            </button>
          </div>

          {/* Direct Call & Local Office Links in Mobile Menu */}
          <div className="pt-3 border-t border-surface-container flex flex-col gap-2">
            <a
              href={`tel:${currentLocation.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center justify-center gap-2 py-3 rounded-lg bg-surface-container text-primary-container font-bold text-sm"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">call</span>
              <span>Call {currentLocation.city} Office: {currentLocation.phone}</span>
            </a>
            <Link
              href="/contact?type=estimate"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 rounded-lg bg-tertiary-fixed-dim text-on-tertiary-fixed font-bold text-sm shadow"
            >
              <span>Get Free Roof Estimate</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
