'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/ui/LanguageContext';
import KeralaHeritageScene from '@/components/ui/kerala-heritage-scene';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative w-full bg-[#f6f3eb] overflow-hidden">
      {/* 3-Column Content Container: Full Width, Borderless, Balanced Edge-to-Edge Spacing */}
      <div className="max-w-[1120px] mx-auto px-4 md:px-10 xl:px-0 pt-10 md:pt-14 pb-2">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-12 lg:gap-16">
          {/* Column 1 — Nattuvazhi Brand */}
          <div className="w-full md:max-w-[420px] lg:max-w-[480px] flex flex-col items-start">
            <Link
              href="/"
              className="flex items-center gap-2.5 mb-3 group transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#aa3000] rounded-sm"
            >
              <div className="w-6 h-6 bg-[#aa3000] text-white flex items-center justify-center font-bold text-xs rounded-sm shadow-xs">
                NV
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-lg font-semibold text-[#1c1c16]">
                  nattuvazhi
                </span>
                <span className="font-malayalam text-xs text-[#6e675d] font-normal">
                  നാട്ടുവഴി
                </span>
              </div>
            </Link>

            <p className="font-body text-xs sm:text-sm text-[#5d5e61] leading-relaxed mb-4 max-w-md">
              {t(
                'The Living Culture Map of Kerala. A public platform to discover cultural places, artists, traditional crafts and festivals across Kerala.',
                'കേരളത്തിന്റെ സാംസ്കാരിക ഭൂപടം. പൈതൃക കേന്ദ്രങ്ങൾ, കലാരൂപങ്ങൾ, കരകൗശലങ്ങൾ, ഉത്സവങ്ങൾ എന്നിവയെ തൊട്ടറിയാൻ ഒരു കൂട്ടായ ഉദ്യമം.'
              )}
            </p>

            <div className="inline-flex items-center gap-2 font-body text-xs text-[#6e675d]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#aa3000]" />
              <span>
                {t(
                  'Information checked before publication',
                  'വിവരങ്ങൾ പരിശോധിച്ച ശേഷം പ്രസിദ്ധീകരിക്കുന്നു'
                )}
              </span>
            </div>
          </div>

          {/* Columns 2 & 3 — Explore & Community: Distributed across right half */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-24 flex-1 md:justify-end md:max-w-[480px] lg:max-w-[520px]">
            {/* Column 2 — Explore */}
            <div>
              <h4 className="font-body text-sm font-semibold text-[#1c1c16] mb-3">
                {t('Explore', 'കണ്ടെത്തുക')}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#5d5e61] font-body">
                <li>
                  <Link
                    href="/explore?category=ritual-art"
                    className="hover:text-[#692820] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#692820] rounded-xs"
                  >
                    Ritual arts &amp; Theyyam
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore?category=sacred-space"
                    className="hover:text-[#692820] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#692820] rounded-xs"
                  >
                    Sacred groves (Kavu)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore?category=traditional-craft"
                    className="hover:text-[#692820] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#692820] rounded-xs"
                  >
                    Craft guilds &amp; metallurgy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore?category=martial-tradition"
                    className="hover:text-[#692820] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#692820] rounded-xs"
                  >
                    Kalaripayattu lineages
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="hover:text-[#692820] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#692820] rounded-xs"
                  >
                    Festival calendar
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 — Community */}
            <div>
              <h4 className="font-body text-sm font-semibold text-[#1c1c16] mb-3">
                {t('Community', 'സമൂഹം')}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#5d5e61] font-body">
                <li>
                  <Link
                    href="/contribute"
                    className="hover:text-[#692820] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#692820] rounded-xs"
                  >
                    Submit a discovery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contribute?type=Correction"
                    className="hover:text-[#692820] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#692820] rounded-xs"
                  >
                    Suggest correction
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#how-it-works"
                    className="hover:text-[#692820] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#692820] rounded-xs"
                  >
                    Verification protocol
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin"
                    className="hover:text-[#692820] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#692820] rounded-xs"
                  >
                    Curator portal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Seamless, Borderless Kerala Cultural Panorama: tight vertical spacing, full width */}
      <div className="w-full mt-2 sm:mt-4">
        <KeralaHeritageScene
          paperColor="#f6f3eb"
          inkColor="#692820"
          mistDensity={0.42}
          driftSpeed={1}
          clearingRadius={125}
        />
      </div>
    </footer>
  );
}
