import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { getServerSession } from "next-auth";
import { appRouter } from "@/server/routers";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";

const createContext = async (opts: { readonly req: Request }) => {
  const session = await getServerSession(authOptions);
  return { db, session };
};

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext({ req }), // Why invoked?
  });
export { handler as GET, handler as POST };