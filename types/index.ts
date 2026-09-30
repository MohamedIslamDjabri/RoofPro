export type LocationSlug = 'dallas' | 'houston' | 'austin' | 'san-antonio';

export interface Project {
  id: string;
  title: string;
  city: string;
  state: string;
  locationSlug: LocationSlug;
  service: string;
  projectType: string;
  description: string;
  image: string;
  imageAlt: string;
  areaSqFt?: string;
  completionTime?: string;
  warranty?: string;
  systemDetails?: string;
  featured?: boolean;
}

export interface Review {
  id: string;
  name: string;
  city: string;
  state: string;
  locationSlug: LocationSlug;
  service: string;
  rating: number;
  text: string;
  date?: string;
  verified: boolean;
}

export interface LocationInfo {
  slug: LocationSlug;
  city: string;
  state: string;
  displayName: string;
  regionalTag: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  headline: string;
  heroDescription: string;
  localSuburbsText: string;
  nearbyAreas: string[];
  stats: {
    completedProjects: string;
    activeCrews: number;
    rating: string;
    reviewCount: number;
  };
  services: string[];
  localAlert?: string;
  mapCoords: {
    lat: number;
    lng: number;
    zoom: number;
  };
  seoTitle: string;
  seoDescription: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  priceStarting?: string;
  warrantyInfo?: string;
  features: string[];
  image: string;
}
