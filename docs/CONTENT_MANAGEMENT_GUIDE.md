# Nattuvazhi — Curator Content Management Guide

**Target Platform:** Nattuvazhi Curator Portal (`/admin`)  
**Database Backend:** Supabase (`Nattuvazhi` — `ccmdiokhunvhwdmvsvop`)  
**Audience:** Curators, Folklore Scholars, and Cultural Administrators  

---

## 1. Overview & Curatorial Philosophy

The Curator Portal is the command center for maintaining Kerala's living culture map. Every published record, event schedule, and community accession flows through this interface. Curatorial changes are committed transactionally to Supabase, logged in an immutable audit ledger, and automatically reflected across public pages using Next.js on-demand revalidation.

---

## 2. Managing Cultural Listings

### 2.1 Adding a New Listing
1. Navigate to `/admin` and select the **Cultural Listings** tab.
2. Click **Add new cultural listing**.
3. Fill in the required fields:
   - **English Name & Malayalam Name:** Include native script for local linguistic fidelity.
   - **Category & Art Form:** Choose from the 8 official dimensions (e.g. *Ritual Art*, *Traditional Craft*).
   - **District & Locality:** Pinpoint the village or sacred precinct.
   - **Coordinates:** Input decimal latitude and longitude (e.g. `11.9867, 75.3942`).
   - **Short Description & Full Story:** Provide rigorous ethnographic background, historical lineage, and subaltern context.
   - **Visitor Protocol:** Document sacred guidelines, dress codes, offering customs, and photography restrictions.
   - **Verification Status:** Select `'Verified'` (backed by institution/monograph) or `'Scholar Reviewed'`.
4. Click **Save & Publish Listing**. The record is committed to Supabase and immediately indexed on the public `/explore` directory and interactive map.

### 2.2 Updating an Existing Listing
1. Find the listing via the search bar in the **Cultural Listings** tab.
2. Click the **Edit (pencil)** button.
3. Modify descriptions, addresses, or visitor guidelines.
4. Saving persists changes to Supabase and automatically updates `/culture/[slug]`.

### 2.3 Featuring on the Homepage
- In the **Cultural Listings** table, click the **★ Featured** button to toggle a listing between featured and standard display on the homepage curated grid.

---

## 3. Managing Events & the Cultural Calendar

### 3.1 Creating a Festival / Gathering
1. Select the **Events & Calendar** tab in `/admin`.
2. Click **Add new festival / gathering**.
3. Provide:
   - **Festival Title & Malayalam Title**
   - **Calendar Date & Daily Schedule Timeframe**
   - **Venue, Locality, and District**
   - **Organizer** (e.g., Devaswom Council, Traditional Artists Guild)
   - **Original Announcement URL** (mandatory official source link)
   - **Status:** `'Confirmed'`, `'Tentative'`, or `'Annual Season'`
4. Click **Save & Publish Event**.

### 3.2 Date Rescheduling & Quick Re-Verification Workflow
When an official Devaswom or festival committee announces revised dates:
1. Locate the event in `/admin` under **Events & Calendar**.
2. Click **Verify Date** to timestamp today's verification check against the official announcement.
3. Or click **Edit** to adjust the calendar date.
4. Saving updates the public calendar (`/events`), event detail page (`/events/[slug]`), and homepage upcoming festival previews without code redeployment.

---

## 4. Moderating Community Submissions

1. Navigate to the **Submissions Queue** tab in `/admin`.
2. Filter by status: `'Pending'`, `'Approved'`, `'Changes Requested'`.
3. Click **Review** on any accession to open the detailed Curatorial Verification Bureau view (`/admin/review/[id]`).
4. Complete the Verification Checklist:
   - *Coordinates and boundaries verified*
   - *Archival backing verified (cross-referenced with monograph)*
   - *Media copyright and license confirmed*
   - *Respects ritual privacy guidelines*
5. Execute one of three actions:
   - **Approve & Index on Map:** Automatically updates submission status to `'Approved'` and creates a published live listing in `listings` table.
   - **Request Corrections:** Marks status as `'Changes Requested'` and logs reviewer notes for the contributor.
   - **Reject Submission:** Archives the accession with explanation.

---

## 5. Homepage Headlines & Charter Text

1. Select the **Homepage & Copy** tab in `/admin`.
2. Edit the **Hero Main Headline** or **Platform Narrative Subtext**.
3. Click **Save Homepage Configuration**.
4. Changes are saved to `homepage_config` table in Supabase and updated on the public `/` homepage.
