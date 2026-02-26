import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Lovejeet Singh — Full-Stack Developer",
  description: "Portfolio of Lovejeet Singh — Full-Stack Developer crafting premium digital experiences with modern web technologies.",
  keywords: ["portfolio", "developer", "full-stack", "react", "next.js", "webgl"],
  authors: [{ name: "Lovejeet Singh" }],
  openGraph: {
    title: "Lovejeet Singh — Full-Stack Developer",
    description: "Crafting premium digital experiences with modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#050505] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
