'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, PlusCircle, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative pt-12 md:pt-20 pb-16 md:pb-24 border-b border-[#E8E2D6]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Narrative & Primary Actions */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            {/* Context Eyebrow (Quiet text, no glowing sparkle pill) */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#8C8273]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B21C01]"></span>
              <span>Kerala Cultural Cartography · Public Open Archive</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-[#181512] leading-[1.1] tracking-tight">
              {t(
                'Discover the culture that lives around you.',
                'നിങ്ങൾക്ക് ചുറ്റും ജീവിക്കുന്ന സംസ്കാരം കണ്ടെത്തൂ.'
              )}
            </h1>

            {/* Subtitle / Product Truth */}
            <p className="text-base sm:text-lg text-[#5C554B] leading-relaxed max-w-xl">
              {t(
                'A community-informed, scholar-verified living map of Kerala’s sacred groves, ritual performing arts, master practitioners, and craft guilds.',
                'നാട്ടുവഴി — കേരളത്തിന്റെ സാംസ്കാരിക ഭൂപടം. ക്ഷേത്രകലകൾ, കാവുകൾ, പാരമ്പര്യ കരകൗശലങ്ങൾ, നാട്ടുവിജ്ഞാനം എന്നിവയെ തൊട്ടറിയാൻ ഒരു കൂട്ടായ ഉദ്യമം.'
              )}
            </p>

            {/* Structured Dual Actions (Nested 8px radius, no bouncy pills) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/explore"
                className="rounded-md bg-[#B21C01] hover:bg-[#961700] text-white font-medium text-sm px-6 py-3 transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>{t('Explore the directory', 'ഭൂപടം തുറക്കുക')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contribute"
                className="rounded-md border border-[#E8E2D6] hover:border-[#181512] bg-[#FFFFFF] hover:bg-[#F3EFE8] text-[#181512] font-medium text-sm px-5 py-3 transition-colors flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-[#8C8273]" />
                <span>{t('Submit a discovery', 'പുതിയ കേന്ദ്രം സമർപ്പിക്കൂ')}</span>
              </Link>
            </div>

            {/* Quiet verification line without artificial pills */}
            <div className="pt-2 flex items-center gap-2 text-xs text-[#5C554B]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F] flex-shrink-0" />
              <span>
                {t(
                  'Verified against folklore academy archives and local hereditary custodians',
                  'നാട്ടറിവ് വിദഗ്ദ്ധരും ഫോക്‌ലോർ പണ്ഡിതരും പരിശോധിച്ചു ഉറപ്പുവരുത്തിയത്'
                )}
              </span>
            </div>
          </div>

          {/* Right Column: Grounded Archival Field Card (No glowing blobs, no tilted distortion) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-xl border border-[#E8E2D6] shadow-xs overflow-hidden flex flex-col">
              {/* Card Header Bar */}
              <div className="bg-[#F8F5EE] border-b border-[#E8E2D6] px-5 py-3 flex items-center justify-between text-xs">
                <span className="font-mono text-[#8C8273] font-medium">FIELD ITINERARY SURVEY</span>
                <span className="font-mono text-[#B21C01] font-semibold">№ KL-SURVEY-26</span>
              </div>

              {/* Itinerary Rows (Clean tabular-nums with fixed icon gaps) */}
              <div className="divide-y divide-[#EDE7DC] p-2">
                <div className="p-3 flex items-start justify-between gap-3 hover:bg-[#FBF9F5] transition-colors rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#8C8273]">01</span>
                      <h4 className="text-xs font-semibold text-[#181512]">
                        Parassini Muthappan Vellattam
                      </h4>
                    </div>
                    <span className="text-[11px] text-[#5C554B] block pl-6">
                      Valapattanam Riverbank, Kannur
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#5C554B] tabular-nums">05:45</span>
                </div>

                <div className="p-3 flex items-start justify-between gap-3 hover:bg-[#FBF9F5] transition-colors rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#8C8273]">02</span>
                      <h4 className="text-xs font-semibold text-[#181512]">
                        Kalamandalam Koodiyattam
                      </h4>
                    </div>
                    <span className="text-[11px] text-[#5C554B] block pl-6">
                      Koothambalam, Cheruthuruthy
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#5C554B] tabular-nums">09:30</span>
                </div>

                <div className="p-3 flex items-start justify-between gap-3 hover:bg-[#FBF9F5] transition-colors rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#8C8273]">03</span>
                      <h4 className="text-xs font-semibold text-[#181512]">
                        Aranmula Metal Mirror Casting
                      </h4>
                    </div>
                    <span className="text-[11px] text-[#5C554B] block pl-6">
                      Vishwakarma Guild, Pathanamthitta
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#5C554B] tabular-nums">14:15</span>
                </div>

                <div className="p-3 flex items-start justify-between gap-3 hover:bg-[#FBF9F5] transition-colors rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#8C8273]">04</span>
                      <h4 className="text-xs font-semibold text-[#181512]">
                        Mannarasala Sarpam Thullal
                      </h4>
                    </div>
                    <span className="text-[11px] text-[#5C554B] block pl-6">
                      Sacred Grove, Haripad
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#5C554B] tabular-nums">18:00</span>
                </div>
              </div>

              {/* Bottom Grounded Status Tag */}
              <div className="px-5 py-3 bg-[#F8F5EE] border-t border-[#E8E2D6] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2D6A4F]"></span>
                  <span className="font-medium text-[#181512]">Field-verified corridor</span>
                </div>
                <span className="text-[11px] font-mono text-[#8C8273]">Kannur → Alappuzha</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
