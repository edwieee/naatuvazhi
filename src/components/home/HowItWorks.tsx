'use client';

import React from 'react';
import { Compass, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      titleEn: 'Discover',
      titleMl: 'കണ്ടെത്തുക',
      descEn: 'Locate sacred spaces, ritual performances, craft villages, and living masters on an interactive cultural map.',
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
      icon: Sparkles,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white/50 border-y border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FF5931] mb-2 font-mono">
            {t('COMMUNITY-INFORMED CULTURAL PRESERVATION', 'കൂട്ടായ്മയിലൂടെയുള്ള പൈതൃക സംരക്ഷണം')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight leading-tight">
            {t(
              'A calm, human-checked workflow for the living heritage that lives in sacred groves, village courtyards, and ancestral memories.',
              'ഗ്രാമഹൃദയങ്ങളിലും കാവുകളിലും തലമുറകളായി ജീവിക്കുന്ന നാട്ടുപൈതൃകത്തിന് കരുതലോടെ ഒരു ഡിജിറ്റൽ ഭൂപടം.'
            )}
          </h2>
        </div>

        {/* 4 Workflow Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Step Number in Golden Accent */}
                  <div className="text-sm font-mono font-bold text-[#FFB658] tracking-wider mb-6">
                    {step.num}
                  </div>

                  {/* Icon Container in Soft Tint */}
                  <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF9041] mb-5 group-hover:scale-105 group-hover:bg-[#FF9041] group-hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-stone-900 mb-2">
                    {t(step.titleEn, step.titleMl)}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {t(step.descEn, step.descMl)}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center text-xs font-semibold text-stone-500 group-hover:text-[#FF9041] transition-colors">
                  <span>Learn more</span>
                  <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
