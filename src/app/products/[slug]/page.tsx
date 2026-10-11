import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/product-card";
import {
  getProductBySlug,
  getProductSlugs,
  getRelatedProducts,
} from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { getStockLabel, getStockState, type StockState } from "@/lib/stock";

const stockDot: Record<StockState, string> = {
  "in-stock": "bg-success",
  "low-stock": "bg-danger",
  "sold-out": "border border-muted",
};

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} | Atelier`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const stockState = getStockState(product.stock);
  const soldOut = stockState === "sold-out";
  const related = await getRelatedProducts(product.id, product.categoryId);

  return (
    <main className="flex-1">
      <div className="lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        {/* Gallery: swipeable below lg, stacked mosaic from lg up */}
        <ul className="flex snap-x snap-mandatory gap-tile overflow-x-auto [scrollbar-width:none] lg:grid lg:grid-cols-2 lg:overflow-visible lg:p-tile">
          {product.images.map((image, index) => {
            const wide = index === 0 || product.images.length < 3;
            return (
              <li
                key={image.src}
                className={`w-[86%] shrink-0 snap-start only:w-full lg:w-auto ${wide ? "lg:col-span-2" : ""}`}
              >
                <div className="media aspect-product">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    preload={index === 0}
                    sizes={
                      wide
                        ? "(min-width: 64rem) 60vw, 86vw"
                        : "(min-width: 64rem) 30vw, 86vw"
                    }
                    className="object-cover"
                  />
                </div>
              </li>
            );
          })}
        </ul>

        {/* Information */}
        <div className="px-gutter py-section-sm lg:sticky lg:top-header lg:self-start">
          <div className="mx-auto w-full max-w-md">
            <nav aria-label="Breadcrumb" className="type-caption">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link href="/" className="link-quiet">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>{product.category}</li>
              </ol>
            </nav>

            <h1 className="type-headline mt-6">{product.name}</h1>
            <p className="type-title mt-3">{formatPrice(product.priceCents)}</p>

            <p className="type-label mt-6 flex items-center gap-2">
              <span
                aria-hidden="true"
                className={`size-2 rounded-full ${stockDot[stockState]}`}
              />
              {getStockLabel(product.stock)}
            </p>

            <p className="type-body-lg mt-6 text-muted">
              {product.description}
            </p>

            <dl className="rule mt-8 grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 pt-6">
              <dt className="text-muted">Colour</dt>
              <dd>{product.color}</dd>
              <dt className="text-muted">Material</dt>
              <dd>{product.material}</dd>
              <dt className="text-muted">Reference</dt>
              <dd>{product.reference}</dd>
            </dl>

            <button
              type="button"
              disabled={soldOut}
              className="btn btn-block mt-8"
            >
              {soldOut ? "Sold out" : "Add to bag"}
            </button>
            {soldOut ? (
              <p className="type-caption mt-3 text-center">
                This piece is currently unavailable.
              </p>
            ) : (
              <p className="type-caption mt-3 text-center">
                Complimentary delivery and returns within 30 days.
              </p>
            )}

            <div className="rule-b mt-10">
              <details className="rule group py-4">
                <summary className="type-label flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
                  Details and care
                  <span aria-hidden="true" className="group-open:hidden">
                    +
                  </span>
                  <span aria-hidden="true" className="hidden group-open:inline">
                    &minus;
                  </span>
                </summary>
                <ul className="mt-4 flex flex-col gap-2 text-muted">
                  {product.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </details>
              <details className="rule group py-4">
                <summary className="type-label flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
                  Delivery and returns
                  <span aria-hidden="true" className="group-open:hidden">
                    +
                  </span>
                  <span aria-hidden="true" className="hidden group-open:inline">
                    &minus;
                  </span>
                </summary>
                <p className="mt-4 text-muted">
                  Express delivery in two to four working days, in signature
                  packaging. Returns are free within 30 days of receipt.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      <section className="section" aria-labelledby="related-heading">
        <div className="shell">
          <h2 id="related-heading" className="type-headline">
            You may also like
          </h2>
        </div>
        <ul className="grid-products mt-10 px-tile">
          {related.map((item, index) => (
            // The grid is three across between md and lg, so drop the fourth tile there.
            <li key={item.id} className={index === 3 ? "md:max-lg:hidden" : ""}>
              <ProductCard
                product={item}
                sizes="(min-width: 64rem) 25vw, (min-width: 48rem) 33vw, 50vw"
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
