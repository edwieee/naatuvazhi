'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function TrustSection() {
  const { t } = useLanguage();

  return (
    <section className="py-14 md:py-20 bg-[#FCFBEF]" id="contribute">
      <div className="max-w-[1120px] mx-auto px-4 md:px-10 xl:px-0">
        <div className="bg-white border border-[#ded7c9] p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6 ambient-card-shadow rounded-lg">
          <div className="max-w-2xl">
            <span className="font-body text-xs font-semibold text-[#aa3000] block mb-2">
              {t('Community submissions', 'സമൂഹ പൈതൃക ശേഖരം')}
            </span>
            <h3 className="font-headline text-2xl sm:text-3xl font-semibold text-[#1c1c16] mb-3 tracking-tight">
              {t(
                "Help document Kerala's living culture",
                'കേരളത്തിന്റെ സാംസ്കാരിക ഭൂപടത്തിൽ പങ്കാളിയാകൂ'
              )}
            </h3>
            <p className="font-body text-sm text-[#5d5e61] leading-relaxed">
              {t(
                'Know a cultural place, artist, tradition or event that should be included? Share it with Nattuvazhi.',
                'നിങ്ങൾക്കറിയാവുന്ന ഒരു പൈതൃക കേന്ദ്രമോ, കലാകാരനെയോ, ഉത്സവമോ ഭൂപടത്തിലേക്ക് ചേർക്കാൻ വിവരങ്ങൾ പങ്കുവെക്കാം.'
              )}
            </p>
          </div>

          <Link
            href="/contribute"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#aa3000] hover:bg-[#c23700] text-white font-body text-sm font-semibold rounded-md transition-colors whitespace-nowrap shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t('Submit a discovery', 'പുതിയ വിവരം ചേർക്കൂ')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
