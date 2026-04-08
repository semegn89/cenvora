import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products: Array<{ sku: string; name: string; descriptionShort: string; category: string; priceFrom: number; unit: string }> = [
  // ── Spare Parts ───────────────────────────────────────────────────────────
  { sku: "SP-001", name: "Rulmenți industriali", descriptionShort: "Rulmenți cu bile și role, diverse dimensiuni, oțel aliat", category: "SpareParts", priceFrom: 12, unit: "buc" },
  { sku: "SP-002", name: "Garnituri și etanșări", descriptionShort: "Seturi garnituri cauciuc/silicon pentru utilaje industriale", category: "SpareParts", priceFrom: 8, unit: "set" },
  { sku: "SP-003", name: "Filtre hidraulice", descriptionShort: "Filtre pentru sisteme hidraulice, presiune max 250 bar", category: "SpareParts", priceFrom: 45, unit: "buc" },
  { sku: "SP-004", name: "Curele de transmisie", descriptionShort: "Curele trapezoidale și plate pentru utilaje, diverse profile", category: "SpareParts", priceFrom: 18, unit: "buc" },
  // ── Equipment ─────────────────────────────────────────────────────────────
  { sku: "EQ-001", name: "Pompe centrifugale", descriptionShort: "Pompe pentru lichide industriale, debit 5–50 m³/h", category: "Equipment", priceFrom: 850, unit: "buc" },
  { sku: "EQ-002", name: "Compresoare de aer", descriptionShort: "Compresoare cu șurub 5.5–22 kW, cu recipient integrat", category: "Equipment", priceFrom: 1200, unit: "buc" },
  { sku: "EQ-003", name: "Motoare electrice", descriptionShort: "Motoare trifazate IE2/IE3, 0.75–30 kW, IP55", category: "Equipment", priceFrom: 320, unit: "buc" },
  { sku: "EQ-004", name: "Generatoare diesel", descriptionShort: "Grupuri electrogene 10–100 kVA, pornire automată", category: "Equipment", priceFrom: 3500, unit: "buc" },
  // ── Production Materials ──────────────────────────────────────────────────
  { sku: "PM-001", name: "Tablă oțel laminat", descriptionShort: "Tablă laminată la rece/cald, grosimi 1–10 mm, foi 1500×3000", category: "ProductionMaterials", priceFrom: 2.8, unit: "kg" },
  { sku: "PM-002", name: "Profile aluminiu", descriptionShort: "Profile industriale aluminiu, bare 6 m, diverse secțiuni", category: "ProductionMaterials", priceFrom: 6.5, unit: "kg" },
  { sku: "PM-003", name: "Materiale abrazive", descriptionShort: "Discuri, benzi și pânze abrazive pentru prelucrare metale", category: "ProductionMaterials", priceFrom: 3.2, unit: "buc" },
  { sku: "PM-004", name: "Lubrifianți industriali", descriptionShort: "Uleiuri hidraulice, de transmisie și de ungere, ISO VG 32–220", category: "ProductionMaterials", priceFrom: 4.5, unit: "L" },
];

async function main() {
  // Dezactivează produsele vechi (food/FMCG etc.)
  await prisma.product.updateMany({ data: { isActive: false } });

  for (const p of products) {
    await prisma.product.upsert({
      where: { sku: p.sku },
      update: { ...p, isActive: true },
      create: { ...p, isActive: true },
    });
  }
  console.log("Seed: 12 industrial products created/updated.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
