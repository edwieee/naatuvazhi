'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Description & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            {/* Eyebrow Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/70 border border-orange-200/90 text-stone-900 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9041]" />
              <span>MALAYALAM + ENGLISH · COMMUNITY-INFORMED</span>
            </div>

            {/* Main Punchy Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-950 leading-[1.08]">
              {t(
                'Discover the culture that lives around you.',
                'നിങ്ങൾക്ക് ചുറ്റും ജീവിക്കുന്ന സംസ്കാരം കണ്ടെത്തൂ.'
              )}
            </h1>

            {/* Subtitle / Product Description */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              {t(
                'Nattuvazhi is a living, human-verified cultural atlas of Kerala. Map ritual temple rites, sacred groves, master craftspeople, and oral lineages before they fade from memory.',
                'നാട്ടുവഴി — കേരളത്തിന്റെ സാംസ്കാരിക ഭൂപടം. ക്ഷേത്രകലകൾ, കാവുകൾ, പാരമ്പര്യ കരകൗശലങ്ങൾ, നാട്ടുവിജ്ഞാനം എന്നിവയെ തൊട്ടറിയാൻ ഒരു കൂട്ടായ ഉദ്യമം.'
              )}
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <Link
                href="/explore"
                className="rounded-full bg-[#FF9041] hover:bg-[#e87c2f] text-white font-semibold text-sm sm:text-base px-7 py-3.5 transition-all shadow-md hover:shadow-lg flex items-center gap-2 group active:scale-95"
              >
                <span>{t('Explore Kerala', 'കേരളം കണ്ടെത്തുക')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contribute"
                className="rounded-full border border-stone-300 hover:border-stone-900 bg-white/90 hover:bg-white text-stone-900 font-semibold text-sm sm:text-base px-7 py-3.5 transition-all shadow-xs flex items-center gap-2 group active:scale-95"
              >
                <Compass className="w-4 h-4 text-stone-600 group-hover:text-black" />
                <span>{t('Contribute a discovery', 'പുതിയ കേന്ദ്രം സമർപ്പിക്കൂ')}</span>
              </Link>
            </div>

            {/* Trust Seal */}
            <div className="flex items-center gap-2.5 pt-2 text-xs sm:text-sm text-stone-700">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">
                {t(
                  'Human-checked with folklore archives & local elders before public discovery',
                  'നാട്ടറിവ് വിദഗ്ദ്ധരും ഫോക്‌ലോർ പണ്ഡിതരും പരിശോധിച്ചു ഉറപ്പുവരുത്തിയത്'
                )}
              </span>
            </div>
          </div>

          {/* Right Column: Visual Preview Composition (Inspired by eppo varum paper preview) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Background Paper Coordinate Grid Card */}
            <div className="relative w-full max-w-md aspect-[4/4.2] rounded-3xl bg-[#FCFAF7] border border-stone-200/90 shadow-2xl p-6 overflow-hidden bg-grid-paper flex flex-col justify-between">
              {/* Organic Accent Blob */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#FFB658]/35 blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full bg-[#FF5931]/15 blur-2xl pointer-events-none"></div>

              {/* Grid Header Labels */}
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-stone-400 border-b border-stone-200/60 pb-3">
                <span>HERITAGE REGISTRY</span>
                <span>KERALA GIS DATA</span>
              </div>

              {/* Layer 1: Tilted Cultural Itinerary Card */}
              <div className="relative z-10 bg-white rounded-2xl p-5 shadow-lg border border-stone-200/90 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF9041]"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      LIVING TRADITION TRAIL
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono">KL-CULT-2026</span>
                </div>

                {/* Dotted Schedule Sequence */}
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF9041] font-bold text-[10px] flex items-center justify-center">
                        1
                      </span>
                      <span className="font-semibold text-stone-900">Parassini Muthappan Vellattam</span>
                    </div>
                    <span className="font-mono text-stone-500 font-medium">05:45 AM</span>
                  </div>

                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF9041] font-bold text-[10px] flex items-center justify-center">
                        2
                      </span>
                      <span className="font-semibold text-stone-900">Kalamandalam Koodiyattam</span>
                    </div>
                    <span className="font-mono text-stone-500 font-medium">09:30 AM</span>
                  </div>

                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF9041] font-bold text-[10px] flex items-center justify-center">
                        3
                      </span>
                      <span className="font-semibold text-stone-900">Aranmula Mirror Guild Rites</span>
                    </div>
                    <span className="font-mono text-stone-500 font-medium">02:15 PM</span>
                  </div>

                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF9041] font-bold text-[10px] flex items-center justify-center">
                        4
                      </span>
                      <span className="font-semibold text-stone-900">Mannarasala Sarpam Thullal</span>
                    </div>
                    <span className="font-mono text-stone-500 font-medium">06:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Layer 2: Overlapping Dark Verified Badge */}
              <div className="relative z-20 mt-2 bg-stone-900 text-white rounded-2xl p-4 shadow-xl border border-stone-800 flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-[#FFB658]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FFB658]" />
                    <span>VERIFIED LIVING ROUTE</span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base tracking-tight text-white mt-0.5">
                    Kannur → Thrissur → Alappuzha
                  </h4>
                </div>
                <div className="w-9 h-9 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-[#FF9041]">
                  <Compass className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
