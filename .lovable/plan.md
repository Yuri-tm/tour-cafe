

## Landing Page Implementation Plan

Based on the Figma site, I'll replicate this "Тур-кафе" (Tour Cafe) landing page layout.

### Page Structure

The page has these sections, all within a single `Index.tsx`:

1. **Header** -- Logo circle (left), title "Тур-кафе" (center), "телефон" link (right)
2. **Subtitle** -- Centered "Subtitle Text"
3. **Two action buttons** -- "Button 1" (dark/primary) and "Button 2" (light/secondary), side by side, rounded-xl
4. **Categories row** -- 2-column grid with "Category 1" and "Category 2" cards
5. **Products grid** -- 2-column grid of 14 product cards (min-h ~120px each)
6. **Personalities section** -- Heading + 2-column grid of 6 person cards with name and "Details" subtitle
7. **Special Offer section** -- Heading + 2-column layout: left tall card "Main Offer" spanning 3 rows, right column with 3 stacked "Offer Detail" cards

### Implementation Details

- **Single file edit**: `src/pages/Index.tsx`
- The Figma source already uses Tailwind classes matching the project's design tokens (`bg-background`, `bg-card`, `text-card-foreground`, `bg-primary`, etc.), so the conversion is straightforward
- Use the existing Card components from `src/components/ui/card.tsx` where appropriate, or simple divs with matching Tailwind classes
- Data arrays for products (14 items), personalities (6 items), and offers (3 items) will be defined inline for easy editing later
- Fully responsive: the 2-column grid works on all sizes; could add `grid-cols-1 sm:grid-cols-2` for mobile

### Files Changed

- `src/pages/Index.tsx` -- Complete rewrite with the landing page layout

