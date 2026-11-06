'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-[#e5e3d9] px-4 md:px-12 py-12 md:py-16 bg-[#f6f4ea]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-[#aa3000] text-white flex items-center justify-center font-bold text-xs rounded-xs shadow-xs">
                NV
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-headline text-lg font-semibold text-[#1c1c16]">
                  nattuvazhi
                </span>
                <span className="text-xs text-[#5d5e61] font-medium">നാട്ടുവഴി</span>
              </div>
            </div>
            <p className="font-body text-xs sm:text-sm text-[#5d5e61] leading-relaxed mb-4 max-w-sm">
              {t(
                'The Living Culture Map of Kerala. A community-informed cultural discovery platform for sacred groves, ritual performing arts, master practitioners, and living heritage.',
                'കേരളത്തിന്റെ സാംസ്കാരിക ഭൂപടം. ക്ഷേത്രകലകൾ, അനുഷ്ഠാന കലാരൂപങ്ങൾ, പാരമ്പര്യ കരകൗശലങ്ങൾ, നാട്ടുവിജ്ഞാനം എന്നിവയെ തൊട്ടറിയാൻ ഒരു കൂട്ടായ ഉദ്യമം.'
              )}
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#5d5e61]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#aa3000]"></span>
              <span>All records peer-verified before public discovery</span>
            </div>
          </div>

          {/* Explore links */}
          <div className="md:col-span-3">
            <h4 className="font-body text-sm font-semibold text-[#1c1c16] mb-3">
              {t('Explore', 'കണ്ടെത്തുക')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5d5e61]">
              <li>
                <Link href="/explore?category=Ritual+Art" className="hover:text-[#aa3000] transition-colors">
                  Ritual arts &amp; Theyyam
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Sacred+Space" className="hover:text-[#aa3000] transition-colors">
                  Sacred groves (Kavu)
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Traditional+Craft" className="hover:text-[#aa3000] transition-colors">
                  Craft guilds &amp; metallurgy
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Martial+Tradition" className="hover:text-[#aa3000] transition-colors">
                  Kalaripayattu lineages
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#aa3000] transition-colors">
                  Festival calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Community links */}
          <div className="md:col-span-2">
            <h4 className="font-body text-sm font-semibold text-[#1c1c16] mb-3">
              {t('Community', 'സമൂഹം')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5d5e61]">
              <li>
                <Link href="/contribute" className="hover:text-[#aa3000] transition-colors">
                  Submit a discovery
                </Link>
              </li>
              <li>
                <Link href="/contribute?type=Correction" className="hover:text-[#aa3000] transition-colors">
                  Suggest correction
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-[#aa3000] transition-colors">
                  Verification protocol
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#aa3000] transition-colors">
                  Curator portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Heritage Note */}
          <div className="md:col-span-3">
            <div className="bg-[#f0eee5] p-4 rounded-md border border-[#e5e3d9]">
              <h4 className="font-mono text-xs text-[#1c1c16] font-semibold mb-1 uppercase tracking-wide">
                {t('Heritage Note', 'പൈതൃക വിവരണം')}
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

        {/* Footer Bottom Bar */}
        <div className="pt-6 border-t border-[#e5e3d9] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#5d5e61]">
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
    </footer>
  );
}
