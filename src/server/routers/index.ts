import { eq } from "drizzle-orm";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { books } from "@/db/schema";
import { bookSchema } from "@/lib/schema/book";

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
});
export type AppRouter = typeof appRouter; //The frontend imports only the Type
