'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative border-b border-[#e5e0d4] bg-[#fcf9f0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Archive Pitch */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Subtle Eyebrow Label */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#aa3000]"></span>
              <span className="font-body text-xs font-medium text-[#7d3b24] tracking-normal">
                {t('Kerala cultural cartography · Public open archive', 'കേരള സാംസ്കാരിക ഭൂപടം · പബ്ലിക് ഓപ്പൺ ആർക്കൈവ്')}
              </span>
            </div>

            {/* Display Headline without trailing period */}
            <h1 className="font-headline text-4xl sm:text-5xl lg:text-[54px] lg:leading-[1.12] text-[#1c1c16] mb-5 tracking-tight font-medium">
              {t(
                'Discover the culture that lives around you',
                'നിങ്ങൾക്ക് ചുറ്റും ജീവിക്കുന്ന സംസ്കാരം കണ്ടെത്തൂ'
              )}
            </h1>

            {/* Supporting Description */}
            <p className="font-body text-base sm:text-lg text-[#5d5e61] mb-8 max-w-xl leading-relaxed">
              {t(
                'A community-informed, scholar-verified living map of Kerala’s sacred groves, ritual performing arts, master practitioners, and craft guilds.',
                'നാട്ടുവഴി — കേരളത്തിന്റെ സാംസ്കാരിക ഭൂപടം. ക്ഷേത്രകലകൾ, കാവുകൾ, പാരമ്പര്യ കരകൗശലങ്ങൾ, നാട്ടുവിജ്ഞാനം എന്നിവയെ തൊട്ടറിയാൻ ഒരു കൂട്ടായ ഉദ്യമം.'
              )}
            </p>

            {/* Quiet, Well-balanced Dual CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <Link
                href="/explore"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#aa3000] hover:bg-[#c23700] text-white font-body font-medium text-sm rounded-md transition-colors shadow-xs"
              >
                <span>{t('Explore the directory', 'ഭൂപടം തുറക്കുക')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contribute"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#f6f3eb] hover:bg-[#ede7da] border border-[#ded7c9] text-[#1c1c16] font-body font-medium text-sm rounded-md transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-[#aa3000]" />
                <span>{t('Submit a discovery', 'പുതിയ കേന്ദ്രം സമർപ്പിക്കൂ')}</span>
              </Link>
            </div>

            {/* Trust Line with proper typography */}
            <div className="pt-5 border-t border-[#e5e0d4] flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#aa3000] flex-shrink-0" />
              <p className="font-body text-xs sm:text-sm text-[#5d5e61]">
                {t(
                  'Verified against folklore academy archives and local hereditary custodians',
                  'നാട്ടറിവ് വിദഗ്ദ്ധരും ഫോക്‌ലോർ പണ്ഡിതരും പരിശോധിച്ചു ഉറപ്പുവരുത്തിയത്'
                )}
              </p>
            </div>
          </div>

          {/* Right Column: Tactile Field Itinerary Ledger */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white border border-[#ded7c9] ambient-card-shadow overflow-hidden rounded-lg">
              {/* Card Header */}
              <div className="bg-[#26221e] text-[#fcf9f0] px-5 py-3.5 flex items-center justify-between border-b border-[#38332c]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#e65c00]"></span>
                  <span className="font-body text-xs font-semibold text-[#ded8cd] tracking-normal">
                    Field itinerary survey
                  </span>
                </div>
                <span className="font-mono text-xs text-[#d8d1c2] bg-[#3a342d] px-2 py-0.5 rounded-xs tabular-nums">
                  № KL-SURVEY-26
                </span>
              </div>

              {/* Waypoints List with balanced padding & tabular figures */}
              <div className="divide-y divide-[#ece6da]">
                {/* Item 01 */}
                <div className="p-4 hover:bg-[#faf7f0] transition-colors group">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-[#aa3000] font-semibold mt-0.5 tabular-nums">
                        01
                      </span>
                      <div>
                        <h4 className="font-body text-sm font-semibold text-[#1c1c16] group-hover:text-[#aa3000] transition-colors leading-snug">
                          Parassini Muthappan Vellattam
                        </h4>
                        <p className="font-body text-xs text-[#6e675d] mt-0.5">
                          Valapattanam Riverbank, Kannur
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#26221e] font-medium bg-[#f3ede1] px-2 py-0.5 rounded-xs tabular-nums border border-[#ded7c9] flex-shrink-0">
                      05:45
                    </span>
                  </div>
                </div>

                {/* Item 02 */}
                <div className="p-4 hover:bg-[#faf7f0] transition-colors group">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-[#aa3000] font-semibold mt-0.5 tabular-nums">
                        02
                      </span>
                      <div>
                        <h4 className="font-body text-sm font-semibold text-[#1c1c16] group-hover:text-[#aa3000] transition-colors leading-snug">
                          Kalamandalam Koodiyattam
                        </h4>
                        <p className="font-body text-xs text-[#6e675d] mt-0.5">
                          Koothambalam, Cheruthuruthy
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#26221e] font-medium bg-[#f3ede1] px-2 py-0.5 rounded-xs tabular-nums border border-[#ded7c9] flex-shrink-0">
                      09:30
                    </span>
                  </div>
                </div>

                {/* Item 03 */}
                <div className="p-4 hover:bg-[#faf7f0] transition-colors group">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-[#aa3000] font-semibold mt-0.5 tabular-nums">
                        03
                      </span>
                      <div>
                        <h4 className="font-body text-sm font-semibold text-[#1c1c16] group-hover:text-[#aa3000] transition-colors leading-snug">
                          Aranmula Metal Mirror Casting
                        </h4>
                        <p className="font-body text-xs text-[#6e675d] mt-0.5">
                          Vishwakarma Guild, Pathanamthitta
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#26221e] font-medium bg-[#f3ede1] px-2 py-0.5 rounded-xs tabular-nums border border-[#ded7c9] flex-shrink-0">
                      14:15
                    </span>
                  </div>
                </div>

                {/* Item 04 */}
                <div className="p-4 hover:bg-[#faf7f0] transition-colors group">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-[#aa3000] font-semibold mt-0.5 tabular-nums">
                        04
                      </span>
                      <div>
                        <h4 className="font-body text-sm font-semibold text-[#1c1c16] group-hover:text-[#aa3000] transition-colors leading-snug">
                          Mannarasala Sarpam Thullal
                        </h4>
                        <p className="font-body text-xs text-[#6e675d] mt-0.5">
                          Sacred Grove, Haripad
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#26221e] font-medium bg-[#f3ede1] px-2 py-0.5 rounded-xs tabular-nums border border-[#ded7c9] flex-shrink-0">
                      18:00
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="bg-[#f5efe4] px-5 py-3 border-t border-[#ded7c9] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#aa3000]"></span>
                  <span className="font-body text-xs font-medium text-[#26221e]">
                    Field-verified corridor
                  </span>
                </div>
                <span className="font-body text-xs text-[#6e675d]">
                  Kannur → Alappuzha
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
