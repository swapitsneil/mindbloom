import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

// Load Inter font with display: 'swap' to prevent layout shifts
const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: "MindBloom - Your Mental Health Companion",
  description: "A safe space to feel heard and find support. MindBloom listens, supports, and guides you toward wellness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate className in a way that's consistent between server and client
  // Use a stable className that won't change between server and client renders
  const bodyClassName = `${inter.className} bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen`;

  return (
    <html lang="en">
      <body className={bodyClassName}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}