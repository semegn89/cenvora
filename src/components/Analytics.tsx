"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_KEY = "cenvora-cookie-consent";

export function Analytics() {
  const [allowed, setAllowed] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (!gaId) return;
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return;
      const c = JSON.parse(raw) as { analytics?: boolean };
      if (c?.analytics) setAllowed(true);
    } catch {
      // ignore
    }
  }, [gaId]);

  if (!gaId || !allowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}');`}
      </Script>
    </>
  );
}
