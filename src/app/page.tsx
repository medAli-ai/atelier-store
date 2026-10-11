import Image from "next/image";
import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { getLeatherAndAccessories, getNewArrivals } from "@/lib/catalog";
import {
  campaignImage,
  categories,
  craftImage,
  heroImage,
  services,
} from "@/lib/sample-data";

export default async function Home() {
  const newArrivals = await getNewArrivals();
  const leatherAndAccessories = await getLeatherAndAccessories(
    newArrivals.map((product) => product.id),
  );

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="theme-inverse relative isolate flex min-h-[min(calc(100svh-var(--spacing-header)-5rem),60rem)] items-end lg:min-h-[min(calc(100svh-var(--spacing-header)-2rem),60rem)]">
        <div className="scrim absolute inset-0 -z-10">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            preload
            sizes="100vw"
            className="object-cover object-[60%_30%]"
          />
        </div>
        <div className="shell pt-40 pb-section-sm">
          <p className="type-label">Autumn Winter 2026</p>
          <h1 className="type-display mt-4 max-w-[12ch]">
            The weight of winter
          </h1>
          <p className="type-body-lg mt-5 max-w-md">
            Double-faced wool, softened shoulders and a palette drawn from
            stone and smoke.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop/women" prefetch={false} className="btn">
              Shop women
            </Link>
            <Link
              href="/shop/men"
              prefetch={false}
              className="btn btn-outline"
            >
              Shop men
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section" aria-labelledby="categories-heading">
        <div className="shell">
          <h2 id="categories-heading" className="type-headline">
            Shop by category
          </h2>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-tile gap-y-8 px-tile lg:grid-cols-4">
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                href={category.href}
                prefetch={false}
                className="group block"
              >
                <div className="media aspect-editorial">
                  <Image
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    sizes="(min-width: 64rem) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
                  />
                </div>
                <p className="type-label link-quiet mt-3 px-3">
                  {category.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* New arrivals */}
      <section className="pb-section" aria-labelledby="arrivals-heading">
        <div className="shell flex items-end justify-between gap-6">
          <div>
            <p className="type-label text-muted">Just landed</p>
            <h2 id="arrivals-heading" className="type-headline mt-3">
              New arrivals
            </h2>
          </div>
          <Link
            href="/shop/new"
            prefetch={false}
            className="type-label link shrink-0"
          >
            View all
          </Link>
        </div>
        <ul className="grid-products mt-10 px-tile">
          {newArrivals.map((product) => (
            <li key={product.id}>
              <ProductCard
                product={product}
                sizes="(min-width: 64rem) 25vw, (min-width: 48rem) 33vw, 50vw"
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Campaign */}
      <section className="grid-editorial" aria-labelledby="campaign-heading">
        <div className="media aspect-product md:aspect-auto md:min-h-[44rem]">
          <Image
            src={campaignImage.src}
            alt={campaignImage.alt}
            fill
            sizes="(min-width: 48rem) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-surface px-gutter py-section">
          <div className="mx-auto w-full max-w-md">
            <p className="type-label text-muted">The tailoring edit</p>
            <h2 id="campaign-heading" className="type-headline mt-4">
              Cut close, worn loose
            </h2>
            <p className="type-body-lg mt-5 text-muted">
              Jackets built on a soft canvas and trousers with a fuller leg. A
              wardrobe of grey flannel made to be lived in, season after
              season.
            </p>
            <Link
              href="/stories/tailoring"
              prefetch={false}
              className="btn btn-outline mt-8"
            >
              Discover the edit
            </Link>
          </div>
        </div>
      </section>

      {/* Leather goods rail */}
      <section className="section" aria-labelledby="leather-heading">
        <div className="shell flex items-end justify-between gap-6">
          <div>
            <p className="type-label text-muted">Made by hand</p>
            <h2 id="leather-heading" className="type-headline mt-3">
              Leather and accessories
            </h2>
          </div>
          <Link
            href="/shop/accessories"
            prefetch={false}
            className="type-label link shrink-0"
          >
            View all
          </Link>
        </div>
        <ul className="rail mt-10">
          {leatherAndAccessories.map((product) => (
            <li key={product.id}>
              <ProductCard
                product={product}
                aspect="square"
                sizes="(min-width: 64rem) 24vw, (min-width: 48rem) 40vw, 72vw"
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Craft */}
      <section className="grid-editorial" aria-labelledby="craft-heading">
        <div className="order-2 flex flex-col justify-center px-gutter py-section md:order-1">
          <div className="mx-auto w-full max-w-md">
            <p className="type-label text-muted">Inside the atelier</p>
            <h2 id="craft-heading" className="type-headline mt-4">
              Forty hours, one coat
            </h2>
            <p className="type-body-lg mt-5 text-muted">
              Every piece is cut, basted and finished by a single maker. Follow
              a coat from the first chalk line to the last hand-sewn
              buttonhole.
            </p>
            <Link
              href="/craft"
              prefetch={false}
              className="btn btn-outline mt-8"
            >
              Read the story
            </Link>
          </div>
        </div>
        <div className="media order-1 aspect-product md:order-2 md:aspect-auto md:min-h-[44rem]">
          <Image
            src={craftImage.src}
            alt={craftImage.alt}
            fill
            sizes="(min-width: 48rem) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Services */}
      <section className="rule" aria-label="Client services">
        <ul className="shell grid gap-10 py-section-sm md:grid-cols-3">
          {services.map((service) => (
            <li key={service.title}>
              <h2 className="type-label">{service.title}</h2>
              <p className="mt-3 max-w-xs text-muted">{service.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
