import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollEffects from "./components/ui/ScrollEffects";
import SplashCursor from "./components/ui/SplashCursor";
import InitialLoader from "./components/ui/InitialLoader";
import SizeGuard from "./components/ui/SizeGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tokyo — Fluid Glass, Galaxy Background & Masonry Gallery",
    template: "%s | Tokyo Experience",
  },
  description:
    "Discover Tokyo with fluid-glass 3D, galaxy shader background, GSAP interactions, and a dynamic masonry gallery.",
  keywords: [
    "Tokyo",
    "Japan",
    "3D",
    "three.js",
    "react-three-fiber",
    "ogl",
    "gsap",
    "gallery",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "Tokyo — Fluid Glass & Galaxy",
    description:
      "Immersive Tokyo landing with fluid glass 3D, galaxy shader, and animated gallery.",
    images: [
      {
        url: "/images/tokyo-1.avif",
        width: 1200,
        height: 630,
        alt: "Tokyo skyline",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tokyo — Fluid Glass & Galaxy",
    description:
      "Immersive Tokyo landing with fluid glass 3D, galaxy shader, and animated gallery.",
    images: ["/images/tokyo-1.avif"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SizeGuard minWidth={1024} minHeight={768}>
          <ScrollEffects />
          <SplashCursor />
          <InitialLoader />
          {children}
        </SizeGuard>
      </body>
    </html>
  );
}
