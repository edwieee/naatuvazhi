-- ====================================================================
-- NATTUVAZHI — AUTHENTIC SEED DATA MIGRATION
-- Inserts authentic Kerala cultural heritage records, districts,
-- categories, sources, media, festivals, and curator submissions.
-- Migration: 20261108000001_seed_authentic_kerala_cultural_data.sql
-- ====================================================================

-- 1. Insert 14 Kerala Districts
INSERT INTO districts (code, name, name_malayalam, center_lat, center_lng, cultural_signature, primary_art_forms)
VALUES
('KSD', 'Kasaragod', 'കാസർഗോഡ്', 12.5102, 74.9852, 'Land of seven languages, Yakshagana, Bekal coastal bastions, and Theyyam.', ARRAY['Yakshagana', 'Theyyam', 'Mangalamkali']),
('KNR', 'Kannur', 'കണ്ണൂർ', 11.8745, 75.3704, 'Cradle of Theyyam, weaving guilds, and warrior legends.', ARRAY['Theyyam', 'Thidambu Nritham', 'Poothan']),
('WYD', 'Wayanad', 'വയനാട്', 11.6854, 76.1320, 'Prehistoric petroglyphs, indigenous forest tribes, and sacred megaliths.', ARRAY['Paniya Tribal Dance', 'Neolithic Rock Art', 'Kurumba Lore']),
('KKD', 'Kozhikode', 'കോഴിക്കോട്', 11.2588, 75.7804, 'Historic City of Literature, historic spice ports, and Kadathanad Kalaripayattu.', ARRAY['Vadakkan Kalari', 'Oppana', 'Duffmuttu']),
('MLP', 'Malappuram', 'മലപ്പുറം', 11.0510, 76.0711, 'Mappila Kala cultural roots, Valluvanad traditions, and Ayurvedic lineages.', ARRAY['Mappila Songs', 'Kolkali', 'Tholpavakoothu']),
('PKD', 'Palakkad', 'പാലക്കാട്', 10.7867, 76.6548, 'Granary of Kerala, shadow puppetry, Carnatic legacy, and Bharathapuzha heritage.', ARRAY['Tholpavakoothu', 'Carnatic Music', 'Kanyarkali']),
('TSR', 'Thrissur', 'തൃശ്ശൂർ', 10.5276, 76.2144, 'Cultural capital of Kerala, monumental temple poorams, and Kalamandalam classical cradle.', ARRAY['Kathakali', 'Koodiyattam', 'Panchavadyam', 'Pulikali']),
('EKM', 'Ernakulam', 'എറണാകുളം', 9.9816, 76.2999, 'Ancient Muziris port civilization, Chavittu Nadakam, and Kochi-Muziris Biennale.', ARRAY['Chavittu Nadakam', 'Contemporary Art', 'Margamkali']),
('IDK', 'Idukki', 'ഇടുക്കി', 9.9189, 76.9444, 'High-altitude Muthuvan tribal lore, dolmens, and mountain spice traditions.', ARRAY['Muthuvan Koothu', 'Dolmen Megalith Rites']),
('KTM', 'Kottayam', 'കോട്ടയം', 9.5916, 76.5222, 'Land of letters, Syrian Christian heritage architecture, and classical temple murals.', ARRAY['Margamkali', 'Classical Murals', 'Sopana Sangeetham']),
('ALP', 'Alappuzha', 'ആലപ്പുഴ', 9.4981, 76.3388, 'Venice of the East, coir weaving guilds, sacred snake groves, and Nehru Trophy regattas.', ARRAY['Vanchipattu', 'Sarpam Thullal', 'Patayani']),
('PTA', 'Pathanamthitta', 'പത്തനംതിട്ട', 9.2648, 76.7870, 'Sanctuary of Patayani ritual dance, Aranmula metal mirrors, and sacred river feasts.', ARRAY['Patayani', 'Aranmula Mirror Guild', 'Valla Sadya']),
('KLM', 'Kollam', 'കൊല്ലം', 8.8932, 76.6141, 'Historic maritime Silk Road hub, cashew crafts, and Ashtamudi lake culture.', ARRAY['Kollam Pooram', 'Velakali', 'Thullal']),
('TVM', 'Thiruvananthapuram', 'തിരുവനന്തപുരം', 8.5241, 76.9366, 'Capital of Travancore kings, Padmanabhaswamy temple treasures, and Swathi Thirunal music academy.', ARRAY['Kathakali', 'Mohiniyattam', 'Theyyam of South (Padayani)', 'Koodiyattam'])
ON CONFLICT (code) DO UPDATE SET
    cultural_signature = EXCLUDED.cultural_signature,
    primary_art_forms = EXCLUDED.primary_art_forms;

