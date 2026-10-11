// Loads the starting catalogue. Safe to rerun: rows are matched on slug and
// overwritten, so it also resets prices and stock to the values in seed-data.ts.
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

import { categories, products, stock } from "./schema";
import { seedCategories, seedProducts } from "./seed-data";

config({ path: [".env.local", ".env"] });

const DAY = 24 * 60 * 60 * 1000;
const NEWEST = Date.UTC(2026, 9, 1);

async function main() {
  const db = drizzle({ client: neon(process.env.DATABASE_URL!) });

  const categoryRows = await db
    .insert(categories)
    .values([...seedCategories])
    .onConflictDoUpdate({
      target: categories.slug,
      set: { name: sql`excluded.name` },
    })
    .returning({ id: categories.id, slug: categories.slug });
  const categoryIds = new Map(categoryRows.map((row) => [row.slug, row.id]));

  const productRows = await db
    .insert(products)
    .values(
      seedProducts.map((product, index) => ({
        slug: product.slug,
        name: product.name,
        description: product.description,
        categoryId: categoryIds.get(product.category)!,
        priceCents: product.priceCents,
        color: product.color,
        material: product.material,
        reference: product.reference,
        details: product.details,
        images: product.images,
        isNew: product.isNew ?? false,
        createdAt: new Date(NEWEST - index * DAY),
      })),
    )
    .onConflictDoUpdate({
      target: products.slug,
      set: {
        name: sql`excluded.name`,
        description: sql`excluded.description`,
        categoryId: sql`excluded.category_id`,
        priceCents: sql`excluded.price_cents`,
        color: sql`excluded.color`,
        material: sql`excluded.material`,
        reference: sql`excluded.reference`,
        details: sql`excluded.details`,
        images: sql`excluded.images`,
        isNew: sql`excluded.is_new`,
        createdAt: sql`excluded.created_at`,
        updatedAt: sql`now()`,
      },
    })
    .returning({ id: products.id, slug: products.slug });
  const productIds = new Map(productRows.map((row) => [row.slug, row.id]));

  await db
    .insert(stock)
    .values(
      seedProducts.map((product) => ({
        productId: productIds.get(product.slug)!,
        quantity: product.stock,
      })),
    )
    .onConflictDoUpdate({
      target: stock.productId,
      set: { quantity: sql`excluded.quantity`, updatedAt: sql`now()` },
    });

  console.log(
    `Seeded ${categoryRows.length} categories and ${productRows.length} products with stock.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
