import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import "@repo/ui/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "~/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pax Admin",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className + " "}>
        <Navbar />
          <SignedIn>
        <div className="py-8 px-12">{children}</div></SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}
