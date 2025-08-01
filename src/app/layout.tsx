import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from 'next/font/google'
import TopNav from "./components/TopNav";
import BottomMenu from "./components/BottomMenu";
import { VisibilityProvider } from "./components/VisibilityContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vikram Hegde | Web Developer',
  description: 'Portfolio of Vikram Hegde — a passionate frontend developer skilled in React, Next.js, and UI design.',
  keywords: ['Vikram Hegde', 'Frontend Developer', 'React Portfolio', 'Next.js', 'Web Developer India'],
  authors: [{ name: 'Vikram Hegde', url: 'https://nodenomad.in' }],
  creator: 'Vikram Hegde',
  openGraph: {
    title: 'Vikram Hegde | Web Developer',
    description: 'Explore my work, projects, and contact details.',
    url: 'https://nodenomad.in',
    siteName: 'Vikram Hegde Portfolio',
    locale: 'en_IN',
    type: 'website',
  },
  linkedin: {
    card: 'summary_large_image',
    title: 'Vikram Hegde Portfolio',
    description: 'Frontend developer building beautiful web experiences.',
    creator: '@yourhandle',
  },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-white text-black dark:bg-[#0f0f0f] dark:text-white transition-colors`}>
        <VisibilityProvider>
          <TopNav />
          <main>{children}</main>
          <BottomMenu />
        </VisibilityProvider>
      </body>
    </html>
  )
}