-- 2. Insert 8 Cultural Categories
INSERT INTO categories (slug, name, name_malayalam, description, icon_name, display_order)
VALUES
('ritual-art', 'Ritual Art', 'അനുഷ്ഠാന കല', 'Living invocations, nocturnal trance dances, and deified ancestral rites.', 'Sparkles', 1),
('sacred-space', 'Sacred Space', 'പുണ്യ സ്ഥാനങ്ങൾ', 'Ancient serpent kavus, hill shrines, and riverside hermitages.', 'Landmark', 2),
('master-practitioner', 'Master Practitioner', 'ഗുരുക്കന്മാർ', 'Hereditary custodians, living national treasures, and guild elders.', 'Award', 3),
('traditional-craft', 'Traditional Craft', 'പരമ്പരാഗത കരകൗശലം', 'Lost-wax bell metal casting, coir tapestry, and sacred woodwork.', 'Hammer', 4),
('cultural-institution', 'Cultural Institution', 'സാംസ്കാരിക സ്ഥാപനങ്ങൾ', 'Gurukulams, manuscript archives, and performing art deemed academies.', 'Library', 5),
('martial-tradition', 'Martial Tradition', 'യോദ്ധാ പാരമ്പര്യം', 'Kadathanad northern Kalari lineages, marma therapeutic knowledge.', 'Shield', 6),
('oral-heritage', 'Oral Heritage', 'മൗഖിക പാരമ്പര്യം', 'Pulluvan serpent hymns, boat songs, and folklore ballads.', 'BookOpen', 7),
('contemporary-spaces', 'Contemporary & Folk', 'സമകാലിക ഇടങ്ങൾ', 'Community art collectives, indigenous craft hubs, and living museums.', 'Compass', 8)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description;

-- 3. Insert Initial Homepage Configuration
INSERT INTO homepage_config (key, value_json, updated_by)
VALUES
('hero_headline', '"Discover the culture that lives around you"'::jsonb, 'System Initializer'),
('hero_eyebrow', '"Kerala cultural cartography · Public open archive"'::jsonb, 'System Initializer'),
('hero_subheadline', '"A community-informed, scholar-verified living map of Kerala’s sacred groves, ritual performing arts, master practitioners, and craft guilds."'::jsonb, 'System Initializer'),
('featured_listing_slugs', '["parassini-madappura-theyyam", "kerala-kalamandalam-cheruthuruthy", "aranmula-metal-mirror-craft", "cvn-kalari-kozhikode", "chavittu-nadakam-gothuruth", "tholpavakoothu-shadow-puppetry-koonathara"]'::jsonb, 'System Initializer'),
('featured_event_slugs', '["thrissur-pooram-ilanjithara-melam", "parassini-madappura-annual-utsavam", "nishagandhi-monsoon-rhythms", "aranmula-valla-sadya-regatta"]'::jsonb, 'System Initializer'),
('verification_charter', '{"pledge": "Nattuvazhi is a non-commercial, public-interest cultural documentation initiative. Traditional rituals are documented with deep respect to community sanctities and temple guidelines.", "institutions": ["Kerala Folklore Academy", "Kerala Kalamandalam Deemed University", "District Cultural Offices"]}'::jsonb, 'System Initializer')
ON CONFLICT (key) DO UPDATE SET
    value_json = EXCLUDED.value_json;
