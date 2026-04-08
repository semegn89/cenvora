import Link from "next/link";
import { company } from "@/config/company";
import { type Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const prefix = `/${locale}`;
  const isRo = locale === "ro";

  return (
    <footer className="site-footer mt-auto">
      <div className="container-content">
        <div className="footer-shell">
          <div className="footer-brand">
            <span className="footer-wordmark">CENVORA</span>
            <p className="mt-5 max-w-md text-base leading-8 text-white/66">
              {isRo
                ? "Comerț, sourcing și servicii cu o prezență digitală construită pentru claritate, încredere și decizie rapidă."
                : "Trade, sourcing, and services with a digital presence built for clarity, trust, and faster decisions."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/48">
              <span>{company.jurisdiction}</span>
              <span>CUI: {company.cui}</span>
              <span>EUID: {company.euid}</span>
            </div>
          </div>

          <div>
            <p className="footer-heading">{isRo ? "Navigare" : "Navigation"}</p>
            <div className="mt-5 flex flex-col gap-3">
              <Link href={`${prefix}/b2c`} className="footer-link">
                {isRo ? "B2C / Cumpărați" : "B2C / Shop"}
              </Link>
              <Link href={`${prefix}/b2b`} className="footer-link">
                B2B
              </Link>
              <Link href={`${prefix}/catalog`} className="footer-link">
                {isRo ? "Catalog" : "Catalog"}
              </Link>
              <Link href={`${prefix}/company`} className="footer-link">
                {isRo ? "Companie" : "Company"}
              </Link>
              <Link href={`${prefix}/legal`} className="footer-link">
                {isRo ? "Legal" : "Legal"}
              </Link>
            </div>
          </div>

          <div>
            <p className="footer-heading">{isRo ? "Contact" : "Contact"}</p>
            <div className="mt-5 flex flex-col gap-3">
              <a href={`mailto:${company.contacts.email}`} className="footer-link">
                {company.contacts.email}
              </a>
              <a href={`tel:${company.contacts.phone.replace(/\s/g, "")}`} className="footer-link">
                {company.contacts.phone}
              </a>
              <p className="text-sm leading-7 text-white/52">{company.address.line}</p>
            </div>
          </div>
        </div>

        <div className="divider flex flex-col gap-4 py-6 text-sm text-white/42 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. {isRo ? "Toate drepturile rezervate." : "All rights reserved."}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href={`${prefix}/legal`} className="footer-link">
              {isRo ? "Politica de confidențialitate" : "Privacy Policy"}
            </Link>
            <Link href={`${prefix}/legal`} className="footer-link">
              {isRo ? "Termeni" : "Terms"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
