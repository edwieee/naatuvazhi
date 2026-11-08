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
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// In-memory mutable state for runtime fallback
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

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key) {
    try {
      return createSupabaseClient(url, key);
    } catch {
      return null;
    }
  }
  return null;
}

// Helpers to map DB records to TypeScript models
function mapDbListing(row: any): CulturalListing {
  const districtName = row.districts?.name || row.district || 'Kannur';
  const categoryName = row.categories?.name || row.category || 'Ritual Art';

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    nameMalayalam: row.name_malayalam || '',
    category: categoryName as ListingCategory,
    artForm: row.art_form,
    district: districtName as DistrictName,
    locality: row.locality,
    address: row.address,
    coordinates: { lat: row.latitude, lng: row.longitude },
    shortDescription: row.short_description,
    fullStory: row.full_story,
    culturalSignificance: row.cultural_significance,
    visitorProtocol: row.visitor_protocol,
    imageUrl: row.image_url,
    imageGallery: Array.isArray(row.media)
      ? row.media.map((m: any) => ({ url: m.url, caption: m.caption, credit: m.credit }))
      : [],
    imageCredit: row.image_credit,
    verificationStatus: row.verification_status,
    verifiedBy: row.verified_by,
    lastReviewed: row.last_reviewed
      ? new Date(row.last_reviewed).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      : '',
    sourceCitations: Array.isArray(row.sources)
      ? row.sources.map((s: any) => ({ title: s.title, authorOrArchive: s.author_or_archive, year: s.year, url: s.url }))
      : [],
    officialWebsite: row.official_website,
    contributor: {
      name: row.contributor_name || 'Curator Staff',
      role: row.contributor_role || 'Contributor',
      dateSubmitted: row.contributor_submitted_at ? row.contributor_submitted_at.split('T')[0] : '',
    },
    featured: row.featured,
    tags: row.tags || [],
  };
}

