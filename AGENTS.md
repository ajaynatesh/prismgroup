<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Dedicated case study routes use the shared case chapter shell, with domain-specific interactive demonstrations kept in `src/components/case`; this preserves visual consistency without coupling venture-page behavior.
- Keep public case study URLs synchronized across the case catalogue, static prerender list, server sitemap and static sitemap script so both hosting modes retain deep links.
- The challenge adviser is a public one-shot server function grounded in the existing pillar and live case catalogues; this prevents invented offerings and broken recommendation links.
- Keep adviser descriptions and briefs transient, and persist only server-owned AI access blocks; this protects visitor confidentiality and prevents denied calls replaying after reloads.
- Static (GitHub Pages) builds keep the full interactive adviser and call the Lovable-hosted public endpoint `/api/public/adviser` (CORS-restricted to Prism origins); this gives prismgroup.au the working AI tool without exposing secrets or running a server on Pages.
