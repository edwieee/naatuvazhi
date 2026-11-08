'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/ui/LanguageContext';
import KeralaHeritageScene from '@/components/ui/kerala-heritage-scene';

export default function Footer() {
  const { t } = useLanguage();
  const footerRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`relative w-full border-t border-[#ded7c9] bg-[#f6f3eb] overflow-hidden transition-colors duration-500`}
    >
      {/* Decorative hairline guides inspired by Ridgeline Dither frame */}
      <div className="max-w-7xl mx-auto relative px-4 md:px-12">
        <div
          className={`absolute left-4 md:left-12 top-0 bottom-0 w-[1px] bg-[#e5e0d4] pointer-events-none origin-top transition-transform duration-1000 ease-out hidden sm:block ${
            inView ? 'scale-y-100' : 'scale-y-0'
          }`}
        />
        <div
          className={`absolute right-4 md:right-12 top-0 bottom-0 w-[1px] bg-[#e5e0d4] pointer-events-none origin-top transition-transform duration-1000 delay-100 ease-out hidden sm:block ${
            inView ? 'scale-y-100' : 'scale-y-0'
          }`}
        />

        {/* Main Footer Content */}
        <div className="pt-12 md:pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
            {/* Brand column */}
            <div
              className={`md:col-span-4 transition-all duration-700 ease-out ${
                inView ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-3 blur-[2px]'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="flex items-center gap-2.5 mb-3">
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
              </div>
              <p className="font-body text-xs sm:text-sm text-[#5d5e61] leading-relaxed mb-4 max-w-sm">
                {t(
                  'The Living Culture Map of Kerala. A community-informed cultural discovery platform for sacred groves, ritual performing arts, master practitioners, and living heritage.',
                  'കേരളത്തിന്റെ സാംസ്കാരിക ഭൂപടം. ക്ഷേത്രകലകൾ, അനുഷ്ഠാന കലാരൂപങ്ങൾ, പാരമ്പര്യ കരകൗശലങ്ങൾ, നാട്ടുവിജ്ഞാനം എന്നിവയെ തൊട്ടറിയാൻ ഒരു കൂട്ടായ ഉദ്യമം.'
                )}
              </p>
              <div className="inline-flex items-center gap-2 font-body text-xs text-[#6e675d]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#aa3000]"></span>
                <span>All records peer-verified before public discovery</span>
              </div>
            </div>

            {/* Explore links */}
            <div
              className={`md:col-span-3 transition-all duration-700 ease-out ${
                inView ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-3 blur-[2px]'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h4 className="font-body text-sm font-semibold text-[#1c1c16] mb-3">
                {t('Explore', 'കണ്ടെത്തുക')}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#5d5e61] font-body">
                <li>
                  <Link
                    href="/explore?category=Ritual+Art"
                    className="hover:text-[#692820] transition-colors"
                  >
                    Ritual arts &amp; Theyyam
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore?category=Sacred+Space"
                    className="hover:text-[#692820] transition-colors"
                  >
                    Sacred groves (Kavu)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore?category=Traditional+Craft"
                    className="hover:text-[#692820] transition-colors"
                  >
                    Craft guilds &amp; metallurgy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore?category=Martial+Tradition"
                    className="hover:text-[#692820] transition-colors"
                  >
                    Kalaripayattu lineages
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="hover:text-[#692820] transition-colors"
                  >
                    Festival calendar
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community links */}
            <div
              className={`md:col-span-2 transition-all duration-700 ease-out ${
                inView ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-3 blur-[2px]'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <h4 className="font-body text-sm font-semibold text-[#1c1c16] mb-3">
                {t('Community', 'സമൂഹം')}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#5d5e61] font-body">
                <li>
                  <Link href="/contribute" className="hover:text-[#692820] transition-colors">
                    Submit a discovery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contribute?type=Correction"
                    className="hover:text-[#692820] transition-colors"
                  >
                    Suggest correction
                  </Link>
                </li>
                <li>
                  <Link href="/#how-it-works" className="hover:text-[#692820] transition-colors">
                    Verification protocol
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-[#692820] transition-colors">
                    Curator portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Heritage Note */}
            <div
              className={`md:col-span-3 transition-all duration-700 ease-out ${
                inView ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-3 blur-[2px]'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="bg-[#f0eee5] p-4 rounded-md border border-[#ded7c9]">
                <h4 className="font-body text-xs text-[#1c1c16] font-semibold mb-1">
                  {t('Heritage note', 'പൈതൃക വിവരണം')}
                </h4>
                <p className="font-body text-xs text-[#5d5e61] leading-relaxed">
                  {t(
                    'Nattuvazhi is a non-commercial, public-interest cultural documentation initiative. Traditional rituals are documented with deep respect to community sanctities and temple guidelines.',
                    'നാട്ടുവഴി ഒരു വാണിജ്യേതര സാംസ്കാരിക വിവരശേഖരണ സംരംഭമാണ്. പ്രാദേശിക ആചാരങ്ങളെയും ക്ഷേത്ര മര്യാദകളെയും പൂർണ്ണമായി മാനിച്ചാണ് വിവരങ്ങൾ രേഖപ്പെടുത്തുന്നത്.'
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Metadata & Subtitle Bar */}
          <div
            className={`pt-6 border-t border-[#ded7c9] flex flex-col sm:flex-row items-center justify-between gap-4 font-body text-xs text-[#6e675d] transition-all duration-700 ease-out ${
              inView ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-3 blur-[2px]'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <p>© 2026 Nattuvazhi. Built with care for Kerala's Living Heritage.</p>
            <div className="flex items-center gap-3">
              <span>Kasaragod to Thiruvananthapuram</span>
              <span>·</span>
              <Link href="/admin/login" className="hover:text-[#aa3000] transition-colors">
                Curator login
              </Link>
            </div>
          </div>
        </div>

        {/* Interactive Kerala Cultural Heritage Dither Scene */}
        <div
          className={`mt-2 -mx-4 md:-mx-12 border-t border-[#ded7c9] transition-all duration-1000 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <KeralaHeritageScene
            paperColor="#f6f3eb"
            inkColor="#692820"
            mistDensity={0.42}
            driftSpeed={1}
            clearingRadius={125}
          />
        </div>
      </div>
    </footer>
  );
}
