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
});
export type AppRouter = typeof appRouter; //The frontend imports only the Type
