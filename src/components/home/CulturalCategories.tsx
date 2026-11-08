'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Hammer,
  Landmark,
  Library,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';
import {
  getCategories,
  getListings,
  HOMEPAGE_CATEGORY_SLUGS,
  type CulturalCategory,
} from '@/lib/supabase/data-service';

const iconByName = {
  Sparkles,
  Landmark,
  Award,
  Hammer,
  Library,
  Shield,
};

const fallbackCategories: CulturalCategory[] = [
  { id: 'fallback-ritual-art', slug: 'ritual-art', name: 'Ritual Art', nameMalayalam: 'അനുഷ്ഠാന കല', description: 'Living ritual performances and sacred arts documented across Kerala.', iconName: 'Sparkles', displayOrder: 1 },
  { id: 'fallback-sacred-space', slug: 'sacred-space', name: 'Sacred Space', nameMalayalam: 'പുണ്യ സ്ഥാനങ്ങൾ', description: 'Temples, sacred groves and heritage places with living cultural meaning.', iconName: 'Landmark', displayOrder: 2 },
  { id: 'fallback-master-practitioner', slug: 'master-practitioner', name: 'Master Practitioner', nameMalayalam: 'ഗുരുക്കന്മാർ', description: 'Individual custodians and teachers of Kerala’s cultural traditions.', iconName: 'Award', displayOrder: 3 },
  { id: 'fallback-traditional-craft', slug: 'traditional-craft', name: 'Traditional Craft', nameMalayalam: 'പരമ്പരാഗത കരകൗശലം', description: 'Traditional materials, techniques and artisan-made cultural objects.', iconName: 'Hammer', displayOrder: 4 },
  { id: 'fallback-cultural-institution', slug: 'cultural-institution', name: 'Cultural Institution', nameMalayalam: 'സാംസ്കാരിക സ്ഥാപനങ്ങൾ', description: 'Schools, archives and institutions that preserve and teach cultural practice.', iconName: 'Library', displayOrder: 5 },
  { id: 'fallback-martial-tradition', slug: 'martial-tradition', name: 'Martial Tradition', nameMalayalam: 'യോദ്ധാ പാരമ്പര്യം', description: 'Kerala’s martial lineages, training traditions and related knowledge.', iconName: 'Shield', displayOrder: 6 },
];

export default function CulturalCategories() {
  const { t } = useLanguage();
  const [categories, setCategories] = useState<CulturalCategory[]>(fallbackCategories);
  const [publishedCounts, setPublishedCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let isMounted = true;

    Promise.all([getCategories(), getListings()])
      .then(([loadedCategories, listings]) => {
        if (!isMounted) return;

        setCategories(loadedCategories);
        const counts = listings.reduce<Record<string, number>>((result, listing) => {
          if (listing.categorySlug) {
            result[listing.categorySlug] = (result[listing.categorySlug] || 0) + 1;
          }
          return result;
        }, {});
        setPublishedCounts(counts);
      })
      .catch((error) => {
        console.warn('Using fallback homepage categories:', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const homepageCategories = useMemo(() => {
    const categoriesBySlug = new Map(categories.map((category) => [category.slug, category]));
    return HOMEPAGE_CATEGORY_SLUGS.map((slug) => categoriesBySlug.get(slug)).filter(
      (category): category is CulturalCategory => Boolean(category),
    );
  }, [categories]);

  return (
    <section className="border-b border-[#e5e0d4] bg-[#fcfcec] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-12">
        <div className="mb-10 max-w-2xl">
          <span className="font-body mb-2 block text-xs font-semibold text-[#aa3000]">
            {t('Cultural heritage', 'സാംസ്കാരിക പൈതൃകം')}
          </span>
          <h2 className="font-headline mb-3 text-2xl font-semibold tracking-tight text-[#1c1c16] sm:text-3xl lg:text-[34px]">
            {t('What you can discover across Kerala', 'കേരളത്തിന്റെ സാംസ്കാരിക സമ്പത്ത്')}
          </h2>
          <p className="font-body text-sm leading-relaxed text-[#5d5e61] sm:text-base">
            {t(
              'Explore the cultural categories represented in the Nattuvazhi directory.',
              'നാട്ടുവഴി ഡയറക്ടറിയിലെ സാംസ്കാരിക വിഭാഗങ്ങൾ കണ്ടെത്താം.',
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homepageCategories.map((category) => {
            const Icon = iconByName[category.iconName as keyof typeof iconByName] || Landmark;
            const count = publishedCounts[category.slug];

            return (
              <Link
                key={category.id}
                href={`/explore?category=${encodeURIComponent(category.slug)}`}
                className="group flex flex-col justify-between rounded-lg border border-[#ded7c9] bg-white p-6 transition-colors hover:border-[#aa3000] ambient-card-shadow"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[#ded7c9] bg-[#f6f4ea] text-[#aa3000] transition-colors group-hover:bg-[#aa3000] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-body rounded-full border border-[#ded7c9] bg-[#f6f4ea] px-2.5 py-0.5 text-[11px] font-medium text-[#6e675d]">
                      {count ? `${count} ${count === 1 ? 'record' : 'records'}` : 'Explore'}
                    </span>
                  </div>
                  <h3 className="font-headline mb-1 text-lg font-semibold leading-snug text-[#1c1c16] transition-colors group-hover:text-[#aa3000]">
                    {t(category.name, category.nameMalayalam)}
                  </h3>
                  <p className="font-body mt-2 text-xs leading-relaxed text-[#5d5e61] sm:text-sm">
                    {t(category.description, category.description)}
                  </p>
                </div>

                <div className="font-body mt-6 flex items-center justify-between border-t border-[#ece6da] pt-3.5 text-xs font-semibold text-[#aa3000] group-hover:text-[#c23700]">
                  <span>{t('Explore category', 'വിഭാഗം കാണുക')}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
