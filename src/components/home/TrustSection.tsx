'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, CheckCircle, FileCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function TrustSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-white/60 border-t border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Verification Architecture Banner */}
        <div className="bg-stone-900 text-white rounded-3xl p-8 md:p-12 shadow-xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#FF9041]/15 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 text-[#FFB658] text-xs font-mono font-semibold tracking-wider mb-4 border border-stone-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>COMMUNITY VERIFICATION CHARTER</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
              {t(
                'Why community-informed, non-commercial data matters.',
                'എന്തുകൊണ്ട് വാണിജ്യേതരമായ നാട്ടറിവ് വിവരങ്ങൾ പ്രധാനമാകുന്നു.'
              )}
            </h2>

            <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-8">
              {t(
                'Unlike generic travel blogs or tourism aggregators driven by commercial sponsorships, Nattuvazhi entries must pass a 4-point verification checklist: geographical precision, living practitioner consent, archival cross-referencing, and cultural etiquette documentation.',
                'പരസ്യങ്ങളും ടൂറിസം വിപണനവുമല്ല നാട്ടുവഴിയുടെ ലക്ഷ്യം. ഓരോ സാംസ്കാരിക കേന്ദ്രവും ഭൂമിശാസ്ത്ര കൃത്യത, കലാകാരന്മാരുടെ അനുമതി, ഫോക്‌ലോർ ആർക്കൈവ് പരിശോധന, ആചാരമര്യാദകൾ എന്നിവ പാലിക്കുന്നു എന്ന് ഉറപ്പുവരുത്തുന്നു.'
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-stone-800 text-xs">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#FFB658] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-1">Archival Backing</h4>
                  <p className="text-stone-400">Cited from Kerala Folklore Academy & Sangeet Natak records.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#FF9041] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-1">Practitioner Consent</h4>
                  <p className="text-stone-400">Documented with respect for hereditary guilds and sanctums.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileCheck className="w-5 h-5 text-[#FF5931] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-1">Zero Commercial Bias</h4>
                  <p className="text-stone-400">Pure public-interest open cultural geography.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Contribution CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#FFB658]/20 via-[#FF9041]/15 to-[#FF5931]/15 border border-[#FF9041]/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold font-mono tracking-wider text-[#B21C01] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>KERALA LIVING ARCHIVES</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-stone-950 tracking-tight">
              {t(
                'Know an unmapped sacred grove, traditional craftsman, or oral art form?',
                'നിങ്ങളുടെ നാട്ടിലെ അറിയപ്പെടാത്ത ഒരു കാവോ, കരകൗശല വിദഗ്ദ്ധനെയോ അറിയാമോ?'
              )}
            </h3>
            <p className="text-sm text-stone-700 mt-2 leading-relaxed">
              {t(
                'Help build the most comprehensive open cultural map of Kerala. Submit your discovery with photographs and references; our moderation circle will review and publish it.',
                'കേരളത്തിന്റെ സാംസ്കാരിക ഭൂപടത്തിലേക്ക് പുതിയൊരു അധ്യായം കൂടി ചേർക്കൂ. വിവരങ്ങളും ചിത്രങ്ങളും സമർപ്പിക്കാം.'
              )}
            </p>
          </div>

          <Link
            href="/contribute"
            className="rounded-full bg-[#B21C01] hover:bg-[#8f1701] text-white font-semibold text-sm sm:text-base px-8 py-4 transition-all shadow-md hover:shadow-lg flex items-center gap-2 flex-shrink-0 active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('Contribute a Discovery', 'പുതിയ വിവരം ചേർക്കൂ')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
