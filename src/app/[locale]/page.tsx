import Image from "next/image";
import Link from "next/link";
import { company } from "@/config/company";
import { images } from "@/config/images";
import type { Locale } from "@/lib/i18n";

const featureIcons = {
  orchestration: "M4 7h16M7 12h10M10 17h4",
  reliability: "M12 3l7 4v5c0 5-3.2 9.3-7 10-3.8-.7-7-5-7-10V7l7-4Z",
  visibility: "M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Zm9 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  speed: "M13 3 4 14h6l-1 7 9-11h-6l1-7Z",
  retail: "M6 7h12l1 12H5L6 7Zm3 0a3 3 0 1 1 6 0",
  enterprise: "M4 20h16M6 17V7l6-3 6 3v10M9 10h.01M12 10h.01M15 10h.01M9 13h.01M12 13h.01M15 13h.01",
} as const;

const productMetrics = [
  { value: "24h", labelEn: "Quote turnaround", labelRo: "Timp mediu de ofertare" },
  { value: "99.2%", labelEn: "Order accuracy", labelRo: "Acuratețe comenzi" },
  { value: "4", labelEn: "Core supply lanes", labelRo: "Fluxuri principale de aprovizionare" },
  { value: "EU", labelEn: "Romania + EU coverage", labelRo: "Acoperire România + UE" },
];

const trustSignals = [
  { name: "Certified sourcing", short: "CS" },
  { name: "EU trade compliant", short: "EU" },
  { name: "Fast dispatch", short: "FD" },
  { name: "Account managed", short: "AM" },
];

const featureSet = [
  {
    icon: featureIcons.orchestration,
    eyebrowEn: "Unified sourcing",
    eyebrowRo: "Sourcing unificat",
    titleEn: "One operating layer across products, procurement, and delivery.",
    titleRo: "Un singur strat operațional pentru produse, achiziții și livrare.",
    bodyEn:
      "Cenvora brings catalog sales, wholesale sourcing, and execution support into one clear commercial operation your team can rely on every day.",
    bodyRo:
      "Cenvora reunește vânzarea din catalog, sourcing-ul en-gros și suportul operațional într-un model comercial clar, pe care echipa se poate baza zilnic.",
  },
  {
    icon: featureIcons.reliability,
    eyebrowEn: "Operational trust",
    eyebrowRo: "Încredere operațională",
    titleEn: "Structured documentation, invoice-ready fulfillment, no messy handoffs.",
    titleRo: "Documentație structurată, livrare pregătită pentru facturare, fără transferuri confuze.",
    bodyEn:
      "Every order follows a clear structure: ownership, shipping, timelines, and documentation are aligned from the start.",
    bodyRo:
      "Fiecare comandă urmează o structură clară: responsabilitate, livrare, termene și documente aliniate de la început.",
  },
  {
    icon: featureIcons.visibility,
    eyebrowEn: "Clear visibility",
    eyebrowRo: "Vizibilitate clară",
    titleEn: "A homepage that routes both retail buyers and enterprise teams without friction.",
    titleRo: "O experiență care separă clar cumpărătorii retail de echipele enterprise, fără fricțiune.",
    bodyEn:
      "Direct buyers move quickly into ordering. B2B accounts see the commercial structure, scale, and contact points they expect from an established supplier.",
    bodyRo:
      "Cumpărătorii direcți intră rapid în comandă. Conturile B2B văd structura comercială, volumul și punctele de contact așteptate de la un furnizor stabil.",
  },
  {
    icon: featureIcons.speed,
    eyebrowEn: "Modern execution",
    eyebrowRo: "Execuție modernă",
    titleEn: "Premium motion, sharp hierarchy, and faster decisions at every scroll depth.",
    titleRo: "Motion premium, ierarhie clară și decizii mai rapide pe tot parcursul paginii.",
    bodyEn:
      "Large typography, layered surfaces, and clear section rhythm help buyers understand the offer quickly and move with confidence.",
    bodyRo:
      "Tipografia mare, suprafețele stratificate și ritmul clar al secțiunilor ajută cumpărătorii să înțeleagă oferta rapid și să decidă cu încredere.",
  },
];

