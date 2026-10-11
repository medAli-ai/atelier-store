import Link from "next/link";

import { navigation } from "@/lib/sample-data";

export function SiteHeader() {
  return (
    <>
      <p className="theme-inverse type-caption px-gutter py-2 text-center">
        Complimentary delivery and returns on every order
      </p>
      <header className="rule-b sticky top-0 z-40 bg-paper">
        <div className="shell grid h-header grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="type-label flex items-center">
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex gap-6">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      prefetch={false}
                      className="link-quiet"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              href="/search"
              prefetch={false}
              className="link-quiet lg:hidden"
            >
              Search
            </Link>
          </div>

          <Link
            href="/"
            className="font-display text-[1.75rem] leading-none tracking-[0.22em] uppercase"
          >
            Atelier
          </Link>

          <ul className="type-label flex items-center justify-end gap-6">
            <li className="hidden lg:block">
              <Link href="/search" prefetch={false} className="link-quiet">
                Search
              </Link>
            </li>
            <li className="hidden sm:block">
              <Link href="/account" prefetch={false} className="link-quiet">
                Account
              </Link>
            </li>
            <li>
              <Link href="/bag" prefetch={false} className="link-quiet">
                Bag (0)
              </Link>
            </li>
          </ul>
        </div>

        <nav
          aria-label="Primary"
          className="rule overflow-x-auto [scrollbar-width:none] lg:hidden"
        >
          <ul className="type-label flex h-11 w-max items-center gap-6 px-gutter">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link href={item.href} prefetch={false} className="link-quiet">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
