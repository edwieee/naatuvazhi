'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { PlusCircle, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Respect user's prefers-reduced-motion OS preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && videoRef.current) {
      videoRef.current.pause();
    }

    const handleChange = (e: MediaQueryListEvent) => {
      if (videoRef.current) {
        if (e.matches) {
          videoRef.current.pause();
        } else {
          videoRef.current.play().catch(() => {});
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

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

          {/* Right Column: Living Cultural Artwork (Google Flow Theyyam Animation) */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <div className="relative w-full aspect-video bg-[#fcf9f0] flex items-center justify-center overflow-hidden">
              {/* Native HTML5 video with autoplay, muted, loop, playsInline, poster */}
              <video
                ref={videoRef}
                src="/videos/theyyam-hero.mp4"
                poster="/videos/theyyam-hero-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-contain bg-[#fcf9f0] motion-reduce:hidden"
                aria-label="Theyyam cultural ritual living animation"
              />
              {/* Static poster fallback when prefers-reduced-motion is active */}
              <img
                src="/videos/theyyam-hero-poster.jpg"
                alt="Theyyam cultural ritual artwork"
                width={1920}
                height={1080}
                className="hidden motion-reduce:block w-full h-full object-contain bg-[#fcf9f0]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
