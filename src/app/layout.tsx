import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BG Funding Platform | Платформа за финансиране",
  description: "Discover and apply for EU and Bulgarian government funding programs. Открийте и кандидатствайте за програми за финансиране от ЕС и българското правителство.",
  keywords: ["Bulgaria", "EU funding", "grants", "ИСУН", "eurofunds", "финансиране", "субсидии"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
