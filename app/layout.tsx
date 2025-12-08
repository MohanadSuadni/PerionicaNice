import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Perionica veša Nice",
  description: "Profesionalno pranje i peglanje veša",
};

// Google Inter (radi svuda - telefon, tablet, laptop)
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
		<meta name="title" content="Laundry Service - Perionica Nice" />
<meta name="description" content="Profesionalno pranje, peglanje i dostava u Beogradu." />
<meta name="keywords" content="pranje, peglanje, laundry, Beograd" />
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
