'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PROJECTS, LOCATIONS } from '@/constants/data';
import ProjectCard from '@/components/projects/ProjectCard';
import { useLocation } from '@/context/LocationContext';

export default function ProjectsPage() {
  const { currentLocation } = useLocation();
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string>('all');

  const locationOptions = [
    { value: 'all', label: 'All Texas Locations' },
    { value: 'dallas', label: 'Dallas-Fort Worth' },
    { value: 'houston', label: 'Greater Houston' },
    { value: 'austin', label: 'Austin & Hill Country' },
    { value: 'san-antonio', label: 'San Antonio Metro' }
  ];

  const serviceOptions = [
    { value: 'all', label: 'All Services' },
    { value: 'Roof Replacement', label: 'Roof Replacement' },
    { value: 'Roof Repair', label: 'Roof Repair' },
    { value: 'Storm Damage', label: 'Storm Damage' }
  ];

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesLoc = selectedLocation === 'all' || project.locationSlug === selectedLocation;
    const matchesSrv = selectedService === 'all' || project.service === selectedService;
    return matchesLoc && matchesSrv;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface-container-low to-surface py-16 lg:py-24 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-xs font-bold">
              <span className="material-symbols-outlined text-[16px]">photo_library</span>
              10,000+ Completed Installations
            </div>
            <h1 className="font-display-xl text-headline-lg lg:text-display-xl text-primary font-extrabold tracking-tight">
              Texas Residential Project Gallery
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Explore authentic completed roofing projects across Dallas, Houston, Austin, and San Antonio. Browse by region or service type to inspect our workmanship, materials, and architectural finishes.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Ribbon & Grid */}
      <section className="py-12 lg:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg">
          {/* Controls Bar */}
          <div className="p-4 md:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/50 shadow-sm mb-10 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="font-label-caps text-xs text-secondary font-bold uppercase tracking-wider">
                  Filter Completed Works
                </span>
                <div className="text-sm font-semibold text-primary-container">
                  Showing {filteredProjects.length} of {PROJECTS.length} verified projects
                </div>
              </div>

              {(selectedLocation !== 'all' || selectedService !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedLocation('all');
                    setSelectedService('all');
                  }}
                  className="self-start md:self-auto text-xs text-error hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">clear</span>
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-2">
              {/* Location Filter */}
              <div className="lg:col-span-6">
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">
                  Filter by Metro Region:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {locationOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSelectedLocation(opt.value)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                        selectedLocation === opt.value
                          ? 'bg-primary-container text-on-primary shadow-sm'
                          : 'bg-surface-container hover:bg-surface-container-high text-primary-container'
                      }`}
                    >
                      {opt.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Filter */}
              <div className="lg:col-span-6">
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">
                  Filter by Service:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {serviceOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSelectedService(opt.value)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                        selectedService === opt.value
                          ? 'bg-primary-container text-on-primary shadow-sm'
                          : 'bg-surface-container hover:bg-surface-container-high text-primary-container'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-surface-container-lowest border border-outline-variant/40 space-y-3">
              <span className="material-symbols-outlined text-[36px] text-on-surface-variant">search_off</span>
              <h3 className="font-headline-sm text-primary-container font-bold">No Projects Match Selected Filters</h3>
              <p className="text-sm text-on-surface-variant">Try selecting &ldquo;All Texas Locations&rdquo; or clearing the service filter.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedLocation('all');
                  setSelectedService('all');
                }}
                className="mt-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="py-16 bg-primary-container text-on-primary">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-md text-center space-y-4">
          <h2 className="font-headline-lg text-headline-sm md:text-headline-lg font-bold">
            Want Similar Results for Your Texas Home?
          </h2>
          <p className="font-body-md text-sm text-surface-container-high/90 max-w-xl mx-auto">
            Book a complimentary 21-point drone and attic inspection with our {currentLocation.city} hub.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?type=estimate"
              className="bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-label-lg font-bold px-8 py-3.5 rounded-lg shadow-lg inline-flex items-center gap-2"
            >
              <span>Get Free Roof Estimate</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
