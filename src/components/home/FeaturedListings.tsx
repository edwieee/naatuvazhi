'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_LISTINGS } from '@/data/mock-listings';
import { ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
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
            <div className="text-xs font-mono text-[#8C8273] mb-1">
              {t('CURATED CULTURAL HERITAGE', 'തിരഞ്ഞെടുത്ത പൈതൃക കേന്ദ്രങ്ങൾ')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#181512] tracking-tight">
              {t('Featured Living Traditions', 'പ്രധാന സാംസ്കാരിക കേന്ദ്രങ്ങൾ')}
            </h2>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#181512] hover:text-[#B21C01] transition-colors"
          >
            <span>{t('View complete directory', 'എല്ലാ കേന്ദ്രങ്ങളും കാണുക')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Filter Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#181512] text-white'
                  : 'bg-[#F3EFE8] hover:bg-[#EAE4D9] text-[#5C554B]'
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
              className="bg-white rounded-xl overflow-hidden border border-[#E8E2D6] hover:border-[#BFB5A5] transition-colors flex flex-col justify-between"
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
                    <span className="px-2 py-0.5 rounded-sm bg-[#181512]/85 text-white text-[10px] font-mono">
                      {listing.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-[#8C8273] mb-1">
                    <span>{listing.locality}, {listing.district}</span>
                    <span className="text-[#2D6A4F] font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{listing.verificationStatus}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-[#181512] hover:text-[#B21C01] transition-colors leading-snug">
                    {listing.name}
                  </h3>
                  <div className="text-xs text-[#8C8273] mt-0.5 mb-2 font-serif">
                    {listing.nameMalayalam}
                  </div>

                  <p className="text-xs text-[#5C554B] line-clamp-2 leading-relaxed">
                    {listing.shortDescription}
                  </p>
                </div>
              </div>

              {/* Card Footer: Signature Survey ID Tag */}
              <div className="px-5 py-3 border-t border-[#EDE7DC] bg-[#F8F5EE] flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-[#8C8273]">
                  № KL-{listing.district.substring(0, 3).toUpperCase()}-{listing.id.replace('c-', '')}
                </span>
                <span className="text-xs font-medium text-[#181512] flex items-center gap-1">
                  <span>Read story</span>
                  <ArrowRight className="w-3 h-3 text-[#8C8273]" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
