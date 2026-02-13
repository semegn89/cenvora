import { company } from "@/config/company";
import { ContactForm } from "./ContactForm";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const text = t[locale].contacts;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">{text.title}</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold">{text.addressTitle}</h2>
          <p className="mt-2 text-[var(--muted)]">{company.name}</p>
          <p className="mt-1">{company.address.line}</p>
          <p className="mt-4">
            <a href={`mailto:${company.contacts.email}`} className="text-[var(--primary)] hover:underline">
              {company.contacts.email}
            </a>
          </p>
          <p>
            <a href={`tel:${company.contacts.phone.replace(/\s/g, "")}`} className="text-[var(--primary)] hover:underline">
              {company.contacts.phone}
            </a>
          </p>
          <div className="mt-6 aspect-video w-full overflow-hidden rounded-lg border border-[var(--border)]">
            <iframe
              title="Map"
              src={company.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold">{text.formTitle}</h2>
          <ContactForm locale={locale} />
        </div>
      </div>
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
    title: t[locale].contacts.title,
    description:
      locale === "ro"
        ? "Contact CENVORA — adresă, email, telefon, formular."
        : "Contact CENVORA — address, email, phone, form.",
  };
}
