import { DistrictName } from '@/lib/types';

export interface DistrictInfo {
  name: DistrictName;
  nameMalayalam: string;
  code: string;
  center: { lat: number; lng: number };
  culturalSignature: string;
  primaryArtForms: string[];
  listingCount: number;
}

export const KERALA_DISTRICTS: DistrictInfo[] = [
  {
    name: 'Kasaragod',
    nameMalayalam: 'കാസർഗോഡ്',
    code: 'KSD',
    center: { lat: 12.5102, lng: 74.9852 },
    culturalSignature: 'Land of seven languages, Yakshagana, Bekal coastal bastions, and Theyyam.',
    primaryArtForms: ['Yakshagana', 'Theyyam', 'Mangalamkali'],
    listingCount: 14
  },
  {
    name: 'Kannur',
    nameMalayalam: 'കണ്ണൂർ',
    code: 'KNR',
    center: { lat: 11.8745, lng: 75.3704 },
    culturalSignature: 'Cradle of Theyyam, weaving guilds, and warrior legends.',
    primaryArtForms: ['Theyyam', 'Thidambu Nritham', 'Poothan'],
    listingCount: 38
  },
  {
    name: 'Wayanad',
    nameMalayalam: 'വയനാട്',
    code: 'WYD',
    center: { lat: 11.6854, lng: 76.1320 },
    culturalSignature: 'Prehistoric petroglyphs, indigenous forest tribes, and sacred megaliths.',
    primaryArtForms: ['Paniya Tribal Dance', 'Neolithic Rock Art', 'Kurumba Lore'],
    listingCount: 19
  },
  {
    name: 'Kozhikode',
    nameMalayalam: 'കോഴിക്കോട്',
    code: 'KKD',
    center: { lat: 11.2588, lng: 75.7804 },
    culturalSignature: 'Historic City of Literature, historic spice ports, and Kadathanad Kalaripayattu.',
    primaryArtForms: ['Vadakkan Kalari', 'Oppana', 'Duffmuttu'],
    listingCount: 27
  },
  {
    name: 'Malappuram',
    nameMalayalam: 'മലപ്പുറം',
    code: 'MLP',
    center: { lat: 11.0510, lng: 76.0711 },
    culturalSignature: 'Mappila Kala cultural roots, Valluvanad traditions, and Ayurvedic lineages.',
    primaryArtForms: ['Mappila Songs', 'Kolkali', 'Tholpavakoothu'],
    listingCount: 22
  },
  {
    name: 'Palakkad',
    nameMalayalam: 'പാലക്കാട്',
    code: 'PKD',
    center: { lat: 10.7867, lng: 76.6548 },
    culturalSignature: 'Granary of Kerala, shadow puppetry, Carnatic legacy, and Bharathapuzha heritage.',
    primaryArtForms: ['Tholpavakoothu', 'Carnatic Music', 'Kanyarkali'],
    listingCount: 26
  },
  {
    name: 'Thrissur',
    nameMalayalam: 'തൃശ്ശൂർ',
    code: 'TSR',
    center: { lat: 10.5276, lng: 76.2144 },
    culturalSignature: 'Cultural capital of Kerala, monumental temple poorams, and Kalamandalam classical cradle.',
    primaryArtForms: ['Kathakali', 'Koodiyattam', 'Panchavadyam', 'Pulikali'],
    listingCount: 45
  },
  {
    name: 'Ernakulam',
    nameMalayalam: 'എറണാകുളം',
    code: 'EKM',
    center: { lat: 9.9816, lng: 76.2999 },
    culturalSignature: 'Ancient Muziris port civilization, Chavittu Nadakam, and Kochi-Muziris Biennale.',
    primaryArtForms: ['Chavittu Nadakam', 'Contemporary Art', 'Margamkali'],
    listingCount: 34
  },
  {
    name: 'Idukki',
    nameMalayalam: 'ഇടുക്കി',
    code: 'IDK',
    center: { lat: 9.9189, lng: 76.9444 },
    culturalSignature: 'High-altitude Muthuvan tribal lore, dolmens, and mountain spice traditions.',
    primaryArtForms: ['Muthuvan Koothu', 'Dolmen Megalith Rites'],
    listingCount: 12
  },
  {
    name: 'Kottayam',
    nameMalayalam: 'കോട്ടയം',
    code: 'KTM',
    center: { lat: 9.5916, lng: 76.5222 },
    culturalSignature: 'Land of letters, Syrian Christian heritage architecture, and classical temple murals.',
    primaryArtForms: ['Margamkali', 'Classical Murals', 'Sopana Sangeetham'],
    listingCount: 21
  },
  {
    name: 'Alappuzha',
    nameMalayalam: 'ആലപ്പുഴ',
    code: 'ALP',
    center: { lat: 9.4981, lng: 76.3388 },
    culturalSignature: 'Venice of the East, coir weaving guilds, sacred snake groves, and Nehru Trophy regattas.',
    primaryArtForms: ['Vanchipattu', 'Sarpam Thullal', 'Patayani'],
    listingCount: 29
  },
  {
    name: 'Pathanamthitta',
    nameMalayalam: 'പത്തനംതിട്ട',
    code: 'PTA',
    center: { lat: 9.2648, lng: 76.7870 },
    culturalSignature: 'Sanctuary of Patayani ritual dance, Aranmula metal mirrors, and sacred river feasts.',
    primaryArtForms: ['Patayani', 'Aranmula Mirror Guild', 'Valla Sadya'],
    listingCount: 24
  },
  {
    name: 'Kollam',
    nameMalayalam: 'കൊല്ലം',
    code: 'KLM',
    center: { lat: 8.8932, lng: 76.6141 },
    culturalSignature: 'Historic maritime Silk Road hub, cashew crafts, and Ashtamudi lake culture.',
    primaryArtForms: ['Kollam Pooram', 'Velakali', 'Thullal'],
    listingCount: 18
  },
  {
    name: 'Thiruvananthapuram',
    nameMalayalam: 'തിരുവനന്തപുരം',
    code: 'TVM',
    center: { lat: 8.5241, lng: 76.9366 },
    culturalSignature: 'Capital of Travancore kings, Padmanabhaswamy temple treasures, and Swathi Thirunal music academy.',
    primaryArtForms: ['Kathakali', 'Mohiniyattam', 'Theyyam of South (Padayani)', 'Koodiyattam'],
    listingCount: 39
  }
];
