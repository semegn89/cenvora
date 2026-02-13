import Image from "next/image";
import { company } from "@/config/company";
import { images } from "@/config/images";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const text = t[locale].company;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">{text.title}</h1>

      <div className="mt-8 rounded-xl overflow-hidden border border-[var(--border)] aspect-[21/9] max-w-4xl relative">
        <Image
          src={images.company}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      <section className="mt-10 max-w-3xl">
        <h2 className="text-xl font-semibold text-[var(--primary)]">{text.missionTitle}</h2>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">{text.missionText}</p>
      </section>

      <section className="mt-12 card max-w-2xl">
        <h2 className="text-xl font-semibold">{text.requisitesTitle}</h2>
        <ul className="mt-4 space-y-2 text-sm">
          <li><strong>{company.name}</strong></li>
          <li>CAEN 4690 — {locale === "ro" ? "Comerț cu ridicata nespecializat" : "Non-specialized wholesale trade"}</li>
          <li>CUI: {company.cui}</li>
          <li>EUID: {company.euid}</li>
          <li>Reg. number: {company.regNumber}</li>
          <li>Sediu: {company.address.line}</li>
          <li>{company.jurisdiction}</li>
        </ul>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-semibold text-[var(--primary)]">{text.geographyTitle}</h2>
        <p className="mt-4 text-[var(--muted)] leading-relaxed">{text.geographyText}</p>
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
  return {
    title: t[locale].company.title,
    description:
      locale === "ro"
        ? "Despre CENVORA INTERNATIONAL S.R.L. — misiune, rechizite, geografie."
        : "About CENVORA INTERNATIONAL S.R.L. — mission, company details, geography.",
  };
}
