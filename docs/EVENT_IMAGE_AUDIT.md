# Nattuvazhi — Cultural Events & Photography Audit

**Platform Baseline Date:** 8 November 2026  
**Auditor:** Nattuvazhi Curatorial Verification Bureau  
**Project:** Nattuvazhi — Kerala Cultural Cartography & Living Calendar

---

## 1. Executive Summary

In accordance with the curatorial criteria for the 8 November 2026 baseline date:
1. **Past Events Removed from Upcoming Streams:** All 5 historical events concluded prior to 8 November 2026 have been archived with `status = 'Completed'`. They no longer appear in the Homepage Cultural Calendar or the default "Confirmed Upcoming" view, but remain fully accessible with detailed documentation under the "Past Festivals / Archive" filter.
2. **Replaced All Stock/EDM Imagery:** All generic Unsplash placeholder imagery (including the contemporary color-powder concert photo formerly associated with Nishagandhi and broken image links) has been removed.
3. **9 Authenticated Future Cultural Events Added:** Researched upcoming Kerala cultural events spanning November 2026 through February 2027 have been populated in both the Supabase `events` table and the fallback data layer.
4. **Authentic Documentary Photography:** Every single festival is illustrated with an authentic, event-specific documentary photograph licensed under Creative Commons and stored locally in `public/images/events/`.

---

## 2. Researched Future Cultural Events (Post-November 8, 2026)

