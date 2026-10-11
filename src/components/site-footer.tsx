import Link from "next/link";

import { footerColumns } from "@/lib/sample-data";

export function SiteFooter() {
  return (
    <footer className="theme-inverse">
      <div className="shell section-sm">
        <div className="grid grid-cols-2 gap-x-gutter gap-y-10 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="type-label">{column.title}</h2>
              <ul className="mt-4 flex flex-col gap-3 text-muted">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className="link-quiet"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="rule mt-16 flex flex-col gap-6 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-display text-[2.5rem] leading-none tracking-[0.22em] uppercase">
            Atelier
          </p>
          <p className="type-caption">
            Sample storefront. Photography from Unsplash.
          </p>
        </div>
      </div>
    </footer>
  );
}
