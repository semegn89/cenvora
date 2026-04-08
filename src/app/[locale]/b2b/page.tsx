import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { B2BForm } from "./B2BForm";
import { company } from "@/config/company";

const benefits = [
  {
    titleKey: "benefit1Title" as const,
    textKey: "benefit1Text" as const,
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    titleKey: "benefit2Title" as const,
    textKey: "benefit2Text" as const,
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    titleKey: "benefit3Title" as const,
    textKey: "benefit3Text" as const,
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  },
  {
    titleKey: "benefit4Title" as const,
    textKey: "benefit4Text" as const,
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    titleKey: "benefit5Title" as const,
    textKey: "benefit5Text" as const,
    icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
  },
  {
    titleKey: "benefit6Title" as const,
    textKey: "benefit6Text" as const,
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
];

export default async function B2BPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const text = t[locale].b2b;

  const stats = [
    { label: text.statsLabel1, value: text.statsValue1 },
    { label: text.statsLabel2, value: text.statsValue2 },
    { label: text.statsLabel3, value: text.statsValue3 },
    { label: text.statsLabel4, value: text.statsValue4 },
  ];

  const cases = [text.case1, text.case2, text.case3, text.case4];

  return (
    <div className="premium-page">
      <section className="premium-section">
        <div className="container-content">
          <div className="segment-card segment-card--b2b reveal-on-scroll">
            <div className="segment-card__header">
              <span className="segment-badge">B2B</span>
              <div className="segment-icon">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M4 20h16M6 17V7l6-3 6 3v10M9 10h.01M12 10h.01M15 10h.01M9 13h.01M12 13h.01M15 13h.01" />
                </svg>
              </div>
            </div>
            <h1 className="segment-card__title max-w-3xl">{text.heroTitle}</h1>
            <p className="segment-card__body max-w-2xl">{text.heroSubtitle}</p>
            <div className="enterprise-metric-rail">
              {stats.map((stat) => (
                <div key={stat.label} className="enterprise-metric-rail__item">
                  <span className="enterprise-metric-rail__value">{stat.value}</span>
                  <span className="enterprise-metric-rail__label">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#form" className="btn btn-primary btn-xl premium-button">
                {text.heroCta}
              </a>
              <a href={`mailto:${company.contacts.email}`} className="btn btn-secondary btn-xl premium-button-secondary">
                {text.heroCtaSecondary}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section premium-section--alt">
        <div className="container-content">
          <div className="premium-section__header reveal-on-scroll">
            <span className="premium-kicker">{locale === "ro" ? "Avantaje" : "Benefits"}</span>
            <h2 className="premium-title max-w-3xl">{text.benefitsTitle}</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <article
                key={benefit.titleKey}
                className="premium-card reveal-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="premium-card__icon">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d={benefit.icon} />
                  </svg>
                </div>
                <h3 className="premium-card__title">{text[benefit.titleKey]}</h3>
                <p className="premium-card__body">{text[benefit.textKey]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="container-content">
          <div className="premium-section__header reveal-on-scroll">
            <span className="premium-kicker">{locale === "ro" ? "Industrii" : "Industries"}</span>
            <h2 className="premium-title max-w-3xl">{text.casesTitle}</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cases.map((item, index) => (
              <div
                key={item}
                className="showcase-copy reveal-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="showcase-copy__kicker">{locale === "ro" ? "Segment" : "Segment"}</p>
                <p className="showcase-copy__title">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="form" className="premium-section premium-section--alt">
        <div className="container-content">
          <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
            <div className="reveal-on-scroll">
              <span className="premium-kicker">{locale === "ro" ? "Ofertare" : "Quoting"}</span>
              <h2 className="premium-title mt-4 max-w-2xl">{text.formTitle}</h2>
              <p className="premium-body mt-5 max-w-xl">{text.formSubtitle}</p>

              <div className="enterprise-checklist mt-8">
                {[
                  { text: company.contacts.email, href: `mailto:${company.contacts.email}` },
                  { text: company.contacts.phone, href: `tel:${company.contacts.phone.replace(/\s/g, "")}` },
                  { text: company.address.line },
                ].map((item) => (
                  <div key={item.text} className="enterprise-checklist__item">
                    <span className="enterprise-checklist__dot" />
                    {item.href ? (
                      <a href={item.href} className="footer-link">
                        {item.text}
                      </a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-card reveal-on-scroll">
              <B2BForm locale={locale} />
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
    title: locale === "ro" ? "Parteneriat B2B | CENVORA" : "B2B Partnership | CENVORA",
    description:
      locale === "ro"
        ? "Condiții en-gros, factură fiscală, manager dedicat. Solicitați o ofertă personalizată pentru compania dvs."
        : "Wholesale terms, tax invoice, dedicated manager. Request a personalized offer for your company.",
  };
}
