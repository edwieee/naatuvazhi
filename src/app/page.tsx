import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import CulturalCategories from '@/components/home/CulturalCategories';
import FeaturedListings from '@/components/home/FeaturedListings';
import UpcomingEventsRow from '@/components/home/UpcomingEventsRow';
import HowItWorks from '@/components/home/HowItWorks';
import DistrictSelector from '@/components/home/DistrictSelector';
import TrustSection from '@/components/home/TrustSection';

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col">
      {/* 1. Hero Section: Direct pitch, Theyyam living visual, dual primary CTAs */}
      <HeroSection />

      {/* 2. Cultural Heritage: 6 Core Cultural Dimensions Overview */}
      <CulturalCategories />

      {/* 3. Curated Cultural Heritage: Selected real stories, photos, category filter tabs */}
      <FeaturedListings />

      {/* 4. Cultural Calendar: Upcoming festivals, dates, locations, organisers, source links */}
      <UpcomingEventsRow />

      {/* 5. Methodology & Verification: 4-step workflow (Discover, Learn, Verify, Contribute) */}
      <HowItWorks />

      {/* 6. Geographic Registry: Explore Kerala district by district (Moved immediately after Methodology) */}
      <DistrictSelector />

      {/* 7 & 8. Community Verification Charter (5 standards) & Final Contribution CTA */}
      <TrustSection />
    </main>
  );
}
