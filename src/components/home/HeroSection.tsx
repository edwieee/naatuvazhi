'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative border-b border-[#e5e3d9] overflow-hidden">
      {/* Atmospheric Ambient Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#fcf9f0] via-[#f6f4ea] to-[#faeade]/60 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-2/5 h-full opacity-40 blur-3xl pointer-events-none bg-gradient-to-b from-[#ffdbd0] via-[#ffdbd0]/50 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Editorial Archive Pitch */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#aa3000] animate-pulse"></span>
              <span className="font-mono text-[11px] text-[#5b4139] uppercase tracking-wider">
                Kerala Cultural Cartography · Public Open Archive
              </span>
            </div>

            <h1 className="font-headline text-4xl sm:text-5xl lg:text-[58px] lg:leading-[64px] text-[#1c1c16] mb-6 tracking-tight font-medium">
              {t(
                'Discover the culture that lives around you.',
                'നിങ്ങൾക്ക് ചുറ്റും ജീവിക്കുന്ന സംസ്കാരം കണ്ടെത്തൂ.'
              )}
            </h1>

            <p className="font-body text-base sm:text-lg text-[#5d5e61] mb-8 max-w-2xl leading-relaxed">
              {t(
                'A community-informed, scholar-verified living map of Kerala’s sacred groves, ritual performing arts, master practitioners, and craft guilds.',
                'നാട്ടുവഴി — കേരളത്തിന്റെ സാംസ്കാരിക ഭൂപടം. ക്ഷേത്രകലകൾ, കാവുകൾ, പാരമ്പര്യ കരകൗശലങ്ങൾ, നാട്ടുവിജ്ഞാനം എന്നിവയെ തൊട്ടറിയാൻ ഒരു കൂട്ടായ ഉദ്യമം.'
              )}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link
                href="/explore"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#aa3000] hover:bg-[#d43f05] text-white font-medium text-sm sm:text-base rounded-md transition-all duration-150 transform hover:-translate-y-0.5 terracotta-glow shadow-sm"
              >
                <span>{t('Explore the directory', 'ഭൂപടം തുറക്കുക')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contribute"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-transparent border border-[#303336] text-[#202224] hover:bg-[#202224] hover:text-[#fcf9f0] font-medium text-sm sm:text-base rounded-md transition-all duration-150"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t('Submit a discovery', 'പുതിയ കേന്ദ്രം സമർപ്പിക്കൂ')}</span>
              </Link>
            </div>

            {/* Trust Badge / Custodial Accreditation */}
            <div className="pt-4 border-t border-[#e5e3d9] flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-[#303336] text-[#fcf9f0] flex items-center justify-center text-xs flex-shrink-0">
                <Check className="w-3 h-3 text-[#fcf9f0]" />
              </span>
              <p className="font-mono text-xs text-[#5d5e61]">
                {t(
                  'Verified against folklore academy archives and local hereditary custodians',
                  'നാട്ടറിവ് വിദഗ്ദ്ധരും ഫോക്‌ലോർ പണ്ഡിതരും പരിശോധിച്ചു ഉറപ്പുവരുത്തിയത്'
                )}
              </p>
            </div>
          </div>

          {/* Right Column: Dual-Pane Cartographic Itinerary Survey */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white border border-[#D8D6CD] ambient-card-shadow overflow-hidden rounded-md">
              {/* Gazetteer Card Header */}
              <div className="bg-[#202224] text-[#fcf9f0] px-5 py-3 flex items-center justify-between border-b border-[#303336]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#aa3000] animate-ping"></span>
                  <span className="font-mono text-[10px] tracking-widest text-[#D8D6CD]">FIELD ITINERARY SURVEY</span>
                </div>
                <span className="font-mono text-[11px] bg-[#303336] px-2 py-0.5 rounded-xs text-[#D8D6CD]">
                  № KL-SURVEY-26
                </span>
              </div>

              {/* Survey Waypoints List */}
              <div className="divide-y divide-[#D8D6CD]">
                {/* Item 01 */}
                <div className="p-4 hover:bg-[#f6f4ea] transition-colors group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-[#aa3000] font-semibold mt-0.5">01</span>
                      <div>
                        <h4 className="font-body text-sm font-semibold text-[#1c1c16] group-hover:text-[#aa3000] transition-colors">
                          Parassini Muthappan Vellattam
                        </h4>
                        <p className="font-body text-xs text-[#5d5e61]">Valapattanam Riverbank, Kannur</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#1c1c16] bg-[#f0eee5] px-2 py-0.5 rounded-xs tabular-nums">
                      05:45
                    </span>
                  </div>
                </div>

                {/* Item 02 */}
                <div className="p-4 hover:bg-[#f6f4ea] transition-colors group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-[#aa3000] font-semibold mt-0.5">02</span>
                      <div>
                        <h4 className="font-body text-sm font-semibold text-[#1c1c16] group-hover:text-[#aa3000] transition-colors">
                          Kalamandalam Koodiyattam
                        </h4>
                        <p className="font-body text-xs text-[#5d5e61]">Koothambalam, Cheruthuruthy</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#1c1c16] bg-[#f0eee5] px-2 py-0.5 rounded-xs tabular-nums">
                      09:30
                    </span>
                  </div>
                </div>

                {/* Item 03 */}
                <div className="p-4 hover:bg-[#f6f4ea] transition-colors group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-[#aa3000] font-semibold mt-0.5">03</span>
                      <div>
                        <h4 className="font-body text-sm font-semibold text-[#1c1c16] group-hover:text-[#aa3000] transition-colors">
                          Aranmula Metal Mirror Casting
                        </h4>
                        <p className="font-body text-xs text-[#5d5e61]">Vishwakarma Guild, Pathanamthitta</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#1c1c16] bg-[#f0eee5] px-2 py-0.5 rounded-xs tabular-nums">
                      14:15
                    </span>
                  </div>
                </div>

                {/* Item 04 */}
                <div className="p-4 hover:bg-[#f6f4ea] transition-colors group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-[#aa3000] font-semibold mt-0.5">04</span>
                      <div>
                        <h4 className="font-body text-sm font-semibold text-[#1c1c16] group-hover:text-[#aa3000] transition-colors">
                          Mannarasala Sarpam Thullal
                        </h4>
                        <p className="font-body text-xs text-[#5d5e61]">Sacred Grove, Haripad</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#1c1c16] bg-[#f0eee5] px-2 py-0.5 rounded-xs tabular-nums">
                      18:00
                    </span>
                  </div>
                </div>
              </div>

              {/* Survey Status Footer */}
              <div className="bg-[#eae8df] px-5 py-3 border-t border-[#D8D6CD] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#aa3000]"></span>
                  <span className="font-mono text-[11px] text-[#1c1c16] font-medium">Field-verified corridor</span>
                </div>
                <span className="font-mono text-[11px] text-[#5d5e61]">Kannur → Alappuzha</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
