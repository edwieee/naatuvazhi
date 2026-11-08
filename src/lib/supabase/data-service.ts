import {
  CulturalListing,
  EventListing,
  SubmissionReviewItem,
  DistrictName,
  ListingCategory,
} from '@/lib/types';
import { MOCK_LISTINGS } from '@/data/mock-listings';
import { MOCK_EVENTS } from '@/data/mock-events';
import { KERALA_DISTRICTS, DistrictInfo } from '@/data/mock-districts';
import { MOCK_ADMIN_SUBMISSIONS } from '@/data/mock-admin';

// In-memory mutable state for runtime fallback when Supabase env vars are not set
let liveListings: CulturalListing[] = [...MOCK_LISTINGS];
let liveEvents: EventListing[] = [...MOCK_EVENTS];
let liveSubmissions: SubmissionReviewItem[] = [...MOCK_ADMIN_SUBMISSIONS];
let liveReviewLogs: {
  id: string;
  submissionId?: string;
  listingId?: string;
  eventId?: string;
  reviewerName: string;
  action: string;
  notes: string;
  createdAt: string;
}[] = [
  {
    id: 'log-01',
    submissionId: 'sub-102',
    reviewerName: 'Dr. Radhakrishnan (Folklore Academy)',
    action: 'approved',
    notes: 'Verified with Kalamandalam alumni directory and archival photography permissions.',
    createdAt: '2026-03-02T15:00:00Z',
  },
  {
    id: 'log-02',
    submissionId: 'sub-104',
    reviewerName: 'Devika Warrier',
    action: 'changes_requested',
    notes: 'Requested official guild authorization seal.',
    createdAt: '2026-03-04T12:00:00Z',
  },
];

let liveHomepageConfig: Record<string, any> = {
  hero_headline: 'Discover the culture that lives around you',
  hero_eyebrow: 'Kerala cultural cartography · Public open archive',
  hero_subheadline:
    'A community-informed, scholar-verified living map of Kerala’s sacred groves, ritual performing arts, master practitioners, and craft guilds.',
  featured_listing_slugs: [
    'parassini-madappura-theyyam',
    'kerala-kalamandalam-cheruthuruthy',
    'aranmula-metal-mirror-craft',
    'cvn-kalari-kozhikode',
    'chavittu-nadakam-gothuruth',
    'tholpavakoothu-shadow-puppetry-koonathara',
  ],
  featured_event_slugs: [
    'thrissur-pooram-ilanjithara-melam',
    'parassini-madappura-annual-utsavam',
    'nishagandhi-monsoon-rhythms',
    'aranmula-valla-sadya-regatta',
  ],
  verification_charter: {
    pledge:
      'Nattuvazhi is a non-commercial, public-interest cultural documentation initiative. Traditional rituals are documented with deep respect to community sanctities and temple guidelines.',
    institutions: [
      'Kerala Folklore Academy',
      'Kerala Kalamandalam Deemed University',
      'District Cultural Officers',
      'Hereditary Custodians Guild',
    ],
  },
};

const hasSupabaseConfig = () => {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
};

// ====================================================================
// DISTRICTS & GEOGRAPHIC REGISTRY
// ====================================================================

export async function getDistricts(): Promise<DistrictInfo[]> {
  // Calculate dynamic listing counts based on published listings
  const countsByDistrict: Record<string, number> = {};
  liveListings.forEach((listing) => {
    countsByDistrict[listing.district] =
      (countsByDistrict[listing.district] || 0) + 1;
  });

  return KERALA_DISTRICTS.map((d) => ({
    ...d,
    listingCount: countsByDistrict[d.name] || d.listingCount || 0,
  }));
}

// ====================================================================
// CULTURAL LISTINGS
// ====================================================================

export interface ListingFilters {
  district?: string;
  category?: string;
  search?: string;
  featuredOnly?: boolean;
  status?: string;
}

