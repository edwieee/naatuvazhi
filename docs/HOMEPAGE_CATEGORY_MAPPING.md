# Homepage Category Mapping

Homepage cards and Explore filters use the same category slug from Supabase.

| Homepage card | Category source | Explore URL | Current published result count |
|---|---|---|---:|
| Ritual Art | `categories.slug = ritual-art` | `/explore?category=ritual-art` | 3 |
| Sacred Space | `categories.slug = sacred-space` | `/explore?category=sacred-space` | 2 |
| Master Practitioner | `categories.slug = master-practitioner` | `/explore?category=master-practitioner` | 0 |
| Traditional Craft | `categories.slug = traditional-craft` | `/explore?category=traditional-craft` | 1 |
| Cultural Institution | `categories.slug = cultural-institution` | `/explore?category=cultural-institution` | 1 |
| Martial Tradition | `categories.slug = martial-tradition` | `/explore?category=martial-tradition` | 1 |

The homepage reads category metadata and published listing counts through the shared data service. Explore reads the `category` URL parameter, resolves the category by slug, and filters the same published listing collection. Clearing filters restores the complete published directory and map result set.

