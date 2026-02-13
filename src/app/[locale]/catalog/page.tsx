import { prisma } from "@/lib/prisma";
import { CatalogClient } from "./CatalogClient";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const categoryMap: Record<string, string> = {
  FMCG: "FMCG",
  IndustrialSupplies: "IndustrialSupplies",
  Packaging: "Packaging",
  Other: "Other",
};

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  const catFilter = category && categoryMap[category] ? categoryMap[category] : undefined;

  const products = await prisma.product.findMany({
    where: { isActive: true, ...(catFilter ? { category: catFilter } : {}) },
    orderBy: { category: "asc" },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">{t[locale].catalog.title}</h1>
      <CatalogClient
        locale={locale}
        products={products.map((p) => ({
          id: p.id,
          sku: p.sku,
          name: p.name,
          descriptionShort: p.descriptionShort,
          category: p.category,
          priceFrom: p.priceFrom,
          unit: p.unit,
        }))}
        searchCategory={category}
      />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return {
    title: t[locale].catalog.title,
    description:
      locale === "ro"
        ? "Catalog produse CENVORA — FMCG, industrial, ambalaje."
        : "CENVORA product catalog — FMCG, industrial, packaging.",
  };
}
