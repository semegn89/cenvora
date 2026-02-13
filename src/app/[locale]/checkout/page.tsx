import { CheckoutClient } from "./CheckoutClient";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">{t[locale].checkout.title}</h1>
      <CheckoutClient locale={locale} />
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
    title: t[locale].checkout.title,
    description:
      locale === "ro"
        ? "Finalizare comandă CENVORA."
        : "CENVORA checkout.",
  };
}
