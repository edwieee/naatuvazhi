'use client';

import React from 'react';
import { Compass, BookOpen, ShieldCheck, PlusCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      titleEn: 'Discover',
      titleMl: 'കണ്ടെത്തുക',
      descEn: 'Locate sacred groves, ritual performances, craft guilds, and living masters on an interactive cultural map.',
      descMl: 'ക്ഷേത്രങ്ങൾ, കാവുകൾ, പാരമ്പര്യ പണിശാലകൾ എന്നിവയെ ഭൂപടത്തിലൂടെ നേരിട്ട് കണ്ടെത്തുക.',
      tag: 'GIS survey',
      icon: Compass,
    },
    {
      num: '02',
      titleEn: 'Learn',
      titleMl: 'മനസ്സിലാക്കുക',
      descEn: 'Read authentic oral folklore, ritual significance, origins, and respectful visitor guidelines.',
      descMl: 'അനുഷ്ഠാനങ്ങളുടെ ചരിത്രം, പ്രാധാന്യം, സന്ദർശന മര്യാദകൾ എന്നിവ ആഴത്തിൽ അറിയുക.',
      tag: 'Oral histories',
      icon: BookOpen,
    },
    {
      num: '03',
      titleEn: 'Verify',
      titleMl: 'പരിശോധിക്കുക',
      descEn: 'Every entry is reviewed by cultural researchers, local elders, and archives before public listing.',
      descMl: 'ഫോക്‌ലോർ പണ്ഡിതരും നാട്ടറിവ് സൂക്ഷിപ്പുകാരും വസ്തുതകൾ പരിശോധിച്ച് ഉറപ്പാക്കുന്നു.',
      tag: 'Peer-checked',
      icon: ShieldCheck,
    },
    {
      num: '04',
      titleEn: 'Contribute',
      titleMl: 'പങ്കുവെക്കുക',
      descEn: 'Submit undocumented heritage traditions, upcoming village festivals, or propose factual corrections.',
      descMl: 'നാട്ടിലെ അറിയപ്പെടാത്ത കലാരൂപങ്ങളും അനുഷ്ഠാനങ്ങളും ഭൂപടത്തിലേക്ക് ചേർക്കുക.',
      tag: 'Community open',
      icon: PlusCircle,
    },
  ];

  return (
    <section id="how-it-works" className="py-14 md:py-20 border-b border-[#e5e0d4] bg-[#f6f3eb]">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="max-w-2xl mb-10">
          <span className="font-body text-xs font-semibold text-[#aa3000] block mb-2">
            {t('Methodology & verification', 'കൂട്ടായ്മയിലൂടെയുള്ള പൈതൃക സംരക്ഷണം')}
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#1c1c16] mb-3 tracking-tight">
            {t(
              'A calm, human-checked workflow for living heritage',
              'നാട്ടുപൈതൃകത്തിന് കരുതലോടെ ഒരു ഡിജിറ്റൽ ഭൂപടം'
            )}
          </h2>
          <p className="font-body text-sm sm:text-base text-[#5d5e61] leading-relaxed">
            {t(
              'Documenting oral traditions, temple rites, and hereditary crafts with geographic precision and communal consent.',
              'ഗ്രാമഹൃദയങ്ങളിലും കാവുകളിലും തലമുറകളായി ജീവിക്കുന്ന ആചാരങ്ങളെ വസ്തുതാപരമായി രേഖപ്പെടുത്തുന്നു.'
            )}
          </p>
        </div>

        {/* 4 Protocol Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white border border-[#ded7c9] p-6 rounded-lg flex flex-col justify-between hover:border-[#aa3000] transition-colors ambient-card-shadow group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-bold text-[#aa3000] tabular-nums">
                      {step.num}
                    </span>
                    <Icon className="w-5 h-5 text-[#6e675d] group-hover:text-[#aa3000] transition-colors" />
                  </div>
                  <h3 className="font-body text-base font-semibold text-[#1c1c16] mb-2">
                    {t(step.titleEn, step.titleMl)}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-[#5d5e61] leading-relaxed">
                    {t(step.descEn, step.descMl)}
                  </p>
                </div>
                <div className="mt-6 pt-3.5 border-t border-[#ece6da] flex items-center justify-between text-[#6e675d]">
                  <span className="font-body text-xs font-medium text-[#6e675d]">
                    {step.tag}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#aa3000]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
