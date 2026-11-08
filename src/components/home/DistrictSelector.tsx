'use client';

import React from 'react';
import Link from 'next/link';
import { Map, ArrowRight } from 'lucide-react';
import { KERALA_DISTRICTS } from '@/data/mock-districts';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function DistrictSelector() {
  const { t } = useLanguage();

  return (
    <section className="py-14 md:py-20 border-b border-[#e5e0d4] bg-[#fcfcec]" id="districts">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <span className="font-body text-xs font-semibold text-[#aa3000] block mb-2">
              {t('Geographic exploration', 'ഭൂമിശാസ്ത്ര വിവരണം')}
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#1c1c16] mb-3 tracking-tight">
              {t('Explore Kerala, district by district', 'ജില്ല തിരിച്ചുള്ള പൈതൃക യാത്ര')}
            </h2>
            <p className="font-body text-sm sm:text-base text-[#5d5e61] leading-relaxed">
              {t(
                'Find cultural places, artists, traditions and events across all 14 districts of Kerala.',
                'കേരളത്തിലെ 14 ജില്ലകളിലെയും പൈതൃക കേന്ദ്രങ്ങളും കലാരൂപങ്ങളും ഉത്സവങ്ങളും കണ്ടെത്താം.'
              )}
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#aa3000] hover:text-[#c23700] transition-colors whitespace-nowrap"
          >
            <Map className="w-4 h-4 text-[#aa3000]" />
            <span>{t('Open interactive map', 'ഭൂപടം തുറക്കുക')}</span>
            <ArrowRight className="w-4 h-4 text-[#aa3000]" />
          </Link>
        </div>

        {/* 14 Districts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {KERALA_DISTRICTS.map((dist) => (
            <Link
              key={dist.code}
              href={`/explore?district=${encodeURIComponent(dist.name)}`}
              className="bg-white border border-[#ded7c9] p-3.5 rounded-md hover:border-[#aa3000] hover:shadow-xs transition-colors group flex flex-col justify-between h-28"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs font-bold text-[#1c1c16]">{dist.code}</span>
                <span className="font-mono text-[10px] bg-[#f4efe4] border border-[#ded7c9] px-1.5 py-0.5 rounded-xs text-[#5d5e61] font-bold tabular-nums">
                  {dist.listingCount}
                </span>
              </div>
              <div>
                <h4 className="font-body text-sm font-semibold text-[#1c1c16] group-hover:text-[#aa3000] transition-colors leading-tight">
                  {dist.name}
                </h4>
                <span className="font-malayalam text-xs text-[#6e675d] block mt-0.5">
                  {dist.nameMalayalam}
                </span>
                <span className="font-body text-[11px] text-[#aa3000] truncate block mt-1 font-medium">
                  {dist.primaryArtForms[0]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
