import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/embla.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://twinkleface.com'),
  title: "TwinkleFace - AI-Powered Image Generation Platform",
  description: "Transform your photos into stunning visual styles with TwinkleFace. Choose from curated AI prompts for anime avatars, professional portraits, 3D headshots, and more. No prompt writing skills required.",
  keywords: "AI image generation, photo transformation, anime avatars, professional portraits, AI art, DALL-E, Stable Diffusion, photo editing, avatar creator",
  authors: [{ name: "TwinkleFace" }],
  creator: "TwinkleFace",
  publisher: "TwinkleFace",
  openGraph: {
    title: "TwinkleFace - AI-Powered Image Generation Platform",
    description: "Transform your photos into stunning visual styles using curated, pre-written prompts. Choose a style, upload your photo, and watch the magic happen.",
    url: "https://twinkleface.com",
    siteName: "TwinkleFace",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TwinkleFace - AI Image Generation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TwinkleFace - AI-Powered Image Generation Platform",
    description: "Transform your photos into stunning visual styles using curated, pre-written prompts. Choose a style, upload your photo, and watch the magic happen.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
