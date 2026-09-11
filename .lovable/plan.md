# Premium Mobile Experience Refinement

## Goal
Refine the existing site for 320px, 375px, 390px, 414px, and 430px phones, prioritising the homepage while preserving its brand, messaging, content, routes, and tablet/desktop presentation.

## What will change
- Recompose the mobile homepage opening so the headline, proposition, actions, proof points, and intelligence visual form one intentional first impression instead of a tall empty viewport.
- Give the mobile intelligence visual a more compact, graphic treatment with clearer flow, fewer simultaneous effects, and no clipped labels.
- Tighten mobile section spacing and card padding to improve rhythm and reduce the current 19,000–22,000px page length without removing content.
- Replace the cramped seven-column portfolio selector on phones with a touch-friendly horizontal selector that preserves all seven pillars and clear active state.
- Increase menu, navigation, portfolio, footer, and inline-link touch targets to at least 44px where appropriate.
- Improve narrow-screen wrapping for the hero badge, metrics, outcome equation, calls to action, headings, and footer links.
- Add tactile pressed states and restrained mobile transitions while retaining richer hover effects for pointer devices.
- Reduce expensive mobile blur and continuous animation; ensure all relevant transitions honour reduced-motion settings.

## Validation
- Test the complete homepage at 320px, 375px, 390px, 414px, and 430px.
- Check the mobile menu, homepage actions, and portfolio selector by interaction.
- Verify no horizontal overflow, overlap, clipping, delayed invisible content, or undersized primary controls.
- Recheck tablet and desktop at 768px, 1024px, and 1440px to confirm existing layouts remain intact.
- Verify reduced-motion rendering and browser console health.

## Technical details
- Changes stay within existing homepage and shared presentation components, plus semantic design utilities.
- Existing copy, SEO metadata, links, route structure, brand tokens, and desktop breakpoints remain unchanged.
- Mobile-specific styling will use responsive utilities; no new services, data, or external assets are required.