export async function getListings(
  filters?: ListingFilters
): Promise<CulturalListing[]> {
  let results = [...liveListings];

  if (filters?.featuredOnly) {
    results = results.filter((item) => item.featured);
  }

  if (filters?.district && filters.district !== 'All') {
    results = results.filter(
      (item) => item.district.toLowerCase() === filters.district!.toLowerCase()
    );
  }

  if (filters?.category && filters.category !== 'All') {
    results = results.filter(
      (item) => item.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.nameMalayalam.toLowerCase().includes(q) ||
        item.artForm.toLowerCase().includes(q) ||
        item.locality.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return results;
}

export async function getListingBySlug(
  slug: string
): Promise<CulturalListing | null> {
  const listing = liveListings.find((item) => item.slug === slug);
  return listing || null;
}

export async function createListing(
  data: Partial<CulturalListing>
): Promise<CulturalListing> {
  const slug =
    data.slug ||
    data.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
    `listing-${Date.now()}`;

  const newListing: CulturalListing = {
    id: data.id || `c-${Date.now().toString().slice(-4)}`,
    slug,
    name: data.name || 'Untitled Discovery',
    nameMalayalam: data.nameMalayalam || '',
    category: data.category || 'Ritual Art',
    artForm: data.artForm || 'Traditional Ritual',
    district: data.district || 'Kannur',
    locality: data.locality || 'Unknown Locality',
    address: data.address || `${data.locality || ''}, Kerala`,
    coordinates: data.coordinates || { lat: 10.8505, lng: 76.2711 },
    shortDescription: data.shortDescription || '',
    fullStory: data.fullStory || data.shortDescription || '',
    culturalSignificance: data.culturalSignificance || '',
    visitorProtocol: data.visitorProtocol || 'Observe sacred temple guidelines and maintain respectful decorum.',
    imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1609137144829-873d6118b763?q=80&w=1200&auto=format&fit=crop',
    imageGallery: data.imageGallery || [],
    imageCredit: data.imageCredit || 'Community Documenter / Open Archive',
    verificationStatus: data.verificationStatus || 'Verified',
    verifiedBy: data.verifiedBy || 'Curatorial Verification Board',
    lastReviewed: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    sourceCitations: data.sourceCitations || [],
    officialWebsite: data.officialWebsite,
    contributor: data.contributor || {
      name: 'Curator Staff',
      role: 'Curatorial Verification Officer',
      dateSubmitted: new Date().toISOString().split('T')[0],
    },
    featured: Boolean(data.featured),
    tags: data.tags || [data.artForm || 'Culture', data.district || 'Kerala'],
  };

  liveListings = [newListing, ...liveListings];

  // Log action
  liveReviewLogs.unshift({
    id: `log-${Date.now()}`,
    listingId: newListing.id,
    reviewerName: 'Curator Portal',
    action: 'created_listing',
    notes: `Created new cultural listing: ${newListing.name}`,
    createdAt: new Date().toISOString(),
  });

  return newListing;
}

export async function updateListing(
  id: string,
  data: Partial<CulturalListing>
): Promise<CulturalListing | null> {
  const index = liveListings.findIndex((item) => item.id === id || item.slug === id);
  if (index === -1) return null;

  const existing = liveListings[index];
  const updated: CulturalListing = {
    ...existing,
    ...data,
    lastReviewed: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  };

  liveListings[index] = updated;

  liveReviewLogs.unshift({
    id: `log-${Date.now()}`,
    listingId: updated.id,
    reviewerName: 'Curator Portal',
    action: 'updated_listing',
    notes: `Updated listing information for ${updated.name}`,
    createdAt: new Date().toISOString(),
  });

  return updated;
}

export async function deleteListing(id: string): Promise<boolean> {
  const initialLen = liveListings.length;
  liveListings = liveListings.filter((item) => item.id !== id && item.slug !== id);
  return liveListings.length < initialLen;
}

// ====================================================================
// EVENTS & LIVING FESTIVALS
// ====================================================================

export interface EventFilters {
  district?: string;
  category?: string;
  search?: string;
  status?: string;
  upcomingOnly?: boolean;
}

export async function getEvents(filters?: EventFilters): Promise<EventListing[]> {
  let results = [...liveEvents];

  if (filters?.upcomingOnly) {
    const today = new Date().toISOString().split('T')[0];
    results = results.filter((ev) => ev.date >= today || ev.status === 'Annual Season');
  }

  if (filters?.district && filters.district !== 'All') {
    results = results.filter(
      (ev) => ev.district.toLowerCase() === filters.district!.toLowerCase()
    );
  }

  if (filters?.status && filters.status !== 'All') {
    results = results.filter((ev) => ev.status === filters.status);
  }

  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    results = results.filter(
      (ev) =>
        ev.title.toLowerCase().includes(q) ||
        ev.titleMalayalam.toLowerCase().includes(q) ||
        ev.venue.toLowerCase().includes(q) ||
        ev.organizer.toLowerCase().includes(q) ||
        ev.artForm.toLowerCase().includes(q)
    );
  }

  // Sort by date ascending
  results.sort((a, b) => a.date.localeCompare(b.date));

  return results;
}

export async function getEventBySlug(slug: string): Promise<EventListing | null> {
  const event = liveEvents.find((ev) => ev.slug === slug);
  return event || null;
}

export async function createEvent(data: Partial<EventListing>): Promise<EventListing> {
  const slug =
    data.slug ||
    data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
    `event-${Date.now()}`;

  const newEvent: EventListing = {
    id: data.id || `ev-${Date.now().toString().slice(-4)}`,
    slug,
    title: data.title || 'Untitled Cultural Gathering',
    titleMalayalam: data.titleMalayalam || '',
    category: data.category || 'Temple Festival & Percussion',
    artForm: data.artForm || 'Ritual Ensembles',
    date: data.date || new Date().toISOString().split('T')[0],
    formattedDate:
      data.formattedDate ||
      new Date(data.date || Date.now()).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    time: data.time || '10:00 AM – 09:00 PM',
    venue: data.venue || 'Heritage Grounds',
    district: data.district || 'Thrissur',
    locality: data.locality || 'Central Grounds',
    address: data.address,
    organizer: data.organizer || 'Festival Trustee Committee',
    description: data.description || '',
    culturalContext: data.culturalContext || '',
    sourceLink: data.sourceLink || 'https://keralatourism.org',
    lastConfirmedDate: `Confirmed just now via Curator Portal`,
    status: data.status || 'Confirmed',
    imageUrl:
      data.imageUrl ||
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop',
    entryType: data.entryType || 'Free Entry',
    scheduleHighlights: data.scheduleHighlights || [],
  };

  liveEvents = [newEvent, ...liveEvents];

  liveReviewLogs.unshift({
    id: `log-${Date.now()}`,
    eventId: newEvent.id,
    reviewerName: 'Curator Portal',
    action: 'created_event',
    notes: `Added event: ${newEvent.title} on ${newEvent.date}`,
    createdAt: new Date().toISOString(),
  });

  return newEvent;
}

export async function updateEvent(
  id: string,
  data: Partial<EventListing>
): Promise<EventListing | null> {
  const index = liveEvents.findIndex((ev) => ev.id === id || ev.slug === id);
  if (index === -1) return null;

  const existing = liveEvents[index];
  const updated: EventListing = {
    ...existing,
    ...data,
    lastConfirmedDate: `Verified on ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} via Curator Portal`,
  };

  liveEvents[index] = updated;

  liveReviewLogs.unshift({
    id: `log-${Date.now()}`,
    eventId: updated.id,
    reviewerName: 'Curator Portal',
    action: 'updated_event_date_or_status',
    notes: `Updated event ${updated.title} — Date: ${updated.date}, Status: ${updated.status}`,
    createdAt: new Date().toISOString(),
  });

  return updated;
}

export async function deleteEvent(id: string): Promise<boolean> {
  const initialLen = liveEvents.length;
  liveEvents = liveEvents.filter((ev) => ev.id !== id && ev.slug !== id);
  return liveEvents.length < initialLen;
}

// ====================================================================
// SUBMISSIONS & MODERATION WORKFLOW
// ====================================================================

export async function getSubmissions(filters?: {
  status?: string;
  search?: string;
}): Promise<SubmissionReviewItem[]> {
  let results = [...liveSubmissions];

  if (filters?.status && filters.status !== 'All') {
    results = results.filter((sub) => sub.status === filters.status);
  }

  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    results = results.filter(
      (sub) =>
        sub.name.toLowerCase().includes(q) ||
        sub.contributorName.toLowerCase().includes(q) ||
        sub.district.toLowerCase().includes(q) ||
        sub.artForm.toLowerCase().includes(q)
    );
  }

  return results;
}

