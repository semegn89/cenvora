/**
 * Site-wide config: URLs, feature flags, email recipients.
 */

export const site = {
  name: "CENVORA INTERNATIONAL",
  defaultLocale: "ro" as const,
  locales: ["ro", "en"] as const,
  orderEmail: process.env.ORDER_TO_EMAIL || process.env.CONTACT_TO_EMAIL || "",
  contactEmail: process.env.CONTACT_TO_EMAIL || process.env.ORDER_TO_EMAIL || "",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
} as const;

export type Site = typeof site;
