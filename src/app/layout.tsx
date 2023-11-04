import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader"
import Navbar from "./Navbar/Navbar";
import Footer from "./footer";
import SessionProvider from "./SessionProvider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "flowmazon",
  description: "we make your wallet cry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextTopLoader />
      <SessionProvider>
      <Navbar/>
        <main className="p-4 max-w-7xl mx-auto min-w-[300px]">{children}</main>
     <Footer/>
     </SessionProvider>
      </body>
    </html>
  );
}
