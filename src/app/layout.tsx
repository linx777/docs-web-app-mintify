import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: [{ path: "./fonts/geist-sans.woff2", style: "normal" }],
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: [{ path: "./fonts/geist-mono.woff2", style: "normal" }],
  variable: "--font-geist-mono",
});

const lato = localFont({
  src: [
    { path: "./fonts/lato-400.woff2", style: "normal", weight: "400" },
    { path: "./fonts/lato-700.woff2", style: "normal", weight: "700" },
  ],
  variable: "--font-lato",
});

const ibmPlexMono = localFont({
  src: [{ path: "./fonts/ibm-plex-mono-400.woff2", style: "normal", weight: "400" }],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Automata Docs",
  description: "Documentation for Automata Docs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${lato.variable} ${ibmPlexMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
