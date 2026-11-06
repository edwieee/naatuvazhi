import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_LISTINGS } from '@/data/mock-listings';
import {
  MapPin,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  User,
  Compass,
  FileText,
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

  const relatedListings = MOCK_LISTINGS.filter(
    (l) => l.id !== listing.id && (l.district === listing.district || l.category === listing.category)
  ).slice(0, 3);

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-8 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#8C8273] mb-6 flex-wrap">
        <Link href="/" className="hover:text-[#181512] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/explore" className="hover:text-[#181512] transition-colors">
          Explore
        </Link>
        <span>/</span>
        <Link
          href={`/explore?district=${encodeURIComponent(listing.district)}`}
          className="hover:text-[#181512] transition-colors"
        >
          {listing.district}
        </Link>
        <span>/</span>
        <span className="text-[#181512] font-medium truncate max-w-xs">{listing.name}</span>
      </nav>

      {/* Header Block */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono text-[#8C8273]">
            № KL-{listing.district.substring(0, 3).toUpperCase()}-{listing.id.replace('c-', '')}
          </span>
          <span>·</span>
          <span className="px-2 py-0.5 rounded-sm bg-[#F3EFE8] text-[#181512] font-mono text-[11px] border border-[#E8E2D6]">
            {listing.category}
          </span>
          <span className="text-[#2D6A4F] font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{listing.verificationStatus}</span>
          </span>
          <span className="text-[#8C8273] ml-auto hidden sm:inline text-[11px]">
            Reviewed: {listing.lastReviewed}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold text-[#181512] tracking-tight leading-tight mt-1">
          {listing.name}
        </h1>

        <div className="flex items-center gap-3">
          <h2 className="text-xl text-[#5C554B] font-serif">
            {listing.nameMalayalam}
          </h2>
          <span className="text-[#8C8273]">·</span>
          <div className="flex items-center gap-1 text-xs text-[#5C554B]">
            <MapPin className="w-3.5 h-3.5 text-[#8C8273]" />
            <span>{listing.locality}, {listing.district}</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative rounded-xl overflow-hidden border border-[#E8E2D6] shadow-xs mb-8 bg-[#181512]">
        <div className="aspect-[16/9] w-full max-h-[460px] overflow-hidden">
          <img
            src={listing.imageUrl}
            alt={listing.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3 bg-[#181512] text-[#A8A29E] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-[#2D2A26]">
          <span>{listing.imageGallery[0]?.caption || listing.name}</span>
          <span className="text-[#8C8273] font-mono text-[10px]">{listing.imageCredit}</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Overview */}
          <div className="p-5 rounded-xl bg-[#F8F5EE] border border-[#E8E2D6]">
            <div className="text-[10px] font-mono text-[#8C8273] mb-1.5">
              ARCHIVAL ABSTRACT
            </div>
            <p className="text-sm sm:text-base text-[#181512] leading-relaxed">
              {listing.shortDescription}
            </p>
          </div>

          {/* Full Narrative */}
          <div className="bg-white rounded-xl p-6 border border-[#E8E2D6] shadow-xs">
            <h3 className="text-base font-semibold text-[#181512] mb-4 pb-2 border-b border-[#EDE7DC] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#8C8273]" />
              <span>Living Tradition & Lineage</span>
            </h3>
            <div className="text-[#5C554B] leading-relaxed space-y-4 text-xs sm:text-sm">
              {listing.fullStory.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Significance & Visitor Guidelines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-5 border border-[#E8E2D6] shadow-xs">
              <h4 className="text-xs font-semibold text-[#181512] mb-2 font-mono">
                CULTURAL SIGNIFICANCE
              </h4>
              <p className="text-xs text-[#5C554B] leading-relaxed">
                {listing.culturalSignificance}
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-[#E8E2D6] shadow-xs">
              <h4 className="text-xs font-semibold text-[#181512] mb-2 font-mono">
                VISITOR PROTOCOL & SANCTUM ETIQUETTE
              </h4>
              <p className="text-xs text-[#5C554B] leading-relaxed">
                {listing.visitorProtocol}
              </p>
            </div>
          </div>

          {/* Sources and Citations */}
          <div className="bg-white rounded-xl p-6 border border-[#E8E2D6] shadow-xs">
            <h3 className="text-xs font-mono text-[#8C8273] mb-3">
              ARCHIVAL CITATIONS & REFERENCES
            </h3>
            <ul className="space-y-2">
              {listing.sourceCitations.map((cite, index) => (
                <li
                  key={index}
                  className="flex items-start justify-between gap-3 p-3 rounded-md bg-[#FBF9F5] border border-[#EDE7DC] text-xs"
                >
                  <div>
                    <span className="font-semibold text-[#181512] block">{cite.title}</span>
                    <span className="text-[#8C8273]">
                      {cite.authorOrArchive} {cite.year ? `(${cite.year})` : ''}
                    </span>
                  </div>
                  {cite.url && (
                    <a
                      href={cite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#B21C01] hover:underline flex items-center gap-1 flex-shrink-0"
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

        {/* Right Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Location Card */}
          <div className="bg-white rounded-xl p-5 border border-[#E8E2D6] shadow-xs flex flex-col gap-3">
            <h3 className="text-xs font-mono text-[#8C8273]">
              GEOGRAPHIC LOCATION
            </h3>
            <div className="text-xs text-[#5C554B] space-y-1">
              <p className="font-medium text-[#181512]">{listing.address}</p>
              <p className="font-mono text-[#8C8273]">
                {listing.coordinates.lat.toFixed(4)}° N, {listing.coordinates.lng.toFixed(4)}° E
              </p>
            </div>

            <Link
              href={`/explore?district=${encodeURIComponent(listing.district)}`}
              className="rounded-md bg-[#F3EFE8] hover:bg-[#EAE4D9] text-[#181512] font-medium text-xs py-2 px-3 text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-[#8C8273]" />
              <span>Locate on Kerala map</span>
            </Link>

            {listing.officialWebsite && (
              <a
                href={listing.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-[#E8E2D6] hover:border-[#181512] text-[#181512] font-medium text-xs py-2 px-3 text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Official site</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Verification & Contributor Seal */}
          <div className="bg-white rounded-xl p-5 border border-[#E8E2D6] shadow-xs flex flex-col gap-3">
            <h3 className="text-xs font-mono text-[#8C8273]">
              PROVENANCE & CURATION
            </h3>

            <div className="p-3 rounded-md bg-[#F8F5EE] border border-[#E8E2D6] text-xs text-[#5C554B] flex flex-col gap-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#181512]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>Verified by Cultural Officer</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#5C554B]">
                {listing.verifiedBy}
              </p>
            </div>

            <div className="flex items-start gap-2.5 pt-2 border-t border-[#EDE7DC] text-xs">
              <div className="w-7 h-7 rounded-md bg-[#F3EFE8] flex items-center justify-center text-[#8C8273]">
                <User className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-semibold text-[#181512] block">{listing.contributor.name}</span>
                <p className="text-[#8C8273] text-[11px]">{listing.contributor.role}</p>
                <p className="text-[#8C8273] text-[10px]">
                  Submitted {listing.contributor.dateSubmitted}
                </p>
              </div>
            </div>

            <Link
              href={`/contribute?type=Correction&reference=${encodeURIComponent(listing.name)}`}
              className="rounded-md border border-[#E8E2D6] hover:bg-[#F3EFE8] text-[#5C554B] hover:text-[#181512] text-xs font-medium py-1.5 px-3 text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <AlertCircle className="w-3 h-3 text-[#B21C01]" />
              <span>Suggest correction</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Related Discoveries */}
      {relatedListings.length > 0 && (
        <div className="mt-16 pt-8 border-t border-[#E8E2D6]">
          <h3 className="text-base font-semibold text-[#181512] mb-4">
            Related cultural discoveries in {listing.district}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedListings.map((rel) => (
              <Link
                key={rel.id}
                href={`/culture/${rel.slug}`}
                className="bg-white rounded-md overflow-hidden border border-[#E8E2D6] hover:border-[#181512] transition-colors flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#F3EFE8]">
                  <img
                    src={rel.imageUrl}
                    alt={rel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#8C8273]">
                      {rel.category}
                    </span>
                    <h4 className="font-semibold text-xs text-[#181512] hover:text-[#B21C01] mt-0.5 line-clamp-1">
                      {rel.name}
                    </h4>
                  </div>
                  <div className="mt-2 pt-2 border-t border-[#EDE7DC] text-[10px] text-[#8C8273]">
                    {rel.locality}
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
