/**
 * Single source of truth for CENVORA INTERNATIONAL S.R.L. company data.
 * Used across the site: footer, legal, contacts, checkout.
 */

export const company = {
  name: "CENVORA INTERNATIONAL S.R.L.",
  nameShort: "CENVORA",
  jurisdiction: "România (ORCT Iași)",
  activity: "CAEN 4690 — Comerț cu ridicata nespecializat",
  activityEn: "CAEN 4690 — Non-specialized wholesale trade",
  cui: "53502962",
  euid: "ROONRC.J2026005274002",
  regNumber: "J2026005274002",
  address: {
    line: "Jud. Iași, Municipiul Iași, Strada Fântânilor, Nr. 43, Bl. B14, Ap. B39",
    city: "Iași",
    country: "România",
  },
  contacts: {
    email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "Orvessagroup@gmail.com",
    phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "+40 748 394 758",
  },
  mapEmbedUrl:
    process.env.NEXT_PUBLIC_MAP_EMBED_URL ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2712.7629999999997!2d27.5872!3d47.1585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sIa%C8%99i!5e0!3m2!1sen!2sro!4v1",
  mapLink: process.env.NEXT_PUBLIC_MAP_LINK || "https://www.google.com/maps/search/Iași,+Strada+Fântânilor+43",
} as const;

export type Company = typeof company;
