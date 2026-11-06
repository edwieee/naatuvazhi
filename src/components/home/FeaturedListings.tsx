'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_LISTINGS } from '@/data/mock-listings';
import { ShieldCheck, MapPin, ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function FeaturedListings() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Ritual Art', 'Sacred Space', 'Traditional Craft', 'Cultural Institution', 'Martial Tradition'];

  const filteredListings = selectedCategory === 'All'
    ? MOCK_LISTINGS.slice(0, 6)
    : MOCK_LISTINGS.filter((l) => l.category === selectedCategory).slice(0, 6);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section Header with Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#FF5931] mb-2 font-mono">
              {t('CURATED CULTURAL HERITAGE', 'തിരഞ്ഞെടുത്ത പൈതൃക കേന്ദ്രങ്ങൾ')}
            </div>
            <h2 className="text-3xl font-extrabold text-stone-950 tracking-tight">
              {t('Featured Living Traditions', 'പ്രധാന സാംസ്കാരിക കേന്ദ്രങ്ങൾ')}
            </h2>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 hover:text-[#FF5931] transition-colors group"
          >
            <span>{t('View all in directory', 'എല്ലാ കേന്ദ്രങ്ങളും കാണുക')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredListings.map((listing) => (
            <Link
              key={listing.id}
              href={`/culture/${listing.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-xl hover:border-stone-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Badge */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={listing.imageUrl}
                    alt={listing.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-stone-900 shadow-xs">
                      {listing.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-900/85 backdrop-blur-md text-white text-[11px] font-medium">
                    <MapPin className="w-3 h-3 text-[#FFB658]" />
                    <span>{listing.district}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                    <span>{listing.locality}</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {listing.verificationStatus}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#FF5931] transition-colors leading-snug">
                    {listing.name}
                  </h3>
                  <div className="text-xs text-stone-500 font-medium mt-0.5 mb-3">
                    {listing.nameMalayalam}
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {listing.shortDescription}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between text-xs font-semibold text-stone-700 group-hover:text-black">
                <span>Explore story & lineage</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#FF9041] transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
