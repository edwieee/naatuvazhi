'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Sparkles, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-24 border-t border-stone-200/80 bg-white/70 backdrop-blur-xs">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#B21C01] via-[#FF5931] to-[#FF9041] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                NV
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight text-black">nattuvazhi</span>
                <span className="text-xs text-stone-500 ml-2 font-medium">നാട്ടുവഴി</span>
              </div>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed max-w-sm">
              {t(
                'The Living Culture Map of Kerala. A community-informed, scholar-verified discovery platform for sacred groves, ritual performing arts, master practitioners, and living heritage.',
                'കേരളത്തിന്റെ സാംസ്കാരിക ഭൂപടം. ക്ഷേത്രകലകൾ, അനുഷ്ഠാന കലാരൂപങ്ങൾ, പാരമ്പര്യ കരകൗശലങ്ങൾ, നാട്ടുവിജ്ഞാനം എന്നിവയെ തൊട്ടറിയാൻ ഒരു കൂട്ടായ ഉദ്യമം.'
              )}
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-500 pt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>All records peer-verified before public discovery</span>
            </div>
          </div>

          {/* Directory Links */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-stone-900 tracking-wider uppercase">
              {t('Explore', 'കണ്ടെത്തുക')}
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-stone-600">
              <li>
                <Link href="/explore?category=Ritual+Art" className="hover:text-[#FF5931] transition-colors">
                  Ritual Arts & Theyyam
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Sacred+Space" className="hover:text-[#FF5931] transition-colors">
                  Sacred Groves (Kavu)
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Traditional+Craft" className="hover:text-[#FF5931] transition-colors">
                  GI Crafts & Guilds
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Martial+Tradition" className="hover:text-[#FF5931] transition-colors">
                  Kalaripayattu Lineages
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#FF5931] transition-colors">
                  Cultural Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Verification */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-stone-900 tracking-wider uppercase">
              {t('Community', 'സമൂഹം')}
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-stone-600">
              <li>
                <Link href="/contribute" className="hover:text-[#FF5931] transition-colors">
                  Submit a Discovery
                </Link>
              </li>
              <li>
                <Link href="/contribute?type=Correction" className="hover:text-[#FF5931] transition-colors">
                  Suggest Correction
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-[#FF5931] transition-colors">
                  Verification Process
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#FF5931] transition-colors">
                  Moderator Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Regional Archives Note */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-stone-900 tracking-wider uppercase">
              {t('Heritage Note', 'പൈതൃക വിവരണം')}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed bg-stone-100/70 p-3.5 rounded-2xl border border-stone-200/70">
              {t(
                'Nattuvazhi is a non-commercial, public-interest cultural documentation initiative. Traditional rituals are documented with deep respect to community sanctities and temple guidelines.',
                'നാട്ടുവഴി ഒരു വാണിജ്യേതര സാംസ്കാരിക വിവരശേഖരണ സംരംഭമാണ്. പ്രാദേശിക ആചാരങ്ങളെയും ക്ഷേത്ര മര്യാദകളെയും പൂർണ്ണമായി മാനിച്ചാണ് വിവരങ്ങൾ രേഖപ്പെടുത്തുന്നത്.'
              )}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Nattuvazhi. Built with care for Kerala's Living Heritage.</p>
          <div className="flex items-center gap-6">
            <span>Kasargod to Thiruvananthapuram</span>
            <span>·</span>
            <Link href="/admin/login" className="hover:text-stone-900 transition-colors">
              Curator Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
