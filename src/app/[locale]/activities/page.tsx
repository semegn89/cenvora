import Image from "next/image";
import { company } from "@/config/company";
import { images } from "@/config/images";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const activitySections = [
  { titleKey: "wholesaleTitle" as const, textKey: "wholesaleText" as const, image: images.activities.wholesale },
  { titleKey: "sourcingTitle" as const, textKey: "sourcingText" as const, image: images.activities.sourcing },
  { titleKey: "logisticsTitle" as const, textKey: "logisticsText" as const, image: images.activities.logistics },
  { titleKey: "b2bTitle" as const, textKey: "b2bText" as const, image: images.activities.b2b },
  { titleKey: "itServicesTitle" as const, textKey: "itServicesText" as const, image: images.activities.itServices },
  { titleKey: "invoiceBankTitle" as const, textKey: "invoiceBankText" as const, image: images.activities.invoice, showBank: true },
];

export default async function ActivitiesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const text = t[locale].activities;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">{text.title}</h1>

      {activitySections.map((s) => (
        <section key={s.titleKey} className="mt-10 card max-w-3xl overflow-hidden p-0">
          <div className="relative h-48 w-full">
            <Image
              src={s.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-[var(--primary)]">{text[s.titleKey]}</h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">{text[s.textKey]}</p>
            {"showBank" in s && s.showBank && (
              <div className="mt-6 rounded-lg bg-zinc-50 dark:bg-zinc-900 p-4 text-sm space-y-2 font-mono">
                <p><strong>{company.name}</strong></p>
                <p>{company.address.line}</p>
                <p>CUI: {company.cui} · Reg. Com.: {company.regNumber} · EUID: {company.euid}</p>
                <p className="pt-2 border-t border-[var(--border)]">{company.bank.name}</p>
                <p>{company.bank.address}</p>
                <p>IBAN: {company.bank.iban}</p>
                <p>SWIFT / BIC: {company.bank.swift}</p>
              </div>
            )}
          </div>
        </section>
      ))}
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
    title: t[locale].activities.title,
    description:
      locale === "ro"
        ? "Activități CENVORA: comerț en-gros, sourcing, logistică, model B2B."
        : "CENVORA activities: wholesale, sourcing, logistics, B2B model.",
  };
}
