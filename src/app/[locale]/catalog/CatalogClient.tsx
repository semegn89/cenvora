"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { images } from "@/config/images";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

type Product = {
  id: string;
  sku: string;
  name: string;
  descriptionShort: string;
  category: string;
  priceFrom: number;
  unit: string;
};

const categories: { value: string; labelRo: string; labelEn: string }[] = [
  { value: "", labelRo: "Toate", labelEn: "All" },
  { value: "FMCG", labelRo: "FMCG", labelEn: "FMCG" },
  { value: "IndustrialSupplies", labelRo: "Industrial", labelEn: "Industrial" },
  { value: "Packaging", labelRo: "Ambalaje", labelEn: "Packaging" },
  { value: "Other", labelRo: "Altele", labelEn: "Other" },
];

export function CatalogClient({
  locale,
  products,
  searchCategory,
}: {
  locale: Locale;
  products: Product[];
  searchCategory?: string;
}) {
  const router = useRouter();
  const { addToCart } = useCart();
  const text = t[locale].catalog;
  const productImages = images.products;

  const handleAdd = (p: Product) => {
    addToCart({
      productId: p.id,
      sku: p.sku,
      name: p.name,
      price: p.priceFrom,
      unit: p.unit,
      qty: 1,
    });
    router.refresh();
  };

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <span className="text-sm text-[var(--muted)]">{text.filterCategory}</span>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.value || "all"}
              href={c.value ? `?category=${c.value}` : "."}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                (searchCategory || "") === c.value
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "bg-[var(--card)] border border-[var(--border)] hover:bg-zinc-100"
              }`}
            >
              {locale === "ro" ? c.labelRo : c.labelEn}
            </Link>
          ))}
        </div>
      </div>

      {products.length === 0 ? (
        <p className="mt-10 text-[var(--muted)]">{text.noProducts}</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, index) => (
            <div key={p.id} className="card flex flex-col overflow-hidden p-0">
              <div className="relative h-40 w-full shrink-0">
                <Image
                  src={productImages[index % productImages.length]}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute top-2 right-2 rounded bg-black/60 text-white px-2 py-0.5 text-xs">{p.category}</span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p className="text-xs text-[var(--muted)]">{p.sku}</p>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-[var(--muted)] flex-1">{p.descriptionShort}</p>
                <div className="mt-4 flex items-center justify-between">
                <span className="text-sm">
                    {text.priceFrom} <strong>{p.priceFrom} EUR</strong> / {p.unit}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAdd(p)}
                    className="btn btn-primary text-sm"
                  >
                    {text.addToCart}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
