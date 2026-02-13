import Link from "next/link";
import Image from "next/image";
import { company } from "@/config/company";
import { type Locale, t } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const text = t[locale].footer;
  const prefix = `/${locale}`;
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--card)]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Image src="/logo.png" alt="" width={100} height={40} className="h-10 w-auto object-contain mb-2" />
            <p className="font-semibold text-[var(--primary)]">{company.name}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{company.activity}</p>
            <p className="mt-1 text-sm">
              CUI: {company.cui} · EUID: {company.euid}
            </p>
          </div>
          <div>
            <p className="font-medium">{text.requisites}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{company.address.line}</p>
            <p className="mt-1 text-sm">
              <a href={`mailto:${company.contacts.email}`} className="hover:text-[var(--primary)]">{company.contacts.email}</a>
              {" · "}
              <a href={`tel:${company.contacts.phone.replace(/\s/g, "")}`} className="hover:text-[var(--primary)]">{company.contacts.phone}</a>
            </p>
          </div>
          <div>
            <Link href={`${prefix}/legal`} className="text-sm hover:text-[var(--primary)]">{text.legal}</Link>
            <span className="mx-2 text-[var(--muted)]">·</span>
            <Link href={`${prefix}/contacts`} className="text-sm hover:text-[var(--primary)]">{text.contact}</Link>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} {company.name}. {company.jurisdiction}
        </p>
      </div>
    </footer>
  );
}
