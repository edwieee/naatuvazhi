'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { PlusCircle, ArrowRight } from 'lucide-react';
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
    <section className="relative border-b border-[#e5e0d4] bg-[#fcfcec] overflow-hidden lg:h-[calc(100vh-4rem)] lg:min-h-[700px] lg:max-h-[950px] flex flex-col justify-center">
      {/* Right Column: Living Cultural Artwork (Theyyam Video) */}
      {/* Desktop: Top edge anchored directly below navigation header (top-0), sized at 80% height (5% smaller), preserving aspect ratio */}
      {/* Mobile/Tablet: Rendered below the text in single-column flow */}
      <div className="hidden lg:flex absolute inset-y-0 right-0 w-[58vw] max-w-[1200px] items-start justify-end pr-8 xl:pr-16 pointer-events-none select-none overflow-hidden [mask-image:linear-gradient(to_right,transparent_10%,black_30%)]">
        <div className="relative h-[80%] aspect-video flex items-start justify-end bg-[#fcfcec]">
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
            className="w-full h-full object-contain [clip-path:inset(0_4px_4px_0)] bg-[#fcfcec] motion-reduce:hidden"
            aria-label="Theyyam cultural ritual living animation"
          />
          {/* Fallback static poster for prefers-reduced-motion */}
          <img
            src="/videos/theyyam-hero-poster.jpg"
            alt="Theyyam cultural ritual artwork"
            width={1920}
            height={1080}
            className="hidden motion-reduce:block w-full h-full object-contain [clip-path:inset(0_4px_4px_0)] bg-[#fcfcec]"
          />
        </div>
      </div>

      {/* Editorial Content Container */}
      <div className="max-w-[1120px] mx-auto px-4 md:px-10 xl:px-0 w-full py-10 lg:py-0 flex-1 flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center h-full">
          {/* Left Column: Editorial Archive Pitch */}
          <div className="lg:col-span-7 flex flex-col justify-center py-0 max-w-[480px] lg:max-w-[480px]">
            {/* Subtle Eyebrow Label */}
            <div className="inline-flex items-center gap-2.5 mb-[12px]">
              <span className="w-2 h-2 rounded-full bg-[#aa3000]"></span>
              <span className="font-body text-[12px] font-medium text-[#7d3b24] tracking-normal">
                {t('The Living Culture Map of Kerala · Public open archive', 'കേരള സാംസ്കാരിക ഭൂപടം · പബ്ലിക് ഓപ്പൺ ആർക്കൈവ്')}
              </span>
            </div>

            {/* Display Headline without trailing period */}
            <h1 className="font-headline text-[32px] sm:text-[38px] lg:text-[44px] leading-[1.05] sm:leading-[0.98] lg:leading-[0.96] tracking-[-0.02em] text-[#1c1c16] max-w-[15ch] mb-[16px] font-medium">
              <span className="block">{t('Discover the culture', 'സംസ്കാരം കണ്ടെത്തൂ')}</span>
              <span className="block">{t('that lives around you', 'നിങ്ങളെ ചുറ്റും ജീവിക്കുന്നു')}</span>
            </h1>

            {/* Supporting Description */}
            <p className="font-body text-[14px] sm:text-[15.5px] leading-[1.65] text-[#5d5e61] max-w-[480px]">
              {t(
                'Explore cultural places, artists, traditional crafts and festivals across Kerala. Discover their stories, learn about local traditions and find reliable information.',
                'കേരളത്തിലെ പൈതൃക കേന്ദ്രങ്ങൾ, പരമ്പരാഗത കലാരൂപങ്ങൾ, കരകൗശലങ്ങൾ, ഉത്സവങ്ങൾ എന്നിവയെ അറിയാം. അവയുടെ ചരിത്രവും വിവരങ്ങളും നേരിട്ട് കണ്ടെത്തൂ.'
              )}
            </p>

            {/* Quiet, Well-balanced Dual CTAs */}
            <div className="mt-[24px] sm:mt-[28px] flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <Link
                href="/explore"
                className="inline-flex h-[40px] items-center justify-center gap-2.5 px-6 bg-[#aa3000] hover:bg-[#c23700] text-white font-body font-medium text-[14px] rounded-md transition-colors shadow-xs"
              >
                <span>{t('Explore the directory', 'ഭൂപടം തുറക്കുക')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contribute"
                className="inline-flex h-[40px] items-center justify-center gap-2.5 px-5 bg-[#f6f4ea] hover:bg-[#ede7da] border border-[#ded7c9] text-[#1c1c16] font-body font-medium text-[14px] rounded-md transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-[#aa3000]" />
                <span>{t('Submit a discovery', 'പുതിയ കേന്ദ്രം സമർപ്പിക്കൂ')}</span>
              </Link>
            </div>
          </div>

          {/* Mobile/Tablet Fallback Visual (In-flow below text) */}
          <div className="lg:hidden w-full flex items-center justify-center pb-6">
            <div className="relative w-full aspect-video flex items-center justify-center bg-[#fcfcec] overflow-hidden">
              <video
                src="/videos/theyyam-hero.mp4"
                poster="/videos/theyyam-hero-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-contain [clip-path:inset(0_4px_4px_0)] bg-[#fcfcec] motion-reduce:hidden"
                aria-label="Theyyam cultural ritual living animation"
              />
              <img
                src="/videos/theyyam-hero-poster.jpg"
                alt="Theyyam cultural ritual artwork"
                width={1920}
                height={1080}
                className="hidden motion-reduce:block w-full h-full object-contain [clip-path:inset(0_4px_4px_0)] bg-[#fcfcec]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
