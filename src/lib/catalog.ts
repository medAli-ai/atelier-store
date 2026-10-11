import { and, desc, eq, inArray, ne, notInArray, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

import { db } from "@/db";
import { categories, products, stock, type ProductImage } from "@/db/schema";

export type ProductSummary = {
  id: number;
  slug: string;
  name: string;
  category: string;
  /** Price in US cents. */
  priceCents: number;
  image: ProductImage;
  isNew: boolean;
  /** Units available. 0 means sold out. */
  stock: number;
};

export type ProductDetail = ProductSummary & {
  categoryId: number;
  description: string;
  color: string;
  material: string;
  reference: string;
  details: string[];
  /** Primary image first. */
  images: ProductImage[];
};

const LEATHER_AND_ACCESSORIES = ["bags", "shoes", "eyewear"];

const summaryColumns = {
  id: products.id,
  slug: products.slug,
  name: products.name,
  category: categories.name,
  priceCents: products.priceCents,
  images: products.images,
  isNew: products.isNew,
  stock: sql<number>`coalesce(${stock.quantity}, 0)`.mapWith(Number),
};

function selectSummaries() {
  return db
    .select(summaryColumns)
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(stock, eq(stock.productId, products.id));
}

function toSummary<T extends { images: ProductImage[] }>({
  images,
  ...row
}: T) {
  return { ...row, image: images[0] };
}

export async function getNewArrivals(limit = 8): Promise<ProductSummary[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("catalog");

  const rows = await selectSummaries()
    .orderBy(desc(products.createdAt), products.id)
    .limit(limit);
  return rows.map(toSummary);
}

export async function getLeatherAndAccessories(
  excludeIds: number[] = [],
  limit = 6,
): Promise<ProductSummary[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("catalog");

  const rows = await selectSummaries()
    .where(
      and(
        inArray(categories.slug, LEATHER_AND_ACCESSORIES),
        excludeIds.length ? notInArray(products.id, excludeIds) : undefined,
      ),
    )
    .orderBy(desc(products.createdAt), products.id)
    .limit(limit);
  return rows.map(toSummary);
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetail | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("catalog");

  const [row] = await db
    .select({
      ...summaryColumns,
      categoryId: products.categoryId,
      description: products.description,
      color: products.color,
      material: products.material,
      reference: products.reference,
      details: products.details,
    })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(stock, eq(stock.productId, products.id))
    .where(eq(products.slug, slug))
    .limit(1);
  if (!row) return null;

  return { ...row, image: row.images[0] };
}

/** Other products, same category first. */
export async function getRelatedProducts(
  productId: number,
  categoryId: number,
  count = 4,
): Promise<ProductSummary[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("catalog");

  const rows = await selectSummaries()
    .where(ne(products.id, productId))
    .orderBy(
      desc(sql`${products.categoryId} = ${categoryId}`),
      desc(products.createdAt),
      products.id,
    )
    .limit(count);
  return rows.map(toSummary);
}

export async function getProductSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("catalog");

  const rows = await db.select({ slug: products.slug }).from(products);
  return rows.map((row) => row.slug);
}
