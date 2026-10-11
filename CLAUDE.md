# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md


## Commands

```bash
npm run dev          # start the dev server (Turbopack) on http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint (flat config, eslint-config-next core-web-vitals + typescript)

npm run db:generate  # generate SQL migrations from src/db/schema.ts into ./drizzle
npm run db:migrate   # apply generated migrations
npm run db:push      # push the schema straight to the database, no migration files
npm run db:studio    # open Drizzle Studio
npm run db:seed      # load the starting catalogue from src/db/seed-data.ts (rerunnable; resets prices and stock)
```

There is no test runner configured and no standalone typecheck script; `npm run build` is what type-checks the project.

## Environment

Copy `.env.example` to `.env.local` and fill in `DATABASE_URL` (Neon pooled connection string), `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`. `drizzle.config.ts` and `src/db/seed.ts` load `.env.local` and then `.env` through `dotenv`, so the `db:*` scripts read the same files as the app.

## Architecture

Next.js 16 App Router with React 19, TypeScript strict mode, Tailwind CSS v4, Drizzle ORM on Neon Postgres, and Better Auth. All application code lives in `src/`, imported through the `@/*` alias.

### Data and auth chain

`src/db/schema.ts` is the single source of truth for tables. Three things read it:

- `src/db/index.ts` builds the Drizzle client (`db`) on the Neon HTTP driver.
- `src/lib/auth.ts` passes `db` and the schema to Better Auth's Drizzle adapter (`provider: "pg"`).
- `drizzle.config.ts` points drizzle-kit at it for migrations.

So Better Auth's tables must be defined in `schema.ts` alongside the application tables; generate them with `npx auth generate`.

Requests flow: `authClient` (`src/lib/auth-client.ts`, browser, same-origin) → `src/app/api/auth/[...all]/route.ts` (catch-all, `toNextJsHandler(auth)`) → `auth` (`src/lib/auth.ts`) → `db` → Neon.

Use `auth` from `@/lib/auth` on the server and `authClient` from `@/lib/auth-client` in client components. In `auth.ts`, `nextCookies()` must stay last in the `plugins` array.

The Neon HTTP driver (`drizzle-orm/neon-http`) runs each query as a stateless HTTP request and does not support interactive transactions; switching to the WebSocket driver is required if those are needed.

### Next.js configuration

`next.config.ts` enables `cacheComponents` and `partialPrefetching`, which change how data fetching and caching in routes must be written — read the relevant guides under `node_modules/next/dist/docs/` before adding routes.

Tailwind is wired in through a Turbopack loader rule for `*.css` (`@tailwindcss/turbopack`) in `next.config.ts`. There is no PostCSS config and no `tailwind.config`; the whole design system lives in `src/app/globals.css`.

### Design system

`globals.css` defines the tokens in `@theme` (colors `ink`/`paper`/`surface`/`muted`/`line`, the `text-*` type scale, fluid `gutter`/`section` spacing, `aspect-product`, `rounded-control`) and the primitives as `@utility` classes: `type-*` text roles, `shell*` containers, `section`, `grid-products`/`grid-editorial`/`grid-page`, `rail`, `media`, `btn` with `btn-outline`/`btn-ghost`/`btn-sm`/`btn-block`, `link`/`link-quiet`, `rule`. Build UI from these instead of raw palette classes or one-off sizes. There is a single light theme and no `dark:` mode; use `theme-inverse` on a wrapper for dark bands, which flips the color tokens for everything inside. Fonts are Geist (`font-sans`) and Cormorant (`font-display`), loaded in `src/app/layout.tsx`.

### Database conventions

- Schema changes go through `db:generate` then `db:migrate`, and the generated `./drizzle` files are committed. Don't use `db:push`.
- Money is stored as integer cents (`price_cents`), never floats or `numeric`. The store is single-currency (USD), so there is no currency column.
- Stock is one `stock` row per product. Sold-out and low-stock are derived from `quantity`, never stored.
- Product images and detail bullets are deliberately columns (`jsonb`, `text[]`), not tables. Variants, carts, orders and warehouses are out of scope for now.
- Read the catalogue only through `src/lib/catalog.ts`. Its functions are cached under the `catalog` tag, so any code that writes to these tables must invalidate that tag.
- `npm run build` needs a migrated, seeded database, because product pages are prerendered from it.
- `db:seed` overwrites prices and stock with the seed values; don't run it against live data.

### Current state

No sign-in method is enabled in `auth.ts` and the Better Auth tables are not in `schema.ts` yet. Only `/` and `/products/[slug]` exist; the `/shop/*`, `/bag`, `/account` and other links point at routes that have not been built.
