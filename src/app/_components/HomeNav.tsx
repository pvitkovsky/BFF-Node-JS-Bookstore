"use client";

import Link from "next/link";
import {useSession} from "next-auth/react";

export function HomeNav() {
    const {data: session, status} = useSession();
    const isAuthenticated = status === "authenticated" && session != null;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <p className="text-center text-2xl">
                JavaScript Is For Quitters Bookstore: Functional & Type-Safe
            </p>
            <nav className="mt-4 flex items-center gap-2 text-center">
                <Link
                    href="/books"
                    className="font-medium hover:underline hover:text-[rgb(125,0,250)]"
                    style={{color: "black"}}
                >
                    Gallery
                </Link>
                <span aria-hidden="true">|</span>
                {isAuthenticated ? (
                    <Link
                        href="/api/auth/signout?callbackUrl=/books"
                        className="font-medium hover:underline"
                        style={{color: "black"}}
                    >
                        Sign out
                    </Link>
                ) : (
                    <Link
                        href="/api/auth/signin?callbackUrl=/books"
                        className="font-medium hover:underline"
                        style={{color: "black"}}
                    >
                        Sign-in
                    </Link>
                )}
            </nav>
        </main>
    );
}