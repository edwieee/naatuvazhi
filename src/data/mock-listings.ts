import { CulturalListing } from '@/lib/types';

export const MOCK_LISTINGS: CulturalListing[] = [
  {
    id: 'c-01',
    slug: 'parassini-madappura-theyyam',
    name: 'Parassini Madappura Muthappan Sthanam',
    nameMalayalam: 'പറശ്ശിനിക്കടവ് മുത്തപ്പൻ മടപ്പുര',
    category: 'Ritual Art',
    artForm: 'Muthappan Theyyam & Vellattam',
    district: 'Kannur',
    locality: 'Parassinikadavu',
    address: 'Parassini Madappura, Anthoor, Kannur, Kerala 670563',
    coordinates: { lat: 11.9867, lng: 75.3942 },
    shortDescription: 'One of the living ritual sanctums where Muthappan Vellattam and Thiruvappana are performed daily as a living spiritual communion.',
    fullStory: `Perched on the serene banks of the Valapattanam River, the Parassini Madappura is a rare temple that rejects rigid Brahmanical orthodoxies in favor of inclusive subaltern worship. Here, Sree Muthappan—a manifestation of Shiva and Vishnu embraced by hunter-gatherer and indigenous lore—is worshipped through daily Vellattam and Theyyam rites.

Unlike seasonal temple festivals that occur only during the Malayalam winter months, Parassini witnesses daily dawn and dusk manifestations. The deity accepts offerings of dried fish, toddy, and roasted grains, listening directly to devotees in personal, whispered conversations. The elaborate face painting (Mukhathezhuthu), tower-like headdresses (Mudi), and blazing torch dances represent one of humanity's oldest surviving ritual theater traditions.`,
    culturalSignificance: 'Parassini represents a vital bridge between indigenous tribal animism and folk Hinduism, maintaining caste-free community feeding (Annadhanam) and daily ritual invocation of subaltern guardian deities.',
    visitorProtocol: 'Modest traditional dress is encouraged. Photography of the deity listening to devotees is restricted in innermost sanctum; follow temple custodian directions. Free meal is offered to all visitors.',
    imageUrl: 'https://images.unsplash.com/photo-1609137144829-873d6118b763?q=80&w=1200&auto=format&fit=crop',
    imageGallery: [
      {
        url: 'https://images.unsplash.com/photo-1609137144829-873d6118b763?q=80&w=1200&auto=format&fit=crop',
        caption: 'The crimson headdress and sacred eye-paint of a Northern Malabar Theyyam performer.',
        credit: 'Photo courtesy Kerala Folklore Academy / Open Archive'
      },
      {
        url: 'https://images.unsplash.com/photo-1599818816827-0cf38c1192ff?q=80&w=1200&auto=format&fit=crop',
        caption: 'Rhythmic chande percussion accompaniment during dusk Vellattam.',
        credit: 'Cultural Documentation Project, Kerala'
      }
    ],
    imageCredit: 'Archival Collection / CC-BY-NC Kerala Cultural Heritage Foundation',
    verificationStatus: 'Verified',
    verifiedBy: 'Malabar Folklore Archives & District Cultural Officer',
    lastReviewed: '14 January 2026',
    sourceCitations: [
      {
        title: 'Theyyam: The Living Gods of Northern Kerala',
        authorOrArchive: 'Kerala Folklore Academy',
        year: '2021',
        url: 'https://keralatourism.org/culture'
      },
      {
        title: 'Subaltern Deities of Malabar',
        authorOrArchive: 'Calicut University Historical Review',
        year: '2019'
      }
    ],
    officialWebsite: 'https://parassinimadappura.com',
    contributor: {
      name: 'Nandakumar Valapattanam',
      role: 'Local Heritage Documenter',
      dateSubmitted: '12 Nov 2025'
    },
    featured: true,
    tags: ['Theyyam', 'Ritual Art', 'Kannur', 'Living Tradition', 'Riverbank']
  },
  {
    id: 'c-02',
    slug: 'kerala-kalamandalam-cheruthuruthy',
    name: 'Kerala Kalamandalam Deemed University',
    nameMalayalam: 'കേരള കലാമണ്ഡലം, ചെറുതുരുത്തി',
    category: 'Cultural Institution',
    artForm: 'Kathakali, Koodiyattam & Mohiniyattam',
    district: 'Thrissur',
    locality: 'Cheruthuruthy',
    address: 'Kalamandalam, Cheruthuruthy, Thrissur, Kerala 679531',
    coordinates: { lat: 10.7495, lng: 76.2789 },
    shortDescription: 'The premier national cradle of classical Indian performing arts, preserving the ancient Gurukula system along the Bharathapuzha.',
    fullStory: `Founded in 1930 by the visionary nationalist poet Vallathol Narayana Menon and Manakkulam Mukunda Raja, Kerala Kalamandalam single-handedly rescued Kathakali, Mohiniyattam, and Koodiyattam from near-extinction during the colonial breakdown of royal patronage.

Students at Kalamandalam awaken before dawn to the rhythmic thrum of the Maddalam and Chenda. Rigorous physical disciplines, eye exercises, and mudra training are practiced in open-air 'Kalaris' beneath riverine trees. Its legendary Koothambalam—the traditional temple theater designed according to Natyashastra architectural principles—stands as an acoustic and aesthetic marvel.`,
    culturalSignificance: 'Declared a Deemed University for Arts and Culture, Kalamandalam serves as the world benchmark for pedagogical transmission of UNESCO-recognized master traditions like Koodiyattam and classical Kathakali.',
    visitorProtocol: 'Visitors are welcomed between 9:00 AM and 1:00 PM on working days under the "A Day with the Masters" cultural immersion protocol. Silence is strictly observed near active practice classrooms.',
    imageUrl: 'https://images.unsplash.com/photo-1582711012124-a56cf82307a0?q=80&w=1200&auto=format&fit=crop',
    imageGallery: [
      {
        url: 'https://images.unsplash.com/photo-1582711012124-a56cf82307a0?q=80&w=1200&auto=format&fit=crop',
        caption: 'Kathakali Paccha (virtuous heroic character) in elaborate makeup and Kireedam.',
        credit: 'Kerala Kalamandalam Archives'
      }
    ],
    imageCredit: 'Kerala Sangeetha Nataka Akademi / Kalamandalam Repository',
    verificationStatus: 'Verified',
    verifiedBy: 'Prof. K. G. Vasudevan, Dean of Kathakali Studies',
    lastReviewed: '03 February 2026',
    sourceCitations: [
      {
        title: 'Kalamandalam: Revival of Classical Arts',
        authorOrArchive: 'Sangeet Natak Akademi Journals',
        year: '2023',
        url: 'https://kalamandalam.ac.in'
      }
    ],
    officialWebsite: 'https://kalamandalam.ac.in',
    contributor: {
      name: 'Devika Warrier',
      role: 'Performing Arts Researcher',
      dateSubmitted: '04 Oct 2025'
    },
    featured: true,
    tags: ['Kathakali', 'Classical', 'UNESCO', 'Gurukula', 'Bharathapuzha']
  },
  {
    id: 'c-03',
    slug: 'aranmula-metal-mirror-craft',
    name: 'Aranmula Kannadi Artisan Guild',
    nameMalayalam: 'ആറന്മുള കണ്ണാടി പാരമ്പര്യ പണിശാല',
    category: 'Traditional Craft',
    artForm: 'Metallurgy & Mirror Casting',
    district: 'Pathanamthitta',
    locality: 'Aranmula Heritage Village',
    address: 'Near Aranmula Parthasarathy Temple, Aranmula, Kerala 689533',
    coordinates: { lat: 9.3328, lng: 76.6859 },
    shortDescription: 'The secretive copper-tin alloy metallurgical wonder, producing front-surface reflection mirrors recognized with GI tag status.',
    fullStory: `Aranmula Kannadi is not glass coated with silver; it is a front-surface reflection mirror cast entirely from a secret alloy of copper and tin (bell metal) passed down through only a handful of hereditary Vishwakarma families.

Because the reflection occurs directly on the polished metal surface rather than behind glass, light suffers zero refraction or secondary distortion. When an object touches the mirror, there is zero gap between the object and its image. The alloy is melted in clay crucibles, poured into mud molds, and hand-polished for weeks using river silt, velvet cloths, and coconut oil until an immaculate reflection emerges.`,
    culturalSignificance: 'Ranked among the eight auspicious items (Ashtamangalyam) in Kerala spiritual rites, it earned India’s earliest Geographical Indication (GI) registration for indigenous metallurgy.',
    visitorProtocol: 'Artisan workshops are open to visitors during daylight hours. Visitors may observe the polishing stages. Counterfeits abound in commercial tourist shops; look for the hologram seal of the Vishwabrahmana Guild.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    imageGallery: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
        caption: 'Handcrafted Aranmula Kannadi with traditional brass peacock crown.',
        credit: 'Aranmula Heritage Trust'
      }
    ],
    imageCredit: 'GI Registry Documentation / Crafts Council of Kerala',
    verificationStatus: 'Verified',
    verifiedBy: 'Geographical Indications Registry & State Handicrafts Board',
    lastReviewed: '18 December 2025',
    sourceCitations: [
      {
        title: 'Indigenous Metallurgy of South India',
        authorOrArchive: 'National Institute of Advanced Studies (NIAS)',
        year: '2018'
      }
    ],
    contributor: {
      name: 'Suresh Achar',
      role: 'Master Craftsman & Guild Member',
      dateSubmitted: '19 Aug 2025'
    },
    featured: true,
    tags: ['Craft', 'GI Tag', 'Metal Mirror', 'Aranmula', 'Heritage Village']
  },
  {
    id: 'c-04',
    slug: 'cvn-kalari-kozhikode',
    name: 'CVN Kalari Sangham',
    nameMalayalam: 'സി.വി.എൻ കളരി സംഘം, കോഴിക്കോട്',
    category: 'Martial Tradition',
    artForm: 'Northern Kalaripayattu & Marma Chikitsa',
    district: 'Kozhikode',
    locality: 'East Hill',
    address: 'Near Museum, East Hill, Kozhikode, Kerala 673005',
    coordinates: { lat: 11.2825, lng: 75.7874 },
    shortDescription: 'The historic subterranean gymnasium preserving Vadakkan (Northern) Kalaripayattu, weaponry, and traditional bone-setting marma healing.',
    fullStory: `Stepping into the CVN Kalari pit—dug four feet into red laterite soil to cushion footwork and keep the interior cool—is a journey into one of the world’s oldest martial arts systems. Founded in honor of the legendary master C.V. Narayanan Nair, this institution has nurtured generations of practitioners.

The curriculum progresses methodically through Meythari (body conditioning and animal postures like Lion, Boar, Elephant), Kolthari (wooden weapons and sticks), Angathari (metal blades, shields, and the lethal flexible sword Urumi), and culminates in Verumkai (barehand self-defense) and Marma Chikitsa (treatment of vital pressure points).`,
    culturalSignificance: 'Mentioned in ancient Sangam literature and the Vadakkan Pattukal ballads, Kalaripayattu is the physiological and aesthetic ancestor of Kerala’s dramatic arts, including Kathakali and Theyyam.',
    visitorProtocol: 'Morning training sessions (6:00 AM - 8:30 AM) can be observed with prior permission. Remove footwear before stepping down into the earthen Kalari floor. Photography requires instructor consent.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop',
    imageGallery: [
      {
        url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop',
        caption: 'Senior Gurukkal demonstrating flexible sword (Urumi) stances inside the earthen pit.',
        credit: 'CVN Archive'
      }
    ],
    imageCredit: 'Kerala Martial Arts Directorate Archive',
    verificationStatus: 'Scholar Reviewed',
    verifiedBy: 'Dr. Madhavan Kutty, Indian Sports & Martial History Bureau',
    lastReviewed: '22 January 2026',
    sourceCitations: [
      {
        title: 'When the Body Becomes All Eyes: Paradigms of Kalarippayattu',
        authorOrArchive: 'Phillip B. Zarrilli / Oxford University Press',
        year: '2000'
      }
    ],
    contributor: {
      name: 'Ashwin Gurukkal',
      role: 'Practitioner & Instructor',
      dateSubmitted: '11 Dec 2025'
    },
    featured: true,
    tags: ['Kalaripayattu', 'Martial Art', 'Kozhikode', 'Marma', 'Ancient Heritage']
  },
  {
    id: 'c-05',
    slug: 'chavittu-nadakam-gothuruth',
    name: 'Gothuruth Chavittu Nadakam Kala Samithi',
    nameMalayalam: 'ഗോതുരുത്ത് ചവിട്ടുനാടക കളരി',
    category: 'Ritual Art',
    artForm: 'Chavittu Nadakam (Latin-Christian Opera)',
    district: 'Ernakulam',
    locality: 'Gothuruth Island, North Paravur',
    address: 'Gothuruth Island, Moothakunnam P.O., Ernakulam, Kerala 683516',
    coordinates: { lat: 10.1873, lng: 76.2084 },
    shortDescription: 'The 500-year-old high-energy stomping musical drama born from Portuguese-Latin maritime contact and local theatrical mastery.',
    fullStory: `On the river island of Gothuruth in the backwaters of North Paravur, the wooden floorboards reverberate with thunderous rhythmic stomping. Chavittu Nadakam (literally 'stomping drama') emerged in the 16th century when European miracle plays blended with indigenous martial arts and theatrical idioms.

Costumed in opulent velvet capes, golden crowns, and Romanesque armor, actors deliver dramatic verse in Chentamil and classical Malayalam while executing synchronized acrobatic footwork. Plays like 'Brijeena Charitham' and 'Karalman Charitham' (Charlemagne) depict epic battles, courtly honor, and Christian spiritual triumph.`,
    culturalSignificance: 'Chavittu Nadakam is India’s foremost Christian classical dramatic heritage, celebrated for its unique wooden stage resonance and vibrant synthesis of Mediterranean and Malabar aesthetics.',
    visitorProtocol: 'Rehearsals are open during post-monsoon festive seasons. Annual Gothuruth Chavittu Nadakam Fest takes place every December.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    imageGallery: [
      {
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
        caption: 'Ensemble performers in courtly attire executing the signature synchronized footwork.',
        credit: 'Gothuruth Cultural Archive'
      }
    ],
    imageCredit: 'Ernakulam Heritage Collective / Muziris Heritage Project',
    verificationStatus: 'Verified',
    verifiedBy: 'Muziris Heritage Conservation Board',
    lastReviewed: '10 January 2026',
    sourceCitations: [
      {
        title: 'Chavittu Nadakam: Historical Roots of Kerala Christian Theatre',
        authorOrArchive: 'Kerala Sahitya Akademi',
        year: '2016'
      }
    ],
    contributor: {
      name: 'Francis Joseph Tharayil',
      role: 'Third-Generation Actor & Director',
      dateSubmitted: '02 Jan 2026'
    },
    featured: false,
    tags: ['Chavittu Nadakam', 'Ernakulam', 'Muziris', 'Island Culture', 'Folk Opera']
  },
  {
    id: 'c-06',
    slug: 'tholpavakoothu-shadow-puppetry-koonathara',
    name: 'Kavalappara Tholpavakoothu Sangham',
    nameMalayalam: 'കൂനത്തറ തോൽപ്പാവക്കൂത്ത് സംഘം, പാലക്കാട്',
    category: 'Master Practitioner',
    artForm: 'Tholpavakoothu (Shadow Leather Puppetry)',
    district: 'Palakkad',
    locality: 'Koonathara, Shoranur',
    address: 'Kavalappara, Koonathara P.O., Palakkad, Kerala 679523',
    coordinates: { lat: 10.7712, lng: 76.2991 },
    shortDescription: 'The nocturnal temple shadow puppet tradition performed behind a 42-foot white screen illuminated by 21 coconut half-shell lamps.',
    fullStory: `Tholpavakoothu is a sacred shadow puppet ritual performed in 'Koothumadams'—dedicated elevated stages erected in front of Bhadrakali temples across Palakkad, Thrissur, and Malappuram. For 21 consecutive nights, puppeteers narrate the Kamba Ramayana through complex shadow manipulation and musical chanting.

The puppets are meticulously cut from treated deer and buffalo hide, etched with perforated decorative filigree that casts luminous silhouettes against the backlit cotton screen. The flickering flames of 21 oil lamps suspended in a row impart a hypnotic, lifelike animation to the epic battles between Rama and Ravana. Master puppeteer Padmashri Ramachandra Pulavar and his family lead the art’s preservation and contemporary adaptation.`,
    culturalSignificance: 'One of the few ritual shadow puppetry lineages in South Asia that continues to be performed as a live devotional offering within sacred temple precincts.',
    visitorProtocol: 'The Koonathara puppet museum and workshop can be visited during daytime. Temple ritual performances are nocturnal (10:00 PM to dawn) between January and May.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    imageGallery: [
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
        caption: 'Leather shadow puppet held against the oil-lamp illuminated cotton screen.',
        credit: 'Palakkad Heritage Archives'
      }
    ],
    imageCredit: 'Pulavar Puppetry Trust Documentation',
    verificationStatus: 'Verified',
    verifiedBy: 'Sangeet Natak Akademi Regional Centre',
    lastReviewed: '29 December 2025',
    sourceCitations: [
      {
        title: 'Shadow Puppets of Kerala: The Ramayana Tradition',
        authorOrArchive: 'Indira Gandhi National Centre for the Arts (IGNCA)',
        year: '2019'
      }
    ],
    contributor: {
      name: 'Rajeev Pulavar',
      role: 'Shadow Puppeteer',
      dateSubmitted: '18 Nov 2025'
    },
    featured: true,
    tags: ['Shadow Puppets', 'Palakkad', 'Leather Craft', 'Temple Ritual', 'Padmashri Tradition']
  },
  {
    id: 'c-07',
    slug: 'mannarasala-nagaraja-temple',
    name: 'Mannarasala Sree Nagaraja Temple & Sarpakavu',
    nameMalayalam: 'മണ്ണാറശാല ശ്രീ നാഗരാജ ക്ഷേത്രം',
    category: 'Sacred Space',
    artForm: 'Sarpam Thullal & Ecological Groves',
    district: 'Alappuzha',
    locality: 'Haripad',
    address: 'Mannarasala P.O., Haripad, Alappuzha, Kerala 690514',
    coordinates: { lat: 9.2842, lng: 76.4529 },
    shortDescription: 'The ancient sacred forest grove with over 30,000 serpent stone idols, headed by a Brahmin woman priestess (Valiya Amma).',
    fullStory: `Sprawled across 16 acres of dense, untouched tropical foliage, Mannarasala is Kerala’s foremost sacred grove (Sarpakavu). The serpentine canopy of medicinal herbs, creepers, and wild trees forms an unbroken micro-ecosystem that has sheltered rare reptiles, birds, and flora for centuries.

Uniquely in Kerala's temple landscape, the chief rites are consecrated by a senior matriarch known as the 'Valiya Amma'. Devotees from across the subcontinent seek blessings for fertility through the offering of 'Uruli Kamazhthal' (placing a consecrated bronze vessel upside down before Nagaraja). The temple is also associated with Sarpam Thullal, an ancient ritual performed by the Pulluvan community with one-stringed fiddles (Veena) and earthen pots (Kudam).`,
    culturalSignificance: 'Mannarasala represents indigenous sacred ecology, where spiritual reverence acts as a living bulwark against deforestation and backwater wetland degradation.',
    visitorProtocol: 'Quiet contemplation is requested within the forest paths. Footwear is strictly banned on grove premises. Dress code: traditional dhoti/mundu and sari/churidar.',
    imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1200&auto=format&fit=crop',
    imageGallery: [
      {
        url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1200&auto=format&fit=crop',
        caption: 'Stone serpent idols carpeted in green moss amidst the ancient canopy.',
        credit: 'Haripad Cultural Society'
      }
    ],
    imageCredit: 'Sacred Groves Documentation Initiative Kerala',
    verificationStatus: 'Verified',
    verifiedBy: 'State Sacred Grove Conservation Cell',
    lastReviewed: '08 January 2026',
    sourceCitations: [
      {
        title: 'Sacred Groves of Kerala: Biodiversity and Belief Systems',
        authorOrArchive: 'Kerala Forest Research Institute (KFRI)',
        year: '2020'
      }
    ],
    contributor: {
      name: 'Gopakumar P.',
      role: 'Ecologist & Heritage Researcher',
      dateSubmitted: '25 Sep 2025'
    },
    featured: false,
    tags: ['Sacred Grove', 'Alappuzha', 'Biodiversity', 'Serpent Lore', 'Matriarchal Lineage']
  },
  {
    id: 'c-08',
    slug: 'edakkal-caves-wayanad',
    name: 'Edakkal Prehistoric Rock Shelters',
    nameMalayalam: 'എടക്കൽ ഗുഹകൾ, വയനാട്',
    category: 'Sacred Space',
    artForm: 'Neolithic Petroglyphs & Megaliths',
    district: 'Wayanad',
    locality: 'Ambalavayal',
    address: 'Nenmeni, Ambalavayal, Wayanad, Kerala 673595',
    coordinates: { lat: 11.6288, lng: 76.2355 },
    shortDescription: 'The only known Neolithic petroglyphs in southern India, etched high upon Ambukuthi Mala between 6000 BCE and 1000 BCE.',
    fullStory: `Formed naturally by a massive cleft split between two giant boulders at an altitude of 1,200 meters, Edakkal (meaning 'stone in between') preserves one of humanity's earliest visual diaries in the subcontinent.

The cave walls are etched with deeply grooved human figures with spiked hair, wheeled carts, bow-wielding warriors, geometric symbols, and Indus Valley script-like signs. Discovered in 1890 by Fred Fawcett, the district police superintendent, the carvings represent human dwelling and ritual marking from the late Neolithic to early historic times.`,
    culturalSignificance: 'Crucial anthropological evidence connecting proto-Dravidian writing and early agrarian civilizations of the Deccan and Western Ghats.',
    visitorProtocol: 'The trek up Ambukuthi Mala involves steep stairs and rocky terrain. Advance online pass or morning counter ticket is required. Touching the carvings is prohibited.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    imageGallery: [
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
        caption: 'Neolithic anthropomorphic rock engraving inside the split rock chamber.',
        credit: 'Archaeological Survey of India'
      }
    ],
    imageCredit: 'Archaeology Department of Kerala / ASI Records',
    verificationStatus: 'Verified',
    verifiedBy: 'State Archaeology Department & ASI Calicut Circle',
    lastReviewed: '15 January 2026',
    sourceCitations: [
      {
        title: 'Rock Art of Wayanad: The Edakkal Engravings',
        authorOrArchive: 'Archaeological Survey of India Monograph',
        year: '2015'
      }
    ],
    contributor: {
      name: 'Vipin Chandran',
      role: 'Archaeology Enthusiast',
      dateSubmitted: '30 Oct 2025'
    },
    featured: true,
    tags: ['Archaeology', 'Petroglyphs', 'Wayanad', 'Prehistoric', 'Trek']
  }
];
