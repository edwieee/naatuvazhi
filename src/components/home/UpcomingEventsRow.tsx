'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_EVENTS } from '@/data/mock-events';
import { Calendar, Clock, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function UpcomingEventsRow() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2] border-t border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#FF5931] mb-2 font-mono">
              {t('LIVING CALENDAR', 'സാംസ്കാരിക കലണ്ടർ')}
            </div>
            <h2 className="text-3xl font-extrabold text-stone-950 tracking-tight">
              {t('Upcoming Cultural Events & Festivals', 'വരവറിയിക്കുന്ന ഉത്സവങ്ങളും അനുഷ്ഠാനങ്ങളും')}
            </h2>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 hover:text-[#FF5931] transition-colors group"
          >
            <span>{t('View complete festival calendar', 'മുഴുവൻ കലണ്ടർ കാണുക')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_EVENTS.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="group bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  {/* Date Block */}
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 text-[#FF9041]">
                      <Calendar className="w-4 h-4 mb-0.5" />
                      <span className="text-xs font-bold tracking-tight font-mono">
                        {event.date.split('-')[1]}/{event.date.split('-')[2]}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">
                        {event.formattedDate}
                      </span>
                      <span className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-stone-400" />
                        {event.time}
                      </span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {event.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-stone-900 group-hover:text-[#FF5931] transition-colors leading-snug">
                  {event.title}
                </h3>
                <div className="text-xs text-stone-500 font-medium mt-0.5 mb-3">
                  {event.titleMalayalam}
                </div>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                  {event.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 pt-2 border-t border-stone-100">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF9041]" />
                    <span className="font-medium text-stone-700">{event.venue}, {event.district}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{event.lastConfirmedDate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-900 group-hover:text-[#FF5931]">
                <span>View ritual schedule & visitor protocols</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
