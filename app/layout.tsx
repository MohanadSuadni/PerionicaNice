import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Perionica veša Surčin | Pranje i peglanje Beograd - Nice",
  description:
    "Profesionalna perionica veša u Surčinu. Pranje, peglanje i dostava u Novom Beogradu i Obrenovcu.",
  keywords: [
    "perionica veša Surčin",
    "pranje veša Beograd",
    "peglanje veša",
    "Novi Beograd",
    "Obrenovac"
  ],
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}