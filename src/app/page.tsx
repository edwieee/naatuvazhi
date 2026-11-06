import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import FeaturedListings from '@/components/home/FeaturedListings';
import UpcomingEventsRow from '@/components/home/UpcomingEventsRow';
import DistrictSelector from '@/components/home/DistrictSelector';
import TrustSection from '@/components/home/TrustSection';

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col">
      {/* Hero Section with punchy headline & schedule preview card */}
      <HeroSection />

      {/* 4-Step Workflow Section (Discover, Learn, Verify, Contribute) */}
      <HowItWorks />

      {/* Featured Cultural Discoveries Grid */}
      <FeaturedListings />

      {/* Upcoming Cultural Events & Temple Festivals */}
      <UpcomingEventsRow />

      {/* 14 Districts Explorer */}
      <DistrictSelector />

      {/* Trust & Verification Charter and Community CTA */}
      <TrustSection />
    </main>
  );
}
