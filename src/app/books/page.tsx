"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { trpc } from "@/lib/trpc";
import { addBookFormSchema } from "@/lib/schema/book";
import type { z } from "zod";

const accentColor = "rgb(125, 0, 250)";

type AddBookFormValues = z.infer<typeof addBookFormSchema>;

const currentYear = (): number => new Date().getFullYear();

export default function BooksPage() {
  const utils = trpc.useUtils();
  const { data: session, status } = useSession();
  const { data, isLoading, isError, error } = trpc.getBooks.useQuery();
  const createBook = trpc.createBook.useMutation({
    onSuccess: () => {
      utils.getBooks.invalidate();
    },
  });
  const deleteBook = trpc.deleteBook.useMutation({
    onSuccess: () => {
      utils.getBooks.invalidate();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddBookFormValues>({
    resolver: zodResolver(addBookFormSchema),
    defaultValues: {
      title: "",
      year: currentYear(),
      isbn: "",
      price: 101,
    },
  });

  const onSubmit = (values: AddBookFormValues) => {
    createBook.mutate(values, {
      onSuccess: () => {
        reset();
      },
    });
  };

  const isAuthenticated = status === "authenticated" && session != null;
  const deletePendingId = deleteBook.isPending && deleteBook.variables?.id != null ? deleteBook.variables.id : null;

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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-8 rounded border-2 p-4"
          style={{ borderColor: accentColor }}
        >
          <h2 className="mb-4 text-lg font-medium">Add Book</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="title" className="mb-1 block text-sm font-medium">
                Title
              </label>
              <input
                id="title"
                {...register("title")}
                className="w-full rounded border border-black/20 px-3 py-2 text-black"
              />
              {errors.title?.message != null && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="year" className="mb-1 block text-sm font-medium">
                Year
              </label>
              <input
                id="year"
                type="number"
                {...register("year")}
                className="w-full rounded border border-black/20 px-3 py-2 text-black"
              />
              {errors.year?.message != null && (
                <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="isbn" className="mb-1 block text-sm font-medium">
                ISBN
              </label>
              <input
                id="isbn"
                {...register("isbn")}
                className="w-full rounded border border-black/20 px-3 py-2 text-black"
              />
              {errors.isbn?.message != null && (
                <p className="mt-1 text-sm text-red-600">{errors.isbn.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="price" className="mb-1 block text-sm font-medium">
                Price (cents, prime 100–200)
              </label>
              <input
                id="price"
                type="number"
                {...register("price")}
                className="w-full rounded border border-black/20 px-3 py-2 text-black"
              />
              {errors.price?.message != null && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={createBook.isPending}
            className="mt-4 rounded px-4 py-2 font-medium text-white disabled:opacity-70"
            style={{ backgroundColor: accentColor }}
          >
            {createBook.isPending ? "Loading..." : "Add"}
          </button>
        </form>

        <ul
          className="grid gap-4 sm:grid-cols-2"
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
          {bookList.map((book) => {
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
                    onClick={() => deleteBook.mutate({ id: book.id })}
                    disabled={deleteBook.isPending}
                    className="mt-2 rounded bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-black/80 disabled:opacity-70"
                  >
                    {isDeletingThis ? "Loading..." : "Delete"}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        {bookList.length === 0 && (
          <p className="text-black/70">No books in the catalog.</p>
        )}
      </div>
    </main>
  );
}