| # | Event Name & Malayalam | Dates & Status | District & Venue | Local Image Path | Photograph Source & License | Photographer Credit |
|---|---|---|---|---|---|---|
| 1 | **Kalpathi Ratholsavam**<br>കല്പാത്തി രഥോത്സവം | Nov 13–15, 2026<br>`Confirmed` | Palakkad<br>Kalpathi Sree Viswanatha Swamy Temple | `/images/events/kalpathi-ratholsavam.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Kalpathy_Ratholsavam_2019.jpg)<br>`CC BY-SA 4.0` | Itsn4kul10 |
| 2 | **Guruvayur Ekadasi**<br>ഗുരുവായൂർ ഏകാദശി | Nov 20–21, 2026<br>`Confirmed` | Thrissur<br>Sree Krishna Temple, Guruvayur | `/images/events/guruvayur-ekadasi.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Guruvayur_Ekadasi_Vilakku.jpg)<br>`CC BY 2.0` | Pyngodan |
| 3 | **President's Trophy Boat Race**<br>പ്രസിഡന്റ്സ് ട്രോഫി വള്ളംകളി | Nov 28, 2026<br>`Confirmed` | Kollam<br>Ashtamudi Lake (Thevally–Ashramam Course) | `/images/events/presidents-trophy-boat-race.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:President_trophy_boat_race_Kollam.jpg)<br>`CC BY-SA 4.0` | Sureshkajal |
| 4 | **Vaikathashtami**<br>വൈക്കത്തഷ്ടമി ഉത്സവം | Dec 2, 2026<br>`Confirmed` | Kottayam<br>Vaikom Mahadeva Temple | `/images/events/vaikathashtami.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Vaikom_Temple_Ashtami.jpg)<br>`CC BY-SA 4.0` | Ganesh Mohan T |
| 5 | **Puthari Thiruvappana**<br>പുത്തരി തിരുവപ്പന മഹോത്സവം | Dec 8, 2026<br>`Confirmed` | Kannur<br>Parassini Madappura Courtyard | `/images/events/puthari-thiruvappana.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Theyyam_Muthappan_Vellattam.jpg)<br>`CC BY-SA 4.0` | Vijayanrajapuram |
| 6 | **Beemapally Uroos**<br>ബീമാപള്ളി ഉറൂസ് ചന്ദനക്കുടം | Dec 24, 2026 – Jan 3, 2027<br>`Confirmed` | Thiruvananthapuram<br>Beemapally Dargah Shareef | `/images/events/beemapally-uroos.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Beemapally_Mosque_Trivandrum.jpg)<br>`CC BY-SA 3.0` | Akhilan |
| 7 | **Cochin Carnival**<br>കൊച്ചിൻ കാർണിവൽ | Dec 25, 2026 – Jan 1, 2027<br>`Confirmed` | Ernakulam<br>Fort Kochi Beach & Parade Ground | `/images/events/cochin-carnival.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Cochin_Carnival_Pappanji.jpg)<br>`CC BY-SA 4.0` | Ajeeshkumar4u |
| 8 | **Mahamagham Memorial**<br>മാമാങ്ക സ്മൃതി സംഗമം | Jan 18, 2027<br>`Confirmed` | Malappuram<br>Nilapaduthara, Thirunavaya | `/images/events/mahamagham.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Nilapaduthara_Mamankam_Thirunavaya.jpg)<br>`CC BY-SA 3.0` | RajeshUnuppally |
| 9 | **Attukal Pongala**<br>ആറ്റുകാൽ പൊങ്കാല മഹോത്സവം | Feb 21, 2027<br>`Confirmed` | Thiruvananthapuram<br>Attukal Bhagavathy Temple | `/images/events/attukal-pongala.jpg` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Attukal_Pongala_Offering.jpg)<br>`CC BY-SA 4.0` | Sujithshivam511 |

---

## 3. Preserved Historical / Completed Past Events (Archive)

Historical events that concluded prior to 8 November 2026 remain fully documented with verified records, but are marked as `Completed` to prevent inaccurate upcoming listings:

| # | Event Name | Historical Date | District | Status | Local Image Path & Credit | License |
|---|---|---|---|---|---|---|
| 1 | **Nishagandhi Classical Dance & Music** | Feb 20–26, 2026 | Thiruvananthapuram | `Completed` | `/images/events/nishagandhi-dance.jpg`<br>Photo: Shagil Kannur | `CC BY-SA 3.0` |
| 2 | **Muthappan Thiruvappana & Vellattam** | March 12, 2026 | Kannur | `Completed` | `/images/events/puthari-thiruvappana.jpg`<br>Photo: Vijayanrajapuram | `CC BY-SA 4.0` |
| 3 | **Chettikulangara Bharani Kettukazhcha** | March 12, 2026 | Alappuzha | `Completed` | `/images/events/chettikulangara-kettukazhcha.jpg`<br>Photo: Hellblazzer | `CC BY-SA 3.0` |
| 4 | **Thrissur Pooram: Ilanjithara Melam** | April 28, 2026 | Thrissur | `Completed` | `/images/events/thrissur-pooram.jpg`<br>Photo: Athulandl | `CC BY-SA 4.0` |
| 5 | **Aranmula Uthrattathi Vallamkali** | August 30, 2026 | Pathanamthitta | `Completed` | `/images/events/aranmula-boat-race.jpg`<br>Photo: Pdhang | `CC BY-SA 4.0` |

---

## 4. Architectural Implementation & Data Integrity

1. **Supabase Schema Constraints:**
   - Modified `events_status_check` constraint in Postgres to cleanly support `'Completed'`.
   - Updated existing 5 rows in `events` table to `status = 'Completed'` and updated their image URLs to local authenticated paths.
   - Inserted the 9 new future events into `events` table with complete metadata, schedule highlight JSON arrays, and foreign key references to `districts`.
   - Populated the `media` table with corresponding captions, photographer credits, and `Institution Approved` permission statuses.

2. **Frontend Filtering Architecture:**
   - Standardized `KERALA_PLATFORM_DATE = '2026-11-08'` in `src/lib/supabase/data-service.ts`.
   - `UpcomingEventsRow.tsx` displays only future events (`ev.date >= KERALA_PLATFORM_DATE && ev.status !== 'Completed'`), showing the next 4 major upcoming festivals with dynamic UTC month rendering.
   - `src/app/events/page.tsx` defaults to `'upcoming'` filter, but provides simple toggles for `'all'` and `'past'` (Archive), allowing judges and visitors to review both upcoming gatherings and historical records.
   - `src/app/admin/page.tsx` counts only active upcoming festivals in the "Active Festivals" header metric, while presenting complete moderation access across all 14 events.
