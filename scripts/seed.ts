import { createClient } from '@supabase/supabase-js';
import { KERALA_DISTRICTS } from '../src/data/mock-districts';
import { MOCK_LISTINGS } from '../src/data/mock-listings';
import { MOCK_EVENTS } from '../src/data/mock-events';
import { MOCK_ADMIN_SUBMISSIONS } from '../src/data/mock-admin';

async function seed() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.log('⚠️ NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing in environment.');
    console.log('Skipping remote database seed. Local repository is fully configured with in-memory fallback.');
    return;
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  console.log('Connected to Supabase at:', supabaseUrl);

  // 1. Seed Districts
  console.log('Seeding 14 Kerala Districts...');
  for (const d of KERALA_DISTRICTS) {
    const { error } = await supabase.from('districts').upsert(
      {
        code: d.code,
        name: d.name,
        name_malayalam: d.nameMalayalam,
        center_lat: d.center.lat,
        center_lng: d.center.lng,
        cultural_signature: d.culturalSignature,
        primary_art_forms: d.primaryArtForms,
      },
      { onConflict: 'code' }
    );
    if (error) console.error(`Error inserting district ${d.name}:`, error.message);
  }

  // 2. Fetch District ID map
  const { data: districtsData } = await supabase.from('districts').select('id, name');
  const districtMap = new Map((districtsData || []).map((d: any) => [d.name, d.id]));

  // 3. Seed Categories
  console.log('Seeding Categories...');
  const categories = [
    { slug: 'ritual-art', name: 'Ritual Art', name_malayalam: 'അനുഷ്ഠാന കല', description: 'Living invocations, nocturnal trance dances, and deified ancestral rites.' },
    { slug: 'sacred-space', name: 'Sacred Space', name_malayalam: 'പുണ്യ സ്ഥാനങ്ങൾ', description: 'Ancient serpent kavus, hill shrines, and riverside hermitages.' },
    { slug: 'master-practitioner', name: 'Master Practitioner', name_malayalam: 'ഗുരുക്കന്മാർ', description: 'Hereditary custodians, living national treasures, and guild elders.' },
    { slug: 'traditional-craft', name: 'Traditional Craft', name_malayalam: 'പരമ്പരാഗത കരകൗശലം', description: 'Lost-wax bell metal casting, coir tapestry, and sacred woodwork.' },
    { slug: 'cultural-institution', name: 'Cultural Institution', name_malayalam: 'സാംസ്കാരിക സ്ഥാപനങ്ങൾ', description: 'Gurukulams, manuscript archives, and performing art deemed academies.' },
    { slug: 'martial-tradition', name: 'Martial Tradition', name_malayalam: 'യോദ്ധാ പാരമ്പര്യം', description: 'Kadathanad northern Kalari lineages, marma therapeutic knowledge.' },
    { slug: 'oral-heritage', name: 'Oral Heritage', name_malayalam: 'മൗഖിക പാരമ്പര്യം', description: 'Pulluvan serpent hymns, boat songs, and folklore ballads.' },
  ];

  for (const cat of categories) {
    await supabase.from('categories').upsert(cat, { onConflict: 'slug' });
  }

  // 4. Seed Listings
  console.log(`Seeding ${MOCK_LISTINGS.length} Cultural Listings...`);
  for (const item of MOCK_LISTINGS) {
    const districtId = districtMap.get(item.district);
    if (!districtId) continue;

    const { data: listingData, error } = await supabase.from('listings').upsert(
      {
        slug: item.slug,
        name: item.name,
        name_malayalam: item.nameMalayalam,
        art_form: item.artForm,
        district_id: districtId,
        locality: item.locality,
        address: item.address,
        latitude: item.coordinates.lat,
        longitude: item.coordinates.lng,
        short_description: item.shortDescription,
        full_story: item.fullStory,
        cultural_significance: item.culturalSignificance,
        visitor_protocol: item.visitorProtocol,
        image_url: item.imageUrl,
        image_credit: item.imageCredit,
        verification_status: item.verificationStatus,
        verified_by: item.verifiedBy,
        official_website: item.officialWebsite,
        contributor_name: item.contributor.name,
        contributor_role: item.contributor.role,
        contributor_submitted_at: item.contributor.dateSubmitted,
        featured: item.featured,
        tags: item.tags,
        publication_status: 'published',
      },
      { onConflict: 'slug' }
    ).select('id').single();

    if (error) {
      console.error(`Error inserting listing ${item.name}:`, error.message);
      continue;
    }

    const listingId = listingData?.id;
    if (listingId) {
      // Seed sources
      for (const src of item.sourceCitations) {
        await supabase.from('sources').insert({
          listing_id: listingId,
          title: src.title,
          author_or_archive: src.authorOrArchive,
          year: src.year,
          url: src.url,
        });
      }

      // Seed media gallery
      for (let i = 0; i < item.imageGallery.length; i++) {
        const img = item.imageGallery[i];
        await supabase.from('media').insert({
          listing_id: listingId,
          url: img.url,
          caption: img.caption,
          credit: img.credit,
          display_order: i,
        });
      }
    }
  }

  // 5. Seed Events
  console.log(`Seeding ${MOCK_EVENTS.length} Cultural Events...`);
  for (const ev of MOCK_EVENTS) {
    const districtId = districtMap.get(ev.district);
    if (!districtId) continue;

    await supabase.from('events').upsert(
      {
        slug: ev.slug,
        title: ev.title,
        title_malayalam: ev.titleMalayalam,
        category: ev.category,
        art_form: ev.artForm,
        event_date: ev.date,
        formatted_date: ev.formattedDate,
        time: ev.time,
        venue: ev.venue,
        district_id: districtId,
        locality: ev.locality,
        address: ev.address,
        organizer: ev.organizer,
        description: ev.description,
        cultural_context: ev.culturalContext,
        source_link: ev.sourceLink,
        status: ev.status,
        image_url: ev.imageUrl,
        entry_type: ev.entryType,
        schedule_highlights: ev.scheduleHighlights,
        featured: true,
        publication_status: 'published',
      },
      { onConflict: 'slug' }
    );
  }

  // 6. Seed Submissions
  console.log(`Seeding ${MOCK_ADMIN_SUBMISSIONS.length} Submissions...`);
  for (const sub of MOCK_ADMIN_SUBMISSIONS) {
    const districtId = districtMap.get(sub.district);
    if (!districtId) continue;

    await supabase.from('submissions').upsert(
      {
        id: sub.id,
        type: sub.type,
        name: sub.name,
        art_form: sub.artForm,
        district_id: districtId,
        locality: sub.locality,
        description: sub.description,
        cultural_significance: sub.culturalSignificance,
        sources: sub.sources,
        contributor_name: sub.contributorName,
        contributor_email: sub.contributorEmail,
        submitted_at: sub.submittedAt,
        status: sub.status,
        reviewer_notes: sub.reviewerNotes,
        urgency: sub.urgency,
      },
      { onConflict: 'id' }
    );
  }

  console.log('✅ Supabase seeding complete with authentic cultural records!');
}

seed().catch(console.error);
