import Image from "next/image";
import Link from "next/link";

import type { ProductSummary } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { getStockState } from "@/lib/stock";

type ProductCardProps = {
  product: ProductSummary;
  /** Matches the rendered tile width so the browser picks the right image size. */
  sizes: string;
  aspect?: "product" | "square";
};

export function ProductCard({
  product,
  sizes,
  aspect = "product",
}: ProductCardProps) {
  const soldOut = getStockState(product.stock) === "sold-out";
  const tag = soldOut ? "Sold out" : product.isNew ? "New" : null;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div
        className={`media ${aspect === "square" ? "aspect-square" : "aspect-product"}`}
      >
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
        />
        {tag ? (
          <span className="type-label absolute top-3 left-3 bg-paper px-2 py-1 text-ink">
            {tag}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-1 px-3 pt-3">
        <p className="type-caption">{product.category}</p>
        <h3 className="type-body link-quiet">{product.name}</h3>
        <p className="type-body text-muted">{formatPrice(product.priceCents)}</p>
      </div>
    </Link>
  );
}
