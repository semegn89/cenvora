"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, t } from "@/lib/i18n";
import { useCart } from "@/contexts/CartContext";

const nav = [
  { href: "", labelKey: "home" as const },
  { href: "/b2c", labelKey: "b2c" as const },
  { href: "/b2b", labelKey: "b2b" as const },
  { href: "/catalog", labelKey: "catalog" as const },
  { href: "/company", labelKey: "company" as const },
  { href: "/contacts", labelKey: "contacts" as const },
] as const;

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const text = t[locale].nav;
  const prefix = `/${locale}`;
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className={`site-header ${scrolled || mobileOpen ? "site-header--solid" : ""}`}>
      <div className="container-content">
        <div className="site-nav-shell flex min-h-[72px] items-center justify-between gap-4">
          <Link href={prefix} className="flex shrink-0 items-center gap-3">
            <span className="site-wordmark">CENVORA</span>
            <span className="site-wordmark-note">Supply Interface</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map(({ href, labelKey }) => {
              const path = href ? `${prefix}${href}` : prefix;
              const isActive = pathname === path || (href && pathname.startsWith(path));
              const isHighlighted = href === "/b2b";

              return (
                <Link
                  key={href || "home"}
                  href={path}
                  className={`nav-link ${isActive ? "nav-link--active" : ""} ${isHighlighted ? "nav-link--highlight" : ""}`}
                >
                  {text[labelKey]}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LocaleSwitcher locale={locale} pathname={pathname} />
            <Link
              href={`${prefix}/checkout`}
              className="btn btn-primary btn-sm relative hidden sm:inline-flex"
              aria-label={text.orderCta}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 4h2l.5 2.2M7 13h10l3.6-7.2H6.1M7 13 5.5 6.2M7 13a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
              </svg>
              {text.orderCta}
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 text-[11px] font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="btn btn-secondary btn-sm px-3 lg:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 6l12 12M18 6 6 18" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="mt-3 rounded-[28px] border border-white/10 bg-white/6 p-4 backdrop-blur-xl lg:hidden">
            <nav className="flex flex-col gap-2">
              {nav.map(({ href, labelKey }) => {
                const path = href ? `${prefix}${href}` : prefix;
                const isHighlighted = href === "/b2b";
                return (
                  <Link
                    key={href || "home"}
                    href={path}
                    className={`nav-link justify-between ${isHighlighted ? "nav-link--highlight" : ""}`}
                  >
                    {text[labelKey]}
                  </Link>
                );
              })}
              <Link href={`${prefix}/checkout`} className="btn btn-primary mt-2 justify-center">
                {text.orderCta}
                {totalItems > 0 && (
                  <span className="rounded-full bg-slate-950 px-2 py-0.5 text-[11px] font-semibold text-white">
                    {totalItems}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        )}
      </div>
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
      className="locale-switch"
      aria-label={other === "ro" ? "Romana" : "English"}
    >
      {other.toUpperCase()}
    </Link>
  );
}
