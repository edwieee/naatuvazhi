'use client';

import React from 'react';
import Link from 'next/link';
import { KERALA_DISTRICTS } from '@/data/mock-districts';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function DistrictSelector() {
  const { t } = useLanguage();

  return (
    <section className="py-14 md:py-18 border-b border-[#e5e3d9]">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="max-w-3xl mb-10">
          <span className="font-mono text-[11px] text-[#aa3000] uppercase tracking-widest block mb-2 font-medium">
            {t('GEOGRAPHIC REGISTRY', 'ഭൂമിശാസ്ത്ര വിവരണം')}
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#1c1c16] mb-3 tracking-tight">
            {t('Explore Kerala by District', 'ജില്ല തിരിച്ചുള്ള പൈതൃക യാത്ര')}
          </h2>
          <p className="font-body text-sm sm:text-base text-[#5d5e61] leading-relaxed">
            {t(
              'Select any of Kerala’s 14 districts to filter sacred sites, regional dialects, and living art forms.',
              'ഓരോ ജില്ലയ്ക്കും സ്വന്തമായ ആചാരഭാഷയും കരകൗശല കൂട്ടായ്മകളുമുണ്ട്. കണ്ടെത്താൻ ജില്ല തിരഞ്ഞെടുക്കൂ.'
            )}
          </p>
        </div>

        {/* 14 Districts Grid from Stitch */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {KERALA_DISTRICTS.map((dist) => (
            <Link
              key={dist.code}
              href={`/explore?district=${encodeURIComponent(dist.name)}`}
              className="bg-white border border-[#D8D6CD] p-3 rounded-md hover:border-[#aa3000] hover:shadow-xs transition-all group flex flex-col justify-between h-28"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs font-bold text-[#1c1c16]">{dist.code}</span>
                <span className="font-mono text-[10px] bg-[#f0eee5] px-1.5 py-0.5 rounded-xs text-[#5d5e61] font-bold tabular-nums">
                  {dist.listingCount}
                </span>
              </div>
              <div>
                <h4 className="font-body text-sm font-semibold text-[#1c1c16] group-hover:text-[#aa3000] transition-colors leading-tight">
                  {dist.name}
                </h4>
                <span className="text-[11px] text-[#5d5e61] block italic">
                  {dist.nameMalayalam}
                </span>
                <span className="font-mono text-[10px] text-[#aa3000] truncate block mt-0.5">
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
