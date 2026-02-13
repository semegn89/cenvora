import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/config/site";
import { Analytics } from "@/components/Analytics";

export const metadata: Metadata = {
  title: { default: site.name, template: `%s | ${site.name}` },
  description: "CENVORA INTERNATIONAL S.R.L. — Comerț cu ridicata nespecializat. B2B partner.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: { title: site.name, description: "B2B wholesale partner. CENVORA INTERNATIONAL S.R.L." },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro">
      <body className="antialiased min-h-screen flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
