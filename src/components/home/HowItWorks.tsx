'use client';

import React from 'react';
import { Compass, BookOpen, ShieldCheck, PlusCircle } from 'lucide-react';
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
      icon: Compass,
    },
    {
      num: '02',
      titleEn: 'Learn',
      titleMl: 'മനസ്സിലാക്കുക',
      descEn: 'Read authentic oral folklore, ritual significance, origins, and respectful visitor guidelines.',
      descMl: 'അനുഷ്ഠാനങ്ങളുടെ ചരിത്രം, പ്രാധാന്യം, സന്ദർശന മര്യാദകൾ എന്നിവ ആഴത്തിൽ അറിയുക.',
      icon: BookOpen,
    },
    {
      num: '03',
      titleEn: 'Verify',
      titleMl: 'പരിശോധിക്കുക',
      descEn: 'Every entry is reviewed by cultural researchers, local elders, and archives before public listing.',
      descMl: 'ഫോക്‌ലോർ പണ്ഡിതരും നാട്ടറിവ് സൂക്ഷിപ്പുകാരും വസ്തുതകൾ പരിശോധിച്ച് ഉറപ്പാക്കുന്നു.',
      icon: ShieldCheck,
    },
    {
      num: '04',
      titleEn: 'Contribute',
      titleMl: 'പങ്കുവെക്കുക',
      descEn: 'Submit undocumented heritage traditions, upcoming village festivals, or propose factual corrections.',
      descMl: 'നാട്ടിലെ അറിയപ്പെടാത്ത കലാരൂപങ്ങളും അനുഷ്ഠാനങ്ങളും ഭൂപടത്തിലേക്ക് ചേർക്കുക.',
      icon: PlusCircle,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 border-b border-[#E8E2D6]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5C554B] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9041]"></span>
            <span>{t('METHODOLOGY & VERIFICATION', 'കൂട്ടായ്മയിലൂടെയുള്ള പൈതൃക സംരക്ഷണം')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#000000] tracking-tight leading-snug">
            {t(
              'A calm, human-checked workflow for living heritage.',
              'നാട്ടുപൈതൃകത്തിന് കരുതലോടെ ഒരു ഡിജിറ്റൽ ഭൂപടം.'
            )}
          </h2>
          <p className="text-sm text-[#5C554B] mt-2 leading-relaxed">
            {t(
              'Documenting oral traditions, temple rites, and hereditary crafts with geographic precision and communal consent.',
              'ഗ്രാമഹൃദയങ്ങളിലും കാവുകളിലും തലമുറകളായി ജീവിക്കുന്ന ആചാരങ്ങളെ വസ്തുതാപരമായി രേഖപ്പെടുത്തുന്നു.'
            )}
          </p>
        </div>

        {/* 4 Workflow Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-xl p-6 border border-[#E8E2D6] hover:border-[#FF9041] hover:bg-[#FFFDFB] transition-colors shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-6 h-6 rounded-full bg-[#FFF2E0] border border-[#FFB658]/40 flex items-center justify-center text-xs font-mono font-bold text-[#FF9041] tabular-nums">
                      {step.num}
                    </span>
                    <Icon className="w-4 h-4 text-[#FF5931]" />
                  </div>

                  <h3 className="text-base font-semibold text-[#000000] mb-2">
                    {t(step.titleEn, step.titleMl)}
                  </h3>

                  <p className="text-xs text-[#5C554B] leading-relaxed">
                    {t(step.descEn, step.descMl)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
