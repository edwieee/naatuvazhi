'use client';

import React from 'react';
import Link from 'next/link';
import { KERALA_DISTRICTS } from '@/data/mock-districts';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function DistrictSelector() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 border-b border-[#E8E2D6]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="max-w-2xl mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5C554B] mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9041]"></span>
            <span>{t('GEOGRAPHIC REGISTRY', 'ഭൂമിശാസ്ത്ര വിവരണം')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#000000] tracking-tight">
            {t('Explore Kerala by District', 'ജില്ല തിരിച്ചുള്ള പൈതൃക യാത്ര')}
          </h2>
          <p className="text-xs sm:text-sm text-[#5C554B] mt-1.5 leading-relaxed">
            {t(
              'Select any of Kerala’s 14 districts to filter sacred sites, regional dialects, and living art forms.',
              'ഓരോ ജില്ലയ്ക്കും സ്വന്തമായ ആചാരഭാഷയും കരകൗശല കൂട്ടായ്മകളുമുണ്ട്. കണ്ടെത്താൻ ജില്ല തിരഞ്ഞെടുക്കൂ.'
            )}
          </p>
        </div>

        {/* 14 Districts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {KERALA_DISTRICTS.map((dist) => (
            <Link
              key={dist.code}
              href={`/explore?district=${encodeURIComponent(dist.name)}`}
              className="group bg-white rounded-md p-3.5 border border-[#E8E2D6] hover:border-[#FF9041] hover:bg-[#FFFDFB] transition-colors flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#5C554B] mb-1.5">
                  <span className="group-hover:text-[#FF5931] transition-colors">{dist.code}</span>
                  <span className="tabular-nums font-semibold text-[#FF9041]">{dist.listingCount}</span>
                </div>
                <h4 className="font-semibold text-xs text-[#000000] leading-tight group-hover:text-[#FF5931] transition-colors">
                  {dist.name}
                </h4>
                <div className="text-[11px] text-[#5C554B] font-serif">
                  {dist.nameMalayalam}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-[#E8E2D6] flex items-center justify-between text-[10px] text-[#5C554B]">
                <span className="truncate">{dist.primaryArtForms[0]}</span>
                <ArrowRight className="w-2.5 h-2.5 text-[#FF9041]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
