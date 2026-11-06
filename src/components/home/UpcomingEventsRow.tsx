'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_EVENTS } from '@/data/mock-events';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function UpcomingEventsRow() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 border-b border-[#E8E2D6] bg-[#FFF9F0]/40">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#5C554B] mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9041]"></span>
              <span>{t('CULTURAL CALENDAR', 'സാംസ്കാരിക കലണ്ടർ')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#000000] tracking-tight">
              {t('Upcoming Festivals & Ritual Ceremonies', 'വരവറിയിക്കുന്ന ഉത്സവങ്ങളും അനുഷ്ഠാനങ്ങളും')}
            </h2>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#000000] hover:text-[#FF5931] transition-colors"
          >
            <span>{t('View complete festival calendar', 'മുഴുവൻ കലണ്ടർ കാണുക')}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FF9041]" />
          </Link>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_EVENTS.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="group bg-white rounded-xl p-5 border border-[#E8E2D6] hover:border-[#FF9041] transition-colors flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  {/* Clean Date Block with Golden Orange Accents */}
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-md bg-[#FFF2E0] border border-[#FFB658]/40 text-[#000000]">
                      <span className="text-[10px] font-mono font-bold text-[#FF5931] uppercase">
                        {event.date.split('-')[1] === '04' ? 'APR' : event.date.split('-')[1] === '03' ? 'MAR' : event.date.split('-')[1] === '02' ? 'FEB' : 'AUG'}
                      </span>
                      <span className="text-sm font-bold font-mono tabular-nums leading-none text-[#000000]">
                        {event.date.split('-')[2]}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#000000] block">
                        {event.formattedDate}
                      </span>
                      <span className="text-xs text-[#5C554B] flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-[#FF9041]" />
                        <span>{event.time}</span>
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono uppercase tracking-wider bg-[#FFF9F0] text-[#FF5931] border border-[#FFB658]/30">
                    {event.status}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[#000000] group-hover:text-[#FF5931] transition-colors leading-snug">
                  {event.title}
                </h3>
                <div className="text-xs text-[#5C554B] font-serif mt-0.5 mb-2">
                  {event.titleMalayalam}
                </div>

                <p className="text-xs text-[#5C554B] line-clamp-2 leading-relaxed mb-3">
                  {event.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-[#5C554B] pt-2 border-t border-[#E8E2D6]">
                  <MapPin className="w-3.5 h-3.5 text-[#FF9041]" />
                  <span>{event.venue}, {event.district}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8E2D6] flex items-center justify-between text-xs text-[#000000] font-semibold group-hover:text-[#FF5931]">
                <span>View ritual schedule</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF9041]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
