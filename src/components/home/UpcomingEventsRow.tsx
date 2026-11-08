'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MOCK_EVENTS } from '@/data/mock-events';
import { getEvents, KERALA_PLATFORM_DATE } from '@/lib/supabase/data-service';
import { EventListing } from '@/lib/types';
import { MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function UpcomingEventsRow() {
  const { language, t } = useLanguage();
  const [events, setEvents] = useState<EventListing[]>(() =>
    MOCK_EVENTS.filter((e) => e.date >= KERALA_PLATFORM_DATE && e.status !== 'Completed').slice(0, 4)
  );

  useEffect(() => {
    let isMounted = true;
    getEvents({ upcomingOnly: true })
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setEvents(data.slice(0, 4));
        }
      })
      .catch((err) => {
        console.warn('Fallback to upcoming mock events in row:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-14 md:py-20 border-b border-[#e5e0d4] bg-[#FCFBEF]" id="calendar">
      <div className="max-w-[1120px] mx-auto px-4 md:px-10 xl:px-0">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <span className="font-body text-xs font-semibold text-[#aa3000] block mb-2">
              {t('Cultural calendar', 'സാംസ്കാരിക കലണ്ടർ')}
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#1c1c16] tracking-tight mb-2">
              {t('Festivals and events across Kerala', 'കേരളത്തിലെ ഉത്സവങ്ങളും സാംസ്കാരിക ഒത്തുചേരലുകളും')}
            </h2>
            <p className="font-body text-sm text-[#5d5e61] leading-relaxed">
              {t(
                'Find upcoming festivals, performances and cultural gatherings. Check the date, location, organiser and original event information.',
                'വരവറിയിക്കുന്ന ഉത്സവങ്ങളും അനുഷ്ഠാന കലകളും. തീയതി, സ്ഥലം, സംഘാടകർ, വിവരസ്രോതസ്സുകൾ എന്നിവ നേരിട്ടറിയാം.'
              )}
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-[#aa3000] hover:text-[#c23700] transition-colors whitespace-nowrap"
          >
            <span>{t('View complete festival calendar', 'മുഴുവൻ കലണ്ടർ കാണുക')}</span>
            <ArrowRight className="w-4 h-4 text-[#aa3000]" />
          </Link>
        </div>

        {/* 4 Event Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => {
            const dateParts = event.date.split('-');
            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1;
            const day = parseInt(dateParts[2], 10);
            const dateObj = new Date(Date.UTC(year, month, day));

            const monthLabel = dateObj.toLocaleDateString('en-US', {
              month: 'short',
              timeZone: 'UTC',
            }).toUpperCase();
            const dayStr = String(day).padStart(2, '0');

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

                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                      <span className="font-body text-[11px] bg-[#f6f4ea] text-[#7d3b24] px-2 py-0.5 rounded-sm border border-[#ded7c9] font-medium self-start sm:self-auto">
                        {event.category}
                      </span>
                      <span className="font-body text-[11px] bg-[#eef7ee] text-[#246b24] px-2.5 py-0.5 rounded-full border border-[#cbe6cb] font-medium self-start sm:self-auto">
                        {event.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-headline text-lg font-semibold text-[#1c1c16] mb-2 group-hover:text-[#aa3000] transition-colors leading-snug">
                    {language === 'ml' && event.titleMalayalam ? event.titleMalayalam : event.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#5d5e61] font-body mb-2.5">
                    <span className="font-medium text-[#1c1c16]">{t('Organiser:', 'സംഘാടകർ:')}</span>
                    <span className="truncate max-w-[320px]">{event.organizer}</span>
                  </div>

                  <p className="font-body text-xs text-[#5d5e61] leading-relaxed mb-4 line-clamp-2">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ece6da] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[#5d5e61] font-body text-xs">
                    <MapPin className="w-3.5 h-3.5 text-[#aa3000] flex-shrink-0" />
                    <span className="truncate max-w-[280px]">
                      {event.venue}, {event.district}
                    </span>
                  </div>
                  <span className="font-body text-xs text-[#aa3000] group-hover:text-[#c23700] flex items-center gap-1 font-semibold">
                    <span>{t('View event details', 'വിവരങ്ങൾ കാണുക')}</span>
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
