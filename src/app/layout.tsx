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
  title: 'Nodenomad | Portfolio',
  description: 'Fullstack web developer portfolio',
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
