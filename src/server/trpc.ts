import type { Session } from "next-auth";
import { initTRPC } from "@trpc/server";
import { db } from "@/db";

export type Context = {
  db: typeof db;
  session: Session | null;
};
const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;
