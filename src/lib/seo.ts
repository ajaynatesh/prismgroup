/**
 * Central SEO helpers: one place for the canonical origin, Open Graph /
 * Twitter tag construction and reusable JSON-LD fragments.
 */

export const SITE_URL = "https://prismgroup.lovable.app";
export const SITE_NAME = "Prism Group";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Absolute URL for an app path ("/about" → "https://…/about"). */
export function absUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const clean = path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `${SITE_URL}${clean}`;
}

type MetaTag = Record<string, string>;

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  /** Open Graph type; defaults to "website". */
  type?: string;
  /** Optional shorter/punchier social headline. */
  ogTitle?: string;
  /** Absolute https URL of the image the page itself shows, 1200x630. */
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
}

/** Full Open Graph + Twitter + description meta set for one page. */
export function pageMeta(seo: PageSeo): MetaTag[] {
  const url = absUrl(seo.path);
  const social = seo.ogTitle ?? seo.title;
  const meta: MetaTag[] = [
    { title: seo.title },
    { name: "description", content: seo.description },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_AU" },
    { property: "og:type", content: seo.type ?? "website" },
    { property: "og:title", content: social },
    { property: "og:description", content: seo.description },
    { property: "og:url", content: url },
    { name: "twitter:card", content: seo.image ? "summary_large_image" : "summary_large_image" },
    { name: "twitter:title", content: social },
    { name: "twitter:description", content: seo.description },
  ];
  if (seo.image) {
    meta.push(
      { property: "og:image", content: seo.image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: seo.image },
    );
    if (seo.imageAlt) {
      meta.push(
        { property: "og:image:alt", content: seo.imageAlt },
        { name: "twitter:image:alt", content: seo.imageAlt },
      );
    }
  }
  if (seo.noindex) meta.push({ name: "robots", content: "noindex, nofollow" });
  return meta;
}

/** Self-referencing canonical link for a leaf route. */
export function canonical(path: string) {
  return [{ rel: "canonical", href: absUrl(path) }];
}

/** BreadcrumbList JSON-LD. Home is prepended automatically. */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}

/** WebPage (or a subtype such as AboutPage / ContactPage) JSON-LD. */
export function webPageLd(seo: {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "Blog";
  extra?: Record<string, unknown>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": seo.type ?? "WebPage",
    "@id": `${absUrl(seo.path)}#webpage`,
    url: absUrl(seo.path),
    name: seo.name,
    description: seo.description,
    inLanguage: "en-AU",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    ...seo.extra,
  };
}

/** Service JSON-LD for a capability page. */
export function serviceLd(svc: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  offers?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absUrl(svc.path)}#service`,
    name: svc.name,
    description: svc.description,
    serviceType: svc.serviceType,
    url: absUrl(svc.path),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Australia" },
    ...(svc.offers?.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${svc.name} offerings`,
            itemListElement: svc.offers.map((o) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: o },
            })),
          },
        }
      : {}),
  };
}

/** SoftwareApplication JSON-LD for a product/venture page. */
export function productLd(app: {
  name: string;
  description: string;
  path: string;
  category?: string;
  features?: string[];
  externalUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${absUrl(app.path)}#software`,
    name: app.name,
    description: app.description,
    url: app.externalUrl ?? absUrl(app.path),
    applicationCategory: app.category ?? "BusinessApplication",
    operatingSystem: "Web",
    provider: { "@id": ORG_ID },
    ...(app.features?.length ? { featureList: app.features } : {}),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "AUD",
      description: "Pricing on enquiry",
      availability: "https://schema.org/InStock",
      url: absUrl("/contact"),
    },
  };
}

/** Helper to render one or more JSON-LD objects as head scripts. */
export function ldScripts(...objects: unknown[]) {
  return objects.map((obj) => ({
    type: "application/ld+json",
    children: JSON.stringify(obj),
  }));
}
