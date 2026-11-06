'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, FileCheck, Users, PlusCircle } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function TrustSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Verification Standards Block (Grounded, no glowing blobs) */}
        <div className="bg-[#181512] text-white rounded-xl p-8 md:p-12 shadow-xs mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#E8E2D6] mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B21C01]" />
              <span>COMMUNITY VERIFICATION CHARTER</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3 tracking-tight">
              {t(
                'Non-commercial, public-interest cultural documentation.',
                'വാണിജ്യേതരമായ പൈതൃക രേഖ.'
              )}
            </h2>

            <p className="text-[#A8A29E] text-sm sm:text-base leading-relaxed mb-8">
              {t(
                'Unlike commercial travel blogs or tourism aggregators, Nattuvazhi listings adhere to a 4-point verification protocol: geographical precision, hereditary practitioner consent, folklore archive cross-referencing, and cultural visitor etiquette.',
                'പരസ്യങ്ങളും ടൂറിസം വിപണനവുമല്ല നാട്ടുവഴിയുടെ ലക്ഷ്യം. ഓരോ സാംസ്കാരിക കേന്ദ്രവും ഭൂമിശാസ്ത്ര കൃത്യത, കലാകാരന്മാരുടെ അനുമതി, ഫോക്‌ലോർ ആർക്കൈവ് പരിശോധന, ആചാരമര്യാദകൾ എന്നിവ പാലിക്കുന്നു എന്ന് ഉറപ്പുവരുത്തുന്നു.'
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#2D2A26] text-xs">
              <div className="flex items-start gap-2.5">
                <FileCheck className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Archival sources</h4>
                  <p className="text-[#A8A29E] leading-relaxed">
                    Cross-referenced with folklore academy monographs and gazetteers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Custodial consent</h4>
                  <p className="text-[#A8A29E] leading-relaxed">
                    Documented with deep respect for hereditary traditions and temple guidelines.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Open public GIS</h4>
                  <p className="text-[#A8A29E] leading-relaxed">
                    Free from commercial advertising or paid positioning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Contribution Box (Quiet surface with 1px border, no gradient wash) */}
        <div className="rounded-xl bg-[#F8F5EE] border border-[#E8E2D6] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="text-xs font-mono text-[#8C8273] mb-1">
              {t('COMMUNITY ARCHIVES', 'സമൂഹ പൈതൃക ശേഖരം')}
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-[#181512] tracking-tight">
              {t(
                'Know an unmapped sacred grove, traditional craftsman, or oral art form?',
                'നിങ്ങളുടെ നാട്ടിലെ അറിയപ്പെടാത്ത ഒരു കാവോ, കരകൗശല വിദഗ്ദ്ധനെയോ അറിയാമോ?'
              )}
            </h3>
            <p className="text-xs sm:text-sm text-[#5C554B] mt-1.5 leading-relaxed">
              {t(
                'Help build the open cultural map of Kerala. Submit your discovery with citations and photographs for our curatorial circle to review.',
                'കേരളത്തിന്റെ സാംസ്കാരിക ഭൂപടത്തിലേക്ക് പുതിയൊരു അധ്യായം കൂടി ചേർക്കൂ. വിവരങ്ങളും ചിത്രങ്ങളും സമർപ്പിക്കാം.'
              )}
            </p>
          </div>

          <Link
            href="/contribute"
            className="rounded-md bg-[#B21C01] hover:bg-[#961700] text-white font-medium text-xs sm:text-sm px-6 py-3 transition-colors flex items-center gap-2 flex-shrink-0 shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t('Contribute a discovery', 'പുതിയ വിവരം ചേർക്കൂ')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
