'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_EVENTS } from '@/data/mock-events';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function UpcomingEventsRow() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 border-b border-[#E8E2D6] bg-[#F8F5EE]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono text-[#8C8273] mb-1">
              {t('CULTURAL CALENDAR', 'സാംസ്കാരിക കലണ്ടർ')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#181512] tracking-tight">
              {t('Upcoming Festivals & Ritual Ceremonies', 'വരവറിയിക്കുന്ന ഉത്സവങ്ങളും അനുഷ്ഠാനങ്ങളും')}
            </h2>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#181512] hover:text-[#B21C01] transition-colors"
          >
            <span>{t('View complete festival calendar', 'മുഴുവൻ കലണ്ടർ കാണുക')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_EVENTS.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="bg-white rounded-xl p-5 border border-[#E8E2D6] hover:border-[#BFB5A5] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  {/* Clean Date Block */}
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-md bg-[#F3EFE8] border border-[#E8E2D6] text-[#181512]">
                      <span className="text-[10px] font-mono font-medium text-[#8C8273] uppercase">
                        {event.date.split('-')[1] === '04' ? 'APR' : event.date.split('-')[1] === '03' ? 'MAR' : event.date.split('-')[1] === '02' ? 'FEB' : 'AUG'}
                      </span>
                      <span className="text-sm font-bold font-mono tabular-nums leading-none">
                        {event.date.split('-')[2]}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#181512] block">
                        {event.formattedDate}
                      </span>
                      <span className="text-xs text-[#8C8273] flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-[#8C8273]" />
                        <span>{event.time}</span>
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono uppercase tracking-wider bg-[#F3EFE8] text-[#5C554B] border border-[#E8E2D6]">
                    {event.status}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[#181512] hover:text-[#B21C01] transition-colors leading-snug">
                  {event.title}
                </h3>
                <div className="text-xs text-[#8C8273] font-serif mt-0.5 mb-2">
                  {event.titleMalayalam}
                </div>

                <p className="text-xs text-[#5C554B] line-clamp-2 leading-relaxed mb-3">
                  {event.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-[#5C554B] pt-2 border-t border-[#EDE7DC]">
                  <MapPin className="w-3.5 h-3.5 text-[#8C8273]" />
                  <span>{event.venue}, {event.district}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EDE7DC] flex items-center justify-between text-xs text-[#181512] font-medium">
                <span>View ritual schedule</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8C8273]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
