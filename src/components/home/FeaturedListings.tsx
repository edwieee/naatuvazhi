'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_LISTINGS } from '@/data/mock-listings';
import { Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function FeaturedListings() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Ritual Art', 'Sacred Space', 'Traditional Craft', 'Cultural Institution', 'Martial Tradition'];

  const filteredListings = selectedCategory === 'All'
    ? MOCK_LISTINGS.slice(0, 6)
    : MOCK_LISTINGS.filter((l) => l.category === selectedCategory).slice(0, 6);

  return (
    <section className="py-14 md:py-20 border-b border-[#e5e0d4]" id="directory">
      <div className="max-w-[1120px] mx-auto px-4 md:px-10 xl:px-0">
        {/* Section Header with Archive Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <span className="font-body text-xs font-semibold text-[#aa3000] block mb-2">
              {t('Curated cultural heritage', 'തിരഞ്ഞെടുത്ത പൈതൃക കേന്ദ്രങ്ങൾ')}
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#1c1c16] tracking-tight mb-2">
              {t('Selected cultural stories across Kerala', 'പ്രധാന സാംസ്കാരിക കഥകളും കേന്ദ്രങ്ങളും')}
            </h2>
            <p className="font-body text-sm text-[#5d5e61] leading-relaxed">
              {t(
                'Explore detailed entries with background stories, verified locations, photographs and original source citations.',
                'വിശദമായ പശ്ചാത്തല ചരിത്രം, സ്ഥിരീകരിച്ച വിവരങ്ങൾ, യഥാർത്ഥ വിവരസ്രോതസ്സുകൾ എന്നിവയോടൊപ്പം.'
              )}
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-[#aa3000] hover:text-[#c23700] transition-colors whitespace-nowrap"
          >
            <span>{t('View complete directory', 'എല്ലാ കേന്ദ്രങ്ങളും കാണുക')}</span>
            <ArrowRight className="w-4 h-4 text-[#aa3000]" />
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#e5e0d4]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 font-body text-xs rounded-md flex items-center gap-2 transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#26221e] text-[#fcf9f0] shadow-xs font-medium'
                  : 'bg-[#f6f3eb] hover:bg-[#ede7da] text-[#5d5e61] hover:text-[#1c1c16] border border-[#ded7c9]'
              }`}
            >
              {selectedCategory === cat && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#aa3000]"></span>
              )}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* 6 Curated Cultural Cards in 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Link
              key={listing.id}
              href={`/culture/${listing.slug}`}
              className="bg-white border border-[#ded7c9] rounded-lg overflow-hidden flex flex-col group hover:border-[#26221e] transition-colors ambient-card-shadow"
            >
              <div className="relative h-48 bg-[#f0eee5] overflow-hidden">
                <img
                  src={listing.imageUrl}
                  alt={listing.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute top-3 left-3 bg-[#26221e]/90 text-[#fcf9f0] px-2.5 py-0.5 rounded-sm font-body text-[11px] font-medium">
                  {listing.category}
                </div>
                <div className="absolute bottom-3 left-3 bg-[#fcfcec]/95 backdrop-blur-xs px-2.5 py-0.5 rounded-sm font-body text-[11px] text-[#1c1c16] border border-[#ded7c9]">
                  {listing.locality}, {listing.district}
                </div>
                <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-body text-[11px] font-medium text-[#aa3000] shadow-xs">
                  <Check className="w-3.5 h-3.5 text-[#aa3000]" />
                  <span>{listing.verificationStatus}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline text-lg font-semibold text-[#1c1c16] mb-1 group-hover:text-[#aa3000] transition-colors leading-snug">
                    {listing.name}
                  </h3>
                  <p className="font-malayalam text-xs text-[#6e675d] mb-3">
                    {listing.nameMalayalam}
                  </p>
                  <p className="font-body text-xs text-[#5d5e61] leading-relaxed line-clamp-2">
                    {listing.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#ece6da] flex items-center justify-between">
                  <span className="font-mono text-xs text-[#6e675d] bg-[#f4efe4] px-2 py-0.5 rounded-xs border border-[#ded7c9] tabular-nums">
                    № KL-{listing.district.substring(0, 3).toUpperCase()}-{listing.id.replace('c-', '')}
                  </span>
                  <span className="font-body text-xs text-[#aa3000] group-hover:text-[#c23700] flex items-center gap-1 font-semibold">
                    <span>{t('Read story', 'വായിക്കുക')}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#aa3000]" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
