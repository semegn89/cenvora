import Link from "next/link";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const steps = [
  { key: "step1" as const, icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z", n: "01" },
  { key: "step2" as const, icon: "M3 3h2l.4 2M7 13h10l4-9H5.4m1.6 9L5 3m2 10a2 2 0 100 4 2 2 0 000-4zm10 2a2 2 0 100 4 2 2 0 000-4z", n: "02" },
  { key: "step3" as const, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", n: "03" },
];

const features = [
  { titleKey: "feature1Title" as const, textKey: "feature1Text" as const, icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { titleKey: "feature2Title" as const, textKey: "feature2Text" as const, icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { titleKey: "feature3Title" as const, textKey: "feature3Text" as const, icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
];

export default async function B2CPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const text = t[locale].b2c;

  return (
    <div className="premium-page">
      <section className="premium-section">
        <div className="container-content">
          <div className="segment-card segment-card--b2c reveal-on-scroll">
            <div className="segment-card__header">
              <span className="segment-badge">B2C</span>
              <div className="segment-icon">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <h1 className="segment-card__title max-w-3xl">{text.heroTitle}</h1>
            <p className="segment-card__body max-w-2xl">{text.heroSubtitle}</p>
            <div className="segment-mini-grid">
              <div className="segment-metric">
                <span className="segment-metric__value">24-48h</span>
                <span className="segment-metric__label">{locale === "ro" ? "livrare uzuală" : "typical delivery"}</span>
              </div>
              <div className="segment-metric">
                <span className="segment-metric__value">1-cart</span>
                <span className="segment-metric__label">{locale === "ro" ? "traseu simplu până la comandă" : "simple path to order"}</span>
              </div>
            </div>
            <div className="b2c-conversion-stack">
              <div className="b2c-conversion-stack__tile">
                <span className="b2c-conversion-stack__kicker">{locale === "ro" ? "Selecție rapidă" : "Fast selection"}</span>
                <p className="b2c-conversion-stack__text">
                  {locale === "ro"
                    ? "Produsele sunt ușor de găsit, comparat și adăugat în coș fără pași inutili."
                    : "Products are easy to find, compare, and add to cart without unnecessary steps."}
                </p>
              </div>
              <div className="b2c-conversion-stack__tile">
                <span className="b2c-conversion-stack__kicker">{locale === "ro" ? "Checkout clar" : "Clear checkout"}</span>
                <p className="b2c-conversion-stack__text">
                  {locale === "ro"
                    ? "Mesaj simplu, traseu scurt și acțiuni vizibile pentru cumpărători care vor să finalizeze rapid."
                    : "Simple messaging, a short path, and visible actions for buyers who want to finish quickly."}
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/${locale}/catalog`} className="btn btn-primary btn-xl premium-button">
                {text.heroCta}
              </Link>
              <Link href={`/${locale}/checkout`} className="btn btn-secondary btn-xl premium-button-secondary">
                {locale === "ro" ? "Vezi coșul" : "View cart"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section premium-section--alt">
        <div className="container-content">
          <div className="premium-section__header reveal-on-scroll">
            <span className="premium-kicker">{locale === "ro" ? "Proces" : "Process"}</span>
            <h2 className="premium-title max-w-3xl">{text.howTitle}</h2>
          </div>
          <div className="process-grid mt-10">
            {steps.map((step, index) => (
              <article
                key={step.key}
                className="process-card reveal-on-scroll"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <span className="process-card__index">{step.n}</span>
                <div className="premium-card__icon mt-6">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d={step.icon} />
                  </svg>
                </div>
                <h3 className="process-card__title">{text[step.key]}</h3>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href={`/${locale}/catalog`} className="btn btn-primary btn-xl premium-button">
              {text.heroCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="container-content">
          <div className="premium-section__header reveal-on-scroll">
            <span className="premium-kicker">{locale === "ro" ? "Beneficii" : "Benefits"}</span>
            <h2 className="premium-title max-w-3xl">{text.featuresTitle}</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((feature, index) => (
              <article
                key={feature.titleKey}
                className="premium-card reveal-on-scroll"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="premium-card__icon">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d={feature.icon} />
                  </svg>
                </div>
                <h3 className="premium-card__title">{text[feature.titleKey]}</h3>
                <p className="premium-card__body">{text[feature.textKey]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-cta">
        <div className="container-content">
          <div className="cta-shell reveal-on-scroll">
            <span className="premium-pill premium-pill--dark">{locale === "ro" ? "B2C activ" : "Active B2C"}</span>
            <h2 className="premium-title mt-5 max-w-3xl">{text.ctaTitle}</h2>
            <p className="premium-body mt-5 max-w-2xl">{text.ctaText}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/${locale}/catalog`} className="btn btn-primary btn-xl premium-button">
                {text.ctaButton}
              </Link>
              <Link href={`/${locale}/b2b`} className="btn btn-secondary btn-xl premium-button-secondary">
                {locale === "ro" ? "Sunt companie" : "I am a business"}
              </Link>
            </div>
          </div>
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
  return {
    title: locale === "ro" ? "Cumpărați produse | CENVORA" : "Shop products | CENVORA",
    description:
      locale === "ro"
        ? "Comandați simplu din catalogul CENVORA. Livrare rapidă, produse verificate, prețuri corecte."
        : "Order easily from CENVORA's catalog. Fast delivery, verified products, fair prices.",
  };
}
