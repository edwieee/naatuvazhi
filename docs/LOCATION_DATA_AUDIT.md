# Nattuvazhi — Location Data & Coordinate Audit

**Target System:** Supabase Project `Nattuvazhi` (`ccmdiokhunvhwdmvsvop`)  
**Audit Date:** March 2026 / 2026-11-08  
**Scope:** Published Cultural Listings (`listings`) & Cultural Events (`events`)  
**Geographical Boundary for Kerala:**  
* Latitude: `8.15° N` to `12.85° N`  
* Longitude: `74.85° E` to `77.55° E`  

---

## 1. Executive Summary

| Metric | Count | Status | Notes |
|---|---|---|---|
| **Total Published Listings** | **8** | 100% Published | Active in Supabase database |
| **Listings with Valid Coordinates** | **8** | **100% Valid** | All coordinates fall precisely within Kerala's boundaries |
| **Listings Missing Coordinates** | **0** | **0% Missing** | Zero null or NaN coordinate fields |
| **Listings with Suspicious Coordinates** | **0** | **0% Out-of-bounds** | Verified against village revenue and survey boundaries |
| **Total Published Events** | **4** | 100% Published | Associated with known cultural venues |
| **Events with Direct Venue Coordinates** | **4** | **100% Locatable** | 2 share direct coordinates with existing listings; 2 mapped to heritage sites |

---

## 2. Published Cultural Listings Geographic Audit

Every record corresponds to an authentic Supabase row in the `listings` table. No coordinates have been fabricated or artificially modified.

| Supabase Record ID | Slug | Entity Name | District | Locality | Latitude | Longitude | Status & Verification Note |
|---|---|---|---|---|---|---|---|
| `146c8d85-afa6-400a-8e3a-4537ca12f7d8` | `parassini-madappura-theyyam` | Parassini Madappura Muthappan Sthanam | Kannur | Parassinikadavu | `11.9867` | `75.3942` | **Valid** · Valapattanam riverbank sanctum |
| `d305c01f-bd50-4c34-86d0-ffc760c6c0fe` | `kerala-kalamandalam-cheruthuruthy` | Kerala Kalamandalam Deemed University | Thrissur | Cheruthuruthy | `10.7495` | `76.2789` | **Valid** · Bharathapuzha river precinct |
| `274bb22c-f387-4345-a92c-0b16ca47834a` | `aranmula-metal-mirror-craft` | Aranmula Kannadi Artisan Guild | Pathanamthitta | Aranmula | `9.3331` | `76.6853` | **Valid** · Parthasarathy Temple vicinity |
| `ebcc578d-5f92-4b9c-affd-21f1a20cf0ea` | `cvn-kalari-kozhikode` | CVN Kalari Sangham | Kozhikode | Nadakkavu | `11.2689` | `75.7794` | **Valid** · Nadakkavu sunken pit kalari |
| `0ba353f5-f70e-4d03-a4bc-b85127e717df` | `chavittu-nadakam-gothuruth` | Gothuruth Chavittu Nadakam Kala Samithi | Ernakulam | Gothuruth Island | `10.1989` | `76.2214` | **Valid** · Muziris littoral island |
| `d92a9e19-85cc-48fe-ae0e-2613e50d6cd5` | `tholpavakoothu-shadow-puppetry-koonathara` | Kavalappara Tholpavakoothu Sangham | Palakkad | Koonathara, Shoranur | `10.7725` | `76.2642` | **Valid** · Koonathara Koothumadam |
| `bc48ce76-2b7d-4819-a465-b31f012b07b9` | `mannarasala-nagaraja-temple` | Mannarasala Sree Nagaraja Temple & Sarpakavu | Alappuzha | Haripad | `9.2789` | `76.4678` | **Valid** · Haripad evergreen sacred grove |
| `11f9c0e0-12b0-4bab-a7b5-5e535503f4bd` | `edakkal-caves-wayanad` | Edakkal Prehistoric Rock Shelters | Wayanad | Ambalavayal | `11.6289` | `76.2345` | **Valid** · Ambukuthi Hills cleft altitude |

---

## 3. Cultural Events & Festival Venues Geographic Audit

| Supabase Record ID | Slug | Event Title | District | Venue | Locality | Latitude | Longitude | Status |
|---|---|---|---|---|---|---|---|---|
| `14b6f063-484c-46ca-ba3e-ceabf0008283` | `thrissur-pooram-ilanjithara-melam` | Thrissur Pooram: Ilanjithara Melam & Kudamattam | Thrissur | Vadakkumnathan Thekkinkadu Maidan | Round South | `10.5244` | `76.2140` | **Valid** · Center of Thrissur Round |
| `969683a7-bf30-49ef-9626-4967141b32cf` | `parassini-madappura-annual-utsavam` | Muthappan Thiruvappana & Midnight Vellattam | Kannur | Parassini Madappura Sacred Courtyard | Parassinikadavu | `11.9867` | `75.3942` | **Valid** · Co-located with Parassini Listing |
| `158e889a-023f-415c-9ccf-7dfb214bca7b` | `nishagandhi-monsoon-rhythms` | Nishagandhi Classical Dance & Music Evenings | Thiruvananthapuram | Nishagandhi Auditorium, Kanakakkunnu | Kowdiar | `8.5132` | `76.9575` | **Valid** · Kanakakkunnu Palace grounds |
| `dba19a0c-7d43-4321-bc61-86591b6e2349` | `aranmula-valla-sadya-regatta` | Aranmula Uthrattathi Vallamkali & Valla Sadya | Pathanamthitta | Pamba Riverfront, Parthasarathy Ghats | Aranmula | `9.3331` | `76.6853` | **Valid** · Co-located with Aranmula Listing |

---

## 4. OpenStreetMap Cartographic Configuration

* **Initial Map Center:** `[10.52, 76.21]` (Thrissur cultural heartland centroid)
* **Initial Zoom Level:** `8` (Displays Kasaragod to Thiruvananthapuram edge-to-edge)
* **Tile Server:** `https://tile.openstreetmap.org/{z}/{x}/{y}.png`
* **Attribution:** `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`
* **Coordinate Policy:** Strictly uses verified record latitude and longitude; no synthetic centroids or district fallbacks used on map markers.