const processSteps = [
  {
    index: "01",
    titleEn: "Choose your lane",
    titleRo: "Alegeți traseul",
    textEn: "Individual buyers move directly into ordering, while business clients enter a commercial process built for scale and continuity.",
    textRo: "Cumpărătorii individuali intră direct în comandă, iar clienții business intră într-un proces comercial construit pentru volum și continuitate.",
  },
  {
    index: "02",
    titleEn: "Confirm scope",
    titleRo: "Confirmați necesarul",
    textEn: "Products, quantities, delivery requirements, and documentation are clarified early, so execution stays predictable.",
    textRo: "Produsele, cantitățile, livrarea și documentația sunt clarificate devreme, pentru ca execuția să rămână predictibilă.",
  },
  {
    index: "03",
    titleEn: "Execute fast",
    titleRo: "Executați rapid",
    textEn: "Orders move with responsive communication, visible checkpoints, and reliable handoff into delivery.",
    textRo: "Comenzile avansează cu comunicare rapidă, puncte de control vizibile și predare sigură către livrare.",
  },
  {
    index: "04",
    titleEn: "Scale repeatably",
    titleRo: "Scalați predictibil",
    textEn: "Repeat buyers and business accounts come back to a commercial setup that feels stable, mature, and easy to trust.",
    textRo: "Clienții recurenți și conturile business revin într-o structură comercială stabilă, matură și ușor de încredere.",
  },
];

const showcaseCards = [
  {
    kickerEn: "Signal layer",
    kickerRo: "Strat de semnale",
    titleEn: "Inventory, quotes, and dispatch organized with the clarity serious buyers expect.",
    titleRo: "Stocul, ofertele și livrările sunt organizate cu claritatea așteptată de cumpărătorii serioși.",
  },
  {
    kickerEn: "Fulfillment view",
    kickerRo: "Vedere fulfillment",
    titleEn: "Retail speed and enterprise structure coexist in one business presence, without creating confusion.",
    titleRo: "Viteza retail și structura enterprise coexistă într-o singură prezență comercială, fără să creeze confuzie.",
  },
];

const enterpriseMetrics = [
  { value: "SLA", labelEn: "Response orchestration", labelRo: "Răspuns orchestrat" },
  { value: "VAT", labelEn: "Invoice-ready compliance", labelRo: "Conformitate pentru facturare" },
  { value: "VOL", labelEn: "Volume-first pricing", labelRo: "Prețuri orientate pe volum" },
];

