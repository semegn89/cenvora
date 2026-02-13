"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, t } from "@/lib/i18n";

const CONSENT_KEY = "cenvora-cookie-consent";
type Consent = { necessary: true; analytics: boolean } | null;

export function CookieConsent({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const pathname = usePathname();
  const prefix = pathname?.match(/^\/(ro|en)/)?.[1] || "ro";
  const text = t[locale === "ro" ? "ro" : "en"].cookie;

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(CONSENT_KEY) : null;
    if (raw === null) {
      setOpen(true);
      return;
    }
    try {
      const c = JSON.parse(raw) as Consent;
      if (c) setAnalytics(!!c.analytics);
    } catch {
      setOpen(true);
    }
  }, []);

  const save = (necessary: true, analyticsChoice: boolean) => {
    const consent: Consent = { necessary, analytics: analyticsChoice };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setOpen(false);
    setSettingsOpen(false);
    if (typeof window !== "undefined" && (window as unknown as { gtag?: () => void }).gtag) {
      // If GA is loaded, it would respect consent; here we only store preference.
    }
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-[var(--border)] bg-[var(--card)] p-4 shadow-lg">
      <div className="container mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--foreground)]">
          {text.bannerText}{" "}
          <Link href={`/${prefix}/legal`} className="underline hover:text-[var(--primary)]">
            {t[locale].legal.cookies}
          </Link>
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {!settingsOpen ? (
            <>
              <button type="button" className="btn btn-primary" onClick={() => save(true, false)}>
                {text.reject}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setSettingsOpen(true)}>
                {text.settings}
              </button>
              <button type="button" className="btn btn-primary" onClick={() => save(true, true)}>
                {text.accept}
              </button>
            </>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked disabled className="rounded" />
                {text.necessary}
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="rounded"
                />
                {text.analytics}
              </label>
              <button type="button" className="btn btn-primary" onClick={() => save(true, analytics)}>
                {text.save}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
