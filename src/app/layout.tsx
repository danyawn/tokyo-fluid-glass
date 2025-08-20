import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ScrollEffects from "./components/ui/ScrollEffects";
import SplashCursor from "./components/ui/SplashCursor";
import InitialLoader from "./components/ui/InitialLoader";
import SizeGuard from "./components/ui/SizeGuard";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tokyo-glass.vercel.app"),
  title: {
    default: "Tokyo Experience — Fluid Glass, Iridescence & Interactive Gallery",
    template: "%s | Tokyo Experience",
  },
  description:
    "Immerse yourself in Tokyo with fluid glass 3D effects, iridescence backgrounds, interactive masonry gallery, and GSAP animations. Experience the future of web design.",
  keywords: [
    "Tokyo",
    "Japan",
    "3D",
    "three.js",
    "react-three-fiber",
    "fluid glass",
    "iridescence",
    "gsap",
    "masonry gallery",
    "glass morphism",
    "interactive",
    "web design",
    "performance",
    "next.js",
    "typescript",
  ],
  authors: [{ name: "Yan Danu" }],
  creator: "Yan Danu",
  publisher: "Yan Danu",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "Tokyo Experience — Fluid Glass & Iridescence",
    description:
      "Immersive Tokyo experience with fluid glass 3D, iridescence backgrounds, interactive gallery, and GSAP animations. Built with Next.js 15 and Three.js.",
    url: "https://tokyo-glass.vercel.app/",
    siteName: "Tokyo Experience",
    images: [
      {
        url: "/images/tokyo-1.avif",
        width: 1200,
        height: 630,
        alt: "Tokyo skyline with fluid glass effects",
      },
      {
        url: "/images/tokyo-2.jpeg",
        width: 1200,
        height: 630,
        alt: "Tokyo cityscape with iridescence background",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tokyo Experience — Fluid Glass & Iridescence",
    description:
      "Immersive Tokyo experience with fluid glass 3D, iridescence backgrounds, interactive gallery, and GSAP animations.",
    images: ["/images/tokyo-1.avif"],
    creator: "@danyawn",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://tokyo-glass.vercel.app/",
  },
  category: "technology",
  classification: "Web Application",
  other: {
    "theme-color": "#000000",
    "msapplication-TileColor": "#000000",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
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
