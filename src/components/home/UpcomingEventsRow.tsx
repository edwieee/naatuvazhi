'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_EVENTS } from '@/data/mock-events';
import { MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function UpcomingEventsRow() {
  const { t } = useLanguage();

  return (
    <section className="py-14 md:py-20 border-b border-[#e5e0d4] bg-[#f6f3eb]" id="calendar">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-body text-xs font-semibold text-[#aa3000] block mb-2">
              {t('Cultural calendar', 'സാംസ്കാരിക കലണ്ടർ')}
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#1c1c16] tracking-tight">
              {t('Upcoming festivals & ritual ceremonies', 'വരവറിയിക്കുന്ന ഉത്സവങ്ങളും അനുഷ്ഠാനങ്ങളും')}
            </h2>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-[#aa3000] hover:text-[#c23700] transition-colors"
          >
            <span>{t('View complete festival calendar', 'മുഴുവൻ കലണ്ടർ കാണുക')}</span>
            <ArrowRight className="w-4 h-4 text-[#aa3000]" />
          </Link>
        </div>

        {/* 4 Event Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_EVENTS.map((event) => {
            const monthStr = event.date.split('-')[1];
            const monthLabel = monthStr === '04' ? 'APR' : monthStr === '03' ? 'MAR' : monthStr === '02' ? 'FEB' : 'AUG';
            const dayStr = event.date.split('-')[2];

            return (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="bg-white border border-[#ded7c9] p-6 rounded-lg hover:border-[#26221e] transition-colors flex flex-col justify-between ambient-card-shadow group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {/* Quiet, Well-proportioned Date Block */}
                      <div className="bg-[#26221e] text-[#fcf9f0] px-3.5 py-2.5 rounded-md text-center min-w-[62px]">
                        <span className="font-mono text-[10px] tracking-wider block text-[#ffdbd0] uppercase font-bold">
                          {monthLabel}
                        </span>
                        <span className="font-headline text-2xl font-bold block leading-none pt-0.5">
                          {dayStr}
                        </span>
                      </div>
                      <div>
                        <span className="font-body text-sm font-semibold text-[#1c1c16] block">
                          {event.formattedDate}
                        </span>
                        <span className="font-body text-xs text-[#5d5e61] mt-0.5 block">
                          {event.time}
                        </span>
                      </div>
                    </div>

                    <span className="font-body text-[11px] bg-[#eef7ee] text-[#246b24] px-2.5 py-0.5 rounded-full border border-[#cbe6cb] font-medium">
                      {event.status}
                    </span>
                  </div>

                  <h3 className="font-headline text-lg font-semibold text-[#1c1c16] mb-1 group-hover:text-[#aa3000] transition-colors leading-snug">
                    {event.title}
                  </h3>
                  <p className="font-malayalam text-xs text-[#6e675d] mb-3">
                    {event.titleMalayalam}
                  </p>
                  <p className="font-body text-xs text-[#5d5e61] leading-relaxed mb-4 line-clamp-2">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ece6da] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[#5d5e61] font-body text-xs">
                    <MapPin className="w-3.5 h-3.5 text-[#aa3000] flex-shrink-0" />
                    <span className="truncate max-w-[280px]">{event.venue}, {event.district}</span>
                  </div>
                  <span className="font-body text-xs text-[#aa3000] group-hover:text-[#c23700] flex items-center gap-1 font-semibold">
                    <span>{t('View ritual schedule', 'സമയക്രമം കാണുക')}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#aa3000]" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
