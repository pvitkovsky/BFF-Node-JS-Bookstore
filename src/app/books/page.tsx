"use client";

import { useSession } from "next-auth/react";
import { trpc } from "@/lib/trpc";
import { AddBookForm } from "./_components/AddBookForm";
import { BookGallery } from "./_components/BookGallery";

export default function BooksPage() {
  const utils = trpc.useUtils();
  const { data: session, status } = useSession();
  const { data, isLoading, isError, error } = trpc.getBooks.useQuery();
  const deleteBook = trpc.deleteBook.useMutation({
    onSuccess: () => {
      utils.getBooks.invalidate();
    },
  });

  const isAuthenticated = status === "authenticated" && session != null;
  const deletePendingId =
    deleteBook.isPending && deleteBook.variables?.id != null
      ? deleteBook.variables.id
      : null;
  const bookList = data ?? [];

  const handleDelete = (id: number) => {
    deleteBook.mutate({ id });
  };

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

  return (
    <main className="min-h-screen bg-white text-black">
      <header>
        <p className="text-center text-xl">
          JavaScript Is For Quitters Bookstore: Functional & Type-Safe
        </p>
      </header>
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-semibold">Books</h1>
        {isAuthenticated && <AddBookForm />}
        <BookGallery
          books={bookList}
          isAuthenticated={isAuthenticated}
          onDelete={handleDelete}
          deletePendingId={deletePendingId}
        />
      </div>
    </main>
  );
}
