import Link from "next/link";
import { t } from "@/lib/i18n";

export default function NotFound() {
  // Default to RO for global 404 (e.g. /unknown); locale-specific 404 can be handled in [locale]
  const locale = "ro";
  const text = t[locale].notFound;
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold">{text.title}</h1>
      <p className="mt-2 text-[var(--muted)] text-center">{text.description}</p>
      <Link href="/ro" className="btn btn-primary mt-6">
        {text.backHome}
      </Link>
    </div>
  );
}
