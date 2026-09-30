import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LOCATIONS } from '@/constants/data';
import { LocationSlug } from '@/types';
import LocationDetailView from '@/components/locations/LocationDetailView';

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(LOCATIONS).map((slug) => ({
    city: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const location = LOCATIONS[city as LocationSlug];

  if (!location) {
    return {
      title: 'Location Not Found | RoofPro USA',
      description: 'The requested Texas roofing location could not be found.',
    };
  }

  return {
    title: location.seoTitle,
    description: location.seoDescription,
    openGraph: {
      title: location.seoTitle,
      description: location.seoDescription,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: location.seoTitle,
      description: location.seoDescription,
    }
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { city } = await params;
  const location = LOCATIONS[city as LocationSlug];

  if (!location) {
    notFound();
  }

  return <LocationDetailView location={location} />;
}
