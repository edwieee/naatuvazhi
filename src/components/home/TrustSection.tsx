'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Link2,
  HeartHandshake,
  CheckCircle2,
  MessageSquareDiff,
  Camera,
  PlusCircle,
} from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function TrustSection() {
  const { t } = useLanguage();

  const principles = [
    {
      titleEn: 'Reliable sources',
      titleMl: 'വിശ്വസനീയ സ്രോതസ്സുകൾ',
      descEn: 'We link to original announcements, official pages and other useful sources.',
      descMl: 'ഔദ്യോഗിക അറിയിപ്പുകൾ, വെബ്‌സൈറ്റുകൾ, വിവരസ്രോതസ്സുകൾ എന്നിവ നേരിട്ട് നൽകുന്നു.',
      icon: Link2,
    },
    {
      titleEn: 'Respect for communities',
      titleMl: 'സമൂഹങ്ങളോടുള്ള ആദരവ്',
      descEn: 'We aim to document cultural traditions accurately and respectfully.',
      descMl: 'പ്രാദേശിക വിശ്വാസങ്ങളെയും ആചാര മര്യാദകളെയും പൂർണ്ണമായി മാനിക്കുന്നു.',
      icon: HeartHandshake,
    },
    {
      titleEn: 'Clear verification',
      titleMl: 'വ്യക്തമായ പരിശോധന',
      descEn: 'We show what information has been checked and what still needs review.',
      descMl: 'പരിശോധിച്ച വിവരങ്ങളും തുടർപരിശോധന ആവശ്യമുള്ളവയും വ്യക്തമായി വേർതിരിക്കുന്നു.',
      icon: CheckCircle2,
    },
    {
      titleEn: 'Community corrections',
      titleMl: 'തിരുത്തലുകൾക്കുള്ള അവസരം',
      descEn: 'Anyone can suggest a correction or share missing information.',
      descMl: 'തെറ്റുകൾ തിരുത്താനും വിട്ടുപോയ വിവരങ്ങൾ കൂട്ടിച്ചേർക്കാനും ആർക്കും പങ്കാളിയാകാം.',
      icon: MessageSquareDiff,
    },
    {
      titleEn: 'Proper image credits',
      titleMl: 'ചിത്രങ്ങൾക്കുള്ള കടപ്പാട്',
      descEn: 'We identify image sources and record permission information before publication.',
      descMl: 'ഫോട്ടോഗ്രാഫർമാരുടെയും ആർക്കൈവുകളുടെയും കടപ്പാടും അനുമതിയും വ്യക്തമാക്കുന്നു.',
      icon: Camera,
    },
  ];

  return (
    <>
      {/* 7. Community Verification Charter */}
      <section id="charter" className="py-14 md:py-20 px-4 md:px-12 bg-[#fcfcec] border-b border-[#e5e0d4]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#26221e] text-[#fcf9f0] p-8 md:p-12 border border-[#38332c] shadow-lg rounded-lg">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-[#aa3000]" />
                <span className="font-body text-xs font-semibold text-[#ffdbd0] tracking-normal">
                  {t('Community verification charter', 'കമ്യൂണിറ്റി സ്ഥിരീകരണ ചാർട്ടർ')}
                </span>
              </div>
              <h2 className="font-headline text-2xl md:text-3xl lg:text-[34px] font-semibold text-[#fcf9f0] mb-4 tracking-tight">
                {t(
                  'Our standards for cultural documentation',
                  'പൈതൃക രേഖപ്പെടുത്തലിന്റെ മൂല്യങ്ങൾ'
                )}
              </h2>
              <p className="font-body text-sm sm:text-base text-[#d8d1c2] leading-relaxed">
                {t(
                  'Nattuvazhi is a non-commercial, public platform. We follow five clear principles to ensure cultural information is accurate, respectful and verified.',
                  'നാട്ടുവഴി ഒരു വാണിജ്യേതര, ജനകീയ സാംസ്കാരിക സംരംഭമാണ്. പൈതൃക വിവരങ്ങൾ വിശ്വസനീയവും വസ്തുതാപരവുമാക്കാൻ അഞ്ച് അടിസ്ഥാന തത്വങ്ങൾ ഞങ്ങൾ പാലിക്കുന്നു.'
                )}
              </p>
            </div>

            {/* 5 Principles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-[#38332c]">
              {principles.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={idx} className="flex flex-col justify-start">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-md bg-[#38332c] flex items-center justify-center text-[#ffdbd0] flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-headline text-base font-semibold text-[#fcf9f0]">
                        {t(p.titleEn, p.titleMl)}
                      </h4>
                    </div>
                    <p className="font-body text-xs sm:text-sm text-[#d8d1c2] leading-relaxed pl-9">
                      {t(p.descEn, p.descMl)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final Contribution CTA */}
      <section className="py-14 md:py-20 bg-[#f6f3eb]" id="contribute">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="bg-white border border-[#ded7c9] p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6 ambient-card-shadow rounded-lg">
            <div className="max-w-2xl">
              <span className="font-body text-xs font-semibold text-[#aa3000] block mb-2">
                {t('Community submissions', 'സമൂഹ പൈതൃക ശേഖരം')}
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl font-semibold text-[#1c1c16] mb-3 tracking-tight">
                {t(
                  "Help document Kerala's living culture",
                  'കേരളത്തിന്റെ സാംസ്കാരിക ഭൂപടത്തിൽ പങ്കാളിയാകൂ'
                )}
              </h3>
              <p className="font-body text-sm text-[#5d5e61] leading-relaxed">
                {t(
                  'Know a cultural place, artist, tradition or event that should be included? Share it with Nattuvazhi.',
                  'നിങ്ങൾക്കറിയാവുന്ന ഒരു പൈതൃക കേന്ദ്രമോ, കലാകാരനെയോ, ഉത്സവമോ ഭൂപടത്തിലേക്ക് ചേർക്കാൻ വിവരങ്ങൾ പങ്കുവെക്കാം.'
                )}
              </p>
            </div>

            <Link
              href="/contribute"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#aa3000] hover:bg-[#c23700] text-white font-body text-sm font-semibold rounded-md transition-colors whitespace-nowrap shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('Submit a discovery', 'പുതിയ വിവരം ചേർക്കൂ')}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
