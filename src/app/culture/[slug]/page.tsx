import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_LISTINGS } from '@/data/mock-listings';
import {
  MapPin,
  ShieldCheck,
  Calendar,
  ExternalLink,
  BookOpen,
  User,
  Clock,
  Compass,
  ArrowLeft,
  Share2,
  AlertCircle
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return MOCK_LISTINGS.map((listing) => ({
    slug: listing.slug,
  }));
}

export default async function CulturalDetailPage({ params }: Props) {
  const { slug } = await params;
  const listing = MOCK_LISTINGS.find((l) => l.slug === slug);

  if (!listing) {
    notFound();
  }

  // Related discoveries in the same district or category
  const relatedListings = MOCK_LISTINGS.filter(
    (l) => l.id !== listing.id && (l.district === listing.district || l.category === listing.category)
  ).slice(0, 3);

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-6 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/explore" className="hover:text-black transition-colors">
          Explore
        </Link>
        <span>/</span>
        <Link
          href={`/explore?district=${encodeURIComponent(listing.district)}`}
          className="hover:text-black transition-colors"
        >
          {listing.district}
        </Link>
        <span>/</span>
        <span className="text-stone-900 font-semibold truncate max-w-xs">{listing.name}</span>
      </nav>

      {/* Header Block */}
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-[#FF5931] border border-orange-200">
            {listing.category}
          </span>
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{listing.verificationStatus}</span>
          </span>
          <span className="text-xs text-stone-500 ml-auto hidden sm:inline">
            Reviewed: {listing.lastReviewed}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-950 tracking-tight leading-tight">
          {listing.name}
        </h1>

        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl text-stone-600 font-medium font-serif">
            {listing.nameMalayalam}
          </h2>
          <span className="text-stone-400">·</span>
          <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#FF9041]" />
            <span>{listing.locality}, {listing.district}</span>
          </div>
        </div>
      </div>

      {/* Hero Image & Gallery Showcase */}
      <div className="relative rounded-3xl overflow-hidden border border-stone-200/90 shadow-md mb-10 bg-stone-900">
        <div className="aspect-[16/9] w-full max-h-[500px] overflow-hidden">
          <img
            src={listing.imageUrl}
            alt={listing.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3 bg-stone-950/90 text-stone-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-stone-800">
          <span>{listing.imageGallery[0]?.caption || listing.name}</span>
          <span className="text-stone-400 font-mono text-[11px]">{listing.imageCredit}</span>
        </div>
      </div>

      {/* Main Content Layout: 2 Columns (7 cols left, 5 cols right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column: Narrative, Significance, Lineage & Sources */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Introduction Callout */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF9041] mb-2 font-mono">
              Cultural Overview
            </h3>
            <p className="text-base sm:text-lg text-stone-800 font-medium leading-relaxed">
              {listing.shortDescription}
            </p>
          </div>

          {/* Full Background Story */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
            <h3 className="text-xl font-bold text-stone-950 mb-4 pb-2 border-b border-stone-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#FF9041]" />
              <span>Living Tradition & Lineage</span>
            </h3>
            <div className="prose prose-stone text-stone-700 leading-relaxed space-y-4 text-sm sm:text-base">
              {listing.fullStory.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Cultural Significance & Ritual Protocols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs">
              <h4 className="text-sm font-bold text-stone-950 mb-2 uppercase tracking-wider text-[#B21C01]">
                Cultural Significance
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {listing.culturalSignificance}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs">
              <h4 className="text-sm font-bold text-stone-950 mb-2 uppercase tracking-wider text-[#FF9041]">
                Visitor Protocol & Etiquette
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {listing.visitorProtocol}
              </p>
            </div>
          </div>

          {/* Archival Sources & Bibliography */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
            <h3 className="text-base font-bold text-stone-950 mb-4 flex items-center gap-2">
              <span>Original Source Citations & References</span>
            </h3>
            <ul className="space-y-3">
              {listing.sourceCitations.map((cite, index) => (
                <li
                  key={index}
                  className="flex items-start justify-between gap-4 p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-xs"
                >
                  <div>
                    <span className="font-semibold text-stone-900 block">{cite.title}</span>
                    <span className="text-stone-500">
                      {cite.authorOrArchive} {cite.year ? `(${cite.year})` : ''}
                    </span>
                  </div>
                  {cite.url && (
                    <a
                      href={cite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF9041] hover:underline flex items-center gap-1 flex-shrink-0"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Sidebar: Location, Contributor Card, Actions */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Location & Coordinates Card */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs flex flex-col gap-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Geographic Location
            </h3>
            <div className="text-xs text-stone-600 space-y-1">
              <p className="font-medium text-stone-900">{listing.address}</p>
              <p className="font-mono text-stone-400">
                Lat: {listing.coordinates.lat.toFixed(4)}, Lng: {listing.coordinates.lng.toFixed(4)}
              </p>
            </div>

            <Link
              href={`/explore?district=${encodeURIComponent(listing.district)}`}
              className="rounded-full bg-stone-100 hover:bg-stone-200 text-stone-900 font-semibold text-xs py-2.5 px-4 text-center transition-colors flex items-center justify-center gap-2"
            >
              <Compass className="w-3.5 h-3.5 text-[#FF9041]" />
              <span>Locate on Kerala Map</span>
            </Link>

            {listing.officialWebsite && (
              <a
                href={listing.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-stone-300 hover:border-black text-stone-900 font-semibold text-xs py-2 px-4 text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Official Heritage Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Verification & Contributor Seal */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs flex flex-col gap-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Verification & Provenance
            </h3>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Verified by Cultural Custodians</span>
              </div>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                {listing.verifiedBy}
              </p>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-stone-100 text-xs">
              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 font-bold">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
                  CONTRIBUTED BY
                </span>
                <span className="font-bold text-stone-900">{listing.contributor.name}</span>
                <p className="text-stone-500 text-[11px]">{listing.contributor.role}</p>
                <p className="text-stone-400 text-[10px]">
                  Submitted {listing.contributor.dateSubmitted}
                </p>
              </div>
            </div>

            <Link
              href={`/contribute?type=Correction&reference=${encodeURIComponent(listing.name)}`}
              className="rounded-full border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold py-2 px-3 text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <AlertCircle className="w-3.5 h-3.5 text-[#FF5931]" />
              <span>Suggest Factual Correction</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Related Discoveries Carousel */}
      {relatedListings.length > 0 && (
        <div className="mt-16 pt-12 border-t border-stone-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-stone-950">
              Related Cultural Discoveries in {listing.district}
            </h3>
            <Link
              href="/explore"
              className="text-xs font-semibold text-[#FF9041] hover:underline"
            >
              View all in directory →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedListings.map((rel) => (
              <Link
                key={rel.id}
                href={`/culture/${rel.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-md transition-all flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={rel.imageUrl}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5931]">
                      {rel.category}
                    </span>
                    <h4 className="font-bold text-sm text-stone-900 group-hover:text-[#FF5931] transition-colors mt-0.5 line-clamp-1">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                      {rel.shortDescription}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-stone-100 text-[11px] text-stone-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#FF9041]" />
                    <span>{rel.locality}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
