import Link from "next/link";
import Image from "next/image";
import { company } from "@/config/company";
import { images } from "@/config/images";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const categories = [
  { slug: "FMCG", nameRo: "FMCG", nameEn: "FMCG", image: images.categories.FMCG },
  { slug: "IndustrialSupplies", nameRo: "Industrial", nameEn: "Industrial", image: images.categories.IndustrialSupplies },
  { slug: "Packaging", nameRo: "Ambalaje", nameEn: "Packaging", image: images.categories.Packaging },
  { slug: "Other", nameRo: "Altele", nameEn: "Other", image: images.categories.Other },
];

const advantages = [
  { titleKey: "advantage1Title" as const, textKey: "advantage1Text" as const, image: images.advantages.experience },
  { titleKey: "advantage2Title" as const, textKey: "advantage2Text" as const, image: images.advantages.range },
  { titleKey: "advantage3Title" as const, textKey: "advantage3Text" as const, image: images.advantages.flexible },
  { titleKey: "advantage4Title" as const, textKey: "advantage4Text" as const, image: images.advantages.documentation },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const text = t[locale].home;

  return (
    <div>
      <section className="relative border-b border-[var(--border)] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={images.hero}
            alt=""
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[var(--card)]/90" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{text.heroTitle}</h1>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">{text.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/contacts`} className="btn btn-primary">
              {text.heroCta}
            </Link>
            <Link href={`/${locale}/checkout`} className="btn btn-secondary">
              {text.heroCta2}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-10">{text.advantagesTitle}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a) => (
              <div key={a.titleKey} className="card overflow-hidden p-0">
                <div className="relative h-40 w-full">
                  <Image
                    src={a.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[var(--primary)]">{text[a.titleKey]}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{text[a.textKey]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--card)] border-y border-[var(--border)]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-10">{text.categoriesTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/${locale}/catalog?category=${c.slug}`}
                className="group card hover:border-[var(--primary)] transition-all overflow-hidden p-0"
              >
                <div className="relative h-36 w-full">
                  <Image
                    src={c.image}
                    alt={locale === "ro" ? c.nameRo : c.nameEn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width:640px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="font-medium text-white text-lg">{locale === "ro" ? c.nameRo : c.nameEn}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-center mt-6">
            <Link href={`/${locale}/catalog`} className="btn btn-primary">
              {text.categoriesCta}
            </Link>
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 text-center text-sm text-[var(--muted)]">
          <p>{text.trustBlock}</p>
          <p className="mt-2">
            CUI: {company.cui} · EUID: {company.euid} · CAEN 4690
          </p>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const title = locale === "ro" ? "Acasă" : "Home";
  return {
    title,
    description:
      locale === "ro"
        ? "CENVORA INTERNATIONAL S.R.L. — Comerț cu ridicata nespecializat. Partener B2B de încredere."
        : "CENVORA INTERNATIONAL S.R.L. — Non-specialized wholesale trade. Trusted B2B partner.",
  };
}
