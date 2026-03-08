import { eq } from "drizzle-orm";
import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { books } from "@/db/schema";
import { bookSchema, bookCreateSchema } from "@/lib/schema/book";

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => ({ greeting: `Hello ${input.text}` })),

  getBooks: publicProcedure
    .output(bookSchema.array())
    .query(async ({ ctx }) => ctx.db.select().from(books)),

  getBookById: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .output(bookSchema.nullable())
    .query(async ({ ctx, input }) => {
      const rows = await ctx.db
        .select()
        .from(books)
        .where(eq(books.id, input.id))
        .limit(1);
      return rows[0] ?? null;
    }),

  createBook: protectedProcedure
    .input(bookCreateSchema)
    .output(bookSchema)
    .mutation(async ({ ctx, input }) => {
      const rows = await ctx.db
        .insert(books)
        .values({
          title: input.title,
          year: input.year,
          isbn: input.isbn,
          price: input.price,
        })
        .returning();
      const created = rows[0];
      if (created == null) {
        throw new Error("Insert did not return a row");
      }
      return created;
    }),

  deleteBook: protectedProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(books).where(eq(books.id, input.id));
    }),
});
export type AppRouter = typeof appRouter; //The frontend imports only the Type