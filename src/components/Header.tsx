"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { type Locale, t } from "@/lib/i18n";

const nav = [
  { href: "", labelKey: "home" as const },
  { href: "/company", labelKey: "company" as const },
  { href: "/activities", labelKey: "activities" as const },
  { href: "/catalog", labelKey: "catalog" as const },
  { href: "/contacts", labelKey: "contacts" as const },
  { href: "/legal", labelKey: "legal" as const },
] as const;

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const text = t[locale].nav;
  const prefix = `/${locale}`;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        <Link href={`${prefix}`} className="flex items-center gap-3 font-semibold text-lg shrink-0">
          <Image
            src="/logo.png"
            alt="CENVORA INTERNATIONAL"
            width={120}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
          <span className="hidden sm:inline text-[var(--foreground)]">CENVORA INTERNATIONAL</span>
          <span className="sm:hidden text-[var(--foreground)]">CENVORA</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map(({ href, labelKey }) => {
            const path = href ? `${prefix}${href}` : prefix;
            const isActive = pathname === path || (href && pathname.startsWith(path));
            return (
              <Link
                key={href || "home"}
                href={path}
                className={`text-sm font-medium transition-colors hover:text-[var(--primary)] ${isActive ? "text-[var(--primary)]" : "text-[var(--foreground)]"}`}
              >
                {text[labelKey]}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} pathname={pathname} />
          <Link href={`${prefix}/checkout`} className="btn btn-primary hidden sm:inline-flex">
            {text.orderCta}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden btn btn-secondary p-2"
            aria-label="Menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--card)] px-4 py-3 flex flex-col gap-2">
          {nav.map(({ href, labelKey }) => {
            const path = href ? `${prefix}${href}` : prefix;
            return (
              <Link
                key={href || "home"}
                href={path}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium py-2"
              >
                {text[labelKey]}
              </Link>
            );
          })}
          <Link href={`${prefix}/checkout`} onClick={() => setMobileOpen(false)} className="btn btn-primary sm:hidden mt-2">
            {text.orderCta}
          </Link>
        </div>
      )}
    </header>
  );
}

function LocaleSwitcher({ locale, pathname }: { locale: Locale; pathname: string }) {
  const other = locale === "ro" ? "en" : "ro";
  const pathWithoutLocale = pathname.replace(/^\/(ro|en)/, "") || "";
  const otherPath = `/${other}${pathWithoutLocale}`;
  return (
    <Link
      href={otherPath}
      className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
      aria-label={other === "ro" ? "Română" : "English"}
    >
      {other.toUpperCase()}
    </Link>
  );
}
