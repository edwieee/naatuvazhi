'use client';

import React from 'react';
import Link from 'next/link';
import { KERALA_DISTRICTS } from '@/data/mock-districts';
import { Compass, ArrowRight, MapPin } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function DistrictSelector() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FF5931] mb-2 font-mono">
            {t('GEOGRAPHIC REGISTRY', 'ഭൂമിശാസ്ത്ര വിവരണം')}
          </div>
          <h2 className="text-3xl font-extrabold text-stone-950 tracking-tight">
            {t('Explore Kerala by District', 'ജില്ല തിരിച്ചുള്ള പൈതൃക യാത്ര')}
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            {t(
              'Every district holds distinct ritual dialects, craft guilds, and oral histories. Select any district to filter the cultural map.',
              'ഓരോ ജില്ലയ്ക്കും സ്വന്തമായ ആചാരഭാഷയും കരകൗശല കൂട്ടായ്മകളുമുണ്ട്. കണ്ടെത്താൻ ജില്ല തിരഞ്ഞെടുക്കൂ.'
            )}
          </p>
        </div>

        {/* 14 Districts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {KERALA_DISTRICTS.map((dist) => (
            <Link
              key={dist.code}
              href={`/explore?district=${encodeURIComponent(dist.name)}`}
              className="group bg-white rounded-2xl p-4 border border-stone-200/90 hover:border-[#FF9041] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 group-hover:text-[#FF9041] transition-colors mb-2">
                  <span>{dist.code}</span>
                  <span className="font-semibold text-stone-600">{dist.listingCount}</span>
                </div>
                <h4 className="font-bold text-sm text-stone-900 group-hover:text-[#FF5931] transition-colors">
                  {dist.name}
                </h4>
                <div className="text-[11px] text-stone-500 font-medium">
                  {dist.nameMalayalam}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400 group-hover:text-stone-700">
                <span className="truncate">{dist.primaryArtForms[0]}</span>
                <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
