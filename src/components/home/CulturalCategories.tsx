'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Landmark, Users, Hammer, Building2, Flame, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function CulturalCategories() {
  const { t } = useLanguage();

  const categories = [
    {
      id: 'art-forms',
      titleEn: 'Traditional art forms',
      titleMl: 'പരമ്പരാഗത കലാരൂപങ്ങൾ',
      descEn: 'Ritual theatre, classical dance and folk performances like Theyyam, Kathakali, Koodiyattam and Padayani.',
      descMl: 'തെയ്യം, കഥകളി, കൂടിയാട്ടം, പടയണി തുടങ്ങിയ അനുഷ്ഠാന-നാടോടി കലാരൂപങ്ങൾ.',
      tag: 'Ritual arts & dance',
      href: '/explore?category=Ritual+Art',
      icon: Sparkles,
    },
    {
      id: 'cultural-places',
      titleEn: 'Cultural places',
      titleMl: 'പൈതൃക കേന്ദ്രങ്ങൾ',
      descEn: 'Sacred groves (Kavu), historic temples, ancestral homesteads and heritage sites across Kerala.',
      descMl: 'കാവുകൾ, പുരാതന ക്ഷേത്രങ്ങൾ, നാലുകെട്ടുകൾ, ചരിത്ര സ്മാരകങ്ങൾ.',
      tag: 'Sacred & historic sites',
      href: '/explore?category=Sacred+Space',
      icon: Landmark,
    },
    {
      id: 'artists',
      titleEn: 'Artists and practitioners',
      titleMl: 'കലാകാരന്മാരും ഗുരുക്കന്മാരും',
      descEn: 'Hereditary performers, ritual dancers, master percussionists and traditional storytellers.',
      descMl: 'പാരമ്പര്യ കലാകാരന്മാർ, മേള പ്രമാണികൾ, നാട്ടുവിജ്ഞാന വാഹകർ.',
      tag: 'Living masters',
      href: '/explore?category=Master+Practitioner',
      icon: Users,
    },
    {
      id: 'crafts',
      titleEn: 'Traditional crafts',
      titleMl: 'പാരമ്പര്യ കരകൗശലങ്ങൾ',
      descEn: 'Time-honoured crafts including bell-metal casting, Aranmula metal mirrors, handloom weaving and wood carving.',
      descMl: 'വെങ്കല നിർമ്മാണം, ആറന്മുളക്കണ്ണാടി, കൈത്തറി, ദാരുശില്പം.',
      tag: 'Crafts & metallurgy',
      href: '/explore?category=Traditional+Craft',
      icon: Hammer,
    },
    {
      id: 'institutions',
      titleEn: 'Cultural groups & institutions',
      titleMl: 'സാംസ്കാരിക സ്ഥാപനങ്ങൾ',
      descEn: 'Training institutions, Kalamandalam lineages, community troupes and historic Kalari sanghams.',
      descMl: 'കലാമണ്ഡലം, കളരി സംഘങ്ങൾ, നാടൻ കലാസമിതികൾ.',
      tag: 'Institutions & sanghams',
      href: '/explore?category=Cultural+Institution',
      icon: Building2,
    },
    {
      id: 'traditions',
      titleEn: 'Local traditions and performances',
      titleMl: 'നാട്ടുവിശേഷങ്ങളും അനുഷ്ഠാനങ്ങളും',
      descEn: 'Seasonal festivals, harvest celebrations, Vallam Kali boat races and regional community gatherings.',
      descMl: 'ഉത്സവങ്ങൾ, വള്ളംകളി, നാട്ടുവിശേഷങ്ങൾ, ഗ്രാമോത്സവങ്ങൾ.',
      tag: 'Festivals & gatherings',
      href: '/events',
      icon: Flame,
    },
  ];

  return (
    <section className="py-14 md:py-20 border-b border-[#e5e0d4] bg-[#fcfcec]">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <span className="font-body text-xs font-semibold text-[#aa3000] block mb-2">
            {t('Cultural heritage', 'സാംസ്കാരിക പൈതൃകം')}
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#1c1c16] mb-3 tracking-tight">
            {t('What you can discover across Kerala', 'കേരളത്തിന്റെ സാംസ്കാരിക സമ്പത്ത്')}
          </h2>
          <p className="font-body text-sm sm:text-base text-[#5d5e61] leading-relaxed">
            {t(
              'Explore six distinct dimensions of Kerala’s living culture, documented with background stories, verified locations and original sources.',
              'ക്ഷേത്രകലകളും കാവുകളും മുതൽ പരമ്പരാഗത കരകൗശലങ്ങൾ വരെ — കേരളത്തിന്റെ സാംസ്കാരിക അടയാളങ്ങളെ അടുത്തറിയാം.'
            )}
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="bg-white border border-[#ded7c9] p-6 rounded-lg flex flex-col justify-between hover:border-[#aa3000] transition-colors ambient-card-shadow group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-md bg-[#f6f4ea] border border-[#ded7c9] flex items-center justify-center text-[#aa3000] group-hover:bg-[#aa3000] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-body text-[11px] font-medium text-[#6e675d] bg-[#f6f4ea] px-2.5 py-0.5 rounded-full border border-[#ded7c9]">
                      {cat.tag}
                    </span>
                  </div>
                  <h3 className="font-headline text-lg font-semibold text-[#1c1c16] mb-1 group-hover:text-[#aa3000] transition-colors leading-snug">
                    {t(cat.titleEn, cat.titleMl)}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-[#5d5e61] leading-relaxed mt-2">
                    {t(cat.descEn, cat.descMl)}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-[#ece6da] flex items-center justify-between text-[#aa3000] font-body text-xs font-semibold group-hover:text-[#c23700]">
                  <span>{t('Explore category', 'വിഭാഗം കാണുക')}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
