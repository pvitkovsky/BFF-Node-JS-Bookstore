"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/lib/trpc";
import { addBookFormSchema } from "@/lib/schema/book";
import type { z } from "zod";

const accentColor = "rgb(125, 0, 250)";

type AddBookFormValues = z.infer<typeof addBookFormSchema>;

const currentYear = (): number => new Date().getFullYear();

export function AddBookForm() {
  const utils = trpc.useUtils();
  const createBook = trpc.createBook.useMutation({
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
      onError: (message) => {
          alert("Problems adding a Book")
      } // TODO: proper validation;
    });
  };

  return (
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
            Price (prime 100–200)
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
  );
}