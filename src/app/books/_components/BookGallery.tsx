"use client";

import Link from "next/link";
import type { Book } from "@/lib/schema/book";

const accentColor = "rgb(125, 0, 250)";

export type BookGalleryProps = {
  readonly books: readonly Book[];
  readonly isAuthenticated: boolean;
  readonly onDelete: (id: number) => void;
  readonly deletePendingId: number | null;
};

export function BookGallery({
  books,
  isAuthenticated,
  onDelete,
  deletePendingId,
}: BookGalleryProps) {
  if (books.length === 0) {
    return <p className="text-black/70">No books in the catalog.</p>;
  }
  return (
    <ul
      className="grid gap-4 sm:grid-cols-2"
      style={{ listStyle: "none", padding: 0, margin: 0 }}
    >
      {books.map((book) => {
        const isDeletingThis = deletePendingId === book.id;
        return (
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
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => onDelete(book.id)}
                disabled={deletePendingId != null}
                className="mt-2 rounded bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-black/80 disabled:opacity-70"
              >
                {isDeletingThis ? "Loading..." : "Delete"}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}