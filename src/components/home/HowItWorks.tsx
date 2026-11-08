'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, BookOpen, ShieldCheck, PlusCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      titleEn: 'Discover',
      titleMl: 'കണ്ടെത്തുക',
      descEn: 'Find cultural places, artists, performances and traditional crafts across Kerala.',
      descMl: 'കേരളത്തിലെ പൈതൃക കേന്ദ്രങ്ങൾ, കലാരൂപങ്ങൾ, പാരമ്പര്യ കരകൗശലങ്ങൾ എന്നിവ ഭൂപടത്തിലൂടെ കണ്ടെത്തുക.',
      tag: 'Explore the map',
      icon: Compass,
      href: '/explore',
    },
    {
      num: '02',
      titleEn: 'Learn',
      titleMl: 'മനസ്സിലാക്കുക',
      descEn: 'Read the story behind each place, artist or tradition, with links to useful sources.',
      descMl: 'ഓരോ കേന്ദ്രത്തിന്റെയും പശ്ചാത്തല ചരിത്രവും ഔദ്യോഗിക വിവരസ്രോതസ്സുകളും അറിയുക.',
      tag: 'Stories and sources',
      icon: BookOpen,
      href: '/explore',
    },
    {
      num: '03',
      titleEn: 'Verify',
      titleMl: 'പരിശോധിക്കുക',
      descEn: 'We review submitted details and check available sources before publishing them.',
      descMl: 'സമർപ്പിച്ച വിവരങ്ങളും സ്രോതസ്സുകളും പരിശോധിച്ച ശേഷമാണ് പ്രസിദ്ധീകരിക്കുന്നത്.',
      tag: 'Information review',
      icon: ShieldCheck,
      href: '/#charter',
    },
    {
      num: '04',
      titleEn: 'Contribute',
      titleMl: 'പങ്കുവെക്കുക',
      descEn: 'Share a cultural place, artist, event or correction with us.',
      descMl: 'നിങ്ങൾക്കറിയാവുന്ന ഒരു പൈതൃക കേന്ദ്രമോ, കലാകാരനെയോ, തിരുത്തലുകളോ പങ്കുവെക്കുക.',
      tag: 'Community submissions',
      icon: PlusCircle,
      href: '/contribute',
    },
  ];

  return (
    <section id="how-it-works" className="py-14 md:py-20 border-b border-[#e5e0d4] bg-[#f6f3eb]">
      <div className="max-w-[1120px] mx-auto px-4 md:px-10 xl:px-0">
        <div className="max-w-2xl mb-10">
          <span className="font-body text-xs font-semibold text-[#aa3000] block mb-2">
            {t('Methodology & verification', 'വിവരശേഖരണ രീതി')}
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#1c1c16] mb-3 tracking-tight">
            {t(
              'How cultural information is collected and checked',
              'വിവരങ്ങൾ എങ്ങനെ ശേഖരിക്കുകയും പരിശോധിക്കുകയും ചെയ്യുന്നു'
            )}
          </h2>
          <p className="font-body text-sm sm:text-base text-[#5d5e61] leading-relaxed">
            {t(
              'We document local traditions, performances, places and traditional crafts with information from reliable sources and the people who know them.',
              'വിശ്വസനീയമായ സ്രോതസ്സുകളിൽ നിന്നും തദ്ദേശീയരിൽ നിന്നും ലഭിക്കുന്ന വിവരങ്ങളുടെ അടിസ്ഥാനത്തിലാണ് പൈതൃക രേഖകൾ തയ്യാറാക്കുന്നത്.'
            )}
          </p>
        </div>

        {/* 4 Protocol Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Link
                key={step.num}
                href={step.href}
                className="bg-white border border-[#ded7c9] p-6 rounded-lg flex flex-col justify-between hover:border-[#aa3000] transition-colors ambient-card-shadow group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-bold text-[#aa3000] tabular-nums">
                      {step.num}
                    </span>
                    <Icon className="w-5 h-5 text-[#6e675d] group-hover:text-[#aa3000] transition-colors" />
                  </div>
                  <h3 className="font-headline text-lg font-semibold text-[#1c1c16] mb-2 group-hover:text-[#aa3000] transition-colors">
                    {t(step.titleEn, step.titleMl)}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-[#5d5e61] leading-relaxed">
                    {t(step.descEn, step.descMl)}
                  </p>
                </div>
                <div className="mt-6 pt-3.5 border-t border-[#ece6da] flex items-center justify-between text-[#6e675d]">
                  <span className="font-body text-xs font-medium text-[#6e675d] group-hover:text-[#aa3000] transition-colors">
                    {step.tag}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#aa3000] transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
