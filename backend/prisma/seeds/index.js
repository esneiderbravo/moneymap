import { PrismaClient } from "@prisma/client";
import { seedCategories } from "./categories.seed.js";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");
  await seedCategories(prisma);
  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
