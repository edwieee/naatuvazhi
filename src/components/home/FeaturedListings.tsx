'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_LISTINGS } from '@/data/mock-listings';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function FeaturedListings() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Ritual Art', 'Sacred Space', 'Traditional Craft', 'Cultural Institution', 'Martial Tradition'];

  const filteredListings = selectedCategory === 'All'
    ? MOCK_LISTINGS.slice(0, 6)
    : MOCK_LISTINGS.filter((l) => l.category === selectedCategory).slice(0, 6);

  return (
    <section className="py-16 md:py-24 border-b border-[#E8E2D6]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#5C554B] mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9041]"></span>
              <span>{t('CURATED CULTURAL HERITAGE', 'തിരഞ്ഞെടുത്ത പൈതൃക കേന്ദ്രങ്ങൾ')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#000000] tracking-tight">
              {t('Featured Living Traditions', 'പ്രധാന സാംസ്കാരിക കേന്ദ്രങ്ങൾ')}
            </h2>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#000000] hover:text-[#FF5931] transition-colors"
          >
            <span>{t('View complete directory', 'എല്ലാ കേന്ദ്രങ്ങളും കാണുക')}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FF9041]" />
          </Link>
        </div>

        {/* Filter Tags: Active in #FF9041, Inactive in warm surface with orange hover */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#FF9041] text-[#000000] font-semibold shadow-xs'
                  : 'bg-white hover:bg-[#FFF8F0] text-[#5C554B] hover:text-[#000000] border border-[#E8E2D6] hover:border-[#FF9041]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Link
              key={listing.id}
              href={`/culture/${listing.slug}`}
              className="group bg-white rounded-xl overflow-hidden border border-[#E8E2D6] hover:border-[#FF9041] transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Image Container with quiet, non-floating labels */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F3EFE8]">
                  <img
                    src={listing.imageUrl}
                    alt={listing.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-sm bg-[#000000]/85 text-white text-[10px] font-mono">
                      {listing.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-[#5C554B] mb-1">
                    <span>{listing.locality}, {listing.district}</span>
                    <span className="text-[#2D6A4F] font-medium flex items-center gap-1 text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{listing.verificationStatus}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-[#000000] group-hover:text-[#FF5931] transition-colors leading-snug">
                    {listing.name}
                  </h3>
                  <div className="text-xs text-[#5C554B] mt-0.5 mb-2 font-serif">
                    {listing.nameMalayalam}
                  </div>

                  <p className="text-xs text-[#5C554B] line-clamp-2 leading-relaxed">
                    {listing.shortDescription}
                  </p>
                </div>
              </div>

              {/* Card Footer: Signature Survey ID Tag */}
              <div className="px-5 py-3 border-t border-[#E8E2D6] bg-[#FFF9F0]/60 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-[#5C554B]">
                  № KL-{listing.district.substring(0, 3).toUpperCase()}-{listing.id.replace('c-', '')}
                </span>
                <span className="text-xs font-semibold text-[#000000] group-hover:text-[#FF5931] flex items-center gap-1 transition-colors">
                  <span>Read story</span>
                  <ArrowRight className="w-3 h-3 text-[#FF9041]" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
