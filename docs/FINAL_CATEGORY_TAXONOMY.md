# Final Category Taxonomy

The homepage and Explore page share the `categories` table taxonomy. URLs use the stable category slug, while labels and Malayalam names come from the same category record.

## Homepage selection

The homepage contains exactly six cards:

| Display order | Category | Slug | Published listings |
|---:|---|---|---:|
| 1 | Ritual Art | `ritual-art` | 3 |
| 2 | Sacred Space | `sacred-space` | 2 |
| 3 | Master Practitioner | `master-practitioner` | 0 |
| 4 | Traditional Craft | `traditional-craft` | 1 |
| 5 | Cultural Institution | `cultural-institution` | 1 |
| 6 | Martial Tradition | `martial-tradition` | 1 |

These are six existing category records in Supabase. `Master Practitioner` is included because it is an existing Explore taxonomy category and is a meaningful visitor-facing category, but its card does not claim a count and its filter correctly returns no published result until a record is assigned.

`Oral Heritage` and `Contemporary & Folk` remain available in the shared taxonomy but are not shown on the homepage because the audit found no published cultural listing in either category.

## Classification boundaries

- **Category:** the cultural subject represented by a listing.
- **Record type:** place, practitioner, group, institution or experience.
- **District:** the geographic location.
- **Event category:** the classification of an event row; events remain on the Events page.

No category records or listing assignments were changed during this implementation.

