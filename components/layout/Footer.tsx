'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocation } from '@/context/LocationContext';
import { SITE_CONFIG, LOCATIONS } from '@/constants/data';

export default function Footer() {
  const { currentLocation, setMarket } = useLocation();

  return (
    <footer className="w-full bg-primary-container text-surface-container-high border-t border-outline/20">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter lg:gap-gutter-lg">
          {/* Brand Col */}
          <div className="space-y-space-md">
            <Link href="/" className="flex items-center gap-space-sm group">
              <Image
                src={SITE_CONFIG.logoUrl}
                alt="RoofPro USA Logo"
                width={160}
                height={32}
                className="h-8 w-auto object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-primary leading-none">
                  RoofPro<span className="text-tertiary-fixed-dim font-bold">USA</span>
                </span>
                <span className="font-label-caps text-label-caps text-primary-fixed-dim uppercase tracking-wider">
                  Texas Residential Roofing
                </span>
              </div>
            </Link>
            <p className="font-body-sm text-body-sm text-surface-container-high/85 leading-relaxed">
              National reach. Local roofing experts delivering high-standard residential roofing solutions throughout Texas communities.
            </p>
            <div className="pt-2 space-y-space-xs font-label-md text-label-md">
              <div className="flex items-center gap-2 text-primary-fixed">
                <span className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim">shield</span>
                <span>{SITE_CONFIG.license}</span>
              </div>
              <div className="flex items-center gap-2 text-primary-fixed">
                <span className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim">verified_user</span>
                <span>BBB A+ Accredited Contractor</span>
              </div>
            </div>
          </div>

          {/* Roofing Services */}
          <div className="space-y-space-sm">
            <h3 className="font-title-md text-title-md text-on-primary font-bold tracking-tight pb-1 border-b border-primary-fixed-variant/40">
              Roofing Services
            </h3>
            <ul className="space-y-2 font-body-sm text-body-sm text-surface-container-high/80">
              <li className="hover:text-on-primary transition-colors">
                <Link className="flex items-center gap-2" href="/roof-repair">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">chevron_right</span>
                  Roof Repair &amp; Patching
                </Link>
              </li>
              <li className="hover:text-on-primary transition-colors">
                <Link className="flex items-center gap-2" href="/roof-replacement">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">chevron_right</span>
                  Roof Replacement &amp; Reroof
                </Link>
              </li>
              <li className="hover:text-on-primary transition-colors">
                <Link className="flex items-center gap-2" href="/storm-damage">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">chevron_right</span>
                  Storm Damage Restoration
                </Link>
              </li>
              <li className="hover:text-on-primary transition-colors">
                <Link className="flex items-center gap-2" href="/services">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">chevron_right</span>
                  Roof Inspection &amp; Drone Scans
                </Link>
              </li>
              <li className="hover:text-on-primary transition-colors">
                <Link className="flex items-center gap-2" href="/services">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">chevron_right</span>
                  Emergency Tarping &amp; Repair
                </Link>
              </li>
              <li className="hover:text-on-primary transition-colors">
                <Link className="flex items-center gap-2" href="/services">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">chevron_right</span>
                  Residential Shingle &amp; Tile Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Texas Local Branches */}
          <div className="space-y-space-sm">
            <h3 className="font-title-md text-title-md text-on-primary font-bold tracking-tight pb-1 border-b border-primary-fixed-variant/40">
              Texas Local Branches
            </h3>
            <div className="space-y-3 font-body-sm text-body-sm text-surface-container-high/80">
              {Object.values(LOCATIONS).map((loc) => (
                <div key={loc.slug} className="group">
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="font-label-lg text-label-lg text-on-primary font-semibold flex items-center gap-1 group-hover:text-tertiary-fixed-dim transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">location_on</span>
                    {loc.city} Office {loc.slug === 'dallas' ? '(HQ)' : ''}
                  </Link>
                  <p className="text-xs text-surface-container-high/70 pl-5">{loc.address}</p>
                  <a
                    href={`tel:${loc.phone.replace(/[^0-9]/g, '')}`}
                    className="text-xs font-semibold text-primary-fixed pl-5 hover:underline block"
                  >
                    {loc.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links & CTA */}
          <div className="space-y-space-sm">
            <h3 className="font-title-md text-title-md text-on-primary font-bold tracking-tight pb-1 border-b border-primary-fixed-variant/40">
              Quick Links &amp; Care
            </h3>
            <ul className="space-y-2 font-body-sm text-body-sm text-surface-container-high/80">
              <li className="hover:text-on-primary transition-colors">
                <Link className="flex items-center gap-2" href="/contact?type=estimate">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">assignment</span>
                  Request Free Estimate
                </Link>
              </li>
              <li className="hover:text-on-primary transition-colors">
                <Link className="flex items-center gap-2" href="/reviews">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">verified</span>
                  Verified Reviews &amp; Ratings
                </Link>
              </li>
              <li className="hover:text-on-primary transition-colors">
                <Link className="flex items-center gap-2" href="/storm-damage">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">receipt_long</span>
                  Insurance Claim Assistance
                </Link>
              </li>
              <li className="hover:text-on-primary transition-colors">
                <Link className="flex items-center gap-2" href="/projects">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">photo_library</span>
                  Texas Completed Projects
                </Link>
              </li>
              <li className="hover:text-on-primary transition-colors">
                <Link className="flex items-center gap-2" href="/about">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">info</span>
                  About RoofPro USA
                </Link>
              </li>
            </ul>
            <div className="pt-3">
              <Link
                className="w-full block text-center bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md font-bold py-2.5 px-4 rounded-lg shadow transition-all"
                href="/contact?type=inspection"
              >
                Schedule Roof Inspection
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-primary-fixed-variant/30 bg-primary/40">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg py-4 flex flex-col md:flex-row items-center justify-between gap-space-md text-xs text-surface-container-high/70">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span>© 2025 RoofPro USA Inc. All Rights Reserved.</span>
            <Link className="hover:text-on-primary transition-colors" href="/about">
              Privacy Policy
            </Link>
            <Link className="hover:text-on-primary transition-colors" href="/about">
              Terms of Service
            </Link>
            <Link className="hover:text-on-primary transition-colors" href="/locations">
              Sitemap
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[15px] text-tertiary-fixed-dim">near_me</span>
            <span>
              Your Selected Hub: <strong className="text-on-primary">{currentLocation.displayName}, TX</strong>
            </span>
            <Link className="text-tertiary-fixed-dim hover:underline font-semibold ml-1" href="/locations">
              (Switch)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
