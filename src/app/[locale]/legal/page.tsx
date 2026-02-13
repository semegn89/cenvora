import Link from "next/link";
import { company } from "@/config/company";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const text = t[locale].legal;
  const isRo = locale === "ro";

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold">{text.title}</h1>
      <nav className="mt-6 flex flex-wrap gap-4 border-b border-[var(--border)] pb-4">
        <a href="#privacy" className="text-sm font-medium hover:text-[var(--primary)]">{text.privacy}</a>
        <a href="#cookies" className="text-sm font-medium hover:text-[var(--primary)]">{text.cookies}</a>
        <a href="#terms" className="text-sm font-medium hover:text-[var(--primary)]">{text.terms}</a>
      </nav>

      <section id="privacy" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">{text.privacy}</h2>
        <div className="mt-4 prose prose-sm text-[var(--muted)] max-w-none">
          {isRo ? (
            <>
              <p><strong>{company.name}</strong> („Compania”), cu sediul în {company.address.line}, CUI {company.cui}, înregistrată la ORCT Iași sub nr. {company.regNumber}, procesează date cu caracter personal în conformitate cu Regulamentul (UE) 2016/679 (GDPR) și legislația națională.</p>
              <p className="mt-2">Datele colectate prin formularul de contact și formularul de comandă (nume, email, telefon, adresă, CUI/VAT) sunt utilizate exclusiv pentru: procesarea comenzilor, răspuns la solicitări și îndeplinirea obligațiilor legale. Nu vindem date către terți.</p>
              <p className="mt-2">Puteți solicita accesul, rectificarea sau ștergerea datelor contactând-ne la {company.contacts.email}. Politica poate fi actualizată; versiunea curentă este disponibilă pe acest site.</p>
            </>
          ) : (
            <>
              <p><strong>{company.name}</strong> (the „Company”), with registered office at {company.address.line}, CUI {company.cui}, registered with ORCT Iași under no. {company.regNumber}, processes personal data in accordance with Regulation (EU) 2016/679 (GDPR) and national law.</p>
              <p className="mt-2">Data collected via the contact form and order form (name, email, phone, address, CUI/VAT) is used only for: processing orders, responding to enquiries, and fulfilling legal obligations. We do not sell data to third parties.</p>
              <p className="mt-2">You may request access, rectification, or erasure of your data by contacting us at {company.contacts.email}. This policy may be updated; the current version is available on this site.</p>
            </>
          )}
        </div>
      </section>

      <section id="cookies" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold">{text.cookies}</h2>
        <div className="mt-4 prose prose-sm text-[var(--muted)] max-w-none">
          {isRo ? (
            <>
              <p>Site-ul folosește cookie-uri pentru funcționarea tehnică (ex.: preferința de consimțământ) și, opțional, pentru analiză (ex.: Google Analytics). Cookie-urile esențiale sunt necesare pentru a oferi serviciile solicitate. Cookie-urile de analiză sunt activate doar cu acordul dvs., gestionat prin bannerul de pe site.</p>
              <p className="mt-2">Puteți schimba setările sau șterge cookie-urile din setările browserului. Blocarea cookie-urilor esențiale poate afecta funcționarea site-ului.</p>
            </>
          ) : (
            <>
              <p>This site uses cookies for technical operation (e.g. consent preference) and, optionally, for analytics (e.g. Google Analytics). Essential cookies are required to provide the services you request. Analytics cookies are only enabled with your consent, managed via the site banner.</p>
              <p className="mt-2">You can change settings or delete cookies in your browser. Blocking essential cookies may affect site functionality.</p>
            </>
          )}
        </div>
      </section>

      <section id="terms" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold">{text.terms}</h2>
        <div className="mt-4 prose prose-sm text-[var(--muted)] max-w-none">
          {isRo ? (
            <>
              <p>Utilizarea site-ului implică acceptarea prezentelor condiții. Serviciile sunt oferite în regim B2B. Comenzile sunt supuse confirmării și condițiilor comerciale convenite. {company.name} își rezervă dreptul de a modifica conținutul site-ului și al acestor termeni. Disputele vor fi soluționate de instanțele competente din România.</p>
            </>
          ) : (
            <>
              <p>Use of this site implies acceptance of these terms. Services are offered on a B2B basis. Orders are subject to confirmation and agreed commercial terms. {company.name} reserves the right to modify the site content and these terms. Disputes shall be resolved by the competent courts in Romania.</p>
            </>
          )}
        </div>
      </section>

      <p className="mt-10 text-sm text-[var(--muted)]">
        <Link href={`/${locale}`} className="hover:text-[var(--primary)]">{t[locale].common.back}</Link>
      </p>
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
    title: t[locale].legal.title,
    description:
      locale === "ro"
        ? "Politica de confidențialitate, cookie-uri și condiții de utilizare CENVORA."
        : "CENVORA Privacy Policy, Cookies and Terms of Service.",
  };
}
