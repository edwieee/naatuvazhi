'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#E8E2D6] bg-[#FBF9F5] mt-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-[#B21C01] text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-xs">
                NV
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-base text-[#181512] tracking-tight">nattuvazhi</span>
                <span className="text-xs text-[#8C8273] font-medium">നാട്ടുവഴി</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#5C554B] leading-relaxed max-w-sm mt-1">
              {t(
                'The Living Culture Map of Kerala. A community-informed cultural discovery platform for sacred groves, ritual performing arts, master practitioners, and living heritage.',
                'കേരളത്തിന്റെ സാംസ്കാരിക ഭൂപടം. ക്ഷേത്രകലകൾ, അനുഷ്ഠാന കലാരൂപങ്ങൾ, പാരമ്പര്യ കരകൗശലങ്ങൾ, നാട്ടുവിജ്ഞാനം എന്നിവയെ തൊട്ടറിയാൻ ഒരു കൂട്ടായ ഉദ്യമം.'
              )}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#8C8273] pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]"></span>
              <span>All records peer-verified before public discovery</span>
            </div>
          </div>

          {/* Directory Links */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-[#181512] tracking-normal">
              {t('Explore', 'കണ്ടെത്തുക')}
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-[#5C554B]">
              <li>
                <Link href="/explore?category=Ritual+Art" className="hover:text-[#B21C01] transition-colors">
                  Ritual arts & Theyyam
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Sacred+Space" className="hover:text-[#B21C01] transition-colors">
                  Sacred groves (Kavu)
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Traditional+Craft" className="hover:text-[#B21C01] transition-colors">
                  Craft guilds & metallurgy
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Martial+Tradition" className="hover:text-[#B21C01] transition-colors">
                  Kalaripayattu lineages
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#B21C01] transition-colors">
                  Festival calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Verification */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-[#181512] tracking-normal">
              {t('Community', 'സമൂഹം')}
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-[#5C554B]">
              <li>
                <Link href="/contribute" className="hover:text-[#B21C01] transition-colors">
                  Submit a discovery
                </Link>
              </li>
              <li>
                <Link href="/contribute?type=Correction" className="hover:text-[#B21C01] transition-colors">
                  Suggest correction
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-[#B21C01] transition-colors">
                  Verification protocol
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#B21C01] transition-colors">
                  Curator portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Regional Archives Note */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <h4 className="text-xs font-semibold text-[#181512] tracking-normal">
              {t('Heritage Note', 'പൈതൃക വിവരണം')}
            </h4>
            <p className="text-xs text-[#5C554B] leading-relaxed bg-[#F8F5EE] p-3 rounded-md border border-[#E8E2D6]">
              {t(
                'Nattuvazhi is a non-commercial, public-interest cultural documentation initiative. Traditional rituals are documented with deep respect to community sanctities and temple guidelines.',
                'നാട്ടുവഴി ഒരു വാണിജ്യേതര സാംസ്കാരിക വിവരശേഖരണ സംരംഭമാണ്. പ്രാദേശിക ആചാരങ്ങളെയും ക്ഷേത്ര മര്യാദകളെയും പൂർണ്ണമായി മാനിച്ചാണ് വിവരങ്ങൾ രേഖപ്പെടുത്തുന്നത്.'
              )}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#E8E2D6] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C8273]">
          <p>© 2026 Nattuvazhi. Built with care for Kerala's Living Heritage.</p>
          <div className="flex items-center gap-4">
            <span>Kasaragod to Thiruvananthapuram</span>
            <span>·</span>
            <Link href="/admin/login" className="hover:text-[#181512] transition-colors">
              Curator login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
