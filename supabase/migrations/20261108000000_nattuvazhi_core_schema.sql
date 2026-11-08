-- ====================================================================
-- NATTUVAZHI — THE LIVING CULTURE MAP OF KERALA
-- Core Relational Database Schema & Row-Level Security (RLS)
-- Target: Supabase Postgres
-- Migration: 20261108000000_nattuvazhi_core_schema.sql
-- ====================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ====================================================================
-- 3. CORE ENTITIES
-- ====================================================================

-- 3.1 Districts (All 14 Kerala administrative cultural districts)
CREATE TABLE IF NOT EXISTS districts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(3) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL UNIQUE,
    name_malayalam VARCHAR(100) NOT NULL,
    center_lat DOUBLE PRECISION NOT NULL,
    center_lng DOUBLE PRECISION NOT NULL,
    cultural_signature TEXT NOT NULL,
    primary_art_forms TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_districts_updated_at
BEFORE UPDATE ON districts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 3.2 Categories & Art Form Taxonomies
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL UNIQUE,
    name_malayalam VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3.3 Cultural Listings (The central cultural discovery table)
CREATE TABLE IF NOT EXISTS listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(150) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    name_malayalam VARCHAR(255) NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    art_form VARCHAR(150) NOT NULL,
    district_id UUID NOT NULL REFERENCES districts(id) ON DELETE RESTRICT,
    locality VARCHAR(150) NOT NULL,
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    short_description TEXT NOT NULL,
    full_story TEXT NOT NULL,
    cultural_significance TEXT NOT NULL,
    visitor_protocol TEXT NOT NULL,
    image_url TEXT NOT NULL,
    image_credit TEXT NOT NULL,
    verification_status VARCHAR(50) NOT NULL DEFAULT 'Community Pending'
        CHECK (verification_status IN ('Verified', 'Scholar Reviewed', 'Community Pending')),
    verified_by TEXT,
    last_reviewed TIMESTAMPTZ,
    official_website TEXT,
    contributor_name VARCHAR(150),
    contributor_role VARCHAR(150),
    contributor_submitted_at TIMESTAMPTZ,
    featured BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    tags TEXT[] NOT NULL DEFAULT '{}',
    publication_status VARCHAR(20) NOT NULL DEFAULT 'published'
        CHECK (publication_status IN ('published', 'draft', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_listings_updated_at
BEFORE UPDATE ON listings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_listings_slug ON listings(slug);
CREATE INDEX IF NOT EXISTS idx_listings_district_id ON listings(district_id);
CREATE INDEX IF NOT EXISTS idx_listings_category_id ON listings(category_id);
CREATE INDEX IF NOT EXISTS idx_listings_pub_status ON listings(publication_status);
CREATE INDEX IF NOT EXISTS idx_listings_featured ON listings(featured);
CREATE INDEX IF NOT EXISTS idx_listings_coords ON listings(latitude, longitude);

-- 3.4 Events & Living Festivals
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(150) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    title_malayalam VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    art_form VARCHAR(150) NOT NULL,
    event_date DATE NOT NULL,
    formatted_date VARCHAR(100) NOT NULL,
    time VARCHAR(100) NOT NULL,
    venue VARCHAR(255) NOT NULL,
    district_id UUID NOT NULL REFERENCES districts(id) ON DELETE RESTRICT,
    locality VARCHAR(150) NOT NULL,
    address TEXT,
    organizer VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    cultural_context TEXT NOT NULL,
    source_link TEXT NOT NULL,
    last_confirmed_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'Confirmed'
        CHECK (status IN ('Confirmed', 'Tentative', 'Annual Season', 'Cancelled', 'Postponed')),
    image_url TEXT NOT NULL,
    entry_type VARCHAR(50) NOT NULL DEFAULT 'Free Entry'
        CHECK (entry_type IN ('Free Entry', 'Pass Required', 'Ritual Offering')),
    schedule_highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
    featured BOOLEAN NOT NULL DEFAULT false,
    publication_status VARCHAR(20) NOT NULL DEFAULT 'published'
        CHECK (publication_status IN ('published', 'draft', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON events
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_district_id ON events(district_id);
CREATE INDEX IF NOT EXISTS idx_events_pub_status ON events(publication_status);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);

-- 3.5 Traceable Scholarly Sources & Citations
CREATE TABLE IF NOT EXISTS sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    source_type VARCHAR(50) NOT NULL DEFAULT 'Academic Archive'
        CHECK (source_type IN ('Academic Archive', 'Official Website', 'Monograph', 'Gazetteer', 'Fieldwork', 'Oral Lineage')),
    title TEXT NOT NULL,
    author_or_archive TEXT NOT NULL,
    year VARCHAR(20),
    url TEXT,
    description TEXT,
    checked_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    verification_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sources_listing_id ON sources(listing_id);
CREATE INDEX IF NOT EXISTS idx_sources_event_id ON sources(event_id);

-- 3.6 Curated Media Assets & Photo Gallery
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    storage_path TEXT,
    url TEXT NOT NULL,
    caption TEXT NOT NULL,
    credit TEXT NOT NULL,
    photographer TEXT,
    permission_status VARCHAR(50) NOT NULL DEFAULT 'CC-BY-NC'
        CHECK (permission_status IN ('CC-BY-NC', 'Institution Approved', 'Community Provided', 'Public Domain')),
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_media_listing_id ON media(listing_id);
CREATE INDEX IF NOT EXISTS idx_media_event_id ON media(event_id);

-- 3.7 Community Submissions & Corrections Queue
CREATE TABLE IF NOT EXISTS submissions (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'sub-101' or UUID string
    type VARCHAR(30) NOT NULL
        CHECK (type IN ('Place', 'Artist', 'Institution', 'Event', 'Correction')),
    name VARCHAR(255) NOT NULL,
    art_form VARCHAR(150) NOT NULL,
    district_id UUID NOT NULL REFERENCES districts(id) ON DELETE RESTRICT,
    locality VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    cultural_significance TEXT NOT NULL,
    sources TEXT[] NOT NULL DEFAULT '{}',
    contributor_name VARCHAR(150) NOT NULL,
    contributor_email VARCHAR(150) NOT NULL,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) NOT NULL DEFAULT 'Pending'
        CHECK (status IN ('Pending', 'Approved', 'Changes Requested', 'Rejected')),
    reviewer_notes TEXT,
    urgency VARCHAR(20) NOT NULL DEFAULT 'Medium'
        CHECK (urgency IN ('Low', 'Medium', 'High')),
    rights_confirmed BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_submissions_updated_at
BEFORE UPDATE ON submissions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_urgency ON submissions(urgency);

-- 3.8 Moderation Audit Log
CREATE TABLE IF NOT EXISTS review_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id VARCHAR(50) REFERENCES submissions(id) ON DELETE SET NULL,
    listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
    event_id UUID REFERENCES events(id) ON DELETE SET NULL,
    reviewer_name VARCHAR(150) NOT NULL,
    reviewer_email VARCHAR(150) NOT NULL,
    action VARCHAR(50) NOT NULL,
    notes TEXT,
    previous_state JSONB,
    new_state JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_review_logs_created_at ON review_logs(created_at DESC);

-- 3.9 Homepage & Curatorial System Configuration
CREATE TABLE IF NOT EXISTS homepage_config (
    key VARCHAR(100) PRIMARY KEY,
    value_json JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(150)
);

-- ====================================================================
-- 4. ROW-LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_config ENABLE ROW LEVEL SECURITY;

-- 4.1 Districts: Public read, authenticated curators write
CREATE POLICY "Public can view all districts"
    ON districts FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can modify districts"
    ON districts FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4.2 Categories: Public read, authenticated curators write
CREATE POLICY "Public can view all categories"
    ON categories FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can modify categories"
    ON categories FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4.3 Listings: Public read published, authenticated curators full access
CREATE POLICY "Public can view published listings"
    ON listings FOR SELECT
    USING (publication_status = 'published');

CREATE POLICY "Authenticated users can manage listings"
    ON listings FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4.4 Events: Public read published, authenticated curators full access
CREATE POLICY "Public can view published events"
    ON events FOR SELECT
    USING (publication_status = 'published');

CREATE POLICY "Authenticated users can manage events"
    ON events FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4.5 Sources: Public read for published listings/events, curators full access
CREATE POLICY "Public can view sources for published records"
    ON sources FOR SELECT
    USING (
        listing_id IN (SELECT id FROM listings WHERE publication_status = 'published')
        OR event_id IN (SELECT id FROM events WHERE publication_status = 'published')
    );

CREATE POLICY "Authenticated users can manage sources"
    ON sources FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4.6 Media: Public read for published listings/events, curators full access
CREATE POLICY "Public can view media for published records"
    ON media FOR SELECT
    USING (
        listing_id IN (SELECT id FROM listings WHERE publication_status = 'published')
        OR event_id IN (SELECT id FROM events WHERE publication_status = 'published')
    );

CREATE POLICY "Authenticated users can manage media"
    ON media FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4.7 Submissions: Public can submit (INSERT), only authenticated curators can view and edit
CREATE POLICY "Public can insert submissions"
    ON submissions FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
    ON submissions FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Authenticated users can manage submissions"
    ON submissions FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete submissions"
    ON submissions FOR DELETE
    TO authenticated
    USING (true);

-- 4.8 Review Logs: Only authenticated curators can view and append
CREATE POLICY "Authenticated users can view review logs"
    ON review_logs FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Authenticated users can insert review logs"
    ON review_logs FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- 4.9 Homepage Config: Public can view, authenticated curators can update
CREATE POLICY "Public can view homepage config"
    ON homepage_config FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can manage homepage config"
    ON homepage_config FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ====================================================================
-- 5. STORAGE BUCKET POLICIES (Run via Supabase Storage API or SQL)
-- ====================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('cultural-media', 'cultural-media', true),
    ('submission-attachments', 'submission-attachments', false)
ON CONFLICT (id) DO NOTHING;

-- Public can read assets from cultural-media bucket
CREATE POLICY "Public Access cultural-media"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'cultural-media');

-- Authenticated curators can upload/modify cultural-media
CREATE POLICY "Curators can manage cultural-media"
    ON storage.objects FOR ALL
    TO authenticated
    USING (bucket_id = 'cultural-media')
    WITH CHECK (bucket_id = 'cultural-media');

-- Public can upload to submission-attachments with size limit
CREATE POLICY "Public can upload submission-attachments"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'submission-attachments');
