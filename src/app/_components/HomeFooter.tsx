"use client";

import { useSession } from "next-auth/react";

export function HomeFooter() {
  const { data: session, status } = useSession();
  const loggedIn =  status === "authenticated" && session?.user?.login != null
    if(loggedIn){
        return (
            <footer className="mt-auto border-t border-black/10 px-4 py-3 text-center text-sm text-black/70">
                Hello,<span className="font-medium text-black">{" " + session.user.login}</span>
            </footer>
        );
    }
    return null;
}