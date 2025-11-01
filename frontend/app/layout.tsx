import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopping Cart - Modern E-commerce",
  description: "A modern shopping cart built with Next.js and NestJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#1c1c1e',
              border: '1px solid #e8e8ed',
              borderRadius: '12px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#34c759',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ff3b30',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