function copy(locale: Locale) {
  const isRo = locale === "ro";

  return {
    navNote: isRo ? "Comerț, sourcing și servicii pentru retail și business" : "Trade, sourcing, and services for retail and business",
    heroEyebrow: isRo ? "Furnizare, sourcing și execuție pentru retail + B2B" : "Supply, sourcing, and execution for retail + B2B",
    heroTitle: isRo
      ? "Furnizare sigură, execuție clară și servicii comerciale pe care clienții se bazează deja."
      : "Reliable supply, clear execution, and commercial service buyers already trust.",
    heroText: isRo
      ? "Cenvora deservește cumpărători direcți și companii cu procese clare, documentație completă și coordonare comercială matură în România și UE."
      : "Cenvora serves direct buyers and companies with clear processes, complete documentation, and mature commercial coordination across Romania and the EU.",
    heroPrimary: isRo ? "Solicitați ofertă B2B" : "Request a B2B quote",
    heroSecondary: isRo ? "Intră în catalog" : "Enter the catalog",
    heroMeta: isRo ? "CUI verificat • documentație completă • livrare coordonată" : "Verified company • complete documentation • coordinated delivery",
    heroAsideLabel: isRo ? "Operare" : "Operations",
    heroAsideTitle: isRo ? "Procese comerciale clare, coordonare rapidă și execuție stabilă." : "Clear commercial processes, fast coordination, and dependable execution.",
    heroAsideBody: isRo
      ? "De la solicitare și ofertare până la livrare și documentație, fiecare etapă este aliniată pentru lucru constant și predictibil."
      : "From request and quoting to delivery and documentation, each stage is aligned for steady, predictable execution.",
    trustTitle: isRo ? "Încredere construită prin claritate, viteză și consistență." : "Trust built through clarity, speed, and consistency.",
    trustText: isRo
      ? "Companiile și cumpărătorii revin atunci când oferta este clară, răspunsul este rapid, iar execuția rămâne stabilă în timp."
      : "Companies and direct buyers return when the offer is clear, response is fast, and execution stays consistent over time.",
    featuresEyebrow: isRo ? "De ce funcționează" : "Why it works",
    featuresTitle: isRo ? "O prezentare clară pentru un business care operează deja la standard înalt." : "A clear presentation for a business already operating at a high standard.",
    showcaseEyebrow: isRo ? "Operare" : "Operations",
    showcaseTitle: isRo ? "Vizibilitate clară asupra ofertei, livrării și relației comerciale." : "Clear visibility across offer, delivery, and commercial coordination.",
    showcaseText: isRo
      ? "Această secțiune transmite disciplină operațională, maturitate comercială și o structură care inspiră încredere în proces."
      : "This section communicates operational discipline, commercial maturity, and a structure that inspires confidence in the process.",
    b2cEyebrow: "B2C",
    b2cTitle: isRo ? "Achiziție rapidă pentru cumpărători direcți." : "Fast buying flow for direct customers.",
    b2cText: isRo
      ? "Catalog clar, selecție rapidă, logică de checkout simplă și CTA-uri făcute pentru acțiune imediată, fără pași reci sau ambigui."
      : "Clear catalog access, fast selection, lightweight checkout logic, and CTAs tuned for immediate action without dead-end friction.",
    b2cPrimary: isRo ? "Intră în catalog" : "Enter the catalog",
    b2cSecondary: isRo ? "Vezi checkout" : "View checkout",
    b2bEyebrow: "B2B",
    b2bTitle: isRo ? "Parteneriat structurat pentru companii care cumpără constant și la scară." : "Structured partnership for companies buying consistently and at scale.",
    b2bText: isRo
      ? "Volume, ofertare, sourcing și coordonare comercială organizate pentru companii care au nevoie de continuitate, seriozitate și timp de reacție bun."
      : "Volume, quoting, sourcing, and commercial coordination organized for companies that need continuity, seriousness, and strong response times.",
    b2bPrimary: isRo ? "Solicitați propunere" : "Request a proposal",
    b2bSecondary: isRo ? "Contactați vânzări" : "Contact sales",
    processEyebrow: isRo ? "Cum funcționează" : "How it works",
    processTitle: isRo ? "Patru pași clari, de la solicitare până la execuție." : "Four clear steps from request to execution.",
    closingTitle: isRo ? "Lucrați cu o echipă care răspunde clar, livrează organizat și operează constant." : "Work with a team that responds clearly, delivers in an organized way, and operates consistently.",
    closingText: isRo
      ? "Pentru cumpărători direcți, acces rapid la ofertă. Pentru companii, o relație comercială clară, structurată și pregătită pentru volum."
      : "Direct buyers get fast access to the offer. Companies get a clear, structured commercial relationship ready for scale.",
    closingPrimary: isRo ? "Vorbiți cu echipa B2B" : "Talk to the B2B team",
    closingSecondary: isRo ? "Vezi catalogul" : "View the catalog",
    footerTrust: isRo ? "Companie înregistrată în România" : "Registered Romanian company",
  };
}

