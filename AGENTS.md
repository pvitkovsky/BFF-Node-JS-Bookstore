# Project: Strict-BookStore
**Goal:** A functional-first, type-safe Bookstore CRUD to master the "Total Safety" stack.

## Architecture
- **Paradigm:** Functional Programming (Immutability, No Side Effects, Pipe-based logic).
- **Communication:** Frontend ↔ tRPC ↔ Backend.
- **Validation:** Zod schemas as the single source of truth for DB and Forms.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TS (Strict Mode + Unchecked Indexing)
- **Data:** TanStack Query + tRPC + DB Layer
- **Auth:** Next-Auth v4, (JWT session strategy)
- **Quality:** ESLint (Functional, Immutable, No-Default-Exports)

## Presentation Layer
- **UI:** Next.js App Router pages; client components (`"use client"`) where tRPC/TanStack Query hooks are used. Tailwind for layout and theme.
- **Safety:** Handle loading/error from `useQuery`; optional chaining and null-checks for `noUncheckedIndexedAccess`. Pure functional components; default export only in `BookPage.tsx`.
- **Structure:** Smart page composes presentational/feature components; colocate in `src/app/<route>/_components/`. 

## Communications layer: 
- **API**: tRPC at /api/trpc; validate Zod at src/lib/schema. Some endpoints require a valid session. 
- **AUTH**: Next-Auth v4 at /api/auth/[...nextauth]; config at src/lib/auth.ts. JWT session in cookie; getServerSession(authOptions) in tRPC context supplies session. Required env: NEXTAUTH_URL, NEXTAUTH_SECRET. Middleware withAuth

## DB Layer: Drizzle ORM
- **Schema:** `src/db/schema.ts` 
- **Client:** `src/db/index.ts`
- **Config:** `drizzle.config.ts` 
- **Scripts:** `npx dotenv -e .env -- npm run db:push`, `npx dotenv -e .env -- npm run db:seed`

## Scope (MVP)
1. **Auth:** Simple login/signup (Credentials provider; session is JWT in cookie; user records in SQLite).
2. **Catalog:** List books (with `noUncheckedIndexedAccess` handling).
3. **Management:** Create/Edit book via Zod-validated tRPC mutations.
4. **Style:** Functional components only; no `let` or `var`.