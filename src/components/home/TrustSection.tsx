'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, BookOpen, Users, Globe, Edit3 } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function TrustSection() {
  const { t } = useLanguage();

  return (
    <>
      {/* ================= COMMUNITY VERIFICATION CHARTER (Deep Charcoal Banner) ================= */}
      <section className="py-14 md:py-18 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#202224] text-[#fcf9f0] p-8 md:p-12 border border-[#303336] shadow-xl rounded-lg">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-[#aa3000]" />
                <span className="font-mono text-[11px] tracking-widest text-[#D8D6CD] uppercase font-medium">
                  COMMUNITY VERIFICATION CHARTER
                </span>
              </div>
              <h2 className="font-headline text-2xl md:text-3xl lg:text-[34px] font-semibold text-[#fcf9f0] mb-4 tracking-tight">
                {t(
                  'Non-commercial, public-interest cultural documentation.',
                  'വാണിജ്യേതരമായ പൈതൃക രേഖ.'
                )}
              </h2>
              <p className="font-body text-sm sm:text-base text-[#D8D6CD] leading-relaxed">
                {t(
                  'Unlike commercial travel blogs or tourism aggregators, Nattuvazhi listings adhere to a 4-point verification protocol: geographical precision, hereditary practitioner consent, folklore archive cross-referencing, and cultural visitor etiquette.',
                  'പരസ്യങ്ങളും ടൂറിസം വിപണനവുമല്ല നാട്ടുവഴിയുടെ ലക്ഷ്യം. ഓരോ സാംസ്കാരിക കേന്ദ്രവും ഭൂമിശാസ്ത്ര കൃത്യത, കലാകാരന്മാരുടെ അനുമതി, ഫോക്‌ലോർ ആർക്കൈവ് പരിശോധന, ആചാരമര്യാദകൾ എന്നിവ പാലിക്കുന്നു എന്ന് ഉറപ്പുവരുത്തുന്നു.'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#303336]">
              {/* Pillar 1 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-[#aa3000]" />
                  <h4 className="font-body text-base font-semibold text-[#fcf9f0]">Archival sources</h4>
                </div>
                <p className="font-body text-xs sm:text-sm text-[#D8D6CD] leading-relaxed">
                  Cross-referenced with folklore academy monographs and gazetteers.
                </p>
              </div>

              {/* Pillar 2 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-[#aa3000]" />
                  <h4 className="font-body text-base font-semibold text-[#fcf9f0]">Custodial consent</h4>
                </div>
                <p className="font-body text-xs sm:text-sm text-[#D8D6CD] leading-relaxed">
                  Documented with deep respect for hereditary traditions and temple guidelines.
                </p>
              </div>

              {/* Pillar 3 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-5 h-5 text-[#aa3000]" />
                  <h4 className="font-body text-base font-semibold text-[#fcf9f0]">Open public GIS</h4>
                </div>
                <p className="font-body text-xs sm:text-sm text-[#D8D6CD] leading-relaxed">
                  Free from commercial advertising or paid positioning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMMUNITY ARCHIVES CALLOUT ================= */}
      <section className="py-14 md:py-18 border-t border-b border-[#e5e3d9] bg-[#f6f4ea]" id="contribute">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="bg-white border border-[#D8D6CD] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 ambient-card-shadow rounded-lg">
            <div className="max-w-2xl">
              <span className="font-mono text-[11px] text-[#aa3000] uppercase tracking-widest block mb-1 font-medium">
                {t('COMMUNITY ARCHIVES', 'സമൂഹ പൈതൃക ശേഖരം')}
              </span>
              <h3 className="font-headline text-xl sm:text-2xl font-semibold text-[#1c1c16] mb-2 tracking-tight">
                {t(
                  'Know an unmapped sacred grove, traditional craftsman, or oral art form?',
                  'നിങ്ങളുടെ നാട്ടിലെ അറിയപ്പെടാത്ത ഒരു കാവോ, കരകൗശല വിദഗ്ദ്ധനെയോ അറിയാമോ?'
                )}
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#5d5e61] leading-relaxed">
                {t(
                  'Help build the open cultural map of Kerala. Submit your discovery with citations and photographs for our curatorial circle to review.',
                  'കേരളത്തിന്റെ സാംസ്കാരിക ഭൂപടത്തിലേക്ക് പുതിയൊരു അധ്യായം കൂടി ചേർക്കൂ. വിവരങ്ങളും ചിത്രങ്ങളും സമർപ്പിക്കാം.'
                )}
              </p>
            </div>

            <Link
              href="/contribute"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#aa3000] hover:bg-[#d43f05] text-white font-body text-sm font-semibold rounded-md transition-all duration-150 transform hover:-translate-y-0.5 terracotta-glow whitespace-nowrap shadow-sm"
            >
              <Edit3 className="w-4 h-4" />
              <span>{t('Contribute a discovery', 'പുതിയ വിവരം ചേർക്കൂ')}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
