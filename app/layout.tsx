import type { Metadata } from 'next';
import './globals.css';
import { LocationProvider } from '@/context/LocationContext';
import { AIModalProvider } from '@/context/AIModalContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileStickyBar from '@/components/layout/MobileStickyBar';
import AIConciergeWidget from '@/components/ai/AIConciergeWidget';

export const metadata: Metadata = {
  title: 'RoofPro USA | Roofing Services Across Texas',
  description: 'National reach, local roofing experts. High-standard residential roof repair, full replacement, storm damage, and drone inspections across Dallas, Houston, Austin, and San Antonio.',
  openGraph: {
    title: 'RoofPro USA | Roofing Services Across Texas',
    description: 'National reach, local roofing experts. High-standard residential roof repair, full replacement, storm damage, and drone inspections across Dallas, Houston, Austin, and San Antonio.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RoofPro USA | Roofing Services Across Texas',
    description: 'National reach, local roofing experts. High-standard residential roof repair, full replacement, storm damage, and drone inspections across Dallas, Houston, Austin, and San Antonio.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen pb-16 sm:pb-0" suppressHydrationWarning>
        <LocationProvider>
          <AIModalProvider>
            <Header />
            <main className="w-full pt-29 bg-surface">
              {children}
            </main>
            <Footer />
            <MobileStickyBar />
            <AIConciergeWidget />
          </AIModalProvider>
        </LocationProvider>
      </body>
    </html>
  );
}