function mapDbEvent(row: any): EventListing {
  const districtName = row.districts?.name || row.district || 'Thrissur';

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    titleMalayalam: row.title_malayalam || '',
    category: row.category,
    artForm: row.art_form,
    date: row.event_date,
    formattedDate: row.formatted_date,
    time: row.time,
    venue: row.venue,
    district: districtName as DistrictName,
    locality: row.locality,
    address: row.address,
    organizer: row.organizer,
    description: row.description,
    culturalContext: row.cultural_context,
    sourceLink: row.source_link,
    lastConfirmedDate: row.last_confirmed_date
      ? `Verified ${new Date(row.last_confirmed_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
      : 'Recently Verified',
    status: row.status,
    imageUrl: row.image_url,
    entryType: row.entry_type,
    scheduleHighlights: Array.isArray(row.schedule_highlights) ? row.schedule_highlights : [],
  };
}

// ====================================================================
// DISTRICTS & GEOGRAPHIC REGISTRY
// ====================================================================

export async function getDistricts(): Promise<DistrictInfo[]> {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data: dbDistricts, error: distErr } = await sb
        .from('districts')
        .select('code, name, name_malayalam, center_lat, center_lng, cultural_signature, primary_art_forms');

      const { data: countRows } = await sb
        .from('listings')
        .select('district_id, districts(name)')
        .eq('publication_status', 'published');

      if (!distErr && dbDistricts && dbDistricts.length > 0) {
        const countsByDistrict: Record<string, number> = {};
        countRows?.forEach((r: any) => {
          const dName = r.districts?.name;
          if (dName) countsByDistrict[dName] = (countsByDistrict[dName] || 0) + 1;
        });

        return dbDistricts.map((d: any) => ({
          name: d.name as DistrictName,
          nameMalayalam: d.name_malayalam,
          code: d.code,
          center: { lat: d.center_lat, lng: d.center_lng },
          culturalSignature: d.cultural_signature,
          primaryArtForms: d.primary_art_forms || [],
          listingCount: countsByDistrict[d.name] || 0,
        }));
      }
    } catch (e) {
      console.warn('Fallback to local districts due to:', e);
    }
  }

  // Fallback
  const countsByDistrict: Record<string, number> = {};
  liveListings.forEach((listing) => {
    countsByDistrict[listing.district] = (countsByDistrict[listing.district] || 0) + 1;
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

export async function getListings(filters?: ListingFilters): Promise<CulturalListing[]> {
  const sb = getSupabase();
  if (sb) {
    try {
      let query = sb
        .from('listings')
        .select('*, districts(name), categories(name), media(*), sources(*)')
        .eq('publication_status', 'published');

      if (filters?.featuredOnly) {
        query = query.eq('featured', true);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        let results = data.map(mapDbListing);

        if (filters?.district && filters.district !== 'All') {
          results = results.filter((i) => i.district.toLowerCase() === filters.district!.toLowerCase());
        }
        if (filters?.category && filters.category !== 'All') {
          results = results.filter((i) => i.category.toLowerCase() === filters.category!.toLowerCase());
        }
        if (filters?.search && filters.search.trim()) {
          const q = filters.search.toLowerCase().trim();
          results = results.filter(
            (i) =>
              i.name.toLowerCase().includes(q) ||
              i.artForm.toLowerCase().includes(q) ||
              i.locality.toLowerCase().includes(q) ||
              i.shortDescription.toLowerCase().includes(q)
          );
        }
        return results;
      }
    } catch (e) {
      console.warn('Fallback to local listings:', e);
    }
  }

  // Fallback
  let results = [...liveListings];
  if (filters?.featuredOnly) results = results.filter((item) => item.featured);
  if (filters?.district && filters.district !== 'All') {
    results = results.filter((item) => item.district.toLowerCase() === filters.district!.toLowerCase());
  }
  if (filters?.category && filters.category !== 'All') {
    results = results.filter((item) => item.category.toLowerCase() === filters.category!.toLowerCase());
  }
  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.nameMalayalam.toLowerCase().includes(q) ||
        item.artForm.toLowerCase().includes(q) ||
        item.locality.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q)
    );
  }
  return results;
}

export async function getListingBySlug(slug: string): Promise<CulturalListing | null> {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb
        .from('listings')
        .select('*, districts(name), categories(name), media(*), sources(*)')
        .eq('slug', slug)
        .single();

      if (!error && data) {
        return mapDbListing(data);
      }
    } catch (e) {
      console.warn('Fallback to local listing by slug:', e);
    }
  }

  const listing = liveListings.find((item) => item.slug === slug);
  return listing || null;
}

export async function createListing(data: Partial<CulturalListing>): Promise<CulturalListing> {
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

  const sb = getSupabase();
  if (sb) {
    try {
      const { data: dist } = await sb.from('districts').select('id').eq('name', newListing.district).single();
      const { data: cat } = await sb.from('categories').select('id').eq('name', newListing.category).single();

      if (dist) {
        await sb.from('listings').insert({
          slug: newListing.slug,
          name: newListing.name,
          name_malayalam: newListing.nameMalayalam,
          category_id: cat?.id || null,
          art_form: newListing.artForm,
          district_id: dist.id,
          locality: newListing.locality,
          address: newListing.address,
          latitude: newListing.coordinates.lat,
          longitude: newListing.coordinates.lng,
          short_description: newListing.shortDescription,
          full_story: newListing.fullStory,
          cultural_significance: newListing.culturalSignificance,
          visitor_protocol: newListing.visitorProtocol,
          image_url: newListing.imageUrl,
          image_credit: newListing.imageCredit,
          verification_status: newListing.verificationStatus,
          verified_by: newListing.verifiedBy,
          featured: newListing.featured,
          tags: newListing.tags,
          publication_status: 'published',
        });
      }
    } catch (e) {
      console.warn('Could not insert to Supabase, stored in memory cache:', e);
    }
  }

  liveListings = [newListing, ...liveListings];
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

  const sb = getSupabase();
  if (sb) {
    try {
      await sb
        .from('listings')
        .update({
          name: updated.name,
          name_malayalam: updated.nameMalayalam,
          art_form: updated.artForm,
          locality: updated.locality,
          short_description: updated.shortDescription,
          full_story: updated.fullStory,
          cultural_significance: updated.culturalSignificance,
          featured: updated.featured,
          verification_status: updated.verificationStatus,
          verified_by: updated.verifiedBy,
        })
        .or(`id.eq.${id},slug.eq.${id}`);
    } catch (e) {
      console.warn('Could not update in Supabase:', e);
    }
  }

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
  const sb = getSupabase();
  if (sb) {
    try {
      await sb.from('listings').update({ publication_status: 'archived' }).or(`id.eq.${id},slug.eq.${id}`);
    } catch (e) {
      console.warn('Could not archive in Supabase:', e);
    }
  }

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
  const sb = getSupabase();
  if (sb) {
    try {
      let query = sb
        .from('events')
        .select('*, districts(name)')
        .eq('publication_status', 'published')
        .order('event_date', { ascending: true });

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        let results = data.map(mapDbEvent);

        if (filters?.upcomingOnly) {
          const today = new Date().toISOString().split('T')[0];
          results = results.filter((ev) => ev.date >= today || ev.status === 'Annual Season');
        }
        if (filters?.district && filters.district !== 'All') {
          results = results.filter((ev) => ev.district.toLowerCase() === filters.district!.toLowerCase());
        }
        if (filters?.status && filters.status !== 'All') {
          results = results.filter((ev) => ev.status === filters.status);
        }
        if (filters?.search && filters.search.trim()) {
          const q = filters.search.toLowerCase().trim();
          results = results.filter(
            (ev) =>
              ev.title.toLowerCase().includes(q) ||
              ev.venue.toLowerCase().includes(q) ||
              ev.artForm.toLowerCase().includes(q)
          );
        }
        return results;
      }
    } catch (e) {
      console.warn('Fallback to local events:', e);
    }
  }

  // Fallback
  let results = [...liveEvents];
  if (filters?.upcomingOnly) {
    const today = new Date().toISOString().split('T')[0];
    results = results.filter((ev) => ev.date >= today || ev.status === 'Annual Season');
  }
  if (filters?.district && filters.district !== 'All') {
    results = results.filter((ev) => ev.district.toLowerCase() === filters.district!.toLowerCase());
  }
  if (filters?.status && filters.status !== 'All') {
    results = results.filter((ev) => ev.status === filters.status);
  }
  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    results = results.filter(
      (ev) =>
        ev.title.toLowerCase().includes(q) ||
        ev.venue.toLowerCase().includes(q) ||
        ev.artForm.toLowerCase().includes(q)
    );
  }
  results.sort((a, b) => a.date.localeCompare(b.date));
  return results;
}

export async function getEventBySlug(slug: string): Promise<EventListing | null> {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb
        .from('events')
        .select('*, districts(name)')
        .eq('slug', slug)
        .single();

      if (!error && data) {
        return mapDbEvent(data);
      }
    } catch (e) {
      console.warn('Fallback to local event by slug:', e);
    }
  }

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

  const sb = getSupabase();
  if (sb) {
    try {
      const { data: dist } = await sb.from('districts').select('id').eq('name', newEvent.district).single();
      if (dist) {
        await sb.from('events').insert({
          slug: newEvent.slug,
          title: newEvent.title,
          title_malayalam: newEvent.titleMalayalam,
          category: newEvent.category,
          art_form: newEvent.artForm,
          event_date: newEvent.date,
          formatted_date: newEvent.formattedDate,
          time: newEvent.time,
          venue: newEvent.venue,
          district_id: dist.id,
          locality: newEvent.locality,
          address: newEvent.address,
          organizer: newEvent.organizer,
          description: newEvent.description,
          cultural_context: newEvent.culturalContext,
          source_link: newEvent.sourceLink,
          status: newEvent.status,
          image_url: newEvent.imageUrl,
          entry_type: newEvent.entryType,
          schedule_highlights: newEvent.scheduleHighlights,
          featured: true,
          publication_status: 'published',
        });
      }
    } catch (e) {
      console.warn('Could not insert event to Supabase:', e);
    }
  }

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

  const sb = getSupabase();
  if (sb) {
    try {
      await sb
        .from('events')
        .update({
          title: updated.title,
          title_malayalam: updated.titleMalayalam,
          event_date: updated.date,
          time: updated.time,
          venue: updated.venue,
          status: updated.status,
          source_link: updated.sourceLink,
          last_confirmed_date: new Date().toISOString(),
        })
        .or(`id.eq.${id},slug.eq.${id}`);
    } catch (e) {
      console.warn('Could not update event in Supabase:', e);
    }
  }

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
  const sb = getSupabase();
  if (sb) {
    try {
      await sb.from('events').update({ publication_status: 'archived' }).or(`id.eq.${id},slug.eq.${id}`);
    } catch (e) {
      console.warn('Could not archive event in Supabase:', e);
    }
  }

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
  const sb = getSupabase();
  if (sb) {
    try {
      let query = sb.from('submissions').select('*, districts(name)').order('submitted_at', { ascending: false });

      if (filters?.status && filters.status !== 'All') {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map((sub: any) => ({
          id: sub.id,
          type: sub.type,
          name: sub.name,
          artForm: sub.art_form,
          district: (sub.districts?.name || 'Kannur') as DistrictName,
          locality: sub.locality,
          description: sub.description,
          culturalSignificance: sub.cultural_significance,
          sources: sub.sources || [],
          contributorName: sub.contributor_name,
          contributorEmail: sub.contributor_email,
          submittedAt: sub.submitted_at,
          status: sub.status,
          reviewerNotes: sub.reviewer_notes,
          urgency: sub.urgency,
        }));
      }
    } catch (e) {
      console.warn('Fallback to local submissions:', e);
    }
  }

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
        sub.district.toLowerCase().includes(q)
    );
  }
  return results;
}

export async function getSubmissionById(id: string): Promise<SubmissionReviewItem | null> {
  const subs = await getSubmissions();
  return subs.find((s) => s.id === id) || null;
}

export async function createSubmission(data: Partial<SubmissionReviewItem>): Promise<SubmissionReviewItem> {
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

  const sb = getSupabase();
  if (sb) {
    try {
      const { data: dist } = await sb.from('districts').select('id').eq('name', newSub.district).single();
      if (dist) {
        await sb.from('submissions').insert({
          id: newSub.id,
          type: newSub.type,
          name: newSub.name,
          art_form: newSub.artForm,
          district_id: dist.id,
          locality: newSub.locality,
          description: newSub.description,
          cultural_significance: newSub.culturalSignificance,
          sources: newSub.sources,
          contributor_name: newSub.contributorName,
          contributor_email: newSub.contributorEmail,
          status: 'Pending',
          urgency: newSub.urgency,
        });
      }
    } catch (e) {
      console.warn('Could not insert submission to Supabase:', e);
    }
  }

  liveSubmissions.unshift(newSub);
  return newSub;
}

export async function updateSubmissionStatus(
  id: string,
  status: 'Pending' | 'Approved' | 'Changes Requested' | 'Rejected',
  reviewerNotes?: string
): Promise<SubmissionReviewItem | null> {
  const sb = getSupabase();
  if (sb) {
    try {
      await sb
        .from('submissions')
        .update({
          status,
          reviewer_notes: reviewerNotes || null,
        })
        .eq('id', id);

      await sb.from('review_logs').insert({
        submission_id: id,
        reviewer_name: 'Curator Staff',
        reviewer_email: 'curator@nattuvazhi.org',
        action: `submission_${status.toLowerCase().replace(/\s+/g, '_')}`,
        notes: reviewerNotes || `Status updated to ${status}`,
      });
    } catch (e) {
      console.warn('Could not update submission status in Supabase:', e);
    }
  }

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

  if (['Place', 'Artist', 'Institution'].includes(sub.type)) {
    const slug = sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    created = await createListing({
      slug,
      name: sub.name,
      nameMalayalam: '',
      category:
        sub.type === 'Artist'
          ? 'Master Practitioner'
          : sub.type === 'Institution'
          ? 'Cultural Institution'
          : 'Sacred Space',
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
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb.from('homepage_config').select('key, value_json');
      if (!error && data && data.length > 0) {
        const configMap: Record<string, any> = {};
        data.forEach((row: any) => {
          configMap[row.key] = row.value_json;
        });
        return { ...liveHomepageConfig, ...configMap };
      }
    } catch (e) {
      console.warn('Fallback to local homepage config:', e);
    }
  }

  return { ...liveHomepageConfig };
}

export async function updateHomepageConfig(
  key: string,
  value: any,
  updatedBy: string = 'Curator'
): Promise<boolean> {
  const sb = getSupabase();
  if (sb) {
    try {
      await sb.from('homepage_config').upsert({
        key,
        value_json: value,
        updated_at: new Date().toISOString(),
        updated_by: updatedBy,
      });
    } catch (e) {
      console.warn('Could not update homepage config in Supabase:', e);
    }
  }

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
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb
        .from('review_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((log: any) => ({
          id: log.id,
          submissionId: log.submission_id,
          listingId: log.listing_id,
          eventId: log.event_id,
          reviewerName: log.reviewer_name,
          action: log.action,
          notes: log.notes,
          createdAt: log.created_at,
        }));
      }
    } catch (e) {
      console.warn('Fallback to local review logs:', e);
    }
  }

  return [...liveReviewLogs];
}
