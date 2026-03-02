# Project: Strict-BookStore
**Goal:** A functional-first, type-safe Bookstore CRUD to master the "Total Safety" stack.

## Architecture
- **Paradigm:** Functional Programming (Immutability, No Side Effects, Pipe-based logic).
- **Communication:** Frontend ↔ tRPC ↔ Backend.
- **Validation:** Zod schemas as the single source of truth for DB and Forms.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TS (Strict Mode + Unchecked Indexing)
- **Data:** TanStack Query + tRPC + SQLite + Drizzle
- **Auth:** Auth.js (Database Session Strategy)
- **Quality:** ESLint (Functional, Immutable, No-Default-Exports)

## Scope (MVP)
1. **Auth:** Simple login/signup (Session stored in SQLite).
2. **Catalog:** List books (with `noUncheckedIndexedAccess` handling).
3. **Management:** Create/Edit book via Zod-validated tRPC mutations.
4. **Style:** Functional components only; no `let` or `var`.