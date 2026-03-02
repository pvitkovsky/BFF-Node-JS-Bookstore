"use client";

import Link from "next/link";
import { trpc } from "@/lib/trpc";

const accentColor = "rgb(125, 0, 250)";

export default function BooksPage() {
  const { data, isLoading, isError, error } = trpc.getBooks.useQuery();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1 className="mb-6 text-2xl font-semibold">Books</h1>
          <p className="text-black/70">Loading books…</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1 className="mb-6 text-2xl font-semibold">Books</h1>
          <p className="text-red-600">
            Error: {error?.message ?? "Failed to load books"}
          </p>
        </div>
      </main>
    );
  }

  const bookList = data ?? [];

  return (
    <main className="min-h-screen bg-white text-black">
      <header>
        <p className="text-center text-xl">
         JavaScript Is For Quitters Bookstore: Functional & Type-Safe
        </p>
      </header>
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-semibold">Books</h1>
        <ul
          className="grid gap-4 sm:grid-cols-2"
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
          {bookList.map((book) => (
            <li
              key={book.id}
              className="rounded border-2 p-4 transition-colors hover:bg-black/5"
              style={{ borderColor: accentColor }}
            >
              <Link
                href={`/books/${book.id}`}
                className="text-lg font-medium hover:underline hover:text-[rgb(125,0,250)]"
                style={{ color: "black" }}
              >
                {book.title}
              </Link>
              {book.year != null && (
                <p className="mt-1 text-sm text-black/70">{book.year}</p>
              )}
            </li>
          ))}
        </ul>
        {bookList.length === 0 && (
          <p className="text-black/70">No books in the catalog.</p>
        )}
      </div>
    </main>
  );
}
