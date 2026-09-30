'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { LOCATIONS } from '@/constants/data';
import { LocationInfo, LocationSlug } from '@/types';

interface LocationContextType {
  selectedSlug: LocationSlug;
  currentLocation: LocationInfo;
  setMarket: (slug: LocationSlug) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

function getSlugFromPathname(path: string): LocationSlug | null {
  if (path.includes('/locations/houston')) return 'houston';
  if (path.includes('/locations/austin')) return 'austin';
  if (path.includes('/locations/san-antonio')) return 'san-antonio';
  if (path.includes('/locations/dallas')) return 'dallas';
  return null;
}

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [userSelectedSlug, setUserSelectedSlug] = useState<LocationSlug>('dallas');

  const selectedSlug = useMemo<LocationSlug>(() => {
    const routeSlug = getSlugFromPathname(pathname);
    return routeSlug || userSelectedSlug;
  }, [pathname, userSelectedSlug]);

  const setMarket = (slug: LocationSlug) => {
    setUserSelectedSlug(slug);
  };

  const currentLocation = LOCATIONS[selectedSlug] || LOCATIONS.dallas;

  return (
    <LocationContext.Provider value={{ selectedSlug, currentLocation, setMarket }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