function HomeIcon({ path }: { path: string }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d={path} />
    </svg>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const text = copy(locale);
  const isRo = locale === "ro";
  const heroTiles = images.heroTiles;

  return (
    <div className="premium-page">
      <section className="premium-hero">
        <div className="premium-hero__bg">
          <div className="premium-orb premium-orb--a" />
          <div className="premium-orb premium-orb--b" />
          <div className="premium-grid" />
          <div className="premium-noise" />
        </div>

        <div className="container-content relative z-10 pt-10 pb-20 md:pt-20 md:pb-28 xl:pt-24 xl:pb-32">
          <div className="premium-hero__layout">
            <div className="max-w-3xl">
              <div className="fade-slide-up">
                <span className="premium-pill">{text.heroEyebrow}</span>
              </div>
              <div className="fade-slide-up [animation-delay:140ms]">
                <p className="mt-6 text-sm font-medium uppercase tracking-[0.28em] text-white/48">
                  {text.navNote}
                </p>
              </div>
              <div className="fade-slide-up [animation-delay:220ms]">
                <h1 className="premium-display mt-5 max-w-4xl">
                  {text.heroTitle}
                </h1>
              </div>
              <div className="fade-slide-up [animation-delay:300ms]">
                <p className="premium-subtitle mt-6 max-w-2xl">
                  {text.heroText}
                </p>
              </div>
              <div className="fade-slide-up [animation-delay:380ms]">
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link href={`/${locale}/b2b`} className="btn btn-primary btn-xl premium-button">
                    {text.heroPrimary}
                  </Link>
                  <Link href={`/${locale}/b2c`} className="btn btn-secondary btn-xl premium-button-secondary">
                    {text.heroSecondary}
                  </Link>
                </div>
              </div>
              <div className="fade-slide-up [animation-delay:460ms]">
                <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-white/60">
                  <span>{text.heroMeta}</span>
                  <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
                  <span>{company.jurisdiction}</span>
                </div>
              </div>
              <div className="fade-slide-up [animation-delay:520ms]">
                <div className="hero-aside mt-10">
                  <div>
                    <p className="hero-aside__label">{text.heroAsideLabel}</p>
                    <p className="hero-aside__title">{text.heroAsideTitle}</p>
                  </div>
                  <p className="hero-aside__body">{text.heroAsideBody}</p>
                </div>
              </div>
            </div>

            <div className="fade-slide-up [animation-delay:320ms]">
              <div className="hero-visual-stack">
                <div className="hero-image-cluster" aria-hidden="true">
                  {heroTiles.map((src, index) => (
                    <div
                      key={src}
                      className={`hero-image-tile hero-image-tile--${index + 1}`}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 1280px) 30vw, 240px"
                      />
                    </div>
                  ))}
                </div>

                <div className="hero-console">
                <div className="hero-console__topbar">
                  <div className="flex items-center gap-2">
                    <span className="hero-console__dot bg-white/35" />
                    <span className="hero-console__dot bg-white/20" />
                    <span className="hero-console__dot bg-white/10" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.24em] text-white/45">
                    {isRo ? "Centru operațional Cenvora" : "Cenvora Operations"}
                  </span>
                </div>

                <div className="hero-console__body">
                  <div className="hero-signal-ribbon">
                    <span className="hero-signal-ribbon__item">{isRo ? "Retail activ" : "Retail active"}</span>
                    <span className="hero-signal-ribbon__item">{isRo ? "Clienți business" : "Business accounts"}</span>
                    <span className="hero-signal-ribbon__item">{isRo ? "Livrări coordonate" : "Coordinated delivery"}</span>
                  </div>
                  <div className="hero-panel hero-panel--primary floating-card">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/60">
                          {isRo ? "Status operațional" : "Operational status"}
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold text-white">
                          {isRo ? "Operațiuni comerciale coordonate" : "Commercial operations coordinated"}
                        </h2>
                      </div>
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-400/12 px-3 py-1 text-xs font-medium text-emerald-200">
                        {isRo ? "Activ" : "Active"}
                      </span>
                    </div>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {productMetrics.map((metric) => (
                        <div key={metric.labelEn} className="hero-stat">
                          <p className="text-2xl font-semibold text-white">{metric.value}</p>
                          <p className="mt-1 text-sm text-white/55">
                            {isRo ? metric.labelRo : metric.labelEn}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="hero-panel hero-panel--secondary floating-card [animation-delay:0.5s]">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-white/40">
                            {isRo ? "Fluxuri active" : "Active channels"}
                          </p>
                          <h3 className="mt-2 text-lg font-semibold text-white">
                            {isRo ? "Retail și business, prezentate clar și separat" : "Retail and business, presented clearly and separately"}
                          </h3>
                        </div>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
                          {isRo ? "02 direcții" : "02 routes"}
                        </span>
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="route-card">
                          <div>
                            <p className="text-sm font-medium text-white">B2C</p>
                            <p className="mt-1 text-sm text-white/50">
                              {isRo ? "Selecție rapidă, produse, comandă" : "Fast selection, products, ordering"}
                            </p>
                          </div>
                          <span className="route-card__status route-card__status--cyan" />
                        </div>
                        <div className="route-card">
                          <div>
                            <p className="text-sm font-medium text-white">B2B</p>
                            <p className="mt-1 text-sm text-white/50">
                              {isRo ? "Ofertare, volum, coordonare comercială" : "Quoting, scale, commercial coordination"}
                            </p>
                          </div>
                          <span className="route-card__status route-card__status--emerald" />
                        </div>
                      </div>
                    </div>

                    <div className="hero-panel hero-panel--tertiary floating-card [animation-delay:0.9s]">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/38">
                        {isRo ? "Semnale de încredere" : "Trust signals"}
                      </p>
                      <div className="mt-5 space-y-3">
                        {trustSignals.map((signal) => (
                          <div key={signal.name} className="trust-line">
                            <span className="trust-line__badge">{signal.short}</span>
                            <span className="text-sm text-white/62">{signal.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hero-bottom-strip">
                    <div className="hero-bottom-strip__copy">
                      <span className="hero-bottom-strip__eyebrow">
                        {isRo ? "Claritate comercială" : "Commercial clarity"}
                      </span>
                      <p className="hero-bottom-strip__text">
                        {isRo
                          ? "Informația esențială este vizibilă imediat: cine cumpără, cum se livrează și ce nivel de coordonare poate aștepta."
                          : "The essential information is visible immediately: who buys, how delivery works, and what level of coordination to expect."}
                      </p>
                    </div>
                    <div className="hero-bottom-strip__metrics">
                      <div className="hero-bottom-strip__metric">
                        <span className="hero-bottom-strip__value">01</span>
                        <span className="hero-bottom-strip__label">
                          {isRo ? "ofertare clară" : "clear quoting"}
                        </span>
                      </div>
                      <div className="hero-bottom-strip__metric">
                        <span className="hero-bottom-strip__value">02</span>
                        <span className="hero-bottom-strip__label">
                          {isRo ? "direcții distincte" : "separate routes"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>

          <div className="reveal-on-scroll mt-14 grid gap-4 rounded-[28px] border border-white/10 bg-white/6 p-6 backdrop-blur-xl md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/55">
                {text.trustTitle}
              </p>
              <p className="mt-3 max-w-2xl text-base leading-7 text-white/68">
                {text.trustText}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4">
              {trustSignals.map((signal) => (
                <div key={signal.short} className="trust-tile">
                  <span className="trust-tile__badge">{signal.short}</span>
                  <span className="text-sm text-white/68">{signal.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="container-content">
          <div className="premium-section__header reveal-on-scroll">
            <span className="premium-kicker">{text.featuresEyebrow}</span>
            <h2 className="premium-title max-w-3xl">{text.featuresTitle}</h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {featureSet.map((feature, index) => (
              <article
                key={feature.titleEn}
                className="premium-card reveal-on-scroll stagger-item"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="premium-card__icon">
                  <HomeIcon path={feature.icon} />
                </div>
                <p className="premium-card__eyebrow">
                  {isRo ? feature.eyebrowRo : feature.eyebrowEn}
                </p>
                <h3 className="premium-card__title">
                  {isRo ? feature.titleRo : feature.titleEn}
                </h3>
                <p className="premium-card__body">
                  {isRo ? feature.bodyRo : feature.bodyEn}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section premium-section--alt">
        <div className="container-content">
          <div className="grid items-center gap-10 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="reveal-on-scroll">
              <span className="premium-kicker">{text.showcaseEyebrow}</span>
              <h2 className="premium-title mt-4 max-w-2xl">{text.showcaseTitle}</h2>
              <p className="premium-body mt-5 max-w-xl">{text.showcaseText}</p>
              <div className="mt-8 grid gap-4">
                {showcaseCards.map((card, index) => (
                  <div
                    key={card.titleEn}
                    className="showcase-copy reveal-on-scroll"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <p className="showcase-copy__kicker">
                      {isRo ? card.kickerRo : card.kickerEn}
                    </p>
                    <p className="showcase-copy__title">
                      {isRo ? card.titleRo : card.titleEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="showcase-panel reveal-on-scroll">
              <div className="showcase-panel__frame">
                <div className="showcase-panel__header">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/40">
                      {isRo ? "Vedere operațională" : "Operational view"}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {isRo ? "Ofertare, livrare și coordonare într-o structură clară" : "Quoting, delivery, and coordination in one clear structure"}
                    </h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/55">
                    {isRo ? "Operare curentă" : "Current operations"}
                  </span>
                </div>

                <div className="showcase-matrix">
                  <div className="matrix-card matrix-card--wide">
                    <p className="matrix-card__label">{isRo ? "Cereri de ofertă" : "Proposal requests"}</p>
                    <div className="mt-5 flex items-end justify-between">
                      <span className="text-4xl font-semibold text-white">18</span>
                      <span className="rounded-full bg-emerald-400/12 px-3 py-1 text-xs text-emerald-200">
                        +14%
                      </span>
                    </div>
                    <div className="matrix-bars mt-6">
                      <span className="h-8 w-full rounded-full bg-white/8" />
                      <span className="h-12 w-full rounded-full bg-cyan-300/35" />
                      <span className="h-16 w-full rounded-full bg-cyan-300/60" />
                      <span className="h-10 w-full rounded-full bg-white/16" />
                      <span className="h-14 w-full rounded-full bg-cyan-300/45" />
                    </div>
                  </div>
                  <div className="matrix-card">
                    <p className="matrix-card__label">{isRo ? "Canal retail" : "Retail channel"}</p>
                    <p className="mt-4 text-lg font-medium text-white">
                      {isRo ? "Catalog clar, checkout rapid, mai puține ezitări." : "Clear catalog, faster checkout, fewer hesitations."}
                    </p>
                  </div>
                  <div className="matrix-card">
                    <p className="matrix-card__label">{isRo ? "Canal business" : "Business channel"}</p>
                    <p className="mt-4 text-lg font-medium text-white">
                      {isRo ? "Volum, termene și contact direct pentru decizie." : "Volume, terms, and direct contact for real decisions."}
                    </p>
                  </div>
                  <div className="matrix-card matrix-card--terminal">
                    <div className="flex items-center justify-between">
                      <span className="matrix-card__label">{isRo ? "Actualizări operaționale" : "Operational updates"}</span>
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
                    </div>
                    <div className="mt-5 space-y-3 text-sm text-white/58">
                      <p>{isRo ? "Ofertă pregătită pentru client industrial" : "Quote prepared for industrial client"}</p>
                      <p>{isRo ? "Slot de livrare confirmat pentru comandă retail" : "Dispatch slot confirmed for retail order"}</p>
                      <p>{isRo ? "Documentație pregătită pentru emitere" : "Documentation package ready for issue"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="container-content">
          <div className="grid gap-6 xl:grid-cols-2">
            <article className="segment-card segment-card--b2c reveal-on-scroll">
              <div className="segment-card__header">
                <span className="segment-badge">{text.b2cEyebrow}</span>
                <div className="segment-icon">
                  <HomeIcon path={featureIcons.retail} />
                </div>
              </div>
              <h2 className="segment-card__title">{text.b2cTitle}</h2>
              <p className="segment-card__body">{text.b2cText}</p>
              <div className="segment-mini-grid">
                <div className="segment-metric">
                  <span className="segment-metric__value">24-48h</span>
                  <span className="segment-metric__label">
                    {isRo ? "livrare orientativă" : "delivery window"}
                  </span>
                </div>
                <div className="segment-metric">
                  <span className="segment-metric__value">1-click</span>
                  <span className="segment-metric__label">
                    {isRo ? "către catalog" : "into catalog"}
                  </span>
                </div>
              </div>
              <div className="b2c-conversion-stack">
                <div className="b2c-conversion-stack__tile">
                  <span className="b2c-conversion-stack__kicker">
                    {isRo ? "Acțiune rapidă" : "Fast action"}
                  </span>
                  <p className="b2c-conversion-stack__text">
                    {isRo ? "Intrare clară în catalog și acces direct la produse fără pași inutili." : "A clear entry into the catalog with direct access to products and no unnecessary steps."}
                  </p>
                </div>
                <div className="b2c-conversion-stack__tile">
                  <span className="b2c-conversion-stack__kicker">
                    {isRo ? "Mai puțină fricțiune" : "Less friction"}
                  </span>
                  <p className="b2c-conversion-stack__text">
                    {isRo ? "Mesaj simplu, drum scurt până la checkout și comandă ușor de finalizat." : "Simple messaging, a shorter path to checkout, and an easier ordering flow."}
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/${locale}/catalog`} className="btn btn-primary btn-lg premium-button">
                  {text.b2cPrimary}
                </Link>
                <Link href={`/${locale}/checkout`} className="btn btn-secondary btn-lg premium-button-secondary">
                  {text.b2cSecondary}
                </Link>
              </div>
            </article>

            <article className="segment-card segment-card--b2b reveal-on-scroll">
              <div className="segment-card__header">
                <span className="segment-badge">{text.b2bEyebrow}</span>
                <div className="segment-icon">
                  <HomeIcon path={featureIcons.enterprise} />
                </div>
              </div>
              <h2 className="segment-card__title">{text.b2bTitle}</h2>
              <p className="segment-card__body">{text.b2bText}</p>
              <div className="enterprise-checklist">
                <div className="enterprise-checklist__item">
                  <span className="enterprise-checklist__dot" />
                  <span>{isRo ? "Condiții comerciale și volume negociabile" : "Negotiable commercial terms and volumes"}</span>
                </div>
                <div className="enterprise-checklist__item">
                  <span className="enterprise-checklist__dot" />
                  <span>{isRo ? "Sourcing, logistică și documentație coordonată" : "Coordinated sourcing, logistics, and documentation"}</span>
                </div>
                <div className="enterprise-checklist__item">
                  <span className="enterprise-checklist__dot" />
                  <span>{isRo ? "Flux orientat spre parteneriat, nu spre formulare reci" : "Partnership-oriented flow, not a cold lead form"}</span>
                </div>
              </div>
              <div className="enterprise-metric-rail">
                {enterpriseMetrics.map((metric) => (
                  <div key={metric.labelEn} className="enterprise-metric-rail__item">
                    <span className="enterprise-metric-rail__value">{metric.value}</span>
                    <span className="enterprise-metric-rail__label">
                      {isRo ? metric.labelRo : metric.labelEn}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/${locale}/b2b`} className="btn btn-primary btn-lg premium-button">
                  {text.b2bPrimary}
                </Link>
                <Link href={`/${locale}/contacts`} className="btn btn-secondary btn-lg premium-button-secondary">
                  {text.b2bSecondary}
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="premium-section premium-section--alt">
        <div className="container-content">
          <div className="premium-section__header reveal-on-scroll">
            <span className="premium-kicker">{text.processEyebrow}</span>
            <h2 className="premium-title max-w-3xl">{text.processTitle}</h2>
          </div>

          <div className="process-grid mt-10">
            {processSteps.map((step, index) => (
              <article
                key={step.index}
                className="process-card reveal-on-scroll"
                style={{ animationDelay: `${index * 140}ms` }}
              >
                <span className="process-card__index">{step.index}</span>
                <h3 className="process-card__title">
                  {isRo ? step.titleRo : step.titleEn}
                </h3>
                <p className="process-card__body">
                  {isRo ? step.textRo : step.textEn}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-cta">
        <div className="container-content">
          <div className="cta-shell reveal-on-scroll">
            <div>
              <span className="premium-pill premium-pill--dark">{text.footerTrust}</span>
              <h2 className="premium-title mt-5 max-w-3xl">{text.closingTitle}</h2>
              <p className="premium-body mt-5 max-w-2xl">{text.closingText}</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/${locale}/b2b`} className="btn btn-primary btn-xl premium-button">
                {text.closingPrimary}
              </Link>
              <Link href={`/${locale}/catalog`} className="btn btn-secondary btn-xl premium-button-secondary">
                {text.closingSecondary}
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
    title:
      locale === "ro"
        ? "Cenvora | Furnizare, sourcing și servicii pentru retail și B2B"
        : "Cenvora | Supply, sourcing, and services for retail and B2B",
    description:
      locale === "ro"
        ? "Cenvora oferă furnizare, sourcing și coordonare comercială pentru cumpărători direcți și companii din România și UE."
        : "Cenvora provides supply, sourcing, and commercial coordination for direct buyers and companies across Romania and the EU.",
  };
}
