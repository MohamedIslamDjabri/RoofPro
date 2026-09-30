'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLocation } from '@/context/LocationContext';
import { useAIModal } from '@/context/AIModalContext';
import { SITE_CONFIG, NAV_LINKS, LOCATIONS } from '@/constants/data';
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-[0_2px_12px_rgba(18,55,42,0.06)] border-b border-outline-variant/30">
      {/* Top Banner Bar */}
      <div className="bg-primary-container text-on-primary font-label-md text-label-md border-b border-outline/20">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg h-9 flex items-center justify-between">
          <div className="flex items-center gap-space-sm text-xs">
            <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">verified</span>
            <span>Serving Texas Homeowners: Dallas, Houston, Austin &amp; San Antonio</span>
            <span className="hidden lg:inline text-outline-variant">|</span>
            <span className="hidden lg:inline text-secondary-fixed">Licensed, Bonded &amp; Insured #48192-TX</span>
          </div>
          <div className="flex items-center gap-space-md text-xs">
            <a
              className="flex items-center gap-space-xs hover:text-tertiary-fixed-dim transition-colors"
              href={`tel:${SITE_CONFIG.phoneRaw}`}
            >
              <span className="material-symbols-outlined text-[15px]">call</span>
              <span>Dispatch: {SITE_CONFIG.phone}</span>
            </a>
            <span className="hidden sm:inline-flex items-center gap-space-xs bg-error/20 text-on-primary px-2 py-0.5 rounded font-label-caps text-label-caps">
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
              24/7 Storm Response
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg flex items-center justify-between gap-gutter">
        <div className="flex items-center gap-space-lg">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-space-sm group shrink-0">
            <Image
              src={SITE_CONFIG.logoUrl}
              alt="RoofPro USA Logo"
              width={160}
              height={32}
              className="h-8 w-auto object-contain"
              priority
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary-container leading-none tracking-tight">
                RoofPro<span className="text-tertiary-fixed-dim font-bold">USA</span>
              </span>
              <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">
                Texas Premier Exterior
              </span>
            </div>
          </Link>

          {/* Regional Hub Selector Dropdown (Desktop) */}
          <div className="relative hidden xl:block">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-space-xs px-3 py-1.5 rounded-lg bg-surface-container-low text-primary-container border border-outline-variant/60 hover:bg-surface-container hover:text-primary transition-all font-label-md text-label-md shadow-[0_1px_4px_rgba(18,55,42,0.04)] cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="material-symbols-outlined text-[18px] text-secondary">location_on</span>
              <span className="font-title-md text-label-lg">Serving: {currentLocation.city}, TX</span>
              <span className={`material-symbols-outlined text-[16px] text-on-surface-variant transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full pt-2 w-76 z-50 animate-fadeIn">
                <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0_16px_32px_rgba(18,55,42,0.12)] border border-outline-variant/60">
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
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg transition-colors font-label-lg text-label-lg ${
                  isActive
                    ? 'bg-surface-container-high text-primary-container font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="text-tertiary-fixed-dim font-bold text-xs ml-1">{link.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-space-md shrink-0">
          {/* Direct Phone Call */}
          <a
            className="hidden md:flex items-center gap-space-xs text-primary-container hover:text-secondary font-label-lg text-label-lg px-2 py-1 rounded transition-colors"
            href={`tel:${currentLocation.phone.replace(/[^0-9]/g, '')}`}
            title={`Call local ${currentLocation.city} dispatch`}
          >
            <span className="material-symbols-outlined text-[20px] text-secondary">call</span>
            <span className="font-bold">{currentLocation.phone}</span>
          </a>

          {/* Primary CTA */}
          <Link
            href="/contact?type=estimate"
            className="bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-label-lg text-label-lg font-bold px-4 py-2.5 rounded-lg shadow-[0_2px_8px_rgba(231,184,60,0.3)] hover:shadow-[0_4px_14px_rgba(231,184,60,0.45)] transition-all flex items-center gap-space-xs"
          >
            <span>Get Free Estimate</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>

          {/* AI Assistant Avatar Button */}
          <div className="hidden sm:flex items-center pl-2">
            <button
              type="button"
              onClick={openChat}
              title="RoofPro AI Booking & Voice Dispatch"
              className="w-8 h-8 rounded-full bg-primary hover:bg-primary-container flex items-center justify-center relative transition-colors cursor-pointer group"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">smart_toy</span>
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim absolute -top-0.5 -right-0.5 border-2 border-surface-container-lowest animate-pulse"></span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-primary-container hover:bg-surface-container transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-b border-outline-variant/40 shadow-xl px-margin py-4">
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
          <nav className="flex flex-col space-y-1 mb-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
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
