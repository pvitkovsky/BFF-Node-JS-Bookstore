import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Strict Bookstore",
  description: "Functional & type-safe bookstore",
};

export default function RootLayout({
  children,
}: Readonly<{
  readonly children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
