# Cultural Category Audit

## Scope and method

This audit uses the current application taxonomy and the published rows returned from the configured Supabase project on 8 November 2026. No database records were modified.

The application currently exposes cultural listing categories through the `categories` table and the Explore filter. Events are stored separately and are not classified as cultural listings.

## Existing taxonomy

| Category | Slug | Published listings |
|---|---|---:|
| Ritual Art | `ritual-art` | 3 |
| Sacred Space | `sacred-space` | 2 |
| Master Practitioner | `master-practitioner` | 0 |
| Traditional Craft | `traditional-craft` | 1 |
| Cultural Institution | `cultural-institution` | 1 |
| Martial Tradition | `martial-tradition` | 1 |
| Oral Heritage | `oral-heritage` | 0 |
| Contemporary & Folk | `contemporary-spaces` | 0 |

## Published cultural listing audit

| Existing record | Record type | Current category | Recommended category | Reason |
|---|---|---|---|---|
| Parassini Madappura Muthappan Sthanam | Sacred ritual place / experience | Ritual Art | Ritual Art | The published record documents daily Muthappan Theyyam and Vellattam as a living ritual performance. |
| Kerala Kalamandalam Deemed University | Cultural institution | Cultural Institution | Cultural Institution | This is an academy and institution that teaches and preserves Kathakali, Koodiyattam and Mohiniyattam. |
| Aranmula Kannadi Artisan Guild | Artisan guild / craft workshop | Traditional Craft | Traditional Craft | The record represents the Aranmula metal-mirror craft and its artisan production lineage. |
| CVN Kalari Sangham | Martial institution / practitioner group | Martial Tradition | Martial Tradition | The record represents a Kalaripayattu training lineage and marma practice. |
| Gothuruth Chavittu Nadakam Kala Samithi | Performing-arts group | Ritual Art | Ritual Art | Chavittu Nadakam is a living performance tradition documented as a group and cultural experience. |
| Kavalappara Tholpavakoothu Sangham | Ritual performance group | Ritual Art | Ritual Art | Tholpavakoothu is a sacred shadow-puppetry performance tradition. |
| Mannarasala Sree Nagaraja Temple & Sarpakavu | Sacred place | Sacred Space | Sacred Space | The record represents a temple and serpent grove with sacred ecological and ritual significance. |
| Edakkal Prehistoric Rock Shelters | Heritage place | Sacred Space | Sacred Space | The existing taxonomy currently uses Sacred Space for this heritage destination; no separate historic-place category exists in the live taxonomy. |

## Events and non-listing data

The published events are separate rows in `events` and include classical arts, ritual theatre, temple festival/percussion, and water heritage/feasting. They should remain on the Events page and should not be forced into the cultural listing category system.

## Findings

1. The homepage previously used six descriptive groupings that did not correspond one-to-one with the live category identifiers.
2. The Explore page omitted the existing `master-practitioner` category and used category display names in the URL.
3. Category assignment is a property of a cultural listing; record type, district, art form and event category must remain separate.
4. No published listing currently uses `Master Practitioner`, `Oral Heritage`, or `Contemporary & Folk`.
5. No database correction is recommended from this read-only audit. The existing published assignments are internally consistent with the available taxonomy.

