'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const createEmotionCache = () => {
  return createCache({
    key: "mui",
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

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
        <CacheProvider value={emotionCache}>
          {children}
        </CacheProvider>
      </body>
    </html>
  );
}
