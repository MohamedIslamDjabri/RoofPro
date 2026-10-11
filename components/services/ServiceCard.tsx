'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ServiceItem } from '@/types';

interface ServiceCardProps {
  service: ServiceItem;
  currentCity?: string;
  index?: number;
}

export default function ServiceCard({ service, currentCity, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group flex flex-col justify-between p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-xl transition-shadow duration-300 border border-outline-variant/40"
    >
      <div className="space-y-4">
        <motion.div
          whileHover={{ scale: 1.08, rotate: -3 }}
          transition={{ type: 'spring', stiffness: 350, damping: 18 }}
          className="w-12 h-12 rounded-xl bg-surface-container-low text-primary-container flex items-center justify-center group-hover:bg-primary-container group-hover:text-on-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[28px]">{service.icon}</span>
        </motion.div>
        <h3 className="font-headline-sm text-title-md font-bold text-primary-container">
          {service.title}
        </h3>
        <p className="font-body-md text-body-sm text-on-surface-variant leading-relaxed">
          {service.shortDesc}
        </p>
      </div>

      <div className="pt-6 mt-6 border-t border-surface-container">
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="text-on-surface-variant font-medium">
            {currentCity ? `${currentCity} Regional Hub` : 'All 4 Texas Hubs'}
          </span>
          {service.priceStarting && (
            <span className="text-secondary font-semibold">{service.priceStarting}</span>
          )}
        </div>
        <Link
          className="inline-flex items-center gap-1.5 font-label-lg text-label-lg font-bold text-primary-container group-hover:text-secondary transition-colors"
          href={service.slug.startsWith('/') ? service.slug : `/${service.slug}`}
        >
          <span>Learn More &amp; Local Pricing</span>
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
