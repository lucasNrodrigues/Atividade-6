// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <-- VERIFIQUE SE ESTA LINHA EXISTE

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Player",
  description: "Meu Player de Música",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-black`}>
        {children}
      </body>
    </html>
  );
}