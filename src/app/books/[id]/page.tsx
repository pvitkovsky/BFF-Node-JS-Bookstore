"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { trpc } from "@/lib/trpc";

const accentColor = "rgb(125, 0, 250)";

function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}

export default function BookDetailPage() {
  const params = useParams();
  const idParam = params?.id;
  const id =
    typeof idParam === "string" ? Number(idParam) : Number.NaN;
  const isValidId = Number.isInteger(id) && id > 0;

  const { data, isLoading, isError, error } = trpc.getBookById.useQuery(
    { id },
    { enabled: isValidId }
  );

  if (!isValidId) {
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1 className="mb-6 text-2xl font-semibold">Book</h1>
          <p className="text-black/80">Invalid book ID.</p>
          <Link
            href="/books"
            className="mt-6 inline-block font-medium hover:underline"
            style={{ color: accentColor }}
          >
            ← Back to Books
          </Link>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1 className="mb-6 text-2xl font-semibold">Book</h1>
          <p className="text-black/70">Loading…</p>
          <Link
            href="/books"
            className="mt-6 inline-block font-medium hover:underline"
            style={{ color: accentColor }}
          >
            ← Back to Books
          </Link>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1 className="mb-6 text-2xl font-semibold">Book</h1>
          <p className="text-red-600">
            Error: {error?.message ?? "Failed to load book"}
          </p>
          <Link
            href="/books"
            className="mt-6 inline-block font-medium hover:underline"
            style={{ color: accentColor }}
          >
            ← Back to Books
          </Link>
        </div>
      </main>
    );
  }

  if (data == null) {
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1 className="mb-6 text-2xl font-semibold">Book</h1>
          <p className="text-black/80">Book not found.</p>
          <Link
            href="/books"
            className="mt-6 inline-block font-medium hover:underline"
            style={{ color: accentColor }}
          >
            ← Back to Books
          </Link>
        </div>
      </main>
    );
  }

  const book = data;

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-semibold">{book.title}</h1>
        <dl className="grid gap-2 sm:grid-cols-[auto_1fr]">
          <dt className="font-medium">Title</dt>
          <dd>{book.title}</dd>
          <dt className="font-medium">Year</dt>
          <dd>{book.year}</dd>
          <dt className="font-medium">ISBN</dt>
          <dd>{book.isbn}</dd>
          <dt className="font-medium">Price</dt>
          <dd>{formatPrice(book.price)}</dd>
        </dl>
        <Link
          href="/books"
          className="mt-8 inline-block font-medium hover:underline"
          style={{ color: accentColor }}
        >
          ← Back to Books
        </Link>
      </div>
    </main>
  );
}
