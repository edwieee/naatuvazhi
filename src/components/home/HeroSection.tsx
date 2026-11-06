'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle, ArrowRight, CheckCircle2, Navigation } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative pt-12 md:pt-20 pb-16 md:pb-24 border-b border-[#E8E2D6]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Narrative & Primary Actions */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            {/* Minimal Eyebrow Label with small orange indicator dot */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#5C554B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9041]"></span>
              <span>Kerala Cultural Cartography · Public Open Archive</span>
            </div>

            {/* Headline: Black typography, preserving size & line-height */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-[#000000] leading-[1.1] tracking-tight">
              {t(
                'Discover the culture that lives around you.',
                'നിങ്ങൾക്ക് ചുറ്റും ജീവിക്കുന്ന സംസ്കാരം കണ്ടെത്തൂ.'
              )}
            </h1>

            {/* Subtitle / Description in dark neutral grey */}
            <p className="text-base sm:text-lg text-[#5C554B] leading-relaxed max-w-xl">
              {t(
                'A community-informed, scholar-verified living map of Kerala’s sacred groves, ritual performing arts, master practitioners, and craft guilds.',
                'നാട്ടുവഴി — കേരളത്തിന്റെ സാംസ്കാരിക ഭൂപടം. ക്ഷേത്രകലകൾ, കാവുകൾ, പാരമ്പര്യ കരകൗശലങ്ങൾ, നാട്ടുവിജ്ഞാനം എന്നിവയെ തൊട്ടറിയാൻ ഒരു കൂട്ടായ ഉദ്യമം.'
              )}
            </p>

            {/* Dual CTA Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary CTA: Background #FF9041 with dark text */}
              <Link
                href="/explore"
                className="rounded-md bg-[#FF9041] hover:bg-[#f2812f] text-[#000000] font-semibold text-sm px-6 py-3 transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>{t('Explore the directory', 'ഭൂപടം തുറക്കുക')}</span>
                <ArrowRight className="w-4 h-4 text-[#000000]" />
              </Link>

              {/* Secondary CTA: White background, thin border, black text, orange icon */}
              <Link
                href="/contribute"
                className="rounded-md border border-[#E8E2D6] hover:border-[#FF9041] bg-white hover:bg-[#FFF8F0] text-[#000000] font-medium text-sm px-5 py-3 transition-colors flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-[#FF9041]" />
                <span>{t('Submit a discovery', 'പുതിയ കേന്ദ്രം സമർപ്പിക്കൂ')}</span>
              </Link>
            </div>

            {/* Verification Line with small orange icon */}
            <div className="pt-2 flex items-center gap-2 text-xs text-[#5C554B]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF9041] flex-shrink-0" />
              <span>
                {t(
                  'Verified against folklore academy archives and local hereditary custodians',
                  'നാട്ടറിവ് വിദഗ്ദ്ധരും ഫോക്‌ലോർ പണ്ഡിതരും പരിശോധിച്ചു ഉറപ്പുവരുത്തിയത്'
                )}
              </span>
            </div>
          </div>

          {/* Right Column: Restyled Field Itinerary Card (Orange Palette Refinement) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-xl border border-[#E8E2D6] shadow-xs overflow-hidden flex flex-col">
              {/* Card Header Bar with subtle golden-orange background */}
              <div className="bg-[#FFF9F0] border-b border-[#E8E2D6] px-5 py-3 flex items-center justify-between text-xs">
                <span className="font-mono text-[#5C554B] font-medium">FIELD ITINERARY SURVEY</span>
                <span className="font-mono text-[#FF5931] font-semibold">№ KL-SURVEY-26</span>
              </div>

              {/* Itinerary Rows */}
              <div className="divide-y divide-[#E8E2D6] p-2">
                <div className="p-3 flex items-start justify-between gap-3 hover:bg-[#FFF9F0]/60 transition-colors rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#FFF2E0] border border-[#FFB658]/40 flex items-center justify-center text-[10px] font-mono font-bold text-[#FF9041]">
                        01
                      </span>
                      <h4 className="text-xs font-semibold text-[#000000]">
                        Parassini Muthappan Vellattam
                      </h4>
                    </div>
                    <span className="text-[11px] text-[#5C554B] block pl-7">
                      Valapattanam Riverbank, Kannur
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#5C554B] tabular-nums">05:45</span>
                </div>

                <div className="p-3 flex items-start justify-between gap-3 hover:bg-[#FFF9F0]/60 transition-colors rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#FFF2E0] border border-[#FFB658]/40 flex items-center justify-center text-[10px] font-mono font-bold text-[#FF9041]">
                        02
                      </span>
                      <h4 className="text-xs font-semibold text-[#000000]">
                        Kalamandalam Koodiyattam
                      </h4>
                    </div>
                    <span className="text-[11px] text-[#5C554B] block pl-7">
                      Koothambalam, Cheruthuruthy
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#5C554B] tabular-nums">09:30</span>
                </div>

                <div className="p-3 flex items-start justify-between gap-3 hover:bg-[#FFF9F0]/60 transition-colors rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#FFF2E0] border border-[#FFB658]/40 flex items-center justify-center text-[10px] font-mono font-bold text-[#FF9041]">
                        03
                      </span>
                      <h4 className="text-xs font-semibold text-[#000000]">
                        Aranmula Metal Mirror Casting
                      </h4>
                    </div>
                    <span className="text-[11px] text-[#5C554B] block pl-7">
                      Vishwakarma Guild, Pathanamthitta
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#5C554B] tabular-nums">14:15</span>
                </div>

                <div className="p-3 flex items-start justify-between gap-3 hover:bg-[#FFF9F0]/60 transition-colors rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#FFF2E0] border border-[#FFB658]/40 flex items-center justify-center text-[10px] font-mono font-bold text-[#FF9041]">
                        04
                      </span>
                      <h4 className="text-xs font-semibold text-[#000000]">
                        Mannarasala Sarpam Thullal
                      </h4>
                    </div>
                    <span className="text-[11px] text-[#5C554B] block pl-7">
                      Sacred Grove, Haripad
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#5C554B] tabular-nums">18:00</span>
                </div>
              </div>

              {/* Bottom Information Bar with subtle orange accent */}
              <div className="px-5 py-3 bg-[#FDFBF7] border-t border-[#E8E2D6] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF9041]"></span>
                  <span className="font-medium text-[#000000]">Field-verified corridor</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#FF9041]">
                  <Navigation className="w-3 h-3 text-[#FF9041]" />
                  <span>Kannur → Alappuzha</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
