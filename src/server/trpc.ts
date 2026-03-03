import type { Session } from "next-auth";
import { initTRPC, TRPCError } from "@trpc/server";
import { db } from "@/db";

export type Context = {
  readonly db: typeof db;
  readonly session: Session | null;
};
const t = initTRPC.context<Context>().create();
const requireSession = t.middleware(({ ctx, next }) => {
  if (ctx.session == null) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, session: ctx.session } });
});
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(requireSession);