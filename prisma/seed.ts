import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products: Array<{ sku: string; name: string; descriptionShort: string; category: string; priceFrom: number; unit: string }> = [
  { sku: "FMCG-001", name: "Ulei alimentar rafinat", descriptionShort: "Ulei vegetal pentru consum, bidon 5L", category: "FMCG", priceFrom: 45, unit: "buc" },
  { sku: "FMCG-002", name: "Zahăr granulat", descriptionShort: "Zahăr alb, sac 25 kg", category: "FMCG", priceFrom: 1.2, unit: "kg" },
  { sku: "FMCG-003", name: "Paste făinoase", descriptionShort: "Paste sec, cutie 12 pachete", category: "FMCG", priceFrom: 28, unit: "cutie" },
  { sku: "FMCG-004", name: "Conserve vegetale", descriptionShort: "Mix conserve, palet 96 buc", category: "FMCG", priceFrom: 120, unit: "palet" },
  { sku: "IND-001", name: "Echipament de protecție", descriptionShort: "Măști, mănuși, loturi corporate", category: "IndustrialSupplies", priceFrom: 350, unit: "lot" },
  { sku: "IND-002", name: "Unelte industriale", descriptionShort: "Set unelte profesionale", category: "IndustrialSupplies", priceFrom: 180, unit: "set" },
  { sku: "IND-003", name: "Materiale de construcții", descriptionShort: "Cherestea, placi, accesorii", category: "IndustrialSupplies", priceFrom: 0.8, unit: "kg" },
  { sku: "PKG-001", name: "Cutii carton ondulat", descriptionShort: "Cutii diverse dimensiuni, lot 100", category: "Packaging", priceFrom: 85, unit: "lot" },
  { sku: "PKG-002", name: "Folie stretch", descriptionShort: "Rol 500m, pentru paletizare", category: "Packaging", priceFrom: 22, unit: "rol" },
  { sku: "PKG-003", name: "Bande adezive", descriptionShort: "Bande ambalaj 66m", category: "Packaging", priceFrom: 3.5, unit: "buc" },
  { sku: "OTH-001", name: "Produse de curățenie", descriptionShort: "Detergenți profesionali, bidon 10L", category: "Other", priceFrom: 55, unit: "buc" },
  { sku: "OTH-002", name: "Hârtie A4", descriptionShort: "Resma 500 foi, 80g/m²", category: "Other", priceFrom: 18, unit: "resma" },
];

async function main() {
  for (const p of products) {
    await prisma.product.upsert({
      where: { sku: p.sku },
      update: {},
      create: p,
    });
  }
  console.log("Seed: 12 products created/updated.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