export async function getSubmissionById(
  id: string
): Promise<SubmissionReviewItem | null> {
  const sub = liveSubmissions.find((s) => s.id === id);
  return sub || null;
}

export async function createSubmission(
  data: Partial<SubmissionReviewItem>
): Promise<SubmissionReviewItem> {
  const newSub: SubmissionReviewItem = {
    id: `sub-${Math.floor(100 + Math.random() * 900)}`,
    type: data.type || 'Place',
    name: data.name || 'Untitled Submission',
    artForm: data.artForm || '',
    district: data.district || 'Kannur',
    locality: data.locality || '',
    description: data.description || '',
    culturalSignificance: data.culturalSignificance || '',
    sources: data.sources || [],
    contributorName: data.contributorName || 'Anonymous Custodian',
    contributorEmail: data.contributorEmail || 'contributor@nattuvazhi.org',
    submittedAt: new Date().toISOString(),
    status: 'Pending',
    reviewerNotes: '',
    urgency: data.urgency || 'Medium',
  };

  liveSubmissions.unshift(newSub);
  return newSub;
}

export async function updateSubmissionStatus(
  id: string,
  status: 'Pending' | 'Approved' | 'Changes Requested' | 'Rejected',
  reviewerNotes?: string
): Promise<SubmissionReviewItem | null> {
  const index = liveSubmissions.findIndex((s) => s.id === id);
  if (index === -1) return null;

  const existing = liveSubmissions[index];
  const updated: SubmissionReviewItem = {
    ...existing,
    status,
    reviewerNotes: reviewerNotes ?? existing.reviewerNotes,
  };

  liveSubmissions[index] = updated;

  liveReviewLogs.unshift({
    id: `log-${Date.now()}`,
    submissionId: id,
    reviewerName: 'Curator Staff',
    action: `submission_${status.toLowerCase().replace(/\s+/g, '_')}`,
    notes: reviewerNotes || `Status updated to ${status}`,
    createdAt: new Date().toISOString(),
  });

  return updated;
}

export async function approveSubmissionAndPublish(
  id: string,
  reviewerNotes?: string
): Promise<{ submission: SubmissionReviewItem; listing?: CulturalListing }> {
  const sub = await updateSubmissionStatus(id, 'Approved', reviewerNotes);
  if (!sub) {
    throw new Error(`Submission ${id} not found.`);
  }

  let created: CulturalListing | undefined;

  // If submission is a Place, Artist, or Institution, convert to live listing
  if (['Place', 'Artist', 'Institution'].includes(sub.type)) {
    const slug = sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    created = await createListing({
      slug,
      name: sub.name,
      nameMalayalam: '',
      category: sub.type === 'Artist' ? 'Master Practitioner' : sub.type === 'Institution' ? 'Cultural Institution' : 'Sacred Space',
      artForm: sub.artForm,
      district: sub.district,
      locality: sub.locality,
      address: `${sub.locality}, ${sub.district}, Kerala`,
      shortDescription: sub.description,
      fullStory: `${sub.description}\n\nCultural Significance:\n${sub.culturalSignificance}`,
      culturalSignificance: sub.culturalSignificance,
      visitorProtocol: 'Respectful visitation in accordance with hereditary customs.',
      verificationStatus: 'Verified',
      verifiedBy: 'Folklore Academy Peer Review',
      sourceCitations: sub.sources.map((s) => ({
        title: s,
        authorOrArchive: 'Submitted Source Documentation',
      })),
      contributor: {
        name: sub.contributorName,
        role: 'Community Heritage Contributor',
        dateSubmitted: sub.submittedAt.split('T')[0],
      },
      featured: false,
    });
  }

  return { submission: sub, listing: created };
}

// ====================================================================
// HOMEPAGE CONFIG & AUDIT LOGS
// ====================================================================

export async function getHomepageConfig(): Promise<Record<string, any>> {
  return { ...liveHomepageConfig };
}

export async function updateHomepageConfig(
  key: string,
  value: any,
  updatedBy: string = 'Curator'
): Promise<boolean> {
  liveHomepageConfig[key] = value;
  liveReviewLogs.unshift({
    id: `log-${Date.now()}`,
    reviewerName: updatedBy,
    action: 'updated_homepage_config',
    notes: `Updated homepage config key: ${key}`,
    createdAt: new Date().toISOString(),
  });
  return true;
}

export async function getReviewLogs() {
  return [...liveReviewLogs];
}
